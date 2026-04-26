# Meta Ad Library — Estratégia Funnil Hacker v2
*Decision doc — 2026-04-14*

## Contexto do problema

Funnil Hacker v2 Stack 1 (Inteligência Competitiva) precisa de dossiê de anúncios ativos de concorrentes. Pesquisa de 2026-04-14 confirmou que a **API oficial do Meta Ad Library só retorna ads políticos e de "social issues" globalmente, mais todos os tipos dentro da UE/UK (DSA)**. Ads comerciais de infoproduto, ecommerce, SaaS e high-ticket no Brasil/US **não são acessíveis via API oficial**. A UI pública `facebook.com/ads/library` mostra tudo, mas não expõe API.

Três caminhos avaliados: (A) provedor terceiro, (B) scraping próprio com Playwright, (C) reescopar Stack 1.

---

## Avaliação dos 3 caminhos

### A. Provedor terceiro

- **Viabilidade legal / TOS**: Provedor assume o risco. Para uso interno do Funnil Hacker como ferramenta de inteligência, é o caminho mais limpo juridicamente.
- **Qualidade do dado**: Alta e estruturada. GraphQL interceptado, criativo, copy, datas, spend faixa (UE/UK), país, plataforma. Já normalizado.
- **Esforço de implementação**: Baixo. Fetch HTTP + mapper. 1-2 dias.
- **Manutenibilidade**: Alta. Provedor mantém o scraper.
- **Risco**: Dependência, mudança de preço, provedor pode morrer.

**Provedores concretos avaliados (preços 2026)**:

| Provedor | Preço entrada | Modelo | Notas |
|---|---|---|---|
| **Apify — Facebook Ads Library Scraper** | **$5 free/mês → ~860 ads/mês grátis; depois $5/1000 ads** | PPR | Múltiplos actors competindo, alguns a $0.20/1000. **Melhor custo-benefício.** |
| SearchAPI.io Meta Ad Library | $40/mês entrada (SERP geral) | Pay-per-request | Sem pricing específico público do endpoint Meta. |
| Foreplay Spyder | $175/mo (Workflow) — $59/mo Basic sem Spyder | SaaS UI + API | API nova, caro pra uso programático. |
| PowerAdSpy | $69-279/mo | SaaS UI | Sem free tier. Focado UI, API fraca. |
| Anstrex | $89.99/mo | SaaS UI | Sem free tier. Focado native. |
| Adligator | Free 5 searches/dia | SaaS UI | Grátis é inviável pra volume. |

### B. Scraping próprio (Playwright)

- **Viabilidade legal / TOS**: Cinza. Viola ToS do Facebook, mas Ad Library é **público sem login** e jurisprudência (hiQ v LinkedIn) protege scraping de dado público. Uso interno reduz exposição.
- **Qualidade do dado**: Alta se interceptar GraphQL (padrão confirmado em 2026). Parsing HTML é frágil.
- **Esforço**: Médio-alto. 5-8 dias pra versão resiliente.
- **Manutenibilidade**: Baixa. Meta muda WAF e DOM; quebra recorrente. Precisa de proxies residenciais ($50-100/mo) pois datacenter IPs são bloqueados. Playwright JA3 fingerprint vaza — precisa `playwright-stealth` + rotação.
- **Risco**: Alto. Scraperly classifica Facebook 5/5 "Very Difficult" em 2026. WAF custom + detecção agressiva. Blow-up silencioso possível.

### C. Reescopar Stack 1

- **Viabilidade**: 100%. Foca em BuiltWith/Wappalyzer (tech stack), WHOIS/DNS, landing pages via fetch, SimilarWeb API (tráfego), headers/pixels.
- **Qualidade**: Stack 1 perde o pilar mais sedutor pro cliente (ver anúncios do concorrente). Vira "raio-X técnico" sem "o que ele está vendendo agora".
- **Esforço**: Baixo. Já faz parte do escopo.
- **Risco**: Produto menos diferenciado. Moroni já vendeu "dossiê de anúncios" no conceito.

---

## Recomendação

**OPÇÃO A — Apify Facebook Ads Library Scraper (actor oficial `apify/facebook-ads-scraper` ou alternativa mais barata `curious_coder/facebook-ads-library-scraper`)**.

