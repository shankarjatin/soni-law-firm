/**
 * Insights / articles. Typed data keeps Phase 1 dependency-free; move to MDX or a CMS later if needed.
 * TODO(lawyer-review): every article must be reviewed and approved before launch.
 * Set `reviewedBy` only once the review has actually happened.
 */

export type InsightSection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type Insight = {
  slug: string;
  title: string;
  summary: string;
  shortAnswer: string;
  category: string;
  image: string;
  imageAlt: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  reviewedBy?: string;
  sections: InsightSection[];
  sources: { label: string; href: string }[];
};

export const insights: Insight[] = [
  {
    slug: "new-criminal-laws-bns-bnss-bsa",
    title: "BNS, BNSS and BSA: what changed when India's new criminal laws took effect",
    summary:
      "A plain-language overview of the three laws that replaced the IPC, CrPC and Indian Evidence Act on 1 July 2024.",
    shortAnswer:
      "From 1 July 2024, the Bharatiya Nyaya Sanhita (BNS) replaced the Indian Penal Code, the Bharatiya Nagarik Suraksha Sanhita (BNSS) replaced the Code of Criminal Procedure, and the Bharatiya Sakshya Adhiniyam (BSA) replaced the Indian Evidence Act. Proceedings already pending before that date generally continue under the old procedure.",
    category: "Criminal Law",
    image: "/images/objects/books-gavel.webp",
    imageAlt: "Stack of law books with a gavel resting on top",
    publishedAt: "2026-11-24",
    updatedAt: "2026-11-24",
    author: "Sony Law Firm",
    sections: [
      {
        heading: "Which laws were replaced?",
        list: [
          "Indian Penal Code, 1860 → Bharatiya Nyaya Sanhita, 2023 (offences and punishments)",
          "Code of Criminal Procedure, 1973 → Bharatiya Nagarik Suraksha Sanhita, 2023 (procedure: FIR, arrest, bail, trial)",
          "Indian Evidence Act, 1872 → Bharatiya Sakshya Adhiniyam, 2023 (rules of evidence)",
        ],
      },
      {
        heading: "Why section numbers matter",
        paragraphs: [
          "Most familiar provisions have new section numbers. For example, anticipatory bail is now under Section 482 of the BNSS (formerly Section 438 CrPC), and maintenance is under Section 144 of the BNSS (formerly Section 125 CrPC).",
          "When reading older judgments, notices or articles, it helps to check the corresponding new section.",
        ],
      },
      {
        heading: "What happens to older cases?",
        paragraphs: [
          "Investigations, inquiries and trials that were pending when the BNSS came into force generally continue under the CrPC. Offences committed before 1 July 2024 are generally dealt with under the law in force at the time they were committed.",
        ],
      },
      {
        heading: "What this means for you",
        paragraphs: [
          "If you are involved in a criminal matter, the applicable law depends on dates and facts. Seek advice specific to your situation before acting.",
        ],
      },
    ],
    sources: [
      { label: "India Code — Bharatiya Nyaya Sanhita, 2023", href: "https://www.indiacode.nic.in/" },
      { label: "Ministry of Home Affairs — New Criminal Laws", href: "https://www.mha.gov.in/" },
    ],
  },
  {
    slug: "cheque-bounce-section-138-timeline",
    title: "Cheque bounce under Section 138: the timeline that decides your case",
    summary:
      "The notice and complaint deadlines under the Negotiable Instruments Act, explained step by step.",
    shortAnswer:
      "After a cheque bounces, send a written demand notice within 30 days of receiving the bank's return memo. The drawer has 15 days from receiving the notice to pay. If they do not, the complaint must be filed before the Magistrate within one month after those 15 days end.",
    category: "Cheque Bounce",
    image: "/images/practice/cheque-bounce.webp",
    imageAlt: "Brass paperweight on a blank slip beside a fountain pen",
    publishedAt: "2026-11-24",
    updatedAt: "2026-11-24",
    author: "Sony Law Firm",
    sections: [
      {
        heading: "Step by step",
        list: [
          "The cheque must be presented within its validity period (generally three months from its date).",
          "The bank returns it unpaid and issues a return memo.",
          "Send a written demand notice to the drawer within 30 days of receiving the memo.",
          "The drawer has 15 days from receiving the notice to make payment.",
          "If unpaid, file the complaint within one month after the 15-day period expires.",
        ],
      },
      {
        heading: "What the law provides",
        paragraphs: [
          "Section 138 provides for imprisonment of up to two years, a fine of up to twice the cheque amount, or both. Under Section 143A, the court may direct the drawer to pay interim compensation of up to 20% of the cheque amount.",
        ],
      },
      {
        heading: "Documents to keep",
        list: [
          "The original cheque and bank return memo",
          "A copy of the demand notice and proof of dispatch and delivery",
          "Documents showing the debt or liability (invoices, agreements, messages)",
        ],
      },
    ],
    sources: [{ label: "India Code — Negotiable Instruments Act, 1881", href: "https://www.indiacode.nic.in/" }],
  },
  {
    slug: "consumer-complaint-basics",
    title: "Filing a consumer complaint in India: where, when and how",
    summary: "Which Consumer Commission to approach, the time limit, and how online filing works.",
    shortAnswer:
      "Under the Consumer Protection Act, 2019, a complaint generally must be filed within two years of the cause of action. The District Commission hears complaints where the value paid is up to ₹50 lakh, the State Commission above ₹50 lakh up to ₹2 crore, and the National Commission above ₹2 crore. Complaints can be filed online through e-Daakhil.",
    category: "Consumer Disputes",
    image: "/images/practice/consumer.webp",
    imageAlt: "Blank receipts and a clipboard beside a brass balance scale",
    publishedAt: "2026-11-24",
    updatedAt: "2026-11-24",
    author: "Sony Law Firm",
    sections: [
      {
        heading: "Who counts as a consumer?",
        paragraphs: [
          "Broadly, a person who buys goods or hires services for consideration, other than for resale or a commercial purpose. Online purchases are covered.",
        ],
      },
      {
        heading: "Before you file",
        list: [
          "Write to the seller or service provider and keep their reply.",
          "Collect bills, warranty cards, screenshots and complaint reference numbers.",
          "Note the date the problem arose — the two-year limit runs from then.",
        ],
      },
      {
        heading: "Where to file",
        paragraphs: [
          "You can file where you reside or work, or where the opposite party carries on business. Online filing is available through the e-Daakhil portal.",
        ],
      },
    ],
    sources: [
      { label: "India Code — Consumer Protection Act, 2019", href: "https://www.indiacode.nic.in/" },
      { label: "e-Daakhil portal", href: "https://edaakhil.nic.in/" },
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((item) => item.slug === slug);
}
