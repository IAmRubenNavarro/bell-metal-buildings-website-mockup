# Bell Metal Buildings -- Website Mockup Design Spec

## Overview

Nine static HTML/CSS/JS website mockups for Bell Metal Buildings, covering three sites in three distinct visual styles. The purpose is to present the client with meaningfully different design directions for their web presence.

## Sites

### 1. Corporate Landing Page (1 page)

A minimal landing page serving as the parent brand presence. Links out to the two division sites.

**Content:**
- Hero section with company name and tagline
- Brief company introduction paragraph
- Two prominent division cards linking to Industrial Construction and Metal Buildings
- Contact information (phone, email, address)

### 2. Industrial Construction Division Site (3 pages)

Covers industrial construction services -- large-scale builds, facility construction, structural work.

**Pages:**
- **Home:** Hero, stats/counters, featured projects, CTA
- **Services:** Service listings with descriptions, photo gallery, CTA
- **About/Contact:** Company story, timeline/milestones, contact form, map, business hours

### 3. Metal Buildings Division Site (3 pages)

Covers metal building manufacturing -- pre-engineered structures, warehouses, barns, workshops, custom metal buildings.

**Pages:**
- **Home:** Hero, building type categories, process overview, testimonial, CTA
- **Services:** Service/product listings with specifications, process steps, comparison elements
- **About/Contact:** Value propositions, company story, contact form, map, business hours

## Style-to-Folder Mapping

| Style Name | Folder Name | Shorthand |
|---|---|---|
| Forge (Bold & Heavy) | `bold/` | bold |
| Precision (Clean & Corporate) | `clean/` | clean |
| Grit (Rugged & Authentic) | `rugged/` | rugged |

## Style Definitions

### Forge (Bold & Heavy)

**Concept:** The website feels like it was stamped from hot metal. Aggressive, unapologetic, industrial power.

