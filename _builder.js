/* eslint-disable */
/*
 * Bell Metal Buildings — parametric 3D builder
 *
 * Loaded from each mock's 20-builder.html. Reads the configurator
 * panel (#b-w / #b-l / #b-h, .pitch-select, .swatch-strip, the two
 * .counter-row .counter-value spans) and renders a simple metal
 * building in a Three.js scene parked inside .builder-canvas.
 *
 * Inputs are wired so changes update the building geometry, material
 * color, door/window panels, and the .canvas-price tag.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

(() => {
	const canvasEl = document.querySelector('.builder-canvas');
	if (!canvasEl || !window.WebGLRenderingContext) return;

	// State (in feet for human readability — Three.js units == feet).
	const state = {
		width: 40,
		length: 60,
		height: 12,
		pitch: 4,      // rise per 12 run
		color: 0xb87333,
		doors: 2,
		windows: 4,
	};

	const PITCHES = [2, 4, 6, 9];
	const PITCH_LABELS = { 2: '2:12', 4: '4:12', 6: '6:12', 9: '9:12' };

	const SWATCH_HEX = {
		// mock-a palette
		's-bronze': 0xb87333, 's-bronze-deep': 0x7a4a1f, 's-charcoal': 0x34343a,
		's-ink': 0x18181b,    's-cream': 0xf4f3f1,       's-rust': 0x9a3b2a,
		's-promo': 0x6f2622,  's-steel': 0x6f7480,
		// mock-b palette
		's-ember': 0xe26432, 's-conduit': 0x2a7fd4, 's-emerald': 0x16a34a,
		's-burgundy': 0x6f2622, 's-gold': 0xc89a3b, 's-iron': 0x4a4a52,
		's-paper': 0xf4f3f1,
		// mock-c palette
		's-brick': 0xa8362a, 's-spruce': 0x0f2724, 's-brass': 0xb88a3b,
		's-bone': 0xf5efe2, 's-bone-2': 0xd8cfb8,
	};

	// Read defaults from active swatch (per-mock).
	const activeSwatch = document.querySelector('.b-swatch.is-active');
	if (activeSwatch) {
		for (const cls of activeSwatch.classList) {
			if (SWATCH_HEX[cls] !== undefined) {
				state.color = SWATCH_HEX[cls];
				break;
			}
		}
	}

	// ---------------- Three.js setup ----------------
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0xe9e6df);

	// Camera + renderer
	const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	canvasEl.appendChild(renderer.domElement);
	renderer.domElement.style.cssText =
		'position:absolute;inset:0;width:100%;height:100%;display:block;border-radius:inherit;cursor:grab;';

	const camera = new THREE.PerspectiveCamera(38, 16 / 9, 1, 800);
	camera.position.set(70, 45, 70);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.enableDamping = true;
	controls.dampingFactor = 0.08;
	controls.minDistance = 35;
	controls.maxDistance = 220;
	controls.maxPolarAngle = Math.PI / 2 - 0.05;   // keep above ground
	controls.target.set(0, 6, 0);

	// Lights
	scene.add(new THREE.HemisphereLight(0xffffff, 0xd6cfb8, 0.55));
	const sun = new THREE.DirectionalLight(0xfff3d4, 0.95);
	sun.position.set(60, 80, 40);
	sun.castShadow = true;
	sun.shadow.mapSize.set(1024, 1024);
	const sc = 80;
	sun.shadow.camera.left = -sc; sun.shadow.camera.right = sc;
	sun.shadow.camera.top = sc;   sun.shadow.camera.bottom = -sc;
	sun.shadow.camera.near = 1;   sun.shadow.camera.far = 250;
	sun.shadow.bias = -0.0005;
	scene.add(sun);

	// Ground
	const ground = new THREE.Mesh(
		new THREE.CircleGeometry(220, 64),
		new THREE.MeshStandardMaterial({ color: 0xd8cfb8, roughness: 1 })
	);
	ground.rotation.x = -Math.PI / 2;
	ground.receiveShadow = true;
	scene.add(ground);

	// Subtle ground pad under the building
	const pad = new THREE.Mesh(
		new THREE.PlaneGeometry(120, 120),
		new THREE.MeshStandardMaterial({ color: 0xc6bca1, roughness: 1 })
	);
	pad.rotation.x = -Math.PI / 2;
	pad.position.y = 0.01;
	pad.receiveShadow = true;
	scene.add(pad);

	// Building group (cleared and rebuilt whenever inputs change)
	const buildingGroup = new THREE.Group();
	scene.add(buildingGroup);

	// Materials get rebuilt with current color
	function buildBuilding() {
		// Clear previous geometry
		while (buildingGroup.children.length) {
			const obj = buildingGroup.children.pop();
			if (obj.geometry) obj.geometry.dispose();
			if (obj.material) {
				if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
				else obj.material.dispose();
			}
		}

		const wallColor = new THREE.Color(state.color);
		// Slightly darker roof
		const roofColor = wallColor.clone().multiplyScalar(0.82);
		const trimColor = new THREE.Color(0x18181b);
		const wallMat = new THREE.MeshStandardMaterial({
			color: wallColor, roughness: 0.55, metalness: 0.25, side: THREE.DoubleSide,
		});
		const roofMat = new THREE.MeshStandardMaterial({
			color: roofColor, roughness: 0.5, metalness: 0.35, side: THREE.DoubleSide,
		});
		const trimMat = new THREE.MeshStandardMaterial({
			color: trimColor, roughness: 0.6, metalness: 0.3,
		});
		const doorMat = new THREE.MeshStandardMaterial({
			color: 0x2a2a30, roughness: 0.6, metalness: 0.4,
		});
		const winMat = new THREE.MeshStandardMaterial({
			color: 0x8ec7e8, roughness: 0.2, metalness: 0.1,
			transparent: true, opacity: 0.55,
		});

		const W = state.width;
		const L = state.length;
		const H = state.height;
		const ridge = (state.pitch / 12) * (W / 2); // ridge height above eaves

		// ---- Walls ----
		// Front/back: rectangle from y=0..H plus triangular gable from H..H+ridge
		// We'll build them via ExtrudeGeometry from a 2D shape for cleanliness.
		const gableShape = new THREE.Shape();
		gableShape.moveTo(-W / 2, 0);
		gableShape.lineTo( W / 2, 0);
		gableShape.lineTo( W / 2, H);
		gableShape.lineTo( 0,     H + ridge);
		gableShape.lineTo(-W / 2, H);
		gableShape.lineTo(-W / 2, 0);
		const gableGeo = new THREE.ShapeGeometry(gableShape);

		const frontWall = new THREE.Mesh(gableGeo, wallMat);
		frontWall.position.set(0, 0, L / 2);
		frontWall.castShadow = true; frontWall.receiveShadow = true;
		buildingGroup.add(frontWall);

		const backWall = new THREE.Mesh(gableGeo.clone(), wallMat);
		backWall.position.set(0, 0, -L / 2);
		backWall.rotation.y = Math.PI;
		backWall.castShadow = true; backWall.receiveShadow = true;
		buildingGroup.add(backWall);

		// Side walls (long faces) — simple rectangles at y=0..H
		const sideGeo = new THREE.PlaneGeometry(L, H);
		const sideL = new THREE.Mesh(sideGeo, wallMat);
		sideL.position.set(-W / 2, H / 2, 0);
		sideL.rotation.y = Math.PI / 2;
		sideL.castShadow = true; sideL.receiveShadow = true;
		buildingGroup.add(sideL);
		const sideR = new THREE.Mesh(sideGeo.clone(), wallMat);
		sideR.position.set(W / 2, H / 2, 0);
		sideR.rotation.y = -Math.PI / 2;
		sideR.castShadow = true; sideR.receiveShadow = true;
		buildingGroup.add(sideR);

		// ---- Roof: two sloped planes meeting at ridge ----
		const slope = Math.hypot(W / 2, ridge);  // slant length from eave to ridge
		const roofGeo = new THREE.PlaneGeometry(L, slope);
		const angle = Math.atan2(ridge, W / 2);

		const roofA = new THREE.Mesh(roofGeo, roofMat);
		roofA.position.set(-W / 4, H + ridge / 2, 0);
		roofA.rotation.set(-Math.PI / 2, 0, -angle);
		roofA.castShadow = true; roofA.receiveShadow = true;
		buildingGroup.add(roofA);

		const roofB = new THREE.Mesh(roofGeo.clone(), roofMat);
		roofB.position.set( W / 4, H + ridge / 2, 0);
		roofB.rotation.set(-Math.PI / 2, 0, angle);
		// Flip so the visible face points up
		roofB.rotation.y = Math.PI;
		buildingGroup.add(roofB);

		// ---- Trim along eaves + ridge ----
		const eaveTrim = new THREE.Mesh(
			new THREE.BoxGeometry(L + 0.3, 0.6, 0.6),
			trimMat,
		);
		eaveTrim.position.set(0, H + 0.05, W / 2 + 0.15);
		eaveTrim.rotation.y = Math.PI / 2;
		// Two long eaves + ridge cap
		const eaveLeft = eaveTrim.clone();
		eaveLeft.position.set(-W / 2 - 0.05, H, 0);
		buildingGroup.add(eaveLeft);
		const eaveRight = eaveTrim.clone();
		eaveRight.position.set(W / 2 + 0.05, H, 0);
		buildingGroup.add(eaveRight);
		const ridgeCap = new THREE.Mesh(
			new THREE.BoxGeometry(L + 0.4, 0.4, 0.8),
			trimMat,
		);
		ridgeCap.position.set(0, H + ridge + 0.2, 0);
		ridgeCap.rotation.y = Math.PI / 2;
		buildingGroup.add(ridgeCap);

		// ---- Doors on front face ----
		const doorW = 4, doorH = Math.min(8, H - 1);
		const doors = Math.max(0, Math.min(8, state.doors));
		if (doors > 0) {
			const spacing = W / (doors + 1);
			for (let i = 1; i <= doors; i++) {
				const door = new THREE.Mesh(
					new THREE.BoxGeometry(doorW, doorH, 0.2),
					doorMat,
				);
				door.position.set(-W / 2 + spacing * i, doorH / 2, L / 2 + 0.12);
				door.castShadow = true;
				buildingGroup.add(door);
			}
		}

		// ---- Windows on long sides ----
		const winW = 3, winH = 3;
		const wins = Math.max(0, Math.min(12, state.windows));
		if (wins > 0) {
			// Split windows between both long sides; mid-height
			const perSide = Math.ceil(wins / 2);
			const sideSpacing = L / (perSide + 1);
			const winY = H * 0.55;
			for (let side = 0; side < 2; side++) {
				const offsetX = side === 0 ? -W / 2 - 0.12 : W / 2 + 0.12;
				const count = side === 0 ? perSide : wins - perSide;
				if (count <= 0) continue;
				const localSpacing = L / (count + 1);
				for (let i = 1; i <= count; i++) {
					const win = new THREE.Mesh(
						new THREE.BoxGeometry(0.2, winH, winW),
						winMat,
					);
					win.position.set(offsetX, winY, -L / 2 + localSpacing * i);
					buildingGroup.add(win);
				}
			}
		}
	}

	buildBuilding();

	// ---------------- Resize handling ----------------
	function resize() {
		const rect = canvasEl.getBoundingClientRect();
		renderer.setSize(rect.width, rect.height, false);
		camera.aspect = rect.width / Math.max(1, rect.height);
		camera.updateProjectionMatrix();
	}
	resize();
	new ResizeObserver(resize).observe(canvasEl);

	// ---------------- Render loop ----------------
	let raf = 0;
	function tick() {
		raf = requestAnimationFrame(tick);
		controls.update();
		renderer.render(scene, camera);
	}
	tick();

	// ---------------- Price formula + UI updates ----------------
	function updatePriceTag() {
		const sqft = state.width * state.length;
		const base = sqft * 11.5;
		const heightPremium = Math.max(0, state.height - 10) * 950;
		const pitchPremium = Math.max(0, state.pitch - 4) * 480 * (sqft / 1000);
		const doorCost = state.doors * 780;
		const winCost = state.windows * 240;
		const total = base + heightPremium + pitchPremium + doorCost + winCost;
		const rounded = Math.round(total / 50) * 50;

		const priceNum = document.querySelector('.canvas-price .price-num');
		const priceSub = document.querySelector('.canvas-price .price-sub');
		if (priceNum) priceNum.textContent = '$' + rounded.toLocaleString('en-US');
		if (priceSub) {
			priceSub.textContent =
				state.width + ' × ' + state.length + ' × ' + state.height + ' · ' +
				PITCH_LABELS[state.pitch] + ' pitch';
		}
	}
	updatePriceTag();

	// Hide the "Demo build" badge — we have a real demo now.
	const badge = canvasEl.querySelector('.canvas-badge');
	if (badge) badge.textContent = 'Live preview';

	// ---------------- Input wiring ----------------
	function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

	function bindDimInput(id, key, lo, hi) {
		const el = document.getElementById(id);
		if (!el) return;
		el.disabled = false;
		el.style.cursor = 'text';
		el.addEventListener('change', () => {
			const v = parseInt(el.value, 10);
			if (Number.isFinite(v)) {
				state[key] = clamp(v, lo, hi);
				el.value = state[key];
				buildBuilding();
				updatePriceTag();
			} else {
				el.value = state[key];
			}
		});
		el.addEventListener('blur', () => {
			el.dispatchEvent(new Event('change'));
		});
		// Treat Enter the same as blur
		el.addEventListener('keydown', e => {
			if (e.key === 'Enter') el.blur();
		});
	}
	bindDimInput('b-w', 'width', 12, 200);
	bindDimInput('b-l', 'length', 16, 300);
	bindDimInput('b-h', 'height', 8, 30);

	// Pitch — cycle on click
	const pitch = document.querySelector('.pitch-select');
	if (pitch) {
		pitch.removeAttribute('aria-disabled');
		pitch.style.cursor = 'pointer';
		pitch.addEventListener('click', () => {
			const idx = PITCHES.indexOf(state.pitch);
			state.pitch = PITCHES[(idx + 1) % PITCHES.length];
			pitch.textContent = PITCH_LABELS[state.pitch];
			buildBuilding();
			updatePriceTag();
		});
	}

	// Swatches — click to recolor
	const swatches = document.querySelectorAll('.b-swatch');
	swatches.forEach(sw => {
		sw.style.cursor = 'pointer';
		sw.addEventListener('click', () => {
			swatches.forEach(s => s.classList.remove('is-active'));
			sw.classList.add('is-active');
			for (const cls of sw.classList) {
				if (SWATCH_HEX[cls] !== undefined) {
					state.color = SWATCH_HEX[cls];
					buildBuilding();
					updatePriceTag();
					break;
				}
			}
		});
	});

	// Counter +/- buttons — wire by row
	document.querySelectorAll('.counter-row').forEach(row => {
		const labelEl = row.querySelector('.label');
		const valueEl = row.querySelector('.counter-value');
		if (!labelEl || !valueEl) return;
		const kind = labelEl.textContent.trim().toLowerCase();   // "doors" or "windows"
		const key = kind === 'doors' ? 'doors' : 'windows';
		const lo = 0;
		const hi = key === 'doors' ? 8 : 12;
		const buttons = row.querySelectorAll('button');
		buttons.forEach(btn => {
			btn.disabled = false;
			btn.style.cursor = 'pointer';
			btn.addEventListener('click', () => {
				const isMinus = btn.getAttribute('aria-label')?.toLowerCase().includes('decrease');
				state[key] = clamp(state[key] + (isMinus ? -1 : 1), lo, hi);
				valueEl.textContent = state[key];
				buildBuilding();
				updatePriceTag();
			});
		});
	});

	// Canvas tools (Save / Share / Reset)
	const tools = document.querySelectorAll('.canvas-tool');
	tools.forEach(t => { t.disabled = false; });
	const [saveBtn, shareBtn, resetBtn] = tools;
	if (resetBtn) {
		resetBtn.addEventListener('click', () => {
			state.width = 40; state.length = 60; state.height = 12;
			state.pitch = 4;  state.doors = 2;  state.windows = 4;
			const wEl = document.getElementById('b-w'); if (wEl) wEl.value = '40';
			const lEl = document.getElementById('b-l'); if (lEl) lEl.value = '60';
			const hEl = document.getElementById('b-h'); if (hEl) hEl.value = '12';
			if (pitch) pitch.textContent = '4:12';
			document.querySelectorAll('.counter-row').forEach(row => {
				const lbl = row.querySelector('.label')?.textContent.trim().toLowerCase();
				const v = row.querySelector('.counter-value');
				if (v) v.textContent = lbl === 'doors' ? '2' : '4';
			});
			buildBuilding();
			updatePriceTag();
		});
	}
	if (saveBtn) {
		saveBtn.addEventListener('click', () => {
			alert('Saved! (mock) In production this would store your config to your account.');
		});
	}
	if (shareBtn) {
		shareBtn.addEventListener('click', async () => {
			const params = new URLSearchParams({
				w: state.width, l: state.length, h: state.height,
				p: state.pitch, d: state.doors, win: state.windows,
				c: '#' + state.color.toString(16).padStart(6, '0'),
			});
			const url = location.origin + location.pathname + '?' + params.toString();
			try {
				await navigator.clipboard.writeText(url);
				alert('Share link copied to clipboard.');
			} catch {
				prompt('Copy this share link:', url);
			}
		});
	}

	// Hydrate from URL query if present
	const qp = new URLSearchParams(location.search);
	const num = (k, lo, hi, dflt) => {
		const v = parseInt(qp.get(k), 10);
		return Number.isFinite(v) ? clamp(v, lo, hi) : dflt;
	};
	if ([...qp.keys()].length) {
		state.width = num('w', 12, 200, state.width);
		state.length = num('l', 16, 300, state.length);
		state.height = num('h', 8, 30, state.height);
		state.pitch = PITCHES.includes(num('p', 2, 9, state.pitch))
			? num('p', 2, 9, state.pitch) : state.pitch;
		state.doors = num('d', 0, 8, state.doors);
		state.windows = num('win', 0, 12, state.windows);
		const c = qp.get('c');
		if (c && /^#?[0-9a-fA-F]{6}$/.test(c)) {
			state.color = parseInt(c.replace('#', ''), 16);
		}
		// Reflect in DOM
		const wEl = document.getElementById('b-w'); if (wEl) wEl.value = state.width;
		const lEl = document.getElementById('b-l'); if (lEl) lEl.value = state.length;
		const hEl = document.getElementById('b-h'); if (hEl) hEl.value = state.height;
		if (pitch) pitch.textContent = PITCH_LABELS[state.pitch];
		document.querySelectorAll('.counter-row').forEach(row => {
			const lbl = row.querySelector('.label')?.textContent.trim().toLowerCase();
			const v = row.querySelector('.counter-value');
			if (v) v.textContent = lbl === 'doors' ? state.doors : state.windows;
		});
		buildBuilding();
		updatePriceTag();
	}

	// Strip the static background image so the Three.js canvas is what shows.
	canvasEl.style.backgroundImage = 'none';
	canvasEl.style.background = '#e9e6df';
})();
