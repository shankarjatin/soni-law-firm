import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { process } from "@/content/home";

export function Process() {
  return (
    <section aria-labelledby="process-title" className="on-dark relative isolate overflow-hidden bg-ink py-24 text-canvas lg:py-36">
      <Image
        src="/images/textures/architecture-columns.webp"
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-[0.14] grayscale"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-ink via-ink/70 to-ink" />

      <Container>
        <SectionHeading
          id="process-title"
          tone="dark"
          eyebrow="What to expect"
          title={
            <>
              From first call
              <br />
              to clear next steps.
            </>
          }
          intro="A simple, unhurried process. You decide whether and how to proceed."
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-card bg-canvas/10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {process.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-4 bg-ink/80 p-7 backdrop-blur-sm lg:min-h-72 lg:p-8">
              <span className="display text-6xl text-brass-light tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-auto font-display text-xl font-semibold tracking-tight">{step.title}</h3>
              <p className="leading-relaxed text-stone">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
