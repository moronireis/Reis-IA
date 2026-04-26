# Meta App Setup Checklist — REIS [IA]

Last updated: 2026-04-22
App ID: `2160072261434114`
App Name: `Reis IA - Gestor`
Dashboard: https://developers.facebook.com/apps/2160072261434114/

## CURRENT STATUS (2026-04-22)

**Stack 4 (Traffic Management): OPERATIONAL.**
- User Access Token obtained with 12 permissions (ads_management, ads_read, business_management, leads_retrieval, whatsapp_business_management, pages_*, etc.)
- 4 ad accounts accessible: Moroni Reis (act_1690330771143511), Noiva S/A (act_2980473968915513), Agente Lucrativo (act_1067594805509822), Leo Soares 3 (act_1618363548859143)
- MCP Server installed: `meta-ads` (@getscaleforge/mcp-meta-ads) — 32 tools, Graph API v24.0
- Plugin installed: `claude-ads` (AgriciDaniel/claude-ads v1.5.1) — 250+ audit checks
- 3 agents created: traffic-manager, ads-analyst, creative-strategist
- Safety rules: `.claude/rules/ads-safety.md`

**Stack 1 (Competitive Intelligence): STILL BLOCKED.** Ad Library API only returns political ads. Apify decision pending.

**PENDING: System User token migration.** Current token is a User Access Token (expires). See Section 5 for System User setup (non-expiring).

---

---

## 1. Visão Geral

A REIS [IA] está montando dois stacks que dependem do mesmo Meta Developer App:

- **Stack 1 — Inteligência Competitiva (Funnil Hacker v2):** ler Meta Ad Library API para capturar criativos e bibliotecas de anúncios de concorrentes.
- **Stack 4 — Gestão de Tráfego:** criar/ler/otimizar campaigns, adsets e ads via Marketing API; ler Insights e enviar eventos server-side via Conversions API (CAPI) para atribuição.

**ALERTA CRÍTICO (ler antes de tudo):** a Meta Ad Library API oficial, em 2026, só retorna **ads políticos e de issues sociais**. Para BR, só aparecem ads que foram rotulados como "issue/eleitoral". Ads comerciais comuns (ecommerce, infoproduto, SaaS) **NÃO são retornados pela API** — só aparecem na UI do Ad Library web. Stack 1 (Funnil Hacker v2) precisará ou de scraping do site (risco de TOS) ou de um provedor terceirizado (Adligator, SearchApi, Swipekit, PowerAdSpy) que fazem esse scraping com infra própria. Ver Seção 9.

---

## 2. Products a Ativar no Dashboard

No menu lateral "Add Product", ativar:

| Product | Serve para | Stack |
|---|---|---|
| **Marketing API** | CRUD de campaigns/adsets/ads, Insights, Audiences, Creative Library | Stack 4 |
| **Facebook Login for Business** | OAuth flow para conectar ad accounts de clientes no futuro | Stack 4 |
| **Webhooks** | Receber notificações de lead ads, mudanças em ad account, alertas | Stack 4 |
| **Conversions API** | Auto-provisiona CAPI app + system user + token sem App Review | Stack 4 |

Ad Library API **não é um product separado** no dashboard — acesso é por endpoint `/ads_archive` com token já existente, após identity verification.

---

## 3. Use Cases a Adicionar

Meta migrou para modelo de "Use Cases" que agrupam permissions. Para nós:

| Use Case | O que desbloqueia | Review | Stack |
|---|---|---|---|
| **Manage ads for an ad account** (ou "Advertise on Meta") | `ads_management`, `ads_read`, `business_management` | Advanced Access precisa App Review + Business Verification; Standard Access é auto-granted para ad accounts onde você é admin | Stack 4 |
| **Access Ads Library** | Permite identity verification para `/ads_archive` | Apenas ID verification, sem App Review | Stack 1 |
| **Server-side API** (Conversions API) | `ads_management` + `events_management` para CAPI | Sem review; token é auto-gerado | Stack 4 |

**Recomendação:** começar com "Manage ads for an ad account" no modo Standard Access — suficiente para operar na **própria BM do Moroni**. Advanced Access só é necessário quando quisermos operar em ad accounts de clientes que não são gerenciadas pela nossa BM.

---

## 4. Permissions Detalhadas

| Permission | Usado por | Stack | Review | Notas |
|---|---|---|---|---|
| `ads_read` | Ler campaigns/adsets/ads/insights | 4 | Standard auto-granted para próprias contas; Advanced precisa review | Core read |
| `ads_management` | Criar/editar/deletar campaigns | 4 | Standard para próprias contas; Advanced precisa review | Core write |
| `business_management` | Gerenciar BM, ad accounts, assets | 4 | Standard para própria BM; Advanced precisa review | Necessário para System Users |
| `read_insights` | Ler page/post insights (separado de ads) | 4 | Standard para páginas que você admin | Útil se quisermos orgânico |
| `pages_read_engagement` | Ler posts/comments de pages conectadas | 4 | Standard para pages admin | Opcional |
| `leads_retrieval` | Puxar leads de Lead Ads forms | 4 | Advanced Access + App Review obrigatório | Só quando rodarmos lead gen |
| `events_management` | Enviar events via CAPI | 4 | Auto-granted via Conversions API product | Stack 4 atribuição |
| (nenhuma para Ad Library) | Ad Library usa token próprio após ID verification | 1 | Só `identity verification` via `facebook.com/ID` | Não é permission no app |

