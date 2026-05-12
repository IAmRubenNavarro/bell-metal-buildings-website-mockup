# Mock C — Handoff Document

**Client:** Bell Metal Buildings Co. *(working name — confirm with client before launch)*
**Mock direction:** C — closest in structure to reference site 3 (Olympia Steel Buildings)
**Palette:** Spruce + Bone + Brick + Brass (heritage editorial / Americana direction)
**Status:** Visual/structural mocks ready for client review. Not production code.
**Date:** 2026-05-11

---

## 1. File list

All files live in `mock-c/`. Each page links a shared `_shared.css` stylesheet — no build step required to preview.

| # | File | Purpose |
|---|---|---|
| 01 | `01-design-system.html` | Every token, type specimen, and component primitive. **Reference doc — not a production page.** |
| 02 | `02-homepage.html` | 14-section homepage adapted from site 3 §1. Primary conversion surface. Hero with overlaid quote-form card, 12-card use-case grid, US-map delivery band, 6-check feature band, factory band, 8-logo client wall, simple+efficient construction band, blog carousel, history+script-italic testimonial slider, patterned footer, floating Q-tab. |
| 03 | `03-building-types.html` | PLP. Page banner + 12-card use-case grid (site 3 §2). |
| 04 | `04-garages-detail.html` | PDP template. Hero with overlaid quote form, 6-check feature grid, garage inspiration gallery, US-map delivery, simple+efficient construction, color-swatch matrix intro, **13 panel + 6 trim** color matrix, factory band, recent projects carousel, history + testimonials. (site 3 §3) |
| 05 | `05-clearance-inventory.html` | 12 product cards extending site 3 project-card pattern with crossed-out MSRP, brick save-pill, in-stock badge, filter/sort bar, pagination, triple CTA (View Drawing / Make Offer / Call). |
| 06 | `06-options-finishes.html` | 5 alternating illustrated spec blocks with brass-callout annotated SVGs (site 3 §7) + color matrix + 2-card add-ons (site 3 §6). |
| 07 | `07-about.html` | Page banner + founder portrait + 4-paragraph biography with brass-dot halftone background motif, stats strip, factory band, "Bell's quality lives on" closing with drop-cap. (site 3 §8) |
| 08 | `08-contact.html` | Two-col: contact info left, grouped form right (Questions textarea → Building Details with exhaustive state dropdown → How do we get in touch with country-flag phone). (site 3 §9) |
| 09 | `09-blog-index.html` | Page banner + search bar + paginated 3-col card grid (12 cards/page, 7 total pages). (site 3 §12) |
| 10 | `10-blog-post.html` | Photo hero with serif headline, constrained-width prose, 8 numbered H3 subsections with brick italic numerals, drop-cap, contextual link CTA, post nav, post tags. ~830 word article matching site 3 §13. |
| 11 | `11-testimonials.html` | Banner + script-italic testimonial slider (carrying script accent from home) + paginated 3-col project-card grid (12 cards). (site 3 §10/11 hybrid) |
| 12 | `12-faq-resources.html` | Banner + working 12-item FAQ accordion + 6 resource tiles with numbered marks + factory band. |
| 13 | `13-warranty.html` | Banner + 4-row warranty summary table + 3 alternating illustrated warranty profiles + plain-language claim-filing CTA. |
| 14 | `14-privacy.html` | Banner + sticky-TOC + 9 numbered H2 sections (placeholder copy). **Requires legal review before launch.** |
| 15 | `15-true-pricing.html` | Banner + 2-col intro + 12-row Bell-vs-broker comparison table with green ✓ / red exclusions + factory band. |
| 16 | `16-our-advantage.html` | Banner + 5-block standard-features card grid with mini illustrations + 2-card popular add-ons + 7-block construction-types grid + factory band. (site 3 §6 full expansion) |
| 17 | `17-resources-hub.html` | Banner + 8-card resource grid with photo-cover hover cards. |
| 18 | `18-video-library.html` | Banner + featured video card (16:9 + body copy) + 12-card video thumb grid with duration badges + Caveat-script pullout quote. |
| 19 | `19-brochure.html` | Banner + 4 brochure cover cards (with cover gradient + page count) + gated email form with brick-accent card. |
| — | `_shared.css` | **Real working stylesheet** linked by every page. Tokens + all component primitives in one file. |

**Total: 19 pages + 1 shared CSS file, ~6,841 lines.**

---

## 2. Design tokens

Final values declared once in `_shared.css` on `:root`. Production can ingest the file directly or port to Tailwind theme extension.

