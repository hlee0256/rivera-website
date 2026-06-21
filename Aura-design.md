# Rivera — Design system & project-page standard (`Aura-design.md`)

> **One file, two halves.**
> **Part I** is how to *think* about a page: the philosophy and method set by AURA —
> *"match the effort, not the layout."*
> **Part II** is how to *build* it: the definitive tokens, type, layout, components, motion,
> and the shared `.pd-*` detail-page template.
>
> Everything technical is the source of truth in `styles.css` (`:root` + component classes).
> **Build by composing the tokens and components in Part II — never hardcode a hex, font size,
> or easing curve that isn't here.**

---

# PART I — Design language & method (the AURA standard)

> **Match the effort, not the layout.** The north star for building a project detail page to the
> standard set by `aura-melbourne-square.html`. It captures *how AURA thinks*, so the next project
> earns the same craft without cloning AURA's sections. For the raw tokens, type scale, components
> and motion, see **Part II** below.

AURA is the deliberate **flagship/bespoke** page. Most projects do **not** need a full bespoke
build; they need this *level of care* applied at the right scale (see §5, "Adaptive scaling").

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
  (AURA darkens with altitude). Use the proven dark-section recipe from Part II (§1 gradients).
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
- **No new hex.** Compose `:root` tokens and existing components from Part II. Bespoke pages add
  a single page-scoped `.au-`-prefixed CSS block at the end of `styles.css` and one guarded JS
  block in `app.js` (gated on the page id; never touch the shared reveal observer).
- **No em-dashes.** Middot `·` for separators; en-dash `–` only inside numeric ranges.
- **Three sync points per project:** the card in `projects.html` (status + sale pills,
  per-segment pricing), the detail page, and a `window.MAP_LOCATIONS` entry in `map-data.js`. A
  flagship may also take the `index.html` Featured slot.
- **Deploy** by editing the real folder on `main` and `git push origin main` (see `CLAUDE.md`),
  then confirm live. Update `PROGRESS.md` + `CHANGELOG.md`.

---

# PART II — The technical system (tokens · type · layout · components · motion · templates)

> **Quiet luxury, in code.** The definitive technical blueprint for the Rivera brand: warm earth
> tones on cream paper, a sans/serif type pairing, generous whitespace and a single, consistent
> easing curve. Everything here is the source of truth defined in `styles.css` (`:root` +
> component classes). **Build new pages by composing the tokens and components below — never
> hardcode a hex value, font size, or easing curve that isn't in Part II.**

---

## 1. Color Palette

All colors are declared as CSS custom properties on `:root` in `styles.css`. Reference them
as `var(--token)` — never paste the raw hex into new code.

### Brand & neutrals (the "Rivera Brown on cream paper" system)

| Token | Hex | Semantic role |
|-------|-----|---------------|
| `--espresso` | `#1B130D` | Near-black warm. Dark section backgrounds (stats, footer, CTA bands), darkest UI. |
| `--coffee` | `#2A1E14` | Secondary dark. Photo placeholder base, button hover, deep fills. |
| `--brown` | `#7A4E2D` | **Primary brand color.** Buttons, links, eyebrows, accent serif words on light, active states. |
| `--clay` | `#9A6A41` | Mid-brown. Gradient mid-stops, secondary accent (used inside photo gradients). |
| `--tan` | `#C9A982` | Light warm accent **on dark backgrounds** (logo dot, eyebrow-on-dark, serif accents on dark). |
| `--sand` | `#E6DACA` | Body text color on dark sections. |
| `--paper` | `#F4F0E9` | **Default page background.** |
| `--paper-2` | `#FBF9F4` | Raised surface — cards, the marquee strip, panels on the page bg. |
| `--ink` | `#231A12` | **Primary body text** on paper. Headings. |
| `--ink-soft` | `#6E5E4D` | Secondary / muted text, captions, sub-copy, labels. |

### Borders / hairlines

| Token | Value | Role |
|-------|-------|------|
| `--line` | `rgba(35,26,18,.14)` | Hairline divider/border **on light** surfaces. |
| `--line-d` | `rgba(244,240,233,.16)` | Hairline divider/border **on dark** surfaces. |

