import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/closing-cta";
import { Hero } from "@/components/home/hero";
import { Install } from "@/components/home/install";
import { Problem } from "@/components/home/problem";
import { Proof } from "@/components/home/proof";
import { Safety } from "@/components/home/safety";
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
      <Problem />
      <Safety />
      <Usage />
      <Proof />
      <Install />
      <ClosingCta />
    </>
  );
}
