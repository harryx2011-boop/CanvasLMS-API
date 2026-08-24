import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-control px-5 text-sm font-medium transition-[transform,background-color,color] duration-200 ease-out hover:-translate-y-0.5";

const variants = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary: "border border-border bg-card text-foreground hover:bg-subtle",
};

export function ButtonLink({ href, children, variant = "primary", external, className = "" }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