### Literal colors (not tokenized — use these exact values where noted)

| Value | Where it's used |
|-------|-----------------|
| `#FBF6EE` | "Warm white" — text/icons on dark (button labels, logo on hero, headings on dark sections). Slightly warmer than pure white; always prefer it over `#FFF`. |
| `#9d8c79` | Form input placeholder text (`::placeholder`). |
| `rgba(251,246,238, α)` | Translucent warm-white for layered text on photos/dark — common α: `.86` (nav/hero body), `.82`, `.74`, `.7`, `.6`, `.34` (faint slot labels). |
| `rgba(230,218,202, α)` | Translucent `--sand` for footer/dark-section text — common α: `.78`, `.66`, `.5`. |

### Layout constant

| Token | Value | Role |
|-------|-------|------|
| `--max` | `1280px` | Max content width (the `.wrap` container). |

### Signature gradients

Photos and dark heroes are never flat — they use warm radial/linear blends:

```css
/* Photo placeholder fill (.photo::before) */
background:
  linear-gradient(125deg, rgba(255,240,222,.10) 0%, transparent 42%),
  radial-gradient(140% 120% at 78% 8%, #b07e4f 0%, #7A4E2D 38%, #3a2616 78%, #211610 100%);

/* Legibility wash over a real photo that carries a caption (.has-img::after) */
background:linear-gradient(to top, rgba(20,13,8,.46) 0%, rgba(20,13,8,.06) 34%, transparent 60%);

/* Featured / detail hero overlay — keeps white text readable on imagery */
background:linear-gradient(to top, rgba(18,12,7,.82) 0%, rgba(18,12,7,.34) 44%, rgba(18,12,7,.42) 100%);
```

---

## 2. Typography

### Font families

| Role | Stack | Loaded weights |
|------|-------|----------------|
| **Sans (body + headings)** | `"Manrope", system-ui, sans-serif` | 300, 400, 500, 600, 700, 800 |
| **Serif accent (`.serif`)** | `"Instrument Serif", Georgia, serif` — **always `font-style: italic`**, weight 400 | italic 0;1 |

Load both from Google Fonts in `<head>`:

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
```

> **The signature move:** every major heading pairs a sans headline with **one** italic
> serif accent word/phrase via `<span class="serif">`. The serif is `--brown` on light
> backgrounds and `--tan` on dark. Use it once per heading — never set whole headings in serif.
> ```html
> <h1>Homes worth <span class="serif">the wait.</span></h1>
> ```

### Base

```css
body{ font-family:"Manrope"; font-size:17px; line-height:1.6; font-weight:400; letter-spacing:-.01em; -webkit-font-smoothing:antialiased; }
h1,h2,h3{ font-weight:700; letter-spacing:-.035em; line-height:1.02; color:var(--ink); }
.serif{ font-family:"Instrument Serif"; font-style:italic; font-weight:400; letter-spacing:0; }
```

### Responsive type scale (fluid via `clamp(min, vw, max)`)

Sizing is fluid — desktop max scales down to a mobile min automatically, **no per-breakpoint
font rules needed**. Use these exact ramps:

| Element | `font-size` | Weight | Notes |
|---------|-------------|--------|-------|
| Hero H1 (landing) | `clamp(2.9rem, 8vw, 7rem)` | 700 | `max-width:16ch`, color `#FBF6EE`; serif accent `--tan`. |
| Detail-page hero H1 | `clamp(2.6rem, 6vw, 5.2rem)` | 700 | on photo, `max-width:16ch`. |
| Page header H1 (projects/about) | `clamp(2.6rem, 6vw, 5rem)` | 700 | `max-width:18ch`; serif accent `--brown`. |
| Statement "big" line | `clamp(1.8rem, 4.2vw, 3.2rem)` | **300** | `line-height:1.18`, `letter-spacing:-.03em`, `max-width:24ch`. |
| Featured H2 | `clamp(2.3rem, 5vw, 4rem)` | 700 | on dark, `#FBF6EE`, serif `--tan`. |
| Enquire H2 | `clamp(2.1rem, 4.4vw, 3.4rem)` | 700 | `max-width:14ch`. |
| Section H2 (`.sec-top`, approach, founder, CTA) | `clamp(2rem, 4vw, 3rem)` | 700 | |
| Detail overview H2 | `clamp(1.9rem, 3.6vw, 2.7rem)` | 700 | `max-width:18ch`. |
| Stat number `.stat .n` | `clamp(2.6rem, 5vw, 4rem)` | **300** | `line-height:1`; serif sub-glyph in `--tan`. |
| Listing/card H3 | `1.35rem` / `1.3rem` | 600 | `letter-spacing:-.03em`. |
| Lead paragraph | `1.08–1.12rem` | 300–400 | `--ink-soft`; constrained `max-width` ~40–58ch. |
| Body copy | `0.96–1.05rem` | 400 | `--ink-soft` for secondary. |

