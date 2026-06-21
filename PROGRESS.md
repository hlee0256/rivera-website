# PROGRESS.md — Rivera master log

The single source of truth for **what state the site is in and what is in flight.**
Every agent reads this first and **updates it before finishing** any site-changing task
(this is enforced in `CLAUDE.md`).

> Want a visual view? Ask: **"build a progress dashboard from PROGRESS.md"** and the agent
> will generate a `progress.html` (read-only, styled in the Rivera palette) from the Status
> Board + Log below. Regenerate it any time this file changes.

---

## How to update (required of every agent)

**Before you start:** read this file, then `CLAUDE.md`, `DESIGN.md`, and `Aura-design.md`.

**Before you finish any task that changes the site:**
1. Update the row in the **Project Status Board** (or add one) — set the Stage, Live, Updated.
2. Add **one dated entry** to the top of the **Log** (newest first), using the template.
3. If you opened or resolved a site-wide issue, update **Open threads**.

Keep entries short and factual. Never delete Log history; only the summary sections
(Status Board, Current state, Open threads) get rewritten.

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
| **Live** | Deployed to `main` (Vercel) and confirmed at the live URL. |

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
Melbourne property practice. One shared `styles.css` + `app.js`. Deployed on **Vercel** from
`main` (`https://rivera-website.vercel.app`). Pages: `index.html` (landing, featuring AURA),
`projects.html` (7-project collection), `about.html`, `map.html`, `insights.html` + insight
articles, `enquire.html`, `guide.html`, and 7 project detail pages. AURA is the deliberately
bespoke flagship; the other detail pages follow the shared `.pd-*` template.

## Open threads

- `about.html` still references a placeholder founder ("Elena", 3×) — confirm the real story or relabel.
- Contact email `hello@rivera.estate` and the `index.html` enquiry form `YOUR_FORM_ID` are placeholders.
- AU real-estate legals still missing: agent licence number, agency details, privacy policy.
- Map (`map.html`) and the landing teaser: keep in sync as projects change.
- Housekeeping: stale per-session worktrees under `.claude/worktrees/` can be pruned.

## Decisions locked

- **VI is the default and the source language.** Write VI natively, never calque from English.
- **No em-dashes** anywhere in copy. Period/comma/colon, or middot `·`; en-dash `–` only in numeric ranges.
- **`projects.html` = the 7 real projects**, pill cards (status + sale) + lowest-per-segment "from $X" pricing. No type filter, no fictional listings.
- **AURA is the effort/quality bar** for project pages — see `Aura-design.md`. Match the effort, not the layout.
- **Deploy = cherry-pick the changed files onto `origin/main`** (worktree trick). Never blanket-push a feature branch or working tree to production.

---

## Log (newest first)

### 2026-06-21 · Claude (Opus) · Workflow docs + Desktop folder repair
- **Asked to:** establish a better master progress sheet, extract AURA's design language into `Aura-design.md`, make `CLAUDE.md` enforce progress updates, and fix the local Desktop folder.
- **Did:** created `PROGRESS.md` (this file) with a Status Board + pipeline; created `Aura-design.md`; refreshed `CLAUDE.md` (corrected stale facts, added the mandatory "update PROGRESS.md" rule + doc pointers); switched the Desktop working tree from the stale `chore/cleanup-folder` back to `main` (old WIP preserved in a stash).
- **Files touched:** PROGRESS.md (new), Aura-design.md (new), CLAUDE.md.
- **Follow-ups:** none.

### 2026-06-21 · Claude (Opus) · AURA: immersive hero + landing feature + zoom
- **Did:** rebuilt the AURA hero as a full-bleed film (trimmed developer clip); made AURA the landing-page Featured Residence running the same film; added a cross-document View-Transition zoom between them; fixed the CTA heading contrast.
- **Files touched:** aura-melbourne-square.html, index.html, styles.css.
- **Follow-ups:** none.

### 2026-06-19 · Claude (Opus) · Added AURA at Melbourne Square (bespoke)
- **Did:** built the bespoke "Ascent" detail page (research → design panel → review), optimised 30 renders + a trimmed hero film, added the projects card + map marker.
- **Files touched:** aura-melbourne-square.html (new), styles.css, app.js, projects.html, images/aura-melbourne-square/.
- **Follow-ups:** none.

### 2026-06-19 · (prior session) · Added Piccolo House (Kew)
- **Did:** added the Piccolo House project (detail page, card, map, images).

### 2026-06-18 · Claude · Project-card redesign + Collins Wharf
- **Did:** redesigned `projects.html` cards (status + sale pills, per-segment pricing); added Collins Wharf Aluna + Ancora detail pages and cards.
- **Files touched:** projects.html, styles.css, app.js, collins-wharf-*.html, images/.

### 2026-06-18 · (prior session) · Cleanup + map upgrades
- **Did:** removed the 9 fictional placeholder projects (show only the real ones); shipped map upgrades (search, icons) to the live site.

### 2026-06-17 · (history) · Initial build
- **Did:** first version of the site; map page; the early project detail pages; bilingual copy pass.
