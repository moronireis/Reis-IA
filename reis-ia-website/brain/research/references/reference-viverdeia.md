# Viver de IA - Complete Design System & Page Structure Reference

## Last updated: 2026-03-25
## Source: https://viverdeia.ai/
## Pages analyzed: 1 (home - SiteNovoBrex3 variant)
## Tech stack: React SPA (Vite), Tailwind CSS + Custom CSS (brex-theme), Framer Motion, Spline 3D
## Framework: React with lazy-loaded route-based code splitting

---

## 1. PAGE STRUCTURE (Section Order)

The home page (`/`) loads the `SiteNovoBrex3` component. The sections render in this exact order:

```
1. AnnouncementBar      - Thin top banner (36px)
2. NavigationBrex       - Sticky header with logo + nav + CTA
3. HeroBrex3            - Full-bleed hero with background image
4. SocialProofBrex      - Logo bar ("Trusted by 1,200+ companies")
5. SuperchargeBrex      - 4 alternating feature blocks (Solutions, Mentoring, Training, Community)
6. MetricsBrex          - Revenue & savings metrics
7. TestimonialsBrex     - Case study carousel with video/photo + quotes
8. PricingSectionBrex   - 3-column pricing cards (Starter/Pro/Enterprise)
9. PartnersBrex         - "Os socios" section with founder/partner photos
10. FooterBrex          - Dark footer with 4-column grid
```

**Overall page background**: `bg-white` (light mode site, NOT dark mode)

---

## 2. ANNOUNCEMENT BAR

- Height: `36px` fixed
- Background: `#F6F7F9`
- Border bottom: `1px solid #E6E8EB`
- Content: "Veja por que empresas estao adotando IA" with arrow icon
- Text: `14px`, color `#5F6368`, hover `#0B0D12`
- Links to WhatsApp CTA URL
- Full-width clickable link

---

## 3. NAVIGATION

### Structure
- Sticky: `sticky top-0 z-50`
- Height: `60px`
- Background: `bg-white/80` with `backdrop-blur-xl`
- Border: `border-b border-white/20`
- Container: `max-width: 1440px`, padding `0 24px`

### Menu Items (left side, after logo)
1. **Solucoes** - anchor scroll to `#solucoes`
2. **Cases** - link to `/cases`
3. **Planos** - link to `/plans`
4. **Blog** - link to `/blog`

### Right Side
- "Entrar" link -> `https://app.viverdeia.ai` (login)
- **"Conhecer agora"** CTA button -> WhatsApp/CTA URL

### CTA Button (nav, small)
```css
.brex-cta-button-sm {
  background-color: #02162A;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 16px;
  border-radius: 8px;
  transition: background-color 180ms ease-out;
}
.brex-cta-button-sm:hover { background-color: #0a2a4a; }
```

### Menu Button Style
```css
.brex-menu-button {
  font-size: 14px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 999px; /* pill shape */
  border: 1px solid transparent;
  transition: all 200ms ease-out;
}
.brex-menu-button:hover { background: #f5f5f7; }
```

### Mobile Menu
- Slide-in drawer from left: `w-[90%] max-w-[420px]`
- White background, full height
- Transform transition: `300ms ease-out`
- Overlay: `bg-black/50`
- Bottom actions: "Entrar" outline button + "Conhecer agora" solid button

### Logo
- Image: `/logo-viver-de-ia.png`
- Height: `h-5` (20px) in nav
- Height: `h-7` (28px) in footer

---

## 4. HERO SECTION

### Layout
- Height: `780px` mobile / `900px` tablet / `850px` desktop
- Full-bleed background image (responsive: 3 variants)
  - Desktop: `bg-hero-desktop-v6.webp` (>= 1024px)
  - Tablet: `bg-hero-tablet-brex-51x.webp` (768-1023px)
  - Mobile: `bg-hero-mobile-brex-51x.webp` (< 768px)
- Image: `object-cover object-center` (desktop), `object-[center_70%]` (tablet), `object-bottom` (mobile)
- Content container: `max-width: 1680px`, padding `0 72px` (desktop)

