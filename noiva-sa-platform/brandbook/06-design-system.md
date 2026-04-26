# 06 — Design System
## Noiva S.A. — Sistema Visual

**Última atualização:** Abril 2026
**Versão:** 1.0
**Design System ao vivo:** https://design-system-roan-nine.vercel.app

---

## 1. Paleta de Cores

### Cores Primárias

| Nome | Hex | Uso | Significado |
|---|---|---|---|
| Rose | #DBA99F | CTAs, destaques, links, elementos de foco | Amor, celebração |
| Blush | #FFCBC1 | Backgrounds de seção, badges, ícones suaves | Acolhimento, delicadeza |
| Cream | #F4F3EE | Background geral das páginas | Pureza, leveza |
| Eucalyptus | #4A6741 | Status positivo, confirmações, elementos de crescimento | Crescimento, natureza |
| Taupe | #9C958F | Elementos secundários, textos de suporte, ícones neutros | Estrutura, sobriedade |
| Silver | #BAB9B6 | Bordas, acentos, separadores | Elegância discreta |

### Tons Derivados

| Grupo | Claro | Médio | Base | Escuro | Mais Escuro |
|---|---|---|---|---|---|
| Blush | #FFF5F3 | #FFE0D9 | #FFCBC1 | — | — |
| Rose | #ECC8BE | — | #DBA99F | #C49189 | #A87068 |
| Cream | #FAFAF7 | — | #F4F3EE | #E8E6DF | — |
| Silver | #D4D3D0 | — | #BAB9B6 | — | — |
| Taupe | #C4BDB8 | — | #9C958F | #6b635d | — |
| Eucalyptus | — | — | #4A6741 | #3A5233 | — |
| Eucalyptus claro | #6B9B62 | — | — | — | — |

### Cores de Texto

| Papel | Hex | Uso |
|---|---|---|
| Primário | #1a1a1a | Títulos e corpo principal |
| Secundário | #6b635d | Subtítulos, labels, textos de suporte |
| Terciário | #9C958F | Placeholders, metadados, notas |
| Sobre fundo escuro | #F4F3EE | Texto em superfícies escuras |

---

## 2. Tipografia

| Papel | Família | Estilo | Uso |
|---|---|---|---|
| Headlines / Títulos | Cormorant Garamond | Serifada, elegância clássica | H1, H2, pull quotes, nomes de seção — evoca convite de casamento |
| Interface / Labels | Montserrat | Sans-serif moderna | Navegação, botões, badges, formulários |
| Body / Corpo | Source Sans 3 | Sans-serif legível e clean | Parágrafos longos, descrições, emails |
| Accent / Decorativo | Great Vibes | Script caligráfico | Momentos especiais: "O Sim", citações de noivas, elementos decorativos |

**Hierarquia recomendada:**
- H1: Cormorant Garamond, weight 300–400, tamanho grande
- H2/H3: Cormorant Garamond, weight 400
- Labels, CTAs: Montserrat, weight 500–600, uppercase para labels curtos
- Corpo: Source Sans 3, weight 400, line-height generoso (1.6–1.8)
- Decorativo: Great Vibes — usar com moderação

---

## 3. Espaçamento

Sistema de 8px como base.

| Token | Valor | Uso típico |
|---|---|---|
| xs | 8px | Espaço interno de elementos compactos |
| sm | 16px | Gap entre elementos próximos |
| md | 32px | Espaçamento entre blocos de conteúdo |
| lg | 64px | Separação de seções menores |
| xl | 96px | Padding de seções principais |
| 2xl | 144px | Espaços heroicos, margens generosas |
| section-pad | 96px | Padding vertical padrão de seção |

---

## 4. Bordas e Sombras

### Bordas

| Nome | Valor |
|---|---|
| Silver | 1px solid #BAB9B6 |
| Rose | 1px solid #DBA99F |
| Cream | 1px solid #E8E6DF |
| Blush | 1px solid #FFCBC1 |

**Raio padrão:** 4px para cards e inputs. 2px para badges. 50% para avatares.

### Sombras

| Nome | Valor | Uso |
|---|---|---|
| soft | 0 1px 3px rgba(155, 149, 143, 0.12) | Elevação mínima, cards em repouso |
| card | 0 4px 16px rgba(155, 149, 143, 0.16) | Cards de produto, depoimentos |
| hover | 0 8px 24px rgba(155, 149, 143, 0.20) | Estado hover de elementos interativos |
| lift | 0 16px 40px rgba(155, 149, 143, 0.24) | Modais, dropdowns, elementos sobrepostos |

