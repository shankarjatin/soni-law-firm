import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ContactLink } from "@/components/ui/ContactLink";
import { LinkButton } from "@/components/ui/LinkButton";
import { isProvided, site } from "@/content/site";

export function ContactCTA({ title = "Talk it through with an advocate." }: { title?: string }) {
  const { phone } = site.contact;
  return (
    <section aria-labelledby="cta-title" className="pb-24 lg:pb-36">
      <Container>
        <div className="on-dark relative isolate overflow-hidden rounded-panel bg-ink px-8 py-14 text-canvas sm:px-14 lg:px-20 lg:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(45%_80%_at_85%_60%,rgba(168,134,90,0.35),transparent_70%)]"
          />
          <div className="absolute -right-10 bottom-0 -z-10 hidden aspect-[740/1476] h-[94%] md:block lg:right-16">
            <Image
              src="/images/hero/lady-justice-india-bronze.webp"
              alt=""
              fill
              sizes="30vw"
              className="object-contain object-bottom"
            />
          </div>

          <div className="flex max-w-xl flex-col gap-6">
            <p className="eyebrow text-brass-light">Request a callback</p>
            <h2 id="cta-title" className="display text-[clamp(2.25rem,4.5vw,4rem)] text-balance">
              {title}
            </h2>
            <p className="text-lg leading-relaxed text-stone">
              Share your name, number and a one-line outline. The office will call you back to understand the matter —
              please keep confidential details for that conversation.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <LinkButton href="/contact#callback" variant="light">
                Request a callback
              </LinkButton>
              {isProvided(phone) && (
                <ContactLink kind="phone" value={phone} className="btn btn-ghost-dark">
                  Call {phone}
                </ContactLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