### Content (left-aligned, vertically centered on desktop)
- Max width: `500px` mobile/tablet, `680px` desktop

### Headline (H1)
```
"A plataforma das empresas que crescem com Inteligencia Artificial."
```
- Size: `32px` mobile / `40px` tablet / `56px` desktop
- Weight: `600` (semibold)
- Line height: `1.15`
- Letter spacing: `-0.02em`
- Color: `#0B0D12`

### Subheadline
```
"Plug & Play para implementar Inteligencia Artificial na sua empresa de forma simples e imediata."
```
- Uses `.brex-body-lg` class: `18px`, weight `400`, line-height `1.6`, color `#5F6368`
- Max width: `max-w-lg` (~512px)

### CTA Button
```
"Conhecer agora"
```
- Style: `.brex-cta-liquid-glass-dark` (frosted glass effect)
```css
.brex-cta-liquid-glass-dark {
  background: rgba(2, 22, 42, 0.8); /* #02162Acc */
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.05) inset, 0 4px 24px rgba(0,0,0,0.2);
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 28px;
  border-radius: 12px;
  transition: all 300ms ease-out;
}
:hover {
  background: rgba(2, 22, 42, 0.9);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.1) inset, 0 8px 32px rgba(0,0,0,0.3);
  transform: translateY(-2px);
}
```

### Entrance Animation
- `.brex-reveal` class with intersection observer (threshold 0.1, freeze once visible)
- `opacity: 0 -> 1`, `translateY(12px) -> 0`
- Duration: `260ms`
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`

---

## 5. SOCIAL PROOF SECTION

### Layout
- Background: `#F6F7F9`
- Padding: `48px 0` mobile, `72px 0` desktop
- Container: `max-width: 1200px`

### Headline
```
"Confiado por mais de 1.200 empresas"
```
- Class: `.brex-social-title` -> `48px` desktop / `28px` mobile, weight `600`, tracking `-0.02em`
- Margin bottom: `48px` (mb-12)

### Logo Grid
- Grid: `2 columns` mobile, `4 columns` sm+
- Gap: `24px` horizontal, `16px` vertical
- Logos: grayscale (`brightness-0 opacity-55`), max height `40px` mobile / `56px` desktop
- Companies: WEG, G4 Educacao, V4 Company, CNP, Cupola, Marvee, Corplaw, Receita Previsivel

### Animation
- Staggered reveal: children animate with 40ms delay between each (`.brex-stagger`)

---

## 6. SUPERCHARGE SECTION ("Acelere sua transformacao com IA")

### Layout
- Background: `white`
- Section padding with `!pt-12` override
- Container: `max-width: 1200px`

### Section Header
- H2: `"Acelere sua transformacao com IA"`
  - Class: `.brex-h2` -> `48px`, weight `600`, line-height `1.15`, tracking `-0.02em`
  - Mobile: `28px`
- Subtitle: `"Formacoes, comunidade, mentorias e solucoes prontas para voce implementar."`
  - `.brex-body-lg`, max-width `2xl` (~672px), centered

### Feature Blocks (4 total, alternating layout)
Each block is a 2-column grid (`lg:grid-cols-2`, gap `40px` mobile / `80px` desktop).
**Alternating**: odd items have media left/text right, even items reverse.
Spacing between blocks: `128px` (space-y-32).

#### Block 1 - Solucoes (id="solucoes")
- Title: `"Solucoes"`
- Description: `"Mais de 42 solucoes prontas para voce implementar na sua empresa. SDR com IA, automacao de marketing, atendimento inteligente e muito mais."`
- Media: Auto-playing looped muted video (`solucoes-video.mp4`)
- CTA: "Conhecer agora ->" (`.brex-liquid-glass-button`)

#### Block 2 - Mentorias
- Title: `"Mentorias"`
- Description: `"Receba mentoria individual ou em grupo de especialistas que ja implementaram IA em centenas de empresas. Acelere seus resultados com quem ja passou pelo caminho."`
- Media: Auto-playing video (`mentorias-video.mp4`)

