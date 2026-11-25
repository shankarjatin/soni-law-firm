# Sony Law Firm — Asset Generation Prompts

**Version:** 0.2 — rewritten 24 Nov 2026 around the approved design references
**Supersedes:** v0.1 (generic "no statues, no gavels" office-photography brief)
**References:** `docs/design-references/ref-1 … ref-4`

Copy-paste prompts for an image model (Midjourney / Imagen / GPT-Image / Flux / Firefly). Each asset has a file name, size,
where it is used, the prompt, what to avoid, and alt text. Generate in the order of the **Priority** column.

---

## 0. Visual direction (read first)

What the references share:

| Element | From references | Our version |
|---|---|---|
| Background | Warm off-white / soft light grey, studio gradient | `#F3F1ED` warm ivory → `#E4E2DE` stone grey |
| Hero subject | Lady Justice statue, cut out, overlapping huge type | **Indian Lady Justice** — eyes open, saree drape, scales + Constitution of India (see 1.1) |
| Materials | White Carrara marble, polished silver, antique bronze | Marble (primary) + antique brass/bronze accents |
| Objects | Gavel with gold band, stacked hardbound books, pens in black bowl | Same still-life family, Indian context (Constitution, bare acts, case-file bundles tied with red tape) |
| Lighting | Soft, diffused studio light from upper-left, gentle shadow | Same across every asset — consistency matters most |
| Colour | Near-monochrome; colour only from metal | Greys + ink black `#111111` + brass `#A8865A` |
| Type | Very large black grotesk, uppercase (`LEGAL`) | Handled in code — **never bake text into images** |

**Prefix for every prompt** (keeps the series consistent):

