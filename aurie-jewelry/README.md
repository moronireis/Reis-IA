# Auriê — Jewelry E-commerce Demo

Premium jewelry storefront demo built with Astro + Tailwind CSS v4 + a single React island for the cart drawer.

## Stack

- Astro 6 (static output)
- Tailwind CSS v4 (`@theme` tokens)
- React 19 island (cart drawer w/ `localStorage` persistence)
- Cormorant Garamond (display) + Inter (UI) via Google Fonts
- Unsplash for product photography

## Pages

- `/` — Home: split-hero, marquee, 3 collections, featured products, story, atelier CTA
- `/colecao` — Catalog with category + collection filters
- `/produto/[slug]` — PDP with gallery, sticky info, sizing (rings), accordion, related
- `/atelier` — Concierge / private appointment form
- `/historia` — Brand timeline manifesto

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output to dist/
```

## Deploy

```bash
vercel deploy --prod
```
