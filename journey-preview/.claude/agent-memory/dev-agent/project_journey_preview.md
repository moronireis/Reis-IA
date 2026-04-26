---
name: Journey Preview — Visualization Concepts
description: Structure and patterns for the journey visualization concept preview pages
type: project
---

Standalone HTML/CSS/JS preview pages at `journey-preview/public/`. No framework, no build step.

Pages: `index.html` (concepts 1-5), `page2.html` (6-10), `page3.html` (11-14, hybrids).

**Why:** Used to compare visual approaches for a learning journey UI before committing to an Astro build.

**How to apply:** Each page shares the same nav/tab structure, CSS vars, dark mode defaults, and Inter font via Google Fonts. Concepts are `<div class="concept-panel">` shown/hidden by `switchTab()`. Star canvas, tooltip, and SVG route-draw are all pure vanilla JS.

Colors: `#4A90FF` blue, `#22C55E` green, `#8B5CF6` purple, `#F59E0B` amber, `#EC4899` pink.

Status nodes: complete=green, active=blue (pulsing), available=white/dim, locked=very dim (0.04-0.08 opacity).
