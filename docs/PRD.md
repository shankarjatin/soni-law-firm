# Sony Law Firm Website — Product Requirements Document (PRD)

**Project:** Sony Law Firm Website  
**Document:** Product Requirements Document (PRD)  
**Status:** Draft — discovery/design inputs pending  
**Version:** 0.1  
**Date:** 24 November 2026  
**Primary reference:** https://aglaw.in/ (content/structure inspiration only; not a visual reference)

---

## 1. Product Overview

Sony Law Firm needs a premium, modern, informative website that introduces the legal practice, communicates its professional profile and areas of practice, makes relevant information easy to understand, and gives visitors a straightforward way to request a callback or consultation.

The website is not to be designed as a generic lawyer template or as a clone of the reference website. The design will be determined from user-provided visual references. The reference site is used only to understand useful content patterns: firm overview, expertise/practice areas, professional profiles, insights, contact information, and a contact inquiry form.

### Product vision
Create a fast, mobile-first legal information and contact platform that conveys **clarity, discretion, professionalism, and trust** and is discoverable through search engines and answer engines.

### Product principles
- Trust before decoration: no exaggerated claims, fabricated achievements, or unverifiable outcomes.
- Clear language: legal services and topics should be understandable to non-lawyers.
- Responsive and accessible: mobile is a first-class experience.
- Privacy-minded: collect only what is needed to respond to an inquiry.
- Performance-minded: optimize image, fonts, scripts, and rendering.
- Search-friendly: useful content, strong information architecture, structured data only when factual.
- Conversion without pressure: the main contact action should be clear, respectful, and not manipulative.

## 2. Goals and Success Measures

### Business goals
1. Establish an online professional presence for Sony Law Firm.
2. Communicate the lawyer/firm's profile, experience, services, and approach.
3. Increase relevant consultation/callback inquiries.
4. Build topical authority through practice-area pages and legal information/insights.
5. Improve visibility for relevant location + practice-area searches.

### Product success metrics (baseline to be established after launch)
- Inquiry form submission count and submission rate.
- Callback/contact click-throughs (phone, email, WhatsApp if approved).
- Organic impressions, clicks, average position, and indexed pages.
- Landing-page engagement (scroll depth, engaged sessions, practice-area navigation).
- Core Web Vitals and page-load performance.
- Spam/invalid submission rate.

Do not set targets until baseline traffic, firm location, services, and available analytics are known.

## 3. Audiences and User Needs

### Primary audience: Prospective client / individual
Needs to understand whether the lawyer handles their legal concern, how to reach the office, what information to provide, and what happens after submitting a callback request.

### Secondary audience: Business / organization representative
Needs to assess relevant practice areas, professional experience, process, and contact options.

### Secondary audience: Existing client or referral
Needs contact details, office directions, updates, and relevant information quickly.

### Audience assumptions to validate
- Visitor may not know the formal name of their legal issue.
- Visitor may be anxious or time-constrained; page language should be calm and plain.
- Many visits will come from mobile devices and search results.
- Visitors should not be asked to share confidential case documents or detailed sensitive facts in a public form.

## 4. Scope

### In scope for Phase 1
- Responsive marketing/information website.
- Home page.
- About / lawyer profile page or section.
- Practice-area index and individual practice-area pages (based on verified services).
- Legal insights/articles section with CMS-ready content model or markdown-based content.
- Frequently asked questions (FAQs), when reviewed for accuracy.
- Contact page with contact details, map/location, office hours if supplied.
- Callback / consultation inquiry form.
- Confirmation state after submission.
- SEO metadata, sitemap, robots, canonical URLs, Open Graph metadata.
- AEO/GEO-friendly content structure and factual structured data.
- Privacy policy, website disclaimer, and appropriate legal-information notices.
- Analytics/event tracking with privacy-aware configuration.
- Error, empty, loading, and success states.

### Not in Phase 1 unless separately approved
- Online payment or retainers.
- Client portal, login, document vault, case tracking, or legal matter management.
- Automated legal advice, case outcome predictions, or AI chat that gives legal advice.
- Online appointment calendar with confirmed slots and calendar sync.
- Multilingual content beyond the agreed languages.
- Testimonials, awards, rankings, client logos, case studies, or claims without approval and legal review.
- Complex CRM integrations.

