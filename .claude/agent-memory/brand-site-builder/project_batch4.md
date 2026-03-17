---
name: Batch 4 Token Pages
description: Batch 4 completed 2026-03-17 — spacing-scale, surfaces, semantic-tokens pages plus EasingDemo and DurationDemo React islands
type: project
---

Batch 4 built three token documentation pages and two new React island components.

**Pages created:**
- `/brandbook/spacing-scale` — Named fluid spacing (8 tokens) + numeric component spacing (11 tokens) + containers + border radius + live demos
- `/brandbook/surfaces` — 5-tier surface system with nested depth demo, text/border contrast on surfaces, interactive card hover demo
- `/brandbook/semantic-tokens` — 13 sections: blue opacity ladder, signal colors, text scale, border scale, shadows, interactive states, gradients, easing curves, durations, z-index, containers, icon sizes, border radius

**Components created:**
- `EasingDemo.tsx` — React island: animated ball traverses a track using the specified cubic-bezier. Click to replay.
- `DurationDemo.tsx` — React island: progress bar fills over the specified duration. Clamps ambient (13s) to 2s for demo. Click to replay.

**Patterns confirmed:**
- All pages use BrandbookLayout with SectionLabel numbered sections and gradient-divider between sections
- Existing components (SpacingBar, ColorSwatch, TokenTable, CopyButton, DosDonts) reused extensively
- Interactive demos use inline `onmouseenter`/`onmouseleave` for simple hover states (no React needed)
- React islands (client:visible) only for clipboard and animated demos requiring state
- Token values verified against design-system.css (the implemented source)
