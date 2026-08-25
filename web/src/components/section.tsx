import type { ReactNode } from "react";
import { Container } from "./container";

type Weight = "connective" | "standard" | "pivotal";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  children: ReactNode;
  className?: string;
  weight?: Weight;
  align?: "start" | "center";
};

const padding: Record<Weight, string> = {
  connective: "py-12 sm:py-16",
  standard: "py-16 sm:py-24",
  pivotal: "py-24 sm:py-32 lg:py-40",
};

export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
  className = "",
  weight = "standard",
  align = "start",
}: Props) {
  const header = eyebrow || title || lead;
  return (
    <section id={id} className={`scroll-mt-24 ${padding[weight]} ${className}`}>
      <Container>
        {header ? (
          <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
            {eyebrow ? (
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.08em] text-accent">{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className="text-pretty text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                {title}
              </h2>
            ) : null}
            {lead ? <p className="mt-4 text-pretty text-base leading-relaxed text-muted sm:text-lg">{lead}</p> : null}
          </div>
        ) : null}
        <div className={header ? "mt-10 sm:mt-14" : ""}>{children}</div>
      </Container>
    </section>
  );
}
