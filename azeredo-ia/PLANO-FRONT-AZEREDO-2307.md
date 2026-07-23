# AZEREDO IA — Plano do Front: modelo Marpe + cores da marca

> Pedido (23/07): antes de promover o backlog 22/07 a produção, atualizar o front para o
> "mesmo modelo de atualização" — design estilo Marpe com as cores da Azeredo (issue #16).
> Última atualização: 23/07/2026.

---

## 1. Descoberta — a identidade real da Azeredo

O site oficial está fora do ar e o Instagram bloqueia scraping, mas as **fotos de perfil
corporativas do WhatsApp** (persistidas no banco em 22/07) carregam o logo oficial:

- **Monograma "AZ"** em LARANJA (gradiente quente) + badge "1989"
- **Wordmark "Azeredo"** em AZUL-MARINHO + "REPRESENTAÇÕES" navy
- Fundo branco / cards laranja

**A marca é LARANJA + NAVY** — o verde WhatsApp usado até aqui era um placeholder que
nunca foi da identidade. Referências salvas no scratchpad (`azeredo-logo-*.jpg`).

## 2. O que já temos vs o que falta do "modelo Marpe"

O AG0 (14/07) já portou a GRAMÁTICA do Marpe: 4 materiais glass, hairlines, radius scale,
motion system, ClientRouter — e ontem (22/07) entrou o tema claro/escuro tokenizado.
O que falta para ficar "igual Marpe, cores Azeredo":

| Dimensão | Marpe | Azeredo hoje | Ação |
|---|---|---|---|
| Acento | Azul #3B82F6 | Verde WhatsApp #25D366 | → **Laranja Azeredo** |
| Temperatura dark | Navy-preto (#06070c…) | Verde-preto (#080c09…) | → Navy-preto |
| Elevação | Escala rica xs→modal + card/lift | Só soft/deep | → Portar escala |
| Cards | Gradiente translúcido | Gradiente sólido | → Portar |
| Tokens de campo | field-bg, scrim dedicados | improvisados | → Portar |
| Toggle de tema | Pílula estilo Apple | Item de menu simples | → Pílula |
| Logo no shell | Monograma "M" | Ícone avião genérico | → Monograma "AZ" |
| Sidebar | Rail 74px só ícones | 220px com rótulos | **Manter rótulos** (Tati/uso denso; rail listado como variação futura) |

## 3. Paleta proposta (calibrada do logo)

### Marca
| Token | Dark | Light | Uso |
|---|---|---|---|
| `--accent` (laranja Azeredo) | `#E8802F` | `#D46F1E` (AA sobre claro) | CTAs, ativo, links de ação |
| `--accent-light` | `#F2934A` | `#B85E15` | hovers, destaques |
| `--accent-dim/glow` | rgba laranja .14/.30 | idem claro | pílulas, sombras de acento |
| `--navy` (novo) | `#3E68B0` (legível no escuro) | `#1E3A66` | 2ª voz: gráficos, msg-out, infos |

### Superfícies (temperatura Marpe, tinta navy)
- Dark: `#070b14` → `#0b101c` → `#121828`; hairlines frios rgba(255,255,255,.08)
- Light: off-white quente `#F7F5F1`, cards brancos, texto ink-navy `#16233E`
- Orbs de fundo: laranja dominante + navy + âmbar suave (nos dois temas)

### Semânticas (não mudam de papel)
- Verde SUCESSO `#22c55e` continua para conectado/entregue (não é mais acento)
- Âmbar → amarelo `#EAB308` (para não colidir com o laranja da marca)
- Vermelho mantém

## 4. Fases

### F1 — Tokens & materiais (`global.css`) — ~1h
Retokenizar os DOIS temas para laranja/navy; portar do Marpe: escala de elevação
(`--shadow-xs/sm/md/lg/card/lift/modal`), card-grad translúcido, `--field-bg`, `--scrim`,
orbs novos; btn-primary gradiente laranja; focus/selection/scrollbar/skeleton.

### F2 — Varredura de acentos residuais — ~1h
- `rgba(37,211,102,*)` inline (dezenas de usos: pílulas, bordas, sombras) → tokens
- MetricsView: gráfico Envios×Respostas e KPIs → laranja × navy (revalidar contraste)
- STATUS_COLOR: conectado permanece verde (semântico)
- Login.astro: vitrine recolorida

### F3 — Shell modelo Marpe — ~1-1,5h
- **Monograma "AZ"** em SVG geométrico fiel (N laranja + Z com corte; fallback: wordmark
  tipográfico "Azeredo" navy + "IA" laranja se o desenho não ficar digno) — logo vetorial
  oficial segue como pendência com o Tiago na #16
- Sidebar: pílula ativa laranja, brand block com monograma + "AZEREDO IA"
- **Toggle de tema em pílula** estilo Apple (igual Marpe), no rodapé da sidebar
- Login: split com faixa da marca (laranja/navy), form glass

### F4 — QA visual dois temas — ~30min
9 páginas × claro/escuro, pares de contraste críticos (AA), mobile 375px, reduced-motion.

### F5 — Preview → validação do Moroni → produção
1. `vercel` (preview novo) + smoke E2E
2. **Moroni valida VENDO o preview** (regra: decisão visual nunca às cegas)
3. Aprovado → `npm run deploy` (produção: backlog 22/07 + front novo juntos)
4. Pós-prod: comentário na #16, entrega no u4-status, commit + snapshot handoff, memória

**Total estimado: ~4-5h de execução, 1 sessão.**

## 5. Decisões tomadas (para não travar) e riscos

1. **Sidebar mantém rótulos** (não vira rail 74px) — zero risco de regressão de uso antes
   do teste conjunto; rail fica como variação futura se o Tiago pedir.
2. **Layout não muda** — só a pele (tokens/cores/elevação/logo). Nenhuma rota ou fluxo tocado.
3. Colisão âmbar×laranja resolvida com âmbar→amarelo.
4. Monograma AZ: melhor esforço em SVG; o vetor oficial é pendência externa (#16).
5. O deploy de produção levará junto todo o backlog 22/07 já validado em preview.

## Changelog
- 2026-07-23 — Plano criado. Identidade laranja+navy descoberta via fotos corporativas do
  WhatsApp (logo oficial). Aguardando OK do Moroni para executar F1→F5.
