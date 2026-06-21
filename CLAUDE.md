# CLAUDE.md — Rivera website

Context file for Claude Code. **Read this first before editing anything.**

## ⚠️ Required workflow (every agent, every time)

1. **Before you start**, read in this order: **`PROGRESS.md`** (current status + what's in
   flight), **`DESIGN.md`** (the token/component system), and **`Aura-design.md`** (the
   project-page design language + the quality bar).
2. **Before you finish any task that changes the site**, **update `PROGRESS.md`**: set the
   Project Status Board row, add one dated Log entry, touch Open threads if needed. This is
   **non-negotiable** — the progress sheet is the shared memory across sessions.
3. Pure conversation / advice that changes nothing is exempt. Everything that edits a file is not.

> The owner may ask: *"build a progress dashboard from PROGRESS.md"* → generate a read-only
> `progress.html` styled in the Rivera palette from the Status Board + Log.

## The docs (what each is for)

| File | Use it for |
|------|-----------|
| `CLAUDE.md` (this) | Quick orientation + the hard rules. |
| `PROGRESS.md` | Live status board + log. Read first, update last. |
| `DESIGN.md` | The definitive token / type / component / motion system. Never hardcode a value that isn't here. |
| `Aura-design.md` | How to build a project page to the AURA standard (philosophy + method). **Match the effort, not the layout.** |
| `PROJECT-DESIGN-RULES.md` | Older design contract (overlaps `DESIGN.md`; the two above win on conflict). |

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
| `<slug>.html` | One project detail page. 7 exist; **`aura-melbourne-square.html` is the bespoke flagship** (see `Aura-design.md`); the others follow the shared `.pd-*` template (clone `380-melbourne.html`). |
| `styles.css` | Single shared stylesheet. Bespoke pages add one `.au-`-prefixed block at the end. |
| `app.js` | Single shared script: language toggle, mobile menu, scroll reveal, project filter (insights/map), carousel, map (`MAP_LOCATIONS`), form. Page-specific JS goes in a guarded block gated on a page id. |

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
3. **`app.js` → `MAP_LOCATIONS`** — one object with `lat`/`lng` so the map dot appears.

Media pipeline: optimise photos into `images/<slug>/` (`sips`, no `ffmpeg` on this machine —
use Swift/AVFoundation to trim hero video + grab a poster). Lazy-load below-fold images.

## Deploy

Production branch is **`main`** → auto-builds on Vercel (`https://rivera-website.vercel.app`).
Deploy by cherry-picking **only the changed files** onto `origin/main` via the worktree trick;
never blanket-push a feature branch or the working tree. Set the commit author email to
`hoanganhhp99@gmail.com`. Confirm at the live URL afterwards, then update `PROGRESS.md`.

## Current status — remaining placeholders

- `about.html` still references a placeholder founder ("Elena") — confirm the real story or relabel.
- Contact email `hello@rivera.estate` and the `index.html` form `YOUR_FORM_ID` are placeholders.
- AU legals still missing: agent licence number, agency details, privacy policy.
- (Real photos + the 7 project detail pages are done; the projects gallery and map are live.)
