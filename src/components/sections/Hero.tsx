import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/LinkButton";
import { site } from "@/content/site";

export function Hero() {
  const { advocate, contact } = site;
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Soft studio light behind the statue */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(55%_65%_at_50%_70%,#fff_0%,transparent_70%)] lg:bg-[radial-gradient(45%_75%_at_72%_50%,#fff_0%,transparent_70%)]"
      />

      <Container className="lg:relative lg:flex lg:h-[clamp(44rem,calc(100dvh-6rem),58rem)] lg:flex-col">
        <div className="relative z-20 max-w-[34rem] animate-rise pt-6 lg:max-w-[30rem] lg:pt-10 xl:max-w-[40rem]">
          <p className="eyebrow">
            {site.tagline} · {contact.address.city}
          </p>
          <h1 id="hero-title" className="display mt-6 text-[clamp(2.75rem,5.4vw,5.75rem)]">
            Clear counsel,
            <br />
            grounded in
            <br />
            Indian law.
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted text-pretty">
            Legal advice and representation for individuals, families and businesses — explained in plain language,
            handled with discretion.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <LinkButton href="/contact#callback">Request a callback</LinkButton>
            <LinkButton href="/practice-areas" variant="secondary">
              Practice areas
            </LinkButton>
          </div>
        </div>

        {/* Statue + oversized word (ref-1). Relative block on mobile; on desktop it positions against the container. */}
        <div className="relative -mx-5 mt-10 h-[34rem] sm:-mx-8 sm:h-[40rem] lg:static lg:m-0 lg:h-auto">
          <div className="absolute bottom-0 left-1/2 z-10 aspect-[738/1465] h-[96%] -translate-x-1/2 lg:top-[3%] lg:right-[8%] lg:left-auto lg:h-auto lg:translate-x-0 xl:right-[19%]">
            {/* The word sits behind the statue and stays centred under her at every width. */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-start select-none">
              <p className="mb-3 flex items-center gap-3 text-xs text-muted sm:text-sm">
                <span lang="hi" className="text-base text-ink">
                  न्याय
                </span>
                <span aria-hidden="true" className="h-px w-6 bg-brass" />
                <span>
                  <i lang="sa-Latn">Nyāya</i> — justice, in Sanskrit
                </span>
              </p>
              <p
                aria-hidden="true"
                className="display -mb-[0.1em] text-[clamp(6rem,24vw,9rem)] leading-[0.78] whitespace-nowrap lg:text-[16vw] 2xl:text-[15rem]"
              >
                Nyaya
              </p>
            </div>
            <Image
              src="/images/hero/lady-justice-india-marble.webp"
              alt="Marble sculpture of the Indian Lady of Justice, eyes open, in a saree, holding balanced scales and a book representing the Constitution of India"
              fill
              priority
              sizes="(min-width: 1024px) 34vw, 70vw"
              className="z-10 animate-rise object-contain object-bottom [animation-delay:150ms]"
            />
          </div>
        </div>

        {/* Floating factual card (ref-3). Facts only — never stats or client counts. */}
        <aside
          aria-label="Practice details"
          className="glass absolute top-[14%] right-8 z-20 hidden w-60 animate-rise rounded-card p-5 [animation-delay:300ms] xl:block"
        >
          <p className="text-xs font-semibold tracking-[0.18em] text-brass-ink uppercase">Practising before</p>
          <ul className="mt-3 flex flex-col gap-1.5 text-sm text-ink">
            {advocate.courts.map((court) => (
              <li key={court}>{court}</li>
            ))}
          </ul>
          <div className="my-4 h-px bg-line" />
          <p className="text-xs font-semibold tracking-[0.18em] text-brass-ink uppercase">Office hours</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            {contact.hours.map((h) => (
              <li key={h.days} className="flex flex-col">
                <span className="text-muted">{h.days}</span>
                <span>{h.time}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Bottom-left mini card (ref-3 "Your rights is our mission"), pointing to the insights. */}
        <Link
          href="/insights"
          className="glass group absolute bottom-10 left-8 z-20 hidden w-[19rem] animate-rise items-center gap-4 rounded-card p-3 pr-5 [animation-delay:450ms] lg:flex"
        >
          <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-stone">
            <Image src="/images/hero/detail-constitution-hand.webp" alt="" fill sizes="64px" className="object-cover" />
          </span>
          <span className="flex flex-col gap-1">
            <span className="font-display text-sm font-semibold tracking-wide uppercase">Know your rights</span>
            <span className="text-sm leading-snug text-muted">Plain-language guides to Indian law</span>
          </span>
          <ArrowUpRight
            className="ml-auto size-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </Container>
    </section>
  );
}
