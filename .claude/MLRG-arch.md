# MLRG Website — Build Specification for Claude Code

## Project: Machine Learning Reading Group (MLRG) — University of Memphis

A static, multi-page informational website. No authentication, no backend, no CMS, no build step.

---

## Tech Stack

| Layer         | Choice                            |
|---------------|-----------------------------------|
| Markup        | Vanilla HTML5                     |
| Styling       | Tailwind CSS via CDN `<script>`   |
| Custom CSS    | `css/custom.css`                  |
| Interactivity | Vanilla JavaScript                |
| Hosting       | GitHub Pages (main branch)        |
| Calendar      | Google Calendar iframe embed      |
| Fonts         | Google Fonts CDN                  |

No npm. No node_modules. No package.json. No framework. No build step.

---

## Design System

### Color Palette (CSS custom properties on `:root`)

```css
--primary:        #2C3E6B   /* Deep navy — navbar, headings, primary buttons */
--primary-light:  #3D5A99   /* Hover states, active links */
--accent:         #4EA8DE   /* CTA highlights, upcoming badges */
--bg-main:        #F8F9FC   /* Page background */
--bg-card:        #FFFFFF   /* Card surfaces, table rows */
--bg-dark:        #1A1F35   /* Landing overlay, footer */
--text-primary:   #1E293B   /* Body text */
--text-secondary: #64748B   /* Captions, secondary info */
--text-on-dark:   #E2E8F0   /* Text on dark backgrounds */
--border:         #E2E8F0   /* Table borders, card outlines */
--success:        #22C55E   /* "Upcoming" badge */
```

### Typography (Google Fonts)

| Role           | Font                 | Weight   | Size Range   |
|----------------|----------------------|----------|--------------|
| Display/Logo   | Playfair Display     | 700, 900 | 2rem–3.5rem  |
| Headings       | DM Sans              | 600, 700 | 1.25rem–2rem |
| Body           | DM Sans              | 400, 500 | 0.9rem–1rem  |
| Monospace/Tags | JetBrains Mono       | 400      | 0.8rem       |

Load with `display=swap`.

### Layout

- Max content width: `1120px`, centered
- Section vertical padding: `4rem` desktop, `2.5rem` mobile
- Card border-radius: `12px`
- Grid gap: `1.5rem`
- Mobile breakpoint: `768px` (Tailwind `md:`)

---

## Repository Structure

```
mlrg-website/
├── index.html
├── archive.html
├── contact.html
├── css/
│   └── custom.css
├── js/
│   └── main.js
├── assets/
│   ├── logo.png
│   └── og-image.png
├── slides/
│   └── (slide files named YYYY-MM-DD-presenter.ext)
└── README.md
```

---

## Shared Components

### Navbar (all pages)

- `position: sticky; top: 0;`
- Background: `--primary`; text: `--text-on-dark`
- Left: MLRG logo (small, ~32px) + "MLRG" text
- Right: links — Home, Archive, Contact
- Active page link has underline or distinct color
- Mobile (below `md:`): hamburger icon toggles a dropdown/slide-in menu
- Hamburger toggle logic in `main.js`

### Footer (all pages)

- Background: `--bg-dark`; text: `--text-on-dark`
- Single centered line: "© 2026 Machine Learning Reading Group · University of Memphis. All rights reserved."
- Optional: small logo + GitHub repo link
- Minimal height

---

## Page 1: `index.html` — Home

The primary page. Four sections after the landing overlay:

### Section A: Landing Animation Overlay

A full-screen overlay that plays once on initial site visit.

**Sequence:**

