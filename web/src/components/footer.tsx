import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5 font-semibold tracking-tight">
            <Image src="/logo.svg" alt="" width={24} height={24} />
            <span>{site.name}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            A local MCP server for Canvas LMS. Runs on your machine with your own token. MIT licensed.
          </p>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm sm:grid-cols-3">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <a href={site.repo} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-foreground">
            GitHub
          </a>
          <a href={`${site.repo}/blob/main/LICENSE`} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-foreground">
            MIT license
          </a>
          <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-foreground">
            {site.email}
          </a>
        </nav>
      </div>
    </footer>
  );
}
