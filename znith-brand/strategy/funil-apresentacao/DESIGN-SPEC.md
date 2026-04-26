# Funil ZNITH — Design Spec do Deck Interativo

Last updated: 2026-04-13

> **Owner**: Designer Agent (Reis IA)
> **Target**: Dev Agent (implementação HTML)
> **Design system source**: `znith-brand/design-system/znith-design-system.md`
> **Content source**: `znith-brand/strategy/funil-planejamento.md`

---

## IDS Protocol Decision

- **Grep/Glob**: No pre-existing presentation deck in `znith-brand/strategy/`.
- **Decision**: CREATE — new deliverable, ZNITH design system is the visual source.

---

## 1. Objetivo do Deck

Apresentar, em formato executivo premium, o planejamento de funis ZNITH para Leilaine aprovar. Deve sentir como uma apresentação de McKinsey adaptada à identidade ZNITH — não slide genérico de consultoria.

**Duração leitura**: 12–15 minutos.
**Formato**: HTML standalone interativo, navegação com setas ←/→, barra de progresso, atalhos de teclado, export via print-to-PDF.
**Audiência**: Leilaine + time interno ZNITH.

---

## 2. Tokens Aplicados (do ZNITH Design System)

### Cores
- `--bg`: `#091022` (Navy 900 — background primário)
- `--bg-elev`: `#0D1828` (Navy 800)
- `--bg-card`: `#14203A` (Navy 700)
- `--border`: `#2A3A5A` (Navy 500)
- `--gold`: `#DF9F3E` (Gold 500 — core brand)
- `--gold-light`: `#FFD161` (Gold Light — highlights)
- `--gold-deep`: `#C07A20`
- `--tech-blue`: `#2A5090` (ZNITH.AI accent)
- `--tech-blue-light`: `#4A78C8`
- `--text-primary`: `#FFFFFF`
- `--text-body`: `#BBBBBB`
- `--text-muted`: `#7A7A7A`
- Gradient flagship: `linear-gradient(135deg, #DF9F3E, #2A5090)` (ZNITH.AI OS signature)

### Tipografia
- Display/Headings: **Cinzel** (400/600/700) — usado apenas para H1/H2 de slide
- Body/UI: **Montserrat** (300/400/500/600/700) — tudo mais
- Mono: **JetBrains Mono** (para números/KPIs)
- Carregadas via Google Fonts CDN no `<head>`

### Escala tipográfica (ajustada para slides)
- Slide H1 (Cinzel 400): clamp 44–72px, letter-spacing -0.03em
- Slide H2 (Cinzel 400): clamp 32–48px
- Eyebrow/Overline (Montserrat 600): 12px, letter-spacing 0.12em, uppercase, cor `--gold`
- Body: Montserrat 18–20px, cor `--text-body`
- Caption/Footer: Montserrat 12–13px, cor `--text-muted`

### Ritmos visuais
- Spacing scale: 8/16/24/32/48/64/96/128px
- Max content width: 1200px
- Padding de slide: 80px desktop, 32px mobile
- Slide ratio: 16:9 (viewport height based)
- Gold accent line divider: 1px, 80px width, `--gold`, usado antes do H2

---

## 3. Estrutura do Deck (17 slides)

| # | Slide | Propósito | Layout |
|---|-------|-----------|--------|
| 1 | **Capa** | Identidade + título + autoria | Centralizado, hero display, wordmark ZNITH grande, subtítulo em gold |
| 2 | **Índice / Roteiro** | Roadmap da apresentação | Lista numerada 6 seções, gold accents nos números |
| 3 | **Contexto** | Onde estamos, o que já existe, o que falta | Split 2-col: "Já pronto" vs "A construir" |
| 4 | **Tese Estratégica** | A leitura central: qualidade sobre volume | Pull quote gigante centralizado + 3 princípios abaixo |
| 5 | **Inimigo Narrativo** | O improviso disfarçado de crescimento | Fullscreen statement + contraste movimento vs direção |
| 6 | **ICP Refinado** | Quem é o cliente ideal, quem NÃO é | Split card: "É para" vs "Não é para" |
| 7 | **Funil Mestre** | Visão única dos 6 estágios | Horizontal pipeline visual, 6 etapas conectadas |
| 8 | **Estágio 1 — Descoberta** | TOF detalhado | Card layout: objetivo, mensagem, ativos, KPIs |
| 9 | **Estágio 2 — Diagnóstico (Raio-X Comercial)** | A peça mais estratégica | Hero slide: mockup do quiz + 4 perfis classificatórios |
| 10 | **Estágio 3 — Consideração** | Nutrição MOF | Card layout igual slide 8 |
| 11 | **Estágio 4 — Conversa (Leitura Estratégica)** | BOF premium | Estrutura 45min com timeline vertical |
| 12 | **Estágio 5 — Decisão** | Fechamento + tratamento das 3 objeções | 3 colunas: objeção → reframe |
| 13 | **Estágio 6 — Governo** | Retenção, indicação, expansão | Fases LEITURA→PROJETO→OBRA→AJUSTE→GOVERNO reutilizando nomenclatura do brandbook |
| 14 | **Funis por Produto** | Variações pilar-a-pilar | Tabela com 5 produtos ZNITH |
| 15 | **KPIs Mestres** | Metas mensuráveis do mês 6 | Grid 3×3 de números grandes (Cinzel/Mono para números) |
| 16 | **Ativos a Produzir** | O que precisa ser construído | 3 blocos em timeline (4sem / 4sem / 90d) |
| 17 | **Próximos Passos** | Call to action para aprovação | Lista numerada + CTA "Aprovar e iniciar Bloco 1" |

