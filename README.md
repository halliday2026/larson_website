# Larson Safety LLC — static site

Static [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com)
port of the Larson Safety WordPress site, built to deploy to GitHub Pages.

Deploys to **https://halliday2026.github.io/larson_website**

> Read [PORTING-NOTES.md](PORTING-NOTES.md) before changing anything visual. It
> records which oddities are faithful reproductions of the original and which
> are deliberate improvements — several "obvious bugs" are load-bearing.

## Quick start

```sh
npm install
npm run dev          # http://localhost:4321/larson_website/
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve `dist/` locally — use this for visual checks |
| `npx astro check` | Type-check `.astro` files |

## Before you deploy: the contact form

The form needs a third-party endpoint; a static host cannot process it. Until
one is configured the form renders **disabled**, showing visitors the phone
number and email instead.

1. Create a form at [Formspree](https://formspree.io) (or any service that
   accepts a `POST` of `FormData` and returns JSON).
2. Add `PUBLIC_FORM_ENDPOINT` as a repository **variable** under
   *Settings → Secrets and variables → Actions → Variables*.
3. For local development, copy `.env.example` to `.env` and set the same value.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`.

**One-time setup:** in *Settings → Pages*, set **Source** to **GitHub Actions**.
Without this the workflow succeeds but nothing is published.

If you move to a custom domain, update `site` and `base` in `astro.config.mjs`
(`base` becomes `'/'`) and add a `CNAME` file to `public/`.

## How it's organised

```
src/
  data/content.ts      All page copy — single source of truth
  icons.ts             Inlined SVG path data
  layouts/Layout.astro Document shell, meta, fonts
  components/          One component per section of the page
  styles/global.css    Design tokens (@theme) + shared utilities
public/img/            Images referenced from CSS backgrounds
src/assets/            Images optimised at build time by astro:assets
```

Copy lives in `src/data/content.ts`, never in markup — editing the site's words
should not mean touching a component.

## Breakpoints

The original is an Elementor site, whose breakpoints are max-width based.
Tailwind is min-width based, so they are mapped to line up exactly:

| Elementor | Range | Tailwind prefix |
|---|---|---|
| Mobile | ≤ 767px | *(unprefixed)* |
| Tablet | 768–1024px | `md:` |
| Desktop | ≥ 1025px | `lg:` |

`sm:`, `xl:` and `2xl:` are removed deliberately — three breakpoints is what the
design has, and adding more invites values that match nothing in the original.
