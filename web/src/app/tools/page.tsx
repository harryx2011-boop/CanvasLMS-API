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
        <h1 className="text-4xl font-semibold leading-tight tracking-tight">Tool reference</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          All 100 tools, generated from the server. Read tools run immediately. Write tools preview first and need
          confirm=true.
        </p>
      </div>

      <dl className="mt-8 flex flex-wrap gap-3">
        <div className="rounded-control border border-border bg-card px-4 py-2.5">
          <dt className="text-sm font-medium text-muted">Total tools</dt>
          <dd className="text-lg font-semibold leading-tight">{total}</dd>
        </div>
        <div className="rounded-control border border-border bg-card px-4 py-2.5">
          <dt className="text-sm font-medium text-muted">Read-only</dt>
          <dd className="text-lg font-semibold leading-tight">{readOnlyCount}</dd>
        </div>
        <div className="rounded-control border border-border bg-card px-4 py-2.5">
          <dt className="text-sm font-medium text-muted">Write</dt>
          <dd className="text-lg font-semibold leading-tight">{writeCount}</dd>
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
