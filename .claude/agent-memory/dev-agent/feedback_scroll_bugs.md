---
name: scroll_bugs_editorial_sites
description: 5 scroll/layout bugs confirmed in Castelo + Di Matoso editorial Astro sites. Prevent recurrence on future builds.
type: feedback
---

## Rule 1 — Never combine CSS scroll-behavior + JS smooth scroll

Remove `scroll-behavior: smooth` from the bare `html {}` rule when Lenis or any JS smooth-scroll library is present. Add it only inside `@media (prefers-reduced-motion: no-preference)` as a native fallback for anchor clicks.

**Why:** Both the CSS timer and Lenis's rAF loop run simultaneously, causing severe jank on every scroll event.

**How to apply:** html block = font-smoothing only. Native smooth scroll goes at the bottom of the motion section, inside the no-preference media query.

---

## Rule 2 — Never apply min-height: 100vh to .section base class

`.section` must only contain `padding-block: var(--section-padding-y)`. No `min-height`, no `display: flex`, no `align-items: center`.

**Why:** With 7 chapters each forced to 100vh, total scroll reaches 700–800vh. Content floats to the vertical center of each viewport — editorial rhythm is destroyed. Only the Hero is allowed `min-height: 100vh`.

**How to apply:** Also audit any inline section styles in page files (`.chapter-convite`, `.chapter-menu`) for the same pattern.

---

## Rule 3 — Lenis is overkill for editorial marketing sites

Remove Lenis entirely. Use native scroll. Saves 8KB, removes JS conflicts, zero visible difference.

**Why:** Lenis was added speculatively. No payoff on simple anchor-scroll editorial pages. Causes conflicts with CSS scroll-behavior.

**How to apply:** `npm uninstall @studio-freight/lenis`, remove the import and rAF block from motion.js.

---

## Rule 4 — Never put will-change on .fade-in base class

Remove `will-change: opacity, transform` from the base `.fade-in` rule.

**Why:** With 30+ elements on page, each gets its own GPU layer at parse time, causing memory pressure and janky rendering on mobile.

**How to apply:** `opacity` + `transform` transitions are already GPU-accelerated. `will-change: auto` on `.fade-in.visible` is acceptable but also not necessary for one-shot fade animations.

---

## Rule 5 — Never @import Google Fonts in CSS when <link> already in <head>

Remove `@import url(...)` from global.css. Fonts must only load via `<link rel="stylesheet">` in `<head>` with `rel="preconnect"` preloads on both `fonts.googleapis.com` and `fonts.gstatic.com`.

**Why:** Duplicate font request doubles network cost and amplifies FOUT.
