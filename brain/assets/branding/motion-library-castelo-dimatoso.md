# Motion Library — Castelo dos Lagos + Buffet Di Matoso

> Phase 3 — Protocolo Branding
> Status: **LOCKED — handoff to dev-agent**
> Last updated: 2026-04-15
> Author: vfx-motion-designer
> Source refs:
> - `brain/assets/branding/art-direction-brief-castelo-dimatoso.md` (Phase 2 brief — master)
> - `brain/design-library/references/castelo-estrategia/motion-config.md` (ceiling reference)
> - `brain/design-library/references/castelo-estrategia/suggested-patterns.md`
> - `brain/design-library/mood-reports/wedding-venue-premium-2026.md` §6
> - `brain/design-library/mood-reports/buffet-gastronomia-premium-2026.md` §5-6
> - `brain/design-library/patterns/motion/02-ease-out-expo-house-curve.md` (canonized house curve)

---

## 0. Reuse vs Create — Library Audit

Before writing a single line, I audited `brain/design-library/patterns/`. The following were **REUSED** (referenced, not duplicated):

- `patterns/motion/02-ease-out-expo-house-curve.md` — the `cubic-bezier(0.16, 1, 0.3, 1)` house curve is already canonized project-wide. Castelo and Di Matoso inherit it without question. Every duration token here maps onto a curve defined in that file.
- `patterns/lenis-smooth-scroll/01-global-smooth-scroll.md` — generic Lenis setup. Adapted into a brand-specific baseline.
- `patterns/SEED.md` §9, §11 — referenced but superseded by the new distilled files below.

**NEW patterns distilled** (also written into `brain/design-library/patterns/motion/` for reuse by future brands):

1. `patterns/motion/fade-up-intersection-observer.md` — brand-blessed default scroll reveal
2. `patterns/motion/self-drawing-hairline.md` — editorial section punctuation
3. `patterns/motion/image-first-text-after.md` — composition rule in motion form
4. `patterns/motion/clip-path-bottom-up-reveal.md` — Di Matoso plate signature
5. `patterns/motion/lenis-smooth-scroll-baseline.md` — shared baseline config

**NOT used in MVP**: GSAP, Framer Motion, SplitText, Three.js, View Transitions API, `animation-timeline: scroll()`. All available in the library, none justified for phase 1. If later phases (e.g., section transitions between Castelo chapters) require scroll-scrub, GSAP + ScrollTrigger enters the stack at that point — not now.

---

## 1. Motion Philosophy — Branded House

**"Luxo se move devagar."**

The two brands share one motion philosophy and one easing curve. They diverge only on their signature hero move and on base duration (Di Matoso's plate reveals are 300ms slower than Castelo's page motion — the kitchen is heavier than the lake).

**Core principles:**

1. **One curve, everywhere.** `cubic-bezier(0.16, 1, 0.3, 1)` — the REIS house curve, inherited from `patterns/motion/02-ease-out-expo-house-curve.md`. Zero spring physics. Zero bounce. Zero elastic. Zero anticipate. Motion lands, never launches.
2. **Slow is the tell.** Base duration is **900ms**. Never below 600ms. Di Matoso goes to 1200ms for plate reveals. If a motion feels premium at 400ms, cut the site — something is wrong.
3. **Motion is felt, not seen.** Aman philosophy. If a visitor remembers the animation, we failed. They should remember the lakes, the plate, the family.
4. **Discipline > variety.** The ceiling reference (`castelo-estrategia`) shipped four motion patterns total: fade-up, nav scroll invert, scroll-indicator pulse, hover color shift. That restraint is why it reads premium. We ship six for the branded house; never more.
5. **`prefers-reduced-motion` is not a fallback — it is a contract.** Every pattern has a documented reduced-motion state that arrives in final position instantly. No exceptions.

**Hard prohibitions (shared with brief §3.7):**

- Spring / bounce / elastic / anticipate / back.out easings
- Parallax displacement > 40px (one exception: Di Matoso 0.6x serif pull-quotes — §4.2 below)
- Hover scale() > 1.02
- Autoplay audio — EVER
- Infinite animations except the Castelo cinemagraph
- Cursor magnetism / cursor-following effects
- Mouse-move parallax (decorative)
- Ken Burns zoom on heroes
- Char-by-char text reveals (SplitText)
- Scroll-hijacking / forced snap-scroll
- Page-transition flash animations

