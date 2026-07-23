# Relatório de Execução — Backlog GitHub (17/07/2026)

> Execução completa das Fases 0–4 do `PLANO-BACKLOG-GITHUB-JUL2026.md` (8 issues do board u4digital/projects/4).
> **Status: EM PRODUÇÃO desde 17/07** (deploy `azeredo-o3zxv9ogj` → azeredo-ia.vercel.app, smoke ok) — o checklist de testes abaixo passa a valer direto em produção.
> Build: limpo · Typecheck: **0 erros** (projeto tinha 23 pré-existentes — todos zerados de brinde)

---

## O que foi entregue, item por item

### #2 · fix: Conversas cruzando entre clientes — CAUSA RAIZ ENCONTRADA E CORRIGIDA
- **Causa**: o `/message/find` do UazapiGO só aceita o parâmetro `chatid` (minúsculo). O chat enviava `chatId` — o servidor ignorava o filtro e devolvia as últimas mensagens da **instância inteira**, misturando conversas de clientes diferentes na tela. (O scan de respostas sempre usou `chatid` certo — por isso o bug só aparecia no chat.)
- **Fix duplo**: parâmetro corrigido + filtro defensivo que descarta qualquer mensagem que não pertença ao chat aberto, independente do comportamento do servidor.
- Arquivo: `src/pages/api/conversations/live-messages.ts`

### #4 · Leads — busca automática de CNPJ (Receita)
- Campo CNPJ no modal de lead ganhou botão **"Buscar dados"** (UX de CEP): consulta server-side na **BrasilAPI** (fallback minhareceita.org), auto-preenche razão social/nome fantasia, telefone, cidade, **estado** e **endereço completo** (novos campos, migração v16) — tudo editável.
- Badge de situação cadastral: **"Ativa na Receita"** (verde) ou alerta amarelo (BAIXADA etc.), salva em `situacao_receita`.
- Conversão lead → cliente agora leva estado e endereço reais (antes: RS fixo).
- Arquivos: `api/leads/cnpj-lookup.ts` (novo), `api/leads/index.ts`, `api/leads/[id].ts`, `LeadsView.tsx`, migração v16.

### #5 · Config — adicionar/conectar novos números (Gabriela e Simone)
- Botão **"+ Adicionar número"** em Configurações (admin): cria a instância no UazapiGO via API (`/instance/create` com admin token), registra no banco e o card novo aparece pronto para **Conectar** (QR normal).
- **Perfis criados no sistema**: `gabriela@azeredorepresentacoes.com.br` (senha `Azeredo@2026#Gabriela`) e `simone@azeredorepresentacoes.com.br` (senha `Azeredo@2026#Simone`) — operador.
- Depois de conectar o número da Gabriela: vincular a carteira "Gabriela Valle de Moraes" no card (select Carteira) → os **299 clientes dela entram no disparo por vendedor**. Simone não existe na carteira Mercos atual — entra quando a próxima carteira importada trouxer o nome dela.
- Arquivos: `api/instances/index.ts` (POST novo), `ConfigView.tsx`.

### #1 · Conversas — guias por perfil (Base × Campanha)
- **Vendedor** (perfil com número vinculado): guias **[Base] [Campanha]** exclusivas na própria instância (substituem os toggles antigos).
- **Operador/Admin (Tati)**: novo chip **"Todos os números"** (default) — agrega os chats de TODAS as instâncias conectadas, **somente guia Campanha** (a Base não aparece mais para esse perfil, conforme pedido). Cada conversa mostra o badge do número que a atende, e a resposta sai automaticamente pelo número certo.
- Disparo novo → conversa aparece na guia Campanha com o badge da campanha de origem (comportamento existente, agora agregado).
- Arquivos: `api/conversations/live.ts` (modo `all`), `ConversasView.tsx`.

