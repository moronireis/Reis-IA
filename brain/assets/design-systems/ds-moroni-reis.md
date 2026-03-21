# Moroni Reis — Design System (Marca Pessoal)

Última atualização: 2026-03-18 (VFX Integration)

> **Owner**: designer-agent
> **Status**: v2.0 — Revisão completa. Nova direção: Azul Mais Quente/Humano. Paleta terracotta e Warm White removidos.
> **Consumido por**: dev-agent, designer-agent (specs de página)
> **Contexto**: Design system específico para a marca pessoal de Moroni Reis. Opera dentro da arquitetura master do Reis IA Design System. Este DS governa a seção "Fundador" em qualquer página, o perfil público de Moroni, e conteúdos de bastidores/pessoais. Acento primário: Soft Blue (#6AADFF) — mais suave e quente que o blue master, transmite acessibilidade e conexão humana enquanto mantém pertencimento ao ecossistema. A base de superfícies é idêntica ao master.
> **Dependência upstream**: `reis-ia-design-system.md` (master), `brain/assets/branding/tempo-e-rei-brand-philosophy.md`

---

## ÍNDICE

1. [Filosofia Visual](#1-filosofia-visual)
2. [Paleta Completa](#2-paleta-completa)
3. [Opacity Ladder do Soft Blue](#3-opacity-ladder-do-soft-blue)
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

Moroni Reis é **humano, pessoal, acessível**. A identidade visual encarna a tensão produtiva do personagem: rigor intelectual + conexão genuína. Não é o frio da consultoria corporativa (Systems). Não é a urgência do movimento tribal (Time Builders). É a precisão de alguém que pensa muito e faz ainda mais — com abertura genuína para quem está do outro lado.

### Princípios Visuais Moroni Reis

1. **Acessibilidade sem perda de autoridade.** O Soft Blue (#6AADFF) é mais claro e mais quente que o blue master. A diferença é perceptível: onde o master transmite instituição, o Soft Blue transmite pessoa. Mesma família cromática, temperatura emocional diferente.
2. **O fundador como âncora, não como adorno.** Fotografias de Moroni são usadas com intenção — não como decoração ou prova de existência. Quando aparece, a foto ancora a narrativa.
3. **Citações como arquitetura.** As frases de Moroni são tratadas visualmente como destaques estruturais — não como boxes decorativos. O peso tipográfico e o recuo de blockquote comunicam que o conteúdo tem densidade.
4. **Conexão com o ecossistema sem subordinação.** O Soft Blue é o Accent Hover do master, aqui elevado a token primário. A marca pessoal de Moroni é parte do ecossistema — mas é a parte mais humana. O azul mais suave traduz isso visualmente.
5. **Tipografia leve como voz pessoal.** O peso tipográfico mais baixo (400-500 em headlines) é a diferença mais radical do DS Moroni. É o design que diz: "Eu não preciso me impor. Eu tenho o que dizer."

### "O Tempo é Rei" — Expressão Moroni Reis

A filosofia de tempo na marca pessoal de Moroni se manifesta de forma mais narrativa:

- Moroni Reis não apenas ensina o valor do tempo — ele É a prova viva da filosofia. O nome literalmente contém o "Rei".
- A tipografia mais leve (peso 400-500) comunica que Moroni já chegou. Não precisa de urgência gráfica — o tempo trabalha a seu favor.
- As citações de Moroni são tratadas com generosidade de espaço e leveza tipográfica — são palavras que merecem ser lidas devagar, não escaneadas.
- O Soft Blue nas tags e contextos de ecossistema comunica: Moroni é a entrada humana para um sistema de alto impacto.

---

## 2. PALETA COMPLETA

### 2A. Cores Base (Idênticas ao Master)

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| Surface-0 / Void | `#000000` | rgb(0, 0, 0) | Background principal |
| Surface-1 / Base | `#0A0A0A` | rgb(10, 10, 10) | Seções alternadas padrão |
| Surface-2 / Raised | `#111111` | rgb(17, 17, 17) | Cards padrão |
| Surface-3 / Elevated | `#161616` | rgb(22, 22, 22) | Card hover, inputs |
| Surface-4 / Float | `#1A1A1A` | rgb(26, 26, 26) | Dropdowns, tooltips |

**Nota:** O DS Moroni v2.0 mantém as superfícies idênticas ao master. A versão anterior introduzia superfícies "quentes" (Warm Surface #0D0B09, Warm Card #141210) que foram eliminadas junto com a paleta terracotta.

### 2B. Cores de Texto (Idênticas ao Master)

| Token | Valor | Uso |
|-------|-------|-----|
| Text Primary | `#FFFFFF` (100%) | Headlines em fundo escuro |
| Text Secondary | `rgba(255,255,255,0.70)` | Body copy em fundo escuro |
| Text Tertiary | `rgba(255,255,255,0.50)` | Captions, metadados |
| Text Quaternary | `rgba(255,255,255,0.35)` | Texto decorativo |
| Text Muted | `rgba(255,255,255,0.20)` | Ghost elements |

### 2C. Soft Blue — O Acento Moroni Reis

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| **Soft Blue Primary** | `#6AADFF` | rgb(106, 173, 255) | Destaques pessoais, bordas de bio, blockquotes, CTAs pessoais |
| **Soft Blue Hover** | `#88BEFF` | rgb(136, 190, 255) | Hover state do Soft Blue |
| **Soft Blue Active** | `#4A90FF` | rgb(74, 144, 255) | Active/pressed — converge com o blue master ao ser pressionado |
| **Soft Blue Muted** | `rgba(106, 173, 255, 0.60)` | — | Referências de ecossistema, tags contextuais |
| **Soft Blue Text** | `#A8CEFF` | rgb(168, 206, 255) | Soft Blue em texto corrido (mais claro para legibilidade) |

**Relação com o ecossistema:** O Soft Blue (#6AADFF) é exatamente o Accent Hover do blue master (#4A90FF). Isso cria uma hierarquia clara: quando o visitante percebe o Soft Blue de Moroni, está vendo a versão "hover" do ecossistema — mais próxima, mais acessível, mais humana.

### 2D. Blue Master — Presença de Ecossistema

Quando o conteúdo de Moroni referencia produtos ou camadas do ecossistema, usa o blue master para essas referências:

| Nome | Hex | RGB | Uso |
|------|-----|-----|-----|
| Blue Master | `#4A90FF` | rgb(74, 144, 255) | Links de navegação de ecossistema, tags de produto (Z7 Days, Systems) |
| Blue Master Muted | `rgba(74, 144, 255, 0.60)` | — | Referências de ecossistema mais sutis |

---

## 3. OPACITY LADDER DO SOFT BLUE

8 passos — mais que Systems (sem ladder própria) por ser mais expressivo, menos que Time Builders (12 passos) por ser mais contido. O Soft Blue é usado com mais liberdade que o azul do Systems, mas com mais contenção que o elétrico do Time Builders.

| Passo | Opacidade | Valor CSS | Uso Típico |
|-------|-----------|-----------|------------|
| Soft-01 | 3% | `rgba(106, 173, 255, 0.03)` | Background de seção pessoal extremamente sutil |
| Soft-02 | 6% | `rgba(106, 173, 255, 0.06)` | Soft Pool base — luz difusa atrás de bio section |
| Soft-03 | 10% | `rgba(106, 173, 255, 0.10)` | Card com toque Soft Blue sutil |
| Soft-04 | 16% | `rgba(106, 173, 255, 0.16)` | Borda de card bio/depoimento |
| Soft-05 | 25% | `rgba(106, 173, 255, 0.25)` | Borda de card em hover |
| Soft-06 | 40% | `rgba(106, 173, 255, 0.40)` | Linha decorativa de blockquote |
| Soft-07 | 65% | `rgba(106, 173, 255, 0.65)` | Marcador Soft Blue, ícone de destaque |
| Soft-08 | 100% | `rgba(106, 173, 255, 1.00)` | Soft Blue puro — acento, CTA pessoal, linha da foto |

### Gradientes Soft Blue

```css
/* Soft Pool — piscina de luz difusa atrás de seções pessoais */
background: radial-gradient(ellipse 60% 50% at 30% 80%, rgba(106, 173, 255, 0.06) 0%, transparent 70%);

/* Soft Corner — canto de luz suave */
background: radial-gradient(40% 60% at 0% 100%, rgba(106, 173, 255, 0.08) 0%, transparent 100%);

/* Soft Fade — borda gradient */
background: linear-gradient(90deg, #6AADFF 0%, rgba(106, 173, 255, 0) 100%);

/* Soft Surface Fade — transição de seção */
background: linear-gradient(180deg, #0A0A0A 0%, #000000 100%);
```

---

## 4. REGRAS DE TIPOGRAFIA

### 4A. Escala (Herda do Master — com modulações)

| Token | Desktop | Mobile | **Peso Moroni** | Letter-Spacing |
|-------|---------|--------|----------------|----------------|
| Display | 72px | 40px | **500** | -0.02em |
| H1 | 56px | 36px | **500** | -0.018em |
| H2 | 48px | 30px | **500** | -0.015em |
| H3 | 36px | 26px | **400** | -0.010em |
| H4 | 28px | 22px | **400** | -0.005em |
| H5 | 24px | 20px | **400** | 0 |
| Body Large | 20px | 18px | **400** | 0 |
| Body | 16px | 16px | **400** | 0 |
| Caption | 13px | 12px | 400 | 0.01em |

**Modulações Moroni:**
- Headlines em peso 400-500 (mais leve que todos os outros — mais humano, menos institucional).
- O peso reduzido comunica: "Eu não preciso me impor. Eu tenho o que dizer."
- Body idêntico ao master — o conteúdo pessoal é para leitura, não para impacto gráfico rápido.
- Labels e tags de ecossistema permanecem em 600 — o contexto técnico mantém peso.

### 4B. Citações — Tratamento Especial

As frases de Moroni têm tratamento tipográfico próprio:

```
Citação (blockquote grande):
- Font: Inter 300 italic
- Size: clamp(22px, 3vw, 32px)
- Color: rgba(255, 255, 255, 0.85) — ligeiramente abaixo do white puro
- Line-height: 1.5
- Borda esquerda: 3px solid #6AADFF (Soft Blue Primary)
- Padding-left: 24px
- Font-style: italic
- Letter-spacing: 0.01em

Atribuição (nome do autor):
- Font: Inter 500, 13px
- Color: rgba(255, 255, 255, 0.45)
- Letter-spacing: 0.04em
- Margin-top: 12px

Citação Inline (highlight em texto):
- Color: #A8CEFF (Soft Blue Text)
- Font-weight: 500 (não italic quando inline)
```

### 4C. Soft Blue em Tipografia

O Soft Blue em texto usa sempre `#A8CEFF` (Soft Blue Text — versão ainda mais clara para legibilidade em tamanhos menores):

```css
/* Palavra de destaque Soft Blue em headline */
.highlight-soft {
  color: #A8CEFF;
  font-weight: 500;
}

/* Para textos de 48px ou maiores, o Soft Blue Primary pode ser usado */
.stat-number-soft {
  color: #6AADFF;
  font-weight: 500;
}

/* Borda de blockquote */
.moroni-blockquote {
  border-left: 3px solid #6AADFF;
}
```

---

## 5. CSS CUSTOM PROPERTIES

### 5A. Tokens Soft Blue

```css
:root {
  /* Soft Blue — Acento Principal Moroni Reis */
  --moroni-soft-blue: #6AADFF;
  --moroni-soft-blue-hover: #88BEFF;
  --moroni-soft-blue-active: #4A90FF;
  --moroni-soft-blue-muted: rgba(106, 173, 255, 0.60);
  --moroni-soft-blue-text: #A8CEFF;

  /* Opacity Ladder — 8 passos */
  --soft-01: rgba(106, 173, 255, 0.03);
  --soft-02: rgba(106, 173, 255, 0.06);
  --soft-03: rgba(106, 173, 255, 0.10);
  --soft-04: rgba(106, 173, 255, 0.16);
  --soft-05: rgba(106, 173, 255, 0.25);
  --soft-06: rgba(106, 173, 255, 0.40);
  --soft-07: rgba(106, 173, 255, 0.65);
  --soft-08: rgba(106, 173, 255, 1.00);

  /* Blue Master — para referências de ecossistema */
  --moroni-blue-master: #4A90FF;
  --moroni-blue-master-muted: rgba(74, 144, 255, 0.60);

  /* Sombras Soft Blue — difusas, não intensas */
  --shadow-soft-pool: 0 0 80px rgba(106, 173, 255, 0.06);
  --shadow-soft-subtle: 0 0 40px rgba(106, 173, 255, 0.04);
  --shadow-soft-button: 0 4px 20px rgba(106, 173, 255, 0.20);

  /* Gradientes Soft Blue */
  --gradient-soft-pool: radial-gradient(ellipse 60% 50% at 30% 80%, rgba(106, 173, 255, 0.06) 0%, transparent 70%);
  --gradient-soft-corner: radial-gradient(40% 60% at 0% 100%, rgba(106, 173, 255, 0.08) 0%, transparent 100%);
  --gradient-soft-fade: linear-gradient(90deg, #6AADFF 0%, rgba(106, 173, 255, 0) 100%);
}
```

### 5B. Tokens de Componente (Moroni Reis)

```css
:root {
  /* Blockquotes */
  --blockquote-border: var(--moroni-soft-blue);     /* 3px solid */
  --blockquote-text: rgba(255, 255, 255, 0.85);
  --blockquote-attribution: rgba(255, 255, 255, 0.45);

  /* Cards de Bio */
  --bio-card-border: rgba(106, 173, 255, 0.16);
  --bio-card-border-hover: rgba(106, 173, 255, 0.30);
  --bio-card-bg: var(--surface-2);

  /* Foto */
  --photo-border: rgba(106, 173, 255, 0.30);
  --photo-filter: saturate(0.85) brightness(0.96);  /* desaturação elegante sem tom quente */

  /* Tags de contexto de ecossistema (Blue Master) */
  --context-tag-color: var(--moroni-blue-master);
  --context-tag-bg: rgba(74, 144, 255, 0.08);
  --context-tag-border: rgba(74, 144, 255, 0.20);

  /* CTAs */
  --cta-moroni-bg: var(--moroni-soft-blue);
  --cta-moroni-text: #000000;   /* preto para contraste máximo sobre soft blue */
  --cta-moroni-bg-hover: var(--moroni-soft-blue-hover);
  --cta-moroni-shadow: var(--shadow-soft-button);
}
```

---

## 6. EFEITOS ÚNICOS

### 6A. Soft Pool

O "Soft Pool" é a piscina de luz Soft Blue que aparece em seções pessoais. É mais suave e mais difusa que o Z7 Pulse do Time Builders — não é urgência, é presença. A luz vem de um lado, como a iluminação de uma conversa íntima.

**Especificação CSS:**

```css
.soft-pool {
  position: relative;
  overflow: hidden;
}

.soft-pool::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: -10%;
  width: 60%;
  height: 70%;
  background: radial-gradient(
    ellipse at 30% 80%,
    rgba(106, 173, 255, 0.06) 0%,
    rgba(106, 173, 255, 0.02) 40%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}
```

**Variante Bio Section (mais presente):**

```css
.soft-pool--bio::before {
  left: -20%;
  width: 80%;
  height: 90%;
  background: radial-gradient(
    ellipse at 20% 70%,
    rgba(106, 173, 255, 0.09) 0%,
    rgba(106, 173, 255, 0.04) 35%,
    transparent 65%
  );
}
```

**Onde usar:** Seção Fundador, bio completa, depoimento pessoal, seção de história de origem.

---

### 6B. Blockquote Visual

Não é apenas estilo CSS de texto — é um componente visual completo que trata as frases de Moroni como elementos de arquitetura:

```css
.moroni-blockquote {
  position: relative;
  padding: 24px 32px 24px 28px;
  border-left: 3px solid #6AADFF;
  background: transparent;
  margin: var(--space-xl) 0;
}

/* Aspas decorativas de fundo */
.moroni-blockquote::before {
  content: '"';
  position: absolute;
  top: -24px;
  left: 20px;
  font-size: 120px;
  font-weight: 700;
  line-height: 1;
  color: rgba(106, 173, 255, 0.06);
  font-family: Inter, sans-serif;
  pointer-events: none;
  user-select: none;
}

.moroni-blockquote__text {
  font-size: clamp(20px, 2.5vw, 28px);
  font-weight: 300;
  font-style: italic;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.01em;
  position: relative;
  z-index: 1;
}

.moroni-blockquote__attribution {
  margin-top: 16px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}
```

---

### 6C. Tratamento Fotográfico — Iluminação Rembrandt

A fotografia de Moroni usa processamento específico. A v2.0 mantém o tratamento de desaturação elegante, mas sem o tom quente/sépia da versão anterior:

**Filtro CSS:**

```css
.moroni-photo {
  filter: saturate(0.82) brightness(0.96);
  /* Desaturação elegante: remove ~18% de saturação
     Reduz levemente o brilho para profundidade
     Sem sepia — o tom permanece neutro, não quente */
}

/* Borda Soft Blue na foto */
.moroni-photo-wrapper {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(106, 173, 255, 0.25);
  box-shadow: 0 0 60px rgba(106, 173, 255, 0.05);
}
```

**Diretrizes de produção (para fotógrafo ou editor):**
- Iluminação: Lateral-alta da esquerda ou direita (Rembrandt) — não frontal plana
- Temperatura: Neutra (5000-5500K) — nem quente nem fria
- Sombras: Deixar sombras naturais — não preencher com fill light excessivo
- Expressão: Direcionada e calma — não sorrindo para a câmera, não postura tensa
- Fundo: Preto ou muito escuro, consistente com o design system
- Pós-processamento: Desaturação sutil (não P&B), manter neutro — sem sepia

---

### 6D. Tag de Contexto / Ecossistema

Quando o conteúdo de Moroni referencia um produto ou camada do ecossistema:

```css
.context-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 4px;
  background: rgba(74, 144, 255, 0.08);
  border: 1px solid rgba(74, 144, 255, 0.20);
  color: #4A90FF;   /* Blue Master — para referências de produto */
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
```

**Exemplos:** "Time Builders", "Systems", "Z7 Days", "Z7 Hours"

---

### 6E. Bio Section Especial — Layout Editorial

A seção de bio de Moroni tem um layout editorial que mistura fotografia com tipografia longa:

```
Layout Bio Section:
- Background: Surface-1 (#0A0A0A) + Soft Pool ativo
- Grid: 5 colunas (foto: cols 1-2, texto: cols 3-5) desktop
- Mobile: foto full-width no topo, texto abaixo

Foto (cols 1-2):
- Aspect ratio: 3/4 (retrato)
- Borda e filtro: ver 6C
- Caption opcional abaixo: "Moroni Reis, Fundador da Reis IA" em Text Tertiary

Texto (cols 3-5):
- Label acima: "O Fundador" — Soft Blue Text (#A8CEFF), 12px, uppercase
- Headline: Inter 500, H2, white
- Body: Inter 400, 17px, rgba(255,255,255,0.78), line-height 1.75
- Blockquote dentro do texto: ver 6B (borda Soft Blue)
```

---

## 7. COMPONENTES

### 7A. CTA Button — Primary (Soft Blue — Contexto Pessoal)

```
Especificação:
- Background: #6AADFF (Soft Blue Primary)
- Texto: #000000 (preto — contraste máximo sobre soft blue)
- Font: Inter 600, 15px
- Padding: 14px 28px
- Border-radius: 8px
- Sombra: 0 4px 20px rgba(106, 173, 255, 0.20)
- Hover: background #88BEFF, sombra 0 6px 28px rgba(106, 173, 255, 0.28)
- Active: background #4A90FF (converge com o blue master)
- Transition: all 0.15s cubic-bezier(0.25, 0.1, 0.25, 1)
```

### 7B. CTA Button — Secondary (Blue Master Outline)

Para links de ecossistema dentro do contexto de Moroni:

```
Especificação:
- Background: transparent
- Border: 1px solid rgba(74, 144, 255, 0.40)
- Texto: #4A90FF (Blue Master)
- Font: Inter 600, 15px
- Padding: 14px 28px
- Border-radius: 8px
- Hover: background rgba(74, 144, 255, 0.08), border rgba(74, 144, 255, 0.60)
```

**Uso:** Botão "Ver Z7 Days", "Conhecer o Ecossistema", links para produtos.

### 7C. CTA Button — Ghost (White Outline)

```
Especificação:
- Background: transparent
- Border: 1px solid rgba(255, 255, 255, 0.20)
- Texto: rgba(255, 255, 255, 0.70)
- Font: Inter 500, 15px
- Padding: 14px 28px
- Border-radius: 8px
- Hover: border rgba(255,255,255,0.40), texto #FFFFFF
```

### 7D. Card — Bio / Depoimento

```
Especificação:
- Background: var(--surface-2) = #111111
- Border: 1px solid rgba(106, 173, 255, 0.16)
- Border-radius: 12px
- Padding: 32px

Estado hover:
- Border: rgba(106, 173, 255, 0.30)
- Box-shadow: 0 0 40px rgba(106, 173, 255, 0.04)
- Transition: all 0.25s ease
```

### 7E. Timeline — História de Origem

```
Linha do tempo vertical para a narrativa de origem de Moroni:

- Linha vertical: 1px solid rgba(106, 173, 255, 0.20)
- Marcador de evento: 12px circle, background Soft Blue Primary (#6AADFF)
- Ano: Inter 600, 13px, Soft Blue Text (#A8CEFF), uppercase
- Título do evento: Inter 500, 18px, White
- Descrição: Inter 400, 15px, rgba(255,255,255,0.65)
- Gap entre eventos: var(--space-xl)
```

### 7F. Pilares de Conteúdo — Grid de Tópicos

```
Para seção de pilares de conteúdo de Moroni (Tempo, Construção, Estratégia, etc.):
- Grid: 2-3 colunas desktop, 1 coluna mobile
- Card de cada pilar:
  - Ícone: 24px, Soft Blue ou White
  - Nome do pilar: Inter 500, H4, White
  - Descrição: Inter 400, 15px, rgba(255,255,255,0.65)
  - Borda: 1px solid rgba(106, 173, 255, 0.16)
  - Sem CTA interno — pilares são descritivos
```

### 7G. Seção Fundador — Versão Compacta

Versão da bio que pode ser inserida em qualquer página (home, Systems, Time Builders):

```
Layout compacto:
- Fundo: Surface-1 (#0A0A0A)
- Soft Pool ativo (mais sutil)
- Foto circular ou quadrada pequena (64-80px), borda Soft Blue
- Nome: Inter 600, 18px, White
- Título: Inter 400, 14px, rgba(255,255,255,0.60)
- Citação curta ou linha de credencial: Soft Blue Text (#A8CEFF)
- Link "Ver mais sobre Moroni": Soft Blue Primary (#6AADFF)
```

### 7H. Navigation — Moroni (se existir URL próprio)

```
- Background: rgba(0, 0, 0, 0.85), backdrop-blur: 20px
- Logo/Nome: White
- Links: rgba(255,255,255,0.65), hover White
- CTA do nav: Soft Blue Primary (#6AADFF), texto preto
- Active underline: Soft Blue Primary
```

---

## 8. REGRAS DE COEXISTÊNCIA COM O MASTER

### 8A. O que Moroni herda do Master (inalterado)

- Toda a escala tipográfica (tamanhos, clamp formulas)
- Toda a escala de espaçamento
- O sistema de grid (12 colunas desktop, 4 mobile)
- O container max-width de 1200px
- Toda a escala de superfícies (Surface-0 a Surface-4, sem variantes quentes)
- As regras de acessibilidade (WCAG AA mínimo)

### 8B. O que Moroni modifica do Master

| Elemento | Master | Moroni Reis |
|----------|--------|-------------|
| Acento principal | Blue #4A90FF | **Soft Blue #6AADFF** (mais suave, mais quente) |
| Acento de ecossistema (tags) | — | **Blue Master #4A90FF** (para referências de produto) |
| Peso de headline | 700 | **400-500** |
| Ambient pool de luz | Blue (sutil) | **Soft Blue pool (ainda mais sutil)** |
| Sombra de botão | Blue glow | **Soft Blue glow (mais difuso)** |
| Blockquote border | — | **3px solid Soft Blue** |
| Foto treatment | — | **Rembrandt + desaturação neutra** |
| CTA primário | Blue | **Soft Blue Primary** |

### 8C. Regra de Inserção — Conteúdo Moroni em Qualquer Página

O conteúdo de Moroni pode aparecer dentro de qualquer página do ecossistema. Quando isso ocorre:

```
1. A seção "Fundador" usa Surface-1 (#0A0A0A) como background
2. O Soft Pool é ativado (mais sutil que na página própria de Moroni)
3. Os componentes de Moroni (blockquote, bio card) usam Soft Blue
4. O restante da página mantém o acento da sua camada (blue master, elétrico)
5. A seção de Moroni age como um "capítulo" com identidade própria dentro da página
6. Máximo 1 seção com tratamento Moroni por página
```

### 8D. Hierarquia de Acentos em Páginas Mistas

```
Página Systems com Seção Fundador:
→ Conteúdo Systems = quase sem cor (blue master muito esparso)
→ Seção Fundador = Soft Blue (#6AADFF)
→ Nenhum viewport deve ter o blue de Systems e o Soft Blue de Moroni simultaneamente

Página Time Builders com Seção Fundador:
→ Conteúdo Time Builders = Azul Elétrico (#2D7AFF)
→ Seção Fundador = Soft Blue (#6AADFF) — mais suave, claramente diferente do elétrico
→ Nenhum viewport deve ter elétrico + Soft Blue simultaneamente

Home com Seção Fundador:
→ Conteúdo master = Blue (#4A90FF)
→ Seção Fundador = Soft Blue (#6AADFF) — a versão mais humana do master
```

---

## 9. EXEMPLOS DE APLICAÇÃO

### 9A. Seção Fundador — Versão Completa

```
Layout:
- Background: Surface-1 (#0A0A0A)
- Soft Pool ativo (canto inferior esquerdo)
- Badge: "O Fundador" — Soft Blue Text (#A8CEFF), uppercase, 12px
- Headline: "Quem está do outro lado" — Inter 500, H2, White
- Subtítulo: Inter 400, 19px, rgba(255,255,255,0.70)
- Layout 5-col desktop: foto (2 cols) + texto (3 cols)
- Blockquote central no texto: borda Soft Blue, Inter 300 italic
- CTA: "Falar com Moroni" — Soft Blue button (background #6AADFF, texto #000000)
- Link: "Ler a história completa" — Soft Blue Primary text (#6AADFF)
```

### 9B. Seção de Citações / Mantras

```
Layout:
- Background: alternado com Surface-1
- Soft Pool muito sutil
- 3-4 frases em grid ou empilhadas
- Cada frase: componente Blockquote (borda Soft Blue)
- Atribuição: "Moroni Reis, Fundador da Reis IA"
- Sem CTA — seção de autoridade/credibilidade pura
```

### 9C. Página de Bio Completa (se existir)

```
Seções em ordem:
1. Hero: foto larga, Inter 500 Display, Soft Pool ativo
2. Sobre / História: Inter 400, body longo, blockquotes Soft Blue
3. Filosofia: Grid de mantras/frases — Soft Blue accents na borda de blockquotes
4. O Ecossistema: Seção com Blue Master em tags de produto (context-tags)
5. Contato/CTA: Soft Blue button, fundo Surface-1
```

### 9D. Conteúdo de Bastidores / Redes Sociais

```
Post/card de bastidores:
- Fundo: Surface-2 (#111111)
- Borda: Soft Blue sutil (rgba(106,173,255,0.16))
- Foto (se houver): tratamento Rembrandt desaturado
- Texto: Inter 400, 16px, rgba(255,255,255,0.80)
- Citação extraída: Inter 300 italic, borda Soft Blue
- Tag de contexto: Blue Master (ex: "Time Builders", "Z7 Days")
```

---

## 10. PROIBIÇÕES ESPECÍFICAS

### 10A. Proibições de Cor

1. **Nunca terracotta (#C47A5A) no contexto Moroni.** Essa cor foi eliminada do ecossistema. O Soft Blue substitui o papel do terracotta — mesma intenção de humanidade, dentro da família cromática azul.
2. **Nunca amber, gold ou cyan em contexto Moroni.** Essas cores pertencem a outras camadas ou foram eliminadas.
3. **Nunca Warm White (#F5F0E8) como fundo de seção.** O dark mode é absoluto em todo o ecossistema.
4. **Nunca Azul Elétrico (#2D7AFF) em contexto Moroni.** O elétrico é de Time Builders. A diferença entre elétrico e Soft Blue é a diferença entre urgência e conexão.
5. **Nunca Soft Blue no nav ou footer de páginas master.** O nav usa o blue master — o Soft Blue é exclusivo do conteúdo de Moroni.

### 10B. Proibições de Fotografia

1. **Nunca filtro frio/azulado intenso em fotos de Moroni.** O filtro é neutro (desaturação sem sepia nem tom azul excessivo).
2. **Nunca foto de estúdio com fundo branco.** Sempre fundo escuro consistente com o DS.
3. **Nunca pose de "guru em palco" com braços abertos.** O personagem é construtor e estrategista, não performer.
4. **Nunca foto com câmera/tech em excesso** (óculos de VR, laptops abertos como prop). A identidade é estratégica, não tech-first.

### 10C. Proibições de Tipografia

1. **Nunca peso 700-800 em headlines Moroni.** O máximo é 500. A leveza é parte da identidade.
2. **Nunca blockquote sem borda Soft Blue.** O estilo blockquote genérico não representa o DS Moroni.
3. **Nunca citações de Moroni em negrito pesado.** Inter 300 italic é o tratamento correto para frases de Moroni.

### 10D. Proibições de Componentes

1. **Nunca "aba de especialista" com lista de credenciais** (MBA em X, certificação Y). A autoridade de Moroni é construída por resultados e filosofia, não credenciais.
2. **Nunca CTA para redes sociais externas** como elemento principal. Links de redes podem existir no footer/rodapé, não como CTAs principais.
3. **Nunca Soft Pool sem Surface-1 como background.** O pool Soft Blue sobre Surface-0 puro parece desconexo — sempre combinar com Surface-1 ou superior.
4. **Nunca animações complexas em seções de bio.** O conteúdo pessoal é para leitura. Fade simples na entrada é permitido. Animações de atenção (scanners, particles) não são adequadas.

---

## 11. CONEXÃO COM A FILOSOFIA Z7 E "O TEMPO É REI"

### 11A. "O Tempo é Rei" — Encarnado por Moroni

A filosofia Z7 não é apenas o que Moroni ensina — é o que ele é:

| Filosofia | Expressão Visual em Moroni Reis |
|-----------|--------------------------------|
| "O sobrenome contém a resposta — Reis é rei do tempo" | Nome tratado com peso 600, destacado em contextos de identidade |
| "Moroni encarna a maestria do tempo" | Tipografia 400-500 — quem domina o tempo não precisa gritar |
| "Conexão genuína com quem está do outro lado" | Soft Blue — mais suave que o master, convida ao diálogo |
| "Precisão com calor" | Blockquote Inter 300 italic — a forma mais refinada de expressar a voz pessoal |
| "A entrada humana para um sistema de alto impacto" | Soft Pool difuso — luz que não direciona, que acolhe |

### 11B. Posicionamento Visual no Ecossistema

```
Blue Master (#4A90FF)   →  Confiança institucional do ecossistema
Azul Elétrico (#2D7AFF) →  Velocidade e ação do Time Builders
Soft Blue (#6AADFF)     →  A face humana do ecossistema — Moroni Reis
```

O Soft Blue é exatamente o hover state do blue master. Visualmente, a marca pessoal de Moroni é o ecossistema em seu estado mais acessível — como se você estivesse prestes a clicar. Está próximo, está alcançável, está presente.

### 11C. A Voz que Dá Nome ao Tempo

Moroni Reis é o "Reis" em "O Tempo é Rei". O design da marca pessoal precisa carregar essa identidade sem explicitar demais:

- A tipografia mais leve comunica quem chegou — não precisa provar nada.
- O Soft Blue é o azul do ecossistema em seu estado mais próximo ao visitante.
- O blockquote em Inter 300 italic é a voz de quem pensa antes de falar.
- A foto com tratamento Rembrandt é a imagem de alguém que sabe o peso do que carrega.

---

## VERSÃO ANTERIOR

[VERSÃO ANTERIOR — 2026-03-18 — v1.0]

A versão anterior deste documento usava **Terracotta (#C47A5A)** como acento primário, com opacity ladder de 8 passos e os efeitos "Warm Pool" e "Warm Corner" em terracotta. As superfícies "Warm Surface (#0D0B09)" e "Warm Card (#141210)" foram introduzidas como variantes quentes. O **Warm White (#F5F0E8)** era usado como fundo para seções íntimas. Todos esses elementos foram removidos. O Soft Blue (#6AADFF) substitui o terracotta como acento — mesma intenção de humanidade e acessibilidade, dentro da família cromática azul do ecossistema. As superfícies voltam ao master padrão. O dark mode é absoluto.

---

## CHANGELOG

| Data | Versão | Alteração |
|------|--------|-----------|
| 2026-03-18 | v1.0 | Criação inicial do DS Moroni Reis — acento terracotta, Warm White, superfícies quentes |
| 2026-03-18 | v2.0 | Revisão completa: remoção do terracotta (#C47A5A), Warm White, Warm Surface, Warm Card. Nova direção: Soft Blue (#6AADFF) como acento principal. Superfícies voltam ao master. Foto treatment: remoção do sepia, manutenção da desaturação neutra. Conexão com filosofia Z7 e "O Tempo é Rei". |
| 2026-03-18 | v2.1 | VFX Integration: adição da Seção 12 com nota sobre uso restrito de efeitos e critérios de elegância. |

---

## 12. EFEITOS VFX — MORONI REIS [ADDED — VFX Integration — 2026-03-18]

### 12A. Princípio Fundamental: Contenção e Elegância

O DS Moroni Reis é a camada mais humana e pessoal do ecossistema. Efeitos VFX neste contexto devem reforçar **presença e conexão**, nunca espetáculo ou urgência técnica. A regra-guia é: se o efeito parece que pertence a uma interface de software ou a um pitch de startup, não pertence ao DS Moroni.

**Filtro de decisão para VFX no contexto Moroni:**
- O efeito transmite calma e autoridade? → Pode usar.
- O efeito transmite urgência, velocidade ou tecnologia intensa? → Não usar.
- O efeito compete com o rosto de Moroni ou com as citações? → Não usar.
- O efeito seria invisível na primeira leitura e perceptível na segunda? → Esse é o ideal.

---

### 12B. Efeitos Permitidos (com restrições)

| Efeito | Fonte | Condição de Uso |
|--------|-------|-----------------|
| **Soft Pool (6A)** | DS Moroni nativo | Sempre que a seção tiver Surface-1 como fundo. Única exceção de "efeito de fundo" permitida. |
| **D1-T1 — Revelação por palavra** | `branding-elements-preview.html` D1 | Apenas para a frase "O Tempo é Rei" quando Moroni é o contexto. Velocidade reduzida (stagger 400ms vs 300ms padrão). |
| **D5 — Contraste Vilão/Herói** | `branding-elements-preview.html` D5 | Apenas em seção de narrativa de transformação ("Antes de encontrar IA" / "Depois"). Nunca na bio principal. |
| **D6 — .time-hover** | `branding-elements-preview.html` D6 | Apenas em cards de resultado pessoal de Moroni (tempo recuperado, projetos entregues). |
| **H1-B-2 — Watermark Breathing** | `hourglass-vfx-preview.html` | Apenas na bio principal como watermark de fundo muito sutil (opacidade máxima 2%). Breathing animation em 8s (mais lento que padrão). |
| **Animate-on-scroll (fade simples)** | DS master nativo | Sempre permitido. Fade de opacidade 0→1, sem translateY agressivo. |

---

### 12C. Efeitos Proibidos no Contexto Moroni

Os seguintes efeitos VFX são **explicitamente proibidos** no DS Moroni, mesmo que disponíveis no ecossistema:

1. **Animações Z→7→Ampulheta (Z1-Z7-anim)** — São efeitos do Time Builders. Urgência tribal é incompatível com autoridade pessoal.
2. **Z7 Loading rotations (L1-L7)** — Loading de IA é contexto técnico/produto. A camada Moroni é narrativa/pessoal.
3. **H1-B-3 — Hero Particle Formation** — Partículas convergindo criam espetáculo. O DS Moroni não precisa impressionar visualmente.
4. **H1-B-6 — Easter Egg 7 Cliques** — Easter eggs são para produtos e ferramentas, não para a identidade pessoal do fundador.
5. **H1-B-8 — Scanner Line** — A linha de scan é um efeito de interface técnica, incompatível com a leveza do DS Moroni.
6. **D2 — FOMO Barra de Oportunidade** — O DS Moroni não usa urgência fabricada. Pressão de escassez é contrária à filosofia de autoridade calma.
7. **A1-A5 (Efeitos Systems)** — São efeitos corporativos e técnicos. Não pertencem ao contexto pessoal.
8. **Time Scanner rotativo (Seção 7B do DS Time Builders)** — Scanner é urgência. Urgência não é Moroni.

---

### 12D. Nota sobre Animações de Bio e Citações

Seções de bio e citações de Moroni são para **leitura**, não para impacto visual rápido. Qualquer animação de entrada nessas seções deve:
- Usar apenas `opacity` (sem `transform`) para evitar deslocamento de texto durante a leitura.
- Duração máxima de 600ms (vs 800ms do padrão do master).
- Stagger entre elementos: mínimo 200ms (dar tempo de processar cada elemento).
- Nunca ativar por scroll agressivo — ativar ao entrar 50% no viewport (não 30%).
