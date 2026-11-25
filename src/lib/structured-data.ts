/**
 * JSON-LD builders. Only facts that are provided (not [placeholder]) and visible on the page are emitted.
 * No ratings, reviews, awards or outcome claims — ever.
 */
import type { FAQ } from "@/content/practice-areas";
import type { Insight } from "@/content/insights";
import { isProvided, site } from "@/content/site";
import { absoluteUrl } from "./seo";

function compact<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null)) as T;
}

export function organizationSchema() {
  const { address, phone, email } = site.contact;
  const hasAddress = isProvided(address.city) && isProvided(address.line1);
  return compact({
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    url: absoluteUrl("/"),
    description: site.description,
    image: absoluteUrl("/images/og/og-default.jpg"),
    telephone: isProvided(phone) ? phone : undefined,
    email: isProvided(email) ? email : undefined,
    address: hasAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: [address.line1, address.line2].filter(isProvided).join(", "),
          addressLocality: address.city,
          addressRegion: isProvided(address.state) ? address.state : undefined,
          postalCode: isProvided(address.postalCode) ? address.postalCode : undefined,
          addressCountry: "IN",
        }
      : undefined,
    areaServed: { "@type": "Country", name: "India" },
  });
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: site.name,
    url: absoluteUrl("/"),
    inLanguage: "en-IN",
    publisher: { "@id": absoluteUrl("/#organization") },
  };
}

export function personSchema() {
  const a = site.advocate;
  if (!isProvided(a.name)) return null;
  return compact({
    "@context": "https://schema.org",
    "@type": "Person",
    name: a.name,
    jobTitle: isProvided(a.title) ? a.title : undefined,
    worksFor: { "@id": absoluteUrl("/#organization") },
    url: absoluteUrl("/about"),
  });
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleSchema(article: Insight) {
  return compact({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    image: absoluteUrl(article.image),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
    inLanguage: "en-IN",
  });
}
