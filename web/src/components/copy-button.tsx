"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CopyButton({ text, className = "" }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      aria-live="polite"
      className={`inline-flex h-7 items-center gap-1.5 rounded-control border border-code-border px-2 text-xs font-medium text-code-fg/70 transition-[color,background-color,border-color,scale] duration-150 ease-out hover:border-code-fg/20 hover:text-code-fg active:scale-[0.96] ${className}`}
    >
      {copied ? (
        <Check className="size-3.5 text-accent" strokeWidth={2} />
      ) : (
        <Copy className="size-3.5" strokeWidth={1.5} />
      )}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