#### Block 3 - Formacoes
- Title: `"Formacoes"`
- Description: `"Formacoes completas desenvolvidas para profissionais que querem dominar Inteligencia Artificial aplicada aos negocios. Do basico ao especialista, com certificacao."`
- Media: Auto-playing video (`formacoes-video.mp4`)

#### Block 4 - Comunidade
- Title: `"Comunidade"`
- Description: `"Faca parte de uma comunidade com milhares de empresarios e profissionais implementando IA. Networking, cases reais e suporte continuo."`
- Media: Auto-playing video (`comunidade-video.mp4`)

### Block Title Style
```
font-size: 36px
font-weight: 600 (semibold)
line-height: 1.2
color: #0B0D12
margin-bottom: 16px
```

### Liquid Glass Button (used in each block)
```css
.brex-liquid-glass-button {
  background: rgba(2, 22, 42, 0.08); /* very subtle dark tint */
  backdrop-filter: blur(20px);
  border: 1px solid rgba(2, 22, 42, 0.15);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.5) inset, 0 2px 12px rgba(0,0,0,0.05);
  color: var(--brex-text-primary);
  font-size: 14px;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 12px;
  transition: all 300ms ease-out;
}
:hover {
  background: rgba(2, 22, 42, 0.12);
  border-color: rgba(2, 22, 42, 0.25);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.6) inset, 0 4px 20px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}
```

### Media Animations
- `.brex-ui-reveal`: `opacity: 0 -> 1`, `translateY(16px) -> 0`, `blur(2px) -> 0`
- Duration: `260ms`
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)`

---

## 7. METRICS SECTION

### Layout
- Background: `white`
- Padding: `0` top (continuation of supercharge), `96px` bottom
- Container: `max-width: 1200px`
- Content: `max-width: 3xl` (768px) centered

### Headline
```
"Resultados reais dos nossos clientes"
```
- `.brex-h2`

### Metrics (2-column grid on desktop)

| Label | Value | Description |
|-------|-------|-------------|
| Receita gerada | R$ 120,7M | Faturamento gerado pelos nossos clientes |
| Economia gerada | R$ 18,3M | Reducao de custos operacionais |

### Metric Value Style
```
font-size: 36px mobile / 56px desktop
font-weight: 600
color: #02162A
line-height: 1.1
```

### Legal Disclaimer
```
"Metricas estimadas com base em 1.200+ clientes atendidos. Resultados passados nao garantem resultados futuros."
```
- `.brex-legal` -> `12px`, color `#5F6368`

---

## 8. TESTIMONIALS / CASES SECTION

### Layout
- Background: `#F6F7F9`
- Padding: `48px 0` mobile / `80px 0` desktop
- Container: `max-width: 1680px` (wide), padding `0 72px`

### Carousel Mechanism
- Tab-based carousel with auto-advance every **8 seconds**
- Progress bars at top: thin 3px bars with fill animation
- Touch/swipe support (50px threshold)
- Pause on user interaction (20 second pause before auto-resume)
- Pause when video is playing

### Progress Bar Animation
```css
@keyframes brex-progress {
  0% { width: 0%; }
  100% { width: 100%; }
}
.brex-progress-bar { animation: brex-progress 6s linear; }
```

### Case Study Layout (each slide)
- 2-column grid (`lg:grid-cols-2`)
- Left: Video embed (Panda Video) or photo
- Right: Company logo (grayscale) + blockquote + attribution

### Companies Featured (7 total)
1. **Agencia F.U.S.S.** - Chris Malgueiro, CEO (video)
2. **Pasetti Viagens** - Arthur Pasetti, CEO (video)
3. **Agencia Besouro** - Vinicius Lima, CEO (photo) - "R$ 430K/ano economia, R$ 8,5M receita"
4. **Upp Tecnologia** - Murilo Ventimiglia, Fundador (photo) - "Triplicamos leads em 60 dias"
5. **InvestSmart XP** - Felipe Lira, CEO (photo) - "R$ 100.000 faturamento em 45 dias"
6. **Arka Invest** - Rafael de Oliveira Moura, CEO (photo)
7. **Assessoria MAP** - Victor Borges, CEO (photo) - "Eliminamos custos de R$ 2.000/mes"

