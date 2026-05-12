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
})();