**Justificativa**:
1. **Free tier real**: $5/mês de credit grátis = ~860-1000 ads/mês. Suficiente pra dev, validação e primeiros clientes.
2. **Escala linear previsível**: $5/1000 ads no plano Starter ($49/mo, 7800 ads). Para um Funnil Hacker gerando 10 dossiês/mês com ~100 ads cada = 1000 ads/mês = **dentro do free tier**.
3. **Zero manutenção de scraper**: Apify mantém o actor. Meta muda WAF, eles resolvem.
4. **Legal limpo**: Apify assume o risco. Funnil Hacker vira cliente, não scraper.
5. **Time-to-market 2 dias** vs 5-8 dias do scraping próprio que vai quebrar.
6. **Evita o buraco do Playwright em 2026**: Facebook = 5/5 difficulty, exige residential proxies ($50-100/mo), stealth patches constantes, e ainda assim blow-ups.

**Matematicamente**: $5/1000 ads do Apify < $50 proxy + 40h dev + manutenção recorrente do scraping próprio. Mesmo a 10x o volume atual, Apify custa $50/mo — menos que só os proxies da opção B.

## Fallback

**OPÇÃO C (reescopar)** se Apify actor degradar ou Moroni decidir não terceirizar infra crítica. Stack 1 mantém valor via tech stack + landing page + tráfego, com "anúncios" marcado como feature futura.

**NÃO recomendado como fallback: Opção B**. Se A falhar, B provavelmente também está falhando (mesma fonte, mesmo WAF). Opção B só faz sentido se houver equipe dedicada a manter o scraper — não é o caso.

## Sketch de implementação (caminho A)

Arquivos a criar em `funnil-hacker/`:

```
src/lib/integrations/apify-meta-ads.ts   # client: callActor, pollRun, fetchDataset
src/lib/integrations/apify-meta-ads.types.ts  # MetaAdRecord, normalized shape
src/pages/api/intel/meta-ads.ts          # POST {pageUrl|pageId} → dossie
src/lib/cache/meta-ads-cache.ts          # Supabase cache 24h por pageId
supabase/migrations/NNN_meta_ads_cache.sql  # tabela meta_ads_cache
.env.example                             # APIFY_TOKEN=
```

**Fluxo**: `pageUrl → extract pageId → checkCache(24h) → if miss: Apify run → poll → dataset → normalize → save cache → return`. Dedupe no `ad_archive_id`, TTL 24h, rate limit por cliente via Supabase.

**Esforço**: 2 dias dev + 0.5 dia testes.

## Decisões pendentes para o Moroni

- [ ] Aprovar Opção A (Apify) como caminho oficial Stack 1
- [ ] Criar conta Apify e gerar `APIFY_TOKEN` (free tier, sem cartão)
- [ ] Confirmar volume esperado por cliente/mês pra validar free tier vs Starter
- [ ] Decidir se dossiê inclui só ads ativos ou histórico (afeta cota)
- [ ] Autorizar `integration-engineer` a iniciar implementação do client Apify

## Sources

- [Meta Transparency — Ad Library tools](https://transparency.meta.com/researchtools/ad-library-tools/)
- [adlibrary.com — Facebook Ad Library API Guide 2026](https://adlibrary.com/guides/facebook-ad-library-api)
- [Apify — facebook-ads-scraper](https://apify.com/apify/facebook-ads-scraper)
- [Apify pricing 2026](https://use-apify.com/docs/what-is-apify/apify-pricing)
- [SearchAPI.io — Meta Ad Library API](https://www.searchapi.io/meta-ad-library-api)
- [Foreplay pricing](https://www.foreplay.co/pricing)
- [PowerAdSpy pricing](https://poweradspy.com/pricing/)
- [Scraperly — How to scrape Facebook 2026](https://scraperly.com/scrape/facebook)
- [AlterLab — Playwright anti-bot 2026](https://alterlab.io/blog/playwright-anti-bot-detection-what-actually-works-in-2026)
- [adlibrary.com — Best Ad Spy APIs 2026](https://adlibrary.com/guides/best-ad-spy-api)
