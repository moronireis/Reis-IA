# Time Builders — Design System

Última atualização: 2026-03-18 (VFX Integration)

> **Owner**: designer-agent
> **Status**: v2.0 — Revisão completa. Nova direção: Azul Intenso/Elétrico. Elementos "Forja" e paleta amber removidos.
> **Consumido por**: dev-agent, designer-agent (specs de página)
> **Contexto**: Design system específico para o movimento Time Builders e os produtos Z7 (Z7 Hours, Z7 Days, Z7 Months). Opera dentro da arquitetura master do Reis IA Design System. A base de superfícies é idêntica ao master. O acento primário de página é Azul Elétrico (#2D7AFF), com Cyan Azul (#00B4FF) para momentos de energia máxima. A conexão ao ecossistema é mantida pelo Blue master (#4A90FF) no nav/footer.
> **Dependência upstream**: `reis-ia-design-system.md` (master), `brain/assets/branding/tempo-e-rei-brand-philosophy.md`

---

## ÍNDICE

1. [Filosofia Visual](#1-filosofia-visual)
2. [Paleta Completa](#2-paleta-completa)
3. [Opacity Ladder do Azul Elétrico](#3-opacity-ladder-do-azul-elétrico)
4. [Opacity Ladder do Cyan Azul](#4-opacity-ladder-do-cyan-azul)
5. [Regras de Tipografia](#5-regras-de-tipografia)
6. [CSS Custom Properties](#6-css-custom-properties)
7. [Efeitos Únicos](#7-efeitos-únicos)
8. [Componentes](#8-componentes)
9. [Regras de Coexistência com o Master](#9-regras-de-coexistência-com-o-master)
10. [Exemplos de Aplicação](#10-exemplos-de-aplicação)
11. [Proibições Específicas](#11-proibições-específicas)
12. [Conexão com a Filosofia Z7 e "O Tempo é Rei"](#12-conexão-com-a-filosofia-z7-e-o-tempo-é-rei)

---

## 1. FILOSOFIA VISUAL

Time Builders é **energético, tribal, urgente**. A identidade visual encarna a filosofia Z7 — compressão de tempo com perfeição, a ampulheta como símbolo visual da aceleração. O azul elétrico é a cor da velocidade, da intensidade, do domínio. É o azul que separa quem age de quem assiste.

### Princípios Visuais Time Builders

1. **Intensidade controlada, não caos.** O azul elétrico é usado com disciplina — máximo 2 elementos de acento por viewport. Urgência não é barulho visual. É intensidade direcionada.
2. **A ampulheta como metáfora estrutural.** O símbolo Z7 é o identificador visual do movimento. Onde Z7 aparece, o relógio está correndo. Essa consciência temporal deve ser sentida no design.
3. **Tribal sem ser ruidoso.** Badges, CTAs e estados ativos comunicam pertencimento ao movimento. Não através de excesso decorativo — através de linguagem visual consistente e intensa.
4. **Diferenciação por saturação.** O diferencial visual do Time Builders dentro do ecossistema é o AZUL MAIS SATURADO — mais vibrante que o master (#4A90FF), mais urgente que o Soft Blue do Moroni (#6AADFF). Quem olha, sente a diferença de intensidade antes de processar a diferença de cor.

### "O Tempo é Rei" — Expressão Visual

A filosofia Z7 permeia cada decisão visual:

- O símbolo "Z7" como elemento tipográfico visual evoca a ampulheta — Z e 7 juntos formam a silhueta do tempo.
- A intensidade do azul elétrico comunica compressão temporal: urgência sem ansiedade, velocidade com direção.
- O Cyan Azul (#00B4FF) aparece nos momentos de maior energia — como a luz de um relógio digital no escuro. É o azul mais frio, mais rápido, mais tecnológico.
- A escassez de cor (máximo 2 elementos por viewport) reforça a mensagem: tempo é escasso. Use-o com precisão.

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

### 2B. Cores de Texto (Idênticas ao Master)

| Token | Valor | Uso |
|-------|-------|-----|
| Text Primary | `#FFFFFF` (100%) | Headlines, ênfase forte |
| Text Secondary | `rgba(255,255,255,0.70)` | Body copy, descrições |
| Text Tertiary | `rgba(255,255,255,0.50)` | Captions, metadados |
| Text Quaternary | `rgba(255,255,255,0.35)` | Texto decorativo |
| Text Muted | `rgba(255,255,255,0.20)` | Ghost elements |

### 2C. Azul do Ecossistema (Nav/Footer — Conexão Master)

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| Accent Blue (Master) | `#4A90FF` | rgb(74, 144, 255) | Nav, footer, botões secundários de ecossistema |
| Accent Blue Hover | `#6AADFF` | rgb(106, 173, 255) | Hover state do blue master no nav |
| Accent Blue Muted | `#3570CC` | rgb(53, 112, 204) | Active/pressed state do blue master |

### 2D. Azul Elétrico — O Acento Time Builders

O Azul Elétrico é mais saturado e mais vibrante que o blue master. A diferença é perceptível: onde o master transmite confiança corporativa, o elétrico transmite velocidade e ação.

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| **Elétrico Primary** | `#2D7AFF` | rgb(45, 122, 255) | CTAs primários, badges, highlights de ação |
| **Elétrico Hover** | `#4D90FF` | rgb(77, 144, 255) | Hover state do elétrico |
| **Elétrico Active** | `#1A60DD` | rgb(26, 96, 221) | Active/pressed state |
| **Elétrico Bright** | `#5599FF` | rgb(85, 153, 255) | Emphasis especial, números de destaque |
| **Elétrico Deep** | `#1050BB` | rgb(16, 80, 187) | Bordas escuras, sombras |
| **Elétrico Text** | `#7AB0FF` | rgb(122, 176, 255) | Azul elétrico em texto corrido (mais claro para legibilidade) |

### 2E. Cyan Azul — Energia e Urgência Máxima

O Cyan Azul é a cor do impulso, da ação imediata. É mais frio e mais tecnológico que o elétrico — evoca displays digitais, precisão de relógio. Usado com restrição ainda maior que o elétrico.

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| **Cyan Primary** | `#00B4FF` | rgb(0, 180, 255) | Destaques especiais — energia, momentos de urgência máxima |
| **Cyan Hover** | `#22C4FF` | rgb(34, 196, 255) | Hover state do cyan |
| **Cyan Text** | `#55CCFF` | rgb(85, 204, 255) | Cyan em texto (mais claro para legibilidade) |
| **Cyan Muted** | `#007DB3` | rgb(0, 125, 179) | Bordas e separadores cyan sutis |

---

## 3. OPACITY LADDER DO AZUL ELÉTRICO

12 passos de opacidade do Azul Elétrico (#2D7AFF). Usado para glows, fundos, bordas, sobreposições e efeitos.

| Passo | Opacidade | Valor CSS | Uso Típico |
|-------|-----------|-----------|------------|
| Elétrico-01 | 1% | `rgba(45, 122, 255, 0.01)` | Trace quase imperceptível — grain overlay |
| Elétrico-02 | 2% | `rgba(45, 122, 255, 0.02)` | Background de section com toque elétrico muito sutil |
| Elétrico-03 | 4% | `rgba(45, 122, 255, 0.04)` | Ambient pool — luz de fundo difusa |
| Elétrico-04 | 6% | `rgba(45, 122, 255, 0.06)` | Z7 Pulse base — piscina de luz elétrica atrás de hero |
| Elétrico-05 | 8% | `rgba(45, 122, 255, 0.08)` | Card com toque elétrico sutil |
| Elétrico-06 | 12% | `rgba(45, 122, 255, 0.12)` | Border elétrico sutil em cards normais |
| Elétrico-07 | 20% | `rgba(45, 122, 255, 0.20)` | Border elétrico em cards em hover |
| Elétrico-08 | 30% | `rgba(45, 122, 255, 0.30)` | Time Scanner border — estado ativo |
| Elétrico-09 | 40% | `rgba(45, 122, 255, 0.40)` | Glow sombra em botões elétricos |
| Elétrico-10 | 55% | `rgba(45, 122, 255, 0.55)` | Badge background elétrico |
| Elétrico-11 | 75% | `rgba(45, 122, 255, 0.75)` | Elemento elétrico prominent (ícone, data) |
| Elétrico-12 | 100% | `rgba(45, 122, 255, 1.00)` | CTA primário elétrico puro, texto em fundo escuro |

### Gradientes Azul Elétrico

```css
/* Z7 Pulse — piscina de luz elétrica atrás do hero */
background: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(45, 122, 255, 0.10) 0%, transparent 70%);

/* Ambient Corner — canto inferior esquerdo */
background: radial-gradient(35% 50% at 0% 100%, rgba(45, 122, 255, 0.08) 0%, transparent 100%);

/* Elétrico to Dark — borda gradient fade */
background: linear-gradient(90deg, #2D7AFF 0%, rgba(45, 122, 255, 0) 100%);

/* Elétrico Sweep — borda CTA */
background: linear-gradient(90deg, #2D7AFF 0%, #1A60DD 100%);
```

---

## 4. OPACITY LADDER DO CYAN AZUL

6 passos — uso mais restrito que o elétrico. O Cyan é para momentos de impacto máximo, não para uso geral.

| Passo | Opacidade | Valor CSS | Uso Típico |
|-------|-----------|-----------|------------|
| Cyan-01 | 4% | `rgba(0, 180, 255, 0.04)` | Background de seção com toque cyan raramente |
| Cyan-02 | 8% | `rgba(0, 180, 255, 0.08)` | Glow secundário — atrás de elemento de urgência |
| Cyan-03 | 15% | `rgba(0, 180, 255, 0.15)` | Borda cyan em estado de urgência |
| Cyan-04 | 30% | `rgba(0, 180, 255, 0.30)` | Bordas de destaque especial |
| Cyan-05 | 60% | `rgba(0, 180, 255, 0.60)` | Ícone ou marcador de urgência máxima |
| Cyan-06 | 100% | `rgba(0, 180, 255, 1.00)` | Cyan puro — exclusivo para 1 elemento único por página |

### Gradiente Cyan — Acento de Energia

```css
/* Cyan Pulse — urgência máxima, usado uma vez por página */
background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0, 180, 255, 0.12) 0%, transparent 70%);

/* Cyan Sweep — variante intensa para badges de urgência */
background: linear-gradient(90deg, #00B4FF 0%, #2D7AFF 100%);
```

---

## 5. REGRAS DE TIPOGRAFIA

### 5A. Escala (Herda do Master — com modulações)

A escala de tamanhos é idêntica ao master. As modulações Time Builders estão no **peso** e no **letter-spacing** — mais comprimidos, mais intensos.

| Token | Desktop | Mobile | Peso Master | **Peso Time Builders** | Letter-Spacing |
|-------|---------|--------|------------|----------------------|----------------|
| Display | 72px | 40px | 700 | **800** | -0.03em |
| H1 | 56px | 36px | 700 | **800** | -0.025em |
| H2 | 48px | 30px | 600 | **700** | -0.02em |
| H3 | 36px | 26px | 600 | **700** | -0.015em |
| H4 | 28px | 22px | 600 | **700** | -0.01em |
| H5 | 24px | 20px | 600 | **700** | -0.005em |
| Labels | 12px | 12px | 600 | **700** | 0.05em |
| Body Large | 20px | 18px | 400 | 400 | 0 |
| Body | 16px | 16px | 400 | 400 | 0 |
| Caption | 13px | 12px | 500 | 500 | 0.01em |

**Modulação Time Builders**: Headlines e labels são peso 700-800. Esse peso extra transmite energia e urgência tribal. Body copy permanece em 400 para contraste máximo de legibilidade.

### 5B. Tipografia Z7 — O Identificador Visual

O código "Z7" é tratado como elemento de marca, não como texto comum:

```
Z7 Typography Rules:
- Sempre em Inter peso 800
- Letter-spacing: -0.04em (mais comprimido que o normal — a proximidade entre Z e 7 cria a silhueta da ampulheta)
- Cor: Azul Elétrico (#2D7AFF) quando em destaque
- Cor: White quando inline em contexto de texto
- Cor: Cyan (#00B4FF) apenas em contextos de urgência máxima (1 vez por página)
- Nunca em caixa baixa — sempre "Z7", nunca "z7"
- Nunca "Z 7" (com espaço) ou "Z-7" (com hífen) — sempre junto: "Z7"
- Quando sozinho como símbolo: font-size Display (72px desktop)
- A silhueta de ampulheta emerge da proximidade dos dois caracteres — preserve essa densidade visual
```

### 5C. Aplicação do Azul Elétrico em Tipografia

O azul elétrico em texto usa sempre `#7AB0FF` (Elétrico Text — versão mais clara para legibilidade em tamanhos menores):

```css
/* Palavra de destaque elétrico em headline */
.highlight-electric {
  color: #7AB0FF;
  font-weight: 800;
}

/* Para textos de 48px ou maiores, o Elétrico Primary pode ser usado diretamente */
.stat-number-electric {
  color: #2D7AFF;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

/* Cyan em texto — exclusivo para 1 elemento de urgência máxima */
.highlight-cyan {
  color: #55CCFF;
  font-weight: 800;
}
```

---

## 6. CSS CUSTOM PROPERTIES

### 6A. Tokens Azul Elétrico

```css
:root {
  /* Azul Elétrico — Acento Principal Time Builders */
  --builder-electric: #2D7AFF;
  --builder-electric-hover: #4D90FF;
  --builder-electric-active: #1A60DD;
  --builder-electric-bright: #5599FF;
  --builder-electric-deep: #1050BB;
  --builder-electric-text: #7AB0FF;

  /* Opacity Ladder — 12 passos */
  --electric-01: rgba(45, 122, 255, 0.01);
  --electric-02: rgba(45, 122, 255, 0.02);
  --electric-03: rgba(45, 122, 255, 0.04);
  --electric-04: rgba(45, 122, 255, 0.06);
  --electric-05: rgba(45, 122, 255, 0.08);
  --electric-06: rgba(45, 122, 255, 0.12);
  --electric-07: rgba(45, 122, 255, 0.20);
  --electric-08: rgba(45, 122, 255, 0.30);
  --electric-09: rgba(45, 122, 255, 0.40);
  --electric-10: rgba(45, 122, 255, 0.55);
  --electric-11: rgba(45, 122, 255, 0.75);
  --electric-12: rgba(45, 122, 255, 1.00);

  /* Cyan Azul — Energia Máxima */
  --builder-cyan: #00B4FF;
  --builder-cyan-hover: #22C4FF;
  --builder-cyan-text: #55CCFF;
  --builder-cyan-muted: #007DB3;

  /* Opacity Ladder Cyan — 6 passos */
  --cyan-01: rgba(0, 180, 255, 0.04);
  --cyan-02: rgba(0, 180, 255, 0.08);
  --cyan-03: rgba(0, 180, 255, 0.15);
  --cyan-04: rgba(0, 180, 255, 0.30);
  --cyan-05: rgba(0, 180, 255, 0.60);
  --cyan-06: rgba(0, 180, 255, 1.00);

  /* Blue do Ecossistema (herdado do master — uso restrito a nav/footer) */
  --builder-blue-master: #4A90FF;
  --builder-blue-master-hover: #6AADFF;
  --builder-blue-master-muted: #3570CC;

  /* Sombras Azul Elétrico — mais intensas que o master */
  --shadow-electric-glow: 0 0 50px rgba(45, 122, 255, 0.18);
  --shadow-electric-glow-strong: 0 0 80px rgba(45, 122, 255, 0.28);
  --shadow-electric-button: 0 4px 24px rgba(45, 122, 255, 0.40);

  /* Gradientes Azul Elétrico */
  --gradient-z7-pulse: radial-gradient(ellipse 80% 60% at 50% 100%, rgba(45, 122, 255, 0.10) 0%, transparent 70%);
  --gradient-electric-sweep: linear-gradient(90deg, #2D7AFF 0%, #1A60DD 100%);
  --gradient-electric-fade: linear-gradient(90deg, #2D7AFF 0%, rgba(45, 122, 255, 0) 100%);
  --gradient-electric-corner: radial-gradient(35% 50% at 0% 100%, rgba(45, 122, 255, 0.08) 0%, transparent 100%);

  /* Gradiente Cyan */
  --gradient-cyan-pulse: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0, 180, 255, 0.12) 0%, transparent 70%);
}
```

### 6B. Tokens de Componente (Time Builders)

```css
:root {
  /* CTAs */
  --cta-primary-bg: var(--builder-electric);
  --cta-primary-bg-hover: var(--builder-electric-hover);
  --cta-primary-text: #FFFFFF;  /* texto branco no elétrico */
  --cta-primary-shadow: var(--shadow-electric-button);

  /* Cards */
  --card-border-default: rgba(45, 122, 255, 0.12);    /* --electric-06 */
  --card-border-hover: rgba(45, 122, 255, 0.30);       /* --electric-08 */
  --card-glow-hover: var(--shadow-electric-glow);

  /* Badges */
  --badge-electric-bg: rgba(45, 122, 255, 0.12);
  --badge-electric-text: var(--builder-electric-text);
  --badge-electric-border: rgba(45, 122, 255, 0.30);

  /* Time Scanner Border */
  --scanner-color: var(--builder-electric);
  --scanner-duration: 3s;
}
```

---

## 7. EFEITOS ÚNICOS

### 7A. Z7 Pulse

O "Z7 Pulse" é a piscina de luz elétrica que aparece atrás de sections e heroes. Mais intensa que o ambient pool do master — evoca energia em movimento, a ampulheta vibrando. É o glow que diz "o tempo está correndo".

**Especificação CSS:**

```css
.z7-pulse {
  position: relative;
  overflow: hidden;
}

.z7-pulse::before {
  content: '';
  position: absolute;
  bottom: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 60%;
  background: radial-gradient(
    ellipse at center,
    rgba(45, 122, 255, 0.10) 0%,
    rgba(45, 122, 255, 0.05) 40%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}
```

**Variante hero (mais intensa — Z7 Pulse máximo):**

```css
.z7-pulse--hero::before {
  width: 100%;
  height: 80%;
  background: radial-gradient(
    ellipse at center,
    rgba(45, 122, 255, 0.14) 0%,
    rgba(45, 122, 255, 0.07) 35%,
    rgba(0, 180, 255, 0.03) 55%,
    transparent 70%
  );
  bottom: -30%;
}
```

**Variante com Cyan (momentos de urgência máxima — CTA final):**

```css
.z7-pulse--urgent::before {
  background: radial-gradient(
    ellipse at center,
    rgba(0, 180, 255, 0.12) 0%,
    rgba(45, 122, 255, 0.08) 35%,
    transparent 65%
  );
}
```

**Onde usar:** Hero section de páginas Z7, section de CTA final, abertura de sales page Time Builders.

---

### 7B. Time Scanner

O "Time Scanner" é uma borda que performa um scan rotativo em azul elétrico ao redor do card ou componente. Comunica atividade, vigilância, urgência — como um radar de missão em execução. Evoca precisão tecnológica, não decoração.

**Especificação CSS:**

```css
.time-scanner {
  position: relative;
  border-radius: 12px;
  background: var(--surface-2);
}

.time-scanner::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 13px;  /* 1px a mais que o container */
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 270deg,
    rgba(45, 122, 255, 0.80) 300deg,
    rgba(45, 122, 255, 1.00) 330deg,
    rgba(45, 122, 255, 0.80) 360deg
  );
  animation: time-scan var(--scanner-duration, 3s) linear infinite;
  z-index: -1;
}

.time-scanner::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 11px;
  background: var(--surface-2);
  z-index: -1;
}

@keyframes time-scan {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

**Variante lenta (cards de destaque, não urgentes):**

```css
.time-scanner--slow::before {
  animation-duration: 6s;
}
```

**Variante com Cyan (urgência máxima — CTA final de sales page):**

```css
.time-scanner--urgent::before {
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    transparent 270deg,
    rgba(0, 180, 255, 0.80) 300deg,
    rgba(0, 180, 255, 1.00) 330deg,
    rgba(0, 180, 255, 0.80) 360deg
  );
  animation: time-scan 2s linear infinite;
}
```

**Onde usar:** Card featured de produto Z7 (máx. 1 por página), CTA box final de sales page, card de oferta em destaque. Nunca em mais de 2 elementos por viewport.

---

### 7C. Borda Elétrica Estática

Para cards que precisam de distinção elétrica sem a animação do scanner:

```css
.card-electric-border {
  border: 1px solid rgba(45, 122, 255, 0.20);
  border-radius: 12px;
  background: var(--surface-2);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.card-electric-border:hover {
  border-color: rgba(45, 122, 255, 0.40);
  box-shadow: 0 0 40px rgba(45, 122, 255, 0.12);
}
```

---

## 8. COMPONENTES

### 8A. CTA Button — Primary (Azul Elétrico)

```
Especificação:
- Background: #2D7AFF (Elétrico Primary)
- Texto: #FFFFFF
- Font: Inter 600, 15px, letter-spacing 0.01em
- Padding: 14px 28px (desktop) / 12px 24px (mobile)
- Border-radius: 8px
- Sombra: 0 4px 24px rgba(45, 122, 255, 0.40)
- Hover: background #4D90FF, sombra 0 6px 32px rgba(45, 122, 255, 0.50)
- Active: background #1A60DD, transform scale(0.98)
- Transition: all 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)
```

**Variante Cyan (urgência máxima — 1 por página, no máximo):**

```
- Background: #00B4FF
- Texto: #000000 (preto para contraste máximo sobre cyan claro)
- Sombra: 0 4px 24px rgba(0, 180, 255, 0.40)
- Hover: background #22C4FF
```

### 8B. CTA Button — Secondary (Blue Master Outline)

```
Especificação:
- Background: transparent
- Border: 1px solid rgba(74, 144, 255, 0.40)
- Texto: #4A90FF (Blue Master)
- Font: Inter 600, 15px
- Padding: 14px 28px
- Border-radius: 8px
- Hover: background rgba(74, 144, 255, 0.08), border rgba(74, 144, 255, 0.60)
- Transition: all 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)
```

**Uso:** Botões secundários de ecossistema, links para outras camadas de marca. Usa o blue master (não o elétrico) para sinalizar contexto de ecossistema.

### 8C. CTA Button — Ghost (White Outline)

```
Especificação:
- Background: transparent
- Border: 1px solid rgba(255, 255, 255, 0.20)
- Texto: rgba(255, 255, 255, 0.70)
- Font: Inter 500, 15px
- Padding: 14px 28px
- Border-radius: 8px
- Hover: border rgba(255, 255, 255, 0.40), texto #FFFFFF
```

### 8D. Badge Elétrico

```
Especificação:
- Background: rgba(45, 122, 255, 0.12)
- Border: 1px solid rgba(45, 122, 255, 0.30)
- Texto: #7AB0FF (Elétrico Text)
- Font: Inter 700, 12px, letter-spacing 0.05em, uppercase
- Padding: 4px 10px
- Border-radius: 4px
```

**Exemplos de uso:** "Z7 Days", "Vagas Limitadas", "Movimento Ativo", "Time Builder"

**Badge Cyan (urgência máxima — 1 por página):**

```
- Background: rgba(0, 180, 255, 0.10)
- Border: 1px solid rgba(0, 180, 255, 0.30)
- Texto: #55CCFF (Cyan Text)
```

**Exemplos:** "Encerra em 48h", "Última Chance"

### 8E. Card — Produto Z7

```
Especificação (estado normal):
- Background: var(--surface-2) = #111111
- Border: 1px solid rgba(45, 122, 255, 0.12)
- Border-radius: 12px
- Padding: 32px (desktop) / 24px (mobile)

Estado hover:
- Border: 1px solid rgba(45, 122, 255, 0.30)
- Box-shadow: 0 0 50px rgba(45, 122, 255, 0.12)
- Transition: all 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)

Card Featured (produto principal Z7 Days):
- Usa Time Scanner (borda animada em azul elétrico)
- Background: var(--surface-3) = #161616 (1 nível mais elevado)
- Badge "Programa Principal" no topo (badge elétrico)
```

### 8F. Stat / Métrica

```
Especificação:
- Número: Inter 800, clamp(48px, 6vw, 80px), #FFFFFF
- Unidade (ex: "dias", "horas"): Inter 600, 20px, rgba(255,255,255,0.50)
- Label descritivo: Inter 500, 13px, rgba(255,255,255,0.50), uppercase, letter-spacing 0.05em
- Separador visual opcional: 1px horizontal rgba(45,122,255,0.20)
```

**Stat de destaque máximo (1 por seção):**

```
- Número: Inter 800, clamp(64px, 8vw, 96px), #2D7AFF (Elétrico Primary)
- Acompanhado de Z7 Pulse ativo
```

### 8G. Número Z7 em Destaque

```
Especificação:
- "7" sozinho como visual hero: Inter 800, 120-160px, Elétrico Text (#7AB0FF)
- "Z7" como símbolo: Inter 800, varia por contexto, Elétrico Primary (#2D7AFF)
- Line-height: 0.9 (mais comprimido — evoca a ampulheta)
- Letter-spacing: -0.04em (Z e 7 próximos = silhueta de ampulheta)
```

### 8H. Seção de Progresso — 7 Dias / 7 Horas

```
Lista de estágios (Dia 1: ..., etc.):
- Container: flex coluna, gap 0px (itens grudados)
- Linha vertical de conexão: 2px solid rgba(45,122,255,0.20) à esquerda
- Marcador de etapa (ponto): 8px, border-radius 50%, background elétrico
  - Etapa concluída: Elétrico Primary (#2D7AFF)
  - Etapa atual: Elétrico Primary com glow 0 0 12px rgba(45,122,255,0.50)
  - Etapa futura: rgba(255,255,255,0.20)
- Número da etapa: Inter 700, 12px, Elétrico Text (#7AB0FF)
- Nome da etapa: Inter 700, 18px, White
- Descrição: Inter 400, 15px, rgba(255,255,255,0.60)
```

### 8I. Navigation — Time Builders

O nav usa o **Blue master do ecossistema**, não o elétrico:

```
- Background: rgba(0, 0, 0, 0.85), backdrop-blur: 20px
- Logo/Brand: White
- Links: rgba(255,255,255,0.70), hover White
- CTA do nav: Blue Master (#4A90FF), texto branco
- Underline ativo: Blue Master (#4A90FF) — mantém conexão com ecossistema
```

---

## 9. REGRAS DE COEXISTÊNCIA COM O MASTER

### 9A. O que Time Builders herda do Master (inalterado)

- Toda a escala de superfícies (Surface-0 a Surface-4)
- Toda a escala de opacidade de texto
- Toda a escala de espaçamento (space-xs a space-4xl)
- O sistema de grid (12 colunas desktop, 4 mobile)
- O container max-width de 1200px
- As regras de acessibilidade (WCAG AA mínimo)
- A família tipográfica Inter Variable

### 9B. O que Time Builders modifica do Master

| Elemento | Master | Time Builders |
|----------|--------|---------------|
| Acento principal de conteúdo | Blue #4A90FF | **Elétrico #2D7AFF** (mais saturado) |
| Acento de urgência máxima | — | **Cyan #00B4FF** |
| Peso de headline | 700 | **800** |
| Glow/pool de luz | Blue ambient (sutil) | **Z7 Pulse (mais intenso)** |
| Sombra de botão | Blue glow sutil | **Elétrico glow mais forte** |
| Border de card featured | Blue accent | **Time Scanner (borda animada)** |
| Badge de destaque | Blue | **Elétrico** |
| Scanner border | — | **Time Scanner em elétrico/cyan** |

### 9C. Regra de Separação Nav/Footer vs. Conteúdo

```
NAV e FOOTER: Sempre Blue Master (#4A90FF)
↓
CONTEÚDO DA PÁGINA: Elétrico (#2D7AFF) como acento principal
CONTEÚDO DE URGÊNCIA: Cyan (#00B4FF) usado com extrema parcimônia (1 por página)
```

Essa separação é inegociável. O nav/footer em blue master comunica ao visitante que está dentro do ecossistema Reis IA. O conteúdo em elétrico comunica que está na camada Time Builders. A intensidade do elétrico sobre o master cria distinção de camada sem fragmentar o ecossistema.

### 9D. Páginas Mistas (Ecossistema + Time Builders)

Quando uma página do master Reis IA apresenta Time Builders como produto dentro de outras ofertas:

- O card/section de Time Builders pode ter borda elétrica
- O restante da página usa o acento blue master
- Nunca elétrico e cyan no mesmo componente individual
- Usar badge "Time Builders" com tratamento elétrico para contextualizar a camada

---

## 10. EXEMPLOS DE APLICAÇÃO

### 10A. Hero — Sales Page Z7 Days

```
Layout:
- Background: Surface-0 (#000000)
- Z7 Pulse ativo (piscina elétrica intensa no rodapé do hero)
- Badge elétrico no topo: "Z7 Days — Programa Principal"
- Headline: Inter 800, Display, #FFFFFF
  → Número "7" em destaque: Elétrico Primary (#2D7AFF)
  → "Z7" como símbolo: peso 800, letra-spacing -0.04em
- Subtítulo: Inter 400, Body Large, rgba(255,255,255,0.70)
- CTA primário: Botão elétrico
- CTA secundário: Ghost white button
- Acima do fold: Nenhum elemento cyan visível (reservado para CTA final)
```

### 10B. Section — Os 7 Dias

```
Layout:
- Background: Surface-1 (#0A0A0A)
- Título: Inter 800, H2, #FFFFFF
- 7 cards empilhados verticalmente (mobile) ou grid 1×7 (desktop)
- Cada card: borda elétrica estática (não scanner)
- Dia mais importante (Z7 Days): Card featured com Time Scanner ativo
- Numeração (01-07): Elétrico Text (#7AB0FF), peso 800, tamanho grande
```

### 10C. Section — Prova Social / Stats

```
Layout:
- Background: Surface-0 (#000000)
- Z7 Pulse sutil ativo
- 3 métricas em linha: "7 dias", "7 anos comprimidos", "Z7 em execução"
- Primeira métrica (mais importante): número em Elétrico Primary (#2D7AFF)
- Segunda e terceira: números em White
- Labels: Inter 500, 13px, rgba(255,255,255,0.50)
- Separadores: linha 1px rgba(45,122,255,0.20) entre métricas (desktop)
```

### 10D. CTA Final

```
Layout:
- Background: Surface-1 + Z7 Pulse urgent (cyan) ativo
- Box CTA: usa Time Scanner urgent (borda rotativa cyan — urgência máxima)
- Headline em branco, subheadline em elétrico text
- Botão: Cyan Primary (#00B4FF), texto preto, tamanho grande (padding 18px 36px)
- Badge de urgência: badge cyan "Última Chance" ou "Encerra em X"
```

---

## 11. PROIBIÇÕES ESPECÍFICAS

### 11A. Proibições de Cor

1. **Nunca usar amber (#FF8C42), gold (#C4A265) ou terracotta (#C47A5A) em páginas Time Builders.** Essas cores pertencem a versões anteriores eliminadas ou a outras camadas. Presença de qualquer uma delas quebra a coerência do ecossistema azul.
2. **Nunca elétrico ou cyan no nav ou footer.** Nav/footer são sempre blue master — é a cola do ecossistema.
3. **Nunca mais de 2 elementos elétricos por viewport.** A urgência do elétrico vem da escassez do seu uso.
4. **Nunca mais de 1 elemento cyan por página inteira.** O cyan é a cor de urgência máxima — se aparecer frequentemente, perde o impacto.
5. **Nunca elétrico e cyan simultaneamente no mesmo viewport.** Cada viewport usa uma cor de acento por vez — elétrico OU cyan, nunca os dois.
6. **Nunca Warm White (#F5F0E8) em páginas Time Builders.** A superfície é sempre escura — o ecossistema vive no dark mode.

### 11B. Proibições de Animação

1. **Nunca mais de 1 Time Scanner ativo por viewport.** O scanner é o efeito mais chamativo — saturar o viewport com múltiplos scanners destrói o impacto.
2. **Nunca animações de acento em contextos de leitura longa.** O scanner é apenas para CTAs e cards de produto. Nunca em seções de texto corrido.

### 11C. Proibições de Tipografia

1. **Nunca "z7" em caixa baixa.** Sempre "Z7".
2. **Nunca "Z 7" (com espaço) ou "Z-7" (com hífen).** Sempre junto: "Z7".
3. **Nunca peso 400 em headline Time Builders.** O mínimo é 700. A energia tribal exige peso visual.

### 11D. Proibições de Componentes

1. **Nunca tabelas de preço no estilo SaaS** (tiers, checkmarks de features). Toda conversão é direcionada para /agendar ou /aplicar.
2. **Nunca CTAs para páginas externas que não sejam /agendar ou /aplicar.**
3. **Nunca ícones decorativos coloridos além de elétrico e blue master.** Elementos visuais adicionais sempre em branco/cinza.
4. **Nunca usar o scanner em mais de 1 card por seção.** O scanner é um indicador de destaque único — se múltiplos cards têm scanner, nenhum é destaque.

---

## 12. CONEXÃO COM A FILOSOFIA Z7 E "O TEMPO É REI"

### 12A. "O Tempo é Rei" — Tradução Visual

Cada elemento deste design system é uma expressão da filosofia:

| Filosofia | Expressão Visual |
|-----------|-----------------|
| "O tempo é o recurso mais valioso" | Escassez de cor — apenas 2 elementos de acento por viewport |
| "Compressão temporal com perfeição" | Z7 Pulse — luz que emana, como energia em estado de compressão |
| "Velocidade com direção" | Azul elétrico — mais saturado que o master, transmite mais velocidade |
| "O relógio está correndo" | Time Scanner — borda que gira, como um radar em missão |
| "Z7 é a ampulheta" | Tipografia Z7 — peso 800, letter-spacing -0.04em, os dois caracteres formam a silhueta |
| "Urgência máxima = ação agora" | Cyan #00B4FF — a cor mais fria e mais tecnológica, reservada para o momento decisivo |

### 12B. Expressão por Produto Z7

**Z7 Hours (a faísca):** Preferir o Cyan nos badges e elements de destaque desta experiência. O cyan é a faísca — instantânea, brilhante, tecnológica.

**Z7 Days (o forjamento):** O Elétrico Primary como acento principal. O Time Scanner no card featured. A silhueta de ampulheta em Z7 proeminente no hero. Este é o produto central.

**Z7 Months (a evolução):** Variação mais tranquila do elétrico — preferir o Elétrico Bright (#5599FF) e glows mais sutis. A evolução é contínua, não urgente. Intensidade moderada.

### 12C. Diferenciação Dentro do Ecossistema

```
Blue Master (#4A90FF)  →  Confiança corporativa do ecossistema Reis IA
Elétrico (#2D7AFF)    →  Velocidade e ação do movimento Time Builders
Cyan (#00B4FF)        →  Urgência máxima, o momento decisivo Z7
Soft Blue (#6AADFF)   →  Humanidade de Moroni Reis (outro DS)
```

Quem olha para o azul elétrico sente algo diferente do blue master — mais vibrante, mais urgente. Quem olha para o cyan sente o pulso de um relógio digital. As cores contam a história da compressão temporal sem precisar de palavras.

---

## VERSÃO ANTERIOR

[VERSÃO ANTERIOR — 2026-03-18 — v1.0]

A versão anterior deste documento usava **Electric Amber (#FF8C42)** como acento principal Time Builders, com metáfora de "forja" (calor, fogo, metal aquecido). Os efeitos "Forge Glow", "Amber Scanner" e "Forge Particle" foram removidos. A paleta amber completa (opacity ladder de 12 passos) foi removida. O conceito de "Forja" como narrativa visual foi eliminado e substituído pela expressão direta da filosofia Z7 e "O Tempo é Rei".

---

## CHANGELOG

| Data | Versão | Alteração |
|------|--------|-----------|
| 2026-03-18 | v1.0 | Criação inicial do DS Time Builders — acento amber |
| 2026-03-18 | v2.0 | Revisão completa: remoção do amber e metáfora de forja. Nova direção azul elétrico (#2D7AFF) + cyan (#00B4FF). Efeitos renomeados: Z7 Pulse e Time Scanner. Conexão explícita com filosofia Z7 e "O Tempo é Rei". |
| 2026-03-18 | v2.1 | VFX Integration: adição da Seção 13 com efeitos Z7 específicos do Time Builders. |

---

## 13. EFEITOS VFX — TIME BUILDERS [ADDED — VFX Integration — 2026-03-18]

Efeitos visuais específicos do Time Builders. Todos os previews de referência estão em `design-previews/`.

### 13A. Z7 como Elemento Visual

O símbolo "Z7" é o identificador visual do movimento Time Builders. Além do tratamento tipográfico estático (Seção 5B), o Z7 possui variações animadas implementadas.

**Regra de opacidade Z:** quando Z e 7 aparecem combinados como símbolo estático "Z7", o Z é renderizado a `opacity: 0.7`. O 7 lidera visualmente; o Z complementa. Essa assimetria de opacidade é deliberada — reforça que o resultado (7 = perfeição alcançada) é mais importante que o ponto de partida (Z = encerramento do ciclo anterior). Nunca renderizar Z e 7 no mesmo peso visual simultâneo.

**Variações do símbolo Z7 disponíveis:**

| Variação | Descrição | Uso |
|----------|-----------|-----|
| Z7 estático — azul elétrico | `#2D7AFF`, peso 800, letter-spacing -0.04em, Z a 0.7 opacity | Hero headlines, badges de produto |
| Z7 estático — cyan | `#00B4FF`, mesmo tratamento, Z a 0.7 opacity | Contextos de urgência máxima (1 por página) |
| Z7 estático — branco | `#FFFFFF`, Z a 0.7 opacity | Inline em corpo de texto |
| Z7 como marca d'água | 200-400px, opacidade 3-5%, pointer-events none | Background de seções hero e CTA do Time Builders |
| Z7 como badge | Background rgba elétrico, borda, padding 4px 8px, Z a 0.7 opacity | Tags de programa, selos de produto |

**Referência:** `design-previews/z7-loading-animations-preview.html`

---

### 13B. Z→7→Ampulheta Animation — Marca-d'Água do Movimento

A animação de morphing Z→7→Ampulheta é a animação de assinatura do Time Builders. É o equivalente animado do símbolo Z7 — conta visualmente a história da compressão temporal.

**7 variações disponíveis:**

| ID | Nome | Descrição | Uso Time Builders |
|----|------|-----------|-------------------|
| Z1 | Hero (Longa) | Sequência completa com pauses dramáticos entre cada morfismo. | Splash screen de páginas Z7 Days, intro de sales page |
| Z2 | Transição (Curta) | Versão comprimida, sem pauses. Duração ~1s. | Transições entre seções, loading de passagem |
| Z3 | Loop | Z→7→Ampulheta→Z em loop contínuo. | Ícone de marca em movimento para media embeds, loading de dashboard |
| Z4 | Hover | Estática como Z7; hover transforma em ampulheta. | Ícones de nav Time Builders, botões de ação interativos |
| Z5 | Aproximação | Z e 7 se aproximam antes do morfismo. | Momentos de fusão, intro de seção "Os 7 Dias" |
| Z6 | Encaixe Lateral | Z entra da esquerda, 7 da direita; encaixam e transformam. | Títulos animados, abertura de seção de resultado |
| Z7-anim | Construção Alternada | Linhas de Z e 7 construídas alternadamente antes do morfismo. | Onboarding, explicação didática do símbolo Z7 |

**Nota de uso no Time Builders:** preferir Z1, Z3 e Z4 para uso recorrente. Z2 e Z6 para transições pontuais. Nunca mais de 1 animação Z→7→Ampulheta em loop ativo por viewport.

**Referência:** `design-previews/z7-loading-animations-preview.html` — Seção 2

---

### 13C. Z7 Loading Animations — Para Estados de Carregamento

7 variações de loading usando a ampulheta H1-B. Usadas em estados de carregamento de dashboard, processamento de IA, transições de página.

| ID | Nome | Timing | Uso Time Builders |
|----|------|--------|--------------------|
| L1 | Rotação Completa 360° | 2s linear infinite | Inline spinner genérico em botões e cards |
| L2 | Rotação 180° Flip | 3s ease-in-out infinite | Loading de "inversão de paradigma" — hero de Z7 Hours |
| L3 | Easing Variado | timing orgânico infinite | Loading de processamento de IA (parece "pensando") |
| L4 | Rotação 3D | perspectiva CSS infinite | Loading premium de dashboard Z7 |
| L5 | Pêndulo | oscilação infinite | Loading de aguarda de resultado — estados de análise |
| L6 | Pulse | escala + opacidade infinite | Loading de presença — "sistema ativo" |
| L7 | Trail | motion trail infinite | Loading de alta velocidade — processamento Z7 em execução |

**Tamanhos disponíveis:** 24px (inline), 48px (componente), 96px (hero loading).

**Referência:** `design-previews/z7-loading-animations-preview.html` — Seção 1
