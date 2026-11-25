import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { InsightCard } from "@/components/sections/InsightCard";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { insights } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description: "Plain-language guides to Indian law and procedure — criminal law, cheque bounce, consumer rights and more.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", path: "/insights" }]}
        eyebrow="Insights"
        title={
          <>
            Know
            <br />
            your rights.
          </>
        }
        intro="Short, plain-language explainers on Indian law and procedure. These are general information, not legal advice — every situation turns on its own facts."
        image={{ src: "/images/objects/constitution-book.webp", alt: "Closed hardbound law book on marble" }}
      />
      <section aria-label="All insights" className="pb-24 lg:pb-36">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {insights.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} headingLevel="h2" />
            ))}
          </div>
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}
