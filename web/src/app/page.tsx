import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/closing-cta";
import { Educators } from "@/components/home/educators";
import { Examples } from "@/components/home/examples";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${site.name}: MCP server for Canvas LMS` },
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <Examples />
      <Educators />
      <ClosingCta />
    </>
  );
}
