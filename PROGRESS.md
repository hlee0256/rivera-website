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
Deployed on **Vercel** from `main` (`https://rivera-website.vercel.app`). Pages: `index.html`
(landing, featuring AURA), `projects.html` (7-project collection), `about.html`, `map.html`,
`insights.html` + insight articles, `enquire.html`, `guide.html`, and 7 project detail pages.
AURA is the deliberately bespoke flagship; the other detail pages follow the shared `.pd-*`
template.

**2.0 layer (2026-07-02):** landing hero runs real project footage (the 671 Chapel Street
golden-hour film, self-hosted); every page carries the floating Zalo + Messenger dock
(injected by `app.js`, same design as the enquire dock) and a Zalo line in the footer; all
public pages have canonical/OG/Twitter/theme-color meta + JSON-LD; `sitemap.xml`,
`robots.txt` and `.vercelignore` (keeps `*.md`/`legacy/`/`tools/`/`maplab/` off the deploy);
internal variants (`380-melbourne-so-sanh.html`, `index-380.html`) are `noindex`.

## Open threads

- ~~`index.html` enquiry form Formspree `YOUR_FORM_ID`~~ — **done (2026-07-02):** the landing
  (and `index-380.html`) forms now post to the same Google Apps Script lead backend as
  `enquire.html` (shared `LEAD_ENDPOINT` in `app.js`), with an optional phone/Zalo field.
  **Owner action:** send one real test enquiry end-to-end; verify the Zalo deep-link
  (`zalo.me/0782067555`) resolves on a phone; confirm Messenger `m.me/61589577010550` is the
  business Page (it's now in the site-wide dock).
- AU real-estate legals still missing: agent licence number, agency details, privacy policy.
  Now also **blocks running Meta/TikTok lead ads**, not just the domain switch. (About-page
  credentials copy softened on 2026-06-30 until confirmed.)
- SEO layer (2026-07-02) uses the Vercel staging URL as base: when **rivera.au** goes live,
  re-base canonical/OG URLs + `sitemap.xml`/`robots.txt` (one scripted pass).
- Social launch (July): once FB/IG/TikTok handles are final, add social links to the footer
  and `sameAs` to the index JSON-LD.
- Fact check: VIC off-the-plan concession end date reads **20/10/2026** on the AURA page but
  **21/04/2027** on `insight-off-the-plan.html` (found 2026-07-02) — verify and align.
- Map (`map.html` / `map-data.js`) and the landing teaser: keep in sync as projects change.
- Domain not yet pointed: site runs on the Vercel staging URL. To go live on **rivera.au**, add
  the domain in Vercel → Settings → Domains (A record `76.76.21.21` or the CNAME Vercel gives),
  but only after the placeholder/legals threads above are cleared.

## Decisions locked

- **VI is the default and the source language.** Write VI natively, never calque from English.
- **No em-dashes** anywhere in copy. Period/comma/colon, or middot `·`; en-dash `–` only in numeric ranges.
- **`projects.html` = the 7 real projects**, pill cards (status + sale) + lowest-per-segment "from $X" pricing. No type filter, no fictional listings.
- **AURA is the effort/quality bar** for project pages — see `Aura-design.md`. Match the effort, not the layout.
- **The real folder `~/Desktop/Rivera-Website` (`main`) is the source of truth.** Edit it directly; deploy = commit + push `main` → Vercel. Don't work in git worktrees; never commit `.env*`.