## 5. Sitemap / Information Architecture

Proposed sitemap (final labels depend on verified firm details):

- `/` — Home
- `/about` — About the firm / lawyer
- `/practice-areas` — Practice areas overview
- `/practice-areas/[slug]` — Individual practice area detail
- `/insights` — Articles, explainers, legal updates
- `/insights/[slug]` — Article detail
- `/contact` — Contact, office information, inquiry form
- `/privacy-policy` — Privacy policy
- `/disclaimer` — Website and legal-information disclaimer
- `/thank-you` or inline confirmation — Inquiry confirmation (no indexable thin page unless designed intentionally)

Optional later pages: team, representative matters (only if permitted and carefully anonymized), resources, FAQ hub, careers.

## 6. Page Requirements

### 6.1 Home page
Purpose: quickly establish identity, expertise, and a route to contact or explore.\nRequired content blocks:
1. Header/navigation: logo/wordmark, Home, About, Practice Areas, Insights, Contact; CTA may be “Request a Callback” or “Contact the Office.”
2. Hero: short positioning statement, supporting sentence, primary contact action, secondary link to practice areas; visual must be based on supplied references.
3. Professional introduction: concise firm/lawyer overview with verified credentials and approach.
4. Practice-area preview: curated cards, each linking to a detail page.
5. Approach/process: a simple 3–4 step explanation of how an inquiry is handled, subject to lawyer approval.
6. Experience/credentials: only verifiable facts (years, qualifications, memberships, court experience, etc.). Do not invent numbers.
7. Insights preview: latest useful legal information articles.
8. FAQ preview: answers to common questions, reviewed by the lawyer.
9. Contact/callback section.
10. Footer: navigation, address, contact, legal notices, privacy, social links only if supplied.

### 6.2 About page
- Lawyer/firm name and professional title as verified.
- Professional biography, education, enrollment/membership details if approved for publication.
- Practice philosophy and client communication approach.
- Experience summary without unverified superlatives.
- Portrait/headshot, if provided or generated as a non-identifying editorial image (never fabricate a lawyer portrait).
- Clear contact link.

### 6.3 Practice-area index
- List only practice areas actually offered.
- Short, plain-language descriptions.
- Group related services where helpful.
- Filter/search can be added only if the number of areas warrants it; no unnecessary UI.

### 6.4 Practice-area detail page
Each page should include:
- Practice area name and concise overview.
- Common legal situations/questions this area may relate to (informational, not a guarantee of representation).
- How the firm may assist, based on confirmed service scope.
- Relevant procedure/considerations in plain language, with reviewed facts.
- FAQs.
- Related insights.
- Contact/callback CTA.
- Breadcrumbs and unique metadata.
- Author/reviewer information where content is lawyer-reviewed and approved.

### 6.5 Insights / articles
- Article listing with categories/tags, optional search.
- Article page with title, summary, publication/update date, author/reviewer, body, related content.
- Table of contents for longer articles.
- Sources/citations for legal updates when appropriate.
- Visible note that information is general and not legal advice.
- Article content should be date-aware and maintained when laws or procedures change.
- No AI-generated legal claims published without human legal review.

### 6.6 Contact page
- Verified office address and map embed/link (if applicable).
- Phone, email, and office hours only if supplied.
- Inquiry/callback form.
- Contact methods should work on mobile (tel/mailto links).
- Avoid exposing personal contact details unless approved.

### 6.7 Callback / inquiry form
Suggested fields:
- Full name (required)
- Phone number (required; India phone validation if India is confirmed)
- Email (optional unless operationally required)
- Preferred callback time (optional, with a small set of ranges)
- Legal matter category (optional dropdown populated from approved practice areas; “Not sure” available)
- Brief description (optional; limited length; guidance: do not include confidential information, documents, or sensitive details)
- Consent checkbox (required): consent to be contacted about this inquiry and acknowledgement of privacy notice

