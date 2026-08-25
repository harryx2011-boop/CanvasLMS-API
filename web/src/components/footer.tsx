import Link from "next/link";
import Image from "next/image";
import { Mail, Scale, ScrollText, Sparkles, Wrench } from "lucide-react";
import { nav, site } from "@/lib/site";
import { GithubIcon } from "./github-icon";

const icons = {
  "/tools": Wrench,
  "/skills": Sparkles,
  "/changelog": ScrollText,
} as const;

const linkClass =
  "inline-flex items-center gap-2 text-sm text-secondary transition-colors duration-150 ease-out hover:text-foreground";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-[-0.01em]">
            <Image src="/logo.svg" alt="" width={22} height={22} />
            <span>{site.name}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-secondary">
            A local MCP server for Canvas LMS. Runs on your machine with your own token. MIT licensed.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-2">
          {nav.map((item) => {
            const Icon = icons[item.href as keyof typeof icons];
            return (
              <Link key={item.href} href={item.href} className={linkClass}>
                {Icon ? <Icon className="size-3.5 text-muted" strokeWidth={1.5} aria-hidden="true" /> : null}
                {item.label}
              </Link>
            );
          })}
          <a href={site.repo} target="_blank" rel="noreferrer" className={linkClass}>
            <GithubIcon className="size-3.5 text-muted" />
            GitHub
          </a>
          <a href={`${site.repo}/blob/main/LICENSE`} target="_blank" rel="noreferrer" className={linkClass}>
            <Scale className="size-3.5 text-muted" strokeWidth={1.5} aria-hidden="true" />
            MIT license
          </a>
          <a href={`mailto:${site.email}`} className={linkClass}>
            <Mail className="size-3.5 text-muted" strokeWidth={1.5} aria-hidden="true" />
            Email
          </a>
        </nav>
      </div>
    </footer>
  );
}
