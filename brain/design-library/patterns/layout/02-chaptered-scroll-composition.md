# Chaptered Scroll Composition

**Category**: layout
**Difficulty**: architectural (page-level decision, not component-level)
**Dependencies**: None. CSS scroll-snap optional. IntersectionObserver for chapter tonal shifts.

**Use when**: Designing the REIS [IA] home, a methodology deep-dive, or any long-form page that needs narrative gravity instead of SaaS section stacking. Architectural decision, not a component.

## What it is

Instead of composing a long marketing page as a continuous stack of `<section>` blocks, compose it as **4–6 explicit chapters**, each with its own atmospheric register (background token, vertical rhythm, motion intensity) and a deliberate tonal shift at the boundary. Each chapter is introduced by a chapter-mark — a number, a label, or nothing at all, just generous negative space acting as a film cut.

The REIS [IA] home maps to 6 chapters:

1. **Hero Gravity** — `#000000`, tight type, one pointermove spotlight, no scroll yet
2. **Pillar Reveal** — `#080808`, three-column rhythm, horizontal drag or staggered reveals
3. **Method Demonstration** — `#0A0A0A`, scripted state-machine panel (see `hero-effects/03`)
4. **Proof** — `#0D0D0D`, publication-grade figure frames (see `proof/02`), number tickers (see `proof/01`)
5. **Close** — `#000000`, return to the darkest register, one CTA, one line
6. **Footer** — `#050505`, decorative hourglass watermark, "O Tempo é Rei" as decorative footnote

## Why REIS-grade

- **Film-edit cadence, not infinite scroll** — reads like a documentary, not a dashboard. Consultivo premium demands narrative pressure.
- **Tonal ladder, not dividers** — Linear's near-black ladder applied at chapter granularity. The shift itself is the section break — no `<hr>`, no decorative lines.
- **Contained motion** — each chapter declares its motion budget. Hero has pointermove, method has state machine, proof has number tickers. No chapter runs two heavy effects at once.
- **Mobile honors the cut** — chapter boundaries become extra vertical padding on small screens. The film cut survives.

## Dependencies

- CSS only for the structural version.
- IntersectionObserver (vanilla) for chapter tonal shifts if you want the root background to interpolate as chapters enter.
- No Lenis required for this pattern alone, but Lenis is already mandatory on every REIS surface (`patterns/lenis-smooth-scroll/01-global-smooth-scroll.md`) and pairs naturally with it.
- Optional: `animation-timeline: scroll()` (2026 native) for chapter-entry reveals on modern browsers with an IntersectionObserver fallback.

## Code recipe

### 1. Page skeleton

```tsx
// pages/index.tsx
// Pattern: brain/design-library/patterns/layout/02-chaptered-scroll-composition.md
// Source ref: brain/design-library/references/arc-browser/

export default function Home() {
  return (
    <main className="chaptered">
      <section className="chapter chapter--hero"    data-chapter="01" data-register="void">
        {/* HeroGravity */}
      </section>

      <section className="chapter chapter--pillars" data-chapter="02" data-register="cool-1">
        {/* PillarReveal */}
      </section>

      <section className="chapter chapter--method"  data-chapter="03" data-register="cool-2">
        {/* MethodDemo */}
      </section>

      <section className="chapter chapter--proof"   data-chapter="04" data-register="cool-3">
        {/* ProofFigures */}
      </section>

      <section className="chapter chapter--close"   data-chapter="05" data-register="void">
        {/* CloseCTA */}
      </section>

      <footer  className="chapter chapter--footer"  data-chapter="06" data-register="void-dim">
        {/* Footer */}
      </footer>
    </main>
  );
}
```

### 2. Chapter tokens + rhythm

```css
/* chaptered.css — REIS [IA] tokens only */

:root {
  /* near-black tonal ladder — see Linear pattern inspiration */
  --chapter-void:    #000000;
  --chapter-void-dim:#050505;
  --chapter-cool-1:  #080808;
  --chapter-cool-2:  #0A0A0A;
  --chapter-cool-3:  #0D0D0D;

  /* generous vertical rhythm — Mercury-grade */
  --chapter-pad-y-xl: 200px;
  --chapter-pad-y-lg: 160px;
  --chapter-pad-y-md: 120px;
  --chapter-pad-y-sm: 96px;
}

html, body {
  background: var(--chapter-void);
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
}

.chaptered {
  display: flex;
  flex-direction: column;
}

.chapter {
  position: relative;
  padding-block: var(--chapter-pad-y-xl);
  padding-inline: clamp(16px, 4vw, 64px);
  /* the tonal shift IS the section break */
  transition: background-color 800ms cubic-bezier(0.16, 1, 0.3, 1);
}

.chapter[data-register="void"]     { background: var(--chapter-void); }
.chapter[data-register="void-dim"] { background: var(--chapter-void-dim); }
.chapter[data-register="cool-1"]   { background: var(--chapter-cool-1); }
.chapter[data-register="cool-2"]   { background: var(--chapter-cool-2); }
.chapter[data-register="cool-3"]   { background: var(--chapter-cool-3); }

/* chapter-mark — optional mono label, top-left, small */
.chapter::before {
  content: "CH " attr(data-chapter);
  position: absolute;
  top: 48px;
  left: clamp(16px, 4vw, 64px);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: rgba(255, 255, 255, 0.28);
}

@media (max-width: 900px) {
  .chapter { padding-block: var(--chapter-pad-y-md); }
}
@media (max-width: 600px) {
  .chapter { padding-block: var(--chapter-pad-y-sm); }
  .chapter::before { top: 24px; font-size: 10px; }
}
```

