"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";
import { GithubIcon } from "./github-icon";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <Image src="/logo.svg" alt="" width={28} height={28} priority />
          <span>{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-control px-3 py-2 text-sm font-medium transition-colors hover:bg-subtle hover:text-foreground ${
                  active ? "text-foreground" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.repo}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="inline-flex size-10 items-center justify-center rounded-control text-muted transition-[color,background-color,scale] duration-150 ease-out hover:bg-subtle hover:text-foreground active:scale-[0.96]"
          >
            <GithubIcon className="size-4" />
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-1 inline-flex size-10 items-center justify-center rounded-control text-muted transition-[color,background-color,scale] duration-150 ease-out hover:bg-subtle hover:text-foreground active:scale-[0.96] md:hidden"
          >
            {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" aria-label="Primary" className="border-t border-border bg-background md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col px-3 py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-control px-3 py-3 text-base font-medium text-foreground hover:bg-subtle"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