1. On DOM load, display a `position: fixed; z-index: 9999; inset: 0;` overlay with `--bg-dark` background
2. MLRG logo appears centered, starting at `transform: scale(0.3); opacity: 0;`
3. Logo animates to `scale(1); opacity: 1;` over `0.8s` with easing `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring/overshoot effect)
4. After logo settles (0.8s delay), the text "Machine Learning Reading Group" types out below the logo — one character at a time over ~1.2s, with a blinking cursor `|` at the end
5. After typewriter completes, pause `0.4s`, then fade overlay out: `opacity: 1 → 0` over `0.6s`
6. After fade completes, remove overlay element from DOM entirely

**Technical requirements:**

- Logo animation: CSS `@keyframes` on the logo `<img>`
- Typewriter: JS-driven — a function that appends one character at a time into a `<span>`, with `setInterval` at ~45ms per character
- Blinking cursor: CSS `@keyframes` toggling opacity on a `|` pseudo-element or span, `blink 0.7s step-end infinite`
- Skip on repeat visits in same tab: check `sessionStorage.getItem('mlrg-animated')`; if set, skip overlay entirely. Set flag after animation completes.
- Accessibility: wrap animation trigger in `if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)` — if reduced motion is preferred, do not show overlay at all, show page content immediately.
- While overlay is visible, page content behind it should be fully loaded but hidden (`opacity: 0` or `visibility: hidden`), then revealed when overlay fades out.

### Section B: Welcome

Visible immediately after overlay fades (or immediately on reduced-motion / repeat visit).

- MLRG logo (inline, ~64px) + "Machine Learning Reading Group" as styled `<h1>` in Playfair Display
- Subtitle line: "University of Memphis · Weekly Paper Discussions"
- A brief one-line welcome message below, e.g., "Welcome to MLRG — exploring the frontiers of machine learning research, one paper at a time."
- `<!-- REPLACE: welcome message text -->`

### Section C: Next Session + Calendar (Side by Side)

A two-column layout on desktop (`md:grid-cols-2`), stacking vertically on mobile.

**Left column: Next Session & Upcoming Presenter Card**

A single card (`--bg-card`, shadow, `12px` border-radius) containing ALL of the following in one unified component:

- Card heading: "Next Session"
- "Upcoming" badge (green pill, `--success` background) — inline with the heading
- Date & time line (e.g., "Thursday, April 17, 2026 · 3:00 PM")
- Location line (room/building)
- A horizontal divider or subtle separator within the card
- **Presenter** label + presenter name
- **Critique** label + critique person name (or "TBD" if unassigned)
- **Paper** label + paper title as a clickable `<a>` link to the source (ArXiv, DOI, URL)
- **Slides** label + link to slides if available, or "Available soon" if not yet uploaded

This is ONE card, NOT separate components for session info and presenter info.

- If no upcoming session exists, the entire card shows: "No sessions scheduled — check back soon."
- All data is hardcoded in HTML. Placeholder values for initial build:
  - Date: "TBD"
  - Presenter: "TBD"
  - Critique: "TBD"
  - Paper: "TBD"
  - Location: "TBD"

**Right column: Google Calendar Embed**

- Section heading above the iframe: "Group Calendar"
- Google Calendar `<iframe>`:
  - `width: 100%`
  - `height: 100%` of the column (match the card height), min-height `400px`
  - `frameborder="0"`, `scrolling="no"`
  - `style="border: 0; border-radius: 12px;"`
  - `src` placeholder: `https://calendar.google.com/calendar/embed?src=PLACEHOLDER_CALENDAR_ID&ctz=America/Chicago`
- A small note below: "Subscribe to this calendar to stay updated."

**Responsive behavior:**
- Desktop (`md:` and up): two equal columns side by side, both same height
- Mobile: card stacks on top, calendar below, both full width. Calendar height: `350px`

### Section D: Upcoming Presentations Table

**This table shows ONLY upcoming/future sessions. Once a session is completed, its row is removed from this table and added to `archive.html` instead.**

Table columns:

| Column    | Content                                                                 |
|-----------|-------------------------------------------------------------------------|
| Date      | Formatted date, e.g., "Apr 17, 2026"                                   |
| Presenter | Name of the person presenting the paper                                |
| Critique  | Name of the designated critique/reviewer, or `—` if none assigned      |
| Paper     | Paper title, wrapped in `<a>` linking to source (ArXiv, DOI, URL)      |
| Slides    | Link to slides if available (repo file or external URL), or `—` if none|

**Slides column logic:**
- If a slide file exists in `/slides/`: link to it, e.g., `<a href="slides/2026-04-17-shan.pdf">Slides (PDF)</a>`
- If slides are hosted externally: link to external URL, e.g., `<a href="https://docs.google.com/...">Slides</a>`
- If no slides available: show `—`

No filter tabs needed — this table only ever shows upcoming sessions.

**Row template (for reference in code comments):**
```html
<!-- To add a new upcoming session, copy this row and fill in values -->
<tr data-date="2026-04-17">
  <td>Apr 17, 2026</td>
  <td>Presenter Name</td>
  <td>Critique Person</td>
  <td><a href="https://arxiv.org/abs/...">Paper Title Here</a></td>
  <td><a href="slides/2026-04-17-name.pdf">Slides</a></td>
</tr>
<!-- If no critique assigned, use: <td>—</td> -->
<!-- If no slides available, use: <td>—</td> -->
```

