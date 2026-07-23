# AZEREDO IA — Plano do Checkpoint 10/07 (Novos Ajustes)

**Fonte**: `Checkpoint (Azeredo) - 1007 - Novos Ajustes.pdf` (recebido 13/07) + versão **atualizada 14/07** (`Checkpoint_Azeredo_1007_Novos_Ajustes_Atualizado.pdf`, itens Leads e Importação Mercos incluídos a pedido de Tiago Donicht) + investigação do código e do banco de produção em 13/07/2026
**Última atualização**: 14/07/2026
**Plano anterior**: `PLANO-ATUALIZACAO-JUL2026.md` (Checkpoint 04/07 — 100% entregue no que não depende de terceiros)
**Plano irmão**: `PLANO-UX-LIQUID-GLASS.md` (redesign visual — intercala com as fases funcionais deste doc)

---

## 1. Diagnóstico — o que o checkpoint pede × o que a investigação encontrou

| # | Item do checkpoint | Tipo | Achado técnico |
|---|--------------------|------|----------------|
| B1 | Falhas no envio sem detalhamento | BUG/UX | **O motivo JÁ é gravado** (`az_campaign_recipients.error_message`) — a UI é que o esconde (só um "!" com tooltip). Investigação em produção resolveu os 2 casos da Tati (ver §2). |
| F1 | Multi-vendedor por carteira | FEATURE | `vendedor_principal` existe (migração v10) e o wizard já filtra por vendedor — mas **single-select** (`segment_filter.vendedor` string) e a campanha tem **uma** instância. Falta: multi-select + roteamento do envio pela instância do vendedor do último pedido. É o "passo 2 do M3" que estava aguardando critério — o checkpoint acabou de definir o critério. |
| F2 | Carrossel de imagens | FEATURE | Campanha hoje aceita 1 mídia (`custom_media_url`). WhatsApp não tem "carrossel" real fora de template oficial; o equivalente é **álbum**: N imagens enviadas em sequência agrupam no aparelho. Fundação de mídia (bucket, /send/media, worker) pronta. |
| F3 | Conversor: mapear mais colunas | FEATURE | Dos pedidos, **já existem como alvo**: IPI (idx 4), Múltiplo (10), Preço de Tabela (2), Quantidade (= "Estoque", idx 9 — rótulo confunde). **Faltam**: Preço de Tabela #1–#4 (idx 23–26) e tornar Ativo/Inativo (19) + Exibição e-commerce (20) **mapeáveis da planilha de origem** (hoje são só default global + override manual). A IA também não prioriza esses campos no auto-map. Regra nova: **só importar linha com código preenchido** (hoje código nem é obrigatório). |
| F4 | Renomeador: fábrica SICAD | FEATURE | O padrão SICAD é **semântico** (nome do produto → código Mercos: "Conjunto MSK6142 50x50" → "61425050"), não extração por segmento — o motor atual (separador/índice) não resolve. 6 exemplos De→Para fornecidos no PDF. |
| F5 | Conversas só de campanha | FEATURE | Filtro "Com campanha" já existe (checkbox genérico). Falta **amarrar a conversa ao disparo que a originou**: badge com o nome da campanha + filtro por campanha específica. Dado já existe (`az_campaign_recipients.replied_at` + `az_messages.campaign_id` via reply-scan). |
| F6 | Contatos: coluna Vendedor | FEATURE | `vendedor_principal` no banco desde a v10; a listagem não exibe. Trivial. |
| F7 | **Módulo Leads** (NOVO 14/07) | FEATURE | Não existe nada de leads no schema. O Marpe já tem o padrão exato deste pedido (`marpe_funnels` + `marpe_funnel_stages` customizáveis + kanban dnd-kit no `CrmBoard`) — **adaptar, não inventar**. Atenção: lead pede multi-segmento (`segmentos text[]`), enquanto contato usa `segmento` single. |
| F8 | **Importação Mercos via UI** (NOVO 14/07) | FEATURE | O parser da carteira JÁ existe e foi validado em produção (`scripts/import-relacao-clientes.mjs`, 2.731 linhas reais em 09/07, 99,7% de match) — falta virar feature self-service com prévia. O PDF confirma que a API Mercos (F1 do checkpoint 04/07) está descartada por ora. |

