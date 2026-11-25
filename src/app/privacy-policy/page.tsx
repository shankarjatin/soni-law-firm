import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { ContactLink } from "@/components/ui/ContactLink";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal data submitted through this website.`,
  path: "/privacy-policy",
});

// TODO(lawyer-review): draft. Confirm retention period, processors (email/hosting provider) and grievance contact before launch.
export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      path="/privacy-policy"
      updatedAt="2026-11-24"
      intro="What we collect through this website, why, and how you can reach us about your data."
    >
      <h2>What we collect</h2>
      <p>When you request a callback, we collect only what you choose to provide:</p>
      <ul>
        <li>your name and phone number (required);</li>
        <li>your email address, preferred callback time, area of law and a brief description (optional).</li>
      </ul>
      <p>
        Please do not include confidential case details, identity documents or other sensitive information in the form.
      </p>

      <h2>Why we collect it</h2>
      <p>
        We use these details only to contact you about your request, with your consent. We do not sell your data or use
        it for marketing.
      </p>

      <h2>Who can access it</h2>
      <p>
        Your request is delivered to the firm&apos;s designated inbox and is accessible only to the advocate and staff
        who need it to respond. Our website hosting and email delivery providers process the data on our behalf.
      </p>

      <h2>How long we keep it</h2>
      <p>
        Callback requests that do not lead to an engagement are deleted within [retention period] of receipt. If you
        engage the firm, your information is held as part of the client file in line with professional obligations.
      </p>

      <h2>Analytics and cookies</h2>
      <p>
        This website stores a small item in your browser to remember that you accepted the disclaimer. If analytics are
        enabled, they are configured to collect aggregate usage only — never the contents of the callback form.
      </p>

      <h2>Your rights</h2>
      <p>
        Under the Digital Personal Data Protection Act, 2023, you may ask to access, correct or erase your personal data,
        or withdraw your consent, by contacting us below.
      </p>

      <h2>Contact for privacy queries</h2>
      <p>
        Email <ContactLink kind="email" value={site.contact.email} /> or call{" "}
        <ContactLink kind="phone" value={site.contact.phone} />.
      </p>
    </LegalDocument>
  );
}
