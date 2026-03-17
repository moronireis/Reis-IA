---
name: Brand Mark Refinement Step A v2
description: H1-B hourglass refinement v2 with reference-informed improvements — 5 variations, 6 optical sizes, agent icon refined. Variation A recommended.
type: project
---

Brand mark refinement Step A v2 completed 2026-03-17, producing 5 subtle variations of the H1-B "Open Intersection" Hourglass plus 6 size-optimized variants and refined agent icon.

## Variations

**Variation A (Recommended — Mathematical Precision)**: True center at y=32, bars at y=8/56 for max canvas use, gap 8 units, uniform 1.5px stroke. Best all-rounder.

**Variation B (Structural Hierarchy)**: Variable strokes — bars 1.25px, diagonal 1.5px, intersection stubs 1.75px. Draws eye to gap. Best at 48px+.

**Variation C (Micro-Rounded Path)**: Z-shape as single path with round-join corner softening. More approachable. Best at 32px+.

**Variation D (Taller Proportions)**: Width 28u, height 54u, ratio 1:1.69 (near golden). Narrower/taller. Best at 48px+.

**Variation E (Maximum Gap)**: Gap 12 diagonal units for maximum small-size legibility. Best at 16-32px.

## Size Optimization System (v2)

Stroke weight and gap scale inversely with render size:
- **opt-16**: 3.5px stroke, 14u gap (was 3px/12u in v1)
- **opt-24**: 2.5px stroke, 11u gap (was 2.25px/10u)
- **opt-32**: 2px stroke, 9u gap (was 1.75px/9u)
- **opt-48**: 1.5px stroke, 8u gap (standard)
- **opt-64**: 1.5px stroke, 8u gap (standard)
- **opt-128**: 1.25px stroke, 6u gap (tighter for elegance)

Key change from v1: favicon (opt-16) stroke increased from 3px to 3.5px and gap widened from 12u to 14u for better legibility at tiny size.

## Agent Icon

Refined with consistent stroke weight system matching hourglass:
- 16px: 2.5px stroke, wider geometry
- 24px: 2px stroke
- 32px: 1.75px stroke
- 48px+: 1.5px stroke (standard)

## Reference Insights Applied

- Apple: Optical size variant system, strict grid alignment, maximum canvas utilization
- Stripe: Mathematical proportions, geometric precision
- Linear: Inter font native, dark-mode-first SVG optimization
- Porsche: Precise centering, multi-breakpoint icon adjustment
- Morningside: Zero brand iconography = competitive gap for Reis IA to exploit

**Why:** The original mark's center was off (y~31 vs y=32), favicon stroke was too thin for 16px rendering, and the mark lacked size-specific optimization that premium brands like Apple provide.

**How to apply:** When implementing the hourglass in the website, use the optical size variant matching the rendering context. favicon=opt-16, nav=opt-24, inline=opt-32, section=opt-48, feature=opt-64, hero/watermark=opt-128.