> Premium studio product photograph, seamless warm off-white background (#F3F1ED), soft diffused key light from upper left,
> subtle natural contact shadow, near-monochrome palette with antique brass accents, ultra-sharp detail, photorealistic,
> editorial luxury law-firm aesthetic, calm and authoritative, generous negative space,

**Suffix for every prompt:**

> no text, no letters, no logos, no watermark, no signature, no people unless specified, no colour cast, no vignette,
> no clutter, no lens flare.

**Cut-out workflow** (hero statue and still-life objects): generate on the plain seamless background → remove background
(Canva *Remove background*, Photoshop, remove.bg) → export **transparent PNG** at 2× size → developer converts to WebP/AVIF.
The statue must be a clean cut-out so the large headline can sit **behind** it (ref-1 effect).

### Rule 36 (Bar Council of India) — do not generate

The references contain things an Indian advocate's site **cannot** use. Do not create assets for:

- Stats such as "52K satisfied clients" or "34 cases closed", or "case closure statistics" charts (refs 3 and 4)
- Client avatar stacks, testimonial photos, star ratings
- AI-generated "team" or "lawyer" portraits (refs 2 and 3). Real photos only (see §5)
- Award badges, trophies, "No. 1" seals
- Maps of India. AI-drawn borders are often inaccurate, and publishing a wrong map of India is a legal risk. Use the official Survey of India outline if a map is ever needed.

---

## 1. Hero statue — Priority 1

### 1.1 `hero-lady-justice-india-marble.png` ★ main hero
**Use:** home hero cut-out, overlapping a huge headline (refs 1, 3 and 4)
**Size:** 2:3 portrait, at least 2400 × 3600 px, transparent PNG after cut-out
**Prompt:**
> [PREFIX] full-length classical sculpture of the Indian Lady of Justice carved in flawless white Carrara marble with faint
> grey veining, standing on a round carved marble pedestal, **eyes open and calm, not blindfolded**, wearing an elegantly draped
> Indian saree with fine carved pleats and a subtle border, traditional Indian jewellery carved in marble (small earrings,
> simple necklace, bangles), hair in a neat bun, holding a balanced pair of antique brass scales raised in her right hand, and
> holding a closed hardbound book representing the Constitution of India against her left side in her left hand, dignified
> serene expression, front-facing three-quarter view, whole figure and pedestal in frame with space above the head,
> museum-quality sculpture, soft shadows in the drapery folds, [SUFFIX]

**Avoid:** blindfold, sword, Greek/Roman toga, Western facial features, readable text on the book, gold-plated look
**Alt text:** "Marble sculpture of the Indian Lady of Justice holding scales and the Constitution of India"

### 1.2 `hero-lady-justice-india-bronze.png` — dark/alternate hero
**Use:** dark-section variant, contact band, or A/B hero (refs 3 and 4 metallic look)
**Size:** same as 1.1
**Prompt:** same as 1.1, but replace the marble material with:
> cast in polished antique bronze with warm brass highlights and darker patina in the recesses, reflective metallic surface

**Alt text:** "Bronze sculpture of the Indian Lady of Justice holding scales and the Constitution"

### 1.3 `detail-scales-hand.png` — crop detail
**Use:** section divider, About page accent, mobile hero (the full statue is too tall for small screens)
**Size:** 1:1, 2000 × 2000 px, transparent PNG
**Prompt:**
> [PREFIX] close-up detail of a white marble sculpted hand gracefully holding an antique brass balance scale with two shallow
> pans and fine chains, the scale perfectly level, a hint of carved saree drapery at the wrist, shallow depth of field,
> [SUFFIX]

**Alt text:** "Marble hand holding a balanced brass scale"

### 1.4 `detail-constitution-hand.png` — crop detail
**Use:** "Know your rights" / Insights header accent
**Size:** 1:1, 2000 × 2000 px, transparent PNG
**Prompt:**
> [PREFIX] close-up of a white marble sculpted hand holding a closed hardbound book against draped marble saree folds, the
> book's cover carved in marble with a plain border and no lettering, [SUFFIX]

**Alt text:** "Marble hand holding a closed book representing the Constitution"

---

## 2. Still-life objects (cut-outs) — Priority 2

The same object family as ref-2. All are shot on the §0 background, lit identically, and cut out to transparent PNG.
**Size:** 4:3, 2400 × 1800 px.

| File | Prompt body (insert between PREFIX and SUFFIX) | Use | Alt text |
|---|---|---|---|
| `object-gavel.png` | a polished black lacquered wooden judge's gavel with a wide brushed-brass band, resting at an angle on its round black sound block, three-quarter view | Contact/CTA band, 404 | "Black gavel with brass band on sound block" |
| `object-books-gavel.png` | a neat stack of four hardbound law books in navy, charcoal and ivory cloth bindings with blank spines and gilt edge lines, a black gavel with a brass band laid diagonally on top | Practice-area overview (ref-2 "Legal Expertise") | "Stack of law books with a gavel resting on top" |
| `object-constitution-book.png` | a single closed thick hardbound book in deep charcoal leather with a blind-embossed border and a subtle brass corner, standing slightly open on a marble surface, blank cover | Insights, "Your rights" section | "Closed hardbound law book on marble" |
| `object-pens-bowl.png` | two brass fountain pens resting crossed inside a matte black ceramic bowl, seen from a high angle, the pens engraved with fine guilloché pattern and no lettering | About → approach / values (ref-2 "Core Values") | "Two brass fountain pens in a black bowl" |
| `object-case-files.png` | a neat bundle of Indian court case files in buff manila folders tied with a red cloth tape ribbon, slightly fanned, blank covers | Litigation / civil practice | "Bundle of case files tied with red tape" |
| `object-scales-standalone.png` | an antique brass balance scale on a black marble base, pans level, fine chains, isolated | Disclaimer page, favicon reference | "Antique brass balance scale" |
| `object-stamp-paper.png` | a fountain pen resting on a blank sheet of cream textured legal paper with a faint decorative border, a round brass seal-press beside it, no writing or stamps | Documentation / agreements | "Fountain pen on blank legal paper beside a seal press" |
| `object-key-house.png` | a small architectural white marble model of a modern house with a single antique brass key leaning against it | Property / real estate | "Marble house model with a brass key" |

---

## 3. Practice-area images — Priority 2

**Use:** practice-area cards and the header of each detail page
**Size:** 3:2, 2400 × 1600 px, WebP (not a cut-out — keep the soft background)
**Rule:** one consistent still-life per area, same light and background as §0, plus a subtle marble or stone surface under the
object. Final list depends on the confirmed practice areas — generate only those.

| File | Area (Indian context) | Prompt body |
|---|---|---|
| `practice-civil-litigation.webp` | Civil litigation / suits | stacked buff case-file folders tied with red tape beside a black gavel on a pale marble surface |
| `practice-criminal-law.webp` | Criminal law / bail (BNS, BNSS) | a single antique brass balance scale casting a long soft shadow across pale stone, austere and serious, no handcuffs, no police imagery |
| `practice-family-matrimonial.webp` | Family / matrimonial / divorce / custody | two plain gold rings resting a small distance apart on a closed ivory hardbound book, gentle and neutral, no couple, no emotion staged |
| `practice-property-real-estate.webp` | Property, title, RERA | white marble architectural house model with a brass key and a rolled blank blueprint |
| `practice-corporate-commercial.webp` | Corporate / commercial / contracts | brass fountain pen lying on a blank cream contract page with a leather portfolio and a minimal glass paperweight |
| `practice-cheque-bounce.webp` | Cheque dishonour (NI Act §138) | a blank cheque-sized cream paper slip under a brass paperweight beside a fountain pen, no bank name, no numbers, no text |
| `practice-consumer.webp` | Consumer disputes | a small neat stack of blank receipts and an invoice folder held by a brass binder clip next to a balance scale |
| `practice-arbitration-adr.webp` | Arbitration / mediation | two empty ivory leather chairs facing each other across a small round marble table with a single glass of water |
| `practice-ip.webp` | Intellectual property | a brass-and-glass desk lamp shaped like a bulb glowing softly beside a closed notebook with a blind-embossed cover |
| `practice-documentation.webp` | Wills, deeds, notarial | a closed fountain pen and a brass seal press on folded blank parchment with a deckled edge |

**Alt text pattern:** "<object description> — illustration for <practice area>"

---

## 4. Section backgrounds and textures — Priority 3

| File | Size | Prompt body | Use |
|---|---|---|---|
| `bg-studio-gradient.webp` | 2560 × 1440 | seamless empty studio backdrop, warm off-white fading to soft stone grey at the edges, very subtle paper texture, completely empty | Hero backdrop (behind the cut-out) |
| `bg-marble-light.webp` | 2048 × 2048, tileable | seamless tileable white Carrara marble texture with faint soft grey veining, very low contrast, flat even light | Cards, About band |
| `bg-marble-dark.webp` | 2048 × 2048, tileable | seamless tileable Nero Marquina black marble with fine white veining, low contrast, matte | Dark footer / CTA band |
| `bg-brushed-brass.webp` | 1024 × 1024, tileable | seamless brushed antique brass metal texture, fine horizontal grain, soft, low contrast | Thin accent strips, dividers |
| `bg-architecture-columns.webp` | 2560 × 1440 | monochrome photograph of tall pale sandstone colonnade arches in Indo-Saracenic style, symmetrical, soft morning light, deep shadows, empty, no people, no flags, no signage, not a recognisable specific building | About / "Our approach" band, at reduced opacity |

---

## 5. Lawyer portrait — real photo only (edit, don't generate)

**Never AI-generate the lawyer's face.** Get a real photo, then use the image model only to **edit** it to match the site.

**Shoot brief (give to the client or photographer):** waist-up, advocate's black coat with white bands, plain wall, window
light from the left, neutral expression, high resolution, plus one landscape and one portrait framing.

**Edit prompt (image-to-image / generative fill, upload the real photo):**
> Keep the person's face, features, skin tone, hair and clothing exactly unchanged. Replace only the background with a
> seamless warm off-white studio gradient (#F3F1ED to #E4E2DE). Match soft diffused studio lighting from the upper left,
> gentle natural retouch only, no face reshaping, no skin smoothing beyond light blemish cleanup, photorealistic.

Also export a **black-and-white version** (ref-2 team style) for the About/Team section.
**Files:** `portrait-advocate-colour.webp`, `portrait-advocate-bw.webp`
**Alt text:** "Advocate <Full Name>, <title>" (fill in after confirming with the client)

---

## 6. Insights / article covers — Priority 3

**Size:** 16:9, 1920 × 1080, WebP. One per article; generate as articles are written.
Same still-life family on the §0 background. Use the template below, picking one object per topic:

> [PREFIX] minimal editorial still life about **<topic>**: <one object from §2 or a close variant>, positioned on the
> right third, empty left two-thirds for layout, shallow depth of field, [SUFFIX]

Starter set:

| File | Topic | Object |
|---|---|---|
| `insight-new-criminal-laws.webp` | BNS / BNSS / BSA replacing IPC / CrPC / Evidence Act | three closed hardbound books, one newer and crisper than the other two |
| `insight-property-documents.webp` | Property document checklist | marble house model + brass key + blank folder |
| `insight-cheque-bounce.webp` | Cheque bounce process | brass paperweight on blank slip + fountain pen |
| `insight-consumer-rights.webp` | Consumer complaint basics | balance scale + blank receipts |
| `insight-know-your-rights.webp` | Fundamental rights explainer | marble hand holding a closed book (crop of 1.4) |
| `insight-legal-terms.webp` | Glossary (ref-2 "Understanding Legal Terms") | open blank notebook + brass pen + reading glasses |

---

## 7. Icons — build in code, don't generate

Ref-2 uses thin line icons (scales, house, bulb, gavel). Raster AI icons look blurry and inconsistent, so the developer draws
them as **SVG** (Lucide base + custom paths), 1.5 px stroke, ink `#111111`. List needed: scales, gavel, house, building,
document, rings, pen, shield, bulb, meeting (two chairs), phone, mail, map-pin, clock.

---

## 8. Brand marks — Priority 1 (concepts only, final logo must be approved)

### 8.1 `logo-mark-concepts.png` — 3 concepts on one sheet
**Size:** 3000 × 1000, transparent or white
**Prompt:**
> Three minimalist monogram logo mark concepts side by side for a premium Indian law firm with the initials "SLF", geometric,
> single colour ink black on white, a flat vector style, refined and timeless, one concept using a subtle balance-scale motif
> built from the letter forms, one using an abstract pillar shape, one pure typographic monogram, no extra text,
> no gradients, no 3D, no clip art

AI models garble letters, so use this sheet as **direction only** and redraw the chosen concept in Figma/Illustrator as an SVG.
The wordmark ("SONY LAW FIRM" or "SONI…", spelling to be confirmed) is set in code using the site typeface.

### 8.2 Favicon
Derived from the final SVG mark: `icon.svg`, `apple-icon.png` (180 × 180), `favicon.ico` (32 × 32). No generation needed.

---

## 9. Social / Open Graph — Priority 3

### `og-default-bg.png`
**Size:** 1200 × 630
**Prompt:**
> [PREFIX] wide composition, the Indian Lady of Justice marble statue (as in 1.1) cropped from the waist up on the right third,
> softly lit, the left 60% completely empty warm off-white for headline overlay, [SUFFIX]

Title text and logo are added in code (Next.js `opengraph-image.tsx`), never inside the image.

---

## 10. Optional / later

| File | Prompt body | Use |
|---|---|---|
| `empty-pedestal-404.png` | an empty round carved white marble pedestal, nothing on it, soft spotlight | 404 page (witty, on theme) |
| `hero-statue-turntable.mp4` | 4-second slow 15° turntable rotation of statue 1.1, seamless loop, static camera | Hero motion. Only if Core Web Vitals allow; poster = 1.1, under 1.5 MB, muted, no autoplay on mobile |

---

## Delivery checklist

- [ ] Same background colour, light direction and grading across the whole set
- [ ] Hero and object files delivered as **transparent PNG cut-outs** (clean edges, no halo)
- [ ] No text, letters, logos or watermarks inside any image; book covers and papers blank
- [ ] Nothing that implies outcomes, stats, awards, clients or testimonials (Rule 36)
- [ ] No AI faces of the lawyer or of any "team"
- [ ] File names exactly as listed; alt text kept in this document
- [ ] Raw originals → `assets/generated/`; web-optimised → `public/images/` (developer converts to WebP/AVIF)
- [ ] Crop-safe: key subject centred enough for mobile crops

## Template for any extra asset

> [PREFIX] <subject> made of <white Carrara marble | antique brass | black lacquered wood | buff paper>, <composition and
> placement>, <aspect ratio>, Indian legal context expressed through objects rather than people, [SUFFIX]
