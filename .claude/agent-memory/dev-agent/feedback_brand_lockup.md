---
name: Brand Lockup Rules
description: How to render the REIS [IA] brand name in UI — typography weights, color split, and deprecated patterns
type: feedback
---

Brand name is **REIS [IA]** — not "Reis IA".

Rendering rule:
- "REIS" → `font-weight: 300` (light), `color: var(--text-primary)` (white)
- " [IA]" → `font-weight: 300` (light), `color: var(--accent-blue)` (#4A90FF)
- Always rendered as two adjacent `<span>` elements, no space between REIS and [IA] in markup (the space is part of the [IA] span text)

Example (Logo.astro pattern):
```html
<span class="font-light text-[var(--text-primary)]">REIS</span><span class="font-light" style="color: var(--accent-blue);"> [IA]</span>
```

Favicon: blue background + black hourglass mark at stroke-width 7.

**Why:** Brand renamed from "Reis IA" to "REIS [IA]" as part of brand refresh. The bracket notation is intentional — represents the structured, architectural brand identity.

**How to apply:** Anywhere the brand name appears in UI (logos, headers, copy references, aria-labels, copyright lines). Never write "Reis IA" — always "REIS [IA]".
