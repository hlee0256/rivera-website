# TAKEAWAYS.md — lessons from building the AURA page (and the site around it)

A retrospective of the hard-won, easy-to-forget things from this build. For the next agent or
the next project. Pairs with `Aura-design.md` (the design bar + the token/component system),
`PROGRESS.md` (status), `CLAUDE.md` (rules), `CHANGELOG.md` (history). This file is the *war stories*.

---

## 1. The process that actually produced the quality

The AURA page wasn't one-shot. It came from a 3-phase pipeline, each phase a small fan-out:
1. **Understand** — 5 parallel agents: web facts, web location/investment case, price-list PDF,
   brochure/flip-book deep-read, photo curation. Returned structured data (schemas).
2. **Design** — a concept panel: 4 distinct directions (Ascent / Editorial / Cinematic / MA),
   2 judges scored them, 1 synthesis merged the winner + best grafts into a build blueprint.
3. **Review** — 3 adversarial agents: bilingual/copy quality, factual accuracy, technical/a11y.
   This caught the most important defects (Vietnamese calques, unsourced claims).

Takeaway: for a flagship, **design by panel beats design by first idea.** For routine projects,
this is overkill — match the *effort* (research + curation + review), not the full machinery.

## 2. Media on this Mac (NO ffmpeg / no poppler / no ImageMagick)

What's available: `swift` (+ AVFoundation/AppKit), `sips`, and a throwaway venv with pymupdf+Pillow.

- **Video frames / poster:** Swift `AVAssetImageGenerator` (set `requestedTimeToleranceBefore/After = .zero`
  for exact frames; `maximumSize` to downscale). Used to scan the film and grab posters.
- **Trim / stitch:** Swift `AVMutableComposition` (insert one or more `CMTimeRange`s into a video-only
  track) + `AVAssetExportSession`.
  - **Passthrough** (`AVAssetExportPresetPassthrough`, `shouldOptimizeForNetworkUse=true`) = no
    re-encode, tiny, adds faststart — BUT it rounds cuts to keyframes (±~0.5s). **Dangerous for
    precise text-free cuts** (a keyframe-rounded edge can re-include a title-card frame).
  - **Re-encode** (`AVAssetExportPreset1920x1080`) = frame-accurate cuts (use this when the cut
    must be exact), at the cost of a bigger file (the 11s AURA cut → 4.7MB).
  - Always set `ct.preferredTransform = vt.preferredTransform` or the video may come out rotated.
- **Photos:** `sips -Z <maxpx> -s formatOptions <q>` to resize/compress into `images/<slug>/`.
- **PDFs:** `python3 -m venv /tmp/pdfvenv && pip install pymupdf Pillow`; `fitz` for text +
  `page.find_tables()` for price lists.

## 3. The hero-video saga (the biggest time-sink, and the lesson)

The developer's "hero video" is a **98s marketing film with title/branding cards baked in
THROUGHOUT** — not clean footage. The arc of changes (owner-driven): still tower → trimmed 5s
clip → full original (owner asked) → **clean text-free cut** (owner asked).

Lessons:
- **Marketing films are text-laden.** You must **densely scan** (every 1–2s) to map clean vs
  text segments, then **refine the boundaries** — text fades linger ~1–1.5s longer than a sparse
  scan shows (e.g. "A higher state of mind" was still on screen at 13.5s).
- The clean footage existed only in **short windows** (~4–9.5s, ~14–17s, ~21–23s, ~28–29s,
  ~33–37s); everything from ~40s on was branding (AURA / Melbourne Square / COX·OCULUS·DKO / a
  long static OSK logo — that logo tail was what made it look "stuck at the end").
- The fix: **stitch the clean windows, re-encode frame-accurate** (so no fade leaks), verify the
  OUTPUT frame-by-frame.
- **Colour grade** was done in **CSS** (`filter: saturate/contrast/brightness` on `.au-vt-hero`),
  not baked into the video — trivially tunable, and it also grades the poster (same element).

## 4. Pricing / PDF extraction

- Parse with `page.find_tables()`; group available units by `beds-baths-cars`; show the
  **lowest "from $X" per bedroom tier**. Cross-check parsed-row count against the number of
  "available" rows to confirm full capture.
- **Completed** projects have no developer price list → use the detail page's guide floor.
- Studios are often coded `beds=1` in the sheet — split them out by Product Type.

## 5. Git & deploy reality (READ THIS — it caused the most confusion)

