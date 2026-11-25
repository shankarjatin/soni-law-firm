import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ContactLink } from "@/components/ui/ContactLink";
import { nav, site } from "@/content/site";
import { practiceAreas } from "@/content/practice-areas";

export function SiteFooter() {
  const { address, phone, email } = site.contact;
  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-canvas">
      <Container className="grid gap-12 pt-20 pb-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
        <div className="flex flex-col gap-6">
          <Logo tone="light" />
          <p className="max-w-xs text-sm leading-relaxed text-stone">
            Advocates and legal consultants. Information on this website is general and is not legal advice.
          </p>
        </div>

        <FooterColumn title="Explore">
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="link-underline">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Practice areas">
          {practiceAreas.slice(0, 6).map((area) => (
            <li key={area.slug}>
              <Link href={`/practice-areas/${area.slug}`} className="link-underline">
                {area.name}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Office">
          <li>
            <address className="not-italic leading-relaxed">
              {address.line1}
              <br />
              {address.city}, {address.state} {address.postalCode}
            </address>
          </li>
          <li>
            <ContactLink kind="phone" value={phone} className="link-underline" />
          </li>
          <li>
            <ContactLink kind="email" value={email} className="link-underline" />
          </li>
        </FooterColumn>
      </Container>

      {/* Oversized wordmark (ref-1). Decorative — the name is already in the logo above. */}
      <div aria-hidden="true" className="pointer-events-none select-none">
        <p className="display -mb-[0.18em] text-center text-[clamp(4rem,17vw,17rem)] leading-none text-ink-soft">
          {site.shortName} Law
        </p>
      </div>

      <div className="relative border-t border-canvas/10">
        <Container className="flex flex-col gap-4 py-6 text-xs text-stone md:flex-row md:items-center md:justify-between">
          <p>
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link href="/disclaimer" className="link-underline">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="link-underline">
                Privacy policy
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-xs font-semibold tracking-[0.18em] text-brass-light uppercase">{title}</h2>
      <ul className="mt-5 flex flex-col gap-3 text-sm">{children}</ul>
    </div>
  );
}
