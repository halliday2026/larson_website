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

## The contact form

Posts to [Formspree](https://formspree.io) — a static host can't process a
form itself. The endpoint is a plain constant in `src/data/content.ts`
(`contact.formEndpoint`), not an environment variable: a Formspree form ID
isn't a secret, it's visible in the page source of any site that uses one.

To point it at a different Formspree form, edit that one line. In Formspree's
dashboard, turn **off reCAPTCHA** under Settings → Spam protection — this form
submits via `fetch`, which doesn't send a captcha token, so leaving it on would
make every real submission fail silently.

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
