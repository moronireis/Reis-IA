---
name: Noiva SA Platform
description: Design tokens, stack, and file conventions for the Noiva SA platform
type: project
---

Stack: Pure HTML/CSS/JS single files, no build step, no framework.
Google Fonts: Cormorant Garamond, Great Vibes, Montserrat, Source Sans 3.

Design tokens (CSS custom properties):
- --rose: #DBA99F | --blush: #FFCBC1 | --cream: #F4F3EE
- --eucalyptus: #4A6741 | --taupe: #9C958F | --silver: #BAB9B6
- --rose-dark: #C49189 | --rose-light: #ECC8BE | --taupe-dark: #6b635d
- --bg: #0a0a0a (dark mode default)
- --glass-bg: rgba(219,169,159,0.05) | --glass-border: rgba(219,169,159,0.12)

Logo CSS: `<span style="color:#DBA99F">NOIVA</span> <span style="color:#9C958F">S.A.</span>` — Cormorant Garamond weight 300.

Files:
- assessoria-sa-apresentacao.html — main sales/presentation page
- raio-x-sa.html — diagnostic quiz (slider-based, 5 categories × 5 questions × 0-10 scale, radar chart, animated results)
- design-system/ — reference docs

Additional design tokens for raio-x-sa:
- --card-bg: #1a1a1a | --track-bg: #2a2a2a
- Slider filled bg: JS-injected linear-gradient per value change
- Score box: 52×52px, border animates to rose when value > 0

raio-x-sa.html architecture (slider version, April 2026):
- 8 screens: Welcome → 5 Category Pages → Loading → Results
- ALL 5 questions shown per category (scrollable), not one at a time
- State: JS array of 25 integers (index = catIdx*5 + qIdx)
- Slider + number buttons (0-10) are bidirectionally synced
- Sticky progress card (position: sticky top:0) on category screen
- Results: SVG stroke-dashoffset circle, count-up animation, pentagon radar chart, breakdown bars
- Radar: 5 axes at 72° intervals using polarToCartesian trigonometry

Particle system: canvas-based, subtle rose particles floating upward. Pattern in assessoria-sa-apresentacao.html.
Cursor glow: CSS custom properties --mx --my set via mousemove, body::after pseudo-element.

**Why:** No build step = easy file sharing and preview without npm. All visual effects done in vanilla JS/CSS.
**How to apply:** Keep all pages as single .html files. Reference the design tokens above for any new pages.
