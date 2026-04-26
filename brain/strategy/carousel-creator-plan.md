# Carousel Creator — Implementation Plan

Last updated: 2026-04-24

> **Owner**: orchestrator
> **Status**: Plan — awaiting approval
> **Consumed by**: dev-agent, carousel-designer-writer, designer-agent, integration-engineer

---

## Executive Summary

This plan designs a **100% local, agent-integrated carousel rendering engine** for REIS [IA]. The tool takes the structured output already produced by `carousel-designer-writer` (slide copy + visual brief) and renders production-ready PNG files at exact Instagram dimensions — no Canva, no SaaS, no subscriptions.

**Core approach**: HTML/CSS templates rendered via Playwright (already in our stack) to pixel-perfect PNG screenshots. Templates are pre-built with our design system tokens. The carousel-designer-writer's structured output is parsed into a JSON contract that the renderer consumes. Total cost: $0/month.

---

## 1. Research Findings

### 1A. What's Working on Instagram (2025-2026)

| Metric | Finding | Source |
|--------|---------|--------|
| Engagement rate | Carousels average 1.92% vs 0.50% Reels, 0.45% static | Metricool 2026 |
| Sweet spot | 8-10 slides for educational, 12-20 for deep guides | Multiple sources |
| Best aspect ratio | **4:5 (1080x1350)** — more screen real estate than 1:1 | Industry consensus |
| Mixed media bonus | Image+video carousels get 2.33% engagement (only 7% of creators use this) | Hootsuite 2026 |
| Algorithm advantage | Instagram re-shows carousel slide 2 to non-swipers — double exposure | TrueFuture Media |
| Cover rule | Under 8-10 words, must answer "Is this for me?" + "What do I get if I swipe?" | Multiple sources |

**Key takeaway**: Our `carousel-designer-writer` already follows the 10-slide anatomy (cover, addiction, development, payoff, CTA) which aligns perfectly with the 8-10 slide sweet spot. The 4:5 format should be the default.

### 1B. Technology Landscape

| Approach | Pros | Cons | Verdict |
|----------|------|------|---------|
| **Playwright screenshots** | Already in our stack (MCP), full CSS support, element screenshots, multiple formats | ~150MB binary (already installed) | **RECOMMENDED** |
| Puppeteer screenshots | Most popular for this use case (Open Carrusel uses it) | Redundant — we already have Playwright | Skip |
| Satori + resvg-js | No browser binary, fast, JSX templates | Limited CSS support (no tables, limited flexbox, no advanced selectors) | Not suitable for premium templates |
| node-html-to-image | Simple API, Handlebars templating | Uses Puppeteer under the hood anyway | Redundant |
| Sharp only | Fast image manipulation | No HTML rendering — only image processing | Use as post-processor |
| Canvas (node-canvas) | Low-level control | Painful for layout, no CSS | Skip |

**Decision**: Playwright (already installed) + Sharp (post-processing for optimization) + HTML/CSS templates with Inter font and our design tokens.

### 1C. Open Source Reference Projects

