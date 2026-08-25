# CanvasLMS - API: context

> v1.0.0 (2026-08-24) initial release; marketing site added under web/ the same day

## Purpose

CanvasLMS - API is a local MCP server that exposes a Canvas LMS account to MCP clients (Claude Code, Claude Desktop, Cursor, and others) as roughly 100 tools. It authenticates with the user's own Canvas personal access token, runs entirely on the user's machine, and returns Markdown from every tool. Tools that change Canvas require an explicit `confirm=true` after returning a preview.

## Stack

- Python 3.11+
- FastMCP 3 (`fastmcp>=3.4,<4`) for the MCP server and tool registration
- httpx for the Canvas API client
- python-dotenv for `.env` loading
- Dev/test: pytest, pytest-asyncio, respx, ruff
- Packaging: hatchling, console script `canvaslms-api`

## Layout

```
src/canvaslms_api/
  cli.py        argparse entrypoint: --test, --config, --list-tools, --transport, --version
  server.py     build_server(): FastMCP instance, INSTRUCTIONS text, registers all tool modules
  app.py        App dataclass (settings, client, courses), READ/WRITE/DESTRUCTIVE hint dicts, person()/anonymous_id()
  client.py     CanvasClient (httpx-based), CanvasError
  courses.py    CourseResolver: resolves course id/code/name/sis_course_id: to a numeric id, with caching
  md.py         Markdown-formatting helpers shared by tool modules
  config.py     Settings dataclass, Settings.from_env(), ConfigError, load_env()
  tools/
    identity.py      9 tools : courses & identity
    student.py        9 tools: student-facing tools
    assignments.py    9 tools: assignments & grading
    rubrics.py         6 tools: rubrics
    discussions.py    14 tools: discussions & announcements
    modules.py         8 tools: modules
    pages.py           9 tools: pages
    files.py           4 tools: files
    messaging.py       6 tools: Canvas Inbox
    peer_reviews.py   13 tools: peer review workflow and analytics
    people.py          5 tools: people & privacy
    accessibility.py   5 tools: accessibility scanning and fixes
    migrations.py      2 tools: course content migration/copy
    developer.py       1 tool : search_tools (meta)
  = 100 tools total
```

## Key conventions

- **Per-module registration.** Each `tools/<module>.py` exposes `register(mcp, app)`, called from `server.build_server()` via `tools.registrars()`. New tool modules follow the same signature.
- **Annotation hints.** `app.py` defines `READ`, `WRITE`, `DESTRUCTIVE` hint dicts (`readOnlyHint`, `destructiveHint`, `idempotentHint`) applied to each `@mcp.tool` registration so clients can distinguish safe reads from mutating/destructive calls.
- **Confirm gate.** Every tool that mutates Canvas takes `confirm: bool = false`. Without it, the tool returns a Markdown preview of the change and makes no mutating Canvas request. Called again with `confirm=true`, it performs the change.
- **Markdown helpers.** `md.py` centralizes table/list/heading formatting so every tool's output is consistent Markdown.
- **Course resolution and cache.** `CourseResolver` (`courses.py`) accepts a numeric id, a course code, a partial course name, or `sis_course_id:X`, and resolves it to a Canvas course id. Results are cached for `CANVAS_CACHE_TTL` seconds; `get_cache_status` and `clear_cache` (in `identity.py`) inspect/reset that cache.
- **Error mapping.** `CanvasError` (`client.py`) wraps Canvas API failures; a 403 from an educator-only endpoint surfaces to the caller with a permission hint rather than a raw HTTP error.
- **Anonymization.** When `CANVAS_ANONYMIZE_STUDENTS=true`, `App.person()` returns a stable SHA-256-derived pseudonym (`Student_xxxxxxxx`) instead of the real name; `App.anonymous_id()` computes it, `export_anonymization_map` (in `people.py`) can export the mapping, `get_privacy_status` reports whether anonymization is active.

## Configuration

Loaded from `.env` in the repository root via `Settings.from_env()` (`config.py`):

| Variable | Required | Default |
|---|---|---|
| `CANVAS_URL` | yes |: |
| `CANVAS_TOKEN` | yes |: |
| `CANVAS_TIMEOUT` | no | 30 |
| `CANVAS_CACHE_TTL` | no | 300 |
| `CANVAS_MAX_CONCURRENCY` | no | 5 |
| `CANVAS_ANONYMIZE_STUDENTS` | no | false |
| `CANVAS_DOWNLOAD_DIR` | no | system temp dir |

`CANVAS_URL` must start with `https://`; a trailing `/api/v1` is stripped automatically.

## How to run / test

```
uv venv .venv && uv pip install -e ".[dev]"
canvaslms-api --test          # connection check
canvaslms-api --config        # print resolved settings, token masked
canvaslms-api --list-tools    # print all registered tool names
canvaslms-api                 # run over stdio (default)
canvaslms-api --transport http --host 127.0.0.1 --port 7100
pytest
ruff check .
```

## Ports

HTTP transport default port: **7100** (host `127.0.0.1` by default). Stdio transport (the default) uses no port.

## Known limitations

- No arbitrary code execution (no TypeScript/JS sandbox): every tool is a fixed Canvas API operation.
- No institutional hosting or SSO/OAuth flow: the server is local-only and authenticates with a single personal access token per run.
- Permissions are exactly whatever the configured token's Canvas role grants. A student token cannot exercise educator tools (grading, bulk messaging, content migration, etc.); those calls return the Canvas 403 with a permission hint rather than succeeding partially.

## Marketing site (`web/`)

Next.js 16 App Router, React 19, Tailwind v4, @next/mdx, lucide-react, @vercel/analytics. Visual system follows the Linear recipe: dark-default (near-black #08090A ground) with a light companion, two-tier tokens (primitives then semantic roles) in globals.css, hairline rgba borders, radii 6/12/16, quint easing at 150ms, and the project's orange as the single accent. lucide icons throughout. Brand name on the site is "Canvas Connect"; package and repo stay CanvasLMS-API. Deployed on Vercel with Root Directory `web`, project `canvas-api`, live at https://canvaslms-api.vercel.app. Dev port 4300 (`npm run dev`); 4200 belongs to Noted.

Routes: `/` (hero, terminal demo, install with OS tabs + client tabs for Claude Code / Claude Desktop / Cursor / Windsurf / Codex / HTTP+Docker, usage, closing CTA; there is no `/docs` route, it was folded in), `/tools` (searchable explorer over `src/content/tools.json`, URL-synced filters, `#tool_name` deep links), `/skills` (eight skill cards from `src/content/skills.ts`), `/changelog` (renders `src/content/CHANGELOG.md`).

Design system lives in `src/app/globals.css` (CSS variables mapped through `@theme inline`): light-first with a `.dark` class toggle persisted in localStorage, warm orange accent (`#c2410c` light / `#fb923c` dark), Geist Sans + Mono, two radii (`rounded-control` 8px, `rounded-card` 16px) plus `rounded-full` for pills, hover lift 2px max, reduced-motion respected. Shared components in `src/components/`: Nav, Footer, ThemeToggle, Container, Section, CodeBlock, CopyButton, Tabs (storageKey + hashSync), Reveal, ButtonLink, GithubIcon (lucide has no brand icons), mdx map.

Generated data: `src/content/tools.json` is dumped from the server's `list_tools()` (names, groups by module, annotations, params); `src/content/CHANGELOG.md` is a copy of the root changelog. Refresh both when tools or releases change. Logo/favicon: `src/app/icon.svg` and `public/logo.svg` (user-supplied mark).
