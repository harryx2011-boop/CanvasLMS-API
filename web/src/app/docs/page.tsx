import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Reveal } from "@/components/reveal";
import { OsTabs } from "@/components/docs/os-tabs";
import { ClientTabs } from "@/components/docs/client-tabs";
import { clientTabs, osPanels } from "@/components/install/panels";

export const metadata: Metadata = {
  title: "Docs",
  description: "Install Canvas Connect and connect it to your MCP client.",
};

const toc = [
  { href: "#install", label: "Install" },
  { href: "#connect", label: "Connect" },
];

export default function DocsPage() {
  return (
    <>
      <Container className="pt-16 sm:pt-24">
        <Reveal>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight">Documentation</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
            Install Canvas Connect, point an MCP client at it, and run it with your own Canvas token.
          </p>
        </Reveal>
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {toc.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full bg-subtle px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent-soft"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>

      <Container className="max-w-3xl py-16 sm:py-24">
        <section id="install" className="scroll-mt-24">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight">Install</h2>
          <ul className="mt-4 list-disc space-y-1.5 pl-5 text-base leading-relaxed text-muted">
            <li>Python 3.11 or newer</li>
            <li>A Canvas account with a personal access token</li>
            <li>
              <span className="font-medium text-foreground">uv</span> recommended for environment and package
              management
            </li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Get a token in Canvas under <span className="font-medium text-foreground">Account &gt; Settings &gt;
            Approved Integrations &gt; New Access Token</span>. Copy it once; Canvas will not show it again. If the
            button is missing, your school has disabled personal access tokens for your account.
          </p>
          <div className="mt-8">
            <OsTabs panels={osPanels} />
          </div>
        </section>

        <section id="connect" className="mt-16 scroll-mt-24 sm:mt-24">
          <h2 className="text-2xl font-semibold leading-tight tracking-tight">Connect</h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Every client points at the same executable. The server reads{" "}
            <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">.env</code> from
            the repository folder at startup, so no environment variables go in the client configuration.
          </p>
          <div className="mt-8">
            <ClientTabs tabs={clientTabs} />
          </div>
        </section>
      </Container>
    </>
  );
}
