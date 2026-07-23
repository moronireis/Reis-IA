# AZEREDO IA — Plano do Backlog 22/07/2026

> Fonte: board `github.com/orgs/u4digital/projects/4` ("Azeredo"), atualizado por Tiago em 22/07/2026.
> Última atualização deste plano: 22/07/2026.

---

## 1. O que mudou no board (22/07)

**Fechadas / Done:**
- **#2** fix conversas cruzadas — Done (entregue 17/07)
- **#5** adicionar novos números — Done (entregue 17/07)
- **#7** chatbot de menu — CLOSED: **descartado**, substituído pela #9 (IA conversacional)

**Entregues em prod, aguardando validação conjunta (ainda "Todo" no board):**
- **#1** guias Base×Campanha por perfil (17/07)
- **#3** chat completo estilo WhatsApp Web (17/07)
- **#4** CNPJ lookup em Leads (17/07)
- **#6** roteamento por vendedor (15/07 — comentário de entrega já publicado na issue)
- **#8** carrossel — backend pronto + POC real enviada (17/07); a UI virou a #17

**Novas (todas de 22/07, autor tiagodonicht):**

| # | Tipo | Resumo |
|---|------|--------|
| #9 | feat | Remover chatbot de menu → **IA conversacional** com base de conhecimento + prompt (universais), toggle por número |
| #10 | feat | Conversor de tabelas: novo layout **Toyng** → padrão Mercos (3 planilhas reais anexas na issue) |
| #11 | bug/ops | Contas com badge **Restrita** (azeredo-2/9 — canário funcionando como projetado; problema é do chip) |
| #12 | bug | Erro ao **gerar QR Code** |
| #13 | bug | Erro ao **adicionar novo número** |
| #14 | bug | **Foto do vendedor** não persiste (sincroniza, mas some ao sair e voltar) |
| #15 | feat | Opção de **remover/desativar** número/vendedor em Config |
| #16 | feat | **UI/UX geral**: tema claro/escuro, estilo Marpe/RHF, cores da identidade Azeredo, Métricas→"Dashboard", Leads→"Funil", remover módulo Processos, polish geral |
| #17 | feat | **Carrossel no wizard** de disparos (3º tipo de mensagem: texto + até 5 imagens) |
| #18 | feat | **Perfis de acesso**: Admin / Operacional / Vendedor / Gerência com matriz de módulos |

---

## 2. Diagnóstico técnico (feito em 22/07)

### #13 — Erro ao adicionar número: CAUSA RAIZ PROVÁVEL ENCONTRADA
`POST /api/instances` cria instância via `POST /instance/create` com header `admintoken` = `UAZAPI_TOKEN` (instances/index.ts:72-88). **Chamada direta hoje ao servidor `u4digital.uazapi.com` com esse token retorna `{"error": "Invalid AdminToken Header"}`** — o admintoken foi rotacionado/invalidado desde 17/07 (quando a criação funcionava). Envio de mensagens segue OK porque usa tokens POR INSTÂNCIA gravados no banco; só as operações administrativas quebram.
**Ação**: obter o admintoken atual com Tiago (painel do servidor UazapiGO) → atualizar env no Vercel (prod+preview) → re-testar criação. Limpar registros órfãos no banco criados durante as tentativas com erro.

### #12 — Erro no QR Code: provável cascata do #13
QR usa `POST /instance/connect` com o token da própria instância (qr.ts). Se o registro nasceu no banco sem instância real no servidor (falha do create) ou a sessão está morta ("not reconnectable", caso azeredo-9), o QR falha. Resolver #13 primeiro, depois tratar sessões mortas (recriar instância limpa).

### #11 — Restrita: NÃO é bug
Badge criada em 13/07 exatamente para isso: azeredo-2 (Tatiane) e azeredo-9 (Bianca) aceitam envio mas o WhatsApp não entrega (shadow-restriction do chip). Auto-limpa na primeira entrega confirmada. Ação de produto: botão **"Testar entrega"** (canário manual) para revalidar após reaquecer/trocar chip. Ação externa: decisão de chip com Tiago.

### #14 — Foto do vendedor
Sync ao vivo busca a foto mas ela não é persistida/lida do banco na listagem → adicionar coluna `profile_pic_url` em `az_whatsapp_instances`, gravar no sync (status.ts) e ler na listagem/Config.

---

## 3. Fases propostas

