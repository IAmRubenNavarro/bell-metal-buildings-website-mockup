# Bell Industrial 5-Direction Mockups Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 6 self-contained static HTML files (1 index landing page + 5 distinct home page direction mockups) for Bell Industrial Construction's metal buildings client review.

**Architecture:** Each direction is one self-contained HTML5 file with inline `<style>` and `<script>` blocks. No shared CSS, no shared JS, no build step. Direction 5 (Configurator-First) carries ~150 lines of vanilla JS for state management, SVG preview, and ZIP-based wind-zone lookup. All other directions are HTML+CSS plus a small scroll-reveal observer.

**Tech Stack:** HTML5 · CSS3 (custom properties, grid, flexbox, clip-path, clamp, IntersectionObserver) · vanilla ES2020+ JavaScript inline · Google Fonts CDN · Unsplash/Pexels image URLs.

**Spec:** [docs/superpowers/specs/2026-04-30-bell-industrial-5-direction-mockups-design.md](../specs/2026-04-30-bell-industrial-5-direction-mockups-design.md)

---

## Testing Approach

Per spec, **no automated test framework**. Static HTML mockups have no testable logic except the configurator's pure-logic functions (~30 lines: `lookupWindZone`, `useCaseDefaults`, derived state). Adding Jest/Vitest just for that contradicts the no-build approach. Verification is browser-based smoke testing per the spec's Verification Approach checklist.

**Optional follow-on (deferred):** if unit tests on the configurator's pure-logic functions are wanted, they can be added later as a single `configurator/test.html` page using a ~30-line in-page assertion helper. Not in this plan; can be added as a small follow-up task.

## Security Note

All user-supplied input in the configurator (ZIP, slider values, dropdown selections) is handled with safe DOM construction (`textContent`, `createElement`, `append`) rather than `innerHTML`. This avoids XSS class issues even though the inputs are sanitized at the source (parseInt for sliders, regex strip for ZIP, restricted enum for dropdown).

## File Structure

```
bell_industrial_website_mockup/
├── index.html                  # Created in Task 6
├── toro/home.html              # Created in Task 1
├── editorial/home.html         # Created in Task 2
├── technical/home.html         # Created in Task 3
├── heritage/home.html          # Created in Task 4
└── configurator/home.html      # Created in Task 5
```

**Parallelism:** Tasks 1–5 have zero file dependencies on each other and can run in parallel (suitable for subagent dispatch). Task 6 (index) requires Tasks 1–5 to be complete (it links to their files). Task 7 (final verification) requires Task 6.

## Shared Patterns Reference

Every direction file uses these patterns. Do NOT extract to shared files — each direction inlines them so the directions can evolve independently.

### HTML5 boilerplate (all 5 direction files)

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Bell Industrial Construction | [Direction Name]</title>
	<meta name="description" content="Florida-engineered metal buildings. 1,400+ buildings across 14 west coast counties since 2006.">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link rel="stylesheet" href="[per-direction Google Fonts URL]">
	<style>
		/* All CSS inline here */
	</style>
</head>
<body>
	<a href="#main-content" class="skip-link">Skip to content</a>
	<header><!-- nav, persistent phone --></header>
	<main id="main-content">
		<section><!-- hero --></section>
		<section><!-- building types --></section>
		<section><!-- process --></section>
		<section><!-- social proof --></section>
		<section><!-- configurator entry (or actual configurator for direction 5) --></section>
		<section><!-- quote CTA + form --></section>
	</main>
	<footer><!-- contact, service area, trust line --></footer>
	<script>
		/* All JS inline here */
	</script>
</body>
</html>
```

### Universal CSS reset + accessibility (inline at top of every direction's `<style>`)

```css
*, *::before, *::after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

html {
	scroll-behavior: smooth;
	-webkit-text-size-adjust: 100%;
}

body {
	min-height: 100vh;
	line-height: 1.6;
	-webkit-font-smoothing: antialiased;
}

img {
	max-width: 100%;
	height: auto;
	display: block;
}

button, input, select, textarea {
	font: inherit;
	color: inherit;
}

.skip-link {
	position: absolute;
	top: -100%;
	left: 0;
	padding: 0.75rem 1rem;
	background: var(--bg-primary, #fff);
	color: var(--text-primary, #000);
	text-decoration: none;
	font-weight: 600;
	z-index: 9999;
	transition: top 0.2s;
}
.skip-link:focus {
	top: 0;
	outline: 2px solid currentColor;
	outline-offset: 2px;
}

.sr-only {
	position: absolute;
	width: 1px;
	height: 1px;
	padding: 0;
	margin: -1px;
	overflow: hidden;
	clip: rect(0, 0, 0, 0);
	white-space: nowrap;
	border: 0;
}

@media (prefers-reduced-motion: reduce) {
	*, *::before, *::after {
		animation-duration: 0.01ms !important;
		transition-duration: 0.01ms !important;
	}
}
```

Per-direction `:focus-visible` styles are added in Step 3 of each direction's task.

### Responsive breakpoint structure

```css
/* Mobile-first base styles */

@media (min-width: 768px) {
	/* tablet-up overrides */
}

@media (min-width: 1024px) {
	/* desktop-up overrides */
}
```

Tap-target floor: `min-height: 44px; min-width: 44px;` on every interactive element.

### Scroll reveal observer (Directions 1–4)

```js
(function () {
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add('revealed');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

	document.querySelectorAll('[data-reveal]').forEach((el) => {
		observer.observe(el);
	});
})();
```

Each direction defines its own reveal style.

### Form submit handler pattern (all 5 directions, Directions 1–4 use this verbatim)

```js
(function () {
	const form = document.querySelector('form[data-quote-form]');
	if (!form) return;

	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const confirmation = document.createElement('div');
		confirmation.className = 'quote-confirmation';
		confirmation.setAttribute('role', 'status');
		confirmation.setAttribute('aria-live', 'polite');
		confirmation.textContent = "Thanks. Bell Industrial will return a sealed engineering quote within 5 business days.";
		form.replaceWith(confirmation);
	});
})();
```

`textContent` (not `innerHTML`) for safe content insertion.

### Hero photo overlay pattern

```css
.hero {
	position: relative;
	background-image:
		linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
		url("https://images.unsplash.com/photo-...");
	background-size: cover;
	background-position: center;
}
```

Adjust the alpha (0.4–0.6) to taste depending on photo brightness.

### Universal company facts (used in every direction)

| Field | Value |
|---|---|
| Company | Bell Industrial Construction |
| Address | 4820 US Highway 92 East, Lakeland, FL 33801 |
| Phone | (863) 555-0142 |
| Email | build@bellindustrialconstruction.com |
| Hours | Mon–Fri 7am–6pm |
| Founded | 2006 |
| Project count | 1,400+ buildings since 2006 |
| Service area | Citrus · Hernando · Pasco · Pinellas · Hillsborough · Polk · Manatee · Sarasota · Hardee · DeSoto · Charlotte · Lee · Collier · Hendry |
| Trust line | Florida GC License # CGC-XXXXXX · Member NFBA · BBB A+ Rated · Florida Product Approved Components |

---

## Task 1: Build Direction 1 — Toro Homage (Elevated)

**Files:**
- Create: `toro/home.html`

**Spec sections:** `## The Five Directions → Direction 1`, `## Section-by-Section Content Plan` (Direction 1 column for each section).

**Direction-specific tokens:**

```css
:root {
	--navy: #0A1F3D;
	--red: #D8362F;
	--charcoal: #2A2A2A;
	--white: #FFFFFF;
	--cool-gray: #E8EAEE;
	--text-primary: var(--navy);
	--bg-primary: var(--white);
	--bg-section: var(--cool-gray);
	--bg-dark: var(--navy);
	--accent: var(--red);
	--font-display: 'Manrope', system-ui, -apple-system, sans-serif;
	--font-body: 'Inter', system-ui, -apple-system, sans-serif;
}

:focus-visible {
	outline: 2px solid var(--red);
	outline-offset: 3px;
}
```

**Google Fonts URL:** `https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Inter:wght@400;500;600&display=swap`

**Hero photo (Unsplash starter — verify URL renders, substitute search "industrial steel building" if 404):** `https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1920&q=80`

### Steps

- [ ] **Step 1: Create file with HTML5 scaffold + Google Fonts**

Create `toro/home.html` with the universal HTML5 boilerplate, substituting `<title>Bell Industrial Construction | Florida-Engineered Steel Buildings</title>` and the Manrope + Inter Google Fonts URL above.

- [ ] **Step 2: Add universal CSS reset + accessibility patterns + direction tokens**

Inside `<style>`, paste the Universal CSS reset block from Shared Patterns. Then add Direction 1's `:focus-visible` rule and the direction tokens above.

- [ ] **Step 3: Add base typography and body styles**

```css
body {
	font-family: var(--font-body);
	color: var(--text-primary);
	background: var(--bg-primary);
}

h1, h2, h3 {
	font-family: var(--font-display);
	font-weight: 800;
	line-height: 1.1;
	letter-spacing: -0.02em;
}

h1 { font-size: clamp(2.5rem, 6vw, 5rem); }
h2 { font-size: clamp(1.75rem, 4vw, 3rem); }
h3 { font-size: clamp(1.25rem, 2.5vw, 1.75rem); }

p { font-size: 1rem; line-height: 1.7; }

a { color: var(--accent); text-decoration: none; }
a:hover { text-decoration: underline; }

.btn-primary {
	display: inline-block;
	background: var(--red);
	color: var(--white);
	padding: 0.875rem 1.75rem;
	font-family: var(--font-display);
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	min-height: 44px;
	border: none;
	cursor: pointer;
	transition: background 0.15s, transform 0.15s;
}
.btn-primary:hover { background: #b82822; transform: translateY(-2px); }
```

- [ ] **Step 4: Build sticky header with persistent phone**

```html
<header class="site-header">
	<div class="header-inner">
		<a href="#" class="brand">Bell Industrial</a>
		<nav aria-label="Primary">
			<a href="#configurator-entry">Configure</a>
			<a href="#quote-cta">Get a Quote</a>
		</nav>
		<a href="tel:8635550142" class="phone-link">(863) 555-0142</a>
	</div>
</header>
```

```css
.site-header {
	position: sticky;
	top: 0;
	z-index: 100;
	background: var(--navy);
	color: var(--white);
}
.header-inner {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 2rem;
	padding: 1rem 2rem;
	max-width: 1400px;
	margin: 0 auto;
}
.brand { color: var(--white); font-family: var(--font-display); font-weight: 800; font-size: 1.25rem; }
.site-header nav { display: flex; gap: 1.5rem; }
.site-header nav a { color: var(--white); font-weight: 500; }
.phone-link { color: var(--red); font-weight: 700; font-family: var(--font-display); }
@media (max-width: 767px) { .site-header nav { display: none; } }
```

- [ ] **Step 5: Build hero section**

```html
<section class="hero">
	<div class="hero-content">
		<h1>Florida-Engineered Steel Buildings, Delivered.</h1>
		<p class="hero-subhead">1,400+ buildings across 14 counties since 2006. Engineered to FBC, sealed by Florida-licensed engineers, installed by our crews.</p>
		<a href="#quote-cta" class="btn-primary">Get a Quote</a>
	</div>
</section>
```

```css
.hero {
	position: relative;
	min-height: 80vh;
	display: flex;
	align-items: flex-end;
	padding: 2rem;
	background-image:
		linear-gradient(rgba(10, 31, 61, 0.7), rgba(10, 31, 61, 0.55)),
		url("https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1920&q=80");
	background-size: cover;
	background-position: center;
	color: var(--white);
}
.hero-content { max-width: 800px; }
.hero h1 { color: var(--white); }
.hero-subhead { font-size: 1.25rem; margin: 1.5rem 0 2rem; max-width: 600px; }
```

- [ ] **Step 6: Build building types grid (3×2)**

```html
<section class="building-types" data-reveal>
	<div class="container">
		<h2>What we build</h2>
		<div class="types-grid">
			<article class="type-card">
				<img src="https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&q=80" alt="Steel cattle barn at golden hour">
				<div class="type-card-body">
					<h3>Cattle &amp; Equipment Barns</h3>
					<p class="spec-line">40×60 · 14' eave · open or enclosed</p>
					<p class="starter-price">from $28,000</p>
					<p>Built for the equipment, the hay, the herd.</p>
				</div>
			</article>
			<!-- 5 more cards: Equestrian, Commercial Warehouses, Mini-Storage, RV/Boat Storage, Workshops/Garages -->
		</div>
		<p class="grid-disclaimer">Pricing varies by site, wind exposure, and finish package. Sealed engineered drawings included with every quote.</p>
	</div>
</section>
```

Use the 6 categories from spec section "Section 2 of 7 — Building Types Grid". Image URLs (verify each renders, substitute search term if 404):
- Equestrian: `https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80` (search: "horse barn")
- Commercial: `https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=800&q=80` (search: "warehouse exterior")
- Mini-Storage: `https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80` (search: "mini storage")
- RV/Boat: `https://images.unsplash.com/photo-1566977776052-6e61e35ad547?w=800&q=80` (search: "RV storage")
- Workshop: `https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80` (search: "workshop garage")

```css
.container { max-width: 1400px; margin: 0 auto; padding: 4rem 2rem; }
.building-types h2 { margin-bottom: 2.5rem; }
.types-grid {
	display: grid;
	grid-template-columns: 1fr;
	gap: 2rem;
}
@media (min-width: 768px) {
	.types-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
	.types-grid { grid-template-columns: repeat(3, 1fr); }
}
.type-card {
	background: var(--white);
	border: 1px solid var(--cool-gray);
	overflow: hidden;
	position: relative;
	transition: transform 0.2s;
}
.type-card::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 0;
	height: 4px;
	width: 0;
	background: var(--red);
	transition: width 0.3s;
}
.type-card:hover { transform: translateY(-4px); }
.type-card:hover::after { width: 100%; }
.type-card img { width: 100%; aspect-ratio: 16/10; object-fit: cover; }
.type-card-body { padding: 1.5rem; }
.spec-line { font-family: var(--font-display); font-size: 0.875rem; color: var(--charcoal); margin-top: 0.5rem; }
.starter-price { color: var(--red); font-weight: 700; font-size: 1.125rem; margin: 0.5rem 0 1rem; }
.grid-disclaimer { font-size: 0.875rem; color: var(--charcoal); margin-top: 2rem; font-style: italic; }
```

- [ ] **Step 7: Build process section (4 numbered steps)**

