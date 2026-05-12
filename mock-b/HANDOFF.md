# Mock B — Handoff Document

**Client:** Bell Metal Buildings Co. *(working name — confirm with client before launch)*
**Mock direction:** B — closest in structure to reference site 2 (Armstrong Steel)
**Palette:** Anthracite Indigo + Ember Orange + Conduit Blue
**Status:** Visual/structural mocks ready for client review. Not production code.
**Date:** 2026-05-11

---

## 1. File list

All files live in `mock-b/`. Each page is a self-contained HTML file that links to a shared `_shared.css` stylesheet — no build step required to preview.

| # | File | Purpose |
|---|---|---|
| 01 | `01-design-system.html` | Tokens, type scale, all component primitives. **Reference doc** — not a production page. |
| 02 | `02-homepage.html` | 9-section homepage. Primary conversion surface. Transparent header over hero, sticky bottom utility bar. |
| 03 | `03-building-types.html` | PLP. 10-tile type grid + 9 happy-customer rows + spec accordion + 12-tile featured-projects grid. |
| 04 | `04-garages-detail.html` | PDP template. Interactive 10-photo carousel with thumb strip, 50-state link cloud, long-form copy, 9 testimonials, spec accordion, 12 projects. |
| 05 | `05-clearance-inventory.html` | Ready-to-ship inventory. 12 cards, filter chips, burgundy notice band, MSRP/save/in-stock badges. |
| 06 | `06-options-finishes.html` | Icon-card hub (6 categories) + 14-swatch color chart + 6 pre-packaged configuration bundles. |
| 07 | `07-about.html` | Left-rail "guide" nav + body. Founder narrative, history, values cards. |
| 08 | `08-contact.html` | **No web form.** 3-col contact / Help Desk / Careers + 3-col Media / Email / Pricing + "Featured In" logo strip. |
| 09 | `09-blog-index.html` | 7-topic filter chip row + 9-card image grid. |
| 10 | `10-blog-post.html` | 2-col article body with sticky promo card in left rail (phone + Get-My-Price), breadcrumb + share row, 6 H3 subsections. |
| 11 | `11-testimonials.html` | Overlap stats card on navy banner + filter chips + state select + 12-row typographic review list. |
| 12 | `12-faq-resources.html` | Conduit-blue full-bleed Help Desk panel + 6 action tiles (one burgundy) + 12-question FAQ accordion. |
| 13 | `13-warranty.html` | Rounded inset navy hero + collapsible TOC + 6 chapters + 4 warranty-card profiles (straight-wall + arch). |
| 14 | `14-privacy.html` | Plain header + 9 numbered H3 sections with bullets. **Placeholder content — requires legal review.** |
| 15 | `15-true-pricing.html` | Left-rail guide nav + body + 5-bullet "What determines my price?" arrow-card. |
| 16 | `16-our-advantage.html` | Left-rail guide nav + body + 4 pillar cards + 10-pill "What best describes your building?" selector grid. |
| 17 | `17-resources-hub.html` | Centered intro + 6-card icon grid + dark promo band + 6 more icon cards. |
| 18 | `18-video-library.html` | Featured video player + 6-row video list rail + 6 topic chapter cards. |
| 19 | `19-brochure.html` | 4 brochure cover cards + dark sticky gated email form. |
| — | `_shared.css` | **Real working stylesheet** linked by every page. Tokens + all component primitives in one file. |

**Total: 19 pages + 1 shared CSS file.**

> **Engineering note:** Mock A inlined every page's CSS for self-containment; Mock B factors tokens + components into `_shared.css` linked from each page. This is a meaningful production-hygiene improvement and means a token edit propagates everywhere. If the client picks Mock B, this saves a consolidation step at production hand-off.

---

## 2. Design tokens

Final token values are declared once in `_shared.css` on `:root`. Production rebuild can ingest this file directly.

### Color