- **Palette:** Near-black (#0D0D0D) base, charcoal (#2A2A2A) sections, molten orange (#FF4D00) singular accent
- **Typography:** Display -- Bebas Neue (uppercase, tracked wide, massive scale 8-10rem). Body -- IBM Plex Mono (technical/blueprint feel)
- **Layout:** Full-bleed stacked blocks, edge-to-edge sections, diagonal clip-paths slicing between sections, deliberately oversized content
- **Texture:** CSS noise grain overlay on dark surfaces, subtle steel brushed-metal gradients, hard shadows (no soft blur -- offset like `8px 8px 0 #FF4D00`)
- **Motion:** Content enters from below with aggressive cubic-bezier easing, scroll-triggered staggered reveals, hover states with hard translate + scale shifts
- **Differentiator:** Persistent diagonal orange stripe cutting across the viewport like a caution line on a construction site

### Precision (Clean & Corporate)

**Concept:** Architectural drawing meets high-end annual report. Calculated, refined, quietly confident. Luxury engineering firm, not corporate boring.

- **Palette:** Alabaster white (#FAFAF8) base, deep navy (#0A1628) contrast blocks, muted brass (#B08D57) accent
- **Typography:** Display -- Playfair Display (serifs conveying authority and heritage). Body -- DM Sans (clean geometric sans, generous line-height). The serif/sans contrast creates tension and sophistication.
- **Layout:** Strict asymmetric grid, content offset from center, large photography at 60% with text at 40%, generous negative space, thin 1px rules as structural elements
- **Texture:** None -- purity is the texture. Subtle brass-tinted box shadows on hover. Photography with slight desaturation for tonal cohesion.
- **Motion:** Smooth scroll-linked parallax on hero imagery, elements fade in with upward drift on intersection (0.6s ease-out), brass underlines that draw themselves on link hover
- **Differentiator:** Thin brass rule running vertically along the left margin of content, breaking and reconnecting as you scroll -- like a blueprint's margin line

### Grit (Rugged & Authentic)

**Concept:** Feels like a weathered field office -- stained blueprints, sun-faded safety posters, honest work. Not polished, not trying to be.

- **Palette:** Aged paper (#E8E0D4) base, charred wood (#1E1108) text, faded safety red (#A63D2F) accent, oxidized green (#4A6741) secondary. Colors feel sun-exposed.
- **Typography:** Display -- Arvo (slab serif, sturdy, stamped lettering feel). Body -- Source Serif 4 (readable, warm, slightly old-school). No sans-serifs anywhere.
- **Layout:** Overlapping elements with negative margins, cards with visible hand-drawn-style borders, unequal padding creating organic rhythm, slight rotations (1-2deg)
- **Texture:** CSS-generated paper grain background, warm-filtered photos with vignette (inset box-shadow), torn-edge effects on image containers (clip-path polygons)
- **Motion:** Minimal and grounded. Slow parallax on background textures. Elements appear on scroll (opacity only, no translation). Hover states feel tactile -- buttons darken and press inward.
- **Differentiator:** Faint angled blueprint grid pattern in the page background, rotated slightly to feel like a real document laid on a table

## Page-by-Page Design

### Corporate Landing Page

#### Forge

- **Hero:** Full viewport, "BELL" at 12rem, "INDUSTRIAL CONSTRUCTION" below in IBM Plex Mono. Orange diagonal stripe cuts top-right to bottom-left. Dark noise-grain background, no image -- pure typography.
- **Intro:** Single paragraph, white on #0D0D0D, max-width ~60ch, orange left border 4px thick.
- **Division Cards:** Two blocks side by side at 50% viewport width each. Full-height background images with dark overlays. Division name stamped large, uppercase. Hover lightens overlay, card shifts 8px with hard orange shadow.
- **Contact:** Fixed bottom bar -- narrow orange strip with phone, email, "Request Quote" button in black.

#### Precision

- **Hero:** Split layout -- 55% left is desaturated construction photo, 45% right is navy with "Bell Metal Buildings" in Playfair Display, thin brass rule underneath, single-sentence tagline. Vertical brass margin line begins here.
- **Intro:** Centered on white, generous padding (8rem top/bottom), brass drop-cap on opening letter.
- **Division Cards:** Asymmetric -- Industrial Construction card larger and offset left, Metal Buildings slightly smaller and offset right, overlapping vertically ~40px. Each: desaturated photo, Playfair name, one-line description, brass-underline "Visit Site" link.
- **Contact:** Navy footer, contact details horizontal with thin brass dividers between phone, email, address.

#### Grit

- **Hero:** Warm-filtered wide construction photo, rotated -1deg, torn-edge bottom clip-path. "Bell Metal Buildings" in Arvo overlaid lower-left with faded red background swatch like a stamped label. Blueprint grid visible behind.
- **Intro:** Left-aligned on paper background, two short paragraphs in Source Serif 4, faded red horizontal rule separator.
- **Division Cards:** Stacked vertically. Each looks like a pinned document -- slight rotation (1deg / -1deg), visible border, inset shadow like paper on corkboard. Photo with vignette, Arvo name, description, tactile button.
- **Contact:** Charred-wood dark footer, contact details stacked vertically, faded red "Call Us" link.

### Industrial Construction -- Home

#### Forge

- Full-viewport hero with dark still image placeholder, "WE BUILD INDUSTRIAL" in Bebas Neue at 10rem stacked two lines.
- Three-stat counter strip: years, projects, sq ft -- orange text on black, 5rem IBM Plex Mono numbers.
- Featured Projects: three parallelogram-clipped images, project name on hover overlay.
- CTA banner: full-width orange, black text, "GET A QUOTE" in Bebas Neue.

#### Precision

- Asymmetric split hero: 60% desaturated photo, 40% navy with Playfair headline and brass-outlined consultation button.
- 3-column capabilities grid on white, brass top-borders per column.
- Single testimonial quote in italic Playfair on navy, brass quotation marks.
- 2x2 featured work grid, zoom on hover, thin brass border appearing.

#### Grit

- Wide warm-filtered hero photo, slightly rotated, torn-edge bottom. "Industrial Construction Services" stamped on faded red patch.
- "Our Work" scattered photo layout: three images at slight rotations, overlapping, Source Serif 4 italic captions.
- Mission statement: large Arvo text, faded red drop cap on paper background.
- Stamped-label CTA button, slight rotation, press-inward hover.

### Industrial Construction -- Services

#### Forge

- "WHAT WE BUILD" headline with orange diagonal accent.
- Vertical stack of full-width rows: service name large left-aligned, description right-aligned, expanding detail panel on click.
- Horizontal-scroll photo gallery strip with hard shadow borders.

#### Precision

- Centered headline with brass rules above and below.
- Alternating layout: odd rows image-left/text-right, even rows flipped. Service photos at 55% width, Playfair titles, brass "Learn More" links.
- 6rem vertical spacing. CTA block: white on navy, brass button outline.

#### Grit

- "What We Do" in Arvo with thick faded-red underline.
- Stacked "document cards" -- slightly rotated, visible border, inset shadow. Each has Arvo name, Source Serif 4 description, torn-edge photo.
- Dotted rules between cards like perforated paper.
- Filmstrip-style horizontal photo gallery with oxidized-green borders.

### Industrial Construction -- About/Contact

#### Forge

- Split into two halves via diagonal clip-path. Left: dark background, company story, orange-dot timeline. Right: contact form on lighter charcoal, orange bottom-border fields.
- Dark-filtered map embed below. Business hours in IBM Plex Mono table.

#### Precision

- Company story in narrow centered column (55ch), Playfair pull-quote breaking flow.
- Circular desaturated team photos in a row.
- Contact form on light gray, thin bottom-border fields turning brass on focus. Map in brass-bordered frame with address/hours beside.

#### Grit

- Company story as a left-aligned letter, Source Serif 4, faded red drop cap.
- Hand-drawn-style timeline (slightly wobbly SVG/borders).
- Form on darker parchment, visible field borders, heavy charred-wood "Send" button. Map with torn-edge frame. Hours in hand-drawn-border table.

### Metal Buildings -- Home

#### Forge

- Full-viewport hero with wireframe SVG metal building illustration in orange strokes on black, "METAL BUILDINGS" in Bebas Neue cutting through center.
- Three product categories (Commercial, Agricultural, Residential) as full-width horizontal bands with dark overlays, hard-shadow orange arrow links.
- Stats strip: dimensions delivered, tons fabricated, states served.
- "CONFIGURE YOUR BUILDING" CTA in orange, IBM Plex Mono text.

#### Precision

- Panoramic metal building photo at 70vh, desaturated, navy gradient overlay from bottom. "Metal Building Solutions" in Playfair rising from gradient.
- 3-column "Building Types" cards: tall photos, brass top-rule, Playfair type name, dimensions range.
- 4-step "Our Process" horizontal layout with brass connecting lines, oversized brass step numbers.
- Client testimonial in Playfair italic on navy, brass decorative quotation marks.

#### Grit

- Wide warm-filtered rural metal building photo, rotated, torn-edge bottom. "Metal Buildings" on oxidized-green patch.
- Three polaroid-style product photos: white border, slight rotation, handwritten-style captions.
- "From Our Yard" large framed photo with heavy vignette and craftsmanship narrative.
- Stamped-label CTA in oxidized green.

### Metal Buildings -- Services

#### Forge

- "WHAT WE MANUFACTURE" headline.
- 2-column masonry grid of tall black cards: service name vertical in Bebas Neue, specification list in IBM Plex Mono, diagonal-cropped image at bottom.
- Orange horizontal rules between grid rows.
- 4-step horizontal pipeline (Design, Fabricate, Deliver, Erect) with orange connecting lines, 6rem step numbers.

#### Precision

- Centered Playfair headline with brass rules.
- Single-column editorial flow: wide photos at 80% width (alternating alignment), overlapped by white content cards (20% overlap via negative margin) with service name, specs table, description.
- Comparison table: building types vs features matrix, brass header row, thin cell borders.

#### Grit

- "What We Offer" in Arvo with oxidized-green underline.
- Catalog-style cards resembling trade catalog listings: Arvo name, specifications sidebar with dotted borders, torn-edge photo, Source Serif 4 description.
- Decorative dash-pattern rules between entries.
- 4-step process on hand-drawn SVG path with numbered circles, slightly imperfect line.

### Metal Buildings -- About/Contact

#### Forge

- Full-width photo banner with extreme dark overlay, "LET'S BUILD" in Bebas Neue.
- Two-column story: left text, right vertical photo stack with hard orange borders alternating alignment.
- Contact form on solid black, steel-gray outlined fields glowing orange on focus.
- Technical-drawing title block footer: bordered cells, IBM Plex Mono labels, Bebas Neue values.

#### Precision

- "Why Choose Us" section: three value props with oversized brass Playfair numbers (01, 02, 03).
- Company story in narrow centered column with Playfair pull-quote.
- Two-column contact: left has details + brass-bordered map, right is form with thin fields and navy submit button.

#### Grit

- Wide warm team/facility photo, polaroid treatment with rotation.
- Founder's letter-style story: first-person, Source Serif 4, faded red drop cap.
- "Our Promise" section: three commitments in Arvo with oxidized-green bullets.
- Form on darker parchment, charred-wood "Send" button. Torn-edge map frame. Blueprint grid fading out in footer.

## Technical Requirements

### General

- All files are self-contained static HTML with inline or co-located CSS/JS
- Google Fonts loaded via CDN for typography
- Images sourced from Unsplash/Pexels via URL (no local image files)
- Cross-browser compatible (modern browsers)
- No build tools or frameworks required -- open HTML files directly in browser

### Responsive Breakpoints

- **Desktop:** 1024px and above -- full layout as designed
- **Tablet:** 768px - 1023px -- side-by-side elements stack to single column, diagonal clip-paths simplified to straight edges, asymmetric splits become stacked sections, image widths go to 100%
- **Mobile:** below 768px -- single column throughout, hero text scales down (clamp() or vw units), horizontal scroll galleries become vertical stacks, fixed contact bars become static footer sections, rotated elements in Grit lose rotation on mobile for readability

### Navigation

- Division sites include a top nav bar linking between their three pages (Home, Services, About/Contact)
- Division sites include a "Bell Metal Buildings" link in the nav that links back to the corresponding style's corporate landing page (e.g., `bold/home.html` links to `../../corporate/bold/index.html`)
- Corporate landing page has no nav bar -- it is a single-page entry point
- All CTAs ("Get a Quote," "Request Quote," "Request a Consultation," "Configure Your Building," etc.) link to the About/Contact page of the current division site

### Contact Forms

- Contact forms are non-functional static mockups
- On submit, prevent default and display an inline confirmation message: "Thank you. We'll be in touch within 24 hours."
- Form fields: Name, Email, Phone, Project Type (dropdown: New Construction, Renovation, Metal Building, Other), Message (textarea)

### Maps

- Use a Google Maps iframe embed centered on Miami, FL (placeholder location for Bell Metal Buildings) with a dark-mode style filter applied for Forge, standard for Precision, and a warm-tinted filter for Grit

### Interactive Elements

- Forge Services "expanding detail panel": accordion-style toggle, slides open (300ms ease) to reveal a paragraph of detail text and a photo, only one panel open at a time, clicking an open panel closes it
- Horizontal-scroll galleries (Forge Industrial Services, Grit Metal Buildings Services): native CSS `overflow-x: auto` with `scroll-snap-type: x mandatory` and `scroll-snap-align: start` on each item

### Accessibility

- Maintain WCAG AA contrast ratio (4.5:1 minimum) on all text -- verify orange-on-black (Forge) and red-on-paper (Grit) combinations in particular
- Use semantic HTML elements (header, nav, main, section, footer, h1-h6)
- All images get descriptive alt text
- Form fields have associated label elements
- Interactive elements are keyboard-accessible (focus-visible styles on all clickable elements)

### Page Titles

- Format: `Bell Metal Buildings | [Division] - [Page] | [Style]`
- Examples: `Bell Metal Buildings | Corporate | Forge`, `Bell Metal Buildings | Metal Buildings - Services | Precision`

## Folder Structure

```
bell_industrial_website_mockup/
  corporate/
    bold/index.html
    clean/index.html
    rugged/index.html
  industrial-construction/
    bold/home.html
    bold/services.html
    bold/about.html
    clean/home.html
    clean/services.html
    clean/about.html
    rugged/home.html
    rugged/services.html
    rugged/about.html
  metal-buildings/
    bold/home.html
    bold/services.html
    bold/about.html
    clean/home.html
    clean/services.html
    clean/about.html
    rugged/home.html
    rugged/services.html
    rugged/about.html
```

**Total deliverables:** 21 HTML files.

## Content Strategy

All content is placeholder but written to sound like a real industrial construction company:
- Realistic service descriptions (steel erection, concrete foundations, pre-engineered metal buildings, etc.)
- Plausible statistics (25+ years, 500+ projects, etc.)
- Industry-appropriate testimonials
- Genuine-sounding company history
- Real contact form fields (name, email, phone, project type, message)
- Placeholder images sourced from industrial/construction photography on Unsplash/Pexels

### Image Sourcing Guide

Use Unsplash/Pexels search with these descriptions per context:

| Context | Search Terms |
|---|---|
| Corporate hero | "industrial construction site aerial", "steel structure building" |
| Industrial Construction hero | "structural steel erection", "commercial building construction" |
| Metal Buildings hero | "metal building warehouse", "pre-engineered steel building" |
| Project gallery | "factory construction", "industrial facility", "warehouse interior" |
| Metal building types | "commercial warehouse exterior", "agricultural barn metal", "steel workshop building" |
| Team/about | "construction workers team", "construction site crew" |
| Rural/Grit context | "rural metal building", "farm building construction" |

Aim for 3-5 unique images per page. Reuse is acceptable across styles (same site, different style) but not across pages within the same style.
