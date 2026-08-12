import type { MetadataRoute } from "next";
import { navSections, site } from "@/lib/content";

/** Section anchors carry lower priority than the page itself. */
const SECTION_PRIORITY: Record<string, number> = {
  work: 0.9,
  trajectory: 0.8,
  profile: 0.8,
  impact: 0.7,
  stack: 0.6,
  contact: 0.7,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...navSections
      .filter((section) => section.id !== "index")
      .map((section) => ({
        url: `${site.url}/#${section.id}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: SECTION_PRIORITY[section.id] ?? 0.6,
      })),
  ];
}
