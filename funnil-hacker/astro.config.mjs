// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: vercel({
    maxDuration: 60,
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // Don't bundle playwright — it's optional and huge
      external: ['playwright', 'whois-json'],
    },
  },
});
