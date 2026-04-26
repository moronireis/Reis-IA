# Porsche Taycan — Distillation Plan

## Pattern 1: `patterns/scroll/scroll-scrubbed-video-hero.md`
**Why**: Alternative to Apple's image-sequence technique — same cinematic scrub effect with a single `<video>` file (lighter payload, simpler delivery). For REIS [IA]: Moroni personal brand hero, Systems product demo hero, case study openers. When a single continuous motion beats 200 discrete frames.

**Recipe shape**:
- `<video muted playsinline preload="auto" src="hero.mp4">` with `display: none` on controls
- Video encoded CBR, keyframe every 0.1s for scrub precision (h264 `-g 3 -keyint_min 3`)
- Scroll listener → `video.currentTime = progress * video.duration`
- Sticky container with `height: 250vh` for scroll headroom
- Budget: ~8MB for 6-second hero at 1080p
- Fallback: static poster image for `prefers-reduced-motion`

## Pattern 2: `patterns/layout/metric-as-display-type.md`
**Why**: REIS [IA] constantly needs to show ROI numbers, results, time savings. Current default is tables. Porsche proves numbers should be HERO typography, not spec rows. Immediately applicable on all case study and offer pages.

**Recipe shape**:
- Metric container: flex column, label above, number hero
- Number: `font-size: clamp(64px, 9vw, 128px); font-weight: 500; letter-spacing: -0.02em; line-height: 0.9`
- Label: `font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em; opacity: 0.6`
- Optional: animated counter on IntersectionObserver enter (0 → target, 1200ms ease-out-quart)
- Blue accent ONLY on the final digit or unit symbol for REIS [IA] branding

## Pattern 3: `patterns/interaction/hotspot-reveal.md`
**Why**: Systems architecture diagrams on REIS [IA] currently read as flat infographics. Porsche's hotspot pattern turns a static image into an interactive exploration. Works for: Systems architecture, Builders curriculum map, Moroni journey timeline, offer value-stack visualization.

**Recipe shape**:
- Background image (SVG or PNG)
- Absolutely positioned `<button>` dots at semantic coordinates
- Idle pulse: `@keyframes pulse { 0%,100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.4; } }` 2s infinite
- Active: dot expands to circle, detail panel slides in from nearest edge (400ms ease-out)
- Only one hotspot open at a time
- Keyboard navigable (Tab between dots, Enter to open, Esc to close)

---

**Orchestrator note**: Pattern 1 is the highest-leverage addition to `patterns/scroll/` — pairs perfectly with Apple's image-sequence pattern as "two ways to do scroll scrub." Pattern 2 should ship first because it unlocks every case study page immediately. Pattern 3 is a medium-priority unlock for Systems page redesign.
