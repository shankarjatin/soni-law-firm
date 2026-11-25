/**
 * Single source of truth for firm facts.
 *
 * Every value wrapped in [square brackets] is a placeholder that the client must supply.
 * `isProvided()` treats bracketed values as missing, so structured data and links that
 * depend on them stay switched off until real details are filled in.
 */

export const site = {
  // TODO(client): confirm spelling — "Sony" (docs) vs "Soni" (project folder).
  name: "Sony Law Firm",
  shortName: "Sony",
  tagline: "Advocates & Legal Consultants",
  description:
    "Sony Law Firm offers legal advice and representation across civil, criminal, family, property, commercial and consumer matters in India. Clear, informational guidance and a simple way to request a callback.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_IN",

  advocate: {
    name: "[Advocate full name]",
    title: "[Advocate / Founding Partner]",
    enrolment: "[Enrolment no. — State Bar Council]",
    practisingSince: "[Year of enrolment]",
    education: ["[LL.B. — University, year]", "[Other qualification, if any]"],
    memberships: ["[Bar Association membership]"],
    courts: ["[District & Sessions Court, City]", "[High Court of State]"],
    bio: [
      "[Professional biography, paragraph one — background and areas of focus, written by or approved by the advocate.]",
      "[Paragraph two — approach to client matters and communication.]",
    ],
  },

  contact: {
    phone: "[+91 XXXXX XXXXX]",
    whatsapp: "[+91 XXXXX XXXXX]",
    email: "[office@example.com]",
    address: {
      line1: "[Chamber / office no., building]",
      line2: "[Street, area]",
      city: "[City]",
      state: "[State]",
      postalCode: "[PIN]",
    },
    mapUrl: "[Google Maps link]",
    hours: [
      { days: "Monday – Friday", time: "[10:00 am – 6:00 pm]" },
      { days: "Saturday", time: "[10:00 am – 2:00 pm]" },
    ],
  },

  social: [] as { label: string; href: string }[],

  // Footer copyright year. Kept static: Cache Components disallows reading the clock while prerendering.
  copyrightYear: 2026,
} as const;

export function isProvided(value: string | undefined | null): value is string {
  return Boolean(value && !value.trim().startsWith("["));
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(phone: string) {
  return `https://wa.me/${phone.replace(/\D/g, "")}`;
}

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export const callbackWindows = [
  { value: "morning", label: "Morning (10 am – 12 pm)" },
  { value: "afternoon", label: "Afternoon (12 pm – 3 pm)" },
  { value: "evening", label: "Evening (3 pm – 6 pm)" },
] as const;
