# Arc — Distillation Plan

## Pattern 1: `patterns/scroll/inter-section-color-morph.md` [HIGHEST PRIORITY]
**Why**: REIS [IA]'s current pages are uniform black top-to-bottom. Arc proves scroll storytelling can use SUBTLE background shifts to create "acts" within a single page. With REIS [IA]'s brand-safe palette (black → navy → near-blue → black), this unlocks cinematic long-form pages without breaking brand.

**Recipe shape**:
- Define 4-5 brand-safe stage colors as CSS variables on `:root`
- Each section has `data-stage="N"` attribute
- IntersectionObserver at 50% threshold updates `document.body.style.setProperty('--stage-current', ...)`
- `body { background: var(--stage-current); transition: background 1200ms cubic-bezier(0.4, 0, 0.2, 1); }`
- Respect `prefers-reduced-motion`: skip the transition, still update the var instantly
- Budget: ~40 lines JS + CSS

## Pattern 2: `patterns/layout/editorial-pull-quote.md`
**Why**: REIS [IA] testimonials currently sit in 3-column grid cards — marketing-site default. Arc's single-pull-quote treatment feels like The Atlantic. Immediate upgrade for all social proof.

**Recipe shape**:
- Single large quote centered, narrow width (18ch max)
- Font size: `clamp(28px, 3vw, 44px); font-weight: 400; line-height: 1.3`
- Author credit below in 14px meta style with hairline top border
- Generous margin above/below (120px+ desktop)
- Optional: entry animation `opacity 0 → 1, translateY(40px) → 0, 900ms ease-out-quart`
- Use SPARINGLY — one pull-quote per page max, or it stops being editorial

## Pattern 3: `patterns/interaction/scroll-linked-3d-tilt.md`
**Why**: Moroni's personal brand site and Systems page both need a "product is tactile" treatment. Arc's scroll-linked 3D tilt is the technique. For REIS [IA]: apply to a laptop mockup, the hourglass decorative element, or the [IA] bracket wordmark on hero.

**Recipe shape**:
- Parent: `perspective: 1500px`
- Child: `transform-style: preserve-3d; transform: rotateX(var(--tx, 0deg)) rotateY(var(--ty, 0deg))`
- Scroll handler reads section progress (0→1), maps to `--tx = (progress - 0.5) * 20deg`
- `transition: transform 200ms linear` for smoothness
- Disable on touch + `prefers-reduced-motion`
- Pair with Lenis for best feel (already in the approved stack)

---

**Orchestrator note**: Pattern 1 is the boldest technique in this entire harvest batch — it will reshape how REIS [IA] long-form pages feel. Consider prototyping it in `iterations/` first before promoting. Pattern 2 is trivial and should ship this week. Pattern 3 is a delight-layer for hero sections only.
