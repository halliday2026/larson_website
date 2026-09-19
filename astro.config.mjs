// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Custom domain (see public/CNAME) — served from the root, not a sub-path.
export default defineConfig({
  site: 'https://larsonsafe.com',
  base: '/',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
