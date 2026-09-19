// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project site: https://halliday2026.github.io/larson_website
export default defineConfig({
  site: 'https://halliday2026.github.io',
  base: '/larson_website',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
