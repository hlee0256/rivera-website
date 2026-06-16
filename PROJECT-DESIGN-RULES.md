# Rivera — Design & Build Rules

Read this before building or editing any page. It captures the conventions established on the
site (most fully realised on `380-melbourne.html`) so every page stays consistent. This file is
the *design contract*; `CLAUDE.md` is the quick technical orientation. When they overlap, follow
the stricter rule here.

---

## 1. Brand in one breath

Rivera is a **boutique Melbourne property practice** — a small, high-touch advisor, not a big
agency. The idea is **quiet luxury**: unhurried, personal, a considered few homes. Keep the tone
**calm, confident, warm**. Sell the *feeling and the location*, never with hype.

Audience: high-end Melbourne buyers, a meaningful share **Vietnamese-speaking**. Every page is
**bilingual EN + VI** and must read naturally in both.

---

## 2. Tech constraints (do not break)

- **Static site. Plain HTML/CSS/JS. No framework, no build step, no npm.** Pages open by double-click.
- **One shared `styles.css` and one shared `app.js`** for the whole site. Edit once, it applies
  everywhere. Add page-specific JS as a **guarded block** (`if (document.getElementById('x'))`), never
  a separate script file.
- Only external dependencies allowed: **Google Fonts**, the **hero video** file, and the **Google
  Maps embed** iframe. Nothing else loads from the network.
- Reuse existing CSS variables and component classes. **Never hardcode a new hex colour.**

---

## 3. Design tokens (defined in `styles.css :root`)

Warm, earthy "Rivera Brown on cream paper" palette:

| Token | Value | Use |
|-------|-------|-----|
| `--brown` | `#7A4E2D` | primary brand: buttons, links, accents, icons |
| `--espresso` `--coffee` | `#1B130D` / `#2A1E14` | dark sections (stats, footer, CTA, media) |
| `--tan` | `#C9A982` | light accent on dark backgrounds |
| `--paper` `--paper-2` | `#F4F0E9` / `#FBF9F4` | page backgrounds, cards |
| `--ink` `--ink-soft` | `#231A12` / `#6E5E4D` | body text / muted text |
| `--line` | hairline | borders, dividers |

**Type:** `Manrope` (sans — body + headings) and `Instrument Serif` *italic* (the elegant accent).
**Always pair a sans heading with a serif accent word** via `<span class="serif">`:

```html
<h2><span data-en="Quietly grand, " data-vi="Sang trọng tĩnh tại, ">Quietly grand, </span><span class="serif" data-en="in the heart of the city." data-vi="giữa lòng thành phố.">in the heart of the city.</span></h2>
```

---

## 4. The bilingual system — the most important rule

`app.js` swaps language by **overwriting each element's text from its `data-en` / `data-vi`
attribute**. Default is **Vietnamese** (`localStorage` key `rivera-lang`, falls back to `vi`).

1. Every visible string carries **both** `data-en` and `data-vi`, and the fallback text between the
   tags must match `data-en`.
   ```html
   <h2 data-en="Highlights" data-vi="Đặc điểm nổi bật">Highlights</h2>
   ```
2. **Never put `data-en` on an element that contains child tags** — the script replaces the whole
   text content and would delete the children. Put the attributes on the innermost leaf `<span>`s.
   This is why headings and multi-part lines are split into spans.
3. Inputs use `data-en-ph` / `data-vi-ph` for placeholders.
4. Keep the two languages **balanced**: `grep -o 'data-en=' page.html | wc -l` must equal the
   `data-vi=` count. Verify this before finishing.
5. Vietnamese must be **idiomatic**, not literal. Match the calm tone. (The `vnhumanize` skill can
   help if VI starts sounding machine-translated.)

---

## 5. Shared chrome — copy verbatim on every page

Copy the `<header class="nav">` and `<footer>` **verbatim** from an existing page so the language
toggle, mobile menu and links keep working.

