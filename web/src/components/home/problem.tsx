import { CircleSlash, CornerDownRight, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

const WITHOUT = [
  "Open Canvas, check six courses one at a time",
  "Copy due dates into whatever you actually plan in",
  "Paste an assignment description into a chat window",
  "Re-paste it tomorrow, because the chat forgot",
];

export function Problem() {
  return (
    <Section
      id="problem"
      eyebrow="The problem"
      icon={CircleSlash}
      title="Your assistant has no idea what you're enrolled in"
      lead="Canvas holds the courses, the deadlines, the rubrics, and the feedback. Your AI assistant holds none of it, so every question starts with you copying context across by hand."
      weight="standard"
    >
      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-card border border-border bg-surface p-6">
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-muted">
              <CircleSlash className="size-3.5" strokeWidth={2} aria-hidden="true" />
              Without it
            </p>
            <ul className="mt-5 space-y-3.5">
              {WITHOUT.map((step) => (
                <li key={step} className="flex items-start gap-2.5 text-sm leading-relaxed text-secondary">
                  <CornerDownRight
                    className="mt-0.5 size-3.5 shrink-0 text-muted"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex h-full flex-col rounded-card border border-accent/25 bg-accent-soft p-6">
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-accent">
              <Sparkles className="size-3.5" strokeWidth={2} aria-hidden="true" />
              With it
            </p>
            <p className="mt-5 text-pretty text-xl font-medium leading-snug tracking-[-0.01em]">
              &ldquo;What&rsquo;s due this week?&rdquo;
            </p>
            <p className="mt-3 text-sm leading-relaxed text-secondary">
              One question. The assistant reads your real enrollment and answers from it.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