## 2. Investigação do bug B1 — casos da Tati RESOLVIDOS (produção, 13/07)

**Caso 1 — "Oportunidades Ingá" (Letícia): 19 contatos, 12 enviados, 3 entregues, 7 falhos**
- Os 7 falhos têm motivo gravado: `"Número não está no WhatsApp"` (pré-check `/chat/check` antes do envio — evita queimar a reputação do número com envio inválido).
- Testei os 7 números em produção nas **duas variantes** (com e sem o 9º dígito): todas as 14 consultas confirmam — **nenhum tem WhatsApp**. Hipótese do dígito 9 descartada.
- Causa raiz: **5 dos 7 são telefones FIXOS** cadastrados como principal (prefixos 3710, 3718, 3512, 2102, 3315). O cliente "recebe mensagem por fora" porque a Tati fala com ele por **outro** número, que não é o principal do cadastro.
- **4 dos 7 têm telefone alternativo no array `phones` do cadastro** → um fallback automático de pré-check resgataria a maioria. Os 3 restantes (VLT Bazar, Brincasa, Supermercado Baklizi) precisam de correção de cadastro pela Tati.

**Caso 2 — "Promoção Polibras" (Bianca): 22 contatos, 3 enviados, resto pendente**
- **Não é bug — é o canário anti-ban funcionando**: 3 envios aceitos pelo WhatsApp, NENHUM entregue → o worker parou a campanha com erro explicativo ("o número de envio pode estar restrito"). 19 ficaram `pending` de propósito.
- O número da Bianca (azeredo-9) está **restrito** — mesmo estado da azeredo-2 (Tatiane): aceita envio, não entrega. Decisão externa: reconectar/reaquecer/trocar o chip (Tiago).
- O que falta na plataforma: deixar esse estado **óbvio** (badge "Restrita" na instância em Config e no wizard) para a Tati não escolher esses números.

## 3. Fases de entrega

### Fase 1 — Confiança no disparo (B1) + coluna Vendedor (F6) · ~1,5 dia
- **Motivo de falha visível**: coluna "Motivo" na lista de destinatários (monitor + detalhes), resumo por motivo no card da campanha ("7 falhas — 7× número sem WhatsApp"), texto claro no lugar do "!".
- **Pré-check com fallback**: se `phone_primary` reprovar no `/chat/check`, testar os demais fones do contato e enviar para o que tiver WhatsApp (gravar qual fone foi usado no recipient). Resgata ~4/7 do caso Ingá.
- **Heurística de fixo**: marcar visualmente números com cara de fixo (2º dígito 2–5) no wizard/contatos — aviso antes do disparo, não depois.
- **Badge "Restrita"** na instância (Config + wizard): estado derivado do canário reprovado (azeredo-2, azeredo-9). Bloqueio soft: aviso, não impedimento.
- **Coluna Vendedor em Contatos** (+ filtro por vendedor na tela, aproveitando contagens já existentes em `/api/contacts/segmentos`).
- Relatório dos 3 contatos sem alternativa → Tati corrige cadastro.

### Fase 2 — Multi-vendedor por carteira (F1) · ~2 dias
- **Migração v13**: vínculo vendedor↔instância (`az_whatsapp_instances.vendedor_nome`, casando com os valores de `vendedor_principal` da carteira Mercos) + `az_campaigns.group_id` (agrupamento de campanhas-filhas).
- **Wizard**: modo "Disparar pelo vendedor da carteira" — multi-select de vendedores (migra `vendedor` string → `vendedor_in[]`, mesmo padrão do `status_in`); preview particionado por vendedor com contagens; aviso para vendedor sem instância vinculada ou com instância restrita.
- **Envio**: split em N campanhas-filhas (1 por vendedor/instância), mesma mensagem/mídia, agrupadas na UI pelo `group_id`. **Reusa o worker inteiro sem mudança** — canário, janela, cap diário e reconciliação continuam por instância, como hoje.
- Contatos do filtro cujo vendedor não está selecionado/sem instância: excluídos com aviso (default) ou roteados para uma instância padrão — decidir com a Tati.

