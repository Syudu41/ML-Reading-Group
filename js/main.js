/* =============================================================
   MLRG — Machine Learning Reading Group · University of Memphis
   main.js — All interactive behavior
   ============================================================= */

/* ── 1. Typewriter Effect ────────────────────────────────────── */
/**
 * Appends text to an element one character at a time.
 * @param {HTMLElement} element  - Target element to write into
 * @param {string}      text     - Text to type out
 * @param {number}      speed    - Milliseconds per character
 * @param {Function}    callback - Called when typing is complete
 */
function typeWriter(element, text, speed, callback) {
  let index = 0;
  const interval = setInterval(function () {
    if (index < text.length) {
      element.textContent += text[index];
      index++;
    } else {
      clearInterval(interval);
      if (typeof callback === 'function') {
        callback();
      }
    }
  }, speed);
}

/* ── 2. Landing Animation Controller ────────────────────────── */
/**
 * Orchestrates the full-screen landing overlay animation sequence.
 *
 * Shows the animation when:
 *   - First visit in the session (sessionStorage flag not yet set)
 *   - Page is reloaded (F5 / Ctrl+R / browser refresh button)
 *
 * Skips the animation when:
 *   - User navigates here by clicking a link (Home, logo, etc.)
 *   - User has prefers-reduced-motion enabled
 *
 * Note: #main-content starts at opacity:0 via CSS — this function reveals it.
 */
function initLandingAnimation() {
  const overlay = document.getElementById('landing-overlay');
  if (!overlay) return;

  const mainContent = document.getElementById('main-content');

  function skipAnimation() {
    overlay.remove();
    if (mainContent) mainContent.style.opacity = '1';
  }

  // Skip for users who prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    skipAnimation();
    return;
  }

  // Detect navigation type: 'reload' vs 'navigate' (link click)
  var navEntry = performance.getEntriesByType('navigation')[0];
  var navType  = navEntry ? navEntry.type : 'navigate';
  var hasPlayed = sessionStorage.getItem('mlrg-animated');

  if (navType !== 'reload' && hasPlayed) {
    // Returning via link click after the animation has already played — skip
    skipAnimation();
    return;
  }

  // Clear the flag so a reload always triggers the animation fresh
  if (navType === 'reload') {
    sessionStorage.removeItem('mlrg-animated');
  }

  // #main-content is already hidden via CSS (opacity:0).
  if (mainContent) mainContent.style.opacity = '0';

  const typewriterSpan = document.getElementById('typewriter-text');
  const cursorSpan = document.querySelector('#landing-overlay .cursor');
  const overlayLogo = overlay.querySelector('.overlay-logo');

  // Step 1: Logo scale-in animation is applied via CSS (animation: logoScaleIn)
  // The CSS animation runs automatically on the element.
  // After 800ms (animation duration), start typewriter.
  setTimeout(function () {

    // Step 2: Typewriter effect
    const fullText = 'Machine Learning Reading Group';
    typeWriter(typewriterSpan, fullText, 45, function () {

      // Step 3: After typewriter completes, pause 400ms, then fade overlay out
      setTimeout(function () {

        // Fade overlay: opacity 1 → 0 over 600ms
        overlay.style.transition = 'opacity 0.6s ease';
        overlay.style.opacity = '0';

        // Step 4: After fade, remove overlay and reveal content
        setTimeout(function () {
          overlay.remove();
          if (mainContent) {
            mainContent.style.transition = 'opacity 0.3s ease';
            mainContent.style.opacity = '1';
          }
          // Mark animation as played — link-click navigations will skip it
          sessionStorage.setItem('mlrg-animated', 'true');
        }, 620); // slightly longer than the 600ms fade

      }, 400);
    });

  }, 800); // wait for logo animation to settle
}

/* ── 3. Archive Toggle Buttons ───────────────────────────────── */
/**
 * Manages the Current Semester / Previous Semesters toggle on archive.html.
 * - Shows the selected section and hides the other
 * - Updates button active styling
 * - Clears the search input when switching sections
 */
