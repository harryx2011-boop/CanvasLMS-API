"use client";

import { ChevronDown, Search, SearchX } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Tool } from "@/content/tools.ts";

type Access = "all" | "read" | "write";

const ACCESS_OPTIONS: { id: Access; label: string }[] = [
  { id: "all", label: "All" },
  { id: "read", label: "Read" },
  { id: "write", label: "Write" },
];

function firstSentence(description: string): string {
  const match = description.match(/^.*?[.!?](?=\s|$)/);
  return match ? match[0] : description;
}

export function ToolsExplorer({ tools }: { tools: Tool[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const groups = useMemo(() => {
    const seen: string[] = [];
    for (const tool of tools) {
      if (!seen.includes(tool.group)) seen.push(tool.group);
    }
    return seen;
  }, [tools]);

  const groupCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const tool of tools) counts.set(tool.group, (counts.get(tool.group) ?? 0) + 1);
    return counts;
  }, [tools]);

  const query = searchParams.get("q") ?? "";
  const group = searchParams.get("group") ?? "";
  const access = (searchParams.get("access") as Access) ?? "all";

  const [inputValue, setInputValue] = useState(query);
  const [syncedQuery, setSyncedQuery] = useState(query);
  const detailsRefs = useRef(new Map<string, HTMLDetailsElement>());
  const hasOpenedHash = useRef(false);

  if (query !== syncedQuery) {
    setSyncedQuery(query);
    setInputValue(query);
  }

  const updateParams = useCallback(
    (next: { q?: string; group?: string; access?: Access }) => {
      const params = new URLSearchParams(searchParams.toString());
      const merged = { q: query, group, access, ...next };

      if (merged.q) params.set("q", merged.q);
      else params.delete("q");

      if (merged.group) params.set("group", merged.group);
      else params.delete("group");

      if (merged.access && merged.access !== "all") params.set("access", merged.access);
      else params.delete("access");

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [group, access, query, pathname, router, searchParams],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (inputValue !== query) updateParams({ q: inputValue });
    }, 100);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (group && tool.group !== group) return false;
      if (access === "read" && !tool.readOnly) return false;
      if (access === "write" && tool.readOnly) return false;
      if (q && !tool.name.toLowerCase().includes(q) && !tool.description.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [tools, query, group, access]);

  const grouped = useMemo(() => {
    const map = new Map<string, Tool[]>();
    for (const tool of filtered) {
      const list = map.get(tool.group);
      if (list) list.push(tool);
      else map.set(tool.group, [tool]);
    }
    return groups.filter((g) => map.has(g)).map((g) => ({ group: g, items: map.get(g)! }));
  }, [filtered, groups]);

  useEffect(() => {
    if (hasOpenedHash.current) return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const target = tools.find((tool) => tool.name === hash);
    if (!target) return;
    hasOpenedHash.current = true;
    const el = detailsRefs.current.get(hash);
    if (el) {
      el.open = true;
      el.scrollIntoView({ block: "center" });
    }
  }, [tools, filtered]);

  function clearFilters() {
    setInputValue("");
    router.replace(pathname, { scroll: false });
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="tools-search" className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-muted">
            Search tools
          </label>
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" strokeWidth={1.5} />
            <input
              id="tools-search"
              type="search"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="Search tools"
              className="min-h-9 w-full rounded-control border border-border bg-surface py-2 pl-9 pr-3 text-sm text-foreground transition-[border-color] duration-150 ease-out placeholder:text-muted hover:border-border-strong focus-visible:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by group">
          <button
            type="button"
            aria-pressed={group === ""}
            onClick={() => updateParams({ group: "" })}
            className={`min-h-8 rounded-control border px-2.5 text-[0.8125rem] font-medium transition-[color,background-color,border-color,scale] duration-150 ease-out active:scale-[0.96] ${
              group === "" ? "border-accent/40 bg-accent-soft text-accent" : "border-border bg-surface text-secondary hover:border-border-strong hover:text-foreground"
            }`}
          >
            All ({tools.length})
          </button>
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              aria-pressed={group === g}
              onClick={() => updateParams({ group: g })}
              className={`min-h-8 rounded-control border px-2.5 text-[0.8125rem] font-medium transition-[color,background-color,border-color,scale] duration-150 ease-out active:scale-[0.96] ${
                group === g ? "border-accent/40 bg-accent-soft text-accent" : "border-border bg-surface text-secondary hover:border-border-strong hover:text-foreground"
              }`}
            >
              {g} ({groupCounts.get(g)})
            </button>
          ))}
        </div>

        <div className="flex gap-2" role="group" aria-label="Filter by access">
          {ACCESS_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={access === option.id}
              onClick={() => updateParams({ access: option.id })}
              className={`min-h-8 rounded-control border px-3 text-[0.8125rem] font-medium transition-[color,background-color,border-color,scale] duration-150 ease-out active:scale-[0.96] ${
                access === option.id
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border bg-surface text-secondary hover:border-border-strong hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-muted">
        Showing {filtered.length} of {tools.length} tools
      </p>

      {grouped.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-card border border-border bg-surface px-6 py-16 text-center">
          <SearchX className="size-7 text-muted" strokeWidth={1.5} />
          <p className="text-sm text-secondary">No tools match your filters.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="min-h-9 rounded-control bg-accent px-4 text-sm font-medium text-accent-foreground transition-[background-color,scale] duration-150 ease-out hover:bg-accent-hover active:scale-[0.96]"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="mt-6 space-y-10">
          {grouped.map(({ group: groupName, items }) => (
            <div key={groupName}>
              <h2 className="text-lg font-semibold leading-tight tracking-tight">{groupName}</h2>
              <ul className="mt-4 space-y-3">
                {items.map((tool) => (
                  <li key={tool.name}>
                    <details
                      id={tool.name}
                      ref={(el) => {
                        if (el) detailsRefs.current.set(tool.name, el);
                        else detailsRefs.current.delete(tool.name);
                      }}
                      className="group scroll-mt-24 rounded-card border border-border bg-surface transition-[border-color] duration-150 ease-out hover:border-border-strong"
                    >
                      <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-3.5 sm:items-center">
                        <ChevronDown className="mt-0.5 size-4 shrink-0 text-muted transition-transform duration-150 ease-out group-open:rotate-180 sm:mt-0" strokeWidth={1.5} />
                        <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:flex-row sm:items-center sm:gap-3">
                          <span className="font-mono text-sm text-foreground">{tool.name}</span>
                          <div className="flex flex-wrap items-center gap-1.5">
                            {tool.readOnly ? (
                              <span className="rounded-control bg-surface-raised px-1.5 py-0.5 font-mono text-[0.6875rem] font-medium text-muted">read</span>
                            ) : (
                              <span className="rounded-control bg-accent-soft px-1.5 py-0.5 font-mono text-[0.6875rem] font-medium text-accent">write</span>
                            )}
                            {tool.destructive ? (
                              <span className="rounded-control border border-accent/40 px-1.5 py-0.5 font-mono text-[0.6875rem] font-medium text-accent">
                                destructive
                              </span>
                            ) : null}
                          </div>
                          <span className="truncate text-sm text-secondary">{firstSentence(tool.description)}</span>
                        </div>
                      </summary>
                      <div className="border-t border-border px-4 py-4">
                        {tool.confirm ? (
                          <p className="mb-4 text-sm text-secondary">Previews first. Pass confirm=true to execute.</p>
                        ) : null}
                        {tool.params.length > 0 ? (
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse text-sm">
                              <thead>
                                <tr>
                                  <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                                    Parameter
                                  </th>
                                  <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                                    Required
                                  </th>
                                  <th className="border-b border-border px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                                    Description
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {tool.params.map((param) => (
                                  <tr key={param.name}>
                                    <td className="border-b border-border px-3 py-2 align-top font-mono text-sm">{param.name}</td>
                                    <td className="border-b border-border px-3 py-2 align-top text-sm text-secondary">
                                      {param.required ? "required" : ""}
                                    </td>
                                    <td className="border-b border-border px-3 py-2 align-top text-sm text-secondary">
                                      {param.description}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <p className="text-sm text-secondary">No parameters.</p>
                        )}
                      </div>
                    </details>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
