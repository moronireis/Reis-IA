# Reis IA Website — Full Rebuild Plan

Last updated: 2026-03-17

> **Owner**: Orchestrator
> **Status**: READY FOR EXECUTION
> **Purpose**: Comprehensive blueprint for rebuilding reis-ia-website/ from scratch with new copy (v2.0), new design system, and new brand identity

---

## Table of Contents

1. [Page-by-Page Blueprint](#1-page-by-page-blueprint)
2. [Design System Application Map](#2-design-system-application-map)
3. [Copy Integration Plan](#3-copy-integration-plan)
4. [Component Inventory](#4-component-inventory)
5. [Agent Assignment](#5-agent-assignment)
6. [Build Phases](#6-build-phases)
7. [What Carries Over vs. What's New](#7-what-carries-over-vs-whats-new)
8. [Critical Rules Reminder](#8-critical-rules-reminder)
9. [Backup Instructions](#9-backup-instructions)

---

## 1. PAGE-BY-PAGE BLUEPRINT

---

### Page 1: HOME `/` — Brand Positioning & Routing

**Copy source**: `brain/assets/campaigns/homepage/FINAL-homepage-copy.md` — use [IMPROVED -- 2026-03-17] v2.0 section (starts at line ~632)

**Architecture (8 sections)**:

```
1. HERO           — Brand thesis, dual CTA, credibility anchor
2. MANIFESTO      — "O Que Acreditamos" + chess metaphor + status
3. PILARES        — 4 pillar cards with routing CTAs + reader identity
4. ESTATISTICAS   — 4 stats with narrative framing + sources
5. FUNDADOR       — Moroni as strategic peer + hourglass + status
6. CAMINHOS       — Binary self-selection + Network CTA
7. NEWSLETTER     — Email capture with social proof
8. CTA RODAPE     — Urgency/time closing + /agendar
```

#### Section 1: HERO
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 (#000000) |
| Copy headline | "IA nao e um projeto de tecnologia. E uma estrategia de receita." |
| Copy subheadline | "A Reis IA faz IA gerar receita — pra empresas que implementam e agencias que vendem. Tudo comeca com uma pergunta." |
| Copy body | 37 words with 91% stat anchor + Cemiterio de Prototipos intro |
| Typography | Headline: `--text-display` (72px desktop). Subheadline: `--text-body-lg`. Body: `--text-body` max-width 680px |
| CTA Primary | "Agendar uma conversa" → `/agendar` (Primary Hero button) |
| CTA Secondary | "Ver como funciona" → anchor to Pilares section (Secondary button) |
| Microcopy | "30 minutos. Zero compromisso. Voce sai com um mapa de onde IA gera receita no seu negocio — mesmo que decida nao trabalhar conosco." |
| Background effect | Aurora Background (3 blue orbs, 20s drift cycle) |
| Ambient pool | Blue ambient centered on headline |
| Signature element | None (keep hero clean, let Aurora do the work) |
| Animation | Hero stagger entrance: badge → headline → subheadline → body → CTAs (100ms delays each, `--ease-out`, 700ms) |
| Hourglass | Not in hero |
| Max blue elements | 1 (Primary CTA button) |

#### Section 2: MANIFESTO — "O Que Acreditamos"
| Attribute | Value |
|-----------|-------|
| Surface | Surface-1 (#0A0A0A) |
| Copy headline | "A maioria das empresas nao esta falhando com IA porque a tecnologia nao funciona. Esta falhando porque comecou pela pergunta errada." |
| Copy body | v2.0 manifesto (~138 words): chess metaphor, Revenue-First reveal, closing with "numero no faturamento" |
| Typography | Headline: `--text-h2`. Body: `--text-body-lg`, max-width 680px |
| Closing statement | Bold pair: "IA pelo IA e experimento. / IA pra receita e estrategia de negocio." — `--text-h3`, font-weight 700 |
| Ambient pool | Blue pool bottom-right |
| Animation | Text Reveal effect on headline (words transition from 20% to 100% opacity on scroll) |
| Scroll animation | Fade-up reveal on body paragraphs with stagger |
| Surface alternation | Surface-1 (alternating from hero's Surface-0) |

#### Section 3: PILARES — 4 Ecosystem Cards
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 (#000000) |
| Section headline | "Um relacionamento. Quatro formas de fazer IA virar receita." — `--text-h2` |
| Layout | 4-column grid desktop (3+3+3+3), 2-column tablet, 1-column mobile |
| Card variant | Standard card (Surface-2 bg, 8% border). Builder card gets Sapphire Scanner (rotating border) |
| Card 1 — Builder | Title: "Seja a Agencia que Vende IA". CTA: "Aplicar para o Builder" → `/aplicar` |
| Card 2 — Systems | Title: "IA que Aparece no Faturamento". CTA: "Agendar um IA Revenue Audit" → `/agendar` |
| Card 3 — Partners | Title: "Venda IA. A Gente Constroi." CTA: "Quero saber mais" → future route |
| Card 4 — Network | Title: "Onde Quem Constroi com IA se Encontra". CTA: "Entrar na comunidade" → future route |
| Signature element | Sapphire Scanner on Builder card (rotating blue conic-gradient, 8s cycle) |
| Animation | Staggered grid entrance (80ms per card, `--ease-out`, 500ms) |
| Card hover | Border brightens to `--border-visible`, bg shifts to Surface-3. Builder card gets blue glow shadow |

#### Section 4: ESTATISTICAS — Stats with Narrative
| Attribute | Value |
|-----------|-------|
| Surface | Surface-1 (#0A0A0A) |
| Section headline | "A maioria desiste. Quem comeca certo, lucra." — `--text-h2` |
| Section subheadline | "O problema nunca foi a tecnologia. Foi a ordem das perguntas." — `--text-body-lg`, text-secondary |
| Layout | 4-stat grid. Stat 1 (42%) visually distinct/separated (different color treatment — text-primary instead of accent, or larger size). Stats 2-4 in accent blue |
| Stat 1 | "42%" — "das empresas abandonaram projetos de IA em 2025". Context: "O Cemiterio de Prototipos e real." Source line in text-quaternary |
| Stat 2 | "91%" — "das PMEs com implementacao especializada reportam aumento de receita" |
| Stat 3 | "74%" — "alcancam ROI no primeiro ano com especialistas" |
| Stat 4 | "67% vs 22%" — "taxa de sucesso: especialistas versus generalistas" |
| Animation | Counter animation (numbers count up from 0, 2000ms, ease-out). Trigger on scroll intersection |
| Hourglass watermark | Top-left, 120px, 3% opacity |
| Typography | Stat values: 56px desktop / 40px mobile, weight 700, `tabular-nums`. Labels: `--text-caption`, uppercase |

#### Section 5: FUNDADOR — Moroni Reis
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 (#000000) |
| Section label | "Por Que a Reis IA Existe" (Badge component) |
| Layout | Two-up weighted: 7+5 (text left, photo right) desktop. Stacked mobile |
| Headline | "Passei anos vendo empresas jogar dinheiro fora com IA que nunca deu resultado. Ate entender por que." — `--text-h3` |
| Body | v2.0 founder bio (~147 words) with Revenue-First Framework origin story and hourglass paragraph |
| CTA Dual | "Comecar com um IA Revenue Audit gratuito" → `/agendar` + "Ou conhecer o Builder" → `/aplicar` |
| Photo | Placeholder circle with Sapphire Scanner rotating border (blue conic-gradient, 8s) |
| Ambient pool | Neutral light pool bottom-left |
| Hourglass watermark | Bottom-right, 200px, 4% opacity |
| Animation | Fade-up on text. Scale-reveal on photo. Parallax on watermark (slow, -0.05 scroll factor) |

#### Section 6: CAMINHOS — Self-Selection
| Attribute | Value |
|-----------|-------|
| Surface | Surface-1 (#0A0A0A) |
| Headline | "Dois caminhos. Um objetivo: IA que gera receita no seu negocio." — `--text-h2` |
| Layout | Two-up equal (6+6) desktop. Two cards side by side |
| Card A | "Sou dono de agencia" → `/aplicar`. Body about Builder with "Em ate 60 dias." |
| Card B | "Preciso de IA que gere resultado" → `/agendar`. Body about Systems with Revenue Audit CTA |
| Below cards | Network soft CTA: "Nao se encaixa em nenhum dos dois ainda?" + "Entrar na comunidade" |
| Card variant | Glass card (bg white/5, blur 16px, saturate 180%) |
| Ambient pool | None (section is compact) |

#### Section 7: NEWSLETTER — Email Capture
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 (#000000) |
| Headline | "Receba o framework que nossos clientes pagam pra ter." — `--text-h3` |
| Description | "Insights Revenue-First, estudos de caso reais e as estrategias de IA que estamos usando agora..." |
| Form | Email input (glass styling, blue focus border) + "Quero receber" submit button (Primary) |
| Microcopy | "Sem spam. Cancele quando quiser." |
| Layout | Centered, narrow container (800px) |
| Ambient pool | Blue ambient centered (subtle) |

#### Section 8: CTA RODAPE — Footer CTA
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 (#000000) with blue ambient glow centered |
| Headline | "O custo real de esperar nao e dinheiro. E tempo." — `--text-h2` |
| Subheadline | v2.0 subheadline with competitive urgency |
| CTA | "Agendar uma conversa" → `/agendar` (Primary Hero button) |
| Microcopy | "30 minutos. Um mapa claro..." |
| Hourglass | Medium icon (visual element near headline or above CTA) |
| Animation | Blue ambient glow pulses subtly (ambient float, 10-15s) |

---

### Page 2: BUILDER `/builder` — CEO/Founder Sales Page

**Copy source**: `brain/assets/campaigns/builder-landing/FINAL-builder-landing-copy.md` — use [IMPROVED -- 2026-03-17] v2.0 section (starts at line ~316)

**Architecture (12 sections)**:

```
1. HERO              — Headline + subheadline + body + CTA
2. BENEFICIOS        — 4 benefit blocks (incl. time/hourglass)
3. OBJECOES          — Implicit objection handling
4. PARA QUEM E       — Qualifier
5. PARA QUEM NAO E   — Disqualifier
6. GARANTIA          — Risk reversal
7. CREDIBILIDADE     — Moroni + 40+ projects
8. NURTURE PREVIEW   — Email sequence preview (3 cards)
9. FAQ               — Accordion
10. CTA FINAL        — Closing conversion
11. FLOATING CTA     — Sticky frosted glass CTA bar (mobile)
```

#### Section 1: HERO
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 |
| Headline | v2.0: "Voce investiu em IA e nao viu receita. O problema nao foi a tecnologia — foi a sequencia. E ela tem correcao." — `--text-display` |
| Subheadline | "A maioria das empresas comeca IA pela tecnologia. As que geram receita comecam por uma pergunta diferente. Essa conversa comeca pela pergunta certa." |
| Body | v2.0 hero body (~180 words) with CEO business case analogy, Cemiterio de Prototipos, Revenue-First Framework |
| CTA | "Ver onde IA gera receita no meu negocio" → `/agendar`. Microcopy: "Diagnostico estrategico com Moroni Reis. 30-45 min. Vagas limitadas na agenda." |
| Background | Aurora Background (3 orbs) |
| Animation | Hero stagger entrance |

#### Section 2: BENEFICIOS — 4 Blocks
| Attribute | Value |
|-----------|-------|
| Surface | Surface-1 |
| Bloco 1 | "3 a 5 oportunidades de receita com IA — mapeadas antes de gastar R$1 em tecnologia." |
| Bloco 2 | "A sequencia que enterra o Cemiterio de Prototipos. De vez." |
| Bloco 3 | "Voce no comando da estrategia de IA — sem depender de fornecedor pra decidir." |
| Bloco 4 | "90 dias ate o primeiro resultado mensuravel. 12 meses ate IA virar funcao de negocio." (Hourglass block) |
| Layout | 2x2 grid desktop, stacked mobile |
| Hourglass | Visual hourglass element adjacent to Block 4 |
| Animation | Staggered grid entrance |

#### Section 3: OBJECOES IMPLICITAS
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 |
| Headline | "O que voce provavelmente esta pensando agora." — `--text-h3` |
| Format | FAQ-style accordion OR text blocks. 4 objections with inline responses |
| Content | "Ja tentamos IA antes...", "Quanto tempo ate ver resultado?", "Nao tenho tempo...", "Por que mentoria?" |
| Component | FaqAccordion with exclusive-open behavior (one open at a time) |

#### Section 4: PARA QUEM E
| Attribute | Value |
|-----------|-------|
| Surface | Surface-1 |
| Headline | "Esta conversa e pra voce se:" |
| Content | 6 bullet qualifiers from v2.0 |
| Layout | Text container, max-width 800px |

#### Section 5: PARA QUEM NAO E
| Attribute | Value |
|-----------|-------|
| Surface | Surface-1 (continued) |
| Headline | "Esta conversa nao e pra voce se:" |
| Content | 5 bullet disqualifiers from v2.0 |
| Closing | "Respeito o seu tempo. Se o fit nao existir, eu falo na conversa. Direto. Sem rodeio." |

#### Section 6: GARANTIA
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 |
| Headline | "3 Oportunidades de Receita ou Nao Paramos Ate Encontrar." — `--text-h3` |
| Body | 3 paragraphs expanding the guarantee from v2.0 |
| Card variant | Gradient-border card or Sapphire Scanner for emphasis |
| Signature | Sapphire Scanner rotating border around guarantee card |

#### Section 7: CREDIBILIDADE
| Attribute | Value |
|-----------|-------|
| Surface | Surface-1 |
| Content | Moroni bio from v2.0 (40+ projects, Revenue-First origin, closing that removes pressure) |
| Photo | Sapphire Scanner border on Moroni photo |
| Layout | Two-up (text + photo) |

#### Section 8: NURTURE PREVIEW
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 |
| Content | 3 email previews shown as preview cards (subject line + 1-line preview). NOT full emails |
| Layout | 3-column grid |
| Card variant | Standard cards with subtle border |
| Note | These are teasers, not the full email content |

#### Section 9: FAQ
| Attribute | Value |
|-----------|-------|
| Surface | Surface-1 |
| Component | FaqAccordion with exclusive-open behavior |
| Animation | Open/close: `--ease-out`, 350ms |
| Chevron | Blue accent when open |
| Content | TBD — compile from common objections not covered in Objecoes section |

#### Section 10: CTA FINAL
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 with blue ambient glow |
| Headline | Urgency/time framing from v2.0 |
| CTA | "Ver onde IA gera receita no meu negocio" → `/agendar` |
| Hourglass | Visual element |

#### Section 11: FLOATING CTA (Mobile)
| Attribute | Value |
|-----------|-------|
| Behavior | Sticky bottom bar, appears after scrolling past hero. Frosted glass background |
| CTA text | "Agendar conversa" → `/agendar` |
| Style | Frosted glass (rgba(0,0,0,0.85), blur 20px, saturate 180%). Blue primary button |
| Z-index | `--z-nav` (50) |
| Desktop | Hidden (inline CTAs are sufficient) |

---

### Page 3: SYSTEMS `/systems` — Done-For-You Implementation

**Copy source**: `brain/assets/campaigns/systems/FINAL-systems-copy.md` — use [IMPROVED -- 2026-03-17] v2.0 section (starts at line ~793)

**Architecture (14 sections)**:

```
1. HERO              — Headline + subheadline + body + CTA
2. PROBLEMA          — Problem/agitation with cost stacking
3. IA REVENUE AUDIT  — Audit explanation + 4-step process
4. SERVICOS          — 6 service blocks
5. PROCESSO          — 4 implementation phases
6. BENEFICIOS        — 3 benefit blocks
7. PARA QUEM E       — Qualifier
8. PARA QUEM NAO E   — Disqualifier
9. GARANTIA          — 60-day performance window
10. CREDIBILIDADE    — Moroni + Revenue-First origin
11. FAQ              — Accordion
12. CTA FINAL        — Closing
13. FLOATING CTA     — Sticky (mobile)
```

#### Section 1: HERO
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 |
| Headline | v2.0: "Seu time de vendas gasta 70% do tempo com quem nao vai comprar. Seu suporte responde as mesmas perguntas 200 vezes por dia. Voce sabe que IA resolve isso. So falta quem comece pelo lugar certo." — `--text-display` (may need `--text-h1` if too long) |
| Subheadline | "A Reis IA Systems mapeia onde IA gera receita no seu negocio — e constroi o sistema que entrega. Voce nao toca na tecnologia. So nos resultados." |
| Body | v2.0 hero body (CEO business case, R$200K project failure, Revenue-First Framework) |
| CTA | "Agendar IA Revenue Audit" → `/agendar`. Microcopy: "60 minutos. Relatorio escrito. Sem compromisso de contratacao." |
| Background | Aurora Background |
| Animation | Hero stagger entrance |

#### Section 2: PROBLEMA/AGITACAO
| Attribute | Value |
|-----------|-------|
| Surface | Surface-1 |
| Headline | "Sua empresa fatura R$10M, R$30M, R$50M — e a operacao ainda depende de planilha e boa vontade." — `--text-h2` |
| Content | v2.0 problem section with: sales cost-stacking (R$44.800/month calculation), support cost (R$11.550/month), operational dependency, recognition bullets, hourglass motif paragraph |
| Text Reveal | Headline gets word-by-word text reveal on scroll |
| Ambient pool | Blue pool top-left |
| Hourglass motif | Inline hourglass paragraph: "O tempo nao espera..." |
| Layout | Text container (680px max-width for body) |

#### Section 3: IA REVENUE AUDIT
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 |
| Headline | "Antes de investir um real em IA, saiba onde esta o retorno." — `--text-h2` |
| Content | What happens in 60 minutes, what you receive (4 bullets), value independent of next steps, chess motif |
| 4-Step Process | Sticky Section Scroll technique — pin visual, scroll through 4 steps: Mapeamento → Identificacao → Priorizacao → Entrega |
| Process component | ProcessStep with blue step numbers, connecting line |
| CTA | "Agendar IA Revenue Audit" → `/agendar` |
| Mesh gradient | Background mesh gradient for visual richness |

#### Section 4: SERVICOS — 6 Blocks
| Attribute | Value |
|-----------|-------|
| Surface | Surface-1 |
| Headline | "O que a Reis IA Systems constroi — e o resultado que cada sistema entrega." — `--text-h2` |
| Layout | 2-column grid (2 rows of 3 desktop), stacked mobile |
| Service 1 | Agente de Vendas com IA |
| Service 2 | Sistema de Suporte com IA |
| Service 3 | Automacao Operacional |
| Service 4 | Integracoes de Sistemas |
| Service 5 | Base de Conhecimento Inteligente |
| Service 6 | Solucoes de IA Customizadas |
| Card variant | Standard cards. Each starts with a bold opening line as mini-headline |
| Animation | Staggered grid entrance (100ms per card) |
| Hourglass watermark | Bottom-right, 250px, 3% opacity (ties to time savings narrative) |

#### Section 5: PROCESSO — 4 Phases
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 |
| Headline | "Como funciona um projeto Reis IA Systems." — `--text-h2` |
| Chess motif | Inline: "Cada etapa e intencional." |
| Phase 1 | IA Revenue Audit (Semana 1) |
| Phase 2 | Construcao (Semanas 2-6) |
| Phase 3 | Lancamento e Integracao (Semanas 4-7) |
| Phase 4 | Otimizacao e Garantia (60 dias) |
| Component | ProcessStep with counter animation on step numbers |
| Animation | Step numbers count up (1, 2, 3, 4) with stagger. Content fade-up |

#### Section 6: BENEFICIOS — 3 Blocks
| Attribute | Value |
|-----------|-------|
| Surface | Surface-1 |
| Bloco 1 | Receita Atribuida — "Todo sistema que construimos tem um numero de receita atrelado antes de comecarmos." |
| Bloco 2 | Tempo Devolvido — "Seu time para de fazer o que IA faz melhor." |
| Bloco 3 | Escala sem Headcount — "A pergunta certa nao e 'quantas pessoas preciso contratar pra crescer.'" |
| Layout | 3-column grid |

#### Section 7-8: QUALIFIERS
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 |
| Para quem e | v2.0 qualifier with 6 bold-lead bullets including Status angle: "Voce quer ser o executivo que acertou em IA." |
| Para quem nao e | v2.0 disqualifier with 5 bullets. "Clareza sobre fit poupa tempo dos dois lados." |
| Layout | Text container (800px), clean typography |

#### Section 9: GARANTIA
| Attribute | Value |
|-----------|-------|
| Surface | Surface-1 |
| Headline | "A garantia que nenhum outro fornecedor oferece — porque a maioria nao comeca pelo resultado." — `--text-h3` |
| Content | 60-day Performance Window + Implementation Guarantee (Starter) + closing statement |
| Signature | Sapphire Scanner border on guarantee card |

#### Section 10: CREDIBILIDADE
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 |
| Content | Moroni bio from v2.0 Systems version (revenue background, not tech background) |
| Photo | Sapphire Scanner rotating border |

#### Section 11-12: FAQ + CTA FINAL
| Same pattern as Builder page |

#### Section 13: FLOATING CTA (Mobile)
| Same as Builder but text: "Agendar Audit" → `/agendar` |

---

### Page 4: AGENDAR `/agendar` — Booking Page

**Copy source**: `brain/assets/campaigns/agendar/FINAL-agendar-copy.md` v1.0 (no v2.0 exists — v1.0 scored 9.0/10)

**Architecture (7 sections)**:

```
1. HERO              — Headline + subtext
2. O QUE ESPERAR     — 4 bullets
3. PARA QUEM E       — Quick qualifier
4. COMO FUNCIONA     — 3 steps
5. CALENDARIO        — Cal.com embed
6. TRUST SIGNALS     — Credibility badges
7. WHATSAPP FALLBACK — Alternative CTA
```

#### Section 1: HERO
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 |
| Badge | "Sessao Estrategica Gratuita" (Badge component, blue) |
| Headline | "Antes de investir em IA, saiba exatamente onde esta o retorno." — `--text-h1` |
| Subheadline | "Essa nao e uma call de vendas. E uma sessao de diagnostico onde o Moroni analisa seu negocio e mostra — com clareza — onde IA faz sentido como estrategia de receita. E onde nao faz." |
| Ambient pool | Blue pool top-center (subtle) |
| Animation | Fade-up entrance |

#### Section 2: O QUE ESPERAR
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 (single-bg page) |
| Layout | 4 icon-led blocks in a grid or vertical list |
| Bullet 1 | "Analise do seu modelo de negocio" |
| Bullet 2 | "Mapeamento de oportunidades de IA com impacto em receita" |
| Bullet 3 | "Recomendacoes praticas e proximos passos claros" |
| Bullet 4 | "Sem pitch, sem pressao — a sessao e gratuita" |
| Badges | "30 minutos | Online via Google Meet" |
| Icon style | Blue accent icons (from design system icon set) |

#### Section 3: PARA QUEM E
| Attribute | Value |
|-----------|-------|
| Content | "Pra quem e — e pra quem nao e." Quick qualifier + disqualifier |
| Layout | Two-column (for/not-for) or stacked |

#### Section 4: COMO FUNCIONA
| Attribute | Value |
|-----------|-------|
| 3 Steps | 1. Escolha horario → 2. Questionario rapido (2 min) → 3. Sessao 30 min com Moroni |
| Component | ProcessStep simplified |

#### Section 5: CALENDARIO
| Attribute | Value |
|-----------|-------|
| Content | Cal.com embed (placeholder until real account configured) |
| Signature | Sapphire Scanner rotating border around embed container |
| Note | Blue dashed border placeholder with instructional text |

#### Section 6: TRUST SIGNALS
| Attribute | Value |
|-----------|-------|
| Content | "Mais de 50 implementacoes de IA | Revenue-First Framework | Resultados em 60 dias" |
| Layout | Inline horizontal badges |

#### Section 7: WHATSAPP FALLBACK
| Attribute | Value |
|-----------|-------|
| Content | "Prefere WhatsApp? Se o calendario nao funcionar pro seu horario, mande uma mensagem direta." |
| CTA | "Agendar pelo WhatsApp" — green (#25D366) button for WhatsApp brand compliance |

#### Section 8: SUCCESS MESSAGE (post-booking)
| Content | "Sessao confirmada. Voce recebera um email de confirmacao com o link da reuniao e um breve questionario." |
| Behavior | Shown after Cal.com booking completes |

**Page-level notes**: This is a conversion page. NO advanced animations. NO aurora background. Keep it fast-loading, clear, and frictionless. Only scroll-reveal on sections and form focus transitions.

---

### Page 5: APLICAR `/aplicar` — Builder Application Form

**Copy source**: `brain/assets/campaigns/aplicar/FINAL-aplicar-copy.md` v1.0 (scored 9.0/10)

**Architecture (6 sections)**:

```
1. HERO                   — Headline + badge
2. POR QUE CANDIDATURA    — Justification of selectivity
3. FORMULARIO             — 8 fields with helper text
4. O QUE ACONTECE DEPOIS  — 3 post-submission steps
5. POR QUE O BUILDER      — Trust signals
6. MENSAGEM DE SUCESSO    — Post-submission confirmation
```

#### Section 1: HERO
| Attribute | Value |
|-----------|-------|
| Surface | Surface-0 |
| Badge | "Programa Builder" (Badge component, blue) |
| Headline | "Candidatura para o Programa Builder" — `--text-h1` |
| Subheadline | "O programa pra donos de agencia que querem adicionar IA como linha de receita em 12 semanas. Turmas pequenas. Acompanhamento direto com o Moroni. Primeiro projeto entregue com suporte." |
| Ambient pool | Blue pool top-center (subtle) |

#### Section 2: POR QUE CANDIDATURA
| Attribute | Value |
|-----------|-------|
| Headline | "Por que candidatura (e nao um botao de compra)?" — `--text-h3` |
| Body | "O Moroni trabalha com um numero limitado de agencias por turma — no maximo 12..." |
| Layout | Text container, narrow |

#### Section 3: FORMULARIO
| Attribute | Value |
|-----------|-------|
| Intro | "Leva menos de 3 minutos. Cada pergunta tem um motivo." |
| Fields | 8 fields: Nome, Email, WhatsApp, Empresa/Cargo, Faturamento (select), Maior desafio (textarea), O que te trouxe (optional textarea), Como conheceu (optional select) |
| Submit | "Enviar Candidatura" (Primary button) |
| Microcopy | "Suas informacoes sao confidenciais. Responderemos em ate 48 horas." |
| Input style | Glass inputs (bg white/5, blue focus border rgba(74,144,255,0.5)) |
| Form action | Formspree (placeholder ID — needs real account) |
| Validation | HTML5 required, with blue focus rings. Error states use `--color-error` |

#### Section 4: O QUE ACONTECE DEPOIS
| Attribute | Value |
|-----------|-------|
| 3 Steps | 1. Analise (24-48h) → 2. Conversa WhatsApp → 3. Confirmacao e onboarding |
| Note | "Sem automacao — cada candidatura e lida pelo Moroni" |

#### Section 5: POR QUE O BUILDER (Trust)
| Attribute | Value |
|-----------|-------|
| Items | 4 trust badges: max 12 participantes, revisao pessoal, primeiro projeto com suporte, garantia de devolucao |

#### Section 6: SUCCESS MESSAGE
| Attribute | Value |
|-----------|-------|
| Headline | "Candidatura enviada." |
| Body | Instructions to follow LinkedIn + think about first project |
| CTA | "Voltar para a pagina inicial" → `/` |
| Behavior | Replaces form on successful submission (JS toggle) |

**Page-level notes**: Conversion page. NO advanced animations. Fast, clear, premium-feeling form. Glass-morphism inputs, blue focus states, clean layout.

---

## 2. DESIGN SYSTEM APPLICATION MAP

### 8 New Techniques — Mapped to Pages and Sections

#### Technique 1: Sticky Section Scroll (Apple)
| Page | Section | Implementation |
|------|---------|---------------|
| `/systems` | IA Revenue Audit — 4-Step Process | Pin the left column (visual/step indicator), scroll through 4 steps on right. Each step fades in/out as scroll progresses. Height: 300vh (4 steps). |
| `/builder` | OPTIONAL: Benefit blocks | Consider but may be unnecessary for this page length |

**How it works**: `.sticky-track` container at 300vh height. `.sticky-content` with `position: sticky; top: 0; height: 100vh`. JS tracks scroll progress, activates step content based on progress percentage.

#### Technique 2: Word-by-Word Text Reveal (Apple)
| Page | Section | Headline |
|------|---------|----------|
| `/` | Manifesto | "A maioria das empresas nao esta falhando com IA porque a tecnologia nao funciona. Esta falhando porque comecou pela pergunta errada." |
| `/systems` | Problem section | "Sua empresa fatura R$10M, R$30M, R$50M — e a operacao ainda depende de planilha e boa vontade." |
| `/builder` | OPTIONAL: Hero headline | Only if testing shows improvement over standard fade-up |

**How it works**: `.text-reveal` class with gradient background-clip. Initial: `background-position: 0 0` (text at 20% opacity). On scroll intersection: `background-position: 0 -100%` (text at 100% opacity). Transition: 1.2s `--ease-dramatic`.

#### Technique 3: Floating CTA with Frosted Glass (Porsche)
| Page | Behavior |
|------|----------|
| `/builder` | Mobile only. Sticky bottom bar appears after hero scroll. "Agendar conversa" → `/agendar`. Frosted glass: `rgba(0,0,0,0.85)`, `blur(20px)`, `saturate(180%)`. |
| `/systems` | Mobile only. Same pattern. "Agendar Audit" → `/agendar`. |
| `/` | NOT applied (homepage is routing, not sales) |
| `/agendar` | NOT applied (already on the conversion page) |
| `/aplicar` | NOT applied (already on the conversion page) |

**How it works**: `position: fixed; bottom: 0`. Hidden initially, shown via JS when scroll passes hero section bottom. Glassmorphism background. Primary CTA button inside. `z-index: var(--z-nav)`.

#### Technique 4: FAQ Exclusive-Open Behavior (Morningside)
| Page | Section |
|------|---------|
| `/builder` | FAQ section + Objecoes section |
| `/systems` | FAQ section |

**How it works**: FaqAccordion React component. When one item opens, all others close. State managed by single `openIndex` variable. Blue chevron rotation (0 → 45deg) for open state. Transition: `--ease-out`, 350ms. Max-height animation for smooth expand/collapse.

#### Technique 5: Stagger System with CSS Tokens (Linear)
| Page | Section | Children |
|------|---------|----------|
| `/` | Pilares (4 cards) | 80ms per card, 200ms base delay |
| `/` | Stats (4 blocks) | 100ms per stat |
| `/systems` | Services (6 cards) | 100ms per card |
| `/systems` | Process (4 phases) | 100ms per phase |
| `/builder` | Benefits (4 blocks) | 80ms per block |

**How it works**: `.animate-stagger` parent. Children get `transition-delay: calc(var(--stagger-index) * 80ms + 200ms)`. CSS custom property `--stagger-index` set inline or via nth-child rules.

#### Technique 6: Hardware-Adaptive Rendering (Linear)
| Scope | Implementation |
|-------|---------------|
| Global | All pages |

**How it works**:
1. `prefers-reduced-motion: reduce` — disable ALL animations (already in design system CSS)
2. Low-power device detection (optional): Check `navigator.hardwareConcurrency < 4` and reduce animation complexity (disable aurora, parallax, rotating borders)
3. All animations use `will-change` sparingly — only on elements currently animating
4. `contain: content` on sections to enable browser layout optimization
5. Intersection Observer `unobserve` after triggering to free memory

#### Technique 7: Micro-Interaction Timing (Stripe)
| Element | Duration | Easing |
|---------|----------|--------|
| Button hover (bg + lift) | `--duration-fast` (200ms) | `--ease-base` |
| Card hover (border + bg shift) | `--duration-normal` (300ms) | `--ease-base` |
| Featured card hover (blue glow) | `--duration-moderate` (500ms) | `--ease-card` |
| Nav link hover (color) | 150ms | `--ease-base` |
| Ghost button arrow shift | `--duration-fast` (200ms) | `--ease-base` |
| Form input focus ring | `--duration-fast` (200ms) | `--ease-base` |
| FAQ accordion open/close | 350ms | `--ease-out` |
| Button press (active) | 50ms | linear |

**Applied globally**: Every interactive element must use the design system's easing curves and duration tokens. No default `ease` or `ease-in-out`. No arbitrary duration values.

#### Technique 8: Tab Sliding Indicator (Morningside)
| Page | Section |
|------|---------|
| Currently none planned | Reserve for future use if tabbed content is added |
| POTENTIAL: `/systems` | Service blocks could be organized as tabs on mobile (6 services → tab interface) |

**How it works**: Active tab has a sliding blue underline indicator. `position: absolute; bottom: 0`. Width and left position animate to match the active tab's dimensions. Transition: `--ease-out`, 300ms. Use `Element.getBoundingClientRect()` to get tab dimensions.

---

## 3. COPY INTEGRATION PLAN

### Page `/` — Homepage

| Copy Section (from FINAL v2.0) | Page Section | Hierarchy | Notes |
|--------------------------------|-------------|-----------|-------|
| Headline Principal | Hero H1 | `--text-display` | Two lines. Line break after "tecnologia." |
| Subheadline (rewritten 18 words) | Hero subtext | `--text-body-lg`, text-secondary | Single line on desktop |
| Hero Body Copy (37 words) | Hero body | `--text-body`, max-width 680px | 91% stat as credibility anchor |
| CTAs + Microcopy | Hero buttons | Primary-hero + Secondary | Microcopy in `--text-micro` |
| Manifesto headline | Manifesto H2 | `--text-h2` | Two lines |
| Manifesto body (~138 words) | Manifesto body | `--text-body-lg` | 7 paragraphs, bold closing pair |
| Pillar section headline | Pilares H2 | `--text-h2` | |
| 4 Card titles + bodies + bullets + CTAs | 4 pillar cards | Card title: `--text-h4`. Body: `--text-body`. Bullets: `--text-body-sm` | |
| Stats headline + subheadline | Stats section header | H2 + body-lg | |
| 4 Stats (value + label + context + source) | StatBlock components | Value: 56px. Label: `--text-caption`. Context: `--text-body-sm`. Source: `--text-micro` | |
| Founder headline + body (~147 words) | Founder section | H3 + body | Two-up layout |
| Caminhos headline | Caminhos H2 | `--text-h2` | |
| 2 Cards (identifiers + bodies + CTAs) | Self-selection cards | H4 + body | Glass cards |
| Network soft CTA | Below cards | `--text-body`, text-secondary | |
| Newsletter headline + description + form | Newsletter section | H3 + body-sm | Centered |
| Footer CTA headline + subheadline + CTA | Footer CTA | H2 + body-lg | Blue ambient glow |
| Meta tags | `<head>` | Title + meta description + OG | |

### Page `/builder` — Builder

| Copy Section (from FINAL v2.0) | Page Section | Hierarchy | Notes |
|--------------------------------|-------------|-----------|-------|
| Headline + 5 variations | Hero H1 | `--text-display` or `--text-h1` (headline is long — test both) | Use v2.0 principal. Store variations for A/B testing |
| Subheadline | Hero subtext | `--text-body-lg` | |
| Hero Body (~180 words) | Hero body | `--text-body`, max 680px | Multiple paragraphs |
| CTA + 3 variations | Hero + repeated through page | Primary-hero button | |
| 4 Benefit Blocks | Benefits section | Block title: `--text-h4` bold. Body: `--text-body` | Block 4 has hourglass visual |
| Objecoes (4 Q&As) | Objection section | Q: `--text-h5` bold. A: `--text-body` | FAQ-style or text blocks |
| Para Quem E (6 bullets) | Qualifier | Body bullets | Dash-prefixed list |
| Para Quem Nao E (5 bullets) | Disqualifier | Body bullets | |
| Garantia (3 paragraphs) | Guarantee card | H3 + body | Sapphire Scanner border |
| Credibilidade (Moroni bio) | Credibility section | Body, two-up with photo | |
| 3 Email Previews | Nurture preview | Card title: email subject line. Body: first line | Show as preview cards only |
| Email sequence (3 full emails) | NOT on page | Email platform only | Implement in email automation, not on page |
| Meta tags | `<head>` | | |

### Page `/systems` — Systems

| Copy Section (from FINAL v2.0) | Page Section | Hierarchy | Notes |
|--------------------------------|-------------|-----------|-------|
| Headline + 5 variations | Hero H1 | `--text-display` or `--text-h1` | v2.0 principal is 3 lines — may need `--text-h1` |
| Subheadline + variation B | Hero subtext | `--text-body-lg` | |
| Hero Body (4 paragraphs) | Hero body | `--text-body`, max 680px | |
| CTA + 3 variations | Repeated through page | | |
| Problem/Agitation (long section) | Problem section | H2 + body | Cost-stacking with R$ numbers. Truncate for mobile: hide detailed calculations, show summary |
| IA Revenue Audit section | Audit section | H2 + body + 4 steps + bullets | Sticky scroll for 4 steps on desktop |
| 6 Service Blocks | Services grid | Per-service: bold opening line as mini-title, body paragraph, result line | |
| 4 Process Phases | Process section | H2 + ProcessStep components | |
| 3 Benefit Blocks | Benefits section | H4 + body per block | |
| Qualifier (6 bold-lead bullets) | Qualifier section | Bold lead + body per bullet | |
| Disqualifier (5 bullets) | Disqualifier section | | |
| Guarantee (2 tiers + explanation) | Guarantee section | H3 + body | |
| Credibility (Moroni bio) | Credibility section | Body + photo | |
| 3 Emails | NOT on page | Email platform | |
| Final CTA + hourglass | Final CTA section | H2 + body + CTA | |
| Meta tags | `<head>` | | |

### Responsive Copy Adaptation

| Pattern | Mobile Treatment |
|---------|-----------------|
| Long problem section (Systems) | Hide detailed R$ calculations. Show summary: "Seu time gasta 70% do tempo com quem nao vai comprar." Keep the punch, cut the math |
| 6 service blocks | Stack in single column. Consider accordion or "show more" for blocks 4-6 |
| 4-step process (sticky scroll) | Collapse to simple vertical timeline (no sticky behavior on mobile) |
| Email preview cards | Horizontal scroll-snap carousel |
| Stats with long context labels | Context labels become single-line; full context available on tap/expand |

---

## 4. COMPONENT INVENTORY

### From `reis-ia-brand/src/components/` — Transferable to Main Site

| Component | Transfer? | Notes |
|-----------|-----------|-------|
| AccordionDemo.tsx | ADAPT | Extract accordion logic, strip demo UI. Use as basis for FaqAccordion |
| AmbientPoolDemo.tsx | EXTRACT | Extract the ambient pool CSS/animation, create AmbientPool.astro wrapper |
| AuroraDemo.tsx | EXTRACT | Extract aurora CSS, create AuroraBackground.astro |
| CounterDemo.tsx | EXTRACT | Extract counter animation logic for StatBlock |
| GradientBorderGlowDemo.tsx | REFERENCE | Use as reference for gradient border implementation |
| MeshGradientDemo.tsx | EXTRACT | Extract mesh gradient CSS for Systems Audit section |
| RotatingBorderDemo.tsx | EXTRACT | Extract Sapphire Scanner implementation for SapphireScanner.astro |
| ScrollRevealDemo.tsx | EXTRACT | Extract IntersectionObserver pattern for scroll-animations.js |
| StaggerGridDemo.tsx | EXTRACT | Extract stagger CSS for animate-stagger classes |
| TextRevealDemo.tsx | EXTRACT | Extract text-reveal CSS for manifesto/problem headlines |
| WatermarkDemo.tsx | EXTRACT | Extract watermark positioning for HourglassWatermark.astro |
| Footer.astro | ADAPT | Adapt structure, update copy to PT-BR |
| Header.astro | ADAPT | Adapt nav structure |
| Logo.astro | REUSE | H1-B hourglass SVG — use directly |
| SectionLabel.astro | REUSE | Update color to blue accent |

### From Current `reis-ia-website/src/components/` — Carry-Over Assessment

| Component | Status | Action |
|-----------|--------|--------|
| Badge.astro | REWRITE | New implementation per design system spec |
| Button.astro | REWRITE | Blue bg, white text, 5 variants per spec |
| ChessKnightIcon.astro | DISCARD | Chess pieces permanently discarded |
| FaqAccordion.tsx | REWRITE | Add exclusive-open behavior, blue accent, design system tokens |
| Footer.astro | REWRITE | New structure per implementation guide |
| HighlightBanner.astro | EVALUATE | May not be needed in new architecture |
| HourglassIcon.astro | ADAPT | Keep SVG, add watermark variant (large, 3-4% opacity) |
| LogoMarquee.astro | REWRITE | Update edge fades to Surface-0, correct animation tokens |
| Nav.astro | REWRITE | Blue CTA, glassmorphism on scroll, mobile menu |
| SectionLabel.astro | REWRITE | Blue accent text per spec |
| StatBlock.astro | REWRITE | Blue accent, counter animation, tabular-nums |
| TestimonialBlock.astro | REWRITE | Blue left border per spec |
| icons/ | EVALUATE | Check which icons exist; may need hourglass variants |

### New Components Needed

| Component | Description | Used On | Priority |
|-----------|-------------|---------|----------|
| **SapphireScanner.astro** | Wrapper with rotating blue conic-gradient border (8s cycle) | Home (Builder card, founder photo), Builder (guarantee), Systems (guarantee), Agendar (Cal.com embed) | P1 |
| **AmbientPool.astro** | Positioned radial gradient with optional float animation | Multiple sections across all 3 narrative pages | P1 |
| **HourglassWatermark.astro** | Large (120-300px) hourglass SVG at 3-5% opacity, absolutely positioned | Home (Stats, Founder), Builder (Benefits), Systems (Services) | P1 |
| **AuroraBackground.astro** | 3-orb slow-moving gradient for hero sections | Home Hero, Builder Hero, Systems Hero | P1 |
| **Section.astro** | Configurable section wrapper (surface, padding, container, lightPool) | All pages, every section | P1 |
| **FloatingCTA.astro** | Sticky bottom bar with frosted glass for mobile | Builder, Systems | P2 |
| **MeshGradient.astro** | Multi-point radial gradient background | Systems (Audit section) | P2 |
| **SectionTransition.astro** | Gradient overlay between sections | All pages | P3 |
| **SkipToContent.astro** | Accessibility skip link | MainLayout | P2 |
| **ProcessStep.astro** | Step number + title + description with connector line | Systems (Process), Agendar (Como Funciona) | P1 |
| **Card.astro** | Multi-variant card (standard, accented, glass, gradient-border, rotating-border) | All pages | P1 |
| **GlassInput.astro** | Form input with glass styling and blue focus | Agendar, Aplicar | P1 |

### Component Dependency Map

```
MainLayout.astro
  ├── Nav.astro
  ├── SkipToContent.astro
  ├── Section.astro (wraps all content sections)
  │   ├── AmbientPool.astro (decorative, per-section)
  │   ├── HourglassWatermark.astro (decorative, select sections)
  │   └── SectionTransition.astro (between sections)
  ├── AuroraBackground.astro (hero sections only)
  ├── Card.astro
  │   └── SapphireScanner.astro (variant wrapper)
  ├── Button.astro (all CTAs)
  ├── Badge.astro (section labels)
  ├── StatBlock.astro (stats sections)
  ├── ProcessStep.astro (process sections)
  ├── TestimonialBlock.astro (testimonial sections)
  ├── FaqAccordion.tsx (FAQ sections — React island)
  ├── FloatingCTA.astro (sales pages mobile)
  ├── LogoMarquee.astro (optional)
  ├── GlassInput.astro (form pages)
  └── Footer.astro
```

---

## 5. AGENT ASSIGNMENT

### Dev Agent (Sonnet 4.6) — All Implementation

**Responsibilities**:
- Build all Astro pages, React components, and Tailwind styling
- Implement design system CSS custom properties and Tailwind config
- Implement all animations (scroll, hover, entrance, ambient)
- Implement form logic (Formspree, Cal.com placeholder)
- Implement responsive layouts
- Implement accessibility (skip-to-content, focus states, aria, reduced-motion)
- Performance optimization (lazy loading, font loading, asset optimization)

**Input**: This plan + design system files + implementation guide + copy files
**Scope**: `reis-ia-website/src/`, `reis-ia-website/public/`, `reis-ia-website/package.json`, `reis-ia-website/astro.config.mjs`, `reis-ia-website/tailwind.config.mjs`

### Designer Agent (Opus 4.6) — Design Decisions Not Covered

**Responsibilities**:
- Resolve any visual ambiguities during build (spacing judgment calls, icon selection)
- Review page screenshots for visual quality
- Specify any missing component details
- Validate Sapphire Scanner, Aurora, and ambient pool visual quality

**When called**: Only when dev-agent encounters a design decision not covered by this plan or the design system

### Copy Agent (Sonnet) — Copy Adjustments During Build

**Responsibilities**:
- Adapt copy for responsive (truncation, mobile-friendly versions)
- Write any micro-copy not covered in FINAL files (aria-labels, alt text, error messages)
- Write FAQ content for Builder and Systems pages (not yet created)
- Review PT-BR quality of implemented copy

**When called**: Only when copy gaps are discovered during implementation

### QA Responsibilities

| QA Area | Primary | Secondary |
|---------|---------|-----------|
| Responsive (375px, 768px, 1024px, 1280px, 1440px) | Dev Agent | Designer Agent (visual review) |
| Accessibility (WCAG AA, focus states, screen reader) | Dev Agent | — |
| Performance (Lighthouse 90+) | Dev Agent | — |
| Cross-page consistency | Designer Agent | Dev Agent |
| Copy accuracy (PT-BR, no anglicisms, no gold refs) | Copy Agent | Orchestrator |
| CTA routing (all → /agendar or /aplicar) | Dev Agent | Orchestrator |

---

## 6. BUILD PHASES

### Phase 1: Foundation
**What's built**: Layout, global CSS, design system tokens, Tailwind config, shared components, navigation, footer
**Files created/modified**:
- `src/styles/design-system.css` — All CSS custom properties (NEW)
- `src/styles/animations.css` — All animation classes (NEW)
- `src/styles/global.css` — Minimal global styles (REWRITE)
- `tailwind.config.mjs` — Full design system theme (REWRITE)
- `tailwind-plugins/reis-ia.js` — Custom plugin (NEW)
- `src/layouts/MainLayout.astro` — Base layout with grain, font loading, scripts (REWRITE)
- `src/components/Nav.astro` — Navigation with glassmorphism (REWRITE)
- `src/components/Footer.astro` — Footer with blue accent (REWRITE)
- `src/components/Button.astro` — 5 variants (REWRITE)
- `src/components/Badge.astro` — Blue accent (REWRITE)
- `src/components/Section.astro` — Configurable section wrapper (NEW)
- `src/components/Card.astro` — Multi-variant card (NEW)
- `src/components/SapphireScanner.astro` — Rotating border (NEW)
- `src/components/AmbientPool.astro` — Light pool (NEW)
- `src/components/HourglassWatermark.astro` — Watermark (NEW)
- `src/components/AuroraBackground.astro` — Hero aurora (NEW)
- `src/components/SkipToContent.astro` — Accessibility (NEW)
- `src/scripts/scroll-animations.js` — IntersectionObserver (REWRITE)
- `src/scripts/nav-scroll.js` — Nav glassmorphism (REWRITE)
- `public/fonts/` — Inter Variable self-hosted (NEW or verify existing)

**Estimated complexity**: HIGH — this is the largest phase. All subsequent phases depend on it.
**Approval gate**: Dev agent builds a test page using all foundation components. Orchestrator reviews for design system compliance.

### Phase 2: Home Page
**What's built**: Complete homepage with all 8 sections
**Files created/modified**:
- `src/pages/index.astro` — Full homepage (REWRITE)
- `src/components/StatBlock.astro` — With counter animation (REWRITE)
- `src/components/SectionLabel.astro` — Blue accent (REWRITE)
- `src/components/LogoMarquee.astro` — If used (EVALUATE)

**Copy source**: `campaigns/homepage/FINAL-homepage-copy.md` — v2.0 section
**Estimated complexity**: HIGH — most sections, most visual variety
**Approval gate**: Full page review at desktop and mobile widths. Verify all CTAs route correctly. Check surface alternation, signature elements, animation timing.

### Phase 3: Builder Page
**What's built**: Complete Builder sales page with all 12 sections
**Files created/modified**:
- `src/pages/builder.astro` — Full Builder page (REWRITE)
- `src/components/FaqAccordion.tsx` — With exclusive-open behavior (REWRITE)
- `src/components/FloatingCTA.astro` — Mobile sticky bar (NEW)

**Copy source**: `campaigns/builder-landing/FINAL-builder-landing-copy.md` — v2.0 section
**Estimated complexity**: HIGH — long-form sales page with many sections
**Approval gate**: Full page review. Verify guarantee card Sapphire Scanner. Check FAQ exclusive-open. Test floating CTA on mobile.

### Phase 4: Systems Page
**What's built**: Complete Systems sales page with all 14 sections
**Files created/modified**:
- `src/pages/systems.astro` — Full Systems page (REWRITE)
- `src/components/ProcessStep.astro` — Step component (NEW)
- `src/components/MeshGradient.astro` — If used (NEW)

**Copy source**: `campaigns/systems/FINAL-systems-copy.md` — v2.0 section
**Estimated complexity**: HIGHEST — longest page, sticky scroll technique, cost-stacking section, 6 service blocks
**Approval gate**: Full page review. Test sticky scroll on desktop. Verify 6 service blocks don't overwhelm mobile. Check all R$ numbers match copy source.

### Phase 5: Agendar + Aplicar Pages
**What's built**: Both conversion pages
**Files created/modified**:
- `src/pages/agendar.astro` — Booking page (REWRITE)
- `src/pages/aplicar.astro` — Application form (REWRITE)
- `src/components/GlassInput.astro` — Form inputs (NEW)

**Copy sources**: `campaigns/agendar/FINAL-agendar-copy.md` + `campaigns/aplicar/FINAL-aplicar-copy.md` (both v1.0)
**Estimated complexity**: MEDIUM — simpler pages, but form logic needs care
**Approval gate**: Test form submissions (Formspree placeholder). Verify Cal.com embed area. Test WhatsApp fallback link. Check form validation states.

### Phase 6: Polish
**What's built**: Responsive audit, accessibility, performance, cross-page consistency
**Tasks**:
1. Responsive audit at 375px, 768px, 1024px, 1280px, 1440px
2. Fix any responsive issues found
3. Accessibility audit: skip-to-content, focus states, aria attributes, contrast ratios, screen reader test
4. Performance audit: Lighthouse 90+ target on Performance and Accessibility
5. Cross-page consistency: verify Nav, Footer, Button, Badge render identically across all 5 pages
6. Surface alternation audit: verify all sections follow S0/S1 pattern
7. Blue accent audit: max 2 blue elements per viewport at any scroll position
8. `prefers-reduced-motion` verification: all animations disabled
9. Copy accuracy: final pass comparing implemented text against FINAL copy files
10. CTA routing: every button and link verified
11. Meta tags: title, description, OG tags on all 5 pages
12. Favicon: H1-B hourglass as favicon (if not already set)

**Estimated complexity**: MEDIUM — but critical for quality
**Approval gate**: Lighthouse scores submitted. Screenshots at all breakpoints. Accessibility report.

### Phase Dependencies

```
Phase 1 (Foundation) ──────────────────┐
                                        │
Phase 2 (Home) ─────────────────────────┤
                                        │
Phase 3 (Builder) ──────────────────────┤ (can start after Phase 1)
                                        │
Phase 4 (Systems) ──────────────────────┤ (can start after Phase 1)
                                        │
Phase 5 (Agendar + Aplicar) ────────────┤ (can start after Phase 1)
                                        │
Phase 6 (Polish) ───────────────────────┘ (requires all above)
```

Phases 2-5 can technically run in parallel after Phase 1, but sequential execution is recommended to catch component issues early (Phase 2 → 3 → 4 → 5).

---

## 7. WHAT CARRIES OVER VS. WHAT'S NEW

### Carries Over (Reusable)

| Asset | From | Status |
|-------|------|--------|
| Astro framework setup | reis-ia-website | Keep astro.config.mjs structure, update deps |
| React island pattern | reis-ia-website | FaqAccordion as React island — same pattern |
| HourglassIcon SVG paths | reis-ia-website/src/components/HourglassIcon.astro | Extract SVG, use in watermark and icon contexts |
| IntersectionObserver scroll pattern | reis-ia-website (existing) | Rewrite with design system tokens |
| Formspree form action | aplicar.astro | Keep placeholder pattern |
| Cal.com embed placeholder | agendar.astro | Keep placeholder pattern |
| WhatsApp CTA pattern | agendar.astro | Keep green button pattern |
| Brand site component demos | reis-ia-brand/src/components/ | Extract CSS/animation code, not the demo UI |
| H1-B Hourglass SVG (refined) | reis-ia-brand / design-previews | Use Variation A, size-optimized |
| Design system CSS properties | Implementation guide | Copy directly |
| Tailwind config | Implementation guide | Copy directly |
| Animation classes | Implementation guide | Copy directly |

### Gets Completely Rewritten

| Asset | Reason |
|-------|--------|
| All 5 page files (.astro) | New copy v2.0, new design system, new section architecture |
| global.css | Gold → blue, new surface values, new tokens |
| tailwind.config.mjs | Full design system theme extension |
| MainLayout.astro | New structure, grain overlay, font loading, scripts |
| Nav.astro | Blue CTA, glassmorphism, Surface-0 base |
| Footer.astro | Blue accent, correct surfaces |
| Button.astro | Blue bg/white text, 5 variants |
| All other components | New implementations per design system spec |

### Brand New (Never Existed Before)

| Asset | Description |
|-------|-------------|
| design-system.css | Complete CSS custom properties file |
| animations.css | All animation classes |
| SapphireScanner.astro | Rotating blue border wrapper |
| AmbientPool.astro | Light pool component |
| HourglassWatermark.astro | Watermark component |
| AuroraBackground.astro | Hero aurora effect |
| Section.astro | Configurable section wrapper |
| Card.astro | Multi-variant card |
| FloatingCTA.astro | Mobile sticky bar |
| MeshGradient.astro | Multi-point gradient bg |
| SkipToContent.astro | Accessibility |
| ProcessStep.astro | Step + connector |
| GlassInput.astro | Form input |
| reis-ia Tailwind plugin | Custom utilities/components |
| Agendar copy (FINAL) | New dedicated copy for booking page |
| Aplicar copy (FINAL) | New dedicated copy for application page |
| All v2.0 copy | Improved versions of homepage, builder, systems |

---

## 8. CRITICAL RULES REMINDER

These rules are NON-NEGOTIABLE. Every agent, every phase, every file must comply.

### Language
- All user-facing copy in PT-BR (native Brazilian Portuguese, not translated)
- "IA" not "AI" in all user-facing copy
- No anglicisms where PT-BR equivalents exist (e.g., "funis" not "funnels", "receita" not "revenue")

### Brand
- **Blue #4A90FF accent ONLY** — no gold, no amber, no warm colors anywhere
- **H1-B Hourglass is the ONLY brand mark** — use Variation A, size-optimized
- "Reis IA" wordmark uses font-weight 300 in lockups
- No chess pieces or crowns as brand marks (chess metaphor is text-only)
- No Azure Whisper / Blue Shimmer Text effect (permanently discarded)

### Conversion
- **Every CTA routes to `/agendar` or `/aplicar`** — no dead links, no other conversion paths
- **No pricing tables, tier cards, or SaaS-style patterns** — this is a high-ticket consultancy
- No self-serve checkout, no plan comparison, no monthly/annual toggles
- No "free trial", "sign up", "login" patterns

### Visual
- **Dark mode ONLY** — Surface-0 (#000000) as page base
- Surface alternation: sections alternate between Surface-0 and Surface-1
- Max 2 blue accent elements per viewport at any scroll position
- Blue = conversion signal. If it's blue, it must be actionable
- Max body text width: 680px. Max headline width: 900px

### Technical
- **Mobile-first responsive** — design for 375px first, scale up
- **`prefers-reduced-motion` support** — all animations must be disabled
- Target **Lighthouse 90+** on Performance and Accessibility
- `text-wrap: balance` on all headings, `text-wrap: pretty` on body text
- `font-variant-numeric: tabular-nums` on all stat displays
- Touch targets: minimum 44x44px on mobile
- All decorative elements: `aria-hidden="true"`, `pointer-events: none`

### File Management
- Preserve all originals in `brain/assets/copy/` — append only with [ADDED] tags
- Backup before any modification (see Section 9)
- Changelog at bottom of any modified file

---

## 9. BACKUP INSTRUCTIONS

### Before Phase 1 Begins

**Backup location**: `reis-ia-website/backups/pre-full-rebuild/`

**What to backup**:
```
reis-ia-website/src/           → backups/pre-full-rebuild/src/
reis-ia-website/public/        → backups/pre-full-rebuild/public/
reis-ia-website/package.json   → backups/pre-full-rebuild/package.json
reis-ia-website/astro.config.mjs → backups/pre-full-rebuild/astro.config.mjs
reis-ia-website/tailwind.config.mjs → backups/pre-full-rebuild/tailwind.config.mjs (if exists)
```

**README.md for backup folder**:
```markdown
# Pre-Full-Rebuild Backup

Date: 2026-03-17
Description: Complete backup of reis-ia-website before full rebuild with new copy v2.0, new design system (blue accent), and new brand identity (H1-B hourglass only).

## What Changed After This Backup
- All 5 pages rewritten from scratch
- Gold accent (#C9A84C) replaced with blue (#4A90FF)
- All components rewritten to design system spec
- New copy from Copy Squad pipeline v2.0
- Chess knight icon removed (brand marks: hourglass only)
- New signature elements: Sapphire Scanner, Ambient Pools, Hourglass Watermarks, Aurora Background
```

**When to backup**: BEFORE the first file in Phase 1 is created or modified. The Orchestrator must verify the backup exists before authorizing Phase 1 execution.

---

## Changelog

| Date | Change |
|------|--------|
| 2026-03-17 | Initial site rebuild plan created. All 9 sections complete. Ready for execution. |
