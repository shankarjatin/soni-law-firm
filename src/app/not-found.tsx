import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";

export default function NotFound() {
  return (
    <section className="py-16 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <p className="eyebrow">Error 404</p>
          <h1 className="display text-[clamp(3rem,7vw,6.5rem)]">
            Page not
            <br />
            found.
          </h1>
          <p className="max-w-[44ch] text-lg leading-relaxed text-muted">
            The page you were looking for has moved or no longer exists.
          </p>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/">Back to home</LinkButton>
            <LinkButton href="/practice-areas" variant="secondary">
              Practice areas
            </LinkButton>
          </div>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-panel bg-stone">
          <Image src="/images/objects/gavel.webp" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
      </Container>
    </section>
  );
}
