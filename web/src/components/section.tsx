import type { ReactNode } from "react";
import { Container } from "./container";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, lead, children, className = "" }: Props) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-24 ${className}`}>
      <Container>
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.08em] text-accent">{eyebrow}</p>
          ) : null}
          <h2 className="text-2xl font-semibold leading-tight tracking-tight sm:text-4xl">{title}</h2>
          {lead ? <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{lead}</p> : null}
        </div>
        <div className="mt-10 sm:mt-14">{children}</div>
      </Container>
    </section>
  );
}
