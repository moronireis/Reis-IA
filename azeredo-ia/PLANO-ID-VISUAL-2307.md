# AZEREDO IA — Plano: ID Visual oficial (#21) + contraste do tema claro (#20)

> Origem: board 23/07 à noite — issues #20 (fix contraste, print anexo), #21 (aplicar ID
> Visual, logo oficial em anexo) e #19 (refactor de componentes, autor postrenan, sem corpo).
> Última atualização: 23/07/2026.

---

## 1. Diagnóstico

### #21 — ID Visual (anexos analisados)
Os 2 anexos são o **logo oficial em alta (1280×720)**: monograma **AZ com gradiente
laranja** (≈ #F59B3D → #E06A1B) e swoosh, badge "1989", wordmark **"Azeredo" com gradiente
navy** (≈ #2B4A8B → #1C2E52), "REPRESENTAÇÕES" navy com traços laranja. Fundo off-white,
JPEG (sem transparência). É a resposta ao pedido de logo vetorial feito na #16 — substitui
o monograma "AZ" tipográfico que desenhei como fallback.

### #20 — Contraste (print analisado)
O print é o **tema claro na tela de Conversas**: a sidebar está correta, mas a **barra de
números do topo e o painel da lista de chats continuam com fundos ESCUROS fixos** — texto
navy/escuro sobre superfície escura. Causa técnica: o sweep de tokenização (22-23/07)
cobriu as famílias principais de cor, mas sobraram **rgba escuros avulsos hardcoded**
(ex.: `rgba(10, 16, 12, 0.62)` na barra de instâncias, painéis internos da lista, bolhas,
composer) que não reagem ao tema. No escuro ninguém percebia; no claro quebra.
Suspeitos além de Conversas: monitor de disparo, modais internos, ContatosView (headers
sticky), LeadsView (colunas kanban), GerarPedido (ficou fora do sweep por ter paleta
própria) e chips/badges com par bg/texto fraco (ex.: chip do número no topo).

### #19 — feat(ui) componentes modularizados (postrenan)
Sem corpo/escopo. É refactor interno de outro dev — **não executar sem descrição**
(e um refactor estrutural agora conflitaria com o estado atual). Ação: comentar pedindo
escopo e alinhar para depois da validação conjunta.

## 2. Fases

### Fase A — Aplicar o ID Visual oficial (#21) — ~1-1,5h
1. Processar os anexos: remover o fundo (vectosolve `remove_background`) e recortar 2
   assets — **lockup completo** e **monograma AZ isolado**; tentar `vectorize` para SVG
   (recolorível); fallback: PNG transparente @2x. Salvar em `public/brand/`.
2. Aplicar:
   - **Sidebar + mobile header**: monograma AZ oficial no lugar do tile tipográfico.
   - **Login**: lockup completo na vitrine (no tema escuro, wordmark recolorido para
     branco se o SVG permitir; senão, lockup sobre chip off-white sutil).
   - **Favicon**: monograma oficial.
3. Calibrar tokens pelo logo em alta: gradiente do acento (`--accent-light/dark` casando
   com #F59B3D→#E06A1B) e navy oficial (#1C2E52/#2B4A8B) nos elementos de marca — mantendo
   as variantes de legibilidade (texto navy claro no escuro) que já passam em contraste.

### Fase B — Caça ao contraste no tema claro (#20) — ~1,5-2h
1. Varredura COMPLETA de superfícies escuras fixas: todo `rgba(R,G,B,a)` com R/G/B baixos
   em componentes → tokens (`--glass-nav`, `--bg-card-translucent`, `--surface-btn`,
   `--bg-secondary`, `--scrim`). Foco: ConversasView (barra de números, lista, bolhas,
   composer, viewer de mídia), DisparosView (monitor, painéis passo 2/3), ContatosView,
   LeadsView, FerramentasView, modais, MessageContent/AudioPlayer, GerarPedido (entra no
   padrão agora).
2. Chips e badges nos DOIS temas: chip de número do topo (dot + nome + fone), guia ativa,
   badge de campanha, contadores, avatares (iniciais precisam de texto com contraste).
3. QA por tela: 9 páginas × claro/escuro, com os pares texto/fundo críticos verificados.

### Fase C — Preview → validação → produção + fechamento — ~0,5h
1. Preview Vercel + smoke (CSS, rotas, 2 temas).
2. Validação visual do Moroni no preview (tela de Conversas no claro em especial).
3. `npm run deploy` → comentar #20 e #21 (e #19 pedindo escopo), u4-status, commit +
   snapshot handoff, memória.

**Total estimado: ~3-4h, uma sessão.**

## 3. Decisões propostas
1. Logo completo (com wordmark) fica no LOGIN e materiais; na sidebar vai o monograma
   oficial + "AZEREDO IA" em texto (hierarquia atual funciona bem).
2. Tons: o acento global permanece na família já aplicada (#E8802F/#D46F1E, AA nos dois
   temas), com gradientes de marca casados no logo/CTAs — não escurecer texto laranja do
   tema escuro para não perder contraste.
3. #19 não entra neste ciclo (sem escopo do autor).

## Changelog
- 2026-07-23 — Plano criado (anexos das issues #20/#21 baixados e analisados).
