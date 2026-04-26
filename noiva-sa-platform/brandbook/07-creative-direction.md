# 07 — Direcao Criativa
## Noiva S.A. — Brief de Direcao Criativa Completo

**Ultima atualizacao:** Abril 2026
**Versao:** 1.0
**Uso:** Referencia primaria para designers, motion designers e desenvolvedores. Todo material visual, animacao e interacao deve ser validado contra este documento antes da implementacao.

---

## 1. Conceito Visual Central

### A Tensao Criativa: Metodo + Amor

A Noiva S.A. vive numa tensao bonita: de um lado, a precisao de um metodo testado em 200+ casamentos. Do outro, a emocao crua de segurar a mao de alguem no dia mais importante da sua vida. A direcao visual inteira nasce dessa tensao.

Visualmente, isso se traduz assim:

- **Estrutura** aparece na grade, no espacamento generoso, na tipografia de interface (Montserrat) limpa e organizada. E a planilha, o cronograma, a assessora que tem tudo sob controle.
- **Emocao** aparece nos momentos de respiro — uma headline em Cormorant Garamond que respira, um detalhe em Great Vibes que surpreende, uma fotografia que mostra maos entrecruzadas. E o instante em que a assessora segura o buque e diz "vai la, esta tudo pronto".

A regra de ouro: **nunca so metodo, nunca so emocao.** Toda pagina, toda secao, todo material deve carregar as duas camadas. Se uma landing page so tem dados e processo, falta alma. Se so tem emocao e fotos bonitas, falta credibilidade.

### Atmosfera Visual

Pensar na Noiva S.A. como um espaco fisico: e aquele atelier de alta costura onde tudo e impecavelmente organizado — os tecidos dobrados com precisao, a luz natural entrando pelas janelas altas, o cheiro de eucalipto no arranjo da mesa. E quando voce entra, a dona do atelier te oferece cafe, senta ao seu lado e pergunta "me conta, como voce imagina o seu dia?"

Traduzindo para digital:

