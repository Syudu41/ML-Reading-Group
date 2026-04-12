# MLRG Website — Build Log

## 2026-04-11 — Initial Build

### Files Created

| File | Status | Notes |
|---|---|---|
| `css/custom.css` | ✅ Done | All design tokens, keyframes, table, badge, nav, card, principle, CTA, toggle button styles |
| `assets/logo.svg` | ✅ Done | Placeholder SVG (navy circle + "ML RG" text). Replace with real logo.png when available. |
| `js/main.js` | ✅ Done | `initLandingAnimation`, `typeWriter`, `initArchiveToggle`, `initArchiveSearch`, `initMobileNav` |
| `index.html` | ✅ Done | Landing overlay, navbar, welcome, next session card, calendar iframe, upcoming table, about section, footer |
| `archive.html` | ✅ Done | Toggle buttons (current/previous), search input, Spring 2026 table (3 rows), Fall 2025 table (5 rows) |
| `contact.html` | ✅ Done | 4 contact cards (join, teams, meeting details, present a paper) |
| `slides/.gitkeep` | ✅ Done | Empty dir tracked in git |
| `.claude/Logs.md` | ✅ Done | This file |
| `.claude/Claude.md` | ✅ Done | Mistake prevention notes |

---

## Pending / TODO

- [ ] Replace `assets/logo.svg` with real `assets/logo.png` and update all `src="assets/logo.svg"` → `src="assets/logo.png"` in 3 HTML files + the `<link rel="icon">` tag in each
- [ ] Replace all `<!-- REPLACE: ... -->` placeholders with real content:
  - Welcome message text (`index.html` Section B)
  - Next session details: date, time, location, presenter, critique, paper, slides (`index.html` Section C)
  - About MLRG: "What We Read" paragraphs and "Our Principles" cards (from philosophy PPT) (`index.html` Section E)
  - Google Calendar ID: `PLACEHOLDER_CALENDAR_ID` → real calendar ID (`index.html` Section C)
  - Contact: professor name + email, Teams join URL, meeting day/time/location, organizer name + email (`contact.html`)
- [ ] Add real slide files to `/slides/` as presentations happen (naming convention: `YYYY-MM-DD-presenter.pdf`)
- [ ] Update upcoming table rows and move completed rows to archive.html as sessions happen

---

## Session Notes

- Tech stack: vanilla HTML5, Tailwind CDN, vanilla JS, no build step (as specified)
- Logo is an SVG placeholder — real logo.png should be placed in `assets/` before launch
- All placeholder content is marked with `<!-- REPLACE: ... -->` comments in HTML files
- The `og-image.png` file is referenced in meta tags but not yet created — add before launch if desired
