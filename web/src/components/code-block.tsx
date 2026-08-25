import { Terminal } from "lucide-react";
import { CopyButton } from "./copy-button";

type Props = {
  code: string;
  title?: string;
  className?: string;
};

export function CodeBlock({ code, title, className = "" }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-card border border-code-border bg-code-bg text-code-fg ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-code-border px-3 py-2">
        <span className="flex min-w-0 items-center gap-2">
          <Terminal className="size-3.5 shrink-0 text-code-fg/40" strokeWidth={1.5} aria-hidden="true" />
          <span className="truncate font-mono text-xs text-code-fg/55">{title ?? ""}</span>
        </span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto px-3 py-3 font-mono text-[0.8125rem] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
