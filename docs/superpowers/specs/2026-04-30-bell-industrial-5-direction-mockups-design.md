# Bell Metal Buildings — Five Design Directions for Home Page Mockups

**Date:** 2026-04-30
**Status:** Approved design, ready for implementation planning
**Project workspace:** `C:\Workspaces\bell_industrial_website_mockup`

## Overview

This spec defines five visually distinct home-page mockups for Bell Metal Buildings, a Florida-west-coast metal buildings company. The purpose is to present the client with five meaningfully different design directions and let them pick a winner; the chosen direction will be expanded into a full multi-page site in a separate follow-up project.

**Project shape:** one client, one site, five visual directions, one home page per direction.

**Reference site provided by the client:** [https://torosteelbuildings.com/](https://torosteelbuildings.com/) — anchors Direction 1 (Toro homage); the remaining four directions explore meaningfully different aesthetic angles informed by industry research.

**Industry focus:** metal buildings only (pre-engineered steel structures for agricultural, commercial, and residential use). Note that the prior project at this same workspace covered both industrial construction and metal buildings as separate divisions; this project narrows to metal buildings only and uses fresh content/positioning (clean-slate approach).

**Total deliverable:** 6 production HTML files (1 index landing page + 5 direction home pages) in self-contained format with no build step.

## Project Decisions

| Decision | Outcome |
|---|---|
| Project shape | 5 home pages now; depth follow-up on the winning direction is a separate future project |
| Client | Bell Metal Buildings (clean-slate content, prior project's content not reused) |
| Industry focus | Metal buildings, Florida west coast regional flavor |
| Reference site | Toro Steel Buildings (anchor for Direction 1 only) |
| 5 directions | Toro homage (elevated) · Editorial Agricultural · Industrial Technical · Warm Heritage · Configurator-First |
| Section list per home page | Hero · Building Types · Process · Social Proof · Configurator entry · Quote CTA · Footer (Direction 5 restructures around its configurator) |
| Content origin | Plausible placeholder content, informed by Florida west coast regional research |
| Direction 5 configurator scope | Functional client-side state with SVG dimensional preview; no real backend, no pricing engine |
| Project structure | Self-contained per file, no build, no shared CSS/JS |
| Tech stack | Vanilla HTML5, CSS3, ES2020+ JavaScript inline per file. Google Fonts CDN. Unsplash/Pexels image URLs. |

**Brand-name caveat:** The company name is "Bell Metal Buildings" per the project decision, although "Industrial Construction" in the name reads more like general contracting than metal-buildings-specifically. This is flagged for the client to potentially revisit during the depth phase as a separate brand decision; not a blocker for mockup work.

## Architecture & File Structure

```
bell_industrial_website_mockup/
├── index.html                  # Landing page — links to all 5 directions
├── toro/
│   └── home.html               # Direction 1: Toro homage (elevated)
├── editorial/
│   └── home.html               # Direction 2: Editorial Agricultural
├── technical/
│   └── home.html               # Direction 3: Industrial Technical / Spec-Sheet
├── heritage/
│   └── home.html               # Direction 4: Warm Heritage / American Made
├── configurator/
│   └── home.html               # Direction 5: Configurator-First
└── docs/
    └── superpowers/
        ├── specs/
        │   └── 2026-04-30-bell-industrial-5-direction-mockups-design.md
        └── plans/
            └── (populated by writing-plans skill)
```

**Total production files:** 6 HTML files plus this spec.

### File contents pattern (all 5 direction files)

- One self-contained HTML5 document
- Inline `<style>` block carrying all CSS for that direction (no external stylesheets except Google Fonts)
- Inline `<script>` block for direction-specific JavaScript (scroll reveals, accordions, configurator state)
- External Google Fonts CDN link in `<head>` (per-direction font set)
- External Unsplash/Pexels image URLs in `src` attributes (no local image files)
- No shared CSS, no shared JS, no module imports across direction files

### Why no shared layer

Each direction is a visual experiment. Sharing CSS would create accidental coupling where a tweak to `editorial/home.html` visibly mutates `heritage/home.html`. Self-containment is the correct primitive for "client-pick-one-of-five" mockups even though it duplicates roughly 30 lines of reset/base styles per direction. The cost is small; the isolation guarantee is valuable.

The folder-per-direction structure (vs. flat `1-toro.html`, `2-editorial.html`) supports the depth phase: when the winning direction expands to multiple pages, the existing folder accommodates `services.html`, `about.html`, etc. without restructuring.

## The Five Directions

Each of the first four directions hits the same seven content sections in the same order; only the visual treatment varies. Direction 5 restructures its layout around the configurator.

### Quick comparison

| # | Name | Palette anchor | Type pairing | Photo treatment |
|---|---|---|---|---|
| 1 | Toro homage (elevated) | Deep navy + safety red | Manrope + Inter | Cool-graded real installs, unified |
| 2 | Editorial Agricultural | Bone white + barn green + terracotta | Fraunces + Inter | Editorial photo-as-art, golden hour |
| 3 | Industrial Technical | Off-white + blueprint blue + signal yellow | Space Grotesk + Inter + JetBrains Mono | Dimensioned product photography |
| 4 | Warm Heritage | Cream + oxblood + forest + brass | Roboto Slab + Lora | Story-driven, portrait integration, warm grade |
| 5 | Configurator-First | Light neutrals + industrial teal | Inter (single family) + JetBrains Mono | Minimal — SVG configurator IS the visual |

### Direction 1 — Toro homage (elevated)

**Buyer persona:** National price-shopper.
**Concept:** Toro's confidence and conversion architecture, elevated above WordPress-tier polish.

**Palette:**

- Deep navy `#0A1F3D` — hero, footer, sticky nav
- Safety red `#D8362F` — CTAs, accent strokes
- Charcoal `#2A2A2A` — alternate sections
- White `#FFFFFF` — primary background
- Cool gray `#E8EAEE` — subtle dividers

**Typography:** Manrope display at 700–800 weight with tight tracking on heads. Inter body regular/medium.

**Photography:** Real-install photography with a uniform cool-blue color grade for gallery cohesion (vs. Toro's mixed-grade library). Three-quarter angle hero shots, flattering golden-hour or overcast light.

**Key visual moves:**

- Persistent navy header with phone always visible (Toro pattern, modernized)
- Hero: dark navy panel with single large building photo, headline overlaid lower-left in heavy Manrope, red CTA button
- Building Types: 3×2 grid of photo cards; hover lifts card and draws a red bottom-border in
- Process: oversized cool-gray numbers with red accent on the current step
- Configurator entry: looks like a real form preview with red "Configure & Get Quote" button
- Full-width red Quote CTA strip before footer

**What makes it "elevated" vs. literal Toro:** unified photo grading, modern type, single-column hero (no slider), AA contrast handled with darkening overlays, no trust-badge soup.

### Direction 2 — Editorial Agricultural

**Buyer persona:** Agricultural buyer (cattle ranchers in Hardee, hay producers in DeSoto, equestrian owners adjacent to Marion County).
**Concept:** *Modern Farmer* cover story applied to a steel buildings site.

**Palette:**

- Bone white `#F4EFE6` — primary background
- Barn green `#2E3D2A` — sections, headings
- Terracotta `#B45A3C` — accents, links, ornamental rules
- Charcoal ink `#1A1A1A` — body text

**Typography:** Fraunces display (high-contrast modern serif, italics used sparingly for editorial moments). Inter body at generous line-height (1.7+).

**Photography:** Editorial, photo-led, large crops. Real Florida agricultural context (cattle barns at golden hour, citrus groves, equestrian properties). Naturalistic warm grade. Wide aspect ratios with generous margins. Photos function as art, not decoration.

**Key visual moves:**

- Hero: full-bleed wide photo (cattle barn, golden hour) with bone-white text panel offset right, headline in Fraunces italic ("Built for the work, built for the weather"), thin terracotta underline
- Building Types: vertically stacked editorial spreads — each type gets a half-page treatment with photo + serif heading + body paragraph (no grid)
- Process: numbered in italic Fraunces with green rules, prose-style descriptions (not bullets)
- Social proof: pull-quote treatment with large Fraunces italic quote + attribution in small Inter caps
- Quote CTA: full-width barn-green panel with bone-white serif heading and terracotta accent

**Why it works for this buyer:** Agricultural buyers respond to imagery that respects the rural context rather than treating their barn as a commodity. Editorial pacing also signals "this company isn't just a sales funnel" — useful for slower-cycle agricultural decisions.

### Direction 3 — Industrial Technical / Spec-Sheet

**Buyer persona:** Engineer, specifier, commercial procurement officer.
**Concept:** Engineering catalog — Vitsoe meets Caterpillar.

**Palette:**

- Off-white paper `#F2F2EE` — primary background
- Blueprint blue `#1B2B4A` — sections, headings, structural elements
- Signal yellow `#F5C518` — CTAs and action moments only (used sparingly)
- Near-black ink `#101010` — body text

**Typography:** Space Grotesk display at 600–700 weight (geometric, slight industrial character). Inter body for prose. JetBrains Mono for spec tables, dimensions, technical callouts.

**Photography:** Three-quarter dimensional product photography. Buildings shot like industrial products with annotated dimensional callouts overlaid in mono ("60' SPAN × 100' LENGTH × 18' EAVE"). Mix of clean studio-style compositions and real install context.

**Key visual moves:**

- Hero: split layout — left 50% off-white with engineering heading "ENGINEERED. SEALED. INSTALLED." in Space Grotesk, right 50% building photo with dimensional callouts overlaid
- Building Types: 3×2 grid where each card has photo + mono spec line ("40×60 · 14' EAVE · 4:12 PITCH · 150 mph") + brief description
- Process: 4 numbered steps as horizontal flow with engineering icons (ruler, pencil, truck, wrench), connecting blueprint-blue rule
- Social proof: testimonial as a "spec card" with project type tag and dimensions
- Configurator entry: cross between a quote form and an engineering input panel — mono labels, signal-yellow "GENERATE QUOTE" button
- Footer: paper background, mono certifications/license info, blueprint-blue type

**Why it works for this buyer:** Procurement officers and engineers respond to perceived rigor. Dimensional callouts and mono data treatment signal "these people know structures, not just selling them."

### Direction 4 — Warm Heritage / American Made

**Buyer persona:** Heritage small-business — the rancher in Polk County who's been farming for forty years, the second-generation contractor in Hillsborough.
**Concept:** Filson catalog meets Yeti brand.

**Palette:**

- Cream `#EDE6D6` — primary background
- Oxblood `#7A2A1F` — headings, accents, depth
- Forest green `#2F4A2E` — alternate sections, secondary accent
- Brass `#A88752` — ornamental rules, badges, dividers

**Typography:** Roboto Slab display at 700–900 weight (sturdy slab, stamped feel). Lora body (warm old-style serif, readable, slightly old-school).

**Photography:** Story-driven, warm. Real installs plus portrait elements — the rancher next to his building, the family with their workshop. Warm color grade with slight film-grain feel. Mix of building photos and lifestyle context.

**Key visual moves:**

- Hero: cream background with thick oxblood border-left, brass heritage badge ("Built In Florida Since 2006"), slab-serif headline ("Steel buildings the South still trusts")
- Building Types: catalog-style cards with cream background, oxblood slab headings, forest-green ornamental rules
- Process: numbered in heavy slab-serif circles, brass connecting line, narrative paragraphs (not bullets)
- Social proof: testimonial with portrait photo (Wade T. with his Hardee County hay barn, see Content Plan), oxblood pull-quote
- Quote CTA: forest-green panel with cream slab heading and brass accent
- Footer: oxblood with cream type, brass divider lines, NFBA association badge

**Why it works for this buyer:** For buyers who would rather call than fill out a form, "American made, built to outlast me" beats "lowest price per square foot." Differentiates from national price-warrior competitors.

### Direction 5 — Configurator-First

**Buyer persona:** Digital-native commercial buyer — developers building mini-storage, contractors who comparison-shop online, general contractors who want a real spec before a sales call.
**Concept:** The site IS the configurator — Tesla's product builder applied to metal buildings.

**Palette:**

- Off-white `#F8F9FA` — page background
- Soft gray `#E9ECEF` — panel surfaces
- Mid gray `#6C757D` — secondary text, dimension labels
- Near-black `#0A0A0A` — primary text
- Industrial teal `#1098AD` — single accent (CTAs, active states, brand color)

**Typography:** Inter single family for all UI (display + body weight variants). JetBrains Mono for dimensional readouts in the SVG preview and configurator labels.

**Photography:** Minimal — the configurator IS the visual. SVG dimensional preview is the hero. Real photography only appears in the small social-proof strip below the configurator.

**Page restructure (Direction 5 does not follow the 7-section list literally):** see "Direction 5 Deep Dive" section below.

**Why it works for this buyer:** Toro's biggest visible weakness is a fake configurator (a multi-step contact form labeled "configurator"). Including Direction 5 in the lineup forces a "what if ours were real?" conversation with the client. Even if Direction 5 isn't the final pick, the conversation it triggers is high-leverage.

## Section-by-Section Content Plan

**Operating principle:** same facts, different voice. All five directions present identical company facts (1,400+ buildings since 2006, 14 counties served, 140–170 mph FBC engineering, Lakeland HQ). The wording, photography, and arrangement vary to express each direction's concept.

### Section 1 of 7 — Hero

Universal: sticky header with persistent phone, single hero visual, headline, subhead, primary CTA.

| # | Headline | Subhead | CTA |
|---|---|---|---|
| 1 Toro | Florida-Engineered Steel Buildings, Delivered. | 1,400+ buildings across 14 counties since 2006. Engineered to FBC, sealed by Florida-licensed engineers, installed by our crews. | Get a Quote |
| 2 Editorial | Built for the work, built for the weather. | Twenty years raising steel across Florida's west coast — barns that outlast hurricanes, shops that outlast fashions. | Start a project |
| 3 Technical | ENGINEERED. SEALED. INSTALLED. | Site-specific engineered drawings · Florida-licensed seal · 140–170 mph wind-load engineered · Galvalume AZ55 standard. | Generate Quote |
| 4 Heritage | Steel buildings the South still trusts. | Lakeland to the coast, Citrus to Collier — three install crews, twenty years, fourteen hundred buildings, one phone number. | Tell us about your build |
| 5 Configurator | Configure your steel building. See it. Price it. | Pick your use, set the dimensions, see the building. Florida-engineered to your county's wind zone. | (Inline configurator below — no separate CTA) |

**Hero visual selection:**

- Direction 1: dramatic three-quarter exterior of a contractor warehouse at golden hour
- Direction 2: wide cattle barn at golden hour, golden grade
- Direction 3: building with overlaid mono dimensional callouts; clean composition
- Direction 4: rancher with their barn (portrait integration), warm grade
- Direction 5: no photo — SVG configurator IS the visual

### Section 2 of 7 — Building Types Grid

Universal: 6 categories. Each card carries photo + name + spec line + starter price + 1-line description. Arrangement varies (3×2 grid for Directions 1/3/5, vertical editorial spreads for Direction 2, catalog cards for Direction 4).

| Category | Spec line | Starter price | Description |
|---|---|---|---|
| Cattle & Equipment Barns | 40×60 · 14' eave · open or enclosed | from $28,000 | Built for the equipment, the hay, the herd. |
| Equestrian Barns & Arenas | 36×60 center-aisle · arenas to 80×200 | from $58,000 | Center-aisle stalls, run-in sheds, riding arenas. |
| Commercial Warehouses | 60×100 clear-span · office buildouts | from $95,000 | I-75 corridor warehouses, contractor yards, light manufacturing. |
| Mini-Storage | 30×100 modules · multi-bay configurations | from $48,000 | Engineered for HOA approval and county permitting. |
| RV & Boat Storage | 30×40 · 14' eave · coastal-rated coatings | from $32,000 | Marine-grade fasteners, salt-air-rated panels for coastal installs. |
| Workshops & Garages | 30×40 detached · pole or clear-span | from $26,000 | Hobby-farm workshops, detached garages, enclosed RV covers. |

All cards display the disclaimer footnote: *"Pricing varies by site, wind exposure, and finish package. Sealed engineered drawings included with every quote."*

### Section 3 of 7 — Process Steps

Universal: 4 steps in order. Same copy across directions; visual treatment varies.

| # | Step | Body |
|---|---|---|
| 1 | Quote | Tell us your use, dimensions, and county. We return a sealed engineering quote within 5 business days. |
| 2 | Design | Florida-licensed engineers seal site-specific drawings. We handle the FBC permit package. |
| 3 | Deliver | Pre-fabricated steel arrives on a single truck. Galvalume AZ55 panels standard, marine-grade fasteners on coastal jobs. |
| 4 | Install | Our Lakeland, Sarasota, and Fort Myers crews install on schedule. Most builds raise in 5–14 days. |

Per-direction treatment:

- Direction 1: numbered horizontal flow, oversized cool-gray numerals, red active accent
- Direction 2: numbered in italic Fraunces with green rules, prose paragraphs
- Direction 3: 4 horizontal step icons (ruler/pencil/truck/wrench), blueprint-blue connecting rule
- Direction 4: heavy slab-serif numbered circles, brass connecting line, narrative paragraphs
- Direction 5: tight horizontal banner with simple step labels (compressed)

### Section 4 of 7 — Social Proof

Universal credibility strip (identical across directions):

> 1,400+ buildings · Since 2006 · 14 counties served · FBC-engineered · Florida-licensed seals included

Anchor testimonial — selected per direction to match its buyer persona:

| # | Anchor | Context |
|---|---|---|
| 1 Toro | Mike D., site-work contractor, Polk County | "My contractor yard outgrew me twice. Started with a 50×80 in 2014. They built me a 100×200 in 2021 and connected the two. Same crew lead both times." |
| 2 Editorial | Rebecca H., boarding facility owner, Marion County | "I interviewed four companies. They were the only ones who walked the property, asked about prevailing wind, and came back with a sealed drawing for my exact site — not a catalog page." |
| 3 Technical | Mike D., site-work contractor, Polk County (same as Direction 1) | (same quote) |
| 4 Heritage | Wade T., cattle/hay producer, Hardee County | "Our 60×120 hay barn went up in nine days and made it through Idalia without a scratched panel. The crew knew what we needed before we finished explaining it." |
| 5 Configurator | Linda M., RV park owner, Sarasota County | "We needed covered storage built and inspected before snowbirds rolled in. Bell Metal Buildings pulled the Sarasota County permit, finished the slab and the steel in seven weeks, and we filled it the week it opened." |

### Section 5 of 7 — Configurator Entry

For Directions 1–4: a teaser CTA panel hinting at the configurator (which would be a separate page in the depth phase; in mockups it is non-functional except for Direction 5).

> **Headline:** Build it on-screen first.
> **Body:** Set your dimensions, pick your use, see the building, and get an instant size estimate before you pick up the phone.
> **CTA:** Open the configurator →

Treatment varies (split-panel with mock screenshot for Direction 1; modest framed panel with terracotta accent for Direction 2; engineering-input panel mockup with signal-yellow CTA for Direction 3; "Tell us about your project" framing with oxblood CTA for Direction 4).

For Direction 5: this section is replaced — the configurator IS the hero at the top of the page. No separate entry needed.

### Section 6 of 7 — Quote CTA

Universal form (visual mock, non-functional submit):

| Field | Type | Notes |
|---|---|---|
| Name | text | required |
| Phone | tel | required |
| ZIP | text | feeds wind-zone hint in Direction 5 |
| Use case | dropdown | Cattle/Hay · Equestrian · Commercial · Mini-Storage · RV/Boat · Workshop · Other |
| Approximate dimensions | text | placeholder "60×100×16" |
| Project description | textarea | optional |
| Submit | button | shows inline confirmation on submit |

| # | Headline | Body |
|---|---|---|
| 1 Toro | Ready to build? | Tell us your county, use, and approximate dimensions. Sealed engineering quote within 5 business days. |
| 2 Editorial | Tell us about the project. | We'd rather understand it first. Quotes are sealed by Florida-licensed engineers and returned within five business days. |
| 3 Technical | REQUEST QUOTE. | Use case · dimensions · ZIP. We respond with sealed drawings and a price within 5 business days. |
| 4 Heritage | Let's get started. | A real conversation, then a real quote. Sealed engineering drawings included with every estimate. |
| 5 Configurator | (Integrated into configurator panel) | "Get my quote" button surfaces a confirmation panel summarizing the user's selections. |

On submit (all directions): `event.preventDefault()`, display inline confirmation: *"Thanks. Bell Metal Buildings will return a sealed engineering quote within 5 business days."*

### Section 7 of 7 — Footer

Universal data block:

| Field | Value |
|---|---|
| Company name | Bell Metal Buildings |
| Address | 4820 US Highway 92 East, Lakeland, FL 33801 |
| Phone | (863) 555-0142 |
| Hours | Mon–Fri 7am–6pm |
| Email | build@bellmetalbuildings.com |
| Service area | Citrus · Hernando · Pasco · Pinellas · Hillsborough · Polk · Manatee · Sarasota · Hardee · DeSoto · Charlotte · Lee · Collier · Hendry |
| Trust line | Florida GC License # CGC-XXXXXX · Member NFBA · BBB A+ Rated · Florida Product Approved Components |
| Copyright | © 2026 Bell Metal Buildings |

Per-direction taglines:

- Direction 1: *Florida-Engineered Steel Buildings*
- Direction 2: *Steel buildings, raised by hand, sealed by Florida engineers.*
- Direction 3: *ENGINEERED · SEALED · INSTALLED · 2006*
- Direction 4: *Built In Florida Since 2006*
- Direction 5: *Configure. Engineer. Build.*

## Direction 5 Deep Dive — Configurator-First

### Anatomy

```
Sticky header — logo · phone · "Configure" · "Quote" · "Call"
─────────────────────────────────────────────────────
Configurator dominates hero (top 70vh):
   Left 40%: input panel
   Right 60%: SVG dimensional preview
─────────────────────────────────────────────────────
Trust strip: "1,400+ buildings · FBC engineered · sealed"
─────────────────────────────────────────────────────
6 use-case quick-click cards (pre-fill the configurator)
─────────────────────────────────────────────────────
Process (4 horizontal step icons, compressed)
─────────────────────────────────────────────────────
Single anchor testimonial (Linda M., Sarasota County)
─────────────────────────────────────────────────────
Footer (minimal contact + service area)
```

### Input model

| Input | Type | Range | Default | Behavior |
|---|---|---|---|---|
| `useCase` | `<select>` dropdown | 6 options | `cattle` | On change, overwrites width/length/eave with that use's defaults |
| `width` | `<input type="range">` | 20–100 ft, step 5 | 60 | Live label updates on `input` event |
| `length` | `<input type="range">` | 20–300 ft, step 10 | 100 | Live label updates on `input` event |
| `eaveHeight` | `<input type="range">` | 8–24 ft, step 1 | 16 | Live label updates on `input` event |
| `zip` | `<input type="text" inputmode="numeric" maxlength="5">` | 5-digit | empty | Triggers wind-zone lookup on `change` |

### Use-case defaults

| Use case | Default W × L × Eave | Pitch | Category badge |
|---|---|---|---|
| Cattle / Hay Barn | 60 × 100 × 16 | 4:12 | Agricultural |
| Equestrian | 36 × 60 × 14 | 4:12 | Agricultural |
| Commercial Warehouse | 60 × 100 × 18 | 1:12 | Commercial |
| Mini-Storage | 30 × 100 × 10 | 1:12 | Commercial |
| RV / Boat Storage | 30 × 40 × 14 | 3:12 | Residential |
| Workshop / Garage | 30 × 40 × 12 | 3:12 | Residential |

Picking a use case from the dropdown or a quick-click card resets width/length/eave to that use's defaults. After selection, the user can adjust the sliders manually.

### Derived state (computed at every render)

| Derived value | Computation |
|---|---|
| `totalSqft` | `width × length` |
| `dimensionLabel` | `${width}' × ${length}' × ${eaveHeight}'` |
| `pitch` | `useCaseDefaults[useCase].pitch` |
| `categoryBadge` | `useCaseDefaults[useCase].category` |
| `windZone` | `lookupWindZone(zip)` (see below) |
| `ridgeHeight` | `eaveHeight + (width / 2) × (pitch_rise / 12)` (positions roof apex in SVG) |

No price calculation. Static disclaimer reads: *"Pricing varies by site, wind exposure, and finish. Get a sealed engineering quote →"*

### Wind-zone lookup

Client-side first-3-digits-of-ZIP table mapping the 14-county service area to one of three wind zones. Approximate values from regional research; flagged for live FBC verification before any real publish (see Appendix A).

| ZIP prefix | Region | Wind zone displayed |
|---|---|---|
| 333, 334 | Tampa Bay coastal | 160 mph (Exposure C) |
| 335, 336, 337 | Tampa Bay area / inland | 150 mph |
| 338 | Polk / Hardee inland | 140–150 mph |
| 339 (lower range), 341, 342 | Sarasota / Charlotte / Lee / Collier coastal | 160–170 mph (Exposure C–D) |
| 343, 344, 346 | Hernando / Citrus / coastal Pasco | 150–160 mph |
| 349 | Inland southern (Hendry) | 140 mph |
| (no match) | Outside service area | "Outside our 14-county area — call us at (863) 555-0142" |

If ZIP is empty or invalid (not 5 digits or non-numeric), the wind-zone label hides until the field is valid.

### SVG preview

A single isometric line drawing of a gable steel building. Stroke-only, no fill, near-black lines on a soft-gray panel surface. Resizes live as the user moves sliders.

**Visual grammar:**

- Front face — rectangle representing `width × eaveHeight`
- Side face — parallelogram (foreshortened by 0.55) representing `length × eaveHeight` for isometric depth
- Roof — two pitch lines from eaves to ridge; back-face roof line offset by the foreshortened depth
- Dimensional callouts — mono text labels in industrial teal hugging each edge:
  - Width callout below the front face (e.g., "60' WIDTH")
  - Length callout along the side face (rotated to follow the foreshortened axis)
  - Eave height callout vertical along the front-left corner
- Ground line — single thin charcoal stroke beneath the building
- County / wind label — appears below the SVG once a valid ZIP is entered

**Implementation note:** single `<svg>` element with about 8 child elements (1 ground line, 5 building lines, 3 text callouts). Render updates SVG attribute values (`x`, `y`, `points`, `textContent`) rather than rebuilding the DOM — keeps interaction smooth on rapid slider changes.

### JavaScript architecture

Plain vanilla JavaScript, all inline in `configurator/home.html`. Single state object, render-on-change pattern.

```
state = { useCase, width, length, eaveHeight, zip }
                     │
        ┌────────────┴───────────┐
        │                        │
   user adjusts             user clicks
   slider/dropdown       quick-click card
        │                        │
   handleInput()           handleQuickPick()
        │                        │
        └────────────┬───────────┘
                     │
                state mutated
                     │
                  render()
                     │
        ┌────────────┼─────────────────┐
        │            │                 │
   updateSVG()  updateLabels()  updateSummary()
   (attrs only) (text content)  (sqft, wind)
```

**Submit handler:**

- `event.preventDefault()` on form submit
- Read final state, build summary string
- Show modal panel with summary: *"Got it — Bell Metal Buildings will return a sealed engineering quote for your 60' × 100' × 16' cattle barn (Polk County, 150 mph wind zone) within 5 business days."*
- No backend, no fetch, no localStorage

**Estimated line count:**

- State + use-case defaults: ~25 lines
- Wind-zone lookup table + function: ~30 lines
- Event handlers: ~25 lines
- `render()` + `updateSVG()` + label updaters: ~50 lines
- Submit + confirmation: ~20 lines
- **Total: approximately 150 lines of vanilla JavaScript**

### Edge cases

| Edge case | Handling |
|---|---|
| Empty ZIP | Hide wind-zone label (no error state) |
| Invalid ZIP (not 5 digits or non-numeric) | Hide wind-zone label until valid |
| ZIP outside 14-county service area | Show "Outside our service area — call (863) 555-0142" |
| Sliders at extreme values | Render normally; no validation against physically improbable combinations |
| Form submit with empty required fields | Browser-native HTML5 validation via `required` attribute only |
| User picks a quick-click card after manually adjusting sliders | Sliders snap to that card's defaults (intentional reset) |
| ZIP changes wind zone mid-config | Wind label updates instantly; nothing else changes |

**Deliberately not handled (out of scope for mockup):**

- Real form submission to a backend
- Persistence between visits (no localStorage)
- Real pricing calculation
- Building-physics validation (e.g., span/pitch/wind-load combinations that wouldn't engineer)
- Custom keyboard shortcuts beyond browser defaults

## Index Landing Page

`index.html` is the entry point. Its job is navigation, not visual statement.

**Layout:** vertical stack of 5 direction cards.

**Per-card contents:**

- Three to five small color chips showing the direction's palette anchor colors
- Direction name (uppercase, prominent)
- One-sentence concept
- Target buyer persona (smaller, gray)
- "View →" link to the direction's `home.html`

**Index page styling (intentionally restrained):**

- White background, near-black text
- System font stack: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
- Cards have a 1px border and subtle hover lift
- Single-column layout on all viewports
- ~80 lines of HTML+CSS, no JavaScript

The index page should be conspicuously plain. The temptation to design it too would create a sixth direction the client unconsciously evaluates against the five real ones.

**Header copy:**

> Bell Metal Buildings
> Five Design Directions for Home Page
>
> Each direction targets a different buyer. Click through to view the home page mockup. After you pick a winner, we'll expand the chosen direction into a full multi-page site.

## Cross-Cutting Concerns

### Responsive breakpoints

| Breakpoint | Range | Behavior |
|---|---|---|
| Desktop | ≥ 1024px | Full layout as designed |
| Tablet | 768–1023px | Side-by-side elements stack to single column; horizontal grids reduce by one column |
| Mobile | < 768px | Single column throughout; hero text scales with `clamp()`; rotated/decorative elements lose rotation |

**Per-direction collapse rules:**

| # | Desktop → Mobile collapse |
|---|---|
| 1 Toro | 3×2 building-type grid → 2×3 → 1×6 stack. Persistent nav becomes hamburger on mobile. Hero photo scales with `object-fit: cover`. |
| 2 Editorial | Side-by-side editorial spreads → stacked photo-above-text. Pull-quote text scales with `clamp(1.5rem, 4vw, 3rem)`. |
| 3 Technical | Split hero (50/50) → stacked. Spec card grid 3×2 → 2×3 → 1×6. Dimensional callouts on photos shrink with the photo or hide on small screens. |
| 4 Heritage | Catalog cards 3-col → 2-col → 1-col. Portrait testimonial photo stays prominent on mobile (75% viewport width). Slab headlines scale carefully. |
| 5 Configurator | Desktop 40/60 input/preview side-by-side → stacked input above preview. Sliders go full-width. SVG preview scales to viewport with `viewBox` preserving aspect ratio. Quick-click cards may horizontal-scroll on mobile. |

**Tap-target floor:** 44×44px minimum on every interactive element (buttons, links, cards, form inputs).

### Accessibility

WCAG AA contrast and keyboard accessibility on all five directions.

**Color contrast verification (high-risk pairings to verify during build):**

| # | Risky pairing | Mitigation |
|---|---|---|
| 1 | Red `#D8362F` on white = ~4.07:1 — passes AA large only | Use red ONLY for buttons (large), accents, decorative. Body text is near-black on white. |
| 2 | Terracotta `#B45A3C` on bone white = ~3.5:1 — fails AA for normal text | Terracotta is decoration only (rules, hovers, accents). All readable text is barn green or charcoal on bone white. |
| 3 | Signal yellow `#F5C518` on off-white = ~1.5:1 — fails for any text | Yellow is button-fill only (with near-black text on yellow = ~13:1). Never yellow text on light. |
| 4 | Brass `#A88752` on cream = ~3.0:1 — fails for text | Brass is ornamental only (rules, dividers, badges). Body is oxblood or charcoal. |
| 5 | Teal `#1098AD` on off-white = ~3.5:1 — fails for normal text | Teal is button-fill only (with white text on teal = AA pass) and active-state outlines. Body is near-black. |

**Focus-visible styles per direction:**

| # | Focus style |
|---|---|
| 1 | 2px solid red outline, 3px offset |
| 2 | 2px solid terracotta outline, 3px offset |
| 3 | 2px solid signal-yellow outline, 3px offset |
| 4 | 2px dashed brass outline, 3px offset (warmer feel) |
| 5 | 2px solid teal outline, 2px offset (tighter UI feel) |

**Universal accessibility floor (all 5):**

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` — never `<div>` where a semantic element fits
- Heading hierarchy: one `<h1>` per page (the hero headline), then `<h2>` for sections, `<h3>` for sub-items
- Skip-to-content link: hidden by default, appears on focus, jumps to `<main>`
- All content `<img>` tags: descriptive alt text. Decorative images: `alt=""` and `aria-hidden="true"`
- Form fields: associated `<label>` elements (placeholders are not labels)
- Hero photos with text overlay: darkening linear-gradient overlay (`rgba(0,0,0,0.4–0.6)`) to guarantee text contrast — tested with the actual hero photo

**Configurator-specific (Direction 5):**

- Sliders: `aria-label` describing what they control plus native `aria-valuenow`/`aria-valuemax`/`aria-valuemin`
- Quick-click cards: `<button>` elements with descriptive text content (not `<div role="button">`)
- SVG preview: includes `<title>` and `<desc>` for screen readers — *"Building preview, 60 feet wide by 100 feet long by 16 feet eave height"*
- Wind-zone label: wrapper has `aria-live="polite"` so screen readers announce updates without interrupting

### Photography sourcing

**Source:** Unsplash and Pexels URLs (no local image files). Both have permissive licenses covering commercial use without attribution requirement.

**Per-direction search strategy:**

| # | Search terms |
|---|---|
| 1 Toro | "industrial steel building," "warehouse exterior," "construction site golden hour" |
| 2 Editorial | "barn golden hour," "cattle ranch landscape," "agricultural farmland," "hay barn evening" |
| 3 Technical | "metal building exterior," "construction blueprint," "industrial structure" — CSS overlays add the dimensional-callout aesthetic |
| 4 Heritage | "rancher portrait," "farmer with workshop," "rural workshop interior," "warm rural americana" |
| 5 Configurator | Minimal — only 1–2 photos for the testimonial and trust strip |

**Performance pattern:**

- Hero photo: `loading="eager"` (LCP candidate)
- Below-fold photos: `loading="lazy"`
- Unsplash URLs sized via params: `?w=1920&q=80` for hero, `?w=800&q=80` for cards
- No responsive `<picture>` element at mockup quality; would add for production depth phase

**Alt text policy:**

- Building photos: include type and setting — "Steel cattle barn at golden hour, Hardee County context"
- People photos: name and role and setting — "Wade T., cattle producer, beside his hay barn"
- Decorative background photos: `alt=""` and `aria-hidden="true"`
- Hero photos with overlaid text: `alt="[descriptive]"` so screen readers do not miss what the image shows

### Font loading

Google Fonts CDN per direction. Each direction's `<head>` loads only its required fonts.

| # | Loaded fonts |
|---|---|
| 1 Toro | Manrope (400/500/700/800) + Inter (400/500/600) |
| 2 Editorial | Fraunces (400/700 + italic 400/700) + Inter (400/500) |
| 3 Technical | Space Grotesk (500/600/700) + Inter (400/500) + JetBrains Mono (400/500/700) |
| 4 Heritage | Roboto Slab (400/700/900) + Lora (400/500 + italic 400) |
| 5 Configurator | Inter (400/500/600/700) + JetBrains Mono (400/500/700) |

**Loading optimization (universal):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...&display=swap">
```

`display=swap` ensures text renders in fallback font during load (no FOIT). Each direction declares a meaningful fallback stack so a slow font request does not visually break the design (e.g., Direction 4 falls back to `Georgia, serif` rather than `system-ui` to preserve heritage feel).

## Verification Approach

Static mockup verification floor — visual and interactive smoke testing in browser. No automated test suite.

**Per-direction checklist (verified manually in browser):**

- File opens with no console errors or warnings
- Renders correctly at desktop (1280px), tablet (900px), mobile (375px)
- All Unsplash/Pexels images load (no broken URLs)
- Google Fonts load (verify in Network panel)
- All form fields have visible labels and accept input
- Submit button shows inline confirmation (`preventDefault` working)
- All text passes WCAG AA contrast (verify with browser DevTools accessibility panel or Lighthouse)
- Keyboard tab order is logical; all interactive elements are reachable
- Focus-visible styles appear on tab navigation
- Skip-to-content link works
- No horizontal scroll on mobile

**Direction 5 (Configurator-First) additional checks:**

- Sliders update value labels on input
- SVG preview resizes smoothly with each slider movement
- Use-case quick-click cards pre-fill the configurator inputs
- ZIP input updates wind-zone label (try ZIPs in different regions: 33801 Lakeland → 150 mph, 33901 Fort Myers → 160-170 mph, 34601 Brooksville → 150-160 mph)
- Get-quote button shows summary modal with current selections
- No JS errors during interaction (Console clean during a full configurator session)

**Why no formal automated tests:** Static HTML mockups have no testable logic except the configurator's small JS module (~150 lines). Adding Jest/Vitest just for that contradicts the no-build approach. Recommendation: skip formal tests for the mockup phase; add them in the depth phase when the configurator becomes real and has a backend. If unit tests on the configurator's wind-lookup and use-case-default logic are wanted now, they can be added as a single in-page assertion runner (`configurator.test.html`) using a minimal assertion helper (~30 lines).

## Out of Scope

This spec defines the mockup phase only. The following are explicitly excluded:

- **Multi-page sites for any direction.** Each direction is one home page. The winning direction's expansion to services/about/contact/etc. is a separate future project.
- **Real backend.** No form submissions hit any server; all "submit" actions are visual confirmations only.
- **Real pricing calculation.** Direction 5's configurator has no price computation; it shows dimensions and wind zone only.
- **Real lead capture.** Forms do not actually create leads in any CRM.
- **Photography of real Bell Metal Buildings projects.** Until real install photos are provided, all images are Unsplash/Pexels stock.
- **Production-grade SEO.** No structured data (JSON-LD), no sitemap, no robots.txt, no per-page meta optimization beyond a single descriptive `<title>` and `<meta name="description">`.
- **Analytics, tracking pixels, or chat widgets.** Mockup pages have none.
- **Cross-browser testing on legacy browsers.** Modern evergreen only (last 2 years of Chrome/Edge/Firefox/Safari).
- **Internationalization.** English (US) only.
- **Dark mode.** Each direction has one canonical visual treatment.
- **Animation polish.** Scroll reveals are simple opacity/translateY transitions; no bespoke choreography.

## Appendix A — Regional Research Summary

Distilled from a research subagent run on 2026-04-30 covering the Florida west coast metal buildings market.

**Verification gap:** The research was conducted from training knowledge through January 2026 because live web tools were sandbox-denied during the research session. Items needing live verification before any real publish:

- Current Florida Building Code edition and ASCE reference
- County-specific V_ult (ultimate design wind speed) values
- Any named regional competitor's current operating status
- Current pricing ranges for steel buildings
- Address/phone/license-number patterns to ensure no collision with real businesses

**Regional context:**

The west coast of Florida contains three loosely overlapping bands of buyers:

- **Northern band** (Hernando, Citrus, Pasco, Sumter, Marion): older agricultural identity, retirees with acreage (The Villages spillover), strong equestrian belt thickening toward Ocala
- **Central band** (Tampa Bay metro, Polk inland, Manatee, Sarasota): commercial and contractor-yard heartland; I-75 and I-4 growth corridors generate warehouse and mini-storage demand
- **Southern band** (Charlotte, Lee, Collier coastal; DeSoto, Hardee, Hendry inland): coastal residential-luxury and post-hurricane rebuild demand; inland cattle country

**Florida Building Code wind-zone approximations (verify before publish):**

- Coastal SW Florida (Lee/Collier/Charlotte): 160–170 mph
- Coastal central (Manatee/Sarasota): 150–160 mph
- Coastal Tampa Bay (Pinellas/Hillsborough/coastal Pasco): 150–160 mph
- Inland Polk/Hardee/DeSoto/Highlands/Hendry: 140–150 mph
- HVHZ (High Velocity Hurricane Zone) covers Miami-Dade and Broward only — does NOT apply to the west coast

**Salt-air corrosion:** Galvalume AZ55 is the standard panel coating; marine-grade fasteners on installs within ~1–3 miles of the coast. Galvalume warranties typically exclude installations within ~1,500 ft to 1 mile of saltwater.

**Common building types and dimensions:** documented in the Building Types Grid section above.

**Plausible placeholder content kit (used in this spec):**

- HQ: Lakeland, FL (Polk County, central, equidistant to Tampa Bay/Sarasota/Fort Myers)
- Phone area code: 863 (Polk)
- Founded: 2006 (~20 years as of 2026)
- Project count: 1,400+ buildings since 2006
- Service area: 14 counties from Citrus to Collier
- Buyer mix: 55% agricultural, 30% commercial, 15% residential
- Crew bases: Lakeland, Sarasota, Fort Myers
- Five testimonial archetypes (Wade T. cattle/Hardee, Linda M. RV/Sarasota, Rebecca H. equestrian/Marion, Mike D. contractor/Polk, Tom & Carol B. post-Ian rebuild/Charlotte)

## Appendix B — Source Material References

- **Reference site (client-provided):** [https://torosteelbuildings.com/](https://torosteelbuildings.com/)
- **Peer survey reference sites** (from research, recall-only — verify before any real reference):
  - Mueller Inc. — muellerinc.com
  - RHINO Steel Building Systems — rhinobldg.com
  - General Steel — gensteel.com
  - Olympia Steel Buildings — olympiasteelbuildings.com
  - Worldwide Steel Buildings — worldwidesteelbuildings.com
  - Whirlwind Steel — whirlwindsteel.com
- **Out-of-industry aesthetic references for the four alternative directions:**
  - Direction 2 Editorial Agricultural — magnoliajournal.com
  - Direction 3 Industrial Technical — vitsoe.com
  - Direction 4 Warm Heritage — filson.com
  - Direction 5 Configurator-First — tesla.com/modely/design

## Implementation Notes for Next Phase

The next phase invokes the writing-plans skill to convert this spec into an executable implementation plan. The implementation plan should:

1. Treat the 5 direction files as parallelizable (no shared state, no shared code, no ordering dependency)
2. Build a working configurator (Direction 5) in a single focused step with state management, SVG preview, and wind-zone lookup
3. Build the index landing page last, after all 5 directions are stable
4. Verify each direction against the Verification Approach checklist before marking complete
5. Use one concise commit per direction once approved

The implementation plan should not introduce build tooling, framework dependencies, or shared CSS/JS layers, because the spec explicitly chose self-contained per-file architecture.
