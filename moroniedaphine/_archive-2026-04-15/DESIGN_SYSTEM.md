# Moroni & Daphine — Design System v2

> Editorial couture wedding. Referência: Vogue Weddings, Aman Resorts, Dior couture invitations, Semikolon letterpress, Zola premium.
> Versão: 2.0 — 2026-04-14 (v1 descartada)

---

## Diagnóstico da v1 (o que deu errado)

1. **Hero genérica.** O letter-reveal + corner-frame + ornamento floral geométrico é um preset de template de casamento, não couture.
2. **Tipografia fraca.** Cormorant Garamond italic em tamanhos gigantes perde peso visual. Couture usa SERIF CAPITAL LETTER-SPACED, não minúscula romântica.
3. **Ornamentos geométricos.** Minhas SVGs de 8-pétalas parecem logotipo de spa, não botânica manuscrita de convite de papel.
4. **Gold shimmer animado.** Tacky. Couture usa foil estático — gradiente sutil, não animação de promoção.
5. **Pinyon Script.** Fonte fraca, sem personalidade. Precisa ser substituída.
6. **Falta metáfora física.** Convites couture SÃO um objeto — papel, bordas, peso. A v1 é "web page com ornamentos", não "convite digital".
7. **Grain genérico + backgrounds chapados.** Falta camadas: vinheta, sombra de papel, dobra.
8. **Sem referência editorial real.** Cheirava Canva.

---

## Princípios v2

1. **Couture, não cottagecore.** Nada de rústico, nada de rosa pálido, nada de fontes cursivas doces. Isso é um convite de alta joalheria.
2. **Metáfora de objeto físico.** Cada seção é uma "página" de um convite de papel dobrado. Sombra de folha, bordas, dobra central, vinheta.
3. **Editorial magazine.** Grande parte da hierarquia vem de TIPOGRAFIA CAPITAL LETTER-SPACED com regras finas douradas — não de ornamentos.
4. **Botânica manuscrita, não geometria.** Se houver flor, ela é ilustrada (curvas orgânicas, traço variável) — ou não existe. Nunca SVG geométrico.
5. **Ouro foil estático, não shimmer animado.** Gradiente linear discreto que imita hot-stamp.
6. **Respiração.** Whitespace é 50% do luxo. Se está cheio, tá errado.
7. **Menos cor, mais textura.** Vinho profundo + marfim pergaminho + dourado foil. Só.

---

## Referências concretas (do que puxar)

| Referência | O que adotar |
|---|---|
| **Vogue Weddings feature pages** | Headline serif ALL CAPS, letter-spacing 0.15em, thin gold rule acima e abaixo, grid editorial 2-col |
| **Aman Resorts homepage** | Negativo generoso, serif thin display, zero ornamento, hierarquia só por tamanho + cor |
| **Dior couture invitation** | Monograma em wax seal, papel texturizado, borda dupla (thin outer + thick inner), center-aligned |
| **Semikolon letterpress** | Paleta wine/cream/gold, thin rule lines, no animation gratuita |
| **Cartier engraving** | Letter-spaced titling caps, gold foil estático, ornamentos cabeça-e-cauda minimalistas |
| **Noiva S.A. brandbook** (in-house) | Cormorant Garamond weight 300, section padding 96px, cream background layering |

---

## 1. Typography System (reescrita)

### Fontes novas

```
Display (titling):  "Italiana"           — serif couture wedding signature (Vogue-like)
Display alt:        "Cormorant Garamond" — apenas italic, weight 300, pra subtítulos
Script:             "Tangerine"          — bold italic, MUITO usada em monograma (forte, não doce)
Body:               "EB Garamond"        — serif classica pra parágrafos (NÃO sans)
Micro/Labels:       "Montserrat"         — sans uppercase letter-spaced pra labels
```

**Rationale:**
- **Italiana** é literalmente a fonte-assinatura de convite de couture. Pesos altos, alta elegância, única.
- **Cormorant italic** continua como voz romântica secundária.
- **Tangerine** substitui Pinyon Script — é uma assinatura mais firme, manuscrita mas com peso.
- **EB Garamond** no corpo mantém coerência serif — o site inteiro é um "documento impresso".
- **Montserrat** só em labels maiúsculas pequeninas (como as "RSVP", "GIFTS" em convite bilíngue).

