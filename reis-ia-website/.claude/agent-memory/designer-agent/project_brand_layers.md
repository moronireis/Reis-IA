---
name: brand_layers_architecture
description: The 3-layer brand system beneath the Reis IA master DS — accents, typography weights, effects, and coexistence rules for each layer. Updated v2.0 — full blue palette, amber/gold/terracotta removed.
type: project
---

Three sub-brand design systems sit below the master (reis-ia-design-system.md). All inherit the same surface system (Surface-0 #000000 through Surface-4 #1A1A1A), text opacity scale, spacing tokens, and Inter Variable.

**IMPORTANT — v2.0 change (2026-03-18):** All layers now use only blues. Amber (#FF8C42), gold (#C4A265), terracotta (#C47A5A), and Warm White (#F5F0E8) have been permanently removed from all three sub-brand DS docs.

---

**Layer 1 — Time Builders**
- Accent primary: Electric Blue #2D7AFF (more saturated than master #4A90FF — intensity communicates urgency)
- Accent urgency: Cyan Blue #00B4FF (max 1 element per PAGE — reserved for maximum urgency moments)
- Nav/Footer: always Blue Master #4A90FF (never electric, never cyan)
- Headline weight: 800 (energy, tribal)
- Signature effects:
  - Z7 Pulse (radial electric blue from bottom — replaces Forge Glow)
  - Time Scanner (conic-gradient rotating border in electric blue — replaces Amber Scanner)
- Opacity ladder: 12 steps for electric, 6 steps for cyan
- Rules:
  - Max 2 electric elements per viewport
  - Max 1 cyan element per ENTIRE page
  - Never electric + cyan in same viewport simultaneously

**Layer 2 — Systems**
- Accent: Blue Master #4A90FF — extreme scarcity (same as master, not modified)
- Nav/Footer: white/gray neutral (no blue in nav — blue only for content conversion moments)
- Headline weight: 600 (executive, controlled)
- Primary CTA: White (#FFFFFF) on Black (#000000) — inversion is the statement
- Signature effects:
  - Grain 0.7% (more subtle than master)
  - Guarantee Seal (conic-gradient rotating border, 8s slow rotation — only on guarantee box)
  - No ambient color pools — black void is intentional
- Opacity ladder: no own ladder — uses master tokens when needed
- Rules:
  - Max 1 blue element per viewport
  - Zero blue is also valid — many sections have no blue at all
  - Ambient color pool → NEVER

**Layer 3 — Moroni Reis**
- Accent: Soft Blue #6AADFF (this IS the master's Accent Hover — elevated to primary for personal brand)
- Ecosystem tags: Blue Master #4A90FF (for product references within Moroni content)
- Warm White: ELIMINATED. Dark mode is absolute.
- Warm Surfaces: ELIMINATED. All surfaces use master scale.
- Headline weight: 400-500 (lightest of all layers — "I don't need to impose")
- Signature effects:
  - Soft Pool (rgba(106,173,255,0.06) radial bottom-left — softer than Z7 Pulse, more diffuse)
  - Blockquote (3px solid #6AADFF border-left + Inter 300 italic)
  - Photo treatment: filter saturate(0.82) brightness(0.96) — no sepia, neutral desaturation
- Opacity ladder: 8 steps
- Rules:
  - Max 1 Moroni section per page
  - Soft Pool only on Surface-1 background (never Surface-0 alone)
  - Never Electric Blue or Cyan in Moroni context

---

**Ecosystem Blue Hierarchy:**
```
Blue Master #4A90FF  →  Institutional (nav, footer, Systems content sparingly)
Electric #2D7AFF    →  Velocity/action (Time Builders content)
Soft Blue #6AADFF   →  Human/personal (Moroni Reis content)
Cyan #00B4FF        →  Maximum urgency (Time Builders only, 1 per page)
```

**Why:** Revised 2026-03-18. All three DS docs updated to v2.0. Previous amber/gold/terracotta direction eliminated.
**How to apply:** Always check which brand layer a page belongs to before specifying components. A page can contain a Moroni section within another layer — apply the layer rules in isolation for that section. Never mix layer accents in the same viewport.