| Token | Value | Use |
|---|---|---|
| `--b-ink` | `#0e1a2b` | Anthracite Indigo — primary dark surface, banner, footer base |
| `--b-ink-2` | `#15243a` | Raised dark surface (e.g. testimonial carousel band) |
| `--b-ink-deep` | `#08111c` | Footer + sticky bottom bar |
| `--b-ink-line` | `#20334f` | Hairline on dark surfaces |
| `--b-paper` | `#ffffff` | Default page background |
| `--b-paper-2` | `#f5f6f8` | Off-white panel |
| `--b-paper-3` | `#ebeef2` | Tag pill background, accordion header |
| `--b-rule` | `#d8dde4` | Hairline on light surfaces |
| `--b-ember` | `#e26432` | Primary CTA color |
| `--b-ember-hover` | `#c25022` | Primary CTA hover |
| `--b-conduit` | `#2a7fd4` | Secondary CTA, info links, big-pill selector, phone band |
| `--b-conduit-soft` | `#e8f1fb` | Icon-card chip background |
| `--b-emerald` | `#16a34a` | Phone-pill CTA |
| `--b-gold` | `#f5b50a` | Star rating, verified badge accent |
| `--b-burgundy` | `#7a1f1f` | Promo / urgency strip + "File a complaint" tile only |
| `--b-danger` | `#b8302a` | Form errors, "vs conventional" red X |
| `--b-success` | `#16a34a` | "Save X%" pill, vs-block checkmarks |

### Type

- **Display:** Barlow Condensed (500/600/700/800/900) — Google Fonts. Uppercase, +.01em tracking.
- **Body:** Source Sans 3 (400/500/600/700) — Google Fonts.
- **Eyebrow:** Barlow Condensed 700, uppercase, +.16em tracking, Ember Orange.
- **Scale:** `--t-d1` 44–80px → `--t-d2` 36–60px → `--t-h1` 30–40px → `--t-h2` 22–30px → `--t-h3` 20px → body 16px → small 14px → caption 12px.
- **Line height:** 1.04 (display) · 1.2 (snug) · 1.6 (body).

### Spacing (4px base)