> **UPDATE (2026-06-21, commit `462000f`): the workflow below is now SUPERSEDED.** The real
> folder `~/Desktop/Rivera-Website` (branch `main`) is the single source of truth. **Edit it
> directly; deploy = commit the changed files + `git push origin main` → Vercel.** Do **not**
> create worktrees for routine work (they hide edits in a folder the owner can't see), and
> never commit `.env*`. The worktree saga below is kept as *why* the Desktop-folder confusion
> happened — not as the method to use.

Multiple Claude sessions each run in their **own git worktree** under `.claude/worktrees/<name>/`
on their own branch. `main` (the live branch, Vercel) **moves under you** as other sessions
merge (Piccolo House, map upgrades all landed mid-stream). Consequences:

- **Never deploy by copying your whole file over main's.** `styles.css`, `app.js`,
  `projects.html`, `index.html` accumulate other sessions' work. Overwriting wipes it.
- **Deploy = splice your specific additions onto current `origin/main`:**
  `git worktree add -b deploy-x /tmp/x origin/main`, then apply ONLY your deltas (append your
  `.au-` CSS block; insert your `MAP_LOCATIONS` entry; prepend your `.pcard`; replace just the
  block you changed). A Python string-replace with `assert old in s` is a reliable splice.
  Commit (author email `hoanganhhp99@gmail.com`), `git push origin deploy-x:main`, remove worktree.
- **Cache-safety for media:** rename the file on every swap (`hero.mp4` → `hero-full.mp4` →
  `hero-cut.mp4`) and repoint refs, so no stale CDN/browser copy.
- **The Desktop-folder trap:** the owner's `~/Desktop/Rivera-Website` was stuck on an old branch
  (`chore/cleanup-folder`, 19 behind `main`) with leftover uncommitted WIP — so they couldn't see
  AURA/Piccolo/etc. in their folder. Fix: `git stash -u` (preserve), `git checkout main`,
  `git merge --ff-only origin/main`. **It is now on `main`** and tracks live; routine doc/copy
  changes can be committed + pushed straight from there. Old WIP is preserved in a stash + the
  `chore/cleanup-folder` branch. Stale worktrees under `.claude/worktrees/` are prunable.

## 6. CSS / HTML gotchas actually hit (and the fix)

- **Page-wide rule clobbering a component by source order:** `.au h2{color:var(--ink)}` sat
  *after* `.pd-cta h2{color:#FBF6EE}` in the file and had equal specificity → the CTA heading's
  sans half went dark-on-dark. Fix: a later, equal/▴-specificity `.au-cta h2{color:#FBF6EE}`.
- **Accidental high-specificity override:** `svg.ic{width:100%}` beat `.price-specs .ic{width:18px}`
  → giant icons. Remove the stray rule.
- **`.wrap` (margin:0 auto) inside a flex hero** centers itself → hero copy floated to the middle
  over the bright video. Fix: `width:100%` so it left-aligns over the dark scrim.
- **Nav contrast:** plain `nav` has light text (for dark heroes); over a *light* panel it's
  invisible → use `nav onlight`. When the AURA hero became a full-bleed dark video, switched back
  to plain `nav`.
- **macOS case-insensitive FS:** a lowercase `design.md` would collide with `DESIGN.md` → named
  the AURA doc `Aura-design.md`.
- **Dark sections:** reuse the proven `.pd-cta` recipe (`#FBF6EE` text, `rgba(230,218,202,.74)`
  body, `--tan` accents, `--line-d` dividers). Near-black = a black `rgba` overlay over `--espresso`,
  NOT a new hex token.

## 7. Bilingual + copy discipline

- `data-en`/`data-vi` on **leaf spans only** — never on an element with child tags (the JS swap
  replaces textContent and deletes children). Headings split: sans span + `.serif` span.
- **Vietnamese is the source language** — write it native, then EN. The review caught real
  calques: "lời thiền"→"chiêm nghiệm"; "tầng tâm thức cao hơn"→"cảnh giới an nhiên hơn";
  "người mua trên giấy"→"người mua nhà hình thành trong tương lai". Run a VI-native pass.
- **No em-dashes.** Middot `·` for separators; en-dash `–` only in numeric ranges.
- Keep counts balanced: `grep -o 'data-en=' f.html | wc -l` == `data-vi=` count.

## 8. Preview-tooling quirks (so you don't chase ghosts)

- The screenshot tool **resets scroll to top** — to capture a below-fold section, isolate it
  (hide sibling sections + force `.au-rev`/`.rev` to `.in`) via `preview_eval`.
- The preview **caches `styles.css`** — bust with `link.href='styles.css?v='+Date.now()` or inject
  the fresh CSS as a `<style>` before screenshotting.
- The preview server serves **one folder** (it was the worktree, not the Desktop) — know which.
- Headless **video autoplay** often shows paused-but-loaded (`currentTime>0`, `readyState 4`);
  it loops fine for real users (same attributes as the other detail pages).

## 9. The landing→detail "zoom" (cross-document View Transitions)

- Both pages opt in with an inline `<style>@view-transition{navigation:auto}</style>` (scoped to
  just those two pages, not global). The featured film and the hero film share
  `class="au-vt-hero"` → `view-transition-name:aura-hero`, so the browser morphs one into the other.
- **Continuity:** hand the featured film's `currentTime` to the hero via `sessionStorage`
  (`aura-hero-t`) so the hero **resumes** instead of restarting. Cheap, big immersion win.
- **Load delay:** mostly inherent to a multi-page site; mitigated by a small + already-cached
  video and a `<link rel="prefetch">` of the detail page. Truly instant would need an SPA (avoid).
- Progressive enhancement: Chromium-best; other browsers just navigate normally.

## 10. The one design principle (don't lose this)

**Match AURA's effort, not its layout.** Find each project's single organizing idea and build the
structure from it. AURA's was the vertical "ascent" (67 levels, 3 stacked sky-clubs) — that's
AURA's, not a template. Don't reuse the altitude rail / clubs / ladder unless a project earns it.
Scale sections to the material; never pad, never invent. Full detail in `Aura-design.md`.

---

# Phần II — Làm việc với AI cho hiệu quả (ghi cho chủ dự án)

> Bốn mục dưới đây viết bằng tiếng Việt, rút ra từ chính phiên xây dựng AURA này. Mục tiêu:
> ra cùng một chất lượng nhưng tốn ít token (và ít vòng lặp) hơn ở lần sau.

## 11. Người dùng làm tốt gì · Cần cải thiện gì

**Làm tốt (giữ nguyên):**
- **Giao trọn bộ tài liệu từ đầu** (folder `Projects/<Tên>/`: renders, bảng giá, brochure, brief).
  Đây là việc tiết kiệm token nhất bạn làm: AI không phải đi hỏi, đi tìm, đi đoán.
- **Quyết định dứt khoát** khi được hỏi (chọn nhanh qua các câu hỏi A/B/C). Không lưỡng lự.
- **Cho gu rõ ràng + giao quyền thực thi** ("phải khác các trang khác", "đẹp nhất từ trước tới giờ"),
  rồi sửa bằng phản hồi cụ thể. Đây là cách dùng AI đúng: nói *ý đồ*, để AI lo *cách làm*.
- **Đầu tư vào tài liệu bền vững** (`PROGRESS.md`, `Aura-design.md`, `CLAUDE.md`, memory). Đây là
  đòn bẩy lớn nhất: ngữ cảnh sống sót qua các phiên, lần sau AI không phải học lại từ đầu.
- **Khoá các quyết định lặp lại** (VI là gốc, không em-dash, cách deploy) vào docs/memory để khỏi
  phải nói lại mỗi lần.

**Cần cải thiện:**
- **Chốt "spec" trước khi AI bắt tay vào việc nặng.** Vụ hero video đổi ý 4 vòng
  (full → cắt → chỉnh màu → hiệu ứng zoom). Mỗi vòng = xuất lại video + deploy lại + kiểm tra lại =
  rất nhiều token. Nếu ngay từ đầu nói gọn một câu *"cắt sạch chữ, lặp liền mạch, tăng màu nhẹ,
  có hiệu ứng zoom khi click"* thì gộp được 4 vòng thành 1.
- **Gộp nhầm việc không liên quan trong một tin nhắn dài** thì ổn, nhưng các sửa nhỏ (CTA chữ mờ,
  "file lưu ở đâu") lại đến *sau khi* AI đã làm xong phần lớn việc, nên phải quay lại chỉnh.
- **Hiểu một lần về chỗ lưu file / git** thay vì hỏi giữa chừng "file ở đâu, tải về sao". Xem mục 13.
- **Đưa ảnh/ví dụ tham chiếu sớm** cho các yêu cầu kiểu "làm cho khác" để rút ngắn vòng AI dò gu.

## 12. Những thao tác NGỐN TOKEN nhất (theo thứ tự)

1. **Workflow đa tác tử** (panel thiết kế 4 hướng + 2 giám khảo, fan-out nghiên cứu, review đối kháng).
   Mỗi agent tự đọc file → nhân token lên nhiều lần. *Xứng đáng cho trang flagship; thừa cho việc thường.*
2. **Quét khung hình video dày đặc** (Swift lấy frame mỗi 1–2s suốt phim 98s, rồi *đọc* các ảnh đó).
   Đọc ảnh rất đắt; làm lại nhiều lần qua mỗi bản video càng nhân lên.
3. **Vòng lặp kiểm tra preview** (screenshot + snapshot + đọc lại sau *mỗi* lần chỉnh CSS nhỏ).
4. **Đọc lại các file lớn lặp đi lặp lại** (`styles.css` 400+ dòng, `app.js`) chỉ để sửa một đoạn nhỏ.
5. **Đọc PDF/brochure bằng cách render ra ảnh** (bảng giá, flip-book) rồi OCR.
6. **Điệu nhảy deploy bằng worktree** với các bước đọc-lại để xác nhận splice.

## 13. Thao tác THỪA / kém hiệu quả — bạn tự làm sẽ rẻ hơn nhờ AI

- **Tự mở file trong Finder, đừng nhờ AI "tải về".** File luôn nằm sẵn trong
  `~/Desktop/Rivera-Website`. Folder này giờ đã bám nhánh `main` (nhánh live) nên cứ để yên, đừng
  chuyển nhánh — đó là lý do trước đây bạn "không thấy" AURA/Piccolo trong folder.
- **Sửa chữ/typo nhỏ bạn có thể tự làm.** Đây là HTML thuần. *Lưu ý quan trọng:* phải sửa trong
  **thuộc tính** `data-vi="..."` và `data-en="..."`, KHÔNG phải chữ giữa hai thẻ (script ghi đè
  chữ giữa thẻ khi tải trang). Sửa cả hai thuộc tính, lưu file là xong — khỏi tốn một vòng AI.
- **Tự xem video gốc & chỉ ra mốc cắt** (vd "giữ 0:04–0:09 và 0:33–0:37") thay vì để AI quét cả phim.
  Riêng việc này tiết kiệm nhiều token nhất ở khâu media.
- **Tự chọn sẵn 6–8 ảnh đẹp nhất** thay vì để AI duyệt cả 30 render — bạn hiểu căn hộ hơn AI.
- **Nếu đã có sẵn con số (giá, diện tích, fact), hãy dán thẳng vào** thay vì để AI bóc tách PDF/OCR.
- **Gộp các sửa nhỏ thành một lần** thay vì nhỏ giọt từng cái sau khi AI đã chạy việc lớn.

## 14. AI phải preload gì — có thực sự cần?

**Phân biệt quan trọng (đừng nhầm như bản nháp đầu của mục này): chi phí là THEO PHIÊN, không
phải theo tác vụ.**
- `CLAUDE.md` được **tự động** nạp vào đầu *mỗi phiên* (không tránh được, mà cũng đúng — nó là luật).
- `PROGRESS.md` / `Aura-design.md` **KHÔNG** tự nạp. Chúng chỉ được đọc vì `CLAUDE.md` *bảo* đọc;
  và một khi đã đọc trong phiên thì nằm luôn trong ngữ cảnh, nên **chỉ trả phí một lần cho cả
  phiên**, không phải mỗi lần sửa.

Hệ quả: nỗi lo "mỗi tweak nhỏ cũng tốn token đọc mấy file md" phần lớn **không đúng**. Nó chỉ lãng
phí khi *cả phiên* chỉ làm đúng một việc tí xíu (đọc bộ ba ~10K token, một lần). Phiên nào làm việc
thật thì khoản đọc đó coi như miễn phí. Và nhớ: `PROGRESS.md` (locked decisions) chính là thứ *ngăn*
các lỗi tốn token nhất (thêm nhầm bộ lọc, dịch ngược tiếng Việt, phải làm lại) — bỏ nó là tiết kiệm giả.

**Đã sửa:**
- `CLAUDE.md` giờ quy định: **luôn** đọc `PROGRESS.md` (ngắn, chặn lỗi đắt); chỉ đọc
  `Aura-design.md` **khi đụng thiết kế/dựng/sửa trang**, bỏ qua được cho sửa typo/doc.
  Đây là toàn bộ phần token tiết kiệm được một cách an toàn.
- **Gộp `DESIGN.md` vào `Aura-design.md`** (theo yêu cầu): giờ chỉ còn MỘT file design —
  Part I là triết lý/phương pháp (AURA standard), Part II là hệ token/component/motion (nguyên
  `DESIGN.md` cũ). Bớt một file phải đọc, mọi tham chiếu đã trỏ lại sang `Aura-design.md`.
- `PROJECT-DESIGN-RULES.md` (trùng hệ design) và `DEPLOY.md` đã nằm trong `legacy/` — hết nạp trùng.

**Còn lại (biết thì hơn, khó tắt):** danh sách công cụ MCP nạp sẵn rất dài (lịch, Notion, Figma,
Slack, computer-use…) gần như vô dụng cho một site tĩnh, nhưng nó là cơ chế của Claude Code, không
chỉnh trong repo được.

**Một dòng kết:** preload đúng = *luật + trạng thái* (ngắn, luôn nạp) + *hệ thiết kế* (dài, chỉ nạp
khi đụng tới thiết kế). Đó là cách giảm token cố định mà không mất chất lượng — nhưng đừng phóng đại:
khoản này nhỏ, và cắt nhầm `PROGRESS.md` còn tốn hơn nhiều.
