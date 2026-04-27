# Deploy — AGENTES [IA] Members Area

> **Goal**: Liberar a área de membros do produto **AGENTES [IA] (R$47, Ticto)** rodando dentro do `reis-ia-hub`, no subdomínio `area.agentesia.moronireis.com.br`, com isolamento total entre comprador low-ticket e clientes high-ticket.
>
> **Branch**: `claude/low-ticket-ai-agents-NLWih`
> **Last updated**: 2026-04-26

---

## ⚡ Atalho — bridge enquanto o subdomínio não tá pronto

A Hub já está deployada em `https://reis-ia-hub.vercel.app` e `https://hub-reisia.vercel.app`. Você pode subir o produto na Ticto AGORA usando essa URL e trocar pra `area.agentesia.moronireis.com.br` depois que o DNS propagar — sem mexer em código.

| Campo na Ticto | Valor antes do DNS | Valor depois do DNS |
|---|---|---|
| URL do webhook | `https://reis-ia-hub.vercel.app/api/webhook/ticto` | `https://area.agentesia.moronireis.com.br/api/webhook/ticto` |
| URL de acesso (área de membros) | `https://reis-ia-hub.vercel.app/login` | `https://area.agentesia.moronireis.com.br/login` |

> A migração de URL é não-disruptiva — ambos os hosts servem o mesmo deploy.

---

## TL;DR (6 passos sequenciais)

1. Rodar a migration `supabase/migration-agentes-ia.sql` no Supabase
2. Definir 5 env vars no Vercel + redeploy
3. (opcional) Apontar DNS `area.agentesia.moronireis.com.br` → Vercel
4. Cadastrar o produto na Ticto + configurar webhook
5. Criar o usuário de compliance (via `/register`) + rodar `seed-compliance-ticto.sql`
6. `npm run smoke-test:ticto` (5 testes automatizados)

---

## 1. Rodar a migration no Supabase

```
arquivo: reis-ia-hub/supabase/migration-agentes-ia.sql
```

Abrir Supabase Dashboard → SQL Editor → colar o conteúdo do arquivo → **Run**.

A migration é **idempotente** (usa `if not exists` / `do $$` blocks) — pode ser rodada múltiplas vezes sem efeito colateral.

### O que ela cria

| Objeto | Tipo | Função |
|---|---|---|
| `entitlements` | tabela | Grant per-product de acesso (low-ticket, comunidade, mentoria) |
| `webhook_events` | tabela | Audit log + dedup de webhooks Ticto/Hotmart/Kiwify |
| `spaces` | tabela | (Idempotente — só cria se ainda não existir em produção) |
| `courses.slug`, `courses.product_code` | colunas | URL slug + ligação curso → produto |
| `spaces.access_level` | coluna | Gate de acesso por entitlement |
| `has_entitlement(p_product_code)` | função SQL | `true` se o usuário logado tem o produto |
| `provision_ticto_purchase(...)` | função SQL | Idempotente — chamada pelo webhook |
| `revoke_ticto_purchase(...)` | função SQL | Idempotente — refund / chargeback / cancel |
| RLS em `courses`, `lessons`, `spaces`, `posts` | policies | Filtro por entitlement |
| Course seed | row | "AGENTES [IA] — Seu Time Completo de Marketing com IA" + 4 lessons (status: draft) |
| Space seed | row | "AGENTES [IA]" community space (slug `agentes-ia`) |

### Verificação pós-migration

```sql
-- Deve retornar 1 curso
select id, slug, product_code, access_level
from public.courses
where slug = 'agentes-ia';

-- Deve retornar 4 lessons em status 'draft'
select sort_order, title, status
from public.lessons
where course_id = (select id from public.courses where slug = 'agentes-ia')
order by sort_order;

-- Deve retornar 1 space
select * from public.spaces where slug = 'agentes-ia';
```

### Acesso administrativo de teste (opcional)

Conceder acesso ao Moroni para validar o fluxo end-to-end:

```sql
insert into public.entitlements (user_id, product_code, source, external_order_id, status)
select id, 'agentes_ia', 'manual', 'admin-test', 'active'
from public.profiles
where email = 'moronireis@gmail.com'
on conflict (user_id, product_code, external_order_id) do nothing;
```