### Fase 3 — Carrossel/álbum de imagens (F2) · ~1,5 dia
- **Migração v14**: `az_campaigns.custom_media` (jsonb array), mantendo compat com `custom_media_url` (1 mídia = caso atual).
- **Wizard**: upload de até 5 imagens (reusa `/api/media/upload`), prévia em grade, arrastar para ordenar.
- **Worker**: envio sequencial por destinatário — 1ª imagem com a legenda (mensagem), demais sem; intervalo curto entre imagens (agrupa como álbum no aparelho) + delay anti-ban maior entre contatos; cada imagem conta no cap diário (N imagens = N mensagens de reputação).
- Verificar na implementação se o UazapiGO expõe endpoint de álbum nativo (se sim, usar; senão, sequencial resolve).

### Fase 4 — Ferramentas Mercos (F3 + F4) · ~2 dias
**F3 Conversor:**
- Novos alvos no mapper: Preço de Tabela #1–#4 (idx 23–26); Ativo/Inativo e Exibição e-commerce mapeáveis da origem (célula vazia → cai no default global atual; "só importar se preenchida").
- Renomear "Estoque" → "Quantidade em estoque" (é a "Quantidade" do pedido — confirmar com a Tati).
- Prompt da IA atualizado para auto-mapear os novos alvos + Quantidade/Múltiplo (hoje só prioriza código/nome/preços/IPI).
- **Regra do código**: linhas sem código são ignoradas na geração (padrão para todas as fábricas), com contador "X linhas ignoradas sem código" na prévia.

**F4 Renomeador SICAD:**
- **Modo "De→Para"**: upload de tabela 2 colunas (nome → código); match por nome normalizado; status por foto na prévia (OK / sem correspondência).
- **Preset SICAD por IA**: few-shot com os 6 exemplos do PDF para *sugerir* códigos quando não houver tabela — sempre com prévia e edição manual antes do zip (padrão é semântico, IA pode errar).
- Validar com fotos reais da pasta SICAD do Drive.

### Fase 5 — Conversas de campanha (F5) · ~1 dia
- Badge da campanha de origem no chat live (cruza fone × `az_campaign_recipients`/`az_messages.campaign_id`; usa a campanha mais recente que atingiu o fone).
- Filtro "Origem: disparo" (só conversas que nasceram de campanha) + dropdown por campanha específica.
- Mantém "Só da base" e "Com campanha" atuais como estão.

### Fase 6 — Módulo Leads (F7, NOVO) · ~2,5–3 dias
- **Migração v15**: `az_lead_stages` (name, color, position, is_terminal, won/lost) com seed de estágios padrão (validar nomes com a Tati) + `az_leads` (nome, contato, telefone, cnpj, cidade, **segmentos text[]** multi-select, stage_id, position, notas, created_by, timestamps).
- **Página /leads** (item novo no menu): funil kanban com cards arrastáveis (**dnd-kit** — mesma lib do CRM Marpe, única dependência nova), CRUD de lead em modal, multi-select de segmento (festa, papelaria, bazar…), busca/filtros.
- **Estágios personalizáveis**: criar, renomear, recolorir, reordenar (drag) e excluir (com realocação dos leads) — UI na própria página (admin).
- **Conversão lead→contato**: no estágio "ganho", ação "virar cliente" cria `az_contacts` a partir do lead (proposta — validar com Tati).
- Nasce 100% no design Liquid Glass (zero retrofit depois).
- Base de referência: `marpe-crm-seguros/src/components/crm/CrmBoard.tsx` (kanban + stages + dnd) — adaptação com dados/cores Azeredo.

