# MLRG Website — Claude Mistakes & Guidelines

This file records past mistakes and constraints to prevent repeating them.
Claude must read this before editing any MLRG website files.

---

## index.html Has No Upcoming Table

The "Upcoming Presentations" table (Section D) was removed from `index.html`.
The Next Session card in Section C is the only upcoming-session UI on the home page.
Do NOT re-add a table to `index.html`. Tables live only in `archive.html`.

## Next Session Card — Centered Layout

The card uses `items-center text-center` on the outer div.
Fields use a `grid grid-cols-2` for Presenter/Critique and `col-span-2` for Paper/Slides.
Labels are small uppercase spans above the values.
Do not revert to the left-aligned `dl` row layout.

---

## Color Palette — University of Memphis Brand (do not revert)

Primary = `#003087` (UofM Royal Blue), Accent = `#FDB927` (UofM Gold).
- Do NOT revert to the old navy (#2C3E6B) or light blue (#4EA8DE) palette
- `.btn-primary` uses gold background (`--accent`) with dark text (`--bg-dark`)
- Table row hover shows a gold left-accent bar (`inset 3px 0 0 var(--accent)`)
- Calendar upcoming cells are gold-tinted; past cells are blue-tinted

## Calendar Widget — Self-Maintaining

`initCalendar()` in `js/main.js` calls `buildMeetings()` on every render.
`buildMeetings()` computes 'past' vs 'upcoming' dynamically from `new Date()`.
There is no Google Calendar and there will never be one.
If a Teams meeting link is created, add it as a "Join on Teams →" button to the Next Session card in `index.html` Section C.

---

## Font Stack (do not revert)

Font was changed from DM Sans + Playfair Display to **Inter + Segoe UI** after user feedback.
- Google Fonts link: `Inter:wght@400;500;600;700;800;900` + `JetBrains+Mono`
- CSS stack: `'Inter', 'Segoe UI', ui-sans-serif, system-ui, sans-serif`
- `.font-display` class now uses Inter 800 with tight tracking (not a serif font)
- Do NOT reintroduce Playfair Display or DM Sans

## Footer Positioning (do not break)

Body uses `display: flex; flex-direction: column; min-height: 100vh` in custom.css.
`main` and `#main-content` use `flex: 1 0 auto`. Footer uses `flex-shrink: 0`.
This ensures the footer is always at the bottom — do not remove these CSS rules.
Do NOT add `min-h-screen` to `<body>` in HTML (the CSS handles it).

## Heading Centering

All page-level and section headings are centered (`text-center`):
- `index.html`: h1 welcome, "Upcoming Presentations" h2, "About MLRG" h2, sub-section h3s
- `archive.html`: h1 "Archive", semester h2s ("Spring 2026", "Fall 2025")
- `contact.html`: h1 "Get Involved"
- The toggle buttons and search input on `archive.html` are also centered

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
