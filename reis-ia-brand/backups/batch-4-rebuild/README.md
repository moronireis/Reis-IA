## Batch 4 Rebuild Backup

**Date**: 2026-03-17
**Description**: Backup of Batch 4 token pages before rebuild with AIOX-level interactive demos.

### Files backed up:

**Pages:**
- spacing-scale.astro
- surfaces.astro
- semantic-tokens.astro

**Components:**
- EasingDemo.tsx
- DurationDemo.tsx
- SpacingBar.astro

**Styles:**
- animations.css

### What changed:
- Full rebuild of all 3 token pages with hairline grid layouts, interactive demos, click-to-copy everywhere, code blocks alongside live demos, scroll-triggered reveals, and click-to-replay animations.
- New React islands: SurfaceInteractiveDemo.tsx, SpacingRuler.tsx
- Updated EasingDemo.tsx and DurationDemo.tsx with improved visual curve representations.
- Updated SpacingBar.astro with JS-computed pixel display.