---

## 5. Access Token Strategy

**Recomendação: System User token dentro do Business Manager.** Motivos:
- Não expira (long-lived sem TTL quando gerado com Standard Access em BM do próprio app)
- Não depende de funcionário com login
- Server-to-server, ideal para agentes rodando em background
- Revogável sem afetar usuários humanos

**Passo-a-passo:**

1. Abrir **Business Manager** (`business.facebook.com`) → Business Settings → Users → **System Users** → Add.
2. Nome: `reis-ia-agents`. Role: **Admin**.
3. Atribuir assets: ad account, pixel, page, catalog (o que for relevante).
4. Clicar no system user criado → **Generate New Token** → escolher o app `2160072261434114`.
5. Selecionar scopes: `ads_management`, `ads_read`, `business_management`, `read_insights`, `pages_read_engagement`.
6. Copiar o token — aparece uma única vez. Guardar em `.env` como `META_SYSTEM_USER_TOKEN`.
7. Validar no **Access Token Debugger** (`developers.facebook.com/tools/debug/accesstoken/`) — confirmar que "Expires: Never".

**Para teste imediato (antes do system user ficar pronto):** o Moroni pode gerar um **User Token** no **Graph API Explorer** (`developers.facebook.com/tools/explorer/`), selecionar o app `2160072261434114`, marcar os mesmos scopes e gerar. Token dura 1-2h — suficiente para o integration-engineer rodar smoke tests.

**CAPI token:** gerar separado em Events Manager → Pixel → Settings → Conversions API → Generate Access Token. Esse token Meta cria app + system user próprios automaticamente.

---

## 6. Webhook Subscriptions

Ativar no product Webhooks quando Stack 4 entrar em produção:

- **`leadgen`** — notifica quando um Lead Ad form é submetido. Necessário para Stack 4 puxar leads em tempo real.
- **`ad_account`** — alertas de billing, account disabled, policy violations.
- **`page`** — opcional, para capturar menções/comments em pages conectadas.

Webhook callback URL precisa ser HTTPS público (pode ser um endpoint no `reis-ia-hub` ou edge function Supabase).

---

## 7. Checklist Passo-a-Passo para o Moroni

Dashboard: `developers.facebook.com/apps/2160072261434114/`

- [x] **App Settings → Basic** — App configurado como "Reis IA - Gestor". ✅ 2026-04-22
- [x] **Add Product → Marketing API** → Set Up. ✅ (permissions confirmadas via token)
- [ ] **Add Product → Conversions API** → Set Up (auto-provisiona token CAPI). ⏳ Pendente
- [ ] **Add Product → Webhooks** → Set Up (configurar endpoint depois). ⏳ Pendente
- [x] **App Roles → Roles** — Moroni é Admin. ✅
- [x] **Use Cases → "Manage ads for an ad account"** — `ads_management`, `ads_read`, `business_management` com Standard Access. ✅ 2026-04-22 (confirmado: 12 permissions granted)
- [x] **App Review → Permissions and Features** — 12 permissions ativas incluindo ads_management, ads_read, business_management, leads_retrieval, whatsapp_business_management. ✅ 2026-04-22
- [ ] **Business Verification** — iniciar em `business.facebook.com/settings/security`. Leva 3-5 dias úteis. **Só é obrigatório para Advanced Access** — pode pular se vamos operar só na BM própria.
- [ ] **Identity Verification (Ad Library)** — em `facebook.com/ID` fazer verificação de identidade pessoal. Libera `/ads_archive` endpoint. ⏳ Só necessário se Stack 1 for por API oficial
- [ ] **Business Manager → System Users → Add** — criar `reis-ia-agents`, atribuir assets, gerar token long-lived (Seção 5). ⏳ **RECOMENDADO** — token atual é User Token (expira)
- [ ] **Data Use Checkup** — checar em `App Dashboard → App Review → Data Use Checkup`. Meta exige renovação anual; se vencer, APIs param de responder.
- [x] Entregar ao integration-engineer: App ID (`2160072261434114`), User Access Token (12 permissions), Ad Account IDs (4 contas). ✅ 2026-04-22. **Pendente:** App Secret, System User Token, CAPI Token, Pixel ID.

---

## 8. Smoke Test (para o integration-engineer)

Assim que o token chegar, rodar os 3 testes abaixo. Usar Graph API v20.0 ou mais recente.

