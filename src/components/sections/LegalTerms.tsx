import Image from "next/image";
import { FileSignature, FileText, Gavel, Handshake, House, Mail, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { glossary } from "@/content/home";

const icons: Record<string, LucideIcon> = {
  Vakalatnama: FileSignature,
  Affidavit: FileText,
  "Legal notice": Mail,
  "Anticipatory bail": Gavel,
  Arbitration: Handshake,
  Conveyancing: House,
};

/** ref-2 "Understanding Legal Terms" — short, quotable definitions (AEO). */
export function LegalTerms() {
  return (
    <section aria-labelledby="terms-title" className="py-24 lg:py-36">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-20">
        <div className="flex flex-col gap-10 lg:sticky lg:top-10 lg:self-start">
          <SectionHeading
            id="terms-title"
            eyebrow="Know the terms"
            title="Understanding legal terms."
            intro="Words you are likely to hear in an Indian court or lawyer's office, in one sentence each."
          />
          <div className="relative hidden aspect-[3/2] overflow-hidden rounded-panel bg-stone lg:block">
            <Image
              src="/images/objects/gavel.webp"
              alt="Black gavel with a brass band on its sound block"
              fill
              sizes="30vw"
              className="object-cover"
            />
          </div>
        </div>

        <dl className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {glossary.map(({ term, definition }) => {
            const Icon = icons[term] ?? FileText;
            return (
              <div key={term} className="flex flex-col gap-4 bg-canvas p-7">
                <Icon className="size-7 text-ink" strokeWidth={1.25} aria-hidden="true" />
                <dt className="font-display text-xl font-semibold tracking-tight">{term}</dt>
                <dd className="leading-relaxed text-muted">{definition}</dd>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
