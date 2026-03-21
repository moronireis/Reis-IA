---
name: VFX Preview Integration
description: VFX preview files in reis-ia-website/design-previews/ and their integration status in the brandbook
type: project
---

VFX previews exist as standalone HTML files at `reis-ia-website/design-previews/`:
- `hourglass-vfx-preview.html` — 8 hourglass effects (hover glow, watermark breathing, particle formation, line-by-line construction, scroll fill, easter egg 7 clicks, aurora temporal, scanner line)
- `z7-loading-animations-preview.html` — 7 rotation variations + 7 Z->7->hourglass morphing sequences
- `systems-vfx-preview.html` — constellation, org chart, dashboard, agent icons
- `branding-elements-preview.html` — kinetic typography, FOMO, 7:7 compression, hero/villain contrast

**Integrated into brandbook (2026-03-20):**
- Sections 09-13 of `/brandbook/vfx` now contain: hourglass interactions (6 effects), Z7 loading (6 rotations), kinetic type, 7:7 compression bar, constellation (Systems)
- CSS keyframes added to `design-system.css`

**Not yet integrated:**
- Z->7->Hourglass morphing sequences (complex SVG path morphing, needs JS)
- Particle formation (needs canvas JS)
- Scroll fill progression (needs scroll JS)
- Full Systems dashboard/org chart (complex SVG)
- Hero/villain contrast visuals
- FOMO visual elements
