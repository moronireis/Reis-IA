# Plano — Inversão do fluxo de disparo (Mensagem → Representada → Vendedores → Disparo)

> Data: 2026-07-15 · Solicitado por Tiago (Azeredo) via Moroni
> Status: EM PRODUÇÃO (15/07, deploy azeredo-6nmj3n7ns — azeredo-ia.vercel.app)
> Preview usado na aprovação: https://azeredo-cmgu4ediu-moronifreis-gmailcoms-projects.vercel.app

## O pedido

Inverter a ordem do wizard de Nova Campanha:

1. Seleciona-se a **Representada**
2. Os **clientes** vinculados a ela carregam automaticamente
3. Seleciona-se **1 ou mais números (vendedores)** para o disparo
4. No envio, **cada cliente recebe do número do vendedor responsável por ele**, respeitando o vínculo cliente↔vendedor já existente

Fluxo final: **Mensagem → Representada → 1+ vendedores → Disparo**

## O que já existia (F1 — checkpoint 10/07)

- `az_whatsapp_instances.vendedor_nome` — vínculo número↔vendedor (editável em Configurações, seed na migration v13)
- `segment_filter.split_por_vendedor` — `send.ts` particiona a audiência e cria campanhas-filhas por vendedor (agrupadas por `group_id`), cada uma disparando pela instância do próprio vendedor
- Preview com partição `por_vendedor` (mas o wizard não armazenava o campo — a lista de partição nunca renderizava)
- Worker processa cada filha pelo token da própria instância (canário/janela/cap por instância)

## Dados do banco (consulta 15/07)

- **25/25 representadas têm 2+ vendedores na carteira** — o cenário do pedido é a regra
- **183 de 1.328 clientes (~14%) têm vendedores diferentes conforme a representada** — por isso o roteamento passa a usar o vendedor da carteira (`az_contact_brands.vendedor`), não o global (`az_contacts.vendedor_principal`)
- Carteira: Daiane 935 · Luciano 446 · Rafael 357 · Gabriela 299 · Tiago 251 · Paulo 185 · Claudio 159 · Cláudia 89 · Bianca 1
- **Gabriela Valle de Moraes e Paulo Binda não têm número vinculado** — os clientes deles ficam de fora do disparo por vendedor (a UI mostra com destaque)

## Decisões

1. **Vendedor efetivo = vendedor da carteira da(s) representada(s) selecionada(s)**, com fallback para `vendedor_principal`. Empate entre 2+ representadas selecionadas → vence a compra mais recente.
2. **Clientes sem vendedor roteável ficam de fora** (com aviso visível na prévia e na confirmação). Em modo split, a contagem principal passa a refletir só quem realmente recebe.
3. **Padrão em campanha nova: modo "Pelo vendedor de cada cliente" ligado** (quando a base tem carteira), com todos os vendedores com número marcados. Modo "Número único" continua disponível (disparos institucionais pelas operadoras Tatiane/Letícia/Bianca).
4. Marcar/desmarcar vendedor = incluir/excluir os clientes dele no disparo (a seleção é filtro + roteamento ao mesmo tempo). Contatos adicionados manualmente ignoram o filtro, mas só entram se o vendedor deles for roteável.

## Mudanças técnicas

### Backend (sem migration — todas as colunas existem)

- `src/lib/campaign-audience.ts`
  - Query de marcas passa a trazer `vendedor, ultima_compra_at` e monta o mapa carteira
  - `AudienceContact.vendedor_efetivo` (carteira ?? principal)
  - Corte `vendedor_in` sai do SQL e passa a ser em memória sobre `vendedor_efetivo` (manuais continuam ignorando)
  - `Audience.porVendedor` — partição calculada ANTES do corte `vendedor_in` (alimenta os checkboxes sem as linhas sumirem)
- `src/pages/api/campaigns/[id]/preview.ts`
  - `por_vendedor` sempre presente (não só com split ativo), enriquecido com instância/status
  - Em modo split, contagem e lista cortam contatos não roteáveis (contagem vira verdade: o que a Tati vê = o que dispara)
- `src/pages/api/campaigns/[id]/send.ts`
  - Partição do split por `vendedor_efetivo`
  - Robustez: cria TODAS as filhas + filas primeiro, só depois inicia (falha no meio não perde partições)

### Frontend (`src/components/disparos/DisparosView.tsx`)

- **Passo 1 (Mensagem)**: sai o picker "Número de envio" (e a validação/auto-select)
- **Passo 2 (Lista)**, nova ordem:
  1. Representada (chips — mesmo componente, novo rótulo)
  2. **Números de envio** — toggle de modo:
     - "Pelo vendedor de cada cliente": checkboxes por vendedor (contagem, instância, conectado/desconectado/restrita; sem número = desabilitado "fica de fora")
     - "Número único": cards de instância atuais
  3. Refinar (cidade/estado/segmento/status + teste u4digital) — em modo único mantém também os chips de filtro por vendedor
  4. Adicionar manual + lista final (inalterados)
- **Passo 3 (Confirmar)**: resumo por número (vendedor → instância → qtde) no modo split + linha de excluídos; estimativa pelo maior lote (filhas rodam em paralelo)
- Rascunhos antigos: `instance_id` salvo → modo único; `split_por_vendedor` → modo vendedor (retrocompatível)
- Correção de bug: `setPreview` agora armazena `por_vendedor` (antes descartava — a partição F1 nunca aparecia)

### O que NÃO muda

Retomada, dedup por telefone, lista manual, tag de teste u4digital, monitor de disparo, worker, Configurações, campanhas antigas.

## Validação

1. `astro build` limpo
2. Script de sanidade contra o banco: partição por vendedor efetivo de 1 representada real
3. Preview Vercel → aprovação do Moroni/Tiago → `npm run deploy` (prod)

## Changelog

- 2026-07-15 — Plano criado e implementação iniciada
- 2026-07-15 — Implementação completa (4 arquivos: campaign-audience.ts, preview.ts, send.ts, DisparosView.tsx). Build + typecheck limpos (erros restantes do check são pré-existentes em arquivos fora do escopo). Sanidade validada contra o banco real: na BR Decor (492 clientes c/ fone), 23 clientes mudam de número com a correção da carteira (ex.: Tiago 25→31); partição mostra 290 recebem / 202 de fora (Gabriela 67 + Paulo 12 sem número + 123 sem vendedor). Deploy preview no Vercel. Bug pré-existente corrigido de brinde: `setPreview` descartava `por_vendedor` — a partição F1 nunca renderizava no wizard.
- 2026-07-15 — Proteção Vercel Authentication do projeto DESLIGADA via API (`ssoProtection: null`) a pedido do Moroni — previews agora abrem sem login da Vercel (o login do app continua obrigatório).
- 2026-07-15 — **EM PRODUÇÃO**: `npm run deploy` → azeredo-6nmj3n7ns (Ready). Smoke: /login 200 com página do app; /disparos e /api/campaigns sem sessão → 302 p/ login. Pendente: teste real com a Tati/Tiago (campanha pequena, tag u4digital, split com 2+ vendedores).