- **Fundo cream (#F4F3EE)** como base predominante — nunca branco puro, nunca frio
- **Luz natural simulada** — sombras suaves (shadow-soft e shadow-card), nunca duras ou com angulo dramatico
- **Espacamento generoso** — a marca respira. Section padding de 96px minimo. O vazio intencional comunica confianca e tranquilidade
- **Profundidade sutil** — camadas via sombra, nao via gradientes ou efeitos
- **Temperatura quente** — toda a paleta tende ao quente. Nenhum elemento frio (azul, cinza metalico, preto puro) deve competir com a atmosfera

### Principio de Hierarquia Visual

```
1. FOTOGRAFIA / EMOCAO — o que captura o olhar (conexao humana)
2. HEADLINE — o que ancora a mensagem (Cormorant Garamond, autoridade elegante)
3. CORPO — o que sustenta o argumento (Source Sans 3, legivel, confiavel)
4. CTA — o que convida a acao (Rose, Montserrat, presenca sem agressividade)
5. DETALHES — o que encanta no segundo olhar (botanicos, Great Vibes, micro-interacoes)
```

---

## 2. Direcao de Motion Design

### Filosofia de Movimento

Todo movimento na Noiva S.A. segue um principio: **toque gentil.** Nenhuma animacao deve sentir-se como uma transicao de app de produtividade. Deve sentir-se como desdobrar um convite de casamento — intencional, delicado, com a expectativa de algo bonito por vir.

**Timing geral:**
- Feedback imediato (cliques, toggles): **200ms** — `cubic-bezier(0.4, 0, 0.2, 1)`
- Transicoes padrao (hovers, estados): **350ms** — `cubic-bezier(0.4, 0, 0.2, 1)`
- Entradas de conteudo (scroll reveal, page load): **600ms** — `cubic-bezier(0.4, 0, 0.2, 1)`
- Momentos especiais (hero, celebracoes): **800-1000ms** — `cubic-bezier(0.16, 1, 0.3, 1)`

**Easing padrao:** `cubic-bezier(0.4, 0, 0.2, 1)` — Material Design standard. Suave na entrada, decisivo na saida.

**Easing para momentos especiais:** `cubic-bezier(0.16, 1, 0.3, 1)` — Overshoot sutil, como quem chega com entusiasmo contido.

### 2.1. Micro-interacoes

#### Hover em Botoes Primarios (Rose)
- **Descricao:** Botao CTA Rose (#DBA99F) ganha leve elevacao e sutil clareamento
- **Trigger:** Mouse hover / focus
- **Timing:** 200ms ease
- **Comportamento:**
  - `transform: translateY(-1px)` — elevacao minima, quase imperceptivel
  - `opacity: 0.9` — leve suavizacao, nao escurecimento
  - Sombra transiciona de `shadow-soft` para `shadow-card`
- **Mobile:** Sem hover. Active state com `transform: scale(0.98)` por 150ms
- **Implementacao CSS:**
```css
.btn-primary {
  transition: transform 200ms cubic-bezier(0.4,0,0.2,1),
              opacity 200ms cubic-bezier(0.4,0,0.2,1),
              box-shadow 200ms cubic-bezier(0.4,0,0.2,1);
}
.btn-primary:hover {
  transform: translateY(-1px);
  opacity: 0.9;
  box-shadow: 0 4px 16px rgba(219,169,159,0.20);
}
.btn-primary:active {
  transform: translateY(0) scale(0.98);
}
```
- **Referencia:** Botoes da Apple Store — movimento minimo, sofisticacao maxima
- **Prioridade:** Alta

#### Hover em Botoes Outline
- **Descricao:** Borda transiciona de taupe-dark para rose, texto acompanha
- **Trigger:** Mouse hover / focus
- **Timing:** 200ms ease
- **Comportamento:**
  - `border-color` transiciona de `#6b635d` para `#DBA99F`
  - `color` acompanha para rose
  - Sem movimento fisico — so mudanca cromatica
- **Implementacao CSS:**
```css
.btn-outline {
  transition: border-color 200ms ease, color 200ms ease;
}
.btn-outline:hover {
  border-color: #DBA99F;
  color: #DBA99F;
}
```
- **Prioridade:** Alta

#### Hover em Cards
- **Descricao:** Card ganha elevacao progressiva — como se flutuasse um centimetro acima da mesa
- **Trigger:** Mouse hover
- **Timing:** 350ms cubic-bezier(0.4, 0, 0.2, 1)
- **Comportamento:**
  - `transform: translateY(-4px)` — elevacao suave
  - Sombra transiciona de `shadow-card` para `shadow-hover`
  - Borda transiciona de silver para rose (sutilmente)
- **Implementacao CSS:**
```css
.card {
  border: 1px solid #BAB9B6;
  box-shadow: 0 4px 16px rgba(155,149,143,0.16);
  transition: transform 350ms cubic-bezier(0.4,0,0.2,1),
              box-shadow 350ms cubic-bezier(0.4,0,0.2,1),
              border-color 350ms cubic-bezier(0.4,0,0.2,1);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(155,149,143,0.20);
  border-color: #DBA99F;
}
```
- **Referencia:** Stripe product cards
- **Prioridade:** Alta

#### Hover em Links de Texto
- **Descricao:** Underline animado — linha rose que cresce da esquerda para a direita
- **Trigger:** Mouse hover
- **Timing:** 300ms ease
- **Comportamento:**
  - Pseudo-elemento `::after` com `width: 0` para `width: 100%`
  - Cor rose (#DBA99F), altura 1px
  - Posicionado no `bottom: -2px` do texto
- **Implementacao CSS:**
```css
.text-link {
  position: relative;
  color: #DBA99F;
  text-decoration: none;
}
.text-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #DBA99F;
  transition: width 300ms cubic-bezier(0.4,0,0.2,1);
}
.text-link:hover::after {
  width: 100%;
}
```
- **Prioridade:** Media

#### Focus em Inputs de Formulario
- **Descricao:** Borda inferior transiciona para rose, label sobe em posicao flutuante
- **Trigger:** Focus no input
- **Timing:** 200ms ease
- **Comportamento:**
  - Borda inferior (`border-bottom`) transiciona de `rgba(219,169,159,0.3)` para `#DBA99F` solido
  - Label (se usando floating label) transiciona `translateY(-20px) scale(0.85)` com cor rose
- **Implementacao CSS:**
```css
.input-field {
  border: 1px solid rgba(219,169,159,0.15);
  border-bottom: 2px solid rgba(219,169,159,0.3);
  transition: border-color 200ms ease;
}
.input-field:focus {
  border-color: rgba(219,169,159,0.4);
  border-bottom-color: #DBA99F;
  outline: none;
}
```
- **Referencia:** Material Design inputs, com temperatura quente ao inves de azul
- **Prioridade:** Alta

#### Hover na Navegacao
- **Descricao:** Itens de menu ganham cor rose com transicao suave, sem sublinhado
- **Trigger:** Mouse hover
- **Timing:** 200ms ease
- **Comportamento:**
  - `color` transiciona de `#6b635d` (taupe-dark) para `#DBA99F` (rose)
  - Sem movimento fisico, sem underline — so cor
  - Item ativo: rose permanente, peso visual ligeiramente maior (font-weight 600)
- **Prioridade:** Alta

### 2.2. Transicoes de Pagina

#### Fade + Lift (Padrao entre Paginas)
- **Descricao:** Pagina atual desvanece com leve deslocamento para cima, nova pagina emerge de baixo
- **Trigger:** Navegacao entre paginas
- **Timing:** 400ms cubic-bezier(0.4, 0, 0.2, 1)
- **Comportamento:**
  - Pagina saindo: `opacity: 1 → 0`, `translateY(0) → translateY(-16px)`
  - Pagina entrando: `opacity: 0 → 1`, `translateY(16px) → translateY(0)`
- **Implementacao CSS:**
```css
@keyframes pageExit {
  to { opacity: 0; transform: translateY(-16px); }
}
@keyframes pageEnter {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
```
- **Referencia:** Transicoes do site da Lapis de Noiva — suave, sem dramaticidade
- **Prioridade:** Media

#### Slide Horizontal (Apresentacoes e Diagnosticos)
- **Descricao:** Ja implementado em `assessoria-sa-apresentacao.html` e `raio-x-sa.html`. Slide atual sai com blur + scale down, novo slide entra com scale up + deblur
- **Trigger:** Click em setas ou swipe
- **Timing:** 500ms cubic-bezier(0.4, 0, 0.2, 1)
- **Comportamento:**
  - Slide saindo: `opacity: 1 → 0`, `scale(1) → scale(1.03)`, `blur(0) → blur(3px)`
  - Slide entrando: `opacity: 0 → 1`, `scale(0.97) → scale(1)`, `blur(3px) → blur(0)`
- **Nota:** Este padrao ja esta validado e funciona bem. Manter como referencia para futuros fluxos multi-step.
- **Prioridade:** Ja implementado

### 2.3. Loading States

#### Barra de Progresso Rose (Padrao)
- **Descricao:** Barra fina (2-3px) no topo da pagina, gradiente rose-to-blush, com pulse sutil na ponta
- **Trigger:** Carregamento de pagina ou conteudo
- **Timing:** Duracao variavel conforme carregamento. Pulse: 2s infinite ease-in-out
- **Comportamento:**
  - Barra cresce da esquerda para a direita: `width: 0% → N%`
  - Gradiente: `linear-gradient(90deg, var(--rose-dark), var(--rose), var(--blush))`
  - Ponta brilhante com pseudo-elemento pulsante (ja implementado em assessoria-sa)
- **Implementacao CSS:**
```css
.progress-bar {
  position: fixed;
  top: 0; left: 0;
  height: 2px;
  background: linear-gradient(90deg, #C49189, #DBA99F, #FFCBC1);
  transition: width 500ms cubic-bezier(0.4,0,0.2,1);
  z-index: 200;
}
.progress-bar::after {
  content: '';
  position: absolute;
  right: 0; top: -1px;
  width: 40px; height: 4px;
  background: radial-gradient(ellipse, rgba(255,203,193,0.8) 0%, transparent 70%);
  animation: progressPulse 2s ease-in-out infinite;
}
@keyframes progressPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
```
- **Referencia:** Linear app loading bar — minima, elegante, informativa
- **Prioridade:** Alta

#### Skeleton Loading (Conteudo)
- **Descricao:** Placeholders com formato do conteudo final, animados com shimmer quente
- **Trigger:** Enquanto conteudo carrega
- **Timing:** Shimmer: 1.5s infinite ease-in-out
- **Comportamento:**
  - Retangulos com `background: #E8E6DF` (cream-dark)
  - Shimmer: gradiente linear que percorre da esquerda para a direita
  - Cor do shimmer: `linear-gradient(90deg, #E8E6DF 0%, #F4F3EE 50%, #E8E6DF 100%)`
  - `background-size: 200% 100%` com animacao de `background-position`
- **Implementacao CSS:**
```css
.skeleton {
  background: linear-gradient(90deg, #E8E6DF 25%, #F4F3EE 50%, #E8E6DF 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 4px;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```
- **Nota:** Sem skeleton escuro. Toda a marca e light mode — skeletons devem ser variacao quente do cream.
- **Prioridade:** Media

#### Alianca Entrecruzada Animada (Loading Especial)
- **Descricao:** Os dois circulos da Alianca Entrecruzada se aproximam, se cruzam, e pulsam suavemente. Usar em momentos de carregamento mais longos (envio de formulario, processamento).
- **Trigger:** Carregamentos acima de 2 segundos
- **Timing:** Ciclo completo: 2s, pulse: 1.5s infinite
- **Comportamento:**
  - Dois circulos SVG (stroke: rose, 1.5px, sem fill)
  - Comecam separados, deslizam para se cruzar (translateX)
  - Ao cruzar, pulse sutil na opacidade do stroke (0.6 → 1 → 0.6)
- **Implementacao SVG + CSS:**
```css
.alianca-loader circle {
  stroke: #DBA99F;
  stroke-width: 1.5;
  fill: none;
}
.alianca-loader .circle-left {
  animation: aliancaLeft 2s cubic-bezier(0.4,0,0.2,1) forwards,
             aliancaPulse 1.5s ease-in-out infinite 2s;
}
.alianca-loader .circle-right {
  animation: aliancaRight 2s cubic-bezier(0.4,0,0.2,1) forwards,
             aliancaPulse 1.5s ease-in-out infinite 2.3s;
}
@keyframes aliancaLeft {
  from { transform: translateX(-12px); }
  to { transform: translateX(0); }
}
@keyframes aliancaRight {
  from { transform: translateX(12px); }
  to { transform: translateX(0); }
}
@keyframes aliancaPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
```
- **Referencia:** Logotipos animados da Hermes e Tiffany — marca como loading state
- **Prioridade:** Baixa (refinamento)

### 2.4. Scroll Animations

#### Reveal on Scroll (Padrao para Secoes)
- **Descricao:** Conteudo emerge de baixo com fade conforme entra no viewport. Como uma cortina que sobe revelando o cenario de um casamento.
- **Trigger:** Elemento entra 20% no viewport (IntersectionObserver)
- **Timing:** 600ms cubic-bezier(0.4, 0, 0.2, 1)
- **Comportamento:**
  - Estado inicial: `opacity: 0`, `transform: translateY(24px)`
  - Estado final: `opacity: 1`, `transform: translateY(0)`
  - Elementos dentro da secao recebem stagger de 80-100ms entre si
- **Implementacao JS + CSS:**
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 600ms cubic-bezier(0.4,0,0.2,1),
              transform 600ms cubic-bezier(0.4,0,0.2,1);
}
[data-reveal].visible {
  opacity: 1;
  transform: translateY(0);
}
/* Stagger via data attribute */
[data-reveal-delay="1"] { transition-delay: 80ms; }
[data-reveal-delay="2"] { transition-delay: 160ms; }
[data-reveal-delay="3"] { transition-delay: 240ms; }
[data-reveal-delay="4"] { transition-delay: 320ms; }
```
```js
// IntersectionObserver — vanilla JS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```
- **Referencia:** Apple product pages — reveal simples, timing preciso
- **Prioridade:** Alta

#### Stagger Cards (Grid de Produtos, Depoimentos)
- **Descricao:** Cards aparecem em sequencia, como damas de honra entrando uma apos a outra na cerimonia
- **Trigger:** Grid entra no viewport
- **Timing:** 500ms por card, stagger de 100ms entre cards
- **Comportamento:**
  - Mesmo reveal de cima, mas com delay incremental
  - Maximo de 6 cards em stagger — apos isso, todos aparecem juntos (evitar animacao longa demais)
- **Prioridade:** Alta

#### Parallax Sutil em Hero (Somente Desktop)
- **Descricao:** Imagem de fundo do hero se move a velocidade diferente do conteudo de texto. Efeito muito sutil — 10-15% de diferenca, nao mais.
- **Trigger:** Scroll da pagina
- **Timing:** Contínuo, suavizado por requestAnimationFrame
- **Comportamento:**
  - Imagem: `transform: translateY(calc(scrollY * 0.1))`
  - Texto: posicao fixa normal
  - Maximo deslocamento: 60px
- **Mobile:** Desativado. Sem parallax em mobile — custa performance e raramente fica bom.
- **Implementacao JS:**
```js
// Somente desktop
if (window.matchMedia('(min-width: 768px)').matches) {
  const hero = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      hero.style.transform = `translateY(${window.scrollY * 0.1}px)`;
    });
  }, { passive: true });
}
```
- **Referencia:** Constance Zahn hero sections
- **Prioridade:** Baixa

#### Divider Grow (Separadores entre Secoes)
- **Descricao:** Linha divisoria rose cresce do centro para as laterais ao entrar no viewport. Ja validado em assessoria-sa-apresentacao.html.
- **Trigger:** Scroll reveal
- **Timing:** 500ms cubic-bezier(0.4, 0, 0.2, 1)
- **Comportamento:**
  - `width: 0 → 48px`, `opacity: 0 → 0.6`
  - Gradiente: `linear-gradient(90deg, transparent, var(--rose), transparent)`
- **Prioridade:** Media

### 2.5. Cursor Glow (Desktop Only)

- **Descricao:** Circulo de luz rose extremamente sutil acompanha o cursor. Ja implementado em assessoria-sa-apresentacao.html. Cria a sensacao de que a pagina "responde" a presenca do usuario.
- **Trigger:** Movimento do mouse
- **Timing:** 120ms ease-out de atraso (trailing suave)
- **Comportamento:**
  - Pseudo-elemento `body::after` ou elemento fixo
  - `radial-gradient(circle, rgba(219,169,159,0.05) 0%, transparent 70%)`
  - Tamanho: 300px x 300px
  - Opacidade muito baixa (0.05) — quase subliminar
- **Mobile:** Desativado completamente
- **Performance:** Usar CSS custom properties (`--mx`, `--my`) atualizadas via JS com `requestAnimationFrame`
- **Implementacao CSS:**
```css
body::after {
  content: '';
  position: fixed;
  width: 300px; height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(219,169,159,0.05) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  left: var(--mx, -200px);
  top: var(--my, -200px);
  pointer-events: none;
  z-index: 9999;
  transition: left 120ms ease-out, top 120ms ease-out;
}
```
- **Nota:** SOMENTE em paginas dark mode (apresentacoes, diagnosticos). Em paginas light mode (site institucional), o efeito nao e visivel contra o cream e deve ser omitido.
- **Prioridade:** Baixa (refinamento, ja implementado em dark pages)

### 2.6. Animacoes de Hero / Page Load

#### Hero Title Entrance
- **Descricao:** Titulo principal da pagina entra com fade + slide up + leve ajuste de letter-spacing. Como o titulo de um convite de casamento sendo revelado.
- **Trigger:** Page load (DOMContentLoaded)
- **Timing:** 650ms cubic-bezier(0.4, 0, 0.2, 1)
- **Comportamento:**
  - `opacity: 0 → 1`
  - `transform: translateY(32px) → translateY(0)`
  - `letter-spacing: 0.06em → normal` (ou herdado) — sutil compressao que da sensacao de "assentar"
  - Ja validado em assessoria-sa (animacao `fadeSlideUp`)
- **Implementacao CSS:**
```css
@keyframes heroEntrance {
  from {
    opacity: 0;
    transform: translateY(32px);
    letter-spacing: 0.06em;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    letter-spacing: inherit;
  }
}
.hero-title {
  animation: heroEntrance 650ms cubic-bezier(0.4,0,0.2,1) forwards;
}
```
- **Prioridade:** Alta

#### Stagger de Elementos do Hero
- **Descricao:** Apos o titulo, subtitle, divider e CTA entram em sequencia com 80-90ms de delay entre cada
- **Trigger:** Page load
- **Timing:** 650ms cada, stagger de 90ms
- **Comportamento:** Ja validado com `[data-animate]` + `nth-child` delays em assessoria-sa
- **Prioridade:** Alta

---

## 3. Direcao Fotografica

### Principio Fundamental

**Sempre mostrar a conexao, nunca so o evento.**

A Noiva S.A. nao e sobre decoracao. E sobre as pessoas que fazem a decoracao ter significado. Toda fotografia deve conter pelo menos um elemento humano — ou a presenca implicita de um (uma mao ajustando um veu, um buque recem-segurado, uma cadeira com um casaco jogado).

### Settings Recomendados

| Setting | Quando Usar | Mood |
|---------|-------------|------|
| Jardim com luz dourada (golden hour) | Hero sections, materiais principais | Romantico, aspiracional |
| Interior elegante com luz natural | Servicos, mentoria, profissionalismo | Confiavel, sofisticado |
| Bastidores reais (preparacao) | Behind-the-scenes, autoridade | Autentico, intimo |
| Mesa posta com detalhes | Reunioes, comunidade, processo | Acolhedor, metodico |
| Espaco ao ar livre com vegetacao | Conexoes, fornecedores, crescimento | Organico, expansivo |

### O Que Sempre Mostrar

- **Maos** — entrecruzadas, ajustando detalhes, segurando buques, folheando cadernos. Maos sao o simbolo universal de cuidado e trabalho.
- **Conexao entre duas ou mais pessoas** — assessora com noiva, Giovanna com equipe, noiva com noivo nos bastidores. Nunca uma pessoa isolada olhando para a camera (exceto Giovanna em contexto de marca pessoal).
- **Emocao genuina** — sorriso real, lagrima real, abraco real. Nunca pose de catalogo.
- **Detalhes de processo** — planilhas na mesa, checklist riscados, timeline no papel. Metodo visivel.
- **Elementos botanicos naturais** — eucalipto, folhagem verde, flores em arranjos simples. Sem flores artificiais.

### O Que Nunca Mostrar

- **Stock photos** — de qualquer tipo. Se nao e foto real da Noiva S.A. ou de um banco autoral curado, nao entra.
- **Locais vazios** — espaco de evento sem pessoas e catalogo de buffet, nao Noiva S.A.
- **Decoracao generica** — mesas com flores genericas, arcos de flores de Instagram. Se nao tem assinatura, nao tem marca.
- **Poses artificiais** — grupo enfileirado sorrindo pra camera nao e Noiva S.A. Momento natural e.
- **Close-up de aliancas sobre almofada** — cliche maximo do mercado. Se for mostrar aliancas, mostrar sendo trocadas (maos + emocao).

### Composicao

- **Espaco negativo generoso** — deixar ar ao redor do sujeito. A foto deve respirar como a marca respira.
- **Regra dos tercos com desvio intencional** — sujeito ligeiramente fora do centro, criando tensao compositiva sutil.
- **Profundidade de campo rasa** — fundo desfocado para destacar o sujeito. F/1.4 a f/2.8.
- **Formato:** Priorizar horizontal (16:9 ou 3:2) para web. Vertical (4:5 ou 9:16) para stories.

### Color Grading

| Parametro | Direcao |
|-----------|---------|
| Temperatura | Quente — tender para 6000-6500K. Nunca frio/azulado. |
| Contraste | Suave — blacks nao sao puros, highlights nao estouram. |
| Saturacao | Levemente reduzida — elegancia, nao vivacidade. |
| Tons de pele | Preservar sempre. Sem filtro que altere tom de pele natural. |
| Highlights | Tender para cream (#F4F3EE), nao branco puro. |
| Shadows | Tender para taupe quente, nao cinza ou preto. |
| Greens | Manter no espectro eucalipto (#4A6741) — verde terroso, nao neon. |
| Rosas/vermelhos | Tender para rose (#DBA99F) — sem magenta, sem fuchsia. |

**Referencia de grading:** Estilo Constance Zahn / Jose Villa / BHLDN — quente, organico, atemporal.

### Thumbnails e Miniaturas

- Em tamanho reduzido, priorizar rostos ou maos — elementos que o cerebro reconhece instantaneamente
- Evitar composicoes complexas que viram borroes em miniatura
- Crop generoso no sujeito para stories e grid do Instagram

---

## 4. Padroes de Interacao

### 4.1. Cards

#### Card de Produto (Pacotes de Assessoria)
- **Background:** #FFFFFF ou cream-light (#FAFAF7)
- **Borda:** 1px solid #BAB9B6 (silver) em repouso
- **Raio:** 4px
- **Sombra repouso:** shadow-card (0 4px 16px rgba(155,149,143,0.16))
- **Hover:**
  - Borda: rose (#DBA99F)
  - Sombra: shadow-hover (0 8px 24px rgba(155,149,143,0.20))
  - `transform: translateY(-4px)`
  - Timing: 350ms cubic-bezier(0.4, 0, 0.2, 1)
- **Interior:**
  - Label do pacote: Montserrat 11px, weight 600, uppercase, letter-spacing 0.1em, cor rose
  - Nome: Cormorant Garamond 28-32px, weight 400, cor #1a1a1a
  - Descricao: Source Sans 3 15px, weight 400, line-height 1.7, cor #6b635d
  - CTA: Botao primario rose, Montserrat 14px weight 600
- **Card destacado (Completa — carro-chefe):**
  - Borda: 1px solid #DBA99F (rose) permanente
  - Badge "Mais escolhido" em blush (#FFCBC1) com texto #1a1a1a
  - Sombra ligeiramente maior: shadow-hover como estado base

#### Card de Depoimento
- **Background:** cream (#F4F3EE)
- **Borda:** 1px solid #E8E6DF (cream-dark)
- **Raio:** 4px
- **Interior:**
  - Aspas de abertura: Great Vibes 48px, cor rose, opacidade 0.4 — decorativo
  - Texto: Source Sans 3 16px, italico, line-height 1.7, cor #1a1a1a
  - Nome: Montserrat 13px, weight 600, cor #1a1a1a
  - Descricao: Montserrat 12px, weight 400, cor #9C958F
  - Foto circular: 48px, border-radius 50%, borda 2px solid #DBA99F
- **Nota:** Foto sempre presente. Depoimento sem foto nao entra.

#### Card de Fornecedor (Conexoes)
- **Background:** #FFFFFF
- **Borda:** 1px solid #E8E6DF
- **Interior:**
  - Foto de capa: aspect-ratio 16/9, object-fit cover
  - Nome: Montserrat 16px, weight 600, cor #1a1a1a
  - Categoria: Montserrat 11px, uppercase, letter-spacing 0.08em, cor #9C958F
  - Selo Alianca (se aplicavel): icone alianca entrecruzada 16px + "Alianca S.A." em rose
- **Hover:** Mesmo padrao de elevacao dos cards de produto

### 4.2. Botoes

| Tipo | Background | Texto | Borda | Hover | Uso |
|------|-----------|-------|-------|-------|-----|
| Primario | #DBA99F (rose) | #FFFFFF | none | opacity 0.9 + translateY(-1px) | CTAs principais, "Fale Conosco", "Agendar" |
| Outline | transparent | #9C958F (taupe) | 1px solid #6b635d | border + text rose | CTAs secundarios, "Saiba Mais" |
| Ghost | transparent | #DBA99F (rose) | none | opacity 0.7 | Links de navegacao inline, "Ver todos" |
| Eucalyptus | #4A6741 | #F4F3EE (cream) | none | opacity 0.9 + translateY(-1px) | Mentoria, confirmacoes positivas |

**Tamanhos:**
- Default: height 48px, padding 0 24px, font-size 14px
- Small: height 36px, padding 0 16px, font-size 12px
- Large: height 56px, padding 0 32px, font-size 15px

**Todos os botoes:**
- Font: Montserrat, weight 600
- Letter-spacing: 0.06em
- Border-radius: 4px (consistente com cards)
- Transicao: 200ms cubic-bezier(0.4, 0, 0.2, 1)
- Active: `transform: translateY(0) scale(0.98)` por 150ms

### 4.3. Formularios

#### Input Padrao
- Height: 48px
- Background: #FFFFFF (em pagina cream) ou cream-light (#FAFAF7)
- Borda: 1px solid #BAB9B6, borda inferior 2px solid rgba(219,169,159,0.3)
- Border-radius: 4px (topo) — ou 8px para contextos mais informais (diagnostico)
- Placeholder: cor taupe-dark (#6b635d), Source Sans 3 15px
- Focus: borda inferior rose solido, outline none
- Transicao: 200ms ease

#### Floating Label (Formularios Premium)
- Label em Montserrat 11px, weight 500, uppercase, letter-spacing 0.1em, cor taupe
- Posicao default: dentro do input, alinhado ao placeholder
- On focus ou filled: `transform: translateY(-24px) scale(0.85)`, cor rose
- Transicao: 200ms cubic-bezier(0.4, 0, 0.2, 1)

#### Textarea
- Min-height: 120px
- Mesmo estilo de input, com resize: vertical
- Line-height: 1.7

#### Select / Dropdown
- Estilo consistente com input
- Seta customizada: SVG chevron-down, stroke rose, 1.5px

### 4.4. Modais

- **Backdrop:** rgba(0,0,0,0.4) com backdrop-filter: blur(4px)
- **Card do modal:** background #FFFFFF, raio 8px, shadow-lift, max-width 520px
- **Entrada:** fade in 350ms + scale(0.95 → 1)
- **Saida:** fade out 250ms + scale(1 → 0.95)
- **Botao de fechar:** X fino (1.5px stroke, taupe), canto superior direito, 32x32 hit area
- **Scroll interno:** se conteudo exceder viewport, scroll dentro do modal com scroll-margin

### 4.5. Navegacao

#### Header
- Background: cream (#F4F3EE) ou transparente com blur (sobre hero)
- Height: 64-72px
- Logo: Cormorant Garamond 300, "NOIVA" rose + "S.A." taupe
- Links: Montserrat 13px, weight 500, letter-spacing 0.04em, cor taupe-dark
- CTA (header): botao primario small
- Sticky: sim, com transicao suave de fundo ao scrollar

#### Mobile Menu
- Full-screen overlay com background cream
- Links centralizados, Cormorant Garamond 28px, weight 400
- Dividers rose entre itens
- Animacao: slide from right, 350ms
- Botao hamburger: 3 linhas finas (1.5px), taupe, transicao para X ao abrir

### 4.6. Tooltips e Popovers

- Background: #1a1a1a (dark contra cream page)
- Texto: cream (#F4F3EE), Source Sans 3 13px
- Border-radius: 4px
- Seta: triangulo CSS apontando para o trigger
- Entrada: fade + translateY(4px) → translateY(0), 200ms
- Max-width: 240px

---

## 5. Direcao de Video

### 5.1. Talking Head (Giovanna Paola)

| Elemento | Especificacao |
|----------|--------------|
| Iluminacao | Luz natural lateral (janela). Sem ring light (muito YouTube). Key light suave se necessario. |
| Fundo | Neutro — cream, off-white ou parede texturizada clara. Ou atelier real com estante/plantas desfocadas. |
| Enquadramento | Cintura pra cima. Regra dos tercos — Giovanna ligeiramente a esquerda, olhando para o espaco a direita. |
| Vestimenta | Casual premium — blazer sobre camiseta, cores neutras (cream, taupe, rose suave). Nunca preto puro. |
| Acessorios | Discretos. Um brinco, um relogio fino. Nada que distraia do rosto/discurso. |
| Microfone | Lapela discreto ou boom fora de quadro. Sem microfone de mesa visivel. |
| Color grading | Quente, consistente com fotos — cream nos highlights, taupe nos shadows. |

### 5.2. Footage de Eventos

| Tipo | Quando | Como |
|------|--------|------|
| Slow motion (60-120fps) | Detalhes — buque, alianca na mao, laco sendo amarrado | Close-ups com bokeh generoso |
| Velocidade real | Emocoes — a noiva vendo o noivo, abraco com pais, riso espontaneo | Camera firme (gimbal), enquadramento medio |
| Time-lapse | Processo — montagem do espaco, mesa sendo posta, equipe trabalhando | Camera fixa, wide angle |
| Bastidores | A assessora no trabalho — headset, checklist, coordenando | Camera de mao levemente instavel (intencional — autenticidade) |

**Audio:** Mix de trilha instrumental suave (piano, violao, cordas) com audio ambiente real (risos, aplausos, burburinho). A trilha nunca domina — e moldura, nao protagonista.

### 5.3. Depoimentos em Video

- **Formato:** Horizontal (16:9)
- **Setting:** Local natural — casa da noiva, jardim, cafe. Nunca estudio.
- **Enquadramento:** Busto, olhando para entrevistador fora de quadro (nao para camera)
- **Duracao:** 30-90 segundos editados. Raw pode ser mais longo.
- **Lower third:** Montserrat 14px, weight 500, cor rose sobre fundo semi-transparente (#FFFFFF com 90% opacidade)
- **Overlay de marca:** Logo Noiva S.A. discreto no canto inferior direito, opacidade 40%

### 5.4. Reels e Stories

- **Formato:** Vertical (9:16)
- **Ritmo:** Cortes rapidos para conteudo educacional (2-3 segundos por cena). Cortes lentos para emocional.
- **Texto overlay:**
  - Font: Source Sans 3, weight 600, tamanho legivel (min 24pt)
  - Cor: #1a1a1a sobre fundo cream com opacidade 85%
  - Ou: #FFFFFF sobre imagem escurecida
  - Accent: sublinhado ou highlight rose em palavras-chave
- **Hashtag visual:** Nao colocar hashtags visualmente no video. Reservar para caption.
- **CTA final:** Frame com fundo rose, texto cream, "Link na bio" ou "Fale com a gente"
- **Thumbnail:** Texto grande e legivel + rosto da Giovanna. Cores da marca.

### 5.5. Transicoes de Video

| Transicao | Quando | Como |
|-----------|--------|------|
| Cross dissolve | Entre cenas do mesmo momento | 500-800ms, suave |
| Cut seco | Mudanca de topico ou ritmo | Imediato — intencionalidade |
| Whip pan | Bastidores, energia | Rapido, quase desfocado na transicao |
| Fade to cream | Fechamento de secao | 800ms para cream (#F4F3EE) |

**Proibido:** Star wipes, slides com efeito 3D, zoom digital agressivo, flash de transicao. Nada que pareça template de editor gratuito.

---

## 6. Branded Moments

### 6.1. O Sim (Entrada na Sociedade)

**O que e:** O momento em que alguem decide entrar para a Noiva S.A. — como noiva, assessora ou fornecedor.

**Emocao alvo:** Celebracao calorosa + pertencimento. Como ser convidada para a mesa principal.

**Direcao visual:**
- **Paleta dominante:** Rose (#DBA99F) + Blush (#FFCBC1) — calor maximo
- **Tipografia:** "O Sim" sempre em Great Vibes, tamanho generoso (min 48px)
- **Elemento visual:** Alianca Entrecruzada em rose, tamanho featured (80-120px), centrada
- **Background:** Gradiente sutil de cream para blush-light (#FFF5F3)
- **Fotografia:** Maos se encontrando, brinde com tacas, abraco de boas-vindas
- **Motion:** Confete sutil — particulas rose/blush caindo suavemente (CSS only, max 15-20 particulas)

**Implementacao do confete (CSS):**
```css
@keyframes confettiFall {
  0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
}
.confetti-particle {
  position: fixed;
  width: 6px; height: 6px;
  border-radius: 1px;
  animation: confettiFall 3s ease-in forwards;
  pointer-events: none;
  z-index: 100;
}
/* Variacao com JS para posicoes e delays aleatorios */
```

**Aplicacao:** Email de boas-vindas, tela de confirmacao no site, post de anuncio no Instagram, material fisico de onboarding.

### 6.2. Mesa Posta (Encontro Mensal)

**O que e:** Reuniao mensal mais profunda da sociedade — retrospectiva, conexoes, reconhecimentos.

**Emocao alvo:** Ordem com carinho. A mesa esta preparada com cuidado, tudo no lugar, e todo mundo e bem-vindo.

**Direcao visual:**
- **Paleta dominante:** Taupe (#9C958F) + Cream (#F4F3EE) — estrutura com calor
- **Tipografia:** "Mesa Posta" em Cormorant Garamond, weight 400, elegante e composto
- **Elemento visual:** Mesa vista de cima (flat lay) com elementos organizados — caderno, flores, xicara
- **Background:** Cream puro — limpeza, organizacao
- **Detalhe botanico:** Ramo de eucalipto como divisor ou acento lateral
- **Fotografia:** Mesa real posta com esmero — talheres alinhados, guardanapo dobrado, arranjo simples

**Aplicacao:** Capa de material da reuniao, background de Zoom/Google Meet, thumbnail de conteudo recorrente, template de recap mensal.

### 6.3. Prova do Vestido (Primeiro Evento Real)

**O que e:** Quando uma assessora em formacao faz seu primeiro evento real acompanhada de mentora.

**Emocao alvo:** Coragem + crescimento. O nervosismo antes de entrar no provador e a felicidade quando veste e cabe perfeitamente.

**Direcao visual:**
- **Paleta dominante:** Eucalyptus (#4A6741) + Rose (#DBA99F) — crescimento encontra amor
- **Tipografia:** "Prova do Vestido" em Cormorant Garamond, italico, weight 400
- **Elemento visual:** Ramo com bagas — frutos do aprendizado
- **Background:** Cream com acento eucalyptus no topo ou lateral (barra fina)
- **Fotografia:** Assessora em acao (com headset, checklist), mentora observando ao fundo desfocada

**Aplicacao:** Certificado de conclusao de pratica, post de celebracao, selo visual no perfil da assessora, card de marco no hub.

### 6.4. O Brinde (Celebracao de Marco)

**O que e:** Reconhecimento publico de uma conquista — primeiro evento, decimo evento, primeiro ano.

**Emocao alvo:** Orgulho coletivo. A sociedade celebrando uma de suas socias.

**Direcao visual:**
- **Paleta dominante:** Rose (#DBA99F) + Rose-light (#ECC8BE) — brilho contido
- **Tipografia:** "O Brinde" em Great Vibes, rose-dark (#C49189), com estrela/sparkle sutil ao lado
- **Elemento visual:** Forma circular (selo/badge) com borda rose-light, conteudo do marco dentro
- **Background:** Blush-light (#FFF5F3) — festivo mas nao exagerado
- **Detalhe:** Leve shimmer no selo — `box-shadow: 0 0 20px rgba(219,169,159,0.15)` — como a luz refletida numa taca
- **Fotografia:** Tacas brindando (close, hands visible), ou grupo aplaudindo

**Nota sobre "dourado":** A tentacao de usar gold aqui e grande. NAO usar. Rose-light (#ECC8BE) cumpre o papel de "celebracao brilhante" dentro da paleta. Sem gold, amber, ou champagne fora da paleta.

**Aplicacao:** Card de celebracao na comunidade, stories template, certificados de marco, selo de badge.

### 6.5. Despedida de Solteira (Transicao para Alumni)

**O que e:** Quando uma noiva completa seu casamento e transiciona de "noiva ativa" para "alumni" da sociedade.

**Emocao alvo:** Nostalgia bonita + gratidao. Como jogar o buque — soltar algo lindo sabendo que volta de outra forma.

**Direcao visual:**
- **Paleta dominante:** Blush (#FFCBC1) suavizando para Cream (#F4F3EE) — transicao gradual, como por-do-sol
- **Tipografia:** "Despedida de Solteira" em Cormorant Garamond, weight 300, cor rose-light — delicada como o momento
- **Elemento visual:** Gradiente horizontal — blush a esquerda (passado/experiencia) para cream a direita (futuro/nova fase)
- **Background:** Transicao suave blush → cream
- **Detalhe botanico:** Folha simples solta, como se estivesse caindo graciosamente
- **Fotografia:** Noiva de costas jogando buque, ou maos soltando petalas ao vento

**Aplicacao:** Email de transicao para alumni, card na comunidade, stories de celebracao pos-casamento.

---

## 7. Aplicacao por Touchpoint

### 7.1. Website Institucional

**Atmosfera:** Galeria de arte — espaco branco generoso, conteudo curado, navegacao intuitiva.

| Elemento | Especificacao |
|----------|--------------|
| Background | Cream (#F4F3EE) predominante. Secoes alternadas com #FFFFFF para ritmo visual. |
| Header | Sticky, height 64px, logo left, nav right, CTA "Fale Conosco" rose. Background cream com blur ao scrollar. |
| Hero | Imagem full-width com overlay cream semi-transparente. H1 Cormorant Garamond 48-56px. Subtitle Source Sans 3. |
| Secoes | Padding vertical 96px. Max-width conteudo 1080px. |
| Footer | Background #1a1a1a. Texto cream. Logo invertido. Links em colunas. Elemento botanico sutil (ramo, opacidade 10%). |
| Tipografia | H1: Cormorant 48-56px/300-400. H2: Cormorant 32-40px/400. Body: Source Sans 15-16px/400. Labels: Montserrat 11-13px/500-600. |

**Motion:** Scroll reveal padrao (secao 2.4) em todas as secoes. Hero entrance na page load. Divider grow entre secoes.

### 7.2. Landing Pages (Vendas)

**Atmosfera:** Convite elegante que voce nao consegue recusar — informacao suficiente, emocao na medida certa.

| Elemento | Especificacao |
|----------|--------------|
| Background | Cream base. Secoes de destaque em blush-light (#FFF5F3). |
| Hero | H1 emocional em Cormorant Garamond, grande (56-72px). Imagem de conexao humana. CTA rose proeminente. |
| Prova social | Strip de depoimentos com foto + nome + resultado concreto. |
| Processo | 3-4 steps visualizados com icones stroke + numeracao. Montserrat para labels. |
| Pacotes | Cards lado a lado (secao 4.1). Destaque visual no carro-chefe. |
| FAQ | Acordeao simples, borda cream-dark. Seta rotacional (chevron rotate 180deg, 200ms). |
| CTA final | Full-width blush background. Headline Great Vibes ("Faz O Sim"). CTA primario grande. |
| Urgencia | Sem countdown timers, sem "vagas limitadas" em vermelho. Se houver escassez real, comunicar em texto simples. |

**Motion:** Todos os elementos com scroll reveal. Cards de pacote com stagger. CTA final com parallax sutil (desktop only).

### 7.3. Instagram Feed e Stories

#### Feed

- **Grid visual:** Alternar entre 3 tipos — foto de conexao, card educacional (fundo cream, texto rose/taupe), quote (fundo blush, Great Vibes).
- **Card educacional:** Background cream (#F4F3EE). Borda: nenhuma ou 1px cream-dark. Texto: H1 Cormorant 28-36px rose, corpo Source Sans 15px #1a1a1a.
- **Card de quote:** Background blush-light (#FFF5F3). Aspas Great Vibes 60px rose opacidade 30%. Texto Source Sans 18px italico.
- **Carousel:** Slide 1 = hook visual forte. Slides intermediarios = conteudo. Ultimo slide = CTA com fundo rose.
- **Formato:** 1:1 para feed principal. 4:5 para carroseis educacionais.

#### Stories

- **Templates com marca:** Fundo cream. Texto Source Sans 3 bold para titulos. Accent rose em highlights.
- **Bastidores:** Sem template — camera no celular, estetica real. Texto apenas se necessario.
- **Enquetes/caixas:** Usar cores do Instagram mas com sticker minimo. O conteudo e mais importante que o design do sticker.
- **Highlight covers:** Icones stroke-based (secao 8) sobre fundo cream ou rose-light. Consistentes entre si.

### 7.4. Propostas Comerciais (PDF/Digital)

**Formato:** PDF interativo ou pagina web dedicada (como assessoria-sa-apresentacao.html).

| Pagina | Conteudo | Visual |
|--------|----------|--------|
| Capa | Logo + nome do pacote + "Proposta para [Nome da Noiva]" | Fundo cream, logo centrado, nome em Cormorant 40px |
| Sobre | Quem somos, numeros (8 anos, 200+ casamentos) | Foto de equipe + dados lado a lado |
| O Problema | Dor da noiva, inimigo narrativo | Texto em Source Sans, tom empatico. Sem imagem — foco total nas palavras. |
| O Metodo | Como funciona, diferenciais, processo visual | Timeline vertical com icones stroke, 4-6 etapas |
| O Pacote | Detalhamento do servico escolhido, stack de valor | Card destacado com borda rose. Itens com checkmarks eucalyptus. |
| Depoimentos | 2-3 depoimentos com foto, nome e resultado | Layout como cards de depoimento (secao 4.1) |
| Investimento | Preco claro + forma de pagamento + garantia | Numero grande em Cormorant, Montserrat para detalhes |
| Proximo Passo | CTA claro — "Agende sua reuniao" ou "Responda esta proposta" | Botao rose. Contato direto da Giovanna. |

**Tipografia:** Cormorant para headlines, Source Sans para corpo, Montserrat para labels. Great Vibes somente na capa ou citacao.

**Impressao:** Se impresso, manter cores. Nao converter para CMYK generico — manter a temperatura quente da paleta.

### 7.5. Apresentacao de Vendas (Slides)

Ja existe referencia implementada em `assessoria-sa-apresentacao.html` com 27 slides interativos.

**Principios validados:**
- Fundo dark (#0a0a0a) funciona para apresentacoes ao vivo (projetor, tela)
- Rose como accent contra dark — alto contraste, elegancia
- Transicoes scale + blur entre slides
- Stagger de elementos com data-animate
- Particulas rose sutis como textura ambiental
- Cursor glow rose em desktop

**Para novas apresentacoes:** Replicar sistema de `assessoria-sa-apresentacao.html`. Adaptar conteudo, manter estrutura de interacao.

### 7.6. Kit de Boas-Vindas

**Formato:** Fisico (impresso) + digital (PDF ou pagina).

| Item | Visual |
|------|--------|
| Carta de boas-vindas | Papel cream texturizado. Texto Source Sans. Assinatura Giovanna em Great Vibes. Ramo botanico no canto. |
| Guia da Socia | Livreto A5. Capa rose com logo branco. Interior cream com fotos. Timeline do processo. |
| Checklist impresso | Papel cream. Checkboxes vazios com borda rose. Montserrat para itens. Espaco para anotacoes. |
| Brinde | Algo util — caderno com logo embossed, caneta rose, sache de eucalipto. Nunca algo generico com logo estampado. |
| Material digital | Mesmo conteudo em PDF acessivel. Links clicaveis. QR code para comunidade. |

### 7.7. Certificados (Mentoria)

- **Formato:** A4 horizontal (paisagem)
- **Fundo:** Cream (#F4F3EE) com moldura fina (1px) silver (#BAB9B6)
- **Cantos:** Ramo botanico (eucalipto) nos cantos superior-esquerdo e inferior-direito, opacidade 15%
- **Titulo:** "Certificado de Conclusao" — Cormorant Garamond 36px, weight 300, cor #1a1a1a
- **Nome:** Cormorant Garamond 32px, weight 400, cor rose (#DBA99F)
- **Detalhes:** Source Sans 3 14px, cor taupe-dark
- **Assinatura:** Area designada com linha fina. "Giovanna Paola" em Great Vibes 24px. Cargo em Montserrat 10px.
- **Selo:** Alianca Entrecruzada + "Formada Noiva S.A." ou "Mentoria Concluida" — selo circular, borda rose-light, 60px

### 7.8. Selos de Pertencimento

Quatro selos principais. Todos seguem a mesma estrutura visual para consistencia.

**Estrutura base:**
- Forma: Circular, 80px diametro para uso digital
- Borda: 1.5px stroke
- Interior: Alianca Entrecruzada centrada + texto curvo ao redor
- Tipografia: Montserrat 8px, weight 600, uppercase, letter-spacing 0.1em

| Selo | Borda | Alianca | Texto | Background |
|------|-------|---------|-------|------------|
| Socia S.A. | Rose (#DBA99F) | Rose | "SOCIA S.A." | Transparente |
| Alianca Noiva S.A. | Rose-dark (#C49189) | Rose-dark | "ALIANCA NOIVA S.A." | Transparente |
| Formada | Eucalyptus (#4A6741) | Eucalyptus | "FORMADA NOIVA S.A." | Transparente |
| Master | Rose-light (#ECC8BE) com glow | Rose-light | "MASTER" | Transparente, com shadow: 0 0 12px rgba(219,169,159,0.2) |

**Versao para fundo escuro:** Todas em cream (#F4F3EE) monocromatico.

**Uso:** Badge em perfil de redes sociais, assinatura de email, card de membro na comunidade, material impresso.

---

## 8. Sistema de Icones

### Estilo

- **Stroke-based** — sem preenchimento (fill: none)
- **Stroke-width:** 1.5px padrao, 2px em tamanhos menores (16px ou menos)
- **Corners:** Arredondados (stroke-linecap: round, stroke-linejoin: round)
- **Cor padrao:** Taupe (#9C958F) em contexto neutro, Rose (#DBA99F) em destaque
- **Grid:** 24x24px como base, escalavel para 16, 20, 32, 48
- **Estilo visual:** Consistente com Lucide Icons ou Phosphor Icons (thin/light) — limpo, contemporaneo, amigavel

### Categorias e Icones Necessarios

#### Casamento
| Icone | Descricao Visual |
|-------|-----------------|
| Alianca | Dois circulos entrecruzados (simbolo da marca — simplificado) |
| Buque | 3 circulos (flores) com hastes convergindo para baixo |
| Veu | Arco suave com linhas descendo (cortina fina) |
| Altar | Dois pilares finos com arco conectando no topo |
| Convite | Retangulo com aba aberta (envelope) |
| Calendario | Grade simples com coracao marcando uma data |

#### Organizacao
| Icone | Descricao Visual |
|-------|-----------------|
| Checklist | Retangulo com 3 linhas, primeira com checkmark |
| Timeline | Linha vertical com 3-4 nos (circulos) |
| Planilha | Grade 3x3 simples |
| Processo | 3 circulos conectados por setas curvas |
| Relogio | Circulo com ponteiros |
| Pasta | Forma classica de folder com aba |

#### Comunicacao
| Icone | Descricao Visual |
|-------|-----------------|
| Chat | Balao de fala com 3 pontos |
| Telefone | Handset classico inclinado |
| Email | Envelope fechado |
| Video | Retangulo com triangulo play |
| WhatsApp | Balao com telefone dentro (simplificado) |

#### Comunidade
| Icone | Descricao Visual |
|-------|-----------------|
| Grupo | 3 silhuetas de busto sobrepostas |
| Coracao | Coracao simples outline |
| Estrela | Estrela 5 pontas outline |
| Brinde | Duas tacas inclinadas se encontrando |
| Handshake | Duas maos se cumprimentando (simplificado) |

#### Fornecedores
| Icone | Descricao Visual |
|-------|-----------------|
| Camera | Camera fotografica simplificada |
| Flor | Flor de 5 petalas simples |
| Musica | Nota musical |
| Bolo | Bolo de 2 andares simplificado |
| Paleta | Paleta de artista (decoracao) |

### Regras de Uso

1. **Nunca usar icones como substituto de texto.** Icone sempre acompanhado de label (exceto em mobile nav onde espaco e critico).
2. **Tamanho minimo legivel:** 16px. Abaixo disso, usar versao simplificada ou remover.
3. **Acento botanico em icones:** Permitido adicionar uma folha ou ramo sutil a um icone para reforcar a marca, mas SOMENTE em contextos decorativos (headers, separadores). Nunca em icones funcionais (botoes, nav).
4. **Cor:** Taupe para icones funcionais (nav, formularios). Rose para icones em destaque (features, beneficios). Eucalyptus para icones de confirmacao/sucesso. Nunca mais de uma cor por icone.
5. **Consistencia:** Todos os icones de uma mesma pagina devem ter o mesmo stroke-width e estilo de cantos. Misturar icones de conjuntos diferentes e proibido.

---

## 9. Anti-patterns (O que NUNCA Fazer)

### Visual

| Anti-pattern | Por que | Alternativa |
|-------------|---------|-------------|
| Gradientes pesados ou multicoloridos | Conflita com a estetica flat-com-sombra da marca | Sombras suaves para profundidade |
| Cores neon ou saturadas | Grita contra a paleta quente e suave | Manter dentro da paleta aprovada (secao 1 do design system) |
| Preto puro (#000000) como background principal | Frio e agressivo para uma marca de casamento | Usar cream (#F4F3EE) para paginas, #0a0a0a somente para apresentacoes/dark contexts |
| Gold, amber, champagne, dourado | Fora da paleta. Rose-light (#ECC8BE) substitui o papel de "celebracao brilhante" | Rose-light para momentos festivos |
| Glassmorfismo (vidro fosco com blur) | Estetica de tech startup, nao de casamento | Cards solidos com sombras suaves |
| Bordas grossas (>2px) | Pesadas demais para a identidade leve da marca | Max 1-2px, cores suaves |
| Emojis em qualquer material | Desprofissionalizam a comunicacao | Icones stroke-based (secao 8) |

### Animacao

| Anti-pattern | Por que | Alternativa |
|-------------|---------|-------------|
| Bounce/elastic easing | Lúdico demais — parece app infantil | cubic-bezier(0.4, 0, 0.2, 1) ou (0.16, 1, 0.3, 1) |
| Animacoes acima de 1 segundo | Testam a paciencia. Elegancia e concisao. | Max 600-800ms para maioria, 1s para momentos especiais |
| Parallax agressivo (>20% diferenca) | Causa nausea, distrai do conteudo | Max 10% de diferenca, somente desktop |
| Scroll-jacking (sequestrar scroll do usuario) | Frustrante e inacessivel | Scroll natural com reveal via IntersectionObserver |
| Auto-play de video com som | Invasivo e detestado universalmente | Video mudo com botao de play visivel |
| Animacao em loop infinito (alem de loading) | Distrai do conteudo, cansa o olho | Animacoes que executam uma vez e param |
| Flash/blink de elementos | Agressivo, inacessivel, amador | Transicoes de opacidade suaves |

### Layout

| Anti-pattern | Por que | Alternativa |
|-------------|---------|-------------|
| Pricing tables estilo SaaS | Soa como produto de software, nao servico de casamento | Cards individuais por pacote com personalidade propria |
| Dashboard aesthetic | Noiva S.A. nao e uma plataforma de dados | Layout editorial — mais revista, menos software |
| Grid rigido sem respiro | Sufoca a marca, parece formulario | Espacamento generoso (96px entre secoes), max-width 1080px |
| Pop-ups intrusivos | Destroem confianca, sao odiados | Modal com trigger do usuario (click), nunca automatico |
| Sticky bars de promocao | Urgencia falsa, estetica de e-commerce | Se necessario, barra sutil integrada ao header |
| Carrossel automatico | Usuarios nao controlam o timing — frustante | Carrossel manual com setas e dots, ou grid estatico |

### Fotografia

| Anti-pattern | Por que | Alternativa |
|-------------|---------|-------------|
| Stock de casamento generico | O cliche da noiva de branco na praia ao por-do-sol | Fotos reais, autorais, de casamentos Noiva S.A. |
| Fotos sem pessoas | A marca e sobre conexao humana | Sempre pelo menos um elemento humano |
| Filtros frios/azulados | Conflitam com a paleta quente | Grading quente (secao 3) |
| Imagens com texto sobreposto sem contraste | Ilegivel e amador | Overlay cream semi-transparente sob texto |
| Logos de fornecedor misturados | Polui a identidade visual | Logos de parceiros em area dedicada, tons neutros |

### Tipografia

| Anti-pattern | Por que | Alternativa |
|-------------|---------|-------------|
| Misturar Great Vibes com Cormorant Garamond | Duas fontes decorativas competindo | Great Vibes somente para acentos isolados (1 por secao max) |
| Fontes fora das 4 aprovadas | Quebra a consistencia visual | Cormorant Garamond, Montserrat, Source Sans 3, Great Vibes — somente |
| Texto todo em CAPS (alem de labels curtos) | Grita. A marca fala, nao grita. | Caps somente para labels (Montserrat 11px) e CTAs curtos |
| Line-height apertado em corpo | Sufocante, dificil de ler | Min 1.6 para corpo de texto |
| Texto rose sobre fundo rose-adjacente | Baixo contraste, ilegivel | Rose sobre cream ou branco. Taupe-dark sobre fundos rose. |

---

## 10. Acessibilidade

### Contraste Minimo (WCAG AA)

| Combinacao | Ratio | Status |
|-----------|-------|--------|
| #1a1a1a sobre #F4F3EE (cream) | 14.5:1 | Passa |
| #6b635d sobre #F4F3EE (cream) | 4.7:1 | Passa |
| #9C958F sobre #F4F3EE (cream) | 3.4:1 | Falha para texto pequeno — usar somente para labels grandes ou decorativo |
| #DBA99F sobre #FFFFFF | 2.7:1 | Falha — nao usar rose como cor de texto em fundo branco |
| #FFFFFF sobre #DBA99F (rose) | 2.7:1 | Falha — adicionar sombra ou usar peso bold para compensar. Ou usar #1a1a1a sobre rose. |
| #F4F3EE sobre #1a1a1a (footer) | 14.5:1 | Passa |

**Acoes:**
- Texto principal: sempre #1a1a1a sobre cream/branco
- Texto secundario: #6b635d (taupe-dark) — minimo para corpo
- Rose: usar para elementos decorativos, CTAs com texto branco bold (compensa contraste via peso visual), ou icones
- Para CTA rose com texto branco: adicionar `text-shadow: 0 1px 2px rgba(0,0,0,0.1)` para reforco sutil

### prefers-reduced-motion

**Obrigatorio em toda implementacao:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Regra:** Todo JS que usa IntersectionObserver para animacoes deve checar `prefers-reduced-motion` antes de aplicar classes de animacao:

```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  // aplicar scroll reveal, stagger, parallax
} else {
  // mostrar tudo visivel imediatamente
  document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('visible'));
}
```

### Focus Visible

- Todos os elementos interativos devem ter `:focus-visible` com outline rose
- `outline: 2px solid #DBA99F; outline-offset: 2px;`
- Nao remover outline em `:focus` — acessibilidade de teclado nao e negociavel

### Alt Text em Imagens

- Toda imagem com conteudo informativo requer alt text descritivo
- Imagens decorativas (botanicos, divisores): `alt=""` ou `role="presentation"`
- Fotos de pessoas: descrever a acao/emocao, nao so "foto de casamento"

### Tamanho Minimo de Toque (Mobile)

- Minimo: 44x44px para areas clicaveis
- Botoes: ja atendem com height 48px
- Links em texto: adicionar padding vertical para area de toque
- Icones: se usados como botao, wrapper de 44x44px minimo

---

## Notas para Designer Agent

1. Consultar sempre o design system ao vivo (https://design-system-roan-nine.vercel.app) para componentes ja implementados.
2. As sombras do design system usam `rgba(155,149,143,X)` (base taupe) — manter consistencia, nao usar preto puro em sombras.
3. Great Vibes e a fonte mais perigosa do sistema — usar com extrema moderacao. Max 1 uso por secao. Nunca para texto funcional.
4. Os branded moments (secao 6) precisam de templates visuais que possam ser replicados por equipe nao-designer (Canva, Figma templates).
5. O selo Master usa glow sutil — este e o unico momento onde um efeito de luz e permitido. Nao extrapolar para outros elementos.

## Notas para Dev Agent

1. Todas as animacoes sao CSS + JS vanilla. Sem Framer Motion, GSAP, ou Canvas (exceto se ja implementado como em assessoria-sa com particulas).
2. IntersectionObserver e a base para scroll reveal — threshold 0.2, unobserve apos trigger.
3. Todos os timings estao em ms e com easings nomeados — implementar exatamente como especificado.
4. Cursor glow: somente em paginas dark mode. Em light mode (cream background), o efeito e invisivel e deve ser omitido.
5. `prefers-reduced-motion` e obrigatorio em toda pagina — nao e opcional.
6. Mobile: desativar parallax, cursor glow, e reduzir stagger (max 3 items em sequencia).
7. O sistema de `[data-animate]` + stagger por `nth-child` ja esta validado em assessoria-sa — reutilizar padrao.

---

## Changelog

| Data | Versao | Alteracao |
|------|--------|-----------|
| 2026-04-08 | 1.0 | Documento fundacional criado com todas as 10 secoes da direcao criativa. |
