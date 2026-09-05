from __future__ import annotations

import asyncio
import json
from collections.abc import Awaitable, Iterable
from typing import Any

import httpx

from .config import Settings

Params = dict[str, Any] | None


class CanvasError(Exception):
    def __init__(self, status: int, message: str, hint: str | None = None):
        self.status = status
        self.message = message
        self.hint = hint
        super().__init__(message)

    def __str__(self) -> str:
        if self.status:
            text = f"Canvas returned {self.status}: {self.message}"
        else:
            text = f"Canvas request failed: {self.message}"
        return f"{text}\nHint: {self.hint}" if self.hint else text


def _hint(status: int, message: str, host: str) -> str | None:
    lowered = message.lower()
    if status == 401:
        return (
            "The token was rejected. Generate a new one in Canvas under "
            "Account > Settings > Approved Integrations, then update CANVAS_TOKEN."
        )
    if status == 403:
        if "rate limit" in lowered:
            return "Canvas rate limit hit. Wait a minute, then retry with lower CANVAS_MAX_CONCURRENCY."
        return "Your Canvas role does not permit this action."
    if status == 404:
        if "domain" in lowered:
            return f"CANVAS_URL points at the wrong host ({host}). Use your school's Canvas address."
        return "Nothing at that path. Check the course, assignment, or item id."
    if status in (301, 302, 303, 307, 308):
        return "Canvas redirected instead of answering. Check that CANVAS_URL is your school's Canvas host."
    if status >= 500:
        return "Canvas server error. Retry shortly."
    return None


def _extract_message(response: httpx.Response) -> str:
    try:
        body = response.json()
    except ValueError:
        return response.reason_phrase or response.text[:200] or "unknown error"
    if isinstance(body, dict):
        errors = body.get("errors")
        if isinstance(errors, list) and errors:
            first = errors[0]
            return first.get("message", str(first)) if isinstance(first, dict) else str(first)
        if isinstance(errors, dict):
            for messages in errors.values():
                if isinstance(messages, list) and messages:
                    first = messages[0]
                    return first.get("message", str(first)) if isinstance(first, dict) else str(first)
        for key in ("message", "error", "error_description"):
            if body.get(key):
                return str(body[key])
    return response.reason_phrase or "unknown error"


def parse_json(response: httpx.Response) -> Any:
    if not response.content:
        return None
    text = response.text
    if text.startswith("while(1);"):
        text = text[len("while(1);") :]
    return json.loads(text)


class PageList(list):
    """A list of items from get_all(), plus whether the page limit cut it off.

    Still a plain list everywhere it's indexed, sliced, sorted, or measured
    with len() — .capped is the one thing get_all() couldn't otherwise tell
    a caller, and callers that don't check it lose nothing they had before.
    """

    def __init__(self, items: Iterable[Any], capped: bool):
        super().__init__(items)
        self.capped = capped


class CanvasClient:
    def __init__(self, settings: Settings):
        self.settings = settings
        self._http = httpx.AsyncClient(
            base_url=f"{settings.base_url}/api/v1",
            headers={
                "Authorization": f"Bearer {settings.token}",
                "Accept": "application/json",
                "User-Agent": "canvaslms-api",
            },
            timeout=settings.timeout,
            follow_redirects=False,
        )
        self._semaphore = asyncio.Semaphore(settings.max_concurrency)

    async def request(
        self,
        method: str,
        path: str,
        *,
        params: Params = None,
        json: Any = None,
        data: Any = None,
        files: Any = None,
    ) -> httpx.Response:
        attempt = 0
        while True:
            try:
                async with self._semaphore:
                    response = await self._http.request(
                        method, path, params=params, json=json, data=data, files=files
                    )
            except httpx.HTTPError as exc:
                raise CanvasError(
                    0,
                    f"{type(exc).__name__}: {exc}",
                    "Check CANVAS_URL and your network connection.",
                ) from exc
            rate_limited = response.status_code == 429 or (
                response.status_code == 403 and "rate limit" in response.text.lower()
            )
            if rate_limited and attempt < 2:
                attempt += 1
                await asyncio.sleep(1.5 * attempt)
                continue
            if response.status_code >= 300:
                message = _extract_message(response)
                raise CanvasError(
                    response.status_code,
                    message,
                    _hint(response.status_code, message, self.settings.host),
                )
            return response

    async def get(self, path: str, params: Params = None) -> Any:
        return parse_json(await self.request("GET", path, params=params))

    async def get_all(self, path: str, params: Params = None, limit: int = 1000) -> PageList:
        merged: dict[str, Any] = {"per_page": 100}
        merged.update(params or {})
        items: list[Any] = []
        response = await self.request("GET", path, params=merged)
        while True:
            page = parse_json(response)
            if not isinstance(page, list):
                return PageList([page] if page is not None else [], capped=False)
            items.extend(page)
            next_url = response.links.get("next", {}).get("url")
            if not next_url:
                return PageList(items, capped=False)
            if len(items) >= limit:
                return PageList(items[:limit], capped=True)
            response = await self.request("GET", next_url)

    async def post(
        self, path: str, *, json: Any = None, data: Any = None, files: Any = None, params: Params = None
    ) -> Any:
        return parse_json(
            await self.request("POST", path, json=json, data=data, files=files, params=params)
        )

    async def put(self, path: str, *, json: Any = None, params: Params = None) -> Any:
        return parse_json(await self.request("PUT", path, json=json, params=params))

    async def delete(self, path: str, *, params: Params = None, json: Any = None) -> Any:
        return parse_json(await self.request("DELETE", path, params=params, json=json))

    async def download(self, url: str) -> httpx.Response:
        try:
            response = await self._http.get(url)
            if response.status_code in (301, 302, 303, 307, 308):
                location = response.headers.get("location", "")
                async with httpx.AsyncClient(
                    follow_redirects=True, timeout=self.settings.timeout
                ) as anonymous:
                    response = await anonymous.get(location)
        except httpx.HTTPError as exc:
            raise CanvasError(0, f"{type(exc).__name__}: {exc}") from exc
        if response.status_code >= 300:
            raise CanvasError(response.status_code, f"download failed for {url}")
        return response

    async def gather(self, awaitables: Iterable[Awaitable[Any]]) -> list[Any]:
        return list(await asyncio.gather(*awaitables, return_exceptions=True))

    async def aclose(self) -> None:
        await self._http.aclose()