---

## 2. Shared Motion Tokens

Drop into the shared `tokens-motion.css` for both brands. Inherits curve tokens from the REIS house curve file; only durations and translate distances are brand-owned here.

```css
/* tokens-motion.css — Castelo + Di Matoso shared motion */
/* Pattern refs:
   brain/design-library/patterns/motion/02-ease-out-expo-house-curve.md
   brain/design-library/patterns/motion/fade-up-intersection-observer.md
*/

:root {
  /* --- Durations --- */
  --motion-fast:  600ms;   /* nav state, hover, small UI */
  --motion-base:  900ms;   /* Castelo fade-ups, default scroll reveals */
  --motion-slow: 1200ms;   /* Di Matoso fade-ups, plate clip-path reveals, self-drawing hairlines */
  --motion-epic: 1400ms;   /* reserved — hero-first-frame only, once per page */

  /* --- Easing (inherited from REIS house curve) --- */
  --ease-editorial: cubic-bezier(0.16, 1, 0.3, 1);   /* the ONLY curve for Castelo + Di Matoso */

  /* --- Composition rules --- */
  --stagger-image-text: 200ms;   /* text follows image by exactly this */

  /* --- Translate distances --- */
  --translate-up-default: 24px;  /* fade-up default */
  --translate-up-hero:    40px;  /* hero headline only — absolute maximum */
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-fast: 0.01ms;
    --motion-base: 0.01ms;
    --motion-slow: 0.01ms;
    --motion-epic: 0.01ms;
  }
}
```

Per-brand overrides (in `brands/castelo/tokens-motion.css` and `brands/dimatoso/tokens-motion.css`):

```css
/* Castelo dos Lagos — default 900ms */
:root { --motion-brand: var(--motion-base); }
```

```css
/* Buffet Di Matoso — default 1200ms (300ms slower than Castelo) */
:root { --motion-brand: var(--motion-slow); }
```

All `.fade-in` elements reference `var(--motion-brand)` so each brand's pages inherit the correct cadence automatically.

---

## 3. Core Patterns (copy-paste ready)

### 3.1 Fade-Up on Scroll Entry (shared, default)

> Pattern: `brain/design-library/patterns/motion/fade-up-intersection-observer.md`

**Trigger**: IntersectionObserver, threshold 0.12, rootMargin `0px 0px -80px 0px`
**One-shot**: `unobserve()` after first reveal
**Visual**: opacity 0→1 + translateY(24px→0)
**Duration**: `var(--motion-brand)` — Castelo 900ms, Di Matoso 1200ms

```css
/* /styles/motion.css */
.fade-in {
  opacity: 0;
  transform: translateY(var(--translate-up-default));
  transition:
    opacity   var(--motion-brand, 900ms) var(--ease-editorial),
    transform var(--motion-brand, 900ms) var(--ease-editorial);
  will-change: opacity, transform;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
  will-change: auto;
}

@media (prefers-reduced-motion: reduce) {
  .fade-in {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

```js
/* /scripts/motion.js */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -80px 0px',
});

document.querySelectorAll('.fade-in, .plate-reveal, .hairline-rule').forEach((el) => {
  observer.observe(el);
});
```

Total weight: ~0.9 KB JS + 0.4 KB CSS. Zero dependencies.

---

### 3.2 Image-First / Text-After Stagger (shared rule)

> Pattern: `brain/design-library/patterns/motion/image-first-text-after.md`

Any section with a photograph AND typography: image fades up first, text follows 200ms later. Apply the modifier class to the text block.

```css
.fade-in--text-after {
  transition-delay: var(--stagger-image-text);
}
```

```html
<section>
  <figure class="fade-in">
    <img src="/lakes.jpg" alt="" />
  </figure>
  <div class="fade-in fade-in--text-after">
    <h2>II. Os Lagos</h2>
    <p>Os lagos mudam duas vezes por dia. O castelo, nunca.</p>
  </div>