Form behavior:
- Client-side and server-side validation.
- Clear labels and accessible errors.
- Loading state; prevent accidental duplicate submits.
- Success state explaining that the request was received but a callback is not guaranteed at a specific time.
- Failure state with a safe retry and alternate contact option.
- Spam protection (honeypot and rate limiting; CAPTCHA only if spam warrants it).
- Never include submitted personal details in URLs, analytics events, or client-visible logs.
- Store submissions securely and restrict access.
- Define retention/deletion policy before launch.
- Do not accept file uploads in Phase 1.

## 7. Content Requirements

Content must be based on client-provided and lawyer-verified information. Required content inventory:
- Firm/lawyer official name and branding.
- Short positioning/intro.
- Detailed bio and professional timeline.
- Education, bar/enrollment, qualifications, memberships (only approved).
- Verified practice areas and descriptions.
- Location, contact information, office hours.
- Consultation/callback process.
- FAQs.
- Article topics and review workflow.
- Privacy policy and disclaimer text reviewed for jurisdiction and applicable rules.
- Approved photographs and logo.

Content tone: confident, clear, composed, empathetic, professional; avoid fear-based copy and absolute outcome promises.

## 8. SEO Requirements

- One unique title and meta description per indexable page.
- Semantic HTML: one clear H1; logical H2/H3 hierarchy.
- Descriptive URL slugs.
- Internal links between practice-area pages, articles, FAQs, and contact.
- Canonical URL for every indexable page.
- XML sitemap and robots.txt.
- Open Graph and social metadata.
- Image alt text; decorative images have empty alt.
- Breadcrumbs on nested pages.
- Avoid duplicate, thin, doorway, or keyword-stuffed pages.
- Local SEO: consistent firm name/address/phone, location-specific content only when accurate; embed/map link if office location is confirmed.
- Search Console and analytics setup with consent/privacy configuration as required.
- Indexing controls for staging and non-public routes.
- Legal content freshness: display reviewed/updated date where meaningful.

### SEO content strategy
Create useful, distinct content around confirmed practice areas and real client questions. Prioritize quality and accuracy over mass programmatic pages. Every page must have a clear purpose, unique information, and lawyer review.

## 9. AEO (Answer Engine Optimization) Requirements
- Provide concise direct answers near the top of FAQs and informational articles.
- Use question-based headings where they reflect real user questions.
- Include clear definitions, steps, eligibility/considerations, exceptions, and next steps where relevant.
- Keep factual answers self-contained and easy to quote.
- Use consistent entity naming for the lawyer/firm, jurisdiction, practice areas, and contact details.
- Author and reviewer attribution only when true.
- Structured data must match visible page content and be valid; no fabricated ratings or reviews.
- FAQ schema only when FAQs are visible on the page and eligible under current search policies; do not assume rich results will appear.

## 10. GEO (Generative Engine Optimization) Requirements
GEO is treated as content clarity and entity consistency—not a guarantee of AI visibility.
- Create authoritative, helpful, well-structured pages.
- Use precise firm/lawyer identity, location, and practice-area descriptions.
- Publish original insights with clear authorship and review dates.
- Include source references in legal-information articles when appropriate.
- Avoid unsupported expertise claims and repetitive AI-generated content.
- Make contact and organization information machine-readable and consistent.
- Maintain a technically crawlable site and allow intended crawlers according to the firm's policy.
- Use factual structured data only; do not add schema for information that is not visible or verified.

## 11. Trust, Legal, and Privacy Requirements

The site must be reviewed against applicable Indian advocate advertising/solicitation rules and other relevant professional obligations before launch. A public website should be informational and not make prohibited promotional claims.
- Include a disclaimer that website information is general and not legal advice.
- Clarify that visiting the website or submitting a form does not automatically create an advocate-client relationship.
- Avoid guarantees of outcomes, success percentages, sensational claims, or unapproved testimonials/ratings.
- Avoid presenting confidential case information or client names without explicit authorization and legal review.
- Inquiry form should not encourage visitors to disclose privileged/confidential details.
- Privacy notice should explain data collected, purpose, access, storage, retention, and contact for privacy queries.
- Legal disclaimer and privacy policy must be reviewed by the lawyer before publication; this document is a product specification, not legal advice.

