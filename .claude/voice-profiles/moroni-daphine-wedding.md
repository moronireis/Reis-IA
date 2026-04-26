---
name: moroni-daphine-wedding
description: Voice + visual profile for the personal wedding site of Moroni Reis & Daphine Oliveira. NOT a REIS [IA] project. Romantic luxury burgundy & gold, fall/winter wedding (June 12).
type: project-voice-profile
scope: /Users/moronireis/Projetos vscode/moroniedaphine/
supersedes: reis-ia-company (all REIS brand rules are OVERRIDDEN when this profile is active)
source_of_truth: brain/design-library/mood-reports/casamento-moroni-daphine/wedding-romantic-burgundy.md
---

# Moroni & Daphine — Wedding Site Voice Profile

This is a **personal project**. It has nothing to do with REIS [IA] brand identity. When this profile is loaded by any agent, the REIS brand DNA, PROHIBITED lists, and default palettes are **ignored entirely**. The wedding project follows its own rules below.

## Identity

- **Project**: Site de casamento Moroni Reis × Daphine Oliveira
- **Date**: 12 de junho (inverno brasileiro — fall/winter palette fits)
- **Nature**: Site **informativo** + lista de presentes. Local enviado com convite individual, NÃO exposto no site. Sem RSVP com backend.
- **Languages**: Português brasileiro
- **Repo**: `/Users/moronireis/Projetos vscode/moroniedaphine/`
- **Deploy**: Vercel

## Aesthetic DNA — Romantic Luxury Burgundy & Illustrated Botanical

**Direção âncora** (revisado 2026-04-15 após prints de referência Daphine): borgonha + cream + branco como sistema base. Ilustração botânica vetorial em line-art borgonha como camada decorativa core. Ouro REMOVIDO ou puramente opcional — refs 2 e 3 (Denise & Igor, Emily & John) não usam ouro. Textura de papel/linho sutil no cream.

**Referências-chave salvas**:
- `brain/design-library/mood-reports/casamento-moroni-daphine/refs/ref-01-florence-wordmark.jpeg` — wordmark full Didone, layout editorial clean
- `brain/design-library/mood-reports/casamento-moroni-daphine/refs/ref-02-denise-igor-save-date-illustrated.jpeg` — burgundy dominante, ilustrações vetoriais florais + figuras humanas do casal, zero gold
- `brain/design-library/mood-reports/casamento-moroni-daphine/refs/ref-03-emily-john-botanical-framed.jpeg` — botânica gigante em line-art burgundy como background, monograma emoldurado com ornamento, script italic em todas as seções

**Wordmark primário (NOVA direção)**:
- Identidade principal é **"MORONI REIS & DAPHINE OLIVEIRA"** tratado como wordmark editorial — NÃO a sigla M&D
- Cormorant Garamond 300/200 ou tipografia Didone (Playfair Display, GT Super, Canela) em escala grande com tracking generoso (+0.08em a +0.12em)
- Ampersand em itálico como acento decorativo
- A sigla M&D fica como artefato secundário (selo, favicon, watermark), NÃO como identidade principal

**Ilustração botânica vetorial (NOVO elemento core)**:
- Line-art burgundy de flores (rosas, tulipas, peônias, ramos de folhagem) como camada decorativa
- Uso: backgrounds de seção, frames de títulos, transições entre blocos
- Estilo: hairline strokes (0.5-1px), elegante, desenho à mão engraving style — não digital flat
- Monograma emoldurado com ornamento botânico é a variação primária do mark (tipo Emily & John)

**Ilustração figurativa (FASE POSTERIOR)**:
- Bonecos vetoriais do casal (Moroni + Daphine estilizados) para seção dresscode, cronograma, etc
- Simplificado editorial, não cartoon
- Planejado mas não produzido ainda — fase 3 do projeto

**Mood report completo**: `brain/design-library/mood-reports/casamento-moroni-daphine/wedding-romantic-burgundy.md`

## Color System — LOCKED (2026-04-15)

**Apenas 3 cores. Sem variações. Sem cream, sem blush, sem charcoal.**

| Token | Hex | Uso |
|---|---|---|
| `burgundy` | `#4A1619` | Cor primária. Tipografia sobre branco, backgrounds de seções especiais, acentos |
| `white` | `#FFFFFF` | Background dominante do site, texto sobre borgonha |
| `gold` | `#D4AF37` | Terciário. Apenas bordas, hairlines, dividers, pequenos destaques. NUNCA como cor principal de texto ou background |

**NÃO usar**: cream, ivory, blush, charcoal, burgundy-wine, gold-antique, ink. Apenas os 3 tokens acima.

