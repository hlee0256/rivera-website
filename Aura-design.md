# Aura-design.md — the Rivera project-page design language

> **Match the effort, not the layout.** This is the north star for building a project detail
> page to the standard set by `aura-melbourne-square.html`. It captures *how AURA thinks*, so
> the next project earns the same craft without cloning AURA's sections. For the raw tokens,
> type scale, components and motion, see `DESIGN.md` — this file never re-documents those.

AURA is the deliberate **flagship/bespoke** page. Most projects do **not** need a full bespoke
build; they need this *level of care* applied at the right scale (see "Adaptive scaling").

---

## 1. Philosophy

- **Quiet luxury.** Calm, confident, warm. No hype, no exclamation marks, no "luxury living
  redefined". Restraint is the flex. Let whitespace and one serif accent carry the elegance.
- **The monograph voice.** AURA reads like an authored publication, not a brochure: a running
  edition line, numbered chapters, captioned "plates", a closing colophon. The site is a
  *collection*; each project is an *edition*.
- **Lead with place and story, then the finishes, then the amenities.** Sell the feeling and
  the location. Numbers (price, levels, year) are framed as **indicative**.
- **Honesty is part of the luxury.** Verified facts only; unknowns are left out or flagged.
  Prices "indicative", imagery "artist's impression", off-the-plan stated plainly. A frank
  "Rivera's view" (the real trade-offs) builds more trust than salesmanship.
- **Vietnamese first.** VI is the source language, written natively and idiomatically — never
  calqued from English. A meaningful share of buyers are VI-speaking; the VI must feel native.

---

## 2. The one principle (the essence)

**Find the project's single organizing idea, then derive the structure from it.**

AURA's idea was a *vertical wellness ecosystem* — body→mind→spirit rising up a 67-level tower
through three stacked sky-clubs. Everything followed from that: the altitude rail, the
darkening "sky" chapters, the level numerals, the bottom-to-top collections ladder.

That idea is **AURA's, not the template's.** A waterfront project's idea might be horizontal
(a walk along the water); a heritage terrace's might be restoration/time; a small completed
apartment's might simply be "move-in-ready in the heart of the city". **Do not reuse AURA's
rail/ascent/ladder unless the new project genuinely earns them.** First decide the idea, then
choose devices that serve it.

State the chosen idea in one line (e.g. in PROGRESS.md / to the owner) before building, so it
can be redirected early.

---

## 3. The effort bar (what "AURA-level effort" means)

This is the part to replicate every time, at any scale:

1. **Research deeply.** Mine the brief + the project's PDFs (price list, brochure) + the web.
   Verify the developer, architect, status, amenities, location story. Flag anything unconfirmed.
2. **Extract the assets properly.** Parse the price list to the **lowest price per
   beds-baths-cars segment** ("from $X"). Curate the strongest, most varied photos (don't dump
   all of them). Trim any hero video to a clean window with no title cards; optimise media.
3. **Write native bilingual copy.** VI first and idiomatic, then natural EN. Calm boutique tone.
4. **Self-review adversarially** before shipping: native-VI check, factual honesty, no
   em-dashes, accessibility, every asset path resolves, `data-en`/`data-vi` counts balanced.
5. **Verify for real** in the browser: both languages, desktop + mobile, no console errors.
6. **Performance + a11y are not optional:** lazy-load below-fold imagery, give media explicit
   dimensions/aspect-ratio, keep a scrim under text-over-image, respect `prefers-reduced-motion`.

---

## 4. The device palette (draw from — only if the content earns it)

These are AURA's moves. Treat them as a kit, not a checklist. Reach for one only when the
project's idea and material justify it; otherwise leave it out.

- **Full-bleed film hero** (the shared `.pd-hero` pattern): the developer's clip, trimmed to a
  clean window, muted-autoplay-loop, copy overlaid on a gradient scrim. Falls back to a still.
- **Gallery strip directly under the hero** — a horizontal scroll-snap "contact sheet" of
  folio-tagged plates, ordered to preview the journey. Native CSS, zero JS.
- **A value journey** — sections shift light→dark (or warm→cool) to *feel* the narrative
  (AURA darkens with altitude). Use the proven dark-section recipe from `DESIGN.md`.
- **Giant ghosted numerals / labels** as quiet section IDs (decorative, `aria-hidden`).
- **Folio-plate captioning** (`Pl. 01…`) so many renders read as a curated collection.
- **Editorial chaptering** — a running edition line + numbered chapters + a closing colophon.
- **Ladders & indexes** — a level ladder for collections; a "minutes from your door" index for
  location (middot separators); a typographic **price ledger** instead of a boxed spec card.
- **Shared-element zoom** — the landing-page featured film and the detail hero film carry the
  same `view-transition-name` so a click morphs/zooms between them (cross-document View
  Transitions; opt in per page with `@view-transition{navigation:auto}`; graceful fallback).

---

## 5. Adaptive scaling (rich vs lean)

Projects differ in material. Scale the page to what you actually have — **never pad, never
invent sections to fill a shape.**

- **Flagship / data-rich** (a tower with many renders, amenity floors, multiple collections):
  the full treatment is warranted — multiple chapters, the journey, ladders, bespoke `.au-` CSS.
- **Standard apartment** (a handful of renders, one or two configs): a strong, tighter page —
  hero, a short in-depth intro, one or two image sections, pricing, location, CTA. Mostly the
  shared template + one signature touch tied to its idea.
- **Completed / resale, thin material:** lean and honest — hero, a concise story, the guide
  price, location, CTA. Quality of copy and curation still carries it.

A section menu to choose from (use a subset): hero · under-hero gallery · in-depth intro/story
· amenities or "the building" · residences/collections · interiors · views · location (map +
minutes) · the particulars (pricing + facts + Rivera's view) · CTA.

---

## 6. Guardrails (always)

- **Bilingual** `data-en` + `data-vi` on **leaf** spans only — never on an element with child
  tags (the swap replaces text content and would delete children). Headings split into a sans
  span + a `.serif` accent span. Placeholders use `data-en-ph`/`data-vi-ph`. Keep counts equal.
- **No new hex.** Compose `:root` tokens and existing components from `DESIGN.md`. Bespoke
  pages add a single page-scoped `.au-`-prefixed CSS block at the end of `styles.css` and one
  guarded JS block in `app.js` (gated on the page id; never touch the shared reveal observer).
- **No em-dashes.** Middot `·` for separators; en-dash `–` only inside numeric ranges.
- **Three sync points per project:** the card in `projects.html` (status + sale pills,
  per-segment pricing), the detail page, and a `MAP_LOCATIONS` entry in `app.js`. A flagship
  may also take the `index.html` Featured slot.
- **Deploy** by cherry-picking the changed files onto `origin/main` (the worktree trick), then
  confirm live. Update `PROGRESS.md`.

---

## 7. References

- `DESIGN.md` — the token/component/motion system (the "how it's built").
- `CLAUDE.md` — quick orientation + the hard rules + the update-PROGRESS rule.
- `PROGRESS.md` — current status board + log.
- `PROJECT-DESIGN-RULES.md` — the older design contract (overlaps `DESIGN.md`; this file and
  `DESIGN.md` take precedence where they conflict).
