import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: { src: string; alt: string; ratio?: string; cutout?: boolean };
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-6 pb-16 lg:pb-24">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_70%_at_80%_40%,#fff_0%,transparent_70%)]"
      />
      <Container className={`grid items-end gap-12 ${image ? "lg:grid-cols-[1.3fr_1fr]" : ""}`}>
        <div className="flex animate-rise flex-col gap-6">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow mt-6">{eyebrow}</p>
          <h1 className="display text-[clamp(2.75rem,6.5vw,6rem)] text-balance">{title}</h1>
          {intro && <p className="max-w-[56ch] text-lg leading-relaxed text-muted text-pretty">{intro}</p>}
          {children}
        </div>
        {image && (
          <div
            className={`relative w-full animate-rise overflow-hidden [animation-delay:120ms] ${
              image.cutout ? "aspect-[4/5] max-h-[32rem]" : "aspect-[3/2] rounded-panel bg-stone shadow-soft"
            }`}
            style={image.ratio ? { aspectRatio: image.ratio } : undefined}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className={image.cutout ? "object-contain object-bottom" : "object-cover"}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
