import { CodeBlock } from "@/components/code-block";
import type { ClientTabDef } from "@/components/install/tabs";
import type { OS } from "@/lib/site";

const REPO = "https://github.com/harryx2011-boop/CanvasLMS-API.git";

function Inline({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-control border border-border bg-surface-raised px-1.5 py-0.5 font-mono text-xs">{children}</code>
  );
}

function EnvNote() {
  return (
    <p className="text-sm leading-relaxed text-muted">
      Edit <Inline>.env</Inline> and set <Inline>CANVAS_URL</Inline> and <Inline>CANVAS_TOKEN</Inline>.
    </p>
  );
}

function PipFallback({ activate }: { activate: string }) {
  return (
    <details className="rounded-card border border-border bg-surface p-4">
      <summary className="cursor-pointer text-sm font-medium text-foreground">
        Prefer plain pip? Use a standard virtual environment instead
      </summary>
      <div className="mt-4">
        <CodeBlock
          title="install (pip)"
          className="rounded-control"
          code={["python -m venv .venv", activate, "pip install -e ."].join("\n")}
        />
      </div>
    </details>
  );
}

const clone = <CodeBlock title="clone" code={[`git clone ${REPO}`, "cd CanvasLMS-API"].join("\n")} />;

export const osPanels: Record<OS, React.ReactNode> = {
  windows: (
    <div className="space-y-4">
      {clone}
      <CodeBlock
        title="install (uv)"
        code={["uv venv .venv", "uv pip install --python .venv\\Scripts\\python.exe -e ."].join("\n")}
      />
      <PipFallback activate=".venv\Scripts\activate" />
      <CodeBlock title="env file" code="copy .env.example .env" />
      <EnvNote />
      <CodeBlock title="verify" code=".venv\Scripts\canvaslms-api.exe --test" />
    </div>
  ),
  macos: (
    <div className="space-y-4">
      {clone}
      <CodeBlock title="install (uv)" code={["uv venv .venv", "uv pip install -e ."].join("\n")} />
      <PipFallback activate="source .venv/bin/activate" />
      <CodeBlock title="env file" code="cp .env.example .env" />
      <EnvNote />
      <CodeBlock title="verify" code=".venv/bin/canvaslms-api --test" />
    </div>
  ),
  linux: (
    <div className="space-y-4">
      {clone}
      <CodeBlock title="install (uv)" code={["uv venv .venv", "uv pip install -e ."].join("\n")} />
      <PipFallback activate="source .venv/bin/activate" />
      <CodeBlock title="env file" code="cp .env.example .env" />
      <EnvNote />
      <CodeBlock title="verify" code=".venv/bin/canvaslms-api --test" />
    </div>
  ),
};

const jsonConfig = (command: string) =>
  `{\n  "mcpServers": {\n    "canvaslms-api": {\n      "command": "${command}"\n    }\n  }\n}`;

const WIN_BIN = "C:\\path\\to\\CanvasLMS-API\\.venv\\Scripts\\canvaslms-api.exe";
const NIX_BIN = "/path/to/CanvasLMS-API/.venv/bin/canvaslms-api";

function DotEnvNote() {
  return (
    <p className="text-sm leading-relaxed text-muted">
      The server reads <Inline>.env</Inline> from the repository folder, so no environment variables are needed in the
      client configuration.
    </p>
  );
}

export const clientTabs: ClientTabDef[] = [
  {
    id: "claude-code",
    label: "Claude Code",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-muted">
          Register the server once with the Claude Code CLI. Use the absolute path to the executable inside{" "}
          <Inline>.venv</Inline>.
        </p>
        <CodeBlock title="Windows" code={`claude mcp add --scope user canvaslms-api -- "${WIN_BIN}"`} />
        <CodeBlock title="macOS / Linux" code={`claude mcp add --scope user canvaslms-api -- "${NIX_BIN}"`} />
        <p className="text-sm leading-relaxed text-muted">
          Restart Claude Code, since servers load at session start, then check <Inline>/mcp</Inline>. List registered
          servers with <Inline>claude mcp list</Inline>, and remove this one with{" "}
          <Inline>claude mcp remove canvaslms-api --scope user</Inline>.
        </p>
        <DotEnvNote />
      </div>
    ),
  },
  {
    id: "claude-desktop",
    label: "Claude Desktop",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-muted">Edit the configuration file for your platform.</p>
        <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted">
          <li>
            Windows: <Inline>{"%APPDATA%\\Claude\\claude_desktop_config.json"}</Inline>
          </li>
          <li>
            macOS: <Inline>~/Library/Application Support/Claude/claude_desktop_config.json</Inline>
          </li>
        </ul>
        <CodeBlock title="Windows" code={jsonConfig(WIN_BIN)} />
        <CodeBlock title="macOS / Linux" code={jsonConfig(NIX_BIN)} />
        <p className="text-sm leading-relaxed text-muted">
          Fully quit and reopen Claude Desktop after editing. The server reads <Inline>.env</Inline> from the repository
          folder, so no environment variables are needed here.
        </p>
      </div>
    ),
  },
  {
    id: "cursor",
    label: "Cursor",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-muted">
          Add the server to <Inline>.cursor/mcp.json</Inline> in a project, or <Inline>~/.cursor/mcp.json</Inline> to
          make it available globally.
        </p>
        <CodeBlock title="Windows" code={jsonConfig(WIN_BIN)} />
        <CodeBlock title="macOS / Linux" code={jsonConfig(NIX_BIN)} />
        <DotEnvNote />
      </div>
    ),
  },
  {
    id: "windsurf",
    label: "Windsurf",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-muted">
          Add the server to <Inline>~/.codeium/windsurf/mcp_config.json</Inline>.
        </p>
        <CodeBlock title="Windows" code={jsonConfig(WIN_BIN)} />
        <CodeBlock title="macOS / Linux" code={jsonConfig(NIX_BIN)} />
        <DotEnvNote />
      </div>
    ),
  },
  {
    id: "codex",
    label: "Codex",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-muted">
          Add a server entry to <Inline>~/.codex/config.toml</Inline>.
        </p>
        <CodeBlock
          title="Windows"
          code={["[mcp_servers.canvaslms-api]", `command = "${WIN_BIN}"`].join("\n")}
        />
        <CodeBlock
          title="macOS / Linux"
          code={["[mcp_servers.canvaslms-api]", `command = "${NIX_BIN}"`].join("\n")}
        />
        <DotEnvNote />
      </div>
    ),
  },
  {
    id: "http",
    label: "HTTP / Docker",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-muted">
          For clients that only speak streamable HTTP, or to run the server in a container, start it with the HTTP
          transport instead of stdio.
        </p>
        <CodeBlock title="HTTP transport" code="canvaslms-api --transport http --host 127.0.0.1 --port 7100" />
        <p className="text-sm leading-relaxed text-muted">
          Point any streamable-HTTP client at <Inline>http://127.0.0.1:7100/mcp</Inline>.
        </p>
        <CodeBlock title="Docker build" code="docker build -t canvaslms-api ." />
        <CodeBlock title="Docker run (stdio)" code="docker run --rm -i -e CANVAS_URL -e CANVAS_TOKEN canvaslms-api" />
        <CodeBlock
          title="Docker run (HTTP)"
          code="docker run --rm -p 7100:7100 -e CANVAS_URL -e CANVAS_TOKEN canvaslms-api --transport http --host 0.0.0.0 --port 7100"
        />
      </div>
    ),
  },
];
