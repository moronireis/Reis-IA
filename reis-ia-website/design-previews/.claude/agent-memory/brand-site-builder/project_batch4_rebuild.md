---
name: Batch 4 Rebuild Patterns
description: Patterns and decisions from the Batch 4 token pages rebuild with AIOX-level interactive demos
type: project
---

Batch 4 token pages (spacing-scale, surfaces, semantic-tokens) were rebuilt on 2026-03-17 with interactive demos.

**Why:** The original pages were static documentation. The rebuild adds hairline grids, click-to-copy everywhere, click-to-replay animations, bezier curve visualizations, JS-computed pixel displays, and interactive surface tier exploration.

**How to apply:**
- New components created: SpacingRuler.tsx (JS-computed pixel widths), SurfaceInteractiveDemo.tsx (clickable nested surfaces)
- EasingDemo.tsx rebuilt with canvas-based bezier curve visualization
- DurationDemo.tsx rebuilt with gradient progress bars
- All pages use hairline grid pattern (gap-1px) from global.css
- Responsive hairline grid collapse added for inline-styled grids via CSS attribute selectors
- Brand site is at `/Users/moronireis/Projetos vscode/reis-ia-brand/`
- Backups at `reis-ia-brand/backups/batch-4-rebuild/`
