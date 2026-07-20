(function () {
  "use strict";

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header shrink/solid on scroll
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav toggle
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  var scrim = document.getElementById("navScrim");

  function closeNav() {
    nav.classList.remove("open");
    scrim.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openNav() {
    nav.classList.add("open");
    scrim.classList.add("open");
    toggle.classList.add("open");
    toggle.setAttribute("aria-expanded", "true");
  }

  toggle.addEventListener("click", function () {
    var isOpen = nav.classList.contains("open");
    if (isOpen) closeNav(); else openNav();
  });

  scrim.addEventListener("click", closeNav);

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  // Scroll-reveal helper, reused by barber cards + gallery items
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealOnScroll(selector) {
    var els = document.querySelectorAll(selector);
    if (!els.length || prefersReducedMotion || !("IntersectionObserver" in window)) return;

    els.forEach(function (el) { el.classList.add("will-animate"); });

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -60px 0px" });

    els.forEach(function (el) { observer.observe(el); });
  }

  revealOnScroll(".barber-card");
  revealOnScroll(".gallery-item");
  revealOnScroll(".team-teaser-content");
  revealOnScroll(".service-row");
})();
