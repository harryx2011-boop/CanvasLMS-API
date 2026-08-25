import { Download, Plug2 } from "lucide-react";
import { ClientTabs, OsTabs } from "@/components/install/tabs";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { clientTabs, osPanels } from "@/components/install/panels";

export function Install() {
  return (
    <Section
      id="install"
      eyebrow="Install"
      icon={Download}
      title="Set it up in about ten minutes"
      lead="Python 3.11 or newer, a Canvas account with a personal access token, and uv for environment management. Get a token under Account > Settings > Approved Integrations > New Access Token; Canvas shows it once."
      weight="pivotal"
      className="border-t border-border"
    >
      <Reveal>
        <OsTabs panels={osPanels} />
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-14">
          <h3 className="flex items-center gap-2 text-lg font-semibold leading-tight tracking-[-0.02em]">
            <Plug2 className="size-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
            Connect your assistant
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-secondary">
            Every client points at the same executable. The server reads{" "}
            <code className="rounded-control border border-border bg-surface-raised px-1.5 py-0.5 font-mono text-xs">
              .env
            </code>{" "}
            from the repository folder at startup, so no environment variables go in the client configuration.
          </p>
          <div className="mt-6">
            <ClientTabs tabs={clientTabs} />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
