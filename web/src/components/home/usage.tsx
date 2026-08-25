import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

const PROMPTS = [
  { ask: "What's due this week across all my courses?", tool: "get_upcoming_assignments" },
  { ask: "Show me my current grades.", tool: "get_grades" },
  { ask: "Summarize the syllabus for ENG101.", tool: "get_syllabus" },
  { ask: "List the unread messages in my Canvas inbox.", tool: "list_conversations" },
  { ask: "Who on my peer review list still owes me a review?", tool: "get_peer_review_followup_list" },
  { ask: "Grade the last five submissions against the rubric.", tool: "grade_with_rubric" },
];

const NOTES = [
  {
    term: "Course names",
    def: 'Say "Physics" instead of an id. Course codes, partial names, and SIS ids all resolve.',
  },
  {
    term: "Markdown out",
    def: "Every tool answers in tables and lists your assistant can quote, never raw JSON.",
  },
  {
    term: "Anonymization",
    def: "One setting swaps student names for stable per-course pseudonyms in every tool.",
  },
];

export function Usage() {
  return (
    <Section
      id="usage"
      eyebrow="In practice"
      title="Ask in your own words"
      weight="standard"
      className="border-t border-border"
    >
      <ul className="grid gap-x-10 sm:grid-cols-2">
        {PROMPTS.map((prompt, i) => (
          <Reveal key={prompt.tool} delay={i * 100}>
            <li className="flex flex-col gap-1.5 border-b border-border py-4">
              <span className="text-pretty text-base leading-snug">&ldquo;{prompt.ask}&rdquo;</span>
              <span className="font-mono text-xs text-accent">{prompt.tool}</span>
            </li>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={200}>
        <dl className="mt-12 grid gap-8 sm:grid-cols-3">
          {NOTES.map((note) => (
            <div key={note.term}>
              <dt className="text-sm font-semibold tracking-tight">{note.term}</dt>
              <dd className="mt-2 text-pretty text-sm leading-relaxed text-muted">{note.def}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
