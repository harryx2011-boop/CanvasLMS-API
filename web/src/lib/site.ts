export const site = {
  name: "Canvas Connect",
  packageName: "canvaslms-api",
  tagline: "Ask your AI what's due. It actually knows.",
  description:
    "Canvas Connect is a local MCP server that puts your Canvas LMS account in front of Claude, Cursor, and other AI assistants. 100 tools, preview-then-confirm writes, your own token.",
  url: "https://canvaslms-api.vercel.app",
  repo: "https://github.com/harryx2011-boop/CanvasLMS-API",
  email: "harryx2011@gmail.com",
  toolCount: 100,
  version: "1.0.0",
} as const;

export const nav = [
  { href: "/tools", label: "Tools" },
  { href: "/skills", label: "Skills" },
  { href: "/changelog", label: "Changelog" },
] as const;

export type OS = "windows" | "macos" | "linux";

export const osLabels: Record<OS, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
};

export const paths: Record<OS, { bin: string; activate: string; sep: string }> = {
  windows: {
    bin: "C:\path\to\CanvasLMS-API\.venv\Scripts\canvaslms-api.exe",
    activate: ".venv\Scripts\activate",
    sep: "\\",
  },
  macos: {
    bin: "/path/to/CanvasLMS-API/.venv/bin/canvaslms-api",
    activate: "source .venv/bin/activate",
    sep: "/",
  },
  linux: {
    bin: "/path/to/CanvasLMS-API/.venv/bin/canvaslms-api",
    activate: "source .venv/bin/activate",
    sep: "/",
  },
};
