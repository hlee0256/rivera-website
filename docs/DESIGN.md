# Rivera — Design System (`DESIGN.md`)

> **Quiet luxury, in code.** This is the definitive technical blueprint for the Rivera
> brand: a boutique Melbourne property practice. Warm earth tones on cream paper, a
> sans/serif type pairing, generous whitespace and a single, consistent easing curve.
>
> Everything here is the source of truth defined in `styles.css` (`:root` + component
> classes). **Build new pages by composing the tokens and components below — never
> hardcode a hex value, font size, or easing curve that isn't in this document.**

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
<a class="pcard" href="the-headland-house.html" data-type="house">
  <div class="photo has-img" style="background-image:url('…')">
    <span class="cap">Coastal</span>
  </div>
  <div class="pcard-body">
    <div class="pcard-head">
      <div><h3>The Headland House</h3><div class="loc">Portsea, VIC</div></div>
      <span class="tag">House</span>
    </div>
    <div class="specs-row">
      <div class="sp"><b>4</b><small>Bed</small></div>
      <div class="sp"><b>3</b><small>Bath</small></div>
      <div class="sp"><b>2</b><small>Car</small></div>
    </div>
    <div class="price-range">
      <span class="pr">$3.2M – $3.8M</span>
      <span class="st">Available</span>
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
