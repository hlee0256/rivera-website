# CHANGELOG.md — Rivera history (newest first)

Append-only dated log. **Not required reading** — `PROGRESS.md` holds the live state agents
need. Read here only when you want the backstory of a past decision. After a site-changing
task, add one short entry to the top.

---

### 2026-07-03 · Claude · Canopy proposal v3: fixed rate 600/wk, restructured comparison
- **Head Lease fixed rate locked at 600/tuần** (was 620) per owner. 4.4 recomputed with a
  marketing fee line (−400): mgmt net 30,442 (≈585/tuần, −19.8% vs 730), HL 31,200 (−17.8%),
  diff +758. Table now precedes the bar chart; "Cách đọc" rewritten neutral (no HL bias).
- **Phần 4 restructured**: 4.1 Trách nhiệm (duties only; bảo hiểm toà nhà removed — OC covers
  it; builder-warranty HL column → "Rivera hỗ trợ"), 4.2 Chi phí (owner's compact
  Khoản phí | Đề xuất format), 4.3 Rủi ro (dropped "ai gánh" from title), 4.4 thực nhận.
- **Phần 3** gains a "Các khoản phí trong Head Lease" table (OC/Council/Land Tax/Water Rates →
  chủ sở hữu; utilities → công ty, thu lại từ tenant).
- **Phần 5**: "Cách kiểm chứng" flow removed; added 3 comparable-listing link cards at
  Normanby Road/Southbank (TenantApp ×2, realestate.com.au — links only, no scraped prices;
  both sites block automated fetch).
