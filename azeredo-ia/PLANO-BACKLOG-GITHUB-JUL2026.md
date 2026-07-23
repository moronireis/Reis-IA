# Plano — Backlog GitHub (u4digital/projects/4)

> Data: 2026-07-17 · Fonte: https://github.com/orgs/u4digital/projects/4 (board "Azeredo")
> Cobertura verificada por API GraphQL: **8 itens no board, 8 lidos na íntegra** (corpo completo das issues #1–#8 do repo u4digital/Azeredo-Project). A view 2 ("Board") é o kanban sem filtro — mesmo conjunto. Todos com status **Todo**.
> Status: EXECUTADO EM 17/07 (fases 0–4 completas) — ver `RELATORIO-BACKLOG-1707.md` para o que foi entregue e o checklist de testes. EM PREVIEW aguardando validação → prod.

## Visão geral

| # | Item | Situação | Esforço (dev) | Fase proposta |
|---|------|----------|---------------|---------------|
| 6 | Disparos — roteamento por vendedor | **JÁ EM PRODUÇÃO (15/07)** — falta teste conjunto + fechar issue | 0 (validação) | 0 |
| 2 | fix: Conversas cruzando entre clientes | Bug em produção — investigar primeiro | 0,5–1d | 1 |
| 5 | Config — adicionar/conectar novos números (Gabriela e Simone) | Desbloqueia +299 clientes no disparo por vendedor | ~1d | 1 |
| 4 | Leads — busca automática de CNPJ | Isolado, rápido (BrasilAPI) | ~1d | 1 |
| 1 | Conversas — guias Base × Campanha por perfil | Junto com o item 3 (mesmos arquivos) | 1–1,5d | 2 |
| 3 | Conversas — chat completo estilo WhatsApp Web (idem Marpe) | Blueprint do Marpe pronto para portar | 2–3d | 2 |
| 8 | Disparos — carrossel interativo (estilo Instagram) | Álbum já existe; carrossel real = `/send/carousel` Uazapi | 1–1,5d | 3 |
| 7 | Chatbot de primeiro atendimento | Maior peça + decisões de produto + dependência webhook/polling | 3–4d | 4 |

**Total estimado: ~9,5–13 dias dev** (sem o item 6, já entregue).

---

## Fase 0 — Validação do que já está pronto (item 6)

O corpo da issue #6 é o mesmo pedido (mesmo print) implementado e deployado em 15/07 (`PLANO-DISPARO-POR-VENDEDOR.md`): wizard Mensagem → Representada → vendedores (checkboxes com contagem/instância/status) → Disparo, roteamento pelo `vendedor_efetivo` da carteira da representada, campanhas-filhas em paralelo.

**Ações**: teste conjunto com Tati/Tiago (campanha pequena, tag `u4digital`, 2+ vendedores marcados) → comentar a entrega na issue #6 e mover para Done.

## Fase 1 — Bug crítico + destravas rápidas

### Item 2 · fix: Conversas cruzando entre clientes (PRIMEIRO — bug de confiança)
- **Hipóteses prováveis** (pelo código): (a) casamento de telefone com/sem 9º dígito no modo live (`ConversasView`/`/api/conversations/live`) atribuindo chat ao contato errado quando dois contatos compartilham sufixo; (b) contatos duplicados com o mesmo fone (a base tem ~170 fones repetidos — o disparo deduplica, o chat não); (c) chat agregado por instância misturando `chatid` de grupos.
- **Passos**: coletar 1 caso concreto com a Tati (cliente X mostrando conversa do cliente Y) → reproduzir em prod (leitura) → corrigir o matching (normalização única + prioridade CNPJ/contato exato) → teste E2E com os números internos.

### Item 5 · Config — novos números (Gabriela e Simone)
- **Hoje**: instâncias são pré-cadastradas manualmente no banco; Config só conecta QR e vincula operador/carteira.
- **Fazer**: botão "Adicionar número" (admin) em Config → `POST /instance/init` no UazapiGO com o admin token → grava `az_whatsapp_instances` (nome, token, slot) → QR connect (fluxo existente) → vincular `owner_profile_id` + `vendedor_nome`.
- **Provisionar**: perfis `gabriela@`/`simone@` (operador), Gabriela vinculada à carteira `Gabriela Valle de Moraes` (299 vínculos hoje SEM número — entra direto no disparo por vendedor). Simone não existe na carteira Mercos atual → vincular quando a próxima carteira importada trouxer o nome dela (ou vínculo manual).
- **Verificar antes (Tiago)**: capacidade/limite de instâncias no servidor `u4digital.uazapi.com` e chips físicos disponíveis; warm-up dos números novos antes de disparo em massa (lição documentada).

### Item 4 · Leads — busca automática de CNPJ
- Endpoint server-side `/api/leads/cnpj-lookup` consultando **BrasilAPI** (`/api/cnpj/v1/{cnpj}` — grátis, sem chave; fallback minhareceita.org) → razão social, situação cadastral (ATIVA/baixada), endereço completo, telefone, CNAE.
- No modal de novo lead (`LeadsView`): campo CNPJ com busca (UX de CEP), auto-preenche + badge de situação na Receita, tudo editável.
- Migração v16: campos `cidade`/`estado` em `az_leads` (hoje faltam).

## Fase 2 — Módulo Conversas (itens 1 + 3 juntos — mesmos arquivos)

### Item 1 · Guias Base × Campanha por perfil
- **Vendedor** (perfil com instância vinculada via `owner_profile_id`): mantém guias **Base** e **Campanha** da própria instância.
- **Operador/Admin** (Tati — sem instância própria): vê **todos os vendedores**, porém **só a guia Campanha** (sem acesso à Base).
- Novo disparo gera a conversa na guia Campanha do operador responsável (join `az_campaign_recipients` → instância da campanha-filha → operador).
- Implementação: regra de papel no `/api/conversations` + tabs condicionais na `ConversasView`.

### Item 3 · Chat completo (foto de perfil, mídia, áudio — "idem Marpe")
- Portar o blueprint do chat do Marpe (media sync sob demanda, AudioPlayer canvas, decrypt AES-256-CBC de mídia do WhatsApp, envio de áudio/imagem via `/send/media` tipo ptt/image): já documentado e rodando no CRM Marpe — adaptação, não invenção.
- Foto de perfil: `/chat/details`-`/contact/info` do UazapiGO com cache no banco.
- **Adaptação necessária**: o servidor Uazapi da Azeredo não entrega webhooks → sync de mídia/mensagens continua sob demanda + polling (modo live atual), não em tempo real por evento. Funciona; latência de segundos.

## Fase 3 — Disparos: carrossel interativo (item 8)

- **Hoje**: até 5 imagens por campanha enviadas em sequência (álbum no aparelho) — entregue em 14/07.
- **Pedido**: carrossel real estilo Instagram = mensagem interativa com cards (imagem + texto + botão) — endpoint **`POST /send/carousel`** do UazapiGO (doc linkada na issue).
- **Passo 1 obrigatório**: prova de conceito com número interno — validar que o carrossel renderiza corretamente em conta não-oficial/aparelhos dos clientes (mensagens interativas têm suporte variável) e medir risco anti-ban.
- Depois: opção "Carrossel" no passo Mensagem do wizard (cards: imagem + legenda + botão opcional), worker envia via `/send/carousel`, fallback automático para álbum se o endpoint falhar.

## Fase 4 — Chatbot de primeiro atendimento (item 7)

- **Escopo**: toggle Ativo/Inativo por representada **ou** por número; saudação + menu de opções com botões (`/send/menu` Uazapi); handoff automático (bot silencia no chat quando um humano responde — `fromMe` da UI ou do celular); estado por conversa com expiração.
- **Dependência técnica central**: receber mensagem do cliente em tempo hábil. Sem webhook (limitação atual do servidor), a via é um worker de polling dedicado (varredura `/message/find` a cada ~10s nas instâncias com bot ativo — latência de resposta ~10–20s, aceitável para 1º atendimento). Se o suporte Uazapi liberar webhooks, o handler já existe e o bot fica instantâneo.
- **Decisões de produto pendentes (Tiago/Tati)**: menu fixo ou configurável por representada; onde fica o toggle (sugestão: Config por número + override por conversa); texto da saudação; horário de funcionamento do bot.
- Estrutura: `az_bot_config` (por instância/representada) + `az_bot_state` (por chat: ativo/handoff/última interação) — migração v17.

---

## Dependências externas e riscos (consolidado)

1. **Webhook UazapiGO** (itens 3 e 7): servidor não entrega eventos — escalação com suporte segue aberta; plano B (polling) já embutido nas fases.
2. **Capacidade de instâncias + chips** (item 5): confirmar com Tiago limite do servidor e números físicos de Gabriela/Simone; warm-up antes de massa.
3. **Render do carrossel interativo** (item 8): validar em aparelho real antes de construir o wizard.
4. **Simone fora da carteira Mercos** (item 5): roteamento por vendedor depende do nome na carteira — resolver via próxima importação ou vínculo manual.
5. **Caso concreto do bug** (item 2): precisa de 1 exemplo real da Tati para diagnóstico rápido.

## Ordem de execução sugerida

```
Fase 0 (validação item 6)  → destrava fechamento da 1ª issue
Fase 1: item 2 → item 5 → item 4   (~2,5–3d)
Fase 2: item 1 → item 3            (~3–4,5d)
Fase 3: item 8                     (~1–1,5d)
Fase 4: item 7                     (~3–4d, após decisões de produto)
```

Cada fase termina com E2E + preview Vercel → aprovação → produção → checkpoint no repo u4digital/Azeredo-Project (tag datada) + atualização das issues no board.

## Changelog

- 2026-07-17 — Plano criado a partir da leitura completa do board (8/8 itens via GraphQL, escopo `read:project` autorizado via device flow)
- 2026-07-17 — TODAS as fases executadas na mesma data: #2 causa raiz (`chatId`→`chatid` + filtro defensivo), #4 CNPJ BrasilAPI + v16, #5 criação de instância via API + perfis Gabriela/Simone, #1 guias por perfil + modo "Todos os números", #3 chat completo (proxy de mídia com decrypt, foto de perfil, anexos, áudio ptt), #8 carrossel `/send/carousel` + PoC real OK, #7 chatbot por polling (v17, tick + config + UI + cron pronto). Typecheck do projeto zerado (23→0). Envs de preview criadas (ambiente estava vazio desde sempre). Detalhes: `RELATORIO-BACKLOG-1707.md`.
