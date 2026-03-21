---
name: Batch 5 Rebuild Patterns
description: Patterns and decisions from the Batch 5 visual pages rebuild (effects, patterns, motion, vfx) with AIOX-level interactive demos
type: project
---

Batch 5 visual pages (effects, patterns, motion, vfx) were rebuilt on 2026-03-17 with AIOX-level interactive demos.

**Why:** The original pages had basic demos but lacked interactive controls (sliders), hairline grid layouts, and the correct H1-B hourglass SVG. The rebuild brings them to parity with the motion page quality standard.

**How to apply:**
- New components: WatermarkDemo.tsx (H1-B "Open Intersection" SVG with opacity slider and placement toggle), ScrollRevealContainer.tsx (simulated IntersectionObserver scroll container), GradientBorderGlowDemo.tsx (background-clip technique with glow intensity slider)
- Rebuilt components: RotatingBorderDemo.tsx (speed slider 2-16s), AmbientPoolDemo.tsx (type/corner toggles), GrainDemo.tsx (opacity slider 0-25%), AuroraDemo.tsx (orb count/speed controls), EasingDemo.tsx (hairline grid cell), DurationDemo.tsx (hairline grid cell), ScrollRevealDemo.tsx (2x2 hairline grid), StaggerGridDemo.tsx (delay/duration/item-count sliders)
- H1-B SVG is stroke-based: 5 lines (2 horizontal bars + 2 crossing diagonals with open gap at center). NOT filled triangles/polygons.
- All demo grids use hairline grid pattern (gap-1px with parent bg as dividers)
- Control bars use consistent pattern: padding 12px 16px, borderRadius 8px, background var(--surface-2), border var(--border-default)
- Range sliders use accentColor: 'var(--accent-blue)' and height: '4px' for consistent styling
- Motion page is the flagship page with 11 sections: principles, easing curves, durations, entrances, stagger, card hover, scroll reveal, ambient, reduced motion, hover table, usage rules
- Backups at reis-ia-brand/backups/batch-5-rebuild/