```html
<section class="process" data-reveal>
	<div class="container">
		<h2>How we build</h2>
		<ol class="process-steps">
			<li>
				<span class="step-num">01</span>
				<h3>Quote</h3>
				<p>Tell us your use, dimensions, and county. We return a sealed engineering quote within 5 business days.</p>
			</li>
			<li>
				<span class="step-num">02</span>
				<h3>Design</h3>
				<p>Florida-licensed engineers seal site-specific drawings. We handle the FBC permit package.</p>
			</li>
			<li>
				<span class="step-num">03</span>
				<h3>Deliver</h3>
				<p>Pre-fabricated steel arrives on a single truck. Galvalume AZ55 panels standard, marine-grade fasteners on coastal jobs.</p>
			</li>
			<li>
				<span class="step-num">04</span>
				<h3>Install</h3>
				<p>Our Lakeland, Sarasota, and Fort Myers crews install on schedule. Most builds raise in 5–14 days.</p>
			</li>
		</ol>
	</div>
</section>
```

```css
.process { background: var(--bg-section); }
.process-steps {
	list-style: none;
	display: grid;
	gap: 2.5rem;
	margin-top: 2.5rem;
}
@media (min-width: 768px) {
	.process-steps { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
	.process-steps { grid-template-columns: repeat(4, 1fr); }
}
.step-num {
	font-family: var(--font-display);
	font-weight: 800;
	font-size: 4rem;
	color: var(--cool-gray);
	display: block;
	line-height: 1;
}
.process-steps li:first-child .step-num { color: var(--red); }
.process-steps h3 { margin-top: 0.5rem; }
.process-steps p { margin-top: 0.5rem; }
```

- [ ] **Step 8: Build social proof (numbers strip + Mike D. testimonial)**

```html
<section class="numbers-strip">
	<div class="container">
		<div class="numbers-grid">
			<div><strong>1,400+</strong><span>Buildings</span></div>
			<div><strong>20</strong><span>Years</span></div>
			<div><strong>14</strong><span>Counties served</span></div>
			<div><strong>FBC</strong><span>Engineered &amp; sealed</span></div>
		</div>
	</div>
</section>

<section class="testimonial" data-reveal>
	<div class="container">
		<blockquote>
			<p>"My contractor yard outgrew me twice. Started with a 50×80 in 2014. They built me a 100×200 in 2021 and connected the two. Same crew lead both times."</p>
			<footer>
				<strong>Mike D.</strong>
				<span>Site-work contractor, Polk County</span>
			</footer>
		</blockquote>
	</div>
</section>
```

```css
.numbers-strip { background: var(--navy); color: var(--white); padding: 2rem; }
.numbers-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1.5rem;
	text-align: center;
}
@media (min-width: 768px) {
	.numbers-grid { grid-template-columns: repeat(4, 1fr); }
}
.numbers-grid strong {
	font-family: var(--font-display);
	font-weight: 800;
	font-size: 2.5rem;
	color: var(--red);
	display: block;
	line-height: 1;
}
.numbers-grid span { font-size: 0.875rem; opacity: 0.85; margin-top: 0.5rem; display: block; }

.testimonial blockquote {
	max-width: 800px;
	margin: 0 auto;
	border-left: 4px solid var(--red);
	padding: 0.5rem 0 0.5rem 2rem;
}
.testimonial p { font-size: 1.5rem; line-height: 1.5; font-weight: 500; }
.testimonial footer { margin-top: 1.5rem; font-style: normal; }
.testimonial footer strong { display: block; }
.testimonial footer span { color: var(--charcoal); }
```

- [ ] **Step 9: Build configurator entry CTA section**

```html
<section class="configurator-entry" id="configurator-entry" data-reveal>
	<div class="container">
		<div class="configurator-cta">
			<div>
				<h2>Build it on-screen first.</h2>
				<p>Set your dimensions, pick your use, see the building, and get an instant size estimate before you pick up the phone.</p>
				<a href="#" class="btn-primary">Configure &amp; Get Quote</a>
			</div>
			<div class="configurator-preview" aria-hidden="true">
				<div class="preview-frame">
					<div class="preview-row"><span>Use case</span> Cattle barn</div>
					<div class="preview-row"><span>Width</span> 60'</div>
					<div class="preview-row"><span>Length</span> 100'</div>
					<div class="preview-row"><span>Eave</span> 16'</div>
					<div class="preview-row"><span>ZIP</span> 33801</div>
				</div>
			</div>
		</div>
	</div>
</section>
```

```css
.configurator-entry { background: var(--charcoal); color: var(--white); }
.configurator-cta {
	display: grid;
	gap: 3rem;
	align-items: center;
}
@media (min-width: 1024px) {
	.configurator-cta { grid-template-columns: 1fr 1fr; }
}
.configurator-entry h2 { color: var(--white); }
.configurator-entry .btn-primary { margin-top: 1.5rem; }
.preview-frame {
	background: var(--white);
	color: var(--navy);
	padding: 1.5rem;
	border-top: 4px solid var(--red);
}
.preview-row {
	display: flex;
	justify-content: space-between;
	padding: 0.75rem 0;
	border-bottom: 1px solid var(--cool-gray);
	font-family: var(--font-display);
}
.preview-row span { color: var(--charcoal); font-weight: 500; }
.preview-row:last-child { border-bottom: none; }
```

- [ ] **Step 10: Build quote CTA section + form**

```html
<section class="quote-cta" id="quote-cta" data-reveal>
	<div class="container">
		<h2>Ready to build?</h2>
		<p>Tell us your county, use, and approximate dimensions. Sealed engineering quote within 5 business days.</p>
		<form class="quote-form" data-quote-form>
			<div class="form-row">
				<label>Name <input type="text" name="name" required></label>
				<label>Phone <input type="tel" name="phone" required></label>
			</div>
			<div class="form-row">
				<label>ZIP <input type="text" name="zip" inputmode="numeric" maxlength="5" required></label>
				<label>Use case
					<select name="useCase" required>
						<option value="">Select…</option>
						<option>Cattle / Hay</option>
						<option>Equestrian</option>
						<option>Commercial</option>
						<option>Mini-Storage</option>
						<option>RV / Boat</option>
						<option>Workshop / Garage</option>
						<option>Other</option>
					</select>
				</label>
			</div>
			<label>Approximate dimensions <input type="text" name="dimensions" placeholder="60×100×16" required></label>
			<label>Project description <textarea name="description" rows="3"></textarea></label>
			<button type="submit" class="btn-primary">Request my quote</button>
		</form>
	</div>
</section>
```

```css
.quote-cta { background: var(--red); color: var(--white); }
.quote-cta h2 { color: var(--white); }
.quote-form { max-width: 700px; margin-top: 2rem; }
.quote-form label {
	display: block;
	margin-bottom: 1.25rem;
	font-weight: 500;
	font-size: 0.875rem;
	letter-spacing: 0.05em;
	text-transform: uppercase;
}
.quote-form input,
.quote-form select,
.quote-form textarea {
	display: block;
	width: 100%;
	margin-top: 0.5rem;
	padding: 0.75rem;
	border: 2px solid transparent;
	background: var(--white);
	color: var(--navy);
	font-family: var(--font-body);
	font-size: 1rem;
	min-height: 44px;
	text-transform: none;
	letter-spacing: normal;
}
.quote-form input:focus,
.quote-form select:focus,
.quote-form textarea:focus {
	outline: 2px solid var(--navy);
	outline-offset: 2px;
}
.form-row {
	display: grid;
	gap: 1rem;
}
@media (min-width: 768px) {
	.form-row { grid-template-columns: 1fr 1fr; }
}
.quote-form .btn-primary {
	background: var(--navy);
	color: var(--white);
}
.quote-form .btn-primary:hover { background: #061530; }
.quote-confirmation {
	background: var(--white);
	color: var(--navy);
	padding: 2rem;
	font-size: 1.25rem;
	font-weight: 600;
	max-width: 700px;
}
```

- [ ] **Step 11: Build footer**

```html
<footer class="site-footer">
	<div class="container">
		<div class="footer-grid">
			<div>
				<p class="footer-brand">Bell Industrial Construction</p>
				<p class="footer-tagline">Florida-Engineered Steel Buildings</p>
			</div>
			<div>
				<h3 class="footer-heading">Visit</h3>
				<address>4820 US Highway 92 East<br>Lakeland, FL 33801</address>
				<p>Mon–Fri 7am–6pm</p>
			</div>
			<div>
				<h3 class="footer-heading">Call</h3>
				<a href="tel:8635550142" class="footer-phone">(863) 555-0142</a>
				<a href="mailto:build@bellindustrialconstruction.com">build@bellindustrialconstruction.com</a>
			</div>
			<div>
				<h3 class="footer-heading">Service area</h3>
				<p class="counties">Citrus · Hernando · Pasco · Pinellas · Hillsborough · Polk · Manatee · Sarasota · Hardee · DeSoto · Charlotte · Lee · Collier · Hendry</p>
			</div>
		</div>
		<p class="trust-line">Florida GC License # CGC-XXXXXX · Member NFBA · BBB A+ Rated · Florida Product Approved Components</p>
		<p class="copyright">© 2026 Bell Industrial Construction</p>
	</div>
</footer>
```

```css
.site-footer { background: var(--navy); color: var(--white); padding: 4rem 0 2rem; }
.footer-grid {
	display: grid;
	gap: 2rem;
	margin-bottom: 2rem;
}
@media (min-width: 768px) {
	.footer-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
	.footer-grid { grid-template-columns: repeat(4, 1fr); }
}
.footer-brand { font-family: var(--font-display); font-weight: 800; font-size: 1.25rem; }
.footer-tagline { color: var(--red); font-style: italic; margin-top: 0.25rem; }
.footer-heading {
	font-family: var(--font-display);
	font-size: 0.875rem;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--red);
	margin-bottom: 1rem;
}
.site-footer a { color: var(--white); }
.site-footer a:hover { color: var(--red); }
.footer-phone { font-family: var(--font-display); font-weight: 700; display: block; margin-bottom: 0.5rem; }
.counties { font-size: 0.875rem; opacity: 0.85; }
.trust-line { font-size: 0.75rem; opacity: 0.7; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.15); }
.copyright { font-size: 0.75rem; opacity: 0.5; margin-top: 1rem; }
address { font-style: normal; }
```

- [ ] **Step 12: Add JavaScript (scroll reveal + form handler)**

In the inline `<script>`, paste both the Scroll Reveal Observer and the Form Submit Handler from Shared Patterns. Add this CSS for reveal animations:

```css
[data-reveal] {
	opacity: 0;
	transform: translateY(40px);
	transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
[data-reveal].revealed {
	opacity: 1;
	transform: translateY(0);
}
```

- [ ] **Step 13: Verify in browser per spec checklist**

Open `toro/home.html` and walk the spec's Verification Approach checklist:
- File opens with no console errors or warnings
- Renders correctly at desktop (1280px), tablet (900px), mobile (375px) via DevTools device emulation
- All Unsplash images load (Network panel; substitute search term if any 404)
- Google Fonts load (woff2 in Network panel)
- All form fields have visible labels and accept input
- Submit button shows inline confirmation
- Text passes WCAG AA contrast (Lighthouse or DevTools accessibility panel)
- Keyboard tab order logical; all interactive elements reachable
- Focus-visible styles appear on tab navigation (red outline)
- Skip-to-content link works (Tab on fresh load, then Enter)
- No horizontal scroll on mobile

Fix any issues before committing.

- [ ] **Step 14: Commit**

```bash
git add toro/home.html
git commit -m "Add Toro homage direction (1 of 5)"
```

---

## Task 2: Build Direction 2 — Editorial Agricultural

**Files:**
- Create: `editorial/home.html`

**Spec sections:** `## The Five Directions → Direction 2`, `## Section-by-Section Content Plan` (Direction 2 column).

**Direction-specific tokens:**

```css
:root {
	--bone: #F4EFE6;
	--barn-green: #2E3D2A;
	--terracotta: #B45A3C;
	--ink: #1A1A1A;
	--text-primary: var(--ink);
	--bg-primary: var(--bone);
	--bg-section: var(--barn-green);
	--accent: var(--terracotta);
	--font-display: 'Fraunces', Georgia, serif;
	--font-body: 'Inter', system-ui, -apple-system, sans-serif;
}

:focus-visible {
	outline: 2px solid var(--terracotta);
	outline-offset: 3px;
}
```

**Google Fonts URL:** `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;1,9..144,400;1,9..144,700&family=Inter:wght@400;500&display=swap`

**Hero photo (verify, substitute "barn golden hour" search if 404):** `https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1920&q=80`

### Steps

- [ ] **Step 1: Create file with HTML5 scaffold + Google Fonts**

`<title>Bell Industrial Construction | Built for the work, built for the weather</title>` and the Fraunces + Inter URL.

- [ ] **Step 2: Add universal CSS reset + accessibility patterns + direction tokens**

Same as Task 1 Step 2, with Direction 2 tokens.

- [ ] **Step 3: Add base typography (serif-led)**

```css
body {
	font-family: var(--font-body);
	color: var(--text-primary);
	background: var(--bg-primary);
	line-height: 1.7;
}

h1, h2, h3 {
	font-family: var(--font-display);
	font-weight: 400;
	line-height: 1.15;
	letter-spacing: -0.01em;
}

h1 { font-size: clamp(2.75rem, 7vw, 5.5rem); font-style: italic; }
h2 { font-size: clamp(2rem, 5vw, 3.5rem); }
h3 { font-size: clamp(1.5rem, 3vw, 2rem); }

p { font-size: 1.0625rem; line-height: 1.8; max-width: 65ch; }

a { color: var(--terracotta); border-bottom: 1px solid currentColor; text-decoration: none; }
a:hover { background: rgba(180, 90, 60, 0.1); }

.btn-primary {
	display: inline-block;
	background: transparent;
	color: var(--barn-green);
	padding: 0.875rem 2rem;
	font-family: var(--font-display);
	font-weight: 700;
	font-style: italic;
	font-size: 1.125rem;
	border: 2px solid var(--barn-green);
	cursor: pointer;
	transition: background 0.25s, color 0.25s;
	min-height: 44px;
}
.btn-primary:hover { background: var(--barn-green); color: var(--bone); }
```

- [ ] **Step 4: Build header (lighter than Toro)**

```html
<header class="site-header">
	<div class="header-inner">
		<a href="#" class="brand">Bell Industrial Construction</a>
		<a href="tel:8635550142" class="phone-link">(863) 555-0142</a>
	</div>
</header>
```

