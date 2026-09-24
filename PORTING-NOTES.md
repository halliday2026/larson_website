# Porting notes

This site is a static Astro + Tailwind port of the WordPress original at
`https://wlarson12.sardaritskillshare.com/` (WordPress 7.1.1, Elementor 4.2.4 /
Elementor Pro 4.2.3, Hello Elementor 3.5.1).

Everything below is a deliberate decision, not an oversight.

---

## 1. Things that depended on server-side WordPress

GitHub Pages serves static files only. These could not come across as-is.

### Contact form — now wired to Formspree

The original used an **Elementor Pro form widget** that POSTed to WordPress
`admin-ajax.php`. That handler does not exist on a static host.

The replacement keeps the same fields, labels, required flags and submit copy,
but posts to Formspree via `fetch()`. The endpoint is a plain constant —
`contact.formEndpoint` in `src/data/content.ts`, currently
`https://formspree.io/f/xyezzqgv` — not an environment variable. A Formspree
form ID is not a secret: it's visible in the HTML source of any page that
renders the form, so there's nothing to protect by hiding it in CI config.
(An earlier revision of this port routed it through `PUBLIC_FORM_ENDPOINT` and
a GitHub Actions repository variable, which added a manual setup step for no
security benefit. That's been removed.)

To point the form at a different Formspree form, change that one line.

**Turn off reCAPTCHA** in Formspree's dashboard (Settings → Spam protection).
This form submits via `fetch`, which sends no captcha token, so a form with
reCAPTCHA enabled will reject every real submission — silently, from the
visitor's point of view, since the JS shows a generic error either way.

Submissions go to Formspree, not WordPress — nobody will find them in a WP
dashboard, and they're subject to Formspree's plan limits (50/month on free).

### WordPress plumbing that was dropped

None of this was used by the page; all of it is inert on a static host:

- RSS and comment feeds (`/feed/`, `/comments/feed/`)
- The REST API (`/wp-json/`) and oEmbed discovery links
- `xmlrpc.php` and RSD link
- The emoji detection script and `wp-embed`

### jQuery, SmartMenus and the Elementor runtime

The original loads jQuery 3.7.1, jQuery Migrate, jQuery UI Core, SmartMenus and
two Elementor JS bundles — roughly 300 KB — to power exactly two behaviours.
Both are reimplemented in about 25 lines of vanilla JS:

- **Burger menu** (`Header.astro`) — toggle, `aria-expanded`, Escape to close,
  close on anchor click, reset when the viewport grows past 1024px.
- **FAQ accordion** (`Faq.astro`) — the builder already emits native
  `<details>`/`<summary>`, so open/close needs no JS at all. Only the
  "one open at a time" rule does, and native `name="details"` handles that in
  current browsers; the script is a feature-detected fallback for older ones.

---

## 2. Content that is intentionally absent

### The hidden "How We Work" section

The page source contains a four-step section (Free Workplace Assessment →
Prioritized Action Plan → Program Build-Out → Ongoing Support) carrying
`elementor-hidden-desktop`, `elementor-hidden-tablet` **and**
`elementor-hidden-mobile`. It renders nowhere on the live site.

It is omitted here. To restore it, add a section using this content:

| Step | Heading | Body |
|---|---|---|
| 01 | Free Workplace Assessment | We walk your facility, review your current programs and documentation, and identify the gaps an OSHA inspector would find — before they do. |
| 02 | Prioritized Action Plan | You receive a clear, plain-language report ranked by risk and regulatory exposure — what to fix first, what it takes, and what it protects. |
| 03 | Program Build-Out | We write and implement the programs, training, and recordkeeping systems your operation needs — tailored to your industry, not templated. |
| 04 | Ongoing Support | Fractional safety leadership, audit follow-ups, and real-time access to your compliance records through the LSS hosted EHS platform. |

Section eyebrow "How We Work", heading "From first walkthrough to lasting
compliance", intro "A straightforward, four-step engagement — so you always know
where you stand and what happens next." Grid is 4 columns → 2 → 1.

### The header wordmark — briefly removed upstream, restored by request

When this port began, the header showed a "Larson Safety LLC." wordmark beside
the logo. **On 2026-09-18, while the port was in progress, the live site was
re-published with that heading deleted** and the logo group switched from
`justify-content: center` to `flex-start`. Nothing else on the page changed —
the page and footer stylesheets are byte-identical across the two versions.

The port briefly matched that live state (logo only, left-aligned), but the
site owner asked for the wordmark back, so it is **restored** in
`Header.astro`: the brand group is `justify-center` again and the wordmark
sits beside the logo, both matching the original pre-2026-09-18 markup and
sizing (9px uppercase, scaling to 16px at tablet+). This is now a deliberate
divergence from whatever the live WordPress site currently shows — if it gets
re-published again, don't resync the header without checking with the owner
first.

---

## 3. Deliberate improvements over the original

Small, low-risk fixes. Each is easy to revert.

- **Footer link columns are now links.** The original renders Services,
  Industries and Company as plain text with no anchors. They point at the
  matching page sections here. Styling is unchanged.
- **Semantic heading order.** The original marks the hero *eyebrow* as the `<h1>`
  and the actual headline as an `<h2>`. This port uses `<h1>` for the headline
  and a `<p>` for the eyebrow. Visual styling is identical; screen readers and
  search engines get a sensible document outline.
- **Self-hosted fonts.** Inter, Inter Tight and Roboto load from the site itself
  rather than the Google Fonts CDN — faster, and no third-party request.
- **Images are optimised** to WebP with responsive `srcset` via `astro:assets`.
- **Contact form submit button text fixed.** The original's button read
  "Request a Free Assessment Request" — "Request" duplicated, once as the
  lead verb and once trailing. Now "Request a Free Assessment"
  (`contact.submitLabel` in `content.ts`).
- **Footer "Industries" column: "Construction" removed.** Larson Safety
  doesn't serve the construction industry (not listed anywhere else on the
  page — General Industry, Manufacturing, Hospitality, Building Services are);
  the original's footer listed it anyway. `footer.columns` in `content.ts`.
