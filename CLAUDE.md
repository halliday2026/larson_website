# Larson Safety — project notes

Static Astro + Tailwind port of a WordPress/Elementor site, deployed to GitHub
Pages. **Read `PORTING-NOTES.md` before changing anything visual.**

## Stack

- **Astro 7** (static output), **Tailwind CSS 4** via `@tailwindcss/vite`
- Tailwind v4 is CSS-first: tokens live in `@theme` in `src/styles/global.css`.
  There is no `tailwind.config.js` and one should not be added.
- Fonts self-hosted via `@fontsource-variable/{inter,inter-tight,roboto}`
- `site: 'https://larsonsafe.com'`, `base: '/'` — the site has a custom domain
  (`public/CNAME`) and is served from the root, not a GitHub Pages sub-path.
  Always build asset URLs from `import.meta.env.BASE_URL`, never a bare
  `/path` — this is what let the base flip from `/larson_website` to `/`
  without touching component code. `site`, `base` and `public/CNAME` must all
  agree; a mismatch here is what broke the site's CSS/images on 2026-09-19
  (see PORTING-NOTES.md).

## Non-negotiable: fidelity to the original

Values in components are **measured from the original's generated Elementor
CSS**, not chosen. Before "tidying" a number, check `PORTING-NOTES.md` §4 — the
8px heading margins, the Roboto headings, the 4%-opacity hero image and the
last stats-cell divider are all faithful reproductions.

Verify any visual change against the live site with Playwright at 1440×900,
1024×900 and 390×844. The bar met at handover: desktop full-page height exact,
tablet and mobile within 2px, every section within 1px.

## Breakpoint mapping

Elementor is max-width based; Tailwind is min-width based. They are aligned so
each Elementor tier maps to exactly one prefix:

| Elementor | Range | Prefix |
|---|---|---|
| Mobile | ≤ 767px | *(none)* |
| Tablet | 768–1024px | `md:` |
| Desktop | ≥ 1025px | `lg:` |

`--breakpoint-*: initial` clears Tailwind's defaults first, so `sm:`/`xl:`/`2xl:`
do not exist. Don't reintroduce them.

**The trap:** when the source CSS has only a `@media(max-width:767px)` override,
the base value applies from **tablet up** — use `md:`, not `lg:`. Use `lg:` only
when there is also a `max-width:1024px` override. Several bugs during the port
came from getting this backwards.

## Conventions

- **All copy lives in `src/data/content.ts`.** Components loop over it; no
  strings in markup.
- **Icons** are inline SVG path data in `src/icons.ts`, rendered by
  `Icon.astro`. Add new ones there rather than importing an icon library.
- One component per page section, composed in `src/pages/index.astro`.
- Arbitrary Tailwind values (`text-[15px]`, `leading-[26px]`) are expected here —
  they are the original's real numbers. Prefer them over approximating with
  scale steps.

## Commands

```sh
npm run dev        # http://localhost:4321/
npm run build
npm run preview    # serve dist/ — use for visual verification
npx astro check    # must stay at 0 errors
```

## Contact form

Static host, so no server handler. `ContactForm.astro` POSTs to
`contact.formEndpoint` (`src/data/content.ts`) — a plain constant, not an env
var. A Formspree endpoint is not a secret (it's in the page's HTML source the
moment the form renders), so don't reintroduce env-var/CI-variable indirection
for it. To point at a different form, edit that one line.

## Deployment

`.github/workflows/deploy.yml` builds and publishes on push to `main`.
*Settings → Pages → Source* must be **GitHub Actions**.
