import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { GithubIcon } from "@/components/github-icon";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export function ClosingCta() {
  return (
    <section className="border-t border-border py-16 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Free, local, MIT licensed.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              Install it once, point it at your Canvas token, and every assistant you use gets the same 100 tools.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href={site.repo} external variant="primary">
                <GithubIcon className="size-4" />
                View on GitHub
              </ButtonLink>
              <ButtonLink href="/docs" variant="secondary">
                Read the docs
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
