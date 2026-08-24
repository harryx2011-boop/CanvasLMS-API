import { EyeOff, FileText, KeyRound, Search, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";

const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: ShieldCheck,
    title: "Preview, then confirm",
    description: "Every write returns a preview and changes nothing until you say confirm=true.",
  },
  {
    icon: Wrench,
    title: "100 tools",
    description: "Courses, assignments, grades, discussions, modules, pages, files, messaging, rubrics, peer reviews, accessibility.",
  },
  {
    icon: Search,
    title: "Plain-name course lookup",
    description: `Say "Physics" instead of a course id; codes, partial names, and SIS ids all resolve.`,
  },
  {
    icon: FileText,
    title: "Markdown answers",
    description: "Tables and lists your assistant can read and quote, not raw JSON.",
  },
  {
    icon: KeyRound,
    title: "Your token stays local",
    description: "The server runs on your machine and talks to Canvas directly; nothing is proxied.",
  },
  {
    icon: EyeOff,
    title: "Anonymization for educators",
    description: "One setting replaces student names with stable hashes in every tool.",
  },
];

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="What you get"
      title="Built for the questions students actually ask"
      className="border-t border-border"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <Reveal key={feature.title} delay={i * 60}>
            <div className="h-full rounded-card border border-border bg-card p-6">
              <div className="flex size-10 items-center justify-center rounded-control bg-accent-soft text-accent">
                <feature.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold leading-tight tracking-tight">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
