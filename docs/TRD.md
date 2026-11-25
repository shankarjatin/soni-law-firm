# Sony Law Firm Website — Technical Requirements Document (TRD)

**Project:** Sony Law Firm Website  
**Version:** 0.1 Draft  
**Date:** 24 November 2026  
**Stack:** Next.js (App Router), TypeScript, modern CSS/Tailwind (final choice pending design references)


## 1. Technical Overview
Build a production-ready, fast, crawlable, responsive website using Next.js App Router and TypeScript. Prefer server-rendered and statically generated pages wherever content allows. Use client components only for interactions that require browser state. The application should have a small JavaScript footprint, robust form handling, secure inquiry submission, reusable UI components, and a content architecture that can grow.

## 2. Proposed Stack

### Frontend
- Next.js App Router (stable current version at implementation time)
- TypeScript with strict mode
- React Server Components by default
- Tailwind CSS (or CSS Modules if the supplied design requires more bespoke styling; choose one primary system and avoid duplicate styling approaches)
- Accessible component patterns; use a component library only if it supports the design without introducing excessive bundle weight
- `next/image` for local/remote image optimization
- `next/font` for self-hosted/optimized fonts

### Backend / Form processing
- Next.js Route Handler: `POST /api/inquiries`
- Server-side schema validation using Zod
- Database persistence if selected for Phase 1 (recommended when lead management/retrieval is needed)
- Email notification to designated firm inbox via approved transactional email provider
- Optional WhatsApp notification/integration in a later phase; no unapproved automation

### Data / Infrastructure options (choose during setup)
- Database: PostgreSQL (recommended for structured inquiry records) via managed provider, or no database if email-only form delivery is explicitly accepted.
- ORM: Prisma if PostgreSQL is chosen.
- Email: Resend, Postmark, AWS SES, or another approved provider; API keys server-only.
- Hosting: Vercel is a natural fit for Next.js; alternative deployment must support Next.js runtime/route handlers and image optimization.
- Analytics: privacy-configured GA4 or a lightweight alternative, only if approved.
- Error monitoring: Sentry or equivalent, configured to scrub PII.

No provider is final until the owner approves cost, data location, access, and retention requirements.

## 3. Application Architecture

```text
Visitor / Search Engine / AI Crawler
              |
        CDN / Hosting Edge
              |
       Next.js App Router
       |        |         |
  Static/RSC  Client UI  Route Handlers
  Pages       Interactions /api/inquiries
       |                   |
  Content data         Validation + Rate Limit
  (MD/MDX/CMS)              |
                    DB (optional/approved)
                         |
                  Email Notification
```

Architecture principles:
- Static generation for evergreen pages and articles where possible.
- Dynamic rendering only where required.
- Server components for content and page composition.
- Client components for mobile nav, form state, accordions, and intentional UI interactions.
- Server-side validation is authoritative; client validation is for usability.
- Keep secrets and email/database operations on the server.
- Never expose private inquiry data to public page rendering or client bundles.

## 4. Routes and Rendering Strategy

| Route | Rendering / behavior | Notes |
|---|---|---|
| `/` | Static or ISR | Home; curated sections |
| `/about` | Static/ISR | Verified profile |
| `/practice-areas` | Static/ISR | Index of approved practice areas |
| `/practice-areas/[slug]` | Static generation/ISR | Generate pages from approved content |
| `/insights` | Static/ISR | Article index |
| `/insights/[slug]` | Static generation/ISR | Article details |
| `/contact` | Static | Contact details and inquiry form |
| `/privacy-policy` | Static | Approved policy |
| `/disclaimer` | Static | Approved legal notice |
| `/api/inquiries` | Server route handler | POST only; validation, spam checks, delivery |

Use `generateStaticParams` for content-driven routes if local content files are used. If a CMS is adopted, implement caching/revalidation based on provider support. Keep 404 handling meaningful.