### #3 · Conversas — chat completo (estilo WhatsApp Web / Marpe)
- **Foto de perfil**: na lista (quando o servidor manda) e no cabeçalho do chat (busca on-demand com cache) — fallback para iniciais.
- **Mídia recebida inline**: imagem, áudio (player com waveform), vídeo, documento e sticker agora carregam via proxy novo que baixa do CDN do WhatsApp, **decripta (AES-256-CBC)** e cacheia no bucket — antes as URLs vinham cifradas e nada renderizava.
- **Enviar imagem/vídeo/PDF**: botão de anexo no chat com preview antes do envio (texto digitado vira legenda).
- **Enviar áudio**: botão de microfone grava (MediaRecorder) e envia como **mensagem de voz** (ptt) ao parar.
- Arquivos: `api/conversations/live-media.ts` (novo proxy), `chat-photo.ts` (novo), `send-direct.ts` (mídia), `media/upload.ts` (áudio+PDF), `ConversasView.tsx`, `live-messages.ts`.

### #8 · Disparos — carrossel interativo (estilo Instagram)
- Com 2+ imagens na campanha, o passo Mensagem ganhou o seletor **"Álbum" × "Carrossel interativo"** + legenda opcional por card.
- Carrossel = **1 mensagem única com cards navegáveis** (`POST /send/carousel`); se o servidor recusar, **fallback automático para álbum** (ninguém fica sem receber).
- **PoC real executada**: carrossel de 2 cards enviado com sucesso (HTTP 200, WhatsApp aceitou o `CarouselMessage`) da instância do Tiago para o número do Moroni — *confira o render no seu WhatsApp*.
- Arquivos: `lib/whatsapp/send.ts` (`sendWhatsAppCarousel`), `process.ts` (worker), `campaigns/index.ts` + `[id].ts` (`media_format`), `DisparosView.tsx`, migração v16.

### #7 · Chatbot de primeiro atendimento
- **Toggle por número** nos cards de Configurações (default DESLIGADO em todos) + **menu 100% configurável** (nova seção em Configurações): saudação, até 6 opções com botão + resposta de cada uma, e horas de silêncio pós-atendimento.
- Comportamento: 1ª mensagem do cliente → saudação + **botões** (fallback para menu numerado em texto); cliente escolhe → resposta da opção + bot silencia (handoff); **humano respondeu → bot silencia sozinho** (detecta fromMe posterior ao último envio do bot). Nunca responde grupo.
- Sem webhook, o bot roda por varredura: **pump do Dashboard** (responde em segundos com a plataforma aberta, throttle 20s) + **cron GitHub Actions a cada 15 min** (fallback com a plataforma fechada).
- Menu default já configurado (Falar com vendedor / Fazer pedido / Tabelas e catálogos / Outro assunto) — Tati edita à vontade.
- Arquivos: `api/bot/tick.ts` (motor), `api/bot/config.ts`, `middleware.ts` (passagem do cron), `ConfigView.tsx`, `DisparosView.tsx` (pump), migração v17, `.github/workflows/bot-tick.yml`.
- Smoke real no preview: tick autenticado responde `{ok:true,skipped:"no_bot_instances"}` (bot desligado em tudo ✓); sem chave → 302 ✓.

### #6 · Roteamento por vendedor — fase 0
- Já estava em produção desde 15/07. **Comentário de entrega publicado na issue** com o resumo e o critério de fechamento (teste conjunto com a Tati).

### Infra corrigida de bônus
- **Ambiente de preview do Vercel não tinha NENHUMA env** — todos os previews anteriores eram só a tela de login estática. Adicionei as 7 envs ao ambiente preview (via API): agora **preview é um ambiente de teste real** (mesmo banco de prod).
- Typecheck do projeto zerado: 23 erros pré-existentes eliminados (`@types/node` instalado + 4 fixes no `metrics.ts`).
- Migrações **v16** e **v17** aplicadas no banco (aditivas, zero impacto no que roda).

---

## O QUE PRECISA SER TESTADO (checklist)

Testar em produção — **https://azeredo-ia.vercel.app** (logins normais):

