"use client";

import { useEffect, useRef, useState } from "react";

const PROMPT = "What's due this week?";
const TOOL_CALL = "→ get_upcoming_assignments(days=7)";
const RESPONSE_LINES = [
  "| due | course | title | points | status |",
  "| --- | --- | --- | --- | --- |",
  "| Tue Aug 25, 10:00 AM | Physics 1 Honors | Brochure Investigation 1 | 5 | not submitted |",
  "| Tue Aug 25, 3:30 PM | Pre-AP World History | Unit 1 Quiz | 30 | not submitted |",
  "| Wed Aug 26, 11:59 PM | AICE Geography | Powerpoint questions | 30 | not submitted |",
  "| Sun Aug 30, 11:59 PM | AP Precalculus | HW: 1.7 Rational Functions | 10 | not submitted |",
];

const TYPE_MS = 35;
const TOOL_DELAY_MS = 400;
const LINE_MS = 80;
const LOOP_PAUSE_MS = 6000;

const ARIA_LABEL = `Terminal demo. A user asks: ${PROMPT}. The assistant calls ${TOOL_CALL}, then returns a table of four upcoming assignments across Physics 1 Honors, Pre-AP World History, AICE Geography, and AP Precalculus, all not yet submitted.`;

type Phase = "typing" | "tool" | "response" | "done";

function getReducedMotionPreference(): boolean | null {
  if (typeof window === "undefined") return null;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function TerminalDemo() {
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(getReducedMotionPreference);
  const [typedChars, setTypedChars] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [visibleLines, setVisibleLines] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion !== false) return;

    function clear() {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    }

    function run() {
      setTypedChars(0);
      setPhase("typing");
      setVisibleLines(0);

      let char = 0;
      function typeNext() {
        char += 1;
        setTypedChars(char);
        if (char < PROMPT.length) {
          timeoutRef.current = window.setTimeout(typeNext, TYPE_MS);
        } else {
          timeoutRef.current = window.setTimeout(showTool, TOOL_DELAY_MS);
        }
      }

      function showTool() {
        setPhase("tool");
        timeoutRef.current = window.setTimeout(() => {
          setPhase("response");
          revealLine(0);
        }, TOOL_DELAY_MS);
      }

      function revealLine(index: number) {
        setVisibleLines(index + 1);
        if (index + 1 < RESPONSE_LINES.length) {
          timeoutRef.current = window.setTimeout(() => revealLine(index + 1), LINE_MS);
        } else {
          setPhase("done");
          timeoutRef.current = window.setTimeout(run, LOOP_PAUSE_MS);
        }
      }

      timeoutRef.current = window.setTimeout(typeNext, TYPE_MS);
    }

    run();
    return clear;
  }, [reducedMotion]);

  const showFinal = reducedMotion !== false;
  const promptText = showFinal ? PROMPT : PROMPT.slice(0, typedChars);
  const showCursor = !showFinal && phase === "typing";
  const showTool = showFinal || phase === "tool" || phase === "response" || phase === "done";
  const lineCount = showFinal ? RESPONSE_LINES.length : visibleLines;

  return (
    <div
      role="img"
      aria-label={ARIA_LABEL}
      aria-live="off"
      className="min-w-0 overflow-hidden rounded-panel border border-code-border bg-code-bg text-code-fg shadow-[var(--shadow-raised)]"
    >
      <div className="flex items-center gap-1.5 border-b border-code-border px-4 py-2.5">
        <span className="size-2 rounded-full bg-code-fg/15" />
        <span className="size-2 rounded-full bg-code-fg/15" />
        <span className="size-2 rounded-full bg-code-fg/15" />
      </div>
      <div className="min-h-[220px] px-4 py-4 font-mono text-[0.8125rem] leading-relaxed">
        <div className="flex gap-2">
          <span className="text-code-fg/50">{">"}</span>
          <span>
            {promptText}
            {showCursor ? <span className="animate-pulse">|</span> : null}
          </span>
        </div>
        {showTool && (phase !== "typing" || showFinal) ? (
          <div className="mt-3 text-accent">{TOOL_CALL}</div>
        ) : null}
        {lineCount > 0 ? (
          <div className="mt-3 overflow-x-auto">
            <pre className="whitespace-pre text-code-fg/90">
              {RESPONSE_LINES.slice(0, lineCount).join("\n")}
            </pre>
          </div>
        ) : null}
      </div>
    </div>
  );
}