### Color

| Token | Value | Use |
|---|---|---|
| `--c-spruce` | `#0f2724` | Primary deep green-black. Header text, body text on light, hero base. |
| `--c-spruce-2` | `#16332f` | Layered dark surface (hero photo, button hover). |
| `--c-spruce-deep` | `#0a1c1a` | Footer base + utility bar. |
| `--c-spruce-line` | `#233f3a` | Hairline on dark surfaces. |
| `--c-bone` | `#f5efe2` | Default page background (warm parchment). |
| `--c-bone-2` | `#ece4d2` | Off-bone panel (testimonial band, delivery band, FAQ surfaces). |
| `--c-bone-3` | `#dfd6c1` | Third paper, alternate accordion. |
| `--c-paper` | `#ffffff` | Quote card, form fields, content cards. |
| `--c-rule` | `#c9c0a8` | Hairline on bone. |
| `--c-rule-soft` | `#e5dec8` | Softer card border. |
| `--c-brick` | `#a8362a` | Primary CTA color. Headlines on light. |
| `--c-brick-hover` | `#8c2a20` | CTA hover. |
| `--c-brick-deep` | `#6f2218` | Promo strip bg. |
| `--c-brass` | `#b88a3b` | Editorial accent (eyebrow rules, ornaments, callouts, dot markers). |
| `--c-brass-soft` | `#ead7a6` | Brass-on-dark text (utility bar links, on-dark eyebrows). |
| `--c-cream-ink` | `#f8efe5` | Text on brick/spruce. |
| `--c-text` | `#1a2a26` | Default body text. |
| `--c-text-muted` | `#5b6660` | Secondary text. |
| `--c-text-faint` | `#8a948e` | Tertiary text. |
| `--c-success` / `--c-warning` / `--c-danger` | `#2f6f3f` / `#b6841d` / `#b8302a` | Semantic. |

### Type

- **Display:** Fraunces — variable serif with optical-size axis (9–144) and SOFT axis (0–100). Larger displays use higher SOFT (50–100) for warmth. From Google Fonts.
- **Body:** IBM Plex Sans, 400/500/600/700. From Google Fonts.
- **Script accent:** Caveat — used only on testimonial quotes (site 3 mirror).
- **Scale:** `--t-d1` 40–72px → `--t-d2` 32–52px → `--t-h1` 28–40px → `--t-h2` 22–30px → `--t-h3` 20px → `--t-h4` 17px → body 16px → small 15px → xs 13px → eyebrow 12px → `--t-quote` 24–32px (script).
- **Line height:** 1.06 (display), 1.20 (snug), 1.65 (body).
- **Tracking:** display 0.005em, eyebrow 0.22em.

### Spacing (4px base)

