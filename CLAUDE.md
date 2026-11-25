# CLAUDE.md — Sony Law Firm website

Guidance for Claude Code in this repo.

## Source of truth

Read before building anything. These specs win over this file if they conflict.

| Doc | Covers |
|---|---|
| [docs/PRD.md](docs/PRD.md) | Product scope, pages, form fields, SEO/AEO/GEO, legal/trust rules, launch criteria |
| [docs/TRD.md](docs/TRD.md) | Stack, routes, project structure, content model, inquiry API, security, testing |
| [docs/ASSET_GENERATION_PROMPTS.md](docs/ASSET_GENERATION_PROMPTS.md) | Image/asset art direction and prompts |
| [INSTRUCTIONS.md](INSTRUCTIONS.md) | Working guide, open questions, decisions log |

Status: **Phase 2 — Build.** All Phase 1 pages built with placeholder firm facts (`[brackets]` in `src/content/site.ts`). See README.md for layout of the code. aglaw.in is content inspiration only — never copy its visuals.

## Design direction (approved references: `docs/design-references/`)

- Use `/ui-skill` for all UI work. No generic "AI template" look: no purple gradients, no emoji icons, no centred-card soup.
- Warm off-white / stone-grey canvas (`#F3F1ED` → `#E4E2DE`), ink `#111111`, single accent antique brass `#A8865A`.
- Hero: Indian Lady Justice marble cut-out layered **in front of** the oversized word "NYAYA" (ref-1), glass fact card (ref-3).
- Large uppercase display type, tight tracking; clean sans body. Black pill primary buttons, white/ghost secondary.
- Frosted-glass cards (subtle blur, hairline border) for floating info — **factual content only**, never stats/charts/avatars.
- Monochrome still-life objects (gavel, books, pens, scales) for practice areas and insights. Thin-line SVG icons.
- Elements in refs that break Rule 36 (client counts, case-closure charts, avatar stacks, AI team photos, Login/Register) are excluded.
- Asset file names and alt text: `docs/ASSET_GENERATION_PROMPTS.md`.
Brand spelling: docs say **"Sony Law Firm"**, folder says `soni-law-firm` — confirm with client before using name in UI/metadata.

## Hard rules

- **Never invent firm facts**: names, enrolment numbers, years, credentials, addresses, phones, practice areas, case results.
  Use `TODO(client): …` placeholders.
- **Bar Council of India compliance**: informational site, not solicitation. No "best/top/leading/expert" claims, testimonials,
  ratings, awards, success rates, outcome promises, fee offers, comparisons, fear-based copy.
- Disclaimers required: info is general, not legal advice; using site/form does not create advocate-client relationship.
- **No fake lawyer portrait.** Real approved photo only; else use environment image.
- **No PII anywhere it doesn't belong**: not in URLs, analytics events, logs, error messages, or API responses.
- Structured data only for facts visible on page. No ratings/reviews schema.
- No AI-written legal content published without lawyer review — mark drafts `TODO(lawyer-review)`.
- Out of Phase 1: payments, portal/login, AI legal chat, booking calendar, file uploads, CRM, testimonials.

## Stack (per TRD)

- Next.js App Router (current stable), TypeScript strict, React Server Components by default.
  Check installed Next version first; if `AGENTS.md` / `node_modules/next/dist/docs/` exist, read them — recent versions have breaking changes.
- Styling: **Tailwind CSS v4** (decided). Tokens live in `@theme` in `src/app/globals.css` (`canvas`, `ink`, `muted`, `brass`, `brass-ink`…); shared classes there: `.display`, `.eyebrow`, `.glass`, `.btn-*`, `.prose-legal`. No raw hex in JSX, no CSS Modules.
- **Cache Components is on** (`next.config.ts`): no `Date.now()`/`new Date()` in render, no `dynamicParams`/`dynamic`/`revalidate` exports, dynamic routes need `generateStaticParams` returning ≥1 item. Use `PageProps<'/route'>` / `LayoutProps` (global types).
- `next/image`, `next/font`. `zod` for validation. Lucide icons if needed. Keep deps lean.
- `"use client"` only for mobile nav, form state, accordions, real interactions.
- Content: typed TS files in `src/content/` (no MDX/CMS yet). Email: Resend via `fetch` in `src/lib/mail.ts` (provisional).
- Pending decisions (don't assume — ask): DB vs email-only, final email provider, hosting, CMS, analytics. See TRD §23.

## Structure (TRD §5, adapt as needed)

```text
src/app/          routes: /, about, practice-areas/[slug], insights/[slug], contact, privacy-policy, disclaimer,
                  api/inquiries/route.ts, sitemap.ts, robots.ts, not-found.tsx
src/components/   layout/ sections/ forms/ ui/
src/content/      site.ts (firm facts), practice-areas.ts, insights.ts, home.ts   ← all copy lives here, not in JSX
src/lib/          seo, structured-data, inquiry-rules (shared), validation (server, zod), rate-limit, mail, analytics
public/images/    hero/ objects/ practice/ textures/ og/   (web-ready, renamed)
assets/generated/ raw generated assets + cut-out PNG masters (not served)
```

## Inquiry form (`POST /api/inquiries`)

Fields: name*, phone*, email, callback window (enum), matter category (allow-list + `unsure`), brief description (max length), consent* (true).
Server-side Zod validation always. Honeypot + timing + IP rate limit. Check content-type and body size.
Responses: 201 generic (no PII echo) / 400 field errors / 403 origin / 413 / 415 / 429 / 503 delivery unavailable. Log metadata only. No file uploads.
UI: accessible errors, loading state, double-submit guard, success + failure state with alternate contact.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build      # must pass before calling work done
```

## Conventions

- Mobile-first. WCAG 2.2 AA: landmarks, one H1, heading order, visible focus, labels, reduced motion, no hover-only content.
- Per-page `metadata`/`generateMetadata`: unique title, description, canonical, OG. Breadcrumbs on nested pages.
- Perf: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1. Static generation, sized images, few font weights, no heavy animation libs.
- Secrets in `.env.local` only; update `.env.example` for each new var; never `NEXT_PUBLIC_` a secret.
- Staging must be noindex.
- Small focused components; no dead or commented-out code.
- Do not commit, push, or deploy unless asked.

## Done checklist

1. `lint`, `tsc`, `build` pass.
2. Checked mobile + desktop.
3. No invented facts; placeholders marked.
4. Compliance scan of new copy (rules above).
5. No PII in logs/analytics.
6. Docs updated if setup, structure or decisions changed (log decisions in INSTRUCTIONS.md).
