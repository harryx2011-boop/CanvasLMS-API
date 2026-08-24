import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${site.url}/`, lastModified, priority: 1 },
    { url: `${site.url}/docs`, lastModified, priority: 0.8 },
    { url: `${site.url}/tools`, lastModified, priority: 0.8 },
    { url: `${site.url}/skills`, lastModified, priority: 0.8 },
    { url: `${site.url}/changelog`, lastModified, priority: 0.5 },
  ];
}
