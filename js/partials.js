/* =============================================================
   MLRG — Shared nav + footer
   Edit this file to update the navbar or footer across all pages.
   ============================================================= */

var MLRG_NAV = `
<nav id="main-nav" class="sticky top-0 z-50" style="background-color: var(--bg-nav);">
  <div class="content-wrap">
    <div class="nav-inner flex items-center justify-between">

      <div class="flex items-center">
        <a href="index.html" class="flex items-center gap-2 no-underline">
          <img src="assets/logo.png" alt="MLRG" class="h-11 w-11 rounded-full">
          <span class="font-display font-bold text-xl" style="color: var(--heading); font-family: Arial, sans-serif;">MLRG</span>
        </a>
      </div>

      <div class="hidden md:flex items-center gap-8">
        <a href="index.html" class="nav-link" data-page="index">
          <i data-lucide="house" class="nav-icon"></i>
          Home
        </a>
        <a href="archive.html" class="nav-link" data-page="archive">
          <i data-lucide="archive" class="nav-icon"></i>
          Archive
        </a>
        <a href="contact.html" class="nav-link" data-page="contact">
          <i data-lucide="mail" class="nav-icon"></i>
          Contact
        </a>
        <div class="pl-4 border-l flex items-center gap-2" style="border-color: var(--border);">
          <img src="assets/UofM_logo.png" alt="University of Memphis" class="h-10 w-auto">
          <span style="font-family:Arial,sans-serif; font-size:0.9rem; font-weight:600; color:var(--primary); line-height:1.25;">University of<br>Memphis</span>
        </div>
      </div>

      <div class="flex md:hidden justify-end">
        <button
          id="hamburger-btn"
          class="md:hidden flex flex-col justify-center gap-1.5 p-2 rounded focus:outline-none"
          aria-label="Toggle navigation menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
          style="color: var(--heading);"
        >
          <span class="block w-6 h-0.5 bg-current"></span>
          <span class="block w-6 h-0.5 bg-current"></span>
          <span class="block w-6 h-0.5 bg-current"></span>
        </button>
      </div>

    </div>

    <div id="mobile-menu" class="hidden md:hidden pb-4 mt-1">
      <a href="index.html" class="nav-link-mobile" data-page="index">
        <i data-lucide="house" class="nav-icon"></i>
        Home
      </a>
      <a href="archive.html" class="nav-link-mobile" data-page="archive">
        <i data-lucide="archive" class="nav-icon"></i>
        Archive
      </a>
      <a href="contact.html" class="nav-link-mobile" data-page="contact">
        <i data-lucide="mail" class="nav-icon"></i>
        Contact
      </a>
    </div>

  </div>
</nav>`;

var MLRG_FOOTER = `
<footer class="py-6" style="background-color: var(--bg-dark);">
  <div class="content-wrap text-center" style="color: var(--text-on-dark);">
    <div class="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm mb-2">
      <img src="assets/logo.png" alt="MLRG" class="w-6 h-6 rounded-full opacity-80">
      <span class="font-semibold">Machine Learning Reading Group</span>
      <span style="opacity:0.4;">|</span>
      <span style="opacity:0.75;">Department of Computer Science &middot; University of Memphis</span>
    </div>
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs" style="opacity:0.65;">
      <span>Faculty Advisor: <a href="mailto:bbooth@memphis.edu" class="hover:underline" style="color:var(--accent);">Dr. Brandon Booth</a></span>
      <span style="opacity:0.4;">|</span>
      <span>Web Maintainer: <a href="mailto:sbalaji@memphis.edu" class="hover:underline" style="color:var(--accent);">Sudarshan Balaji</a></span>
      <span style="opacity:0.4;">|</span>
      <span>&copy; 2026 MLRG. All rights reserved.</span>
      <span style="opacity:0.4;">|</span>
      <a href="https://uofm-cs-sig.github.io/mlrg/" target="_blank" rel="noopener"
         class="hover:underline" style="color:var(--accent);">GitHub</a>
    </div>
  </div>
</footer>`;

function injectPartials() {
  var navEl = document.getElementById('nav-placeholder');
  if (navEl) {
    navEl.outerHTML = MLRG_NAV;
    var page = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('[data-page="' + page + '"]').forEach(function (a) {
      a.classList.add('active');
    });
  }

  var footerEl = document.getElementById('footer-placeholder');
  if (footerEl) footerEl.outerHTML = MLRG_FOOTER;
}