`--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 · `--s-7` 48 · `--s-8` 64 · `--s-9` 96 · `--s-10` 128.

### Radius

`--r-sm` 4px (inputs, tags) · `--r-md` 10px (cards, banners) · `--r-lg` 18px (large containers) · `--r-xl` 28px (inset rounded banner) · `--r-pill` 999px (buttons, chips, big pills).

### Shadow

`--sh-sm` subtle · `--sh-card` resting card · `--sh-md` hover lift / overlap stats card · `--sh-lg` floating elements (modals, alerts).

---

## 3. Page-by-page component breakdown

### Shared chrome (every page)
- **Site header.** Two states: `nav-transparent` over the homepage hero, `nav-solid` on every interior page. Sticky in production.
- **Phone CTA band.** Blue full-bleed strip above the footer with phone icon, big phone number, and ghost CTA.
- **Footer.** 5-column with brand+blurb+phone+social on the wide first column; 4 link columns; legal bottom strip.
- **Sticky bottom utility bar.** Persistent dark "Get My Price" bar — Mock B's signature CTA persistence, replaces Mock A's floating quote pill.

### Per-page distinctive components

- **Homepage:** transparent-over-hero header, full-bleed photo hero with floating navy testimonial overlay card, dark reviews band ("almost 5-stars" with cyan accent + stat trio), horizontal-scroll testimonial carousel with prev/next, 6-card "we'll make it easy" 3×2 grid, 10-tile building-type grid (5×2 with 2 CTA tiles in ember + conduit), steel-vs-conventional comparison split with bronze photo block, 3-card blog teaser.
- **Building Types PLP:** navy banner, 10-tile type grid (with "Most popular" eyebrow on the first tile), 9-row happy-customers list (photo-left/quote-right rows), 6-tab spec accordion (Spec / Why Bell / Advantages / FAQs / Customizations / Warranties), 4×3 featured-projects grid (12 cards).
- **Garages PDP:** navy banner, "Configure your dream garage" mid-CTA, interactive 10-photo hero carousel with 10-thumb strip, repeat CTA on paper-2 panel, dotted 50-state link cloud (5-column on desktop), long-form 3-H2 copy block, 9 garage-specific happy-customer rows, spec accordion, 4×3 featured-projects grid.
- **Clearance Inventory:** navy banner, burgundy notice band, two filter rows (chips + sort select), 3×4 inventory card grid with MSRP/save/in-stock badges, per-card triple CTA (Reserve / Drawings / dashed-bordered footer), pagination.
- **Options & Finishes:** navy banner, 6 icon-cards in 3×2 (Doors/Windows/Insulation/Trim/Skylights/Color Chart), 14-swatch 7-col color grid, 6 pre-packaged bundle cards.
- **About:** navy banner, guide-layout (left-rail nav + body), 4-section narrative, 3 framed values cards with ember underline.
- **Contact:** plain centered hero with big phone number, two rows of 3 contact cards (Info / Help Desk / Careers · Media / Email / Pricing), "Featured In" 8-grayscale-logo strip on paper-2.
- **Blog Index:** plain header with H1+lede, filter pill row (7 topics), 9-card 3-col post grid with category tag + bordered meta line.
- **Blog Post:** plain article header with category pill, full-bleed 2:1 banner photo, breadcrumb + share row, 2-col article body with sticky navy promo card on the left (phone + "Get My Price" + "Back to all posts") and 6 H3 subsections on the right.
- **Testimonials:** navy banner, overlapping stats card (4-cell), filter chips by building type + state select + sort, 12-row typographic review list (stars / who / dated / state, paragraph).
- **FAQ Resources:** Conduit-blue full-bleed "Help Desk" panel with 6 action tiles (5 white + 1 burgundy "File a complaint"), 12-question FAQ accordion below in container-narrow.
- **Warranty:** rounded inset navy hero (Complete-Guide pattern), collapsible TOC, 6 underline-H2 chapters, 4 warranty-card profiles arranged as 2×2 split (straight-wall material/paint, straight-wall accessories/fasteners, arch material/paint).
- **Privacy:** plain white header, 9 numbered H3 sections with ember-colored numerals, bulleted disclosures.
- **True Pricing:** navy banner, guide-layout (left-rail nav + body), narrative + arrow-bullet callout card (5 numbered circle-arrow items in the "What determines my price?" pattern).
- **Our Advantage:** navy banner, guide-layout, 4 pillar cards (in-house engineering / fixed-price / one PM / service line) with icon, 10-pill big-pill selector grid for quote-flow entry.
- **Resources Hub:** centered intro, 3×2 icon-card grid, dark navy promo band ("Let us crunch your numbers"), second 3×2 icon-card grid.
- **Video Library:** navy banner, 2-col layout with large featured-video tile (play-button overlay) + 6-row vertical video list rail with mini-thumb thumbnails + duration metadata, second-section 6 topic icon-cards.
- **Brochure:** navy banner, 2-col layout — left: 4 brochure cover cards in 2×2 (kicker + cover gradient + meta footer); right: sticky navy gated form with name/email/state/building-type fields + opt-in.

### Working interactive elements

- Testimonial-carousel arrows on homepage (`scrollBy` smooth).
- Spec-accordion tab switching on PLP, PDP, and design system.
- FAQ accordion (height transition, +/– toggle) on FAQ Resources and design system.
- Big-pill active toggle on Our Advantage and design system.
- Filter-chip active toggle on Clearance Inventory, Blog Index, Testimonials, design system.
- PDP photo carousel (prev/next + thumb click) with 10-photo cycle on Garages PDP.

---

## 4. Tech-stack recommendation for production build

### Frontend
- **Next.js 14 (App Router)** for SSR + ISR. Excellent SEO story for a lead-gen site; the navy banner pattern is friendly to per-page hero overrides.
- **Tailwind CSS** — convert `_shared.css` to `tailwind.config.js theme.extend` so every token becomes a utility class.
- **React Hook Form + Zod** — for the brochure gate, contact callouts, and the Get-My-Price modal flow.
- **Framer Motion** — for the testimonial carousel, FAQ accordion, PDP photo cross-fade, and big-pill press feedback.
- **Sanity or Contentful** as a headless CMS — every "happy customer," every clearance kit, every blog post, every FAQ, every video, every brochure should be editable without a redeploy.

### Backend / integrations
- **CRM:** HubSpot or Salesforce — quote modal, brochure form, and Help Desk tiles all post here.
- **Email:** SendGrid or Postmark — transactional brochure-bundle send + marketing.
- **Analytics:** GA4 + heatmap (Hotjar / Clarity). The sticky bottom bar is the highest-leverage CTA; instrument click + scroll-depth on it specifically.
- **Reviews integration:** Google reviews API + per-state filtering — both are placeholders right now.
- **Photo / video CDN:** Cloudinary or Mux. The PDP carousel and the Video Library both need real assets — gradient placeholders are throwaway.

### Hosting / DevOps
- **Vercel** for the front-end. Connect to a CDN-fronted Sanity backend.
- **Cloudflare** in front for DDoS + image cache.
- **Sentry** for client-side error monitoring.

### Out of scope for production hookup
- The "Reserve this kit" CTA on the clearance inventory page is a marketing label — not a real reservation engine. Production needs either a deposit-collection flow (Stripe) or a "request kit" CRM webhook.
- The 3D Designer is referenced in three places (header, hero, Resources Hub icon-card) but is not built. Likely a separate React/Three.js app embedded in an iframe; budget accordingly.
- The Get-My-Price modal itself is not built — the buttons render and stub. Production: a 5-question wizard pre-populated by the "What best describes your building?" big-pill grid.

---

## 5. Open TODOs (what the client must supply)

Every TODO chip in the mocks corresponds to a client decision or asset. Sorted by priority.

### Blocking (cannot launch without)
1. **Legal entity name** for footer copyright, privacy policy, warranty document.
2. **Real logo** — currently a single-letter "B" glyph. We need an actual mark.
3. **Phone number, email, mailing address** — currently dummy values throughout header, footer, contact page, brochure form.
4. **Privacy policy** — placeholder structure only. Must be drafted/reviewed by counsel.
5. **Warranty terms** — placeholder durations (50/40/25/20 year, straight-wall vs arch split) modeled on industry norms. Must be confirmed against Bell's actual warranty document.
6. **Product catalog confirmation** — we used 8 industry-standard building categories (Garages, Workshops, Barndominiums, Quonset, Carports, Container Covers, Commercial, Storage). Confirm Bell actually offers each.
7. **Steel grade & spec specifics** — primary frame steel grade is `<TODO>` placeholder. Sealant duration, fastener material, lead-time bands all flagged.

### High priority (visual quality / trust)
8. **Photography** — every photo is currently a CSS gradient placeholder. Production needs a real photo library: hero shot, building-type tile photos (10), 12-photo PDP carousel for each building type, blog cover images, video thumbnails, customer/build photos for the 21+ testimonials and 12+ featured projects.
9. **Tagline** — "Built to stand for generations" is invented as a placeholder.
10. **Stats** — "12,400+ happy customers," "98% would recommend," "4.9 ★" are placeholder claims; substitute Bell's real numbers (or remove if not defensible).
11. **Featured-In logo strip** — 8 placeholder organization names on the Contact page. Replace with real Bell community partners (with permission) or remove.
12. **Testimonial copy** — 21+ testimonials across homepage, PLP, PDP, Testimonials, and Featured Projects. All flagged for client confirmation of names + permissions, or visibly disclosed as illustrative.
13. **Featured Projects nicknames + pull-quotes** — 12 invented project nicknames ("Cedar Ridge Workshop", etc.) need real client-build sourcing.
14. **Color chart names** — 14 swatch names (Iron Black, Forge Bronze, etc.) are invented. Bell's actual SKU names must replace.

### Medium priority (operational)
15. **Burgundy notice band copy** on Clearance Inventory ("Limited inventory · refreshed weekly") — confirm.
16. **Clearance pricing** — all 12 inventory kit MSRP/save values are placeholders.
17. **Coverage map** — currently shows lower-48 dotted state list on Garages PDP. Confirm Bell's true service map (lower 48 + special-case AK/HI/Canada).
18. **Lead-time bands** — "6–10 weeks" custom and "5–10 business days" ready-to-ship flagged. Confirm.
19. **Quote-hold window** — "30 days" quote price-hold mentioned three times. Confirm.
20. **Financing partners** — flagged on True Pricing and FAQ. Need partner names.
21. **Video assets** — featured video + 12 stacked videos referenced on Video Library. All placeholders.
22. **Brochures** — 4 brochure PDFs (Catalog, Doors/Windows, Color Chart, Warranty) referenced on Brochure page. All placeholders with placeholder sizes/versions.
23. **Support hours** — "Pacific–Eastern, six days a week" on Contact is placeholder.
24. **Founder narrative + history** — About page has flagged placeholders for founding year, founder name, headquarters location.
25. **Consent / cookie policy** — Privacy page mentions GPC, cookie banner. All placeholder.
26. **Domain** — `bellmetal.example` is the placeholder email domain.

### Low priority (nice-to-have)
27. **Social handles** — placeholders only (f, ◧, ▷, in). Confirm which platforms Bell actually publishes on.
28. **YouTube channel link** — referenced on Resources Hub + Video Library. Confirm Bell has one or wants one.
29. **Sub-processor enumeration** in Privacy policy — needs legal + engineering input.
30. **Service-line-for-life commitment** on Our Advantage and Warranty — confirm Bell will operationally support this language.

### Code cleanup (engineering)
31. **Inventory burgundy notice band is dismissible** in design only — production needs a real cookie-based persistence.
32. **PDP photo carousel** currently cycles 10 gradient placeholders — real production needs lazy-loaded high-res photos with `<picture>` srcsets.
33. **Help-desk tile routing** — every tile currently points to `#`. Production needs real form endpoints per tile (Ask / Feedback / Technical / Pricing / Status / Complaint).
34. **State filter on Testimonials** currently has 5 sample options — production needs the full 50.

