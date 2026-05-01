# Bell Metal Buildings Website Mockups Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 21 static HTML/CSS/JS mockup pages for Bell Metal Buildings across 3 sites and 3 visual styles.

**Architecture:** Each HTML file is fully self-contained (inline `<style>` and `<script>`) with no shared dependencies. Files are organized by site > style. Google Fonts loaded via CDN, images via Unsplash/Pexels URLs. All 9 tasks are independent and can execute in parallel.

**Tech Stack:** HTML5, CSS3 (custom properties, clip-path, grid, flexbox, scroll-snap, keyframe animations), vanilla JavaScript (IntersectionObserver, form handling, accordion toggles), Google Fonts CDN, Unsplash/Pexels image URLs.

**Spec:** `docs/superpowers/specs/2026-03-26-bell-industrial-website-mockups-design.md`

---

## File Structure

```
bell_industrial_website_mockup/
  corporate/
    bold/index.html          # Forge corporate landing page
    clean/index.html         # Precision corporate landing page
    rugged/index.html        # Grit corporate landing page
  industrial-construction/
    bold/home.html            # Forge IC home
    bold/services.html        # Forge IC services
    bold/about.html           # Forge IC about/contact
    clean/home.html           # Precision IC home
    clean/services.html       # Precision IC services
    clean/about.html          # Precision IC about/contact
    rugged/home.html          # Grit IC home
    rugged/services.html      # Grit IC services
    rugged/about.html         # Grit IC about/contact
  metal-buildings/
    bold/home.html            # Forge MB home
    bold/services.html        # Forge MB services
    bold/about.html           # Forge MB about/contact
    clean/home.html           # Precision MB home
    clean/services.html       # Precision MB services
    clean/about.html          # Precision MB about/contact
    rugged/home.html          # Grit MB home
    rugged/services.html      # Grit MB services
    rugged/about.html         # Grit MB about/contact
```

## Shared Patterns Reference

Every file must include these patterns. Do NOT create shared files -- inline everything.

### HTML Boilerplate (all files)

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Bell Metal Buildings | [Division] - [Page] | [Style]</title>
	<!-- Google Fonts loaded per style -->
	<style>
		/* All CSS inline */
	</style>
</head>
<body>
	<header><!-- nav here for division sites, omit for corporate --></header>
	<main>
		<section><!-- each content block is a section with appropriate h2/h3 --></section>
	</main>
	<footer><!-- contact info / footer content --></footer>
	<script>
		/* All JS inline */
	</script>
</body>
</html>
```

**Semantic HTML rules:**
- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` -- never use `<div>` where a semantic element fits
- One `<h1>` per page (the page/site title in the hero), then `<h2>` for section headings, `<h3>` for subsections
- All `<img>` tags must have descriptive `alt` text (e.g., `alt="Steel frame structure under construction"`)
- Background images used for decoration need no alt text; background images conveying content should use `role="img"` and `aria-label` on the container
- Form fields must have associated `<label>` elements (already in the form template below)

### Accessibility Patterns (all files)

**Focus-visible styles per style:**

```css
/* Forge */
:focus-visible {
	outline: 2px solid var(--forge-orange);
	outline-offset: 3px;
}

/* Precision */
:focus-visible {
	outline: 2px solid var(--precision-brass);
	outline-offset: 3px;
}

/* Grit */
:focus-visible {
	outline: 2px dashed var(--grit-red);
	outline-offset: 3px;
}
```

