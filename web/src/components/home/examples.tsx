import { MessageSquare } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

const EXAMPLES = [
  {
    prompt: "Show my Physics grades",
    tool: "get_grades(course=\"Physics\")",
    response: `## Physics 1 Honors

- **current score:** 96.4
- **final score:** 54.6

| assignment | due | score |
| --- | --- | --- |
| Motion Lab A-F | Thu Aug 20 | 5 / 5 |
| Savvas Textbook | Sun Aug 23 | 1 / 1 |
| Brochure Investigation 1 | Tue Aug 25 | 4 / 5 |`,
    note: null,
  },
  {
    prompt: "Reply to the Unit 1 discussion saying I agree with the second point and add an example",
    tool: "reply_to_discussion_entry(...) · confirm=false",
    response: `## Preview: reply to entry 8841 in "Unit 1: Sources"

- **course:** Pre-AP World History
- **replying to:** J. Ortega, Aug 22
- **your message:** I agree with your second point about ...

**Nothing was changed.** Call this tool again with \`confirm=true\` to execute.`,
    note: null,
  },
  {
    prompt: "Who hasn't submitted Assignment 3?",
    tool: 'list_submissions(course="BADM 350", assignment_id=3, status="unsubmitted")',
    response: `| student | status | due | late |
| --- | --- | --- | --- |
| Student_4f9a12c1 | not submitted | Fri Aug 21 | yes |
| Student_b17e0d55 | not submitted | Fri Aug 21 | yes |
| Student_e03c77aa | not submitted | Fri Aug 21 | yes |`,
    note: "Names shown as hashes because CANVAS_ANONYMIZE_STUDENTS=true.",
  },
];

export function Examples() {
  return (
    <Section
      id="examples"
      eyebrow="In practice"
      title="Real prompts, real answers"
      className="border-t border-border"
    >
      <div className="flex flex-col gap-6">
        {EXAMPLES.map((example, i) => (
          <Reveal key={example.prompt} delay={i * 60}>
            <div className="rounded-card border border-border bg-card p-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
                <div className="flex items-start gap-2">
                  <MessageSquare className="mt-1 size-4 shrink-0 text-muted" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-muted">You</p>
                    <p className="mt-1 text-lg font-medium leading-tight">{example.prompt}</p>
                  </div>
                </div>
                <CodeBlock code={example.response} title={example.tool} />
              </div>
              {example.note ? <p className="mt-4 text-sm text-muted">{example.note}</p> : null}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
