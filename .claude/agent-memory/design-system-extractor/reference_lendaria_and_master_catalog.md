---
name: Lendaria Sites + Master Catalog Extraction
description: Extracted Academia Lendaria (Next.js RSC, limited CSS access) and Agencia Lendaria (basic WordPress/Elementor, no unique techniques). Created master-techniques-catalog.md aggregating 87 techniques from all 8 active references.
type: project
---

Completed extraction of 2 Lendaria sites + master techniques catalog on 2026-03-17.

**Academia Lendaria (academialendaria.ai)**:
- Next.js with React Server Components -- CSS in chunked files, not directly extractable via WebFetch
- academialendaria.com redirects to /lander which returns 403
- Design tokens sourced primarily from pre-existing reference-academia-lendaria.md
- Key techniques: rotating conic gradient border (6.4s), 3D perspective entrance (1.2s, rotateX 15deg), text shimmer (13s), glass stats overlay
- Uses Geist font family (same as Vercel), Inter as primary visual font

**Agencia Lendaria (agencialendaria.com.br)**:
- Basic WordPress + Elementor build
- No custom animations, no unique visual techniques
- Standard WP design tokens only
- Contributed 0 unique techniques to the master catalog

**Master Techniques Catalog**: 87 techniques organized in 10 categories across 8 active references. Agencia Lendaria excluded from technique count. Priority implementation order defined in 3 phases.

**Why:** The master catalog is the definitive reference for the dev-agent and designer-agent when building Reis IA pages. All techniques include vanilla JS / CSS-only code patterns -- no Framer Motion or GSAP.

**How to apply:** dev-agent should reference master-techniques-catalog.md for any animation/interaction implementation. Phase 1 techniques are mandatory for launch.