### Quote Style
```
font-size: 20px mobile / 24px tablet / 28px desktop
font-weight: 400 (normal)
color: #0B0D12
line-height: 1.35
```

### Bottom CTA
```
"Ver todos os cases ->"
```
- `.brex-cta-liquid-glass-dark` button
- Links to `/cases`

### Slide Transition
- Opacity + scale transition: `260ms`
- Active: `scale-100 opacity-100`
- Inactive: `scale-[0.98] opacity-0`

---

## 9. PRICING SECTION

### Layout
- Background: `#F3F3F7`
- Padding: `48px 0` top, `80-112px` bottom
- Container: `max-width: 1680px`

### Headline
```
"Escolha o plano ideal
para sua empresa"
```
- `32px` mobile / `48px` desktop, weight `600`, color `#0B0D12`

### Plans (3-column grid)

| Plan | Price | Description |
|------|-------|-------------|
| **Starter** | R$ 2.150/mes | Assinatura anual / Acessos ilimitados |
| **Pro** | R$ 3.150/mes | Assinatura anual / Acessos ilimitados |
| **Enterprise** | R$ 5.150/mes | Assinatura anual / Acessos ilimitados |

### Card Style
```
background: white
border-radius: 16px (rounded-2xl)
padding: 40px (p-10)
box-shadow: 0 1px 2px rgba(0,0,0,0.06)
animation: fade-in-up with 100ms stagger delay
```

### Plan Name
- `32px` mobile / `36px` desktop, weight `600`

### Price Display
- `24px` (text-2xl), weight `600`, color `#0B0D12`
- "/mes" suffix: `16px`, color `#5F6368`

### CTA Button (in each card)
```
"Conhecer agora"
```
- Full width: `block w-full`
- `py-3`, centered text
- `bg-[#02162A]`, hover `bg-[#0a2a4a]`
- `border-radius: 10px`
- Transition: `200ms`

### Feature List
- Checkmark icon for included features
- X icon for excluded features (color `#D1D5DB`)
- Text: `15px`, line-height `1.6`
- Included: `#0B0D12`, excluded: `#D1D5DB`

### Key Features Listed
- 42+ AI solutions
- Practical AI training
- Community access
- AI Networking
- Personalized AI track
- Certification
- Tool Hub
- Exclusive benefits
- 8 monthly mentoring check-ins (Pro) / 40 (Enterprise)
- WhatsApp group for team (Pro+)
- CEO WhatsApp group (Pro+)
- AI Builder (Enterprise only)
- Viver de IA Day immersion (Enterprise only)

### Solutions Expandable List (21 items)
Includes items like: SDR WhatsApp with AI, Social Selling, Blog Automation, RAG, etc.

### Training Expandable List (9 items)
Includes: Lovable na Pratica, N8N Agents, Image Generation, Paid Traffic with AI, etc.

---

## 10. PARTNERS SECTION ("Os socios")

### Layout
- Background: `#161920` (very dark blue-gray)
- Padding: `80px 0` mobile / `112px 0` desktop
- Container: `max-width: 1680px`

### Headline
```
"Os socios"
```
- `30px` mobile / `48px` desktop, weight `600`, color `white`

### Partner Grid
- `2 columns` mobile / `5 columns` desktop
- Gap: `24px` mobile / `32px` desktop

### Partners (5 total)
1. **Rafael Milagre** - Founder Viver de IA, Mentor no G4
2. **Yago Martins** - CEO Viver de IA, Mentor no G4
3. **Tallis Gomes** - Founder G4, Easy Taxi e Singu
4. **Alfredo Soares** - Founder G4, XTech, Socio da Vtex
5. **Bruno Nardon** - Founder G4, Kanui e Norte Ventures

