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
 * Skips if:
 *   - sessionStorage flag 'mlrg-animated' is already set (repeat visit in same tab)
 *   - User has prefers-reduced-motion enabled
 */
function initLandingAnimation() {
  const overlay = document.getElementById('landing-overlay');
  if (!overlay) return;

  const mainContent = document.getElementById('main-content');

  // Skip on repeat visit in same tab
  if (sessionStorage.getItem('mlrg-animated')) {
    overlay.remove();
    if (mainContent) mainContent.style.opacity = '1';
    return;
  }

  // Skip for users who prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    overlay.remove();
    if (mainContent) mainContent.style.opacity = '1';
    sessionStorage.setItem('mlrg-animated', 'true');
    return;
  }

  // Hide main content while overlay is visible
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
          // Mark animation as done for this tab session
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

/* ── 6. Init ─────────────────────────────────────────────────── */
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

  // Mobile nav — all pages
  initMobileNav();
});
