/*
 * Bell Metal Buildings — shared mobile nav
 *
 * Loaded on every page. Detects each mock's header pattern, injects
 * a hamburger button if missing, and wires it to toggle the existing
 * nav into a mobile drawer.
 *
 * Mock A: <header class="site-header"> + .nav-row (button already exists)
 * Mock B: <header class="nav-solid|nav-transparent"> + .nav-links
 * Mock C: <header> + .primary-nav  (+ .header-cta)
 */

// Sub-menu data keyed by parent label (normalized lowercase, no punctuation).
// Used both for desktop hover dropdowns and mobile accordion expansions
// on any nav link that carries the `.nav-caret` class.
const SUBMENUS = {
	'buildings': [
		{ label: 'All building types', href: '03-building-types.html', strong: true },
		{ label: 'Garages',         href: '04-garages-detail.html' },
		{ label: 'Workshops',       href: '04-workshops-detail.html' },
		{ label: 'Barns & Farming', href: '04-barns-detail.html' },
		{ label: 'Storage',         href: '04-storage-detail.html' },
		{ label: 'Commercial',      href: '04-commercial-detail.html' },
		{ label: 'Hangars',         href: '04-hangars-detail.html' },
		{ label: 'Quonset Huts',    href: '04-quonset-detail.html' },
		{ label: 'Carports',        href: '04-carports-detail.html' },
		{ label: 'Barndominiums',   href: '04-barndominiums-detail.html' },
		{ label: 'Container Covers',href: '04-container-covers-detail.html' },
		{ label: 'Roofing Systems', href: '04-roofing-detail.html' },
		{ label: 'Sheds',           href: '04-sheds-detail.html' },
	],
	'optionsfinishes': [
		{ label: 'Options & Finishes', href: '06-options-finishes.html', strong: true },
		{ label: 'Foundation',         href: '06-options-finishes.html#foundation' },
		{ label: 'Doors',              href: '06-options-finishes.html#doors' },
		{ label: 'Windows',            href: '06-options-finishes.html#windows' },
		{ label: 'Insulation',         href: '06-options-finishes.html#insulation' },
		{ label: 'Trims & Flashing',   href: '06-options-finishes.html#trims' },
		{ label: 'Skylights',          href: '06-options-finishes.html#skylights' },
		{ label: 'Colors & swatches',  href: '06-options-finishes.html#colors' },
	],
	'about': [
		{ label: 'About Bell',       href: '07-about.html', strong: true },
		{ label: 'Our advantage',    href: '16-our-advantage.html' },
		{ label: 'True pricing',     href: '15-true-pricing.html' },
		{ label: 'Testimonials',     href: '11-testimonials.html' },
		{ label: 'Warranty',         href: '13-warranty.html' },
		{ label: 'Contact us',       href: '08-contact.html' },
	],
};

function _normLabel(text) {
	return String(text || '').toLowerCase().replace(/[^a-z]/g, '');
}