### Fase 7 — Importação de Dados do Mercos via UI (F8, NOVO) · ~1,5–2 dias
- **4ª aba em Ferramentas: "Importar Mercos"** — upload dos `.xls` da "Carteira detalhada de clientes" (múltiplos arquivos, 1 por representada), reaproveitando o parser validado do `scripts/import-relacao-clientes.mjs` (casa CNPJ→telefone, marca por prefixo, situação/vendedor/última compra prontos do Mercos).
- **Fluxo em 2 passos**: (1) prévia dry-run — quantas linhas casam, o que muda (status/vendedor/última compra), lista de não-casados; (2) aplicar + relatório final com download dos não-casados (.csv) para a Tati validar.
- **Escopo a definir com a Tati**: só atualizar contatos existentes (comportamento atual do script) × também criar contatos novos a partir das linhas não-casadas (proposto como opção desmarcada por padrão).
- Elimina a dependência do Moroni para re-importar carteiras futuras.

## 4. Pendências externas (destravam o plano)

| O quê | Quem | Destrava |
|-------|------|----------|
| Decisão sobre azeredo-9/Bianca restrita (reaquecer, reconectar ou trocar chip) — mesmo caso da azeredo-2 | Tiago | Caso 2 do B1; Fase 2 (Bianca é um dos vendedores roteáveis) |
| Corrigir cadastro dos 3 contatos sem fone alternativo (VLT Bazar, Brincasa, Supermercado Baklizi) | Tati | Falhas remanescentes da Ingá |
| Confirmar: "Quantidade" do checkpoint = "Quantidade em estoque" do layout Mercos? | Tati | F3 |
| Fotos reais da fábrica SICAD (pasta do Drive) para validar o renomeador | Tati/Tiago | F4 |
| Regra p/ contato sem vendedor selecionado no disparo multi-vendedor (excluir × instância padrão) | Tati | F2 |

## 5. Riscos e decisões de arquitetura

1. **Multi-vendedor por split de campanhas** (não por campanha multi-instância): reusa canário/cap/janela/reconciliação sem tocar no worker — menor risco. Custo: N linhas na listagem (mitigado pelo agrupamento visual via `group_id`).
2. **Álbum = N mensagens por contato**: pesa N× na reputação do número. Mitigação: cap diário conta cada imagem, delay maior, e começar com campanhas pequenas nos números aquecidos (azeredo-3, 4, 5, 7).
3. **Fallback de fone no pré-check muda o destinatário efetivo**: gravar o fone realmente usado no recipient e exibir na UI — a Tati precisa ver para qual número foi.
4. **SICAD por IA é sugestão, não verdade**: o padrão é semântico; a prévia com correção manual é obrigatória. A tabela De→Para (determinística) é o caminho preferido; IA é conveniência.
5. **Instâncias restritas são problema de chip, não de código**: a plataforma já detecta (canário) e agora vai sinalizar; a solução real (reaquecer/trocar número) é operacional.

## 6. Cronograma sugerido

| Ordem | Fase | Dias de dev |
|-------|------|-------------|
| ~~1~~ | ~~Fase 1 — Confiança no disparo + coluna Vendedor~~ | ✅ entregue 13/07 |
| 2 | Fase 2 — Multi-vendedor por carteira | 2 |
| 3 | Fase 3 — Carrossel/álbum | 1,5 |
| 4 | Fase 4 — Ferramentas (conversor + SICAD) | 2 |
| 5 | Fase 5 — Conversas de campanha | 1 |
| 6 | Fase 6 — Módulo Leads (NOVO) | 2,5–3 |
| 7 | Fase 7 — Importação Mercos via UI (NOVO) | 1,5–2 |

**Total restante (funcional): ~10,5–11,5 dias.** Redesign Liquid Glass em paralelo/intercalado: +~5–6 sessões (ver `PLANO-UX-LIQUID-GLASS.md` §7 para a ordem combinada — AG1 embutido na Fase 2, Leads nasce glass).

