# Add a project — fill-in template

Hand this filled-in form to Claude and say **"add this project to the Rivera site."**
Claude will wire up all three places a project lives, so the projects page and the map
stay in sync automatically:

1. A card on **`projects.html`** (the filterable gallery).
2. A new **detail page** `your-slug.html` (hero, specs, features, gallery, enquiry CTA).
3. A pin in the **map** (`app.js` → `MAP_LOCATIONS`). This one object is what puts the
   **dot on `map.html`** — fill in `lat` / `lng` and the dot appears, in sync with the card.

You don't need to touch any code. Just fill the blanks below. Anything you leave blank,
Claude will either use the listed default or ask you about.

---

## How the two languages work

The site is bilingual and **Vietnamese is the source of truth** — write VI in natural,
native Vietnamese, not translated word-for-word from English. For each field you can:

- Give **both** EN and VI (best), **or**
- Give **just Vietnamese** (or just English) and tell Claude "write the other" — it will
  write VI natively and EN naturally to match the site's calm, boutique tone.

Proper nouns (project name, street, suburb) are usually the **same in both languages** —
just write them once and Claude will mirror them.

---

## ✂️ COPY FROM HERE — blank form

```
=== RIVERA — NEW PROJECT ===

# 1. Basics
Slug (url, lowercase-with-dashes):        e.g. garden-walk   →  becomes garden-walk.html
Project name (shown as the title):
Type (house | apartment | townhouse):

# 2. Location & MAP DOT  (lat/lng = the dot on map.html)
Suburb / short location (EN):             e.g. Brighton, VIC
Suburb / short location (VI):             (same if a proper noun)
Full street address:                      e.g. 12 Example St, Brighton VIC
Latitude (lat):                           e.g. -37.9061   ← decimal, negative for Melbourne
Longitude (lng):                          e.g. 144.9986   ← decimal
   (Don't have coordinates? Paste a Google Maps link or the address and Claude will look them up.)

# 3. Specs
Bedrooms:                                 e.g. 4   (ranges ok: 1–3)
Bathrooms:                                e.g. 3
Car spaces:                               e.g. 2
Internal size:                            e.g. 165 sqm   (optional)
Built / completion:                       e.g. 2024  or  Off the plan · 2028   (optional)

# 4. Pricing & status
Price guide (EN):                         e.g. $3.2M – $3.8M   or  On application
Price guide (VI):                         (same, or e.g. Giá theo yêu cầu)
Status badge (EN):                        e.g. Available / Move-in ready / By appointment / New
Status badge (VI):                        e.g. Còn trống / Sẵn sàng dọn vào / Theo lịch hẹn / Mới

# 5. Card copy (the gallery card on projects.html)
Photo caption — short, EN:                e.g. Bayside   (1–2 words, the little tag on the photo)
Photo caption — short, VI:                e.g. Ven vịnh

# 6. Detail-page copy
One-line map blurb (EN):                  one calm sentence — shown in the map popup
One-line map blurb (VI):
Lead paragraph 1 (EN):                    2–4 sentences describing the home
Lead paragraph 1 (VI):
Lead paragraph 2 (EN):                    (optional second paragraph)
Lead paragraph 2 (VI):
Six "a closer look" features (EN):        short phrases, one per line, e.g.
                                            - Private north courtyard
                                            - Rooftop terrace
                                            - ...
Six features (VI):

# 7. Photos  (leave blank to use tasteful placeholder images for now)
Hero image (wide, top of detail page):    file path or URL
Card / list thumbnail:                     file path or URL
Gallery image 1:
Gallery image 2:
Gallery image 3:
   (Real photos go in an images/your-slug/ folder. Just give the filenames and Claude
    wires the paths; drop the actual files in afterwards.)

=== END ===
```

✂️ — COPY TO HERE

---

## Worked example (so you can see what "filled in" looks like)

```
=== RIVERA — NEW PROJECT ===

# 1. Basics
Slug:           hawthorn-rise
Project name:   Hawthorn Rise
Type:           townhouse

# 2. Location & MAP DOT
Location (EN):  Hawthorn, VIC
Location (VI):  Hawthorn, VIC
Address:        8 Liddiard Street, Hawthorn VIC
Latitude:       -37.8221
Longitude:      145.0350

# 3. Specs
Bedrooms:       4
Bathrooms:      3
Car spaces:     2
Internal:       190 sqm
Built:          2025

# 4. Pricing & status
Price (EN):     $2.4M – $2.9M
Price (VI):     $2.4M – $2.9M
Status (EN):    New
Status (VI):    Mới

# 5. Card copy
Caption (EN):   Leafy east
Caption (VI):   Đông xanh mát

# 6. Detail-page copy
Map blurb (EN): A garden townhouse on a quiet Hawthorn street, walk to Glenferrie Road.
Map blurb (VI): Nhà phố có vườn trên con phố yên tĩnh ở Hawthorn, đi bộ tới Glenferrie Road.
Lead 1 (EN):    A row of four garden townhouses set back behind established planes...
Lead 1 (VI):    Một dãy bốn căn nhà phố có vườn, lùi vào sau hàng cây...
Features (EN):  Private garden / North living / Two living zones / Walk to Glenferrie /
                Double garage / Architect-designed
Features (VI):  Vườn riêng / Phòng khách hướng bắc / Hai khu sinh hoạt / Đi bộ tới Glenferrie /
                Garage đôi / Thiết kế bởi kiến trúc sư

# 7. Photos
(blank — use placeholders for now)

=== END ===
```

---

## What Claude does with it (you don't need to read this — it's the build recipe)

When given a filled form, Claude will:

1. **`projects.html`** — copy an existing `<a class="pcard" … data-type="…">` block, set
   `href="slug.html"`, `data-type` to the chosen type (the filter counts update
   themselves), and fill name, location, specs, price, status and photo caption with
   `data-en` / `data-vi` on the leaf `<span>`s per the bilingual rules in `CLAUDE.md`.

2. **`slug.html`** — duplicate an existing detail page (e.g. `brunswick-mews.html`),
   swap in the hero image, eyebrow (`Location · Type`), name, tag strip, lead paragraphs,
   the six "A closer look" features, the price/specs side card and facts (Internal,
   Built, Type), the gallery images and the "Enquire about <name>" CTA.

3. **`app.js` → `MAP_LOCATIONS`** — append one object so the **map dot** appears:

   ```js
   { id:'slug', cat:'project', url:'slug.html',
     nameEn:'Project name', nameVi:'Project name',
     lat:-37.xxxx, lng:144.xxxx,
     address:'Full street address',
     descEn:'One-line map blurb (EN).',
     descVi:'One-line map blurb (VI).',
     status:{ en:'Status (EN)', vi:'Status (VI)' } },
   ```

   `cat:'project'` renders it as a large brand-brown pin, `url` makes the popup link to the
   detail page, and `status` shows the availability badge. Because the card and the pin are
   both filled from this one form, the projects page and the map stay in sync.

**Rules Claude keeps:** bilingual `data-en` + `data-vi` on every visible string (never on an
element that has child tags — put them on the inner spans); reuse existing CSS variables and
component classes; match the quiet, boutique tone; Vietnamese written natively, not calqued.