`--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 · `--s-7` 48 · `--s-8` 64 · `--s-9` 96 · `--s-10` 128 · `--s-11` 160.

### Radius

`--r-sm` 3px (inputs, buttons) · `--r-md` 6px (cards) · `--r-lg` 12px (large containers) · `--r-xl` 24px · `--r-pill` 999px (search, q-tab, progress, badges).

### Shadow

`--sh-sm` subtle · `--sh-card` 0 2px 12px rgba(15,39,36,.10) · `--sh-md` hover lift · `--sh-lg` floating quote card + q-tab.

### Layout

`--container` 1240px · `--container-narrow` 880px · `--container-prose` 720px.

---

## 3. Page-by-page component breakdown

### Shared chrome (every page)
- **Utility bar** (dark spruce, heritage line + phone + lang)
- **Sticky site header** (brand mark + serif wordmark + 4-link text nav + outline / secondary / primary CTA buttons)
- **Site footer** (3-column on desktop, patterned dark with brass-dot halftone bg, single sub-footer line)
- **Floating Q-tab** (bottom-right brick pill with brass dot)

### Per-page distinctive components

- **Homepage:** hero with overlaid 3-step quote card (signature pattern), 12-card use-case grid, inline SVG US map with HQ + 6 delivery dots, 6-check feature band, full-bleed dark factory band, 8-tile logo wall with placeholder chips, 2-col construction band with play-icon video thumb, 4-card story carousel with chevrons, two-column history-of-trust + auto-rotating script testimonial slider (3 unique quotes, 6.5-second cycle).
- **Building Types (PLP):** banner + 12-card use-case grid with anchored ids per card for deep-linking.
- **Garages detail:** full single-template that doubles as PDP (Bell's product is one kit, sized differently — true to site 3's pattern). Hero quote form, feature checks, inspiration gallery (7 thumbs with one big), US map, video, swatch-matrix intro, color matrix, factory band, recent-projects carousel, testimonials.
- **Clearance Inventory:** promo strip, filter-bar with 3 selects + count display, 12-card grid with brick save-pill, dotted in-stock badge, crossed-out MSRP, brick-display final price, triple CTA (View Drawing / Make Offer / Call), pagination.
- **Options & Finishes:** 5 alternating illustrated spec blocks with inline-SVG diagrams + brass callouts (PBR, silicone-poly coating, C-section, stainless fastener, I-beam), full color matrix, 2-card popular add-ons.
- **About:** founder portrait pattern with serif drop-caps on the close, brass-dot halftone bg motif (chosen over site 3's Statue of Liberty pattern), stats strip on brick, factory band, "quality lives on" closing.
- **Contact:** 3-row icon-prefixed info column (phone / email / address) + "Faster than a form?" helper card; long form with Questions textarea → Building Details (with full 50-state + territories + Armed Forces dropdown matching site 3 §9) → How do we get in touch (with country-flag phone field).
- **Blog Index:** search bar + 12 post cards in 3-col grid, pagination "1 2 3 … 7 Next" matching site 3 §12 stats.
- **Blog Post:** photo hero with centered serif headline, constrained-width prose with brick italic numerals (`1.` `2.` etc.) on 8 H3 subsections, drop-cap opening, brick-accent CTA card mid-page, post tags, post nav.
- **Testimonials:** banner + script-italic testimonial slider with BBB badge (carrying the home pattern) + 12-card paginated project grid + 4-page pagination.
- **FAQ & Resources:** 12-item working accordion with brick + icon, mid-page "Still have questions?" CTA card, 6 numbered resource tiles, factory band.
- **Warranty:** 4-row coverage summary table + 3 alternating illustrated warranty profiles + plain-language claim-filing instructions.
- **Privacy:** sticky TOC with counter-driven numbered links + 9 numbered H2 sections (placeholder for legal).
- **True Pricing:** 12-row Bell-vs-broker comparison table with green ✓ for "included" and red callouts for typical broker add-ons + brick-accent CTA.
- **Our Advantage:** 5-block standard-features card grid with mini-SVG illustrations + 2-card popular add-ons + 7-block construction-types grid (each with brick-display numeral).
- **Resources Hub:** 8-card photo-cover resource grid with brick corner-tag numerals.
- **Video Library:** featured 16:9 video card with copy column + 12 video thumbs with spruce-on-spruce gradients and duration badges + Caveat-script pullout quote.
- **Brochure:** 4 brochure cover cards with cover-gradient + kicker + title + page count + gated 6-field email form on a brick-left-bordered card.

### Working interactive elements

- **FAQ accordion** (`.acc-item.is-open` toggles max-height + icon rotation; keyboard accessible)
- **Testimonial slider** (3 rotating quotes, dot navigation, auto-rotate every 6.5s on homepage)
- **Carousel chevrons** (opacity-step on click — production: horizontal scroll-snap)
- **Hover lift** on use-case cards, project cards, resource cards (transform + shadow)
- **Form focus state** (brass-color border + brass ring at 18% alpha)
- **Skip-link** for accessibility (every page)
- **Smooth scroll** on anchor links (CSS scroll-behavior)

---

## 4. Tech-stack recommendation for production build

### Frontend
- **Next.js 14 (App Router)** — SSR/ISR for SEO. Same recommendation as Mocks A and B for consistency.
- **Tailwind CSS** — port the existing `_shared.css` `:root` tokens into `theme.extend.colors / fontFamily / spacing / borderRadius / boxShadow`. The Fraunces variable axes (`opsz`, `SOFT`) need a custom utility plugin — Tailwind doesn't expose `font-variation-settings` natively. Plan ~½ day for that.
- **React Hook Form + Zod** for: the 3-step quote wizard (Width/Length/Height → Use case + Timeline → Contact), the contact form, the brochure gate, the FAQ search.
- **Framer Motion** for: testimonial slider transitions, accordion expand, carousel scroll-snap, hero parallax (subtle), card hover lifts.
- **Sanity** as headless CMS. Bell will want to edit blog posts, building-type copy, testimonials, clearance inventory, FAQs, the promo strip, the color matrix (especially), and the brochure PDFs without redeploying.

### Type loading
- Fraunces is ~120KB woff2 for the variable file. Preload it with `<link rel="preload">` and subset to Latin if Bell doesn't need Latin Extended. Caveat is small (~30KB).
- IBM Plex Sans — load only 400/500/600/700 weights, no italic (we don't use it anywhere).

### Backend / integrations
- **CRM:** HubSpot or Salesforce — quote wizard, contact form, brochure gate all post here.
- **Email:** Postmark for transactional, MailerLite or Buttondown for the Field Journal newsletter.
- **Analytics:** GA4 + Hotjar/Microsoft Clarity for the homepage and PDP.
- **Reviews:** Google reviews API + BBB live badge (the seal is a placeholder).
- **Inventory:** the clearance-inventory page reads from Sanity. CRM gets a webhook when a card is clicked through to "Make an Offer."

### Hosting / DevOps
- **Vercel** front-end + **Cloudflare** image cache.
- **Sentry** for error monitoring.

### Out of scope for production hookup
- "Make an Offer" CTA on clearance cards — a marketing label, not a real offer engine. Phase-2 enhancement.
- Multi-language EN/ES toggle — flagged but not built. Bell will need translation budget if they want this live.
- A 3D Builder is referenced on Mocks A and B but **not on Mock C** — site 3 doesn't have one and the heritage-editorial direction reads cleaner without it. Confirm Bell doesn't expect one.

---

## 5. Open TODOs (what the client must supply)

Every TODO chip in the mocks corresponds to a client decision or asset. Sorted by priority. Search the codebase for the `<span class="todo">` tag to find each chip in context.

### Blocking (cannot launch without)
1. **Legal entity name** for footer copyright, privacy policy, warranty document.
2. **Real logo** — currently a single-letter "B" inside a brass-spot spruce square. Need actual wordmark + glyph.
3. **Phone, email, mailing address** — `1-800-444-2525`, `quotes@bellmetalbuildings.example`, `2200 Furnace Road, Aliquippa, PA 15001` are all placeholders. Aliquippa was chosen specifically to avoid copying site 3's actual McKees Rocks address.
4. **Privacy policy** — placeholder structure only. Must be drafted/reviewed by counsel before launch (CCPA, CDPA, CTDPA, UCPA, etc.).
5. **Warranty terms** — placeholder durations (40/40/50/25 year) modeled on industry norms. Must be confirmed by Bell's actual warranty document.
6. **Product catalog confirmation** — 12 use cases matching site 3 count (Industrial, Garages, Commercial, Workshops, Storage, Barns & Farming, Mini-Storage, Warehouses, Horse Arenas, Aircraft Hangars, Barndominiums, Sheds). Confirm Bell offers each.

### High priority (visual quality / trust)
7. **Photography** — every photo is a CSS-gradient placeholder. Production needs roughly 100 real Bell photos: hero, 12 use-case category photos, garage inspiration gallery (7 shots), US-map context, 12 testimonial/project photos, founder portrait, factory floor shots, 12 video thumbnails.
8. **Founder name + portrait** — "William 'Bell' Larkin · Founder, 1962" is invented. Confirm actual founder identity and supply portrait.
9. **Family ownership claim** — "Three generations of the Larkin family" — confirm or replace.
10. **Stats numbers** — "64 yrs," "42k+ buildings," "48 states," "A+ BBB" — placeholder claims, replace with defensible numbers.
11. **Client logo strip** — 8 placeholder tiles on the homepage. Need real permissioned customer marks or remove.
12. **Real testimonial copy** — 4 unique testimonials across the site (homepage carousel + Garages page + Testimonials page + Video Library script-pullout). Need permissioned customer quotes.
13. **Tagline** — "Built once. Stands for generations." is invented. Confirm or replace.
14. **Founding year** — "Since 1962" / "64 years" is a working assumption. Confirm or adjust.

### Medium priority (operational)
15. **Promo strip offer** — placeholder "Spring clearance — save up to 35%." Confirm actual promotion.
16. **Clearance pricing** — every dollar value on `05-clearance-inventory.html` is a placeholder.
17. **Color palette names + SKUs** — 13 panel + 6 trim color names (Onyx, Slate, Spruce, Sage, Quarry, Ridge, Bone, Parchment, Tannery, Brick, Oxblood, Brass, Forest; Cloud, Bone, Onyx, Bronze, Cypress, Brick) are placeholders. Need Bell's actual color names + manufacturer SKUs.
18. **Video assets** — 1 featured + 12 thumb-grid + factory build animation embed on home and Garages. All placeholders.
19. **Brochure PDFs** — 4 brochures referenced. All placeholders.
20. **Certifications** — placeholder; confirm what Bell actually holds (CSA, AWS, UL, FM, AISC, IBC).
21. **Service map** — placeholder claims all 48 contiguous states; AK/HI/Canada case-by-case. Confirm Bell's true service map.
22. **Financing partners** — FAQ mentions RTO and term financing without naming partners. Confirm.
23. **BBB rating + accreditation date** — "Accredited since 1989, A+" is a placeholder.
24. **Privacy email** — `privacy@bellmetalbuildings.example` needs the real address.
25. **CRM provider** — engineering team needs to know before they wire up forms.
26. **Domain** — `bellmetalbuildings.example` is a placeholder.

### Low priority (nice-to-have)
27. **Language selector** — utility bar shows EN/ES. Confirm Bell actually wants Spanish (and translation budget).
28. **Social handles** — placeholder f / ig / in / yt links. Confirm platforms + handles.
29. **Pattern motif** — chose repeating brass-dot halftone for the footer instead of copying site 3's Statue of Liberty silhouettes. Flag if Bell wants a different motif (oak leaf, star, anchor, rivet, etc.).

### Code cleanup (engineering)
30. **CSS already factored.** Unlike Mock A (inline CSS per page), Mock C uses a single shared `_shared.css` linked from every page. No consolidation step needed at hand-off.
31. **Fraunces variable axes** — many headings use `font-variation-settings: "opsz" X, "SOFT" Y` inline. Production should move these to utility classes (e.g. `.fr-warm-display`, `.fr-snug-h3`) or a Tailwind plugin. ~½ day.
32. **Inline SVG illustrations** — the US map, the 5 spec illustrations on Options & Finishes, the 3 warranty illustrations on Warranty, and the brand mark are all inline SVG. Production should extract these to `/public/svg/*` and `<img>` or React-component them.
33. **Promo strip dismiss** — placeholder always shows. Production should support a close button with cookie-based persistence.
34. **Quote wizard** — only step 1 (W/L/H) is built. Steps 2 and 3 are TODO. The "Next" button doesn't advance state in mocks.

---

## 6. Differentiation notes (for the client conversation)

When you present all three mocks, Mock C's distinguishing characteristics are:

1. **Fraunces serif display** with optical-size + SOFT variable axes — the only mock that breaks from condensed sans-serif. Reads "editorial publishing house" rather than "industrial trade catalog."
2. **Caveat script accent** on testimonial quotes — a deliberate echo of site 3's italic-script testimonial pattern, used sparingly so it doesn't dominate.
3. **Spruce / Bone / Brick / Brass** palette — warmer and more heritage than Mock A's bronze-on-charcoal or Mock B's indigo + ember + blue.
4. **Quote-form-overlapping-hero** is the signature pattern, repeated on every product detail page. Mock A uses a wizard band; Mock B uses a transparent header over a hero. Mock C plants the quote card on every conversion surface, exactly as site 3 does.
5. **Single use-case template** doubles as category landing + product detail. Bell ships one kit sized to your project, so duplicating PDPs would be dishonest. Mock C reflects that.
6. **Brass-dot halftone footer motif** — a heritage-pattern echo that's original to Mock C (not copied from site 3's Statue of Liberty pattern).
7. **Wet-stamped engineering** as a recurring narrative thread — appears on the home, About, Field Journal, Warranty, True Pricing, and Garages detail. This is Bell's most defensible differentiator and the editorial direction lets us lean into it.

---

## 7. Acceptance checklist

- [x] 19 HTML pages produced, matching the page set in Mocks A and B
- [x] Single `_shared.css` linked from every page
- [x] Original branding — no logos, brand names, or imagery from any reference site
- [x] Address swapped from site 3's actual McKees Rocks, PA to Aliquippa, PA
- [x] Counts match site 3 inventory: 12 use cards, 8 client logos, 4 blog cards in homepage carousel, 3 testimonial slides, 6 feature bullets, 5 hero bullets, 12 project cards on Testimonials, 13 panel colors, 6 trim colors, 5 illustrated spec features, 12 FAQ items, 4 brochures
- [x] All photos are CSS gradient placeholders (no copied imagery)
- [x] All TODOs flagged with `<span class="todo">` chips
- [x] Working interactivity: accordion, testimonial slider, smooth scroll, hover lifts, form focus
- [x] Skip-link on every page for accessibility
- [ ] Client supplies the items in §5 before production build
- [ ] Legal review of `14-privacy.html` and `13-warranty.html` before launch
