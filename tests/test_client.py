from __future__ import annotations

import json

import httpx
import pytest
import respx

from canvaslms_api.client import CanvasClient, CanvasError, parse_json
from canvaslms_api.config import Settings


@pytest.fixture
def client(settings: Settings) -> CanvasClient:
    return CanvasClient(settings)


def _link_header(url: str, rel: str = "next") -> str:
    return f'<{url}>; rel="{rel}"'


async def test_get_returns_json(client: CanvasClient, mock: respx.MockRouter) -> None:
    mock.get("https://canvas.test/api/v1/courses/1").respond(json={"id": 1, "name": "Course"})
    result = await client.get("/courses/1")
    assert result == {"id": 1, "name": "Course"}
    await client.aclose()


async def test_get_strips_while1_prefix(client: CanvasClient, mock: respx.MockRouter) -> None:
    mock.get("https://canvas.test/api/v1/courses/1").respond(
        content=b'while(1);{"id": 1}', headers={"Content-Type": "application/json"}
    )
    result = await client.get("/courses/1")
    assert result == {"id": 1}
    await client.aclose()


def test_parse_json_empty_body_returns_none() -> None:
    response = httpx.Response(204, content=b"")
    assert parse_json(response) is None


async def test_get_all_follows_pagination_across_pages(
    client: CanvasClient, mock: respx.MockRouter
) -> None:
    page1_next = "https://canvas.test/api/v1/courses?page=2"
    page2_next = "https://canvas.test/api/v1/courses?page=3"

    mock.get("https://canvas.test/api/v1/courses", params={"per_page": "100"}).respond(
        json=[{"id": 1}, {"id": 2}],
        headers={"Link": _link_header(page1_next)},
    )
    mock.get(page1_next).respond(
        json=[{"id": 3}, {"id": 4}],
        headers={"Link": _link_header(page2_next)},
    )
    mock.get(page2_next).respond(json=[{"id": 5}])

    result = await client.get_all("/courses")
    assert [c["id"] for c in result] == [1, 2, 3, 4, 5]
    await client.aclose()


async def test_get_all_respects_limit(client: CanvasClient, mock: respx.MockRouter) -> None:
    page1_next = "https://canvas.test/api/v1/courses?page=2"
    mock.get("https://canvas.test/api/v1/courses", params={"per_page": "100"}).respond(
        json=[{"id": 1}, {"id": 2}, {"id": 3}],
        headers={"Link": _link_header(page1_next)},
    )
    result = await client.get_all("/courses", limit=2)
    assert [c["id"] for c in result] == [1, 2]
    await client.aclose()


async def test_get_all_returns_single_object_as_list(
    client: CanvasClient, mock: respx.MockRouter
) -> None:
    mock.get("https://canvas.test/api/v1/courses/1", params={"per_page": "100"}).respond(
        json={"id": 1, "name": "Course"}
    )
    result = await client.get_all("/courses/1")
    assert result == [{"id": 1, "name": "Course"}]
    await client.aclose()


async def test_get_all_returns_empty_list_for_none(
    client: CanvasClient, mock: respx.MockRouter
) -> None:
    mock.get("https://canvas.test/api/v1/courses/1", params={"per_page": "100"}).respond(
        content=b"", status_code=204
    )
    result = await client.get_all("/courses/1")
    assert result == []
    await client.aclose()


async def test_401_error_mentions_token(client: CanvasClient, mock: respx.MockRouter) -> None:
    mock.get("https://canvas.test/api/v1/courses/1").respond(
        401, json={"errors": [{"message": "invalid access token"}]}
    )
    with pytest.raises(CanvasError) as exc_info:
        await client.get("/courses/1")
    err = exc_info.value
    assert err.status == 401
    assert "token" in err.hint.lower()
    await client.aclose()


async def test_403_error_role_hint(client: CanvasClient, mock: respx.MockRouter) -> None:
    mock.get("https://canvas.test/api/v1/courses/1").respond(
        403, json={"errors": [{"message": "not authorized"}]}
    )
    with pytest.raises(CanvasError) as exc_info:
        await client.get("/courses/1")
    err = exc_info.value
    assert err.status == 403
    assert "role" in err.hint.lower()
    await client.aclose()


async def test_403_rate_limit_retries_then_raises(
    client: CanvasClient, mock: respx.MockRouter, monkeypatch: pytest.MonkeyPatch
) -> None:
    async def no_sleep(*_args, **_kwargs) -> None:
        return None

    monkeypatch.setattr("canvaslms_api.client.asyncio.sleep", no_sleep)

    route = mock.get("https://canvas.test/api/v1/courses/1").respond(
        403, json={"errors": [{"message": "Rate Limit Exceeded"}]}
    )
    with pytest.raises(CanvasError) as exc_info:
        await client.get("/courses/1")
    err = exc_info.value
    assert err.status == 403
    assert "rate limit" in err.hint.lower()
    assert route.call_count == 3
    await client.aclose()


async def test_429_retried_twice_then_succeeds(
    client: CanvasClient, mock: respx.MockRouter, monkeypatch: pytest.MonkeyPatch
) -> None:
    async def no_sleep(*_args, **_kwargs) -> None:
        return None

    monkeypatch.setattr("canvaslms_api.client.asyncio.sleep", no_sleep)

    route = mock.get("https://canvas.test/api/v1/courses/1")
    route.side_effect = [
        httpx.Response(429),
        httpx.Response(429),
        httpx.Response(200, json={"id": 1}),
    ]
    result = await client.get("/courses/1")
    assert result == {"id": 1}
    assert route.call_count == 3
    await client.aclose()


