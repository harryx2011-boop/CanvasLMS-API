import { CalendarClock, EyeOff, FileText, GraduationCap, Inbox, MessageSquare, Search, Table2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

const PROMPTS = [
  { icon: CalendarClock, ask: "What's due this week across all my courses?", tool: "get_upcoming_assignments" },
  { icon: GraduationCap, ask: "Show me my current grades.", tool: "get_grades" },
  { icon: FileText, ask: "Summarize the syllabus for ENG101.", tool: "get_syllabus" },
  { icon: Inbox, ask: "List the unread messages in my Canvas inbox.", tool: "list_conversations" },
  { icon: MessageSquare, ask: "Who still owes me a peer review?", tool: "get_peer_review_followup_list" },
  { icon: Table2, ask: "Grade the last five submissions against the rubric.", tool: "grade_with_rubric" },
];

const NOTES = [
  {
    icon: Search,
    term: "Course names",
    def: 'Say "Physics" instead of an id. Course codes, partial names, and SIS ids all resolve.',
  },
  {
    icon: Table2,
    term: "Markdown out",
    def: "Every tool answers in tables and lists your assistant can quote, never raw JSON.",
  },
  {
    icon: EyeOff,
    term: "Anonymization",
    def: "One setting swaps student names for stable per-course pseudonyms in every tool.",
  },
];

export function Usage() {
  return (
    <Section id="usage" eyebrow="In practice" icon={MessageSquare} title="Ask in your own words" weight="standard">
      <ul className="grid grid-cols-[minmax(0,1fr)] gap-x-10 sm:grid-cols-2">
        {PROMPTS.map((prompt, i) => (
          <Reveal key={prompt.tool} delay={i * 100}>
            <li className="flex items-start gap-3 border-b border-border py-4">
              <prompt.icon className="mt-0.5 size-4 shrink-0 text-muted" strokeWidth={1.5} aria-hidden="true" />
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-pretty text-sm leading-snug">&ldquo;{prompt.ask}&rdquo;</span>
                <span className="truncate font-mono text-xs text-accent">{prompt.tool}</span>
              </span>
            </li>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={200}>
        <dl className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 sm:grid-cols-3">
          {NOTES.map((note) => (
            <div key={note.term}>
              <dt className="flex items-center gap-2 text-sm font-semibold tracking-[-0.01em]">
                <note.icon className="size-4 text-accent" strokeWidth={1.5} aria-hidden="true" />
                {note.term}
              </dt>
              <dd className="mt-2 text-pretty text-sm leading-relaxed text-secondary">{note.def}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