---

## 5. Transições

| Nome | Valor | Uso |
|---|---|---|
| Default | 0.35s cubic-bezier(0.4, 0, 0.2, 1) | Padrão para hover e estados |
| Slow | 0.6s cubic-bezier(0.4, 0, 0.2, 1) | Entradas de seção, animações de página |
| Fast | 0.2s cubic-bezier(0.4, 0, 0.2, 1) | Feedback imediato (toggles, cliques) |

---

## 6. Elementos Decorativos

Seção em desenvolvimento. Elementos florais (rosas) estão sendo desenhados e ainda não foram aprovados. Até aprovação final, nenhum elemento decorativo botânico/floral deve ser usado em materiais da marca.

**Regra:** Quando aprovados, elementos decorativos serão sempre decorativos, não estruturais. Nunca competem com o conteúdo principal. Opacidade reduzida (10–20%) quando usados como fundo.

---

## 7. Logo

### Renderização CSS

```html
<span style="font-family: 'Cormorant Garamond', serif; font-weight: 300; color: #DBA99F;">NOIVA</span>
<span style="font-family: 'Cormorant Garamond', serif; font-weight: 300; color: #9C958F;">S.A.</span>
```

"NOIVA" em Rose (#DBA99F). "S.A." em Taupe (#9C958F). Font-weight 300. Cormorant Garamond.

### Arquivos de Logo

- **Localização:** `logos/` na raiz do projeto
- **Formato:** SVG (vetorial)
- **Versões disponíveis:**
  - `logo-principal.svg` — Wordmark (NOIVA Rose + S.A. Taupe)
  - `logo-tagline.svg` — Wordmark + "SOCIEDADE DO AMOR"
  - `simbolo-alianca.svg` — Aliança Entrecruzada (Variation B — Overlap Reveal com clip-path interlock). **Versão primária do símbolo.**
  - `logo-combinado.svg` — Símbolo + Wordmark horizontal
  - `favicon.svg` — Interlock otimizado para 16-32px
- **Referência completa:** `logos/logo-preview.html` — Logo System com todas as variações, fundos, tamanhos e rationale
- **Variação primária do símbolo:** Variation B (Overlap Reveal) — usa clipping para criar efeito de interlock real entre as alianças. A aliança Rose (esquerda) passa "na frente" da aliança Taupe (direita) na zona de sobreposição.

### Uso em Fundos Escuros

Para fundos escuros, usar tints mais claros que mantêm o mesmo contraste percebido:
- NOIVA: #ECC8BE (Rose Light)
- S.A.: #C4BDB8 (Taupe Light)
- Aliança esquerda: #ECC8BE, Aliança direita: #C4BDB8

### Espaço de Proteção

Manter espaço livre ao redor do logo equivalente à altura da letra "N" do wordmark em todas as direções.

---

## 8. Aplicação por Sub-marca

Cada sub-marca da Noiva S.A. usa a paleta-mãe com ênfase ajustada.

| Sub-marca | Cor dominante | Cor de suporte | Personalidade visual |
|---|---|---|---|
| Noiva S.A. (mãe) | Rose #DBA99F | Cream #F4F3EE | Full palette, elegante e acolhedora |
| Assessoria | Rose #DBA99F | Cream #F4F3EE | Quente, organizada, próxima |
| Mentoria | Eucalyptus #4A6741 | Cream #F4F3EE | Crescimento, aprendizado, confiança |
| Conexões | Rose #DBA99F | Taupe #9C958F | Calor humano com estrutura de rede |
| Giovanna Paola | Rose #DBA99F | Blush #FFCBC1 | Pessoal, próxima, calorosa |

**Regra:** A sub-marca nunca contradiz a marca-mãe. Pode ter ênfase diferente, mas sempre dentro da paleta aprovada.

---

## 9. O Que Não Fazer

- **Não usar cores fora da paleta** — sem roxo, azul, laranja ou preto puro (#000)
- **Não usar fontes diferentes das 4 aprovadas**
- **Não misturar Great Vibes com Cormorant** no mesmo elemento visual
- **Não usar elementos decorativos como foco** — sempre secundários ao conteúdo
- **Não criar gradientes** — a identidade é flat com profundidade via sombra
- **Não usar efeitos de brilho, reflexo ou glassmorfismo** — fora da estética da marca
- **Não usar emojis em UI** — nunca
- **Não usar bordas grossas (>2px)** — leveza é parte da identidade