**Color contrast rules:**
- Forge: orange (#FF4D00) on black (#0D0D0D) = 4.58:1 -- passes AA for large text only (18px+ bold or 24px+ normal). Use ONLY for headings, buttons, and accents. Body text must be white (#FFFFFF) on black (21:1).
- Precision: brass (#B08D57) on white (#FAFAF8) = 3.5:1 -- fails AA for text. Use brass ONLY for decorative elements (rules, borders, ornaments). All readable text must use navy (#0A1628) on white (16.5:1) or white on navy.
- Grit: red (#A63D2F) on paper (#E8E0D4) = 4.2:1 -- fails AA for normal text. Use red ONLY for headings (18px+ bold), accents, and decorative elements. Body text must be charred wood (#1E1108) on paper (13.8:1).

**Skip to content link (all pages):**

```html
<a href="#main-content" class="skip-link">Skip to content</a>
<!-- ... -->
<main id="main-content">
```

```css
.skip-link {
	position: absolute;
	top: -100%;
	left: 0;
	padding: 0.5rem 1rem;
	z-index: 9999;
}
.skip-link:focus {
	top: 0;
}
```

### Forge Style Tokens

```css
:root {
	--forge-black: #0D0D0D;
	--forge-charcoal: #2A2A2A;
	--forge-orange: #FF4D00;
	--forge-white: #FFFFFF;
	--forge-steel: #3A3A3A;
	--font-display: 'Bebas Neue', sans-serif;
	--font-body: 'IBM Plex Mono', monospace;
}
```

Google Fonts link: `https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@400;500;700&display=swap`

Key CSS patterns:
- Noise grain overlay: `background-image: url("data:image/svg+xml,...")` with SVG noise pattern, applied via `::after` pseudo-element with `opacity: 0.05`
- Hard shadows: `box-shadow: 8px 8px 0 var(--forge-orange)`
- Diagonal clip-path sections: `clip-path: polygon(0 0, 100% 0, 100% calc(100% - 4rem), 0 100%)`
- Diagonal orange stripe: fixed-position `::before` on body, rotated 45deg, `background: var(--forge-orange)`, `width: 200vw`, `height: 3px`
- Scroll reveal JS: IntersectionObserver with `threshold: 0.1`, adds `.revealed` class, CSS transition `transform: translateY(40px) -> 0` with `cubic-bezier(0.16, 1, 0.3, 1)`

### Precision Style Tokens

```css
:root {
	--precision-white: #FAFAF8;
	--precision-navy: #0A1628;
	--precision-brass: #B08D57;
	--precision-gray: #F2F1EE;
	--precision-text: #1a1a1a;
	--font-display: 'Playfair Display', serif;
	--font-body: 'DM Sans', sans-serif;
}
```

Google Fonts link: `https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@400;500;700&display=swap`

Key CSS patterns:
- Brass vertical margin line: fixed-position `::before` on `main`, `width: 1px`, `background: var(--precision-brass)`, `left: calc(50% - 35rem)`, hidden on mobile
- Desaturated photos: `filter: saturate(0.7)`
- Brass underline draw: `background: linear-gradient(var(--precision-brass), var(--precision-brass)) no-repeat left bottom / 0% 1px`, on hover `background-size: 100% 1px`, `transition: background-size 0.4s ease`
- Scroll fade-in: IntersectionObserver, CSS `opacity: 0; transform: translateY(20px)` -> `opacity: 1; transform: translateY(0)`, `transition: 0.6s ease-out`

### Grit Style Tokens

```css
:root {
	--grit-paper: #E8E0D4;
	--grit-wood: #1E1108;
	--grit-red: #A63D2F;
	--grit-green: #4A6741;
	--grit-parchment: #D9D0C2;
	--font-display: 'Arvo', serif;
	--font-body: 'Source Serif 4', serif;
}
```

Google Fonts link: `https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&family=Source+Serif+4:ital,wght@0,400;0,600;0,700;1,400&display=swap`

Key CSS patterns:
- Paper grain: `background-image: url("data:image/svg+xml,...")` with SVG noise at `opacity: 0.03`, applied to body
- Blueprint grid: `background-image: linear-gradient(...)` creating faint grid lines, `transform: rotate(-2deg)`, applied via `body::before` with `opacity: 0.04`
- Torn edges: `clip-path: polygon(0 0, 5% 2%, 15% 0, 25% 1%, 35% 0, 45% 2%, 55% 0, 65% 1%, 75% 0, 85% 2%, 95% 0, 100% 1%, 100% 100%, 0 100%)`
- Photo vignette: `box-shadow: inset 0 0 40px rgba(30, 17, 8, 0.4)`
- Polaroid frame: `background: white; padding: 8px 8px 32px; box-shadow: 2px 3px 8px rgba(0,0,0,0.2); transform: rotate(Ndeg)`
- Tactile button press: `transition: transform 0.15s, background 0.15s`, on hover `transform: translateY(2px)`, darker background

### Contact Form JS (all about/contact pages)

```javascript
document.querySelector('form').addEventListener('submit', function(e) {
	e.preventDefault();
	const btn = this.querySelector('button[type="submit"]');
	const msg = document.createElement('p');
	msg.className = 'form-confirmation';
	msg.textContent = "Thank you. We'll be in touch within 24 hours.";
	btn.parentNode.insertBefore(msg, btn.nextSibling);
	btn.disabled = true;
});
```

### Contact Form Fields (all about/contact pages)

```html
<form>
	<label for="name">Name</label>
	<input type="text" id="name" name="name" required>

	<label for="email">Email</label>
	<input type="email" id="email" name="email" required>

	<label for="phone">Phone</label>
	<input type="tel" id="phone" name="phone">

	<label for="project-type">Project Type</label>
	<select id="project-type" name="project-type">
		<option value="">Select...</option>
		<option value="new">New Construction</option>
		<option value="renovation">Renovation</option>
		<option value="metal-building">Metal Building</option>
		<option value="other">Other</option>
	</select>

	<label for="message">Message</label>
	<textarea id="message" name="message" rows="5"></textarea>

	<button type="submit"><!-- Style-specific text --></button>
</form>
```

### Nav Bar (division site pages only)

```html
<header>
	<nav>
		<a href="../../corporate/[style]/index.html" class="nav-brand">Bell Metal Buildings</a>
		<ul>
			<li><a href="home.html">Home</a></li>
			<li><a href="services.html">Services</a></li>
			<li><a href="about.html">About & Contact</a></li>
		</ul>
	</nav>
</header>
```

### Responsive Skeleton (all files)

```css
/* Tablet */
@media (max-width: 1023px) {
	/* Side-by-side -> stacked */
	/* Diagonal clip-paths -> straight edges */
	/* Asymmetric splits -> stacked sections */
	/* Images -> 100% width */
}

/* Mobile */
@media (max-width: 767px) {
	/* Single column throughout */
	/* Hero text scales via clamp() */
	/* Horizontal galleries -> vertical stacks */
	/* Fixed bars -> static footer */
	/* Grit rotations removed */
}
```

### Google Maps Embed

```html
<iframe
	src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d114964.53925855064!2d-80.29949920266am54!3d25.782390733498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0a20ec8c111%3A0xff96f271ddad4f65!2sMiami%2C%20FL!5e0!3m2!1sen!2sus!4v1"
	width="100%" height="300" style="border:0;" allowfullscreen loading="lazy">
</iframe>
```

For Forge: wrap in div with `filter: invert(0.9) hue-rotate(180deg) saturate(0.3)`
For Precision: no filter -- use the standard map appearance
For Grit: wrap in div with `filter: sepia(0.3) saturate(0.8)`

---

## Tasks

All 9 tasks are independent and can execute in parallel. Each task references specific sections of the spec for page-by-page design details.

---

### Task 1: Corporate Landing Page -- Forge

**Files:**
- Create: `corporate/bold/index.html`

**Spec reference:** Style Definitions > Forge, Page-by-Page Design > Corporate Landing Page > Forge

- [ ] **Step 1: Create directory**

```bash
mkdir -p corporate/bold
```

- [ ] **Step 2: Build the page**

Create `corporate/bold/index.html` with:
- Forge style tokens and Google Fonts
- Full-viewport hero: "BELL" at 12rem in Bebas Neue, "INDUSTRIAL CONSTRUCTION" below in IBM Plex Mono
- CSS diagonal orange stripe cutting top-right to bottom-left (fixed position `::before` on body)
- CSS noise-grain overlay on dark background via `::after` pseudo-element
- Intro section: single paragraph, white on #0D0D0D, max-width 60ch, 4px orange left border
- Division cards: two 50vw blocks side-by-side using flexbox, background images with dark overlay (`background: linear-gradient(rgba(13,13,13,0.7), rgba(13,13,13,0.7)), url(...)`), division name in Bebas Neue. Hover: overlay lightens, card translates 8px, hard orange shadow appears. Industrial Construction links to `../../industrial-construction/bold/home.html`, Metal Buildings links to `../../metal-buildings/bold/home.html`
- Fixed bottom contact bar: narrow orange strip, phone/email in IBM Plex Mono, black "Request Quote" button (mailto: link to placeholder email since corporate page has no form -- `mailto:info@bellindustrial.com?subject=Quote%20Request`)
- Scroll-triggered reveal animations via IntersectionObserver
- Responsive: cards stack vertically on mobile, hero text scales via `clamp(4rem, 10vw, 12rem)`, fixed bar becomes static footer on mobile
- No nav bar (corporate is single-page entry point)
- Page title: `Bell Metal Buildings | Corporate | Forge`

- [ ] **Step 3: Open in browser and verify**

Open `corporate/bold/index.html` in browser. Verify:
- Dark background with visible noise grain texture
- Orange diagonal stripe visible across viewport
- Hero text dominates the viewport at massive scale
- Division cards are side-by-side, hover effects work (translate + shadow)
- Links point to correct division pages
- Fixed bottom bar is visible and stays fixed on scroll
- Resize to mobile: cards stack, text scales down, bar becomes static

- [ ] **Step 4: Commit**

```bash
git add corporate/bold/index.html
git commit -m "feat: add Forge corporate landing page"
```

---

### Task 2: Corporate Landing Page -- Precision

**Files:**
- Create: `corporate/clean/index.html`

**Spec reference:** Style Definitions > Precision, Page-by-Page Design > Corporate Landing Page > Precision

- [ ] **Step 1: Create directory**

```bash
mkdir -p corporate/clean
```

- [ ] **Step 2: Build the page**

Create `corporate/clean/index.html` with:
- Precision style tokens and Google Fonts
- Split hero: 55% left with desaturated construction photo (Unsplash, `filter: saturate(0.7)`), 45% right navy (#0A1628) background with "Bell Metal Buildings" in Playfair Display, thin brass 1px rule underneath, one-sentence tagline in DM Sans
- Vertical brass margin line: fixed `::before` on `main`, 1px wide, brass colored, positioned at left margin of content area, hidden below 1024px
- Intro section: centered on white (#FAFAF8), 8rem vertical padding, brass (#B08D57) drop-cap on first letter using `::first-letter` pseudo-element with Playfair Display
- Division cards: asymmetric layout -- IC card at ~55% width offset left, MB card at ~45% offset right, overlapping vertically by 40px via negative margin. Each card has desaturated photo, Playfair division name, one-line DM Sans description, brass-underline "Visit Site" link with draw animation on hover. IC links to `../../industrial-construction/clean/home.html`, MB links to `../../metal-buildings/clean/home.html`
- Navy footer with contact details (phone, email, address) arranged horizontally, thin brass 1px dividers between each, all in DM Sans
- Scroll fade-in: IntersectionObserver, 0.6s ease-out upward drift
- Responsive: split hero stacks (photo on top, text below), cards stack at equal width, footer details stack vertically
- No nav bar
- Page title: `Bell Metal Buildings | Corporate | Precision`

- [ ] **Step 3: Open in browser and verify**

Open `corporate/clean/index.html` in browser. Verify:
- Clean white/navy palette, brass accents visible
- Split hero has correct proportions, photo is desaturated
- Brass vertical margin line visible on left side on desktop
- Drop-cap on intro paragraph is brass-colored Playfair
- Division cards are asymmetric with vertical overlap
- "Visit Site" brass underline draws on hover
- Navy footer with horizontal layout and brass dividers
- Resize to mobile: everything stacks cleanly

- [ ] **Step 4: Commit**

```bash
git add corporate/clean/index.html
git commit -m "feat: add Precision corporate landing page"
```

---

### Task 3: Corporate Landing Page -- Grit

**Files:**
- Create: `corporate/rugged/index.html`

**Spec reference:** Style Definitions > Grit, Page-by-Page Design > Corporate Landing Page > Grit

- [ ] **Step 1: Create directory**

```bash
mkdir -p corporate/rugged
```

- [ ] **Step 2: Build the page**

Create `corporate/rugged/index.html` with:
- Grit style tokens and Google Fonts
- Body background: aged paper (#E8E0D4) with CSS-generated paper grain texture (SVG noise at low opacity) and faint angled blueprint grid pattern via `body::before` (linear-gradient grid lines, `transform: rotate(-2deg)`, `opacity: 0.04`)
- Hero: wide warm-filtered construction photo (`filter: sepia(0.15) saturate(0.85)`), slightly rotated (`transform: rotate(-1deg)`), torn-edge bottom via clip-path polygon. "Bell Metal Buildings" in Arvo overlaid lower-left with faded red (#A63D2F) background swatch behind text, like a stamped label
- Intro: left-aligned on paper background, two short paragraphs in Source Serif 4, faded red horizontal rule (`border-top: 3px solid var(--grit-red)`) separator below
- Division cards: stacked vertically. Each card styled as pinned document: slight rotation (1deg for first, -1deg for second), visible 2px border in charred wood, inset box-shadow for depth, photo with vignette (`box-shadow: inset 0 0 40px rgba(30,17,8,0.4)`), Arvo division name, Source Serif 4 description, tactile button (darkens + translateY(2px) on hover). IC links to `../../industrial-construction/rugged/home.html`, MB links to `../../metal-buildings/rugged/home.html`
- Charred-wood (#1E1108) dark footer, contact details stacked vertically in Source Serif 4, faded red "Call Us" link
- Scroll: opacity-only fade-in via IntersectionObserver (no translation)
- Responsive: rotations removed on mobile, hero photo loses rotation, cards lose rotation, full-width stacked
- No nav bar
- Page title: `Bell Metal Buildings | Corporate | Grit`

- [ ] **Step 3: Open in browser and verify**

Open `corporate/rugged/index.html` in browser. Verify:
- Paper texture background visible, faint blueprint grid at angle
- Hero photo is warm-tinted, slightly rotated, torn-edge bottom
- Stamped-label text overlay on hero
- Division cards look like pinned documents with rotation and depth
- Photo vignettes visible
- Buttons darken and press on hover
- Dark footer with stacked details
- Resize to mobile: rotations gone, clean stacked layout

- [ ] **Step 4: Commit**

```bash
git add corporate/rugged/index.html
git commit -m "feat: add Grit corporate landing page"
```

---

### Task 4: Industrial Construction -- Forge (3 pages)

**Files:**
- Create: `industrial-construction/bold/home.html`
- Create: `industrial-construction/bold/services.html`
- Create: `industrial-construction/bold/about.html`

**Spec reference:** Style Definitions > Forge, Page-by-Page Design > Industrial Construction (Home/Services/About) > Forge, Technical Requirements (nav, forms, maps, accordion, scroll gallery)

- [ ] **Step 1: Create directory**

```bash
mkdir -p industrial-construction/bold
```

- [ ] **Step 2: Build home.html**

Create `industrial-construction/bold/home.html` with:
- Forge tokens, fonts, noise grain, diagonal orange stripe
- Nav bar: Forge-styled (black background, Bebas Neue links, orange hover underline). Brand link to `../../corporate/bold/index.html`. Links to `home.html`, `services.html`, `about.html`
- Full-viewport hero: dark still image background (Unsplash construction photo), "WE BUILD INDUSTRIAL" in Bebas Neue at `clamp(4rem, 8vw, 10rem)` stacked two lines
- Three-stat counter strip: "25+" years / "500+" projects / "2M+" sq ft. Orange text on black, numbers at `clamp(2rem, 5vw, 5rem)` in IBM Plex Mono. Use IntersectionObserver to trigger count-up animation when visible
- Featured Projects: three images in a row, clip-pathed into parallelograms (`clip-path: polygon(15% 0, 100% 0, 85% 100%, 0 100%)`), overlay with project name on hover
- CTA banner: full-width orange background, "GET A QUOTE" in Bebas Neue black text, links to `about.html`
- Scroll reveal animations, responsive breakpoints
- Page title: `Bell Metal Buildings | Industrial Construction - Home | Forge`

- [ ] **Step 3: Open home.html and verify**

Verify hero, stats counter animation, parallelogram images, CTA link, nav links, mobile stacking.

- [ ] **Step 4: Build services.html**

Create `industrial-construction/bold/services.html` with:
- Same Forge chrome (tokens, fonts, grain, stripe, nav)
- "WHAT WE BUILD" headline with orange diagonal accent element
- Services as vertical full-width rows. Each row: service name large left-aligned in Bebas Neue, one-line description right-aligned in IBM Plex Mono. Clicking a row toggles an accordion panel (300ms ease slide) revealing detail text + photo. Only one panel open at a time. Services: Steel Erection, Concrete Foundations, Industrial Facilities, Site Development, Structural Retrofits
- Accordion JS: click handler toggles `.active` class, `max-height` animation, closes other panels
- Horizontal-scroll photo gallery strip: `overflow-x: auto`, `scroll-snap-type: x mandatory`, each image has hard orange shadow border, `scroll-snap-align: start`
- CTA linking to `about.html`
- Responsive: accordion full-width on all sizes, gallery becomes vertical stack on mobile

- [ ] **Step 5: Open services.html and verify**

Verify accordion opens/closes correctly (one at a time), gallery scrolls with snap, CTA links work, mobile layout.

- [ ] **Step 6: Build about.html**

Create `industrial-construction/bold/about.html` with:
- Same Forge chrome
- Split layout via diagonal clip-path: left half dark background (#0D0D0D) with company story in short paragraphs (IBM Plex Mono body text), timeline of milestones (orange dots connected by vertical line, years and events). Right half lighter charcoal (#2A2A2A) with contact form: fields have bottom-border-only in orange, Bebas Neue labels, "SEND MESSAGE" submit button
- Contact form JS (prevent default, show confirmation)
- Google Maps iframe below with dark-mode filter (`filter: invert(0.9) hue-rotate(180deg) saturate(0.3)`)
- Business hours in IBM Plex Mono tabular layout
- Responsive: diagonal split becomes stacked sections, form below story, map full-width

- [ ] **Step 7: Open about.html and verify**

Verify diagonal split, form submission shows confirmation, map has dark filter, hours table readable, mobile stacking.

- [ ] **Step 8: Commit**

```bash
git add industrial-construction/bold/
git commit -m "feat: add Forge industrial construction site (home, services, about)"
```

---

### Task 5: Industrial Construction -- Precision (3 pages)

**Files:**
- Create: `industrial-construction/clean/home.html`
- Create: `industrial-construction/clean/services.html`
- Create: `industrial-construction/clean/about.html`

**Spec reference:** Style Definitions > Precision, Page-by-Page Design > Industrial Construction (Home/Services/About) > Precision, Technical Requirements

- [ ] **Step 1: Create directory**

```bash
mkdir -p industrial-construction/clean
```

- [ ] **Step 2: Build home.html**

Create `industrial-construction/clean/home.html` with:
- Precision tokens, fonts, brass vertical margin line
- Nav bar: Precision-styled (white background, Playfair Display brand, DM Sans links, brass underline on hover/active). Brand link to `../../corporate/clean/index.html`
- Asymmetric split hero: 60% desaturated construction photo, 40% navy panel with Playfair headline "Industrial Construction Services" and brass-outlined "Request a Consultation" button linking to `about.html`
- 3-column capabilities grid on white: each column has brass 2px top-border, short Playfair heading (Structural Steel, Concrete & Foundations, Facility Construction), DM Sans body paragraph
- Testimonial section: navy background, single large quote in italic Playfair Display, client name and company in DM Sans small-caps, decorative brass quotation marks
- 2x2 featured work grid: project photos, slight zoom on hover (`transform: scale(1.03)`, overflow hidden), thin brass border appearing on hover
- Scroll fade-in animations
- Responsive: hero stacks, grid becomes single column, work grid becomes 2x1 then 1x1

- [ ] **Step 3: Open home.html and verify**

Verify asymmetric hero, brass accents, capabilities grid, testimonial, work grid hover effects, brass margin line, mobile.

- [ ] **Step 4: Build services.html**

Create `industrial-construction/clean/services.html` with:
- Same Precision chrome
- Centered "Our Services" headline in Playfair with thin brass rules above and below
- Alternating service blocks with 6rem vertical spacing: odd rows have image left (55% width) / text right, even rows flip. Each block: desaturated service photo, Playfair title, DM Sans paragraph, brass "Learn More" link with draw-underline hover. Services: Structural Steel Erection, Concrete & Foundation Work, Industrial Facility Construction, Site Preparation & Development, Structural Assessment & Retrofit
- CTA block at bottom: navy background, white Playfair text "Discuss Your Project", brass-outlined button linking to `about.html`
- Responsive: alternating layout becomes stacked (image above text) on tablet/mobile

- [ ] **Step 5: Open services.html and verify**

Verify alternating layout, brass underline animations, spacing, CTA, mobile stacking.

- [ ] **Step 6: Build about.html**

Create `industrial-construction/clean/about.html` with:
- Same Precision chrome
- Company story in narrow centered column (max-width 55ch), DM Sans body, large Playfair pull-quote breaking the flow at midpoint (indented, italic, brass left border)
- Team section: row of small circular desaturated photos (`border-radius: 50%`, `filter: saturate(0.7)`), names in DM Sans below each
- Contact section on light gray (#F2F1EE): form with thin bottom-border fields that turn brass on focus. Map in brass-bordered iframe frame. Address and business hours in two columns beside map, DM Sans, thin brass dividers
- Contact form JS
- Responsive: team photos wrap to 2 rows, form/map/info stack vertically

- [ ] **Step 7: Open about.html and verify**

Verify narrow story column, pull-quote, circular team photos, form focus states, map brass border, info layout, mobile.

- [ ] **Step 8: Commit**

```bash
git add industrial-construction/clean/
git commit -m "feat: add Precision industrial construction site (home, services, about)"
```

---

### Task 6: Industrial Construction -- Grit (3 pages)

**Files:**
- Create: `industrial-construction/rugged/home.html`
- Create: `industrial-construction/rugged/services.html`
- Create: `industrial-construction/rugged/about.html`

**Spec reference:** Style Definitions > Grit, Page-by-Page Design > Industrial Construction (Home/Services/About) > Grit, Technical Requirements

- [ ] **Step 1: Create directory**

```bash
mkdir -p industrial-construction/rugged
```

- [ ] **Step 2: Build home.html**

Create `industrial-construction/rugged/home.html` with:
- Grit tokens, fonts, paper grain background, blueprint grid
- Nav bar: Grit-styled (paper background, Arvo brand, Source Serif 4 links, faded red underline on active). Brand link to `../../corporate/rugged/index.html`
- Wide warm-filtered hero photo, `transform: rotate(-1deg)`, torn-edge bottom clip-path. "Industrial Construction Services" in Arvo stamped onto faded red (#A63D2F) rectangular patch overlaying image bottom-left
- "Our Work" section: three photos arranged scattered at slight rotations (`rotate(2deg)`, `rotate(-1.5deg)`, `rotate(1deg)`), overlapping edges via negative margins, each with Source Serif 4 italic caption underneath. Photos have vignette inset shadow
- Mission statement: large Arvo text on paper background, faded red drop-cap via `::first-letter`
- CTA: stamped-label button (`border: 2px solid var(--grit-red)`, slight rotation `transform: rotate(-1deg)`, "Request a Quote"), links to `about.html`, press-inward hover
- Opacity-only scroll reveals
- Responsive: hero loses rotation, photos stack without rotation/overlap, button loses rotation

- [ ] **Step 3: Open home.html and verify**

Verify paper/blueprint background, hero rotation + torn edge, scattered photos, drop-cap, stamped button, mobile cleanup.

- [ ] **Step 4: Build services.html**

Create `industrial-construction/rugged/services.html` with:
- Same Grit chrome
- "What We Do" headline in Arvo with thick faded-red 4px underline
- Services as stacked "document cards": each card has slight rotation (alternating 1deg/-1deg), visible 2px border in charred wood, inset box-shadow for pinned-paper depth. Each card contains: bold Arvo service name, Source Serif 4 description paragraph, small photo with torn-edge clip-path and vignette. Services: Steel Erection, Concrete & Foundation, Industrial Facilities, Site Development, Structural Retrofits
- Dotted rules between cards (`border-top: 2px dotted var(--grit-red)`) like perforated paper
- Filmstrip-style horizontal photo gallery at bottom: images in a row with oxidized-green 3px borders, `overflow-x: auto` with `scroll-snap-type: x mandatory`
- Responsive: cards lose rotation, gallery becomes vertical stack on mobile

- [ ] **Step 5: Open services.html and verify**

Verify document cards with rotation/depth, dotted rules, filmstrip gallery snapping, mobile stacking.

- [ ] **Step 6: Build about.html**

Create `industrial-construction/rugged/about.html` with:
- Same Grit chrome
- Company story as left-aligned letter: Source Serif 4, faded red drop-cap on opening paragraph, reads like a personal narrative
- Hand-drawn-style timeline: horizontal layout with slightly wobbly connecting line (SVG path with imperfect curves or CSS borders with `border-radius` variations), milestone dots, year labels in Arvo, event descriptions in Source Serif 4
- Contact form on darker parchment (#D9D0C2): visible 2px borders on fields, heavy charred-wood "Send Message" button with tactile press hover
- Map with torn-edge top border clip-path, warm filter (`filter: sepia(0.3) saturate(0.8)`)
- Business hours in small table with hand-drawn-border effect (slightly uneven `border-image` or thick borders), faded red header row
- Contact form JS
- Responsive: timeline becomes vertical, form/map stack, table full-width

- [ ] **Step 7: Open about.html and verify**

Verify letter-style story, wobbly timeline, form on darker parchment, map warm filter, hours table, mobile layout.

- [ ] **Step 8: Commit**

```bash
git add industrial-construction/rugged/
git commit -m "feat: add Grit industrial construction site (home, services, about)"
```

---

### Task 7: Metal Buildings -- Forge (3 pages)

**Files:**
- Create: `metal-buildings/bold/home.html`
- Create: `metal-buildings/bold/services.html`
- Create: `metal-buildings/bold/about.html`

**Spec reference:** Style Definitions > Forge, Page-by-Page Design > Metal Buildings (Home/Services/About) > Forge, Technical Requirements

- [ ] **Step 1: Create directory**

```bash
mkdir -p metal-buildings/bold
```

- [ ] **Step 2: Build home.html**

Create `metal-buildings/bold/home.html` with:
- Forge tokens, fonts, noise grain, diagonal orange stripe
- Nav bar: Forge-styled. Brand link to `../../corporate/bold/index.html`. Links to `home.html`, `services.html`, `about.html`
- Full-viewport hero: wireframe SVG metal building illustration in orange strokes on black background (inline SVG depicting a simple A-frame/gable metal building skeleton using `stroke: var(--forge-orange)`, `stroke-width: 2`, `fill: none`). "METAL BUILDINGS" in Bebas Neue cutting through the center of the SVG
- Three product categories as full-width horizontal bands: each band has background construction photo with heavy dark overlay, category name (Commercial, Agricultural, Residential) at 4rem in Bebas Neue, one-line description in IBM Plex Mono, hard-shadow orange arrow link pointing to `services.html`
- Stats strip: "10,000+" sq ft average / "750+" tons fabricated / "12" states served. Orange text on steel-gray, numbers in IBM Plex Mono. Use IntersectionObserver to trigger count-up animation when visible (same pattern as IC Home stats)
- CTA: "CONFIGURE YOUR BUILDING" wide orange button, IBM Plex Mono text, links to `about.html`
- Scroll reveals, responsive breakpoints

- [ ] **Step 3: Open home.html and verify**

Verify SVG wireframe building, product bands with dark overlays, stats strip, CTA, nav links, mobile.

- [ ] **Step 4: Build services.html**

Create `metal-buildings/bold/services.html` with:
- Same Forge chrome
- "WHAT WE MANUFACTURE" headline
- 2-column masonry-style grid of tall black (#0D0D0D) cards: each card has service name oriented vertically along left edge (Bebas Neue, `writing-mode: vertical-rl`, `transform: rotate(180deg)`), specification list (dimensions, materials, timeline) in IBM Plex Mono like a data sheet, small image at bottom with diagonal clip-path crop. Services: Pre-Engineered Buildings, Steel Warehouses, Agricultural Buildings, Workshop/Garage Structures, Custom Metal Fabrication
- Orange horizontal rules spanning full width between grid rows
- "Process" section: four steps (Design, Fabricate, Deliver, Erect) as horizontal pipeline. Orange connecting lines between steps, step numbers at `clamp(3rem, 5vw, 6rem)` in Bebas Neue, step name and short description below each
- Responsive: masonry becomes single column, pipeline becomes vertical

- [ ] **Step 5: Open services.html and verify**

Verify masonry grid, vertical text on cards, spec lists, orange rules, pipeline layout, mobile stacking.

- [ ] **Step 6: Build about.html**

Create `metal-buildings/bold/about.html` with:
- Same Forge chrome
- Full-width photo banner with extreme dark overlay (`background: linear-gradient(rgba(13,13,13,0.85), rgba(13,13,13,0.85)), url(...)`), "LET'S BUILD" in Bebas Neue centered
- Two-column story section: left column is company text in IBM Plex Mono; right column is vertical stack of square photos with hard orange 4px borders, alternating flush-left and flush-right alignment via `margin-left: auto` / `margin-right: auto`
- Contact form on solid black: steel-gray (#3A3A3A) outlined fields that glow orange on focus (`border-color: var(--forge-orange)`, `box-shadow: 0 0 8px rgba(255,77,0,0.3)`). "SEND MESSAGE" button in Bebas Neue
- Technical-drawing title block footer: grid of bordered cells, IBM Plex Mono labels ("Phone:", "Email:", "Address:", "Hours:"), Bebas Neue values
- Contact form JS
- Responsive: two-column story stacks, photos center, title block becomes stacked

- [ ] **Step 7: Open about.html and verify**

Verify photo banner, two-column layout, form glow effects, title block footer, mobile stacking.

- [ ] **Step 8: Commit**

```bash
git add metal-buildings/bold/
git commit -m "feat: add Forge metal buildings site (home, services, about)"
```

---

### Task 8: Metal Buildings -- Precision (3 pages)

**Files:**
- Create: `metal-buildings/clean/home.html`
- Create: `metal-buildings/clean/services.html`
- Create: `metal-buildings/clean/about.html`

**Spec reference:** Style Definitions > Precision, Page-by-Page Design > Metal Buildings (Home/Services/About) > Precision, Technical Requirements

- [ ] **Step 1: Create directory**

```bash
mkdir -p metal-buildings/clean
```

- [ ] **Step 2: Build home.html**

Create `metal-buildings/clean/home.html` with:
- Precision tokens, fonts, brass vertical margin line
- Nav bar: Precision-styled. Brand link to `../../corporate/clean/index.html`
- Panoramic metal building photo spanning full width at 70vh, desaturated, navy gradient overlay from bottom (`background: linear-gradient(transparent 40%, var(--precision-navy))`). "Metal Building Solutions" in Playfair Display rising from the gradient
- "Building Types" section on white: 3-column card layout. Each card has tall desaturated photo, brass 2px top-rule, building type in Playfair (Commercial, Agricultural, Workshop), brief DM Sans description, dimensions range (e.g., "2,000 - 50,000 sq ft")
- "Our Process" section on light gray (#F2F1EE) band: four steps horizontally, thin brass connecting lines between them, step number in Playfair (oversized, brass-colored), step name and DM Sans description below
- Testimonial: navy background, client quote in italic Playfair, brass quotation marks as large decorative elements (`font-size: 4rem`, `color: var(--precision-brass)`, `opacity: 0.5`)
- Scroll fade-in, responsive breakpoints

- [ ] **Step 3: Open home.html and verify**

Verify panoramic hero with gradient, building type cards, process steps with brass lines, testimonial, mobile stacking.

- [ ] **Step 4: Build services.html**

Create `metal-buildings/clean/services.html` with:
- Same Precision chrome
- Centered Playfair headline "Our Metal Building Services" with brass rules above and below
- Single-column editorial flow: each service gets a wide section with large photo at 80% width (alternating `margin-left: auto` and `margin-right: auto`), overlapped by white content card (negative margin creating 20% overlap, `box-shadow: 0 2px 20px rgba(0,0,0,0.08)`) containing Playfair service name, small specs table (DM Sans), description paragraph. Services: Pre-Engineered Steel Buildings, Commercial Warehouses, Agricultural Structures, Workshop & Garage Buildings, Custom Metal Solutions
- Comparison table at bottom: building types vs features matrix. Brass header row (`background: var(--precision-brass)`, white text), thin 1px cell borders, Playfair column headers, DM Sans data cells
- Responsive: photos go full-width, content cards stack below (no overlap), table scrolls horizontally on mobile

- [ ] **Step 5: Open services.html and verify**

Verify editorial flow, photo/card overlap effect, comparison table, brass header, mobile handling.

- [ ] **Step 6: Build about.html**

Create `metal-buildings/clean/about.html` with:
- Same Precision chrome
- "Why Choose Us" section: three value props in a row, each with oversized Playfair number (01, 02, 03) in brass color, heading in Playfair, DM Sans paragraph below
- Company story in narrow centered column (max-width 55ch), Playfair pull-quote breaking text (italic, brass left border)
- Two-column contact on light gray: left column has phone/email/address with brass accents plus map in brass-bordered frame; right column has contact form with thin bottom-border fields, brass focus state, navy "Submit Inquiry" button with brass 1px border
- Contact form JS
- Responsive: value props stack, two-column contact stacks (map on top, form below)

- [ ] **Step 7: Open about.html and verify**

Verify value prop numbers, story pull-quote, two-column contact, map brass border, form focus states, mobile stacking.

- [ ] **Step 8: Commit**

```bash
git add metal-buildings/clean/
git commit -m "feat: add Precision metal buildings site (home, services, about)"
```

---

### Task 9: Metal Buildings -- Grit (3 pages)

**Files:**
- Create: `metal-buildings/rugged/home.html`
- Create: `metal-buildings/rugged/services.html`
- Create: `metal-buildings/rugged/about.html`

**Spec reference:** Style Definitions > Grit, Page-by-Page Design > Metal Buildings (Home/Services/About) > Grit, Technical Requirements

- [ ] **Step 1: Create directory**

```bash
mkdir -p metal-buildings/rugged
```

- [ ] **Step 2: Build home.html**

Create `metal-buildings/rugged/home.html` with:
- Grit tokens, fonts, paper grain, blueprint grid
- Nav bar: Grit-styled. Brand link to `../../corporate/rugged/index.html`
- Wide warm-filtered rural metal building photo, rotated, torn-edge bottom. "Metal Buildings" in Arvo on oxidized-green (#4A6741) rectangular patch (NOT red -- differentiating from Industrial Construction which uses red)
- "What We Build" section: three polaroid-style product photos. Each: white background, `padding: 8px 8px 32px`, slight rotation (alternating 2deg/-1.5deg/1deg), drop shadow, Source Serif 4 italic caption underneath. Photos show: commercial building, agricultural barn, workshop
- "From Our Yard" section: single large photo with heavy vignette, framed treatment (visible border, inset shadow like a print), accompanied by short narrative paragraph about craftsmanship in Source Serif 4
- CTA: "Get a Quote on Your Building" stamped-label button in oxidized green (`border: 2px solid var(--grit-green)`, slight rotation), links to `about.html`, press-inward hover
- Opacity-only scroll reveals
- Responsive: hero loses rotation, polaroids stack without rotation, CTA loses rotation

- [ ] **Step 3: Open home.html and verify**

Verify green (not red) accent on hero, polaroid photos with rotation, framed yard photo, green CTA, mobile cleanup.

- [ ] **Step 4: Build services.html**

Create `metal-buildings/rugged/services.html` with:
- Same Grit chrome
- "What We Offer" in Arvo with oxidized-green 4px underline (NOT red -- this site uses green accent)
- Catalog-style service cards: each resembles a trade catalog product listing. Layout: Arvo service name at top, specifications sidebar on the right (dimensions, materials, lead time) with dotted 1px borders like a data label, torn-edge photo on the left with vignette, Source Serif 4 description paragraph. Services: Pre-Engineered Buildings, Steel Warehouses, Barns & Agricultural, Workshop & Garages, Custom Fabrication
- Decorative dash-pattern rules between entries (`border-top: 2px dashed var(--grit-green)`)
- Horizontal-scroll photo gallery between services and process section: images in a row with oxidized-green 3px borders, `overflow-x: auto` with `scroll-snap-type: x mandatory` (same pattern as IC Grit services filmstrip)
- "How It Works" section: four steps as numbered circles on a hand-drawn-style connecting path. SVG path with slightly imperfect curves (`cubic-bezier` points that aren't perfectly smooth), numbered circles in Arvo, step descriptions in Source Serif 4 below each
- Responsive: catalog cards stack (sidebar below content), gallery becomes vertical stack, SVG path becomes vertical on mobile

- [ ] **Step 5: Open services.html and verify**

Verify catalog card layout with specs sidebar, green accent throughout, dash rules, hand-drawn SVG path, mobile stacking.

- [ ] **Step 6: Build about.html**

Create `metal-buildings/rugged/about.html` with:
- Same Grit chrome
- Wide warm photo of team/facility, polaroid treatment (white border, padding, slight rotation, drop shadow)
- Founder's letter-style story: first-person narrative tone ("When my father started this company..."), Source Serif 4, faded red drop-cap on opening paragraph. Left-aligned, comfortable reading width
- "Our Promise" section: three short commitments in Arvo bold, each with oxidized-green bullet (`list-style-type: disc`, `color: var(--grit-green)`)
- Contact form on darker parchment (#D9D0C2): visible 2px borders on fields, heavy charred-wood (#1E1108) "Send Message" button, tactile press hover
- Map with torn-edge top border clip-path, warm filter
- Blueprint grid pattern fading out in footer (footer `::after` with grid pattern and `opacity` gradient to transparent)
- Contact form JS
- Responsive: polaroid loses rotation, form/map stack, promises stack

- [ ] **Step 7: Open about.html and verify**

Verify polaroid team photo, first-person story, green bullets on promises, form on darker parchment, blueprint fade in footer, mobile layout.

- [ ] **Step 8: Commit**

```bash
git add metal-buildings/rugged/
git commit -m "feat: add Grit metal buildings site (home, services, about)"
```

---

## Execution Notes

- All 9 tasks are fully independent -- no shared code, no dependencies between tasks
- **Git locking:** when running tasks in parallel, do NOT include git commit steps in the subagent tasks. Instead, collect all completed files and commit them in a single pass from the orchestrator after all tasks finish. This avoids git lock conflicts.
- Subagents should reference the spec document and this plan's Shared Patterns Reference section for exact CSS/JS patterns
- Each HTML file should be 300-600 lines (inline CSS + HTML + JS). If a file exceeds 800 lines, look for opportunities to simplify
- Use `@frontend-design:frontend-design` skill guidance when implementing each page -- commit to the aesthetic, avoid generic patterns
- Test each page by opening the HTML file directly in a browser. Check desktop and mobile (resize window or use browser dev tools responsive mode)
- Verification steps should include checking the `<title>` tag matches the spec format

### Image Sourcing Per Task

Use Unsplash URLs (e.g., `https://images.unsplash.com/photo-XXXXX?w=1200&q=80`). Search terms by task:

| Task | Images Needed | Search Terms |
|---|---|---|
| 1-3 (Corporate) | Hero (1), division card backgrounds (2) | "industrial construction site aerial", "steel structure building", "metal building warehouse" |
| 4 (IC Forge) | Hero (1), 3 featured projects, services photos (5), gallery (4-6), about photos (3), team | "structural steel erection", "commercial building construction", "concrete foundation pour", "industrial facility interior", "construction site progress" |
| 5 (IC Precision) | Hero (1), 2x2 work grid (4), service alternating photos (5), team circular (4) | "commercial building construction", "factory construction", "industrial facility", "construction workers team" |
| 6 (IC Grit) | Hero (1), scattered work photos (3), services card photos (5), filmstrip gallery (4-6) | "construction site candid", "steel workers", "building foundation", "rural construction site" |
| 7 (MB Forge) | Product bands (3), stats background, services card photos (5), about photo stack (4) | "metal building warehouse", "pre-engineered steel building", "agricultural barn metal", "steel workshop building" |
| 8 (MB Precision) | Panoramic hero (1), building type cards (3), services editorial photos (5), team | "metal building exterior", "commercial warehouse", "steel structure", "agricultural metal building" |
| 9 (MB Grit) | Hero rural (1), polaroid products (3), yard photo (1), catalog photos (5), team/facility (1) | "rural metal building", "farm building construction", "workshop exterior", "barn construction" |
