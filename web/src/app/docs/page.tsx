import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { CodeBlock } from "@/components/code-block";
import { OsTabs } from "@/components/docs/os-tabs";
import { ClientTabs, type ClientTabDef } from "@/components/docs/client-tabs";
import Configuration from "@/content/docs/configuration.mdx";
import Usage from "@/content/docs/usage.mdx";
import Troubleshooting from "@/content/docs/troubleshooting.mdx";

export const metadata: Metadata = {
  title: "Docs",
  description: "Install Canvas Connect, connect it to your MCP client, and configure it.",
};

const toc = [
  { href: "#install", label: "Install" },
  { href: "#connect", label: "Connect" },
  { href: "#configuration", label: "Configuration" },
  { href: "#usage", label: "Usage" },
  { href: "#troubleshooting", label: "Troubleshooting" },
];

const osPanels = {
  windows: (
    <div className="space-y-4">
      <CodeBlock
        title="clone"
        code={["git clone https://github.com/harryx2011-boop/CanvasLMS-API.git", "cd CanvasLMS-API"].join("\n")}
      />
      <CodeBlock
        title="install (uv)"
        code={["uv venv .venv", "uv pip install --python .venv\\Scripts\\python.exe -e ."].join("\n")}
      />
      <details className="rounded-card border border-border bg-card p-4">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          Prefer plain pip? Use a standard virtual environment instead
        </summary>
        <div className="mt-4">
          <CodeBlock
            title="install (pip)"
            code={["python -m venv .venv", ".venv\\Scripts\\activate", "pip install -e ."].join("\n")}
          />
        </div>
      </details>
      <CodeBlock title="env file" code={["copy .env.example .env"].join("\n")} />
      <p className="text-sm leading-relaxed text-muted">
        Edit <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">.env</code> and
        set <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">CANVAS_URL</code>{" "}
        and <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">CANVAS_TOKEN</code>.
      </p>
      <CodeBlock title="verify" code=".venv\Scripts\canvaslms-api.exe --test" />
    </div>
  ),
  macos: (
    <div className="space-y-4">
      <CodeBlock
        title="clone"
        code={["git clone https://github.com/harryx2011-boop/CanvasLMS-API.git", "cd CanvasLMS-API"].join("\n")}
      />
      <CodeBlock title="install (uv)" code={["uv venv .venv", "uv pip install -e ."].join("\n")} />
      <details className="rounded-card border border-border bg-card p-4">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          Prefer plain pip? Use a standard virtual environment instead
        </summary>
        <div className="mt-4">
          <CodeBlock
            title="install (pip)"
            code={["python -m venv .venv", "source .venv/bin/activate", "pip install -e ."].join("\n")}
          />
        </div>
      </details>
      <CodeBlock title="env file" code={["cp .env.example .env"].join("\n")} />
      <p className="text-sm leading-relaxed text-muted">
        Edit <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">.env</code> and
        set <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">CANVAS_URL</code>{" "}
        and <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">CANVAS_TOKEN</code>.
      </p>
      <CodeBlock title="verify" code=".venv/bin/canvaslms-api --test" />
    </div>
  ),
  linux: (
    <div className="space-y-4">
      <CodeBlock
        title="clone"
        code={["git clone https://github.com/harryx2011-boop/CanvasLMS-API.git", "cd CanvasLMS-API"].join("\n")}
      />
      <CodeBlock title="install (uv)" code={["uv venv .venv", "uv pip install -e ."].join("\n")} />
      <details className="rounded-card border border-border bg-card p-4">
        <summary className="cursor-pointer text-sm font-medium text-foreground">
          Prefer plain pip? Use a standard virtual environment instead
        </summary>
        <div className="mt-4">
          <CodeBlock
            title="install (pip)"
            code={["python -m venv .venv", "source .venv/bin/activate", "pip install -e ."].join("\n")}
          />
        </div>
      </details>
      <CodeBlock title="env file" code={["cp .env.example .env"].join("\n")} />
      <p className="text-sm leading-relaxed text-muted">
        Edit <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">.env</code> and
        set <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">CANVAS_URL</code>{" "}
        and <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">CANVAS_TOKEN</code>.
      </p>
      <CodeBlock title="verify" code=".venv/bin/canvaslms-api --test" />
    </div>
  ),
};

const jsonConfig = (command: string) =>
  `{\n  "mcpServers": {\n    "canvaslms-api": {\n      "command": "${command}"\n    }\n  }\n}`;