Build the table with 3–4 placeholder upcoming rows.

### Section E: About MLRG

The final section on the homepage.

- Heading: "About MLRG"

**Sub-section 1: Scope**
- Sub-heading: "What We Read"
- 1–2 paragraphs describing the group's focus areas in AI/ML research
- `<!-- REPLACE: scope content from philosophy PPT -->`

**Sub-section 2: Principles & Pillars**
- Sub-heading: "Our Principles"
- The group's core pillars and guiding principles, presented as a clean list or set of short principle cards/blocks (e.g., 3–5 principles, each with a bold title and a one-line description)
- `<!-- REPLACE: principles and pillars content from philosophy PPT -->`

**Sub-section 3: Who Should Attend**
- 1 paragraph on who the group is for (grad students, researchers, faculty — open to all)
- Meeting format note (weekly, presentation + discussion)

- Below all sub-sections: a CTA link — "Want to join? → Contact page"
- Use placeholder text that reads naturally but is clearly marked with `<!-- REPLACE -->` comments

---

## Page 2: `archive.html` — Archive

**This page contains all completed sessions, toggled between two views via buttons.**

### Top-level

- Page heading: "Archive"
- **Two toggle buttons** directly below the heading, styled as a button group (pill-shaped or tab-like):
  - Button 1: **"Current Semester"** — active/selected by default on page load
  - Button 2: **"Previous Semesters"**
  - Active button has `--primary` background with white text; inactive button has `--bg-card` background with `--text-primary` text
  - Clicking a button shows its corresponding section and hides the other
- A text search input below the buttons:
  - Placeholder: "Search by paper, presenter, or topic..."
  - JS filters table rows in real-time within the CURRENTLY VISIBLE section only, by matching input text against all cell text content in each row (case-insensitive)
  - Search input clears when switching between buttons

### Section 1: "Current Semester" (visible by default)

- Container `<div>` with `id="current-semester"`
- Subheading: e.g., `<h2>Spring 2026</h2>` (current semester name)
- A table of sessions that have already happened THIS semester
- Table columns (same as homepage): **Date, Presenter, Critique (name or —), Paper (title + link), Slides (link or —)**
- Same column logic and link handling as the homepage upcoming table
- Reverse chronological (most recent completed session first)
- When a session from the homepage is completed, its row moves here

### Section 2: "Previous Semesters" (hidden by default, shown when button clicked)

- Container `<div>` with `id="previous-semesters"`, initially hidden
- Subheading for each past semester: e.g., `<h2>Fall 2025</h2>`, `<h2>Spring 2025</h2>`
- Under each subheading: a table with the same columns — Date, Presenter, Critique, Paper, Slides
- Reverse chronological: most recent semester first, most recent session first within each semester
- At the start of a new semester, the entire "Current Semester" section's rows get moved here under their semester label

Build with:
- "Current Semester" (Spring 2026) section: 2–3 placeholder completed rows
- One placeholder previous semester ("Fall 2025") containing 4–5 placeholder rows

---

## Page 3: `contact.html` — Contact / Join

- Page heading: "Get Involved"
- Four content cards, stacked vertically, each with a heading and body:

**Card 1: "Join the Reading Group"**
- Text: "MLRG is open to all University of Memphis graduate students and researchers. Contact [Professor Name] at [email] to join."
- `<!-- REPLACE: professor name and email -->`

**Card 2: "Join Our Teams Channel"**
- Text: "Stay connected with the group through Microsoft Teams."
- A styled button/link: "Join on Teams →" linking to `<!-- REPLACE: Teams join URL -->`

**Card 3: "Meeting Details"**
- Placeholder details:
  - Day: `<!-- REPLACE -->`
  - Time: `<!-- REPLACE -->`
  - Location: `<!-- REPLACE -->`
  - Frequency: Weekly

**Card 4: "Present a Paper"**
- Text: "Want to lead a discussion? Email [organizer] with your proposed paper and a preferred date."
- `<!-- REPLACE: organizer name and email -->`

---

## JavaScript (`js/main.js`)

All interactive behavior lives in this single file. Functions needed:

### 1. Landing Animation Controller
```
function initLandingAnimation()
```
- Check `sessionStorage` for `mlrg-animated` flag — if set, remove overlay and show content immediately
- Check `prefers-reduced-motion` — if enabled, remove overlay and show content immediately
- Otherwise, execute the animation sequence described in Section A
- After animation completes, set `sessionStorage.setItem('mlrg-animated', 'true')`

