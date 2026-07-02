// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'server',
  security: {
    checkOrigin: false,
  },
  // 60s: teto seguro em qualquer plano Vercel; o worker de disparo usa
  // orçamento de 40s por lote e se re-invoca até esvaziar a fila
  adapter: vercel({ maxDuration: 60 }),
  integrations: [react()],
});
