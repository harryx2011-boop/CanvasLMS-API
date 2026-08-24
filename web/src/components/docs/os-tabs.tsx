"use client";

import { Tabs, type Tab } from "@/components/tabs";
import { osLabels, type OS } from "@/lib/site";

const order: OS[] = ["windows", "macos", "linux"];

export function OsTabs({ panels }: { panels: Record<OS, React.ReactNode> }) {
  const tabs: Tab[] = order.map((os) => ({ id: os, label: osLabels[os], content: panels[os] }));
  return <Tabs tabs={tabs} storageKey="cc-os" label="Operating system" />;
}