### The eyebrow (ubiquitous section kicker)

```css
.eyebrow{ font-size:.72rem; font-weight:600; letter-spacing:.22em; text-transform:uppercase; color:var(--brown); }
.eyebrow.muted{ color:var(--ink-soft); }   /* neutral */
.eyebrow.light{ color:var(--tan); }         /* on dark */
```

### Letter-spacing system (intentional & consistent)

| Context | `letter-spacing` |
|---------|------------------|
| Headings | `-.035em` (tight) |
| Statement / large light text | `-.03em` |
| Body | `-.01em` |
| Serif accents | `0` |
| Eyebrows / uppercase labels | `.16em`–`.24em` (wide); eyebrow = `.22em`, captions = `.2em`, micro-labels up to `.24em` |
| Buttons | `.04em` |
| Nav/pill labels | `.04em`–`.1em` |

---

## 3. Spacing & Layout

### Container

```css
.wrap{ max-width:1280px; margin:0 auto; padding:0 32px; }   /* var(--max) */
```
Every section's content sits inside a `.wrap`. Horizontal page gutter is **32px**.

### Vertical rhythm — section padding scale

Sections breathe. Padding is `top bottom`, large by design:

| Section | Padding (`top` / `bottom`) |
|---------|----------------------------|
| Statement | `120px` / `104px` |
| Residences (teaser) | `104px` / `104px` |
| Stats (dark) | `96px` |
| Approach / Founder | `120px` |
| Credentials | `110px` |
| Enquire | `120px` |
| Detail body | `96px` / `40px` |
| Detail CTA (dark) | `100px` |
| Gallery (projects) | `64px` / `110px` |
| Page header | `150px` / `64px` (top clears the fixed nav) |
| Marquee | `40px` / `44px` |
| Footer | `80px` / `40px` |

> **Rule of thumb for new sections:** light content sections use **~104–120px** vertical
> padding; dark feature/stat bands use **~96–100px**. Always wrap in `.wrap`.

### Grid system

Minimalist, mostly **3-column** content grids that collapse predictably.

| Grid | Columns | Gap | Collapse |
|------|---------|-----|----------|
| `.grid` (teaser listings) | `repeat(3,1fr)` | `28px` | → 2-col @900 → 1-col @620 |
| `.pgrid` (gallery cards) | `repeat(3,1fr)` | `30px` | → 2-col @900 → 1-col @620 |
| `.grid4` (stats) | `repeat(4,1fr)` | `30px` | → 2-col @820 |
| `.creds-grid` | `repeat(3,1fr)` | `24px` | → 2-col @860 → 1-col @560 |
| `.founder-grid` | `.85fr 1.15fr` | `70px` | → 1-col @860 |
| `.approach-grid` | `1fr 1fr` | `80px` | → 1-col @860 |
| `.enquire-grid` | `1fr 1fr` | `80px` | → 1-col @860 |
| `.pd-grid` (detail overview) | `1.55fr .95fr` | `64px` | → 1-col @900 |
| `.pgall-grid` (detail gallery) | `2fr 1fr` (a `.tall` cell spans 2 rows) | `18px` | → 2-col @760 |
| `.foot-top` | `1.6fr 1fr 1fr` | `40px` | → 2-col @760 |

### Responsive breakpoints (use these exact values)

