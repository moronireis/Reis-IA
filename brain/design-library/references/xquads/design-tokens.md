# Xquads — Design Tokens
## Source: https://raxo.com.br/xquads
## Extracted: 2026-04-22

---

## CSS Custom Properties (from `:root`)

```css
--bg: #141414;
--bg-2: #1a1a1a;
--bg-card: #1c1c1c;
--bg-card-2: #222222;
--copper: #D1FF02;
--copper-dim: #b8e000;
--copper-light: #e0ff4d;
--copper-glow: rgba(209,255,2,0.12);
--text: #FFFFFF;
--text-dim: #A8A8A8;
--text-muted: #5A5A5A;
--border: rgba(255,255,255,0.07);
--border-copper: rgba(209,255,2,0.30);
--radius: 8px;
--radius-lg: 12px;
```

---

## Color Palette

### Backgrounds
| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#141414` | Page background |
| `--bg-2` | `#1a1a1a` | Alternate section backgrounds (video, squads, FAQ) |
| `--bg-card` | `#1c1c1c` | Card backgrounds, proof bar, footer |
| `--bg-card-2` | `#222222` | Card hover states, code header |

### Accent (Neon Yellow-Green)
| Token | Value | Usage |
|-------|-------|-------|
| `--copper` | `#D1FF02` | Primary accent — CTAs, badges, icons, highlights |
| `--copper-dim` | `#b8e000` | CTA hover state |
| `--copper-light` | `#e0ff4d` | Elevated hover state, code function color |
| `--copper-glow` | `rgba(209,255,2,0.12)` | Glow effects, badge backgrounds |

### Text
| Token | Value | Usage |
|-------|-------|-------|
| `--text` | `#FFFFFF` | Primary text (headings, titles) |
| `--text-dim` | `#A8A8A8` | Body copy, descriptions |
| `--text-muted` | `#5A5A5A` | Tertiary text, labels, captions |

### Borders
| Token | Value | Usage |
|-------|-------|-------|
| `--border` | `rgba(255,255,255,0.07)` | Standard borders (cards, sections) |
| `--border-copper` | `rgba(209,255,2,0.30)` | Accent borders (price card, module separators) |

### Hard-coded Colors
| Value | Usage |
|-------|-------|
| `#0B0B0B` | CTA button text (dark on copper) |
| `rgba(20,20,20,0.9)` | Nav background (with blur) |
| `#ff5f57` | Terminal dot (red) |
| `#ffbd2e` | Terminal dot (yellow) |
| `#28c840` | Terminal dot (green) |
| `#444` | Code comments |
| `#8aad8a` | Code strings |
| `#a0b8c8` | Code variables |

---

## Typography

### Font Families
| Font | Weight Range | Usage |
|------|-------------|-------|
| `Inter` | 300–900 | Primary: headings, body text, UI |
| `JetBrains Mono` | 400, 500, 700 | Monospace: labels, badges, code blocks, nav logo, proof bar, prices |

### Type Scale

| Element | Size | Weight | Letter-spacing | Line-height | Font |
|---------|------|--------|---------------|-------------|------|
| Hero title | `clamp(36px, 5.5vw, 68px)` | 900 | -0.03em | 1.05 | Inter |
| Section title | `clamp(26px, 3.8vw, 46px)` | 800 | -0.025em | 1.12 | Inter |
| CTA final title | `clamp(30px, 4.5vw, 52px)` | 900 | -0.025em | — | Inter |
| Hero sub | `clamp(16px, 1.8vw, 19px)` | 400 | — | 1.75 | Inter |
| Section sub | `17px` | 400 | — | 1.75 | Inter |
| Body (solucao) | `16px` | — | — | 1.8 | Inter |
| Btn primary | `17px` | 700 | 0.01em | — | Inter |
| Module title | `16px` | 700 | -0.01em | — | Inter |
| Module num | `48px` | 900 | -0.03em | 1 | Inter |
| Price tag | `54px` | 900 | -0.03em | 1 | Inter |
| Mentor name | `26px` | 800 | -0.02em | — | Inter |
| Garantia title | `22px` | 800 | -0.02em | — | Inter |
| Nav logo | `14px` | — | 0.05em | — | JetBrains Mono |
| Section label | `11px` | — | 0.18em | — | JetBrains Mono |
| Hero badge | `12px` | — | 0.12em | — | JetBrains Mono |
| Proof item | `13px` | — | 0.02em | — | JetBrains Mono |
| Code body | `13px` | — | 0.04em | 1.85 | JetBrains Mono |
| Price period | `12px` | — | 0.06em | — | JetBrains Mono |
| FAQ question | `15px` | 600 | — | — | Inter |
| FAQ answer | `14px` | — | — | 1.8 | Inter |

### Text Transform
- Section labels: `text-transform: uppercase`
- Hero badge: `text-transform: uppercase`
- Price badge: `text-transform: uppercase`

---

## Spacing System

| Context | Value |
|---------|-------|
| Container max-width | `1080px` |
| Container padding | `0 24px` (mobile: `0 16px`) |
| Section padding | `100px 0` (mobile: `70px 0`) |
| Hero padding | `120px 0 80px` |
| Card padding | `28px 32px` (dor), `36px 32px` (module), `36px` (audience), `56px` (mentor) |
| Grid gaps | `1px` (module grid), `24px` (audience), `40px` (entrega), `56px` (solucao), `64px` (video, proof) |
| Nav padding | `16px 24px` |
| Footer padding | `40px 0` |

---

## Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | `8px` | Cards, buttons, grids |
| `--radius-lg` | `12px` | Code card, price card, mentor card, video portrait |
| Hard-coded `6px` | — | Nav CTA |
| Hard-coded `4px` | — | Badges, tags |
| Hard-coded `20px` | — | Video portrait container |
| Hard-coded `50%` | — | Dots, play button, glow elements |

---

## Shadows / Glows

| Element | Value |
|---------|-------|
| Button hover | `box-shadow: 0 12px 40px rgba(209,255,2,0.3)` |
| Hero glow 1 | `radial-gradient(circle, rgba(209,255,2,0.12) 0%, transparent 70%)` + `filter: blur(140px)` |
| Hero glow 2 | `radial-gradient(circle, rgba(209,255,2,0.08) 0%, transparent 70%)` + `filter: blur(140px)` |
| CTA glow | `rgba(209,255,2,0.08)` + `filter: blur(120px)` |
| Nav | `backdrop-filter: blur(20px)` |

---

## Z-index Layers

| Layer | Value |
|-------|-------|
| Canvas background | `0` |
| Sections | `2` |
| Footer | `2` |
| Video overlay | `10` |
| Nav | `100` |
