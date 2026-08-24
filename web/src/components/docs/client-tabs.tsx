"use client";

import { Tabs } from "@/components/tabs";

export type ClientTabDef = { id: string; label: string; content: React.ReactNode };

export function ClientTabs({ tabs }: { tabs: ClientTabDef[] }) {
  return <Tabs tabs={tabs} hashSync label="MCP client" />;
}
