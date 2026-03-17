---
name: PT-BR localization rules for reis-ia-website
description: Confirmed decisions for localizing all user-facing copy to Brazilian Portuguese
type: project
---

**All pages are in PT-BR.** The site was fully localized from English to Brazilian Portuguese as of 2026-03-12.

**Why:** Target audience is the Brazilian market. Content should read as if originally written by a skilled Brazilian copywriter.

## Lang attribute
`<html lang="pt-BR">` in `src/layouts/MainLayout.astro`

## Terms kept in English (Brazilian tech/business convention)
- Brand names: Reis IA, Builder, Systems, Partners, Network
- Tech/business terms: AI, SaaS, ROI, sprint, workshop, Revenue-First, revenue share, framework, CTA, lead, retainer, onboarding, feedback, KPI
- Product names: WhatsApp, HubSpot, Salesforce, Pipedrive, ChatGPT, Make.com, n8n, LinkedIn, Prototype Graveyard (with PT explanation on first use)

## "Você" form (not "tu")
Direct but professional. Action-oriented CTAs.

## Key CTA translations
- "Book a Free AI Revenue Assessment" → "Agende sua Avaliação de Revenue com AI Gratuita"
- "Apply for Builder / Apply Now" → "Candidate-se ao Builder / Candidate-se Agora"
- "Book a Call" → "Agende uma Conversa"
- "Learn More" → "Saiba Mais"
- "Book Your AI Revenue Audit" → "Agende seu AI Revenue Audit"
- "See How It Works" → "Veja Como Funciona"

## Placeholder translation pattern
Translate description text inside brackets but keep the [PLACEHOLDER] tag format:
- `[PLACEHOLDER: Photo of Moroni Reis]` → `[PLACEHOLDER: Foto profissional de Moroni Reis]`
- `[TESTIMONIAL — placeholder quote text]` → `[DEPOIMENTO — texto do depoimento placeholder]`
- Keep `[METRIC]`, `[DATE]` (short tags) as-is or localize to `[DATA]`

## Footer section headings
- "Ecosystem" → "Ecossistema"
- "Resources" → "Recursos"
- "Connect" → "Redes"
- "All rights reserved" → "Todos os direitos reservados"
- "Privacy Policy" → "Política de Privacidade"
- "Terms" → "Termos de Uso"