```css
.site-header { background: var(--bone); border-bottom: 1px solid rgba(46, 61, 42, 0.15); }
.header-inner {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.5rem 2rem;
	max-width: 1400px;
	margin: 0 auto;
}
.brand {
	color: var(--barn-green);
	font-family: var(--font-display);
	font-weight: 700;
	font-style: italic;
	font-size: 1.25rem;
	border: none;
}
.phone-link {
	color: var(--terracotta);
	font-family: var(--font-display);
	font-weight: 700;
	font-size: 1.125rem;
	border: none;
}
```

- [ ] **Step 5: Build editorial hero (full-bleed photo + offset text panel)**

```html
<section class="hero">
	<div class="hero-photo" aria-hidden="true"></div>
	<div class="hero-text">
		<h1>Built for the work,<br><em>built for the weather.</em></h1>
		<div class="hero-rule"></div>
		<p class="hero-subhead">Twenty years raising steel across Florida's west coast — barns that outlast hurricanes, shops that outlast fashions.</p>
		<a href="#quote-cta" class="btn-primary">Start a project</a>
	</div>
</section>
```

```css
.hero {
	position: relative;
	display: grid;
	min-height: 90vh;
}
@media (min-width: 1024px) { .hero { grid-template-columns: 65% 35%; } }
.hero-photo {
	background-image: url("https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1920&q=80");
	background-size: cover;
	background-position: center;
	min-height: 60vh;
}
.hero-text {
	background: var(--bone);
	padding: 4rem 3rem;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.hero-text h1 em { color: var(--terracotta); }
.hero-rule { width: 60px; height: 1px; background: var(--terracotta); margin: 2rem 0; }
.hero-subhead { font-size: 1.125rem; margin-bottom: 2rem; }
```

- [ ] **Step 6: Build editorial building types (vertically stacked half-page spreads)**

Use the 6 categories from spec. Each gets a half-page editorial spread alternating photo-left / photo-right.

```html
<section class="building-types">
	<div class="container">
		<h2>What we raise.</h2>
		<div class="types-spreads">
			<article class="type-spread" data-reveal>
				<div class="spread-photo">
					<img src="https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1200&q=80" alt="Steel cattle barn at golden hour">
				</div>
				<div class="spread-text">
					<h3>Cattle &amp; Equipment Barns</h3>
					<p class="spec-line">40×60 · 14' eave · open or enclosed</p>
					<p>Built for the equipment, the hay, the herd. Open-sided shelters from $28,000; fully enclosed from $42,000.</p>
				</div>
			</article>
			<!-- 5 more spreads, alternating layout direction (CSS handles via :nth-child(even)) -->
		</div>
	</div>
</section>
```

```css
.types-spreads { display: flex; flex-direction: column; gap: 5rem; margin-top: 3rem; }
.type-spread { display: grid; gap: 2rem; align-items: center; }
@media (min-width: 768px) {
	.type-spread { grid-template-columns: 55% 45%; }
	.type-spread:nth-child(even) { grid-template-columns: 45% 55%; }
	.type-spread:nth-child(even) .spread-photo { order: 2; }
}
.spread-photo img { width: 100%; aspect-ratio: 4/3; object-fit: cover; filter: saturate(0.9); }
.spread-text h3 { color: var(--barn-green); margin-bottom: 0.75rem; }
.spec-line { font-style: italic; color: var(--terracotta); font-family: var(--font-display); margin-bottom: 1rem; }
```

- [ ] **Step 7: Build process section (italic numbered serif on barn-green)**

```html
<section class="process" data-reveal>
	<div class="container">
		<h2><em>How we work.</em></h2>
		<ol class="process-prose">
			<li>
				<span class="step-num">i.</span>
				<h3>Quote</h3>
				<p>Tell us your use, dimensions, and county. We return a sealed engineering quote within 5 business days.</p>
			</li>
			<!-- ii. Design / iii. Deliver / iv. Install with copy from spec Section 3 of 7 -->
		</ol>
	</div>
</section>
```

```css
.process { background: var(--barn-green); color: var(--bone); padding: 5rem 0; }
.process h2 { color: var(--bone); }
.process-prose { list-style: none; margin-top: 3rem; display: grid; gap: 3rem; }
.process-prose li { display: grid; grid-template-columns: 80px 1fr; gap: 2rem; align-items: baseline; }
.process-prose .step-num { font-family: var(--font-display); font-style: italic; font-size: 2.5rem; color: var(--terracotta); }
.process-prose h3 { color: var(--bone); margin-bottom: 0.75rem; }
.process-prose p { color: var(--bone); opacity: 0.9; max-width: none; }
```

- [ ] **Step 8: Build social proof (numbers + Rebecca H. pull-quote)**

```html
<section class="numbers-strip">
	<div class="container">
		<div class="numbers-grid">
			<div><strong>1,400+</strong><span>Buildings</span></div>
			<div><strong>20</strong><span>Years</span></div>
			<div><strong>14</strong><span>Counties</span></div>
			<div><strong>FBC</strong><span>Engineered &amp; sealed</span></div>
		</div>
	</div>
</section>

<section class="testimonial" data-reveal>
	<div class="container">
		<blockquote>
			<p>"I interviewed four companies. They were the only ones who walked the property, asked about prevailing wind, and came back with a sealed drawing for my exact site — not a catalog page."</p>
			<footer>
				<span class="quote-author-name">Rebecca H.</span>
				<span class="quote-author-role">Boarding facility owner · Marion County</span>
			</footer>
		</blockquote>
	</div>
</section>
```

```css
.numbers-strip { padding: 3rem 0; border-top: 1px solid rgba(46,61,42,0.15); border-bottom: 1px solid rgba(46,61,42,0.15); }
.numbers-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; text-align: center; }
@media (min-width: 768px) { .numbers-grid { grid-template-columns: repeat(4, 1fr); } }
.numbers-grid strong { display: block; font-family: var(--font-display); font-size: 3rem; color: var(--terracotta); font-weight: 400; font-style: italic; }
.numbers-grid span { font-size: 0.875rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--barn-green); margin-top: 0.5rem; display: block; }

.testimonial { padding: 6rem 0; }
.testimonial blockquote { max-width: 800px; margin: 0 auto; text-align: center; }
.testimonial p {
	font-family: var(--font-display);
	font-style: italic;
	font-weight: 400;
	font-size: clamp(1.5rem, 3vw, 2.25rem);
	line-height: 1.4;
	color: var(--barn-green);
}
.testimonial footer { margin-top: 2rem; }
.quote-author-name { display: block; font-family: var(--font-display); font-style: italic; font-size: 1.25rem; color: var(--terracotta); }
.quote-author-role { display: block; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--barn-green); margin-top: 0.5rem; }
```

- [ ] **Step 9: Build configurator entry CTA (modest framed panel)**

```html
<section class="configurator-entry" id="configurator-entry" data-reveal>
	<div class="container">
		<div class="configurator-cta">
			<h2><em>Design your barn on screen.</em></h2>
			<p>Set your dimensions, pick your use, see the building, and get an instant size estimate before you pick up the phone.</p>
			<a href="#" class="btn-primary">Open the configurator →</a>
		</div>
	</div>
</section>
```

```css
.configurator-entry { background: var(--bone); padding: 5rem 0; text-align: center; border-top: 1px solid rgba(180,90,60,0.3); border-bottom: 1px solid rgba(180,90,60,0.3); }
.configurator-cta { max-width: 600px; margin: 0 auto; }
.configurator-entry p { margin: 1.5rem auto; }
```

- [ ] **Step 10: Build quote CTA (full-width barn-green panel)**

```html
<section class="quote-cta" id="quote-cta" data-reveal>
	<div class="container">
		<h2><em>Tell us about the project.</em></h2>
		<p>We'd rather understand it first. Quotes are sealed by Florida-licensed engineers and returned within five business days.</p>
		<form class="quote-form" data-quote-form>
			<!-- Same form fields as Task 1 Step 10 -->
		</form>
	</div>
</section>
```

```css
.quote-cta { background: var(--barn-green); color: var(--bone); padding: 5rem 0; }
.quote-cta h2 { color: var(--bone); }
.quote-cta p { color: var(--bone); opacity: 0.9; margin-bottom: 2rem; }
.quote-form { max-width: 700px; }
.quote-form label { display: block; margin-bottom: 1.25rem; font-family: var(--font-display); font-style: italic; font-size: 0.9375rem; }
.quote-form input,
.quote-form select,
.quote-form textarea {
	display: block;
	width: 100%;
	margin-top: 0.5rem;
	padding: 0.75rem;
	background: rgba(244, 239, 230, 0.1);
	color: var(--bone);
	border: none;
	border-bottom: 1px solid rgba(244,239,230,0.4);
	font-family: var(--font-body);
	font-style: normal;
	min-height: 44px;
}
.quote-form input:focus,
.quote-form select:focus,
.quote-form textarea:focus {
	outline: none;
	border-bottom-color: var(--terracotta);
	background: rgba(244,239,230,0.15);
}
.form-row { display: grid; gap: 1rem; }
@media (min-width: 768px) { .form-row { grid-template-columns: 1fr 1fr; } }
.quote-form .btn-primary { background: var(--terracotta); color: var(--bone); border-color: var(--terracotta); margin-top: 1rem; }
.quote-form .btn-primary:hover { background: var(--bone); color: var(--terracotta); }
.quote-confirmation { background: var(--bone); color: var(--barn-green); padding: 2rem; font-family: var(--font-display); font-style: italic; font-size: 1.5rem; }
```

- [ ] **Step 11: Build footer (bone background, terracotta accents)**

Use the same footer HTML structure as Task 1 Step 11, with tagline "Steel buildings, raised by hand, sealed by Florida engineers." The CSS reverses the color palette:

```css
.site-footer { background: var(--bone); color: var(--barn-green); padding: 5rem 0 2rem; border-top: 1px solid rgba(180,90,60,0.3); }
.footer-grid { display: grid; gap: 2rem; margin-bottom: 2rem; }
@media (min-width: 768px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .footer-grid { grid-template-columns: repeat(4, 1fr); } }
.footer-brand { font-family: var(--font-display); font-weight: 700; font-style: italic; font-size: 1.25rem; }
.footer-tagline { font-style: italic; color: var(--terracotta); margin-top: 0.5rem; font-family: var(--font-display); }
.footer-heading { font-family: var(--font-display); font-style: italic; font-size: 1.0625rem; color: var(--terracotta); margin-bottom: 1rem; font-weight: 400; }
.site-footer a { color: var(--barn-green); border: none; }
.site-footer a:hover { color: var(--terracotta); background: none; }
.footer-phone { font-family: var(--font-display); font-weight: 700; display: block; margin-bottom: 0.5rem; font-size: 1.125rem; }
.counties { font-size: 0.9375rem; line-height: 1.7; }
.trust-line { font-size: 0.75rem; padding-top: 1.5rem; border-top: 1px solid rgba(180,90,60,0.2); }
.copyright { font-size: 0.75rem; opacity: 0.7; margin-top: 1rem; }
address { font-style: normal; }
```

- [ ] **Step 12: Add JavaScript (scroll reveal + form handler)**

In the inline `<script>`, paste both the Scroll Reveal Observer and Form Submit Handler from Shared Patterns. Direction 2's reveal style uses opacity-only fade (per spec):

```css
[data-reveal] {
	opacity: 0;
	transform: translateY(20px);
	transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
[data-reveal].revealed {
	opacity: 1;
	transform: translateY(0);
}
```

- [ ] **Step 13: Verify in browser per spec checklist**

Same checklist as Task 1 Step 13. Pay attention to:
- Italic Fraunces renders (Georgia fallback acceptable until load)
- Editorial spreads alternate layout direction on desktop
- Pull-quote testimonial centers and italicizes
- Terracotta is decoration only (no body text in terracotta on bone)

- [ ] **Step 14: Commit**

```bash
git add editorial/home.html
git commit -m "Add Editorial Agricultural direction (2 of 5)"
```

---

## Task 3: Build Direction 3 — Industrial Technical / Spec-Sheet

**Files:**
- Create: `technical/home.html`

**Spec sections:** `## The Five Directions → Direction 3`, `## Section-by-Section Content Plan` (Direction 3 column).

**Direction-specific tokens:**

```css
:root {
	--paper: #F2F2EE;
	--blueprint: #1B2B4A;
	--signal: #F5C518;
	--ink: #101010;
	--text-primary: var(--ink);
	--bg-primary: var(--paper);
	--bg-section: var(--blueprint);
	--accent: var(--signal);
	--font-display: 'Space Grotesk', system-ui, sans-serif;
	--font-body: 'Inter', system-ui, sans-serif;
	--font-mono: 'JetBrains Mono', 'Courier New', monospace;
}

:focus-visible { outline: 2px solid var(--signal); outline-offset: 3px; }
```

**Google Fonts URL:** `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500;700&display=swap`

**Hero photo (verify, substitute "metal building exterior" if 404):** `https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1920&q=80`

### Steps

- [ ] **Step 1: Create file with HTML5 scaffold + Google Fonts**

`<title>Bell Industrial Construction | ENGINEERED. SEALED. INSTALLED.</title>` and the Space Grotesk + Inter + JetBrains Mono URL.

- [ ] **Step 2: Add universal CSS reset + accessibility patterns + direction tokens**

Same pattern as Task 1, with Direction 3 tokens.

- [ ] **Step 3: Add base typography (geometric + monospace for spec data)**

```css
body { font-family: var(--font-body); color: var(--text-primary); background: var(--bg-primary); }
h1, h2, h3 {
	font-family: var(--font-display);
	font-weight: 700;
	line-height: 1.1;
	letter-spacing: -0.02em;
	text-transform: uppercase;
}
h1 { font-size: clamp(2.25rem, 5vw, 4rem); }
h2 { font-size: clamp(1.75rem, 4vw, 2.75rem); }
h3 { font-size: clamp(1.125rem, 2vw, 1.5rem); }

.mono, .spec-line { font-family: var(--font-mono); }

.btn-primary {
	display: inline-block;
	background: var(--signal);
	color: var(--ink);
	padding: 0.875rem 1.75rem;
	font-family: var(--font-display);
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	border: none;
	cursor: pointer;
	transition: background 0.15s, transform 0.15s;
	min-height: 44px;
}
.btn-primary:hover { background: #d4ab15; transform: translateY(-2px); }
```

- [ ] **Step 4: Build header (paper background, mono-tagged brand, blueprint nav)**

