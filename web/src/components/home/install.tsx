import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { OsTabs } from "@/components/docs/os-tabs";
import { ClientTabs } from "@/components/docs/client-tabs";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { clientTabs, osPanels } from "@/components/install/panels";

export function Install() {
  return (
    <Section
      id="install"
      eyebrow="Install"
      title="Set it up in about ten minutes"
      lead="Python 3.11 or newer, a Canvas account with a personal access token, and uv for environment management. Get a token under Account > Settings > Approved Integrations > New Access Token; Canvas shows it once."
      className="border-t border-border"
    >
      <Reveal>
        <OsTabs panels={osPanels} />
      </Reveal>

      <Reveal delay={60}>
        <div className="mt-14">
          <h3 className="text-xl font-semibold leading-tight tracking-tight">Connect your assistant</h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Every client points at the same executable. The server reads{" "}
            <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">.env</code>{" "}
            from the repository folder at startup, so no environment variables go in the client configuration.
          </p>
          <div className="mt-6">
            <ClientTabs tabs={clientTabs} />
          </div>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <Link
          href="/docs"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
        >
          Full documentation and troubleshooting
          <ArrowRight className="size-4" />
        </Link>
      </Reveal>
    </Section>
  );
}