### Regras tipográficas

1. **Nomes dos noivos** → Italiana, ALL CAPS, letter-spacing 0.15em, weight 400. **Nunca** italic minúsculo gigante.
2. **Títulos de seção** → Italiana ALL CAPS, menor. Subtitle em Cormorant italic.
3. **Labels** → Montserrat uppercase 11px, letter-spacing 0.4em, cor dourada.
4. **Corpo** → EB Garamond 17px, line-height 1.8, cor `ink-75`.
5. **"&"** → Tangerine bold italic, cor `gold-foil`. Grande quando sozinho, não diminuto.
6. **Nunca misturar** mais de 2 fontes num mesmo bloco visual.

### Type Scale

```
--text-hero-caps:    clamp(2.5rem, 8vw, 6.5rem)   /* Nomes no hero — MENOR que v1 */
--text-display-1:    clamp(2rem, 5vw, 4rem)       /* Títulos de seção */
--text-display-2:    clamp(1.5rem, 3vw, 2.25rem)  /* Subtítulos italic */
--text-title:        1.5rem
--text-lead:         1.15rem                      /* Lead italic */
--text-body:         1.0625rem                    /* 17px EB Garamond */
--text-label:        0.6875rem                    /* 11px Montserrat */
```

**Notar**: nomes do hero ficam MENORES que na v1 (max 6.5rem vs 11rem). Isso porque letter-spaced caps ocupam mais largura visual E ganham autoridade — o exagero da v1 era compensação por falta de peso.

---

## 2. Color System (ajustada)

```
/* Wine — mais profundo, menos vinho-vinagrete */
--wine-950:   #1F0610    /* Quase preto com warmth — text over light */
--wine-900:   #3A0C18    /* Hero dark section, footer */
--wine-800:   #5A1425    /* Accents, botões primários */
--wine-700:   #7A1E34    /* Hovers */
--wine-50:    #F8EDEF    /* Wash sutil */

/* Gold — foil, não amarelo */
--gold-foil-dark:  #8B6B1A   /* Dark edge do foil gradient */
--gold-foil:       #B8934A   /* Gold principal — mais escuro que v1 */
--gold-foil-light: #DFC37E   /* Light edge do foil gradient */
--gold-wash:       #F2E8D0   /* Wash dourado em fundos */

/* Parchment — papel real, não off-white plástico */
--parchment:       #F5EEE0   /* Base — mais quente, mais amarelado */
--parchment-dark:  #E8DCC2   /* Dobra de papel, sombras */
--parchment-cream: #FBF6EB   /* Highlight da dobra */

/* Ink */
--ink-950:   #14080B
--ink-80:    rgba(20, 8, 11, 0.80)
--ink-60:    rgba(20, 8, 11, 0.60)
--ink-40:    rgba(20, 8, 11, 0.40)
```

### Gold Foil (substituto do shimmer)

```css
background: linear-gradient(
  135deg,
  var(--gold-foil-dark) 0%,
  var(--gold-foil-light) 35%,
  var(--gold-foil) 60%,
  var(--gold-foil-dark) 100%
);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
```

Estático. Imita hot-stamp. **Nunca animar.**

### Regras de uso

- **Parchment** domina fundo geral (site inteiro).
- **Wine-900** SÓ em Save the Date e Footer (duas seções dramáticas).
- **Gold-foil** em títulos que precisam de peso e em ornamentos. Nunca em blocos grandes.
- **Wine-800** em bordas finas e botões.
- Zero gradiente de rainbow. Zero sombra colorida.

---

## 3. Paper Metaphor (novo — diferencial da v2)

Todo o site mora dentro da metáfora de "convite de papel fino laid on a table":

