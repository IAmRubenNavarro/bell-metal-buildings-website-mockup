/*
 * Bell Metal Buildings — shared tap-to-zoom lightbox
 *
 * Auto-detects photo elements on the page (any element whose computed
 * background-image is a real url(...) and is at least 120x80 in size),
 * makes them tappable, and shows a fullscreen viewer with:
 *   - Previous / Next buttons
 *   - Swipe gestures on touch devices
 *   - Arrow-key + Escape keyboard support
 *   - Tap on the backdrop to close
 *
 * Skips photos that are inside <a> or <button> so links still navigate.
 */

(() => {
	function extractUrl(el) {
		const bg = getComputedStyle(el).backgroundImage;
		const m = bg.match(/url\(["']?([^"')]+)["']?\)/);
		return m ? m[1] : null;
	}

	function isPhotoEl(el) {
		if (el.dataset.lightboxIgnore != null) return false;
		const url = extractUrl(el);
		if (!url || url.startsWith('data:')) return false;
		const r = el.getBoundingClientRect();
		if (r.width < 120 || r.height < 80) return false;
		// Skip photos that act as links/buttons — they have their own behavior
		if (el.closest('a, button')) return false;
		return true;
	}

	function makeBtn(cls, label, text) {
		const b = document.createElement('button');
		b.type = 'button';
		b.className = cls;
		b.setAttribute('aria-label', label);
		b.textContent = text;
		return b;
	}

	function init() {
		const photos = [...document.querySelectorAll('*')].filter(isPhotoEl);
		if (!photos.length) return;

		const urls = photos.map(extractUrl);

		const style = document.createElement('style');
		style.id = '_lightbox-css';
		style.textContent = `
			.lb-photo-hot{ cursor:zoom-in; }
			.lb-overlay{
				position:fixed; inset:0; background:rgba(0,0,0,.92);
				z-index:9999;
				display:none; align-items:center; justify-content:center;
				touch-action:none;
			}
			.lb-overlay.is-open{ display:flex; }
			.lb-stage{
				width:100%; height:100%;
				background-position:center; background-size:contain;
				background-repeat:no-repeat;
				transition:opacity .12s;
			}
			.lb-close, .lb-prev, .lb-next{
				position:absolute;
				background:rgba(0,0,0,.5); color:#fff;
				border:1px solid rgba(255,255,255,.4);
				width:48px; height:48px;
				border-radius:24px;
				font-size:22px; line-height:1;
				cursor:pointer; z-index:1;
				display:flex; align-items:center; justify-content:center;
			}
			.lb-close:hover, .lb-prev:hover, .lb-next:hover{ background:rgba(0,0,0,.75); }
			.lb-close{ top:max(16px, env(safe-area-inset-top,16px)); right:16px; }
			.lb-prev{ left:12px;  top:50%; transform:translateY(-50%); }
			.lb-next{ right:12px; top:50%; transform:translateY(-50%); }
			.lb-counter{
				position:absolute;
				bottom:max(16px, env(safe-area-inset-bottom,16px));
				left:50%; transform:translateX(-50%);
				color:rgba(255,255,255,.9);
				font:14px/1.4 system-ui,-apple-system,sans-serif;
				background:rgba(0,0,0,.45);
				padding:4px 12px; border-radius:12px;
			}
			@media (max-width: 480px){
				.lb-prev, .lb-next{ width:42px; height:42px; }
				.lb-prev{ left:8px; } .lb-next{ right:8px; }
			}
		`;
		document.head.appendChild(style);

		const overlay = document.createElement('div');
		overlay.className = 'lb-overlay';
		overlay.setAttribute('role', 'dialog');
		overlay.setAttribute('aria-hidden', 'true');

		const btnClose = makeBtn('lb-close', 'Close photo viewer', '✕');
		const btnPrev  = makeBtn('lb-prev',  'Previous photo',     '‹');
		const btnNext  = makeBtn('lb-next',  'Next photo',         '›');

		const stage = document.createElement('div');
		stage.className = 'lb-stage';
		stage.setAttribute('role', 'img');
		stage.setAttribute('aria-label', 'Enlarged photo');

		const counter = document.createElement('div');
		counter.className = 'lb-counter';
		counter.setAttribute('aria-live', 'polite');

		overlay.appendChild(btnClose);
		overlay.appendChild(btnPrev);
		overlay.appendChild(btnNext);
		overlay.appendChild(stage);
		overlay.appendChild(counter);
		document.body.appendChild(overlay);

		let idx = 0;

		function show(i) {
			idx = (i + urls.length) % urls.length;
			stage.style.backgroundImage = 'url("' + urls[idx] + '")';
			counter.textContent = (idx + 1) + ' / ' + urls.length;
		}
		function openAt(i) {
			show(i);
			overlay.classList.add('is-open');
			overlay.setAttribute('aria-hidden', 'false');
			document.body.style.overflow = 'hidden';
		}
		function close() {
			overlay.classList.remove('is-open');
			overlay.setAttribute('aria-hidden', 'true');
			document.body.style.overflow = '';
		}

		photos.forEach((el, i) => {
			el.classList.add('lb-photo-hot');
			el.setAttribute('role', 'button');
			el.setAttribute('tabindex', '0');
			el.setAttribute('aria-label', 'View photo ' + (i + 1) + ' of ' + photos.length + ' larger');
			el.addEventListener('click', e => {
				// Let real links/buttons inside the photo still navigate (e.g. CTAs over a hero photo)
				if (e.target.closest('a, button')) return;
				e.preventDefault();
				openAt(i);
			});
			el.addEventListener('keydown', e => {
				if (e.target !== el) return;
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					openAt(i);
				}
			});
		});

		btnClose.addEventListener('click', e => { e.stopPropagation(); close(); });
		btnPrev.addEventListener('click',  e => { e.stopPropagation(); show(idx - 1); });
		btnNext.addEventListener('click',  e => { e.stopPropagation(); show(idx + 1); });
		overlay.addEventListener('click', e => {
			if (e.target === overlay || e.target === stage) close();
		});
		document.addEventListener('keydown', e => {
			if (!overlay.classList.contains('is-open')) return;
			if (e.key === 'Escape') close();
			else if (e.key === 'ArrowLeft')  show(idx - 1);
			else if (e.key === 'ArrowRight') show(idx + 1);
		});

		// Touch swipe (left/right) to navigate
		let tx = 0, ty = 0;
		overlay.addEventListener('touchstart', e => {
			tx = e.touches[0].clientX;
			ty = e.touches[0].clientY;
		}, { passive: true });
		overlay.addEventListener('touchend', e => {
			const dx = e.changedTouches[0].clientX - tx;
			const dy = e.changedTouches[0].clientY - ty;
			if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
				show(idx + (dx < 0 ? 1 : -1));
			}
		}, { passive: true });
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
