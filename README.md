# Sony Law Firm — website

Informational website and callback form for an Indian law firm. Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4.

Specs: [docs/PRD.md](docs/PRD.md) · [docs/TRD.md](docs/TRD.md) · [docs/ASSET_GENERATION_PROMPTS.md](docs/ASSET_GENERATION_PROMPTS.md)

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
```

Checks before shipping: `npm run lint`, `npx tsc --noEmit`, `npm run build`.

## Where things live

| What | Where |
|---|---|
| Firm facts — name, advocate, contact, hours (placeholders in `[brackets]`) | `src/content/site.ts` |
| Practice areas (9) — copy, FAQs, images | `src/content/practice-areas.ts` |
| Insights / articles | `src/content/insights.ts` |
| Home copy — principles, process, glossary, FAQs | `src/content/home.ts` |
| Design tokens (colours, type, buttons, glass) | `src/app/globals.css` |
| Pages | `src/app/**/page.tsx` |
| Sections and UI | `src/components/` |
| Callback API | `src/app/api/inquiries/route.ts` |
| Validation / rate limit / email | `src/lib/validation.ts`, `rate-limit.ts`, `mail.ts` |
| Web images (served) | `public/images/` |
| Raw generated assets (not served) | `assets/generated/` |

## Filling in real details

1. Replace every `[bracketed]` value in `src/content/site.ts`. Values still in brackets render as plain text (no `tel:`/`mailto:` links) and are left out of structured data.
2. Remove practice areas the firm does not offer from `src/content/practice-areas.ts`.
3. Have the advocate review all copy marked `TODO(lawyer-review)`.
4. Replace the provisional logo mark in `src/components/ui/Logo.tsx` and `src/app/icon.svg`.
5. Add the advocate's real portrait on the About page (`src/app/about/page.tsx`).

Find everything outstanding with:

```bash
grep -rn "TODO(\|\[" src/content src/app --include=*.ts --include=*.tsx | grep -v "\[slug\]"
```

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL |
| `NEXT_PUBLIC_SITE_INDEXABLE` | `true` on production only; otherwise the site is `noindex` and robots disallow all |
| `RESEND_API_KEY`, `INQUIRY_NOTIFICATION_EMAIL`, `INQUIRY_FROM_EMAIL` | Callback email delivery |

Without email variables the form returns success in development (nothing sent) and **503 in production** — leads are never dropped silently.

## Callback API

`POST /api/inquiries` (JSON). Zod validation, honeypot + minimum fill time, origin check, 8 KB body limit, 5 requests / 10 min per IP.
Responses: `201` · `400` with `fieldErrors` · `403` · `413` · `415` · `429` · `503`. Logs contain event names only — never form content.

The rate limiter is in-memory (per instance). On multi-instance/serverless hosting, move it to a shared store.
