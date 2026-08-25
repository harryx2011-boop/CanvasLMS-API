import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/closing-cta";
import { Hero } from "@/components/home/hero";
import { Install } from "@/components/home/install";
import { Usage } from "@/components/home/usage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name}: MCP server for Canvas LMS` },
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Install />
      <Usage />
      <ClosingCta />
    </>
  );
}