function initArchiveToggle() {
  const btnCurrent  = document.getElementById('btn-current');
  const btnPrevious = document.getElementById('btn-previous');
  const secCurrent  = document.getElementById('current-semester');
  const secPrevious = document.getElementById('previous-semesters');
  const searchInput = document.getElementById('archive-search');

  if (!btnCurrent || !btnPrevious) return;

  function showSection(which) {
    // which: 'current' | 'previous'
    if (which === 'current') {
      secCurrent.classList.remove('hidden');
      secPrevious.classList.add('hidden');
      btnCurrent.classList.add('active');
      btnPrevious.classList.remove('active');
    } else {
      secPrevious.classList.remove('hidden');
      secCurrent.classList.add('hidden');
      btnPrevious.classList.add('active');
      btnCurrent.classList.remove('active');
    }

    // Clear search input and reset row visibility
    if (searchInput) {
      searchInput.value = '';
      resetRowVisibility();
    }
  }

  function resetRowVisibility() {
    // Show all rows in both sections
    document.querySelectorAll('.archive-row').forEach(function (row) {
      row.classList.remove('hidden');
    });
  }

  btnCurrent.addEventListener('click',  function () { showSection('current'); });
  btnPrevious.addEventListener('click', function () { showSection('previous'); });
}

/* ── 4. Archive Search ───────────────────────────────────────── */
/**
 * Filters table rows within the CURRENTLY VISIBLE archive section
 * based on the search input value. Case-insensitive, matches against
 * all text content in each row.
 */
function initArchiveSearch() {
  const searchInput = document.getElementById('archive-search');
  if (!searchInput) return;

  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase().trim();

    // Only search within the currently visible section
    const visibleSection = document.querySelector('#current-semester:not(.hidden), #previous-semesters:not(.hidden)');
    if (!visibleSection) return;

    const rows = visibleSection.querySelectorAll('.archive-row');
    rows.forEach(function (row) {
      const text = row.textContent.toLowerCase();
      if (query === '' || text.includes(query)) {
        row.classList.remove('hidden');
      } else {
        row.classList.add('hidden');
      }
    });
  });
}

/* ── 5. Mobile Navbar Toggle ─────────────────────────────────── */
/**
 * Handles the hamburger menu open/close on all pages.
 * - Toggles #mobile-menu visibility
 * - Closes menu when a link inside it is clicked
 * - Closes menu when clicking outside the navbar
 */
