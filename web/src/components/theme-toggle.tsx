"use client";

import { Moon, Sun } from "lucide-react";

function withoutTransitions(apply: () => void) {
  const style = document.createElement("style");
  style.append(document.createTextNode("*,*::before,*::after{transition:none !important}"));
  document.head.append(style);

  apply();
  void document.body.offsetHeight;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => style.remove());
  });
}

export function ThemeToggle() {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    withoutTransitions(() => document.documentElement.classList.toggle("dark", next));
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex size-10 items-center justify-center rounded-control text-muted transition-[color,background-color,scale] duration-150 ease-out hover:bg-subtle hover:text-foreground active:scale-[0.96]"
    >
      <Moon className="size-4 dark:hidden" strokeWidth={1.5} aria-hidden="true" />
      <Sun className="hidden size-4 dark:block" strokeWidth={1.5} aria-hidden="true" />
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
    </button>
  );
}
