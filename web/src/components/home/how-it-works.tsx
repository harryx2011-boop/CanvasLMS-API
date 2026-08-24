import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CodeBlock } from "@/components/code-block";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

const STEPS = [
  {
    title: "Get a Canvas token",
    description: "Account > Settings > Approved Integrations > New Access Token.",
    code: "CANVAS_URL=https://yourschool.instructure.com\nCANVAS_TOKEN=paste_your_token",
    title2: "env",
  },
  {
    title: "Install and test",
    description: "Clone the repo, create a virtual environment, and run the built-in test.",
    code: "git clone https://github.com/harryx2011-boop/CanvasLMS-API.git\ncd CanvasLMS-API\nuv venv .venv && uv pip install -e .\ncanvaslms-api --test",
    title2: "terminal",
  },
  {
    title: "Connect your assistant",
    description: "Register the server with your MCP-compatible assistant.",
    code: `claude mcp add --scope user canvaslms-api -- "/path/to/CanvasLMS-API/.venv/bin/canvaslms-api"`,
    title2: "terminal",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="How it works"
      title="Three steps, about ten minutes"
      className="border-t border-border"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 60}>
            <div className="flex h-full flex-col rounded-card border border-border bg-card p-6">
              <span className="text-sm font-semibold text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-base font-semibold leading-tight tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              <div className="mt-4">
                <CodeBlock code={step.code} title={step.title2} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={180}>
        <Link
          href="/docs#connect"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Full install guide for Claude Desktop, Cursor, Windsurf, Codex, and HTTP
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
