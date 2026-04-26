# Linear — Distillation Plan

## Pattern 1: `patterns/background/ambient-card-glow.md` [HIGH PRIORITY]
**Why**: REIS [IA] cards currently rely on thin borders to separate from the background — amateur signal. Linear's ambient glow (behind the card, blurred, low opacity) is the definitive "premium dark mode" card pattern. Directly applicable to every card component in reis-ia-hub and reis-ia-website.

**Recipe shape**:
- Card: `background: #0F1011; border-radius: 12px; padding: 24px; position: relative;`
- `::before` pseudo: `position: absolute; inset: -40px; background: radial-gradient(ellipse at center, rgba(74,144,255,0.22), transparent 60%); filter: blur(80px); z-index: -1; opacity: 0.6;`
- Parent must have `position: relative` and `isolation: isolate`
- Optional: slow breathing animation (8-12s opacity cycle) for hero cards only
- Budget: zero runtime cost, pure CSS

## Pattern 2: `patterns/surface/near-black-plus-noise.md` [HIGH PRIORITY]
**Why**: Two-in-one foundational upgrade. REIS [IA] currently uses `#000000` site backgrounds which read as "flat terminal." Swap to near-black `#08090A` + 3% noise overlay and the entire site jumps a tier. Foundational — affects every page.

**Recipe shape**:
- Set `--bg-base: #08090A` on `:root`
- `body::before` fixed overlay with inline SVG fractalNoise, `mix-blend-mode: overlay; opacity: 0.03`
- `pointer-events: none`
- Respect `prefers-reduced-motion` (noise is static so it's fine)
- Document the exact near-black variants: base #08090A, surface #0F1011, elevated #16181C

## Pattern 3: `patterns/interaction/cursor-spotlight.md`
**Why**: Lightweight way to make card groups feel interactive without heavy motion. Good candidate for REIS [IA] Systems page feature grid or Builders member directory.

**Recipe shape**:
- Container: `position: relative; overflow: hidden;`
- Listen to `mousemove`, update `--mx, --my` CSS vars (throttle to rAF)
- `::before` pseudo: `background: radial-gradient(600px at var(--mx) var(--my), rgba(74,144,255,0.15), transparent 40%)`
- Disable on touch devices (no hover) and `prefers-reduced-motion`
- Budget: ~30 lines JS, zero library

---

**Orchestrator note**: Patterns 1 and 2 are foundational upgrades that should ship BEFORE any new page work. They change how the entire REIS [IA] surface feels. Pattern 3 is an optional delight-layer for specific sections.