---

## 2. Configurar env vars no Vercel

Vercel Dashboard → projeto `reis-ia-hub` → Settings → Environment Variables. Marcar **Production** e **Preview**.

| Var | Valor | Onde obter |
|---|---|---|
| `RESEND_API_KEY` | `re_xxx` | Resend Dashboard → API Keys (já deve existir — usado em `email.ts`) |
| `TICTO_WEBHOOK_TOKEN` | string aleatória ≥ 32 chars | Gerar: `openssl rand -hex 32` |
| `TICTO_WEBHOOK_SECRET` | string aleatória ≥ 32 chars | Gerar: `openssl rand -hex 32` (use SE a Ticto enviar HMAC; senão deixe em branco) |
| `TICTO_PRODUCT_MAP` | `12345=agentes_ia` | Após cadastrar produto na Ticto, usar `<ticto_product_id>=agentes_ia`. Múltiplos produtos: `1=agentes_ia,2=comunidade_497` |
| `AGENTES_IA_AREA_URL` | `https://area.agentesia.moronireis.com.br` | Subdomínio que vamos configurar abaixo |

> **Defesa em profundidade**: o webhook aceita autenticação por **token simples** (`X-Webhook-Token` header) OU **HMAC SHA-256** (`X-Ticto-Signature` header). Configure o que a Ticto suportar; se ela suportar HMAC, prefira HMAC (`TICTO_WEBHOOK_SECRET`).

---

## 3. DNS — apontar `area.agentesia.moronireis.com.br` para o Vercel

### a) No Vercel

`reis-ia-hub` → Settings → Domains → **Add** `area.agentesia.moronireis.com.br`. O Vercel vai mostrar um registro CNAME a configurar.

### b) No DNS do domínio `agentesia.moronireis.com.br`

Adicionar:

```
Tipo:   CNAME
Nome:   area
Valor:  cname.vercel-dns.com
TTL:    Auto / 3600
```

Aguardar propagação (~5-15min). Verificar:

```bash
dig +short area.agentesia.moronireis.com.br
```

### c) Verificar branding

Acessar `https://area.agentesia.moronireis.com.br/login` — o middleware detecta o host e setta `Astro.locals.brandContext = 'agentes-ia'`. Comportamento atual: nav ainda usa o shell padrão; o landing `/agentes-ia` é a tela branded.

> **Próxima iteração**: customizar `AppLayout` para condicionalmente trocar logo / título quando `brandContext === 'agentes-ia'`. Hoje o isolamento é **funcional** (RLS) — visualmente a área usa o shell padrão do Hub, o que é seguro.

---

## 4. Cadastrar o produto na Ticto + webhook

### a) Cadastro do produto

Use o dossiê em `brain/strategy/funnel-low-ticket-strategy.md` (versão final entregue na conversa anterior). Resumo:

- **Nome**: AGENTES [IA] — Seu Time Completo de Marketing com IA
- **Preço**: R$ 47 (de R$ 297)
- **Garantia**: 7 dias
- **Capa**: `agent-squad-lp/covers/agentes-ia-cover-1080x1080.png`
- **Descrição**: ver dossiê completo

### b) Webhook na Ticto

Painel Ticto → Configurações → Webhooks → **Novo**:

| Campo | Valor |
|---|---|
| URL | `https://area.agentesia.moronireis.com.br/api/webhook/ticto` |
| Eventos | `purchase.approved`, `purchase.refunded`, `purchase.chargeback`, `purchase.canceled` |
| Header customizado | `X-Webhook-Token: <valor de TICTO_WEBHOOK_TOKEN>` |
| HMAC Secret | `<valor de TICTO_WEBHOOK_SECRET>` (se a Ticto suportar) |

### c) Anotar o `product_id` da Ticto

Após cadastrar, copiar o ID do produto e atualizar `TICTO_PRODUCT_MAP` no Vercel:

```
TICTO_PRODUCT_MAP=<ticto_product_id>=agentes_ia
```

Redeployar o projeto pra refletir a env var nova.

---

## 5. Smoke test (sem precisar de venda real)

