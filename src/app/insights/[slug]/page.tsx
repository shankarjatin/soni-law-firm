import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { InsightCard } from "@/components/sections/InsightCard";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getInsight, insights } from "@/content/insights";
import { formatDate, pageMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/structured-data";

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const insight = getInsight((await params).slug);
  if (!insight) return {};
  const meta = pageMetadata({
    title: insight.title,
    description: insight.summary,
    path: `/insights/${insight.slug}`,
    image: insight.image,
  });
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: insight.publishedAt,
      modifiedTime: insight.updatedAt,
    },
  };
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const insight = getInsight((await params).slug);
  if (!insight) notFound();
  const more = insights.filter((i) => i.slug !== insight.slug).slice(0, 3);

  return (
    <>
      <article className="pt-6 pb-24 lg:pb-32">
        <Container className="max-w-[56rem]">
          <Breadcrumbs
            items={[
              { name: "Insights", path: "/insights" },
              { name: insight.category, path: `/insights/${insight.slug}` },
            ]}
          />
          <header className="mt-10 flex animate-rise flex-col gap-6">
            <p className="eyebrow">{insight.category}</p>
            <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-balance">
              {insight.title}
            </h1>
            <p className="text-xl leading-relaxed text-muted text-pretty">{insight.summary}</p>
            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
              <span>By {insight.author}</span>
              <span aria-hidden="true">·</span>
              <span>
                Updated <time dateTime={insight.updatedAt}>{formatDate(insight.updatedAt)}</time>
              </span>
              {insight.reviewedBy && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Reviewed by {insight.reviewedBy}</span>
                </>
              )}
            </p>
          </header>

          <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-panel bg-stone">
            <Image src={insight.image} alt={insight.imageAlt} fill priority sizes="(min-width: 896px) 56rem, 100vw" className="object-cover" />
          </div>

          {/* Short, self-contained answer near the top (AEO). */}
          <section aria-labelledby="short-answer" className="mt-12 rounded-card border border-line bg-surface p-7 sm:p-9">
            <h2 id="short-answer" className="text-xs font-semibold tracking-[0.16em] text-brass-ink uppercase">
              The short answer
            </h2>
            <p className="mt-4 text-lg leading-relaxed">{insight.shortAnswer}</p>
          </section>

          <div className="prose-legal mt-6">
            {insight.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {insight.sources.length > 0 && (
              <section>
                <h2>Sources</h2>
                <ul>
                  {insight.sources.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="mt-12 flex gap-4 rounded-card bg-stone/70 p-6 text-sm leading-relaxed text-muted">
            <Info className="mt-0.5 size-5 shrink-0 text-ink" strokeWidth={1.5} aria-hidden="true" />
            <p>
              This article is general information about Indian law as on the date shown and is not legal advice. Laws
              and procedures change; please seek advice on your specific situation.
            </p>
          </aside>
        </Container>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-title" className="pb-24 lg:pb-32">
          <Container>
            <h2 id="more-title" className="display text-[clamp(2rem,4vw,3rem)]">
              More insights
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((i) => (
                <InsightCard key={i.slug} insight={i} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <ContactCTA />
      <JsonLd data={articleSchema(insight)} />
    </>
  );
}
