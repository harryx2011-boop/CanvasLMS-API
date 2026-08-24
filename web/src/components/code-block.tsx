import { CopyButton } from "./copy-button";

type Props = {
  code: string;
  title?: string;
  className?: string;
};

export function CodeBlock({ code, title, className = "" }: Props) {
  return (
    <div className={`overflow-hidden rounded-card border border-code-border bg-code-bg text-code-fg ${className}`}>
      <div className="flex items-center justify-between gap-3 border-b border-code-border px-4 py-2">
        <span className="truncate font-mono text-xs text-code-fg/60">{title ?? ""}</span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[0.8125rem] leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}
