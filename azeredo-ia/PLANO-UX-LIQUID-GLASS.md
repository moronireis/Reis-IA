# Plano UX/UI — Liquid Glass Redesign — AZEREDO IA

Last updated: 2026-07-14
Status: **AG0 EM PRODUÇÃO** (aprovado pelo Moroni no preview em 14/07, `azeredo-ia.vercel.app`) — sequência intercalada aprovada (AG0 ✅ → Fase 2 c/ AG1 → Leads glass → sweep → AG5)

> Progresso 14/07: AG0 completo — `global.css` v2 (4 materiais verde-preto, motion system, `.anim`/`.skeleton`/`.overlay-glass`/`.btn`/`.input`, compat v1 preservada), AppLayout com ClientRouter (script do sidebar re-liga em `astro:page-load`), login repaginado (painel vitrine `.glass-panel` + form `.glass-modal` + stagger). E2E: navegação Disparos→Métricas→Contatos→Disparos via View Transitions sem erro, ilhas remontando, mobile ok. Preview: https://azeredo-ecb655jy6-moronifreis-gmailcoms-projects.vercel.app
Referência de linguagem: `marpe-crm-seguros/PLANO-UX-LIQUID-GLASS.md` (F0–F4 em produção na Marpe desde 10/07, aprovado por Moroni) — **mesma gramática, cores da Azeredo**.

---

## 1. Objetivo