### 🚀 Forma rápida: runner automatizado

Roda os 5 testes em sequência (healthcheck + auth 401 + approve + idempotência + refund) em ~3 segundos:

```bash
cd reis-ia-hub
HUB_URL=https://reis-ia-hub.vercel.app \
TICTO_WEBHOOK_TOKEN=<seu-token-ticto> \
TEST_EMAIL=moroni+smoke@moronireis.com.br \
  npm run smoke-test:ticto
```

Saída esperada (✓ verde em cada linha):
```
✓ endpoint reachable    HTTP 200
✓   supabase: ok
✓   course_seeded: true
✓   space_seeded: true
✓   webhook_configured: true
✓   resend_configured: true
✓ returns 401 with bad token
✓ 200 + ok=true                  event=purchase.approved
✓ product_code resolved          code=agentes_ia
✓ entitlement provisioned
✓ replay returns deduplicated:true
✓ 200 + entitlement revoked      revoked_count=1

✓ All smoke tests passed.
```

Depois, rodar a SQL de cleanup que aparece no final do output.

> **Healthcheck público** — também dá pra testar via browser:
> `https://reis-ia-hub.vercel.app/api/health/agentes-ia` retorna JSON com o status de cada peça (Supabase, course seed, space seed, webhook config, Resend config). Esse é o endpoint que a equipe de compliance da Ticto pode usar pra confirmar a integração antes de aprovar o produto.

---

### 🔍 Forma manual (curls individuais)

#### Teste 1 — Webhook fake `purchase.approved`

```bash
curl -X POST https://reis-ia-hub.vercel.app/api/webhook/ticto \
  -H "Content-Type: application/json" \
  -d '{
    "token": "<TICTO_WEBHOOK_TOKEN>",
    "status": "approved",
    "order_id": "test-001",
    "customer": { "name": "Teste Smoke", "email": "moroni+smoke@moronireis.com.br" },
    "items": [{ "product_id": "<ticto_product_id>", "product_name": "AGENTES [IA]" }],
    "payment_method": "pix",
    "total": 47.00
  }'
```

Resposta esperada:

```json
{
  "ok": true,
  "event": "purchase.approved",
  "order_id": "test-001",
  "product_code": "agentes_ia",
  "provisioned": { "entitlement_id": "...", "user_id": "...", "email": "moroni+smoke@moronireis.com.br", "product_code": "agentes_ia" }
}
```

Verificar:

```sql
select * from public.entitlements where external_order_id = 'test-001';
select * from public.webhook_events where external_id = 'test-001';
```

E o email deve chegar em `moroni+smoke@moronireis.com.br` (BCC pra `moronireis@gmail.com`).

### Teste 2 — Idempotência (rodar o mesmo curl 2x)

Resposta esperada na 2ª execução:

```json
{ "ok": true, "deduplicated": true, "event": "purchase.approved", "order_id": "test-001" }
```

### Teste 3 — Refund

```bash
curl -X POST https://area.agentesia.moronireis.com.br/api/webhook/ticto \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Token: <TICTO_WEBHOOK_TOKEN>" \
  -d '{ "event": "purchase.refunded", "order_id": "test-001" }'
```

Verificar entitlement → `status = 'refunded'`, `revoked_at` preenchido.

### Teste 4 — Acesso isolado

1. Logar como o user `moroni+smoke@moronireis.com.br` (clicar no magic link recebido)
2. Confirmar que `/academy` mostra **APENAS** o curso AGENTES [IA]
3. Tentar `/projects`, `/mentoria`, `/vault` → deve redirecionar pra `/dashboard` (já é o comportamento existente do middleware pra role `starter`)
4. Acessar `/community` → deve listar **APENAS** os spaces com `access_level = 'all'` ou `agentes_ia`

### Teste 5 — Reverter o teste

```sql
delete from public.webhook_events where external_id = 'test-001';
delete from public.entitlements where external_order_id = 'test-001';
delete from auth.users where email = 'moroni+smoke@moronireis.com.br';
```

---

## 5.5 Conta de teste para a Compliance Ticto

A Ticto exige login + senha pra equipe de compliance verificar a área de membros antes de aprovar o produto.

