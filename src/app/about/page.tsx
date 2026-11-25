import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { Principles } from "@/components/sections/Principles";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { personSchema } from "@/lib/structured-data";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `About ${site.name}: the advocate's background, enrolment, courts of practice and approach to client matters.`,
  path: "/about",
});

export default function AboutPage() {
  const a = site.advocate;
  const details = [
    { label: "Enrolment", value: [a.enrolment] },
    { label: "Practising since", value: [a.practisingSince] },
    { label: "Education", value: a.education },
    { label: "Courts", value: a.courts },
    { label: "Memberships", value: a.memberships },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        eyebrow="About the firm"
        title={
          <>
            Counsel you can
            <br />
            speak to plainly.
          </>
        }
        intro={`${site.name} is a practice of advocates advising individuals, families and businesses. The focus is simple: understand the problem properly, explain the law clearly, and act carefully.`}
      />

      <section aria-labelledby="profile-title" className="pb-24 lg:pb-36">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          {/* TODO(client): replace with the advocate's real, approved portrait (see ASSET_GENERATION_PROMPTS §5). Never AI-generate a likeness. */}
          <figure className="relative aspect-[4/5] overflow-hidden rounded-panel bg-stone shadow-soft lg:sticky lg:top-10 lg:self-start">
            <Image
              src="/images/hero/detail-constitution-hand.webp"
              alt="Marble hand holding a closed book representing the Constitution"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </figure>

          <div className="flex flex-col gap-10">
            <div>
              <p className="eyebrow">Advocate</p>
              <h2 id="profile-title" className="display mt-5 text-[clamp(2rem,4vw,3.5rem)]">
                {a.name}
              </h2>
              <p className="mt-3 text-lg text-muted">{a.title}</p>
            </div>

            <div className="prose-legal">
              {a.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <dl className="divide-y divide-line border-y border-line">
              {details.map((d) => (
                <div key={d.label} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr]">
                  <dt className="text-xs font-semibold tracking-[0.16em] text-muted uppercase sm:pt-1">{d.label}</dt>
                  <dd>
                    <ul className="flex flex-col gap-1">
                      {d.value.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <Principles />
      <ContactCTA />
      <JsonLd data={personSchema()} />
    </>
  );
}
