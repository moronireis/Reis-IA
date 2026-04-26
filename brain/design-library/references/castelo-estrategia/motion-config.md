# Motion Config — castelo-estrategia.vercel.app

> Extracted: 2026-04-15
> Stack: Vanilla JS + CSS transitions + IntersectionObserver. No GSAP, no Framer, no Lenis, no Three.js.

---

## 1. Motion Philosophy

Restrained editorial motion. The site treats itself as a **printed document** — animation is used ONLY to:
1. Reveal content as the reader scrolls (fade-up on enter)
2. Signal that the nav has entered a "scrolled" state (color + blur transition)
3. Punctuate a single hero element (the scroll indicator pulse)

There is no parallax, no counter animation, no stagger orchestration, no 3D. This discipline is part of why it reads premium.

---

## 2. Global Scroll Behavior

```css
html { scroll-behavior: smooth; }
```

Plus JS-driven smooth scroll on anchor clicks:

```js
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
```

No Lenis. Native smooth scroll only. This is a deliberate choice given the document-length layout — Lenis would add weight for marginal gain.

---

## 3. Signature Easing

```css
transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
```

This is the `easeOutExpo`-adjacent "premium swoop" curve. Used on `.fade-in`. **800ms** is long for a reveal — deliberately slow to feel considered, not reactive.

Other transitions in the document use generic `0.3s` or `0.4s ease`:

| Element | Transition |
|---|---|
| `.nav` | `all 0.4s ease` |
| `.nav-brand` color | `color 0.3s` |
| `.nav-links a` color | `color 0.3s` |
| `.diagnosis-card` border | `border-color 0.3s` |
| `.pillar-card` bg | `background 0.3s` |

---

## 4. Fade-Up on Scroll Reveal

CSS:

```css
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-in.visible { opacity: 1; transform: translateY(0); }
```

JS (IntersectionObserver):

```js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
```

Config details:
- **threshold: 0.1** — trigger when 10% of the element is visible
- **rootMargin: `0px 0px -50px 0px`** — fire 50px BEFORE element enters bottom of viewport (pre-loads the reveal)
- **One-shot**: no `unobserve()`, but also no class removal → each element animates once then stays visible
- **Distance**: 20px only — subtle, not dramatic. The slow 800ms is what sells it, not the distance.

---

## 5. Fixed Nav Scrolled-State Transition

```js
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 100);
});
```

```css
.nav { transition: all 0.4s ease; }

.nav.scrolled {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
  padding: 0.75rem 0;
}

.nav.scrolled .nav-brand { color: var(--charcoal); }
.nav.scrolled .nav-links a { color: var(--text-muted); }
```

The 100px threshold means the nav transitions right after the user leaves the dark hero — perfect sync with background change. The simultaneous color inversion (white → charcoal brand, gold links → muted) is the polish move.

**Warning**: the scroll listener is NOT rAF-throttled. At document length this is fine, but in a real production build it should be wrapped in `requestAnimationFrame` or throttled via a `scrolling` flag.

---

## 6. Hero Scroll Indicator — Pulse Animation

```css
.scroll-line {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, rgba(201,169,110,0.4), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}
```

Simple 2s opacity pulse. The gradient on the line itself (gold → transparent) does most of the visual work.

---

## 7. Hover States (static CSS, not JS)

| Element | Hover effect |
|---|---|
| Diagnosis card | `border-color: var(--border-strong)` (gold 20% → 40%) |
| Pillar card | `background: var(--surface)` (white → warm grey) |
| Nav link | `color: var(--gold)` |

All use the generic 0.3s color/border transition. No transform, no scale, no shadow lift. Again — disciplined.

---

## 8. What's Missing (and that's fine)

- No stagger — children reveal together, not sequenced
- No parallax on hero radial gradients (they are pure CSS, static)
- No counter-up on KPIs or hero-meta numbers
- No cursor effects
- No page transitions
- No scroll-linked progress indicators
- No prefers-reduced-motion fallback — **this is a real gap** for a real production site

## 9. Prefers-reduced-motion — MISSING

There is NO `@media (prefers-reduced-motion: reduce)` rule in the document. For a Moroni-ready production build derived from this reference, that is a mandatory addition. Suggested minimum:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
  .fade-in { opacity: 1; transform: none; }
  html { scroll-behavior: auto; }
}
```
