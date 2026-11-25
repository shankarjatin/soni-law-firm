import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { practiceAreas } from "@/content/practice-areas";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Practice Areas",
  description:
    "Civil litigation, criminal law, family and matrimonial, property, corporate and commercial, cheque bounce, consumer disputes, arbitration and legal documentation — explained in plain language.",
  path: "/practice-areas",
});

export default function PracticeAreasPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Practice Areas", path: "/practice-areas" }]}
        eyebrow="Practice areas"
        title={
          <>
            Areas of
            <br />
            practice.
          </>
        }
        intro="Choose an area for a plain-language guide to what it covers and what to keep in mind. Not sure which applies? Select “Not sure” when you request a callback."
        image={{ src: "/images/objects/scales-standalone.webp", alt: "Antique brass balance scale on a black marble base" }}
      />

      <section aria-label="All practice areas" className="pb-24 lg:pb-36">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {practiceAreas.map((area, i) => (
              <li key={area.slug}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-card bg-surface shadow-soft transition-shadow duration-300 hover:shadow-lift">
                  <div className="relative aspect-[3/2] overflow-hidden bg-stone">
                    <Image
                      src={area.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <span className="glass absolute top-4 left-4 rounded-full px-3 py-1 font-display text-xs font-semibold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h2 className="flex items-start justify-between gap-4 font-display text-xl font-semibold tracking-tight">
                      <Link href={`/practice-areas/${area.slug}`} className="after:absolute after:inset-0">
                        {area.name}
                      </Link>
                      <ArrowUpRight
                        className="mt-1 size-5 shrink-0 text-brass-ink transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </h2>
                    <p className="leading-relaxed text-muted">{area.shortDescription}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <ContactCTA title="Not sure which area applies?" />
    </>
  );
}
