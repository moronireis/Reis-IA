---
name: Reis IA Brand & Design System Website
description: New separate project (reis-ia-brand/) to build a complete brand/design system documentation site modeled on AIOX structure, using Reis IA tokens.
type: project
---

New project started 2026-03-16: Reis IA Brand & Design System Website.

- **Location**: `reis-ia-brand/` (separate from `reis-ia-website/`)
- **Purpose**: Single source of truth for brand identity, design tokens, components, patterns, guidelines
- **Reference**: AIOX brand site (brand.aioxsquad.ai) — full extraction at `brain/assets/design-systems/aiox-full-extraction/` (40 pages, 45 files)
- **Agent**: `brand-site-builder` (Opus 4.6) — dedicated agent, Dev Agent stays untouched for main site
- **Tech**: Astro + React + Tailwind CSS v4, dark-only, Inter Variable font
- **Build order**: 8 batches, each requires user approval before proceeding

**Why:** AIOX demonstrated that a small agency can build documentation rivaling enterprise design systems. Reis IA wants the same level of quality as its single source of truth.

**How to apply:** All brand site work goes through the brand-site-builder agent. Never use the Dev Agent for this project. Phase A extraction is complete and approved. Currently starting Batch 2 (project scaffold).
