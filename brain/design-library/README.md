# Design Library — REIS [IA]

Last updated: 2026-04-14

## Purpose

A persistent, versioned library of premium design knowledge. Three kinds of assets live here:

1. **References** — Raw source code harvested from premium sites (HTML, CSS, JS, assets) that we want to learn from.
2. **Patterns** — Reusable, documented techniques distilled from references (GSAP ScrollTrigger recipes, Three.js scenes, editorial motion, etc.).
3. **Hero prompts** — Cinematic image prompts for Gemini / Flux / Midjourney that maintain the REIS [IA] DNA.

This is the antidote to "reinventing premium from scratch every time." Every time we extract or build something good, it lives here for the next project.

## Folder Structure

```
brain/design-library/
  README.md                      # this file
  references/                    # raw harvested source (design-system-extractor writes here)
    _template/                   # scaffold every new reference must follow
    {site-name}/                 # one folder per analyzed site
  patterns/                      # distilled reusable patterns
    SEED.md                      # starter catalog (10+ curated patterns)
    gsap-scroll-trigger/
    three-js/
    lenis-smooth-scroll/
    editorial/
  hero-prompts/                  # cinematic image prompts
    README.md                    # REIS [IA] prompt skeleton
    examples/                    # example prompts per category
  iterations/                    # Tadewald-style exploration workspace
    README.md                    # rules for design_system_N.html drafts
```

## Who Writes Where

| Path | Writer agent | Reader agents |
|------|--------------|---------------|
| `references/` | design-system-extractor | cinematic-art-director, creative-director, vfx-motion-designer, designer-agent |
| `patterns/` | design-system-extractor (distills), vfx-motion-designer (validates), cinematic-art-director (curates) | all design agents, dev-agent |
| `hero-prompts/` | cinematic-art-director | designer-agent, dev-agent, moroni (manual generation) |
| `iterations/` | designer-agent, vfx-motion-designer (exploration only) | orchestrator (promotes to production) |

## The Golden Rule

**Always version raw references AND always distill reusable patterns after extracting.**

Raw source (in `references/`) is the permanent archive — never edit, never cherry-pick.
Patterns (in `patterns/`) are the workable knowledge — documented, commented, and safe to copy into production.

If you extract a reference and do not distill at least one pattern from it, the extraction is incomplete.

## How Agents Consume the Library

- **vfx-motion-designer** (MANDATORY): before implementing any motion, check `patterns/` for a matching recipe and `references/` for a similar working implementation. Only invent from scratch if nothing exists.
- **cinematic-art-director**: pulls from `references/` and `hero-prompts/examples/` when composing cinematic briefs. Contributes new examples after each brief.
- **designer-agent**: consults `patterns/` when specifying components. Uses `iterations/` as a sandbox to try design system directions before consolidating.
- **dev-agent**: receives specific pattern file references from upstream agents. Never browses the library independently.

## Stack of Reference

The patterns here are opinionated toward the tools that produce Apple/Porsche/Stripe-level results:

- **GSAP 3 + ScrollTrigger + SplitText** — scroll-scrubbed motion, pinned sections, editorial reveals
- **Three.js + React Three Fiber + Drei** — 3D product spins, hero scenes
- **Lenis** — smooth scroll foundation (mandatory base for premium feel)
- **Framer Motion** — React-idiomatic page transitions and layout animations
- **CSS** — transforms, backdrop-filter, mix-blend-mode, clip-path, @property
- **Canvas 2D / WebGL shaders** — custom particles, noise grain, gradient meshes

OSS-first: nothing here requires a paid API. When an example uses a generation service (Gemini/Flux), the prompt is the deliverable — actual generation happens manually or via future integration.

## PROHIBITED in the Library

- Gold, amber, terracotta color references
- Chess/crown/knight motifs
- SaaS pricing patterns (tier cards, monthly/annual toggles)
- Light-mode-first references (accept dark-mode variants only)
- Azure Whisper / Blue Shimmer Text effects
- Stock-photo cliché hero images

## Changelog

- 2026-04-14 — Library initialized. SEED patterns, hero prompt skeleton, reference template scaffolded.