### Passo a passo

**1. Registrar o usuário** (você, no browser):

1. Abrir `https://reis-ia-hub.vercel.app/register` (ou `https://area.agentesia.moronireis.com.br/register` se DNS já tá pronto)
2. Preencher:
   - Nome: `Compliance Ticto`
   - Email: `compliance-ticto@moronireis.com.br` (ou outro email seu — o importante é poder receber emails)
   - Senha: gerar forte (anote)
3. Submeter

**2. Conceder o entitlement de acesso** — Supabase → SQL Editor → colar:

```
arquivo: reis-ia-hub/supabase/seed-compliance-ticto.sql
```

(idempotente — pode rodar várias vezes; faz `on conflict do update`)

**3. Preencher o form da Ticto** ("Área de membros via webhook"):

| Campo | Valor |
|---|---|
| Url de acesso | `https://reis-ia-hub.vercel.app/login` (ou subdomínio) |
| Login | `compliance-ticto@moronireis.com.br` |
| Senha | (a senha que você gerou) |

**4. Após aprovação da Ticto** — revogar o acesso do usuário de teste:

```sql
update public.entitlements
set status = 'expired', revoked_at = now()
where external_order_id = 'compliance-ticto-test';
```

---

## 6. Subir as 4 videoaulas

Após confirmar que o webhook funciona, ir em `/admin/academy`:

1. Abrir o curso AGENTES [IA]
2. Para cada uma das 4 lessons (já criadas como `draft`):
   - Adicionar `video_url`
   - Marcar como `published`
3. Salvar

A página detalhe `/academy/<id>` vai mostrar as lessons publicadas.

---

## 7. Arquivos modificados nesta entrega

```
reis-ia-hub/
├── supabase/
│   └── migration-agentes-ia.sql                  ← MIGRATION (rodar manualmente)
├── src/
│   ├── env.d.ts                                  ← novas env vars + brandContext
│   ├── middleware.ts                             ← detecta subdomínio
│   ├── lib/
│   │   └── email-agentes-ia.ts                   ← welcome email branded
│   ├── components/
│   │   └── AgentesIaUpsellCard.tsx               ← upsell Comunidade R$497
│   └── pages/
│       ├── agentes-ia/
│       │   └── index.astro                       ← landing pós-magic-link
│       ├── academy/
│       │   ├── index.astro                       ← lista filtrada por RLS
│       │   └── [id].astro                        ← upsell + entitlement check
│       └── api/webhook/
│           └── ticto.ts                          ← endpoint Ticto
└── DEPLOY-AGENTES-IA.md                          ← este arquivo

agent-squad-lp/covers/
├── agentes-ia-cover-1080x1080.png                ← capa Ticto
└── agentes-ia-cover-1080x1350.png                ← capa Mozart member area
```

---

## 8. Checklist final

```
[ ] Migration aplicada no Supabase
[ ] 5 env vars setadas no Vercel (Production + Preview)
[ ] Subdomínio area.agentesia.moronireis.com.br apontando para Vercel
[ ] Produto cadastrado na Ticto + webhook configurado
[ ] TICTO_PRODUCT_MAP atualizado com o product_id real
[ ] Smoke test 1-5 OK
[ ] 4 videoaulas subidas e publicadas em /admin/academy
[ ] Email "moroni+smoke@moronireis.com.br" deletado após teste
[ ] Primeira venda real validada
```

---

## 9. Roadmap depois de live

| Item | Prioridade | Complexidade |
|---|---|---|
| Customizar `AppLayout` quando `brandContext === 'agentes-ia'` (nav reduzida + logo AGENTES [IA]) | média | 4h |
| Página de pedidos do usuário (`/agentes-ia/pedidos`) | baixa | 4h |
| Email de "abandono de aula" (não conclui em 7 dias) | média | 3h |
| Dashboard admin de vendas Ticto (consumindo `webhook_events`) | média | 1 dia |
| Upsell Comunidade R$497 — checkout próprio integrado (vs link externo) | alta | 2 dias |
| Suporte multi-produto (Hotmart, Kiwify) reutilizando `entitlements` | baixa | 1 dia cada |