</section>
```

**Non-negotiable rules:**
- 200ms offset, always. Do not tune per section.
- Image first. Never text-first.
- Multiple text blocks in the same section share the 200ms delay — do not cascade 200/400/600 (over-choreographed).

---

### 3.3 Self-Drawing Hairline (shared, brand-colored per brand)

> Pattern: `brain/design-library/patterns/motion/self-drawing-hairline.md`

A 1px accent rule that draws itself left-to-right beneath section titles, 300ms after the title lands. Uses `transform: scaleX()` — NOT width animation.

```css
.hairline-rule {
  display: block;
  width: 64px;
  height: 1px;
  background: var(--hairline-color); /* brand override */
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform var(--motion-slow) var(--ease-editorial) 300ms;
  will-change: transform;
}

.hairline-rule.visible {
  transform: scaleX(1);
  will-change: auto;
}

@media (prefers-reduced-motion: reduce) {
  .hairline-rule { transform: scaleX(1); transition: none; }
}
```

Brand tokens:
```css
/* Castelo */ :root { --hairline-color: #C9A96E; /* gold */ }
/* Di Matoso */ :root { --hairline-color: #B8860B; /* deep gold */ }
```

```html
<h2 class="fade-in">II. Os Lagos</h2>
<span class="hairline-rule" aria-hidden="true"></span>
```

---

### 3.4 Fixed Nav Scroll-State Invert (inherited from ceiling)

> Ceiling reference: `references/castelo-estrategia/motion-config.md` §5
> Suggested pattern: `suggested-patterns.md` Pattern 5 (not yet distilled — recommending orchestrator approve distillation after this delivery)

Transparent over hero → blurred white card over body content. 100px scroll threshold.

```css
.nav {
  position: fixed;
  top: 1.6rem;
  width: 100%;
  z-index: 100;
  transition: all var(--motion-fast) ease;
}

.nav.scrolled {
  top: 0;
  background: rgba(250, 250, 247, 0.96);
  backdrop-filter: blur(20px) saturate(120%);
  -webkit-backdrop-filter: blur(20px) saturate(120%);
  border-bottom: 1px solid var(--border);
  padding: 0.75rem 0;
}

.nav.scrolled .nav-brand { color: var(--charcoal); }
.nav.scrolled .nav-links a { color: var(--text-muted); }
```

```js
/* rAF-throttled scroll listener (production-ready; fixes the ceiling gap) */
const nav = document.getElementById('nav');
let scrollTicking = false;

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      nav.classList.toggle('scrolled', window.scrollY > 100);
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });
```

The rAF wrapping fixes the production gap called out in `motion-config.md` §5. Ship this version, not the raw ceiling one.

---

### 3.5 Lenis Smooth Scroll Baseline (shared)

> Pattern: `brain/design-library/patterns/motion/lenis-smooth-scroll-baseline.md`

Both brands ship Lenis because the sites are image-heavy with 1vh+ sections. ~8KB weight earned. `lerp: 0.1` and `wheelMultiplier: 1` enforce "luxo calmo".

```bash
npm install @studio-freight/lenis
```

```js
/* /scripts/lenis-init.js */
import Lenis from '@studio-freight/lenis';

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    lerp: 0.1,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  window.__lenis = lenis; // expose for optional console tuning during dev
}
```

**Load order**: Lenis initializes BEFORE the IntersectionObserver script so observers receive smoothed scroll events.

---

## 4. Per-Brand Motion Rules

### 4.1 Castelo dos Lagos

**Signature move**: Cinemagraph hero — a single moving element (lake surface, candle flame, leaves rustling at edge) over a still frame. Everything else on the page is motionless until the user scrolls.

**Tokens**:
```css
/* brands/castelo/tokens-motion.css */
:root {
  --motion-brand: var(--motion-base);   /* 900ms */
  --hairline-color: #C9A96E;            /* gold */
}
```

**Rules**:
- `.fade-in` base duration: **900ms** (via `--motion-brand`)
- Hero: `<video>` element (cinemagraph, see 4.1.1 below). No GSAP. No Lenis interaction.
- Section transitions: none — each section arrives with `.fade-in` alone
- Roman numerals (I. II. III.) fade-up **200ms after** their section title (share the `--stagger-image-text` token even though there is no image — the delay establishes rhythm)
- Self-drawing gold hairline below every numbered section title
- Hover on reference cards: background shift from `--surface` to `--cream`, 400ms, house curve
- Prohibited on Castelo: clip-path plate reveals (those belong to Di Matoso — brand distinction), any food imagery motion

#### 4.1.1 Cinemagraph hero spec

```html
<section class="hero-cinemagraph fade-in">
  <video
    class="cinemagraph"
    src="/video/lake-surface.mp4"
    poster="/video/lake-surface.jpg"
    autoplay
    muted
    loop
    playsinline
    aria-hidden="true"
    preload="metadata"
  ></video>
  <!-- text layer on top -->