## 5. Suggested Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    about/page.tsx
    practice-areas/page.tsx
    practice-areas/[slug]/page.tsx
    insights/page.tsx
    insights/[slug]/page.tsx
    contact/page.tsx
    privacy-policy/page.tsx
    disclaimer/page.tsx
    api/inquiries/route.ts
    not-found.tsx
    sitemap.ts
    robots.ts
    manifest.ts (optional)
  components/
    layout/
      SiteHeader.tsx
      SiteFooter.tsx
      MobileNavigation.tsx
      Breadcrumbs.tsx
    sections/
      Hero.tsx
      FirmIntroduction.tsx
      PracticeAreaGrid.tsx
      ProfileSection.tsx
      InsightsPreview.tsx
      FAQSection.tsx
      ContactCTA.tsx
    forms/
      InquiryForm.tsx
      FormField.tsx
    ui/
      Button.tsx
      Card.tsx
      Accordion.tsx
      Container.tsx
  content/
    practice-areas/
      *.mdx or *.ts
    insights/
      *.mdx or *.ts
    faq.ts
  lib/
    content.ts
    seo.ts
    validation.ts
    rate-limit.ts
    mail.ts
    db.ts (if database selected)
    analytics.ts
    structured-data.ts
  styles/
    globals.css
  types/
    inquiry.ts
public/
  images/
  icons/
  og/
