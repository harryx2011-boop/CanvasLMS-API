import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { GithubIcon } from "@/components/github-icon";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Ask it what&rsquo;s due tonight.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
              Free and MIT licensed. Install it once and every assistant you use gets the same {site.toolCount} tools.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="#install" variant="primary">
                Install it
              </ButtonLink>
              <ButtonLink href={site.repo} external variant="secondary">
                <GithubIcon className="size-4" />
                View on GitHub
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