`560px` · `620px` · `760px` · `820px` · `840px` (nav → burger menu) · `860px` · `900px`

### Border radius scale

| Radius | Used on |
|--------|---------|
| `4px` | Buttons (`.btn`) — deliberately crisp, not pill. |
| `8px` | Teaser listing photos. |
| `10px` | Approach photo. |
| `12px` | Cards (`.pcard`, `.cred`), founder photo, gallery photos. |
| `14px` | Detail specs card (`.pd-card`). |
| `999px` | Pills — tags, filters, language toggle, status chips. |

### Elevation (shadows)

The aesthetic is near-flat; **one** elevation exists, applied only on card hover:

```css
box-shadow: 0 18px 40px -22px rgba(35,26,18,.45);   /* .pcard:hover */
```
Don't introduce new shadows — depth comes from hairline borders (`--line`) and `--paper-2`
raised surfaces, not drop shadows.

---

## 4. UI Components

Copy the structural HTML + rely on the existing classes. Components below are the canonical markup.

### 4.1 Buttons

```css
.btn{ display:inline-flex; align-items:center; gap:10px; cursor:pointer; border:0;
  font:inherit; font-size:.82rem; font-weight:600; letter-spacing:.04em; text-transform:uppercase;
  background:var(--brown); color:#FBF6EE; padding:16px 26px; border-radius:4px;
  transition:background .2s ease, transform .2s ease; }
.btn:hover{ background:var(--coffee); transform:translateY(-1px); }
.btn .arw{ transition:transform .2s ease; }     /* the → arrow */
.btn:hover .arw{ transform:translateX(4px); }
.btn.outline{ background:transparent; color:#FBF6EE; border:1px solid rgba(251,246,238,.45); } /* on dark/photo */
.btn.outline:hover{ background:rgba(251,246,238,.1); }
.btn.dark{ background:var(--espresso); }
```

```html
<a class="btn" href="#enquire"><span>Request a consultation</span> <span class="arw">→</span></a>
<a class="btn outline" href="projects.html">View projects</a>
```

**Text link** (`.lk`) — uppercase, underline-on-hover micro-link:
```css
.lk{ display:inline-flex; align-items:center; gap:8px; font-size:.78rem; font-weight:600;
  letter-spacing:.12em; text-transform:uppercase; color:var(--brown);
  border-bottom:1px solid transparent; padding-bottom:2px; }
.lk:hover{ border-color:var(--brown); }
```

### 4.2 Property / pricing card (`.pcard`)

The core listing card — a raised `--paper-2` surface, hairline border, photo on top, a
divided spec row, and a price/status footer. The whole card is the link.

```html
<a class="pcard" href="671-chapel-street.html" data-type="apartment">
  <div class="photo has-img" style="background-image:url('…')">
    <span class="cap">South Yarra</span>
  </div>
  <div class="pcard-body">
    <div class="pcard-head">
      <div><h3>671 Chapel Street</h3><div class="loc">South Yarra, VIC</div></div>
      <span class="tag">Apartment</span>
    </div>
    <div class="specs-row">
      <div class="sp"><b>1–3</b><small>Bed</small></div>
      <div class="sp"><b>2</b><small>Bath</small></div>
      <div class="sp"><b>1</b><small>Car</small></div>
    </div>
    <div class="price-range">
      <span class="pr">On application</span>
      <span class="st">Now selling</span>
    </div>
  </div>
</a>
```

Key rules:
```css
.pcard{ display:flex; flex-direction:column; border:1px solid var(--line); border-radius:12px;
  overflow:hidden; background:var(--paper-2);
  transition:transform .3s cubic-bezier(.2,.7,.2,1), box-shadow .3s, opacity .35s; }
.pcard:hover{ transform:translateY(-4px); box-shadow:0 18px 40px -22px rgba(35,26,18,.45); }
.pcard .photo{ aspect-ratio:4/5; }                 /* portrait photos */
.specs-row{ display:flex; gap:20px; margin:18px 0 16px; padding:16px 0;
  border-top:1px solid var(--line); border-bottom:1px solid var(--line); }   /* divided rail */
.price-range .pr{ font-size:1.05rem; font-weight:600; color:var(--brown); }  /* price = brown */
.tag,.price-range .st{ /* pill */ border:1px solid var(--line); border-radius:999px;
  padding:6px 12px; font-size:.7rem; font-weight:600; letter-spacing:.1em; text-transform:uppercase;
  color:var(--ink-soft); }
```