---

## 6. Differentiation vs other mocks (for client conversations)

Mock B leans into the **site-2 (Armstrong Steel) pattern** — a pure lead-gen / quote-flow site. No cart, no checkout, no real "inventory" line in the e-commerce sense; instead a persistent sticky bottom "Get My Price" bar drives every page toward a single conversion event. Every interior page wears the navy banner. Every PDP carries the same spec-accordion + 12-tile featured-projects pattern. Marketing pages (About, True Pricing, Our Advantage, Resources, Warranty) carry a left-rail "guide" nav so the site reads like a single long manual broken into chapters. The big-pill "What best describes your building?" selector is the quote-flow entry point everywhere it makes sense.

**Strengths:**
- Industry-familiar pattern in the steel-building category — proven conversion path.
- Lower cognitive load than Mock A: one CTA color (Ember), one persistent bar, one quote modal everywhere.
- The left-rail guide nav makes the site feel authoritative and reference-quality.
- Engineering hygiene: shared CSS means a token edit reskins the whole site.

**Trade-offs vs Mock A:**
- Less surface area for individual product personality — every PDP looks similar by design.
- No traditional product-listing page (Clearance is reskinned as ready-to-ship kits, not SKUs).
- The Armstrong-style navy density can feel "industrial / utilitarian" to buyers expecting a more lifestyle / aspirational presentation. Mock A's bronze warmth softens that.

