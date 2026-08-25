import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sunrise, CalendarDays, TrendingUp, MessagesSquare, ListChecks, ClipboardCheck, Accessibility, Users } from "lucide-react";
import { Container } from "@/components/container";
import { CodeBlock } from "@/components/code-block";
import { Reveal } from "@/components/reveal";
import { skills, type Skill, type SkillIcon } from "@/content/skills";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Skills",
};

const iconMap: Record<SkillIcon, typeof Sunrise> = {
  Sunrise,
  CalendarDays,
  TrendingUp,
  MessagesSquare,
  ListChecks,
  ClipboardCheck,
  Accessibility,
  Users,
};

const installCode = [
  "git clone https://github.com/harryx2011-boop/CanvasLMS-API.git",
  "cp -r CanvasLMS-API/skills/canvas-daily-check ~/.claude/skills/",
].join("\n");

function SkillCard({ skill, delay }: { skill: Skill; delay: number }) {
  const Icon = iconMap[skill.icon];
  return (
    <Reveal delay={delay}>
      <div className="rounded-card border border-border bg-surface p-6 transition-[border-color,background-color] duration-150 ease-out hover:border-border-strong">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-10 items-center justify-center rounded-control bg-accent-soft text-accent">
            <Icon className="size-5" />
          </div>
          <span className="rounded-full border border-border px-2.5 py-1 text-xs capitalize text-secondary">
            {skill.audience}
          </span>
        </div>

        <h3 className="mt-4 font-mono text-base font-semibold leading-tight tracking-tight">{skill.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-secondary">{skill.summary}</p>

        <div className="mt-4">
          <p className="text-sm font-medium text-foreground">Say:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {skill.triggers.map((trigger) => (
              <span key={trigger} className="rounded-full bg-surface-raised px-2.5 py-1 text-xs text-secondary">
                &ldquo;{trigger}&rdquo;
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-foreground">Uses:</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
            {skill.tools.map((tool) => (
              <Link key={tool} href={`/tools#${tool}`} className="font-mono text-sm text-accent hover:text-accent-hover">
                {tool}
              </Link>
            ))}
          </div>
        </div>

        <a
          href={`${site.repo}/blob/main/skills/${skill.slug}/SKILL.md`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent"
        >
          View SKILL.md
          <ArrowUpRight className="size-4" />
        </a>
      </div>
    </Reveal>
  );
}

export default function SkillsPage() {
  const studentSkills = skills.filter((skill) => skill.audience === "student");
  const educatorSkills = skills.filter((skill) => skill.audience === "educator");

  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">Agent skills</h1>
        <p className="mt-4 text-pretty leading-relaxed text-secondary">
          Eight ready-made workflows that chain the tools for common tasks. Drop a folder into your skills directory
          and trigger it by phrase.
        </p>
      </div>

      <div className="mt-10 max-w-2xl">
        <CodeBlock title="terminal" code={installCode} />
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Copy any folder into <code className="font-mono text-foreground">~/.claude/skills/</code> (global) or{" "}
          <code className="font-mono text-foreground">&lt;project&gt;/.claude/skills/</code> (per project).
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight">For students</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {studentSkills.map((skill, index) => (
            <SkillCard key={skill.slug} skill={skill} delay={index * 60} />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold leading-tight tracking-tight">For educators</h2>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {educatorSkills.map((skill, index) => (
            <SkillCard key={skill.slug} skill={skill} delay={index * 60} />
          ))}
        </div>
      </div>
    </Container>
  );
}