### Componente `paper-card`
```
- Background: parchment com noise texture sutil (5% opacity)
- Box-shadow de duas camadas:
    1) 0 1px 0 var(--parchment-dark)        -- dobra visual superior
    2) 0 40px 80px -20px rgba(20,8,11,0.25) -- sombra suave de folha sobre mesa
    3) 0 0 0 1px var(--gold-foil)/15        -- borda finíssima de ouro
- Vinheta interna: radial-gradient nos cantos escurecendo 3% pra simular papel marcado
- Padding generoso (min 96px desktop)
```

### Dobra central
Uma linha finíssima `parchment-dark` atravessa o paper-card horizontalmente no meio (onde o convite dobraria). Decorativa, 15% opacity, `width: 40%` centralizada.

### Wax seal monogram
Círculo 96px, cor `wine-800`, com monograma "M·D" em Tangerine sobre. Aparece:
- Final do hero (fechando a "carta")
- Final do footer (assinatura)
- **NUNCA** no topo de tudo — seal vai embaixo, como selo de correio.

---

## 4. Ornamentos (botânica ilustrada, não geometria)

### O que eliminar (v1)
- Monograma circular geométrico → vira wax seal real
- Divider de 8-pétalas → eliminado
- Floral large background → eliminado
- Diamond divider → substituído por thin gold rule

### O que usar (v2)

**Thin gold rule**
Linha dourada 0.5px com fade nas pontas. Usada entre label e título, e entre título e lead. Largura fixa 80px ou 160px.

**Hand-drawn botanical sprig** (só se necessário)
SVG ilustrativa de um galhinho curvo com 5-7 folhas orgânicas (curvas bézier reais, espessura variável). Aparece:
- Ao lado de títulos de seção, não centralizado
- Cor `gold-foil` com opacity 60%
- Tamanho pequeno (48-64px)
- **Máximo 1 por seção** — "menos é mais"

**Torn paper edge** (detalhe)
Borda inferior de algumas seções simulando papel rasgado via SVG clip-path. Usada em transições de seção vinho/marfim.

### O que PROIBIR explicitamente
- Flores geométricas, estrelas 8-pontas, mandalas
- Corners frames L-shape (cheiro de Canva)
- Qualquer ornamento animado por si só (só parallax/reveal, nunca loop)
- Backgrounds florais gigantes opacos
- Grain texture em TODAS as seções (cansa o olho) — só hero e save the date

---

## 5. Hero Composition — Spec exata (onde eu errei na v1)

```
┌──────────────────────────────────────────────┐
│ [PARCHMENT + grain + vinheta]                │
│                                              │
│                                              │
│              [thin gold rule 80px]           │
│                 SAVE THE DATE                │  ← Montserrat label, 11px, 0.4em tracking
│              [thin gold rule 80px]           │
│                                              │
│              (muito espaço vertical)         │
│                                              │
│             M O R O N I   R E I S            │  ← Italiana ALL CAPS, letter-spacing 0.18em
│                                              │    gold foil gradient, 4.5rem no desktop
│                   &                          │  ← Tangerine 5rem, gold foil
│                                              │
│            D A P H I N E                     │  ← mesma coisa
│             O L I V E I R A                  │
│                                              │
│              (muito espaço vertical)         │
│                                              │
│              [thin gold rule]                │
│            XII · VI · MMXXVI                 │  ← Cormorant italic 1.75rem
│            12 · 06 · 2026                    │  ← Montserrat label 11px
│              [thin gold rule]                │
│                                              │
│            (countdown ou não?)               │  ← talvez remover — feio é feio
│                                              │
│       "O convite chegará até você."          │  ← Cormorant italic 1.125rem, ink-60
│                                              │
│              [hand sprig 64px]               │  ← só aqui, single, centralizado
│                                              │
│            [wax seal monogram]               │  ← círculo wine 80px, fecha a carta
│                                              │
└──────────────────────────────────────────────┘
        [torn paper edge into next section]
```

**Decisões-chave:**
- Nomes COMPLETOS (Moroni Reis, Daphine Oliveira) em DUAS linhas por pessoa, não só primeiro nome
- Nome em ALL CAPS letter-spaced (couture) em vez de minúscula italic (romance doce)
- Countdown É OPCIONAL — se ficar feio, removemos
- Wax seal fecha o hero em vez de abrir
- Torn paper edge conecta à próxima seção

---