**Detail-page specs card** (`.pd-card`) — sticky price/facts panel; same DNA, radius `14px`,
`position:sticky; top:100px`, a `.pd-facts` definition list (label left `--ink-soft`, value
right bold `--ink`, hairline rows), and a full-width `.btn`.

> Note: `projects.html` uses status + sale **pill** cards (no `data-type`, no type filter); the
> `data-type` attribute above is the older teaser markup, kept for reference.

### 4.3 Photo system (`.photo`)

A designed placeholder that becomes a real image by adding `.has-img` + a background-image.

```css
.photo{ position:relative; overflow:hidden; background:var(--coffee) center/cover no-repeat; }
.photo::before{ content:""; position:absolute; inset:0; /* warm gradient — see §1 */
  transition:transform .9s cubic-bezier(.2,.7,.2,1); }
.photo:hover::before{ transform:scale(1.06); }     /* slow zoom on hover */
.photo.has-img::before{ display:none; }            /* hide gradient once a real photo is set */
.photo .cap{ position:absolute; left:18px; bottom:16px; z-index:3; font-size:.68rem;
  font-weight:600; letter-spacing:.2em; text-transform:uppercase; color:rgba(251,246,238,.82); }
```
```html
<!-- placeholder -->  <div class="photo"><span class="cap">Coastal</span></div>
<!-- real photo    -->  <div class="photo has-img" style="background-image:url('images/x.jpg')"><span class="cap">Coastal</span></div>
```
Aspect ratios by context: cards `4/5`, teaser `4/5`, approach `3/4`, founder `4/5`, wide `16/11`.

### 4.4 Form inputs (`.efrm`)

Borderless, underline-only fields — luxury minimalism. The underline animates to `--brown`
on focus. Submission swaps the form for an inline `.thanks` block.

```css
.fld{ position:relative; border-bottom:1px solid var(--line); padding:18px 0; }
.fld input,.fld textarea{ width:100%; border:0; background:transparent; outline:none; resize:none;
  font:inherit; font-size:1.05rem; color:var(--ink); }
.fld input::placeholder,.fld textarea::placeholder{ color:#9d8c79; }
.fld:focus-within{ border-color:var(--brown); }
form.efrm.sent .fld,form.efrm.sent .btn{ display:none; }   /* on success */
form.efrm.sent .thanks{ display:block; }
```
```html
<form class="efrm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" novalidate>
  <div class="fld"><input type="text"  name="name"  placeholder="Your name" required /></div>
  <div class="fld"><input type="email" name="email" placeholder="Email address" required /></div>
  <div class="fld"><textarea name="message" rows="3" placeholder="Anything you'd like us to know"></textarea></div>
  <button class="btn" type="submit"><span>Send enquiry</span> <span class="arw">→</span></button>
  <div class="thanks"><h3>Thank you.</h3><p>Your enquiry has reached us.</p></div>
</form>
```

### 4.5 Navigation (`.nav`)

Fixed bar, transparent over a dark hero, turns to a frosted cream panel on scroll (`.solid`)
or immediately on light pages (`.onlight`).

```css
header.nav{ position:fixed; inset:0 0 auto; z-index:80; height:78px (.nav-in);
  transition:background .3s ease, backdrop-filter .3s ease, border-color .3s; border-bottom:1px solid transparent; }
header.nav.solid,header.nav.onlight{ background:rgba(244,240,233,.86–.92);
  backdrop-filter:saturate(1.2) blur(12px); border-color:var(--line); }
```
- **Landing pages** (dark hero): `<header class="nav">` — starts transparent, JS adds `.solid` past 40px scroll.
- **Sub-pages** (light top): `<header class="nav onlight">` — solid from load.
- Current page's link gets `class="active"` (renders `--brown` when solid).
- Pill **language toggle** (`.lang`) and a frosted full-screen **burger menu** below `840px`.