---

## 4. Componentes Reutilizáveis

### SlideFrame
- Wrapper fixo 100vw × 100vh, display:flex center
- Padding 80px
- Font-family Montserrat como default
- Contains `.slide-eyebrow`, `.slide-title`, `.slide-content`

### Eyebrow
- `FUNIL ZNITH · SLIDE XX / 17`
- Montserrat 600, 12px, letter-spacing 0.12em, uppercase, cor `--gold`
- Top-left canto do slide

### Progress bar
- Linha fina fixa no topo (2px height)
- Gold fill proporcional: `(currentSlide / total) × 100%`
- Background `--border`

### NavControls
- Botões ← / → bottom-right, circular 56×56px
- Border 1px `--border`, hover: border `--gold`, transform translateY(-2px)
- Contador `XX / 17` ao centro

### KPI Card
- Background `--bg-card`
- Border 1px `--border`
- Padding 32px
- Top: eyebrow text (muted)
- Center: número gigante Cinzel 600, 64px, cor `--text-primary`
- Bottom: meta descritiva Montserrat 14px, cor `--text-body`

### Phase Chip
- Pill: padding 8px 16px, border-radius 999px
- Background transparent, border 1px `--gold`
- Text: Montserrat 600, 12px, uppercase, cor `--gold`

### Pipeline Visual (slide 7)
- 6 nodes horizontais conectados por linha 1px `--border`
- Node ativo: circle 48px com border `--gold`
- Abaixo de cada node: label Montserrat 600 12px uppercase

### Pull Quote
- Cinzel 400, clamp 32–56px
- Max-width 900px, centered
- Letter-spacing -0.02em
- Accent ornament: vertical gold line 2px width, 48px height, antes do quote

---

## 5. Interatividade

- **Arrow Left / Right**: navegação prev/next
- **Home**: slide 1
- **End**: slide 17
- **Click on node of pipeline (slide 7)**: jump to stage detail slide
- **Print / Ctrl+P**: cada slide quebra em página A4 landscape (via @media print)
- **Esc**: abre overview grid de todos os slides (4 colunas miniatura)

Animações:
- Fade-in do conteúdo a cada transição (200ms ease-out)
- Nenhuma animação dramática — mantém sobriedade executiva
- Respeitar `prefers-reduced-motion`

---

## 6. Layout Responsivo

- Desktop (>1024px): layout cheio conforme spec
- Tablet (768–1024px): padding reduzido para 48px, tipografia cai 1 tier
- Mobile (<768px): slides empilham verticalmente (sem navegação lateral), funciona como long-form scroll

---

## 7. Export PDF

- `@media print`: hide nav controls, force each slide to fill one A4 landscape page, use `page-break-after: always`
- Background navy preserved (print-color-adjust: exact)

---

## 8. Footer Universal

Rodapé fixo bottom-left de cada slide:
- `ZNITH · FUNIL ESTRATÉGICO · 2026.04` — Montserrat 500, 10px, letter-spacing 0.08em, uppercase, cor `--text-muted`
- Não aparece no slide 1 (capa)

---

## 9. Arquivos de Saída

- `index.html` — deck standalone completo (inline CSS + JS, sem dependências externas além de Google Fonts)
- `vercel.json` — configuração mínima para deploy estático
- `README.md` — instruções de deploy e navegação

---

## CHANGELOG

- [2026-04-13] v1.0 — Design spec inicial do deck de apresentação de funis ZNITH. Baseado em ZNITH Design System v1.0 e funil-planejamento.md v1.0.