```bash
# (a) Validar token e listar ad accounts do System User
curl -sG "https://graph.facebook.com/v20.0/me/adaccounts" \
  --data-urlencode "fields=id,name,account_status,currency,business" \
  --data-urlencode "access_token={TOKEN}"

# (b) Ad Library — buscar ads político/issue em BR (só retorna se existirem)
curl -sG "https://graph.facebook.com/v20.0/ads_archive" \
  --data-urlencode "search_terms=eleicao" \
  --data-urlencode "ad_reached_countries=['BR']" \
  --data-urlencode "ad_type=POLITICAL_AND_ISSUE_ADS" \
  --data-urlencode "fields=id,ad_creative_bodies,ad_delivery_start_time,page_name,impressions,spend" \
  --data-urlencode "access_token={TOKEN}"

# (c) Insights de uma ad account específica
curl -sG "https://graph.facebook.com/v20.0/act_{AD_ACCOUNT_ID}/insights" \
  --data-urlencode "fields=campaign_name,spend,impressions,clicks,ctr,cpc,actions" \
  --data-urlencode "date_preset=last_7d" \
  --data-urlencode "level=campaign" \
  --data-urlencode "access_token={TOKEN}"
```

Resultado esperado:
- (a) retorna JSON com `data: [{id, name, ...}]` — se vier vazio, System User não tem ad account atribuída.
- (b) pode retornar `data: []` se não tem ad político com esse termo — isso é OK, valida que o endpoint aceitou o token. Se retornar `error: (#10) Application does not have permission` → identity verification ainda não foi feita.
- (c) retorna métricas. Se vier `(#100) Unsupported get request` → o `act_` ID está errado ou System User não tem acesso àquela conta.

---

## 9. Riscos e Gotchas

**BLOQUEADOR STACK 1 — Ad Library API não serve para ads comerciais.** Em 2026 a `/ads_archive` só retorna ads marcados como `POLITICAL_AND_ISSUE_ADS`. Funnil Hacker v2 **não vai conseguir puxar anúncios de ecommerce/infoproduto/SaaS via API oficial**. Opções:
1. Usar provedor terceirizado pago (Adligator, SearchApi Meta Ad Library, PowerAdSpy, Swipekit) que fazem scraping autorizado e entregam via API própria.
2. Scraping próprio do site Ad Library (risco de TOS, detecção, blocking).
3. Reescopar Stack 1 para monitorar só ads políticos (não é o caso de uso).
→ **Decisão pendente do Moroni antes do integration-engineer começar Stack 1.**

**Rate limits:**
- Marketing API: rate limit por BM tier (Development 60 calls/user/hora, Standard Tier 9000 calls/hora, Advanced Tier muito maior). BUC (Business Use Case) rate limits separados — cuidar de bursting.
- Ad Library API: **200 calls/hora** — muito restritivo para varredura larga.

**Business Verification:** **não é** pré-requisito para Standard Access em contas próprias. Só vira pré-requisito quando a gente pedir Advanced Access (operar contas de terceiros). Leva 3-5 dias úteis — iniciar agora em paralelo se sabemos que vamos escalar para clientes.

**Data Use Checkup:** renovação **anual obrigatória**. Se esquecer, todas as APIs param. Colocar lembrete no calendário do Moroni a cada 11 meses.

**LGPD/Brasil:** ao usar CAPI, todos os eventos com PII (email, phone, IP) devem ser hasheados SHA-256 antes de enviar — Meta rejeita raw PII. Documentar em base legal (execução de contrato ou legítimo interesse) antes de ligar em produção.

**App Secret:** nunca expor em client-side. Guardar só em backend/edge functions.

**Token rotation:** mesmo System User tokens "sem expiração" podem ser invalidados por mudança de senha do dono, mudança de permissions, ou revogação manual. Ter fallback e alerta.

---

## 10. Links Oficiais

- [Marketing API — Authorization](https://developers.facebook.com/docs/marketing-api/get-started/authorization/)
- [Permissions Reference — Graph API](https://developers.facebook.com/docs/permissions/)
- [Create an App — App Use Cases](https://developers.facebook.com/docs/development/create-an-app/)
- [Business Management — System Users Overview](https://developers.facebook.com/docs/business-management-apis/system-users/overview/)
- [Access Token Guide](https://developers.facebook.com/docs/facebook-login/guides/access-tokens/)
- [Generate Access Token for System User](https://developers.facebook.com/docs/marketing-api/collaborative-ads/managed-partner-ads/api-guide/prerequisites/generate-access-token-system-user/)
- [Conversions API — Get Started](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started/)
- [Meta Ad Library API (public page)](https://www.facebook.com/ads/library/api)
- [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
- [Access Token Debugger](https://developers.facebook.com/tools/debug/accesstoken/)
- [Business Manager](https://business.facebook.com/)
- [App Dashboard — REIS IA App](https://developers.facebook.com/apps/2160072261434114/)
