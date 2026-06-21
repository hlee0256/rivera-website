# CLAUDE.md — Rivera website

Context file for Claude Code. **Read this first before editing anything.**

## ⚠️ Required workflow (every agent, every time)

1. **Before you start**, read `PROGRESS.md` (it is short by design: status board, **locked
   decisions**, and **open threads** — this is what keeps work coherent, e.g. don't re-add a
   type filter or calque the Vietnamese), then `DESIGN.md` and `Aura-design.md` as the build
   reference. You do **not** need to read the history — that lives in `CHANGELOG.md` and is
   skim-only, for when you need the backstory of a past decision.
2. **After a task that changes the site:** if a project's stage or an open thread changed,
   update that line in `PROGRESS.md`, and append one dated entry to the top of `CHANGELOG.md`.
   Keep it to a few lines. (Pure conversation/advice that changes nothing is exempt.)

> The owner may ask: *"build a progress dashboard"* → generate a read-only `progress.html`
> styled in the Rivera palette from the `PROGRESS.md` board + the `CHANGELOG.md` history.

## The docs (what each is for)

| File | Use it for |
|------|-----------|
| `CLAUDE.md` (this) | Quick orientation + the hard rules. |
| `PROGRESS.md` | Short live state: status board + locked decisions + open threads. Read first. |
| `CHANGELOG.md` | Append-only dated history. Not required reading; skim only for backstory. |
| `DESIGN.md` | The definitive token / type / component / motion system. Never hardcode a value that isn't here. |
| `Aura-design.md` | How to build a project page to the AURA standard (philosophy + method). **Match the effort, not the layout.** |

That's the whole set: **`CLAUDE.md`, `PROGRESS.md`, `DESIGN.md`, `Aura-design.md`** (plus the
code in `styles.css` / `app.js`). The detail-page `.pd-*` template, carousel and map patterns
live in `DESIGN.md` §6. (The retired `PROJECT-DESIGN-RULES.md` / `DEPLOY.md` are in `legacy/` —
superseded, do not follow.)

## What this is

**Rivera** is a marketing site for a *boutique Melbourne property practice* — a small,
high-touch advisor, not a big agency. Brand idea: **quiet luxury** — unhurried, personal, a
considered few homes. Tone: calm, confident, warm. No hype, no exclamation marks, no salesy copy.

Audience: high-end Melbourne buyers, a meaningful share **Vietnamese-speaking**. The site is
bilingual **VI + EN**, and **Vietnamese is the default and the source language**.

Static site: **plain HTML/CSS/JS, no framework, no build step.** Open the `.html` files directly
or via a tiny local server. Do not add React/Vite/npm unless explicitly asked.

## Files

| File | Role |
|------|------|
| `index.html` | Landing: hero video, statement, developer marquee, projects teaser, stats, **Featured Residence (currently AURA, running its hero film)**, enquiry form. |
| `projects.html` | The collection: **7 real projects** as pill cards (status + sale pills) with lowest-per-segment "from $X" pricing. **No type filter, no fictional placeholders.** |
| `about.html` | Founder/practice story, philosophy, track record. |
| `<slug>.html` | One project detail page. 7 exist; **`aura-melbourne-square.html` is the bespoke flagship** (see `Aura-design.md`); the others follow the shared `.pd-*` template (clone `380-melbourne.html`, recipe in `DESIGN.md` §6). |
| `map.html` | Interactive Leaflet map of Melbourne (projects + universities / transit / shopping / landmarks). Loads `map-data.js` then `app.js`. |
| `map-data.js` | **The map's marker data** (`window.MAP_LOCATIONS`), separated from logic so a data edit can't break the rest of the site. Loaded only by `map.html`. |
| `insights.html` + `insight-*.html` | The insights feed (filterable) + 8 individual articles. |
| `enquire.html`, `guide.html` | Standalone enquiry page and the buyer's guide. |
| `styles.css` | Single shared stylesheet. Bespoke pages add one `.au-`-prefixed block at the end. |
| `app.js` | Single shared script: language toggle, mobile menu, scroll reveal, card filter (insights/projects), carousel, map rendering (reads `window.MAP_LOCATIONS` from `map-data.js`), form, AURA page block. Page-specific JS goes in a guarded block gated on a page id. |

A change to `styles.css` / `app.js` propagates everywhere — that's intentional. Keep pages consistent.

