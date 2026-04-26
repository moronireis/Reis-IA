# Apple iPhone — Distillation Plan

> Patterns to promote into `brain/design-library/patterns/` after orchestrator approval.

## Pattern 1: `patterns/scroll/image-sequence-hero.md`
**Why**: Apple's most recognizable technique. Gives perceived 3D quality with plain `<img>` swapping. Zero Three.js overhead. For REIS [IA] use cases: hourglass rotating with scroll, product mockup rotating on Systems page hero, VSL frame scrub on offer pages.

**Recipe shape**:
- Sticky container with `height: 300vh`
- Inner `position: sticky; top: 0; height: 100vh`
- `<canvas>` 1920×1080 with `drawImage(frames[currentIndex])`
- Scroll listener → `currentIndex = floor(progress * (totalFrames - 1))`
- Preload first 10 frames eagerly, rest on demand
- Budget: ~150 frames @ 80KB WebP = 12MB (acceptable for hero)

## Pattern 2: `patterns/typography/blur-to-sharp-headline.md`
**Why**: The entrance treatment that says "this is premium" without being showy. Pair with Inter 600 at 96px on REIS [IA] hero frames. Universal — works on any sub-brand page.

**Recipe shape**:
- Initial state: `filter: blur(14px); opacity: 0; transform: translateY(20px)`
- Final state: unset all three
- Duration 800ms, easing `cubic-bezier(0.28, 0.11, 0.32, 1)`
- Triggered by IntersectionObserver at 20% threshold
- Respect `prefers-reduced-motion` → skip blur, keep opacity only

## Pattern 3: `patterns/layout/chapter-nav-scaffold.md`
**Why**: REIS [IA] long-form pages (case studies, offer pages, Builders curriculum) need a way to feel like a table of contents without becoming wikipedia. Apple's chapter-nav is the answer: sticky pill, auto-active on scroll, morphs between chapters.

**Recipe shape**:
- `<nav>` with sticky top, flex pill containing chapter links
- IntersectionObserver watches each chapter section, sets `--active-index`
- Active indicator uses FLIP: measure old/new position, translate + width tween
- 400ms `cubic-bezier(0.4, 0, 0.2, 1)`
- Works with native scroll; no Lenis dependency

---

**Orchestrator note**: Patterns 1 and 2 are highest value — both are reusable in the current reis-ia-website redesign. Pattern 3 is specifically for long-form offer pages, lower priority until funnel-architect needs it.