## 12. UX and Accessibility Requirements
- Mobile-first responsive design across small, medium, and large screens.
- WCAG 2.2 AA target where practical: keyboard access, visible focus, adequate contrast, accessible names, reduced-motion support, form error association, and semantic landmarks.
- Avoid layout shift and overly long animations.
- Sticky header only if it adds value; keep it unobtrusive.
- CTA hierarchy should be clear, with one primary action per section.
- Forms should be usable with keyboard and screen readers.
- Use reduced-motion preferences.
- Avoid dark patterns, fake urgency, and aggressive popups.

## 13. Performance Requirements
Targets (to be validated in production on representative devices):
- Lighthouse Performance: aim for 90+ on key pages; no score guarantee.
- Core Web Vitals targets at the 75th percentile: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1.
- Minimize client components and third-party scripts.
- Use optimized images and appropriate sizes.
- Use font subsets/limited weights and avoid layout shifts.
- Cache static content and use server rendering/static generation where appropriate.
- Avoid large animation libraries unless the design requires them.

## 14. Analytics and Event Tracking
Recommended events (without PII):
- `page_view` (platform default)
- `practice_area_view`
- `insight_view`
- `contact_click` (channel: phone/email/WhatsApp; no actual contact value)
- `callback_form_start`
- `callback_form_submit_success`
- `callback_form_submit_error` (error category only)
- `faq_expand` (optional)
- `navigation_click` (limited and privacy-conscious)
Do not pass name, phone, email, message, case facts, or form field values to analytics.

## 15. Future Enhancements
- CMS or admin interface for managing articles and practice areas.
- Appointment calendar with real availability and confirmation.
- CRM integration and lead status tracking.
- WhatsApp integration, subject to consent and approved workflow.
- Multi-language site (Hindi/English or other confirmed languages).
- Client portal (separate security/privacy requirements).
- Knowledge hub and downloadable checklists.

## 16. Launch Acceptance Criteria
- All content is approved and fact-checked by the lawyer.
- Every primary page works on mobile, tablet, and desktop.
- Navigation and CTA links work.
- Form validation, success, error, spam mitigation, and data handling tested.
- Form submissions reach the agreed destination and are not lost silently.
- No sensitive form content is sent to analytics or exposed in logs.
- SEO metadata, canonical URLs, sitemap, robots, structured data, and Open Graph verified.
- Staging is not indexable; production is crawlable as intended.
- Accessibility smoke tests completed.
- Performance tested on representative pages.
- Legal disclaimer, privacy notice, and professional compliance reviewed.
- Backup/rollback and deployment process documented.
- Search Console and analytics are configured if approved.

## 17. Open Questions / Inputs Needed
1. Exact lawyer name, title, and firm name confirmation (Sony Law Firm spelling/brand).
2. Office location and jurisdiction/courts served.
3. Lawyer's portrait/headshot and firm logo (or approval to create a typographic logo).
4. Education, qualifications, enrollment, memberships, years of experience, and biography.
5. Confirmed practice areas and service descriptions.
6. Phone, email, WhatsApp, office address, and office hours.
7. Callback handling process and who receives leads.
8. Preferred callback windows and form fields.
9. Preferred language(s).
10. Website domain and hosting preference.
11. Legal privacy/disclaimer text and review approver.
12. Design inspiration screenshots (pending).
13. Content ownership and ongoing article publishing workflow.
14. Whether analytics are approved and which platform.

## 18. Phase Plan
- **Phase 0 — Discovery:** collect firm facts, practice areas, location, content, design references, brand assets.
- **Phase 1 — Design:** sitemap validation, visual direction, responsive layouts, components, and design review.
- **Phase 2 — Build:** Next.js pages, content model, form API, SEO, structured data, analytics.
- **Phase 3 — QA:** content/legal review, accessibility, performance, security, mobile, form delivery.
- **Phase 4 — Launch:** production deployment, sitemap submission, analytics, monitoring, and handover.
- **Phase 5 — Growth:** content publishing, local SEO, additional practice-area pages, and conversion improvements.

---

## Appendix A — Reference Site Notes
The supplied reference website, aglaw.in, provides content-structure inspiration. Observed patterns include a firm introduction, expertise/service overview, practice areas, professional/leadership profiles, recognition/awards, testimonials, news/media, insights, and contact form. Sony Law Firm should choose only elements that are relevant and factually supportable. Its visual system will be original and based on separate design references supplied by the project owner.
