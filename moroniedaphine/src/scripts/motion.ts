/* ─────────────────────────────────────────────────────────────
   MORONI & DAPHINE — Shared motion layer
   Patterns consulted:
   - brain/design-library/patterns/lenis-smooth-scroll/01-global-smooth-scroll.md
   - brain/design-library/patterns/motion/fade-up-intersection-observer.md
   - brain/design-library/patterns/motion/self-drawing-hairline.md
   Philosophy: editorial calm. Slower lerp (0.08) for "weight".
   Disabled on: prefers-reduced-motion, touch devices (native scroll wins on mobile).
   ───────────────────────────────────────────────────────────── */

declare global {
  interface Window {
    Lenis?: any;
    __lenis?: any;
    __motionInit?: boolean;
  }
}

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

// Guard against double-init (pages share this script via import)
if (!window.__motionInit) {
  window.__motionInit = true;

  /* ─── 1. Lenis smooth scroll ─────────────────────────────────
     Loaded lazily from CDN. Skipped on reduced-motion AND touch
     (touch devices get better native momentum scroll).
  */
  function initLenis() {
    if (reduce || isTouch) return;
    if (window.Lenis) { startLenis(); return; }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js';
    script.defer = true;
    script.onload = startLenis;
    document.head.appendChild(script);
  }

  function startLenis() {
    if (!window.Lenis) return;
    const lenis = new window.Lenis({
      lerp: 0.08,            // slower than default 0.1 — editorial "weight"
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    window.__lenis = lenis;
    function raf(t: number) {
      lenis.raf(t);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  /* ─── 2. Scroll reveals ──────────────────────────────────────
     Elements with .reveal fade+lift when entering viewport at 70%.
     Supports stagger via .reveal-stagger children (120ms each).
     Fallback only — native CSS animation-timeline would be ideal
     but browser support still patchy in 2026 for scroll() on non-chromium.
  */
  function initReveals() {
    const targets = document.querySelectorAll<HTMLElement>('.reveal, .reveal-group');
    if (!targets.length) return;

    if (reduce) {
      targets.forEach(el => el.classList.add('is-visible'));
      document.querySelectorAll('.reveal-stagger > *').forEach(el => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        el.classList.add('is-visible');

        // Stagger children if group
        if (el.classList.contains('reveal-group')) {
          const kids = el.querySelectorAll<HTMLElement>('.reveal-stagger > *');
          kids.forEach((kid, i) => {
            setTimeout(() => kid.classList.add('is-visible'), i * 150);
          });
        }
        io.unobserve(el);
      });
    }, {
      threshold: 0.25,
      rootMargin: '0px 0px -10% 0px',
    });

    targets.forEach(el => io.observe(el));
  }

  /* ─── 3. Nav hide/show on scroll ─────────────────────────────
     Scroll down past 120px → hide. Scroll up → show.
     80px hysteresis to prevent flicker.
     Adds .is-scrolled class past 40px for backdrop treatment.
  */
  function initNavScroll() {
    const nav = document.querySelector<HTMLElement>('.site-nav');
    if (!nav) return;

    let lastY = window.scrollY;
    let lastDir = 0;          // 1 down, -1 up
    let accumulator = 0;
    const THRESHOLD = 80;
    const HIDE_AFTER = 120;

    function onScroll() {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;

      // Backdrop state
      if (y > 40) nav!.classList.add('is-scrolled');
      else nav!.classList.remove('is-scrolled');

      // Near top: always visible
      if (y < HIDE_AFTER) {
        nav!.classList.remove('is-hidden');
        accumulator = 0;
        return;
      }

      const dir = dy > 0 ? 1 : dy < 0 ? -1 : 0;
      if (dir !== lastDir) { accumulator = 0; lastDir = dir; }
      accumulator += Math.abs(dy);

      if (accumulator < THRESHOLD) return;

      if (dir === 1) nav!.classList.add('is-hidden');
      else if (dir === -1) nav!.classList.remove('is-hidden');
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── 4. Hero entrance ──────────────────────────────────────
     Adds .is-ready to .hero on DOMContentLoaded to trigger
     CSS-driven fade-in sequence.
  */
  function initHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    // Small delay so first paint includes the "before" state
    requestAnimationFrame(() => {
      requestAnimationFrame(() => hero.classList.add('is-ready'));
    });
  }

  /* ─── 5. Countdown ticker (initial 0→target animation) ──────
     Reads #countdown-display, when it enters viewport animates
     numbers from 0 to target over 1500ms ease-out, then hands
     off to the 1-second interval update.
  */
  function initCountdown() {
    const display = document.getElementById('countdown-display');
    if (!display) return;

    const TARGET = new Date('2026-06-12T00:00:00').getTime();
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');
    const done = document.getElementById('countdown-done');
    const label = document.querySelector('.countdown__label') as HTMLElement | null;

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !done) return;

    function pad(n: number) { return String(n).padStart(2, '0'); }

    function compute() {
      const diff = TARGET - Date.now();
      if (diff <= 0) return null;
      return {
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      };
    }

    function paint(v: { d: number; h: number; m: number; s: number }) {
      daysEl!.textContent    = pad(v.d);
      hoursEl!.textContent   = pad(v.h);
      minutesEl!.textContent = pad(v.m);
      secondsEl!.textContent = pad(v.s);
    }

    function showDone() {
      display!.hidden = true;
      done!.hidden = false;
      if (label) label.hidden = true;
    }

    const targetVals = compute();
    if (!targetVals) { showDone(); return; }

    // Respect reduced-motion — paint immediately, then interval.
    if (reduce) {
      paint(targetVals);
      setInterval(() => {
        const v = compute();
        if (!v) { showDone(); return; }
        paint(v);
      }, 1000);
      return;
    }

    // Initial reveal: animate 0 → target on first intersection
    let animated = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || animated) return;
        animated = true;
        const start = performance.now();
        const DUR = 1500;
        const ease = (t: number) => 1 - Math.pow(1 - t, 3); // ease-out cubic

        function frame(now: number) {
          const t = Math.min(1, (now - start) / DUR);
          const e = ease(t);
          const v = compute();
          if (!v) { showDone(); return; }
          paint({
            d: Math.round(v.d * e),
            h: Math.round(v.h * e),
            m: Math.round(v.m * e),
            s: Math.round(v.s * e),
          });
          if (t < 1) requestAnimationFrame(frame);
          else {
            // Hand off to 1s interval for live updates
            setInterval(() => {
              const next = compute();
              if (!next) { showDone(); return; }
              paint(next);
            }, 1000);
          }
        }
        requestAnimationFrame(frame);
        io.unobserve(display!);
      });
    }, { threshold: 0.4 });

    io.observe(display);
  }

  /* ─── 6. Mobile drawer improvements ──────────────────────────
     Body scroll lock when open + backdrop click to close +
     inert on main content.
  */
  function initDrawer() {
    const hamburger = document.querySelector<HTMLButtonElement>('.site-nav__hamburger');
    const drawer = document.getElementById('mobile-menu');
    const main = document.getElementById('main-content');
    if (!hamburger || !drawer) return;

    function setOpen(open: boolean) {
      hamburger!.setAttribute('aria-expanded', String(open));
      drawer!.setAttribute('aria-hidden', String(!open));
      document.body.classList.toggle('drawer-open', open);
      if (main) {
        if (open) main.setAttribute('inert', '');
        else main.removeAttribute('inert');
      }
    }

    // Re-bind (Nav.astro already binds — we override cleanly)
    const fresh = hamburger.cloneNode(true) as HTMLButtonElement;
    hamburger.parentNode?.replaceChild(fresh, hamburger);

    fresh.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = fresh.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (drawer!.getAttribute('aria-hidden') === 'false' &&
          !fresh.contains(e.target as Node) &&
          !drawer!.contains(e.target as Node)) {
        setOpen(false);
      }
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  /* ─── Bootstrap ──────────────────────────────────────────── */
  function boot() {
    // Lenis disabled — was causing "infinite scroll" feel due to lerp 0.08.
    // Native browser scroll is cleaner for this editorial context.
    // initLenis();
    initReveals();
    initNavScroll();
    initHero();
    initCountdown();
    initDrawer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
}

export {};
