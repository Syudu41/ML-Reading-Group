# MLRG Website — Claude Mistakes & Guidelines

This file records past mistakes and constraints to prevent repeating them.
Claude must read this before editing any MLRG website files.

---

## Hard Constraints (never violate)

| Rule | Reason |
|---|---|
| No npm, no package.json, no node_modules | Static site — no build step. Tailwind via CDN only. |
| No framework (React, Vue, etc.) | Vanilla HTML + JS only, as specified in MLRG-arch.md |
| No build tools (Vite, Webpack, Parcel) | GitHub Pages serves raw files directly |
| Do not commit `assets/og-image.png` if it doesn't exist | It's referenced in meta but optional at launch |

---

## Logo Handling

- Logo placeholder is currently `assets/logo.svg`
- The spec calls for `assets/logo.png` — when the real logo file is provided, update **all three** HTML files:
  - `index.html` — `src="assets/logo.svg"` (appears 3× in navbar, overlay, welcome section) + `<link rel="icon">`
  - `archive.html` — navbar logo + `<link rel="icon">`
  - `contact.html` — navbar logo + `<link rel="icon">`
- Change `type="image/svg+xml"` → `type="image/png"` on the favicon `<link>` tag when switching to PNG

---

## REPLACE Comments

- All user-specific content is wrapped in `<!-- REPLACE: ... -->` / `<!-- /REPLACE -->` pairs
- **Never remove these comments** — they mark content the user still needs to fill in
- When updating real content, keep the comment as a reference marker above/below the replaced block

---

## Archive Maintenance Pattern

When a session is completed:
1. Remove its `<tr>` row from the **Upcoming Presentations** table in `index.html` (Section D)
2. Also update the **Next Session card** in `index.html` (Section C) to show the next upcoming session
3. Add the completed row to `archive.html` under `#current-semester` — **most recent first** (reverse chronological)
4. At the start of each new semester, move ALL rows from `#current-semester` to `#previous-semesters` under the appropriate semester `<h2>` label

## Slide File Naming

Convention: `slides/YYYY-MM-DD-presenterlastname.ext`

Example: `slides/2026-04-17-doe.pdf`

Links in HTML: `<a href="slides/2026-04-17-doe.pdf">Slides (PDF)</a>`

---

## JS Patterns

- `archive-row` class is required on every `<tr>` in archive tables — JS search filtering depends on it
- `initLandingAnimation` is guard-gated on `document.getElementById('landing-overlay')` — only runs on index.html
- `initArchiveToggle` + `initArchiveSearch` are guard-gated on `document.getElementById('btn-current')` — only run on archive.html
- `initMobileNav` runs on all pages

---

## CSS Patterns

- Design tokens are CSS custom properties on `:root` in `css/custom.css` — use `var(--token-name)` everywhere, not hardcoded hex values
- Tailwind utilities are used for layout/spacing; `custom.css` owns colors, animations, and component-level styles
- Max content width is `1120px` via `.content-wrap` class — always wrap page content in this
- Section vertical padding is via `.section-py` class — use it on every `<section>`