(() => {
	const header = document.querySelector('header');
	if (!header) return;

	// Locate the nav element to toggle
	const nav =
		header.querySelector('.nav-row') ||
		header.querySelector('.nav-links') ||
		header.querySelector('.primary-nav');
	if (!nav) return;

	// Find or create the hamburger button
	let toggle =
		header.querySelector('.menu-toggle') ||
		header.querySelector('[aria-label="Open menu"]');

	if (!toggle) {
		toggle = document.createElement('button');
		toggle.type = 'button';
		toggle.className = 'menu-toggle';
		toggle.setAttribute('aria-label', 'Open menu');
		toggle.setAttribute('aria-expanded', 'false');
		toggle.textContent = '☰'; // ☰
		// Insert into the most-likely header container
		const slot =
			header.querySelector('.header-inner') ||
			header.querySelector('.nav-inner') ||
			header.querySelector('.header-cta') ||
			header.firstElementChild ||
			header;
		// For mock-c: place before header-cta children so it appears at the right
		slot.appendChild(toggle);
	}

	// Inject shared CSS once
	if (!document.getElementById('_nav-css')) {
		const style = document.createElement('style');
		style.id = '_nav-css';
		style.textContent = `
			.menu-toggle{
				display:none;
				align-items:center;justify-content:center;
				width:44px;height:44px;
				background:transparent;
				color:inherit;
				border:1.5px solid currentColor;
				border-radius:8px;
				font-size:22px;
				cursor:pointer;
				margin-left:auto;
				z-index:1001;
				transition:background .15s, color .15s;
			}
			.menu-toggle:hover{ background:rgba(255,255,255,.08); }
			.menu-toggle.is-open{ background:rgba(0,0,0,.06); }
			@media (max-width: 900px){
				.menu-toggle{ display:inline-flex; }
				header .nav-row, header .nav-links, header .primary-nav{
					position:fixed; top:0; right:0; bottom:0;
					width:min(86vw, 320px);
					transform:translateX(110%);
					transition:transform .25s ease-out;
					background:#18181b; color:#fff;
					display:flex; flex-direction:column;
					align-items:stretch; justify-content:flex-start;
					padding:72px 28px 28px;
					gap:6px;
					box-shadow:-12px 0 32px rgba(0,0,0,.32);
					z-index:1000;
					overflow-y:auto;
				}
				header .nav-row.is-open, header .nav-links.is-open, header .primary-nav.is-open{
					transform:translateX(0);
				}
				header .nav-row a, header .nav-links a, header .primary-nav a{
					display:block;
					padding:14px 0;
					color:#fff !important;
					text-decoration:none;
					font-family:inherit;
					font-size:1.05rem;
					letter-spacing:.02em;
					border-bottom:1px solid rgba(255,255,255,.12);
				}
				header .nav-row a:hover, header .nav-links a:hover, header .primary-nav a:hover{
					color:#ffb96a !important;
				}
				header .nav-row select, header .nav-row .btn-phone{
					margin-top:14px;
				}
				/* Mock-c header-cta — also drop into the drawer */
				header .header-cta{
					display:flex; gap:10px; flex-wrap:wrap;
				}
				.menu-backdrop{
					position:fixed; inset:0;
					background:rgba(0,0,0,.45);
					opacity:0; pointer-events:none;
					transition:opacity .2s ease-out;
					z-index:999;
				}
				.menu-backdrop.is-open{
					opacity:1; pointer-events:auto;
				}
				/* Prevent body scroll when drawer is open */
				body.menu-locked{ overflow:hidden; }
			}
		`;
		document.head.appendChild(style);
	}

	// Create one backdrop element
	let backdrop = document.querySelector('.menu-backdrop');
	if (!backdrop) {
		backdrop = document.createElement('div');
		backdrop.className = 'menu-backdrop';
		document.body.appendChild(backdrop);
	}

	function setOpen(open) {
		nav.classList.toggle('is-open', open);
		toggle.classList.toggle('is-open', open);
		backdrop.classList.toggle('is-open', open);
		document.body.classList.toggle('menu-locked', open);
		toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		toggle.textContent = open ? '✕' : '☰'; // ✕ vs ☰
	}

	toggle.addEventListener('click', e => {
		e.stopPropagation();
		setOpen(!nav.classList.contains('is-open'));
	});
	backdrop.addEventListener('click', () => setOpen(false));

	// Close when an in-drawer link is tapped
	nav.addEventListener('click', e => {
		if (e.target.tagName === 'A') setOpen(false);
	});

	// Close on Escape
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false);
	});

	// If viewport widens past breakpoint, force closed
	const mq = window.matchMedia('(min-width: 901px)');
	mq.addEventListener('change', e => { if (e.matches) setOpen(false); });

	// ---------------- Submenus on .nav-caret items ----------------
	const caretLinks = [...nav.querySelectorAll('a.nav-caret, a[class*="nav-caret"]')];
	if (caretLinks.length) {
		// Shared dropdown CSS, injected once
		if (!document.getElementById('_nav-dropdown-css')) {
			const dd = document.createElement('style');
			dd.id = '_nav-dropdown-css';
			dd.textContent = `
				.has-submenu{ position:relative; }
				/* Desktop dropdown */
				.submenu-pop{
					position:absolute; top:calc(100% + 6px); left:0;
					min-width:240px;
					background:#fff; color:#18181b;
					border:1px solid rgba(0,0,0,.08);
					border-radius:10px;
					box-shadow:0 12px 32px rgba(0,0,0,.18);
					padding:10px 0;
					opacity:0; pointer-events:none;
					transform:translateY(-4px);
					transition:opacity .15s, transform .15s;
					z-index:200;
				}
				.has-submenu.is-open > .submenu-pop,
				.has-submenu:hover > .submenu-pop,
				.has-submenu:focus-within > .submenu-pop{
					opacity:1; pointer-events:auto; transform:translateY(0);
				}
				.submenu-pop a{
					display:block;
					padding:8px 18px !important;
					color:#18181b !important;
					font-size:13px !important;
					font-family:inherit;
					font-weight:600 !important;
					text-transform:none !important;
					letter-spacing:.01em !important;
					text-decoration:none;
					border:0 !important;
				}
				.submenu-pop a:hover{
					background:#f4f3f1;
					color:#b87333 !important;
				}
				.submenu-pop a.is-strong{
					font-weight:700 !important;
					color:#b87333 !important;
					border-bottom:1px solid rgba(0,0,0,.08) !important;
					margin-bottom:4px;
					padding-bottom:10px !important;
				}
				/* Mobile accordion (inside the drawer) */
				@media (max-width: 900px){
					.submenu-pop{
						position:static;
						background:transparent !important;
						color:#fff !important;
						border:0 !important;
						box-shadow:none !important;
						padding:0 0 0 12px !important;
						margin:0 0 8px !important;
						min-width:0 !important;
						opacity:1; pointer-events:auto;
						transform:none;
						max-height:0;
						overflow:hidden;
						transition:max-height .25s ease-out;
					}
					.has-submenu.is-open > .submenu-pop{
						max-height:600px;
					}
					.has-submenu:hover > .submenu-pop,
					.has-submenu:focus-within > .submenu-pop{
						/* No hover-open on touch */
						max-height:0;
					}
					.has-submenu.is-open:hover > .submenu-pop,
					.has-submenu.is-open:focus-within > .submenu-pop{
						max-height:600px;
					}
					.submenu-pop a{
						color:rgba(255,255,255,.85) !important;
						background:transparent !important;
						padding:10px 0 !important;
						font-size:.95rem !important;
						border-bottom:1px solid rgba(255,255,255,.06) !important;
					}
					.submenu-pop a:hover{
						color:#ffb96a !important;
						background:transparent !important;
					}
					.submenu-pop a.is-strong{
						color:#ffb96a !important;
						border-bottom:1px solid rgba(255,255,255,.18) !important;
					}
					a.nav-caret.is-open::after,
					a.nav-caret.has-sub.is-open::after{
						transform:rotate(180deg);
					}
				}
				a.nav-caret.has-sub{ cursor:pointer; }
				/* Chevron-expand button (mobile drawer only) */
				.caret-expand{ display:none; }
				@media (max-width: 900px){
					.has-submenu{
						display:flex !important;
						width:100%;
						align-items:center;
						justify-content:space-between;
						flex-wrap:wrap;
						gap:0 !important;
						border-bottom:1px solid rgba(255,255,255,.12);
					}
					.has-submenu > a{
						flex:1 1 auto;
						border-bottom:0 !important;
					}
					.has-submenu .submenu-pop{
						flex:1 1 100%;
						width:100%;
					}
					.caret-expand{
						display:inline-flex;
						align-items:center; justify-content:center;
						width:44px; height:44px;
						background:transparent;
						color:rgba(255,255,255,.7);
						border:0;
						font-size:18px;
						cursor:pointer;
						transition:transform .2s;
						flex:0 0 44px;
					}
					.has-submenu.is-open > .caret-expand{
						transform:rotate(180deg);
						color:#ffb96a;
					}
				}
			`;
			document.head.appendChild(dd);
		}

		caretLinks.forEach(link => {
			const key = _normLabel(link.textContent);
			const items = SUBMENUS[key];
			if (!items) return;
			// Wrap link in a .has-submenu container without breaking layout
			const wrap = document.createElement('span');
			wrap.className = 'has-submenu';
			// Match the nav's flex layout — inline so it sits inline like a link
			wrap.style.display = 'inline-flex';
			wrap.style.alignItems = 'center';
			wrap.style.position = 'relative';
			link.parentNode.insertBefore(wrap, link);
			wrap.appendChild(link);
			link.classList.add('has-sub');

			// Build the submenu list
			const pop = document.createElement('div');
			pop.className = 'submenu-pop';
			pop.setAttribute('role', 'menu');
			items.forEach(it => {
				const a = document.createElement('a');
				a.href = it.href;
				a.textContent = it.label;
				a.setAttribute('role', 'menuitem');
				if (it.strong) a.classList.add('is-strong');
				pop.appendChild(a);
			});
			wrap.appendChild(pop);

			// Mobile drawer: add a separate chevron button so the link
			// text navigates as normal while the chevron expands the
			// submenu in place. Desktop dropdown still opens on :hover.
			const expandBtn = document.createElement('button');
			expandBtn.type = 'button';
			expandBtn.className = 'caret-expand';
			expandBtn.setAttribute('aria-label', 'Expand ' + link.textContent.trim() + ' submenu');
			expandBtn.setAttribute('aria-expanded', 'false');
			expandBtn.textContent = '▾';
			expandBtn.addEventListener('click', e => {
				e.preventDefault();
				e.stopPropagation();
				const isOpen = wrap.classList.toggle('is-open');
				link.classList.toggle('is-open', isOpen);
				expandBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
			});
			// Insert chevron after the link, inside the wrapper
			link.insertAdjacentElement('afterend', expandBtn);
		});

		// (Desktop dropdowns auto-close on mouseleave via :hover CSS;
		// no document-level click handler needed.)
	}
})();
