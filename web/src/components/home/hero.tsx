import { ArrowUpRight, Plug } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { GithubIcon } from "@/components/github-icon";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { TerminalDemo } from "./terminal-demo";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(60%_100%_at_50%_100%,var(--accent)_0%,transparent_70%)] opacity-[0.07]"
      />
      <Container className="relative">
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-medium text-secondary">
                <Plug className="size-3.5 text-accent" strokeWidth={2} aria-hidden="true" />
                MCP server for Canvas LMS
                <span className="text-muted">v{site.version}</span>
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
                Ask your AI what&apos;s due. It actually knows.
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-lg text-pretty leading-relaxed text-secondary">
                A local MCP server that hands Claude, Cursor, and other assistants your real Canvas account.{" "}
                {site.toolCount} tools, your own token, nothing leaves your machine.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8 flex flex-wrap items-center gap-2.5">
                <ButtonLink href="#install" variant="primary">
                  Install it
                </ButtonLink>
                <ButtonLink href={site.repo} external variant="secondary">
                  <GithubIcon className="size-4" />
                  View on GitHub
                  <ArrowUpRight className="size-3.5 text-muted" strokeWidth={1.5} />
                </ButtonLink>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200} className="min-w-0">
            <TerminalDemo />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
