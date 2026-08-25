import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded-[6px] border border-border bg-subtle px-1.5 py-0.5 font-mono text-xs">{children}</code>
  );
}

const CARDS = [
  {
    title: "Course identifiers",
    body: (
      <>
        <p>
          Any <Mono>course</Mono> argument accepts a numeric Canvas id, a course code like <Mono>ENG101</Mono>, part of
          the course name, or <Mono>sis_course_id:X</Mono> for a SIS-mapped id.
        </p>
        <p className="mt-3">
          If you are not sure which course you want, call <Mono>list_courses</Mono> first and read the id off the
          result.
        </p>
      </>
    ),
  },
  {
    title: "The confirm gate",
    body: (
      <p>
        Every tool that changes Canvas takes a <Mono>confirm: bool = false</Mono> argument. Called without it, the tool
        previews what would change and makes no request that alters Canvas. Call it again with <Mono>confirm=true</Mono>{" "}
        after reviewing the preview. Nothing changes in Canvas by accident.
      </p>
    ),
  },
  {
    title: "Permissions",
    body: (
      <p>
        Every tool runs as the token owner. A student token cannot see other students&apos; private data or use educator
        tools such as grading or bulk messaging. Those calls return the Canvas 403 with a hint about what permission is
        missing.
      </p>
    ),
  },
  {
    title: "Output and anonymization",
    body: (
      <p>
        Every tool returns Markdown, formatted for direct display in a chat transcript. When{" "}
        <Mono>CANVAS_ANONYMIZE_STUDENTS=true</Mono>, student names are replaced with a stable per-course pseudonym
        instead of their real name.
      </p>
    ),
  },
];

const PROMPTS = [
  "What's due this week across all my courses?",
  "Show me my current grades.",
  "List the unread messages in my Canvas inbox.",
  "Summarize the syllabus for ENG101.",
  "Grade the last five submissions for Assignment 3 against the rubric (preview only).",
  "Who on my peer review list still owes me a review?",
];

export function Usage() {
  return (
    <Section id="usage" eyebrow="Usage" title="How the tools behave" className="border-t border-border">
      <div className="grid gap-6 sm:grid-cols-2">
        {CARDS.map((card, i) => (
          <Reveal key={card.title} delay={i * 60}>
            <div className="h-full rounded-card border border-border bg-card p-6">
              <h3 className="text-base font-semibold leading-tight tracking-tight">{card.title}</h3>
              <div className="mt-3 text-sm leading-relaxed text-muted">{card.body}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={240}>
        <div className="mt-10">
          <h3 className="text-xl font-semibold leading-tight tracking-tight">Example prompts</h3>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {PROMPTS.map((prompt) => (
              <li key={prompt} className="text-sm leading-relaxed text-muted">
                &ldquo;{prompt}&rdquo;
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
