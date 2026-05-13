# CLAUDE.md

Guidance for Claude Code (claude.ai/code) when working in this repository.

## Project

Bell Metal Buildings website mockup — five visual-direction concepts (A/B/C/D/E) for client review. Static HTML/CSS/JS with no backend; deployed via GitHub Pages from `main` at the repo root.

Live preview: https://iamrubennavarro.github.io/bell-metal-buildings-website-mockup/

## Repository layout

- `index.html` — concept-review hub linking to all five mocks.
- `mock-a/` … `mock-e/` — one folder per direction. Each ships ~20–30 HTML pages following the same numbered template (`01-design-system`, `02-homepage`, `03-building-types`, `04-<type>-detail.html` × 16, `05`–`20`).
- `mock-?/_shared.css` — direction-scoped tokens and component styles.
- `mock-?/HANDOFF.md` — per-direction design notes.
- Shared scripts at repo root, loaded relatively from each mock page:
  - `_nav.js` — mobile hamburger drawer + desktop hover submenus (uses `.nav-caret` markers).
  - `_lightbox.js` — auto-attaches a fullscreen viewer to any element with a real `background-image`; skips elements inside `<a>`/`<button>`.
  - `_photo-carousel.js` — in-place photo cycling for PDP `.two-col-photo` blocks and mock-d/e `.pcard-media` product cards. Wires arrows + pointer-events swipe (touch + mouse-drag).
  - `_builder.js` — Three.js parametric building configurator on each `20-builder.html`. Loads `three@0.160.0` via import map from jsdelivr.

## Coding preferences

- **Indentation:** tabs only, never spaces.
- **Style:** concise, minimal — no over-engineering, no premature abstraction.
- **Comments:** only when the *why* is non-obvious. Don't restate what the code does.
- **No emojis** in code, responses, or commit messages.
- **HTML:** keep pages standalone (no build step); share via the root scripts.
- **DOM writes:** prefer `textContent`; reserve `innerHTML` for trusted markup with a clear reason.

## Workflow

- **Plan first.** Present an approach and wait for approval before non-trivial edits. The user may explicitly override this ("don't ask, just fix") — honor that when stated.
- **Commits:** do not auto-commit. Suggest a commit message and wait for explicit approval, unless the user has authorized auto-commit for the current task.
- **Mock-?/HANDOFF.md** is documentation only — touch it only when the corresponding mock changes structurally.
- **Cross-mock changes:** if a shared script or pattern changes, update every affected mock in the same commit. The mocks are not meant to drift apart.

## Notes for future work

- Pages are static; there is no test suite. "Tests" here mean visual verification in a browser at the deployed Pages URL (or a local static server).
- Three.js loads from `cdn.jsdelivr.net` via import map. Import-map bare imports don't currently support `integrity=` — if SRI becomes a requirement, switch to module-preload links with hashes or vendor the file.
- `_lightbox.js` enumerates `document.querySelectorAll('*')` at load and filters by computed `background-image`. Acceptable for mockup-scale DOMs; revisit if pages grow much larger.
- Search forms on every page use `onsubmit="return false"` because there is no backend — intentional, not a defect.
