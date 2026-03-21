# Direção Criativa — Briefs Visuais e de Interação

Última atualização: 2026-03-18

> **Owner**: creative-director
> **Status**: v1.0 — Documento completo com 4 briefs criativos
> **Consumido por**: designer-agent, dev-agent, orchestrator
> **Dependência upstream**: `tempo-e-rei-brand-philosophy.md`, `company-reis-ia-concept.md`, `movement-builder-concept.md`, `personal-moroni-reis-concept.md`, `product-concepts.md`, `reis-ia-design-system.md`, `ds-time-builders.md`, `ds-systems.md`, `ds-moroni-reis.md`, `master-techniques-catalog.md`
> **Contexto**: Este documento contém ideias criativas detalhadas para representação visual, motion design e interações em todas as camadas de marca do ecossistema Reis IA. Cada ideia inclui nome, descrição, comportamento, localização, referência, prioridade, complexidade técnica e nota de implementação.

---

## ÍNDICE

**Brief A: Systems — Representação Visual de Times de IA**
- [A1. Constelação Operacional](#a1-constelação-operacional)
- [A2. Organograma Vivo](#a2-organograma-vivo)
- [A3. Pulso de Atividade](#a3-pulso-de-atividade)
- [A4. Fluxo de Valor Cromático](#a4-fluxo-de-valor-cromático)
- [A5. Compressão Before/After](#a5-compressão-beforeafter)
- [A6. Identidade dos Quatro Agentes](#a6-identidade-dos-quatro-agentes)
- [A7. Hover Intelligence](#a7-hover-intelligence)
- [A8. Dashboard Conceitual C-Level](#a8-dashboard-conceitual-c-level)
- [A9. Eficiência Quente](#a9-eficiência-quente)
- [A10. Scroll de Resultados Progressivo](#a10-scroll-de-resultados-progressivo)

**Brief B: Time Builders — Z7 como Elemento Visual**
- [B1. Ícone Z7 Ampulheta](#b1-ícone-z7-ampulheta)
- [B2. Animação de Construção Z7](#b2-animação-de-construção-z7)
- [B3. Z7 Responsivo por Tamanho](#b3-z7-responsivo-por-tamanho)
- [B4. Z7 em Cards e Certificações](#b4-z7-em-cards-e-certificações)
- [B5. Z7 como Textura de Fundo](#b5-z7-como-textura-de-fundo)
- [B6. Variações Animadas por Produto](#b6-variações-animadas-por-produto)

**Brief C: Reis IA — Ampulheta H1-B Criativa**
- [C1. Hover Glow Pulsante](#c1-hover-glow-pulsante)
- [C2. Ampulheta Respirando](#c2-ampulheta-respirando)
- [C3. Hero: Formação por Partículas](#c3-hero-formação-por-partículas)
- [C4. Hero: Construção Linha por Linha](#c4-hero-construção-linha-por-linha)
- [C5. Loading: Areia Digital Caindo](#c5-loading-areia-digital-caindo)
- [C6. Loading: Inversão (Flip)](#c6-loading-inversão-flip)
- [C7. Scroll: Enchimento Progressivo](#c7-scroll-enchimento-progressivo)
- [C8. Easter Egg: Os 7 Cliques](#c8-easter-egg-os-7-cliques)
- [C9. Aurora Temporal](#c9-aurora-temporal)
- [C10. Scanner Line](#c10-scanner-line)

**Brief D: Elementos de Branding no Design System**
- [D1. "O Tempo é Rei" — Tipografia Cinética](#d1-o-tempo-é-rei--tipografia-cinética)
- [D2. FOMO Sutil: Barra de Oportunidade](#d2-fomo-sutil-barra-de-oportunidade)
- [D3. FOMO Sutil: Atividade Social em Tempo Real](#d3-fomo-sutil-atividade-social-em-tempo-real)
- [D4. Compressão 7:7 Visual](#d4-compressão-77-visual)
- [D5. Transição Temporal entre Seções](#d5-transição-temporal-entre-seções)
- [D6. Transição: Grãos de Areia](#d6-transição-grãos-de-areia)
- [D7. Contraste Vilão/Herói](#d7-contraste-vilãoherói)
- [D8. Micro-interações Tempo-Primeiro](#d8-micro-interações-tempo-primeiro)
- [D9. Cursor Consciente do Tempo](#d9-cursor-consciente-do-tempo)

---

# BRIEF A: SYSTEMS — REPRESENTAÇÃO VISUAL DE TIMES DE IA

---

## A1. Constelação Operacional

**Nome da ideia:** Constelação Operacional

**Descrição:** Representação do time de agentes IA como uma constelação de nós conectados por linhas finas e luminosas sobre fundo preto. Cada nó é um círculo geométrico minimalista — não um robô, não um avatar humano — com um ícone de função no centro (ícone de gráfico para vendas, ícone de headset para suporte, etc.). Os nós se dispõem em uma formação orgânica mas ordenada, como estrelas de uma constelação, com linhas de conexão que pulsam sutilmente a cada 3 segundos, simulando troca de dados entre os agentes.

A ausência de figuras humanas ou robóticas é intencional: agentes IA não são pessoas nem máquinas antropomorfizadas. São nós de inteligência numa rede. A constelação comunica: sistema integrado, coordenação silenciosa, eficiência que não precisa de supervisão.

No centro da constelação, um nó ligeiramente maior representa o "orquestrador" — o agente que coordena os demais. As linhas que partem dele são mais brilhantes que as demais.

**Comportamento:** Ao carregar a seção (IntersectionObserver, threshold 0.2), os nós aparecem com stagger de 120ms cada, surgindo com scale de 0.8 para 1.0 e fade-in de 400ms. As linhas de conexão se desenham após todos os nós aparecerem, usando stroke-dasharray + stroke-dashoffset para efeito de "desenho" em 800ms. Após a construção, as linhas pulsam com opacidade oscilando entre 8% e 20% do branco, em ciclos de 3s (ease-in-out).

**Localização:** Página Systems, seção hero ou seção "O Time". Viewport completo no hero ou meia-largura ao lado de texto descritivo.

**Referência:** Linear — o uso de nós conectados e linhas sutis em fundos escuros para representar sistemas. Stripe Enterprise Hub — a ideia de "rede integrada" sem figuras humanas.

**Prioridade:** Must-have

**Complexidade técnica:** Média (CSS + JS). SVG para a constelação, IntersectionObserver para trigger, CSS animations para o pulso contínuo.

**Nota de implementação:** Usar SVG inline com `<circle>` e `<line>`. O pulso das linhas pode ser CSS animation com `@keyframes line-pulse { 0%, 100% { opacity: 0.08 } 50% { opacity: 0.20 } }`. Cada nó é um grupo SVG com ícone interno. Mobile: reduzir o número de nós visíveis para 4 (em vez de 6-8 no desktop) e simplificar as conexões. Respeitar `prefers-reduced-motion`: sem pulso, apenas estado estático.

---

## A2. Organograma Vivo

**Nome da ideia:** Organograma Vivo

**Descrição:** Uma reinterpretação visual do organograma corporativo tradicional, mas onde as caixas são agentes de IA em vez de departamentos com pessoas. A estrutura é vertical, partindo de um nó "CEO / Estratégia" no topo (representando o empresário), descendo para agentes por área: Gestão, Marketing, Vendas, Suporte. Cada "caixa" do organograma é um card mínimo (Surface-2, borda sutil, ícone de função) conectado por linhas verticais e horizontais.

O diferencial: ao contrário de um organograma estático, este respira. As linhas de conexão pulsam com atividade — pequenos pontos de luz viajam ao longo das linhas, da posição "CEO" para os agentes, simulando delegação de tarefas. Os pontos de luz são brancos, com 1px de diâmetro, viajando a velocidade constante ao longo das linhas.

A mensagem visual: "Seu time de IA funciona como um organograma de funcionários humanos — mas opera 24/7, sem férias, sem atraso."

**Comportamento:** Construção ao scroll. O nó do CEO aparece primeiro (fade-up, 400ms). Após 200ms, as linhas se desenham para baixo (stroke-dashoffset animation, 600ms). Após as linhas, os cards de agente aparecem com stagger de 100ms. Os pontos de luz viajando começam após a construção completa, em loop contínuo. Ciclo: ponto nasce no topo, viaja por 2s até o agente, desaparece com fade-out de 200ms.

**Localização:** Página Systems, seção "Como Funciona" ou seção de apresentação do time IA.

**Referência:** Vercel — a forma como visualizam pipelines de deploy como fluxos verticais com nós. Apple — a ideia de construção progressiva no scroll.

**Prioridade:** Should-have

**Complexidade técnica:** Média (CSS + JS). SVG para linhas, CSS animation para os pontos viajantes, IntersectionObserver para trigger.

**Nota de implementação:** Os pontos viajantes podem ser `<circle>` SVG com `<animateMotion>` seguindo o `<path>` da linha, ou implementados com CSS offset-path. O delay entre pontos cria ritmo natural. Mobile: versão simplificada empilhada verticalmente, sem animação dos pontos — apenas a construção ao scroll. Respeitar `prefers-reduced-motion`: estado final estático.

---

## A3. Pulso de Atividade

**Nome da ideia:** Pulso de Atividade

**Descrição:** Representação em tempo real (simulado) da atividade do time de agentes IA. Uma barra horizontal minimalista para cada tipo de agente, com pulsos de atividade que se movem da esquerda para a direita, como um eletrocardiograma horizontal. Cada pulso é um spike fino e curto que aparece em intervalos variáveis — mais frequente para "Suporte" (muitas interações), menos frequente para "Gestão" (decisões mais espaçadas).

A barra é um retângulo de 2px de altura em cinza (`--gray-700`), sobre o qual os pulsos aparecem como spikes verticais de 8-16px em branco (opacidade 50-70%), sumindo com fade-out de 400ms. Ao lado esquerdo de cada barra: o nome da função (Gestão, Marketing, Vendas, Suporte) em label Systems (uppercase, 12px, `--text-quaternary`).

A mensagem: "Seu time está trabalhando agora. Sem pausas. Sem descanso."

**Comportamento:** Auto-play contínuo após a seção entrar no viewport. Os pulsos são gerados por JavaScript com `setInterval`, intervalos aleatórios entre 800ms e 2000ms por agente. Cada pulso é um `<div>` com CSS animation: scale(1, 0) para scale(1, 1) em 100ms, depois fade-out em 400ms. A variação de altura entre 8px e 16px dá textura orgânica.

**Localização:** Página Systems, seção "O Time" ou como elemento visual ao lado do hero.

**Referência:** Terminais financeiros Bloomberg — a ideia de atividade em tempo real visualizada como pulsos. Linear — o uso de indicadores de status sutis.

**Prioridade:** Nice-to-have

**Complexidade técnica:** Média (CSS + JS). React island recomendado para gerenciar o estado dos pulsos.

**Nota de implementação:** Implementar como React island (`ActivityPulse.tsx`). Usar `useEffect` com `setInterval` para gerar pulsos. Cada pulso cria um `<span>` absoluto posicionado na barra, com CSS animation de entrada + fade-out. Limpar pulsos antigos com `setTimeout`. Mobile: reduzir para 2 agentes visíveis ou substituir por versão simplificada. `prefers-reduced-motion`: exibir apenas as barras estáticas com labels.

---

## A4. Fluxo de Valor Cromático

**Nome da ideia:** Fluxo de Valor Cromático

**Descrição:** Visualização interativa de "antes vs. depois" que mostra a transformação financeira. Do lado esquerdo ("Antes"), uma coluna mostra barras de despesa em vermelho atenuado (`rgba(220, 50, 50, 0.30)` — um vermelho que não agride mas comunica perda). Do lado direito ("Depois"), as mesmas barras se comprimem e mudam para branco ou azul, com o espaço liberado preenchido por uma indicação sutil de "recuperado".

O ponto central: entre as duas colunas, uma ampulheta minimalista onde a areia (pontos de luz) flui do lado "Antes" para o lado "Depois", simbolizando tempo recuperado que se transforma em receita. A transição não é instantânea — acontece gradualmente conforme o usuário scrolla pela seção.

A paleta monocromática do Systems é preservada: o vermelho é extremamente sutil (quase cinza com leve tom rosado em baixa opacidade), e o estado "Depois" usa branco puro e o único toque de azul (#4A90FF) no número de receita gerada.

**Comportamento:** Scroll-linked. Quando a seção entra no viewport (sticky section, 200vh de altura), o progresso do scroll controla a transição: 0-30% scroll mostra o estado "Antes" completo. 30-70% a animação de transição acontece (barras comprimindo, cor mudando, pontos fluindo pela ampulheta). 70-100% mostra o estado "Depois" completo com números finais.

**Localização:** Página Systems, seção "Resultados" ou "Impacto".

**Referência:** Apple — sticky sections com conteúdo que muda conforme o scroll. Stripe — transições de dados visuais progressivos.

**Prioridade:** Should-have

**Complexidade técnica:** Alta (React island + canvas/WebGL). O fluxo de partículas pela ampulheta exige canvas ou SVG animado complexo.

**Nota de implementação:** Dividir em duas camadas: (1) as barras de antes/depois podem ser divs simples com CSS transition controladas por scroll progress via `requestAnimationFrame`; (2) a ampulheta central com partículas fluindo pode ser um `<canvas>` pequeno (200x300px) com partículas simples — pontos de 1-2px que caem com gravidade simulada. O scroll progress do sticky section alimenta o progresso da animação. Mobile: simplificar para versão antes/depois empilhada com transição simples, sem canvas. `prefers-reduced-motion`: transição instantânea, sem animação de partículas.

---

## A5. Compressão Before/After

**Nome da ideia:** Compressão Before/After

**Descrição:** Uma representação visual de compressão de tempo que usa duas timelines horizontais. A de cima, "Sem IA", mostra blocos de tarefa espaçados ao longo de 7 colunas representando dias da semana, com cada bloco em cinza médio e o espaço total ocupando a largura inteira da tela. A de baixo, "Com IA", mostra os mesmos blocos — mas comprimidos para ocupar apenas 1/7 do espaço, empilhados e alinhados à esquerda, em branco. O espaço liberado à direita é vazio (preto), com um label sutil: "Tempo recuperado."

A animação: ao scroll, a timeline de baixo se comprime progressivamente. Os blocos deslizam da posição "espaçada" para a posição "comprimida", com easing `cubic-bezier(0.25, 0.1, 0.25, 1)` ao longo de 1s. O número de horas recuperadas aparece no espaço vazio após a compressão, animando de 0 ao valor final (counter animation).

**Comportamento:** Scroll-triggered (IntersectionObserver, threshold 0.3). A timeline de cima aparece primeiro (fade-up, 400ms). Após 300ms, a timeline de baixo aparece em estado "expandido" e inicia a compressão (1000ms, ease-out). O counter de horas aparece após a compressão com fade-up (400ms).

**Localização:** Página Systems, seção de resultados ou hero alternativo.

**Referência:** Apple — a compressão visual de processos em demonstrações de chip. Porsche — animações de dados com timing preciso.

**Prioridade:** Must-have

**Complexidade técnica:** Média (CSS + JS). CSS transitions para os blocos, IntersectionObserver para trigger, JS counter para o número.

**Nota de implementação:** Os blocos são divs posicionados com CSS Grid. A compressão é feita mudando o `grid-template-columns` de `repeat(7, 1fr)` para `repeat(7, minmax(0, 1fr))` com a largura do container reduzida via `max-width`. Alternativa: usar `transform: scaleX()` nos blocos. O counter usa o componente CountUp existente no catálogo de técnicas. Mobile: versão vertical — os blocos empilham de 7 linhas para 1 linha comprimida. `prefers-reduced-motion`: estado final sem animação de compressão.

---

## A6. Identidade dos Quatro Agentes

**Nome da ideia:** Identidade dos Quatro Agentes

**Descrição:** Cada tipo de agente IA (Gestão, Marketing, Vendas, Suporte) recebe uma identidade visual própria mas coerente dentro do design system monocromático do Systems. A diferenciação não vem de cores diferentes — vem de ícones, comportamentos visuais e patterns sutis.

**Gestão:** Ícone de grade/organograma (4 quadrados conectados). Comportamento visual: linhas se reorganizam ao hover, simulando redistribuição de recursos. Ritmo visual: lento e deliberado.

**Marketing:** Ícone de megafone geométrico simplificado (triângulo + retângulo). Comportamento visual: ondas concêntricas emanam do ícone ao hover, simulando alcance e distribuição. Ritmo visual: médio, expansivo.

**Vendas:** Ícone de seta ascendente sobre gráfico minimalista (linha diagonal + base). Comportamento visual: a seta sobe sutilmente ao hover, o gráfico pulsa. Ritmo visual: dinâmico, ascendente.

**Suporte:** Ícone de headset minimalista (arco + dois pontos). Comportamento visual: pulso circular ao redor do ícone ao hover, simulando resposta ativa. Ritmo visual: rápido, responsivo.

Todos os ícones são stroke-only, 1.5px de espessura, brancos (opacidade 50% em repouso, 100% em hover). A coerência vem do estilo consistente: todos geométricos, todos minimalistas, todos com a mesma espessura de linha.

**Comportamento:** Hover-triggered. Ao passar o mouse sobre cada card de agente: (1) o ícone muda de 50% para 100% de opacidade em 200ms, (2) o comportamento visual específico do agente se ativa (ondas, pulsos, etc.) ao longo de 600ms, (3) o border do card muda de `--border-default` para `--border-visible` em 250ms. Ao sair: tudo retorna em 300ms com ease-out.

**Localização:** Página Systems, seção "O Time" ou "Nossos Agentes". Cada agente em um card separado.

**Referência:** Linear — ícones de produto com comportamentos de hover distintos. Vercel — cards com micro-interações sutis.

**Prioridade:** Must-have

**Complexidade técnica:** Média (CSS + JS). SVG para ícones, CSS animations para comportamentos de hover.

**Nota de implementação:** Os ícones devem ser SVG inline para controle total de cores e animações. As ondas de Marketing podem ser `<circle>` SVG com `scale` animation. O pulso de Suporte pode ser `box-shadow` animado. A seta de Vendas usa `transform: translateY(-4px)`. Mobile: os comportamentos de hover não se aplicam — usar a versão 100% opacidade como padrão. Touch: ativar o comportamento com `touchstart` e desativar com delay de 1s.

---

## A7. Hover Intelligence

**Nome da ideia:** Hover Intelligence

**Descrição:** Quando o empresário passa o mouse sobre um agente na Constelação Operacional (A1) ou nos cards de agente (A6), um painel de detalhes aparece com informações do agente. O painel é um tooltip expandido — Surface-3, borda `--border-visible`, border-radius 8px — que contém: nome da função, tipo de tarefas que executa (3 bullet points curtos), e uma métrica de tempo ("Recupera ~X horas/mês").

O painel aparece com uma microanimação elegante: não simplesmente fade-in, mas um reveal de 2px na borda superior (uma linha azul `#4A90FF` que se estende da esquerda para a direita em 200ms), seguido pelo fade-in do conteúdo (200ms, stagger de 60ms entre linhas).

A linha azul na borda superior é o único azul neste componente — e é proposital. É o Sistema dizendo: "Aqui está o dado que importa." A escassez de azul no Systems torna cada aparição significativa.

**Comportamento:** Hover-triggered com delay de 150ms (evitar tooltips acidentais). A linha azul se desenha (200ms, ease-out). O conteúdo faz fade-up com stagger (60ms por item, 200ms cada). Ao sair: fade-out unificado (150ms). Se o hover mudar para outro agente: transição cruzada — o painel antigo faz fade-out (100ms) e o novo faz fade-in (200ms).

**Localização:** Sobre qualquer representação de agente em Systems (constelação, cards, organograma).

**Referência:** Stripe — tooltips ricos com animações de entrada em múltiplas etapas. Linear — painéis de informação com reveal progressivo.

**Prioridade:** Should-have

**Complexidade técnica:** Média (CSS + JS). Posicionamento de tooltip com JS, CSS animations para as entradas.

**Nota de implementação:** Usar um componente React island (`AgentTooltip.tsx`) para gerenciar estado de hover e posicionamento. A linha azul é um `::before` do tooltip com `transform: scaleX(0)` para `scaleX(1)` com `transform-origin: left`. O stagger das linhas de conteúdo via `transition-delay` CSS. Mobile: não usar tooltip — ao tocar em um agente, expandir o card inline com as mesmas informações. `prefers-reduced-motion`: tooltip aparece instantaneamente.

---

## A8. Dashboard Conceitual C-Level

**Nome da ideia:** Dashboard Conceitual C-Level

**Descrição:** Uma seção que simula a interface de um dashboard executivo — não um dashboard real, mas uma representação visual estilizada que comunica "controle total" ao empresário. A composição mostra: (1) um gráfico de barras minimalista no canto esquerdo com barras crescentes em branco, (2) um número central grande ("47h/semana recuperadas"), (3) três mini-cards à direita com métricas secundárias.

O dashboard não precisa ser funcional — é cenográfico. O objetivo é que o C-Level veja e pense: "Quero um dashboard assim para o meu negócio." O estilo segue o design system Systems: fundo Surface-1, bordas em `--gray-900`, texto em branco e cinza, com o único toque de azul no número principal.

O gráfico de barras se constrói ao scroll (barras crescem de 0 para seu tamanho final com stagger de 80ms). O número central usa counter animation. As mini-cards fazem fade-up com stagger.

**Comportamento:** Scroll-triggered. As barras crescem (800ms, stagger 80ms, ease-out). O counter central conta até o valor (1500ms). As mini-cards aparecem com stagger de 100ms (400ms cada). Total da sequência: ~2.5s.

**Localização:** Página Systems, seção "Visibilidade e Controle" ou como feature visual do hero.

**Referência:** Vercel — dashboards conceituais estilizados em landing pages. Linear — representações visuais de interfaces de produto.

**Prioridade:** Should-have

**Complexidade técnica:** Média (CSS + JS). Barras com CSS height transition, counter com JS, stagger com CSS.

**Nota de implementação:** O gráfico de barras são divs com `height: 0` transitando para `height: var(--bar-height)` via CSS class toggle. Usar `transition-delay` incrementado para stagger. O counter central usa o componente CountUp. As mini-cards são componentes estáticos com animação de entrada. Tudo ativado por IntersectionObserver. Mobile: empilhar verticalmente. O gráfico de barras se torna horizontal. `prefers-reduced-motion`: estado final sem transição.

---

## A9. Eficiência Quente

**Nome da ideia:** Eficiência Quente

**Descrição:** O design system Systems (preto/branco/azul mínimo) corre o risco de parecer clínico demais. A solução não é adicionar cor — é adicionar textura e ritmo. "Eficiência Quente" é uma abordagem onde a frieza monocromática é balanceada por:

(1) **Grain texture deliberado** — o grain a 0.7% de opacidade (já especificado no DS Systems) adiciona uma dimensão tátil, como papel de alta gramatura. Isso diferencia a página de um template genérico.

(2) **Ritmo de espaçamento generoso** — espaço negativo extenso entre seções não é vazio: é respiração deliberada. Cada bloco de conteúdo é seguido por no mínimo 120px de espaço, comunicando: "Não temos pressa. Temos confiança."

(3) **Tipografia com peso humano** — os pesos 500-600 do Systems (mais leves que Time Builders) criam uma leitura que soa mais como "conversa com um parceiro estratégico" do que "manual técnico".

(4) **Ambient light pools** — as piscinas de luz do master design system (`radial-gradient` a 3-4% de opacidade) no canto inferior esquerdo de seções alternadas. A luz não chama atenção — mas a ausência dela faria a página parecer morta.

(5) **Movimento mínimo mas intencional** — as duas únicas animações ativas no Systems (counter animation nos números e o pulso lento da borda de garantia) criam os únicos pontos de "vida" na página. Sua escassez é o que as torna especiais.

**Comportamento:** Não é uma animação específica — é uma diretriz de atmosfera aplicada a toda a página Systems.

**Localização:** Todas as páginas Systems.

**Referência:** Porsche — a disciplina monocromática que não parece fria por causa da tipografia e do espaçamento. Apple — o uso de espaço negativo como declaração de confiança.

**Prioridade:** Must-have

**Complexidade técnica:** Baixa (CSS only). Grain, espaçamento e light pools já estão especificados no DS.

**Nota de implementação:** Implementar como CSS global da camada Systems. O grain é aplicado via `::after` no body. Os light pools são aplicados em seções alternadas via classe `.light-pool-left` e `.light-pool-right`. O espaçamento generoso é garantido pelo spacing system do master (usar `--space-4xl` ou `--space-5xl` entre seções). Nenhuma nova técnica necessária — apenas disciplina na aplicação do que já existe.

---

## A10. Scroll de Resultados Progressivo

**Nome da ideia:** Scroll de Resultados Progressivo

**Descrição:** Na seção de resultados, os números não aparecem todos de uma vez. Conforme o usuário scrolla, cada métrica aparece individualmente com espaço generoso entre elas — uma métrica por "tela" de scroll (sticky section). Cada métrica ocupa o centro da tela: número gigante (clamp 64-96px), unidade abaixo, label contextual abaixo da unidade.

A sequência: "47" (horas/semana recuperadas) -> scroll -> "R$ 2.4M" (receita gerada) -> scroll -> "89%" (redução em tarefas manuais) -> scroll -> "3 dias" (tempo de implementação). Cada transição é um fade-out do anterior e fade-in do próximo, controlado pelo progresso do scroll.

A seção inteira funciona como uma experiência de leitura cadenciada — o empresário absorve um dado de cada vez, com o peso visual total focado naquele número único. A monocromia do Systems torna cada número uma declaração absoluta.

**Comportamento:** Sticky section com altura de 400vh (4 "páginas"). O conteúdo visível fica fixo no centro. O scroll progress determina qual métrica é exibida (0-25% = primeira, 25-50% = segunda, etc.). A transição entre métricas: fade-out (200ms) + fade-in (300ms) com translateY de 20px para 0px.

**Localização:** Página Systems, seção de resultados/impacto. Pode ser a seção principal de prova social.

**Referência:** Apple — o estilo "uma informação de cada vez" nas páginas de produto. Stripe — sticky sections que controlam conteúdo pelo scroll.

**Prioridade:** Should-have

**Complexidade técnica:** Média (CSS + JS). Sticky positioning, scroll progress tracking via JS, CSS transitions para as transições de conteúdo.

**Nota de implementação:** Usar o pattern "Sticky Section with Progress-Linked Content" do catálogo de técnicas (1.5). O container externo tem `height: 400vh`, o conteúdo interno tem `position: sticky; top: 0; height: 100vh`. O scroll progress é calculado via `requestAnimationFrame` e `getBoundingClientRect`. Cada métrica é um elemento com `opacity` e `transform` controlados pelo progresso. O counter animation dispara na primeira vez que a métrica se torna visível. Mobile: manter a mesma experiência — funciona naturalmente com scroll vertical. `prefers-reduced-motion`: exibir todos os números empilhados sem sticky.

---

# BRIEF B: TIME BUILDERS — Z7 COMO ELEMENTO VISUAL

---

## B1. Ícone Z7 Ampulheta

**Nome da ideia:** Ícone Z7 Ampulheta

**Descrição:** A construção do ícone Z7 parte de uma premissa tipográfica: a letra Z e o numeral 7, em Inter peso 800, letter-spacing -0.04em, são posicionados lado a lado de modo que suas formas diagonais se sobreponham e revelem a silhueta de uma ampulheta no espaço negativo entre eles.

O traço diagonal do Z (que desce da esquerda para a direita) e o traço horizontal + diagonal do 7 (que desce da direita para a esquerda) formam, juntos, um "X" central. As barras horizontais do Z (topo e base) e a barra horizontal do 7 (topo) definem os limites superior e inferior. A ampulheta emerge da convergência dessas linhas: a cintura estreita no ponto onde os traços diagonais se cruzam.

**Tratamentos visuais propostos:**

1. **Stroke puro:** Z7 como outline tipográfico (stroke 1.5px, fill transparente). A ampulheta é apenas sugerida pelo contorno dos caracteres. Uso: favicon, inline, contextos pequenos. Cor: branco ou Azul Elétrico (#2D7AFF).

2. **Fill com sobreposição revelada:** Z em opacidade 60%, 7 em opacidade 60%. Onde se sobrepõem (a cintura da ampulheta), a opacidade composta cria uma área mais brilhante — a ampulheta "brilha" no ponto de intersecção. Uso: feature (64px+), hero. Cor: Azul Elétrico com a sobreposição em Azul Elétrico Bright (#5599FF).

3. **Gradient direcional:** O Z recebe um gradient de cima para baixo (Azul Elétrico para transparente), o 7 recebe um gradient de baixo para cima (Azul Elétrico para transparente). No ponto de cruzamento, ambos os gradients se encontram — a ampulheta é o ponto de maior intensidade de cor. Uso: hero, backgrounds grandes. Cor: variação do Azul Elétrico.

4. **Glow sutil:** Z7 em fill sólido (Azul Elétrico), com um `box-shadow` de `0 0 30px rgba(45, 122, 255, 0.30)` emanando do ponto de cruzamento — a ampulheta brilha. Uso: destaque em seções escuras, badges especiais. Cor: Azul Elétrico com glow.

**Comportamento:** Estático em contextos inline/pequenos. Para versões de 64px+ e hero, o glow pode pulsar sutilmente (opacidade de 20% a 30% em ciclos de 3s, ease-in-out).

**Localização:** Todas as páginas Time Builders. Favicon (16px), inline em texto (24px), feature sections (64px), hero (128px+).

**Referência:** Nenhuma referência direta — este é um elemento proprietário. A inspiração mais próxima é como a Nike usa o swoosh em diferentes tamanhos e tratamentos mantendo a reconhecibilidade.

**Prioridade:** Must-have

**Complexidade técnica:** Baixa (CSS only) para versões estáticas. Média (CSS + JS) para versões com glow pulsante.

**Nota de implementação:** Para favicon e tamanhos pequenos (16-24px), usar a versão stroke puro como SVG otimizado. Para tamanhos maiores, usar SVG com filtros para glow (`<feGaussianBlur>` + `<feComposite>`). A sobreposição revelada pode ser feita com `mix-blend-mode: screen` sobre dois elementos posicionados. Testar legibilidade em todos os tamanhos — abaixo de 16px, simplificar para uma versão onde Z e 7 são quase fundidos numa forma única.

---

## B2. Animação de Construção Z7

**Nome da ideia:** Animação de Construção Z7

**Descrição:** Uma animação de entrada que revela como Z e 7 formam a ampulheta. A sequência narrativa:

**Estágio 1 — O Z aparece** (0ms-400ms): A letra Z se desenha stroke-by-stroke. Primeiro o traço horizontal superior (0-120ms), depois o diagonal (120-280ms), depois o horizontal inferior (280-400ms). Easing: `cubic-bezier(0.25, 0.1, 0.25, 1)`.

**Estágio 2 — Pausa respiratória** (400ms-600ms): O Z fica estático por 200ms. Tensão antes da revelação.

**Estágio 3 — O 7 se materializa** (600ms-1000ms): O 7 aparece ao lado do Z, não desenhado stroke-by-stroke mas com um fade-in + translateX de 10px para 0px (400ms, ease-out). A entrada mais suave que a construção do Z cria contraste de personalidade.

**Estágio 4 — A revelação** (1000ms-1600ms): O Z e o 7 se aproximam ligeiramente (translateX de 2px cada, 300ms). No ponto de sobreposição, um glow sutil pulsa uma vez (0% -> 30% -> 0% opacidade, 300ms). A ampulheta é revelada no espaço negativo. O glow marca o momento de "clique" — onde os dois caracteres se tornam um símbolo.

**Estágio 5 — Estado final** (1600ms+): Z7 repousa no estado final com o glow residual a 15% de opacidade, que faz fade-out para 0% em 2s.

**Comportamento:** Trigger variável: page load (para hero), IntersectionObserver (para seções internas), hover (para versões interativas). A animação roda uma vez e não se repete.

**Localização:** Hero da página Time Builders (page load), seção de introdução ao Z7 em qualquer página (scroll-triggered).

**Referência:** Apple — animações de logo construídas em etapas nas keynotes. Nike — revelação de logotipos com timing preciso.

**Prioridade:** Must-have

**Complexidade técnica:** Média (CSS + JS). SVG com stroke-dasharray/dashoffset para o desenho do Z, CSS transitions para o 7, CSS animation para o glow.

**Nota de implementação:** O Z é um SVG `<path>` com `stroke-dasharray` igual ao comprimento total e `stroke-dashoffset` animado de 100% a 0%. Cada segmento do Z (topo, diagonal, base) pode ser um `<path>` separado com delays diferentes. O 7 é um elemento HTML ou SVG com CSS transition. O glow é um `<ellipse>` SVG com animation de opacidade. Orquestrar com CSS custom properties para timing ou com JS simples controlando classes. Mobile: mesma animação, sem modificação. `prefers-reduced-motion`: exibir Z7 completo instantaneamente, sem animação.

---

## B3. Z7 Responsivo por Tamanho

**Nome da ideia:** Z7 Responsivo por Tamanho

**Descrição:** Adaptação do Z7 para cada contexto de tamanho, com tratamento visual que se ajusta à escala:

**Favicon (16px):** Versão ultra-simplificada. Os caracteres Z e 7 se fundem numa forma quase abstrata — um glifo único que sugere a ampulheta sem ser legível como texto. Stroke puro, 1px, branco sobre fundo Azul Elétrico (#2D7AFF). O fundo colorido garante visibilidade na aba do navegador.

**Inline (24px):** Versão tipográfica limpa. Z7 em Inter 800, -0.04em, Azul Elétrico. Sem glow, sem efeitos. A legibilidade é prioridade absoluta neste tamanho. Usado dentro de parágrafos e labels.

**Feature (64px):** Versão com presença visual. Z7 em Inter 800 com o tratamento "fill com sobreposição revelada" (B1, opção 2). O ponto de intersecção é visível neste tamanho. Pode receber borda ou badge ao redor (badge circular de 80px com borda `--electric-06`).

**Hero (128px+):** Versão experiência. Z7 usa o tratamento "gradient direcional" (B1, opção 3) ou "glow sutil" (B1, opção 4). O glow pulsante está ativo. Em telas maiores que 1440px, pode escalar para 160-200px. Este é o Z7 que domina a tela e se torna o ponto focal do viewport.

**Watermark:** Z7 em opacidade 3-5%, escala 200-400px, rotacionado entre -5 e 15 graus. Posicionado como background decorativo. Sem interatividade.

**Comportamento:** Estático em favicon e inline. Glow pulsante em feature e hero (ciclos de 3s). Watermark é completamente estático.

**Localização:** Favicon: barra do navegador. Inline: qualquer texto que referencia Z7. Feature: cards de produto, seções de destaque. Hero: topo das páginas Time Builders. Watermark: fundos de seções temáticas.

**Referência:** Como o Google adapta seu logo de versão completa para "G" em diferentes contextos. Como a Apple simplifica o logotipo para diferentes escalas.

**Prioridade:** Must-have

**Complexidade técnica:** Baixa (CSS only). SVG em diferentes versões pré-definidas.

**Nota de implementação:** Criar 5 variantes SVG exportadas: `z7-favicon.svg`, `z7-inline.svg`, `z7-feature.svg`, `z7-hero.svg`, `z7-watermark.svg`. Cada uma otimizada para seu tamanho. O componente React pode usar um `<Z7Icon size="inline|feature|hero" />` que renderiza a variante correta. O glow pulsante é CSS animation aplicada condicionalmente nos tamanhos feature e hero. O favicon usa o formato .ico com fallback para SVG onde suportado.

---

## B4. Z7 em Cards e Certificações

**Nome da ideia:** Z7 em Cards e Certificações

**Descrição:** O símbolo Z7 como elemento visual em contextos de produto e reconhecimento:

**Cards de produto (Z7 Hours, Z7 Days, Z7 Months):** Cada card de produto tem o Z7 no canto superior direito (feature size, 48px). O Z7 é Azul Elétrico com opacidade 30% no estado de repouso, transitando para 100% ao hover do card. Abaixo do Z7, o nome do produto ("Hours", "Days", "Months") em uppercase, 11px, letter-spacing 0.06em, Azul Elétrico Text (#7AB0FF).

**Badge de certificação "Forjado":** Composição circular de 80px. Borda dupla: externa em Azul Elétrico (#2D7AFF) 1.5px, interna espaçada 3px em Azul Elétrico a 30% opacidade. Dentro: Z7 feature size centralizado. Abaixo do badge (fora do círculo): "FORJADO" em uppercase, Inter 700, 11px, letter-spacing 0.08em.

**Badge de programa (badge menor para uso em contextos inline):** 32px de diâmetro. Z7 inline simplificado dentro de um círculo com borda `--electric-06`. Usado ao lado de nomes de membros na comunidade, em profiles, em certificados.

**Selo de produto em propostas:** Z7 com tratamento formal — stroke puro, 1.5px, acompanhado do nome completo "Reis IA Builder Z7 Days" em uma linha, Inter 500, 14px. Usado em headers de documentos e PDFs.

**Comportamento:** Cards: transição de opacidade do Z7 ao hover do card pai (200ms, ease-out). Badges: estáticos. Selo de propostas: estático.

**Localização:** Cards de produto: página Time Builders, seção de produtos. Badge Forjado: certificados digitais, perfis de comunidade, LinkedIn. Badge inline: dentro de interfaces de comunidade. Selo: propostas e documentos formais.

**Referência:** Como marcas de luxo usam monogramas em contextos diferentes (Louis Vuitton, Hermès). A disciplina de manter o símbolo reconhecível em todas as escalas.

**Prioridade:** Must-have

**Complexidade técnica:** Baixa (CSS only).

**Nota de implementação:** Os badges devem ser componentes reutilizáveis: `<Z7Badge variant="certification|inline|seal" />`. O círculo do badge de certificação pode ser SVG com dois `<circle>` para a borda dupla. O fade de opacidade nos cards de produto é CSS `transition: opacity 0.2s ease-out` no Z7, ativado por `:hover` no card pai. Garantir que o badge funcione em fundos claros (variante de cor alternativa: Azul Elétrico Deep #1050BB sobre fundo claro).

---

## B5. Z7 como Textura de Fundo

**Nome da ideia:** Z7 como Pattern/Textura

**Descrição:** O símbolo Z7 repetido como textura de fundo em seções temáticas de Time Builders. O pattern usa Z7 em opacidade muito baixa (2-4%), rotacionado em ângulos variados (-15, 0, 15, 30 graus), distribuído em grid irregular (não perfeitamente alinhado — com leve offset alternado para quebrar a rigidez).

O efeito é subliminar: o visitante não percebe conscientemente os Z7 no fundo, mas o padrão cria uma textura que distingue visualmente as páginas Time Builders de qualquer outra camada de marca. É como marca d'água em papel-moeda — presente, identificável se procurado, invisível no uso normal.

**Variantes:**

1. **Grid regular:** Z7 repetido em grid de 120x120px, todos na mesma orientação (0 graus), opacidade 2%. Mais sutil, mais formal. Para seções de texto longo.

2. **Grid rotacionado:** Z7 em grid de 100x100px, cada instância rotacionada aleatoriamente entre -15 e +15 graus, opacidade 3%. Mais dinâmico, mais tribal. Para seções de comunidade e movimento.

3. **Cluster focal:** Em vez de grid uniforme, os Z7 se concentram mais densamente em um ponto da tela (canto inferior direito, por exemplo) e se espalham com densidade decrescente. Opacidade de 4% no centro para 1% nas bordas. Efeito de "constelação Z7".

**Comportamento:** Estático. Sem animação, sem interatividade. A textura é puramente decorativa.

**Localização:** Páginas Time Builders, como fundo de seções alternadas (especialmente seções de comunidade, movimento, e call-to-action).

**Referência:** Louis Vuitton — o monograma como textura de fundo que define identidade visual instantaneamente. A diferença: LV é denso e visível, Z7 é quase imperceptível.

**Prioridade:** Nice-to-have

**Complexidade técnica:** Baixa (CSS only). SVG pattern com `<pattern>` e `<use>` repetido.

**Nota de implementação:** Criar um SVG com `<pattern>` que contém o glifo Z7. Aplicar como `background-image` em seções via CSS. A rotação aleatória pode ser pré-definida no SVG (posições fixas, não geradas dinamicamente). Para o cluster focal, usar `radial-gradient` mascarando a opacidade do pattern (mais opaco no centro, mais transparente nas bordas). Mobile: manter a mesma textura — ela é leve o suficiente para não impactar performance.

---

## B6. Variações Animadas por Produto

**Nome da ideia:** Variações Animadas Z7 por Produto

**Descrição:** Cada produto Z7 recebe uma variação animada do símbolo que reflete sua personalidade temporal:

**Z7 Hours (rápido, pulso curto):** O Z7 pulsa com intensidade rápida. O glow aumenta e diminui a cada 1.2s (ciclo curto). A intensidade do glow é maior (de 10% a 40% de opacidade). A cor usa Azul Elétrico Bright (#5599FF) para comunicar faísca. É o Z7 que pisca como um alerta — chamando para ação imediata.

**Z7 Days (ritmo médio, calor):** O Z7 pulsa em ciclos de 2.5s. O glow tem intensidade moderada (de 10% a 25% de opacidade). A cor principal é o Azul Elétrico (#2D7AFF) padrão. Além do glow, uma leve rotação oscilante (de -1 a +1 grau, ao longo de 4s) dá a impressão de que o símbolo está sendo "forjado" — tremendo sob pressão.

**Z7 Months (lento, contínuo):** O Z7 respira lentamente. O glow oscila em ciclos de 5s. A intensidade é baixa (de 5% a 15%). A cor usa o Azul Elétrico, mas tendendo ao Azul Elétrico Deep (#1050BB) — mais profundo, mais maduro. Sem rotação. Sem rapidez. A evolução é contínua e segura.

**Comportamento:** Auto-play quando o card/seção do produto está visível. Cada variação é uma CSS animation com `@keyframes` específico.

**Localização:** Cards de produto na página Time Builders. Seções dedicadas a cada produto. Headers de páginas específicas de produto (se existirem).

**Referência:** Como o Material Design usa variantes de animação para comunicar diferentes estados e personalidades. A diferença: aqui, cada variante comunica uma relação diferente com o tempo.

**Prioridade:** Should-have

**Complexidade técnica:** Baixa (CSS only). Apenas CSS animations com durações e easings diferentes.

**Nota de implementação:** Três CSS animations distintas:
```
@keyframes z7-hours { 0%, 100% { filter: drop-shadow(0 0 15px rgba(85, 153, 255, 0.10)); } 50% { filter: drop-shadow(0 0 25px rgba(85, 153, 255, 0.40)); } }
@keyframes z7-days { 0%, 100% { filter: drop-shadow(0 0 20px rgba(45, 122, 255, 0.10)); transform: rotate(-1deg); } 50% { filter: drop-shadow(0 0 30px rgba(45, 122, 255, 0.25)); transform: rotate(1deg); } }
@keyframes z7-months { 0%, 100% { filter: drop-shadow(0 0 30px rgba(16, 80, 187, 0.05)); } 50% { filter: drop-shadow(0 0 40px rgba(16, 80, 187, 0.15)); } }
```
Aplicar via classe `.z7--hours`, `.z7--days`, `.z7--months`. `prefers-reduced-motion`: sem animação, apenas o estado base estático.

---

# BRIEF C: REIS IA — AMPULHETA H1-B CRIATIVA

---

## C1. Hover Glow Pulsante

**Nome da ideia:** Hover Glow Pulsante

**Descrição:** Quando o cursor passa sobre a ampulheta, ela não apenas muda de opacidade — ela ganha vida. Um glow azul pulsante se irradia da cintura da ampulheta (o ponto mais estreito), como se energia estivesse concentrada no ponto de compressão do tempo. O glow expande de 0px para 30px de blur em 400ms, depois se estabiliza pulsando entre 20px e 30px de blur a cada 2s enquanto o hover persistir.

Simultaneamente, as linhas do traço da ampulheta (se é SVG stroke) se iluminam — de opacidade 70% para 100%, com o stroke ganhando uma sombra de 2px em azul (#4A90FF). É como se a ampulheta "acordasse" — de estado passivo para estado ativo.

A mensagem: a ampulheta não é um ícone morto. É um instrumento vivo que responde à presença do observador.

**Comportamento:** Hover-triggered. Entrada: glow cresce de 0 a 30px blur em 400ms (ease-out). Stroke ilumina de 70% para 100% opacidade em 200ms. Pulso estabiliza: oscilação entre 20px e 30px blur, 2s ciclo, ease-in-out. Saída: fade-out total em 500ms (ease-in).

**Localização:** Qualquer instância da ampulheta H1-B que esteja em tamanho de 48px ou maior. Header, hero, seção "Sobre".

**Referência:** Morningside AI — o glow verde que pulsa nos elementos de destaque, adaptado para azul e com trigger de hover em vez de auto-play.

**Prioridade:** Must-have

**Complexidade técnica:** Baixa (CSS only). Filter drop-shadow com transition e animation.

**Nota de implementação:** Usar `filter: drop-shadow()` para o glow (funciona melhor com SVGs que `box-shadow`). O pulso é `@keyframes hover-pulse { 0%, 100% { filter: drop-shadow(0 0 20px rgba(74, 144, 255, 0.25)); } 50% { filter: drop-shadow(0 0 30px rgba(74, 144, 255, 0.35)); } }`. Ativar com `:hover` que aplica `animation: hover-pulse 2s ease-in-out infinite`. A transição de entrada usa `transition: filter 0.4s ease-out` para o glow crescer suavemente. Mobile: não aplicável (sem hover). Considerar `active` state para touch que dispara o glow uma vez.

---

## C2. Ampulheta Respirando

**Nome da ideia:** Ampulheta Respirando (Background Watermark)

**Descrição:** A ampulheta como watermark de fundo não é mais estática — ela respira. Um scale pulse muito sutil (de 1.0 para 1.015 e de volta, em ciclos de 4s) combinado com um glow que pulsa como heartbeat (intensidade do glow aumenta em 600ms e diminui em 1400ms, total 2s — o ritmo é assimétrico como uma batida cardíaca real: contração rápida, relaxamento lento).

A opacidade base do watermark permanece em 3-5% conforme o design system. O "respiro" é quase imperceptível — não é para chamar atenção, é para evitar que o fundo pareça morto. É a diferença entre uma foto e uma imagem ligeiramente animada: o olho humano detecta o movimento subconscientemente e interpreta como "presença".

O glow usa Azul (#4A90FF) a 4-6% de opacidade no pico. O radial-gradient do glow se expande e contrai junto com o scale, criando a impressão de que a ampulheta está emanando luz de forma orgânica.

**Comportamento:** Auto-play, loop infinito. Scale: de 1.0 a 1.015, 4s ciclo, ease-in-out. Glow heartbeat: de 3% para 6% de opacidade, 2s ciclo (600ms subida, 1400ms descida). Ambos independentes (não sincronizados) para evitar padrão mecânico.

**Localização:** Background de qualquer seção em qualquer página do ecossistema Reis IA. Uso principal: hero section da homepage, seção "Sobre" em páginas internas.

**Referência:** Agencia Lendaria — light pools que pulsam sutilmente. A diferença: aqui o pulso está na forma da ampulheta, não em uma luz genérica.

**Prioridade:** Should-have

**Complexidade técnica:** Baixa (CSS only). CSS animation em SVG de fundo.

**Nota de implementação:** A ampulheta watermark é um SVG absolutamente posicionado com `pointer-events: none`. O scale usa `animation: breathe 4s ease-in-out infinite`. O glow usa um `<radialGradient>` SVG interno com animation de opacidade separada. Duas `@keyframes` independentes para evitar sincronicidade mecânica. `prefers-reduced-motion`: ampulheta estática sem animação.

---

## C3. Hero: Formação por Partículas

**Nome da ideia:** Formação por Partículas

**Descrição:** A ampulheta no hero se forma a partir de partículas dispersas. Ao carregar a página, dezenas de pontos de luz (1-3px, brancos e azuis) estão espalhados aleatoriamente pelo viewport do hero. Ao longo de 2s, as partículas convergem suavemente para suas posições finais, formando o contorno da ampulheta. A convergência não é linear — as partículas desaceleram conforme se aproximam da forma final (`cubic-bezier(0.16, 1, 0.3, 1)` — spring easing).

Após a formação (2s), a ampulheta permanece composta pelas partículas por 1s. Então, em 800ms, as partículas se fundem nas linhas contínuas do stroke da ampulheta, passando de pontos individuais para traço sólido.

A narrativa visual: o tempo (representado pelas partículas dispersas) é caótico e fragmentado até ser dominado — organizado em algo coerente e funcional. É a filosofia "O Tempo é Rei" em movimento: do caos à ordem, da dispersão à compressão.

**Comportamento:** Page load trigger (hero only). Fase 1 — Dispersão inicial: partículas visíveis em posições aleatórias (0-200ms de delay). Fase 2 — Convergência: partículas viajam para posições da ampulheta (200ms-2200ms). Fase 3 — Repouso como partículas: 1s. Fase 4 — Fusão em stroke sólido: 800ms. Roda uma vez, não repete.

**Localização:** Hero principal da homepage Reis IA. Viewport completo.

**Referência:** Apple — animações de partículas que formam shapes nas keynotes. Stripe — pontos que convergem para formar padrões. A diferença: as partículas formam especificamente a ampulheta — não uma forma abstrata.

**Prioridade:** Nice-to-have

**Complexidade técnica:** Alta (React island + canvas/WebGL). O número de partículas e a convergência exigem canvas ou muitos elementos DOM.

**Nota de implementação:** Implementar como React island (`HourglassHero.tsx`) com `<canvas>`. Cada partícula tem posição inicial aleatória e posição final definida pelo contorno da ampulheta (extrair pontos do path SVG). A animação usa `requestAnimationFrame` com interpolação de posição e easing customizado. 40-60 partículas são suficientes para sugerir a forma sem sobrecarregar. Cores: 70% brancas, 30% azuis (#4A90FF). Após a fusão, o canvas pode ser substituído por um SVG estático para economizar recursos. Mobile: reduzir para 20-30 partículas. `prefers-reduced-motion`: exibir a ampulheta SVG estática imediatamente.

---

## C4. Hero: Construção Linha por Linha

**Nome da ideia:** Construção Linha por Linha

**Descrição:** A ampulheta se constrói progressivamente como se estivesse sendo desenhada por uma caneta invisível. Cada segmento do SVG se desenha usando a técnica stroke-dasharray/stroke-dashoffset, partindo do ponto superior esquerdo e percorrendo todo o contorno.

A sequência de construção segue a lógica de leitura: começa pelo traço superior (a barra de cima da ampulheta), desce pelo lado esquerdo, passa pela cintura estreita, desce até a base, percorre a barra inferior, sobe pelo lado direito, volta pela cintura e se conecta ao início. O traço é contínuo — uma única linha que percorre toda a forma em 2s.

Conforme o traço se desenha, uma "cauda" luminosa de 40px o segue — como uma caneta de luz deixando um rastro azul (#4A90FF a 50%) que se dissipa em 400ms para a cor final do stroke (branco ou azul dependendo do contexto).

**Comportamento:** Page load trigger. O stroke se desenha em 2000ms com easing `cubic-bezier(0.25, 0.1, 0.25, 1)`. A cauda luminosa acompanha o ponto de desenho como um glow localizado. Após a construção, a ampulheta faz um "settle" — um bounce sutil de scale (1.02 -> 1.0 em 300ms). Roda uma vez.

**Localização:** Hero principal alternativo (opção B ao C3), ou seção "O Tempo é Rei" em páginas internas.

**Referência:** AIOX — animações de draw-on em elementos SVG. Linear — linhas que se desenham para revelar interfaces.

**Prioridade:** Should-have

**Complexidade técnica:** Média (CSS + JS). SVG stroke-dasharray animation.

**Nota de implementação:** A ampulheta deve ser um único `<path>` SVG contínuo. Calcular `pathLength` e aplicar `stroke-dasharray: [pathLength]; stroke-dashoffset: [pathLength]` como estado inicial. Animar `stroke-dashoffset` para 0 em 2s. A cauda luminosa pode ser um segundo `<path>` idêntico com `stroke-dasharray: 40 [restante]` e `filter: blur(4px)` animando na mesma velocidade. O "settle" bounce é `@keyframes settle { 0% { transform: scale(1.02) } 100% { transform: scale(1) } }`. `prefers-reduced-motion`: ampulheta completa sem animação de desenho.

---

## C5. Loading: Areia Digital Caindo

**Nome da ideia:** Loading — Areia Digital Caindo

**Descrição:** Loading state onde a ampulheta está em posição normal e pequenos pontos (1px, brancos) caem da câmara superior para a câmara inferior, simulando areia digital. Os pontos nascem em posições aleatórias ao longo da largura da câmara superior, convergem na cintura estreita, e se depositam na câmara inferior.

O fluxo é contínuo enquanto o loading persiste. A velocidade de queda é calibrada para comunicar "processando" sem ansiedade — não é queda livre acelerada, é queda controlada como areia real (~2s por partícula da câmara superior à inferior).

A quantidade de partículas é baixa: 3-5 simultaneamente, com 1 nova partícula a cada 400ms. Isso evita sobrecarregar visualmente e mantém a limpeza do design system.

**Comportamento:** Auto-play em loop durante estado de loading. Partículas nascem no topo da câmara superior com posição X aleatória. Viajam para baixo com gravidade simulada (aceleração sutil — mais lentas no início, mais rápidas ao passar pela cintura). Param ao atingir a base da câmara inferior com bounce de 1px. Fade-out 200ms após o "pouso". 3-5 partículas simultâneas, 1 nova a cada 400ms.

**Localização:** Loading state global do site. Transições entre páginas. Qualquer momento de espera.

**Referência:** Concept único — a referência mais próxima são relógios de areia digitais em aplicações de wellness/timer, mas aqui adaptado ao estilo geométrico minimalista da Reis IA.

**Prioridade:** Should-have

**Complexidade técnica:** Média (CSS + JS). React island para gerenciar as partículas.

**Nota de implementação:** Implementar como React island (`HourglassLoader.tsx`). A ampulheta é SVG estática. As partículas são `<div>` absolutamente posicionados com CSS animation de `top` e `left`. A convergência na cintura pode ser simplificada: a partícula segue um path pré-definido (Bézier curve) que afunila na cintura. 5 paths pré-definidos variando a posição X de início para diversidade visual. `requestAnimationFrame` para suavidade. Tamanho total: 40-60px de largura. `prefers-reduced-motion`: ampulheta estática com indicador de loading convencional (spinner ou progress bar).

---

## C6. Loading: Inversão (Flip)

**Nome da ideia:** Loading — Inversão (Flip)

**Descrição:** Loading state onde a ampulheta se inverte (flip) a cada 2.5s. A inversão é uma rotação 3D de 180 graus ao redor do eixo horizontal central — a câmara de cima se torna a de baixo e vice-versa. A rotação acontece em 600ms com easing `cubic-bezier(0.68, -0.55, 0.27, 1.55)` (spring com overshoot — a ampulheta ultrapassa levemente os 180 graus e volta, como se fosse virada à mão).

A cada inversão, a "areia" (representada por um gradiente na câmara inferior que é mais opaco = mais cheia) reseta — a câmara de cima fica "cheia" (gradiente mais opaco) e a de baixo fica "vazia" (gradiente mais transparente).

Entre as inversões, a câmara superior gradualmente perde opacidade do gradiente (simulando areia saindo) e a inferior ganha (simulando areia chegando), ao longo de 2.5s.

**Comportamento:** Loop contínuo durante loading. Ciclo: enchimento progressivo (2.5s, linear) -> pausa (200ms) -> flip 3D (600ms, spring easing) -> reset dos gradientes -> repete. A perspectiva para o 3D é 800px.

**Localização:** Loading state alternativo ao C5. Pode ser usado em transições de página quando a areia digital (C5) não é adequada (contextos menores, mais rápidos).

**Referência:** Widgets clássicos de ampulheta (Windows, macOS) — mas com execução premium: spring easing, 3D perspective, e integração visual com o design system.

**Prioridade:** Nice-to-have

**Complexidade técnica:** Baixa (CSS only). CSS 3D transform com animation.

**Nota de implementação:** A ampulheta é um SVG com dois gradientes internos (câmara superior e inferior). A rotação usa `transform: rotateX(180deg)` com `perspective: 800px` no container. Os gradientes das câmaras usam CSS animation separada para o enchimento. O spring easing é o `cubic-bezier(0.68, -0.55, 0.27, 1.55)`. Sincronizar o flip com o reset dos gradientes via `animation-delay`. `prefers-reduced-motion`: versão simplificada com fade de opacidade (sem rotação 3D).

---

## C7. Scroll: Enchimento Progressivo

**Nome da ideia:** Scroll — Enchimento Progressivo

**Descrição:** Conforme o usuário desce pela página, a ampulheta (exibida como elemento lateral fixo ou watermark de seção) se enche progressivamente. No topo da página, a câmara superior está "cheia" (gradiente opaco) e a inferior "vazia". Conforme o scroll avança para o final da página, a areia "cai" — a câmara superior se esvazia e a inferior se enche.

A correlação é direta: scroll progress 0% = ampulheta cheia em cima. Scroll progress 100% = ampulheta cheia embaixo. O gradiente interno das câmaras é controlado pelo scroll progress, recalculado em cada `requestAnimationFrame`.

A metáfora: o tempo (representado pelo conteúdo da página) está sendo consumido — lido, absorvido. A ampulheta visualiza essa passagem. Ao chegar no final da página, toda a "areia" desceu — e o CTA final é o convite para "virar a ampulheta" (tomar a ação).

**Comportamento:** Scroll-linked, contínuo. O scroll progress (0-1) controla o clip-path ou gradiente de preenchimento das duas câmaras. Sem cliques discretos — transição suave e contínua. A ampulheta responde em tempo real ao scroll.

**Localização:** Elemento lateral fixo (lado direito, 40px de largura, posição fixa no viewport) em páginas longas. Alternativa: watermark central que muda de preenchimento.

**Referência:** Scroll progress bars (comuns em blogs e documentações) — mas em vez de uma barra linear, é a ampulheta que funciona como indicador de progresso.

**Prioridade:** Nice-to-have

**Complexidade técnica:** Média (CSS + JS). Scroll progress tracking + manipulação de SVG gradients ou clip-path.

**Nota de implementação:** A ampulheta tem dois `<rect>` internos (um em cada câmara) com `clip-path` que define a porção visível. O scroll progress (calculado via `window.scrollY / (document.body.scrollHeight - window.innerHeight)`) define a altura do clip-path: câmara superior diminui, câmara inferior aumenta. Usar `requestAnimationFrame` para suavidade. O elemento é `position: fixed; right: 24px; top: 50%; transform: translateY(-50%)`. Tamanho: 32x48px — pequeno o suficiente para não competir com o conteúdo. Mobile: ocultar (conflita com scroll natural em telas pequenas). `prefers-reduced-motion`: ocultar completamente.

---

## C8. Easter Egg: Os 7 Cliques

**Nome da ideia:** Easter Egg — Os 7 Cliques

**Descrição:** Um easter egg escondido na ampulheta da homepage. Se o visitante clicar 7 vezes na ampulheta (qualquer instância de tamanho feature ou maior), acontece uma sequência especial:

**Cliques 1-6:** A cada clique, a ampulheta pulsa com um glow breve (scale 1.05 -> 1.0 em 200ms + glow flash de 20% opacidade). Um counter discreto aparece ao lado da ampulheta — "1/7", "2/7", etc., em `--text-muted` (opacidade 20%), quase invisível. Cada clique incrementa o counter. Se o visitante parar de clicar por mais de 3s, o counter reseta silenciosamente.

**Clique 7:** A ampulheta dispara uma animação especial. O glow explode suavemente (de 30px para 80px de blur em 400ms), a ampulheta faz uma rotação completa (360 graus em 1s com spring easing), e ao final da rotação, a frase "O Tempo é Rei." aparece abaixo da ampulheta em tipografia Display (Inter 700, 32px), com fade-in de 600ms e letter-spacing que se comprime de 0.1em para -0.02em ao longo da animação — como se as letras estivessem sendo "comprimidas no tempo."

A frase permanece por 3s e depois faz fade-out. A ampulheta volta ao estado normal.

**Comportamento:** Click-triggered. 7 cliques consecutivos com no máximo 3s entre cada clique. Counter visual em opacidade 20% (quase invisível). Animação final: 400ms glow + 1s rotação + 600ms tipografia. Total: ~2s. Permanência da frase: 3s. Fade-out: 600ms.

**Localização:** Qualquer ampulheta feature (48px+) na homepage.

**Referência:** Google — os easter eggs escondidos em buscas específicas. Apple — os detalhes escondidos em páginas de produto que recompensam a curiosidade.

**Prioridade:** Nice-to-have

**Complexidade técnica:** Média (CSS + JS). JS para tracking de cliques e timing, CSS para animações.

**Nota de implementação:** Gerenciar com JS simples: `let clickCount = 0; let timeout;` no handler de click. Cada clique incrementa e reseta o timeout de 3s. Ao atingir 7, dispara a classe `.easter-egg-active` que ativa as animações CSS. A rotação usa `transform: rotate(360deg)` com `transition: transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)`. A tipografia é um `<span>` hidden que se torna visible com classe. Após 3s + 600ms, resetar tudo via `setTimeout`. Nenhum tracking ou analytics neste easter egg — é puramente para prazer.

---

## C9. Aurora Temporal

**Nome da ideia:** Aurora Temporal

**Descrição:** Um efeito de aurora sutil emanando de trás da ampulheta em contextos de hero ou destaque. A "aurora" são dois ou três gradientes radiais sobrepostos que se movem lentamente ao redor da ampulheta, como as luzes da aurora boreal — mas contidos, disciplinados, e em azul.

O gradiente principal é um `radial-gradient` elíptico posicionado atrás da ampulheta, com cor Azul (#4A90FF) a 6-8% de opacidade. Ele se move lentamente (shift de posição: de `40% 50%` para `60% 50%` ao longo de 8s, ida e volta). O segundo gradiente é menor e mais intenso (10% de opacidade), movendo-se em direção oposta (de `60% 50%` para `40% 50%`). O terceiro (opcional) é ainda menor e em Azul Bright (#8DC4FF) a 4% de opacidade, se movendo verticalmente.

O efeito conjunto é uma "respiração luminosa" ao redor da ampulheta — como se o tempo irradiasse energia. Diferente do glow estático, a aurora tem movimento: é orgânica, lenta, hipnótica na sutileza.

**Comportamento:** Auto-play, loop infinito. Gradiente 1: posição horizontal oscila em 8s, ease-in-out. Gradiente 2: posição horizontal oscila em 6s (dessincronizado), ease-in-out. Gradiente 3: posição vertical oscila em 10s. Todos independentes para evitar padrão repetitivo.

**Localização:** Hero da homepage, seção "O Tempo é Rei", qualquer seção onde a ampulheta é feature (128px+).

**Referência:** Apple — os halos de luz atrás de produtos nas keynotes. Agencia Lendaria — ambient light pools que se movem sutilmente.

**Prioridade:** Should-have

**Complexidade técnica:** Baixa (CSS only). Multiple backgrounds com CSS animation de `background-position`.

**Nota de implementação:** Container com `position: relative`. Pseudo-elemento `::before` com 3 radial-gradients empilhados via `background`:
```css
background:
  radial-gradient(ellipse 40% 50% at var(--aurora-x1) 50%, rgba(74, 144, 255, 0.08) 0%, transparent 100%),
  radial-gradient(ellipse 30% 40% at var(--aurora-x2) 50%, rgba(74, 144, 255, 0.10) 0%, transparent 100%),
  radial-gradient(ellipse 25% 35% at 50% var(--aurora-y3), rgba(141, 196, 255, 0.04) 0%, transparent 100%);
```
Animar as custom properties com `@keyframes` ou usar `background-position` animation diretamente. `pointer-events: none; z-index: 0`. `prefers-reduced-motion`: gradientes estáticos (sem movimento).

---

## C10. Scanner Line

**Nome da ideia:** Scanner Line

**Descrição:** Uma linha horizontal fina (1px, Azul #4A90FF a 50%) que percorre a ampulheta de cima para baixo, como um scanner analisando a forma. A linha leva 3s para percorrer toda a altura da ampulheta, movendo-se com velocidade constante. Conforme a linha passa, o segmento do stroke da ampulheta que está na mesma altura brilha momentaneamente (opacidade 100% + glow de 10px por 400ms, depois retorna ao normal).

O efeito cria a impressão de que a ampulheta está sendo "lida" ou "ativada" — como tecnologia escaneando o símbolo do tempo. É um casamento entre a frieza tecnológica (scanner) e o calor filosófico (ampulheta = tempo).

Após a linha chegar na base, ela desaparece com fade-out de 200ms. Reinicia após 4s de pausa.

**Comportamento:** Auto-play em loop. Ciclo: 3s de scan (topo para baixo, linear) + 200ms fade-out + 4s pausa + repeat. O glow no stroke é relativo à posição Y da linha — apenas os pontos do SVG na mesma altura da scanner line recebem o glow.

**Localização:** Hero alternativo ou como efeito ocasional na ampulheta de destaque. Não em todas as instâncias — apenas onde a narrativa é "tecnologia + tempo."

**Referência:** Filmes de ficção científica (scan lines em interfaces holográficas). Linear — a estética de "sistema inteligente operando."

**Prioridade:** Nice-to-have

**Complexidade técnica:** Média (CSS + JS). CSS animation para a linha, JS para o glow relativo à posição.

**Nota de implementação:** A scanner line é um `<rect>` SVG de 1px de altura com `y` animado via CSS animation de 0 ao height total em 3s linear. O glow no stroke pode ser simulado com um `clip-path` que se move junto com a scanner line, revelando uma versão "glowing" do path da ampulheta (mesmo path com `filter: blur(4px)` e opacidade maior). Alternativa mais simples: a scanner line tem seu próprio glow (blur vertical de 20px) que ilumina o stroke por proximidade via composição. `prefers-reduced-motion`: ampulheta estática, sem scanner.

---

# BRIEF D: ELEMENTOS DE BRANDING NO DESIGN SYSTEM

---

## D1. "O Tempo é Rei" — Tipografia Cinética

**Nome da ideia:** Tipografia Cinética de "O Tempo é Rei"

**Descrição:** A frase "O Tempo é Rei." recebe tratamento tipográfico especial em cada aparição principal. Não é texto normal — é um momento de marca que merece ser sentido.

**Tratamento 1 — Revelação por Palavra:** Cada palavra aparece sequencialmente com stagger de 300ms. "O" (fade-up) -> "Tempo" (fade-up, peso 800, scale 1.05 que settle para 1.0) -> "é" (fade-up, opacidade menor — 70%) -> "Rei." (fade-up, peso 800, cor Azul #4A90FF, com glow de 15px que pulsa uma vez e se dissipa).

A palavra "Rei" recebe o tratamento de destaque porque é a palavra onde o duplo significado mora. O azul nesta palavra é o momento de revelação — é onde o visitante pode perceber que "Rei" contém "Reis."

**Tratamento 2 — Compressão Tipográfica:** A frase começa com letter-spacing expandido (0.2em) e se comprime para o letter-spacing final (-0.02em) ao longo de 1.2s. A compressão visual é literal: as letras estão sendo "comprimidas no tempo." Este tratamento funciona especialmente bem em Display size (72px).

**Tratamento 3 — Typewriter com Ritmo:** As letras aparecem uma a uma, como digitadas, mas com ritmo irregular — "O T" rápido (50ms entre letras), "e" pausa (200ms), "m" rápido, "p" rápido, "o" pausa (150ms), " é " rápido, "R" pausa longa (400ms — o momento de tensão antes da revelação), "e-i-." rápido. O ritmo comunica a cadência de pensamento de alguém que está dizendo algo importante.

**Comportamento:** Tratamento 1: scroll-triggered (IntersectionObserver), roda uma vez. Tratamento 2: scroll-triggered ou page load (hero), roda uma vez. Tratamento 3: scroll-triggered, roda uma vez.

**Localização:** Tratamento 1: seção hero da homepage, ou seção "Filosofia" em páginas internas. Tratamento 2: hero alternativo ou abertura de página. Tratamento 3: seção de manifesto ou sobre.

**Referência:** Apple Keynotes — a forma como títulos aparecem com timing preciso. Nike — tipografia cinética em campanhas digitais.

**Prioridade:** Must-have (pelo menos um dos três tratamentos)

**Complexidade técnica:** Média (CSS + JS). Stagger via CSS transition-delay, compressão via CSS animation de letter-spacing, typewriter via JS setTimeout.

**Nota de implementação:** Tratamento 1: cada palavra é um `<span>` com `transition-delay` incrementado. A cor azul de "Rei" é `<span class="highlight-blue">`. Tratamento 2: CSS animation de `letter-spacing` de 0.2em para -0.02em. Tratamento 3: JS que adiciona letras a um container com `innerHTML += char` em `setTimeout` com delays variáveis definidos em array. Todos os tratamentos devem ter fallback de `prefers-reduced-motion`: texto estático completo.

---

## D2. FOMO Sutil: Barra de Oportunidade

**Nome da ideia:** Barra de Oportunidade

**Descrição:** Em vez de countdowns baratos ou banners agressivos, uma barra fina e discreta no topo de seções de conversão que comunica escassez de forma elegante. A barra tem 2px de altura, posicionada no topo da seção, com um gradiente de Azul (#4A90FF a 30%) que se move lentamente da esquerda para a direita ao longo de 20s.

Acima da barra (ou integrado no body text da seção), uma frase discreta em `--text-tertiary` (50% opacidade): "Vagas limitadas para implementação neste trimestre." Sem números específicos de vagas (que parecem fabricados). Sem countdown (que parece urgência barata). Apenas a declaração factual de que a capacidade é finita — porque é.

A barra de gradiente em movimento cria a impressão sutil de que algo está avançando — o tempo está passando, a janela está se movendo. Não grita. Sussurra.

**Comportamento:** O gradiente se move em loop contínuo (20s por ciclo, linear). A frase é estática. A barra é sutil o suficiente para não chamar atenção imediata — funciona no subconsciente.

**Localização:** Seções de conversão em todas as páginas (acima de CTAs de /agendar ou /aplicar).

**Referência:** Porsche — barras de progresso minimalistas nos configuradores de carro. A sutileza de comunicar "oportunidade finita" sem ser agressivo.

**Prioridade:** Should-have

**Complexidade técnica:** Baixa (CSS only). Gradiente animado com CSS.

**Nota de implementação:** A barra é um `<div>` de 2px de altura com `background: linear-gradient(90deg, transparent 0%, rgba(74, 144, 255, 0.30) 50%, transparent 100%); background-size: 200% 100%; animation: gradient-shift 20s linear infinite;` onde `@keyframes gradient-shift { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } }`. A frase é um `<p>` com classe de estilo `--text-tertiary`.

---

## D3. FOMO Sutil: Atividade Social em Tempo Real

**Nome da ideia:** Atividade Social Discreta

**Descrição:** Um indicador pequeno e discreto no canto inferior da página (ou integrado em seções de conversão) que mostra atividade recente de outros visitantes/clientes. Não é um popup agressivo — é uma linha de texto em opacidade 35% que muda silenciosamente a cada 8s.

Exemplos de mensagens: "Empresa de tecnologia agendou consultoria há 2 horas." "Agência digital aplicou para Z7 Days ontem." "Empresa de e-commerce implementou Revenue Engine esta semana."

As mensagens são discretas o suficiente para não interromper a leitura, mas presentes o suficiente para comunicar: "Outros empresários estão agindo. O relógio está correndo para todo mundo."

A transição entre mensagens é um fade-out/fade-in suave (400ms cada). As mensagens não têm nomes reais — apenas setores/tipos de empresa. Isso é importante: comunica atividade sem violar privacidade.

**Comportamento:** Auto-play. A mensagem atual faz fade-out (400ms) -> pausa (200ms) -> nova mensagem faz fade-in (400ms). Ciclo de 8s entre trocas. 5-8 mensagens em rotação.

**Localização:** Seções de conversão em páginas Systems. Canto inferior esquerdo ou integrado como nota de rodapé de seção.

**Referência:** Booking.com — "15 pessoas estão olhando esta propriedade agora" (mas sem a agressividade). A versão Reis IA é 10x mais discreta.

**Prioridade:** Nice-to-have

**Complexidade técnica:** Média (CSS + JS). React island para rotação de mensagens.

**Nota de implementação:** Implementar como React island (`SocialProof.tsx`). Array de mensagens pré-definidas. `useEffect` com `setInterval` de 8s para rotacionar. Cada mensagem tem `transition: opacity 0.4s ease`. Alternativa: as mensagens podem ser servidas por API para serem dinâmicas (fase futura). Na v1, mensagens estáticas no código. `prefers-reduced-motion`: exibir uma mensagem estática sem transição.

---

## D4. Compressão 7:7 Visual

**Nome da ideia:** Compressão 7:7 Visual

**Descrição:** Representação visual da promessa "7 horas = 7 anos" / "7 dias = 7 meses." Duas barras de timeline horizontais empilhadas:

**Barra superior ("Caminho convencional"):** 100% de largura, dividida em 7 segmentos iguais. Cada segmento é um bloco cinza (`--gray-700`) separado por gaps de 2px. Labels: "Ano 1", "Ano 2"... "Ano 7" em `--text-quaternary`.

**Barra inferior ("Caminho Z7"):** Começa com 100% de largura (idêntica à superior) e se comprime para ~14% (1/7) ao longo de 1.5s. Os 7 segmentos se comprimem juntos, com labels mudando de "Ano" para "Hora" ("Hora 1"... "Hora 7"). A cor dos segmentos muda de cinza para Azul Elétrico (#2D7AFF) durante a compressão. O espaço liberado à direita fica vazio (preto), com a frase "Tempo recuperado" em `--text-muted`.

A compressão é a experiência visual da filosofia Z7. O visitante vê, literalmente, 7 anos sendo esmagados em 7 horas. O espaço vazio que sobra é palpável — é ISSO que a Reis IA devolve.

**Variante Days/Months:** Idêntica mas com labels "Mês 1-7" comprimindo para "Dia 1-7". Usada nas páginas de Z7 Days.

**Comportamento:** Scroll-triggered. A barra superior aparece (fade-up, 400ms). Após 300ms, a barra inferior aparece em estado expandido (fade-up, 400ms). Após 500ms, a compressão acontece (1500ms, `cubic-bezier(0.25, 0.1, 0.25, 1)`). Labels mudam no ponto 50% da compressão (fade swap de 200ms). Roda uma vez.

**Localização:** Página Time Builders, seção de proposta de valor. Páginas de produtos Z7 individuais.

**Referência:** Apple — a forma como comprimem dados visuais de performance (gráficos de chip que comparam gerações).

**Prioridade:** Must-have

**Complexidade técnica:** Média (CSS + JS). CSS transitions para compressão, JS para trigger e troca de labels.

**Nota de implementação:** As barras são divs com `display: flex; gap: 2px`. A compressão da barra inferior é `transition: max-width 1.5s cubic-bezier(...)`. Os labels são dois sets de `<span>` sobrepostos — um "Anos" e um "Horas" — com troca de opacidade via classe. A mudança de cor dos segmentos é `transition: background-color 0.8s ease`. IntersectionObserver para trigger. Mobile: manter horizontal se o espaço permitir. Se não, versão vertical com blocos empilhados comprimindo de 7 linhas para 1. `prefers-reduced-motion`: estado final sem animação.

---

## D5. Transição Temporal entre Seções

**Nome da ideia:** Transição Temporal

**Descrição:** Em vez de fade-in genéricos entre seções, as transições reforçam a narrativa temporal. A proposta:

**Transição "Passagem de Tempo":** Entre seções, uma linha horizontal fina (1px, branca a 8% de opacidade) se expande do centro para as laterais em 600ms, como um horizonte se abrindo. Simultaneamente, a seção anterior recebe um leve "push" para cima (translateY -10px em 400ms) enquanto a nova seção entra por baixo (translateY 20px para 0 em 600ms). O efeito conjunto simula a passagem do tempo — o que veio antes se afasta, o que vem depois se aproxima.

A linha horizontal é a representação visual mínima de uma timeline — um eixo temporal entre dois momentos (seção anterior e próxima seção).

**Transição alternativa "Grão de Areia":** Um pequeno ponto (3px, branco) cai do final de uma seção para o início da próxima — como um único grão de areia passando pela cintura da ampulheta. O ponto cai em 400ms com aceleração natural (ease-in), faz um micro-bounce ao "pousar" (100ms), e se dissolve em um fade de 300ms. A nova seção começa a aparecer 200ms antes do pouso do grão.

**Comportamento:** Scroll-triggered. A transição se ativa quando a nova seção atinge threshold 0.05 do viewport (quase no topo da seção, quando o divisor está visível). Roda uma vez por seção.

**Localização:** Entre todas as seções principais de qualquer página.

**Referência:** Porsche — transições entre seções que mantêm a narrativa de produto. Apple — a forma como seções de páginas de produto fluem umas nas outras.

**Prioridade:** Should-have

**Complexidade técnica:** Baixa (CSS only). CSS animation de width, transform e opacity com IntersectionObserver trigger.

**Nota de implementação:** A "Passagem de Tempo" usa um `<div>` de separador de seção com `width: 0; transition: width 0.6s ease-out; margin: 0 auto` que transita para `width: 100%`. O push/enter das seções usa o reveal padrão do catálogo com `translateY` modificado. A "Grão de Areia" é um `<span>` absolutamente posicionado com CSS animation de `top` (queda) + `scale` (bounce) + `opacity` (dissolve). Implementar ambas e usar a mais adequada por contexto: "Passagem de Tempo" para seções informativas, "Grão de Areia" para seções de transição narrativa. `prefers-reduced-motion`: separador estático sem animação.

---

## D6. Transição: Grãos de Areia

**Nome da ideia:** Cortina de Areia

**Descrição:** Para transições entre seções de alto impacto narrativo (ex: de "O Problema" para "A Solução"), uma cortina de partículas minimalistas cai brevemente sobre o viewport. São 15-20 pontos de 1-2px, brancos, que caem do topo ao fundo do viewport em 1.2s com aceleração gravitacional. Os pontos desaparecem com fade-out ao chegar no terço inferior da tela.

Não é uma cortina densa — são poucos pontos espaçados, como os primeiros grãos de areia caindo numa ampulheta vazia. O efeito dura 1.2s e não bloqueia a visualização do conteúdo (os pontos são semi-transparentes, opacidade 40-60%).

A metáfora: cada transição entre seções é a ampulheta sendo virada. O tempo continua correndo. A areia continua caindo.

**Comportamento:** Scroll-triggered na transição entre seções de alto impacto. 15-20 pontos com posições X aleatórias e delays de início variados (0-400ms). Queda de 1.2s com `ease-in` (aceleração natural). Fade-out nos últimos 30% da queda. Roda uma vez por transição.

**Localização:** Transições selecionadas — não todas. Máximo 2-3 por página. Ex: entre "O Problema" e "A Solução", entre "Antes" e "Depois."

**Referência:** Concept original. A inspiração é a experiência física de virar uma ampulheta e ver os primeiros grãos caírem.

**Prioridade:** Nice-to-have

**Complexidade técnica:** Média (CSS + JS). CSS animations com posições geradas por JS.

**Nota de implementação:** Ao trigger, gerar 15-20 `<span>` absolutamente posicionados com `top: -5px`, `left` aleatório (10-90% do viewport), e CSS animation de queda. Cada span tem `animation-delay` aleatório de 0-400ms. O fade-out usa `opacity` transition nos últimos frames. Limpar os spans do DOM após a animação completar (`animationend` event). Mobile: reduzir para 8-10 pontos. `prefers-reduced-motion`: não renderizar.

---

## D7. Contraste Vilão/Herói

**Nome da ideia:** Contraste Vilão/Herói

**Descrição:** Nas seções que contrastam o "antes" (o mundo dos falsos profetas, hype vazio, desperdício de tempo) com o "depois" (o mundo da Reis IA, resultado, tempo recuperado), o design system cria uma diferenciação visual deliberada:

**Seção "Vilão" (Antes):** O fundo usa Surface-0 (#000000) com um overlay sutil de grain mais intenso (1.5% em vez do padrão 0.7-1%). A tipografia é ligeiramente menor e mais leve (weight 400 para headlines). As cores de texto usam `--text-secondary` (70%) como teto — nada é branco puro. A sensação é de "tela desfocada" — tudo está presente mas sem nitidez, sem clareza. Ícones (se houver) são stroke-only em opacidade 35%.

**Transição:** O divisor entre as seções é mais dramático — uma linha azul que se expande do centro (como D5, mas usando Azul #4A90FF a 20% de opacidade em vez de branco a 8%).

**Seção "Herói" (Depois):** O fundo muda para Surface-1 (#0A0A0A) — ligeiramente mais claro, comunicando "luz." A tipografia ganha peso (600-700 para headlines) e atinge `--text-primary` (100% branco). Um light pool azul sutil aparece no canto inferior esquerdo. Números de resultado aparecem em Azul (#4A90FF). A sensação é de "tela HD" — clareza, foco, definição. Ícones são fill em opacidade 70-100%.

A progressão de Vilão para Herói é a progressão de trevas para clareza — de tempo desperdiçado para tempo dominado. O visitante sente a diferença antes de processá-la intelectualmente.

**Comportamento:** Estático (as seções apenas existem com tratamentos visuais diferentes). A transição entre elas usa a linha azul expandindo (600ms ao scroll). O light pool na seção Herói pode respirar sutilmente (C2).

**Localização:** Qualquer página com narrativa de contraste: homepage (seção de problema vs. solução), página Time Builders (vilões vs. movimento), página Systems (antes IA vs. depois IA).

**Referência:** Apple — o contraste entre seções escuras e claras nas páginas de produto. A diferença: aqui o contraste é entre "escuro desorganizado" e "escuro com luz estratégica."

**Prioridade:** Must-have

**Complexidade técnica:** Baixa (CSS only). Diferentes classes CSS para seções "vilão" e "herói."

**Nota de implementação:** Duas classes utilitárias: `.section--villain` e `.section--hero`. A seção vilão aplica grain intenso, peso tipográfico reduzido e teto de opacidade. A seção herói aplica light pool, peso tipográfico padrão e permissão de cor azul. O divisor entre elas é o componente de transição D5 com variante azul. Documentar no design system como "Narrative Contrast Sections." `prefers-reduced-motion`: manter os tratamentos visuais estáticos (são CSS, não animação).

---

## D8. Micro-interações Tempo-Primeiro

**Nome da ideia:** Micro-interações Tempo-Primeiro

**Descrição:** Um sistema de micro-interações onde cada hover, click e transição reforça a filosofia "O Tempo é Rei" através da velocidade e eficiência da resposta. Princípios:

**1. Resposta instantânea:** Nenhum hover state leva mais de 200ms para se manifestar. O site demonstra respeito ao tempo do usuário em cada interação. CTAs respondem em 150ms. Menus em 100ms. Tooltips em 200ms. A rapidez não é técnica — é filosófica.

**2. Transições que demonstram eficiência:** Animações de entrada de seções usam `cubic-bezier(0.16, 1, 0.3, 1)` (spring) — o conteúdo chega rápido e se acomoda. Não desacelera no final (como ease-out convencional) — overshoota levemente e corrige, como alguém que se move com urgência controlada.

**3. Nada que faça esperar:** Se uma ação do usuário (click em CTA, envio de formulário) tem tempo de processamento, o feedback é imediato. O botão muda de estado instantaneamente (scale 0.97 + mudança de cor), mesmo que a operação leve mais tempo. O usuário nunca espera sem feedback.

**4. Hover que informa:** Todo hover state comunica algo além de "este elemento é clicável." Hover em CTA: mostra a consequência ("Agende sua consultoria"). Hover em card de serviço: revela a métrica de tempo ("~47h/mês recuperadas"). Hover em link: underline que se desenha (não aparece — se desenha da esquerda para a direita em 200ms).

**5. Scroll momentum preservado:** Nenhuma animação de entrada bloqueia o scroll ou cria jank visual. Todas as animações usam `will-change: transform, opacity` e rodam na compositing thread.

**Comportamento:** Padrões globais aplicados a todos os componentes interativos do site.

**Localização:** Todo o ecossistema — todas as páginas, todas as camadas de marca.

**Referência:** Linear — a aplicação inteira responde em menos de 100ms a qualquer interação. A sensação de "software que respeita seu tempo."

**Prioridade:** Must-have

**Complexidade técnica:** Baixa (CSS only). CSS transitions com valores otimizados.

**Nota de implementação:** Definir tokens globais de timing:
```css
:root {
  --timing-instant: 100ms;
  --timing-fast: 150ms;
  --timing-normal: 200ms;
  --timing-slow: 400ms;
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-precision: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```
Aplicar `will-change: transform, opacity` em todos os elementos que transitam. Links usam `background-image: linear-gradient(...)` com `background-size` animado para o underline que se desenha. Botões usam `transition: all var(--timing-fast) var(--ease-spring)`. Testar com DevTools Performance para garantir 60fps.

---

## D9. Cursor Consciente do Tempo

**Nome da ideia:** Cursor Consciente do Tempo

**Descrição:** Quando o cursor repousa sobre áreas clicáveis, um anel sutil (2px, branco a 20% de opacidade, 24px de diâmetro) aparece ao redor do cursor nativo. O anel se expande suavemente de 16px para 24px em 200ms ao entrar na área e se contrai ao sair.

Em áreas de CTA de conversão (/agendar, /aplicar), o anel ganha cor azul (#4A90FF a 30%) em vez de branco, sinalizando: "Este é o momento de agir." A transição de branco para azul acontece em 200ms.

O cursor nativo é preservado (nada de cursores customizados que atrapalham usabilidade). O anel é apenas um acompanhamento visual que reforça a interatividade e, nas áreas de conversão, reforça a importância da ação.

**Comportamento:** Mouse-follow com lag de 1 frame (suavidade sem latência perceptível). Anel aparece com scale de 0.7 para 1.0 + fade-in em 200ms ao entrar em área clicável. Muda de branco para azul ao entrar em área de CTA (200ms). Desaparece com fade-out (150ms) ao sair de áreas clicáveis.

**Localização:** Global — todas as páginas, em elementos clicáveis (links, botões, cards clicáveis).

**Referência:** Sites de portfólio de design e agências criativas frequentemente usam cursores customizados. A diferença: aqui o cursor nativo é preservado e o anel é sutil o suficiente para não distrair.

**Prioridade:** Nice-to-have

**Complexidade técnica:** Média (CSS + JS). JS para posicionamento do anel, CSS para transições.

**Nota de implementação:** Um `<div>` fixo com `pointer-events: none; position: fixed; border-radius: 50%; border: 2px solid rgba(255,255,255,0.20)`. Posição atualizada via `mousemove` com `requestAnimationFrame`. A detecção de áreas clicáveis usa event delegation no `document` com `matches('a, button, [role="button"], .clickable')`. A transição para azul é `transition: border-color 0.2s ease`. Esconder o anel em mobile (não há cursor). `prefers-reduced-motion`: não renderizar o anel.

---

## NOTAS GERAIS PARA DESIGNER AGENT E DEV AGENT

### Priorização Recomendada de Implementação

**Fase 1 — Fundamentais (implementar primeiro):**
- D8 (Micro-interações Tempo-Primeiro) — define o padrão de qualidade de toda interação
- D7 (Contraste Vilão/Herói) — diferenciação narrativa visual
- A6 (Identidade dos Quatro Agentes) — Systems precisa de representação visual dos agentes
- A1 (Constelação Operacional) — representação central do time IA
- B1 (Ícone Z7 Ampulheta) — o ícone precisa existir antes de qualquer uso
- B3 (Z7 Responsivo) — variantes de tamanho necessárias para toda a comunicação
- C1 (Hover Glow Pulsante) — a interação mais básica e essencial da ampulheta
- D1 (Tipografia Cinética) — pelo menos um dos tratamentos

**Fase 2 — Experiência Completa:**
- A5 (Compressão Before/After)
- A9 (Eficiência Quente)
- B2 (Animação de Construção Z7)
- B4 (Z7 em Cards)
- C4 (Construção Linha por Linha)
- C9 (Aurora Temporal)
- D4 (Compressão 7:7 Visual)
- D5 (Transição Temporal)
- D2 (Barra de Oportunidade)

**Fase 3 — Polish e Diferenciação:**
- A2, A3, A4, A7, A8, A10
- B5, B6
- C2, C3, C5, C6, C7, C10
- D3, D6, D9
- C8 (Easter Egg — implementar por último)

### Restrições Técnicas (Invioláveis)

1. **Sem Framer Motion, GSAP, ou qualquer biblioteca de animação.** Tudo é CSS vanilla + JS vanilla + React islands.
2. **`prefers-reduced-motion` respeitado em toda animação.** Fallback estático obrigatório.
3. **60fps garantido.** Usar `will-change`, rodar na compositing thread, evitar reflows.
4. **Mobile-first.** Toda ideia tem versão mobile. Se não pode ter versão mobile, não implementa.
5. **Máximo 2 elementos de acento azul por viewport** (regra do design system).
6. **Performance é filosofia.** Um site Reis IA lento é uma contradição filosófica. Core Web Vitals são inegociáveis.

### Acessibilidade

- Animações contínuas devem parar em `prefers-reduced-motion: reduce`.
- Contraste de texto respeita WCAG 2.1 AA (mínimo 4.5:1 para texto normal).
- Elementos interativos devem ter focus states visíveis.
- Easter eggs e interações criativas nunca devem ser a única forma de acessar informação.

---

## CHANGELOG

- **2026-03-18 — v1.0:** Documento criado com 4 briefs completos (A, B, C, D), 35 ideias criativas detalhadas, priorização de implementação e notas técnicas.
