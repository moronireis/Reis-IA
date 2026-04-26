# ZNITH Design System — Strategic Brand Addendum

**Version:** 1.0
**Last updated:** April 2026
**Extends:** `znith-design-system.md` v2.0
**Sources:** Company Brand Concept v1.0, Product Brand Concepts v1.0, Movement Brand Concept v1.0, Personal Brand Concept v1.0

> This addendum contains ONLY the design decisions derived from the Phase 1-4 brand strategy work that are NOT already covered in the base design system. Reference the base system for all foundational tokens (colors, typography, spacing, components, etc.).

---

## Table of Contents

1. [Brand Architecture Visual Rules](#1-brand-architecture-visual-rules)
2. [Product-Specific Design Tokens](#2-product-specific-design-tokens)
3. [Movement-Specific Design Tokens](#3-movement-specific-design-tokens)
4. [Personal Brand Visual Layer](#4-personal-brand-visual-layer)
5. [Touchpoint-Specific Design Rules](#5-touchpoint-specific-design-rules)
6. [Data Visualization for Commercial Context](#6-data-visualization-for-commercial-context)
7. [Updated CSS Custom Properties](#7-updated-css-custom-properties)

---

## 1. Brand Architecture Visual Rules

### 1.1 Master Brand vs Sub-brand Visual Hierarchy

ZNITH operates as an **endorsed brand architecture**. The master brand carries institutional weight; sub-brands serve distinct audiences with distinct functions. The visual system enforces this hierarchy.

**Rule: The master brand is always visually dominant when multiple brands coexist.**

| Scenario | Master Brand Size | Sub-brand Size | Relationship |
|---|---|---|---|
| Website hero | Display (clamp 48-96px) | H3 (clamp 22-36px) | Stacked vertically, 16px gap |
| Proposal header | 28px Cinzel | 16px Montserrat | Horizontal, separated by `|` in gold |
| Slide title | 36px Cinzel | 14px Montserrat overline above | Sub-brand as overline label |
| Email header | 24px | 13px | Stacked, sub-brand in muted gold |
| Social media | Full logo | Descriptor only (no mark) | Sub-brand described, not branded visually |

### 1.2 When to Use Each Brand Configuration

| Configuration | Visual Treatment | Use When |
|---|---|---|
| **ZNITH** (standalone) | Cinzel, weight 300, white. Lion mark optional. | Homepage, institutional content, press, general brand introduction |
| **ZNITH.AI** | Cinzel, weight 300. "ZNITH" white, ".AI" in Tech Blue `#4A78C8`. | Technology-layer content, AI product pages, tech demos |
| **ZNITH Consulting** | Cinzel, weight 300, full white. | Strategic advisory content, proposals, consulting-specific pages |
| **ZNITH.AI OS** | Cinzel, weight 300. "ZNITH.AI" per above, "OS" in Gold `#DF9F3E`. | Flagship product pages, OS-specific proposals and case studies |
| **Lideres Leoes** | Montserrat, weight 700, uppercase. Bright gold `#FFD161`. | Movement content, community pages, event materials |

### 1.3 Endorsement Patterns

Sub-brands reference the master brand through specific endorsement lines. These are never ad-hoc.

| Sub-brand | Endorsement Line | Typography | Color | Placement |
|---|---|---|---|---|
| ZNITH.AI | *Extension* — no endorsement needed | N/A | N/A | Name carries ZNITH inherently |
| ZNITH Consulting | *Extension* — no endorsement needed | N/A | N/A | Name carries ZNITH inherently |
| ZNITH.AI OS | *Extension* — no endorsement needed | N/A | N/A | Double-endorsed via ZNITH.AI |
| Lideres Leoes | "Uma iniciativa ZNITH" | Montserrat 12px, weight 400, 0.06em tracking | `#7A7A7A` | Below movement name, 12px gap |
| Leilaine Campioto | "Fundadora & CEO da ZNITH" | Montserrat 13px, weight 400 | `#999999` | In bio/author context only |

**Cross-reference prohibition:** Sub-brands NEVER reference each other directly. ZNITH.AI does not mention Lideres Leoes. All cross-references route through the master brand.

### 1.4 Logo Lockup Rules per Sub-brand

#### ZNITH.AI Lockup

```
Layout:          Horizontal
Mark:            ZNITH reduced Z-mark (left)
Wordmark:        "ZNITH.AI" — Cinzel weight 300
                 "ZNITH" in #FFFFFF, ".AI" in #4A78C8
Separator:       None
Descriptor:      "Inteligencia Comercial" — Montserrat 12px, #7A7A7A, uppercase, 0.10em tracking
                 Positioned below wordmark, left-aligned, 6px gap
```

#### ZNITH Consulting Lockup

```
Layout:          Horizontal
Mark:            ZNITH reduced Z-mark (left) or full lion (stacked variant)
Wordmark:        "ZNITH CONSULTING" — Cinzel weight 300, #FFFFFF
Separator:       1px gold line (#DF9F3E at 50% opacity), 80px wide, 8px below wordmark
Descriptor:      "Expansao Comercial com IA" — Montserrat 12px, #7A7A7A, uppercase, 0.10em tracking
                 Positioned below separator
```

#### ZNITH.AI OS Lockup

```
Layout:          Horizontal or stacked (both valid)
Mark:            ZNITH reduced Z-mark (left)
Wordmark:        "ZNITH.AI OS" — Cinzel weight 300
                 "ZNITH.AI" per ZNITH.AI rules, "OS" in #DF9F3E
Separator:       1px gold line, 80px wide
Descriptor:      "Arquitetura Comercial Inteligente" — Montserrat 12px, #7A7A7A, uppercase, 0.10em tracking
                 Positioned below separator
```

#### Lideres Leoes Lockup

```
Layout:          Stacked (always vertical)
Mark:            Lion symbol (distinct from ZNITH corporate lion — see Section 3)
Name:            "LIDERES LEOES" — Montserrat weight 700, uppercase, #FFD161, 0.08em tracking
Separator:       2px gold line, 60px wide, centered, 12px gap above and below
Slogan:          "Coragem para governar. Consciencia para permanecer." — Montserrat 12px, weight 400, #BBBBBB, italic
Endorsement:     "Uma iniciativa ZNITH" — Montserrat 10px, #7A7A7A, 24px below slogan
```

#### Leilaine Campioto Lockup

```
Layout:          Horizontal (editorial contexts)
Photo:           Optional — 48px circle avatar, border 2px #E8A847
Name:            "Leilaine Campioto" — Montserrat weight 500, #FFFFFF, 18px
Role:            "Fundadora & CEO da ZNITH" — Montserrat 13px, weight 400, #999999
                 Same line as name, separated by " — " (em dash with spaces)
```

---

## 2. Product-Specific Design Tokens

### 2.1 ZNITH.AI OS Phase System

The five phases of ZNITH.AI OS (LEITURA, PROJETO, OBRA, AJUSTE, GOVERNO) require specific visual treatments that are not covered in the base design system.

#### Phase Color Progression

Each phase uses an increasing intensity of the gold-to-blue gradient, representing progression from diagnosis (blue/analytical) to governance (gold/authority).

| Phase | Number | Name | Primary Color | Accent Color | Background Tint |
|---|---|---|---|---|---|
| 1 | LEITURA | The Reading | `#4A78C8` (Tech Blue Light) | `#DF9F3E` | `rgba(42, 80, 144, 0.06)` |
| 2 | PROJETO | The Design | `#3A6AB0` | `#DF9F3E` | `rgba(42, 80, 144, 0.08)` |
| 3 | OBRA | The Construction | `#8F7030` | `#4A78C8` | `rgba(143, 112, 48, 0.08)` |
| 4 | AJUSTE | The Calibration | `#C07A20` (Gold Deep) | `#4A78C8` | `rgba(192, 122, 32, 0.08)` |
| 5 | GOVERNO | The Governance | `#DF9F3E` (Gold 500) | `#4A78C8` | `rgba(223, 159, 62, 0.10)` |

```css
--znith-os-phase-1-primary: #4A78C8;
--znith-os-phase-1-tint:    rgba(42, 80, 144, 0.06);
--znith-os-phase-2-primary: #3A6AB0;
--znith-os-phase-2-tint:    rgba(42, 80, 144, 0.08);
--znith-os-phase-3-primary: #8F7030;
--znith-os-phase-3-tint:    rgba(143, 112, 48, 0.08);
--znith-os-phase-4-primary: #C07A20;
--znith-os-phase-4-tint:    rgba(192, 122, 32, 0.08);
--znith-os-phase-5-primary: #DF9F3E;
--znith-os-phase-5-tint:    rgba(223, 159, 62, 0.10);
```

#### Phase Typography Treatment

```
Phase number:    JetBrains Mono, 14px, weight 500, phase primary color, 0.10em tracking
                 Format: "FASE 01" / "FASE 02" etc.
Phase name:      Cinzel, 28-36px (H3 scale), weight 400, #FFFFFF
Phase tagline:   Montserrat, 14px, weight 400, italic, #BBBBBB
                 Displayed below phase name, 8px gap
```

**Phase taglines:**
- LEITURA: *"O que esta invisivel esta custando receita."*
- PROJETO: *"A arquitetura que transforma esforco em sistema."*
- OBRA: *"Onde a estrategia vira estrutura."*
- AJUSTE: *"O sistema responde. A operacao amadurece."*
- GOVERNO: *"De apagar incendio para governar crescimento."*

#### Phase Timeline Visualization

```
Layout:          Horizontal on desktop (5 nodes connected by line), vertical on mobile (stacked)
Container:       max-width 1000px, centered

Node (inactive):
  Shape:         Circle, 40px diameter
  Border:        2px solid #2A3A5A
  Background:    #091022
  Number:        Cinzel 16px, #7A7A7A
  Label:         Montserrat 12px, #7A7A7A, below node, 8px gap

Node (active):
  Border:        2px solid [phase primary color]
  Background:    [phase tint color]
  Number:        Cinzel 16px, [phase primary color]
  Label:         Montserrat 12px, #FFFFFF
  Glow:          0 0 16px [phase primary color at 0.30 opacity]

Node (completed):
  Background:    [phase primary color]
  Number:        Cinzel 16px, #000000
  Label:         Montserrat 12px, #FFFFFF
  Checkmark:     12px white stroke SVG replaces number

Connector line:
  Height:        2px (horizontal) / Width: 2px (vertical)
  Background:    #2A3A5A (incomplete), gradient from completed phase to active phase
  Length:         Spans gap between nodes evenly
```

#### Phase Card Component

```
Background:      [phase tint color] on #14203A base
Border:          1px solid #2A3A5A
Border-left:     3px solid [phase primary color]
Border-radius:   12px
Padding:         28px 24px 28px 28px

Structure:
  [Phase badge — Cinzel 12px, phase primary color, bg phase tint, rounded 8px, padding 4px 10px]
  [Phase name — Cinzel 22px, #FFFFFF, margin-top 12px]
  [Phase tagline — Montserrat 13px, italic, #BBBBBB, margin-top 6px]
  [Description — Montserrat 15px, #BBBBBB, margin-top 16px, line-height 1.6]
  [Deliverables — list, Montserrat 14px, #BBBBBB, gold check icons, margin-top 20px]

Hover:
  Border-left:   3px solid [phase primary color at full]
  Box-shadow:    0 0 24px [phase primary color at 0.12 opacity]
```

### 2.2 Product Category Visual Distinctions

Each product category uses a distinct secondary accent color layered on the navy + gold foundation.

| Category | Name | Secondary Accent | Token | Surface Tint | Usage |
|---|---|---|---|---|---|
| ARQUITETURA | Architecture | Tech Blue `#2A5090` | `--znith-cat-arquitetura` | `rgba(42, 80, 144, 0.06)` | ZNITH.AI OS, Consulting Expansao |
| ACOMPANHAMENTO | Accompaniment | Warm White `#F5F0E8` | `--znith-cat-acompanhamento` | `rgba(245, 240, 232, 0.04)` | Consulting Receita / RCaaS |
| INTELIGENCIA | Intelligence | Electric Cyan `#00B4D8` | `--znith-cat-inteligencia` | `rgba(0, 180, 216, 0.06)` | ZNITH.AI Agente |
| DESENVOLVIMENTO | Development | Deep Navy `#050B17` | `--znith-cat-desenvolvimento` | `rgba(5, 11, 23, 0.15)` | Mentorias, Formacao |

#### Category Label Component

```
Display:         inline-flex, align-items center
Background:      category surface tint
Border:          1px solid category accent at 20% opacity
Border-radius:   9999px (pill)
Padding:         4px 14px
Font:            Montserrat 11px, weight 600, uppercase, 0.08em tracking
Color:           category accent color (adjusted for contrast — see note)
```

**Contrast note for ACOMPANHAMENTO:** Warm White `#F5F0E8` is too light on dark backgrounds. Use `#C0B8A8` for the label text to maintain 4.5:1 contrast on navy surfaces.

**Contrast note for DESENVOLVIMENTO:** Deep Navy `#050B17` is invisible on dark backgrounds. Use `#8E9EBE` (Navy 200) for the label text.

### 2.3 Selo ZNITH (Completion Seal)

The Selo ZNITH is the completion credential granted at Phase 5. It is a badge/seal, not a certificate.

#### Selo Visual Specification

```
Shape:           Circle with double border
Outer ring:      88px diameter, 2px solid #DF9F3E
Inner ring:      80px diameter, 1px solid #DF9F3E at 50% opacity
Background:      #091022
Content:         Centered "Z" in Cinzel 28px, weight 700, #DF9F3E

Below circle:
  Line 1:        "SELO ZNITH" — Montserrat 10px, weight 600, uppercase, #DF9F3E, 0.12em tracking
  Line 2:        "Arquitetura Comercial Implantada" — Montserrat 9px, weight 400, #7A7A7A, 0.06em tracking

Size variants:
  Large:         88px (proposals, case studies, completion documents)
  Medium:        56px (website badges, LinkedIn displays)
  Small:         36px (inline references, document watermarks)
```

#### Selo Digital Badge (for client websites/LinkedIn)

```
Layout:          Horizontal
Structure:       [Selo circle (medium 56px)] + [Text stack, left-aligned, 12px gap from circle]
Text stack:
  Line 1:        "SELO ZNITH" — Montserrat 12px, weight 600, #DF9F3E, uppercase
  Line 2:        "Arquitetura Comercial Implantada" — Montserrat 11px, weight 400, #BBBBBB
  Line 3:        "OS-26-001" — JetBrains Mono 11px, weight 400, #7A7A7A (optional, client's project code)

Background:      #14203A
Border:          1px solid #2A3A5A
Border-radius:   12px
Padding:         16px 20px
```

### 2.4 Cohort Code Typography

The cohort code (OS-26-001 format) is used in internal references, case studies, and the Selo.

```
Font:            JetBrains Mono
Weight:          500
Size:            14px (inline reference), 12px (badge context), 11px (Selo context)
Color:           #7A7A7A (default), #DF9F3E (when featured/active)
Letter-spacing:  0.04em
```

### 2.5 Case Study Visual Template

The "De X para Y" naming convention requires a specific visual treatment.

#### Case Study Title Card

```
Background:      #14203A
Border:          1px solid #2A3A5A
Border-radius:   16px
Padding:         40px 36px
Max-width:       720px

Structure:
  [Overline — "CASO DE ESTUDO" — Montserrat 11px, weight 600, #DF9F3E, uppercase, 0.12em tracking]

  [Before metric — Cinzel 48px, weight 700, #7A7A7A (grayed, representing "before")]
  [Arrow or "para" — Montserrat 16px, weight 400, #7A7A7A, inline between metrics]
  [After metric — Cinzel 48px, weight 700, #DF9F3E (gold, representing "after")]

  [Context line — Montserrat 14px, weight 400, #BBBBBB, max-width 480px]
  Example: "Consultoria B2B de Tecnologia — 90 dias apos Fase 4"

  [Phase timeline — miniature version (see 2.1), 5 nodes, all completed, 32px node size]
```

**Example rendering:**
```
CASO DE ESTUDO

8%  para  23%
Conversao de Pipeline

Consultoria B2B de Tecnologia — 90 dias apos Fase 4
[●] [●] [●] [●] [●]
```

#### Case Study Section Structure

Each case study follows the five-section structure, visually marked by phase badges:

| Section | Badge Text | Badge Color | Content |
|---|---|---|---|
| 1 | LEITURA | `#4A78C8` | What was found — bottlenecks, revenue leaks |
| 2 | PROJETO | `#3A6AB0` | Architecture designed — structural decisions |
| 3 | OBRA | `#8F7030` | What was implemented — systems, tools, processes |
| 4 | RESULTADO | `#DF9F3E` | Before/after metrics, timeline |
| 5 | DEPOIMENTO | `#DF9F3E` | Direct quote from decision-maker |

### 2.6 Product Lockup Format

All products follow a standardized lockup format. This extends the base system's Cinzel wordmark rule.

```
Structure:
  [Product name — Cinzel, uppercase, weight 300, #FFFFFF (or per sub-brand rules)]
  [Separator — 1px line, #DF9F3E at 50% opacity, 60px wide, left-aligned, 8px gap above/below]
  [Descriptor — Montserrat 13px, weight 500, #BBBBBB, sentence case]

Product names and descriptors:
  ZNITH.AI OS               | Arquitetura Comercial Inteligente
  ZNITH.AI AGENTE            | Inteligencia Comercial Aplicada
  ZNITH CONSULTING EXPANSAO  | Diagnostico, Estruturacao e Aceleracao
  ZNITH CONSULTING RECEITA   | Acompanhamento Estrategico Continuo
  ZNITH MENTORIA ESTRATEGICA | Direcao, Lideranca e Posicionamento
  ZNITH FORMACAO             | Treinamentos, Workshops e Palestras
```

---

## 3. Movement-Specific Design Tokens

### 3.1 Lideres Leoes Visual Identity within ZNITH Ecosystem

Lideres Leoes has the most visually distinct identity within the ZNITH ecosystem. It is the ONLY context where gold is used boldly and dominantly.

**Key distinction from master brand:**
- Master brand lion: corporate mark, geometric, integrated into "Z" letterform for reduced mark, paired with crown, used as institutional symbol
- Movement lion: emotional mark, watchful posture, vigilant rest, standalone identity within movement context

#### Movement-Specific Background

```
Background:      #050B17 (deepest navy — --znith-lideres-base)
                 Darker than master brand #091022 to create visual separation
Section alt:     #0A1020 (slightly lighter than base, for section alternation)
```

```css
--znith-lideres-section-alt: #0A1020;
```

### 3.2 Lion Symbol Usage Rules — Movement vs Master Brand

| Attribute | Master Brand Lion | Movement Lion |
|---|---|---|
| Posture | Heraldic, formal, with crown | Vigilant rest — alert, grounded, watching |
| Style | Geometric, minimal, architectural | Geometric but with more organic weight |
| Color | White (inline), Gold #DF9F3E (featured) | Gold #FFD161 (bright, dominant) |
| Crown | Always present | Optional — when present, represents weight of responsibility, not glory |
| Usage | Logo system, watermarks, brand marks | Movement content, badges, seals, event materials |
| Opacity (watermark) | 3-5% | 5-8% (slightly more visible, movement energy) |
| Context | Corporate, proposals, website header | Community, events, manifesto, badges |

**Prohibition:** The movement lion NEVER appears in corporate/consulting contexts. The corporate lion NEVER appears in movement-specific content without the master brand also being present.

### 3.3 Crown Symbol in Movement Context

The crown in Lideres Leoes context represents the **weight of responsibility**, not the glory of position. This is a critical distinction from decorative crown usage.

```
Style:           Flat, monochrome, geometric
                 NOT ornate, NOT 3D, NOT the grafismo "3D Gold Crown" (which requires campaign approval)
Color:           #DF9F3E (gold) on dark backgrounds, #C07A20 (deep gold) for subtle contexts
Size:            20-32px for inline use, 48-80px for featured/decorative
Stroke:          1.5-2px (consistent with ZNITH icon system)
```

**Usage within movement:**
- Above the lion mark in formal lockup
- Within the Selo de Governo badge
- As a subtle decorative element in manifesto/quote sections
- NEVER as standalone — always in context of movement content

### 3.4 Commitment Level Badges

The five commitment levels (Observador through Lider) each require a badge for community identification.

#### Badge System

```
Shape:           Rounded square (border-radius 8px)
Size:            40px (default), 28px (compact/inline), 56px (featured)
Background:      varies by level (see table)
Border:          1.5px solid [level color]
Icon:            Centered, 20px (default size), stroke-based

Level colors and opacity progression:
```

| Level | Name | Background | Border | Icon Color | Icon Concept |
|---|---|---|---|---|---|
| 0 | Outsider | N/A — no badge | N/A | N/A | N/A |
| 1 | Observador | `rgba(122, 122, 122, 0.10)` | `#7A7A7A` | `#7A7A7A` | Eye (open, watching) |
| 2 | Participante | `rgba(42, 80, 144, 0.10)` | `#4A78C8` | `#4A78C8` | Shield outline |
| 3 | Membro | `rgba(223, 159, 62, 0.10)` | `#DF9F3E` | `#DF9F3E` | Lion face (simplified) |
| 4 | Selo de Governo | `rgba(255, 209, 97, 0.15)` | `#FFD161` | `#FFD161` | Crown + lion |
| 5 | Lider | `rgba(255, 209, 97, 0.20)` | `#FFD161` | `#FFD161` | Crown + lion + glow |

```css
--znith-lideres-level-1-color: #7A7A7A;
--znith-lideres-level-1-tint:  rgba(122, 122, 122, 0.10);
--znith-lideres-level-2-color: #4A78C8;
--znith-lideres-level-2-tint:  rgba(42, 80, 144, 0.10);
--znith-lideres-level-3-color: #DF9F3E;
--znith-lideres-level-3-tint:  rgba(223, 159, 62, 0.10);
--znith-lideres-level-4-color: #FFD161;
--znith-lideres-level-4-tint:  rgba(255, 209, 97, 0.15);
--znith-lideres-level-5-color: #FFD161;
--znith-lideres-level-5-tint:  rgba(255, 209, 97, 0.20);
```

#### Lider Badge Special Treatment

The highest-level badge (Lider) receives an ambient gold glow:

```
Box-shadow:      0 0 16px rgba(255, 209, 97, 0.25)
Animation:       znith-gold-pulse at 50% intensity (opacity 0.95-1.0 range)
                 Only when the badge is in a featured/profile context, not inline
```

### 3.5 Selo de Governo (Governance Seal)

Distinct from the Selo ZNITH (product completion credential). The Selo de Governo is the movement's recognition of sustained governance transformation.

```
Shape:           Circle
Diameter:        96px (large), 64px (medium), 40px (small)
Outer ring:      2px solid #FFD161
Inner ring:      1px solid #FFD161 at 40% opacity
Background:      #050B17 (movement base, not corporate navy)

Content:
  Lion face:     Centered, 40px (large), geometric, #FFD161
  Crown:         Above lion, 16px, #DF9F3E

Below circle:
  "SELO DE GOVERNO" — Montserrat 10px, weight 600, #FFD161, uppercase, 0.12em tracking
  "Lideres Leoes" — Montserrat 9px, weight 400, #BBBBBB
```

### 3.6 Movement Slogan Typography Treatment

**"Coragem para governar. Consciencia para permanecer."**

This slogan has specific typography rules for its various uses:

```
Hero / Feature:
  Font:          Cinzel
  Size:          clamp(22px, 3vw, 36px)
  Weight:        400
  Color:         #FFFFFF
  Style:         italic
  Line-height:   1.5
  Letter-spacing: -0.01em
  Max-width:     680px
  Text-align:    center
  Margin:        0 auto
  Border-left:   none (centered treatment overrides quote style)

Signature / Footer:
  Font:          Montserrat
  Size:          13px
  Weight:        400
  Color:         #DF9F3E
  Style:         italic
  Letter-spacing: 0.04em

Inline / Badge:
  Font:          Montserrat
  Size:          10-11px
  Weight:        400
  Color:         #BBBBBB
  Style:         italic
```

### 3.7 Call-and-Response Typography

**"Quem governa? Quem permanece."**

```
Display (event/hero):
  Line 1:        "Quem governa?" — Cinzel 36px, weight 400, #FFFFFF
  Line 2:        "Quem permanece." — Cinzel 36px, weight 400, #FFD161
  Gap:           8px between lines
  Alignment:     centered

Inline:
  Single line:   Montserrat 14px, weight 500, italic, #DF9F3E
```

---

## 4. Personal Brand Visual Layer

### 4.1 Leilaine Campioto Visual Identity Specifications

The personal brand operates on a warmer, more personal palette within the ZNITH ecosystem. Base system tokens `--znith-leilaine-*` provide the color foundation. This section adds the implementation rules.

#### Personal Brand Color System

The base design system already defines the Leilaine token set. The personal brand concept adds two specific colors:

| Role | Hex | Token | Usage |
|---|---|---|---|
| Primary Black | `#000000` | `--znith-leilaine-black` | Foundation color for personal brand contexts |
| Off-White | `#F5F0EB` | `--znith-leilaine-offwhite` | Clarity, breathing, sophistication — light backgrounds |
| Burnt Gold | `#A08050` | `--znith-leilaine-burnt-gold` | Signature accent — quieter and more refined than corporate gold |
| Deep Graphite | `#2A2A2A` | `--znith-leilaine-graphite` | Body text, subtle backgrounds, functional elements |

**Critical distinction from corporate gold:** Leilaine's personal accent is Burnt Gold `#A08050`, NOT the corporate Gold 500 `#DF9F3E`. The personal accent is quieter, more muted, more "earned." In mixed contexts (Leilaine as ZNITH representative), use corporate gold. In personal brand contexts (LinkedIn personal, stage, personal website), use burnt gold.

#### Personal Brand vs Corporate Context Decision Table

| Context | Gold Accent to Use | Background | Typography |
|---|---|---|---|
| ZNITH website "About" page | Corporate `#DF9F3E` | Navy `#091022` | Cinzel + Montserrat |
| Leilaine LinkedIn personal | Burnt Gold `#A08050` | Black `#000000` or Deep Navy `#0A1628` | Montserrat (primary) |
| Stage/keynote slides | Burnt Gold `#A08050` | Black `#000000` | Montserrat headlines (see note) |
| Proposal (as ZNITH CEO) | Corporate `#DF9F3E` | Navy `#091022` | Cinzel + Montserrat |
| Personal content/video | Burnt Gold `#A08050` | Black `#000000` | Montserrat |

**Typography note for personal brand:** The personal brand concept specifies geometric sans-serif with humanist warmth (Inter, Neue Haas Grotesk direction) for headlines, with an editorial serif for pull quotes. However, for ecosystem consistency, Montserrat serves the sans-serif role. Cinzel serves the serif/editorial role. No additional fonts are introduced. In personal-only contexts, Montserrat takes headline duties (weight 600-700) and Cinzel is reserved for editorial quotes and the personal tagline.

### 4.2 Photography Direction

This section captures the personal brand concept's photography specifications that go beyond the base system's Section 7.3.

#### Setting and Environment

```
Spaces:          Clean, architecturally significant
                 Modern offices with intentional design
                 Conference rooms with natural light
                 Urban architectural elements (bridges, facades, structural geometries)
                 Premium without ostentation
                 Preference for Brazilian urban environments

Prohibited:
  - Beach, gym, kitchen, casual/relaxed settings
  - Cluttered or chaotic backgrounds
  - Generic stock settings
  - Over-branded environments (visible logo walls, etc.)
```

#### Wardrobe Direction

```
Core:            Contemporary tailoring — clean-cut blazers, structured pieces
Palette:         Blacks, deep navies, charcoals, off-whites
                 Consistent with --znith-leilaine color tokens
Fabrics:         Premium, logo-free — message in texture and cut, not brand name
Jewelry:         Minimal, architectural (not decorative), silver or champagne metal
Signature:       Structured blazer/jacket — recurring anchor element (the Leilaine equivalent of a signature wardrobe piece)

Prohibited:
  - Bright colors, trendy patterns
  - Excessive accessories, statement jewelry
  - Casual/athleisure in any professional context
```

#### Posture and Expression

```
Body:            Grounded, still. Authority from settledness, not from performing energy.
Gaze:            Direct eye contact with camera. No "candid" avoidance.
                 Occasional profile shots for "direction" motif (compass symbolism).
Seated:          Ease of authority — not stiff, not casual. Leader in their element.
Standing:        With architectural elements — "builder" visual association.

Prohibited:
  - Stock-photo poses (hand on chin, arms crossed, pointing at camera)
  - Excessive smiling or performative warmth
  - Group photos where Leilaine is not clear focal point
```

#### Lighting and Mood

```
Primary:         Natural light — window light, golden hour, diffused daylight
Artificial:      Warm, directional, creating depth through shadow
                 NOT flat corporate lighting
Mood:            Serious but not severe. Warm but not soft.
Processing:      Subtle desaturation (not Instagram-filter), clean tones, slight shadow lift

Prohibited:
  - Harsh flash, overhead fluorescent
  - Overly moody/dark dramatic lighting
  - Heavy filters or manufactured processing
```

### 4.3 Personal Brand Symbols

Two recurring visual motifs for the personal brand (not logos — motifs that build association over time):

| Symbol | Visual | Usage | Design Direction |
|---|---|---|---|
| Compass Rose | Geometric, minimal, line-art | Stage backdrops, social templates, content headers | 4-point or 8-point rose, 1.5px stroke, Burnt Gold `#A08050` |
| Foundation/Cornerstone | Architectural base element | Metaphorical in content, visual in diagrams | Clean geometric block, structural lines, Graphite `#2A2A2A` |

These motifs appear at 10-20% opacity as background elements, never as primary brand marks. They supplement, not replace, the ZNITH lion mark.

---

## 5. Touchpoint-Specific Design Rules

### 5.1 Proposal/Presentation Template

```
Format:          PDF or Keynote/Google Slides
Aspect ratio:    16:9 (presentations), A4 (proposals)
Background:      Navy #091022
Header bar:      72px height, #14203A, 1px bottom border #2A3A5A
                 Logo left (ZNITH or sub-brand lockup), page number right (JetBrains Mono 12px, #7A7A7A)

Title slide:
  Overline:      Client name — Montserrat 12px, #DF9F3E, uppercase
  Title:         Cinzel 40px (presentation) / 28px (proposal), white
  Subtitle:      Montserrat 16px, #BBBBBB
  Date:          Montserrat 13px, #7A7A7A
  Lion watermark: 300px, bottom-right, 4% opacity

Content slides:
  Section title: Cinzel 28px, white, with gold underline (80px, 2px)
  Body:          Montserrat 16px, #BBBBBB, line-height 1.7
  Callout boxes: #14203A bg, 1px #2A3A5A border, 12px radius, 24px padding
  Data points:   Cinzel 36px for numbers, Montserrat 14px for labels

Specific to ZNITH.AI OS proposals:
  Phase timeline: Included on page 2, horizontal, full-width
  Lion watermark: Present on title page + final page
  Project code:  JetBrains Mono 12px, footer-right (e.g., OS-26-001)
```

### 5.2 Case Study Layout

Extends Section 2.5 with layout-specific rules.

```
Format:          Web page or PDF (both use same structure)
Max-width:       768px (text-focused, container-md)

Sections:
  Hero:          Full-width, bg #0D1828
                 Before/after metrics display (see 2.5 Case Study Title Card)
  Body:          5 sections matching LEITURA > PROJETO > OBRA > RESULTADO > DEPOIMENTO
                 Each section begins with phase badge + phase name heading
  CTA:           Standard CTA section at bottom — "Agendar Diagnostico"

Photography:
  Client environment with ZNITH dark overlay (60% min, navy-tinted)
  No generic stock — actual client workspace if available (with permission)
```

### 5.3 Onboarding Materials

The onboarding experience for ZNITH.AI OS uses branded stages.

#### Confirmacao de Aderencia (Acceptance Letter)

```
Format:          PDF, A4, portrait
Background:      White #FFFFFF (light mode — institutional context)
Header:          ZNITH logo (full, horizontal), left-aligned
                 Gold separator line, full width, 1px #C07A20 (darkened for print)
Body:            Montserrat 14px, #091022, line-height 1.7
Accent:          Section headers in Cinzel 18px, #091022
Signature:       "Leilaine Campioto" — handwritten style or Cinzel italic 16px
                 "Fundadora & CEO, ZNITH" — Montserrat 12px, #3A5080
Footer:          ZNITH tagline in Montserrat 10px, #8E9EBE, centered
                 "Direcao. Consciencia. Legado."
```

#### Kit de Imersao (Immersion Kit)

```
Format:          PDF, A4, portrait
Background:      White #FFFFFF
Header:          ZNITH.AI OS lockup, left-aligned
                 Phase timeline (miniature, horizontal, Phase 1 highlighted)
Content:         Structured intake sections with form fields
                 Labels: Montserrat 11px, weight 600, uppercase, #3A5080
                 Instructions: Montserrat 13px, #091022
Section dividers: 1px #E2E5EB with gold dot center (●, #C07A20, 6px)
```

### 5.4 Email Communication Visual Standards

```
Max-width:       600px (email body)
Background:      #091022 (dark mode email) or #FFFFFF (institutional/transactional)

Dark email:
  Header:        ZNITH wordmark, Cinzel weight 300, 20px, white. No logo image — text only for email compatibility.
  Separator:     1px #2A3A5A, full width
  Body:          Montserrat 15px, #BBBBBB, line-height 1.7
  CTA:           Gold gradient button, centered, 200px min-width
                 Fallback: gold background #DF9F3E, black text (for email clients without gradient support)
  Footer:        Montserrat 11px, #7A7A7A
                 "Direcao. Consciencia. Legado." in #DF9F3E
  Unsubscribe:   Montserrat 10px, #7A7A7A, underline

Light email (transactional):
  Header:        ZNITH wordmark, navy #091022
  Body:          Montserrat 15px, #333333
  CTA:           Navy button #091022, white text (not gold — gold has poor contrast on white email bg)
  Footer:        Montserrat 11px, #8E9EBE
```

### 5.5 Social Media Content Visual Framework

#### LinkedIn Post Cards

```
Size:            1200x1200px (square) or 1200x627px (landscape)
Background:      #091022
Border:          None (LinkedIn adds its own)
Typography zone: 80px padding all sides

Single-statement card:
  [Overline — Montserrat 18px, #DF9F3E, uppercase]
  [Statement — Cinzel 48px (square) / 36px (landscape), white, max 3 lines]
  [Footer bar — 60px height, bottom, bg #14203A]
    [Left: "Leilaine Campioto" — Montserrat 14px, white]
    [Right: ZNITH wordmark — Cinzel 14px, #7A7A7A]

Data card:
  [Metric — Cinzel 72px, #DF9F3E]
  [Label — Montserrat 18px, white]
  [Context — Montserrat 14px, #BBBBBB]
  [Footer bar — same as above]
```

#### Instagram Story Templates

```
Size:            1080x1920px
Background:      #091022 or #050B17 (movement content)
Safe zone:       Top 200px and bottom 280px left clear for platform UI

Quote template:
  [Quote — Cinzel italic, 28px, white, centered, max-width 800px]
  [Gold accent line — 60px, centered, 2px, #DF9F3E]
  [Attribution — Montserrat 14px, #DF9F3E]
```

### 5.6 Event/Workshop Materials

```
Name badge:
  Size:          85mm x 55mm (standard badge)
  Background:    #091022
  Content:       [Name — Montserrat 18px, weight 600, white]
                 [Company — Montserrat 12px, #BBBBBB]
                 [Role — Montserrat 10px, #7A7A7A]
  Accent:        Gold line across top edge, 2px, #DF9F3E
  ZNITH logo:    Bottom-right corner, Z reduced mark, 16px, #7A7A7A

Stage backdrop:
  Background:    #050B17 (deepest navy)
  Content:       ZNITH logo (full, centered) or Lideres Leoes lockup (movement events)
  Lion watermark: 600px, 3% opacity, centered
  No additional decoration — let the speaker be the visual focus
```

---

## 6. Data Visualization for Commercial Context

### 6.1 Dashboard/Reporting Visual Style for ZNITH.AI OS

The ZNITH.AI OS includes dashboards and reports for tracking commercial architecture health. The base system's Section 7.4 (Data Visualization Style) covers general chart colors. This section adds dashboard-specific patterns.

#### Dashboard Layout

```
Background:      #091022 (Surface 0)
Sidebar:         260px, #0D1828 (per base system sidebar nav spec)
Header:          72px, fixed (per base system nav spec)
Content area:    Padding 24px, grid-based layout

Dashboard cards:
  Background:    #14203A
  Border:        1px solid #2A3A5A
  Border-radius: 12px
  Padding:       24px
  Grid gap:      20px

Metric card (small):
  Height:        auto (content-driven)
  Structure:     [Label — Montserrat 12px, #7A7A7A, uppercase] + [Value — Cinzel 32px, #FFFFFF] + [Delta — Montserrat 13px, semantic color]
```

#### KPI Presentation Formatting

```
Primary KPI:
  Value:         Cinzel 48-56px, weight 700, #DF9F3E
  Unit:          Cinzel 28px, weight 400, #DF9F3E (same line, smaller)
  Label:         Montserrat 14px, weight 500, #FFFFFF
  Delta:         Montserrat 13px, weight 500
                 Positive: #68D391 with upward arrow icon
                 Negative: #FC8181 with downward arrow icon
                 Neutral: #7A7A7A with dash icon

Secondary KPI:
  Value:         Montserrat 28px, weight 700, #FFFFFF
  Label:         Montserrat 12px, weight 400, #7A7A7A
  Delta:         Same as primary KPI

Period selector:
  Active:        Montserrat 13px, weight 600, #DF9F3E, underline 2px #DF9F3E
  Inactive:      Montserrat 13px, weight 400, #7A7A7A
  Options:       "7D" | "30D" | "90D" | "12M" | "Todos"
  Separator:     " | " in #2A3A5A
```

#### Funnel Visualization

```
Direction:       Vertical (top = widest, bottom = narrowest)
Shape:           Trapezoid stages, left-aligned, decreasing width

Stage bar:
  Height:        48px per stage
  Border-radius: 8px
  Background:    Phase primary color at 20% opacity (see 2.1 phase colors)
  Border-left:   3px solid phase primary color
  Gap:           4px between stages

Stage label:
  Font:          Montserrat 14px, weight 500, #FFFFFF
  Position:      Inside bar, left-padded 16px

Stage value:
  Font:          JetBrains Mono 14px, weight 500, #FFFFFF
  Position:      Inside bar, right-padded 16px

Conversion rate (between stages):
  Font:          JetBrains Mono 12px, #7A7A7A
  Position:      Right of gap, preceded by arrow-down icon
  Format:        "→ 42%" or "↓ 42%"
```

#### Pipeline/CRM Visual Language

```
Pipeline columns (Kanban):
  Column header:  Montserrat 13px, weight 600, uppercase, 0.06em tracking
                  Color: phase primary color (see 2.1)
  Column count:   JetBrains Mono 12px, #7A7A7A, parenthetical "(12)"
  Column bg:      #0D1828

Deal card:
  Background:    #14203A
  Border:        1px solid #2A3A5A
  Border-radius: 8px
  Padding:       12px 16px
  Structure:     [Company — Montserrat 14px, weight 600, #FFFFFF]
                 [Value — JetBrains Mono 14px, #DF9F3E]
                 [Contact — Montserrat 12px, #7A7A7A]
                 [Age — JetBrains Mono 11px, #7A7A7A, "12d" format]
  Hover:         border-color #DF9F3E
  Drag indicator: 3 horizontal dots, #7A7A7A, top-right
```

---

## 7. Updated CSS Custom Properties

New tokens required to support the additions in this addendum. These extend the `:root` block in the base design system.

```css
:root {
  /* ──────────────────────────────────────────
     ZNITH.AI OS — PHASE PROGRESSION
  ────────────────────────────────────────── */
  --znith-os-phase-1-primary: #4A78C8;
  --znith-os-phase-1-tint:    rgba(42, 80, 144, 0.06);
  --znith-os-phase-2-primary: #3A6AB0;
  --znith-os-phase-2-tint:    rgba(42, 80, 144, 0.08);
  --znith-os-phase-3-primary: #8F7030;
  --znith-os-phase-3-tint:    rgba(143, 112, 48, 0.08);
  --znith-os-phase-4-primary: #C07A20;
  --znith-os-phase-4-tint:    rgba(192, 122, 32, 0.08);
  --znith-os-phase-5-primary: #DF9F3E;
  --znith-os-phase-5-tint:    rgba(223, 159, 62, 0.10);

  /* ──────────────────────────────────────────
     PRODUCT CATEGORIES
  ────────────────────────────────────────── */
  --znith-cat-arquitetura:         #2A5090;
  --znith-cat-arquitetura-tint:    rgba(42, 80, 144, 0.06);
  --znith-cat-acompanhamento:      #F5F0E8;
  --znith-cat-acompanhamento-tint: rgba(245, 240, 232, 0.04);
  --znith-cat-acompanhamento-text: #C0B8A8; /* contrast-safe for dark bg */
  --znith-cat-inteligencia:        #00B4D8;
  --znith-cat-inteligencia-tint:   rgba(0, 180, 216, 0.06);
  --znith-cat-desenvolvimento:     #050B17;
  --znith-cat-desenvolvimento-tint: rgba(5, 11, 23, 0.15);
  --znith-cat-desenvolvimento-text: #8E9EBE; /* contrast-safe for dark bg */

  /* ──────────────────────────────────────────
     LIDERES LEOES — COMMITMENT LEVELS
  ────────────────────────────────────────── */
  --znith-lideres-level-1-color: #7A7A7A;
  --znith-lideres-level-1-tint:  rgba(122, 122, 122, 0.10);
  --znith-lideres-level-2-color: #4A78C8;
  --znith-lideres-level-2-tint:  rgba(42, 80, 144, 0.10);
  --znith-lideres-level-3-color: #DF9F3E;
  --znith-lideres-level-3-tint:  rgba(223, 159, 62, 0.10);
  --znith-lideres-level-4-color: #FFD161;
  --znith-lideres-level-4-tint:  rgba(255, 209, 97, 0.15);
  --znith-lideres-level-5-color: #FFD161;
  --znith-lideres-level-5-tint:  rgba(255, 209, 97, 0.20);

  /* ──────────────────────────────────────────
     LIDERES LEOES — ADDITIONAL
  ────────────────────────────────────────── */
  --znith-lideres-section-alt: #0A1020;

  /* ──────────────────────────────────────────
     LEILAINE CAMPIOTO — PERSONAL BRAND ADDITIONS
  ────────────────────────────────────────── */
  --znith-leilaine-black:      #000000;
  --znith-leilaine-offwhite:   #F5F0EB;
  --znith-leilaine-burnt-gold: #A08050;
  --znith-leilaine-graphite:   #2A2A2A;
}
```

---

## Appendix: Token Cross-Reference

Quick reference mapping brand strategy decisions to design system tokens.

| Brand Decision | Source Document | Token(s) |
|---|---|---|
| 5-phase naming (LEITURA-GOVERNO) | Product Concepts, Section 5 | `--znith-os-phase-[1-5]-*` |
| 4 product categories | Product Concepts, Section 2 | `--znith-cat-*` |
| Selo ZNITH completion badge | Product Concepts, Section 6 | Uses `--znith-os-primary`, `--znith-surface-0` |
| Cohort code format (OS-26-001) | Product Concepts, Section 7 | `--znith-font-mono` |
| 5 commitment levels | Movement Concept, Section 13 | `--znith-lideres-level-[1-5]-*` |
| Lion dual usage (corporate/movement) | Company Concept 13.1 + Movement 12 | `--znith-lideres-lion` vs corporate tokens |
| Leilaine personal palette | Personal Concept, Section 16 | `--znith-leilaine-burnt-gold`, `--znith-leilaine-black`, etc. |
| Movement background distinction | Movement Concept, Section 12 | `--znith-lideres-base`, `--znith-lideres-section-alt` |
| Endorsement line "Uma iniciativa ZNITH" | Company Concept, Section 7.3 | Montserrat 12px, `--znith-color-neutral-500` |

---

*This addendum is a companion to `znith-design-system.md` v2.0. It does not replace any existing tokens or rules — it adds what the brand strategy work surfaced as gaps. Both documents together form the complete ZNITH design specification.*

*ZNITH Design System Addendum v1.0 — April 2026*