async def test_404_domain_not_found_host_hint(client: CanvasClient, mock: respx.MockRouter) -> None:
    mock.get("https://canvas.test/api/v1/courses/1").respond(
        404, json={"message": "The specified domain not found"}
    )
    with pytest.raises(CanvasError) as exc_info:
        await client.get("/courses/1")
    err = exc_info.value
    assert err.status == 404
    assert "canvas.test" in err.hint
    await client.aclose()


async def test_404_generic_hint(client: CanvasClient, mock: respx.MockRouter) -> None:
    mock.get("https://canvas.test/api/v1/courses/1").respond(
        404, json={"message": "not found"}
    )
    with pytest.raises(CanvasError) as exc_info:
        await client.get("/courses/1")
    err = exc_info.value
    assert err.status == 404
    assert "id" in err.hint.lower()
    await client.aclose()


async def test_500_retry_hint(client: CanvasClient, mock: respx.MockRouter) -> None:
    mock.get("https://canvas.test/api/v1/courses/1").respond(500, text="boom")
    with pytest.raises(CanvasError) as exc_info:
        await client.get("/courses/1")
    err = exc_info.value
    assert err.status == 500
    assert "retry" in err.hint.lower()
    await client.aclose()


async def test_error_message_from_errors_list(client: CanvasClient, mock: respx.MockRouter) -> None:
    mock.get("https://canvas.test/api/v1/courses/1").respond(
        400, json={"errors": [{"message": "bad request detail"}]}
    )
    with pytest.raises(CanvasError) as exc_info:
        await client.get("/courses/1")
    assert exc_info.value.message == "bad request detail"
    await client.aclose()


async def test_error_message_from_errors_dict(client: CanvasClient, mock: respx.MockRouter) -> None:
    mock.get("https://canvas.test/api/v1/courses/1").respond(
        400, json={"errors": {"base": [{"message": "base error detail"}]}}
    )
    with pytest.raises(CanvasError) as exc_info:
        await client.get("/courses/1")
    assert exc_info.value.message == "base error detail"
    await client.aclose()


async def test_error_message_from_message_key(client: CanvasClient, mock: respx.MockRouter) -> None:
    mock.get("https://canvas.test/api/v1/courses/1").respond(400, json={"message": "plain message"})
    with pytest.raises(CanvasError) as exc_info:
        await client.get("/courses/1")
    assert exc_info.value.message == "plain message"
    await client.aclose()


async def test_error_message_non_json_body(client: CanvasClient, mock: respx.MockRouter) -> None:
    mock.get("https://canvas.test/api/v1/courses/1").respond(
        400, content=b"<html>not json</html>", headers={"Content-Type": "text/html"}
    )
    with pytest.raises(CanvasError) as exc_info:
        await client.get("/courses/1")
    assert exc_info.value.message
    await client.aclose()


async def test_network_error_maps_to_canvas_error_status_zero(
    client: CanvasClient, mock: respx.MockRouter
) -> None:
    mock.get("https://canvas.test/api/v1/courses/1").mock(side_effect=httpx.ConnectError("boom"))
    with pytest.raises(CanvasError) as exc_info:
        await client.get("/courses/1")
    err = exc_info.value
    assert err.status == 0
    assert err.hint
    await client.aclose()


async def test_post_sends_method_and_json(client: CanvasClient, mock: respx.MockRouter) -> None:
    route = mock.post("https://canvas.test/api/v1/courses/1/assignments").respond(json={"id": 9})
    result = await client.post("/courses/1/assignments", json={"name": "HW1"})
    assert result == {"id": 9}
    request = route.calls.last.request
    assert request.method == "POST"
    assert json.loads(request.content) == {"name": "HW1"}
    await client.aclose()


async def test_put_sends_method_and_json(client: CanvasClient, mock: respx.MockRouter) -> None:
    route = mock.put("https://canvas.test/api/v1/courses/1").respond(json={"id": 1, "name": "New"})
    result = await client.put("/courses/1", json={"name": "New"})
    assert result == {"id": 1, "name": "New"}
    request = route.calls.last.request
    assert request.method == "PUT"
    assert json.loads(request.content) == {"name": "New"}
    await client.aclose()


async def test_delete_sends_method_and_json(client: CanvasClient, mock: respx.MockRouter) -> None:
    route = mock.delete("https://canvas.test/api/v1/courses/1").respond(json={"id": 1})
    result = await client.delete("/courses/1", json={"reason": "cleanup"})
    assert result == {"id": 1}
    request = route.calls.last.request
    assert request.method == "DELETE"
    assert json.loads(request.content) == {"reason": "cleanup"}
    await client.aclose()


async def test_download_follows_redirect_without_auth_header(
    client: CanvasClient, mock: respx.MockRouter
) -> None:
    mock.get("https://canvas.test/files/1/download").respond(
        302, headers={"Location": "https://s3.example.com/files/1"}
    )
    second = mock.get("https://s3.example.com/files/1").respond(200, content=b"file-bytes")

    response = await client.download("https://canvas.test/files/1/download")
    assert response.content == b"file-bytes"
    second_request = second.calls.last.request
    assert "authorization" not in {k.lower() for k in second_request.headers.keys()}
    await client.aclose()


def test_canvas_error_str_includes_hint_on_second_line() -> None:
    err = CanvasError(401, "invalid token", "Generate a new token.")
    text = str(err)
    lines = text.splitlines()
    assert len(lines) == 2
    assert lines[1] == "Hint: Generate a new token."


def test_canvas_error_str_no_hint() -> None:
    err = CanvasError(500, "server error", None)
    assert str(err) == "Canvas returned 500: server error"
