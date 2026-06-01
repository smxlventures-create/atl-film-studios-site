# MANUS REDESIGN V2 — atlfilmstudios.com

**Source of truth.** Read this file end-to-end and execute every section. Then redeploy to `atlfilmweb-dlx5ztgv.manus.space` and confirm the public URL.

Companion research files in `set-rentals/research/`:
- `color-audit.md` — logo-pixel-sampled palette
- `film-studio-design-research.md` — A24/Focus/Mack Sennett benchmarks

---

## 0. WHY THIS PASS

The user reviewed the current deploy and called out:
1. **"Looks washed out"** — current palette is warm cream paper + pastel mint, doesn't match the cyan logo
2. **"Need all sets in the menu"** — current nav has a single "The Stages" link, hides the 8 sets
3. **"Make this a finished project contained in Manus"** — no more half-built pages; Jail Cell and Prison Cell still have placeholder content

The cyan in the logo is **`#00E5F0`** (sampled from the actual PNG, not approximated). The current `#4dd6c1` is desaturated and 30° green-shifted. That's the wash-out.

---

## 1. NAVIGATION — Sets dropdown + sticky sub-nav

Replace the current top nav. Pattern matches Mack Sennett Studios and Quixote.

**Header (every page):**

```html
<header class="site-header">
  <a href="/" class="logo"><img src="/photos/atl-film-studios-logo-2025.png" alt="ATL Film Studios"></a>
  <nav class="site-nav">
    <ul class="nav-list">
      <li class="has-dropdown">
        <a href="/sets/" aria-haspopup="true" aria-expanded="false">Sets <span aria-hidden="true">▾</span></a>
        <ul class="dropdown">
          <li><a href="/sets/courtroom.html">Courtroom</a></li>
          <li><a href="/sets/hospital.html">Hospital</a></li>
          <li><a href="/sets/psych-wall.html">Psych Wall</a></li>
          <li><a href="/sets/police-bullpen.html">Police Bullpen</a></li>
          <li><a href="/sets/interrogation.html">Interrogation</a></li>
          <li><a href="/sets/jail-cell.html">Jail Cell</a></li>
          <li><a href="/sets/prison-cell.html">Prison Cell</a></li>
          <li><a href="/sets/led-walls.html">LED Walls</a></li>
        </ul>
      </li>
      <li><a href="/about.html">About</a></li>
      <li><a href="/location.html">Location</a></li>
      <li><a href="/faq.html">FAQ</a></li>
      <li><a href="/contact.html">Contact</a></li>
      <li><a href="/contact.html" class="nav-cta">Request Quote</a></li>
    </ul>
  </nav>
</header>
```

Dropdown opens on hover (desktop) **and** click/tap (mobile + accessibility). Mobile: nav collapses to ☰ hamburger; "Sets" becomes an expandable accordion section listing all 8.

**Sets sub-nav strip (only on `/sets/*` pages, sits right under the header, sticky beneath it):**

```html
<nav class="sets-subnav" aria-label="All sets">
  <a href="/sets/courtroom.html">Courtroom</a>
  <a href="/sets/hospital.html">Hospital</a>
  <a href="/sets/psych-wall.html">Psych Wall</a>
  <a href="/sets/police-bullpen.html">Police Bullpen</a>
  <a href="/sets/interrogation.html">Interrogation</a>
  <a href="/sets/jail-cell.html">Jail Cell</a>
  <a href="/sets/prison-cell.html">Prison Cell</a>
  <a href="/sets/led-walls.html">LED Walls</a>
</nav>
```

Active set link gets a `--accent` underline. Horizontal scroll on mobile (whitespace `nowrap`, hide scrollbar).

**Do NOT** use a photo mega-menu — pushes the site toward "Vegas" feel. None of A24/Focus/Steiner/Mack Sennett use one.

---

## 2. COLOR PALETTE — Replace `:root` block in full

The current cream-paper + pastel-mint combo is the root cause of the "washed out" feel. Replace with this exact block. **Do not adjust values without checking back.**

```css
:root {
  /* Grounds — invert dominance: dark is the brand ground, paper is the breather */
  --black:           #0a0d0f;  /* near-black with a cool 1° hint */
  --ink:             #14181b;  /* primary dark surface */
  --ink-soft:        #1d2225;  /* card/aside on dark */
  --paper:           #f2f3f4;  /* cool neutral white, no cream */
  --paper-warm:      #e6e8ea;  /* subtle tonal pair, still cool */

  /* Text */
  --text-on-dark:    #ecedee;
  --text-on-light:   #14181b;
  --muted:           rgba(236, 237, 238, 0.62);
  --muted-dark:      rgba(20, 24, 27, 0.62);

  /* Accent — pulled from logo pixels */
  --accent:          #00E5F0;  /* the actual logo cyan */
  --accent-glow:     #5EF2F8;  /* hover/focus halo */
  --accent-deep:     #009DA8;  /* WCAG-safe cyan for text on light */
  --accent-soft:     rgba(0, 229, 240, 0.10);

  /* Dividers */
  --divider:         rgba(236, 237, 238, 0.10);
  --divider-dark:    rgba(20, 24, 27, 0.12);
  --rule:            var(--divider);
  --rule-dark:       var(--divider-dark);
}
```

