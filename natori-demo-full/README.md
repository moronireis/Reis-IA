# Natori Foods — Competitive Intelligence Platform

Sales demo for Kaio Heirich (Natori Foods). Built to close R$10K deal with u4digital.

## Stack

- Astro 6 (static output)
- Tailwind CSS v4 (CSS-first, via @tailwindcss/vite)
- Inter font (Google Fonts)
- All data mocked in `src/data/*.json` — no backend, no real APIs

## Run locally

```bash
npm install
npm run dev
```

Dev server: http://localhost:4321

## Pages

| Route | Title | Description |
|---|---|---|
| `/` | Login | Pre-filled credentials, animates to /dashboard |
| `/dashboard` | Dashboard | Hero metric, marketplace cards, KPIs, live SVG chart, activity feed |
| `/buybox` | Buy Box Monitor | Real-time table with 7 Curva A SKUs, live loss counter, recovery modal |
| `/diagnostico` | Diagnostico IA | AI query interface with scripted diagnosis answer and typing animation |
| `/whatsapp` | Alertas WhatsApp | Config panel + iPhone mockup with interactive WhatsApp messages |
| `/relatorios` | Relatorios | Weekly executive report card with historical list |

## Demo credentials

- Email: `kaio@natorifoods.com.br`
- Password: pre-filled (dots)

## Build for Vercel

```bash
npm run build
```

Output goes to `dist/`. Deploy with:

```bash
vercel --prod
```

No `vercel.json` needed — Astro static output is auto-detected.

## Data files

- `src/data/products.json` — 7 real Curva A SKUs with pricing and Buy Box status
- `src/data/activity.json` — 6 activity feed events
- `src/data/report.json` — weekly report metrics and chart data

## Key demo moments

1. Dashboard — "R$ 815.000 sob monitoramento" hero + live update counter ticking every second
2. Buy Box — Tare Sakura row pulses red with climbing live loss counter (R$/s)
3. Recovery modal — AI suggests R$24,80 with ROI estimate, apply button closes with success toast
4. Diagnostico — type any query or click a chip, 1.5s typing animation, then full AI answer slides in
5. WhatsApp — iPhone mockup with interactive Sim/Nao buttons and test alert sends live message
6. Relatorios — executive PDF report card with metrics, top movers, and 5 recommendations
