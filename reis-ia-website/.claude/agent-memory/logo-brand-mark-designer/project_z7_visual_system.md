---
name: Z7 Visual System — Design Decisions
description: Core geometry, color rules, and file inventory for the Z7 brand mark system (Time Builders)
type: project
---

Z7 visual system v1 completed 2026-03-18.

**Core geometry (64x64 viewBox):**
- The 7: path `M16,10 L52,10 L28,54` — top bar + descending diagonal = upper hourglass triangle
- The Z: path `M36,10 L12,54 L48,54` — ascending diagonal + bottom bar = lower hourglass triangle
- Diagonals cross near center (approximately 32,32) forming the hourglass waist
- Top bar spans x:16-52 at y:10; bottom bar spans x:12-48 at y:54

**Why:** The Z7 concept encodes "O Tempo e Rei" into two alphanumeric characters that, overlaid, reveal an hourglass silhouette. The geometry is intentionally asymmetric (7 and Z do not mirror perfectly) — this makes both characters readable individually while the combined form reads as an hourglass.

**How to apply:** All future Z7 marks must use this exact coordinate system for consistency. Size-optimized variants adjust stroke-width only (4px at 16px, down to 1.25px at 128px). The geometry stays identical across all sizes.

**Color rules (non-negotiable):**
- Electric Blue #2D7AFF for Time Builders accent
- Cyan #00B4FF for urgency (max 1 per page)
- Blue Master #4A90FF for ecosystem/nav contexts
- Electric Deep #1050BB for light background variant
- NEVER gold, amber, or terracotta

**Product variants:**
- Z7 Hours: Electric Bright #5599FF, clock tick marks at waist, 1.2s pulse
- Z7 Days: Electric Primary #2D7AFF, center waist dot, 2.5s pulse (primary product)
- 7 Stages: Only the 7 path + 7 dots along diagonal (opacity gradient)
- Z7 Months: Bezier curves at waist (Q control points), 1.25px stroke, 5s pulse

**Files created:** 14 SVG files in `brand-marks/` directory, all z7-*-v1.svg. Preview at `design-previews/z7-visual-preview.html`.
