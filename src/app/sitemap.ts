import type { MetadataRoute } from "next";
import { insights } from "@/content/insights";
import { practiceAreas } from "@/content/practice-areas";
import { absoluteUrl } from "@/lib/seo";

const SITE_UPDATED = "2026-11-24";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about", "/practice-areas", "/insights", "/contact", "/disclaimer", "/privacy-policy"].map(
    (path) => ({ url: absoluteUrl(path), lastModified: SITE_UPDATED }),
  );
  const areas = practiceAreas.map((a) => ({ url: absoluteUrl(`/practice-areas/${a.slug}`), lastModified: a.updatedAt }));
  const articles = insights.map((i) => ({ url: absoluteUrl(`/insights/${i.slug}`), lastModified: i.updatedAt }));
  return [...pages, ...areas, ...articles];
}