- **Cam kết**: builder-warranty item removed (selling agent's job); new item "Thời gian bắt
  đầu: 2 tuần sau ngày bàn giao" (setup: rèm, kiểm tra, vệ sinh, ảnh, đăng tin).

### 2026-07-03 · Claude · Canopy proposal v2: visual rework per owner feedback
- **`canopy-van-hanh.html` heavily condensed and made graphic** (owner: "ít chữ, nhiều graphics"):
  Về Rivera → stat cards + bullets; TOC section removed (sections renumbered 1–8); options A/B
  tightened into 3 duty cards each; 4.1 table sorted owner-rows first, utilities merged into one
  row ("Rivera tự quản lý"), builder-warranty row → Chủ sở hữu, the word "chịu" dropped; 4.2
  merged the market up/down rows; 4.3 now a single 730 scenario ("giả lập tự cho thuê") with a
  CSS bar chart: 730 nominal → ≈593/tuần net (−18%) vs Head Lease 620 (−15%), 770/820 removed.
- Section 6 rewritten as "Căn cứ định giá": stat cards (213 căn · mùa đông · 20 căn · 2–3 tuần),
  cost-of-waiting cards, 3-step verification flow.
- "anh/chị" → "chủ nhà" throughout; "của Rivera" dropped from headings (Khuyến nghị, Cam kết);
  RTBA bond commitment removed; all "bằng tiếng Việt" phrases removed; cam kết now 7 cards;
  next steps as a numbered timeline.

### 2026-07-03 · Claude · The Canopy House owner proposal page (standalone)
- **New `canopy-van-hanh.html`:** standalone, Vietnamese-only, `noindex` document page for one
  owner (three units at The Canopy House), built verbatim from the owner's Word doc
  `Rivera_Canopy_De_Xuat_Van_Hanh.docx`. Nine sections as in the doc: about Rivera, contents,
  option A (8% management), option B (head lease 620/wk), 3 comparison tables (costs, risk,
  net-income at 730/770/820), the 730 valuation rationale, recommendation, 8 commitments, next steps.
- Follows the `380-melbourne-so-sanh.html` pattern: self-contained CSS with the Rivera tokens,
  own nav/footer, **no serif italic accents** (purely informational, per owner's request), no
  `app.js`/lang toggle, not linked from any site page.

### 2026-06-30 · Claude (Opus) · About-page cleanup + real contact details (pre-client review)
- **`about.html` rebuilt for client presentation:**
  - **Removed the fictional founder** "Elena Rivera" (name, signature, role, and the stock portrait).
    The story section is now an anonymous practice story (eyebrow "Our Story / Câu chuyện của chúng tôi"),
    ending on a "boutique property practice · Melbourne" line. Per owner's call.
  - **Premium on-brand imagery:** swapped the two external Unsplash photos for warm AURA renders already
    in `images/aura-melbourne-square/` (`club-cumulus-sunset.jpg` for the story, `living-room.jpg` for philosophy).
  - **Stats corrected** to the owner's real-ish figures: 10 years · 100+ families · 50+ suburbs (was 18 / 200+ / 60+).
    Credentials softened to honest claims (dropped the specific REIV-membership wording; licence number still pending).
  - **Em-dashes removed** from all body copy (10 in the old page) → commas/colons/periods; footer copyright +
    page-title em-dashes kept (allowed exceptions). `data-en`/`data-vi` balanced (51/51).
- **Contact details set site-wide:** `hello@rivera.estate` → **info.riveraau@gmail.com** across 26 production pages,
  plus two phone lines added to every footer Contact column and the landing "Direct line" block:
  **VN +84 782 067 555** and **AUS +61 450 151 686**. (`maplab/` and `legacy/` left as-is, non-production.)
- **Enquire page:** wired the floating Zalo button to the VN line (`https://zalo.me/0782067555`) and relabelled its
  tooltip to "Chat on Zalo / Trò chuyện qua Zalo" (was an inert "coming soon" placeholder).
- **Verified** in Chromium, full page, both languages (VI + EN) at 1280px.
- **Follow-ups still open:** `index.html` enquiry form still has `YOUR_FORM_ID` (Formspree id not set);
  AU legals (agent licence number, agency details, privacy policy); confirm the Zalo deep-link format resolves.

### 2026-06-24 · Claude (Opus) · Market notes: four new insight articles (week of 24 June 2026)
- **Four new notes added to `insights.html`** (newest first), each its own page, bilingual VI-native,
  no em-dashes, web-sourced and cited:
  - `insight-aml-ctf.html` (policy) — AML/CTF Tranche 2: from 1 July 2026 agents/conveyancers/lawyers
    must run buyer identity + source-of-funds checks. Curated short and plain for VI investors. Source: AUSTRAC.
  - `insight-buyers-gain-ground.html` (numbers) — Melbourne median ~$812,621, ~2.9% below Nov-2025 peak;
    sales down ~14.2% y/y, listings up; buyer leverage. Source: Cotality/CoreLogic.
  - `insight-clearance-below-50.html` (numbers) — combined capitals clearance 47.4% (w/e 21 Jun), first
    sub-50% since the pandemic; Melbourne 50.6%. Source: Domain / The Nightly.
  - `insight-off-the-plan-investors.html` (policy) — VIC temporary off-the-plan duty concession open to
    all buyers incl. investors/companies/trusts; deduct construction costs; to contracts before 21 Apr 2027. Source: SRO Vic.
- **`insights.html`:** four cards prepended to the feed; "Last updated" set to 24 June 2026. `data-en`/`data-vi` balanced (106/106).
- **Note:** the local `AML CTF` source folder isn't present in this cloud checkout; AML article was written from verified AUSTRAC/web sources.
- **Follow-ups:** none.

### 2026-06-21 · Claude (Opus) · Merged DESIGN.md into Aura-design.md; conditional doc reads; TAKEAWAYS Part II
- **Docs merge:** folded `DESIGN.md` into **`Aura-design.md`** so there is now ONE design doc —
  **Part I** the project-page standard/method (the old Aura-design content), **Part II** the
  token/type/component/motion system + `.pd-*` template (the old DESIGN.md, verbatim). Deleted
  `DESIGN.md`; repointed every reference (`CLAUDE.md`, `legacy/README.md`, `TAKEAWAYS.md`) to
  `Aura-design.md` Part I/II. Append-only CHANGELOG entries below keep their original `DESIGN.md`
  wording (history isn't rewritten).
- **Conditional reads (token saving):** `CLAUDE.md` workflow now requires **only** `PROGRESS.md`
  before every task; `Aura-design.md` is read **only** when touching design/layout/copy/build.
  Rationale: the read cost is per-session, not per-task, and skipping `PROGRESS.md` (locked
  decisions) is what causes the expensive re-dos — so it stays mandatory.
- **TAKEAWAYS.md:** added Part II (working-with-AI retrospective in Vietnamese): what the owner
  does well / to improve, the most token-heavy operations, redundant ops the owner can self-serve,
  and what AI must preload. Corrected the deploy section to the real-folder workflow.
- **Files touched:** Aura-design.md (merged), CLAUDE.md, TAKEAWAYS.md, legacy/README.md,
  CHANGELOG.md; DESIGN.md (deleted).
- **Follow-ups:** none.

### 2026-06-21 · Claude (Opus) · Docs slimmed, map data split out, real-folder workflow
- **Docs:** retired the two redundant briefing docs into `legacy/`. `PROJECT-DESIGN-RULES.md`
  (the "older contract") ~90% duplicated CLAUDE/DESIGN and had stale, contradictory facts
  (claimed a type filter + `<article>`/`data-type` cards on `projects.html`; told agents to use
  `ffmpeg`/`convert`). Salvaged its only unique, still-true content (the `.pd-*` detail-page
  recipe, carousel category vocab, Google-Maps iframe pattern) into **`DESIGN.md` §6**.
  `DEPLOY.md` was an orphan one-time bootstrap; kept only its rivera.au DNS note (now in
  `PROGRESS.md`). The read set is now `CLAUDE` · `PROGRESS` · `DESIGN` · `Aura-design`.
- **PROGRESS split:** `PROGRESS.md` is now a short, bounded live-state file (board + locked
  decisions + open threads); this dated history moved here so the file agents must read stops
  growing heavy.
- **Map data extracted:** moved `MAP_LOCATIONS` (27 markers) out of `app.js` into a new
  `map-data.js` (`window.MAP_LOCATIONS`), loaded before `app.js` on `map.html` only. A data
  typo now breaks only the map, not site-wide JS; non-map pages stop downloading map data.
- **Workflow / security:** moved all work into the real `~/Desktop/Rivera-Website` folder (prior
  edits had landed in a hidden git worktree). Gitignored `.env.local` (held a `VERCEL_OIDC_TOKEN`
  that was about to be committable). Simplified the deploy doctrine to "edit the real folder on
  `main`, commit, push → Vercel".
- **Files touched:** CLAUDE.md, DESIGN.md, Aura-design.md, PROGRESS.md (rewritten), CHANGELOG.md
  (new), app.js, map-data.js (new), map.html, .gitignore; DEPLOY.md + PROJECT-DESIGN-RULES.md →
  `legacy/` (+ legacy/README.md).

### 2026-06-21 · Claude (Opus) · Added TAKEAWAYS.md (build retrospective)
- **Did:** wrote `TAKEAWAYS.md` at root, a war-stories retrospective of building the AURA page and the site around it: the 3-phase design pipeline, media on this Mac (no ffmpeg/poppler/ImageMagick), the hero-video saga + clean-cut method, pricing/PDF extraction, git & deploy reality, the CSS/HTML gotchas actually hit, bilingual discipline, preview-tooling quirks, the cross-document View-Transitions zoom, and the one design principle. Pairs with `Aura-design.md` / `DESIGN.md` / `PROGRESS.md` / `CLAUDE.md`.
- **Files touched:** TAKEAWAYS.md (new), PROGRESS.md.
- **Follow-ups:** none.

### 2026-06-21 · Claude (Opus) · AURA film: clean text-free cut + grade + smoother zoom
- **Did:** re-cut the hero film to text-free footage only (4 windows stitched, frame-accurate: rowers/jogger/tower detail · architectural+woman · tea · water+zen-stones, ~11.3s → `hero-cut.mp4`), removing every title/branding card incl. the long OSK logo tail (fixes the "stuck at the end"). Added a subtle colour grade (saturate/contrast/brightness via `.au-vt-hero` filter) on both films. Added a landing→detail playback-time hand-off (sessionStorage) so the hero film resumes where the featured film left off instead of restarting, and a `prefetch` of the AURA page for a snappier click-through.
- **Files touched:** images/aura-melbourne-square/hero-cut.mp4 (new), aura-melbourne-square.html, index.html, styles.css, app.js; removed hero-full.mp4.
- **Follow-ups:** colour grade is mild + easily tunable; the cross-document zoom continuity is best in Chromium (graceful fallback elsewhere).

### 2026-06-21 · Claude (Opus) · AURA hero: use the full original film
- **Asked to:** use the original (uncut) developer film for the AURA hero instead of the trimmed clip.
- **Did:** exported the full 98s film (video-only passthrough + faststart → `hero-full.mp4`) and repointed both the AURA hero and the landing-page Featured film to it; removed the old trimmed `hero.mp4`.
- **Files touched:** images/aura-melbourne-square/hero-full.mp4 (new), aura-melbourne-square.html, index.html; removed hero.mp4.
- **Follow-ups:** the original film carries title/branding cards throughout and a long static OSK Property logo tail (~56s on); flagged to the owner in case a different cut is wanted later.

### 2026-06-21 · Claude (Opus) · Workflow docs + Desktop folder repair
- **Asked to:** establish a better master progress sheet, extract AURA's design language into `Aura-design.md`, make `CLAUDE.md` enforce progress updates, and fix the local Desktop folder.
- **Did:** created `PROGRESS.md` with a Status Board + pipeline; created `Aura-design.md`; refreshed `CLAUDE.md` (corrected stale facts, added the mandatory "update PROGRESS.md" rule + doc pointers); switched the Desktop working tree from the stale `chore/cleanup-folder` back to `main` (old WIP preserved in a stash).
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
