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

## 2026-04-11 — Issue Fixes (Round 5)

| Change | Files Affected |
|---|---|
| Color palette replaced with University of Memphis brand colors (Royal Blue `#003087` + Gold `#FDB927`) | `css/custom.css` |
| `--accent-dark` token added for gold hover states | `css/custom.css` |
| `.btn-primary` now uses UofM Gold background with dark navy text | `css/custom.css` |
| Table hover accent bar changed from `--primary-light` to `--accent` (gold) | `css/custom.css` |
| Calendar past cell tint updated to UofM Blue; upcoming cell tint changed to gold | `css/custom.css` |
| Calendar `buildMeetings()` now computes past/upcoming dynamically from `new Date()` each render | `js/main.js` |
| Calendar legend updated to Royal Blue + Gold dots | `js/main.js` |
| Logo SVG updated to Royal Blue + Gold ring | `assets/logo.svg` |
| Google Calendar iframe comment removed; Teams link note added | `index.html` |
| Confirmed: no Google Calendar ID will ever exist; Teams meeting link may be added later | `index.html` |

---

## 2026-04-11 — Issue Fixes (Round 4)

| Change | Files Affected |
|---|---|
| Text justification corrected: body paragraphs now `text-justify`; headings/subtitles keep `text-center` | `index.html`, `contact.html`, `css/custom.css` |
| Removed cascading `text-center` from `content-wrap` in Section B; applied per-element | `index.html` |
| Google Calendar iframe replaced with custom JS calendar widget (Spring 2026 Tuesdays, hover tooltips) | `index.html`, `js/main.js`, `css/custom.css` |
| `initCalendar()` added to `main.js`: renders month-view with past (navy, "Completed") and upcoming (green, "Coming Soon") meetings | `js/main.js` |
| Calendar CSS added: cell styles, tooltip, legend, today highlight | `css/custom.css` |
| Original Google Calendar iframe preserved as a comment for future use | `index.html` |

---

## 2026-04-11 — Issue Fixes (Round 3)

| Change | Files Affected |
|---|---|
| Navbar redesigned: 3-column grid (logo left, links centered, hamburger right); SVG icons added to all 3 nav links + mobile menu | All 3 HTML files, `css/custom.css` |
| News banner block added above Section C (card + calendar); shows "No news updates" placeholder | `index.html` |
| Next Session card date updated to Tuesday, April 14, 2026 · 4:30 PM | `index.html` |
| All continuous body text (About paragraphs, contact card paragraphs) centered | `index.html`, `contact.html` |
| All h3 sub-headings in About section centered | `index.html` |
| CTA button in About section centered | `index.html` |
| Contact page cards centered (cards are `mx-auto`); paragraph text centered | `contact.html` |
| Meeting Details updated: Day = Tuesday, Time = 4:30–5:30 PM, Frequency note includes Spring sem dates | `contact.html` |
| Archive Spring 2026 table: replaced fake rows with all 13 past Tuesdays (Jan 13–Apr 7); no fake presenter/paper data | `archive.html` |

---

## 2026-04-11 — Issue Fixes (Round 2)

| Change | Files Affected |
|---|---|
| Removed Section D (Upcoming Presentations table) from index.html — card is sufficient | `index.html` |
| Next Session card content restructured to fully centered layout (2-col grid for Presenter/Critique, full-width rows for Paper/Slides) | `index.html` |
| Archive table redesigned: gradient header, left-accent hover, no bottom border on last row, monospace date column, better shadows | `css/custom.css` |

---

## 2026-04-11 — Issue Fixes (Round 1)

| Change | Files Affected |
|---|---|
| Font changed from DM Sans + Playfair Display → Inter + Segoe UI | `css/custom.css`, all 3 HTML files |
| Body is now a flex column (`min-height: 100vh`); `main`/`#main-content` get `flex: 1` | `css/custom.css` |
| Footer always at page bottom regardless of content length | `css/custom.css` (via flex layout) |
| Archive h1, toggle buttons, search input, section h2s all centered | `archive.html` |
| Contact h1 centered | `contact.html` |
| Upcoming Presentations + About MLRG headings centered | `index.html` |

---

## Session Notes

- Tech stack: vanilla HTML5, Tailwind CDN, vanilla JS, no build step (as specified)
- Logo is an SVG placeholder — real logo.png should be placed in `assets/` before launch
- All placeholder content is marked with `<!-- REPLACE: ... -->` comments in HTML files
- The `og-image.png` file is referenced in meta tags but not yet created — add before launch if desired
