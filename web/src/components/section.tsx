import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Container } from "./container";

type Weight = "connective" | "standard" | "pivotal";

type Props = {
  id?: string;
  eyebrow?: string;
  icon?: LucideIcon;
  title?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
  weight?: Weight;
};

const padding: Record<Weight, string> = {
  connective: "py-12 sm:py-16",
  standard: "py-16 sm:py-20",
  pivotal: "py-20 sm:py-24",
};

export function Section({
  id,
  eyebrow,
  icon: Icon,
  title,
  lead,
  children,
  className = "",
  weight = "standard",
}: Props) {
  const header = eyebrow || title || lead;
  return (
    <section id={id} className={`scroll-mt-24 ${padding[weight]} ${className}`}>
      <Container>
        {header ? (
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-accent">
                {Icon ? <Icon className="size-3.5" strokeWidth={2} aria-hidden="true" /> : null}
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="text-pretty text-2xl font-semibold leading-[1.15] tracking-[-0.02em] sm:text-[2rem]">
                {title}
              </h2>
            ) : null}
            {lead ? (
              <p className="mt-4 text-pretty leading-relaxed text-secondary">{lead}</p>
            ) : null}
          </div>
        ) : null}
        <div className={header ? "mt-10 sm:mt-12" : ""}>{children}</div>
      </Container>
    </section>
  );
}
