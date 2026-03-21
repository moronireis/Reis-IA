# Systems — Design System

Última atualização: 2026-03-18 (VFX Integration)

> **Owner**: designer-agent
> **Status**: v2.0 — Revisão completa. Nova direção: Preto e Branco com Mínimo Azul. Paleta gold e referências a "Forja" removidas.
> **Consumido por**: dev-agent, designer-agent (specs de página)
> **Contexto**: Design system específico para o serviço Systems da Reis IA. Opera dentro da arquitetura master do Reis IA Design System. Filosofia visual: sofisticação pela **ausência** de cor. O acento (#4A90FF — blue master) é usado com EXTREMA moderação — máximo 1 elemento azul por viewport, e muitas seções não terão nenhum azul. A paleta é quase monocromática. Premium é comunicado pelo que é retirado, não pelo que é adicionado.
> **Dependência upstream**: `reis-ia-design-system.md` (master), `brain/assets/branding/tempo-e-rei-brand-philosophy.md`

---

## ÍNDICE

1. [Filosofia Visual](#1-filosofia-visual)
2. [Paleta Completa](#2-paleta-completa)
3. [Escala de Cinzas Explícita](#3-escala-de-cinzas-explícita)
4. [Regras de Tipografia](#4-regras-de-tipografia)
5. [CSS Custom Properties](#5-css-custom-properties)
6. [Efeitos Únicos](#6-efeitos-únicos)
7. [Componentes](#7-componentes)
8. [Regras de Coexistência com o Master](#8-regras-de-coexistência-com-o-master)
9. [Exemplos de Aplicação](#9-exemplos-de-aplicação)
10. [Proibições Específicas](#10-proibições-específicas)
11. [Conexão com a Filosofia Z7 e "O Tempo é Rei"](#11-conexão-com-a-filosofia-z7-e-o-tempo-é-rei)

---

## 1. FILOSOFIA VISUAL

Systems é **corporativo, premium, minimalista**. A identidade visual comunica confiança através da disciplina — não através de estímulo visual. O interlocutor ideal do Systems é um empresário ou C-Level que leu a proposta duas vezes e não quer ser impressionado: quer ser convencido.

### Princípios Visuais Systems

1. **Sofisticação pela ausência.** Cada elemento adicionado deve justificar sua presença. Se há dúvida sobre incluir um elemento decorativo, ele não entra. O espaço negativo — o vazio preto — é o protagonista.
2. **O branco como cor de impacto.** Text Primary (#FFFFFF a 100%) em headlines cria o statement visual do Systems. Não é o azul que chama atenção aqui — é o branco absoluto contra o preto absoluto. Esse contraste máximo é a declaração de premium.
3. **Monocromia como autoridade.** Preto, branco, cinzas. A ausência de cor saturada sinaliza que o conteúdo não precisa de artifício. É o design de quem não precisa se esforçar para impressionar.
4. **O azul como recompensa visual escassa.** O blue master (#4A90FF) aparece uma vez por viewport, no elemento mais importante — um número de resultado, um CTA principal, um elemento de conversão. Quando o azul aparece, o olho para. Quando é usado raramente, cada aparição tem peso.
5. **Métricas como design.** Os números de resultado são elementos visuais primários em Systems. "47 horas recuperadas por semana." "R$ 2.4M em receita gerada." Esses números são tratados como titulares visuais, não como prova social secundária.

### "O Tempo é Rei" — Expressão Systems

A filosofia de tempo no Systems se manifesta diferente do Time Builders:

- Onde Time Builders comunica a **urgência** do tempo correndo, Systems comunica o **valor** do tempo recuperado.
- A monocromia reflete a clareza intelectual de quem já entende o valor do tempo — não precisa de estímulo visual para agir.
- Os números de resultado são o ponto central: 47 horas/semana, R$ 2.4M, 89% de redução em tarefas manuais. Esses dados são a expressão visual de "O Tempo é Rei" no contexto corporativo.
- O espaço negativo extenso comunica: "Nós somos eficientes. Nenhum elemento desperdiçado — assim como os seus sistemas de IA."

---

## 2. PALETA COMPLETA

### 2A. Cores Base (Idênticas ao Master)

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| Surface-0 / Void | `#000000` | rgb(0, 0, 0) | Background principal da página |
| Surface-1 / Base | `#0A0A0A` | rgb(10, 10, 10) | Seções alternadas |
| Surface-2 / Raised | `#111111` | rgb(17, 17, 17) | Background de cards (padrão) |
| Surface-3 / Elevated | `#161616` | rgb(22, 22, 22) | Card hover, inputs |
| Surface-4 / Float | `#1A1A1A` | rgb(26, 26, 26) | Dropdowns, tooltips |

### 2B. Cores de Texto (Idênticas ao Master — com ênfase diferente)

| Token | Valor | Uso em Systems |
|-------|-------|----------------|
| Text Primary | `#FFFFFF` (100%) | **Protagonista visual** — headlines em branco absoluto são o statement de Systems |
| Text Secondary | `rgba(255,255,255,0.70)` | Body copy, descrições principais |
| Text Tertiary | `rgba(255,255,255,0.50)` | Captions, metadados, labels |
| Text Quaternary | `rgba(255,255,255,0.35)` | Numeração decorativa de etapas, ghost labels |
| Text Muted | `rgba(255,255,255,0.20)` | Ghost elements |

**Nota de uso em Systems:** O contraste máximo entre branco 100% (headlines) e o fundo preto (#000000) é o principal dispositivo visual. Não existe acento que substitua esse contraste. Use Text Primary generosamente nas headlines.

### 2C. Azul Master — O Único Acento (Uso Extremamente Moderado)

O Systems usa o mesmo blue master do ecossistema — sem modificação, sem versão especial. Isso reforça que o Systems é a expressão mais próxima do core institucional da Reis IA.

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| Accent Blue (Master) | `#4A90FF` | rgb(74, 144, 255) | Único acento — máximo 1 elemento por viewport |
| Accent Blue Hover | `#6AADFF` | rgb(106, 173, 255) | Hover state em elemento azul |
| Accent Blue Muted | `#3570CC` | rgb(53, 112, 204) | Active/pressed state |

**Regra absoluta:** 1 elemento azul por viewport. Zero é também uma resposta válida — muitas seções do Systems não terão nenhum azul.

---

## 3. ESCALA DE CINZAS EXPLÍCITA

Systems usa cinzas com mais frequência que outras camadas, pois a monocromia é intencional. Esta escala expande os tokens de borda do master para uso específico no Systems.

| Nome | Hex | RGB | Uso em Systems |
|------|-----|-----|----------------|
| Gray-900 | `#1A1A1A` | rgb(26, 26, 26) | Border default de cards |
| Gray-700 | `#2D2D2D` | rgb(45, 45, 45) | Divisores, separadores de seção |
| Gray-500 | `#525252` | rgb(82, 82, 82) | Ícones secundários, elementos inoperantes |
| Gray-300 | `#A3A3A3` | rgb(163, 163, 163) | Labels, captions sem ênfase |
| Gray-100 | `#D4D4D4` | rgb(212, 212, 212) | Texto de apoio, bullet points, listas |

**Como usar os cinzas:** Em vez de acento colorido, o Systems usa graduações de cinza para criar hierarquia visual. Um separador em Gray-700 tem mais peso visual que um separador em Gray-900. Essa hierarquia monocromática cria sofisticação sem adicionar cor.

---

## 4. REGRAS DE TIPOGRAFIA

### 4A. Escala (Herda do Master — com modulações)

| Token | Desktop | Mobile | **Peso Systems** | Letter-Spacing |
|-------|---------|--------|-----------------|----------------|
| Display | 72px | 40px | **600** | **-0.02em** |
| H1 | 56px | 36px | **600** | **-0.018em** |
| H2 | 48px | 30px | **600** | -0.015em |
| H3 | 36px | 26px | **500** | -0.010em |
| H4 | 28px | 22px | **500** | -0.005em |
| H5 | 24px | 20px | **500** | 0 |
| Labels | 12px | 12px | **600** | **0.08em** |
| Body Large | 20px | 18px | 400 | 0 |
| Body | 16px | 16px | 400 | **0.01em** |
| Caption | 13px | 12px | 400 | 0.02em |

**Modulações Systems:**
- Headlines em peso 600 (não 700-800 como Time Builders) — mais controlado, mais executivo.
- Letter-spacing de body levemente positivo (0.01em) — abertura que comunica precisão.
- Labels em uppercase e letter-spacing 0.08em — autoridade técnica sem agressividade.
- Display e H1 com letter-spacing menos comprimido que o master — respiração premium.

### 4B. Números de Resultado — Tratamento Tipográfico Especial

Os números de resultado são o elemento visual mais importante do Systems. São tratados como headlines tipográficas, não como dados de prova social:

```
Número principal (ex: "47"):
- Font: Inter 600 (não bold — o peso 600 é mais elegante em tamanhos grandes)
- Size: clamp(64px, 8vw, 96px)
- Color: #FFFFFF (Text Primary — branco puro)
- Letter-spacing: -0.03em
- font-variant-numeric: tabular-nums

Exceção azul (único número azul por seção, quando o contexto justifica):
- Color: #4A90FF (Blue Master)
- Usado no número de maior impacto emocional (ex: "47 horas recuperadas")
- Nunca mais de 1 número azul por viewport

Unidade (ex: "horas/semana"):
- Font: Inter 400, 16px
- Color: rgba(255,255,255,0.50)
- Letter-spacing: 0.02em, uppercase

Label contextual (ex: "Tempo recuperado"):
- Font: Inter 500, 12px
- Color: rgba(255,255,255,0.35)
- Uppercase, letter-spacing 0.06em
- Margin-top: 8px
```

### 4C. Regra de Azul em Tipografia

O azul em texto usa o Blue Master diretamente para tamanhos grandes, e o Accent Hover para tamanhos menores:

```css
/* Azul em número de resultado grande (64px+) */
.result-number-blue {
  color: #4A90FF;
}

/* Azul em texto de body (raro — apenas para links ou ênfase isolada) */
.text-blue {
  color: #6AADFF;  /* Accent Hover — mais legível em tamanhos pequenos */
}

/* Regra: nunca usar azul em mais de 1 elemento de texto por viewport */
```

---

## 5. CSS CUSTOM PROPERTIES

### 5A. Tokens Systems

```css
:root {
  /* Azul Master — Único Acento (herdado do master, sem modificação) */
  --systems-blue: #4A90FF;
  --systems-blue-hover: #6AADFF;
  --systems-blue-muted: #3570CC;

  /* Uso de azul nos componentes: extremamente restrito */
  --systems-accent-bg: rgba(74, 144, 255, 0.08);   /* fundo de elemento azul */
  --systems-accent-border: rgba(74, 144, 255, 0.20); /* borda de elemento azul */
  --systems-accent-border-hover: rgba(74, 144, 255, 0.40);
  --systems-accent-glow: 0 0 50px rgba(74, 144, 255, 0.10);

  /* Escala de cinzas explícita */
  --gray-900: #1A1A1A;
  --gray-700: #2D2D2D;
  --gray-500: #525252;
  --gray-300: #A3A3A3;
  --gray-100: #D4D4D4;

  /* Grain (mais sutil que o master) */
  --systems-grain-opacity: 0.007;  /* 0.7% — quase imperceptível */
}
```

### 5B. Tokens de Componente (Systems)

```css
:root {
  /* CTAs */
  --cta-primary-bg: #FFFFFF;
  --cta-primary-text: #000000;
  --cta-primary-bg-hover: #F5F5F5;

  --cta-secondary-border: rgba(255, 255, 255, 0.20);
  --cta-secondary-text: rgba(255, 255, 255, 0.80);
  --cta-secondary-border-hover: rgba(255, 255, 255, 0.40);

  /* CTA Azul (uso rarísimo — apenas no botão de conversão final) */
  --cta-blue-border: rgba(74, 144, 255, 0.40);
  --cta-blue-text: #6AADFF;
  --cta-blue-bg-hover: rgba(74, 144, 255, 0.08);

  /* Cards */
  --systems-card-border: rgba(255, 255, 255, 0.06);
  --systems-card-border-hover: rgba(255, 255, 255, 0.12);
  --systems-card-shadow-hover: 0 2px 20px rgba(0, 0, 0, 0.30);

  /* Divisores */
  --systems-divider-color: rgba(255, 255, 255, 0.08);
  --systems-divider-gray: #2D2D2D;

  /* Stats */
  --stat-number-white: #FFFFFF;
  --stat-number-blue: var(--systems-blue);   /* máximo 1 número azul por seção */
  --stat-unit-color: rgba(255, 255, 255, 0.50);
  --stat-label-color: rgba(255, 255, 255, 0.35);
}
```

---

## 6. EFEITOS ÚNICOS

### 6A. Grain Texture — Versão Systems

O grain é a única adição de textura no Systems. Mais sutil que o master. Adiciona dimensão analógica sem chamar atenção — é a textura de um documento executivo de alta qualidade, não de uma tela de game.

```css
.systems-grain {
  position: relative;
}

.systems-grain::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E");
  opacity: 0.007;  /* 0.7% — extremamente sutil */
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: overlay;
}
```

---

### 6B. Stat Counter (Animação de Número)

Números de resultado animam de zero ao valor final quando entram no viewport. Comunica precisão e cria impacto — é o único efeito dinâmico principal do Systems.

```css
/* A animação é via JS (IntersectionObserver + counter increment) */
/* O CSS define o estado visual */
.stat-counter {
  font-variant-numeric: tabular-nums;
}

.stat-counter.is-visible {
  animation: stat-reveal 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

@keyframes stat-reveal {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

### 6C. Linha Separadora Cinza (Section Divider)

O divisor padrão do Systems usa cinza, não azul. A elegância está na neutralidade:

```css
.systems-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.08) 20%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.08) 80%,
    transparent 100%
  );
  margin: var(--space-3xl) 0;
}
```

**Variante azul (uso excepcional — 1 por página, antes do CTA de conversão):**

```css
.systems-divider--accent {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(74, 144, 255, 0.15) 20%,
    rgba(74, 144, 255, 0.25) 50%,
    rgba(74, 144, 255, 0.15) 80%,
    transparent 100%
  );
}
```

---

### 6D. Selo de Garantia (Único Elemento com Borda Azul Rotativa)

O único lugar onde uma borda animada é permitida no Systems é no Selo de Garantia — e apenas nele. A rotação lenta (8s) comunica seriedade, não urgência.

```css
.guarantee-seal {
  position: relative;
  border-radius: 12px;
  background: var(--surface-2);
}

.guarantee-seal::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 13px;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 300deg,
    rgba(74, 144, 255, 0.60) 330deg,
    rgba(74, 144, 255, 0.90) 345deg,
    rgba(74, 144, 255, 0.60) 360deg
  );
  animation: guarantee-rotate 8s linear infinite;  /* muito mais lento que o Time Scanner */
  z-index: -1;
}

.guarantee-seal::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 11px;
  background: var(--surface-2);
  z-index: -1;
}

@keyframes guarantee-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

**Onde usar:** Exclusivamente na Box de Garantia. Nunca em cards de serviço, nunca em CTAs normais.

---

## 7. COMPONENTES

### 7A. CTA Button — Primary (Branco/Preto — Inversão)

```
Especificação:
- Background: #FFFFFF
- Texto: #000000
- Font: Inter 600, 15px, letter-spacing 0
- Padding: 14px 28px (desktop) / 12px 24px (mobile)
- Border-radius: 6px (mais quadrado que Time Builders — mais executivo)
- Sombra: nenhuma no estado normal
- Hover: background #F5F5F5, leve elevação (transform translateY(-1px))
- Active: background #E5E5E5, transform scale(0.99)
- Transition: all 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)
```

**Declaração de design:** O CTA primário do Systems é branco sobre preto — a inversão total de contraste. Não precisa de cor de acento para chamar atenção. É o statement mais limpo possível: ação direta, sem mediação.

### 7B. CTA Button — Secondary (Outline Cinza)

```
Especificação:
- Background: transparent
- Border: 1px solid rgba(255, 255, 255, 0.20)
- Texto: rgba(255, 255, 255, 0.80)
- Font: Inter 600, 15px
- Padding: 14px 28px
- Border-radius: 6px
- Hover: border rgba(255,255,255,0.40), texto #FFFFFF
```

### 7C. CTA Button — Azul (Uso Rarísimo)

Apenas para o botão de conversão final, quando o contexto é de persuasão máxima e o visitante precisa de um sinal visual claro para agir:

```
Especificação:
- Background: transparent
- Border: 1px solid rgba(74, 144, 255, 0.40)
- Texto: #6AADFF (Accent Hover — mais legível)
- Font: Inter 600, 15px
- Padding: 14px 28px
- Border-radius: 6px
- Hover: background rgba(74, 144, 255, 0.08), border rgba(74, 144, 255, 0.60)
```

**Regra:** Máximo 1 botão azul por página. Preferir o CTA primário branco na maioria dos casos.

### 7D. Card — Serviço Systems

```
Especificação (estado normal):
- Background: var(--surface-2) = #111111
- Border: 1px solid rgba(255, 255, 255, 0.06)
- Border-radius: 8px (mais quadrado — executivo)
- Padding: 40px (desktop) / 28px (mobile)
- Sem glow colorido

Estado hover:
- Border: 1px solid rgba(255, 255, 255, 0.12)
- Box-shadow: 0 2px 20px rgba(0, 0, 0, 0.30)
- transform: translateY(-2px)
- Transition: all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)
```

**Nota:** Cards Systems não têm borda azul. O azul é reservado para elementos de conversão e stats de destaque.

### 7E. Card — Resultado / Métrica

```
Especificação:
- Background: var(--surface-1) = #0A0A0A
- Border: 1px solid rgba(255, 255, 255, 0.08)
- Border-radius: 8px
- Padding: 32px

Número principal (branco):
- Inter 600, clamp(56px, 7vw, 88px), #FFFFFF

Número principal (azul — 1 por seção, máximo):
- Inter 600, clamp(56px, 7vw, 88px), #4A90FF

Unidade e label: ver seção 4B
```

### 7F. Box de Garantia

```
Especificação:
- Background: var(--surface-2) = #111111
- Usa Seal de Garantia (borda animada azul lenta — ver 6D)
- Padding: 32px 40px
- Linha horizontal no topo: 1px, rgba(74, 144, 255, 0.20)
- Texto de garantia: Inter 600, 18px, White
- Sub-texto: Inter 400, 14px, rgba(255,255,255,0.60)
```

### 7G. Lista de Entregas / Bullets

```
Especificação:
- Marcador: traço horizontal (—), Gray-300 (#A3A3A3), margin-right 12px
- Texto: Inter 400, 16px, rgba(255,255,255,0.80)
- Line-height: 1.7
- Gap entre itens: 16px
```

**Nota:** Sem bullets redondos ou ícones coloridos. O traço dash é mais executivo. O marcador em cinza (não branco) cria hierarquia sutil entre marcador e conteúdo.

### 7H. Tag de Seção / Section Label

```
- Font: Inter 600, 12px
- Color: rgba(255,255,255,0.35)
- Uppercase
- Letter-spacing: 0.08em
- Exemplos: "O SISTEMA" / "RESULTADOS" / "A IMPLEMENTAÇÃO" / "GARANTIA"
- Usado no topo de cada seção como navegação visual discreta
```

### 7I. Navigation — Systems

```
- Background: rgba(0, 0, 0, 0.90), backdrop-blur: 20px
- Logo/Brand: White
- Links: rgba(255,255,255,0.60), hover rgba(255,255,255,0.90)
- CTA do nav: Border branco, texto branco (não azul — azul é para conversão final, não nav)
- Sem azul no nav
```

---

## 8. REGRAS DE COEXISTÊNCIA COM O MASTER

### 8A. O que Systems herda do Master (inalterado)

- Toda a escala de superfícies (Surface-0 a Surface-4)
- Toda a escala de opacidade de texto
- Toda a escala de espaçamento
- O sistema de grid (12 colunas desktop, 4 mobile)
- O container max-width de 1200px
- As regras de acessibilidade (WCAG AA mínimo)
- A família tipográfica Inter Variable

### 8B. O que Systems modifica do Master

| Elemento | Master | Systems |
|----------|--------|---------|
| Acento principal | Blue #4A90FF (CTAs, destaques) | **Quase nenhum acento — blue raramente (1/viewport)** |
| Peso de headline | 700 | **600** |
| Letter-spacing body | 0 | **0.01em** |
| Ambient pool de luz | Blue (sutil) | **Nenhum** |
| Grain texture | Padrão master | **Mais sutil (0.7%)** |
| Border radius | 12px | **8px (mais quadrado)** |
| Sombra de botão primário | Glow colorido | **Nenhuma sombra** |
| CTA primário | Blue | **Branco (inversão)** |
| Divisor principal | Border opacity | **Gradiente cinza** |

### 8C. Princípio Absoluto de Restrição de Azul

```
1 elemento azul por viewport.

Se há dúvida se deve usar azul → NÃO use azul.
Azul no nav (exceto logo de ecossistema) → NUNCA.
Azul no footer → NUNCA (exceto links de navegação de ecossistema).
2 elementos azuis no mesmo viewport → NUNCA.
Ambient pool azul de fundo → NUNCA.
```

Esse nível de restrição cria a percepção de que o azul é especial no contexto do Systems. Quando o blue aparece, o visitante inconscientemente entende que aquele é o momento de agir.

### 8D. Hierarquia de Acentos em Páginas Mistas

```
Página Systems com Seção Fundador (Moroni Reis):
→ Conteúdo Systems = quase sem cor (blue esparso)
→ Seção Fundador = Soft Blue (#6AADFF) do DS Moroni
→ Nenhum viewport deve ter o blue Systems e o Soft Blue do Moroni ao mesmo tempo
```

---

## 9. EXEMPLOS DE APLICAÇÃO

### 9A. Hero — Página Systems

```
Layout:
- Background: Surface-0 (#000000)
- SEM ambient pool colorido — o vazio preto é intencional
- Tag de seção no topo: "SISTEMAS DE IA PARA EMPRESAS"
- Headline: Inter 600, Display, #FFFFFF — o branco absoluto é o statement
- Subtítulo: Inter 400, Body Large, rgba(255,255,255,0.70)
- CTA primário: Botão branco (#FFFFFF, texto #000000)
- Abaixo: stat único em branco (o número mais impactante)
  → Se o contexto justifica, UM número azul aqui (ex: "47 horas recuperadas")
```

### 9B. Section — Resultados / Case Study

```
Layout:
- Background: Surface-1 (#0A0A0A)
- Tag: "RESULTADOS COMPROVADOS"
- 3 métricas em linha:
  - Primeira (maior impacto): número em Blue Master (#4A90FF) — 1 por seção
  - Segunda e terceira: números em White
- Separadores: cinza neutro (Gray-700)
- Narrativa do case abaixo: Inter 400, 17px, rgba(255,255,255,0.80)
```

### 9C. Section — A Implementação (Processo)

```
Layout:
- Background: Surface-0 (#000000)
- 4-6 etapas de implementação em grid
- Cards com borda cinza sutil (rgba(255,255,255,0.06))
- Numeração das etapas: Inter 600, 40px, rgba(255,255,255,0.20)
- Nome da etapa: Inter 600, H4, #FFFFFF
- Descrição: Inter 400, Body, rgba(255,255,255,0.60)
- Nenhuma cor de destaque — puro branco/cinza
```

### 9D. Section — Garantia

```
Layout:
- Background: Surface-1 (#0A0A0A)
- Box de Garantia centralizado (usa Seal de Garantia — borda azul rotativa lenta)
- Linha azul sutil no topo da box (rgba(74,144,255,0.20))
- Headline da garantia em White (não azul)
- Sub-texto em rgba(255,255,255,0.60)
- CTA azul outline abaixo (uso justificado — momento de conversão máxima)
- Este é o único viewport onde a borda rotativa azul + CTA azul coexistem
  → Aceito pois são o mesmo "elemento de conversão" — a garantia + o botão são 1 unidade
```

---

## 10. PROIBIÇÕES ESPECÍFICAS

### 10A. Proibições de Cor

1. **Nunca amber, gold, terracotta ou cyan em páginas Systems.** Essas cores pertencem a outras camadas ou versões eliminadas. Presença de qualquer uma destrói o posicionamento premium monocromático.
2. **Nunca Warm White (#F5F0E8) em fundos de seção Systems.** O Systems vive no dark mode absoluto.
3. **Nunca 2 elementos azuis por viewport.** 1 azul por viewport é o máximo absoluto.
4. **Nunca azul em body copy corrido.** Azul apenas em: números de resultado de destaque, botão de conversão final, linha da garantia.
5. **Nunca ambient pool colorido de fundo** (azul ou qualquer outra cor). Systems usa o vazio preto — sem glow, sem pool de luz.

### 10B. Proibições de Efeitos

1. **Nunca Time Scanner ou qualquer borda animada além do Seal de Garantia.** O Seal de Garantia (8s de rotação lenta) é a única borda animada do Systems.
2. **Nunca glow forte** (além do subtle glow no hover do CTA azul). A profundidade é criada por superfície, não por luz.
3. **Nunca partículas, confetti, ou qualquer elemento visual dinâmico** além de hover transitions e counter animation de stats.

### 10C. Proibições de Tipografia

1. **Nunca peso 700 ou 800 em headlines Systems.** Máximo 600 — o peso alto comunica energia, o 600 comunica autoridade.
2. **Nunca uppercase agressivo** (texto todo em maiúsculas além de tags de seção e labels pequenos).
3. **Nunca fontes além de Inter.** Systems é monocromático e monotípico — disciplina absoluta.

### 10D. Proibições de Componentes

1. **Nunca tabelas de preço SaaS** — toda conversão é direcionada para /agendar ou /aplicar.
2. **Nunca badges de "Desconto" ou "Oferta"** com fundo colorido. Se há urgência, ela é comunicada em texto.
3. **Nunca múltiplos CTAs coloridos na mesma seção.** Um CTA primário branco, máximo um secundário cinza, o CTA azul apenas na seção de conversão final.
4. **Nunca ícones coloridos.** Ícones em Systems são sempre brancos ou cinza.

---

## 11. CONEXÃO COM A FILOSOFIA Z7 E "O TEMPO É REI"

### 11A. "O Tempo é Rei" no Contexto Systems

O Systems é o serviço que entrega o valor prometido pela filosofia. A expressão visual reflete isso:

| Filosofia | Expressão Visual em Systems |
|-----------|----------------------------|
| "Tempo recuperado vale mais que dinheiro" | Números de resultado são o elemento visual mais proeminente |
| "IA não cria tempo — IA comprime tempo" | Cada card de serviço/etapa é descrito em termos de tempo economizado |
| "Receita é consequência da eficiência" | O fluxo visual: Processo → Resultado → CTA |
| "Clareza intelectual de quem domina o tempo" | Monocromia — nenhum ruído visual, nenhum artifício |
| "Premium é saber onde não usar cor" | O branco em headlines como statement; azul como recompensa escassa |

### 11B. "O Tempo é Rei" — Dados que Precisam Ser Visíveis

Os dados de resultado no Systems são a prova da filosofia. O design deve tratá-los como os elementos mais importantes da página:

- "47 horas/semana recuperadas" — não é uma feature. É o valor do tempo devolvido.
- "7x mais rápido" — a compressão temporal Z7 aplicada ao negócio.
- "R$ X em receita gerada" — o fim da hierarquia Tempo → Eficiência → Receita.

Esses números merecem o maior tamanho tipográfico possível, o branco absoluto ou o único azul da seção, e a animação de counter quando entram no viewport.

### 11C. Posicionamento Visual no Ecossistema

```
Blue Master (#4A90FF)  →  Institucional, ecossistema, nav/footer
Systems                →  A versão mais contida e corporativa do blue master
                          O blue aparece no mesmo tom, mas com extrema moderação
                          "A instituição em seu estado mais formal"
```

O Systems é a prova de que o ecossistema Reis IA tem substância. Não precisa de intensidade visual (como Time Builders) nem de calor humano (como Moroni Reis). Precisa de precisão e resultado. O design reflete exatamente isso.

---

## VERSÃO ANTERIOR

[VERSÃO ANTERIOR — 2026-03-18 — v1.0]

A versão anterior deste documento usava **Champagne Gold (#C4A265)** como único acento, com opacity ladder de 6 passos e o efeito "Executive Glow" em gold atrás de números de resultado. A paleta gold foi completamente removida. O acento agora é o blue master (#4A90FF) com uso ainda mais restrito. O Executive Glow foi eliminado — sem ambient pool colorido no Systems. O Seal de Garantia substituiu o uso de gold na caixa de garantia.

---

## CHANGELOG

| Data | Versão | Alteração |
|------|--------|-----------|
| 2026-03-18 | v1.0 | Criação inicial do DS Systems — acento gold |
| 2026-03-18 | v2.0 | Revisão completa: remoção do gold (#C4A265) e opacity ladder gold. Nova direção: preto e branco com mínimo azul master. CTA primário invertido para branco. Executive Glow removido. Seal de Garantia com borda azul lenta adicionado. Conexão com filosofia Z7 e "O Tempo é Rei". |
| 2026-03-18 | v2.1 | VFX Integration: adição da Seção 12 com efeitos VFX específicos do Systems. |

---

## 12. EFEITOS VFX — SYSTEMS [ADDED — VFX Integration — 2026-03-18]

Efeitos visuais específicos do Systems. O Systems é a camada mais contida do ecossistema — os efeitos VFX aqui são usados com máxima parcimônia, priorizando sofisticação sobre expressividade.

**Arquivo de referência:** `design-previews/systems-vfx-preview.html`

---

### 12A. Constelação Operacional (A1)

**Descrição:** Visualização de nós conectados representando a rede de agentes de IA em operação. Nós circulares conectados por linhas de `rgba(74,144,255,0.15)`. Nós pulsam suavemente (opacity 0.6→1.0, 3s). Linhas animadas com fluxo de dados (dashoffset em loop). Hover em um nó ativa um tooltip com nome e função do agente.

**Uso no Systems:** Seção "Arquitetura do Sistema" ou "Como funciona". Substituição visual para listas de features técnicas. Máximo 1 por página.

**Restrições Systems:** paleta monocromática com azul mínimo. Fundo Surface-0 ou Surface-1. Nenhum elemento colorido além do azul nos nós ativos.

**Referência:** `design-previews/systems-vfx-preview.html` — Efeito A1

---

### 12B. Organograma Vivo (A2)

**Descrição:** Hierarquia visual de processos operacionais com conexões animadas. Caixas de processo em Surface-2, bordas rgba brancas, texto em opacidades hierárquicas. Linhas de conexão que "fluem" de cima para baixo indicando pipeline de trabalho.

**Uso no Systems:** Seção de metodologia de implementação, "Os 4 Pilares", etapas de diagnóstico → implementação → resultado. Alternativa visual à seção de Process Steps (7G).

**Restrições Systems:** Hierarquia visual apenas em branco/cinza. Azul reservado para o nó de "resultado final" (1 elemento por viewport).

**Referência:** `design-previews/systems-vfx-preview.html` — Efeito A2

---

### 12C. Dashboard Conceitual C-Level (A3)

**Descrição:** Mockup de painel de métricas executivo. Cards de KPI com números animados (counter), barras de progresso, gráfico de linha simplificado. Estética de business intelligence — dados reais do cliente podem ser interpolados em produção.

**Uso no Systems:** Seção de resultado esperado pós-implementação, "O que você terá acesso". Contexto: executivos e C-Level visualizando o produto final. Suporta até 4 métricas visíveis simultaneamente.

**Restrições Systems:** Números em branco (primários) e 1 número em azul (mais impactante). Barra de progresso em cinza com preenchimento azul no pico. Sem cores de sinal (vermelho, verde) — o Systems não cria ansiedade visual.

**Referência:** `design-previews/systems-vfx-preview.html` — Efeito A3

---

### 12D. Ícones dos 4 Agentes IA (A4)

**Descrição:** Set de 4 ícones SVG representando as categorias de agentes de IA implementados. Ícones geométricos minimalistas, linha única, stroke azul `#4A90FF`. Cada ícone tem hover com glow sutil (`box-shadow: 0 0 20px rgba(74,144,255,0.15)`).

**Os 4 ícones disponíveis:**
1. Agente de Análise / Research
2. Agente de Criação / Copy
3. Agente de Dados / Dashboard
4. Agente de Execução / Workflow

**Uso no Systems:** Cards de serviço, seção de capacidades, listagem de entregáveis técnicos. Cada ícone identifica uma categoria de automação.

**Restrições Systems:** Ícones sempre em stroke azul `#4A90FF` ou branco. Nunca preenchidos (fill). Nunca coloridos com outra cor. Tamanho: 24-48px em cards, até 64px em hero de seção específica.

**Referência:** `design-previews/systems-vfx-preview.html` — Efeito A4

---

### 12E. Hover Intelligence (A5)

**Descrição:** Cards que revelam informação adicional de forma inteligente no hover. Ao passar o mouse, o card eleva sutilmente (`translateY(-2px)`), uma linha de contexto adicional aparece (fade-in 200ms), e um indicador azul sutil surge na borda superior. O conteúdo adicional está sempre presente no DOM (para acessibilidade) — apenas a visibilidade muda.

**Uso no Systems:** Cards de entregável, cards de fase de implementação, cards de resultado. Transforma cards informativos em cards interativos sem animação agressiva.

**Restrições Systems:** `translateY` máximo de 2px (Systems não tem lifts agressivos). Borda superior azul máximo `rgba(74,144,255,0.30)`. Conteúdo revelado deve ser relevante, não decorativo — cada hover entrega informação real.

**Referência:** `design-previews/systems-vfx-preview.html` — Efeito A5

---

### 12F. Regras de Uso VFX no Systems

O Systems é o design system mais restrito do ecossistema. As regras de VFX são mais conservadoras que as regras do master:

1. **Máximo 1 efeito VFX ativo por viewport** (vs 2 no master).
2. **Efeitos de partícula e formação (H1-B-3) são proibidos no Systems.** O Systems não usa efeitos espetaculares — apenas estruturais.
3. **Efeitos de loading Z7 (L1-L7) podem ser usados no Systems** apenas em contexto de processamento real (carregamento de dados, análise em progresso). Nunca decorativos.
4. **Efeitos de branding global (D1-D6)** podem ser usados no Systems com moderação: D3 (Compressão 7:7) e D5 (Contraste Vilão/Herói) são os mais adequados para o posicionamento corporativo.
5. **A animação Z→7→Ampulheta não é usada no Systems.** É um efeito do Time Builders. O Systems usa a ampulheta estática como watermark (H1-B-2 em breathing muito sutil, opcional).
