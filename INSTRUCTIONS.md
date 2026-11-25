# Sony Law Firm — Project Instructions

Working guide for this project. Full specs live in `docs/`:

- [docs/PRD.md](docs/PRD.md) — what we build and why
- [docs/TRD.md](docs/TRD.md) — how we build it
- [docs/ASSET_GENERATION_PROMPTS.md](docs/ASSET_GENERATION_PROMPTS.md) — image/asset prompts

Claude-specific coding rules: [CLAUDE.md](CLAUDE.md).

---

## 1. Snapshot

| Item | Details |
|---|---|
| Client | Sony Law Firm (confirm spelling: Sony vs Soni) |
| Deliverable | Multi-page informational website + callback inquiry form |
| Content reference | https://aglaw.in/ — structure only, not visuals |
| Design references | Received — `docs/design-references/` (4 images) |
| Stack | Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4 |
| Current phase | Phase 2 — Build done with placeholders; waiting on client facts + lawyer review (Phase 3) |

## 2. Phases (PRD §18)

0. **Discovery** — firm facts, practice areas, location, content, design refs, brand assets
1. **Design** — sitemap check, visual direction, layouts, components
2. **Build** — pages, content model, form API, SEO, structured data, analytics
3. **QA** — legal review, accessibility, performance, security, form delivery
4. **Launch** — deploy, sitemap submission, monitoring, handover
5. **Growth** — articles, local SEO, more practice-area pages

## 3. Client inputs needed (PRD §17)

- [ ] Exact firm name + spelling, lawyer name and title
- [ ] Office location, jurisdiction, courts served
- [ ] Lawyer portrait (real, approved) and logo — or approval for typographic logo
- [ ] Education, enrolment, memberships, years of experience, bio
- [ ] Confirmed practice areas + descriptions
- [ ] Phone, email, WhatsApp, address, office hours
- [ ] Who receives leads; callback process; callback time windows
- [ ] Languages (English only? Hindi?)
- [ ] Domain + hosting preference
- [ ] Privacy policy + disclaimer text, and who approves them
- [x] Design inspiration screenshots
- [ ] Article publishing workflow / content owner
- [ ] Analytics approved? Which platform?

## 4. Technical decisions pending (TRD §23)

- [x] Styling: Tailwind CSS v4
- [x] Content: typed TS files for Phase 1 (CMS later if the advocate wants to self-publish)
- [ ] Inquiries: PostgreSQL + email, or email-only
- [ ] Email provider — Resend wired provisionally (`src/lib/mail.ts`), needs account + verified domain
- [ ] Hosting (Vercel default candidate)
- [ ] Analytics + consent approach
- [ ] Phase 1 extras: map, WhatsApp, scheduling?
- [ ] First-visit disclaimer gate — **built** (`DisclaimerGate.tsx`, shown once, content still server-rendered). Confirm with advocate or switch to inline-only
- [ ] Rate limiter is in-memory; move to shared store (e.g. Upstash) if hosting is serverless/multi-instance

## 5. Assets

Prompts in [docs/ASSET_GENERATION_PROMPTS.md](docs/ASSET_GENERATION_PROMPTS.md). Raw files → `assets/generated/`, web files → `public/images/`.

Batch 1 (`Sony_Law_Firm_Assets`, 24 Nov) imported. Fixes applied on import:
- **6 files were mislabelled** (names shifted) — renamed by content: `bg-brushed-brass`→case files, `bg-marble-light`→brass texture,
  `practice-ip`→marble texture, `practice-cheque-bounce`→consumer, `practice-consumer`→property, `practice-property-real-estate`→cheque bounce.
- **Hero statues were not cut out** — background removed locally; floor shadow trimmed. Masters: `assets/generated/*-cutout.png`.
- **State Emblem of India appeared on the statue's book** — painted out (State Emblem of India (Prohibition of Improper Use) Act, 2005).
- OG image composed from the marble statue: `public/images/og/og-default.jpg`.

Still missing / to regenerate:
- [ ] `practice-ip.webp` (IP area not shown on site until then)
- [ ] `bg-marble-dark.webp` (not used yet)
- [ ] Insight covers (§6) — articles currently reuse object/practice images
- [ ] Real advocate portrait (About page uses a statue detail meanwhile)
- [ ] Final logo SVG (provisional scales mark in `Logo.tsx` / `icon.svg`)

## 6. Decisions log

| Date | Decision |
|---|---|
| 2026-11-24 | Project started. PRD, TRD, asset brief (v0.1) imported into `docs/`. |
| 2026-11-24 | Design references received (`docs/design-references/`): light marble/bronze Lady Justice editorial look. Asset brief rewritten to v0.2. Hero = Indian Lady Justice (eyes open, saree, scales + Constitution). Stats/avatars/charts from refs dropped for Rule 36. UI built with `/ui-skill`. |
| 2026-11-24 | Website built: all PRD §5 routes, `/api/inquiries`, sitemap/robots, JSON-LD. Tailwind v4 chosen. 9 practice areas + 3 insights drafted (need lawyer review). Production stays noindex until `NEXT_PUBLIC_SITE_INDEXABLE=true`. |
