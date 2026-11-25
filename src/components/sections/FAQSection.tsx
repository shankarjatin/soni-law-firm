import Link from "next/link";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FAQ } from "@/content/practice-areas";
import { faqSchema } from "@/lib/structured-data";

/** Native <details> accordion: no client JS, keyboard and screen-reader friendly. */
export function FAQList({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq) => (
        <details key={faq.question} className="group py-1">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 font-display text-lg font-semibold tracking-tight [&::-webkit-details-marker]:hidden">
            <h3>{faq.question}</h3>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-transform duration-300 group-open:rotate-45">
              <Plus className="size-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
          </summary>
          <p className="max-w-[65ch] pb-6 leading-relaxed text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function FAQSection({ faqs, title = "Common questions." }: { faqs: FAQ[]; title?: string }) {
  return (
    <section aria-labelledby="faq-title" className="py-24 lg:py-36">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="flex flex-col gap-6">
          <SectionHeading id="faq-title" eyebrow="FAQ" title={title} />
          <p className="max-w-sm leading-relaxed text-muted">
            Have a question that isn&apos;t answered here?{" "}
            <Link href="/contact#callback" className="text-ink underline underline-offset-4">
              Request a callback
            </Link>
            .
          </p>
        </div>
        <FAQList faqs={faqs} />
      </Container>
      <JsonLd data={faqSchema(faqs)} />
    </section>
  );
}