## Design system (full detail in `DESIGN.md`)

Warm "Rivera Brown on cream paper" palette, declared as `:root` tokens in `styles.css`:
`--brown #7A4E2D` (primary) · `--espresso #1B130D` / `--coffee #2A1E14` (dark sections) ·
`--tan #C9A982` (accent on dark) · `--sand #E6DACA` · `--paper #F4F0E9` / `--paper-2 #FBF9F4`
(backgrounds) · `--ink #231A12` / `--ink-soft #6E5E4D` (text) · `--ok` / `--alert` (status dots).
Type: **Manrope** (sans) + a serif accent via `var(--serif)` (Instrument Serif for EN,
Cormorant Garamond for VI). Always pair a sans heading with **one** italic serif accent span.
**Never hardcode a hex, size, or easing not in `DESIGN.md`.**

## ⚠️ The bilingual system (most important convention)

`app.js` swaps language by overwriting each element's text from its `data-en` / `data-vi`
attribute. Default is **Vietnamese** (`localStorage` key `rivera-lang`, falls back to `vi`).

1. Every visible string carries **both** `data-en` and `data-vi`; the fallback text matches `data-en`.
2. **Never put `data-en`/`data-vi` on an element that contains child tags** — the script
   replaces the whole text content and would delete the children. Put them on the innermost
   leaf `<span>`s (this is why headings split into a sans span + a `.serif` span).
3. Inputs use `data-en-ph` / `data-vi-ph`.
4. **Vietnamese is the source language** — write VI natively and idiomatically, never calqued
   from English. Then write natural EN to match.
5. Keep counts balanced: `grep -o 'data-en=' page.html | wc -l` must equal the `data-vi=` count.

## Copy rules

- **No em-dashes (—)** anywhere in copy. Use a full stop, comma, colon, or a middot `·` for
  separators. An en-dash `–` is allowed only inside a numeric range (e.g. `$900,000 – $1,080,000`).
  (Exceptions kept for site-wide consistency: the footer copyright line and the `Name — Rivera`
  page-title pattern.)
- No hype, no exclamation marks. Lead with location and story, then finishes, then amenities.
  Prices are "indicative"; all imagery is "artist's impression". Don't invent facts.

## Adding a project (the three sync points)

Materials arrive in `Projects/<Name>/` (renders, price list, brochure, short brief). Follow
**`Aura-design.md`** for depth and the design language. Wire all three places:

1. **`projects.html`** — add an `<a class="pcard" href="<slug>.html">` with a status pill
   (`st-cp` completed / `st-uc` under construction / `st-pc` pre-construction), a sale pill, a
   2-line bilingual description, and a `.pcard-prices` block of **lowest "from $X" per bedroom
   tier** (extract from the price list). Reuse the `#ic-bed/#ic-bath/#ic-car` SVG sprite.
2. **`<slug>.html`** — the detail page. Match the AURA *effort* at a fitting *scale* (a tower
   gets the full treatment; a small apartment gets a tighter page). Copy the shared
   `<header class="nav">` and `<footer>` verbatim.
3. **`map-data.js` → `window.MAP_LOCATIONS`** — append one object with `lat`/`lng` so the map dot appears. (Data only; the map logic in `app.js` doesn't change.)

Media pipeline: optimise photos into `images/<slug>/` (`sips`, no `ffmpeg` on this machine —
use Swift/AVFoundation to trim hero video + grab a poster). Lazy-load below-fold images.

## Deploy

**The real folder `~/Desktop/Rivera-Website` (branch `main`) is the source of truth.** Edit
files there directly. To publish: commit the changed files on `main` and `git push origin main`
— Vercel auto-builds the live site (no build step). That is the whole deploy.

- The owner doesn't use git and shouldn't be asked git questions: carry every change through to
  live yourself. Commit author email: `hoanganhhp99@gmail.com`.
- **Never commit secrets** — `.env*` is gitignored; keep it that way.
- Don't create git worktrees for routine work; they put edits in a hidden folder the owner
  can't see. Work in the real folder. (Any `.claude/worktrees/*` are disposable.)

## Current status

The 7 project detail pages, the projects gallery and the map are live. **Outstanding
placeholders and open threads live in `PROGRESS.md` (Open threads)** — that is the single
source; don't keep a second copy here.
