import type { Metadata } from "next";
import { Container } from "@/components/container";
import { site } from "@/lib/site";
import Changelog from "@/content/CHANGELOG.md";

export const metadata: Metadata = {
  title: "Changelog",
};

export default function ChangelogPage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-semibold leading-tight tracking-tight">Changelog</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Every notable change to {site.name}, in one place. Full history lives on{" "}
          <a href={`${site.repo}/releases`} target="_blank" rel="noreferrer" className="text-accent underline underline-offset-4 hover:text-accent-hover">
            GitHub releases
          </a>
          .
        </p>
      </div>

      <div className="prose-docs mt-10 max-w-2xl [&>h1:first-child]:hidden">
        <Changelog />
      </div>
    </Container>
  );
}
