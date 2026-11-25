import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { practiceAreas, type PracticeArea } from "@/content/practice-areas";

/** ref-2 "Our Legal Expertise at Your Service": central still life with labelled callouts. */
const featured = ["civil-litigation", "criminal-law", "family-matrimonial", "property-real-estate"];

export function ExpertiseShowcase() {
  const areas = featured
    .map((slug) => practiceAreas.find((a) => a.slug === slug))
    .filter((a): a is PracticeArea => Boolean(a));
  const [left, right] = [areas.slice(0, 2), areas.slice(2)];

  return (
    <section aria-labelledby="expertise-title" className="bg-surface py-24 lg:py-36">
      <Container>
        <SectionHeading
          id="expertise-title"
          align="center"
          eyebrow="Practice areas"
          title={
            <>
              Legal expertise,
              <br />
              explained simply.
            </>
          }
          intro="Each area below links to a plain-language guide: what it covers, situations it may apply to, and what to keep in mind."
        />

        <div className="mt-16 grid items-center gap-10 lg:mt-20 lg:grid-cols-[1fr_minmax(0,30rem)_1fr] lg:gap-6">
          <ul className="order-2 flex flex-col gap-10 lg:order-1">
            {left.map((area) => (
              <Callout key={area.slug} area={area} side="left" />
            ))}
          </ul>

          <div className="relative order-1 mx-auto aspect-[1312/1199] w-full max-w-[30rem] lg:order-2">
            <Image
              src="/images/objects/books-gavel.webp"
              alt="Stack of law books with a gavel resting on top"
              fill
              sizes="(min-width: 1024px) 30rem, 90vw"
              className="rounded-panel object-cover"
            />
          </div>

          <ul className="order-3 flex flex-col gap-10">
            {right.map((area) => (
              <Callout key={area.slug} area={area} side="right" />
            ))}
          </ul>
        </div>

        <div className="mt-16 flex justify-center">
          <LinkButton href="/practice-areas">View all {practiceAreas.length} practice areas</LinkButton>
        </div>
      </Container>
    </section>
  );
}

function Callout({ area, side }: { area: PracticeArea; side: "left" | "right" }) {
  const isLeft = side === "left";
  return (
    <li className={`group relative ${isLeft ? "lg:text-right" : ""}`}>
      {/* Connector line + dot pointing at the centre image (desktop). */}
      <span
        aria-hidden="true"
        className={`absolute top-3 hidden h-px w-10 bg-ink/30 lg:block ${isLeft ? "-right-14" : "-left-14"}`}
      />
      <span
        aria-hidden="true"
        className={`absolute top-[0.56rem] hidden size-2 rounded-full bg-ink lg:block ${isLeft ? "-right-4" : "-left-4"}`}
      />
      <Link href={`/practice-areas/${area.slug}`} className="block rounded-xl">
        <h3
          className={`flex items-center gap-2 font-display text-xl font-semibold tracking-tight ${isLeft ? "lg:justify-end" : ""}`}
        >
          {area.name}
          <ArrowUpRight
            className="size-4 text-brass-ink transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{area.shortDescription}</p>
      </Link>
    </li>
  );
}
