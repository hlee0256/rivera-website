# CLAUDE.md — Rivera website

Context file for Claude Code. Read this first before editing anything.

## What this is

**Rivera** is a marketing website for a *boutique Melbourne property practice* — a small,
high-touch real-estate advisor (not a big agency). The whole brand idea is "quiet luxury":
unhurried, personal, a considered few homes rather than endless listings. Keep the tone
calm, confident and warm. Avoid hype, exclamation marks, and salesy language.

Audience: high-end buyers in Melbourne, Australia. The site is bilingual **English +
Vietnamese** because a meaningful share of buyers are Vietnamese-speaking.

This is a static site — **plain HTML/CSS/JS, no framework, no build step.** Just open the
`.html` files in a browser, or use a tiny local server. Do not add React/Vite/npm unless
explicitly asked.

## Files (keep them all in the same folder)

| File | Role |
|------|------|
| `index.html` | Landing page: hero video, statement, developer marquee, projects teaser, stats, featured residence, enquiry form. |
| `projects.html` | Filterable gallery (All / House / Apartment / Townhouse). 9 project cards. |
| `about.html` | Founder story, philosophy & process, track-record stats, credentials. |
| `styles.css` | **Single shared stylesheet for all pages.** Edit design here once. |
| `app.js` | **Single shared script for all pages**: language toggle, mobile menu, scroll reveal, project filter, form submit. |

All three pages link `styles.css` and `app.js`. A change to either propagates everywhere —
that's intentional. Keep the three pages visually consistent.

## Design system (defined as CSS variables in `styles.css` `:root`)

Warm, earthy palette ("Rivera Brown" on cream paper):

- `--brown #7A4E2D` — primary brand colour (buttons, links, accents)
- `--espresso #1B130D` / `--coffee #2A1E14` — dark sections (stats, footer)
- `--tan #C9A982` — light accent on dark backgrounds
- `--paper #F4F0E9` / `--paper-2 #FBF9F4` — page backgrounds
- `--ink #231A12` / `--ink-soft #6E5E4D` — body text

Type: **Manrope** (sans, body + headings) and **Instrument Serif** italic (the elegant
accent — used via `<span class="serif">` inside headings). Always pair a serif accent word
with the sans heading, e.g. `Homes worth <span class="serif">the wait.</span>`.

Use the existing CSS variables and component classes; don't hardcode new hex colours.

## ⚠️ Most important convention: the bilingual system

Every visible string carries **both languages as attributes**, and `app.js` swaps them when
the user toggles EN/VI in the nav. On page load the script overwrites the element's text from
`data-en`, so **editing the text between the tags alone will NOT stick** — you must edit the
attributes.

Rules when adding or changing any text:

1. Set **both** `data-en="..."` and `data-vi="..."` on the element (and keep the visible
   fallback text matching `data-en`).
   ```html
   <h2 data-en="Current projects" data-vi="Dự án hiện tại">Current projects</h2>
   ```
2. **Never put `data-en` on an element that contains child tags** — the script replaces the
   element's whole text content and would delete the children. Instead, put the attributes on
   the innermost leaf `<span>`s. This is why headings are split:
   ```html
   <h1><span data-en="Homes worth " data-vi="Ngôi nhà xứng đáng ">Homes worth </span><span class="serif" data-en="the wait." data-vi="để chờ đợi.">the wait.</span></h1>
   ```
3. Input/textarea placeholders use `data-en-ph` / `data-vi-ph` instead.
4. Default language is English. Choice is remembered in `localStorage` (`rivera-lang`).

If you add a new page, copy the `<header class="nav">` and `<footer>` from an existing page
verbatim so the nav, language toggle and mobile menu keep working.

## Common edits — how to

- **Add a project**: the owner fills in `docs/ADD-A-PROJECT.md` (a copy-paste form) and hands it
  over. One project lives in **three** places that must stay in sync: a `<a class="pcard"
  data-type="...">` card in `projects.html`, a new detail page `slug.html` (duplicate an
  existing one like `brunswick-mews.html`), and a `{ cat:'project', lat, lng, ... }` object
  appended to `MAP_LOCATIONS` in `app.js` — that last object is what places the **dot on
  `map.html`**. Set `data-type` to `house`, `apartment`, or `townhouse` (filter counts update
  themselves). Fill the bilingual fields per the rules above. See `docs/ADD-A-PROJECT.md` for the
  full build recipe and field list.
- **Use a real photo** instead of the designed placeholder: on a `.photo` div add
  `class="photo has-img"` and `style="background-image:url('images/your.jpg')"`. Put images in
  an `images/` folder next to the HTML.
- **Real developer logos** (the marquee in `index.html`): replace each
  `<span class="dev">Name</span>` with `<img class="dev-logo" src="logos/name.svg" alt="Name">`.
  Put files in a `logos/` folder. (Only use logos of developers Rivera actually works with.)
- **Hero video** (`index.html`): swap the two `<source>` URLs in the `.hero .bg <video>`.
  Currently a free Mixkit stock clip.
- **Enquiry form backend**: forms POST to Formspree. Replace `YOUR_FORM_ID` in the `action`
  attribute with a real Formspree form ID. Until then it just shows the on-page "thank you".
- **Nav state**: sub-pages (projects, about) add `class="nav onlight"` so the bar starts solid
  on a light background; the landing page omits `onlight` because it has a dark hero. The
  current page's nav link gets `class="active"`.

## Current status — what's placeholder (replace with real content)

- All photography is designed gradient placeholders (`.photo` blocks).
- Founder is fictional ("Elena Rivera") with placeholder story in `about.html`.
- Project names, suburbs, specs and price ranges are sample data.
- Developer marquee uses real Melbourne developer *names* as text — confirm Rivera actually
  works with them, or relabel, before going live.
- Contact email `hello@rivera.estate` and the Formspree ID are placeholders.

## Roadmap / likely next tasks

- Individual project detail pages (each card currently links to the enquiry form).
- Real photos, founder, logos, contact details, Formspree ID.
- AU real-estate legals: agent licence number, agency details, a privacy policy (required for
  collecting enquiries).
- SEO/share basics: favicon, per-page `og:image`, sensible page titles (titles are already set).

## Conventions summary

- Static HTML, no build step, no dependencies beyond Google Fonts + the hero video CDN.
- Shared `styles.css` + `app.js` — edit once, applies everywhere.
- Bilingual: every string needs `data-en` + `data-vi` (placeholders `data-en-ph`/`data-vi-ph`).
- Reuse existing CSS variables and component classes; match the quiet, boutique tone.
