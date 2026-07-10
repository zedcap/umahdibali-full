/* umah di bali -- vanilla JS. No jQuery, no owl.carousel, no flexslider,
   no lightbox2. Reimplements the three interactive pieces the static
   capture cannot ship safely: the hero carousel, the in-page image
   galleries, and the contact slide-in sidebar. */
(function () {
  "use strict";

  /* ---------- hero carousel (home page only) ---------- */
  function initHero() {
    var root = document.getElementById("head_panel_slider");
    if (!root) return;
    var slides = Array.prototype.slice.call(root.querySelectorAll(".stretchy_wrapper.ratio_slider"));
    if (slides.length < 2) return;
    var idx = 0;
    slides[0].classList.add("is-active");

    function show(n) {
      slides[idx].classList.remove("is-active");
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add("is-active");
    }

    var timer = setInterval(function () { show(idx + 1); }, 5000);
    function restart() { clearInterval(timer); timer = setInterval(function () { show(idx + 1); }, 5000); }

    var prev = root.parentElement.querySelector(".owl-prev");
    var next = root.parentElement.querySelector(".owl-next");
    if (prev) prev.addEventListener("click", function () { show(idx - 1); restart(); });
    if (next) next.addEventListener("click", function () { show(idx + 1); restart(); });
  }

  /* ---------- in-page image galleries ---------- */
  function initGalleries() {
    var galleries = document.querySelectorAll(".gallery");
    galleries.forEach(function (gal) {
      var imgs = Array.prototype.slice.call(gal.querySelectorAll(".gallery__img"));
      if (imgs.length < 2) return;
      var dotsWrap = gal.querySelector(".gallery__dots");
      var dots = dotsWrap ? Array.prototype.slice.call(dotsWrap.querySelectorAll("button")) : [];
      var idx = 0;

      function show(n) {
        imgs[idx].classList.remove("is-active");
        if (dots[idx]) dots[idx].classList.remove("is-active");
        idx = (n + imgs.length) % imgs.length;
        imgs[idx].classList.add("is-active");
        if (dots[idx]) dots[idx].classList.add("is-active");
      }

      dots.forEach(function (d, i) {
        d.addEventListener("click", function () { show(i); restart(); });
      });

      var timer = setInterval(function () { show(idx + 1); }, 4000);
      function restart() { clearInterval(timer); timer = setInterval(function () { show(idx + 1); }, 4000); }
    });
  }

  /* ---------- contact sidebar + hamburger ---------- */
  function initSidebar() {
    var toggler = document.querySelector(".menu-toggler");
    var sidebar = document.querySelector(".secondary_nav_widgetized_area");
    if (!toggler || !sidebar) return;

    var backdrop = document.createElement("div");
    backdrop.className = "sidebar_backdrop";
    document.body.appendChild(backdrop);

    function open() {
      sidebar.classList.add("secondary_nav_is_open");
      toggler.classList.add("active");
      backdrop.classList.add("is-open");
      document.body.classList.add("nav_open");
      toggler.setAttribute("aria-expanded", "true");
    }
    function close() {
      sidebar.classList.remove("secondary_nav_is_open");
      toggler.classList.remove("active");
      backdrop.classList.remove("is-open");
      document.body.classList.remove("nav_open");
      toggler.setAttribute("aria-expanded", "false");
    }
    function toggle(e) {
      if (e) e.preventDefault();
      if (sidebar.classList.contains("secondary_nav_is_open")) close(); else open();
    }

    toggler.addEventListener("click", toggle);
    backdrop.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    var closeBtn = sidebar.querySelector(".sidebar_close");
    if (closeBtn) closeBtn.addEventListener("click", function (e) { e.preventDefault(); close(); });
  }

  /* ---------- back to top ---------- */
  function initBackToTop() {
    var link = document.getElementById("return-to-top");
    if (!link) return;
    function onScroll() {
      if (window.scrollY > 400) link.classList.add("is-visible");
      else link.classList.remove("is-visible");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initHero();
    initGalleries();
    initSidebar();
    initBackToTop();
  });
})();