Ordem pensada para: (1) restaurar a confiança da Tati no disparo — ela hoje acha que o envio está quebrado, e a investigação mostrou que a ferramenta estava certa mas muda de cadastro/comunicação; (2) entregar o multi-vendedor que ela já tentou usar numa campanha real (BUBA 09.07); (3) carrossel para os lançamentos; (4) ferramentas; (5) refinamento de conversas.

---

## Changelog

- 14/07/2026 (tarde) — **Fases 2–7 + sweep Liquid Glass ENTREGUES em produção de uma vez** (pedido "pode fazer tudo e depois testamos"). E2E automatizado 9/9 PASS; teste conjunto com Moroni/Tati pendente.
  - **Migrações v13/v14/v15** aplicadas: vínculo instância↔vendedor (`vendedor_nome`, seed casando 6 instâncias por nome) + `group_id`; `custom_media` jsonb; `az_lead_stages`+`az_leads` (RLS + seed 5 estágios).
  - **Fase 2 (F1 multi-vendedor)**: `vendedor_in[]` multi-select (legado `vendedor` migra), toggle "Disparar pelo número de cada vendedor", preview com partição por vendedor (contagem + instância + badges desconectado/restrita/sem número — E2E real: Daiane 466→Daiane IA, Tiago 104→Tiago IA), send divide em campanhas-filhas por instância (1ª reusa a original; `group_id`; live-check paralelo; filha com número desconectado nasce em error com fila pronta p/ Retomar), badge "multi-vendedor" na lista, select "Carteira" em Config.
  - **Fase 3 (F2 carrossel)**: até 5 imagens por campanha (`custom_media` array, compat com single), grid de extras no wizard, worker envia sequencial (1ª com legenda; álbum agrupa no aparelho), "Álbum parcial: X de N" quando extra falha, cap/delay anti-ban contam cada imagem (+0,8s por extra).
  - **Fase 4 (F3+F4 ferramentas)**: Conversor — código OBRIGATÓRIO + linhas sem código ignoradas com contador (regra padrão), alvos novos Preço de Tabela #1–4 (23–26) e Ativo/Ecom mapeáveis da planilha (célula 0/1 preenchida vence o default), "Estoque"→"Quantidade em estoque", prompt da IA ampliado. Renomeador — modo Tabela De→Para (xls/csv 2 colunas, match por nome normalizado), ação IA `sicad-map` (few-shot com os 6 exemplos do PDF), linhas FALHOU editáveis à mão, preset `depara` salvável.
  - **Fase 5 (F5 conversas)**: live endpoint amarra cada chat à campanha mais recente que atingiu o fone (badge azul no chat), filtro por campanha específica (dropdown junto do "Com campanha"), param `campaign_id`.
  - **Fase 6 (F7 Leads)**: página /leads (menu novo, ícone funil) — kanban dnd-kit com colunas glass, CRUD em modal, multi-segmento (chips + livre), gestão de estágios (criar/renomear/recolorir/reordenar/excluir com realocação), conversão lead→cliente no estágio ganho (cria az_contacts, badge "cliente"). APIs `/api/leads`, `/api/leads/[id]`, `/api/leads/stages`. E2E 7/7.
  - **Fase 7 (F8 Importar Mercos)**: 4ª aba de Ferramentas — upload múltiplo dos .xls da carteira (parse client-side), simulação dry-run (cards + status + não-casadas com .csv) e aplicar; lib `src/lib/mercos-import.ts` porta o motor validado do script (agregação entre marcas numa chamada). **E2E com 2 arquivos REAIS: 215/215 casadas.**
  - **Sweep Liquid Glass (AG1–AG4 pragmático)**: ~153 superfícies chapadas → receitas v2 (cards com gradiente card-surface + hairlines especulares, fundos de página transparentes sobre o campo ambiente, headers sticky translúcidos com blur) em Disparos, Conversas, Contatos, Config, Templates, Processos e nas 4 Ferramentas; Leads/Importar já nasceram glass. Retrofit fino (modais com blur por view, staggers) fica para o polish AG5 pós-teste.
  - Deploy prod OK (azeredo-ia.vercel.app). **Não testado de ponta a ponta com envio real**: o split de vendedor em produção será validado no teste conjunto (campanha pequena real).
