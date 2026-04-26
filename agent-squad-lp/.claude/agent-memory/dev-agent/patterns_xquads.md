---
name: Xquads Pattern Adaptations
description: 7 patterns adapted from raxo.com.br/xquads competitor — key differences from original
type: project
---

Extracted 2026-04-22 from xquads. 7 patterns adapted into our design system.

**Why:** Competitor analysis showed these as the most impactful techniques, worth distilling into reusable patterns.

**How to apply:** When building new pages or components, pull from these patterns before inventing from scratch.

Key adaptations vs original:
1. `canvas-ambient-grid` — color #D1FF02 → #4A90FF. Added `prefers-reduced-motion` check (they missed it).
2. `1px-gap-grid` — `gap:1px; background:border-color; overflow:hidden` on container. No per-card border needed.
3. `terminal-code-card` — cmd color green → blue. Typing triggered by IntersectionObserver, not fixed timeout.
4. `button-shimmer` — skewed `::after` pseudo slides left→right on hover. Disabled via `prefers-reduced-motion`.
5. `section-label-ornament` — `::before`/`::after` with `flex:1; max-width:60px; height:1px`. Three variants.
6. `marquee-proof-bar` — duplicated content + `translateX(-50%)`. Added hover-to-pause (they lacked it).
7. `sticky-price-sidebar` — `position:sticky; top:100px`. Falls to `static` below 640px mobile.
