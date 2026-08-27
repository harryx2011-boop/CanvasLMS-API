# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.1.0] - 2026-08-27

### Added

- Shared-secret authentication for the HTTP transport (`CANVAS_MCP_AUTH_TOKEN`), accepted either as an `Authorization: Bearer` header or as an `/s/<token>` URL path prefix. The path form exists for claude.ai custom connectors, whose setup dialog takes a URL and nothing else.
- `CANVAS_MCP_ALLOWED_HOSTS` and `--allowed-host` to name the hostnames a tunnel or reverse proxy puts in the `Host` header. Setting either turns on Host/Origin validation, which FastMCP leaves off by default.
- README instructions for connecting the server to Claude on the web through a tunnel.

### Changed

- `--transport http` refuses to start when it would listen beyond localhost without `CANVAS_MCP_AUTH_TOKEN` set. Unauthenticated loopback serving is unchanged.
- `--config` reports whether an HTTP auth token is set, masked, along with the allowed hosts.

## [1.0.0] - 2026-08-24

### Added

- Initial release of CanvasLMS - API, an MCP server exposing a Canvas LMS account as roughly 100 tools over stdio or HTTP transport.
- Course, assignment, grading, rubric, discussion, module, page, file, messaging, peer review, people/privacy, accessibility, and course-copy tool groups.
- Confirm-gated write tools: every tool that changes Canvas previews the change and requires `confirm=true` to apply it.
- Flexible course identifiers: numeric id, course code, partial course name, or `sis_course_id:X`.
- Course-resolution caching with configurable TTL, plus `get_cache_status` and `clear_cache`.
- Optional student anonymization (`CANVAS_ANONYMIZE_STUDENTS`) with a stable per-course pseudonym and `export_anonymization_map`.
- CLI with `--test`, `--config`, `--list-tools`, `--transport`, `--host`, `--port`, and `--version`.
- Markdown output for every tool.
- Test suite (pytest, pytest-asyncio, respx) and ruff linting.
- Docker image with `canvaslms-api` entrypoint.
