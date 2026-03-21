# Site Copy Audit — 2026-03-17

> **Owner**: orchestrator
> **Status**: Complete

---

## Páginas Encontradas

| # | Página | Rota | Arquivo | Linhas |
|---|--------|------|---------|--------|
| 1 | Homepage | `/` | `src/pages/index.astro` | 623 |
| 2 | Builder (Agências) | `/builder` | `src/pages/builder.astro` | ~1200 |
| 3 | Systems | `/systems` | `src/pages/systems.astro` | ~1300 |
| 4 | Agendar | `/agendar` | `src/pages/agendar.astro` | 215 |
| 5 | Aplicar | `/aplicar` | `src/pages/aplicar.astro` | 365 |

**Páginas que NÃO existem (mencionadas como "Em breve" na homepage):**
- `/partners` — Não existe
- `/network` — Não existe

---

## Status por Página

| Página | Rota | Copy no código? | Copy no brain/? | Copy Squad produziu? | Ação necessária |
|--------|------|----------------|-----------------|---------------------|-----------------|
| **Homepage** | `/` | SIM — copy completa em PT-BR hardcoded no .astro. Hero, Manifesto, 4 Pilares, Stats, Comunidade, Founder Story, Offer Paths, Newsletter, Footer CTA. | SIM — `brain/assets/copy/website-main.md` | NÃO | Produzir via Copy Squad para validar/atualizar. A copy existe mas não passou pelo pipeline Hormozi + humanização |
| **Builder (Agências)** | `/builder` | SIM — sales page completa para AGÊNCIAS. Hero, Problem, Solution, Modules, Tiers, Objections, Proof, Guarantee, CTA. | SIM — `brain/assets/copy/sales-page-builder.md` | NÃO (squad produziu Builder-CEO, ICP diferente) | **OBSERVAÇÃO CRÍTICA**: A página atual foca em AGÊNCIAS. O Copy Squad produziu copy para ICP CEO/R$5-50M. São campanhas DIFERENTES. Ver decisão abaixo. |
| **Systems** | `/systems` | SIM — sales page completa. Hero, Problem, Audit, Services, Process, Stats, FAQ, Guarantee, CTA. | SIM — `brain/assets/copy/sales-page-systems.md` | NÃO | Produzir via Copy Squad para validar/atualizar |
| **Agendar** | `/agendar` | SIM — página funcional com copy. Cal.com placeholder + WhatsApp fallback. | NÃO (copy inline) | NÃO | Copy mínima OK. Refinamento via Copy Squad é opcional |
| **Aplicar** | `/aplicar` | SIM — formulário funcional com copy. Formspree placeholder. | NÃO (copy inline) | NÃO | Copy mínima OK. Refinamento via Copy Squad é opcional |
| **Partners** | NÃO EXISTE | N/A | N/A | NÃO | **CRIAR** — página + copy via Copy Squad |
| **Network** | NÃO EXISTE | N/A | N/A | NÃO | **CRIAR** — página + copy via Copy Squad |

---

## Componentes/Seções Compartilhados

| Componente | Arquivo | Copy atual | Ação |
|------------|---------|------------|------|
| **Nav** | `Nav.astro` | Links: Builder, Systems. CTA: "Agende uma Conversa" → /agendar | Atualizar quando Partners/Network forem criados |
| **Footer** | `Footer.astro` | Tagline: "O Ecossistema de Revenue com AI". Links: Home, Builder, Systems, Agendar. Copyright 2026. | Refinar tagline via Copy Squad. Adicionar Partners/Network quando criados |
| **HighlightBanner** | `HighlightBanner.astro` | Banner "Próxima Turma — Reis IA Builder — Abril 2026" | Copy OK, data precisa ser mantida atualizada |
| **LogoMarquee** | `LogoMarquee.astro` | Logos de referência | Não precisa de copy |

---

## DECISÃO CRÍTICA: Builder — Dois ICPs

A página `/builder` atual foca no **ICP primário**: donos de agência digital que querem vender AI.

O Copy Squad acabou de produzir copy para um **ICP diferente**: CEOs/fundadores de empresas R$5-50M que querem implementar AI no próprio negócio.

**Opções:**
1. **Manter 2 versões**: `/builder` para agências (atual) + `/builder-ceo` ou similar para o ICP CEO
2. **Substituir**: Reescrever `/builder` inteiramente para o ICP CEO (perdendo a versão agência)
3. **Unificar**: Criar uma página Builder que fale para ambos os ICPs com seções específicas

**Recomendação**: Opção 1 — manter ambas. A copy para agências já está implementada e é o ICP primário. A copy CEO é uma extensão estratégica. Decisão final é do Moroni.

---

## Campanhas a Executar Neste Job

Baseado na auditoria, estas são as campanhas necessárias:

### PRIORIDADE ALTA (páginas com copy que não passou pelo Copy Squad)
1. **Homepage** — Já tem copy, precisa passar pelo pipeline para alinhar com Hormozi + humanização
2. **Systems** — Já tem copy, precisa passar pelo pipeline

### PRIORIDADE MÉDIA (páginas novas)
3. **Partners** — Não existe, precisa de copy completa
4. **Network** — Não existe, precisa de copy completa

### PRIORIDADE BAIXA (páginas funcionais)
5. **Agendar** — Copy funcional OK, refinamento opcional
6. **Aplicar** — Copy funcional OK, refinamento opcional

### ELEMENTOS COMPARTILHADOS
7. **Header/Nav** — Revisar copy dos links quando Partners/Network forem criados
8. **Footer** — Refinar tagline e adicionar novos links
9. **Meta/SEO** — Title tags e meta descriptions para cada página

---

## Observações Importantes

1. **Copy hardcoded**: Toda copy está inline nos arquivos .astro, não é puxada de brain/. O trabalho do Copy Squad produz os arquivos .md — a implementação no código é responsabilidade do Dev Agent.

2. **Cores**: A homepage e todas as páginas atuais usam gold/amber (#C9A84C) como accent. O design system atualizado no CLAUDE.md usa blue (#4A90FF). Há uma discrepância que precisa de decisão do Moroni.

3. **Chess motif**: Presente na homepage e builder. CLAUDE.md diz que chess foi "permanently discarded" — mas está implementado no código atual. Isso precisa de decisão.

4. **Placeholders**: Várias seções têm placeholders — testimonials, case studies, avatars da comunidade, Cal.com embed, Formspree IDs, número de WhatsApp.