```html
<header class="site-header">
	<div class="header-inner">
		<a href="#" class="brand">BELL INDUSTRIAL <span class="mono">/ FBC</span></a>
		<nav aria-label="Primary">
			<a href="#configurator-entry">CONFIGURE</a>
			<a href="#quote-cta">REQUEST QUOTE</a>
		</nav>
		<a href="tel:8635550142" class="phone-link mono">(863) 555-0142</a>
	</div>
</header>
```

```css
.site-header { background: var(--paper); border-bottom: 2px solid var(--blueprint); }
.header-inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; padding: 1rem 2rem; max-width: 1400px; margin: 0 auto; }
.brand { color: var(--blueprint); font-family: var(--font-display); font-weight: 700; font-size: 1.0625rem; letter-spacing: 0.05em; }
.brand .mono { color: var(--signal); font-size: 0.875rem; }
.site-header nav { display: flex; gap: 1.5rem; }
.site-header nav a { color: var(--blueprint); font-family: var(--font-display); font-weight: 600; font-size: 0.875rem; letter-spacing: 0.08em; }
.site-header .phone-link { color: var(--blueprint); font-weight: 700; font-size: 0.9375rem; }
@media (max-width: 767px) { .site-header nav { display: none; } }
```

- [ ] **Step 5: Build split hero (engineering heading + dimensioned photo)**

```html
<section class="hero">
	<div class="hero-text">
		<p class="mono hero-eyebrow">FBC ENGINEERED · ASCE 7-22 · 140-170 MPH</p>
		<h1>Engineered.<br>Sealed.<br>Installed.</h1>
		<p class="hero-subhead">Site-specific engineered drawings · Florida-licensed seal · Galvalume AZ55 standard.</p>
		<a href="#quote-cta" class="btn-primary">Generate Quote →</a>
	</div>
	<div class="hero-photo">
		<img src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1200&q=80" alt="Steel commercial building exterior with dimensional context">
		<div class="hero-callout hero-callout-width mono">60' SPAN</div>
		<div class="hero-callout hero-callout-eave mono">18' EAVE</div>
		<div class="hero-callout hero-callout-length mono">100' LENGTH</div>
	</div>
</section>
```

```css
.hero { display: grid; min-height: 75vh; }
@media (min-width: 1024px) { .hero { grid-template-columns: 1fr 1fr; } }
.hero-text { background: var(--paper); padding: 4rem 3rem; display: flex; flex-direction: column; justify-content: center; }
.hero-eyebrow { font-size: 0.8125rem; color: var(--blueprint); margin-bottom: 1.5rem; letter-spacing: 0.1em; }
.hero-text h1 { color: var(--blueprint); margin-bottom: 1.5rem; }
.hero-subhead { font-size: 1.0625rem; color: var(--ink); margin-bottom: 2rem; max-width: 480px; }
.hero-photo { position: relative; min-height: 50vh; background: var(--blueprint); }
.hero-photo img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; }
.hero-callout { position: absolute; background: var(--signal); color: var(--ink); padding: 0.4rem 0.75rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; }
.hero-callout-width { bottom: 1rem; left: 50%; transform: translateX(-50%); }
.hero-callout-eave { top: 50%; left: 1rem; transform: translateY(-50%); }
.hero-callout-length { top: 1rem; right: 1rem; }
```

- [ ] **Step 6: Build building types grid (3×2 with mono spec lines)**

Use the 6 categories. Each card has photo + name + mono spec line + signal-yellow starter price + description. Use the same 6 Unsplash photo URLs from Task 1 Step 6.

```html
<section class="building-types" data-reveal>
	<div class="container">
		<h2>Building catalog</h2>
		<div class="types-grid">
			<article class="type-card">
				<img src="..." alt="Steel cattle barn">
				<div class="type-card-body">
					<h3>Cattle &amp; Equipment Barns</h3>
					<p class="spec-line mono">40×60 · 14' EAVE · 4:12 PITCH · 150 MPH</p>
					<p class="starter-price mono">FROM $28,000</p>
					<p>Built for the equipment, the hay, the herd.</p>
				</div>
			</article>
			<!-- 5 more cards -->
		</div>
		<p class="grid-disclaimer mono">PRICING VARIES BY SITE, WIND EXPOSURE, AND FINISH. SEALED ENGINEERED DRAWINGS INCLUDED.</p>
	</div>
</section>
```

```css
.container { max-width: 1400px; margin: 0 auto; padding: 4rem 2rem; }
.building-types h2 { color: var(--blueprint); margin-bottom: 2.5rem; }
.types-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
@media (min-width: 768px) { .types-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .types-grid { grid-template-columns: repeat(3, 1fr); } }
.type-card { background: var(--paper); border: 1px solid var(--blueprint); }
.type-card img { width: 100%; aspect-ratio: 16/10; object-fit: cover; filter: grayscale(0.3); }
.type-card-body { padding: 1.5rem; }
.type-card h3 { color: var(--blueprint); margin-bottom: 0.5rem; }
.spec-line { font-size: 0.75rem; color: var(--blueprint); margin-bottom: 0.5rem; letter-spacing: 0.05em; }
.starter-price { color: var(--signal); background: var(--blueprint); padding: 0.25rem 0.5rem; display: inline-block; font-size: 0.875rem; margin: 0.5rem 0 1rem; }
.grid-disclaimer { font-size: 0.75rem; color: var(--blueprint); margin-top: 2rem; padding-top: 1rem; border-top: 1px solid var(--blueprint); }
```

- [ ] **Step 7: Build process section (4 horizontal step icons)**

```html
<section class="process" data-reveal>
	<div class="container">
		<h2>Process</h2>
		<ol class="process-flow">
			<li>
				<svg class="process-icon" viewBox="0 0 24 24" aria-hidden="true">
					<rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"/>
					<line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/>
				</svg>
				<span class="process-num mono">01</span>
				<h3>QUOTE</h3>
				<p>Tell us your use, dimensions, and county. Sealed engineering quote within 5 business days.</p>
			</li>
			<!-- 02 DESIGN (pencil), 03 DELIVER (truck), 04 INSTALL (wrench) - use simple inline SVG line icons -->
		</ol>
	</div>
</section>
```

For the 4 SVG icons, use simple 24×24 line-icon paths (Heroicons / Feather / Lucide source). Step 1 = ruler/grid, Step 2 = pencil, Step 3 = truck, Step 4 = wrench.

```css
.process { background: var(--paper); border-top: 2px solid var(--blueprint); border-bottom: 2px solid var(--blueprint); }
.process h2 { color: var(--blueprint); }
.process-flow { list-style: none; display: grid; gap: 2rem; margin-top: 3rem; position: relative; }
@media (min-width: 1024px) {
	.process-flow { grid-template-columns: repeat(4, 1fr); }
	.process-flow::before {
		content: '';
		position: absolute;
		top: 1.5rem;
		left: 12.5%;
		right: 12.5%;
		height: 1px;
		background: var(--blueprint);
		z-index: 0;
	}
}
.process-flow li { position: relative; z-index: 1; background: var(--paper); }
.process-icon { width: 48px; height: 48px; color: var(--blueprint); }
.process-num { display: block; font-size: 0.75rem; color: var(--signal); background: var(--blueprint); padding: 0.25rem 0.5rem; width: fit-content; margin: 0.5rem 0 0.75rem; }
.process-flow h3 { color: var(--blueprint); margin-bottom: 0.5rem; font-size: 1.125rem; }
.process-flow p { font-size: 0.9375rem; }
```

- [ ] **Step 8: Build social proof (numbers strip + spec-card testimonial)**

```html
<section class="numbers-strip">
	<div class="container">
		<div class="numbers-grid">
			<div><strong class="mono">1,400+</strong><span>BUILDINGS</span></div>
			<div><strong class="mono">20</strong><span>YEARS</span></div>
			<div><strong class="mono">14</strong><span>COUNTIES</span></div>
			<div><strong>FBC</strong><span>ENGINEERED</span></div>
		</div>
	</div>
</section>

<section class="testimonial" data-reveal>
	<div class="container">
		<div class="spec-card">
			<div class="spec-card-header">
				<span class="mono spec-tag">PROJECT TYPE: COMMERCIAL · 100×200 · POLK COUNTY · 150 MPH</span>
			</div>
			<blockquote>
				<p>"My contractor yard outgrew me twice. Started with a 50×80 in 2014. They built me a 100×200 in 2021 and connected the two. Same crew lead both times."</p>
				<footer><strong>Mike D.</strong> · Site-work contractor</footer>
			</blockquote>
		</div>
	</div>
</section>
```

```css
.numbers-strip { background: var(--blueprint); color: var(--paper); padding: 2rem 0; }
.numbers-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; text-align: center; }
@media (min-width: 768px) { .numbers-grid { grid-template-columns: repeat(4, 1fr); } }
.numbers-grid strong { display: block; font-size: 2.5rem; color: var(--signal); line-height: 1; }
.numbers-grid span { font-family: var(--font-display); font-size: 0.75rem; letter-spacing: 0.15em; opacity: 0.85; margin-top: 0.5rem; display: block; }

.spec-card { background: var(--paper); border: 2px solid var(--blueprint); max-width: 800px; margin: 0 auto; }
.spec-card-header { background: var(--blueprint); color: var(--paper); padding: 0.75rem 1.5rem; }
.spec-tag { font-size: 0.75rem; letter-spacing: 0.05em; }
.spec-card blockquote { padding: 2rem 1.5rem; }
.spec-card p { font-size: 1.25rem; line-height: 1.5; color: var(--ink); }
.spec-card footer { margin-top: 1.5rem; font-style: normal; font-family: var(--font-display); font-size: 0.875rem; color: var(--blueprint); letter-spacing: 0.05em; }
```

- [ ] **Step 9: Build configurator entry CTA (engineering-input panel mockup)**

```html
<section class="configurator-entry" id="configurator-entry" data-reveal>
	<div class="container">
		<div class="configurator-cta">
			<div>
				<h2>Build the spec.</h2>
				<p>Use case, dimensions, ZIP. Output: dimensional preview and wind-zone hint.</p>
				<a href="#" class="btn-primary">GENERATE QUOTE</a>
			</div>
			<div class="configurator-panel" aria-hidden="true">
				<div class="panel-row mono"><span>USE_CASE</span><span>CATTLE_BARN</span></div>
				<div class="panel-row mono"><span>WIDTH_FT</span><span>60</span></div>
				<div class="panel-row mono"><span>LENGTH_FT</span><span>100</span></div>
				<div class="panel-row mono"><span>EAVE_FT</span><span>16</span></div>
				<div class="panel-row mono"><span>ZIP</span><span>33801</span></div>
				<div class="panel-row mono panel-row-output"><span>WIND_ZONE</span><span>150 MPH</span></div>
				<div class="panel-row mono panel-row-output"><span>SQ_FT</span><span>6,000</span></div>
			</div>
		</div>
	</div>
</section>
```

```css
.configurator-entry { background: var(--blueprint); color: var(--paper); padding: 5rem 0; }
.configurator-cta { display: grid; gap: 3rem; align-items: center; }
@media (min-width: 1024px) { .configurator-cta { grid-template-columns: 1fr 1fr; } }
.configurator-entry h2 { color: var(--paper); }
.configurator-entry p { color: var(--paper); opacity: 0.85; margin: 1rem 0 1.5rem; }
.configurator-panel { background: var(--paper); color: var(--ink); padding: 1.5rem; }
.panel-row { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px dashed var(--blueprint); font-size: 0.875rem; }
.panel-row span:first-child { color: var(--blueprint); opacity: 0.7; }
.panel-row span:last-child { color: var(--ink); font-weight: 700; }
.panel-row-output span:last-child { background: var(--signal); padding: 0 0.5rem; }
```

- [ ] **Step 10: Build quote CTA (paper background + signal-yellow submit)**

```html
<section class="quote-cta" id="quote-cta" data-reveal>
	<div class="container">
		<h2>Request quote.</h2>
		<p class="mono">USE CASE · DIMENSIONS · ZIP. WE RESPOND WITH SEALED DRAWINGS AND A PRICE WITHIN 5 BUSINESS DAYS.</p>
		<form class="quote-form" data-quote-form>
			<!-- Same form fields as Task 1 Step 10, with mono labels -->
		</form>
	</div>
</section>
```

```css
.quote-cta { background: var(--paper); padding: 5rem 0; }
.quote-cta h2 { color: var(--blueprint); }
.quote-cta > .container > p { font-size: 0.875rem; color: var(--blueprint); margin: 1rem 0 2rem; letter-spacing: 0.05em; }
.quote-form { max-width: 700px; }
.quote-form label { display: block; margin-bottom: 1.25rem; font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--blueprint); }
.quote-form input,
.quote-form select,
.quote-form textarea {
	display: block;
	width: 100%;
	margin-top: 0.5rem;
	padding: 0.75rem;
	background: var(--paper);
	color: var(--ink);
	border: 1px solid var(--blueprint);
	font-family: var(--font-mono);
	font-size: 0.9375rem;
	min-height: 44px;
	letter-spacing: normal;
	text-transform: none;
}
.quote-form input:focus,
.quote-form select:focus,
.quote-form textarea:focus {
	outline: 2px solid var(--signal);
	outline-offset: 2px;
}
.form-row { display: grid; gap: 1rem; }
@media (min-width: 768px) { .form-row { grid-template-columns: 1fr 1fr; } }
.quote-form .btn-primary { margin-top: 1rem; }
.quote-confirmation { background: var(--blueprint); color: var(--paper); padding: 2rem; font-family: var(--font-mono); font-size: 1rem; }
```

- [ ] **Step 11: Build footer (paper background, mono certifications)**

Same footer HTML structure as Task 1 Step 11, with mono class on labels and tagline "ENGINEERED · SEALED · INSTALLED · 2006".

```css
.site-footer { background: var(--paper); color: var(--blueprint); padding: 4rem 0 2rem; border-top: 2px solid var(--blueprint); }
.footer-grid { display: grid; gap: 2rem; margin-bottom: 2rem; }
@media (min-width: 768px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .footer-grid { grid-template-columns: repeat(4, 1fr); } }
.footer-brand { font-family: var(--font-display); font-weight: 700; font-size: 1.0625rem; letter-spacing: 0.05em; }
.footer-tagline { color: var(--signal); background: var(--blueprint); padding: 0.25rem 0.5rem; font-size: 0.75rem; margin-top: 0.5rem; display: inline-block; }
.footer-heading { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.15em; color: var(--blueprint); margin-bottom: 1rem; font-weight: 700; }
.site-footer a { color: var(--blueprint); text-decoration: none; }
.site-footer a:hover { color: var(--signal); background: var(--blueprint); }
.footer-phone { display: block; margin-bottom: 0.5rem; font-size: 1.0625rem; font-weight: 700; }
.counties { font-size: 0.75rem; line-height: 1.7; letter-spacing: 0.05em; }
.trust-line { font-size: 0.6875rem; padding-top: 1.5rem; border-top: 1px solid var(--blueprint); letter-spacing: 0.1em; }
.copyright { font-size: 0.6875rem; opacity: 0.7; margin-top: 1rem; letter-spacing: 0.1em; }
address { font-style: normal; }
```

