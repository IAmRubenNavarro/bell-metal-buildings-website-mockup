# Mock A — Handoff Document

**Client:** Bell Metal Buildings Co. *(working name — confirm with client before launch)*
**Mock direction:** A — closest in structure to reference site 1 (Toro Steel Buildings)
**Palette:** Charcoal + Bronze
**Status:** Visual/structural mocks ready for client review. Not production code.
**Date:** 2026-05-11

---

## 1. File list

All files live in `mock-a/`. Each is a self-contained HTML file with inline CSS and minimal JS — no build step required to preview.

| # | File | Lines | Purpose |
|---|---|---|---|
| 01 | `01-design-system.html` | 1,182 | Both palette options side-by-side, type scale, tokens, every component primitive. **Reference doc** — not a production page. |
| 02 | `02-homepage.html` | 1,291 | 16-section homepage. Primary conversion surface. |
| 03 | `03-building-types.html` | 532 | PLP equivalent. 10 alternating image/text rows + inline quote wizard. |
| 04 | `04-garages-detail.html` | 407 | Building-type detail page. Template for Quonset/Container/Barndominium/Workshop/Carport/Commercial variants. |
| 05 | `05-clearance-inventory.html` | 451 | Closest equivalent to a traditional PLP. 12 product cards with crossed-out MSRP, filter/sort controls, "Make an Offer" CTAs. |
| 06 | `06-options-finishes.html` | 198 | Accessories catalog with working before/after slider and grouped accessory cards (7 arch + 5 straight-wall). |
| 07 | `07-about.html` | 207 | Founder letter pattern + stats strip + quality certifications check-list. |
| 08 | `08-contact.html` | 196 | Two-column: contact info left, card-wrapped form right (with badges, country-code phone, captcha placeholder). |
| 09 | `09-blog-index.html` | 131 | 18 post cards in 3-up grid. |
| 10 | `10-blog-post.html` | 156 | Article template with embedded video at top and sticky sidebar warranty badge. |
| 11 | `11-testimonials.html` | 118 | 12-card static grid. |
| 12 | `12-faq-resources.html` | 156 | Long-form FAQ with working filter chips by category. |
| 13 | `13-warranty.html` | 135 | Two warranty profiles (straight-wall + arch), each split into material/workmanship and paint cards. |
| 14 | `14-privacy.html` | 134 | Long-form legal page with table of contents. **Placeholder content — requires legal review.** |
| 15 | `15-true-pricing.html` | 119 | Comparison table format. |
| 16 | `16-our-advantage.html` | 118 | Three alternating two-column sections with photo blocks. |
| 17 | `17-resources-hub.html` | 95 | Alternating row pattern reused from PLP, surfaces 5 sub-pages. |
| 18 | `18-video-library.html` | 114 | Featured-video + stacked secondary videos. |
| 19 | `19-brochure.html` | 127 | Lead-magnet page with 4 brochure cards + gated form. |
| — | `_shared.css` | 4 | Reference-only CSS variable index (not linked from any page). |

**Total: 19 pages, ~5,797 lines of HTML/CSS/JS.** Average page weight: ~310 lines (after the design system).

---

## 2. Design tokens

Final token values pulled from `01-design-system.html`. These are duplicated inline in each page; first task in production is to consolidate into a single `tokens.css`.

### Color

| Token | Value | Use |
|---|---|---|
| `--p-primary` | `#18181b` | Brand body — text on light surfaces, primary surfaces |
| `--p-primary-hover` | `#2a2a30` | Primary button hover |
| `--p-primary-ink` | `#ffffff` | Text on primary surfaces |
| `--p-accent` | `#b87333` | Bronze — headlines, CTAs, accents |
| `--p-accent-hover` | `#9a5e25` | Accent hover |
| `--p-accent-ink` | `#18181b` | Text on accent surfaces |
| `--p-surface` | `#ffffff` | Default page background |
| `--p-surface-alt` | `#f4f3f1` | Warm off-white panel |
| `--p-surface-deep` | `#14141a` | Trust band, footer, dark sections |
| `--p-rule` | `#ddd9d1` | Hairline borders |
| `--p-check` | `#b87333` | Orange-check feature list |
| `--p-promo` | `#6f2622` | Deep burgundy promo strip |
| `--p-promo-ink` | `#f8e9d6` | Promo strip text |
| `--gray-50…900` | `#f7f7f8 … #111114` | Neutral scale |
| `--danger` | `#b8302a` | Crossed-out MSRP, warnings |
| `--success` | `#2f8a4a` | "Save X%" pill, positive |

