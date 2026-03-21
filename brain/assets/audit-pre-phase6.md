# Auditoria Pre-Phase 6 — Consolidacao Total

Last updated: 2026-03-20
Owner: analysis-agent
Status: Completo

---

## A) Brandbook — Status por Pagina

O brandbook (`reis-ia-brand/`) contem 26 paginas (1 index + 25 pages). Todas as paginas foram lidas e analisadas.

### Tabela de Status

| Pagina | Rota | Versao Conceitual | VFX Integrados | Interatividade | Cor Correta | PT-BR | Status |
|--------|------|-------------------|----------------|----------------|-------------|-------|--------|
| Index | `/` | Parcial — sem Z7, sem Time Builders, sem "O Tempo e Rei" | Ambient glow | Hover cards | SIM (#4A90FF) | NAO (EN) | PRECISA ATUALIZAR |
| Foundations | `/brandbook/foundations` | DS tokens — OK | N/A (token page) | Click-to-copy, live demos | SIM | NAO (EN) | OK |
| Strategy | `/brandbook/strategy` | Pre-v3.0 — nao menciona Z7, Time Builders, "O Tempo e Rei", Governante/Heroi/Rebelde | Ambient glow | Rotating border cards | SIM | NAO (EN) | PRECISA ATUALIZAR |
| Logo | `/brandbook/logo` | H1-B Hourglass — correto | N/A | N/A | SIM | NAO (EN) | OK |
| Icons | `/brandbook/icons` | Lucide system — OK | N/A | Grid icons | SIM | NAO (EN) | OK |
| Moodboard | `/brandbook/moodboard` | Apple/Porsche/Linear refs — OK | N/A | N/A | SIM | NAO (EN) | OK |
| Guidelines | `/brandbook/guidelines` | Pre-v3.0 — sem Z7, sem "O Tempo e Rei", sem arquetipos v3.0 | N/A | Hover cards | SIM | NAO (EN) | PRECISA ATUALIZAR |
| Spacing Scale | `/brandbook/spacing-scale` | DS tokens — OK | N/A | Visual rulers | SIM | NAO (EN) | OK |
| Surfaces | `/brandbook/surfaces` | DS tokens — OK | N/A | Interactive demos | SIM | NAO (EN) | OK |
| Semantic Tokens | `/brandbook/semantic-tokens` | DS tokens — OK | N/A | Click-to-copy | SIM | NAO (EN) | OK |
| Effects | `/brandbook/effects` | 6 efeitos com demos ao vivo | Sapphire Scanner, Ambient Pool, Watermark, Grain, Glassmorphism, Surface Depth | Sliders, toggles, code blocks | SIM | NAO (EN) | OK |
| Patterns | `/brandbook/patterns` | Card/section patterns | Hairline grid | Code demos | SIM | NAO (EN) | OK |
| Motion | `/brandbook/motion` | Easing, durations, scroll reveal | Easing demos, stagger grid | Click-to-replay, sliders | SIM | NAO (EN) | OK |
| VFX | `/brandbook/vfx` | 8 efeitos avancados | Aurora, Mesh, Parallax, Text Reveal, Counter, Magnetic, Gradient Border, Section Transition | Sliders, replay, hover demos | SIM | NAO (EN) | OK |
| Components | `/brandbook/components` | Catalog overview | N/A | Navigation grid | SIM | NAO (EN) | OK |
| Buttons | `/brandbook/buttons` | Button variants | N/A | Live demos | SIM | NAO (EN) | OK |
| Cards | `/brandbook/cards` | Card variants | Rotating border | Hover states | SIM | NAO (EN) | OK |
| Forms | `/brandbook/forms` | Form elements | N/A | Validation demos | SIM | NAO (EN) | OK |
| Sections | `/brandbook/sections` | Section patterns | N/A | Layout demos | SIM | NAO (EN) | OK |
| Advanced | `/brandbook/advanced` | Accordion, tabs, marquee | Marquee animation | Interactive demos | SIM | NAO (EN) | OK |
| Company Brand | `/brandbook/company-brand` | **v3.0** — "O Tempo e Rei", Kapferer, arquitetura completa | Accent border | Hover cards | SIM | **SIM (PT-BR)** | OK |
| Personal Brand | `/brandbook/personal-brand` | **v3.0** — Governante/Heroi/Rebelde, Moroni persona | Layer badge #6AADFF | Hover cards | SIM | **SIM (PT-BR)** | OK |
| Time Builders | `/brandbook/movement` | **v3.0** — Z7, causa, tribo, viloes, manifesto, rituais, niveis | Layer badge #2D7AFF, Z7 visual | Hover cards | SIM (#2D7AFF, #00B4FF) | **SIM (PT-BR)** | OK |
| Products | `/brandbook/products` | **v3.0** — Z7 Hours/Days/Months, 7 Stages, Systems products | Dual badges, DS ref | N/A | SIM (#2D7AFF, #00B4FF) | **SIM (PT-BR)** | OK |
| Templates | `/brandbook/templates` | 3 page templates | Code previews | TemplatePreview component | SIM | NAO (EN) | OK |
| SEO | `/brandbook/seo` | Meta, OG, structured data | N/A | N/A | SIM | NAO (EN) | OK |

### Resumo Quantitativo

- **Paginas OK**: 22/25 (88%)
- **Paginas que precisam atualizar**: 3 — index, strategy, guidelines
- **Paginas em PT-BR**: 4 (company-brand, personal-brand, movement, products) — as 4 novas ecosystem pages
- **Paginas em EN**: 22 (as paginas do DS sao tecnicas, EN e correto)
- **Cores corretas em todas**: SIM — nenhuma pagina usa gold/amber/terracotta

### Elementos Faltando no Brandbook

**1. VFX da Ampulheta (8 efeitos do hourglass-vfx-preview) — NAO INTEGRADOS**
Os 8 efeitos de VFX da ampulheta (sand flow, time pulse, hourglass flip, etc.) criados no hourglass-vfx-preview NAO estao presentes em nenhuma pagina do brandbook. Precisam ser adicionados como uma secao na pagina `/brandbook/vfx` ou como uma pagina propria.

**2. Z7 Visual System (14 SVGs, animacoes) — NAO INTEGRADO**
O sistema visual Z7 com 14 SVGs e animacoes existe como preview isolado (`design-previews/z7-visual-preview.html`) mas NAO foi integrado ao brandbook. Os SVGs Z7 nao aparecem em nenhuma pagina .astro.

**3. Loading Animations (7 rotacoes + 7 Z->7 sequences) — NAO INTEGRADAS**
As animacoes de loading do Z7 (rotacao e sequencias de morphing Z→7) nao foram integradas ao brandbook.

**4. Systems Agent Visuals (constelacao, organograma, dashboard, 4 icones) — NAO INTEGRADOS**
Os visuais de agentes Systems (constellation, org chart, dashboard, icons) existem em previews mas nao foram integrados ao brandbook.

**5. Global Branding Elements — NAO INTEGRADOS**
- Tipografia cinetica (kinetic type treatments)
- FOMO visual elements
- Compressao 7:7 visual demos
- Contraste vilao/heroi visual representations

**6. Creative Direction Brief Ideas — NAO IMPLEMENTADAS**
O brief em `brain/assets/branding/creative-direction-brief.md` contem 4 briefs criativos detalhados que ainda nao foram implementados:
- Macro-interacoes
- Micro-interacoes
- Motion storytelling
- Tipografia como experiencia

**7. Paginas que o AIOX tem e nos nao temos:**
- `/brandbook/feedback` — Alerts, toasts, modals, sheets
- `/brandbook/states` — Spinners, progress, skeletons
- `/brandbook/tables` — Standard + compact metrics
- `/brandbook/lists` — Status lists + KPI cards
- `/brandbook/charts` — Chart library
- `/brandbook/lp-sections` — LP section catalog
- `/brandbook/editorial` — Editorial spreads
- `/brandbook/layering` — Z-index + breakpoints (nos temos isso dentro de semantic-tokens)
- `/brandbook/token-export` — Copy-paste theme tokens

---

## B) Agentes — Status

Total de agentes: 20

| Agente | Conhece Z7 | Conhece DS Azul | Sem Descartados | Status |
|--------|-----------|-----------------|-----------------|--------|
| orchestrator | SIM — menciona Z7, Time Builders | SIM — #4A90FF, proibe gold | SIM — proibe chess/crown/gold explicitamente | OK |
| dev-agent | **NAO** | **NAO** — diz "Muted gold / warm amber" na L58 | **NAO** — menciona chess piece como obrigatorio na L71 | **PRECISA ATUALIZAR** |
| designer-agent | **NAO** | **NAO** — diz "Muted gold / warm amber" na L38 | **NAO** — Chess Piece como elemento obrigatorio L61-68, "Accent gold" L57, L65 | **PRECISA ATUALIZAR** |
| direct-response-copywriter | PARCIAL — tem Hormozi framework | N/A (copy agent) | OK | OK |
| cmo-strategist | N/A (strategy) | N/A | OK | OK |
| analysis-agent | N/A | N/A | OK | OK |
| execution | N/A | N/A | OK | OK |
| executor-agent | N/A | N/A | OK | OK |
| brand-site-builder | SIM — conhece blue palette | SIM — proibe gold/chess/crown | SIM | OK |
| logo-brand-mark-designer | **PARCIAL** | **NAO** — L42 diz "accent muted gold/warm amber" | **NAO** — L41 menciona Chess piece, L56 "Negative Space Knight" | **PRECISA ATUALIZAR** |
| design-system-extractor | **NAO** | **NAO** — L110/120 diz "black/white/gold palette", "hourglass and chess motifs" | **NAO** — menciona chess motifs como referencia | **PRECISA ATUALIZAR** |
| creative-director | **SIM** — Z7, "O Tempo e Rei" | **PARCIAL** — diz "Azul" genericamente mas nao tem hex codes atualizados | **NAO** — L53-58 Chess piece (Xadrez) como elemento obrigatorio | **PRECISA ATUALIZAR** |
| vfx-motion-designer | **SIM** — Z7, "O Tempo e Rei" | **SIM** — proibe gold/amber/terracotta, Azure Whisper | **PARCIAL** — L56-58 Chess como motif animavel | **PRECISA ATUALIZAR** |
| humanizer | N/A (copy pipeline) | N/A | OK | OK |
| reviewer | N/A (copy pipeline) | N/A | OK | OK |
| movement-brand-strategist | **SIM** — define o movimento | N/A (strategy agent) | OK | OK |
| personal-brand-strategist | **SIM** | N/A | OK | OK |
| company-brand-strategist | **SIM** | N/A | OK | OK |
| product-brand-strategist | **SIM** | N/A | OK | OK |

### Resumo Agentes

- **Agentes OK**: 13/20
- **Agentes que precisam atualizar**: 7
  1. `dev-agent.md` — CRITICO: ainda diz "Muted gold / warm amber", Chess piece obrigatorio
  2. `designer-agent.md` — CRITICO: ainda diz gold/amber, Chess piece obrigatorio em todo o doc
  3. `logo-brand-mark-designer.md` — diz "muted gold/warm amber", Chess piece como motif
  4. `design-system-extractor.md` — diz "black/white/gold palette", "chess motifs"
  5. `creative-director.md` — Chess piece (Xadrez) como elemento obrigatorio
  6. `vfx-motion-designer.md` — Chess como elemento animavel (L56-58)
  7. CLAUDE.md (raiz) — **CRITICO**: L14 diz "Muted gold / warm amber", L16 "Chess motif" obrigatorio

---

## C) Arquivos de Referencia

### Branding Files

| Arquivo | Versao | Status |
|---------|--------|--------|
| `brain/assets/branding/tempo-e-rei-brand-philosophy.md` | v2.0, 2026-03-18 | OK |
| `brain/assets/branding/company-reis-ia-concept.md` | v3.0, 2026-03-18 | **ATENCAO** — ainda contem #FF8C42 Electric Amber na tabela de cores L648, L652, L686 |
| `brain/assets/branding/personal-moroni-reis-concept.md` | v2.0, 2026-03-18 | OK (verificar terracotta) |
| `brain/assets/branding/movement-builder-concept.md` | v3.0, 2026-03-18 | **ATENCAO** — header L8 diz "Electric Amber #FF8C42", L479, L493, L771, L1412, L1443 contêm #FF8C42 |
| `brain/assets/branding/product-concepts.md` | v2.0, 2026-03-18 | **ATENCAO** — L296, L300 contêm #FF8C42 |
| `brain/assets/branding/creative-direction-brief.md` | v1.0, 2026-03-18 | OK |
| `brain/assets/branding/agent-specs-draft.md` | Draft | VERIFICAR |

### Design System Files

| Arquivo | Versao | Status |
|---------|--------|--------|
| `brain/assets/design-systems/reis-ia-design-system.md` | v1.3, 2026-03-18 | OK — sistema master azul correto |
| `brain/assets/design-systems/reis-ia-implementation-guide.md` | (verificar) | OK |
| `brain/assets/design-systems/ds-time-builders.md` | v2.0, 2026-03-18 | OK — proibe amber/gold/terracotta explicitamente |
| `brain/assets/design-systems/ds-systems.md` | v2.0, 2026-03-18 | OK — proibe gold, "Forja" removido |
| `brain/assets/design-systems/ds-moroni-reis.md` | v2.0, 2026-03-18 | OK — terracotta removido, Soft Blue correto |
| `brain/assets/design-systems/application-plan.md` | 2026-03-17 | OK — documenta migracao gold→blue |
| `brain/assets/design-systems/aiox-gap-analysis.md` | 2026-03-17 | OK — gap analysis completa |

### Campanhas FINAL

| Arquivo | Versao | Status |
|---------|--------|--------|
| `brain/assets/campaigns/homepage/FINAL-homepage-copy.md` | v1.0, 2026-03-17 | OK |
| `brain/assets/campaigns/builder-landing/FINAL-builder-landing-copy.md` | v1.0/v2.0, 2026-03-17 | **ATENCAO** — L1037 referencia "Electric Amber (#FF8C42)" em visual notes |
| `brain/assets/campaigns/systems/FINAL-systems-copy.md` | v1.0, 2026-03-17 | OK |
| `brain/assets/campaigns/builder-agencies/FINAL-builder-agencies-copy.md` | (verificar) | VERIFICAR |
| `brain/assets/campaigns/agendar/FINAL-agendar-copy.md` | (verificar) | VERIFICAR |
| `brain/assets/campaigns/aplicar/FINAL-aplicar-copy.md` | (verificar) | VERIFICAR |

### Backups

| Local | Conteudo |
|-------|----------|
| `reis-ia-brand/backups/` | 12 pastas: batch-2 a batch-8, phase-4, pre-batch3-token-update, rebuilds |
| `reis-ia-website/backups/` | 5 pastas: phase3-stage1/2/4, pre-full-rebuild, pre-revert-copy |

Backups estao organizados e presentes. OK.

---

## D) Elementos Descartados Encontrados

### Gold (#C9A84C / #C4A265)

| Arquivo | Contexto | Acao Necessaria |
|---------|----------|-----------------|
| `.claude/agents/dev-agent.md` L58 | "Muted gold / warm amber" como accent color | **REMOVER** — substituir por #4A90FF blue |
| `.claude/agents/designer-agent.md` L38 | "Muted gold / warm amber" como accent | **REMOVER** — substituir por blue palette |
| `.claude/agents/designer-agent.md` L57, L65 | "Accent gold when featured" | **REMOVER** |
| `.claude/agents/logo-brand-mark-designer.md` L42 | "accent muted gold/warm amber" | **REMOVER** |
| `.claude/agents/design-system-extractor.md` L110, L120 | "black/white/gold palette" | **REMOVER** |
| `CLAUDE.md` (raiz) L14 | "Muted gold / warm amber" | **REMOVER** |
| `brain/assets/design-systems/snippets-morningside.md` | #C9A84C em multiplas linhas | OK — arquivo de referencia (source extraction) |
| `brain/assets/design-systems/snippets-vercel.md` L664 | #C9A84C focus outline | OK — arquivo de referencia |
| `brain/assets/design-systems/application-plan.md` | #C9A84C em contexto de migracao | OK — documenta mudanca |
| `.claude/agent-memory/company-brand-strategist/` | #C4A265 "Systems gold" | **ATUALIZAR** agent memory |
| `.claude/agent-memory/designer-agent/` | #C9A84C em reference files | OK — historico valido |
| `design-previews/backups/` | #C9A84C em previews antigos | OK — backup historico |

### Amber (#FF8C42)

| Arquivo | Contexto | Acao Necessaria |
|---------|----------|-----------------|
| `brain/assets/branding/movement-builder-concept.md` L8, L479, L493, L771, L1412, L1443 | "Electric Amber #FF8C42" como cor do movimento | **REMOVER** — atualizar para #2D7AFF |
| `brain/assets/branding/company-reis-ia-concept.md` L648, L652, L686 | Amber Eletrico na tabela de cores | **REMOVER** — atualizar para azul |
| `brain/assets/branding/product-concepts.md` L296, L300 | Amber para Z7 products | **REMOVER** — atualizar para azul |
| `brain/assets/campaigns/builder-landing/FINAL-builder-landing-copy.md` L1037 | Visual note com #FF8C42 | **REMOVER** nota visual |
| `.claude/agent-memory/company-brand-strategist/MEMORY.md` L8 | "Electric Amber #FF8C42" | **ATUALIZAR** |
| `.claude/agent-memory/company-brand-strategist/brand-architecture-decisions.md` L11 | Builder amber #FF8C42 | **ATUALIZAR** |
| `.claude/agent-memory/movement-brand-strategist/MEMORY.md` L20 | "Builder accent: Electric Amber #FF8C42" | **ATUALIZAR** |

### Terracotta (#C47A5A)

| Arquivo | Contexto | Acao Necessaria |
|---------|----------|-----------------|
| `brain/assets/branding/personal-moroni-reis-concept.md` | Referencia a terracotta removido — verificar se residuos | VERIFICAR |
| `brain/assets/branding/company-reis-ia-concept.md` | Possivelmente na secao Builder/Personal | VERIFICAR |
| `brain/assets/design-systems/ds-time-builders.md` L748 | Proibicao explicita de terracotta | OK — regra correta |
| `.claude/agent-memory/designer-agent/project_brand_layers.md` | Nota que terracotta foi removido | OK — nota historica |
| `.claude/agent-memory/company-brand-strategist/` | Referencia a terracotta | **ATUALIZAR** |

### Chess / Knight / Crown

| Arquivo | Contexto | Acao Necessaria |
|---------|----------|-----------------|
| `.claude/agents/dev-agent.md` L67-73 | Chess piece como elemento OBRIGATORIO em cada pagina | **REMOVER** secao inteira |
| `.claude/agents/designer-agent.md` L61-70 | Chess Piece (Xadrez) como elemento de marca obrigatorio | **REMOVER** secao inteira |
| `.claude/agents/designer-agent.md` L98, L109, L165 | Mencoes a chess como elemento de pagina | **REMOVER** |
| `.claude/agents/logo-brand-mark-designer.md` L41 | "Chess piece (represents STRATEGY)" | **REMOVER** |
| `.claude/agents/logo-brand-mark-designer.md` L56 | "Negative Space Knight" variation | **REMOVER** |
| `.claude/agents/design-system-extractor.md` L110, L120 | "hourglass and chess motifs" | **REMOVER** chess ref |
| `.claude/agents/creative-director.md` L53-58, L60 | Xadrez como elemento obrigatorio em toda pagina | **REMOVER** |
| `.claude/agents/vfx-motion-designer.md` L56-58 | Xadrez como elemento animavel | **REMOVER** |
| `CLAUDE.md` (raiz) L16 | "Chess motif" obrigatorio | **REMOVER** |
| `reis-ia-brand/.../movement.astro` L412-414 | "O Cavaleiro" como simbolo | OK — contexto narrativo valido (metafora do profissional), nao e chess branding |
| `reis-ia-brand/.../personal-brand.astro` L93, L198 | "Xadrez" como referencia visual e mantra | AVALIAR — pode ser valido em contexto narrativo pessoal |

### Forja / Faisca / Azure Whisper

| Arquivo | Contexto | Acao Necessaria |
|---------|----------|-----------------|
| `brain/assets/branding/movement-builder-concept.md` | Multiplas referencias a "forja" na versao pre-Z7 | **VERIFICAR** — a v3.0 pode ter mantido |
| `brain/assets/branding/product-concepts.md` | "forja" em contexto de Z7 Days | **VERIFICAR** |
| `brain/assets/design-systems/ds-time-builders.md` L815 | Documenta remocao de "Forge Glow", "Amber Scanner", "Forge Particle" | OK — nota historica |
| `.claude/agents/vfx-motion-designer.md` L47, L182 | Proibe Azure Whisper / Blue Shimmer | OK — regra correta |
| `reis-ia-brand/.../products.astro` L494 | "A Faisca" como subtitulo de Z7 Hours | OK — nome do produto, nao do efeito descartado |
| `reis-ia-brand/.../movement.astro` | "faisca" nao aparece no movimento | OK |

---

## E) Comparacao com AIOX

Baseado na analise do sitemap AIOX (40 paginas) vs Reis IA brandbook (26 paginas):

| Elemento | AIOX Tem | Nos Temos | Gap |
|----------|----------|-----------|-----|
| **Paginas totais** | 40 | 26 | -14 paginas |
| **Brand Identity pages** | 8 (guidelines, movimento, logo, icons, moodboard, foundations, aiox strategy) | 8 (guidelines, strategy, logo, icons, moodboard, foundations + company-brand, personal-brand) | EQUIVALENTE |
| **Token pages** | 5 (spacing, surfaces, layering, semantic, token-export) | 4 (spacing, surfaces, semantic, foundations) | -1 (falta token-export e layering dedicada) |
| **Visual/Effects pages** | 4 (effects, patterns, motion, vfx) | 4 (effects, patterns, motion, vfx) | EQUIVALENTE |
| **Component pages** | 12 (components, buttons, cards, forms, feedback, states, tables, lists, charts, sections, lp-sections, advanced) | 6 (components, buttons, cards, forms, sections, advanced) | **-6 paginas** |
| **Meta pages** | 2 (templates, seo) | 2 (templates, seo) | EQUIVALENTE |
| **Ecosystem/Movement** | 1 (movimento — 13 secoes profundas) | 4 (company-brand, personal-brand, movement, products) | **NOS SUPERIORES** |
| **Showcase/Mockups** | 7 (editorial, mockups, apparel, outfits, jackets, sneakers, calc-squad) | 0 | **-7 paginas** |
| **Pitch Deck** | 1 | 0 | -1 (nao necessario agora) |
| **Workspace/Dashboard** | 1 | 0 | -1 (nao necessario agora) |

### Interatividade Comparada

| Feature | AIOX | Reis IA | Gap |
|---------|------|---------|-----|
| Click-to-replay animations | SIM (Framer Motion) | SIM (vanilla JS) | EQUIVALENTE |
| Variant switcher tabs | SIM | SIM (sliders, toggles) | EQUIVALENTE |
| Code + preview side-by-side | SIM | SIM (CodeBlock + demos) | EQUIVALENTE |
| Speed/opacity sliders | SIM | SIM (RotatingBorderDemo, GrainDemo) | EQUIVALENTE |
| Copy-to-clipboard | SIM | SIM (CopyButton component) | EQUIVALENTE |
| Drag-and-drop | SIM | NAO | **GAP** |
| Theme switching (lime/gold) | SIM | NAO (dark only — por design) | N/A (decisao correta) |
| Framer Motion | SIM | NAO (vanilla CSS/JS — por design) | N/A (decisao correta) |
| Feedback components | SIM (toasts, modals, sheets) | NAO | **GAP** |
| Loading states | SIM (spinners, progress, skeletons) | NAO | **GAP** |
| Charts library | SIM (9 tipos) | NAO | **GAP** |
| LP Section catalog | SIM (16 sections + atoms) | NAO | **GAP** |
| Editorial spreads | SIM (26 layouts) | NAO | **GAP** |

### Onde Estamos Superiores ao AIOX

1. **Brand Ecosystem depth** — 4 paginas dedicadas a camadas de marca (company, personal, movement, products) vs 1 pagina unica do AIOX
2. **Conceitual** — Z7, Time Builders, "O Tempo e Rei" como filosofia integrada. AIOX nao tem filosofia de marca comparavel
3. **Design system layering** — 3 design systems por camada (master, Time Builders, Systems, Moroni) vs 1 unico DS do AIOX
4. **Self-referential** — Nosso brandbook usa seus proprios tokens em todas as paginas (AIOX tambem faz)
5. **Copy pipeline** — Pipeline completo CMO → Copywriter → Humanizer → Reviewer com scores. AIOX nao documenta processo de copy

### Onde Estamos Abaixo

1. **Componentes** — Faltam 6 paginas de componentes (feedback, states, tables, lists, charts, lp-sections)
2. **Showcase** — Zero paginas de showcase/mockup (AIOX tem 7)
3. **Editorial** — Zero editorial spreads (AIOX tem 26 layouts)
4. **Token export** — Sem pagina de copy-paste tokens
5. **LP Section catalog** — Sem catalogo de secoes de landing page
6. **Hourglass VFX** — 8 efeitos criados mas nao integrados
7. **Z7 Visual System** — 14 SVGs criados mas nao integrados

---

## Checklist de Acoes Necessarias

### PRIORIDADE CRITICA (Bloqueia trabalho de outros agentes)

- [ ] **Atualizar CLAUDE.md** — Remover "Muted gold / warm amber" (L14) e "Chess motif" (L16). Substituir por blue palette e Z7/Time Builders
- [ ] **Atualizar dev-agent.md** — Remover gold accent (L58), remover Chess piece section (L67-73), adicionar blue palette e Z7
- [ ] **Atualizar designer-agent.md** — Remover gold/amber (L38), remover Chess Piece section (L61-70), remover refs a chess em L98, L109, L165
- [ ] **Atualizar logo-brand-mark-designer.md** — Remover "gold/warm amber" (L42), remover Chess piece motif (L41), remover Knight variation (L56)
- [ ] **Atualizar design-system-extractor.md** — Remover "gold palette" e "chess motifs" (L110, L120)
- [ ] **Atualizar creative-director.md** — Remover Xadrez section (L53-58), remover obrigatoriedade em toda pagina (L60)
- [ ] **Atualizar vfx-motion-designer.md** — Remover Chess section (L56-58)

### PRIORIDADE ALTA (Inconsistencia em docs de referencia)

- [ ] **Atualizar movement-builder-concept.md** — Remover todas as 6 ocorrencias de #FF8C42. Substituir por #2D7AFF
- [ ] **Atualizar company-reis-ia-concept.md** — Remover #FF8C42 da tabela de cores (L648, L652, L686)
- [ ] **Atualizar product-concepts.md** — Remover #FF8C42 (L296, L300)
- [ ] **Atualizar FINAL-builder-landing-copy.md** — Remover nota visual com #FF8C42 (L1037)
- [ ] **Atualizar agent memories** — company-brand-strategist, movement-brand-strategist, designer-agent memories com refs a gold/amber

### PRIORIDADE MEDIA (Brandbook enhancements)

- [ ] **Atualizar index.astro** — Adicionar referencia a Z7 e Time Builders no hero
- [ ] **Atualizar strategy.astro** — Reescrever com conceitos v3.0 (Z7, "O Tempo e Rei", Time Builders, arquetipos)
- [ ] **Atualizar guidelines.astro** — Integrar filosofia Z7 e arquetipos Governante/Heroi/Rebelde
- [ ] **Integrar Hourglass VFX** — Adicionar 8 efeitos de ampulheta ao brandbook
- [ ] **Integrar Z7 Visual System** — Adicionar 14 SVGs e animacoes ao brandbook
- [ ] **Integrar Loading Animations** — Adicionar 7 rotacoes + 7 Z→7 sequences

### PRIORIDADE BAIXA (Nice-to-have, fase futura)

- [ ] Criar pagina feedback (toasts, modals, sheets)
- [ ] Criar pagina states (spinners, progress, skeletons)
- [ ] Criar pagina tables
- [ ] Criar pagina lists + KPI cards
- [ ] Criar pagina charts
- [ ] Criar pagina lp-sections catalog
- [ ] Criar pagina token-export
- [ ] Criar paginas showcase/editorial (quando houver assets reais)

---

## Notas de Implementacao

1. **Os 7 agentes que precisam atualizar sao os que interagem diretamente com design/codigo.** Os agentes de estrategia (CMO, brand strategists) nao referenciam cores/elementos visuais diretamente, entao estao OK.

2. **O CLAUDE.md na raiz e o documento mais critico** pois e lido por TODOS os agentes como instrucao base. Enquanto ele disser "gold/amber" e "chess", qualquer agente novo pode herdar essas instrucoes erradas.

3. **Os arquivos de branding (movement-builder-concept, company-reis-ia-concept, product-concepts) tem conteudo ORIGINAL (v1.0/v2.0 em ingles) + conteudo v3.0 (em PT-BR).** As versoes PT-BR estao corretas, mas as versoes EN originais no mesmo arquivo ainda contem refs a #FF8C42. Seguindo a regra de "nunca sobrescrever originais", a acao correta e adicionar notas de deprecacao nas secoes antigas.

4. **A pagina movement.astro usa "O Cavaleiro" como simbolo narrativo** — isso e diferente de usar chess como elemento de marca. O cavaleiro no contexto do movimento e uma metafora para "profissional que se move diferente", nao e branding visual. Considerar manter com nota de contexto.
