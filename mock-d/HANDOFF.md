# Mock D — Sunshine Catalog · HANDOFF

Direction D mirrors the section structure of `https://www.probuiltsteel.com/` — a high-volume DTC steel-building catalog. Sun-orange CTAs over cream paper, sky-blue accents, slate ink. Mulish display + DM Sans body.

## Tokens

All tokens live in `_shared.css` `:root`. Use the variables — do not inline hex.

**Color**
- Slate: `--d-slate #0f1e2e`, `--d-slate-2 #1c2e44`
- Paper: `--d-cream #fff8ec`, `--d-cream-2 #fcefd5`, `--d-paper #ffffff`, `--d-rule #e7dec6`
- Sun (primary CTA): `--d-sun #f7941d`, `--d-sun-hover #d97a06`, `--d-sun-soft #fde2bf`
- Sky (secondary): `--d-sky #1a8fd6`, `--d-sky-hover #1474b2`, `--d-sky-soft #e1f1fb`
- Accent: `--d-grass #3aa552`, `--d-flag #c0392b`, `--d-gold #f0b500`
- Text: `--d-text #1a2433`, `--d-text-muted #5b6878`, `--d-text-faint #8d97a7`

**Type**
- Display: `--f-display: "Mulish"` (700/800/900)
- Body: `--f-body: "DM Sans"` (400/500/600/700)
- Scale: `--t-d1`/`--t-d2`/`--t-h1`–`--t-h4`/`--t-body`/`--t-sm`/`--t-xs`/`--t-eyebrow`
- Tracking: `--tr-display: -.005em`, `--tr-eyebrow: .18em`

**Spacing** `--s-1 (.25rem)` through `--s-11 (10rem)` — 8px base scale  
**Radius** `--r-sm 4`, `--r-md 8`, `--r-lg 14`, `--r-xl 22`, `--r-pill 999`  
**Shadow** `--sh-sm`, `--sh-card`, `--sh-md`, `--sh-lg`, `--sh-sun` (the orange-tinted CTA shadow)  
**Layout** `--container 1240`, `--container-narrow 880`, `--container-prose 720`

## Page list (30 files)

| # | File | What's there |
|---|---|---|
| 01 | `01-design-system.html` | Every primitive (swatches, type, buttons, cards, forms, FAQ, CTA) |
| 02 | `02-homepage.html` | Hero → 6-item trust strip → 16-card product grid → 4 category tiles |
| 03 | `03-building-types.html` | 16 large category tiles in a 4-up grid |
| 04 | `04-{type}-detail.html` × 16 | PLP template: hero+inline form → product grid → 3-step roof selector → kit components → 4-Q FAQ → 3D Designer CTA |
| 05 | `05-clearance-inventory.html` | Same product-card grid + "Available now" red pills + ZIP/type/size/sort filter row |
| 06 | `06-options-finishes.html` | Tabbed sections: Frame / Panels / Doors / Windows / Trim / Insulation / Colors (with 13 panel + 6 trim swatches) |
| 07 | `07-about.html` | Get-to-know hero → Vision → Mission → 6-pillar grid → founder bio → 5-step process → testimonials → CTA |
| 08 | `08-contact.html` | 3 contact-method cards → Get-In-Touch form + Get-Instant-Pricing form → quick-ref box |
| 09 | `09-blog-index.html` | 12-card blog grid, no sidebar |
| 10 | `10-blog-post.html` | Long-form article + related posts + in-article CTA band |
| 11 | `11-testimonials.html` | Rating stats → 9-card testimonial grid → submit-review CTA |
| 12 | `12-faq-resources.html` | Flat list of 10 expanded Q&As + Get-Instant-Pricing CTA |
| 13 | `13-warranty.html` | Coverage tiers list + claim-process steps + exclusions |
| 14 | `14-privacy.html` | 8-section policy stub (legal review pending) |
| 15 | `15-true-pricing.html` | 6-pillar "what shapes your price" + "what's NOT in your invoice" |
| 16 | `16-our-advantage.html` | 6 alternating-layout long-form pillars |
| 17 | `17-resources-hub.html` | 9-tile resources index |
| 18 | `18-video-library.html` | 6 video cards with placeholder play buttons |
| 19 | `19-brochure.html` | Cover thumbnail + email-gated PDF form |
| 20 | `20-builder.html` | 3D Designer placeholder + 5-step "how it works" |

