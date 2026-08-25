import { ArrowRight, Boxes } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
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
      icon={Boxes}
      title="Every part of Canvas you actually touch"
      weight="standard"
    >
      <Reveal>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-surface px-5 py-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-3xl font-semibold tracking-[-0.03em] tabular-nums sm:text-4xl">
                  {stat.figure}
                </span>
                <span className="mt-1.5 block text-xs leading-snug text-muted">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <Reveal delay={100}>
        <ul className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-x-10 sm:grid-cols-2">
          {groups.map(([group, count]) => (
            <li
              key={group}
              className="flex items-baseline justify-between gap-4 border-b border-border py-2.5 text-sm"
            >
              <span className="truncate text-secondary">{group}</span>
              <span className="shrink-0 font-mono text-xs tabular-nums text-muted">{count}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={200}>
        <Link
          href="/tools"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-150 ease-out hover:text-accent-hover"
        >
          Browse every tool
          <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
        </Link>
      </Reveal>
    </Section>
  );
}
