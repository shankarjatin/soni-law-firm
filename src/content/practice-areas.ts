/**
 * Practice areas.
 * TODO(client): keep only the areas the firm actually offers.
 * TODO(lawyer-review): every description, list item and FAQ must be reviewed by the advocate before launch.
 */

export type FAQ = { question: string; answer: string };

export type PracticeArea = {
  slug: string;
  name: string;
  shortDescription: string;
  overview: string;
  image: string;
  imageAlt: string;
  situations: string[];
  assistance: string[];
  considerations: string[];
  faqs: FAQ[];
  relatedInsights: string[];
  updatedAt: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "civil-litigation",
    name: "Civil Litigation",
    shortDescription: "Suits for recovery, injunctions, declarations and other civil disputes before civil courts.",
    overview:
      "Civil disputes arise when rights over money, property, contracts or obligations are contested. They are generally decided by civil courts under the Code of Civil Procedure, 1908, and most claims must be brought within the time limits set by the Limitation Act, 1963.",
    image: "/images/practice/civil-litigation.webp",
    imageAlt: "Case files tied with red tape beside a gavel on marble",
    situations: [
      "Money owed under an agreement, invoice or loan that has not been repaid",
      "Need to stop someone from acting against your rights (injunction)",
      "Disputes over possession, ownership or boundaries of property",
      "Enforcing the terms of a contract (specific performance)",
      "Responding to a suit or legal notice you have received",
    ],
    assistance: [
      "Reviewing documents and explaining your legal position in plain language",
      "Drafting and replying to legal notices",
      "Preparing and filing suits, written statements and applications",
      "Representation at hearings, evidence and arguments",
    ],
    considerations: [
      "Limitation periods matter — delay can bar an otherwise valid claim.",
      "Keep original documents, correspondence and payment records safe.",
      "Some disputes may be resolved faster through mediation or settlement.",
    ],
    faqs: [
      {
        question: "How long does a civil case take in India?",
        answer:
          "It varies widely with the court, the type of suit and how contested it is. Some matters settle in months, others take years. An advocate can give a realistic view only after reviewing the facts and the court concerned.",
      },
      {
        question: "Is a legal notice required before filing a civil suit?",
        answer:
          "Not always. It is mandatory in certain cases — for example, suits against the Government under Section 80 of the Code of Civil Procedure — and is often sent in other cases to record the claim and give the other side a chance to respond.",
      },
    ],
    relatedInsights: [],
    updatedAt: "2026-11-24",
  },
  {
    slug: "criminal-law",
    name: "Criminal Law",
    shortDescription: "Bail, anticipatory bail, FIR and complaint matters, trials and appeals under the new criminal laws.",
    overview:
      "Since 1 July 2024, criminal law in India is governed by the Bharatiya Nyaya Sanhita (BNS), the Bharatiya Nagarik Suraksha Sanhita (BNSS) and the Bharatiya Sakshya Adhiniyam (BSA), which replaced the IPC, CrPC and Indian Evidence Act. Matters that began earlier may still proceed under the old laws.",
    image: "/images/practice/criminal-law.webp",
    imageAlt: "Brass balance scale casting a long shadow on stone",
    situations: [
      "Seeking regular bail or anticipatory bail",
      "An FIR has been registered against you or you wish to report an offence",
      "Receiving a summons or notice from police or court",
      "Representation during trial, or filing an appeal or revision",
      "Seeking to quash proceedings before the High Court",
    ],
    assistance: [
      "Explaining the charges, procedure and your rights at each stage",
      "Drafting and arguing bail and anticipatory bail applications",
      "Representation during trial and cross-examination",
      "Appeals, revisions and petitions before higher courts",
    ],
    considerations: [
      "Do not make statements without understanding your rights.",
      "Keep copies of the FIR, notices and any documents served on you.",
      "Time-sensitive steps such as bail should be addressed promptly.",
    ],
    faqs: [
      {
        question: "What is anticipatory bail?",
        answer:
          "Anticipatory bail is a direction that a person be released on bail if arrested. It is sought from the Sessions Court or High Court by someone who apprehends arrest for a non-bailable offence. Under the BNSS it is dealt with in Section 482 (formerly Section 438 of the CrPC).",
      },
      {
        question: "Do the new criminal laws apply to old cases?",
        answer:
          "Generally, investigations, inquiries and trials that were pending when the BNSS came into force continue under the earlier CrPC. Which law applies to a particular matter should be checked on its facts.",
      },
    ],
    relatedInsights: ["new-criminal-laws-bns-bnss-bsa"],
    updatedAt: "2026-11-24",
  },
  {
    slug: "family-matrimonial",
    name: "Family & Matrimonial",
    shortDescription: "Divorce, maintenance, child custody, domestic violence and related family matters.",
    overview:
      "Family matters in India are shaped by personal laws — such as the Hindu Marriage Act, 1955 and the Special Marriage Act, 1954 — along with laws on maintenance, guardianship and protection from domestic violence. They are usually heard by Family Courts.",
    image: "/images/practice/family-matrimonial.webp",
    imageAlt: "Two gold rings resting apart on a closed ivory book",
    situations: [
      "Divorce by mutual consent or contested divorce",
      "Claims for maintenance for a spouse, child or parent",
      "Child custody, visitation and guardianship",
      "Protection orders under the Domestic Violence Act, 2005",
      "Restitution of conjugal rights or judicial separation",
    ],
    assistance: [
      "Explaining which law applies and the options available",
      "Drafting petitions, replies and settlement terms",
      "Representation before Family Courts and in mediation",
      "Handling matters with discretion and sensitivity",
    ],
    considerations: [
      "The applicable law can depend on religion and how the marriage was registered.",
      "Mediation is commonly encouraged in family disputes.",
      "The welfare of the child is the primary consideration in custody matters.",
    ],
    faqs: [
      {
        question: "How does divorce by mutual consent work?",
        answer:
          "Under Section 13B of the Hindu Marriage Act, spouses who have lived separately for at least one year can jointly petition for divorce. A second motion normally follows after six months, though courts may waive this period in suitable cases.",
      },
      {
        question: "Can maintenance be claimed without filing for divorce?",
        answer:
          "Yes. Maintenance can be claimed independently, for example under Section 144 of the BNSS (formerly Section 125 of the CrPC) or under the applicable personal law.",
      },
    ],
    relatedInsights: [],
    updatedAt: "2026-11-24",
  },
  {
    slug: "property-real-estate",
    name: "Property & Real Estate",
    shortDescription: "Title verification, sale and lease documents, RERA complaints, partition and tenancy disputes.",
    overview:
      "Property matters involve both documentation and disputes. Transfers are generally completed by registered documents under the Registration Act, 1908 with stamp duty payable under state law, and buyers of under-construction projects have remedies under the Real Estate (Regulation and Development) Act, 2016.",
    image: "/images/practice/property-real-estate.webp",
    imageAlt: "Marble house model with a rolled blueprint and brass key",
    situations: [
      "Checking title and documents before buying property",
      "Drafting or reviewing sale deeds, agreements to sell and leases",
      "Delayed possession or defects in a builder project (RERA)",
      "Partition of family property among co-owners",
      "Disputes with tenants or landlords",
    ],
    assistance: [
      "Title search and document review",
      "Drafting and registration support for property documents",
      "Complaints before the state RERA authority",
      "Partition, possession and injunction suits",
    ],
    considerations: [
      "Stamp duty and registration rules differ from state to state.",
      "A lease for more than one year generally needs to be registered.",
      "Always verify the chain of title and encumbrances before paying.",
    ],
    faqs: [
      {
        question: "What should I check before buying a flat or plot?",
        answer:
          "Commonly checked items include the chain of title documents, encumbrance certificate, approved building plans, RERA registration for new projects, and property tax and utility records. The exact list depends on the property and state.",
      },
      {
        question: "Why are many rent agreements made for 11 months?",
        answer:
          "Leases of immovable property for more than one year must generally be registered. Shorter agreements are often used to avoid compulsory registration, though they offer less protection and should still be properly drafted and stamped.",
      },
    ],
    relatedInsights: [],
    updatedAt: "2026-11-24",
  },
  {
    slug: "corporate-commercial",
    name: "Corporate & Commercial",
    shortDescription: "Contracts, business disputes, company and LLP compliance, and commercial suits.",
    overview:
      "Businesses rely on clear contracts and timely dispute resolution. Commercial disputes above the specified value are heard under the Commercial Courts Act, 2015, which generally requires pre-institution mediation before a suit is filed unless urgent interim relief is sought.",
    image: "/images/practice/corporate-commercial.webp",
    imageAlt: "Brass fountain pen on a blank contract in a leather portfolio",
    situations: [
      "Drafting or reviewing commercial contracts and agreements",
      "Recovering unpaid dues from customers or vendors",
      "Partnership, LLP or shareholder disagreements",
      "Delayed payments to an MSME supplier",
      "Company law compliance and notices",
    ],
    assistance: [
      "Contract drafting, review and negotiation support",
      "Pre-institution mediation and commercial suits",
      "Recovery notices and proceedings",
      "Advice on business structure and compliance",
    ],
    considerations: [
      "Well-drafted dispute-resolution clauses save time later.",
      "Keep written records of orders, deliveries and payments.",
      "MSMEs registered under the MSMED Act have specific remedies for delayed payment.",
    ],
    faqs: [
      {
        question: "Is mediation compulsory before a commercial suit?",
        answer:
          "Under Section 12A of the Commercial Courts Act, 2015, a commercial suit that does not seek urgent interim relief must first go through pre-institution mediation.",
      },
    ],
    relatedInsights: [],
    updatedAt: "2026-11-24",
  },
  {
    slug: "cheque-bounce",
    name: "Cheque Bounce (Section 138)",
    shortDescription: "Notices, complaints and defence in cheque dishonour cases under the Negotiable Instruments Act.",
    overview:
      "When a cheque given for a debt or liability is returned unpaid, Section 138 of the Negotiable Instruments Act, 1881 provides a criminal remedy. The process follows strict timelines, so acting quickly after the cheque is returned is important.",
    image: "/images/practice/cheque-bounce.webp",
    imageAlt: "Brass paperweight on a blank slip beside a fountain pen",
    situations: [
      "A cheque you received was returned for insufficient funds",
      "You received a demand notice for a dishonoured cheque",
      "Filing or defending a complaint before the Magistrate",
      "Seeking interim compensation during the case",
    ],
    assistance: [
      "Drafting and sending the statutory demand notice",
      "Filing the complaint within the time limit",
      "Defending complaints and exploring settlement",
      "Representation through trial and appeal",
    ],
    considerations: [
      "The demand notice must be sent within 30 days of receiving the bank's return memo.",
      "The drawer then has 15 days from receiving the notice to pay.",
      "The complaint must be filed within one month after those 15 days expire.",
    ],
    faqs: [
      {
        question: "What is the punishment for cheque bounce?",
        answer:
          "Section 138 provides for imprisonment of up to two years, a fine of up to twice the cheque amount, or both. Courts may also order interim compensation of up to 20% of the cheque amount under Section 143A.",
      },
      {
        question: "Can a cheque bounce case be settled?",
        answer:
          "Yes. The offence is compoundable, and many cases are settled by payment at different stages of the proceedings.",
      },
    ],
    relatedInsights: ["cheque-bounce-section-138-timeline"],
    updatedAt: "2026-11-24",
  },
  {
    slug: "consumer-disputes",
    name: "Consumer Disputes",
    shortDescription: "Complaints for defective goods, deficient services and unfair trade practices.",
    overview:
      "The Consumer Protection Act, 2019 lets consumers seek relief for defective goods, deficient services and unfair trade practices before District, State and National Commissions, depending on the value of goods or services paid for.",
    image: "/images/practice/consumer.webp",
    imageAlt: "Blank receipts and a clipboard beside a brass balance scale",
    situations: [
      "A product is defective and the seller will not replace or refund it",
      "Deficient service from a bank, insurer, builder, airline or hospital",
      "Insurance claims rejected without valid reason",
      "Misleading advertisements or unfair trade practices",
    ],
    assistance: [
      "Assessing whether you have a consumer complaint",
      "Drafting and filing complaints, including online through e-Daakhil",
      "Representation before the Consumer Commission",
      "Appeals to the State or National Commission",
    ],
    considerations: [
      "A complaint should generally be filed within two years of the cause of action.",
      "Keep bills, warranty cards, emails and complaint references.",
      "Complaints can be filed where the consumer resides or works.",
    ],
    faqs: [
      {
        question: "Which Consumer Commission should I approach?",
        answer:
          "It depends on the value paid for the goods or services. Currently, the District Commission handles complaints up to ₹50 lakh, the State Commission above ₹50 lakh up to ₹2 crore, and the National Commission above ₹2 crore.",
      },
    ],
    relatedInsights: ["consumer-complaint-basics"],
    updatedAt: "2026-11-24",
  },
  {
    slug: "arbitration-mediation",
    name: "Arbitration & Mediation",
    shortDescription: "Resolving disputes outside court through arbitration, mediation and settlement.",
    overview:
      "Arbitration under the Arbitration and Conciliation Act, 1996 lets parties have their dispute decided privately by an arbitrator, with an award that is enforceable like a court decree. Mediation helps parties reach a voluntary settlement with the help of a neutral mediator.",
    image: "/images/practice/arbitration-adr.webp",
    imageAlt: "Two empty leather chairs facing each other across a marble table",
    situations: [
      "Your contract contains an arbitration clause and a dispute has arisen",
      "Seeking urgent interim protection from court before or during arbitration",
      "Challenging or enforcing an arbitral award",
      "Exploring settlement through mediation",
    ],
    assistance: [
      "Invoking arbitration and appointing arbitrators",
      "Preparing pleadings and representing you before the tribunal",
      "Applications for interim measures under Section 9",
      "Challenges and enforcement of awards",
    ],
    considerations: [
      "Check your contract's dispute-resolution clause first.",
      "An application to set aside an award must be filed within three months of receiving it.",
      "Arbitration is private and can be faster than a civil suit.",
    ],
    faqs: [
      {
        question: "Is an arbitral award final?",
        answer:
          "An award is binding on the parties. It can be challenged only on limited grounds under Section 34 of the Arbitration and Conciliation Act, generally within three months of receiving it.",
      },
    ],
    relatedInsights: [],
    updatedAt: "2026-11-24",
  },
  {
    slug: "legal-documentation",
    name: "Legal Documentation",
    shortDescription: "Wills, agreements, powers of attorney, affidavits and legal notices.",
    overview:
      "Clear, correctly executed documents prevent disputes. Some documents must be registered or stamped to be valid or admissible; others, like a will, can be valid without registration if properly executed and witnessed.",
    image: "/images/practice/documentation.webp",
    imageAlt: "Fountain pen and brass seal press on folded parchment",
    situations: [
      "Making a will or planning succession",
      "Drafting partnership, service or loan agreements",
      "Granting a power of attorney",
      "Preparing affidavits, declarations and legal notices",
    ],
    assistance: [
      "Drafting documents suited to your purpose",
      "Advice on stamping, notarisation and registration",
      "Reviewing documents prepared by the other side",
    ],
    considerations: [
      "Stamp duty depends on the document and the state.",
      "A will must be signed by the testator and attested by two witnesses.",
      "Registration is optional for a will but compulsory for many property documents.",
    ],
    faqs: [
      {
        question: "Does a will need to be registered?",
        answer:
          "No. Registration of a will is optional in India. A will is valid if it is properly signed by the person making it and attested by two witnesses, though registration can help prove it later.",
      },
    ],
    relatedInsights: [],
    updatedAt: "2026-11-24",
  },
];

export function getPracticeArea(slug: string) {
  return practiceAreas.find((area) => area.slug === slug);
}
