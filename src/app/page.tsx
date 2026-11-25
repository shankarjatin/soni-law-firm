import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FirmIntroduction } from "@/components/sections/FirmIntroduction";
import { ExpertiseShowcase } from "@/components/sections/ExpertiseShowcase";
import { Principles } from "@/components/sections/Principles";
import { Process } from "@/components/sections/Process";
import { LegalTerms } from "@/components/sections/LegalTerms";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { FAQSection } from "@/components/sections/FAQSection";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { generalFaqs } from "@/content/home";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({ title: `${site.name} — ${site.tagline}`, description: site.description, path: "/" }),
  title: { absolute: `${site.name} — ${site.tagline}` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FirmIntroduction />
      <ExpertiseShowcase />
      <Principles />
      <Process />
      <LegalTerms />
      <InsightsPreview />
      <FAQSection faqs={generalFaqs} />
      <ContactCTA />
    </>
  );
}
