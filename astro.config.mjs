import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwind from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://kathiago.ch',
  trailingSlash: 'always',
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwind()],
  },
  output: 'static',
  server: {
    port: 3000,
    host: true,
  },
});