### Type

- **Display:** Oswald (500/600/700) — Google Fonts. Uppercase, 0.02em tracking.
- **Body:** Inter (400/500/600/700) — Google Fonts.
- **Scale:** `--t-display-1` 40–72px → `--t-display-2` 32–56px → `--t-h1` 28–44px → `--t-h2` 22–32px → `--t-h3` 20px → body 16px → small 14px → caption 12px.
- **Line height:** 1.05 (display), 1.25 (snug), 1.6 (body).

### Spacing (8px base)

`--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 · `--s-7` 48 · `--s-8` 64 · `--s-9` 96 · `--s-10` 128.

### Radius

`--r-sm` 4px (inputs, tags) · `--r-md` 8px (cards) · `--r-lg` 14px (large containers) · `--r-pill` 999px (buttons, chips).

### Shadow

`--shadow-sm` subtle · `--shadow-card` 0 2px 8px rgba(0,0,0,.06) · `--shadow-md` hover lift · `--shadow-lg` 0 12px 32px rgba(0,0,0,.18) (floating elements).

---

## 3. Page-by-page component breakdown

### Shared chrome (every page)
- **Promo strip** (red, full-width, dismissible in production)
- **Site header** (sticky, brand mark, primary nav with dropdown carets, language selector, phone-pill CTA, mobile menu toggle)
- **Site footer** (5-column on desktop, 2-col on mobile: brand + contact, Buildings, Options, Resources, Company)
- **Floating quote pill** (fixed bottom-center, fades in past 320px scroll on homepage)
- **Wizard band** (5-question quote wizard — appears on home, PLP, garages, options, about)

### Per-page distinctive components

- **Homepage:** full-bleed hero with diagonal cut, trust band with stats counter, horizontal scroll testimonial carousel with prev/next, 8-card photo-overlay building-type grid, 3D Designer video promo, monochrome customer-logo strip, 9-tile industries grid, 3-card blog row, 3-pillar confidence section, split photo+text with orange-check, 11-item FAQ accordion, two-card locations grid with state pills.
- **Building Types PLP:** 10 alternating image-with-arrows + text rows with tag chips and Learn More CTA, full inline wizard.
- **Garages detail:** hero, two-col "why steel," dark navy pull-quote testimonial card with serif italic quote, multiple body sections, three-subhead "advantages" pattern, two-card style mini-grid (Straight-wall vs Quonset), 11-item FAQ accordion, closing CTA on bronze gradient, wizard.
- **Clearance Inventory:** yellow notice banner, filter/sort controls bar (category, size, sort), 12 product cards with crossed-out price, save-percentage pill, in-stock badge, triple CTA stack (View Drawing / Make Offer / Call), pagination.
- **Options & Finishes:** working draggable before/after slider, two banded accessory sections (Arch on blue-slate, Straight-wall on charcoal), 7-card and 5-card grids.
- **About:** founder-letter card with circular portrait + signed letter pattern, 5-block Bell Difference grid, 4-counter stats strip on primary, certifications check-list.
- **Contact:** two-column layout — left contact info with icon rows + social row + helper card, right white form card with badges row, type-of-inquiry select, country-code phone, full address fields, reCAPTCHA placeholder.
- **Blog Index:** 18 post cards, category tag, date, excerpt with line-clamp.
- **Blog Post:** taller centered hero, embedded video frame at top, two-column body+sidebar with sticky bronze warranty seal, share row at bottom.
- **Testimonials:** 12-card static grid with completed-building photo, building-type badge, location, project title, star strip, italicized quote.
- **FAQ Resources:** working category filter chips that hide/show accordion rows.
- **Warranty:** two-card split per warranty profile (material/workmanship + paint), with sub-text under each check item.
- **Privacy:** sticky TOC + section anchors with H2 dividers.
- **True Pricing:** detailed comparison table with green ✓ / red bad columns.
- **Our Advantage:** three alternating two-col sections with photo blocks and check-list inside.
- **Resources Hub:** alternating row pattern (lifted from PLP).
- **Video Library:** large featured-video + stacked secondary video items with metadata.
- **Brochure:** 4-card brochure cover grid (kicker + title overlaid on cover gradient) + gated mailing-list form.

### Working interactive elements

- FAQ accordions (rotate-on-open + max-height transition + keyboard accessible)
- Testimonial carousel arrows (scrollBy with smooth behavior)
- Wizard option pills (active-state toggle)
- Filter chips on FAQ resources page (data-cat attribute toggles visibility)
- Floating-pill fade-in on scroll (homepage only)
- Before/after compare slider (drag handle, mouse + touch)

---

## 4. Tech-stack recommendation for production build

### Frontend
- **Next.js 14 (App Router)** for SSR + ISR. Excellent SEO story for a lead-gen site, good Vercel/Netlify deploy paths, easy to add image optimization (`<Image>`).
- **Tailwind CSS** — convert the current token-based vanilla CSS into Tailwind's `theme.extend.colors / fontFamily / spacing` so every token in §2 becomes a utility class.
- **React Hook Form + Zod** — for the quote wizard, contact form, and brochure gating. Built-in validation, accessible.
- **Framer Motion** — for the floating quote pill fade, accordion expand, before/after slider, and any future micro-interactions.
- **Sanity or Contentful** as a headless CMS — Bell will want to update blog posts, building-type copy, testimonials, clearance inventory, FAQs, and the promo strip without redeploying.

### Backend / integrations
- **CRM:** HubSpot or Salesforce — wizard and contact form post here. Critical that the project-manager-stays-with-you promise has CRM enforcement.
- **Email:** SendGrid or Postmark — transactional (form receipt) + marketing (brochure follow-ups).
- **Analytics:** GA4 + a heatmap tool (Hotjar/Microsoft Clarity) — homepage is high-traffic conversion surface, needs scroll-depth and click tracking on every CTA.
- **Reviews integration:** Google reviews API + BBB badge — both are placeholders right now.

### Hosting / DevOps
- **Vercel** for the front-end. Connect to a CDN-fronted Sanity backend.
- **Cloudflare** in front for DDoS + image cache.
- **Sentry** for client-side error monitoring.

### Out of scope for production hookup
- The "Make an Offer" flow on clearance cards is a marketing label — not a real offer engine. Could later integrate with a simple CRM webhook or a custom counter-offer micro-app.
- The 3D Builder is referenced in two places (hero CTA, homepage promo section) but is not built. Likely a separate React/Three.js app embedded in an iframe; budget accordingly.

---

## 5. Open TODOs (what the client must supply)

Every TODO chip in the mocks corresponds to a client decision or asset. Sorted by priority.

### Blocking (cannot launch without)
1. **Legal entity name** for footer copyright, privacy policy, warranty document.
2. **Real logo** — currently a single-letter "B" glyph. We need an actual mark.
3. **Phone numbers, email addresses, mailing address** — currently dummy values throughout footer, header, contact page.
4. **Privacy policy** — placeholder structure only. Must be drafted/reviewed by counsel before launch.
5. **Warranty terms** — placeholder durations (50/40/25 year) modeled on industry norms. Must be confirmed by Bell's actual warranty document.
6. **Product catalog confirmation** — we used 8 industry-standard building categories (Garages, Workshops, Barndominiums, Quonset, Carports, Container Covers, Commercial, Storage). Confirm Bell actually offers each.

### High priority (visual quality / trust)
7. **Photography** — every photo is currently a CSS gradient placeholder. Production needs a real photo library: hero shots, building-type category photos (8), 9 industry photos, 12 testimonial photos with completed-building shots, garages detail multi-photo carousel, clearance product renderings (12), team/factory photos for About, before/after photos for Options page.
8. **Tagline** — "Built once. Stands for generations." is invented as a placeholder.
9. **Stats numbers** — "40+ years," "65k+ buildings," "4.9★ Google" are placeholder claims; substitute Bell's real numbers (or remove if they're not yet defensible).
10. **Customer logo strip** — six placeholder organization names. Must be replaced with real Bell customers (with their permission) or removed.
11. **Real testimonial copy** — every testimonial currently has [TODO] customer attribution. Need real names + permissions or rotated mock that's clearly disclosed.
12. **Founder letter** — currently signed [TODO: name]. Need the real CEO/founder name, portrait photo, and approved letter copy.

### Medium priority (operational)
13. **Promo strip offer** — placeholder "Clearance Event — Save up to 40%." Confirm actual promotion mechanics.
14. **Clearance pricing** — all dollar values are placeholders.
15. **Color palette of paint finishes** — referenced as "14 standard colors with 40-year paint warranty." Need actual color names and SKUs.
16. **Video assets** — Designer 3D promo, blog-post embed, video-library featured + 5 stacked videos. All placeholders.
17. **Brochures** — 4 brochure PDFs referenced (Catalog, Doors/Windows, Color Chart, Warranty). All placeholders.
18. **Certifications confirmation** — About page lists CAN/CSA-A660, AWS D1.1, UL, FM, AISC, IBC. Confirm Bell actually holds each.
19. **Service map** — currently shows broad US state coverage. Confirm Bell's true service map (states + special-case AK/HI/Canada).
20. **R&D talking points** — About page mentions "lighter alloys, smarter coatings, engineering software" but is placeholder.
21. **CRM provider** — wizard and contact form need to be wired up. Decision blocking the engineering team.
22. **Financing partners** — homepage FAQ mentions RTO and term financing.
23. **Consent text & cookie policy** — form copy is placeholder.
24. **Domain** — `bellmetal.example` is a placeholder.

### Low priority (nice-to-have)
25. Language selector in header has EN/ES/FR — confirm Bell actually wants multi-language (and translation budget).
26. Social handles — currently placeholder; confirm which platforms.
27. Sister-company link from Contact page — site 1 had one ("Future Buildings"); Bell does not, so I've omitted. Confirm.

### Code cleanup (engineering)
28. **Design-system TODO class mismatch:** the design system file uses `.ds-todo`; every other page uses `.todo`. Production should standardize on one (recommend `.todo`).
29. **CSS duplication:** every page re-declares the same `:root` token block. Consolidate into a shared `tokens.css` first.
30. **Promo strip dismiss** — currently always shows. Production should support a "close" button + cookie-based persistence.

---

## 6. Differentiation vs other mocks (for client conversations)

Mock A leans into the **site-1 (Toro Steel Buildings) pattern** — heavy reliance on a sitewide multi-step quote wizard, a floating quote pill on every page, a persistent clearance promo strip, alternating image/text PLP, building-types-as-products model, dark trust band with bronze stat counters, orange-check feature lists, dramatic full-bleed hero with diagonal cut, and a clearance inventory that stands in for a traditional PLP.

**Strengths:** Familiar pattern in the steel-building category, proven conversion path, lots of trust-building touch points, easy for the client team to maintain because every section is well-defined.

**Trade-offs:** Visually dense; some users may find it busy. Mock B (site-2 pattern) and Mock C (hybrid) will offer cleaner, lighter alternatives.

---

## 7. Brand assumptions & flags (running list)

I made the following assumptions in the absence of a brief — all should be reviewed:

- **Brand name:** "Bell Metal Buildings Co." (inferred from workspace folder name `bell_metal_buildings_full_website_mock_up`).
- **Voice & tone:** Direct, slightly blue-collar, anti-corporate. Lines like "no asterisks" and "real human picks up" set the tone. Verify this matches Bell's actual brand voice.
- **Geographic focus:** US lower 48 with case-by-case AK/HI/Canada. No Canadian-French language support implied beyond the EN/ES/FR placeholder selector.
- **Customer mix:** ~70% residential (garages, workshops, barndominiums) / ~30% commercial-industrial split assumed in copy density. Adjust if commercial is higher-priority.
- **Pricing strategy:** "True Pricing" page commits Bell to a no-published-prices stance. If Bell prefers to publish "starting at" prices, this page needs a rewrite or removal.
- **Warranty terms:** 50-year rust perforation, 40-year paint, 25-year painted accessories — these are industry-typical numbers but must be confirmed against Bell's actual warranty document.

---

## 8. Preview links (computer://)

- [Design System](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/01-design-system.html)
- [Homepage](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/02-homepage.html)
- [Building Types PLP](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/03-building-types.html)
- [Garages Detail](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/04-garages-detail.html)
- [Clearance Inventory](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/05-clearance-inventory.html)
- [Options & Finishes](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/06-options-finishes.html)
- [About](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/07-about.html)
- [Contact](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/08-contact.html)
- [Blog Index](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/09-blog-index.html)
- [Blog Post](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/10-blog-post.html)
- [Testimonials](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/11-testimonials.html)
- [FAQ Resources](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/12-faq-resources.html)
- [Warranty](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/13-warranty.html)
- [Privacy Policy](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/14-privacy.html)
- [True Pricing](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/15-true-pricing.html)
- [Our Advantage](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/16-our-advantage.html)
- [Resources Hub](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/17-resources-hub.html)
- [Video Library](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/18-video-library.html)
- [Brochures](computer://C:\Workspaces\bell_metal_buildings_full_website_mock_up/mock-a/19-brochure.html)

---

*End of handoff.*