</section>
```

```css
.hero-cinemagraph {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.hero-cinemagraph .cinemagraph {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (prefers-reduced-motion: reduce) {
  .hero-cinemagraph .cinemagraph { display: none; }
  .hero-cinemagraph { background-image: url('/video/lake-surface.jpg'); background-size: cover; }
}
```

Spec constraints:
- ONE moving element only (lake water OR leaves OR flame — never two)
- Loop seamless, no cuts, no fades
- MP4 + WebM + JPG poster (3 assets per cinemagraph)
- Muted, playsinline, autoplay
- Duration of loop: 6–10 seconds
- File size budget: <2 MB compressed

---

### 4.2 Buffet Di Matoso

**Signature move**: Clip-path bottom-up plate reveal — 1200ms, house curve. "Como um garçom colocando o prato na mesa." Paired with image-first/text-after stagger.

**Tokens**:
```css
/* brands/dimatoso/tokens-motion.css */
:root {
  --motion-brand: var(--motion-slow);   /* 1200ms — slower than Castelo */
  --hairline-color: #B8860B;            /* deep gold */
}
```

**Rules**:
- `.fade-in` base duration: **1200ms** (via `--motion-brand`). Intentionally slower than Castelo — the kitchen is heavier than the lake.
- Hero: plate photography with clip-path bottom-up reveal (1200ms). No video, no cinemagraph.
- Course grid: staggered plate reveals, 150ms offset per row position (`:nth-child(3n+1/2/3)`) — max 300ms total stagger
- Menu-as-essay: sequential paragraph fade-ups with 100ms stagger (NOT the 200ms image-text stagger — this is a different composition, menu rows act as one block)
- Pull-quote parallax: **0.6x** serif italic quotes over full-bleed food photography. This is the ONLY parallax license on either brand site.
- Self-drawing deep-gold hairline below every section title
- Prohibited on Di Matoso: cinemagraph video hero, Ken Burns zoom, any rotating plate spin

#### 4.2.1 Clip-path plate reveal

```css
.plate-reveal {
  clip-path: inset(100% 0 0 0);
  transition: clip-path var(--motion-slow) var(--ease-editorial);
  will-change: clip-path;
}

.plate-reveal.visible {
  clip-path: inset(0 0 0 0);
  will-change: auto;
}

/* Staggered gallery rows (max 3 cols) */
.plate-grid .plate-reveal:nth-child(3n + 2) { transition-delay: 150ms; }
.plate-grid .plate-reveal:nth-child(3n + 3) { transition-delay: 300ms; }

@media (prefers-reduced-motion: reduce) {
  .plate-reveal { clip-path: none; transition: none; }
}
```

The same IntersectionObserver from 3.1 picks up `.plate-reveal` elements.

#### 4.2.2 Menu-as-essay sequential paragraph reveal

```css
.menu-essay .fade-in { transition-delay: 0ms; }
.menu-essay .fade-in:nth-child(2) { transition-delay: 100ms; }
.menu-essay .fade-in:nth-child(3) { transition-delay: 200ms; }
.menu-essay .fade-in:nth-child(4) { transition-delay: 300ms; }
.menu-essay .fade-in:nth-child(5) { transition-delay: 400ms; }
/* cap at 5 — more becomes over-choreographed */
```

#### 4.2.3 Pull-quote 0.6x parallax

The one parallax exception on the entire branded house. Native CSS scroll-timeline where supported; JS fallback via Lenis's scroll event.

**Preferred (2026 native primitive)**:
```css
@supports (animation-timeline: scroll()) {
  .pullquote-parallax {
    animation: parallax-slow linear;
    animation-timeline: scroll();
    animation-range: entry 0% exit 100%;
  }

  @keyframes parallax-slow {
    from { transform: translateY(30px); }
    to   { transform: translateY(-30px); }
  }
}
```

**JS fallback (if native unsupported)**:
```js
/* Piggy-back on Lenis scroll events — no second rAF loop */
const quotes = document.querySelectorAll('.pullquote-parallax');

window.__lenis?.on('scroll', ({ scroll }) => {
  quotes.forEach((q) => {
    const rect = q.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.bottom < 0 || rect.top > vh) return; // offscreen skip
    const progress = (vh - rect.top) / (vh + rect.height); // 0→1 as it traverses
    const translate = (progress - 0.5) * 60; // ±30px = 0.6x of 50px
    q.style.transform = `translateY(${translate}px)`;
  });
});
```

Budget: ±30px displacement. Never more. Disabled under `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  .pullquote-parallax { animation: none; transform: none !important; }
}
```

---

## 5. Prohibited Motion — Hard Rules

Shared with brief §3.7. Reprinted here so dev-agent has one-file authority.

- Spring physics / bounce / elastic / anticipate / back.out
- Parallax displacement > 40px (exception: Di Matoso pull-quotes ±30px)
- Hover `scale()` > 1.02
- Autoplay `<audio>` OR `<video>` with sound
- Infinite loops beyond the Castelo cinemagraph (no decorative spinners, no infinite rotations)
- Motion that does not honor `prefers-reduced-motion`
- Cursor magnetism / cursor-following effects
- Mouse-move decorative parallax
- Ken Burns zoom on heroes
- Char-by-char text reveals (SplitText, letter-splitters)
- Scroll-hijacking / forced snap-scroll
- Page-transition flash / slide animations
- Staggers longer than 300ms cumulative on non-menu sections
- Any easing curve that is not `cubic-bezier(0.16, 1, 0.3, 1)`

---

## 6. Performance Budget

| Metric | Target |
|---|---|
| Frame rate | 60 fps on iPhone 12 / MacBook M1 / iPad Air 4 |
| Animation properties | `opacity`, `transform`, `clip-path` ONLY |
| `will-change` | Applied only during active animation; removed after |
| Total JS weight for motion | <12 KB minified (Lenis ~8KB + motion.js ~1KB + optional parallax ~1KB) |
| First Contentful Paint impact | 0ms (motion JS loaded async/defer after render) |
| Layout thrash | Zero — no `box-shadow` / `width` / `height` / `top`/`left` animations |

**Prohibited for performance**:
- Animating `box-shadow` (use opacity shifts on pseudo-element instead if needed)
- Animating `filter: blur()` on anything larger than 200×200px
- More than one `backdrop-filter` element on screen simultaneously during scroll
- `scroll` event listeners NOT wrapped in rAF

**GSAP justification gate**: if a future feature requires scroll-scrubbed motion, pinned sections, or multi-property timeline orchestration, GSAP + ScrollTrigger enters the stack at that point — documented, justified, and gated on Moroni approval. NOT for MVP.

---

## 7. Reduced Motion — The Contract

```css
@media (prefers-reduced-motion: reduce) {
  /* Duration collapse — global */
  :root {
    --motion-fast: 0.01ms;
    --motion-base: 0.01ms;
    --motion-slow: 0.01ms;
    --motion-epic: 0.01ms;
  }

  /* Blanket safety net */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Force final states on stateful patterns */
  .fade-in { opacity: 1; transform: none; }
  .plate-reveal { clip-path: none; }
  .hairline-rule { transform: scaleX(1); }

  /* Cinemagraph → poster frame */
  .hero-cinemagraph .cinemagraph { display: none; }
  .hero-cinemagraph {
    background-image: var(--poster-frame);
    background-size: cover;
    background-position: center;
  }

  /* Disable Lenis */
  /* (handled in JS init — see 3.5) */
  html { scroll-behavior: auto; }

  /* Parallax pull-quote */
  .pullquote-parallax { animation: none; transform: none !important; }
}
```

**This is not optional.** Every pattern in this library has been designed with its reduced-motion final state in mind. Shipping without this block fails the contract.

---

## 8. Handoff to dev-agent

### 8.1 Install order (both brands)

```bash
npm install @studio-freight/lenis
```

No other dependencies. Everything else is vanilla.

### 8.2 File structure (per brand)

```
src/
  styles/
    tokens-motion.css        ← §2 shared tokens
    motion.css               ← §3 patterns (fade-in, hairline, plate-reveal, pullquote)
  scripts/
    lenis-init.js            ← §3.5 Lenis baseline
    motion.js                ← §3.1 IntersectionObserver + §3.4 nav scroll-state