function initMobileNav() {
  const hamburger  = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu() {
    if (mobileMenu.classList.contains('hidden')) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  hamburger.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when a mobile nav link is clicked
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside the nav
  document.addEventListener('click', function (e) {
    const nav = document.getElementById('main-nav');
    if (nav && !nav.contains(e.target)) {
      closeMenu();
    }
  });
}

/* ── 6. Custom Calendar Widget ──────────────────────────────── */
/**
 * Renders a custom month-view calendar into #mlrg-calendar-widget.
 * Spring 2026 Tuesday meetings are highlighted:
 *   - Past meetings: hoverable tooltip showing "MLRG Session · Completed"
 *   - Upcoming meetings: hoverable tooltip showing "Coming Soon"
 * Month navigation with prev/next buttons.
 */
function initCalendar() {
  var container = document.getElementById('mlrg-calendar-widget');
  if (!container) return;

  // All Spring 2026 Tuesday meeting dates (Jan 12 – Apr 30).
  // Status is computed dynamically at render time against today's date —
  // the calendar is self-maintaining: no manual updates needed as weeks pass.
  var meetingDates = [
    '2026-01-13','2026-01-20','2026-01-27',
    '2026-02-03','2026-02-10','2026-02-17','2026-02-24',
    '2026-03-03','2026-03-10','2026-03-17','2026-03-24','2026-03-31',
    '2026-04-07','2026-04-14','2026-04-21','2026-04-28'
  ];

  // Build lookup: dateKey → 'past' | 'today-meeting' | 'upcoming'
  // Comparison is done fresh each render against new Date().
  function buildMeetings() {
    var now = new Date();
    // Normalise to midnight for clean date comparison
    var todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var meetings = {};
    meetingDates.forEach(function (d) {
      var parts = d.split('-');
      var meetDay = new Date(+parts[0], +parts[1] - 1, +parts[2]);
      if (meetDay < todayMidnight) {
        meetings[d] = 'past';
      } else if (meetDay.getTime() === todayMidnight.getTime()) {
        meetings[d] = 'past'; // meeting day itself treated as past (already started)
      } else {
        meetings[d] = 'upcoming';
      }
    });
    return meetings;
  }

  var MONTH_NAMES = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  var DAY_NAMES = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  // Default to April 2026
  var curYear  = 2026;
  var curMonth = 3; // 0-indexed (3 = April)

  function pad(n) { return String(n).padStart(2, '0'); }

  function dateKey(y, m, d) {
    return pad(y) + '-' + pad(m + 1) + '-' + pad(d);
  }

  function buildTooltip(status, dateStr) {
    var parts = dateStr.split('-');
    var d = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    var label = MONTH_NAMES[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    if (status === 'past') {
      return '<div class="cal-tooltip">'
        + '<strong>MLRG Session</strong><br>'
        + label + '<br>'
        + '4:30 &ndash; 5:30 PM<br>'
        + '<span class="cal-tag past">Completed</span><br>'
        + '<small style="opacity:0.75">See Archive for details</small>'
        + '</div>';
    } else {
      return '<div class="cal-tooltip">'
        + '<strong>MLRG Session</strong><br>'
        + label + '<br>'
        + '4:30 &ndash; 5:30 PM<br>'
        + '<span class="cal-tag upcoming">Coming Soon</span>'
        + '</div>';
    }
  }

  function render() {
    var meetings     = buildMeetings();  // recomputed on every render from today's date
    var firstDay     = new Date(curYear, curMonth, 1).getDay();
    var daysInMonth  = new Date(curYear, curMonth + 1, 0).getDate();

    var html = '<div class="cal-header">'
      + '<button class="cal-nav" id="cal-prev" aria-label="Previous month">&#8249;</button>'
      + '<span class="cal-month-title">' + MONTH_NAMES[curMonth] + ' ' + curYear + '</span>'
      + '<button class="cal-nav" id="cal-next" aria-label="Next month">&#8250;</button>'
      + '</div>'
      + '<div class="cal-grid">';

    // Day-name header row
    DAY_NAMES.forEach(function (n) {
      html += '<div class="cal-day-name">' + n + '</div>';
    });

    // Empty cells before month starts
    for (var e = 0; e < firstDay; e++) {
      html += '<div class="cal-cell cal-empty"></div>';
    }

    // "today" ring — computed fresh each render
    var _now = new Date();
    var todayKey = pad(_now.getFullYear()) + '-' + pad(_now.getMonth() + 1) + '-' + pad(_now.getDate());

    // Day cells
    for (var day = 1; day <= daysInMonth; day++) {
      var key    = dateKey(curYear, curMonth, day);
      var status = meetings[key] || null;
      var isToday = (key === todayKey);

      var cls = 'cal-cell';
      if (status === 'past')     cls += ' cal-past';
      if (status === 'upcoming') cls += ' cal-upcoming';
      if (isToday)               cls += ' cal-today';

      var tabIdx = status ? '0' : '-1';
      var tooltip = status ? buildTooltip(status, key) : '';
      var dot     = status ? '<span class="cal-dot"></span>' : '';

      html += '<div class="' + cls + '" tabindex="' + tabIdx + '">'
        + '<span class="cal-day-num">' + day + '</span>'
        + dot
        + tooltip
        + '</div>';
    }

    html += '</div>' // end .cal-grid
      + '<div class="cal-legend">'
      + '<span><span class="cal-legend-dot" style="background:var(--primary)"></span>Past session</span>'
      + '<span><span class="cal-legend-dot" style="background:var(--accent)"></span>Coming Soon</span>'
      + '</div>';

    container.innerHTML = html;

    document.getElementById('cal-prev').addEventListener('click', function () {
      curMonth--;
      if (curMonth < 0) { curMonth = 11; curYear--; }
      render();
    });
    document.getElementById('cal-next').addEventListener('click', function () {
      curMonth++;
      if (curMonth > 11) { curMonth = 0; curYear++; }
      render();
    });
  }

  render();
}

/* ── 7. Init ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  // Landing animation — only on index.html (overlay element exists)
  if (document.getElementById('landing-overlay')) {
    initLandingAnimation();
  }

  // Archive functionality — only on archive.html
  if (document.getElementById('btn-current')) {
    initArchiveToggle();
  }
  if (document.getElementById('archive-search')) {
    initArchiveSearch();
  }

  // Custom calendar — only on index.html
  if (document.getElementById('mlrg-calendar-widget')) {
    initCalendar();
  }

  // Mobile nav — all pages
  initMobileNav();
});
