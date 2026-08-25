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
  "inline-flex min-h-9 items-center justify-center gap-2 rounded-control px-4 text-sm font-medium transition-[background-color,border-color,color,scale] duration-150 ease-out active:scale-[0.96]";

const variants = {
  primary: "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary: "border border-border bg-surface text-foreground hover:border-border-strong hover:bg-surface-raised",
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