const clientTabs: ClientTabDef[] = [
  {
    id: "claude-code",
    label: "Claude Code",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-muted">
          Register the server once with the Claude Code CLI. Use the absolute path to the executable inside{" "}
          <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">.venv</code>.
        </p>
        <CodeBlock
          title="Windows"
          code='claude mcp add --scope user canvaslms-api -- "C:\path\to\CanvasLMS-API\.venv\Scripts\canvaslms-api.exe"'
        />
        <CodeBlock
          title="macOS / Linux"
          code='claude mcp add --scope user canvaslms-api -- "/path/to/CanvasLMS-API/.venv/bin/canvaslms-api"'
        />
        <p className="text-sm leading-relaxed text-muted">
          Restart Claude Code, since servers load at session start, then check{" "}
          <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">/mcp</code>. List
          registered servers with{" "}
          <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">
            claude mcp list
          </code>
          , and remove this one with{" "}
          <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">
            claude mcp remove canvaslms-api --scope user
          </code>
          .
        </p>
        <p className="text-sm leading-relaxed text-muted">
          The server reads <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">.env</code> from
          the repository folder, so no environment variables are needed in the client configuration.
        </p>
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
            Windows:{" "}
            <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">
              %APPDATA%\Claude\claude_desktop_config.json
            </code>
          </li>
          <li>
            macOS:{" "}
            <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">
              ~/Library/Application Support/Claude/claude_desktop_config.json
            </code>
          </li>
        </ul>
        <CodeBlock title="Windows" code={jsonConfig("C:\\path\\to\\CanvasLMS-API\\.venv\\Scripts\\canvaslms-api.exe")} />
        <CodeBlock title="macOS / Linux" code={jsonConfig("/path/to/CanvasLMS-API/.venv/bin/canvaslms-api")} />
        <p className="text-sm leading-relaxed text-muted">
          Fully quit and reopen Claude Desktop after editing. The server reads{" "}
          <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">.env</code> from
          the repository folder, so no environment variables are needed here.
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
          Add the server to{" "}
          <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">.cursor/mcp.json</code> in
          a project, or{" "}
          <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">~/.cursor/mcp.json</code>{" "}
          to make it available globally.
        </p>
        <CodeBlock title="Windows" code={jsonConfig("C:\\path\\to\\CanvasLMS-API\\.venv\\Scripts\\canvaslms-api.exe")} />
        <CodeBlock title="macOS / Linux" code={jsonConfig("/path/to/CanvasLMS-API/.venv/bin/canvaslms-api")} />
        <p className="text-sm leading-relaxed text-muted">
          The server reads <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">.env</code> from
          the repository folder, so no environment variables are needed in the client configuration.
        </p>
      </div>
    ),
  },
  {
    id: "windsurf",
    label: "Windsurf",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-muted">
          Add the server to{" "}
          <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">
            ~/.codeium/windsurf/mcp_config.json
          </code>
          .
        </p>
        <CodeBlock title="Windows" code={jsonConfig("C:\\path\\to\\CanvasLMS-API\\.venv\\Scripts\\canvaslms-api.exe")} />
        <CodeBlock title="macOS / Linux" code={jsonConfig("/path/to/CanvasLMS-API/.venv/bin/canvaslms-api")} />
        <p className="text-sm leading-relaxed text-muted">
          The server reads <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">.env</code> from
          the repository folder, so no environment variables are needed in the client configuration.
        </p>
      </div>
    ),
  },
  {
    id: "codex",
    label: "Codex",
    content: (
      <div className="space-y-4">
        <p className="text-sm leading-relaxed text-muted">
          Add a server entry to{" "}
          <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">~/.codex/config.toml</code>.
        </p>
        <CodeBlock
          title="Windows"
          code={[
            "[mcp_servers.canvaslms-api]",
            'command = "C:\\path\\to\\CanvasLMS-API\\.venv\\Scripts\\canvaslms-api.exe"',
          ].join("\n")}
        />
        <CodeBlock
          title="macOS / Linux"
          code={["[mcp_servers.canvaslms-api]", 'command = "/path/to/CanvasLMS-API/.venv/bin/canvaslms-api"'].join(
            "\n",
          )}
        />
        <p className="text-sm leading-relaxed text-muted">
          The server reads <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">.env</code> from
          the repository folder, so no environment variables are needed in the client configuration.
        </p>
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
          Point any streamable-HTTP client at{" "}
          <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">
            http://127.0.0.1:7100/mcp
          </code>
          .
        </p>
        <CodeBlock title="Docker build" code="docker build -t canvaslms-api ." />
        <CodeBlock
          title="Docker run (stdio)"
          code="docker run --rm -i -e CANVAS_URL -e CANVAS_TOKEN canvaslms-api"
        />
        <CodeBlock
          title="Docker run (HTTP)"
          code="docker run --rm -p 7100:7100 -e CANVAS_URL -e CANVAS_TOKEN canvaslms-api --transport http --host 0.0.0.0 --port 7100"
        />
      </div>
    ),
  },
];

export default function DocsPage() {
  return (
    <>
      <Container className="pt-16 sm:pt-24">
        <Reveal>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight">Documentation</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Install Canvas Connect, point an MCP client at it, and configure it with your own Canvas token.
          </p>
        </Reveal>
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {toc.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full bg-subtle px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent-soft"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>

      <Container className="max-w-3xl py-16 sm:py-24">
        <section id="install" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight">Install</h2>
          <ul className="mt-4 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-muted">
            <li>Python 3.11 or newer</li>
            <li>A Canvas account with a personal access token</li>
            <li>
              <span className="font-medium text-foreground">uv</span> recommended for environment and package
              management
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Get a token in Canvas under <span className="font-medium text-foreground">Account &gt; Settings &gt;
            Approved Integrations &gt; New Access Token</span>. Copy it once; Canvas will not show it again. If the
            button is missing, your school has disabled personal access tokens for your account.
          </p>
          <div className="mt-8">
            <OsTabs panels={osPanels} />
          </div>
        </section>

        <section id="connect" className="mt-16 scroll-mt-24 sm:mt-24">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight">Connect</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Every client points at the same executable. The server reads{" "}
            <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">.env</code> from
            the repository folder at startup, so no environment variables go in the client configuration.
          </p>
          <div className="mt-8">
            <ClientTabs tabs={clientTabs} />
          </div>
        </section>

        <section id="configuration" className="mt-16 scroll-mt-24 sm:mt-24">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight">Configuration</h2>
          <div className="prose-docs mt-4">
            <Configuration />
          </div>
        </section>

        <section id="usage" className="mt-16 scroll-mt-24 sm:mt-24">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight">Usage</h2>
          <div className="prose-docs mt-4">
            <Usage />
          </div>
        </section>

        <section id="troubleshooting" className="mt-16 scroll-mt-24 sm:mt-24">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight">Troubleshooting</h2>
          <div className="prose-docs mt-4">
            <Troubleshooting />
          </div>
        </section>
      </Container>
    </>
  );
}
