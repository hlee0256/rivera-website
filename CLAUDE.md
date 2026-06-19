# CLAUDE.md — Hà Anh Traco website

Context file for Claude Code. Read this first before editing anything.

## What this is

**Hà Anh Traco** is the marketing website for **Công ty TNHH Vận tải Thương mại Hà Anh**
(*Ha Anh Transport & Trading Co., Ltd*), a transport and logistics company based in
**Hải Phòng, Vietnam**. The company moves containers, bulk and project cargo across
northern Vietnam — by road, by inland waterway, through customs and into the warehouse.

Tone: clear, dependable, professional. Freight is a promise about time, so the copy is
plain and confident — no hype. Audience is shippers, factories and trading companies in
northern Vietnam, so the site is bilingual **Vietnamese (default) + English**.

> History: this repo began as a boutique Melbourne real-estate site ("Rivera") and was
> repurposed into Hà Anh Traco. The shared design system and bilingual machinery were kept;
> the property pages were removed. If you find leftover property references, they're stragglers.

This is a static site — **plain HTML/CSS/JS, no framework, no build step.** Open the `.html`
files in a browser, or use a tiny local server. Do not add React/Vite/npm unless asked.

## Files

| File | Role |
|------|------|
| `index.html` | Landing page: hero, statement, services teaser, stats, featured service (port drayage), contact form. |
| `services.html` | The six services as cards (road freight, inland waterway, customs, warehousing, handling, project cargo). Anchors: `#road`, `#waterway`, `#customs`, `#warehouse`, `#handling`, `#project`. |
| `about.html` | Company story, how we work, track-record stats, credentials. |
| `contact.html` | Contact details (phones, email, office + yard addresses) and the quote form. |
| `styles.css` | **Single shared stylesheet for all pages.** |
| `app.js` | **Single shared script for all pages**: language toggle, mobile menu, scroll reveal, form submit. (Also contains a self-guarded Leaflet map block and a project-detail carousel/AURA block left over from the property site — they only run if their elements exist, which they no longer do, so they're inert. Safe to delete if you want to slim the file.) |

`images/` and `logo/` still hold the old property assets — currently **unused**. Replace with
real Hà Anh Traco fleet/port photos and partner logos, or delete.

## Design system (CSS variables in `styles.css` `:root`)

Maritime navy + amber on cool paper (a Hải Phòng port identity). The variable **names** are
inherited from the original system, so the values no longer match the names literally — e.g.
`--brown` is now a steel-blue, `--tan` is amber. Don't rename them; just use them.

- `--brown #15577A` — PRIMARY brand colour (buttons, links, accents)
- `--espresso #0C1C2A` / `--coffee #13283B` — dark sections (hero, stats, featured, footer)
- `--tan #E2A552` — warm amber accent on dark backgrounds
- `--paper #F2F4F6` / `--paper-2 #FBFCFD` — page backgrounds
- `--ink #15212B` / `--ink-soft #566875` — body text

A few dark **gradients** are hardcoded in CSS (`.photo`, `.hero .bg .hero-vid`, `.featured .bg::before`)
and have been retuned to navy. The hero and featured backgrounds are CSS gradients (no video) —
`.featured .bg` carries an inline navy gradient because a later `::before` rule overrides the
shared one.

Type: **Manrope** (sans, body + headings) and an italic serif accent via `<span class="serif">`
inside headings (Instrument Serif for EN, Cormorant Garamond for VI — switched automatically).
Always pair a serif accent word with the sans heading, e.g.
`Freight that keeps <span class="serif">to the clock.</span>`

Use the existing CSS variables and component classes; don't hardcode new hex colours.

## ⚠️ Most important convention: the bilingual system

Every visible string carries **both languages as attributes**, and `app.js` swaps them when the
user toggles EN/VI in the nav. On page load the script overwrites the element's text from the
attribute, so **editing the text between the tags alone will NOT stick** — you must edit the
attributes. **Default language is Vietnamese**; the choice is remembered in `localStorage`
(`haanh-lang`).

1. Set **both** `data-en="..."` and `data-vi="..."` on the element (keep the visible fallback
   text matching `data-en`).
   ```html
   <h2 data-en="Services" data-vi="Dịch vụ">Services</h2>
   ```
2. **Never put `data-en` on an element that contains child tags** — the script replaces the whole
   text content and would delete the children. Put the attributes on the innermost leaf `<span>`s.
   This is why headings are split:
   ```html
   <h1><span data-en="Built on " data-vi="Dựng nên từ ">Built on </span><span class="serif" data-en="reliability." data-vi="sự tin cậy.">reliability.</span></h1>
   ```
3. Input/textarea placeholders use `data-en-ph` / `data-vi-ph` instead.

If you add a new page, copy the `<header class="nav">` and `<footer>` from an existing page
verbatim so the nav, language toggle and mobile menu keep working.

## Common edits — how to

- **Add a service** (`services.html`): copy a whole `<article class="pcard" id="...">` block, give
  it a new `id`, fill the bilingual fields. Cards use the designed gradient `.photo` placeholder;
  add `class="photo has-img" style="background-image:url('images/your.jpg')"` to use a real photo.
- **Nav state**: sub-pages (services, about, contact) use `class="nav onlight"` so the bar starts
  solid on a light background; the landing page omits `onlight` because it has a dark hero. The
  current page's nav link gets `class="active"`.
- **Quote/contact form**: forms POST to Formspree. Replace `YOUR_FORM_ID` in the `action`
  attribute with a real Formspree form ID. Until then it just shows the on-page "thank you".

## Current status — what to confirm / replace before going live

- **Company details are from public directory listings and need verifying**: phones
  (+84 225 3978 897 / 898), email (`haanhtraco@gmail.com`), office (86 Hoàng Thế Thiện, Đông Khê,
  Ngô Quyền) and yard (Hạ Đoạn 2, Trần Hưng Đạo, Đông Hải 2, Hải An) addresses.
- **Stats are illustrative** (20+ years, 24/7, 3 ports, own-fleet) — confirm real figures.
- All photography is designed gradient placeholders; `images/`/`logo/` hold old property assets.
- Formspree ID is a placeholder.
- VN legals (business registration / transport licence number, privacy notice for the form).

## Conventions summary

- Static HTML, no build step, no dependencies beyond Google Fonts.
- Shared `styles.css` + `app.js` — edit once, applies everywhere.
- Bilingual (VI default): every string needs `data-en` + `data-vi` (placeholders `data-en-ph`/`data-vi-ph`).
- Reuse existing CSS variables and component classes; match the clear, dependable tone.