### Fase A — Saúde do módulo Números WhatsApp (#11, #12, #13, #14, #15) — ~1,5 dia
1. Trocar admintoken (dependência Tiago) + separar env `UAZAPI_ADMIN_TOKEN` se distinto; re-testar criação de número E2E (Gabriela/Simone, pendentes desde 17/07)
2. Limpeza de instâncias órfãs/mortas no banco e no servidor
3. Migração: `profile_pic_url` persistida no sync (#14)
4. #15: **Desativar** (desconecta sessão, some das listas/wizard, preserva histórico) + **Remover** (admin-only: `/instance/delete` no servidor + soft-delete no banco)
5. #11: botão "Testar entrega" (canário manual) + texto de orientação no badge Restrita

### Fase B — Conversor Toyng → Mercos (#10) — ~0,5–1 dia
1. Baixar as 3 planilhas anexas na issue (Toyng ECOMMERCE, Toyng BRASIL, Importação MERCOS alvo)
2. Mapear colunas marcadas (rosa) → colunas do padrão Mercos; adicionar alvos que faltarem no conversor
3. Reforçar few-shot da IA de mapeamento com o layout Toyng; validar com os 3 arquivos reais
- *Valor imediato: Tiago usa isso operacionalmente para subir tabela ao Mercos.*

### Fase C — Carrossel no wizard (#17, fecha #8) — ~1 dia
1. Passo de mensagem com 3 tipos: **Simples | Foto/Vídeo | Carrossel** (até 5 imagens)
2. Editor por card: upload (az-media) + legenda por card + texto principal
3. Envio via `sendWhatsAppCarousel` já implementado (v16, fallback álbum, POC real OK em 17/07)
4. E2E real com campanha tag `u4digital`

### Fase D — Perfis de acesso (#18) — ~2 dias
1. Migração: `role` em `az_profiles` → `admin | operacional | vendedor | gerencia`
2. Matriz de módulos (menu + middleware por rota):
   - **Admin**: tudo
   - **Operacional** (Tati): Disparos, Conversas, Contatos, Leads/Funil, Templates, Ferramentas, Configurações — inbox agregado de todos os números **só guia Campanha** (comportamento atual dela)
   - **Vendedor**: Disparos, Conversas, Contatos, Leads/Funil, Templates — inbox **só do próprio número**, sync completo (incl. grupos)
   - **Gerência**: Vendedor + Dashboard/Métricas
3. Criar contas dos vendedores (padrão `Azeredo@2026#Nome`; gabriela@/simone@ já existem)
4. E2E com um login de cada papel
- *Confirmar com Tiago: Operacional acessa Configurações inteira ou parcial?*

### Fase E — IA conversacional de primeiro atendimento (#9) — ~2,5–3 dias
1. Remover UI do chatbot de menu (infra fica: `az_bot_state`, tick, throttle 20s, handoff por `fromMe`)
2. Painel "IA de atendimento" em Config: **prompt universal** + **base de conhecimento universal** (editável; texto estruturado em `az_settings`/tabela própria), toggle **por número** (semântica do `bot_enabled` atual)
3. Motor: LLM com prompt + KB + janela curta do histórico da conversa; responde via send existente; handoff automático quando humano assume (fromMe); janela de atuação e mensagem de transbordo configuráveis
4. Publicar cron `bot-tick.yml` (pendente 1 comando interativo: `gh auth refresh -s workflow` — secret `AZEREDO_WORKER_KEY` já existe no repo)
5. E2E com contato de teste ("Teste Resposta Claude" / fone azeredo-3)
- **Decisões**: modelo (recomendo **Claude Sonnet** — criar `ANTHROPIC_API_KEY` no Vercel; alternativa: gpt-4o com a chave OpenAI já existente); quem escreve prompt+KB inicial (Tiago/Tati)

### Fase F — UI/UX geral (#16) — ~2,5–3 dias
1. **Tema claro/escuro**: hoje o glass é dark-only verde-preto — tokenizar cores (light variants dos 4 materiais glass), toggle persistido por usuário
2. **Cores da identidade Azeredo**: extrair paleta do Instagram/logo oficial → aprovar com Tiago antes de aplicar
3. Renomear módulos: Métricas → **Dashboard**, Leads → **Funil**
4. **Remover módulo Processos e Padrões da navegação** (não dropar dados — `az_processes` tem soft-delete e FKs; só sai do menu/rotas)
5. Sweep de fluidez/polish nas views restantes
6. Preview Vercel para aprovação visual ANTES de promover (regra de visual work)

### Fase G — Validação conjunta + fechamento de board — ~0,5 dia + agenda
1. Teste conjunto com Tati/Tiago (checklist do `RELATORIO-BACKLOG-1707.md` + split por vendedor #6 + carrossel)
2. Fechar #1, #3, #4, #6, #8 validadas + novas conforme entregarem
3. Housekeeping: **commitar working tree do monorepo** (fases 0–4 de 17/07 ainda não commitadas) + snapshot datado no repo handoff `u4digital/Azeredo-Project`

---

## 4. Ordem sugerida e estimativa total

```
A (bugs Config, 1,5d) → B (Toyng, 1d) → C (carrossel, 1d) → D (perfis, 2d) → E (IA, 3d) → F (UI/UX, 3d) → G (validação, 0,5d)
```

**Total: ~10–12 dias dev.** A ordem prioriza: destravar bugs que impedem uso (A), valor operacional imediato (B), quick win visível com backend pronto (C), pré-requisito para rollout aos vendedores (D), a maior feature nova (E) e por último o redesign transversal (F), que mexe em tudo e rende mais com o funcional estável.

---

## 5. Dependências externas / decisões pendentes

| # | O quê | Quem |
|---|-------|------|
| 1 | **admintoken UazapiGO atual** (bloqueia Fase A itens 1–2 e #15-Remover) | Tiago |
| 2 | Reaquecer/trocar chips restritos (azeredo-2 Tatiane, azeredo-9 Bianca) | Tiago |
| 3 | Modelo da IA: Claude Sonnet (criar `ANTHROPIC_API_KEY`) vs gpt-4o (chave existe) | Moroni |
| 4 | Prompt inicial + base de conhecimento da IA | Tiago/Tati |
| 5 | Paleta oficial Azeredo (ref: Instagram @azeredorepresentacoes_) | Tiago |
| 6 | Matriz #18: escopo exato de "Configurações" para Operacional | Tiago |
| 7 | `gh auth refresh -h github.com -s workflow` (1 comando, terminal interativo) p/ publicar cron | Moroni |
| 8 | Agenda do teste conjunto (pendente desde 17/07) | Tati |

---

## Changelog

- 2026-07-22 — Plano criado a partir da atualização do board (10 issues novas #9–#18, #7 fechada/substituída). Diagnóstico do admintoken inválido incluído (causa provável de #13/#12).
- 2026-07-22 (noite) — **Fases A–F IMPLEMENTADAS e em PREVIEW** (`azeredo-548d8ydkt-...vercel.app`), aguardando aprovação visual do Moroni para promover a produção. Executado:
  - **Migração v18** aplicada (profile_name/pic_url, deleted_at, bot_msg_count, roles 4 papéis — operador→vendedor migrado).
  - **A**: `UAZAPI_ADMIN_TOKEN` novo em .env.local + Vercel (prod/preview/dev); 4 órfãs soft-deletadas (azeredo-ia/-3/-6/-8); **azeredo-10 (Gabriela) e azeredo-11 (Simone) CRIADAS no servidor** e vinculadas aos perfis (falta QR); foto/nome persistidos (#14 ok nas 5); Desativar/Reativar + Remover (#15, ciclo real testado: criou descartável → apagou no servidor); Testar entrega (#11, azeredo-7→fone Moroni = **Delivered**).
  - **B**: conversor com passo 3b (2ª planilha → Preço de Tabela #1 por código), fração→% automático, prompt IA reforçado. Validação com os 3 arquivos reais da issue: IA acertou 100% do mapeamento; saída × alvo do Tiago = **332 iguais / 0 divergentes** (42 do alvo são da aba CLOSEOUT25 → 2ª conversão).
  - **C**: seletor "Formato da mensagem" (Simples | Foto/Vídeo | Carrossel 2–5 imgs, legenda por card, validações) no passo 1 do wizard.
  - **D**: papéis admin/operacional/vendedor/gerência — middleware de páginas + requireRole nas APIs (metrics=gerência, ferramentas=operacional), menu por papel, painel Usuários em Config, proteção de último admin, vendedor sem vínculo bloqueado no inbox, grupos entram na guia Base do próprio número. E2E papéis 8/8.
  - **E**: tick.ts reescrito para IA conversacional (OpenAI, histórico, anti-loop bot_msg_count≥8→handoff, nunca grupos), /api/bot/ai-config (+?probe=1), painel AIConfigCard, rascunho de prompt+KB SEEDADO em az_settings. Probe OpenAI ok. **Teste de conversa real fica p/ número controlado com Tiago** (não ligar em número com clientes reais antes disso).
  - **F**: tema claro/escuro (tokens + sweep ~30 cores hardcoded→var() em todos os componentes exceto GerarPedido), toggle na sidebar c/ persistência e anti-flash, Métricas→Dashboard, Leads→Funil, Processos fora do menu (rota só admin). Paleta oficial Azeredo pendente (Tiago).
  - **G parcial**: commit monorepo `b7ec2510` + push; snapshot handoff `u4digital/Azeredo-Project` tag `checkpoint-2026-07-22` (sem .github/workflows — escopo); entrega registrada no u4-status (projeto azeredo, ordem 1); comentários de status nas issues #9–#18 (10/10). Issues NÃO fechadas — fecham após validação+prod.
  - **Pendências**: (1) aprovação visual do preview → `npm run deploy`; (2) `gh auth refresh -s workflow` p/ publicar bot-tick.yml; (3) QR Gabriela/Simone; (4) prompt+KB definitivos da IA (Tiago/Tati) + teste em número controlado; (5) chips azeredo-2/9 (Tiago); (6) paleta oficial (Tiago); (7) confirmar escopo Config do papel Operacional (Tiago); (8) teste conjunto (Tati).
