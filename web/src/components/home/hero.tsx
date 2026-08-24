import { ArrowUpRight, Plug } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { CodeBlock } from "@/components/code-block";
import { GithubIcon } from "@/components/github-icon";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { TerminalDemo } from "./terminal-demo";

const INSTALL_COMMAND = `claude mcp add --scope user canvaslms-api -- "/path/to/CanvasLMS-API/.venv/bin/canvaslms-api"`;

export function Hero() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
                <Plug className="size-4" />
                MCP server for Canvas LMS · v{site.version}
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
                Ask your AI what&apos;s due.
                <br />
                It actually knows.
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                Canvas Connect is a local MCP server that gives Claude, Cursor, and other assistants your Canvas
                account: 100 tools for courses, grades, assignments, discussions, and more. Runs on your machine
                with your own token.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8">
                <ButtonLink href={site.repo} external variant="primary">
                  <GithubIcon className="size-4" />
                  View on GitHub
                  <ArrowUpRight className="size-4" />
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-6 max-w-xl">
                <CodeBlock code={INSTALL_COMMAND} title="terminal" />
              </div>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <TerminalDemo />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
