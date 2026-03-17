---
name: Design System Preview Rebuild
description: Step 4B complete -- rebuilt reis-ia-design-system-preview.html as ultimate interactive showcase with all 20 sections
type: project
---

Design system preview fully rebuilt on 2026-03-17 as the definitive interactive showcase.

**Why:** Previous preview was adequate but needed to match quality of reference previews (AIOX, Stripe, Morningside) and cover ALL tokens/components/effects.

**How to apply:** The preview at `design-previews/reis-ia-design-system-preview.html` is the canonical visual proof. Any design system changes should be reflected here. Key patterns used:
- AIOX-style: hairline grid (gap-1px), click-to-replay, click-to-copy with toast, sidebar IntersectionObserver tracking
- Stripe-style: easing curve demo tracks with animated boxes, duration progress bars
- Hardware-adaptive: reduces animations on weak devices (hardwareConcurrency <= 4)
- All 20 sections cover: colors, opacity ladder, surfaces (nested depth), typography (12 levels), spacing, borders/radius, shadows, gradients, buttons (4 variants), cards (6 types), forms (5 states), badges (5 variants), signature effects (5 with sliders), animations (10 with replay), easings (5 curves), durations (7 bars), advanced effects (5), stagger system (configurable), accessibility, z-index/containers