- [ ] **Step 12: Add JavaScript (scroll reveal + form handler)**

Same as Task 1 Step 12.

- [ ] **Step 13: Verify in browser per spec checklist**

Same checklist as Task 1 Step 13. Pay attention to:
- Signal-yellow text never appears on light backgrounds (only as button-fill or on blueprint-blue)
- JetBrains Mono loads and renders for all spec lines and dimensional callouts
- Hero dimensional callouts position correctly over photo at all viewports

- [ ] **Step 14: Commit**

```bash
git add technical/home.html
git commit -m "Add Industrial Technical direction (3 of 5)"
```

---

## Task 4: Build Direction 4 — Warm Heritage / American Made

**Files:**
- Create: `heritage/home.html`

**Spec sections:** `## The Five Directions → Direction 4`, `## Section-by-Section Content Plan` (Direction 4 column).

**Direction-specific tokens:**

```css
:root {
	--cream: #EDE6D6;
	--oxblood: #7A2A1F;
	--forest: #2F4A2E;
	--brass: #A88752;
	--text-primary: #1E1108;
	--bg-primary: var(--cream);
	--bg-section: var(--forest);
	--accent: var(--oxblood);
	--font-display: 'Roboto Slab', Georgia, serif;
	--font-body: 'Lora', Georgia, serif;
}

:focus-visible { outline: 2px dashed var(--brass); outline-offset: 3px; }
```

**Google Fonts URL:** `https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700;900&family=Lora:ital,wght@0,400;0,500;1,400&display=swap`

**Hero photo (verify, substitute "rancher portrait" if 404):** `https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?w=1920&q=80`

### Steps

- [ ] **Step 1: Create file with HTML5 scaffold + Google Fonts**

`<title>Bell Industrial Construction | Steel Buildings the South Still Trusts</title>` and the Roboto Slab + Lora URL.

- [ ] **Step 2: Add universal CSS reset + accessibility patterns + direction tokens**

Same pattern as Task 1, with Direction 4 tokens. Note `:focus-visible` uses `dashed` not `solid`.

- [ ] **Step 3: Add base typography (slab + serif body)**

```css
body { font-family: var(--font-body); color: var(--text-primary); background: var(--bg-primary); line-height: 1.7; }
h1, h2, h3 { font-family: var(--font-display); font-weight: 900; line-height: 1.15; color: var(--oxblood); }
h1 { font-size: clamp(2.5rem, 6vw, 5rem); }
h2 { font-size: clamp(1.75rem, 4vw, 3rem); }
h3 { font-size: clamp(1.25rem, 2.5vw, 1.75rem); font-weight: 700; }

p { font-size: 1.0625rem; line-height: 1.8; max-width: 65ch; }

a { color: var(--oxblood); text-decoration: underline; text-decoration-color: var(--brass); text-underline-offset: 4px; }
a:hover { color: var(--forest); }

.btn-primary {
	display: inline-block;
	background: var(--oxblood);
	color: var(--cream);
	padding: 0.875rem 2rem;
	font-family: var(--font-display);
	font-weight: 700;
	border: 2px solid var(--oxblood);
	cursor: pointer;
	transition: background 0.15s, transform 0.15s;
	min-height: 44px;
	text-decoration: none;
}
.btn-primary:hover { background: var(--forest); border-color: var(--forest); color: var(--cream); transform: translateY(2px); }
```

- [ ] **Step 4: Build header (cream, slab brand, oxblood phone)**

```html
<header class="site-header">
	<div class="header-inner">
		<a href="#" class="brand">Bell Industrial Construction</a>
		<a href="tel:8635550142" class="phone-link">Call (863) 555-0142</a>
	</div>
</header>
```

```css
.site-header { background: var(--cream); border-bottom: 1px solid var(--brass); }
.header-inner { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 2rem; max-width: 1400px; margin: 0 auto; }
.brand { color: var(--oxblood); font-family: var(--font-display); font-weight: 900; font-size: 1.25rem; text-decoration: none; }
.phone-link { color: var(--oxblood); font-family: var(--font-display); font-weight: 700; font-size: 1.125rem; text-decoration: none; }
.phone-link:hover { color: var(--forest); }
```

- [ ] **Step 5: Build hero (cream + oxblood border + brass heritage badge)**

```html
<section class="hero">
	<div class="hero-content">
		<span class="heritage-badge">Built In Florida Since 2006</span>
		<h1>Steel buildings the South still trusts.</h1>
		<p class="hero-subhead">Lakeland to the coast, Citrus to Collier — three install crews, twenty years, fourteen hundred buildings, one phone number.</p>
		<a href="#quote-cta" class="btn-primary">Tell us about your build</a>
	</div>
	<div class="hero-photo">
		<img src="https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?w=1200&q=80" alt="Florida rancher with their steel barn">
	</div>
</section>
```

```css
.hero { display: grid; min-height: 80vh; background: var(--cream); }
@media (min-width: 1024px) { .hero { grid-template-columns: 1fr 1fr; } }
.hero-content { padding: 4rem 3rem; display: flex; flex-direction: column; justify-content: center; border-left: 8px solid var(--oxblood); }
.heritage-badge { display: inline-block; background: var(--brass); color: var(--text-primary); padding: 0.4rem 1rem; font-family: var(--font-display); font-weight: 700; font-size: 0.8125rem; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 1.5rem; width: fit-content; }
.hero-subhead { font-size: 1.125rem; margin: 1.5rem 0 2rem; }
.hero-photo { display: flex; align-items: center; }
.hero-photo img { width: 100%; aspect-ratio: 4/5; object-fit: cover; filter: saturate(0.9) sepia(0.05); }
```

- [ ] **Step 6: Build building types (catalog cards with brass ornament rule)**

```html
<section class="building-types" data-reveal>
	<div class="container">
		<h2>What we build</h2>
		<div class="catalog-grid">
			<article class="catalog-card">
				<img src="..." alt="Steel cattle barn at golden hour">
				<div class="catalog-card-body">
					<h3>Cattle &amp; Equipment Barns</h3>
					<div class="ornament-rule"></div>
					<p class="spec-line">40×60 · 14' eave · open or enclosed · from $28,000</p>
					<p>Built for the equipment, the hay, the herd.</p>
				</div>
			</article>
			<!-- 5 more cards -->
		</div>
	</div>
</section>
```

```css
.container { max-width: 1400px; margin: 0 auto; padding: 4rem 2rem; }
.building-types h2 { margin-bottom: 2.5rem; }
.catalog-grid { display: grid; grid-template-columns: 1fr; gap: 2rem; }
@media (min-width: 768px) { .catalog-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .catalog-grid { grid-template-columns: repeat(3, 1fr); } }
.catalog-card { background: var(--cream); border: 1px solid var(--brass); }
.catalog-card img { width: 100%; aspect-ratio: 16/10; object-fit: cover; filter: saturate(0.9) sepia(0.08); }
.catalog-card-body { padding: 1.5rem; }
.catalog-card h3 { color: var(--oxblood); margin-bottom: 0.75rem; }
.ornament-rule { width: 50px; height: 1px; background: var(--forest); margin: 0.75rem 0; position: relative; }
.ornament-rule::before, .ornament-rule::after { content: ''; position: absolute; top: -2px; width: 5px; height: 5px; background: var(--brass); border-radius: 50%; }
.ornament-rule::before { left: -8px; }
.ornament-rule::after { right: -8px; }
.spec-line { font-style: italic; color: var(--forest); margin-bottom: 0.75rem; font-size: 0.9375rem; }
```

- [ ] **Step 7: Build process section (slab numbered circles + brass connecting line)**

```html
<section class="process" data-reveal>
	<div class="container">
		<h2>How we build</h2>
		<ol class="process-narrative">
			<li>
				<div class="process-circle">1</div>
				<div>
					<h3>Quote</h3>
					<p>Tell us your use, dimensions, and county. We return a sealed engineering quote within 5 business days.</p>
				</div>
			</li>
			<!-- 2 Design / 3 Deliver / 4 Install -->
		</ol>
	</div>
</section>
```

```css
.process { background: var(--cream); }
.process-narrative { list-style: none; margin-top: 2.5rem; display: flex; flex-direction: column; gap: 2rem; position: relative; }
.process-narrative::before { content: ''; position: absolute; left: 39px; top: 0; bottom: 0; width: 2px; background: var(--brass); }
.process-narrative li { display: grid; grid-template-columns: 80px 1fr; gap: 1.5rem; align-items: start; position: relative; z-index: 1; }
.process-circle { width: 80px; height: 80px; border-radius: 50%; background: var(--oxblood); color: var(--cream); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-weight: 900; font-size: 2.25rem; border: 3px solid var(--brass); }
.process-narrative h3 { margin-bottom: 0.5rem; }
```

- [ ] **Step 8: Build social proof (numbers + portrait testimonial with Wade T.)**

```html
<section class="numbers-strip">
	<div class="container">
		<div class="numbers-grid">
			<div><strong>1,400+</strong><span>Buildings</span></div>
			<div><strong>20</strong><span>Years</span></div>
			<div><strong>14</strong><span>Counties</span></div>
			<div><strong>FBC</strong><span>Engineered</span></div>
		</div>
	</div>
</section>

<section class="testimonial" data-reveal>
	<div class="container">
		<div class="testimonial-portrait">
			<img src="https://images.unsplash.com/photo-1574774220849-cef0f5d20a8d?w=600&q=80" alt="Wade T., cattle producer, beside his hay barn in Hardee County">
			<div class="portrait-caption">Wade T. · Hardee County</div>
		</div>
		<blockquote>
			<p>"Our 60×120 hay barn went up in nine days and made it through Idalia without a scratched panel. The crew knew what we needed before we finished explaining it."</p>
			<footer>— Wade T., cattle &amp; hay producer, Hardee County</footer>
		</blockquote>
	</div>
</section>
```

```css
.numbers-strip { background: var(--oxblood); color: var(--cream); padding: 2.5rem 0; }
.numbers-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; text-align: center; }
@media (min-width: 768px) { .numbers-grid { grid-template-columns: repeat(4, 1fr); } }
.numbers-grid strong { display: block; font-family: var(--font-display); font-weight: 900; font-size: 2.75rem; color: var(--brass); line-height: 1; }
.numbers-grid span { font-family: var(--font-display); font-size: 0.875rem; opacity: 0.9; margin-top: 0.5rem; display: block; letter-spacing: 0.05em; }

.testimonial { padding: 5rem 0; }
.testimonial .container { display: grid; gap: 3rem; align-items: center; }
@media (min-width: 768px) { .testimonial .container { grid-template-columns: 280px 1fr; } }
.testimonial-portrait img { width: 100%; aspect-ratio: 1; object-fit: cover; border: 4px solid var(--brass); filter: saturate(0.85) sepia(0.05); }
.portrait-caption { font-family: var(--font-display); font-weight: 700; font-size: 0.9375rem; color: var(--forest); margin-top: 0.75rem; }
.testimonial blockquote { border-left: 4px solid var(--oxblood); padding-left: 2rem; }
.testimonial blockquote p { font-family: var(--font-display); font-weight: 700; font-size: 1.5rem; line-height: 1.4; color: var(--oxblood); }
.testimonial blockquote footer { margin-top: 1.5rem; font-style: italic; color: var(--forest); font-family: var(--font-body); }
```

- [ ] **Step 9: Build configurator entry CTA (oxblood-framed)**

```html
<section class="configurator-entry" id="configurator-entry" data-reveal>
	<div class="container">
		<div class="configurator-cta">
			<h2>Tell us about your project.</h2>
			<p>Use the configurator to set dimensions, pick your use, and see the building before you call.</p>
			<a href="#" class="btn-primary">Open the configurator</a>
		</div>
	</div>
</section>
```

```css
.configurator-entry { background: var(--cream); padding: 5rem 0; text-align: center; border-top: 2px solid var(--brass); border-bottom: 2px solid var(--brass); }
.configurator-cta { max-width: 600px; margin: 0 auto; }
.configurator-entry p { margin: 1rem auto 1.5rem; }
```

- [ ] **Step 10: Build quote CTA (forest-green panel + cream slab heading)**

```html
<section class="quote-cta" id="quote-cta" data-reveal>
	<div class="container">
		<h2>Let's get started.</h2>
		<p>A real conversation, then a real quote. Sealed engineering drawings included with every estimate.</p>
		<form class="quote-form" data-quote-form>
			<!-- Same form fields as Task 1 Step 10 -->
		</form>
	</div>
</section>
```

```css
.quote-cta { background: var(--forest); color: var(--cream); padding: 5rem 0; }
.quote-cta h2 { color: var(--cream); }
.quote-cta > .container > p { color: var(--cream); opacity: 0.9; margin-bottom: 2rem; }
.quote-form { max-width: 700px; }
.quote-form label { display: block; margin-bottom: 1.25rem; font-family: var(--font-display); font-weight: 700; font-size: 0.9375rem; }
.quote-form input,
.quote-form select,
.quote-form textarea {
	display: block;
	width: 100%;
	margin-top: 0.5rem;
	padding: 0.75rem;
	background: var(--cream);
	color: var(--text-primary);
	border: 2px solid transparent;
	font-family: var(--font-body);
	min-height: 44px;
}
.quote-form input:focus,
.quote-form select:focus,
.quote-form textarea:focus {
	outline: 2px dashed var(--brass);
	outline-offset: 2px;
}
.form-row { display: grid; gap: 1rem; }
@media (min-width: 768px) { .form-row { grid-template-columns: 1fr 1fr; } }
.quote-form .btn-primary { background: var(--oxblood); border-color: var(--brass); margin-top: 1rem; }
.quote-confirmation { background: var(--cream); color: var(--oxblood); padding: 2rem; font-family: var(--font-display); font-weight: 700; font-size: 1.5rem; }
```

- [ ] **Step 11: Build footer (oxblood + cream + brass NFBA badge)**

