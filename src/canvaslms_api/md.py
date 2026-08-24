from __future__ import annotations

import re
from collections.abc import Iterable, Sequence
from datetime import datetime
from html.parser import HTMLParser
from typing import Any

NONE = "-"
BLOCK_TAGS = {
    "p", "div", "br", "tr", "ul", "ol", "table", "section", "article",
    "blockquote", "pre", "hr", "h1", "h2", "h3", "h4", "h5", "h6",
}


class _TextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []
        self._skip = 0
        self._href: str | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in ("script", "style"):
            self._skip += 1
        elif tag == "li":
            self.parts.append("\n- ")
        elif tag in BLOCK_TAGS:
            self.parts.append("\n")
        elif tag == "a":
            self._href = dict(attrs).get("href")
        elif tag == "img":
            alt = dict(attrs).get("alt")
            self.parts.append(f"[image: {alt}]" if alt else "[image]")

    def handle_endtag(self, tag: str) -> None:
        if tag in ("script", "style"):
            self._skip = max(0, self._skip - 1)
        elif tag in BLOCK_TAGS:
            self.parts.append("\n")
        elif tag == "a" and self._href:
            self.parts.append(f" ({self._href})")
            self._href = None

    def handle_data(self, data: str) -> None:
        if not self._skip:
            self.parts.append(data)


def html_to_text(html: str | None, max_chars: int | None = None) -> str:
    if not html:
        return ""
    parser = _TextExtractor()
    parser.feed(html)
    parser.close()
    lines = [re.sub(r"[ \t\xa0]+", " ", line).strip() for line in "".join(parser.parts).splitlines()]
    text = re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).strip()
    return truncate(text, max_chars) if max_chars else text


def truncate(text: str, max_chars: int | None) -> str:
    if max_chars is None or len(text) <= max_chars:
        return text
    return f"{text[:max_chars].rstrip()}\n\n[truncated {len(text) - max_chars} characters]"


def fmt_date(value: str | None, with_time: bool = True) -> str:
    if not value:
        return NONE
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return value
    local = parsed.astimezone()
    if with_time:
        return local.strftime("%a %b %d, %Y %I:%M %p").replace(" 0", " ")
    return local.strftime("%a %b %d, %Y").replace(" 0", " ")


def cell(value: Any) -> str:
    if value is None or value == "":
        return NONE
    if isinstance(value, bool):
        return "yes" if value else "no"
    if isinstance(value, float):
        text = f"{value:.2f}".rstrip("0").rstrip(".")
    elif isinstance(value, (list, tuple, set)):
        text = ", ".join(cell(v) for v in value) or NONE
    else:
        text = str(value)
    return text.replace("|", r"\|").replace("\n", " ").strip() or NONE


def table(headers: Sequence[str], rows: Iterable[Sequence[Any]]) -> str:
    body = [f"| {' | '.join(cell(v) for v in row)} |" for row in rows]
    if not body:
        return "_none_"
    head = f"| {' | '.join(headers)} |"
    rule = f"|{'|'.join(' --- ' for _ in headers)}|"
    return "\n".join([head, rule, *body])


def kv(pairs: Iterable[tuple[str, Any]]) -> str:
    return "\n".join(f"- **{key}:** {cell(value)}" for key, value in pairs)


def heading(text: str, level: int = 2) -> str:
    return f"{'#' * level} {text}"


def bullets(items: Iterable[Any]) -> str:
    lines = [f"- {cell(item)}" for item in items]
    return "\n".join(lines) if lines else "_none_"


def section(title: str, body: str, level: int = 2) -> str:
    return f"{heading(title, level)}\n\n{body}"


def join(*blocks: str) -> str:
    return "\n\n".join(block for block in blocks if block)


def preview(action: str, details: str) -> str:
    return join(
        heading(f"Preview: {action}"),
        details,
        "**Nothing was changed.** Call this tool again with `confirm=true` to execute.",
    )


def done(action: str, details: str = "") -> str:
    return join(heading(f"Done: {action}"), details)


def points(score: Any, possible: Any) -> str:
    if score is None:
        return NONE
    if possible in (None, 0, 0.0):
        return cell(score)
    return f"{cell(score)} / {cell(possible)}"


def percent(value: Any) -> str:
    if value is None:
        return NONE
    try:
        return f"{float(value):.1f}%"
    except (TypeError, ValueError):
        return cell(value)