### 4.6 Other catalogued patterns

| Component | Class | Note |
|-----------|-------|------|
| Stat block | `.stat` `.stat .n` `.stat .l` | Big light number (weight 300) + wide-tracked uppercase label, on `--espresso`. |
| Credential card | `.cred` | `--paper-2`, hairline, an italic serif glyph icon `.ic` in `--brown`. |
| Numbered process list | `.pts` | Hairline-divided rows, `01/02/03` keys in `--brown`. |
| Filter pills | `.filt` (`.active`) | Pill toggle; active = filled `--brown`. |
| Logo marquee | `.marquee-track` `.dev` / `.dev-logo` | Auto-scroll strip; grayscale logos, color on hover; text fallback `.dev`. |
| Tag / status chip | `.tag` `.st` | Hairline pill, `.7rem`, wide-tracked uppercase. |

---

## 5. Motion

A restrained, consistent motion language. **One hero easing curve** carries the brand.

### The Rivera easing curve

```css
cubic-bezier(.2, .7, .2, 1)
```
A soft, confident decelerate. Use it for any **movement** (reveals, card lift, photo zoom,
menu slide). Simple **color/opacity** changes use plain `ease`.

### Durations & transitions

| Interaction | Property | Duration | Easing |
|-------------|----------|----------|--------|
| Button hover | `background`, `transform` (translateY -1px) | `.2s` | `ease` |
| Button arrow nudge | `transform` (translateX 4px) | `.2s` | `ease` |
| Link/pill/filter hover | `color`, `border-color`, `background` | `.2s`–`.25s` | `ease` |
| Card hover lift | `transform` (-4px) + `box-shadow` | `.3s` | `cubic-bezier(.2,.7,.2,1)` / `ease` |
| Photo hover zoom | `transform` scale(1.06) | `.9s` | `cubic-bezier(.2,.7,.2,1)` |
| Nav solidify | `background`, `backdrop-filter`, `border-color` | `.3s` | `ease` |
| Mobile menu slide | `transform` (translateY) | `.35s` | `cubic-bezier(.2,.7,.2,1)` |
| Scroll reveal `.rev` | `opacity` + `transform` (translateY 22px → 0) | `.8s` | `opacity ease`, `transform cubic-bezier(.2,.7,.2,1)` |
| Logo marquee | `transform` translateX(0 → -50%) | `40s` | `linear infinite` |

### Scroll-reveal pattern

Elements get `.rev` (start `opacity:0; translateY(22px)`) and `.in` is added by an
`IntersectionObserver` (`threshold:.12`) to animate in. Stagger via
`transition-delay:(i%3)*0.06s`.

```css
.rev{ opacity:0; transform:translateY(22px);
  transition:opacity .8s ease, transform .8s cubic-bezier(.2,.7,.2,1); }
.rev.in{ opacity:1; transform:none; }
```

### Accessibility

Always honour reduced motion — the system already disables the marquee and reveals:
```css
@media (prefers-reduced-motion: reduce){ .rev{ opacity:1; transform:none; } .marquee-track{ animation:none; } }
```

---

## 6. Page templates (the shared `.pd-*` project detail page)

`aura-melbourne-square.html` is the bespoke flagship (see Part I). **Every other project page is
the shared template** — clone `380-melbourne.html` and swap content. The order is fixed; scale
the depth to the material (see Part I §5), never invent sections to fill a shape.

### 6.1 Detail-page section order

1. **Hero (`.pd-hero`)** — full-bleed, dark, text bottom-left. Prefer a looping muted video as
   the **first child**: `<video class="hero-vid" autoplay muted loop playsinline poster="…">`
   (`.pd-hero .hero-vid` makes it cover). No video → `background-image` on `.pd-hero`. Contains
   `.pd-back` ("← All projects"), `.eyebrow light`, `<h1>`, `.pd-loc` (address), and a
   `.pd-tagstrip` of up to ~4 `.st` chips.
