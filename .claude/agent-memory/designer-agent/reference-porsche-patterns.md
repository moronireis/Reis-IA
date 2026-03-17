---
name: Porsche Design System Key Patterns
description: Extracted design patterns from Porsche.com relevant to Reis IA -- fluid spacing, easing curves, restraint principles
type: project
---

## Key Adoptable Patterns

1. **Fluid spacing with clamp()**: 6 tokens from 4-8px to 80-200px. Porsche ratios are ~2-2.5x between steps.
2. **Line-height formula**: `calc(6px + 2.125ex)` -- single rule scales across all sizes. Needs testing with Inter.
3. **Custom easing**: `cubic-bezier(0.25, 0.1, 0.25, 1)` as base (nearly identical to CSS ease but engineered).
4. **4 duration tiers**: 0.25s / 0.4s / 0.6s / 1.2s. Each ~1.5-2x the previous.
5. **Image hover**: `scale3d(1.05, 1.05, 1.05)` at 0.4s with overflow:hidden parent.
6. **Single shadow**: `0 4px 16px rgba(0,0,0,0.16)` used everywhere.
7. **Glassmorphism**: `backdrop-filter: blur(32px)` with ~85% opacity background.
8. **Border-radius**: Only 4px and 8px. Not pills, not sharp.
9. **Alpha-based borders**: White at 8%, 15%, 50%, 60%, 100% for layered depth.

## Key Difference from Reis IA
- Porsche uses blue-tinted black (#0e0e12); Reis IA uses warm-black (#0A0A0A)
- Porsche has NO accent color; Reis IA has muted gold (#C9A84C)
- Porsche uses proprietary font; Reis IA uses Inter

**Why:** These patterns represent the luxury digital standard. Adopting the system while keeping our warm palette creates differentiated premium feel.
**How to apply:** Reference `brain/assets/design-systems/reference-porsche.md` and `snippets-porsche.md` when building component specs or Tailwind config.