## Shared scaffolding (used as-is from repo root)

- `../_nav.js` — auto-detects `.nav-links` header pattern, injects mobile drawer, expands `.nav-caret` dropdowns from the existing SUBMENUS dict (`buildings`, `optionsfinishes`, `about`, `resources`).
- `../_lightbox.js` — auto-detects photo elements, opens fullscreen viewer.
- `../_photo-carousel.js` — cycles `.two-col-photo` blocks on PDP pages (currently not wired into mock-d product cards; the prev/next arrows on `.pcard-media` are visual-only).
- `../_builder.js` — placeholder hook for the 3D Designer page.

## Component conventions

- **Header** uses `header.site-header.nav-solid` + `.nav-inner` (header-inner) + `.brand` + `.nav-links` with `.nav-link.nav-caret` for any link that should get a dropdown. The mobile hamburger is injected by `_nav.js`.
- **Hero (homepage)** uses `.hero` → `.hero-inner` 2-col with `.hero-content` and `.hero-photo`. `.hero-bbb` floats over the photo.
- **Hero with inline form (PLP)** uses `.hero-with-form` → `.hero-with-form-inner` 2-col with copy on the left and `.inline-form` on the right; the whole band is `--d-slate` background.
- **Trust strip** uses `.trust-strip` → `.trust-inner` 6-col grid of `.trust-item` cells. Collapses to 3-col → 2-col on smaller screens.
- **Product card** uses `.product-card` → `.pcard-media` (with `.pcard-photo`, `.pcard-code`, `.pcard-compare`, `.pcard-arrows`, optional `.pcard-flag`) and `.pcard-body` (with `.pcard-title`, `.pcard-feats`, `.pcard-cta`). `.pcard-photo` accepts color variants `.warm`, `.field`, `.sand`, `.steel`, `.dusk` for placeholder gradients.
- **Category tile** uses `.cat-tile` with optional `.warm`/`.field`/`.sand` variants.
- **3-step roof selector** uses three hidden `<input type="radio" name="roof-step">` siblings inside `.roof-selector` with `.roof-panel.roof-step-1/2/3` panels — pure CSS, no JS.
- **FAQ accordion** uses `.faq-list` → `.faq-item` (toggle `.is-open` via the inline script at the bottom of each page).
- **FAQ flat** (probuilt pattern) uses `.faq-flat` → `.qa` blocks.
- **CTA band** uses `.cta-band` → `.cta-band-inner` — dark slate-to-sun gradient.

## What's stubbed / TODO

- Real photography — currently CSS-gradient placeholders. Same `.pcard-photo` color variants used across mock-b/c map to real Unsplash photos via per-page overrides; mock-d does not load real photos yet.
- 3D Designer integration on `20-builder.html` (Sensei3D or equivalent).
- Legal copy on `13-warranty.html` and `14-privacy.html` — placeholders flagged with `.todo` chips.
- Photo carousel arrows on product cards are visual-only (no `_photo-carousel.js` wiring on `.pcard-media`).
- Blog posts: 1 sample post (`10-blog-post.html`) for layout reference; 11 additional themed slugs from mock-b/c are not yet written for mock-d.
- BBB badge in `.hero-bbb` is a stylized stand-in; the real BBB seal is an asset swap.

## Differentiation from existing mocks

| Mock | Palette | Display font | Vibe |
|---|---|---|---|
| A | Charcoal + Bronze | Oswald | Industrial trade catalog |
| B | Indigo + Ember + Conduit | Barlow Condensed | Lead-gen quote machine |
| C | Spruce + Brick + Brass | Fraunces | Heritage editorial |
| **D** | **Slate + Sun + Sky** | **Mulish** | **ProBuilt-aligned sunshine catalog** |
| E | Asphalt + Hazard + Signal | Oswald | Industrial-construction direction (token-only port of D) |

## Verification (pre-port)

1. Open `01-design-system.html` — every primitive renders with correct tokens.
2. Open `02-homepage.html` — 16 product cards, 6 trust items, 4 category tiles, page height ~4140px.
3. Open `04-garages-detail.html` — 3-step roof selector switches panels via radio. FAQ accordion expands.
4. Resize to 390×844 — mobile drawer opens via injected hamburger; `nav-caret` links expand to submenu.
5. Click a homepage product-card photo — `_lightbox.js` opens.