- **Nav state:** sub-pages that start on a *light* background use `class="nav onlight"` (solid bar).
  Pages with a **dark hero** (landing page, project detail pages) use plain `class="nav"`. The
  current page's nav link gets `class="active"`.
- **Buttons / links:** `.btn` (filled brown pill, with a trailing `<span class="arw">→</span>`),
  `.lk` (text link), `.eyebrow` (small uppercase label, add `light` over dark backgrounds).

---

## 6. Project detail page recipe (the `380-melbourne.html` pattern)

Every project page is built from these sections, in order. Clone `380-melbourne.html` and swap the
content rather than rebuilding.

1. **Hero (`.pd-hero`)** — full-bleed background, dark, text bottom-left.
   - Prefer a **looping muted video**: put a `<video class="hero-vid" autoplay muted loop playsinline
     poster="…">` as the **first child** of `.pd-hero`. The `.pd-hero .hero-vid` rule makes it cover
     (`position:absolute;inset:0;object-fit:cover`). If no video, set `background-image` on `.pd-hero`.
   - Contains: `.pd-back` ("← All projects"), `.eyebrow light` (e.g. "Melbourne CBD · Apartment"),
     `<h1>` (project name, no `data-` needed if identical in both languages), `.pd-loc` (address),
     and `.pd-tagstrip` of up to ~4 `.st` chips (key selling points, e.g. `2 Bed · 2 Bath`,
     `Prime location`, `City & bay views`, `24/7 concierge`).
2. **Overview (`.pd-body > .pd-grid`)** — two columns: prose `.pd-lead` + sticky spec card `.pd-card`.
   - `.pd-lead`: an eyebrow, a split serif `<h2>`, **two short paragraphs** (lead with the *story and
     the location*), then a **`.pd-features`** block titled **Highlights / Đặc điểm nổi bật** — a
     two-column numbered list (`<span class="fi">01</span>`) of ~5 selling points.
   - `.pd-card`: `Guide` label + price `.pr`, a `.specs-row` of **icon + number + label** items
     (bed / bath / parking — inline SVG icons, left-aligned), a `.pd-facts` key/value list
     (Address, Architect, Developer, Completed, Type), a full-width `.btn`, and a small centred
     `.pd-note` disclaimer for indicative pricing.
3. **Gallery (`.pd-gallery`)** — the crossfade carousel with category tabs (see §8).
4. **Location (`.pd-map-sec`)** — the warm-tinted Google map panel (see §9).
5. **CTA (`.pd-cta`)** — dark band, split serif heading, one paragraph, a `.btn` + a back link.
6. **Footer** — verbatim shared footer.

---

## 7. Media pipeline (do this for every project's photos/video)

Source assets live in `Projects/<Name>/`. Optimise them into **`images/<project-slug>/`** with
web-safe names (no spaces). Never reference the multi-MB originals directly.

**Photos** → max 2000px, quality ~82, strip metadata (typical result 150–700 KB):
```bash
convert "SRC.jpg" -auto-orient -resize '2000x2000>' -quality 82 -strip "images/<slug>/name.jpg"
```

**Hero video** → cap at 1080p, no audio, faststart for streaming (≈12 MB for ~30s):
```bash
ffmpeg -i "SRC.mp4" -an -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 25 -preset medium \
  -movflags +faststart "images/<slug>/hero.mp4"
ffmpeg -ss 1.5 -i "SRC.mp4" -frames:v 1 -q:v 3 "images/<slug>/hero-poster.jpg"   # poster frame
```

Naming convention used for 380: `exterior-N.jpg`, `living-room.jpg`, `bedroom.jpg`, `kitchen.jpg`,
`bathroom.jpg`, `view-N.jpg`, `hero.mp4`, `hero-poster.jpg`. **Delete any temporary `thumb-*`
previews** before finishing.

---

## 8. Gallery carousel + categories

One big framed carousel (`#pcarousel`), **crossfade** (not slide), **auto-advancing** every 4.8s,
pause on hover, arrows + dots, swipe on touch. Logic lives in the guarded carousel block in `app.js`.