| Project | Approach | What We Learn |
|---------|----------|---------------|
| [Open Carrusel](https://github.com/Hainrixz/open-carrusel) | Next.js + Puppeteer + Claude chat | Validated that HTML→screenshot is the right approach. Their 3 aspect ratios (1:1, 4:5, 9:16) are worth supporting. |
| [VDraw AI Carousel](https://github.com/VDraw/ai-carousel-post-generator) | AI content → carousel in 30s | Validated AI-generated content pipeline. Our carousel-designer-writer already does this better with Hormozi framework. |
| [Carousel Generator](https://github.com/FranciscoMoretti/carousel-generator) | LinkedIn carousels, open source | Good reference for PDF export (LinkedIn native carousels). Worth adding as Phase 2. |
| [Carousel Forge PRD](https://github.com/Vibe-Marketer/claude-code-resources/blob/main/carousel-forge-prd-v3-final.md) | Claude Code skill-based approach | Validates the MCP/skill pattern for carousel creation. |

### 1D. Our Competitive Advantage

We already have what most carousel tools lack:

1. **Copy engine** — `carousel-designer-writer` produces slide-by-slide copy with Hormozi framework, voice profiles, and brand compliance
2. **Design system** — complete token system (colors, typography, surfaces, spacing) documented and battle-tested
3. **Quality pipeline** — humanizer → reviewer → CMO sign-off ensures every carousel meets quality bar
4. **Playwright** — already installed via MCP, no new dependencies
5. **Brand compliance** — automated through templates, not manual checking

What we're missing is only the **last mile**: rendering the structured brief into actual image files.

---

## 2. Recommended Architecture

### 2A. High-Level Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    AGENT PIPELINE                            │
│                                                             │
│  cmo-strategist (brief)                                     │
│       → social-media-director (routes)                      │
│           → hook-specialist (10+ hooks)                     │
│               → carousel-designer-writer                    │
│                   ├── slide copy (markdown)                  │
│                   └── visual brief (markdown)                │
│                       → humanizer → reviewer                │
│                           → APPROVED CAROUSEL SPEC          │
└────────────────────────────┬────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                  CAROUSEL RENDERER                           │
│                                                             │
│  1. Parser reads approved spec → JSON contract              │
│  2. Template engine selects template + injects data         │
│  3. Playwright renders each slide → PNG                     │
│  4. Sharp optimizes (compression, metadata strip)           │
│  5. Output: 10 PNG files + metadata.json                    │
└─────────────────────────────────────────────────────────────┘
```

### 2B. Component Architecture

```
scripts/carousel-engine/
├── README.md                    # Setup + usage docs
├── package.json                 # Dependencies: playwright, sharp, handlebars
├── tsconfig.json                # TypeScript config
│
├── src/
│   ├── index.ts                 # CLI entry point
│   ├── parser.ts                # Parses carousel-designer-writer markdown → JSON
│   ├── renderer.ts              # Playwright screenshot orchestrator
│   ├── optimizer.ts             # Sharp post-processing (compression, format)
│   ├── template-engine.ts       # Loads template + injects slide data
│   └── types.ts                 # TypeScript interfaces for slide data
│
├── templates/
│   ├── _base/                   # Shared assets for all templates
│   │   ├── fonts/               # Inter font files (woff2)
│   │   ├── base.css             # Design system tokens as CSS custom properties
│   │   └── reset.css            # Minimal reset
│   │
│   ├── educational/             # Template: educational carousel
│   │   ├── template.html        # Handlebars HTML template
│   │   ├── style.css            # Template-specific styles
│   │   ├── preview.png          # Visual preview of the template
│   │   └── config.json          # Template metadata + supported layouts
│   │
│   ├── storytelling/            # Template: narrative carousel
│   │   └── [same structure]
│   │
│   ├── data-driven/             # Template: stats/metrics carousel
│   │   └── [same structure]
│   │
│   ├── quote/                   # Template: quote/wisdom carousel
│   │   └── [same structure]
│   │
│   ├── case-study/              # Template: before/after, results
│   │   └── [same structure]
│   │
│   └── minimal/                 # Template: ultra-clean, text-only
│       └── [same structure]
│
├── output/                      # Generated carousels (gitignored)
│   └── [carousel-name-YYYY-MM-DD]/
│       ├── slide-01-cover.png
│       ├── slide-02.png
│       ├── ...
│       ├── slide-10-cta.png
│       └── metadata.json
│
└── examples/                    # Example inputs for testing
    ├── sample-carousel-spec.md  # Sample carousel-designer-writer output
    └── sample-contract.json     # Parsed JSON contract
```

### 2C. The JSON Contract (Bridge Between Agent and Renderer)

The parser converts the carousel-designer-writer's markdown output into a typed JSON contract:

```typescript
interface CarouselContract {
  meta: {
    topic: string;
    date: string;
    platform: "instagram" | "linkedin" | "both";
    aspectRatio: "4:5" | "1:1" | "9:16";  // default: "4:5"
    dimensions: { width: number; height: number };
    template: string;  // template directory name
    voiceProfile: string;
    subBrandTint: string;  // hex color
  };
  slides: SlideData[];
  designerHandoff: {
    typographyScale: TypographyScale;
    colorTokenMap: ColorTokenMap;
    iconInventory: string[];
    spacingRules: SpacingRules;
  };
  caption: {
    text: string;
    firstComment?: string;
    hashtags: string[];
  };
}

interface SlideData {
  number: number;
  role: "cover" | "addiction" | "development" | "payoff" | "cta";
  title: string;
  body?: string;
  layout: "center" | "left-aligned" | "top-aligned" | "full-bleed" | "split";
  typography: "display" | "headline" | "body";
  background: "L0" | "L1" | "L2" | "L3" | "L4";
  accentUsage?: string;
  visualElement?: "geometric-shape" | "icon" | "number" | "quote-mark" | "divider" | "none";
  contrastNote?: string;  // how this differs from previous slide
}
```

### 2D. Template System Design

Each template is a self-contained HTML page that receives slide data through Handlebars injection. The template system works at two levels:

**Level 1 — Base Design System** (`_base/`):
- CSS custom properties matching `reis-ia-design-system.md` exactly
- Inter font loaded locally (no Google Fonts dependency)
- Surface levels, spacing tokens, typography scale
- Shared utilities (text truncation, accent highlighting, safe zones)

**Level 2 — Template Variants** (each directory):
- `template.html` — Handlebars template with slide layout logic
- `style.css` — template-specific layout, decorative elements, slide transitions
- `config.json` — declares which layouts the template supports, default background levels, visual element options

Example `config.json`:
```json
{
  "name": "educational",
  "displayName": "Educational",
  "description": "Clean knowledge transfer with numbered slides, bold headers, and progressive revelation",
  "supportedLayouts": ["center", "left-aligned", "top-aligned"],
  "defaultBackground": "L1",
  "supportedVisualElements": ["number", "icon", "divider", "none"],
  "slideVariants": {
    "cover": "bold-centered",
    "addiction": "reframe-left",
    "development": "alternating",
    "payoff": "centered-impact",
    "cta": "brand-cta"
  }
}
```

Example `template.html` (simplified):
```handlebars
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="../_base/reset.css">
  <link rel="stylesheet" href="../_base/base.css">
  <link rel="stylesheet" href="./style.css">
</head>
<body class="slide slide--{{role}}" data-bg="{{background}}">
  <div class="slide__safe-zone">
    {{#if visualElement}}
    <div class="slide__visual slide__visual--{{visualElement}}">
      {{#if (eq visualElement "number")}}
        <span class="slide__number">{{number}}</span>
      {{/if}}
    </div>
    {{/if}}

    <div class="slide__content slide__content--{{layout}}">
      <h1 class="slide__title slide__title--{{typography}}">
        {{{highlightAccent title}}}
      </h1>
      {{#if body}}
      <p class="slide__body">{{{highlightAccent body}}}</p>
      {{/if}}
    </div>

    {{#if (eq role "cta")}}
    <div class="slide__cta">
      <div class="slide__cta-button">{{ctaText}}</div>
    </div>
    {{/if}}

    <div class="slide__brand">
      <span class="brand__reis">REIS</span>
      <span class="brand__ia">[IA]</span>
    </div>
  </div>
</body>
</html>
```

### 2E. The 6 Initial Templates

| Template | Use Case | Visual Character | Cover Style |
|----------|----------|-----------------|-------------|
| **educational** | Teaching frameworks, step-by-step, how-to | Numbered slides, bold headers, clean progression | Large number + contrarian claim |
| **storytelling** | Narratives, case studies, transformation arcs | Full-bleed text, dramatic typography, minimal decoration | Bold question or provocative statement |
| **data-driven** | Stats, metrics, comparisons, ROI proof | Large numbers, comparison layouts, accent-highlighted data | Single shocking stat |
| **quote** | Thought leadership, Moroni insights, wisdom | Centered quote marks, elegant spacing, editorial feel | Quote with attribution |
| **case-study** | Before/after, client results, proof | Split layouts, metric callouts, transformation visual | "Before" state → curiosity about "After" |
| **minimal** | Ultra-clean, text-only, statement pieces | Maximum whitespace, single idea per slide, pure typography | Single word or short phrase |

---

## 3. Integration with Agent Pipeline

### 3A. Current Flow (No Change Needed)

The existing `carousel-designer-writer` already produces output in a structured format with:
- Slide-by-slide copy (title + body)
- Visual brief per slide (layout, typography, background, accent, visual element)
- Designer handoff block (typography scale, color tokens, spacing)

This is the input. No changes to the agent are needed — only a parser that reads this format.

### 3B. New Step: Render

After the carousel spec passes through humanizer → reviewer → approval:

1. **Parser** (`parser.ts`) reads the approved markdown file from `brain/assets/copy/carousels/`
2. **Parser** outputs a `CarouselContract` JSON
3. **Template engine** (`template-engine.ts`) selects the template based on contract metadata (or defaults to `educational`)
4. **Renderer** (`renderer.ts`) launches Playwright, loads each slide's HTML, screenshots at target dimensions
5. **Optimizer** (`optimizer.ts`) runs Sharp to compress PNGs (typically 60-70% size reduction with no visible quality loss)
6. **Output** lands in `scripts/carousel-engine/output/[name-date]/`

### 3C. CLI Interface

```bash
# Render a carousel from an approved spec
npx tsx scripts/carousel-engine/src/index.ts render \
  --input brain/assets/copy/carousels/prototype-graveyard-2026-04-24.md \
  --template educational \
  --format 4:5

# Render with auto-detected template (from spec metadata)
npx tsx scripts/carousel-engine/src/index.ts render \
  --input brain/assets/copy/carousels/prototype-graveyard-2026-04-24.md

# List available templates
npx tsx scripts/carousel-engine/src/index.ts templates

# Preview a single slide (for iteration)
npx tsx scripts/carousel-engine/src/index.ts preview \
  --input brain/assets/copy/carousels/prototype-graveyard-2026-04-24.md \
  --slide 1
```

### 3D. Agent Integration (Future Enhancement)

The `carousel-designer-writer` agent definition could be updated to include a post-render step:

```
carousel-designer-writer (copy + visual brief)
  → humanizer → reviewer → approval
    → carousel-engine CLI (renders PNGs)
      → social-media-director (reviews rendered output)
        → publish
```

The integration-engineer would wire this so that after a carousel spec is approved, the render is triggered automatically.

---

## 4. Design System Token Mapping

The `_base/base.css` file maps directly from `reis-ia-design-system.md`:

```css
:root {
  /* Colors */
  --color-black: #000000;
  --color-white: #FFFFFF;
  --color-accent: #4A90FF;
  --color-accent-hover: #6AADFF;
  --color-accent-muted: #3570CC;
  --color-accent-bright: #8DC4FF;

  /* Surfaces */
  --surface-l0: #000000;
  --surface-l1: #0A0A0A;
  --surface-l2: #111113;
  --surface-l3: #1A1A1A;
  --surface-l4: #242427;

  /* Typography — Inter */
  --font-family: 'Inter', -apple-system, sans-serif;
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* Typography Scale (for 1080x1350 canvas) */
  --text-display: 72px;     /* Cover slide titles */
  --text-headline: 48px;    /* Section headers */
  --text-title: 36px;       /* Slide titles */
  --text-body: 28px;        /* Body text */
  --text-caption: 22px;     /* Small text, attributions */
  --text-brand: 18px;       /* REIS [IA] watermark */

  /* Spacing (proportional to 1080px canvas) */
  --space-xs: 16px;
  --space-sm: 24px;
  --space-md: 40px;
  --space-lg: 64px;
  --space-xl: 96px;
  --space-2xl: 128px;

  /* Safe Zone — Instagram crops ~5% on edges in feed view */
  --safe-zone-top: 80px;
  --safe-zone-bottom: 80px;
  --safe-zone-left: 60px;
  --safe-zone-right: 60px;

  /* Brand mark */
  --brand-reis-color: var(--color-white);
  --brand-ia-color: var(--color-accent);
  --brand-weight: 300;
}
```

---

## 5. Implementation Phases

### Phase 1 — MVP (Estimated: 1-2 sessions)

**Goal**: Render a 10-slide carousel from a spec file to 10 PNG files.

**Deliverables**:
- `parser.ts` — reads carousel-designer-writer markdown, outputs JSON contract
- `renderer.ts` — Playwright screenshot orchestrator
- `optimizer.ts` — Sharp compression
- `template-engine.ts` — Handlebars template loading + data injection
- `_base/` — design system CSS + Inter font files
- 3 templates: `educational`, `storytelling`, `minimal`
- CLI entry point with `render` and `templates` commands
- 1 example spec + rendered output for validation

**Dependencies**: playwright (already installed), sharp, handlebars, tsx

**Success criteria**:
- Given a sample carousel-designer-writer output, produces 10 PNG files at 1080x1350
- Files look brand-compliant (dark mode, Inter, #4A90FF accent, no emojis/gradients)
- Total render time under 15 seconds for 10 slides
- Each PNG under 500KB after optimization

### Phase 2 — Template Expansion (Estimated: 1 session)

**Goal**: Full template library + format support.

**Deliverables**:
- 3 additional templates: `data-driven`, `quote`, `case-study`
- Support for 1:1 (1080x1080) and 9:16 (1080x1920) aspect ratios
- `preview` CLI command (render single slide for iteration)
- Sub-brand tint support (Builders, Systems, Marketing, Moroni palettes)
- Template preview gallery (simple HTML page showing all templates)

**Success criteria**:
- All 6 templates render correctly in all 3 aspect ratios
- Sub-brand tints apply correctly per carousel spec

### Phase 3 — Pipeline Automation (Estimated: 1 session)

**Goal**: Seamless agent-to-render pipeline.

**Deliverables**:
- Update `carousel-designer-writer` agent to include `template` field in output format
- File watcher or explicit trigger from social-media-director
- Output folder auto-named with topic + date
- `metadata.json` in each output folder (slide count, dimensions, template used, caption text)
- Optional: LinkedIn PDF export (slides compiled into single PDF for LinkedIn native carousels)

**Success criteria**:
- End-to-end from "Moroni asks for a carousel" to "10 PNG files ready" without manual steps beyond the copy approval gate

---

## 6. Example End-to-End Workflow

### Input: "Moroni asks for a carousel about Prototype Graveyard"

**Step 1 — Agent Pipeline** (existing, no changes):
```
Moroni: "Monta um carrossel sobre o Prototype Graveyard"
  → cmo-strategist creates brief
    → social-media-director routes to carousel pipeline
      → hook-specialist generates 10+ cover hook options
        → carousel-designer-writer produces:
          brain/assets/copy/carousels/prototype-graveyard-2026-04-24.md
            → humanizer polishes PT-BR voice
              → reviewer approves (PASS)
```

**Step 2 — Render** (new):
```bash
npx tsx scripts/carousel-engine/src/index.ts render \
  --input brain/assets/copy/carousels/prototype-graveyard-2026-04-24.md \
  --template educational \
  --format 4:5
```

**Step 3 — Output**:
```
scripts/carousel-engine/output/prototype-graveyard-2026-04-24/
├── slide-01-cover.png      (1080x1350, ~180KB)
├── slide-02-addiction.png   (1080x1350, ~120KB)
├── slide-03.png             (1080x1350, ~150KB)
├── slide-04.png             (1080x1350, ~140KB)
├── slide-05.png             (1080x1350, ~160KB)
├── slide-06.png             (1080x1350, ~130KB)
├── slide-07.png             (1080x1350, ~145KB)
├── slide-08.png             (1080x1350, ~135KB)
├── slide-09-payoff.png      (1080x1350, ~155KB)
├── slide-10-cta.png         (1080x1350, ~110KB)
└── metadata.json
```

**Step 4 — Moroni posts**: Drag 10 PNGs into Instagram, paste caption from metadata.json. Done.

---

## 7. Technical Decisions & Rationale

| Decision | Choice | Why |
|----------|--------|-----|
| Renderer | **Playwright** (not Puppeteer) | Already in our MCP stack. Same capability. Zero new binary downloads. |
| Template language | **Handlebars** | Simple, logic-light, well-suited for template injection. No JSX complexity needed. |
| Post-processing | **Sharp** | Industry standard for Node.js image optimization. Minimal dependency. |
| Language | **TypeScript** | Matches our dev-agent stack. Type safety for the JSON contract. |
| Font loading | **Local woff2 files** | No network dependency. Consistent rendering. Inter Variable for all weights. |
| Template format | **HTML/CSS** | Full design control. Any designer can edit templates. No proprietary format. |
| Aspect ratio | **4:5 default** | Instagram best practice. 1:1 and 9:16 as options. |
| Output format | **PNG** | Lossless, best for text-heavy content. JPEG option for photo-heavy carousels. |

---

## 8. Dependencies

### New (to install)

| Package | Purpose | Size |
|---------|---------|------|
| `sharp` | Image optimization/compression | ~25MB (native binary) |
| `handlebars` | HTML template engine | ~200KB |
| `tsx` | TypeScript execution (likely already present) | ~2MB |

### Already Available

| Package | Purpose | Status |
|---------|---------|--------|
| `playwright` | HTML→screenshot rendering | Installed via MCP |
| `typescript` | Type safety | In dev-agent workflow |

**Total new dependency footprint**: ~27MB. No new browser binaries needed.

---

## 9. What This Does NOT Do (Scope Boundaries)

- **Does not replace the carousel-designer-writer agent** — that agent still writes the copy and visual brief. This tool only renders the output.
- **Does not auto-post to Instagram** — output is PNG files. Posting is manual (or a future Phase 4 with Instagram API).
- **Does not generate copy** — all text comes from the approved carousel spec.
- **Does not include animations/video** — static slides only. Animated carousels (Reels-style) would be a separate tool.
- **Does not require internet** — everything runs locally with locally-hosted fonts and templates.

---

## 10. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Playwright rendering differs from design intent | Preview command for single-slide iteration. Template preview gallery for visual QA. |
| Font rendering inconsistency | Self-hosted Inter woff2 with explicit font-display: block. No Google Fonts dependency. |
| Parser breaks on non-standard carousel specs | Strict TypeScript types. Example specs as test fixtures. Fallback defaults for missing fields. |
| Template maintenance burden | Base design system CSS shared across all templates. Template changes are CSS-only. |
| Instagram changes aspect ratios | Aspect ratio is a parameter, not hardcoded. Easy to add new formats. |

---

## 11. Success Metrics

- **Render time**: Under 15 seconds for 10 slides (targeting ~1.5s per slide)
- **File size**: Each PNG under 500KB after Sharp optimization
- **Brand compliance**: 100% design system token usage — no magic numbers in templates
- **Pipeline integration**: Zero manual design work between approved spec and rendered output
- **Template quality**: Passes visual-qa-agent review at APPROVE level

---

## CHANGELOG

- [2026-04-24] — Initial plan created based on research and stack analysis
