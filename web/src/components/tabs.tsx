"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type Tab = { id: string; label: string; content: ReactNode };

type Props = {
  tabs: Tab[];
  storageKey?: string;
  hashSync?: boolean;
  label: string;
};

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("storage", callback);
  };
}

function readPersisted(storageKey?: string, hashSync?: boolean): string | null {
  if (hashSync && window.location.hash) return window.location.hash.slice(1);
  if (storageKey) {
    try {
      return localStorage.getItem(storageKey);
    } catch {}
  }
  return null;
}

export function Tabs({ tabs, storageKey, hashSync = false, label }: Props) {
  const baseId = useId();
  const listRef = useRef<HTMLDivElement>(null);
  const [chosen, setChosen] = useState<string | null>(null);
  const persisted = useSyncExternalStore(
    subscribe,
    () => readPersisted(storageKey, hashSync),
    () => null,
  );

  const valid = (id: string | null) => (id && tabs.some((t) => t.id === id) ? id : null);
  const active = valid(chosen) ?? valid(persisted) ?? tabs[0]?.id;

  const select = useCallback(
    (id: string) => {
      setChosen(id);
      if (storageKey) {
        try {
          localStorage.setItem(storageKey, id);
        } catch {}
      }
      if (hashSync) history.replaceState(null, "", `#${id}`);
    },
    [hashSync, storageKey],
  );

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const index = tabs.findIndex((t) => t.id === active);
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    select(tabs[next].id);
    const buttons = listRef.current?.querySelectorAll<HTMLButtonElement>("[role=tab]");
    buttons?.[next]?.focus();
  }

  return (
    <div>
      <div
        ref={listRef}
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="flex flex-wrap gap-1 rounded-control border border-border bg-subtle p-1"
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(tab.id)}
              className={`min-h-9 rounded-[4px] px-3 text-sm font-medium transition-[color,background-color,scale] duration-150 ease-out active:scale-[0.96] ${
                selected ? "bg-card text-foreground shadow-sm" : "text-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== active}
          className="mt-4"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
