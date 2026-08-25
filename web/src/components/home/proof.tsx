import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { ButtonLink } from "@/components/button-link";
import tools from "@/content/tools.json";

type ToolRecord = { group: string; readOnly: boolean; confirm: boolean };

const all = tools as ToolRecord[];

const counts = all.reduce<Record<string, number>>((acc, tool) => {
  acc[tool.group] = (acc[tool.group] ?? 0) + 1;
  return acc;
}, {});

const groups = Object.entries(counts).sort((a, b) => b[1] - a[1]);

const STATS = [
  { figure: String(all.length), label: "tools" },
  { figure: String(groups.length), label: "areas of Canvas" },
  { figure: String(all.filter((t) => t.readOnly).length), label: "read-only" },
  { figure: String(all.filter((t) => t.confirm).length), label: "confirm-gated writes" },
];

export function Proof() {
  return (
    <Section
      id="coverage"
      eyebrow="Coverage"
      title="Every part of Canvas you actually touch"
      weight="standard"
      className="border-t border-border"
    >
      <Reveal>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-b border-border pb-10 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                  {stat.figure}
                </span>
                <span className="mt-2 block text-sm leading-snug text-muted">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={100}>
        <ul className="mt-10 grid gap-x-8 sm:grid-cols-2">
          {groups.map(([group, count]) => (
            <li
              key={group}
              className="flex items-baseline justify-between gap-4 border-b border-border py-3 text-sm"
            >
              <span className="text-foreground">{group}</span>
              <span className="shrink-0 font-mono text-xs tabular-nums text-muted">{count}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-10">
          <ButtonLink href="/tools" variant="secondary">
            Browse every tool
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
