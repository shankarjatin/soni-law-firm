import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { principles } from "@/content/home";

/** ref-2 "Our Core Values": outlined panel with list + still life. */
export function Principles() {
  return (
    <section aria-labelledby="principles-title" className="py-24 lg:py-36">
      <Container>
        <div className="grid overflow-hidden rounded-panel border border-line bg-surface lg:grid-cols-[1.15fr_1fr]">
          <div className="flex flex-col gap-12 p-8 sm:p-12 lg:p-16">
            <SectionHeading id="principles-title" eyebrow="How we work" title="Principles we hold to." />
            <ol className="grid gap-8 sm:grid-cols-2">
              {principles.map((p, i) => (
                <li key={p.title} className="flex flex-col gap-2 border-t border-line pt-5">
                  <span className="font-display text-sm font-semibold text-brass-ink tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{p.title}</h3>
                  <p className="leading-relaxed text-muted">{p.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative min-h-80 bg-stone lg:min-h-full">
            <Image
              src="/images/objects/pens-bowl.webp"
              alt="Two brass fountain pens resting crossed in a black bowl"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