**Ouro**: OPCIONAL / ausente por default. Refs 2 e 3 (direção visual primária) não usam gold. Usar apenas se uma seção específica pedir — jamais como sistema.

**PROIBIDO neste projeto**:
- Azul (#4A90FF e variantes REIS) — zero uso
- Gold brilhante (#FFD700) — destrói sofisticação
- Pastel rosa como estrutural (blush só como detalhe)
- Preto puro (#000000) — sempre borgonha profundo ou charcoal
- Qualquer paleta earthy/terracota/minimalismo tech

## Typography — LOCKED (2026-04-15)

**Display e Body**: **Fraunces** (Google Fonts, variable, free) — todas as instâncias de tipografia serif usam Fraunces. Pesos: 200-400 apenas. Configuração padrão: `font-variation-settings: "opsz" 144, "SOFT" 50` para display; `opsz 14` para body. Soft optical serif com calor editorial — direção validada na Opção 03 do preview de tipografia.

**UI sans**: Inter 300-400 apenas para metadata/labels/botões funcionais (ex: datas em tracking-wide uppercase, eyebrows, small caps)

**Script**: NÃO usar. Sem Great Vibes, sem Alex Brush, sem cursiva decorativa. A identidade vem de Fraunces apenas.

**Ampersand**: Fraunces italic 300, opacidade 0.7, padding horizontal .12em — usado como pivot decorativo entre nomes.

**Wordmark primário**: "Moroni Reis & Daphine Oliveira" em Fraunces 300, mixed case, clamp(36-86px), tracking +0.015em, `opsz 144`.

**Regras**:
- H1 display: no mínimo 8vw em desktop, 2-3 linhas em mobile, tracking +0.02em a +0.04em, line-height 1.1-1.15
- Nunca script em texto funcional acima de 3 palavras
- Inter jamais como headline — só UI

## Motion Language

- **Lenis smooth scroll**: lerp **0.08** (não o default 0.1) — 20% mais peso, tudo parece mais deliberado
- **Nenhuma transição abaixo de 600ms** — luxo tem paciência
- **Nenhum easing com overshoot** — sem spring bounce
- **Receitas**: fade + gentle upward lift 1.2s ease-out no hero, candlelight flicker SVG filter no monograma gold, parallax lento em galeria de fotos, gold underline draw-in nos headings ao scroll
- `prefers-reduced-motion` sempre respeitado com fallback digno

## Logo / Brand Marks

- **Monograma principal**: M&D em Cormorant Garamond 300 ou custom mark
- **Possível símbolo secundário**: motivo floral minimal (NÃO ornamentação de WordPress wedding template)
- **PROIBIDO neste projeto**: H1-B Hourglass, Z7, qualquer símbolo REIS [IA]

## Voice & Tone (quando houver copy)

- Primeira pessoa do plural ("nós", "nosso dia") — casal fala junto
- Tom romântico-sóbrio, nunca brega, nunca blogueiro de casamento
- Português brasileiro, sem anglicismos
- Formalidade elegante (não acadêmica)
- Zero emojis, zero corações, zero "o amor venceu"

## Anti-patterns (BLOCK on sight)

1. Pastel pink estrutural
2. Dourado brilhante #FFD700
3. Script font em texto funcional
4. Fundo branco de blog de casamento 2014
5. Aquarela genérica de buquê
6. Template Minted / Zola / Squarespace wedding default
7. Confete tipográfico, hearts, ornamentação Canva
8. Minimalismo austero frio (contradiz o calor da direção)

## Pages scope (site informativo)

1. `/` — Hero (monograma, nomes, data "12.06"), história do casal, dress code + cronograma, mensagem aos convidados
2. `/lista-de-presentes` — lista com links externos ou integração
3. `/informacoes` — FAQ, dress code detalhado, hospedagem se aplicável
4. **NÃO haverá**: `/rsvp` (sem backend), `/local` (local vai no convite individual)

## Files this profile governs

- `/Users/moronireis/Projetos vscode/moroniedaphine/**`
- `brain/design-library/mood-reports/casamento-moroni-daphine/**`
- `brain/assets/branding/casamento-moroni-daphine/**` (when created)
- `.claude/voice-profiles/moroni-daphine-wedding.md` (this file)

## How agents load this profile

When the task brief mentions "casamento Moroni & Daphine", "moroniedaphine/", or references this file by path:
1. Load this profile as the SOLE source of truth for brand/visual rules
2. Ignore REIS [IA] brand DNA, PROHIBITED lists, and default palettes in the agent definition
3. Apply the rules above
4. Consult the mood report for visual references before producing any output

Last updated: 2026-04-15
