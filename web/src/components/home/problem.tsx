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
      title="Your assistant has no idea what you're enrolled in"
      lead="Canvas holds the courses, the deadlines, the rubrics, and the feedback. Your AI assistant holds none of it, so every question starts with you copying context across by hand."
      weight="standard"
      className="border-t border-border"
    >
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        <Reveal>
          <div className="h-full rounded-card border border-border bg-subtle p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-muted">Without it</p>
            <ul className="mt-5 space-y-3">
              {WITHOUT.map((step) => (
                <li key={step} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-muted/60" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex h-full flex-col justify-center rounded-card border border-accent/30 bg-accent-soft p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.08em] text-accent">With it</p>
            <p className="mt-5 text-pretty text-xl font-medium leading-snug sm:text-2xl">
              &ldquo;What&rsquo;s due this week?&rdquo;
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              One question. The assistant reads your real enrollment and answers from it.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
