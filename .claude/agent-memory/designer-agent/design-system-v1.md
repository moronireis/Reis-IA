---
name: Design System v1 Decisions
description: Key decisions made in the official Reis IA Design System v1.0 and their rationale
type: project
---

## Core Files
- Design System: `brain/assets/design-systems/reis-ia-design-system.md`
- Implementation Guide: `brain/assets/design-systems/reis-ia-implementation-guide.md`

## Key Decisions

### Surface System: 5 Tiers (not 3, not 8)
- #000000, #0A0A0A, #111111, #161616, #1A1A1A
- Vercel uses 3 (too flat), Agencia Lendaria uses 8+ (too noisy)
- 5 is the sweet spot for dark-mode depth without complexity

### Text Hierarchy: White at opacity (not hex grays)
- 100%, 70%, 50%, 35%, 20%
- From Linear's approach; cleaner intervals than their 100/70/50/48/35
- Ensures text harmonizes on any surface tier

### Border System: 4 neutral + 1 accent
- 5%, 8%, 12%, 20% white + 30% gold
- "Felt not seen" philosophy from Linear

### Easing: 5 curves
- ease-base (Porsche), ease-out (Vercel/Apple), ease-in (Porsche), ease-dramatic (new), ease-card (Stripe)

### Durations: 7 tiers
- 100ms / 200ms / 300ms / 500ms / 800ms / 1200ms / 13000ms

### Signature Elements (5 unique to Reis IA)
1. Gold Whisper -- shimmer text with gold band, 13s cycle
2. Gilded Scanner -- rotating conic border with gold segment, 8s cycle
3. Warm Ambient Pools -- gold-tinted radial gradients at section corners
4. Time-Strategy Watermarks -- hourglass/chess at 3-5% opacity
5. Surface Depth Harmony -- 5-tier bg + white-alpha borders + grain texture

### Typography: 10-level fluid scale
- clamp() for all sizes, no breakpoint jumps
- Display 72px -> 40px, Body stays at 16px
- Letter-spacing: -0.03em (display) to +0.05em (label)

### Spacing: 8 fluid tokens
- xs(4px) to 4xl(80-160px)
- Porsche-inspired clamp() formulas

**Why:** These decisions synthesize the best patterns from 8 reference sites while maintaining Reis IA's unique warm dark identity. The gold accent at max-2-per-viewport rule is the key differentiator from competitors.
**How to apply:** All future page specs and component designs MUST reference these files. Dev-agent should implement the Tailwind config and CSS custom properties first before building any components.
