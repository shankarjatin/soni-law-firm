import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { LinkButton } from "@/components/ui/LinkButton";
import { PageHero } from "@/components/sections/PageHero";
import { FAQList } from "@/components/sections/FAQSection";
import { InsightCard } from "@/components/sections/InsightCard";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getPracticeArea, practiceAreas } from "@/content/practice-areas";
import { getInsight, type Insight } from "@/content/insights";
import { formatDate, pageMetadata } from "@/lib/seo";
import { faqSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return practiceAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: PageProps<"/practice-areas/[slug]">): Promise<Metadata> {
  const area = getPracticeArea((await params).slug);
  if (!area) return {};
  return pageMetadata({
    title: area.name,
    description: area.shortDescription,
    path: `/practice-areas/${area.slug}`,
    image: area.image,
  });
}

export default async function PracticeAreaPage({ params }: PageProps<"/practice-areas/[slug]">) {
  const area = getPracticeArea((await params).slug);
  if (!area) notFound();

  const related = area.relatedInsights.map(getInsight).filter((i): i is Insight => Boolean(i));
  const others = practiceAreas.filter((a) => a.slug !== area.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Practice Areas", path: "/practice-areas" },
          { name: area.name, path: `/practice-areas/${area.slug}` },
        ]}
        eyebrow="Practice area"
        title={area.name}
        intro={area.overview}
        image={{ src: area.image, alt: area.imageAlt }}
      />

      <section className="pb-24 lg:pb-32">
        <Container className="grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-14">
            <ContentBlock title="Situations this may relate to" items={area.situations} />
            <ContentBlock title="How the firm may assist" items={area.assistance} />
            <div className="rounded-card border border-line bg-surface p-7 sm:p-9">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Things to keep in mind</h2>
              <ul className="prose-legal mt-4">
                {area.considerations.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">Frequently asked questions</h2>
              <div className="mt-6">
                <FAQList faqs={area.faqs} />
              </div>
            </div>
            <p className="text-sm text-muted">
              Last updated <time dateTime={area.updatedAt}>{formatDate(area.updatedAt)}</time>. General information
              about Indian law, not legal advice. Outcomes depend on the facts of each case.
            </p>
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-10 lg:self-start">
            <div className="on-dark rounded-card bg-ink p-8 text-canvas">
              <p className="eyebrow text-brass-light">Discuss your matter</p>
              <p className="mt-4 font-display text-2xl leading-snug font-semibold tracking-tight">
                Request a callback about {area.name.toLowerCase()}.
              </p>
              <div className="mt-6">
                <LinkButton href={`/contact?matter=${area.slug}#callback`} variant="light">
                  Request a callback
                </LinkButton>
              </div>
            </div>
            <nav aria-label="Other practice areas" className="rounded-card border border-line p-7">
              <h2 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">Other practice areas</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/practice-areas/${o.slug}`} className="link-underline">
                      {o.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </Container>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="pb-24 lg:pb-32">
          <Container>
            <h2 id="related-title" className="display text-[clamp(2rem,4vw,3rem)]">
              Related insights
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((insight) => (
                <InsightCard key={insight.slug} insight={insight} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ContactCTA />
      <JsonLd data={faqSchema(area.faqs)} />
    </>
  );
}

function ContentBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3 rounded-2xl bg-surface p-5 leading-relaxed shadow-soft">
            <Check className="mt-1 size-4 shrink-0 text-brass-ink" strokeWidth={2} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
