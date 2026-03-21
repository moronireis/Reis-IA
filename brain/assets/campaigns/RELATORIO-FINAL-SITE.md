# Copy Squad — Relatório Final do Site

Last updated: 2026-03-17

---

## Campanhas Executadas

| # | Campanha | ICP | Pipeline | Score | Status |
|---|----------|-----|----------|-------|--------|
| 1 | **Builder CEO** | CEO/founder R$5-50M, queimado por AI | CMO → Copy → Humanizer → Reviewer → Corrections | 8.6/10 | APPROVED v1.0 |
| 2 | **Builder Agencies** | Dono de agência R$1-15M, quer vender AI | CMO → Copy → Humanizer → Reviewer | 8.5/10 | APPROVED v1.0 |
| 3 | **Homepage** | Misto — todos os ICPs | CMO → Copy → Humanizer → Reviewer | 8.7/10 | APPROVED v1.0 |
| 4 | **Systems** | CEO/COO R$5-100M, quer resultado sem envolvimento técnico | CMO → Copy → Humanizer → Reviewer | 8.7/10 | APPROVED v1.0 |

**Score médio geral: 8.6/10**

---

## Arquivos Produzidos

### Builder CEO (ICP: CEOs R$5-50M)
| Arquivo | Path |
|---------|------|
| CMO Briefing | `brain/assets/campaigns/builder-landing/01-briefing-cmo.md` |
| Copy Raw | `brain/assets/campaigns/builder-landing/02-copy-raw.md` |
| Copy Humanized | `brain/assets/campaigns/builder-landing/03-copy-humanized.md` |
| Review | `brain/assets/campaigns/builder-landing/04-review.md` |
| **FINAL** | `brain/assets/campaigns/builder-landing/FINAL-builder-landing-copy.md` |
| Backup | `brain/assets/campaigns/builder-landing-ceo-backup/` |

### Builder Agencies (ICP: Donos de agência)
| Arquivo | Path |
|---------|------|
| CMO Briefing | `brain/assets/campaigns/builder-agencies/01-briefing-cmo.md` |
| Copy Raw | `brain/assets/campaigns/builder-agencies/02-copy-raw.md` |
| Copy Humanized | `brain/assets/campaigns/builder-agencies/03-copy-humanized.md` |
| Review | `brain/assets/campaigns/builder-agencies/04-review.md` |
| **FINAL** | `brain/assets/campaigns/builder-agencies/FINAL-builder-agencies-copy.md` |

### Homepage (ICP: Misto)
| Arquivo | Path |
|---------|------|
| CMO Briefing | `brain/assets/campaigns/homepage/01-briefing-cmo.md` |
| Copy Raw | `brain/assets/campaigns/homepage/02-copy-raw.md` |
| Copy Humanized | `brain/assets/campaigns/homepage/03-copy-humanized.md` |
| Review | `brain/assets/campaigns/homepage/04-review.md` |
| **FINAL** | `brain/assets/campaigns/homepage/FINAL-homepage-copy.md` |

### Systems (ICP: CEO/COO delegação)
| Arquivo | Path |
|---------|------|
| CMO Briefing | `brain/assets/campaigns/systems/01-briefing-cmo.md` |
| Copy Raw | `brain/assets/campaigns/systems/02-copy-raw.md` |
| Copy Humanized | `brain/assets/campaigns/systems/03-copy-humanized.md` |
| Review | `brain/assets/campaigns/systems/04-review.md` |
| **FINAL** | `brain/assets/campaigns/systems/FINAL-systems-copy.md` |

### Outros
| Arquivo | Path |
|---------|------|
| Site Copy Audit | `brain/assets/campaigns/site-copy-audit.md` |
| Este relatório | `brain/assets/campaigns/RELATORIO-FINAL-SITE.md` |

**Total: 21 arquivos produzidos** (4 FINALs + 16 intermediários + 1 audit)

---

## Itens Pendentes de Ação Humana

### BLOQUEANTES (antes de publicar)