### 3. Optional: chapter-entry tonal drift on the root background

```ts
// chapter-observer.ts
// Drives a root CSS variable as chapters cross the viewport,
// so the page background interpolates between registers instead of snapping.

const REGISTERS: Record<string, string> = {
  'void':     '#000000',
  'void-dim': '#050505',
  'cool-1':   '#080808',
  'cool-2':   '#0A0A0A',
  'cool-3':   '#0D0D0D',
};

export function initChapterObserver() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const chapters = document.querySelectorAll<HTMLElement>('.chapter');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const reg = entry.target.getAttribute('data-register') ?? 'void';
        document.documentElement.style.setProperty(
          '--page-bg',
          REGISTERS[reg] ?? '#000000'
        );
      });
    },
    { threshold: 0.5 }
  );

  chapters.forEach((c) => io.observe(c));
}
```

```css
html { background: var(--page-bg, #000000); transition: background 800ms cubic-bezier(0.16, 1, 0.3, 1); }
```

## Variables to tune

- **Chapter count** — 4 minimum (hero / body / proof / close), 6 maximum. 6 is where the REIS home lives.
- **Vertical rhythm** — `--chapter-pad-y-xl` drives the whole site's breathing room. 160–200px desktop is the premium band. Below 140 feels SaaS.
- **Tonal ladder steps** — keep deltas subtle. The full range should be `#000000 → #0D0D0D`. Anything lighter than `#101010` reads as "gray mode", not "dark mode".
- **Chapter-mark visibility** — `rgba(255,255,255,0.28)` is deliberate. Readable but not demanding. Drop to `0.18` if the page has many chapters.

## Accessibility

- Each chapter is a landmark `<section>` with a visible heading (not shown in the skeleton — add `<h2>` inside each). The mono `::before` chapter number is decorative, `aria-hidden` by virtue of being `::before`.
- The tonal shift respects `prefers-reduced-motion`: the `transition: background-color 800ms` is removed and backgrounds snap.
- Keyboard tab order follows document order naturally — chapters are just sections.
- Ensure heading levels are sane: `<h1>` in the hero chapter only, `<h2>` in every other chapter.

## Performance

- Pure CSS background transitions cost nothing.
- The IntersectionObserver version touches one CSS variable per threshold crossing — negligible.
- No scroll listeners, no rAF loops at the page level.
- Chapter-internal motion is the responsibility of each chapter's component (state machine, number ticker, etc.). This pattern enforces that only one chapter's heavy motion runs at a time, because only one chapter is in-view.

## Known variants

- **Explicit chapter marks** — swap the mono label for a full-width horizontal rule + chapter title on its own screen. Use on manifesto pages, not the home.
- **Scroll-snap chapters** — add `scroll-snap-type: y mandatory` on the scroller and `scroll-snap-align: start` on each chapter. Controversial: it fights Lenis and hurts accessibility. Not recommended for REIS; documented here for completeness.
- **Parallax-chapter hybrid** — pin the chapter mark while contents scroll underneath. Pairs with `patterns/gsap-scroll-trigger/01-pinned-hero-reveal.md`.

## Source references

- `brain/design-library/references/arc-browser/motion-config.md` — "chaptered cinematic essay scroll" as the headline motion of arc.net.
- `brain/design-library/references/arc-browser/suggested-patterns.md` — Pattern 1, the distillation prompt.
- `brain/design-library/references/arc-browser/html.html` — section-by-section structure of the Arc home.
- `brain/design-library/references/linear/suggested-patterns.md` — Pattern 1 (near-black tonal ladder), consumed here as the color step palette.
- `brain/design-library/references/mercury/suggested-patterns.md` — Pattern 2 (generous vertical rhythm), consumed here as the padding tokens.