### Photo Card
- Aspect ratio: `4/3`
- `rounded-2xl`, overflow hidden
- Background: `#0B1120` (loading placeholder)
- Fallback: initials on gradient background

### Text
- Name: `16-18px`, weight `600`, color `white`
- Role: `14px`, color `rgba(255,255,255,0.6)`
- Company: `12px`, color `rgba(255,255,255,0.4)`

---

## 11. FOOTER

### Layout
- Background: `#0B0D12`
- Padding: `64px 0` mobile / `80px 0` desktop
- Container: `max-width: 1680px`, padding `0 72px`
- Border top: `1px solid rgba(255,255,255,0.1)`
- Uses `.brex-dark` variant (white text)

### 4-Column Grid
1. **Brand** - Logo + description paragraph
2. **Menu** - Home, Solucoes, Planos
3. **Contato** - Email (contato@viverdeia.ai), Phone (+55 48 99105-0105), Address (SC-401, Florianopolis, SC)
4. **Redes Sociais** - Instagram (@viverdeia.ai), LinkedIn

### Column Headers
- `14px`, weight `500`, color `white`

### Link Style
- `14px`, color `rgba(255,255,255,0.5)`, hover `white`
- Transition: `180ms`

### Bottom Bar
- Border top: `1px solid rgba(255,255,255,0.1)`
- Copyright: `12px`, color `rgba(255,255,255,0.4)`
- Legal links: Politica de Privacidade, Termos de Uso
- Disclaimer text: `12px`, color `rgba(255,255,255,0.3)`, max-width `4xl`

### Hidden Feature
- Logo in footer has a triple-click handler that navigates to `/login` (admin access)

---

## 12. COMPLETE COLOR SYSTEM

### Brex Theme (Light Mode - Primary)
| Token | Value | Usage |
|-------|-------|-------|
| `--brex-bg-primary` | `#FFFFFF` | Page background |
| `--brex-bg-secondary` | `#F6F7F9` | Section backgrounds, hover states |
| `--brex-text-primary` | `#0B0D12` | Headlines, primary text |
| `--brex-text-secondary` | `#5F6368` | Body text, descriptions |
| `--brex-border` | `#E6E8EB` | Borders, dividers |
| `--brex-cta` | `#02162A` | CTA buttons, primary action color |
| `--brex-cta-hover` | `#0a2a4a` | CTA hover state |
| `--brex-dark-bg` | `#0B0D12` | Dark sections (footer, partners) |

### Dark Variant (`.brex-dark`)
| Token | Value | Usage |
|-------|-------|-------|
| `--brex-text-primary` | `#FFFFFF` | |
| `--brex-text-secondary` | `rgba(255,255,255,0.7)` | |
| `--brex-border` | `rgba(255,255,255,0.1)` | |

### Accent Colors Used Inline
| Color | Usage |
|-------|-------|
| `#02162A` | Primary CTA / brand navy |
| `#0a2a4a` | CTA hover |
| `#0B0D12` | Darkest background / text |
| `#161920` | Partners section background |
| `#0B1120` | Image placeholder background |
| `#F6F7F9` | Light gray backgrounds |
| `#F3F3F7` | Pricing section background |
| `#E6E8EB` | Borders |
| `#D1D5DB` | Disabled / muted elements |
| `#5F6368` | Secondary text |
| `#3D3D3D` | Progress bar fill, fallback text |
| `#f5f5f7` | Menu button hover (Apple-style gray) |

### Legacy CSS Variables (root, from original dark theme)
| Token | HSL Value | Resolved |
|-------|-----------|----------|
| `--background` | `220 30% 5%` | Very dark blue-gray |
| `--foreground` | `180 100% 98%` | Near-white cyan |
| `--primary` | `180 100% 50%` | Bright cyan (unused in brex) |
| `--primary-glow` | `180 100% 70%` | Light cyan |
| `--muted` | `180 5% 50%` | Medium gray |
| `--card` | `220 30% 8%` | Dark card bg |

Note: The "brex" theme is a complete override of the original dark cyan theme. The site has pivoted to a clean white/navy aesthetic.

