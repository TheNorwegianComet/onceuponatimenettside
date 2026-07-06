/* HOLLYWOOD 1969 — interactions */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Intro film-leader countdown ─────────────────────────── */
  var intro = document.getElementById("intro");
  var introCount = document.getElementById("introCount");

  function endIntro() {
    if (!intro || intro.classList.contains("intro--done")) return;
    intro.classList.add("intro--done");
    document.body.style.overflow = "";
  }

  if (intro && !prefersReducedMotion) {
    document.body.style.overflow = "hidden";
    var count = 3;
    var sweep = 0;
    var sweepTimer = setInterval(function () {
      sweep = (sweep + 24) % 384;
      intro.style.setProperty("--sweep", Math.min(sweep, 360) + "deg");
      if (sweep >= 360) {
        sweep = 0;
        count -= 1;
        if (count <= 0) {
          clearInterval(sweepTimer);
          endIntro();
        } else {
          introCount.textContent = count;
        }
      }
    }, 55);
    intro.addEventListener("click", function () {
      clearInterval(sweepTimer);
      endIntro();
    });
    // safety: never trap the visitor
    setTimeout(endIntro, 4000);
  } else {
    endIntro();
  }

  /* ── Hero letter stagger indices ─────────────────────────── */
  var heroLetters = document.querySelectorAll("#heroWord span");
  heroLetters.forEach(function (el, i) {
    el.style.setProperty("--i", i);
  });

  /* ── Sticky nav background ───────────────────────────────── */
  var nav = document.getElementById("nav");
  function onScroll() {
    nav.classList.toggle("nav--solid", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Parallax layers ─────────────────────────────────────── */
  var plxEls = Array.prototype.slice.call(document.querySelectorAll("[data-plx]"));
  if (plxEls.length && !prefersReducedMotion) {
    var plxItems = plxEls.map(function (el) {
      return { el: el, speed: parseFloat(el.getAttribute("data-plx")) || 0, section: el.closest("section") };
    });
    var plxTicking = false;
    function applyParallax() {
      plxTicking = false;
      var vh = window.innerHeight;
      plxItems.forEach(function (item) {
        var r = item.section.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        item.el.style.transform = "translate3d(0," + (-r.top * item.speed).toFixed(1) + "px,0)";
      });
    }
    window.addEventListener("scroll", function () {
      if (!plxTicking) {
        plxTicking = true;
        requestAnimationFrame(applyParallax);
      }
    }, { passive: true });
    applyParallax();
  }

  /* ── Stagger delays for grouped reveals ──────────────────── */
  document.querySelectorAll(".reveal-stagger").forEach(function (group) {
    Array.prototype.forEach.call(group.querySelectorAll(".reveal"), function (el, i) {
      el.style.setProperty("--d", (i * 120) + "ms");
    });
  });

  /* ── Reveal on scroll ────────────────────────────────────── */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── Count-up stats ──────────────────────────────────────── */
  var statObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        statObserver.unobserve(el);
        var target = parseInt(el.dataset.count, 10);
        if (prefersReducedMotion) {
          el.textContent = target;
          return;
        }
        var start = null;
        var duration = 1400;
        function tick(ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll(".stub__num").forEach(function (el) {
    statObserver.observe(el);
  });

  /* ── Custom cursor ───────────────────────────────────────── */
  var cursor = document.getElementById("cursor");
  var cursorDot = document.getElementById("cursorDot");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (finePointer && cursor && cursorDot) {
    var cx = -100, cy = -100, tx = -100, ty = -100;
    document.addEventListener("mousemove", function (e) {
      tx = e.clientX;
      ty = e.clientY;
      cursorDot.style.left = tx + "px";
      cursorDot.style.top = ty + "px";
    });
    (function follow() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      cursor.style.left = cx + "px";
      cursor.style.top = cy + "px";
      requestAnimationFrame(follow);
    })();
    document.querySelectorAll("a, button, .panel, .poster, .frame, .stub").forEach(function (el) {
      el.addEventListener("mouseenter", function () { cursor.classList.add("cursor--hover"); });
      el.addEventListener("mouseleave", function () { cursor.classList.remove("cursor--hover"); });
    });
  }

  /* ── Filmstrip drag-to-scroll ────────────────────────────── */
  var strip = document.getElementById("filmstrip");
  if (strip) {
    var isDown = false, startX = 0, scrollStart = 0;
    strip.addEventListener("pointerdown", function (e) {
      isDown = true;
      startX = e.clientX;
      scrollStart = strip.scrollLeft;
      strip.classList.add("dragging");
    });
    window.addEventListener("pointermove", function (e) {
      if (!isDown) return;
      strip.scrollLeft = scrollStart - (e.clientX - startX);
    });
    window.addEventListener("pointerup", function () {
      isDown = false;
      strip.classList.remove("dragging");
    });
    // vertical wheel scrolls the reel horizontally while hovering it
    strip.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        var maxScroll = strip.scrollWidth - strip.clientWidth;
        var next = strip.scrollLeft + e.deltaY;
        // let the page keep scrolling when the reel is at either end
        if ((next > 0 && next < maxScroll) || (e.deltaY > 0 && strip.scrollLeft < maxScroll) || (e.deltaY < 0 && strip.scrollLeft > 0)) {
          e.preventDefault();
          strip.scrollLeft = next;
        }
      }
    }, { passive: false });
  }

  /* ── Tilt on cards & posters ─────────────────────────────── */
  if (finePointer && !prefersReducedMotion) {
    document.querySelectorAll("[data-tilt]").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          "rotate(0deg) translateY(-8px) scale(1.03) perspective(700px)" +
          " rotateY(" + px * 8 + "deg) rotateX(" + -py * 8 + "deg)";
      });
      el.addEventListener("mouseleave", function () {
        el.style.transform = "";
      });
    });
  }
})();