- **"boat manufacturing" capitalized** to "Boat manufacturing" for consistency
  with the other list items in that column (Printing, Truck/auto upfitting and
  repair). `industries.manufacturing.columns` in `content.ts`.

## 4. Quirks of the original, reproduced on purpose

These look like mistakes but are faithful to the source. Do not "fix" them
without checking against the live site first.

- **Two headings render in Roboto.** "General Industry" and "Manufacturing
  expertise" in the Industries section, plus the "Years of direct EHS
  leadership" label, specify `"Roboto", Sans-serif` — the Elementor kit's
  default family leaking through on a page that is otherwise Inter. The
  icon-list items and form inputs inherit Roboto for the same reason.
  This is why `@fontsource-variable/roboto` is a dependency.
- **Every stats-bar cell has a right divider**, including the last one.
- **`margin-top: 8px` on icon-box and image-box headings** is the browser
  default that Elementor never resets. It is load-bearing for vertical rhythm;
  removing it shifts several sections by 8–16px.
- **The hero photograph sits at 4% opacity** over `#0B1735`, so it is almost
  invisible. That is how the original is configured, not a loading bug.
- **The Services column in the footer carries a 10px bottom margin on mobile
  only**, and the brand column a 30px bottom margin on tablet only.

---

## 5. Copyright and licensing

Carried over at the site owner's direction. Recorded here for the file.

- **Marketing copy** — Larson Safety LLC's own text, reproduced verbatim.
- **Photography is licensed stock, not original work.** Two images were copied
  from the WordPress media library:
  - `public/img/hero-safety.jpg` — **contains a visible third-party "North
    River" brand mark on the subject's safety vest.** Re-hosting it on a new
    domain relies on the existing stock licence still covering that use. Worth
    confirming with whoever purchased it; swapping the file is a one-line change.
  - `src/assets/services-solar.jpg` — solar panel manufacturing photo.
- **Logos** (`src/assets/logo-header.png`, `logo-footer.png`) and the favicon
  set are Larson Safety's own marks. The header and footer use *different
  crops* of the same logo (235×214 and 236×203) — they are not interchangeable.
- **Icons** — Font Awesome Free 5 path data, inlined by Elementor. Licensed
  CC BY 4.0. The credential badge is a custom SVG the site author placed from
  SVGRepo. All live in `src/icons.ts`.
- **Fonts** — Inter, Inter Tight and Roboto, all SIL Open Font License 1.1.
- The **CSP / BCSP credential statement** in the footer is a factual
  certification claim, reproduced unchanged.

---

## 6. How fidelity was verified

Not by eye alone. The original's generated Elementor CSS was parsed into a
per-element table of literal values, and the port was measured against the live
site with Playwright at 1440×900, 1024×900 and 390×844:

- Full-page heights: **desktop exact (5480px), tablet +2px, mobile +2px.**
- Every section's height matches within 1px at all three widths.
- `getComputedStyle` comparison of ~35 elements — box, font-size, line-height,
  font-family — with no unexplained differences remaining.
- Burger menu, accordion exclusivity, anchor scrolling and form validation
  tested; no console errors.

The three residual differences are all measurement artefacts, not visual ones:
a selector-scope mismatch on the header wrapper, a 5px span width from
variable-vs-static font metrics, and the FAQ summary font-size (the original
sets it on an inner span; rendered heights match exactly).

**Re-verifying after changes:** run `npm run build && npm run preview`, then
drive Playwright against `http://localhost:4321/` and the live URL side by
side. The scripts used are not committed — they were scratch tools.

---

## 7. Incident: custom domain broke every asset path (2026-09-19)

The site was originally built for `https://halliday2026.github.io/larson_website`
(a GitHub Pages *project* site, served from a `/larson_website/` sub-path) —
`astro.config.mjs` had `site: '...github.io'`, `base: '/larson_website'`, and
every asset URL in the built HTML carried that prefix.

Separately, a custom domain (`larsonsafe.com`) was pointed at this repo's
GitHub Pages via *Settings → Pages → Custom domain*. GitHub Pages then serves
the site **from the domain's root**, not under `/larson_website/`, and
redirects the old `github.io/larson_website/...` URLs there (dropping the
`/larson_website` prefix entirely). The built HTML still asked for
`/larson_website/_astro/index.css`, `/larson_website/favicon-32.png`, etc. —
none of which exist at the domain root — so every stylesheet, script, image
and favicon 404'd. The page still rendered (HTML has no external
dependencies to *load*), just with zero CSS: default serif font, blue
underlined links, no layout. That's what "styles are messed up" looked like.

**Fix:** `astro.config.mjs` now has `site: 'https://larsonsafe.com'`,
`base: '/'`, and `public/CNAME` contains `larsonsafe.com` (required so the
Actions-based deploy — which replaces the entire published artifact each
run — keeps asserting the custom domain, rather than relying solely on the
repo setting). All internal URLs are built from `import.meta.env.BASE_URL`
(see `Hero.astro`, `WhyUs.astro`, `Layout.astro`), so this was a one-line
config change with no component edits needed.

**If the custom domain is ever removed** from *Settings → Pages*, this has to
be reverted in lockstep: `base` back to `/larson_website`, `site` back to the
`github.io` URL, and delete `public/CNAME` — or the exact same breakage
recurs, just inverted (asset paths that used to work on the sub-path will
404 wherever the site actually lives).