- Each slide: `<div class="pc-slide" data-cat="…" style="background-image:url('…')"><span class="pc-cap"
  data-en="…" data-vi="…">Caption</span></div>`.
- **Category tabs** (`#pcTabs`) filter the carousel via `data-cat`. Current vocabulary:
  `all` (Tất cả), `residence` (label **Interiors / Phòng ngủ**), `building` (Tòa nhà),
  `views` (Tầm nhìn). Add `amenities` (Tiện ích) once pool/gym/cinema photos exist.
- Keep categories **roughly balanced** and **interleave** them in the markup so the "All" reel
  alternates interior / building / view.
- The tab `data-cat` **key** is fixed; only its **label** is translated. (Note the key stays
  `residence` even though the visible label is "Interiors / Phòng ngủ".)

---

## 9. Location map pattern

A real Google map of the address that **looks static** but opens Google Maps on click — no API key.

- `<iframe class="pd-map-frame" src="https://www.google.com/maps?q=<ADDRESS>&z=15&output=embed">`
  with `pointer-events:none` (so it reads as a still image).
- A full-panel `<a class="pd-map-overlay" href="https://www.google.com/maps/search/?api=1&query=<ADDRESS>"
  target="_blank">` makes the whole map clickable.
- A `.pd-map-bar` below shows the address and an "Open in Google Maps →" link.
- The map is **warm-tinted with CSS** (`filter: sepia(.42) saturate(.82) hue-rotate(-8deg) …` plus a
  `--brown` multiply overlay) to sit in the palette. This is an *approximation* — an exact themed map
  needs the paid Maps JS API + a styled map, which we deliberately avoid.

---

## 10. Adding a new project — checklist

1. `cp 380-melbourne.html <slug>.html`. Update `<title>`, meta description, `<h1>`, address, eyebrow.
2. Optimise its media into `images/<slug>/` (§7). Swap the hero video/poster, gallery slides, captions.
3. Rewrite all copy in **both languages**, following the tone and the copy rules (§11).
4. Update the spec card (price, beds/baths/parking, facts) and the Highlights list.
5. Re-point the map iframe + overlay + bar to the new address.
6. Add a matching card to **`projects.html`**: copy an `<article class="pcard" data-type="…">`,
   set `data-type` to `house` / `apartment` / `townhouse` (filter counts update automatically),
   set the thumbnail to a hero image from `images/<slug>/`, fill bilingual fields. Link it to `<slug>.html`.
7. Verify: bilingual balance equal, `node --check app.js`, every `images/<slug>/…` path resolves,
   no leftover placeholder/Unsplash URLs, carousel + map render.

---

## 11. Copy rules

- **No em dashes (—).** Use a full stop, comma, or colon instead. (Exceptions: the shared footer
  copyright line and the `Name — Rivera` page-title pattern, kept for site-wide consistency.)
- No exclamation marks, no hype, no "luxury living redefined" clichés. Understated and specific wins.
- Lead with **location and story**, then finishes, then amenities. Numbers (price, levels, year) are
  framed as **indicative** where they come from public sources.
- Keep headings short; let the serif accent carry the warmth.
- Don't invent facts. If a detail isn't confirmed, keep it general and flag it for the client.

---

## 12. File map

| File | Role |
|------|------|
| `index.html` | Landing: video hero, statement, marquee, teaser, stats, featured, enquiry form |
| `projects.html` | Filterable gallery of project cards (All / House / Apartment / Townhouse) |
| `about.html` | Founder story, philosophy, track record, credentials |
| `<slug>.html` | One project detail page (pattern: `380-melbourne.html`) |
| `styles.css` | Single shared stylesheet — all design lives here |
| `app.js` | Single shared script — lang toggle, menu, reveal, project filter, **carousel**, form |
| `images/<slug>/` | Optimised, web-safe photos + `hero.mp4` + `hero-poster.jpg` per project |
| `Projects/<Name>/` | Original client assets (never referenced directly by the site) |
