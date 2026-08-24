from __future__ import annotations

from fastmcp import FastMCP
from fastmcp.exceptions import ToolError
from fastmcp.server.middleware import CallNext, Middleware, MiddlewareContext

from . import __version__
from .app import App, build_app
from .client import CanvasError
from .config import Settings
from .tools import registrars

INSTRUCTIONS = """CanvasLMS - API gives you the user's own Canvas LMS account.

Identifiers: any `course` argument accepts a numeric Canvas id, a course code
(e.g. "ENG101"), part of a course name, or "sis_course_id:XXX". Assignment,
module, page, and topic ids are numeric. Call list_courses first if unsure.

Writes: every tool that changes Canvas has a `confirm` argument. Without
confirm=true it returns a preview and changes nothing. Show the preview to the
user, then call again with confirm=true only after they approve.

Permissions: everything runs as the token owner. A student token cannot see
other students' data or grade anything; educator tools fail with 403 there.

Results are Markdown. Dates are shown in the machine's local time zone.
"""


class CanvasErrors(Middleware):
    async def on_call_tool(self, context: MiddlewareContext, call_next: CallNext):
        try:
            return await call_next(context)
        except CanvasError as exc:
            raise ToolError(str(exc)) from exc


def build_server(settings: Settings | None = None, app: App | None = None) -> FastMCP:
    app = app or build_app(settings)
    mcp = FastMCP(
        "canvaslms-api",
        instructions=INSTRUCTIONS,
        version=__version__,
        middleware=[CanvasErrors()],
    )
    for _name, register in registrars():
        register(mcp, app)
    return mcp
