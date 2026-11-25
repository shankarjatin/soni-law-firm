import type { Metadata } from "next";
import { site } from "@/content/site";

/** Production must set NEXT_PUBLIC_SITE_INDEXABLE=true. Everything else (local, preview, staging) is noindex. */
export const isIndexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

export const ogImage = { url: "/images/og/og-default.jpg", width: 1200, height: 630, alt: site.name };

export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const images = image ? [{ url: image, alt: title }] : [ogImage];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      images,
    },
    twitter: { card: "summary_large_image", title, description, images: images.map((i) => i.url) },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
