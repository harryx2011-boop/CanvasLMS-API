import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  reactStrictMode: true,
  agentRules: false,
};

const withMDX = createMDX({ extension: /.(md|mdx)$/ });

export default withMDX(nextConfig);