## 6. Section Pattern (todas as outras)

```
Section padding: 160px top/bottom desktop, 96px mobile
Container: max-width 840px para conteúdo de leitura (narrow)
Container wide: max-width 1120px para galeria/grid

Header pattern:
  Label (Montserrat, 11px, tracking 0.4em, gold)
  [thin gold rule 80px centered]
  Title (Italiana ALL CAPS, display-1)
  Subtitle (Cormorant italic, display-2, ink-60)
  [margin bottom generoso — 96px antes do conteúdo]

Body:
  EB Garamond 17px, line-height 1.8, max-width 640px, ink-80
  Sem drop caps (v1 exagerou)

Divider entre seções:
  Ou torn edge, ou simples mudança de background parchment ↔ parchment-cream
```

---

## 7. Motion System (reescrito — menos é mais)

### Princípios
- Motion SÓ a serviço da metáfora: papel deslizando, tinta assentando, selo pressionando
- **Zero** animação loop (marquee morreu, shimmer morreu)
- **Tudo** scroll-triggered ou hover

### Animações aprovadas
1. **Reveal** — opacity + translateY(24px) sobre 1.2s expo-out via IntersectionObserver
2. **Rule draw** — thin gold rule desenha do centro pros lados em 1.4s
3. **Seal press** — wax seal scale(0.92) → scale(1) + opacity 0→1 em 900ms
4. **Parallax** — parchment texture 0.15x do scroll (muito sutil)
5. **Hover on gift card** — translateY(-2px) + border gold foil → gold foil-dark

### Removidas (v1)
- ❌ Letter-by-letter reveal nos nomes (cheirou template)
- ❌ Gold shimmer animation
- ❌ Marquee infinito
- ❌ Scroll indicator bouncing
- ❌ Animação de modal rotate-90 no X

---

## 8. Layout Tokens

```
--space-micro:   0.5rem
--space-tight:   1rem
--space-cozy:    1.5rem
--space-base:    2rem
--space-wide:    4rem
--space-section: 10rem     /* 160px padding vertical de seção */
--space-hero:    12rem     /* 192px padding do hero */

--container-narrow: 640px  /* Leitura editorial */
--container-card:   840px  /* Cards e forms */
--container-wide:   1120px /* Galeria, grids */
```

---

## 9. Proibições v2 (hard limits)

1. ❌ Minúscula italic em display gigante (a não ser subtítulo)
2. ❌ Gold shimmer animado
3. ❌ Pinyon Script (qualquer uso)
4. ❌ Corner frames L-shape Canva-style
5. ❌ SVG geométrico de "flor"
6. ❌ Marquee infinito
7. ❌ Letter reveal por caractere
8. ❌ Grain em TODAS as seções (só hero + save the date)
9. ❌ Border-radius > 0 em qualquer lugar exceto seal (círculo) e avatar
10. ❌ Drop cap (exagero v1)
11. ❌ Countdown com bordas/frames — se usar, é minimal ou não usa
12. ❌ Gradientes em fundos grandes
13. ❌ Mais de 2 seções consecutivas com o mesmo background

---

## 10. Next Steps (quando aprovado)

1. Trocar fontes em `Layout.astro`: Italiana + Cormorant + Tangerine + EB Garamond + Montserrat
2. Reescrever `global.css` com tokens v2
3. Criar componente `PaperCard` com sombra de folha + dobra + vinheta
4. Deletar `Ornaments.astro` antigo e criar novo com: thin gold rule, wax seal, hand-drawn sprig, torn paper edge
5. Reescrever Hero segundo o spec da seção 5
6. Reescrever cada seção usando o Section Pattern da seção 6
7. Remover marquee, corner frames, drop caps, shimmer, letter reveal
8. Deploy

---

## Aprovação

**Antes de eu tocar em uma linha de código, me diga:**

A. Aprovar esse sistema como está → digo "aprovado" e eu implemento.
B. Quer mudar algo? → me diga qual princípio, qual fonte, qual cor. Ajusto o doc.
C. Tem uma referência específica (site de casamento que você viu e gostou)? → manda o link, eu incorporo antes de implementar.