**Contrast rules — bake into every component:**
- **Raw `--accent` (#00E5F0) is ONLY for dark backgrounds.** On `--paper`, raw cyan fails WCAG (1.9:1).
- **On light backgrounds, use `--accent-deep` (#009DA8) for type and `--accent` for solid-fill buttons** (since the button bg is cyan and the text on it is black).
- `--accent-glow` only on hover halos and focus rings.

**Section/element changes (apply across all 14 pages):**

| Element | Old | New |
|---|---|---|
| `body` background | `--paper` warm cream | `--paper` cool neutral OR `--ink` dark (see homepage) |
| Header background | dark scrim | `--black` solid, 1px `--accent` underline below header |
| Hero section | photo + paper bg | full-bleed photo on `--black` strip; cyan eyebrow ("ATLANTA · STANDING SETS") above H1 |
| "Eight Sets" grid | paper bg | flip to `--ink` bg, cyan numerals (01–08) as eyebrow on each card |
| Set detail page hero | paper | `--black`; spec aside on `--ink-soft` |
| Pricing aside | paper card | `--ink` card, row borders `var(--accent-soft)`, "$150 / hr" numerals in `--accent` |
| Quote form | paper | keep paper for trust; inputs get `border: 1px solid var(--divider-dark)`, focus ring `2px var(--accent)` |
| Footer | dark | keep `--black`; add a 1px `--accent` rule above the address block |
| All links on dark | underlined paper | `color: var(--text-on-dark); text-decoration-color: var(--accent); text-underline-offset: 4px` |
| All links on light | underlined ink | same pattern, swap colors; underline color is `var(--accent-deep)` |
| Eyebrow labels | small caps gray | uppercase, `letter-spacing: 0.14em`, color `var(--accent)` on dark or `var(--accent-deep)` on light |

**Buttons (full state machine):**

```css
.btn-primary {
  background: var(--accent); color: #0a0d0f; border: 1px solid var(--accent);
  padding: 0.95rem 1.5rem; font-weight: 600; letter-spacing: 0.02em;
  transition: background .15s, box-shadow .15s;
}
.btn-primary:hover {
  background: var(--accent-glow); border-color: var(--accent-glow);
  box-shadow: 0 0 0 4px rgba(0,229,240,0.18);
}
.btn-primary:focus-visible { outline: 2px solid var(--accent-glow); outline-offset: 3px; }
.btn-primary[disabled] { background: #2a3134; color: rgba(236,237,238,0.40); border-color: #2a3134; }

.btn-ghost { background: transparent; color: var(--text-on-dark);
  border: 1px solid rgba(236,237,238,0.30); padding: 0.95rem 1.5rem; }
.btn-ghost:hover { border-color: var(--accent); color: var(--accent); }

.btn-line { background: transparent; color: var(--text-on-light);
  border: 1px solid var(--text-on-light); padding: 0.95rem 1.5rem; }
.btn-line:hover { background: var(--text-on-light); color: var(--paper); }

input:focus, textarea:focus, select:focus {
  outline: 2px solid var(--accent); outline-offset: 2px; border-color: var(--accent);
}
```

The logo lives on dark backgrounds only. Never on `--paper`.

---

## 3. TYPOGRAPHY — Drop the serif

Current stack mixes Inter + system serif + JetBrains Mono. None of the benchmark studios (A24, Focus, Quixote, Mack Sennett, Steiner) use serif. Replace:

```css
:root {
  --font-display: "Inter Tight", "Söhne", system-ui, sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, monospace;
}

h1, h2, h3 { font-family: var(--font-display); letter-spacing: -0.02em; font-weight: 600; }
body { font-family: var(--font-body); }
.spec-value, .price-value { font-family: var(--font-mono); letter-spacing: 0; }
```

Compress display headings (no expanded font, no italics). Mono is ONLY for spec values and prices.

---

## 4. HOMEPAGE — Editorial mosaic, no carousel

Kill any carousel. Carousels work for film posters (each slide is a different film); for room interiors they read as repetition.

**Structure (top → bottom):**

1. **Hero (`--black`):** Single full-bleed photo (use `atl-film-studios-led-wall-driving-plate-hero.jpg`). Overlay bottom-left: cyan eyebrow `OPERATED BY SWIRL FILMS · ATLANTA`, H1 "Atlanta's working production studio.", lede subtitle, two CTAs (`Book on Peerspace` primary cyan, `View All Sets` ghost). No third CTA.

2. **Eight Sets mosaic (`--ink`):** 8 cards in 2-col mobile → 3-col tablet → 4-col desktop grid. **Two cards span double-width: LED Walls + Courtroom.** Each card: photo, cyan numeral (01-08) as eyebrow, set name, sq ft + ceiling height in mono, hover lift + cyan underline reveal.

3. **Editorial band (`--black`):** One paragraph of voice: "A working studio, not a venue. You're booking the room our crew already shot in last week. Eight standing sets and two LED volume walls — built for shows, available by the day." No photo. Just text in display weight 500.

4. **Location strip (`--paper`):** Embedded static map (`atl-film-studios-location-map.jpg`), address, "10 minutes from downtown Atlanta" callout, "Get directions" link.

5. **Quote CTA band (`--accent` soft tint background or `--black` with cyan accents):** "Book your shoot." Two CTAs.

6. **Footer (`--black`):** Logo, address, phone (404) 973-6413, backup (470) 231-8971, Peerspace + Giggster outbound links, Instagram + FB icons, ©.

---

## 5. SET PAGE TEMPLATE — Apply to all 8

**Stacking order, top → bottom:**

1. **Sticky sets sub-nav** (the 8-link strip from §1 above)
2. **Hero (`--black`):** eyebrow ("STANDING SET 03 / COURTROOM"), H1 ("Pre-dressed Courtroom"), one-sentence lede, two CTAs (Book on Peerspace + Request Quote)
3. **Pricing aside (sticky on desktop ≥1024px, right column):** `--ink` card with row borders in `--accent-soft`; 3 price rows ($150/hr, 3hr min, 10% off 8h+); CTA at bottom
4. **Hero photo, full-bleed**
5. **Gallery — 6-12 photos in 2-3 col masonry, lightbox on click**
6. **Specs table (`--paper`):** 2-column mono numerals — Dimensions, Ceiling height, Power, Sound rating, What's included, What it pairs with
7. **Long-form description — 2-3 paragraphs**, voice-y not corporate
8. **Related sets row:** 3 cards from the other 7, manually picked for adjacency (e.g., Courtroom → Interrogation + Police Bullpen + Jail Cell)
9. **CTA band (`--black`):** "Book this set" with Peerspace + Giggster + Request Quote

---

## 6. JAIL CELL + PRISON CELL — Honest placeholder, not faked content

The Drive folder inventory confirmed **zero source photos** exist for Jail Cell or Prison Cell anywhere (Drive, `_raw/`, `_upload-ready/`). The current pages have placeholder courtroom-derived content — that has to go.

**For both `/sets/jail-cell.html` and `/sets/prison-cell.html`:**

- Keep them in the nav dropdown + sub-nav (they're real available sets)
- Hero: use a closely-related photo as a temporary stand-in (jail-cell → use a police-bullpen interior; prison-cell → use a hospital-corridor narrow shot)
- Add a visible badge: `<span class="pending-photos">Photos in production</span>` — cyan outline, small caps, top-right of hero
- Content: write 2-3 paragraphs of honest, voice-y copy about what the set IS — not what we wish it was. Reference dimensions if known, otherwise omit. Something like:

> Jail Cell — Holding Cell Set
>
> A pre-dressed county holding cell adjacent to the Police Bullpen. Bars, cinder-block walls, a metal bunk, a single overhead bulb. Used as a holding pen on shows where the bullpen scene needs an immediate cut to "the back." Pairs with Interrogation and Police Bullpen for a complete precinct flow.
>
> Photos are being shot this month. For walkthrough video, request a quote and we'll send the latest from set.

- Pricing aside still shows $150/hr (same as all sets per Peerspace listing)
- Specs table: list what's known, omit what isn't (don't fake square footage)

---

## 7. EVERYTHING ELSE — Verification before redeploy

Before pushing the redeploy, verify:

- [ ] Every page resolves at https://atlfilmweb-dlx5ztgv.manus.space/{path} (all 14 routes return 200)
- [ ] Zero console errors on /, /sets/courtroom.html, /sets/police-bullpen.html, /sets/led-walls.html, /sets/jail-cell.html, /sets/prison-cell.html
- [ ] Nav dropdown opens on hover desktop, click mobile; "Sets" expands to all 8 children
- [ ] Sub-nav strip shows on every `/sets/*` page, scrolls horizontal on mobile
- [ ] CSS `:root` block matches §2 exactly (search for `--accent: #00E5F0` to confirm — old value `#4dd6c1` must be gone everywhere)
- [ ] Old paper hex `#f6f4f1` is gone everywhere (replaced with `#f2f3f4`)
- [ ] All 23 photos in `photos/` flat, no subfolders
- [ ] JSON-LD parses as `LocalBusiness` on every page (1 schema per page, no duplicates)
- [ ] Meta Pixel `1373400664837883` present on every page in `<head>`
- [ ] Phones: primary `(404) 973-6413`, backup `(470) 231-8971` only — no other numbers
- [ ] Logo image only appears on dark backgrounds (header, footer); never on paper sections

**Then redeploy and return the public URL.**

---

## 8. WHAT'S OUT OF SCOPE FOR THIS PASS

- Real photos for Jail Cell, Prison Cell, additional Psych Wall — pending from Jay/Shannon. Once delivered, those pages get a real refresh in a follow-up.
- DNS swap from Squarespace → Manus public URL — that happens after this design pass is approved.
- Form backend (Formspree wiring) — current `<form action>` can stay; verify in a follow-up.

Execute §1-§7 in one autonomous cycle. Redeploy. Report URL.
