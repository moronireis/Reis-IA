# Stripe — Distillation Plan

## Pattern 1: `patterns/background/webgl-gradient-mesh.md` [HIGHEST PRIORITY]
**Why**: This is THE modern premium background. Stripe, Linear, Vercel, Anthropic — every site in this tier uses a variation. REIS [IA] currently has flat backgrounds; adding this pattern unlocks an instant tier jump. Works for: site hero, sub-brand pages, offer pages, Moroni personal hero.

**Recipe shape**:
- `<canvas>` absolute positioned at hero root, behind content
- WebGL fragment shader with uniforms: `u_time`, `u_resolution`, `u_colors[4]`
- Simplex noise perturbs UV coordinates, then color = mix(stops, noise)
- REIS [IA] color stops: `#000000`, `#0A0E1F`, `#13244A`, `#4A90FF` (all inside our palette)
- Frame rate: 60fps cap, pauses on `prefers-reduced-motion` and tab blur
- DPR capped at 1.0 for fillrate
- CSS `linear-gradient` fallback for non-WebGL
- Budget: ~8KB shader + plumbing

## Pattern 2: `patterns/interaction/card-hover-lift.md`
**Why**: Every card in REIS [IA] currently uses flat hover color change. Stripe's translateY + shadow bloom is the universal "this is premium" micro-interaction. Zero cost, applies everywhere.

**Recipe shape**:
- Base shadow: `0 2px 5px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.05)`
- Hover shadow: `0 13px 27px rgba(0,0,0,0.18), 0 8px 16px rgba(0,0,0,0.08)`
- `transform: translateY(-4px)` on hover
- Transition: `transform 220ms cubic-bezier(0.2,0,0,1), box-shadow 220ms cubic-bezier(0.2,0,0,1)`
- For dark mode: invert shadow to blue bloom `0 13px 27px rgba(74,144,255,0.18)`

## Pattern 3: `patterns/typography/three-tier-rhythm.md`
**Why**: REIS [IA] currently overuses bold/display weights on everything. Stripe's rule: max 3 weights per viewport, specifically display-medium (500) / regular (400) / meta (420 variable). Enforces visual discipline.

**Recipe shape**:
- Documented type scale with exactly 3 weights
- Display: Inter 500, -0.015em tracking, 1.08 line-height
- Body: Inter 400, 1.55 line-height
- Meta: Inter 420 (variable), 0.01em tracking, 0.65 opacity
- Include a "do/don't" reference showing what 5-weight chaos looks like

---

**Orchestrator note**: Pattern 1 (WebGL gradient mesh) is the highest-value addition of this entire harvest batch. It should be distilled first and rolled into the reis-ia-website redesign immediately. Pattern 2 is low-effort / high-reward. Pattern 3 is a rules document, not code — can be written in 30min.
