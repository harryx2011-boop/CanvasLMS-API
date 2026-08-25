import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { GithubIcon } from "@/components/github-icon";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="border-t border-border py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-balance text-2xl font-semibold leading-tight tracking-[-0.02em] sm:text-[2rem]">
              Ask it what&rsquo;s due tonight.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-secondary">
              Free and MIT licensed. Install it once and every assistant you use gets the same {site.toolCount} tools.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              <ButtonLink href="#install" variant="primary">
                Install it
              </ButtonLink>
              <ButtonLink href={site.repo} external variant="secondary">
                <GithubIcon className="size-4" />
                View on GitHub
                <ArrowUpRight className="size-3.5 text-muted" strokeWidth={1.5} />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
