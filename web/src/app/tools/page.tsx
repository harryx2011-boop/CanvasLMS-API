import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/container";
import { ToolsExplorer } from "@/components/tools/tools-explorer";
import tools from "@/content/tools.json";
import type { Tool } from "@/content/tools.ts";

export const metadata: Metadata = {
  title: "Tools",
};

const allTools = tools as Tool[];

export default function ToolsPage() {
  const total = allTools.length;
  const readOnlyCount = allTools.filter((tool) => tool.readOnly).length;
  const writeCount = total - readOnlyCount;

  return (
    <Container className="py-16 sm:py-24">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-4xl">Tool reference</h1>
        <p className="mt-4 text-pretty leading-relaxed text-secondary">
          All {total} tools, generated from the server. Read tools run immediately. Write tools preview first and need
          confirm=true.
        </p>
      </div>

      <dl className="mt-8 flex flex-wrap gap-3">
        <div className="rounded-control border border-border bg-surface px-4 py-2.5">
          <dt className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Total tools</dt>
          <dd className="mt-1 text-xl font-semibold leading-tight tracking-[-0.02em] tabular-nums">{total}</dd>
        </div>
        <div className="rounded-control border border-border bg-surface px-4 py-2.5">
          <dt className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Read-only</dt>
          <dd className="mt-1 text-xl font-semibold leading-tight tracking-[-0.02em] tabular-nums">{readOnlyCount}</dd>
        </div>
        <div className="rounded-control border border-border bg-surface px-4 py-2.5">
          <dt className="text-xs font-medium uppercase tracking-[0.08em] text-muted">Write</dt>
          <dd className="mt-1 text-xl font-semibold leading-tight tracking-[-0.02em] tabular-nums">{writeCount}</dd>
        </div>
      </dl>

      <div className="mt-10">
        <Suspense fallback={null}>
          <ToolsExplorer tools={allTools} />
        </Suspense>
      </div>
    </Container>
  );
}