---

## 7. Brand assumptions & flags (running list)

I made the following assumptions in the absence of a brief — all should be reviewed:

- **Brand name:** "Bell Metal Buildings Co." (inferred from workspace folder; matches Mock A).
- **Voice & tone:** Direct, slightly blue-collar, anti-corporate. Lines like "real human picks up," "no phone tree," and "no asterisks" set the tone. Same voice register as Mock A so the client compares structure/visuals, not voice.
- **Geographic focus:** US lower 48 (50-state dotted list on Garages PDP), with AK/HI/Canada case-by-case.
- **Customer mix:** ~70% residential / 30% commercial-industrial assumed by copy density and tile order.
- **Pricing strategy:** "True Pricing" page commits Bell to a no-published-prices stance — same as Mock A. If Bell prefers to publish "starting at" prices, this page needs a rewrite or removal.
- **Warranty terms:** 50/40/25/20-year tiers, with a slightly shorter set for arch (Quonset) buildings. Industry-typical numbers; must be confirmed.
- **Clearance Inventory framing:** Bell offers a small set of pre-engineered ready-to-ship kits, not a SKU catalog. Confirm.
- **Service hours:** "Pacific–Eastern, six days a week." Placeholder.
- **Eight building categories:** Same eight as Mock A. Big-pill grid uses 8 + "Not sure" + "Custom" = 10 tiles.

---

## 8. Preview links (computer://)

- [Design System](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/01-design-system.html)
- [Homepage](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/02-homepage.html)
- [Building Types PLP](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/03-building-types.html)
- [Garages Detail PDP](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/04-garages-detail.html)
- [Clearance Inventory](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/05-clearance-inventory.html)
- [Options & Finishes](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/06-options-finishes.html)
- [About](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/07-about.html)
- [Contact](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/08-contact.html)
- [Blog Index](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/09-blog-index.html)
- [Blog Post](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/10-blog-post.html)
- [Testimonials](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/11-testimonials.html)
- [FAQ + Help Desk](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/12-faq-resources.html)
- [Warranty](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/13-warranty.html)
- [Privacy Policy](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/14-privacy.html)
- [True Pricing](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/15-true-pricing.html)
- [Our Advantage](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/16-our-advantage.html)
- [Resources Hub](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/17-resources-hub.html)
- [Video Library](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/18-video-library.html)
- [Brochures](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/19-brochure.html)
- [Shared CSS (tokens)](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-b/_shared.css)

---

*End of handoff.*