Same footer HTML structure as Task 1 Step 11, with tagline "Built In Florida Since 2006" and an extra `<div class="nfba-badge">NFBA Member</div>` after the tagline.

```css
.site-footer { background: var(--oxblood); color: var(--cream); padding: 4rem 0 2rem; }
.footer-grid { display: grid; gap: 2rem; margin-bottom: 2rem; }
@media (min-width: 768px) { .footer-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .footer-grid { grid-template-columns: repeat(4, 1fr); } }
.footer-brand { font-family: var(--font-display); font-weight: 900; font-size: 1.25rem; }
.footer-tagline { color: var(--brass); font-style: italic; margin-top: 0.5rem; }
.nfba-badge { display: inline-block; margin-top: 1rem; padding: 0.4rem 0.75rem; border: 1px solid var(--brass); color: var(--brass); font-family: var(--font-display); font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; }
.footer-heading { font-family: var(--font-display); font-weight: 900; font-size: 0.9375rem; color: var(--brass); margin-bottom: 1rem; }
.site-footer a { color: var(--cream); text-decoration: none; }
.site-footer a:hover { color: var(--brass); }
.footer-phone { font-family: var(--font-display); font-weight: 700; display: block; margin-bottom: 0.5rem; font-size: 1.0625rem; }
.counties { font-size: 0.875rem; line-height: 1.7; }
.trust-line { font-size: 0.75rem; padding-top: 1.5rem; border-top: 1px solid var(--brass); opacity: 0.85; }
.copyright { font-size: 0.75rem; opacity: 0.6; margin-top: 1rem; }
address { font-style: normal; }
```

- [ ] **Step 12: Add JavaScript (scroll reveal + form handler)**

Same as Task 1 Step 12.

- [ ] **Step 13: Verify in browser per spec checklist**

Same checklist as Task 1 Step 13. Pay attention to:
- Brass `#A88752` used ONLY as ornament (never as text on cream)
- Roboto Slab loads at 900 weight for headings
- Portrait testimonial photo aspect ratio holds on mobile
- Dashed `:focus-visible` outline appears (not solid)

- [ ] **Step 14: Commit**

```bash
git add heritage/home.html
git commit -m "Add Warm Heritage direction (4 of 5)"
```

---

## Task 5: Build Direction 5 — Configurator-First

**Files:**
- Create: `configurator/home.html`

**Spec sections:** `## The Five Directions → Direction 5`, `## Direction 5 Deep Dive — Configurator-First` (entire section).

**Direction-specific tokens:**

```css
:root {
	--off-white: #F8F9FA;
	--soft-gray: #E9ECEF;
	--mid-gray: #6C757D;
	--ink: #0A0A0A;
	--teal: #1098AD;
	--text-primary: var(--ink);
	--bg-primary: var(--off-white);
	--bg-panel: var(--soft-gray);
	--accent: var(--teal);
	--font-display: 'Inter', system-ui, sans-serif;
	--font-body: 'Inter', system-ui, sans-serif;
	--font-mono: 'JetBrains Mono', 'Courier New', monospace;
}

:focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; }
```

**Google Fonts URL:** `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap`

### Steps

- [ ] **Step 1: Create file with HTML5 scaffold + Google Fonts**

`<title>Bell Industrial Construction | Configure Your Steel Building</title>` and the Inter + JetBrains Mono URL.

- [ ] **Step 2: Add universal CSS reset + accessibility patterns + direction tokens**

Same pattern as Task 1, with Direction 5 tokens.

- [ ] **Step 3: Add base typography (single Inter family + mono for data)**

```css
body { font-family: var(--font-body); color: var(--text-primary); background: var(--bg-primary); }
h1, h2, h3 { font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; }
h1 { font-size: clamp(1.75rem, 3.5vw, 2.5rem); }
h2 { font-size: clamp(1.5rem, 3vw, 2rem); }
h3 { font-size: clamp(1.125rem, 2vw, 1.375rem); }

.mono { font-family: var(--font-mono); }

.btn-primary {
	display: inline-block;
	background: var(--teal);
	color: var(--off-white);
	padding: 0.875rem 1.75rem;
	font-family: var(--font-body);
	font-weight: 600;
	border: none;
	cursor: pointer;
	min-height: 44px;
	transition: background 0.15s;
}
.btn-primary:hover { background: #0d8294; }
```

- [ ] **Step 4: Build sticky header (logo + nav links + phone)**

```html
<header class="site-header">
	<div class="header-inner">
		<a href="#" class="brand">Bell Industrial</a>
		<nav aria-label="Primary">
			<a href="#configurator">Configure</a>
			<a href="#quote-confirm">Quote</a>
		</nav>
		<a href="tel:8635550142" class="phone-link">(863) 555-0142</a>
	</div>
</header>
```

```css
.site-header { position: sticky; top: 0; z-index: 100; background: var(--off-white); border-bottom: 1px solid var(--soft-gray); }
.header-inner { display: flex; align-items: center; justify-content: space-between; gap: 2rem; padding: 0.875rem 1.5rem; max-width: 1400px; margin: 0 auto; }
.brand { color: var(--ink); font-weight: 700; font-size: 1.0625rem; text-decoration: none; }
.site-header nav { display: flex; gap: 1.25rem; }
.site-header nav a { color: var(--mid-gray); text-decoration: none; font-weight: 500; font-size: 0.9375rem; }
.site-header nav a:hover { color: var(--teal); }
.phone-link { color: var(--ink); font-family: var(--font-mono); font-weight: 700; font-size: 0.9375rem; text-decoration: none; }
@media (max-width: 767px) { .site-header nav { display: none; } }
```

- [ ] **Step 5: Build configurator section HTML scaffold (input panel + SVG preview)**

```html
<section class="configurator-section" id="configurator">
	<div class="container">
		<div class="configurator-grid">
			<div class="configurator-inputs">
				<h2>Configure your building</h2>
				<p class="configurator-intro">Pick your use, set the dimensions, see the building. Florida-engineered to your county's wind zone.</p>
				<form class="configurator-form" id="configurator-form">
					<label class="input-group">
						<span class="input-label">Use case</span>
						<select id="useCase" name="useCase">
							<option value="cattle">Cattle / Hay Barn</option>
							<option value="equestrian">Equestrian</option>
							<option value="commercial">Commercial Warehouse</option>
							<option value="ministorage">Mini-Storage</option>
							<option value="rv">RV / Boat Storage</option>
							<option value="workshop">Workshop / Garage</option>
						</select>
					</label>
					<label class="input-group">
						<span class="input-label">Width <span class="input-value mono" id="widthValue">60'</span></span>
						<input type="range" id="width" min="20" max="100" step="5" value="60">
					</label>
					<label class="input-group">
						<span class="input-label">Length <span class="input-value mono" id="lengthValue">100'</span></span>
						<input type="range" id="length" min="20" max="300" step="10" value="100">
					</label>
					<label class="input-group">
						<span class="input-label">Eave height <span class="input-value mono" id="eaveValue">16'</span></span>
						<input type="range" id="eaveHeight" min="8" max="24" step="1" value="16">
					</label>
					<label class="input-group">
						<span class="input-label">ZIP</span>
						<input type="text" id="zip" inputmode="numeric" maxlength="5" placeholder="33801">
					</label>
					<div class="summary-panel">
						<div class="summary-row"><span>Total area</span><strong class="mono" id="sqftLabel">6,000 sq ft</strong></div>
						<div class="summary-row" id="windZoneRow" hidden><span>Wind zone</span><strong class="mono" id="windZoneLabel">—</strong></div>
					</div>
					<button type="submit" class="btn-primary">Get my quote →</button>
				</form>
			</div>
			<div class="configurator-preview">
				<svg id="buildingSvg" viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" role="img">
					<title>Building preview</title>
					<desc id="buildingDesc">Building preview, 60 feet wide by 100 feet long by 16 feet eave height</desc>
					<line id="groundLine" x1="20" y1="240" x2="380" y2="240" stroke="#0A0A0A" stroke-width="1"/>
					<polygon id="frontFace" points="60,240 60,160 200,100 340,160 340,240" fill="none" stroke="#0A0A0A" stroke-width="2"/>
					<line id="sideTop" x1="200" y1="100" x2="280" y2="60" stroke="#0A0A0A" stroke-width="2"/>
					<line id="sideEaveR" x1="340" y1="160" x2="380" y2="120" stroke="#0A0A0A" stroke-width="2"/>
					<line id="sideBottomR" x1="340" y1="240" x2="380" y2="200" stroke="#0A0A0A" stroke-width="2"/>
					<line id="sideRoofBack" x1="280" y1="60" x2="380" y2="120" stroke="#0A0A0A" stroke-width="2"/>
					<text id="widthCallout" x="200" y="265" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" fill="#1098AD">60' WIDTH</text>
					<text id="lengthCallout" x="380" y="180" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="11" fill="#1098AD">100' LENGTH</text>
					<text id="eaveCallout" x="50" y="200" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="11" fill="#1098AD" transform="rotate(-90 50 200)">16' EAVE</text>
				</svg>
				<p class="preview-disclaimer">Illustrative only. Pricing varies by site, wind exposure, and finish. Get a sealed engineering quote →</p>
			</div>
		</div>
	</div>
</section>
```

```css
.configurator-section { padding: 2rem 0; }
.container { max-width: 1400px; margin: 0 auto; padding: 0 1.5rem; }
.configurator-grid { display: grid; gap: 2rem; }
@media (min-width: 1024px) { .configurator-grid { grid-template-columns: 40% 60%; min-height: 70vh; } }
.configurator-inputs { background: var(--bg-panel); padding: 2rem; }
.configurator-intro { color: var(--mid-gray); margin: 0.5rem 0 2rem; font-size: 0.9375rem; }
.configurator-form { display: flex; flex-direction: column; gap: 1.5rem; }
.input-group { display: block; }
.input-label { display: flex; justify-content: space-between; font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; color: var(--ink); }
.input-value { color: var(--teal); }
.input-group select, .input-group input[type="text"] { display: block; width: 100%; padding: 0.75rem; background: var(--off-white); border: 1px solid var(--soft-gray); font-family: var(--font-body); font-size: 1rem; min-height: 44px; }
.input-group input[type="range"] { display: block; width: 100%; min-height: 44px; accent-color: var(--teal); }
.summary-panel { background: var(--off-white); border: 1px solid var(--soft-gray); padding: 1rem 1.25rem; }
.summary-row { display: flex; justify-content: space-between; padding: 0.5rem 0; font-size: 0.9375rem; }
.summary-row span { color: var(--mid-gray); }
.summary-row strong { color: var(--ink); }
.configurator-preview { background: var(--bg-panel); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem; min-height: 400px; }
#buildingSvg { width: 100%; max-width: 600px; height: auto; }
.preview-disclaimer { font-size: 0.8125rem; color: var(--mid-gray); margin-top: 1.5rem; text-align: center; max-width: 500px; }
```

- [ ] **Step 6: Add configurator JavaScript — state model and use-case defaults**

In the inline `<script>`:

```js
const useCaseDefaults = {
	cattle:      { width: 60, length: 100, eaveHeight: 16, pitch: 4, label: 'Cattle / Hay Barn',     category: 'Agricultural' },
	equestrian:  { width: 36, length: 60,  eaveHeight: 14, pitch: 4, label: 'Equestrian',            category: 'Agricultural' },
	commercial:  { width: 60, length: 100, eaveHeight: 18, pitch: 1, label: 'Commercial Warehouse',  category: 'Commercial'   },
	ministorage: { width: 30, length: 100, eaveHeight: 10, pitch: 1, label: 'Mini-Storage',          category: 'Commercial'   },
	rv:          { width: 30, length: 40,  eaveHeight: 14, pitch: 3, label: 'RV / Boat Storage',     category: 'Residential'  },
	workshop:    { width: 30, length: 40,  eaveHeight: 12, pitch: 3, label: 'Workshop / Garage',     category: 'Residential'  }
};

const state = {
	useCase: 'cattle',
	width: 60,
	length: 100,
	eaveHeight: 16,
	zip: ''
};
```

- [ ] **Step 7: Add wind-zone lookup function**

```js
function lookupWindZone(zip) {
	if (!zip || zip.length !== 5 || !/^\d{5}$/.test(zip)) return null;
	const prefix = zip.slice(0, 3);
	const zones = {
		'333': { mph: '160 mph', exposure: 'Coastal Tampa Bay', region: 'Pinellas / coastal Hillsborough' },
		'334': { mph: '160 mph', exposure: 'Coastal Tampa Bay', region: 'Pinellas / coastal Hillsborough' },
		'335': { mph: '150 mph', exposure: 'Tampa Bay area',    region: 'Tampa / Pasco' },
		'336': { mph: '150 mph', exposure: 'Tampa Bay area',    region: 'Tampa / Pasco' },
		'337': { mph: '150 mph', exposure: 'Tampa Bay area',    region: 'Tampa / Pasco' },
		'338': { mph: '140-150 mph', exposure: 'Polk / Hardee inland', region: 'Polk / Hardee' },
		'339': { mph: '160-170 mph', exposure: 'SW Florida coastal',   region: 'Sarasota / Charlotte / Lee / Collier' },
		'341': { mph: '160-170 mph', exposure: 'SW Florida coastal',   region: 'Sarasota / Charlotte / Lee / Collier' },
		'342': { mph: '160-170 mph', exposure: 'SW Florida coastal',   region: 'Sarasota / Charlotte / Lee / Collier' },
		'343': { mph: '150-160 mph', exposure: 'Nature Coast',         region: 'Hernando / coastal Pasco' },
		'344': { mph: '150-160 mph', exposure: 'Nature Coast',         region: 'Hernando / coastal Pasco' },
		'346': { mph: '150-160 mph', exposure: 'Nature Coast',         region: 'Citrus / Hernando' },
		'349': { mph: '140 mph',     exposure: 'Inland southern',      region: 'Hendry' }
	};
	return zones[prefix] || { mph: 'Outside our service area', region: 'Call (863) 555-0142', outOfArea: true };
}
```

- [ ] **Step 8: Add SVG render function (scales building based on inputs)**