---

## 13. COMPLETE TYPOGRAPHY SYSTEM

### Font
- Family: `Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif`
- Weights loaded: `400, 500, 600, 700`
- Rendering: `optimizeLegibility`, antialiased, `font-synthesis-weight: none`

### Type Scale

| Class | Desktop | Mobile | Weight | Line Height | Tracking |
|-------|---------|--------|--------|-------------|----------|
| `.brex-h1` | 56px | 36px | 600 | 1.08 / 1.12 | -0.02em |
| `.brex-h2` | 48px | 28px | 600 | 1.15 / 1.2 | -0.02em |
| `.brex-h3` | 24px | 20px | 600 | 1.2 | -- |
| `.brex-body-lg` | 18px | 16px | 400 | 1.6 | -- |
| `.brex-body` | 16px | 16px | 400 | 1.6 | -- |
| `.brex-small` | 14px | 14px | 400 | 1.45 | -- |
| `.brex-label` | 14px | 14px | 500 | -- | -- |
| `.brex-menu` | 14px | 14px | 500 | -- | -- |
| `.brex-legal` | 12px | 12px | 400 | 1.5 | -- |
| `.brex-metric` | 40px | 32px | 600 | 1.1 | -0.02em |
| `.brex-social-title` | 48px | 28px | 600 | 1.2 | -0.02em |

### Inline Overrides (hero)
- H1 hero: `32px / 40px / 56px` (mobile/tablet/desktop), weight `600`, line-height `1.15`, tracking `-0.02em`
- Feature block title: `36px`, weight `600`, line-height `1.2`
- Metric value: `36px / 56px`, weight `600`, line-height `1.1`
- Quote: `20px / 24px / 28px`, weight `400`, line-height `1.35`

---

## 14. SHADOW SYSTEM

| Token | Value | Usage |
|-------|-------|-------|
| `--brex-shadow-base` | `0 1px 2px rgba(0,0,0,0.06)` | Cards at rest |
| `--brex-shadow-hover` | `0 10px 26px rgba(0,0,0,0.08)` | Cards on hover |
| `--brex-shadow-mega` | `0 8px 32px rgba(0,0,0,0.12)` | Emphasized elements |

---

## 15. MOTION / ANIMATION SYSTEM

### Global Easing
```css
--brex-easing: cubic-bezier(0.2, 0.8, 0.2, 1);
```
This is a smooth deceleration curve -- fast start, gentle landing.

### Reveal Animations (Intersection Observer)

| Class | From | To | Duration | Easing |
|-------|------|----|----------|--------|
| `.brex-reveal` | `opacity:0; translateY(12px)` | `opacity:1; translateY(0)` | 260ms | brex-easing |
| `.brex-ui-reveal` | `opacity:0; translateY(16px); blur(2px)` | `opacity:1; translateY(0); blur(0)` | 260ms | brex-easing |
| `.brex-hero-image-reveal` | `opacity:0; translate(12px)` | `opacity:1; translate(0)` | 320ms | brex-easing |

### Stagger Animation
- Children of `.brex-stagger` animate with `40ms` delay between each (up to 8 children)
- Same reveal: `opacity:0; translateY(12px)` -> visible

### Floating Animation
```css
@keyframes floating {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
/* 4s duration, with 0.5s, 1s, 1.5s delay variants */
```

### Testimonial Progress Bar
```css
@keyframes brex-progress {
  0% { width: 0%; }
  100% { width: 100%; }
}
/* 6s linear (visual) but JS timer is 8s */
```

### Transition Durations Used
- `180ms` - CTA buttons, links, menu items (standard interaction)
- `200ms` - Menu button hover
- `260ms` - Section reveals, slide transitions
- `300ms` - Liquid glass buttons, mobile drawer, glass effects
- `320ms` - Hero image reveal

### Card Hover
```css
.brex-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 26px rgba(0,0,0,0.08);
  border-color: #d1d5db;
}
/* transition: 180ms brex-easing */
```

