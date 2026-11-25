/**
 * Home-page copy that is not a firm fact.
 * TODO(lawyer-review): approve principles, process and glossary wording before launch.
 */
import type { FAQ } from "./practice-areas";

export const principles = [
  {
    title: "Confidentiality",
    text: "What you share stays protected. Sensitive details are discussed in person or over a call, not through web forms.",
  },
  {
    title: "Candour",
    text: "A clear view of where you stand — including risks and alternatives — before any step is taken.",
  },
  {
    title: "Preparation",
    text: "Careful reading of documents, timelines and the law before every filing and hearing.",
  },
  {
    title: "Plain language",
    text: "Legal procedure explained in words you can act on, with regular updates as the matter moves.",
  },
];

export const process = [
  {
    title: "Reach out",
    text: "Request a callback or call the office. Share only a brief, non-confidential outline.",
  },
  {
    title: "First conversation",
    text: "We understand the issue, check for conflicts and tell you which documents to bring.",
  },
  {
    title: "Your options",
    text: "You receive an explanation of the legal position, possible routes, timelines and fees.",
  },
  {
    title: "Engagement",
    text: "If you decide to proceed, we agree terms in writing and the matter begins.",
  },
];

export const glossary = [
  {
    term: "Vakalatnama",
    definition: "A document by which a person authorises an advocate to appear and act for them in a court case.",
  },
  {
    term: "Affidavit",
    definition: "A written statement of facts, signed and sworn or affirmed before an authorised officer such as a notary.",
  },
  {
    term: "Legal notice",
    definition: "A formal written communication setting out a claim or demand, usually sent before legal proceedings begin.",
  },
  {
    term: "Anticipatory bail",
    definition: "A court direction that a person be released on bail if arrested, sought before the arrest happens.",
  },
  {
    term: "Arbitration",
    definition: "A private process in which an arbitrator decides a dispute; the award is binding and enforceable like a decree.",
  },
  {
    term: "Conveyancing",
    definition: "Preparing and registering the documents that transfer ownership of property from one person to another.",
  },
];

export const generalFaqs: FAQ[] = [
  {
    question: "Does submitting a callback request make me a client?",
    answer:
      "No. A callback request only asks the office to contact you. An advocate–client relationship begins only after both sides agree to it, usually in writing.",
  },
  {
    question: "What should I write in the callback form?",
    answer:
      "Just your name, phone number and a one-line outline of the issue. Please do not share confidential facts or documents through the website — these are discussed directly with the advocate.",
  },
  {
    question: "What should I bring to the first meeting?",
    answer:
      "Any notices, agreements, court papers, receipts or correspondence related to the matter, along with a short timeline of events in your own words.",
  },
  {
    question: "Is the information on this website legal advice?",
    answer:
      "No. Articles and FAQs here are general information about Indian law. Every situation is different, so please seek advice on your specific facts.",
  },
];