```js
function updateSvg() {
	const W = 400, H = 280;
	const PAD = 60;
	const drawAreaW = W - 2 * PAD;
	const drawAreaH = H - 2 * PAD;

	const scale = Math.min(drawAreaW / state.width, drawAreaH / Math.max(state.eaveHeight + state.width / 4, 20));

	const w = state.width * scale;
	const eave = state.eaveHeight * scale;
	const pitch = useCaseDefaults[state.useCase].pitch;
	const ridge = eave + (state.width / 2) * (pitch / 12) * scale;

	const depth = state.length * scale * 0.4;
	const offsetX = depth * 0.7;
	const offsetY = -depth * 0.5;

	const groundY = H - 40;
	const baseLeftX = W / 2 - w / 2;

	const frontPoints = [
		[baseLeftX, groundY],
		[baseLeftX, groundY - eave],
		[baseLeftX + w / 2, groundY - ridge],
		[baseLeftX + w, groundY - eave],
		[baseLeftX + w, groundY]
	].map(p => p.join(',')).join(' ');
	document.getElementById('frontFace').setAttribute('points', frontPoints);

	document.getElementById('groundLine').setAttribute('y1', groundY);
	document.getElementById('groundLine').setAttribute('y2', groundY);

	const sideTopRX = baseLeftX + w / 2 + offsetX;
	const sideTopRY = groundY - ridge + offsetY;
	const sideEaveRX = baseLeftX + w + offsetX;
	const sideEaveRY = groundY - eave + offsetY;
	const sideBottomRX = baseLeftX + w + offsetX;
	const sideBottomRY = groundY + offsetY;

	const sideTop = document.getElementById('sideTop');
	sideTop.setAttribute('x1', baseLeftX + w / 2);
	sideTop.setAttribute('y1', groundY - ridge);
	sideTop.setAttribute('x2', sideTopRX);
	sideTop.setAttribute('y2', sideTopRY);

	const sideEaveR = document.getElementById('sideEaveR');
	sideEaveR.setAttribute('x1', baseLeftX + w);
	sideEaveR.setAttribute('y1', groundY - eave);
	sideEaveR.setAttribute('x2', sideEaveRX);
	sideEaveR.setAttribute('y2', sideEaveRY);

	const sideBottomR = document.getElementById('sideBottomR');
	sideBottomR.setAttribute('x1', baseLeftX + w);
	sideBottomR.setAttribute('y1', groundY);
	sideBottomR.setAttribute('x2', sideBottomRX);
	sideBottomR.setAttribute('y2', sideBottomRY);

	const sideRoofBack = document.getElementById('sideRoofBack');
	sideRoofBack.setAttribute('x1', sideTopRX);
	sideRoofBack.setAttribute('y1', sideTopRY);
	sideRoofBack.setAttribute('x2', sideEaveRX);
	sideRoofBack.setAttribute('y2', sideEaveRY);

	const widthCallout = document.getElementById('widthCallout');
	widthCallout.setAttribute('x', baseLeftX + w / 2);
	widthCallout.setAttribute('y', groundY + 18);
	widthCallout.textContent = `${state.width}' WIDTH`;

	const lengthCallout = document.getElementById('lengthCallout');
	lengthCallout.setAttribute('x', sideEaveRX + 4);
	lengthCallout.setAttribute('y', sideEaveRY + (sideBottomRY - sideEaveRY) / 2);
	lengthCallout.setAttribute('text-anchor', 'start');
	lengthCallout.textContent = `${state.length}' LENGTH`;

	const eaveCallout = document.getElementById('eaveCallout');
	eaveCallout.setAttribute('x', baseLeftX - 8);
	eaveCallout.setAttribute('y', groundY - eave / 2);
	eaveCallout.setAttribute('transform', `rotate(-90 ${baseLeftX - 8} ${groundY - eave / 2})`);
	eaveCallout.textContent = `${state.eaveHeight}' EAVE`;

	document.getElementById('buildingDesc').textContent = `Building preview, ${state.width} feet wide by ${state.length} feet long by ${state.eaveHeight} feet eave height`;
}
```

- [ ] **Step 9: Add summary panel and label updaters**

```js
function updateLabels() {
	document.getElementById('widthValue').textContent  = `${state.width}'`;
	document.getElementById('lengthValue').textContent = `${state.length}'`;
	document.getElementById('eaveValue').textContent   = `${state.eaveHeight}'`;
	document.getElementById('sqftLabel').textContent   = `${(state.width * state.length).toLocaleString()} sq ft`;

	const zone = lookupWindZone(state.zip);
	const row = document.getElementById('windZoneRow');
	const label = document.getElementById('windZoneLabel');
	if (zone) {
		row.hidden = false;
		row.setAttribute('aria-live', 'polite');
		label.textContent = zone.outOfArea ? zone.mph : `${zone.mph} (${zone.region})`;
	} else {
		row.hidden = true;
	}
}

function render() {
	updateSvg();
	updateLabels();
}
```

- [ ] **Step 10: Add input event handlers (sliders, dropdown, ZIP)**

```js
document.getElementById('useCase').addEventListener('change', (e) => {
	const def = useCaseDefaults[e.target.value];
	state.useCase = e.target.value;
	state.width = def.width;
	state.length = def.length;
	state.eaveHeight = def.eaveHeight;
	document.getElementById('width').value = def.width;
	document.getElementById('length').value = def.length;
	document.getElementById('eaveHeight').value = def.eaveHeight;
	render();
});

document.getElementById('width').addEventListener('input', (e) => {
	state.width = parseInt(e.target.value, 10);
	render();
});
document.getElementById('length').addEventListener('input', (e) => {
	state.length = parseInt(e.target.value, 10);
	render();
});
document.getElementById('eaveHeight').addEventListener('input', (e) => {
	state.eaveHeight = parseInt(e.target.value, 10);
	render();
});
document.getElementById('zip').addEventListener('input', (e) => {
	state.zip = e.target.value.replace(/\D/g, '').slice(0, 5);
	e.target.value = state.zip;
	render();
});
```

- [ ] **Step 11: Add submit handler with confirmation panel (safe DOM construction, no innerHTML)**

```js
document.getElementById('configurator-form').addEventListener('submit', (e) => {
	e.preventDefault();
	const def = useCaseDefaults[state.useCase];
	const zone = lookupWindZone(state.zip);
	let zoneText = '';
	if (zone && !zone.outOfArea) {
		zoneText = ` (${zone.region}, ${zone.mph} wind zone)`;
	} else if (zone && zone.outOfArea) {
		zoneText = ' (outside our service area)';
	}

	const confirmation = document.createElement('div');
	confirmation.className = 'quote-confirmation';
	confirmation.id = 'quote-confirm';
	confirmation.setAttribute('role', 'status');
	confirmation.setAttribute('aria-live', 'polite');

	const heading = document.createElement('h3');
	heading.textContent = 'Quote requested.';

	const para = document.createElement('p');
	para.append('Bell Industrial will return a sealed engineering quote for your ');
	const strong = document.createElement('strong');
	strong.textContent = `${state.width}' × ${state.length}' × ${state.eaveHeight}' ${def.label.toLowerCase()}`;
	para.append(strong);
	para.append(`${zoneText} within 5 business days.`);

	confirmation.append(heading, para);
	document.getElementById('configurator-form').replaceWith(confirmation);
});
```

```css
.quote-confirmation { background: var(--off-white); border-left: 4px solid var(--teal); padding: 1.5rem; margin-top: 1rem; }
.quote-confirmation h3 { color: var(--teal); margin-bottom: 0.75rem; }
.quote-confirmation p { font-size: 0.9375rem; line-height: 1.6; }
.quote-confirmation strong { color: var(--ink); }
```

- [ ] **Step 12: Trigger initial render at end of script**

At the very end of the inline `<script>`:

```js
render();
```

- [ ] **Step 13: Build trust strip section**

```html
<section class="trust-strip">
	<div class="container">
		<p class="mono">1,400+ buildings · FBC engineered · Florida-licensed seals included</p>
	</div>
</section>
```

```css
.trust-strip { background: var(--ink); color: var(--off-white); padding: 1rem 0; text-align: center; }
.trust-strip p { font-size: 0.875rem; letter-spacing: 0.05em; }
```

- [ ] **Step 14: Build use-case quick-click cards (6 cards that pre-fill configurator)**

```html
<section class="quick-picks" data-reveal>
	<div class="container">
		<h2>Or start from a building type</h2>
		<div class="quick-picks-grid">
			<button type="button" class="quick-pick" data-use="cattle">
				<span class="qp-name">Cattle / Hay</span>
				<span class="qp-spec mono">60×100×16</span>
			</button>
			<button type="button" class="quick-pick" data-use="equestrian">
				<span class="qp-name">Equestrian</span>
				<span class="qp-spec mono">36×60×14</span>
			</button>
			<button type="button" class="quick-pick" data-use="commercial">
				<span class="qp-name">Commercial</span>
				<span class="qp-spec mono">60×100×18</span>
			</button>
			<button type="button" class="quick-pick" data-use="ministorage">
				<span class="qp-name">Mini-Storage</span>
				<span class="qp-spec mono">30×100×10</span>
			</button>
			<button type="button" class="quick-pick" data-use="rv">
				<span class="qp-name">RV / Boat</span>
				<span class="qp-spec mono">30×40×14</span>
			</button>
			<button type="button" class="quick-pick" data-use="workshop">
				<span class="qp-name">Workshop / Garage</span>
				<span class="qp-spec mono">30×40×12</span>
			</button>
		</div>
	</div>
</section>
```

```css
.quick-picks { padding: 3rem 0; }
.quick-picks h2 { margin-bottom: 1.5rem; font-size: 1.25rem; color: var(--mid-gray); font-weight: 500; }
.quick-picks-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
@media (min-width: 768px) { .quick-picks-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1024px) { .quick-picks-grid { grid-template-columns: repeat(6, 1fr); } }
.quick-pick { background: var(--bg-panel); border: 1px solid var(--soft-gray); padding: 1.25rem 1rem; cursor: pointer; text-align: left; display: flex; flex-direction: column; gap: 0.25rem; min-height: 80px; transition: border-color 0.15s, background 0.15s; }
.quick-pick:hover { border-color: var(--teal); }
.quick-pick.active { border-color: var(--teal); background: rgba(16, 152, 173, 0.08); }
.qp-name { font-weight: 600; font-size: 0.9375rem; color: var(--ink); }
.qp-spec { font-size: 0.75rem; color: var(--mid-gray); }
```

JS for the quick-pick handler (add to inline `<script>`):

```js
document.querySelectorAll('.quick-pick').forEach((btn) => {
	btn.addEventListener('click', () => {
		const useCase = btn.dataset.use;
		document.getElementById('useCase').value = useCase;
		document.getElementById('useCase').dispatchEvent(new Event('change'));
		document.querySelectorAll('.quick-pick').forEach(b => b.classList.remove('active'));
		btn.classList.add('active');
	});
});
```

- [ ] **Step 15: Build process strip (compressed 4-step)**

```html
<section class="process-strip" data-reveal>
	<div class="container">
		<ol class="process-steps">
			<li><span class="step-num mono">01</span><h3>Quote</h3><p>Sealed engineering within 5 business days.</p></li>
			<li><span class="step-num mono">02</span><h3>Design</h3><p>Florida-licensed engineers seal site-specific drawings.</p></li>
			<li><span class="step-num mono">03</span><h3>Deliver</h3><p>Pre-fabricated steel, single-truck delivery.</p></li>
			<li><span class="step-num mono">04</span><h3>Install</h3><p>Lakeland, Sarasota, Fort Myers crews. 5–14 day raise.</p></li>
		</ol>
	</div>
