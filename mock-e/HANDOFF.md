# Mock E — Job-Site Catalog · HANDOFF

Direction E shares the entire content architecture of mock-d (modeled on `https://www.probuiltsteel.com/`). It differs in **palette and typography only** — safety-yellow CTAs on concrete-gray paper with asphalt-black ink, signal red for alerts, condensed Oswald display + Roboto body. The "job site" read.

## Tokens

All tokens live in `_shared.css` `:root`. Use the variables — do not inline hex.

**Color**
- Asphalt: `--e-slate #111315`, `--e-slate-2 #1f2326`
- Paper: `--e-cream #e7e5e1` (concrete bg), `--e-cream-2 #d1cec6`, `--e-paper #ffffff`, `--e-rule #cfcbc0`
- Hazard (primary CTA): `--e-sun #fdc500`, `--e-sun-hover #e2af00`, `--e-sun-soft #fff0a8`, `--e-sun-ink #111315`
- Girder (secondary): `--e-sky #3d5a80`, `--e-sky-hover #2d4666`, `--e-sky-soft #e4ebf3`
- Accent: `--e-grass #3aa552`, `--e-flag #d62828` (signal red), `--e-gold #f0b500`
- Text: `--e-text #111315`, `--e-text-muted #55595f`, `--e-text-faint #80858b`

> Note: token NAMES are kept from mock-d (`--e-sun`, `--e-cream`, etc.) but their SEMANTIC values reflect the job-site palette. `--e-sun` is safety yellow #fdc500. `--e-cream` is concrete gray #e7e5e1. This keeps the file structure identical to mock-d so any future component changes can be ported by token alone.

**Type**
- Display: `--f-display: "Oswald"` (600/700, condensed — H1–H3 are **uppercase** with letter-spacing)
- Body: `--f-body: "Roboto"` (400/500/700)
- Scale identical to mock-d
- Tracking: `--tr-display: .01em`, `--tr-eyebrow: .2em`

**Spacing** identical to mock-d  
**Radius** sharper than mock-d — `--r-sm 2`, `--r-md 4`, `--r-lg 8`, `--r-xl 14`, `--r-pill 999`. Several components are forced to `border-radius: 0` in the mock-e override block at the bottom of `_shared.css` for the "industrial" read.  
**Shadow** identical structure to mock-d, heavier opacity to read on the concrete bg  
**Layout** identical containers

## Override block

The bottom of `mock-e/_shared.css` contains a `/* MOCK E HEADING OVERRIDE */` block that:
- Forces all headings to `text-transform: uppercase`
- Re-skins the brand mark, product-code badge, "Available now" flag, step counters, BBB badge, and trust icons with `border-radius: 0` for an industrial profile
- Re-points the eyebrow from sun to signal red on most pages (the hero keeps a sun-hover tone for contrast)

## Page list

Identical to mock-d — 30 files: `01-design-system`, `02-homepage`, `03-building-types`, `04-{type}-detail` × 16, `05`–`20`. Section structure, copy, and component markup are byte-for-byte the same except for the token prefix and the Google Fonts URL.

## What's stubbed / TODO

Same TODOs carry over from mock-d:
- Real photography (gradient placeholders today)
- 3D Designer integration on `20-builder.html`
- Legal copy on `13-warranty.html` and `14-privacy.html`
- 11 additional themed blog posts to fill out the index
- Photo carousel wiring on `.pcard-media` arrows

## Differentiation from mock-d

mock-d and mock-e are a **side-by-side palette comparison** on identical structure. Concept review focuses on:
- Sun-orange vs. hazard yellow as primary CTA color (warm-on-cream vs. high-contrast-on-concrete)
- Mulish/DM Sans (friendly sans pairing) vs. Oswald/Roboto (industrial condensed display)
- Soft rounded corners vs. sharper near-square edges
- Sky blue vs. girder steel-blue as secondary accent
- Flag red (#c0392b) vs. signal red (#d62828) used for "Available now" and alerts

## Verification

1. Open `02-homepage.html` — H1 is uppercase Oswald, primary CTA is hazard yellow, body bg is concrete gray.
2. Open `01-design-system.html` — every primitive picks up the new tokens correctly.
3. Resize to 390×844 — hamburger drawer + caret submenus still work (same `_nav.js` integration).
4. Visit `04-garages-detail.html` — 3-step roof selector switches via radio; FAQ expands.
5. Confirm contrast on yellow CTAs — always paired with `--e-sun-ink` (asphalt) for AA compliance. Never put yellow text on white.