### Liquid Glass Hover (all variants)
- `transform: translateY(-2px)` on hover
- Enhanced box-shadow
- `300ms ease-out`

---

## 16. LAYOUT SYSTEM

### Containers
| Class | Max Width | Padding (mobile) | Padding (desktop) |
|-------|-----------|-------------------|--------------------|
| `.brex-container-header` | 1440px | 0 24px | 0 24px |
| `.brex-container` | 1200px | 0 24px | 0 60px (md) / 0 (1320px+) |
| `.brex-container-hero` | 1536px | 0 24px | 0 60px |
| `.brex-container-hero-wide` | 1680px | 0 24px | 0 72px |

### Grid System
- `.brex-grid-12` -> 12 columns, 24px gap
- Feature blocks: `lg:grid-cols-2`, gap 40-80px
- Pricing: `lg:grid-cols-3`, gap 24px
- Partners: `grid-cols-2 md:grid-cols-5`, gap 24-32px
- Social proof logos: `grid-cols-2 sm:grid-cols-4`

### Section Spacing
| Class | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| `.brex-section` | `64px 0` | `80px 0` | `112px 0` |
| `.brex-section-metrics` | `48px 0` | `64px 0` | `96px 0` |
| `.brex-section-social` | `48px 0` | `48px 0` | `72px 0` |

### Responsive Breakpoints (Tailwind defaults)
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- Custom: 1320px (container padding removal)

---

## 17. BUTTON SYSTEM (Complete Catalog)

| Button | Style | Context |
|--------|-------|---------|
| `.brex-cta-button` | Solid navy `#02162A`, white text, `10px` radius | Primary CTA |
| `.brex-cta-button-sm` | Same as above, smaller padding, `8px` radius | Nav CTA |
| `.brex-cta-wrapper` + `.brex-cta-button` | Outer border ring `3px #E6E8EB` + inner solid button | Wrapped CTA (unused on home) |
| `.brex-cta-liquid-glass` | White glass: `rgba(255,255,255,0.15)` + blur | Light bg overlay buttons |
| `.brex-cta-liquid-glass-dark` | Dark glass: `rgba(2,22,42,0.8)` + blur | Hero CTA, testimonials CTA |
| `.brex-liquid-glass-button` | Subtle glass: `rgba(2,22,42,0.08)` + blur | Feature block CTAs |
| `.brex-ghost-button` | Transparent + border `#E6E8EB` | Secondary actions |
| `.brex-menu-button` | Transparent, pill shape | Nav menu items |
| `.brex-menu-button-dark` | Transparent, white text, pill shape | Dark variant nav |

---

## 18. CTA PATTERNS & PLACEMENT

Every CTA points to the same dynamically-built WhatsApp/external URL via `useCTAUrl` hook.

| Location | CTA Text | Button Style |
|----------|----------|--------------|
| Announcement bar | "Veja por que empresas estao adotando IA" | Text link with arrow |
| Nav (desktop) | "Conhecer agora" | `.brex-cta-button-sm` |
| Nav (mobile) | "Conhecer agora" | Solid navy full-width |
| Hero | "Conhecer agora" | `.brex-cta-liquid-glass-dark` |
| Each feature block (x4) | "Conhecer agora ->" | `.brex-liquid-glass-button` |
| Each pricing card (x3) | "Conhecer agora" | Full-width solid navy |
| Testimonials bottom | "Ver todos os cases ->" | `.brex-cta-liquid-glass-dark` |

**CTA count on page**: 10+ instances of "Conhecer agora"

**Pattern**: Single CTA text repeated everywhere. No variation. Heavy tracking on every click (Meta Pixel + GA4 + custom analytics).

---

## 19. STANDOUT DESIGN PATTERNS

### 1. "Liquid Glass" Button System
The most distinctive design element. Three variants (light glass, dark glass, subtle glass) with `backdrop-filter: blur(20px)`, inset box-shadows, and `translateY(-2px)` hover lift. Apple-inspired glassmorphism adapted for a white/navy palette.

