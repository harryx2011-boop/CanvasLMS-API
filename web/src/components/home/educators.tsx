import { Check } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

const CAPABILITIES = [
  "Bulk grading with per-student results",
  "Rubric grading and rubric import from CSV",
  "Peer-review completion analytics and follow-ups",
  "Announcement and module management",
  "Accessibility scan and auto-fix for pages",
  "Course copy between terms",
];

export function Educators() {
  return (
    <Section
      id="educators"
      eyebrow="For educators"
      title="The same server, with a teacher token"
      lead="Point Canvas Connect at an instructor account and the same 100 tools cover grading, course setup, and accessibility work across a full roster."
      className="border-t border-border"
    >
      <Reveal>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {CAPABILITIES.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={60}>
        <div className="mt-8">
          <ButtonLink href="/tools" variant="secondary">
            Browse all 100 tools
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
