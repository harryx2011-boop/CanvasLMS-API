"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Wrench, Sparkles, ScrollText } from "lucide-react";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { GithubIcon } from "./github-icon";
import { ButtonLink } from "./button-link";

const icons = {
  "/tools": Wrench,
  "/skills": Sparkles,
  "/changelog": ScrollText,
} as const;

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-[-0.01em] transition-opacity duration-150 ease-out hover:opacity-80"
        >
          <Image src="/logo.svg" alt="" width={22} height={22} priority />
          <span>{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = icons[item.href as keyof typeof icons];
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex items-center gap-1.5 rounded-control px-2.5 py-1.5 text-sm transition-[color,background-color] duration-150 ease-out hover:bg-surface-raised hover:text-foreground ${
                  active ? "text-foreground" : "text-secondary"
                }`}
              >
                {Icon ? <Icon className="size-3.5" strokeWidth={1.5} aria-hidden="true" /> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={site.repo}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="inline-flex size-9 items-center justify-center rounded-control text-secondary transition-[color,background-color,scale] duration-150 ease-out hover:bg-surface-raised hover:text-foreground active:scale-[0.96]"
          >
            <GithubIcon className="size-4" />
          </a>
          <ThemeToggle />
          <div className="ml-2 hidden md:block">
            <ButtonLink href="/#install" variant="primary">
              Install
            </ButtonLink>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-1 inline-flex size-9 items-center justify-center rounded-control text-secondary transition-[color,background-color,scale] duration-150 ease-out hover:bg-surface-raised hover:text-foreground active:scale-[0.96] md:hidden"
          >
            {open ? (
              <X className="size-4" strokeWidth={1.5} />
            ) : (
              <Menu className="size-4" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col px-3 py-2">
            {nav.map((item) => {
              const Icon = icons[item.href as keyof typeof icons];
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2.5 rounded-control px-3 py-2.5 text-sm font-medium text-foreground transition-colors duration-150 ease-out hover:bg-surface-raised"
                >
                  {Icon ? <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" /> : null}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
