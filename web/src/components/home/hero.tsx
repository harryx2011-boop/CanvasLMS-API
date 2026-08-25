import { ArrowUpRight, Plug } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { GithubIcon } from "@/components/github-icon";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";
import { TerminalDemo } from "./terminal-demo";

export function Hero() {
  return (
    <section className="py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
                <Plug className="size-4" strokeWidth={1.5} />
                MCP server for Canvas LMS · v{site.version}
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
                Ask your AI what&apos;s due. It actually knows.
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-muted">
                A local MCP server that hands Claude, Cursor, and other assistants your real Canvas account &mdash;
                {" "}{site.toolCount} tools, your own token, nothing leaves your machine.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-8">
                <div className="flex flex-wrap items-center gap-3">
                  <ButtonLink href="#install" variant="primary">
                    Install it
                  </ButtonLink>
                  <ButtonLink href={site.repo} external variant="secondary">
                    <GithubIcon className="size-4" />
                    View on GitHub
                    <ArrowUpRight className="size-4" strokeWidth={1.5} />
                  </ButtonLink>
                </div>
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
