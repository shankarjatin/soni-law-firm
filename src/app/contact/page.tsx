import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactLink } from "@/components/ui/ContactLink";
import { PageHero } from "@/components/sections/PageHero";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { isProvided, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${site.name}: office address, phone, email, office hours and a form to request a callback.`,
  path: "/contact",
});

export default function ContactPage() {
  const { phone, whatsapp, email, address, hours, mapUrl } = site.contact;

  return (
    <>
      <PageHero
        crumbs={[{ name: "Contact", path: "/contact" }]}
        eyebrow="Contact"
        title={
          <>
            Request
            <br />a callback.
          </>
        }
        intro="Leave your name and number and the office will call you back. Please keep confidential details for that conversation — don’t send them through the website."
      />

      <section className="pb-24 lg:pb-36">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <InfoRow icon={Phone} label="Phone">
              <ContactLink kind="phone" value={phone} className="link-underline" />
            </InfoRow>
            <InfoRow icon={MessageCircle} label="WhatsApp">
              <ContactLink kind="whatsapp" value={whatsapp} className="link-underline" />
            </InfoRow>
            <InfoRow icon={Mail} label="Email">
              <ContactLink kind="email" value={email} className="link-underline break-all" />
            </InfoRow>
            <InfoRow icon={MapPin} label="Office">
              <address className="not-italic leading-relaxed">
                {address.line1}
                <br />
                {address.line2}
                <br />
                {address.city}, {address.state} {address.postalCode}
              </address>
              {isProvided(mapUrl) && (
                <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm underline underline-offset-4">
                  Get directions
                </a>
              )}
            </InfoRow>
            <InfoRow icon={Clock} label="Office hours">
              <ul className="flex flex-col gap-1">
                {hours.map((h) => (
                  <li key={h.days} className="flex flex-wrap justify-between gap-x-4">
                    <span className="text-muted">{h.days}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </InfoRow>
          </div>

          <div id="callback" className="scroll-mt-8 rounded-panel bg-surface p-7 shadow-soft sm:p-10 lg:p-12">
            <h2 className="font-display text-2xl font-semibold tracking-tight">Callback request</h2>
            <p className="mt-2 mb-8 text-muted">Takes under a minute. Fields marked * are required.</p>
            <InquiryForm />
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoRow({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5 rounded-card border border-line p-6">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink text-canvas">
        <Icon className="size-5" strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <h2 className="text-xs font-semibold tracking-[0.16em] text-muted uppercase">{label}</h2>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}