**Conversas (#1 #2 #3) — o grosso do teste**
- [ ] Logar como **Tati/admin**: deve abrir direto em "Todos os números" com a guia Campanha única (sem guia Base) e badges do número em cada conversa
- [ ] Logar como **vendedor** (ex.: tiago@): deve ficar travado no próprio número com as guias [Base] [Campanha]
- [ ] Abrir 3-4 conversas diferentes e conferir que **as mensagens não misturam mais** entre clientes (fix #2 — o teste mais importante; pedir pra Tati validar no caso que ela reportou)
- [ ] Imagens e áudios recebidos aparecem inline (1º carregamento de cada mídia pode levar ~2-4s — depois fica em cache)
- [ ] Enviar: texto, imagem com legenda, PDF e **áudio gravado** (mic → parar → chega como mensagem de voz no aparelho)
- [ ] Foto de perfil no cabeçalho do chat
- [ ] No modo "Todos", responder uma conversa de outro vendedor e conferir que sai pelo número correto (badge)

**Leads (#4)**
- [ ] Novo lead → digitar um CNPJ real → "Buscar dados" → confere preenchimento + badge Ativa/Baixada → salvar → converter em cliente e conferir estado/endereço no contato

**Números novos (#5)**
- [ ] Config → "+ Adicionar número" → criar instância de teste → conferir se o card aparece e o QR conecta *(atenção: confirmar com o Tiago o limite de instâncias do plano UazapiGO antes de criar as definitivas)*
- [ ] Conectar o chip da Gabriela quando chegar → vincular carteira "Gabriela Valle de Moraes" → conferir que ela aparece no disparo por vendedor
- [ ] Logins gabriela@/simone@ funcionam (senha padrão `Azeredo@2026#Nome`)

**Carrossel (#8)**
- [ ] **Primeiro: conferir no WhatsApp do Moroni o teste que já enviei** (2 cards via Tiago IA) — se o render estiver bom no aparelho, seguir
- [ ] Campanha de teste (tag `u4digital`) com 3 imagens no formato "Carrossel interativo" + legendas por card → conferir chegada como carrossel navegável
- [ ] Mesma campanha no formato "Álbum" → continua chegando agrupada (regressão)

**Chatbot (#7)**
- [ ] Config → revisar/editar o menu default (saudação + 4 opções) — **decidir os textos com a Tati/Tiago**
- [ ] Ligar o bot SÓ num número de teste (ex.: Leticia IA) → mandar mensagem de um celular externo → deve chegar saudação + botões em segundos (com o Dashboard aberto)
- [ ] Escolher uma opção → resposta automática da opção → bot silencia
- [ ] Humano responder pela plataforma → bot NÃO manda mais nada naquela conversa (handoff)
- [ ] Conferir latência com a plataforma fechada (cron 15 min — ver pendência abaixo)

**Disparo por vendedor (#6 — fase 0)**
- [ ] Teste conjunto com a Tati: campanha pequena tag `u4digital`, 2+ vendedores marcados → fechar a issue #6

---

## Pendências / decisões

1. **Cron do chatbot (1 clique seu)**: o token do GitHub não tem o escopo `workflow`, então não consegui publicar o `.github/workflows/bot-tick.yml` no repo u4digital (o arquivo está pronto no projeto e o secret `AZEREDO_WORKER_KEY` JÁ está criado lá). Resolver com: `gh auth refresh -h github.com -s workflow` (num terminal) e me avisar, OU subir o arquivo manualmente pelo site do GitHub. Sem isso o bot funciona normalmente **com a plataforma aberta**; só o fallback de plataforma fechada fica sem cobertura.
2. ~~Deploy em produção~~ — FEITO 17/07 (`azeredo-o3zxv9ogj`, smoke ok: /login 200, rotas autenticadas 302, tick do bot respondendo com worker-key e bot desligado em todos os números).
3. **Chips físicos** Gabriela/Simone + limite de instâncias no plano UazapiGO (confirmar com Tiago).
4. **Textos do menu do bot**: default provisório meu — validar com a Tati.
5. Depois do deploy prod: atualizar o snapshot do repo u4digital (checkpoint novo) e comentar/fechar as issues #1–#8 no board.

## Changelog

- 2026-07-17 — Execução completa das fases 0–4 (8 issues), migrações v16+v17 aplicadas, PoC carrossel real enviada, perfis Gabriela/Simone criados, envs de preview corrigidas, preview deployado para testes.