</section>
```

```css
.process-strip { background: var(--bg-panel); padding: 3rem 0; }
.process-steps { list-style: none; display: grid; gap: 1.5rem; }
@media (min-width: 768px) { .process-steps { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .process-steps { grid-template-columns: repeat(4, 1fr); } }
.step-num { color: var(--teal); font-size: 0.8125rem; letter-spacing: 0.1em; }
.process-steps h3 { margin: 0.5rem 0; font-size: 1.0625rem; }
.process-steps p { font-size: 0.9375rem; color: var(--mid-gray); }
```

- [ ] **Step 16: Build single anchor testimonial section (Linda M., Sarasota)**

```html
<section class="testimonial" data-reveal>
	<div class="container">
		<blockquote>
			<p>"We needed covered storage built and inspected before snowbirds rolled in. Bell Industrial pulled the Sarasota County permit, finished the slab and the steel in seven weeks, and we filled it the week it opened."</p>
			<footer><strong>Linda M.</strong> · RV park owner, Sarasota County</footer>
		</blockquote>
	</div>
</section>
```

```css
.testimonial { padding: 4rem 0; }
.testimonial blockquote { max-width: 800px; margin: 0 auto; text-align: center; }
.testimonial p { font-size: 1.375rem; line-height: 1.5; color: var(--ink); margin-bottom: 1.5rem; }
.testimonial footer { font-size: 0.9375rem; color: var(--mid-gray); font-style: normal; }
```

- [ ] **Step 17: Build minimal footer**

```html
<footer class="site-footer">
	<div class="container">
		<div class="footer-grid">
			<div>
				<p class="footer-brand">Bell Industrial Construction</p>
				<p class="footer-tagline">Configure. Engineer. Build.</p>
			</div>
			<div>
				<a href="tel:8635550142" class="footer-phone">(863) 555-0142</a>
				<address>4820 US Highway 92 East · Lakeland, FL 33801<br>Mon–Fri 7am–6pm</address>
			</div>
			<div>
				<p class="counties">Citrus · Hernando · Pasco · Pinellas · Hillsborough · Polk · Manatee · Sarasota · Hardee · DeSoto · Charlotte · Lee · Collier · Hendry</p>
			</div>
		</div>
		<p class="trust-line">Florida GC License # CGC-XXXXXX · Member NFBA · BBB A+ Rated · Florida Product Approved Components</p>
	</div>
</footer>
```

```css
.site-footer { background: var(--ink); color: var(--off-white); padding: 3rem 0 2rem; }
.footer-grid { display: grid; gap: 2rem; margin-bottom: 1.5rem; }
@media (min-width: 768px) { .footer-grid { grid-template-columns: repeat(3, 1fr); } }
.footer-brand { font-weight: 700; font-size: 1.0625rem; }
.footer-tagline { color: var(--teal); margin-top: 0.5rem; font-size: 0.9375rem; }
.footer-phone { display: block; color: var(--off-white); font-family: var(--font-mono); font-weight: 700; font-size: 1.125rem; text-decoration: none; margin-bottom: 0.75rem; }
.site-footer address { font-style: normal; font-size: 0.875rem; opacity: 0.85; }
.counties { font-size: 0.875rem; opacity: 0.85; line-height: 1.7; }
.trust-line { font-size: 0.75rem; opacity: 0.6; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1); }
```

- [ ] **Step 18: Add scroll-reveal observer (for sections below configurator)**

Same Scroll Reveal Observer as Shared Patterns. Reveal CSS:

```css
[data-reveal] {
	opacity: 0;
	transform: translateY(20px);
	transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
[data-reveal].revealed {
	opacity: 1;
	transform: translateY(0);
}
```

- [ ] **Step 19: Verify in browser per spec checklist + Direction 5 specifics**

Universal checklist same as Task 1 Step 13. Direction 5 specifics:

- Sliders update value labels on input — drag width slider, "60'" should change live
- SVG preview resizes smoothly — drag length slider, building outline scales without jank
- Use-case dropdown reset works — change to "Equestrian", sliders snap to 36/60/14
- Quick-click cards pre-fill configurator — click "Mini-Storage", sliders snap to 30/100/10, dropdown updates, card gets `.active` class
- ZIP input updates wind-zone label — try `33801` (Polk → 140-150 mph), `33901` (Lee/Fort Myers → 160-170 mph), `34601` (Hernando → 150-160 mph), `99999` (out of area → fallback message)
- ZIP input strips non-digits — type letters, only digits should appear
- Get-quote button shows summary modal with current selections
- No JS errors during interaction (Console clean during a full configurator session)
- SVG preview has accessible `<title>` and `<desc>` — inspect SVG, verify text content updates
- Wind-zone label has `aria-live="polite"` on the row element

- [ ] **Step 20: Commit**

```bash
git add configurator/home.html
git commit -m "Add Configurator-First direction (5 of 5)"
```

---

## Task 6: Build Index Landing Page

**Files:**
- Create: `index.html`

**Spec sections:** `## Index Landing Page`

**Dependencies:** All 5 direction files must exist for the links to resolve.

### Steps

- [ ] **Step 1: Create `index.html` with HTML5 scaffold (no Google Fonts)**

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Bell Industrial Construction — Five Design Directions</title>
	<meta name="description" content="Five home page design directions for Bell Industrial Construction. Click through to compare.">
	<style>
		/* Inline styles below */
	</style>
</head>
<body>
	<a href="#main" class="skip-link">Skip to content</a>
	<main id="main">
		<header class="page-header">
			<h1>Bell Industrial Construction</h1>
			<p class="subtitle">Five Design Directions for Home Page</p>
			<p class="brief">Each direction targets a different buyer. Click through to view the home page mockup. After you pick a winner, we'll expand the chosen direction into a full multi-page site.</p>
		</header>
		<nav class="directions" aria-label="Design directions">
			<!-- 5 cards inserted in next step -->
		</nav>
	</main>
</body>
</html>
```

- [ ] **Step 2: Add inline CSS — restrained system-font styling**

```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
	font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	color: #1a1a1a;
	background: #ffffff;
	line-height: 1.6;
	-webkit-font-smoothing: antialiased;
}
.skip-link { position: absolute; top: -100%; left: 0; padding: 0.75rem 1rem; background: #1a1a1a; color: #fff; text-decoration: none; z-index: 999; }
.skip-link:focus { top: 0; }
:focus-visible { outline: 2px solid #1a1a1a; outline-offset: 2px; }

main { max-width: 800px; margin: 0 auto; padding: 4rem 1.5rem; }
.page-header { margin-bottom: 3rem; }
.page-header h1 { font-size: 2rem; margin-bottom: 0.5rem; font-weight: 700; }
.subtitle { font-size: 1.125rem; color: #6c757d; margin-bottom: 1.5rem; }
.brief { font-size: 0.9375rem; color: #495057; line-height: 1.7; max-width: 65ch; }

.directions { display: flex; flex-direction: column; gap: 1rem; }
.direction-card {
	display: block;
	border: 1px solid #dee2e6;
	padding: 1.5rem;
	text-decoration: none;
	color: inherit;
	transition: transform 0.15s, border-color 0.15s, box-shadow 0.15s;
}
.direction-card:hover {
	transform: translateY(-2px);
	border-color: #1a1a1a;
	box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.direction-card-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 0.75rem; }
.palette-chips { display: flex; gap: 4px; flex-shrink: 0; }
.palette-chip { width: 16px; height: 16px; border-radius: 50%; border: 1px solid rgba(0,0,0,0.1); }
.direction-name { font-size: 1.125rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; flex-grow: 1; }
.view-link { font-size: 0.875rem; color: #1a1a1a; }
.direction-concept { font-size: 0.9375rem; margin-bottom: 0.5rem; }
.direction-buyer { font-size: 0.8125rem; color: #6c757d; }
```

- [ ] **Step 3: Add 5 direction cards inside `<nav class="directions">`**

```html
<a href="toro/home.html" class="direction-card">
	<div class="direction-card-header">
		<div class="palette-chips" aria-hidden="true">
			<span class="palette-chip" style="background:#0A1F3D"></span>
			<span class="palette-chip" style="background:#D8362F"></span>
			<span class="palette-chip" style="background:#2A2A2A"></span>
			<span class="palette-chip" style="background:#E8EAEE"></span>
		</div>
		<span class="direction-name">Toro Homage (Elevated)</span>
		<span class="view-link">View →</span>
	</div>
	<p class="direction-concept">Toro's confidence and conversion architecture, elevated above WordPress-tier polish.</p>
	<p class="direction-buyer">Buyer: National price-shopper</p>
</a>

<a href="editorial/home.html" class="direction-card">
	<div class="direction-card-header">
		<div class="palette-chips" aria-hidden="true">
			<span class="palette-chip" style="background:#F4EFE6"></span>
			<span class="palette-chip" style="background:#2E3D2A"></span>
			<span class="palette-chip" style="background:#B45A3C"></span>
			<span class="palette-chip" style="background:#1A1A1A"></span>
		</div>
		<span class="direction-name">Editorial Agricultural</span>
		<span class="view-link">View →</span>
	</div>
	<p class="direction-concept"><em>Modern Farmer</em> cover story applied to a steel buildings site — earthy, photo-led, serif authority.</p>
	<p class="direction-buyer">Buyer: Agricultural — cattle, hay, equestrian</p>
</a>

<a href="technical/home.html" class="direction-card">
	<div class="direction-card-header">
		<div class="palette-chips" aria-hidden="true">
			<span class="palette-chip" style="background:#F2F2EE"></span>
			<span class="palette-chip" style="background:#1B2B4A"></span>
			<span class="palette-chip" style="background:#F5C518"></span>
			<span class="palette-chip" style="background:#101010"></span>
		</div>
		<span class="direction-name">Industrial Technical / Spec-Sheet</span>
		<span class="view-link">View →</span>
	</div>
	<p class="direction-concept">Engineering catalog — Vitsoe meets Caterpillar. Confident in numbers, dimensions, and technical detail.</p>
	<p class="direction-buyer">Buyer: Engineer, specifier, commercial procurement</p>
</a>

<a href="heritage/home.html" class="direction-card">
	<div class="direction-card-header">
		<div class="palette-chips" aria-hidden="true">
			<span class="palette-chip" style="background:#EDE6D6"></span>
			<span class="palette-chip" style="background:#7A2A1F"></span>
			<span class="palette-chip" style="background:#2F4A2E"></span>
			<span class="palette-chip" style="background:#A88752"></span>
		</div>
		<span class="direction-name">Warm Heritage / American Made</span>
		<span class="view-link">View →</span>
	</div>
	<p class="direction-concept">Filson catalog meets Yeti brand — warm, story-driven, owns its American manufacturing identity.</p>
	<p class="direction-buyer">Buyer: Heritage small-business — long-tenure ranchers, second-gen contractors</p>
</a>

<a href="configurator/home.html" class="direction-card">
	<div class="direction-card-header">
		<div class="palette-chips" aria-hidden="true">
			<span class="palette-chip" style="background:#F8F9FA"></span>
			<span class="palette-chip" style="background:#E9ECEF"></span>
			<span class="palette-chip" style="background:#0A0A0A"></span>
			<span class="palette-chip" style="background:#1098AD"></span>
		</div>
		<span class="direction-name">Configurator-First</span>
		<span class="view-link">View →</span>
	</div>
	<p class="direction-concept">The site IS the configurator — Tesla's product builder applied to metal buildings. Real working dimensional preview.</p>
	<p class="direction-buyer">Buyer: Digital-native commercial — developers, online-shopping GCs</p>
</a>
```

- [ ] **Step 4: Verify index page**

Open `index.html`:

- All 5 direction cards render
- Each card has 4 visible color chips matching that direction's palette
- Clicking each card navigates to the correct direction's `home.html`
- Hover state lifts the card and darkens the border
- Keyboard tab order works through cards in document order
- Skip-to-content link works
- No console errors

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Add index landing page linking to all 5 directions"
```

---

## Task 7: Final Cross-Direction Verification

**Files:** None created. Smoke-test all 6 files together.

**Dependencies:** Tasks 1–6 complete.

### Steps

- [ ] **Step 1: Re-verify each direction's full per-direction checklist**

Open each of the 6 files in turn. For each, walk the per-direction checklist from the spec's Verification Approach section:

| Check | toro | editorial | technical | heritage | configurator | index |
|---|---|---|---|---|---|---|
| No console errors | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Renders at 1280px | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Renders at 900px | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Renders at 375px | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| All images load | ☐ | ☐ | ☐ | ☐ | ☐ | n/a |
| Fonts load | ☐ | ☐ | ☐ | ☐ | ☐ | n/a |
| Form fields labeled & accept input | ☐ | ☐ | ☐ | ☐ | ☐ | n/a |
| Form submit shows confirmation | ☐ | ☐ | ☐ | ☐ | ☐ | n/a |
| WCAG AA contrast | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Keyboard tab order logical | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Focus-visible distinct per direction | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Skip link works | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| No mobile horizontal scroll | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

- [ ] **Step 2: Run direction 5 (configurator) interactive verification**

- Open `configurator/home.html`
- Sliders update value labels on input — drag each slider, verify labels update live
- SVG preview resizes smoothly — drag width and length sliders, verify SVG scales without jank
- Use-case dropdown reset — change to each option, verify sliders snap to that use's defaults
- Use-case quick-pick cards — click each of 6 cards, verify configurator updates AND card gets `.active` class
- ZIP wind-zone lookup — try ZIPs from each region:
  - `33801` (Lakeland/Polk) → 140-150 mph
  - `33901` (Fort Myers/Lee) → 160-170 mph
  - `33701` (St. Petersburg/Pinellas) → 160 mph
  - `34601` (Brooksville/Hernando) → 150-160 mph
  - `34102` (Naples/Collier) → 160-170 mph
  - `99999` (out of area) → fallback "Outside our service area" message
- Submit handler — fill form, submit, verify confirmation panel shows actual selected dimensions and county/zone

- [ ] **Step 3: Cross-direction navigation test**

- Open `index.html`
- Click "View →" on each of 5 cards in turn
- Verify each navigates to the correct direction's `home.html`
- Use browser back button to return; verify index renders correctly

- [ ] **Step 4: Browser DevTools accessibility audit (Lighthouse)**

For each direction file, run Lighthouse Accessibility audit (DevTools → Lighthouse → Accessibility only → Generate report). Target: score ≥ 95 per direction. Investigate any AA contrast warnings or semantic HTML issues. Fix in the affected file and re-commit before final approval.

- [ ] **Step 5: Final commit (only if any fixes from Step 4)**

If any fixes were applied during verification:

```bash
git add <fixed files>
git commit -m "Verification fixes from cross-direction audit"
```

If no fixes, skip.

- [ ] **Step 6: Final summary report to operator**

Report to the user:

```
All 5 directions + index landing page complete and verified.

Files:
- index.html
- toro/home.html
- editorial/home.html
- technical/home.html
- heritage/home.html
- configurator/home.html

Verification:
- All directions render at desktop / tablet / mobile
- All forms show inline confirmation on submit
- Direction 5 configurator: sliders, SVG preview, ZIP lookup, quick-picks, submit all functional
- Lighthouse Accessibility score: [N] (target ≥ 95)
- WCAG AA contrast verified per spec's risky-pairing list

Next steps:
- Push commits to origin/main when ready (`git push`)
- Open `index.html` in a browser to start client review
- After client picks a winning direction, scope the depth phase as a follow-up project

The 26 prior-project files in working tree (deleted state) remain untouched.
```

---

## Plan Self-Review

**Spec coverage:** Every spec section maps to one or more tasks:
- Architecture & File Structure → Tasks 1–6 file paths
- The Five Directions (per-direction palette/type/photo/visual moves) → Tasks 1–5
- Section-by-Section Content Plan (7 sections × 5 directions) → Tasks 1–5
- Direction 5 Deep Dive (configurator state, SVG, lookup, JS) → Task 5 Steps 6–11
- Index Landing Page → Task 6
- Cross-Cutting Concerns (responsive, accessibility, photography, fonts) → Shared Patterns + each task's Steps 2/3 + Step 13/19 verification
- Verification Approach → Task 7

**Placeholder scan:** No "TBD" / "TODO" / "implement later." All steps include actual HTML, CSS, JS code or precise commands. Unsplash URLs include a verify-and-substitute disclaimer (specific guidance, not a placeholder).

**Type / identifier consistency in configurator JS:**
- `useCaseDefaults` (Step 6) referenced in Steps 8, 10, 11 ✓
- `lookupWindZone(zip)` (Step 7) called from Steps 9, 11 ✓
- `state` object shape (Step 6) matches reads in Steps 8, 9, 10, 11 ✓
- `render()` (Step 9) called from Steps 10, 12 ✓
- `updateSvg()`, `updateLabels()` (Steps 8, 9) called from `render()` ✓
- DOM IDs consistent across HTML (Step 5) and JS (Steps 6–11): `widthValue`, `lengthValue`, `eaveValue`, `sqftLabel`, `windZoneLabel`, `windZoneRow`, `frontFace`, `groundLine`, `sideTop`, `sideEaveR`, `sideBottomR`, `sideRoofBack`, `widthCallout`, `lengthCallout`, `eaveCallout`, `buildingDesc`, `useCase`, `width`, `length`, `eaveHeight`, `zip`, `configurator-form` ✓

**Issues found and fixed inline:** Submit handler in Task 5 Step 11 originally used `innerHTML` with template literal interpolation. Refactored to safe DOM construction (`createElement`, `textContent`, `append`) to comply with security guidance and the project security note added at top of plan.

**Out-of-spec deviations called out:**
- No automated test framework (matches spec recommendation)
- Unsplash URLs are best-guess starters with verify-and-substitute instructions (matches spec photography sourcing)
- Tabs for indentation in code blocks per workspace `CLAUDE.md`
