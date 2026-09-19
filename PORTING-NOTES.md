# Porting notes

This site is a static Astro + Tailwind port of the WordPress original at
`https://wlarson12.sardaritskillshare.com/` (WordPress 7.1.1, Elementor 4.2.4 /
Elementor Pro 4.2.3, Hello Elementor 3.5.1).

Everything below is a deliberate decision, not an oversight.

---

## 1. Things that depended on server-side WordPress

GitHub Pages serves static files only. These could not come across as-is.

### Contact form — needs configuration before it works

The original used an **Elementor Pro form widget** that POSTed to WordPress
`admin-ajax.php`. That handler does not exist on a static host.

The replacement keeps the same fields, labels, required flags and submit copy,
but posts to a third-party form service via `fetch()`:

1. Create a form at [Formspree](https://formspree.io) (or Web3Forms, Basin, etc.).
2. Set `PUBLIC_FORM_ENDPOINT` to the endpoint URL:
   - **Local:** copy `.env.example` to `.env` and fill it in.
   - **CI/Pages:** add it as a repository *variable* named `PUBLIC_FORM_ENDPOINT`
     (Settings → Secrets and variables → Actions → Variables). The deploy
     workflow already passes it through.

**Until it is set, the form renders disabled** with a visible notice pointing
visitors at the phone number and email address, and the build logs a warning.
It fails loudly rather than silently swallowing enquiries.

Note that submissions will go to your form provider, not to WordPress — nobody
will find them in a WP dashboard.

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

### The header wordmark, removed upstream mid-port

When this port began, the header showed a "Larson Safety LLC." wordmark beside
the logo. **On 2026-09-18, while the port was in progress, the live site was
re-published with that heading deleted** and the logo group switched from
`justify-content: center` to `flex-start`. Nothing else on the page changed —
the page and footer stylesheets are byte-identical across the two versions.

This port matches the **current** live state: logo only, left-aligned. The
company name is still present as the logo link's accessible name and in the
page `<title>`.

To bring the wordmark back, add this next to the logo link in `Header.astro`
and change the group's `justify-start` back to `justify-center`:

```astro
<a href="#top" class="font-sans text-[9px] font-semibold uppercase leading-none text-navy-500 md:text-[16px]">
  {site.name}
</a>
```

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
drive Playwright against `http://localhost:4321/larson_website/` and the live
URL side by side. The scripts used are not committed — they were scratch tools.