```

This structure is illustrative and should be adapted to the final content system.

## 6. Content Model

### Firm / Lawyer
- `name`
- `displayName`
- `title`
- `bio`
- `education[]`
- `credentials[]` (only verified)
- `practiceAreaIds[]`
- `portrait` (optional)
- `location` (structured, verified)
- `contact` (approved public channels)

### PracticeArea
- `slug`
- `name`
- `shortDescription`
- `overview`
- `scope[]` or rich content sections
- `faq[]`
- `relatedInsights[]`
- `seoTitle`
- `seoDescription`
- `updatedAt`
- `reviewedBy` (only when accurate)

### Insight / Article
- `slug`
- `title`
- `summary`
- `body`
- `category`
- `publishedAt`
- `updatedAt`
- `author`
- `reviewer` (optional, factual)
- `sources[]`
- `seoTitle`
- `seoDescription`
- `featuredImage` (optional)

### Inquiry
- `id`
- `name`
- `phone`
- `email` (optional)
- `preferredCallbackWindow` (optional)
- `matterCategory` (optional)
- `briefDescription` (optional; maximum length)
- `consentTimestamp`
- `createdAt`
- `status` (optional internal state: new/handled/archived)
- `sourcePath` (sanitized; no query-string PII)

## 7. Inquiry Form API

### Endpoint
`POST /api/inquiries`

### Request body (example)
```json
{
  "name": "Example Person",
  "phone": "+91XXXXXXXXXX",
  "email": "person@example.com",
  "preferredCallbackWindow": "afternoon",
  "matterCategory": "civil-dispute",
  "briefDescription": "A short non-confidential summary",
  "consent": true
}
```

### Validation
- Name: required, trimmed, sensible length limits, reject control characters.
- Phone: required; validate according to agreed locale; do not over-restrict valid formats.
- Email: optional; validate if present.
- Callback window: enum/allow-list.
- Matter category: allow-list from approved categories plus `unsure`.
- Description: optional; maximum length; strip/escape HTML; no files.
- Consent: required true.
- Unknown fields should be rejected or ignored safely.
- Server-side validation must run regardless of client validation.

### Response contract
Success: `201 Created` with a generic confirmation payload (no echo of PII).  
Validation: `400 Bad Request` with field-level, user-safe errors.  
Rate limit: `429 Too Many Requests`.  
Service failure: `500` or appropriate safe error; never reveal provider secrets or stack traces.

### Delivery flow
1. Client submits form.
2. API validates schema and consent.
3. Rate limit and spam checks run.
4. Persist inquiry if database is enabled.
5. Send notification email to approved inbox.
6. Return success only when the chosen delivery contract is satisfied. If DB persistence is the durable source of truth, email delivery can be retried asynchronously; define failure semantics explicitly.
7. Log operational metadata only; never log full form content, phone, email, or description.

### Security and abuse protection
- Rate limit by IP using a trusted proxy-aware strategy; do not trust arbitrary client-supplied IP headers.
- Honeypot field and timing heuristics.
- CAPTCHA/Turnstile may be introduced if spam is substantial; ensure accessibility and privacy review.
- Origin/CSRF protections appropriate to deployment.
- Validate content type and request size.
- Avoid file upload.
- Escape content in email templates.
- Store secrets in deployment environment variables.
- Restrict access to lead database and admin views; no public inquiry listing.
- Define retention, deletion, and backup policies.

## 8. Database (If Approved)
A small relational model is sufficient. Example PostgreSQL table:

```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  preferred_callback_window TEXT,
  matter_category TEXT,
  brief_description TEXT,
  consent_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status TEXT NOT NULL DEFAULT 'new'
);
```

Apply migrations; use least-privilege credentials; do not expose database credentials to client code. This table is illustrative and should be adjusted for privacy/retention decisions.

## 9. Email Notifications
- Use a transactional email service with domain authentication (SPF, DKIM, DMARC as supported).
- Notification should contain only details required to respond.
- Email subject should be generic and avoid sensitive legal facts.
- Do not send sensitive case descriptions to multiple recipients by default.
- Use verified sender domain; keep API keys server-only.
- Provide delivery monitoring and retry behavior.
- Optional client confirmation email should be generic and avoid promising representation or response times.

## 10. SEO / Technical SEO

### Metadata
Use Next.js `metadata` and `generateMetadata` for:
- Unique title and description.
- Canonical URL.
- Open Graph and Twitter metadata (if applicable).
- Appropriate robots directives.
- Page-specific share image when available.

### Sitemap / robots
- Generate `sitemap.ts` from the approved route/content inventory.
- Generate `robots.ts` to allow public content and disallow internal/private paths as needed.
- Staging must be noindex and protected where possible.

### Structured data
Potential schema types, only when factual and applicable:
- `LegalService` / `Organization` (confirm schema properties and eligibility before implementation).
- `Person` for lawyer profile.
- `WebSite` and `WebPage`.
- `BreadcrumbList`.
- `Article` for editorial insights.
- `FAQPage` only when relevant and current policy permits; schema must reflect visible FAQ.
Do not create aggregate ratings, reviews, awards, legal outcome claims, or invented addresses.

### Technical crawlability
- Render main content in HTML, not exclusively through client-side JS.
- Stable internal links; no orphan pages.
- Correct status codes and canonical URLs.
- Avoid indexable search/filter URLs with thin content.
- Keep page content and metadata consistent.
- Add alt text and image dimensions.

## 11. AEO/GEO Content Engineering
- Content should answer a real question, not be written only to satisfy keyword patterns.
- Use descriptive headings and short answer summaries.
- FAQs should be authored/reviewed, not automatically generated and published.
- Use consistent entity details across site pages and metadata.
- Article sources and update dates should be visible where appropriate.
- Structured data is supporting markup, not a visibility guarantee.
- Avoid fake local pages and city keyword permutations.
- Keep content crawlable and accessible to search/answer engines.

## 12. Design System / UI Engineering
Final tokens will be derived from design references. Proposed token groups:
- Color: primary, secondary, accent, surface, muted surface, text, border, focus, success, error.
- Typography: display, heading, body, small, legal/caption.
- Spacing scale.
- Container widths and responsive breakpoints.
- Radius and shadow levels.
- Motion duration/easing and reduced-motion behavior.
- Button variants, form fields, cards, navigation, breadcrumbs, accordions.

Use consistent tokens rather than hard-coded values scattered across components. Build reusable components only where repetition or consistency warrants it; avoid over-abstraction.

## 13. Accessibility
- Semantic landmarks (`header`, `nav`, `main`, `footer`).
- Correct heading order.
- Keyboard-operable menus and controls.
- Visible focus styles.
- Form labels and associated error messages.
- Accessible status announcements for success/failure.
- Contrast checks.
- Reduced-motion support.
- Avoid hover-only content.
- Test at least one screen-reader/keyboard workflow.

## 14. Performance
- Prefer static generation and server components.
- Use optimized responsive images with accurate `sizes`.
- Use AVIF/WebP where appropriate and fallbacks supported by framework.
- Keep hero image appropriately compressed and sized.
- Limit font weights and subsets; prevent layout shift.
- Avoid autoplay video; if used, provide poster, controls, and loading strategy.
- Lazy-load below-the-fold images.
- Avoid unnecessary client state and large dependencies.
- Review third-party scripts and defer where possible.
- Measure Web Vitals in production, not only Lighthouse lab score.

Target metrics: LCP <= 2.5s, INP <= 200ms, CLS <= 0.1 at the 75th percentile, subject to real-world measurement.

## 15. Analytics
Analytics events must not include personally identifiable or legal-matter information. Recommended event names:
- `contact_click` with channel category only.
- `callback_form_start`.
- `callback_form_submit_success`.
- `callback_form_submit_error` with sanitized error category.
- `practice_area_view` with approved slug.
- `insight_view` with slug.
Implement event consent/configuration according to the privacy decision. No form field values in analytics.

## 16. SEO / Content Operations
- Local content files (MDX/Markdown/typed data) are acceptable for Phase 1 if updates are developer-managed.
- If the lawyer needs to publish articles without a developer, use a CMS in Phase 2 or decide on a CMS before initial architecture.
- Content updates should include review status, author, updated date, and optional sources.
- Avoid publishing unreviewed AI-generated content.

## 17. Testing Strategy

### Unit / component
- Content schema and slug utilities.
- Metadata generation.
- Inquiry validation.
- Form states and accessibility behavior.
- Rate-limit utility.

### Integration
- Inquiry API validation and spam handling.
- Email provider behavior (mock in test environment).
- Database insert and error handling if used.
- Analytics event sanitation.

### End-to-end
- Homepage navigation.
- Mobile menu.
- Practice-area page navigation.
- Article navigation.
- Contact form: invalid, valid, duplicate submit, server failure, rate limit.
- Success state and alternate contact links.

### QA
- Chrome, Safari, Firefox as feasible.
- Mobile sizes and touch targets.
- Keyboard navigation.
- Contrast and accessibility checks.
- Lighthouse / Web Vitals.
- SEO metadata and sitemap checks.
- No broken links or console errors.

## 18. Environments and Deployment
- Local development.
- Preview/staging deployment.
- Production deployment.
- Staging should be noindex and ideally access-protected.
- Use environment variables for provider credentials and base URLs.
- CI checks: lint, typecheck, tests, build.
- Production deployment should require successful checks.
- Establish rollback strategy and domain/SSL setup.
- Ensure inquiry delivery monitoring after launch.

## 19. Environment Variables (Illustrative)
```env
NEXT_PUBLIC_SITE_URL=https://example.com
DATABASE_URL=
EMAIL_PROVIDER_API_KEY=
INQUIRY_NOTIFICATION_EMAIL=
INQUIRY_FROM_EMAIL=
RATE_LIMIT_SECRET=
ANALYTICS_ID=
```
Only variables explicitly needed should be added. Never expose private keys with `NEXT_PUBLIC_`.

## 20. Recommended Dependencies (Keep Lean)
- `zod` — request validation.
- `prisma` / `@prisma/client` — only if database is chosen.
- Transactional email SDK — selected provider.
- Icon library such as Lucide React — if needed and tree-shaken.
- Optional analytics SDK.
- Avoid multiple UI frameworks, animation libraries, and form libraries unless justified by complexity.

Exact versions should be selected at implementation time and locked.

## 21. Legal and Privacy Considerations
- Verify applicable Bar Council of India professional conduct rules and local requirements before launch.
- Do not present the site as solicitation or guarantee outcomes.
- Use approved informational wording, disclaimers, and inquiry flow.
- Protect inquiry data, minimize collection, define access and retention, and review privacy obligations.
- Do not upload confidential case documents through Phase 1 form.
- Legal review required for privacy policy, disclaimer, content, testimonials, case examples, and any claims.

## 22. Definition of Done
- Requirements and design references approved.
- All routes implemented and responsive.
- Approved content integrated.
- Inquiry form securely validated and tested.
- Lead delivery verified end-to-end.
- SEO metadata, sitemap, robots, canonical, Open Graph, and structured data reviewed.
- Accessibility smoke test complete.
- Performance targets evaluated.
- No PII in analytics or application logs.
- Legal/privacy content approved.
- Production deployment, monitoring, and rollback documented.
- Owner handoff completed.

## 23. Decisions Pending
- Brand identity/logo and final design references.
- Firm/lawyer location and practice areas.
- Content system: Markdown/MDX vs CMS.
- Database vs email-only inquiry handling.
- Email provider.
- Hosting/deployment provider.
- Analytics platform and consent approach.
- Callback/lead routing and response expectations.
- Domain and DNS.
- Languages.
- Whether map, WhatsApp, appointment scheduling, or calendar integration are Phase 1.