2. **Overview (`.pd-body > .pd-grid`)** — two columns: prose `.pd-lead` + sticky spec card
   `.pd-card` (see §4.2). `.pd-lead` = eyebrow + split serif `<h2>` + two short paragraphs
   (lead with story + location) + a `.pd-features` Highlights list (`<span class="fi">01</span>`,
   ~5 points). `.pd-card` = `Guide` price `.pr`, an icon `.specs-row` (bed/bath/car), a
   `.pd-facts` key/value list, a full-width `.btn`, and a `.pd-note` indicative-price disclaimer.
3. **Gallery (`.pd-gallery`)** — the crossfade carousel (§6.2).
4. **Location (`.pd-map-sec`)** — the Google-Maps panel (§6.3).
5. **CTA (`.pd-cta`)** — dark band, split serif heading, one paragraph, `.btn` + back link.
6. **Footer** — the shared footer, verbatim.

Cards link with `<a class="pcard" href="<slug>.html">` (the whole card is the link — **no
`data-type`, no filter** on `projects.html`; status/sale pills carry the meaning). Media goes
to `images/<slug>/` via `sips` + Swift/AVFoundation (no `ffmpeg` on this machine — see
`CLAUDE.md`); lazy-load below-fold imagery.

### 6.2 Gallery carousel + category tabs

One framed `#pcarousel`, **crossfade** (not slide), auto-advance every 4.8s, pause on hover,
arrows + dots, swipe on touch (logic = the guarded carousel block in `app.js`). Each slide:
`<div class="pc-slide" data-cat="…" style="background-image:url('…')"><span class="pc-cap" …></span></div>`.
Tabs (`#pcTabs`) filter via `data-cat`. Vocabulary: `all`, `residence` (label **Interiors /
Phòng ngủ**), `building`, `views`, `amenities`. The `data-cat` **key is fixed**; only its label
is translated (note the key stays `residence` even though the label reads "Interiors"). Keep
categories balanced and interleave them so the "All" reel alternates interior / building / view.

### 6.3 Location map (no API key)

A real Google map that **looks static** but opens Google Maps on click:
- `<iframe class="pd-map-frame" src="https://www.google.com/maps?q=<ADDRESS>&z=15&output=embed">`
  with `pointer-events:none` (reads as a still image).
- A full-panel `<a class="pd-map-overlay" href="https://www.google.com/maps/search/?api=1&query=<ADDRESS>" target="_blank">` makes the whole map clickable.
- A `.pd-map-bar` below shows the address + an "Open in Google Maps →" link.
- The map is **warm-tinted with CSS** (`filter: sepia(.42) saturate(.82) hue-rotate(-8deg) …`
  plus a `--brown` multiply overlay) to sit in the palette. An exact themed map would need the
  paid Maps JS API — deliberately avoided. (`map.html` is a separate, richer Leaflet map; its
  marker data lives in `map-data.js` as `window.MAP_LOCATIONS`.)

---

## Appendix — Build checklist for a new page

1. Link the fonts + `styles.css`; add `app.js` before `</body>`.
2. Copy a `<header class="nav …">` and `<footer>` from an existing page verbatim (keeps nav,
   language toggle, mobile menu, reveals working). Add `onlight` for light-topped pages.
3. Wrap every section's content in `.wrap`; use the §3 padding scale for vertical rhythm.
4. Headings = sans + exactly one `<span class="serif">` accent (`--brown` on light, `--tan` on dark).
5. Use only `var(--*)` colors and the documented `clamp()` type ramps — no new hex, no new sizes.
6. Compose from the §4 components; reuse `cubic-bezier(.2,.7,.2,1)` for any new movement.
7. Bilingual content convention: every visible string carries `data-en` + `data-vi`
   (placeholders `data-en-ph`/`data-vi-ph`) on **leaf** elements — see `CLAUDE.md`.

---

## References

- `CLAUDE.md` — quick orientation, the hard rules, and the read/update workflow.
- `PROGRESS.md` — current status board + locked decisions + open threads (read first).
- `CHANGELOG.md` — append-only dated history (skim only, for backstory).
- `TAKEAWAYS.md` — build retrospective + notes on working efficiently with AI.
- `legacy/` — retired `PROJECT-DESIGN-RULES.md` / `DEPLOY.md` (superseded; do not follow).
