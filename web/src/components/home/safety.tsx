import { Eye, KeyRound, ShieldCheck, UserLock } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

const PREVIEW = `## Preview: reply to entry 8841 in "Unit 1: Sources"

- course:       Pre-AP World History
- replying to:  J. Ortega, Aug 22
- your message: I agree with your second point about ...

Nothing was changed. Call again with confirm=true to execute.`;

const POINTS = [
  {
    icon: Eye,
    title: "Nothing changes without a second call",
    body: "Write tools return a preview and stop. Canvas is untouched until you send confirm=true.",
  },
  {
    icon: KeyRound,
    title: "Your token never leaves the machine",
    body: "The server runs locally and talks to Canvas directly. No proxy, no relay, no account with us.",
  },
  {
    icon: UserLock,
    title: "It can only do what you can",
    body: "Every call runs as the token owner, so a student token stays inside a student's own permissions.",
  },
];

export function Safety() {
  return (
    <Section
      id="safety"
      eyebrow="How it stays safe"
      icon={ShieldCheck}
      title="It shows you the edit before it makes it"
      weight="pivotal"
      className="border-y border-border bg-surface/40"
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        <Reveal>
          <ul className="space-y-7">
            {POINTS.map((point) => (
              <li key={point.title} className="flex gap-3.5">
                <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-control border border-border bg-surface text-accent">
                  <point.icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-pretty font-semibold leading-snug tracking-[-0.01em]">{point.title}</h3>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-secondary">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={100} className="min-w-0">
          <CodeBlock code={PREVIEW} title="reply_to_discussion_entry · confirm=false" />
        </Reveal>
      </div>
    </Section>
  );
}
