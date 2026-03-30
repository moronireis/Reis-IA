---
name: Hero Background Techniques Extraction
description: Extracted hero background CSS techniques from Linear, Vercel, Stripe (2026-03-25). Key patterns: blur orbs, grid mesh, animated dots, noise texture, conic borders.
type: reference
---

Hero background techniques extracted from Linear, Vercel, Stripe on 2026-03-25.

Key findings stored in `brain/research/references/`:
- `reference-hero-backgrounds.md` — full analysis with exact CSS values
- `snippets-hero-backgrounds.md` — 11 implementable CSS snippets adapted to Reis IA palette
- `hero-backgrounds-preview.html` — visual preview of all techniques

Top techniques for Reis IA:
1. **Blur Orbs** (Vercel) — radial-gradient + blur(150px) + opacity 0.2-0.35. Most impactful.
2. **Grid Mesh** (Vercel) — CSS mask-image with repeating grid lines.
3. **Animated Dots** (Linear) — staggered opacity grid with hardware detection.
4. **Noise Texture** — SVG feTurbulence at 3% opacity for film-grain depth.
5. **Conic Gradient Border** (Vercel) — rotating border glow for cards/CTAs.

CSS extraction challenge: all three sites use CSS-in-JS (styled-components, Next.js CSS modules) with minified chunk filenames. Hero effects often split across multiple CSS files or generated at runtime. Vercel's CSS chunks at `/vc-ap-vercel-marketing/_next/static/chunks/*.css` were the most fruitful source.