### 2. Typewriter Effect
```
function typeWriter(element, text, speed, callback)
```
- Takes a target element, text string, speed in ms per character, and a completion callback
- Uses `setInterval` to append one character at a time
- Clears interval and calls callback when complete

### 3. Archive Toggle Buttons (archive.html)
```
function initArchiveToggle()
```
- Attach click listeners to the two toggle buttons ("Current Semester" / "Previous Semesters")
- On click: show the corresponding section (`#current-semester` or `#previous-semesters`), hide the other
- Update active/inactive button styling (swap `--primary` and `--bg-card` backgrounds)
- Clear the search input and reset all row visibility when switching sections

### 4. Archive Search (archive.html)
```
function initArchiveSearch()
```
- Attach `input` event listener to search input
- On each keystroke: iterate all `<tr>` rows within the CURRENTLY VISIBLE section only, check if `textContent.toLowerCase()` includes the search query, toggle `hidden` class

### 5. Mobile Navbar Toggle
```
function initMobileNav()
```
- Attach click listener to hamburger button
- Toggle visibility of the nav link container
- Close menu when a link is clicked or when clicking outside

### 6. Init
```
document.addEventListener('DOMContentLoaded', function() { ... })
```
- Call `initLandingAnimation()` only on index.html (check if overlay element exists)
- Call `initArchiveToggle()` only on archive.html (check if toggle buttons exist)
- Call `initArchiveSearch()` only on archive.html (check if search input exists)
- Call `initMobileNav()` on all pages

---

## CSS (`css/custom.css`)

Custom styles that go beyond Tailwind utilities:

### 1. CSS Custom Properties
All color/typography tokens defined on `:root` as listed in Design System section.

### 2. Landing Animation Keyframes
```css
@keyframes logoScaleIn {
  0%   { transform: scale(0.3); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}
```

### 3. Badge Styles
```css
.badge-upcoming  { background: var(--success); color: white; }
.badge-completed { background: var(--text-secondary); color: white; }
```
Both: `font-size: 0.75rem; padding: 2px 8px; border-radius: 9999px; font-weight: 500;`

### 4. Table Styles
- Striped rows: alternating `--bg-card` and a slightly tinted background
- Hover: subtle row highlight
- Links in table cells: `--primary-light` color, underline on hover

### 5. Active Nav Link
- Style for `.nav-link.active`: underline or bottom border + lighter color

### 6. Reduced Motion Override
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## SEO & Meta (all pages)

Each page `<head>` must include:
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MLRG — Machine Learning Reading Group · University of Memphis</title>
<meta name="description" content="Weekly reading group exploring AI and machine learning research papers at the University of Memphis.">
<meta property="og:title" content="MLRG · Machine Learning Reading Group">
<meta property="og:description" content="Weekly AI/ML paper discussions at the University of Memphis.">
<meta property="og:image" content="assets/og-image.png">
<link rel="icon" href="assets/logo.png" type="image/png">
```

Tailwind CDN script tag:
```html
<script src="https://cdn.tailwindcss.com"></script>
```

Google Fonts link:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

---

## Build Checklist

After building all files, verify:

- [ ] All three pages load without errors (index, archive, contact)
- [ ] Navbar links work across all pages, active state highlights correctly
- [ ] Landing animation plays on first visit to index.html, skips on repeat (same tab)
- [ ] Landing animation is skipped entirely with `prefers-reduced-motion`
- [ ] Homepage welcome section displays correctly with logo, title, subtitle
- [ ] Next Session card and Google Calendar are side by side on desktop, stacked on mobile
- [ ] Next Session card shows all fields (date, time, location, presenter, critique, paper, slides) as one unified card
- [ ] Homepage upcoming table renders correctly with all column types (date, presenter, critique, paper link, slides link/—)
- [ ] About section has scope, principles/pillars, and who-should-attend sub-sections
- [ ] Google Calendar iframe renders (with placeholder src)
- [ ] Archive page toggle buttons switch between "Current Semester" and "Previous Semesters"
- [ ] "Current Semester" section is visible by default on archive page load
- [ ] Archive search input filters rows within the currently visible section
- [ ] Search input clears when toggling between archive sections
- [ ] Mobile hamburger menu opens/closes correctly
- [ ] Footer with copyright notice appears on all pages
- [ ] All placeholder content is wrapped in `<!-- REPLACE: ... -->` comments
- [ ] No console errors in browser
