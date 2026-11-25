import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

export function FirmIntroduction() {
  const a = site.advocate;
  const facts = [
    { label: "Advocate", value: a.name },
    { label: "Enrolment", value: a.enrolment },
    { label: "Practising since", value: a.practisingSince },
    { label: "Courts", value: a.courts.join(" · ") },
  ];

  return (
    <section aria-labelledby="intro-title" className="py-24 lg:py-36">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="relative lg:col-span-5">
          <div className="relative aspect-square overflow-hidden rounded-panel bg-stone shadow-soft">
            <Image
              src="/images/hero/detail-scales-hand.webp"
              alt="Marble hand holding a balanced brass scale"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="glass absolute -bottom-6 left-6 rounded-full px-5 py-3 text-sm sm:left-10">
            <span className="text-muted">Informational website · </span>
            <span className="font-medium">Not legal advice</span>
          </div>
        </div>

        <div className="flex flex-col gap-10 lg:col-span-7">
          <SectionHeading
            id="intro-title"
            eyebrow="About the firm"
            title="A practice built on clarity and care."
            intro={`${site.name} advises and represents people and businesses across civil, criminal, family, property, commercial and consumer matters. Every matter begins with listening carefully and explaining the law in terms you can act on.`}
          />

          <dl className="grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2">
            {facts.map((f) => (
              <div key={f.label} className="bg-canvas p-5">
                <dt className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">{f.label}</dt>
                <dd className="mt-2 font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>

          <div>
            <LinkButton href="/about" variant="secondary">
              About the advocate
            </LinkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
