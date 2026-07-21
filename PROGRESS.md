# PROGRESS.md — Rivera live state

**What state the site is in and what's in flight.** Short by design: read this first; it's the
shared memory that keeps work coherent. The dated history lives in `CHANGELOG.md` (skim-only).

**After a site-changing task:** update the Status Board row and Open threads if either changed,
and add one short entry to the top of `CHANGELOG.md`. That's it.

> Want a visual view? Ask **"build a progress dashboard"** → a read-only `progress.html` in the
> Rivera palette, from the Status Board + `CHANGELOG.md`.

---

## Build pipeline (the shared vocabulary for "Stage")

`Brief → Research → Media → Design → Build → Review → Verify → Live`

| Stage | Means |
|-------|-------|
| **Brief** | Materials in (`Projects/<Name>/`: renders, price list, brochure, short brief). |
| **Research** | Facts verified from the brief + web + the PDFs. Nothing invented; unknowns flagged. |
| **Media** | Photos curated + optimised into `images/<slug>/`; any hero video trimmed to a clean window. |
| **Design** | The project's **one organizing idea** chosen + the section plan that the material supports. |
| **Build** | Bilingual page built (VI-native), Rivera tokens/components, page-scoped CSS/JS if bespoke. |
| **Review** | Self-review pass: native VI, factual honesty, no em-dashes, a11y, links/assets, balance. |
| **Verify** | Previewed in EN + VI, desktop + mobile; screenshots. |
| **Live** | Pushed to `main` (Vercel) and confirmed at the live URL. |

---

## Project Status Board

| Project | Type | Stage | Live | Updated | Notes |
|---|---|---|---|---|---|
| AURA at Melbourne Square | Apartment · flagship (bespoke) | Live | ✅ | 2026-06-21 | Bespoke "Ascent" page; full-bleed hero film; featured on the landing page with a click-through zoom |
| Piccolo House (Kew) | Apartment | Live | ✅ | 2026-06-19 | Garden pavilions; amenities-led; FIRB-fee-covered hook |
| Collins Wharf · Aluna | Apartment | Live | ✅ | 2026-06-18 | Pre-construction, Lendlease |
| Collins Wharf · Ancora | Apartment | Live | ✅ | 2026-06-18 | Under construction, Lendlease |
| 671 Chapel Street | Apartment | Live | ✅ | 2026-06-18 | Under construction, CASA / Bates Smart |
| 380 Melbourne | Apartment | Live | ✅ | 2026-06-17 | Completed, Elenberg Fraser |
| Aspire Melbourne | Apartment | Live | ✅ | 2026-06-17 | Completed, ICD Property |

`projects.html` shows exactly these 7, as pill cards with per-segment pricing (no filter, no
fictional placeholders).

---

## Current state

Static, bilingual (**VI default** / EN), no-build marketing site for Rivera, a boutique
Melbourne property practice. One shared `styles.css` + `app.js` (map markers in `map-data.js`).
Deployed on **Vercel** from `main`; **live on the custom domain `https://rivera.au`** (apex +
`www`). Pages: `index.html`
(landing, featuring AURA), `projects.html` (7-project collection), `about.html`, `map.html`,
`insights.html` + insight articles, `enquire.html`, `guide.html`, and 7 project detail pages.
AURA is the deliberately bespoke flagship; the other detail pages follow the shared `.pd-*`
template. Three standalone, `noindex`, VI-only client documents also live in the repo (not linked
from the site): `380-melbourne-so-sanh.html`, `canopy-van-hanh.html` (Canopy House owner
proposal, 2026-07-03) and `can-1704-chi-tiet-tai-chinh.html` (A4 financial summary for
apartment 1704, 2026-07-21; reusable skeleton in `templates/bang-gia-template.html`).

## Open threads

- ~~`about.html` placeholder founder "Elena"~~ — **done (2026-06-30):** removed; story is now an anonymous practice story, no name/signature/portrait. Stats set to 10 yrs · 100+ families · 50+ suburbs.
- ~~Contact email `hello@rivera.estate`~~ — **done (2026-06-30):** now `info.riveraau@gmail.com` site-wide, with VN +84 782 067 555 / AUS +61 450 151 686 in every footer. **Still open:** the `index.html` enquiry form `YOUR_FORM_ID` (Formspree id) is unset; verify the Zalo deep-link (`zalo.me/0782067555`) resolves.
- `can-1704-chi-tiet-tai-chinh.html`: the source brief named no project/development for
  unit 1704, so the doc header carries only unit + level. Add the project name (and address)
  once the owner confirms which development it is.
- AU real-estate legals still missing: agent licence number, agency details, privacy policy. (About-page credentials copy softened on 2026-06-30 to avoid an unverifiable REIV-membership claim until confirmed.)
- Map (`map.html` / `map-data.js`) and the landing teaser: keep in sync as projects change.
- ~~Domain not yet pointed~~ — **done:** `rivera.au` + `www.rivera.au` are pointed and serving
  production (verified 2026-07-03 via the Vercel project domains). The old
  `rivera-website.vercel.app` staging hostname is **not** assigned to the project and does not
  resolve; use `https://rivera.au/...` for every shared link (e.g. the standalone client docs).
  Note: the `*.vercel.app` deployment aliases are login-gated by Vercel deployment protection;
  only the `rivera.au` custom domain is public.

## Decisions locked

- **VI is the default and the source language.** Write VI natively, never calque from English.
- **No em-dashes** anywhere in copy. Period/comma/colon, or middot `·`; en-dash `–` only in numeric ranges.
- **`projects.html` = the 7 real projects**, pill cards (status + sale) + lowest-per-segment "from $X" pricing. No type filter, no fictional listings.
- **AURA is the effort/quality bar** for project pages — see `Aura-design.md`. Match the effort, not the layout.
- **The real folder `~/Desktop/Rivera-Website` (`main`) is the source of truth.** Edit it directly; deploy = commit + push `main` → Vercel. Don't work in git worktrees; never commit `.env*`.