### 2. Intersection Observer Reveal System
Every section uses a custom `useIntersectionObserver` hook with `freezeOnceVisible: true`. Elements start invisible and offset, then animate in when scrolled into view. Consistent `260ms` duration with a single easing curve throughout.

### 3. Staggered Children Animation
The `.brex-stagger` class creates a cascade effect where child elements animate in sequence with 40ms delays. Used for logo grids, partner photos, etc.

### 4. Testimonial Carousel with Progress Bars
Auto-advancing (8s interval) with thin progress bar indicators. Pauses on interaction, resumes after 20s idle. Video detection pauses auto-advance when user is watching.

### 5. Video-First Feature Blocks
Each of the 4 feature blocks uses auto-playing, looped, muted video instead of static images. Creates immediate visual dynamism.

### 6. Alternating Feature Layout
Feature blocks alternate image/text sides (`order-1/order-2` CSS), creating visual rhythm.

### 7. White-Mode Site with Dark Accents
Despite the trend toward dark mode in AI/tech, this site is WHITE with very dark navy (`#02162A`) as the accent. Dark sections (partners, footer) use `#0B0D12` / `#161920`.

### 8. Single CTA Strategy
Every button says "Conhecer agora" (Get to know now). No variation, no different funnels. All roads lead to the same WhatsApp/contact URL.

### 9. No Hamburger Icon - "Fechar" Text
Mobile menu close uses the text "Fechar" instead of an X icon, which is an interesting localization choice.

### 10. Triple-Click Easter Egg
The footer logo has a triple-click handler that navigates to `/login` -- a hidden admin access pattern.

---

## 20. REIS IA CROSS-REFERENCE

### Compatible Patterns (Consider Adopting)
1. **Intersection Observer reveal system** -- similar to our scroll animations but more systematic. The `freezeOnceVisible` pattern and consistent easing are clean.
2. **Staggered animation** -- the 40ms child delay cascade is elegant and could work for our grid sections.
3. **Type scale discipline** -- tight, well-defined scale with negative tracking on large headings (`-0.02em`). We already use Inter, so this maps directly.
4. **Section spacing system** -- responsive 3-tier padding (64/80/112) is well-structured.
5. **Container hierarchy** -- 4 container widths (1200/1440/1536/1680) for different contexts is smart.

### Conflicts with Reis IA
1. **Light mode default** -- Viver de IA is white-first. Reis IA is **dark mode default**. Do not adopt their white backgrounds.
2. **Navy CTA color** (`#02162A`) -- Their primary action is near-black navy. Ours is `#4A90FF` blue. Different brand identity.
3. **"Liquid glass" on white** -- Their glassmorphism works because of white backgrounds. On our dark backgrounds, we need different glass effects.
4. **Pricing tables** -- They have full 3-tier pricing cards. **PROHIBITED** for Reis IA (no SaaS patterns).
5. **Single CTA everywhere** -- Their "Conhecer agora" pattern is generic. We use specific CTAs (`/agendar`, `/aplicar`).
6. **Font weights** -- They load 400/500/600/700 Inter. We use 300 (light) for the "Reis IA" wordmark, which they don't need.

### Patterns to Avoid
- Their color palette has zero blue accent -- all navy/gray. Our `#4A90FF` is a signature.
- Their background image hero approach (stock photo vibes) vs our geometric/minimal aesthetic.
- Their pricing section pattern directly violates our no-SaaS rule.

### Key Takeaways for Reis IA Home Redesign
1. **Section count**: 10 sections is a good benchmark for a complete home page.
2. **Section order logic**: Social proof immediately after hero -> feature showcase -> metrics -> testimonials -> pricing/CTA -> footer. This funnel structure is sound.
3. **Video in feature blocks**: Auto-playing muted videos add dynamism without user interaction.
4. **Metrics with legal disclaimer**: Showing real numbers with a disclaimer is a proven trust pattern.
5. **Testimonial carousel**: Their progress-bar carousel with video/photo is more engaging than static quote cards.
6. **Container width hierarchy**: Different max-widths for different content density levels.