- 14/07/2026 — **PDF atualizado do checkpoint** (`Checkpoint_Azeredo_1007_Novos_Ajustes_Atualizado.pdf`, a pedido de Tiago): itens F7 **Módulo Leads** (cadastro multi-segmento + funil kanban + estágios personalizáveis → Fase 6) e F8 **Importação Mercos via UI** (API descartada por ora → Fase 7) adicionados ao diagnóstico e ao cronograma. Criado o plano irmão `PLANO-UX-LIQUID-GLASS.md` (redesign visual Marpe-style com cores Azeredo, AG0–AG5, ~5–6 sessões, intercalado com as fases funcionais).
- 13/07/2026 (tarde) — **Fase 1 (B1 + F6) ENTREGUE em produção, testada E2E com envio real.**
  - **Migração v12** (`migration-v12-confianca-disparo.sql`, aplicada via novo runner genérico `scripts/run-migration.mjs <arquivo>`): `az_campaign_recipients.fallback_from` + `az_whatsapp_instances.restricted_at/restricted_reason` + backfill das restritas conhecidas (azeredo-2, azeredo-9).
  - **Fallback de telefone no pré-check** (worker): fone principal reprovado no `/chat/check` → testa os demais fones do contato numa chamada só e envia para o primeiro com WhatsApp; `phone` vira o fone usado (reconciliação/respostas/dedup intactos) e o original fica em `fallback_from`. Mensagens de falha melhores: "Sem WhatsApp em nenhum dos N telefones do contato" / "(parece telefone fixo)". **E2E prod real**: contato com fixo confirmado-sem-WhatsApp como principal + celular do Moroni como alternativo → pré-check barrou o fixo, fallback achou o celular, mensagem enviada e ENTREGUE (canário confirmou em ~10s), campanha completed; recipient com `phone`=celular e `fallback_from`=fixo; badge "fone alternativo" na UI. Artefatos de teste removidos após o teste.
  - **Motivo de falha visível**: motivo em texto vermelho por linha (era um "!" com tooltip) nos dois painéis (card expandido + monitor) + box "Motivos das falhas" agrupado por motivo (`FailureSummary`). Screenshot da Ingá: "7× Número não está no WhatsApp".
  - **Instância restrita**: canário reprovado grava `restricted_at/reason`; primeira entrega confirmada (canário ou reconciliação) limpa automaticamente. Badge "Restrita" no wizard (InstanceCard) e card explicativo em Config; auto-select do wizard prefere conectada NÃO restrita (screenshot: pulou Tatiane, caiu na Letícia).
  - **Heurística de fixo** (`src/lib/phone.ts`, client-safe): badge "FIXO" no preview do wizard e na coluna Telefone de Contatos, com tooltip explicando o fallback.
  - **F6 Contatos**: coluna Vendedor + filtro por vendedor (contagens de `/api/contacts/segmentos`); `vendedor_principal` no GET + param `vendedor`.
  - Deploy prod OK (azeredo-ia.vercel.app, smoke 200/302). Pendente da Fase 1 (externo): Tati corrigir os 3 cadastros sem fone alternativo (VLT Bazar, Brincasa, Supermercado Baklizi) — a plataforma agora mostra exatamente esses casos.
- 13/07/2026 — Documento criado a partir do `Checkpoint (Azeredo) - 1007 - Novos Ajustes.pdf` + investigação em produção (motivos reais das falhas das campanhas Ingá e Polibras; teste ±9º dígito nos 7 números falhados; levantamento de fones alternativos).
