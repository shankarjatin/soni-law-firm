import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Disclaimer",
  description: `Website disclaimer for ${site.name}, in line with the Bar Council of India rules on advertising and solicitation.`,
  path: "/disclaimer",
});

// TODO(lawyer-review): draft wording — must be reviewed and approved by the advocate before launch.
export default function DisclaimerPage() {
  return (
    <LegalDocument
      title="Disclaimer"
      path="/disclaimer"
      updatedAt="2026-11-24"
      intro="Please read this before relying on anything on this website."
    >
      <h2>Bar Council of India rules</h2>
      <p>
        The Bar Council of India does not permit advocates to solicit work or advertise in any form. This website is
        meant only to provide information about {site.name}, its advocates and areas of practice to those who seek it
        on their own accord.
      </p>
      <p>By accessing this website, you acknowledge and confirm that:</p>
      <ul>
        <li>you are seeking information relating to {site.name} of your own accord;</li>
        <li>there has been no advertisement, personal communication, solicitation, invitation or inducement of any sort by the firm or any of its members to solicit work through this website;</li>
        <li>any information obtained or material downloaded from this website is entirely at your own volition.</li>
      </ul>

      <h2>Not legal advice</h2>
      <p>
        The content on this website is general information about Indian law and procedure. It is not legal advice and
        should not be relied on as a substitute for advice on your specific facts. Laws and procedures change; content
        reflects the position on the date shown on each page.
      </p>

      <h2>No advocate–client relationship</h2>
      <p>
        Visiting this website, reading its content, or submitting a callback request does not create an advocate–client
        relationship. Such a relationship arises only when the firm agrees to act for you, usually confirmed in writing.
      </p>

      <h2>Confidentiality</h2>
      <p>
        Please do not send confidential or sensitive information through this website. Information sent before an
        engagement may not be treated as privileged.
      </p>

      <h2>No guarantee of outcome</h2>
      <p>
        Nothing on this website is a promise or prediction of the outcome of any matter. Every case depends on its own
        facts and the applicable law.
      </p>

      <h2>External links</h2>
      <p>
        Links to external websites, such as government portals, are provided for convenience. The firm is not
        responsible for their content or availability.
      </p>
    </LegalDocument>
  );
}
