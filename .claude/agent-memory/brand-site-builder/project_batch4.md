---
name: Batch 4 Token Pages (Rebuilt)
description: Batch 4 rebuilt 2026-03-17 with AIOX-level interactive demos — hairline grids, bezier curves, JS-computed pixel widths, interactive surface explorer
type: project
---

Batch 4 token pages were originally built then REBUILT with higher-quality interactive demos.

**Pages rebuilt:**
- `/brandbook/spacing-scale` — SpacingRuler with JS-computed pixel widths, hairline grids, CodeBlock alongside demos
- `/brandbook/surfaces` — SurfaceInteractiveDemo (click tiers to explore), contrast matrix in hairline grid, live card hover demos
- `/brandbook/semantic-tokens` — EasingDemo with canvas bezier curves, DurationDemo with gradient bars, hairline grid layouts throughout

**New components created (rebuild):**
- `SpacingRuler.tsx` — React island: shows spacing bars with JS-computed pixel widths, updates on resize, click-to-copy
- `SurfaceInteractiveDemo.tsx` — React island: clickable nested surface tiers with info panel, tier buttons, copy
- `EasingDemo.tsx` — REBUILT: now includes canvas-rendered bezier curve + control points alongside the ball animation
- `DurationDemo.tsx` — REBUILT: gradient progress bars, relative width proportional to 2000ms, copy button

**Key patterns:**
- Hairline grid (gap-1px) used extensively with inline grid-template-columns for custom column counts
- Responsive collapse for inline-styled hairline grids via CSS attribute selectors in global.css
- CodeBlock placed alongside live demos (not instead of them)
- Every token shows: name, CSS variable, value, visual preview, copy button
- Click-to-replay on all animation demos
- Backups at `reis-ia-brand/backups/batch-4-rebuild/`