```

Load order in document:
1. `tokens-motion.css` + brand-specific `tokens-motion.css` (Castelo or Di Matoso)
2. `motion.css`
3. `<script type="module" src="/scripts/lenis-init.js"></script>` — before motion.js
4. `<script type="module" src="/scripts/motion.js"></script>`

### 8.3 Implementation order

1. **Lenis baseline** (§3.5) — ship alone first, verify smooth scroll on both brands' placeholder pages
2. **Reduced-motion block** (§7) — ship before any animation code
3. **IntersectionObserver fade-up** (§3.1) — base layer; verify across 3+ sections
4. **Nav scroll-state invert** (§3.4) — rAF-throttled version
5. **Self-drawing hairline** (§3.3) — piggy-backs on same observer
6. **Image-first/text-after stagger** (§3.2) — composition rule via modifier class
7. **Castelo cinemagraph hero** (§4.1.1) — video element with reduced-motion poster fallback
8. **Di Matoso clip-path plate reveal** (§4.2.1) — piggy-backs on same observer
9. **Di Matoso menu-as-essay stagger** (§4.2.2)
10. **Di Matoso 0.6x pull-quote parallax** (§4.2.3) — ship with `@supports` native version, JS fallback on Lenis

### 8.4 QA checklist before handoff

- [ ] `prefers-reduced-motion: reduce` tested at OS level on Mac + iPhone — every pattern reaches final state instantly
- [ ] 60fps sustained during scroll on iPhone 12 and MacBook M1 (DevTools Performance tab, scroll from top to bottom)
- [ ] Lenis `destroy()` fires under reduced-motion
- [ ] Nav scroll listener is rAF-throttled (grep for `addEventListener('scroll'` — each one must be inside a rAF wrapper or use `{ passive: true }` + rAF)
- [ ] No `will-change` left on elements after their animation completes
- [ ] No animation uses anything other than `opacity`, `transform`, `clip-path`, `backdrop-filter` (one nav element)
- [ ] Only one easing curve in the entire CSS: `cubic-bezier(0.16, 1, 0.3, 1)`
- [ ] Castelo: hero cinemagraph file <2 MB, has JPG poster, muted/playsinline/autoplay/loop
- [ ] Di Matoso: plate reveal is bottom-up (`inset(100% 0 0 0)` → `inset(0)`), never top-down
- [ ] Pull-quote parallax displacement ≤ ±30px
- [ ] Zero GSAP, zero Framer Motion, zero Three.js in bundle

---

## 9. Future-Phase Upgrades (NOT for MVP)

Documented here so orchestrator and dev-agent know what the upgrade path looks like. Do NOT implement without explicit Moroni approval.

- **Native `animation-timeline: scroll()`** for hairlines and parallax when browser support reaches production threshold (Chrome 115+, Safari 17+ already support it) — replaces JS parallax fallback
- **View Transitions API** for chapter-to-chapter navigation (Castelo has I–VII chapter URLs) — OSS, native, no library weight
- **GSAP + ScrollTrigger** IF AND ONLY IF a pinned section or scroll-scrubbed demo is needed (e.g., interactive floor plan of the Castelo). Gate: designer-agent + art-director brief, not a dev-agent decision.
- **Section-to-section page transitions** via View Transitions — currently prohibited (§5) because native support is uneven. Revisit Q3 2026.

---

## 10. Changelog

- 2026-04-15 — Initial motion library for Castelo dos Lagos + Buffet Di Matoso branded house. Distilled 5 new patterns into `brain/design-library/patterns/motion/`. Reused house curve tokens from pre-existing `02-ease-out-expo-house-curve.md`. Authored by vfx-motion-designer from Phase 2 art direction brief and ceiling reference extraction.
