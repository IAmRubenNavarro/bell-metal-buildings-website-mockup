/*
 * Bell Metal Buildings — in-place photo carousel for PDP two-col-photo blocks.
 *
 * Each .two-col-photo block ships with prev/next arrows and a "N / 6" counter,
 * but originally had no behavior. This script:
 *   - Picks a 6-photo pool that matches the page's building type (parsed from
 *     the URL: 04-<type>-detail.html → POOLS[<type>]).
 *   - Wires each block's arrows to cycle through the pool.
 *   - Updates the counter ("3 / 6" etc).
 *   - Staggers each block's starting index so blocks display different photos.
 *
 * Coexists with _lightbox.js — the lightbox reads each block's current
 * background-image at open time, so cycled photos appear correctly enlarged.
 */

(() => {
	const _u = id => `https://images.unsplash.com/photo-${id}?w=1400&q=80&auto=format&fit=crop`;

	// Pointer-events swipe helper, works for both touch and mouse.
	// onSwipe(dir) is called with -1 (left) or +1 (right).
	// Companion CSS rule sets `touch-action: pan-y` on the target so the browser
	// keeps vertical scroll but routes horizontal motion here (so iOS Safari
	// doesn't fire touchcancel before we see the gesture).
	function wireSwipe(target, onSwipe) {
		let sx = 0, sy = 0, lx = 0, ly = 0, pid = null;
		target.addEventListener('pointerdown', e => {
			if (e.pointerType === 'mouse' && e.button !== 0) return;
			pid = e.pointerId;
			sx = lx = e.clientX;
			sy = ly = e.clientY;
			try { target.setPointerCapture(pid); } catch {}
		});
		target.addEventListener('pointermove', e => {
			if (e.pointerId !== pid) return;
			lx = e.clientX;
			ly = e.clientY;
		});
		const end = e => {
			if (e.pointerId !== pid) return;
			pid = null;
			const dx = lx - sx, dy = ly - sy;
			if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
				onSwipe(dx < 0 ? 1 : -1);
				// Swallow the synthetic click that follows a mouse-drag, so the
				// lightbox doesn't open right after the user drags to slide.
				target.addEventListener('click', ev => {
					ev.stopPropagation();
					ev.preventDefault();
				}, { capture: true, once: true });
			}
		};
		target.addEventListener('pointerup', end);
		target.addEventListener('pointercancel', end);
	}

	// Each pool has 6 metal-building photos curated for that building category.
	const POOLS = {
		garages: [
			'1676065701768-17185472200c',
			'1614687851910-31ed1fdfa474',
			'1518197529634-614c44a6e6a8',
			'1738101014614-5a5cbd30e5cf',
			'1721152395209-f9ca76755948',
			'1637300417161-bff1e04ea9f6',
		].map(_u),
		workshops: [
			'1518197529634-614c44a6e6a8',
			'1738101014614-5a5cbd30e5cf',
			'1721152395209-f9ca76755948',
			'1637300417161-bff1e04ea9f6',
			'1706367514457-6aee115ab362',
			'1706367515111-967f3ac8360b',
		].map(_u),
		barns: [
			'1606172745561-07a214874f18',
			'1770501389758-dedc7f5e947b',
			'1742273877541-432d7326b260',
			'1755702612268-81c9d9354f30',
			'1691764581227-1d479e7da338',
			'1714732088205-3a57fbe1931c',
		].map(_u),
		barndominiums: [
			'1770501389758-dedc7f5e947b',
			'1742273877541-432d7326b260',
			'1606172745561-07a214874f18',
			'1755702612268-81c9d9354f30',
			'1714732087411-445447a07670',
			'1776943970557-09e078d9d933',
		].map(_u),
		carports: [
			'1676065701768-17185472200c',
			'1614687851910-31ed1fdfa474',
			'1518197529634-614c44a6e6a8',
			'1738101014614-5a5cbd30e5cf',
			'1637300417161-bff1e04ea9f6',
			'1706367514457-6aee115ab362',
		].map(_u),
		commercial: [
			'1763926025477-423847028860',
			'1581709609058-9f21b0a0e7b5',
			'1514350534070-1a70129314c4',
			'1711931290007-c0dcbd574c7c',
			'1650064175786-601947e1e3ca',
			'1763926025678-95d196d0ab28',
		].map(_u),
		'container-covers': [
			'1763926025477-423847028860',
			'1763926025678-95d196d0ab28',
			'1763926025680-7966e45e48f5',
			'1650064176407-be3b396fe4ea',
			'1763926062529-1edf8664c366',
			'1769497165127-a6400eb3edf0',
		].map(_u),
		hangars: [
			'1711931290007-c0dcbd574c7c',
			'1763926025477-423847028860',
			'1581709609058-9f21b0a0e7b5',
			'1650064175786-601947e1e3ca',
			'1763926025680-7966e45e48f5',
			'1763926062529-1edf8664c366',
		].map(_u),
		industrial: [
			'1527335988388-b40ee248d80c',
			'1562088997-ed2fbeef1cd6',
			'1649587345666-0f4ad68aa723',
			'1509024368907-57294758cfc5',
			'1645434866122-b458f9829981',
			'1651855833979-80d8d469cc33',
		].map(_u),
		ministorage: [
			'1763926025477-423847028860',
			'1581709609058-9f21b0a0e7b5',
			'1763926025678-95d196d0ab28',
			'1763926025680-7966e45e48f5',
			'1650064176407-be3b396fe4ea',
			'1763926062529-1edf8664c366',
		].map(_u),
		quonset: [
			'1778131852093-7ae53a3894ad',
			'1527335988388-b40ee248d80c',
			'1562088997-ed2fbeef1cd6',
			'1649587345666-0f4ad68aa723',
			'1509024368907-57294758cfc5',
			'1645434866122-b458f9829981',
		].map(_u),
		roofing: [
			'1649587597799-4c227640f4f8',
			'1605159149559-abaaa7bc476c',
			'1515100665905-d66c4dea74ae',
			'1739599211500-74e04a9ca175',
			'1602819604554-4eeace2aacda',
			'1619155706492-74cb8b6375a3',
		].map(_u),
		sheds: [
			'1606172745561-07a214874f18',
			'1770501389758-dedc7f5e947b',
			'1742273877541-432d7326b260',
			'1755702612268-81c9d9354f30',
			'1676105672761-4aa0d48d6f33',
			'1714732088205-3a57fbe1931c',
		].map(_u),
		storage: [
			'1763926025477-423847028860',
			'1581709609058-9f21b0a0e7b5',
			'1514350534070-1a70129314c4',
			'1711931290007-c0dcbd574c7c',
			'1763926025678-95d196d0ab28',
			'1763926025680-7966e45e48f5',
		].map(_u),
		warehouses: [
			'1763926025477-423847028860',
			'1581709609058-9f21b0a0e7b5',
			'1514350534070-1a70129314c4',
			'1711931290007-c0dcbd574c7c',
			'1650064175786-601947e1e3ca',
			'1763926025678-95d196d0ab28',
		].map(_u),
		arenas: [
			'1711931290007-c0dcbd574c7c',
			'1514350534070-1a70129314c4',
			'1763926025477-423847028860',
			'1581709609058-9f21b0a0e7b5',
			'1650064175786-601947e1e3ca',
			'1763926025680-7966e45e48f5',
		].map(_u),
	};
	const DEFAULT_POOL = POOLS.industrial;

	function detectPool() {
		const m = location.pathname.match(/04-([a-z-]+)-detail\.html/);
		if (!m) return DEFAULT_POOL;
		return POOLS[m[1]] || DEFAULT_POOL;
	}

	function init() {
		const photos = [...document.querySelectorAll('.two-col-photo')];
		if (!photos.length) return;

		const pool = detectPool();
		const total = pool.length;

		photos.forEach((photo, photoIdx) => {
			let idx = photoIdx % total;
			const counter = photo.querySelector('.counter');
			const arrows = photo.querySelectorAll('.arrow');

			function setPhoto(i) {
				idx = (i + total) % total;
				// Override the bg-* class's !important rule with an inline override
				photo.style.setProperty(
					'background-image',
					`linear-gradient(135deg, rgba(0,0,0,.2), rgba(0,0,0,.45)), url("${pool[idx]}")`,
					'important'
				);
				if (counter) counter.textContent = (idx + 1) + ' / ' + total;
			}

			setPhoto(idx);

			wireSwipe(photo, dir => setPhoto(idx + dir));

			arrows[0]?.addEventListener('click', e => {
				e.stopPropagation();
				e.preventDefault();
				setPhoto(idx - 1);
			});
			arrows[1]?.addEventListener('click', e => {
				e.stopPropagation();
				e.preventDefault();
				setPhoto(idx + 1);
			});
		});
	}

	// Mock-d / mock-e use `.pcard-media` blocks on every product card.
	// Each card carries a `.pcard-cta` href to its category PDP, which we
	// use to look up the right photo pool.
	function initPcard() {
		const cards = [...document.querySelectorAll('.pcard-media')];
		if (!cards.length) return;

		cards.forEach((media, cardIdx) => {
			const photo = media.querySelector('.pcard-photo');
			const arrows = media.querySelectorAll('.pcard-arrows button');
			if (!photo || arrows.length < 2) return;

			const parent = media.closest('.product-card') || media.parentElement;
			const linkEl = parent?.querySelector('a[href*="-detail.html"]');
			const href = linkEl?.getAttribute('href') || '';
			const m = href.match(/04-([a-z-]+)-detail\.html/);
			const pool = (m && POOLS[m[1]]) || DEFAULT_POOL;
			const total = pool.length;

			// Stagger initial photo by card index so adjacent cards differ
			let idx = cardIdx % total;

			function setPhoto(i) {
				idx = (i + total) % total;
				photo.style.setProperty(
					'background-image',
					`linear-gradient(135deg, rgba(15,30,46,.06), rgba(15,30,46,.32)), url("${pool[idx]}")`,
					'important'
				);
			}

			setPhoto(idx);

			arrows[0].addEventListener('click', e => {
				e.stopPropagation();
				e.preventDefault();
				setPhoto(idx - 1);
			});
			arrows[1].addEventListener('click', e => {
				e.stopPropagation();
				e.preventDefault();
				setPhoto(idx + 1);
			});

			wireSwipe(photo, dir => setPhoto(idx + dir));
		});
	}

	function bootAll() { init(); initPcard(); }

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', bootAll);
	} else {
		bootAll();
	}
})();
