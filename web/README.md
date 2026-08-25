# Canvas Connect (site)

Marketing site for Canvas Connect, the MCP server for Canvas LMS. Next.js 16 (App Router), React 19, Tailwind v4.

## Develop

```bash
npm install
npm run dev
```

Runs on port 4300.

## Build

```bash
npm run build
```

## Deploy

Deployed on Vercel. Import the `harryx2011-boop/CanvasLMS-API` repo, set **Root Directory** to `web`, framework preset **Next.js**, and project name `canvas-connect` (so the deployed URL is `canvas-connect.vercel.app`). Vercel Analytics is already wired in via `@vercel/analytics`, no extra setup needed.

## Content sync

`src/content/tools.json` is generated from the MCP server's `list_tools()` output. `src/content/CHANGELOG.md` is a copy of the root `CHANGELOG.md`. When the server's tool set or changelog changes, regenerate/copy both files into `src/content/` before the next deploy.
