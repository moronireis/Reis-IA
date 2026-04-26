# Linear — Homepage

- **Source**: https://linear.app
- **Harvested**: 2026-04-15
- **Extraction method**: WebFetch (structural only — Linear aggressively strips public CSS access)
- **Why it matters**: Linear is the definitive reference for dark-mode discipline, subtle ambient motion, and restrained type systems in 2026. No product site in the SaaS world uses black surfaces better. The "calm, consistent interface" brief (from Linear's own changelog, March 2026) matches REIS [IA]'s premium-by-restraint philosophy exactly.

## What we harvested
- Structural layout (status card layouts, avatar components, nested navigation, Gantt timeline)
- Interface vocabulary (issue cards, timeline planner, inbox structure)
- Tone of motion (intentional restraint — "calmer, more consistent")
- NOT harvested (needs Playwright): raw CSS tokens, ambient glow keyframes, animation library (likely Framer Motion or custom), exact palette hex

## Reusable techniques spotted

1. **Ambient glow over hard borders** — Linear's cards don't use visible borders. Instead, they use a soft radial glow from behind the card (position: absolute, blur(80px), low opacity) that creates the illusion of a floating surface on a dark background. Reads as "premium dark" vs. the amateur "just set border: 1px solid white/10."

2. **Near-black surface, not true black** — Linear's background is ~#08090A, not #000. True black on dark mode looks flat and "terminal-ish." The subtle warmth of near-black reads as "intentionally designed dark." Match this in REIS [IA]: replace `#000000` site background with `#08090A` or `#0A0B0E` for non-hero surfaces.

3. **Type-on-noise surfaces** — Section backgrounds have a barely-visible noise texture overlay (SVG fractalNoise or PNG grain at 2-4% opacity). Kills the "CSS gradient amateur" feel that pure flat surfaces create. Universal upgrade.

4. **Motion by subtraction** — Linear deliberately removed motion from their 2026 redesign ("calmer, more consistent"). This is a strategy: premium products mature toward less motion, not more. For REIS [IA]: audit current animations, remove 50%, what survives is the signature.

5. **Feature reveal choreography** — Features are introduced one at a time as the reader scrolls, with each feature getting a dedicated frame (not stacked in a grid). Feels like a presentation, not a marketing page. Pacing: each feature holds for ~1 full viewport.

## Screenshot plan (for Playwright re-run)

| Frame | Device | Section | What to capture |
|-------|--------|---------|-----------------|
| hero | 1440px | 0,0 | Opening frame + ambient glow |
| feature-single | 1440px | any feature section | Single-feature-per-viewport pacing |
| card-glow | 1440px | any card | Card with behind-glow effect |
| timeline | 1440px | Gantt section | Planning view composition |
| noise-surface | 1440px | any section | Noise texture evidence |
| mobile-hero | 390px | 0,0 | Mobile adaptation |

## Limitations
- Linear ships CSS through dynamic Next.js chunks that WebFetch cannot resolve.
- Exact palette needs browser DevTools computed-styles inspection.
- The ambient glow technique needs source inspection to get the blur/opacity recipe.

See `distillation-plan.md` for patterns to promote.