1. **Case studies reais**: Todos os testimonials e case studies são placeholders. Prioridade: substituir com dados reais de clientes do Builder e Systems.
   - Builder CEO Email 3: case study R$18M → precisa de caso real
   - Builder Agencies: [DEPOIMENTO] placeholders → precisam de depoimentos reais
   - Systems: cenários de ROI → confirmar com dados reais de implementação

2. **Cal.com**: Configurar conta real e substituir placeholder no `/agendar`

3. **Formspree**: Configurar form ID real no `/aplicar`

4. **WhatsApp**: Inserir número real nos CTAs de WhatsApp

### IMPORTANTES (antes de escalar tráfego)

5. **Foto do Moroni**: Placeholder na homepage e builder precisa de foto profissional

6. **Credenciais do Moroni**: Badges de credencial na homepage são placeholders

7. **Membros da comunidade**: Avatares são placeholders — substituir com membros reais ou remover seção

8. **Datas de cohort**: "Abril 2026" no banner precisa ser mantido atualizado

### DECISÕES DE NEGÓCIO

9. **Builder 2 versões**: Decidir se ambas (Agências + CEO) terão páginas separadas ou se uma será priorizada. Recomendação: `/builder` para agências (ICP primário), `/builder-ceo` ou `/mentoria` para CEOs.

10. **Partners e Network**: Páginas não existem ainda. Copy não foi produzida neste ciclo. Produzir quando estiverem prontos para lançar.

11. **Accent color no código**: O código atual usa gold (#C9A84C), o design system updated usa blue (#4A90FF). A copy é agnóstica — decisão de design.

12. **Chess motif no código**: CLAUDE.md diz "permanently discarded", mas está implementado. Decisão necessária antes do redesign.

---

## Diferenciação Entre Páginas

| Dimensão | Homepage | Builder (Agências) | Builder (CEO) | Systems |
|----------|----------|-------------------|---------------|---------|
| **Promessa** | "AI é estratégia de receita" | "Nova linha de receita com AI" | "Clareza e controle sobre AI" | "Resultado sem envolvimento técnico" |
| **Tom** | Arquitetural, elevado | Operacional, direto | Consultivo, peer | Confiante, Porsche-level |
| **ICP** | Todos | Dono de agência | CEO R$5-50M | CEO/COO R$5-100M |
| **Vende** | Posicionamento + routing | Autonomia + capacidade | Clareza + framework | Delegação + resultado |
| **CTA principal** | /agendar, /builder, /systems | /aplicar | /agendar | /agendar (AI Revenue Audit) |
| **Inimigo** | Prototype Graveyard (geral) | Commoditization + Graveyard | Graveyard (falha própria) | Graveyard (falha de vendor) |

---

## Próximos Passos Recomendados

### Imediato
1. Revisar os 4 FINALs e aprovar para implementação
2. Definir rota do Builder CEO (/builder-ceo ou /mentoria)
3. Resolver decisão de accent color (gold vs blue) antes de implementar

### Curto Prazo
4. Implementar as copys no novo design (Dev Agent)
5. Configurar Cal.com, Formspree, WhatsApp com dados reais
6. Produzir foto profissional do Moroni
7. Coletar primeiros depoimentos/case studies

### Médio Prazo
8. Produzir copy para Partners e Network via Copy Squad
9. Testes A/B com variações de headline (cada FINAL tem 5+ variações)
10. Configurar email nurture sequences (3 emails por página)
11. Substituir todos os placeholders com dados reais

---

## Copy Squad Pipeline — Performance

| Métrica | Valor |
|---------|-------|
| Campanhas executadas | 4 |
| Taxa de aprovação na 1ª rodada | 75% (3/4 — Builder CEO precisou de 1 revisão) |
| Score médio | 8.6/10 |
| Palavras proibidas no output final | 0 |
| SaaS patterns no output final | 0 |
| CTAs corretos (/agendar ou /aplicar) | 100% |

O Copy Squad pipeline está operacional e validado para futuras campanhas.