Levar todo o front da AZEREDO IA à linguagem **Liquid Glass** já validada na Marpe — materiais translúcidos com blur, profundidade em camadas, luz especular, movimento suave — **mantendo a identidade verde WhatsApp** (#25D366 sobre base verde-preta #080c09). UI/UX soft: cantos contínuos, hairlines com gradiente, hover com física natural, skeletons, foco visível. Zero mudança funcional, de rota ou de API.

## 2. O que JÁ existe (entregue 10/07 nesta base)

| Peça | Estado |
|---|---|
| Tokens `--glass-*` + classes `.glass` / `.glass-strong` / `.glass-soft` | ✅ em `global.css` (v1 — mais simples que o sistema da Marpe) |
| Fundo ambiente (`body::before`, blooms radiais verde+azul) | ✅ |
| Shell: sidebar + header mobile em vidro, nav ativo em pílula | ✅ |
| Página Métricas 100% glass | ✅ |
| Fallbacks `@supports` + `prefers-reduced-transparency` | ✅ |
| **Todo o resto** (Disparos 2.472 linhas, Conversas 746, Conversor 553, Config 506, Templates 409, Renomeador 405, GerarPedido 360, Processos 355, Contatos 348, login 305) | ❌ opaco/flat, inline styles `#111a12` |
| Sistema de movimento (keyframes, stagger, View Transitions, skeletons) | ❌ inexistente |
| Materiais por função (nav/panel/modal/card-surface) | ❌ só os 3 genéricos |

**Alavanca** (igual Marpe): tudo referencia CSS vars → ~60% da transformação é upgrade de tokens + classes utilitárias adotadas via `className`; inline styles ficam só para layout. Não se reescreve 7.3K linhas.

## 3. Sistema de materiais alvo (receitas Azeredo)

Adaptação direta do sistema da Marpe (4 materiais), trocando a temperatura azul-navy por **verde-preto**:

| Material | Uso | Receita (dark, base verde) |
|---|---|---|
| `.glass-nav` | Sidebar (upgrade), toolbars/tabs de página, headers sticky | `rgba(10, 16, 12, 0.62)` + `blur(20px) saturate(1.5)` + hairline `rgba(255,255,255,0.07)` + highlight interno topo |
| `.glass-panel` | Contêineres de seção, colunas/painéis, lista de conversas, wizard | `rgba(13, 20, 15, 0.44)` + `blur(14px) saturate(1.35)` |
| `.glass-modal` | Modais, dropdowns, QR code, prévia de mídia | `rgba(15, 23, 17, 0.82)` + `blur(28px) saturate(1.6)` + sombra profunda |
| `.card-surface` | Cards de campanha, linhas de tabela/lista, bolhas de chat, KPIs | **Sem blur.** `linear-gradient(180deg, #141f16, #0e150f)` + hairline + highlight. Quase sólido de propósito |

- Accent continua `#25D366` (hover glow verde, nunca azul Marpe). `--blue #4A90FF` permanece só para "Respostas" (semântica já estabelecida em Métricas).
- Radius contínuo: cards 14px, painéis 20px, modais 22px, botões/inputs 10–12px, pills 999 (cantos concêntricos).
- **Dark-only** (decisão): o produto é dark desde o dia 1, cliente nunca pediu light. Sem toggle (= −1 sessão vs Marpe).
- Regra de ouro de performance (idêntica Marpe): blur SÓ em contêineres (máx. 6–8/viewport). Linhas da tabela de Contatos (2,4K), prévia do Conversor (3K linhas) e cards de campanha JAMAIS recebem blur individual.

## 4. Sistema de movimento

Mesmo pacote da Marpe: `--ease-glass: cubic-bezier(0.32, 0.72, 0, 1)`, durações 0.18–0.45s, keyframes `rise` (fade-up 8px + micro-scale), `scale-in`, `shimmer`, `slide-in-right`; classes `.anim` com stagger por `--i` (40–60ms/item), `.skeleton`; Astro `<ClientRouter />` para crossfade entre páginas (scripts do layout migram para `astro:page-load` de forma idempotente); modais com overlay-blur animado + scale spring; hover lift −2px com bloom; `prefers-reduced-motion` desliga tudo.

Sem dependência nova para o redesign (CSS puro + ClientRouter nativo). `dnd-kit` entra APENAS com o Módulo Leads (Fase 6 do checkpoint), não pelo visual.

## 5. Fases de execução

### AG0 — Fundação v2 + login (1 sessão)
`global.css` v2: evolui os tokens atuais para o sistema de 4 materiais + hairlines gradiente + escala de radius + motion system completo (mantém compat: `.glass`/`.glass-strong`/`.glass-soft` viram aliases dos novos). `AppLayout`: ClientRouter + refino das orbes (verde dominante, azul só de tempero). **Login redesenhado como piloto** — primeira impressão da Tati/Cláudio: card de vidro central, orbes, entrada animada.
Aceite: preview Vercel com login novo + todas as páginas funcionando.

### AG1 — Disparos, a tela principal (1–2 sessões)
2.472 linhas: tabs Dashboard/Campanhas + toolbar → `.glass-nav`; cards de campanha → `.card-surface` com hover lift + stagger + painel expandido glass; wizard 3 passos → painéis `.glass-panel`, chips/inputs/botões do design novo, prévia da lista com linhas soft; monitor → stats em card-surface, lista com entrada animada, FailureSummary re-estilizado; DashboardPanel (v1) → herda os componentes visuais da página Métricas; modais → `.glass-modal`.
Aceite: preview + disparo teste interno (tag u4digital) validando fluxo intacto.

### AG2 — Conversas (1 sessão)
Lista de chats → `.glass-panel` com stagger; header do chat → `.glass-nav`; bolhas → `.card-surface` (outbound verde profundo, inbound neutro); composer vira pílula flutuante de vidro; AudioPlayer/MessageContent com cantos e hairlines novos; filtros (Só da base / Com campanha) como pills.

### AG3 — Contatos + Templates + Processos (1 sessão)
Tabela de contatos: header sticky `.glass-nav`, linhas hover soft, filtros repaginados, badges (FIXO/status/tags) na nova métrica de cantos; Templates: editor + cards; Processos: idem. Toast global re-estilizado (glass).

### AG4 — Ferramentas + Config (1 sessão)
Conversor (mapper com badge IA, tabela de prévia 50/pg), Renomeador (upload/prévia/presets), Gerar Pedido → superfícies novas SEM blur nas linhas; Config: cards de instância → `.card-surface` (badge Restrita já existe, harmonizar), QR → `.glass-modal`, vínculo vendedor.

### AG5 — QA + produção (0,5–1 sessão)
Cross-browser (Safari `-webkit-backdrop-filter`), mobile ≤768px por tela, reduced-motion/transparency, contraste AA (verde sobre vidro), regressão dos fluxos críticos (login, criar+disparar campanha interna, conversas live, conversor com planilha real, QR), Lighthouse antes/depois, atualizar seção styling do projeto, deploy prod.

**Total: ~5–6 sessões** (Marpe levou 6–7; aqui a fundação parcial já existe e não há light mode).

## 6. Guardrails (herdados da Marpe, obrigatórios)

1. Blur só em contêineres; teto 6–8 camadas/viewport; blur reduzido no mobile.
2. `prefers-reduced-motion` / `prefers-reduced-transparency` / `:focus-visible` em tudo.
3. Zero mudança de props/estado/fetch/API — só `className` + estilo.
4. Sem emoji em UI; ícones SVG geométricos.
5. Cada fase → preview Vercel → aprovação do Moroni → próxima (regra permanente).
6. Telas densas (Contatos 2,4K linhas, prévia Conversor 3K) testadas com dado real a 60fps.

## 7. Interação com o Checkpoint 10/07 (funcional)

As Fases 2–7 do checkpoint mexem nas MESMAS telas deste redesign. Ordem recomendada (evita estilizar 2×):

1. **AG0** (fundação + login)
2. **Fase 2 multi-vendedor** já entregando Disparos em glass (**AG1 embutido**)
3. **Fase 6 Módulo Leads** — nasce 100% glass (novo módulo, zero retrofit)
4. **AG2–AG4** sweep nas telas restantes, intercalado com **Fases 3/4/5/7** conforme prioridade do cliente
5. **AG5** QA final + prod

## Changelog

- 14/07/2026 — Documento criado a partir do pedido do Moroni (visual Marpe com cores Azeredo + UI/UX soft), espelhando `marpe-crm-seguros/PLANO-UX-LIQUID-GLASS.md` e aproveitando a fundação glass de 10/07.
