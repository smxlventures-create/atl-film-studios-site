# ATL Film Studios — Squarespace Page Block Scaffold (8 Set Landing Pages)

**Date:** June 1, 2026
**Platform:** Squarespace 7.0 / Brine / Mojave
**Site:** atlfilmstudios.com
**Companion docs:** `peerspace-source-of-truth.md` · `squarespace-architecture-playbook.md` · `squarespace-image-playbook.md` · `_upload-ready/_README.md`

This is a paste-ready, block-by-block content scaffold for the 8 set landing pages. Build `/courtroom` first as the master template, then duplicate × 7 (per playbook §4). Pricing block HTML, form configuration, and "you may also like" pattern are identical across all 8 pages — only the set-specific copy, hero image, gallery, and SEO fields change.

**Global constants used on every page:**
- Peerspace booking URL: `https://www.peerspace.com/pages/listings/6a0a7e197c1c8623e0e341b2`
- Giggster booking URL: `https://giggster.com/listing/standing-sets-perfect-for-film-verticals-content`
- Phone (tel): `(470) 231-8971`
- Form recipients (dual storage): `atlfilmstudios@swirlfilms.com` + `tyrell@swirlfilms.com`
- Form post-submit redirect: `/thank-you`
- Studio address line: `2132 James Jackson Pkwy NW, Atlanta GA — Whittier Mill Village`
- Trust signal (every intro): "Operated by Swirl Films — TUBI and BET+ originals."

---

## Page 1 — Courtroom

### 1. Page Settings
- **Page Title:** Courtroom Film Set
- **Slug:** `courtroom`
- **Navigation Title:** Courtroom
- **SEO Title (60 char):** Courtroom Film Set Rental Atlanta | ATL Film Studios
- **SEO Description (155 char):** Pre-dressed courtroom set with judge's bench, witness stand, gallery, and flags. $150/hr, 3hr min. 24/7 access. Atlanta. Operated by Swirl Films.
- **Featured Image:** `atl-film-studios-courtroom-set-hero.jpg`

### 2. Banner (page header)
- **Image:** `atl-film-studios-courtroom-set-hero.jpg`
- **Focal point hint:** Center the judge's bench in the middle 60% of the frame; allow gallery pews to crop on mobile.
- **H1:** The Courtroom
- **Subhead:** A pre-dressed courtroom built for legal dramas, network procedurals, and verticals — judge's bench, witness stand, gallery, US and state flags.
- **Primary CTA button:** Book Now on Peerspace → `https://www.peerspace.com/pages/listings/6a0a7e197c1c8623e0e341b2`

### 3. Body block sequence

Use a 2-column row for the "description + sticky pricing aside" pattern (per playbook §2). Left column = the narrative blocks. Right column = the Pricing Code Block, sticky-positioned via Custom CSS.

**Order:**

1. **Text Block** — H2 + intro (left column, top)
2. **Text Block** — Amenities list (left column)
3. **Gallery Block** — additional angles (left column, full-width — drop out of the 2-col row)
4. **Code Block** — Pricing aside (right column, top, sticky)
5. **Spacer + Line Block** — visual break before form (full width)
6. **Text Block** — Form intro (full width)
7. **Form Block** — quote request (full width)
8. **Text Block** — Cancellation + house rules (full width)
9. **Text Block** — "You may also like" cross-links (full width)

### 3a. Text Block — H2 + intro (paste verbatim)

> ## A working courtroom — not a movie-set facade
>
> Operated by Swirl Films — TUBI and BET+ originals. The Courtroom is a fully dressed, sync-sound-rated legal set in our Whittier Mill Village studio. The judge's bench, witness stand, jury box, gallery pews, and counsel tables are production-ready and lit-out for the cameras you're bringing in.
>
> The set lives inside a 7,500 sqft insulated stage. All walls outside the dressed set are painted blue for easy extension, replacement, or chroma keying. Bay door access lets you drive equipment — or a picture car — directly to the stage floor.
>
> Booked through Peerspace at a flat $150/hr with a 3-hour minimum. 24/7 access is included. Most productions wrap a half-day plate in 4–6 hours.

### 3b. Text Block — Amenities (paste verbatim)

> ## What's included
>
> - 7,500 sqft insulated stage (sync-sound rated)
> - 24/7 access — no after-hours fee
> - Up to 100 people on site
> - WiFi / internet
> - Dressing rooms + vanities (hair / makeup area)
> - Small prop and wardrobe shop on site
> - Air conditioning
> - Plenty of on-site parking
> - Large bay door — equipment and picture-car drive-in
> - All walls outside sets painted blue for easy set extension and replacement
> - Grip, electric, and camera available on request

### 4. Gallery Block — images in display order

| Order | Filename | Caption / alt text |
|---|---|---|
| 1 | `atl-film-studios-courtroom-judge-bench-flags.jpg` | Courtroom judge's bench with green banker's lamp, American flag, and state flag detail |
| 2 | `atl-film-studios-courtroom-gallery-counsel.jpg` | Courtroom gallery pews and counsel tables on hardwood floor under acoustic-panel walls |
| 3 | `atl-film-studios-courtroom-witness-stand.jpg` | Courtroom witness stand with gallery pews and counsel tables in background |
| 4 | `atl-film-studios-courtroom-bench-alt.jpg` | Alternate wide angle of the courtroom judge's bench and counsel area |

**Gallery style:** Grid, 2-column on desktop, 1-column on mobile. Lightbox on.

### 5. Pricing Code Block (right column, sticky)

```html
<div class="price-aside">
  <div class="price-headline">$150 <span>/ hour</span></div>
  <ul>
    <li>3 hour minimum</li>
    <li>10% off 8+ hour bookings</li>
    <li>24/7 access included</li>
    <li>Very Flexible cancellation</li>
  </ul>
  <a href="https://www.peerspace.com/pages/listings/6a0a7e197c1c8623e0e341b2" class="btn btn-primary" target="_blank">Book on Peerspace</a>
  <a href="https://giggster.com/listing/standing-sets-perfect-for-film-verticals-content" class="btn btn-secondary" target="_blank">Book on Giggster</a>
  <a href="#quote" class="btn btn-ghost">Request a Custom Quote</a>
  <p class="micro">Or call (470) 231-8971</p>
</div>
```

### 6. Form Block — Request a Quote

- **Anchor ID:** `quote` (so the in-page `#quote` jump works)
- **Form title:** Request a Custom Quote — Courtroom
- **Button text:** Send Quote Request
- **Post-submit:** Redirect → `/thank-you`
- **Storage destinations (both active):**
  - Email → `atlfilmstudios@swirlfilms.com`
  - Email → `tyrell@swirlfilms.com`
  - Google Drive → Sheet log (per playbook §12, Option A + Drive)
- **Hidden field:** `Set Interest` = `Courtroom` (pre-filled, not user-visible)

**Visible fields:**

1. Name — Text, required
2. Email — Email, required
3. Phone — Phone, required
4. Production name — Text, optional
5. Shoot date(s) — Date, required
6. Estimated hours — Dropdown: 3 / 4 / 5 / 6 / 7 / 8+ (10% off), required
7. Crew size — Dropdown: 1–10 / 11–25 / 26–50 / 51–100, required
8. Tell us about the shoot — Paragraph, optional

### 7. Cancellation + house rules text

> ## Cancellation and house rules
>
> **Very Flexible cancellation.** Full refund within 24 hours of booking confirmation. Non-refundable inside the 24-hour window before your start time. Booked through Peerspace or Giggster — their platform terms apply.
>
> **House rules.** No open flame on stage without prior approval. No smoking inside. Floors swept and stage returned to dressed condition at wrap. Stage is cleaned and surfaces disinfected between bookings.

### 8. "You may also like" cross-link block (Text Block, full width)

> ## You may also like
>
> - **[The Police Bullpen](/police-bullpen)** — multi-desk squad room with case board and precinct seal. Same building, same booking minimum.
> - **[The Interrogation Room](/interrogation)** — two-way mirror, single overhead bulb, metal table. Pairs naturally with courtroom for legal-procedural shoots.
> - **[The Hospital](/hospital)** — patient room plus corridor. Frequently booked alongside courtroom for ensemble dramas.

---

## Page 2 — Hospital

### 1. Page Settings
- **Page Title:** Hospital Film Set
- **Slug:** `hospital`
- **Navigation Title:** Hospital
- **SEO Title (60 char):** Hospital Film Set Rental Atlanta | ATL Film Studios
- **SEO Description (155 char):** Hospital patient room and corridor set in Atlanta. Adjustable bed, vitals monitor, IV pole. $150/hr, 3hr min. 24/7. Operated by Swirl Films.
- **Featured Image:** `atl-film-studios-hospital-patient-room-hero.jpg`

### 2. Banner (page header)
- **Image:** `atl-film-studios-hospital-patient-room-hero.jpg`
- **Focal point hint:** Center on the patient bed; keep the vitals monitor visible at mobile crop.
- **H1:** The Hospital
- **Subhead:** A patient room and connected corridor — adjustable bed, vitals monitor, IV pole, exposed-pipe corridor, waiting bench.
- **Primary CTA button:** Book Now on Peerspace → `https://www.peerspace.com/pages/listings/6a0a7e197c1c8623e0e341b2`

### 3. Body block sequence

Same structure as Courtroom: 2-column row (text left, sticky pricing right) → full-width gallery → form → policies → cross-links.

### 3a. Text Block — H2 + intro

> ## Two connected spaces — patient room plus corridor
>
> Operated by Swirl Films — TUBI and BET+ originals. The Hospital set is a full patient room with an adjustable hospital bed, vitals monitor, IV pole, bedside lamp, visitor chair, and sink station — connected through to a working corridor with a waiting bench, exposed-pipe ceiling, and a door-through to additional dressed rooms.
>
> The two spaces shoot back-to-back without a company move. The corridor reads as a wing in a small community hospital; the patient room covers everything from quiet bedside scenes to full code-blue blocking.
>
> Booked through Peerspace at $150/hr, 3-hour minimum, 24/7 access. The walls outside the set are painted blue for easy extension or chroma — useful for cycle-through "more rooms down the hall" coverage.

### 3b. Text Block — Amenities

> ## What's included
>
> - 7,500 sqft insulated stage (sync-sound rated)
> - 24/7 access — no after-hours fee
> - Up to 100 people on site
> - WiFi / internet
> - Dressing rooms + vanities (hair / makeup area)
> - Small prop and wardrobe shop on site
> - Air conditioning
> - Plenty of on-site parking
> - Large bay door — equipment and picture-car drive-in
> - All walls outside sets painted blue for easy set extension and replacement
> - Grip, electric, and camera available on request

### 4. Gallery Block

| Order | Filename | Caption / alt text |
|---|---|---|
| 1 | `atl-film-studios-hospital-bed-detail.jpg` | Detail shot of hospital bed with bedside lamp, visitor chair, and sink station |
| 2 | `atl-film-studios-hospital-corridor-wide.jpg` | Hospital corridor film set with waiting bench, exposed-pipe ceiling, and door-through to additional rooms |
| 3 | `atl-film-studios-hospital-corridor-waiting.jpg` | Hospital corridor waiting area with bench seating, side table, and plant |

### 5. Pricing Code Block

Use the same HTML as Page 1 (Courtroom). No changes — links are identical.

### 6. Form Block

Same configuration as Page 1, with one change: **hidden field `Set Interest` = `Hospital`**. Form title: "Request a Custom Quote — Hospital."

### 7. Cancellation + house rules text

Same paragraph as Page 1.

### 8. "You may also like"

> ## You may also like
>
> - **[The Psych Wall](/psych-wall)** — psychiatric ward set. Frequently booked with Hospital for medical-drama coverage.
> - **[The Courtroom](/courtroom)** — pairs naturally with Hospital for legal-medical ensemble scripts.
> - **[The LED Walls](/led-walls)** — 2× 12'×16' Watchout + Unreal Engine. Useful for ambulance plate shots and exterior windows.

---

## Page 3 — Police Bullpen

### 1. Page Settings
- **Page Title:** Police Bullpen Film Set
- **Slug:** `police-bullpen`
- **Navigation Title:** Police Bullpen
- **SEO Title (60 char):** Police Bullpen Set Rental Atlanta | ATL Film Studios
- **SEO Description (155 char):** Detective squad room with multi-desk bullpen, precinct seal, and active case board. $150/hr, 3hr min. 24/7. Atlanta. Operated by Swirl Films.
- **Featured Image:** `atl-film-studios-police-precinct-bullpen-hero.jpg`

### 2. Banner (page header)
- **Image:** `atl-film-studios-police-precinct-bullpen-hero.jpg`
- **Focal point hint:** Center on the case board; let the desks crop in toward frame.
- **H1:** The Police Bullpen
- **Subhead:** A working detective squad room — multi-desk bullpen, period-appropriate monitors, precinct seal, and an active case board with photos and string.
- **Primary CTA button:** Book Now on Peerspace → `https://www.peerspace.com/pages/listings/6a0a7e197c1c8623e0e341b2`

### 3. Body block sequence

Same structure as Courtroom.

### 3a. Text Block — H2 + intro

> ## Squad room, case board, precinct seal — dressed and ready
>
> Operated by Swirl Films — TUBI and BET+ originals. The Police Bullpen is a multi-desk detective squad room dressed to play either current-day or period — paired desks, period-appropriate monitors, in-tray clutter, a precinct seal on the wall, and a full case board with photos, papers, and string tacks.
>
> Pairs cleanly with the Interrogation Room next door for the full "bring them in, sit them down" coverage in a single booking. The blue accent wall and dressed exterior windows let DPs work either daylight or night-int looks without rebuilding the room.
>
> Flat $150/hr, 3-hour minimum, 24/7 access through Peerspace.

### 3b. Text Block — Amenities

Same amenities list as Page 1.

### 4. Gallery Block

| Order | Filename | Caption / alt text |
|---|---|---|
| 1 | `atl-film-studios-police-precinct-case-board.jpg` | Detective case board with photos, papers, and string tacks above detective desks |
| 2 | `atl-film-studios-police-precinct-bullpen-blue.jpg` | Alternate angle of detective bullpen with blue accent wall and period-appropriate computer monitors |
| 3 | `atl-film-studios-police-precinct-case-board-alt.jpg` | Detective bullpen case-board detail with police precinct seal on wall |

### 5. Pricing Code Block

Same HTML as Page 1.

### 6. Form Block

Same configuration. **Hidden field `Set Interest` = `Police Bullpen`**. Form title: "Request a Custom Quote — Police Bullpen."

### 7. Cancellation + house rules text

Same paragraph as Page 1.

### 8. "You may also like"

> ## You may also like
>
> - **[The Interrogation Room](/interrogation)** — two-way mirror, single bulb, metal table. Standard one-booking pairing with the Bullpen.
> - **[The Courtroom](/courtroom)** — close the procedural loop: arrest, interrogate, charge, trial.
> - **[The Jail Cell](/jail-cell)** — book the full procedural arc in one company day.

---

## Page 4 — Interrogation

### 1. Page Settings
- **Page Title:** Interrogation Room Film Set
- **Slug:** `interrogation`
- **Navigation Title:** Interrogation
- **SEO Title (60 char):** Interrogation Room Set Rental Atlanta | ATL Film Studios
- **SEO Description (155 char):** Two-way mirror interrogation room with single overhead bulb, metal table and chairs. $150/hr, 3hr min. Atlanta. Operated by Swirl Films.
- **Featured Image:** `atl-film-studios-interrogation-room-mirror-hero.jpg`

### 2. Banner (page header)
- **Image:** `atl-film-studios-interrogation-room-mirror-hero.jpg`
- **Focal point hint:** Center on the metal table; keep the two-way mirror in frame at mobile crop.
- **H1:** The Interrogation Room
- **Subhead:** Two-way mirror, single overhead bulb, metal table and chairs, heavy door, purple-lavender walls. Built tight to read on close coverage.
- **Primary CTA button:** Book Now on Peerspace → `https://www.peerspace.com/pages/listings/6a0a7e197c1c8623e0e341b2`

### 3. Body block sequence

Same structure as Courtroom.

### 3a. Text Block — H2 + intro

> ## Tight, controllable, ready for close coverage
>
> Operated by Swirl Films — TUBI and BET+ originals. The Interrogation Room is purpose-built for the genre: a working two-way mirror, a single overhead practical, a steel table and steel chairs, a heavy door, and walls in the deep purple-lavender that reads neutral on every camera profile we've tested.
>
> The room is small by design — close lenses, tight blocking, no overflow. Pairs with the Police Bullpen for the standard "bring them in, sit them down" sequence in a single company move.
>
> Booked at $150/hr through Peerspace, 3-hour minimum, 24/7 access. Most interrogation scenes wrap inside the minimum.

### 3b. Text Block — Amenities

Same amenities list as Page 1.

### 4. Gallery Block

| Order | Filename | Caption / alt text |
|---|---|---|
| 1 | `atl-film-studios-interrogation-room-table.jpg` | Interrogation room metal table and chairs with heavy door and purple-lavender walls |

**Note:** only 2 photos in the set (hero + one detail). Consider commissioning additional angles before scaling ad spend to this page.

### 5. Pricing Code Block

Same HTML as Page 1.

### 6. Form Block

Same configuration. **Hidden field `Set Interest` = `Interrogation`**. Form title: "Request a Custom Quote — Interrogation."

### 7. Cancellation + house rules text

Same paragraph as Page 1.

### 8. "You may also like"

> ## You may also like
>
> - **[The Police Bullpen](/police-bullpen)** — the natural pairing. One booking, both rooms.
> - **[The Jail Cell](/jail-cell)** — close the booking arc with a holding shot.
> - **[The Courtroom](/courtroom)** — full procedural coverage in a single company day.

---

## Page 5 — Psych Wall

### 1. Page Settings
- **Page Title:** Psych Ward Film Set
- **Slug:** `psych-wall`
- **Navigation Title:** Psych Ward
- **SEO Title (60 char):** Psych Ward Set Rental Atlanta | ATL Film Studios
- **SEO Description (155 char):** Padded psychiatric ward set for thrillers, horror, and clinical drama. $150/hr, 3hr min. 24/7. Atlanta. Operated by Swirl Films.
- **Featured Image:** `atl-film-studios-psych-wall-hero.jpg`

### 2. Banner (page header)
- **Image:** `atl-film-studios-psych-wall-hero.jpg`
- **Focal point hint:** Center on the padded wall texture; keep one full wall in frame at mobile crop.
- **H1:** The Psych Ward
- **Subhead:** A padded psychiatric ward set built for thrillers, horror, clinical drama, and tightly-blocked one-room verticals.
- **Primary CTA button:** Book Now on Peerspace → `https://www.peerspace.com/pages/listings/6a0a7e197c1c8623e0e341b2`

> **Note (internal):** confirm with Tyrell before publishing — the Drive folder labeled "PSYCHE-WALL" needs verification that this is the dressed padded ward, not a separate cyc.

### 3. Body block sequence

Same structure as Courtroom.

### 3a. Text Block — H2 + intro

> ## A controlled, single-camera space
>
> Operated by Swirl Films — TUBI and BET+ originals. The Psych Ward is a dressed psychiatric-ward set — padded walls, neutral lighting, and the kind of clean negative space that genre productions need for thrillers, horror, and clinical drama.
>
> The set lives inside our 7,500 sqft insulated stage. Walls outside the dressed set are painted blue for chroma or extension — useful if you need to imply a corridor beyond the door.
>
> Booked at $150/hr through Peerspace. 3-hour minimum. 24/7 access included.

### 3b. Text Block — Amenities

Same amenities list as Page 1.

### 4. Gallery Block

| Order | Filename | Caption / alt text |
|---|---|---|
| 1 | `atl-film-studios-psych-wall-corner.jpg` | Alternate angle of psych ward set |

**Note:** only 2 photos total (hero + corner). Recommend additional coverage before launching paid traffic to this page.

### 5. Pricing Code Block

Same HTML as Page 1.

### 6. Form Block

Same configuration. **Hidden field `Set Interest` = `Psych Ward`**. Form title: "Request a Custom Quote — Psych Ward."

### 7. Cancellation + house rules text

Same paragraph as Page 1.

### 8. "You may also like"

> ## You may also like
>
> - **[The Hospital](/hospital)** — patient room and corridor. Frequent pairing for medical-thriller scripts.
> - **[The Interrogation Room](/interrogation)** — tight, controllable, similar one-room geometry.
> - **[The LED Walls](/led-walls)** — virtual production for exterior windows or imagined corridor extensions.

---

## Page 6 — Jail Cell

> **Build as draft. Do not publish to the public nav until photography lands.**

### 1. Page Settings
- **Page Title:** Jail Cell Film Set
- **Slug:** `jail-cell`
- **Navigation Title:** Jail Cell
- **SEO Title (60 char):** Jail Cell Set Rental Atlanta | ATL Film Studios
- **SEO Description (155 char):** Holding cell set for procedurals and verticals. $150/hr, 3hr min. 24/7 access. Photos on request. Atlanta. Operated by Swirl Films.
- **Featured Image:** *placeholder — photos needed before publishing.*

### 2. Banner (page header)
- **Image:** *photos available on request — call (470) 231-8971. Use a temporary stand-in banner (LED-wall driving-plate hero) while in draft.*
- **Focal point hint:** N/A pending photography.
- **H1:** The Jail Cell
- **Subhead:** A holding cell built for procedurals, verticals, and the booking arc. Photos available on request — call (470) 231-8971.
- **Primary CTA button:** Book Now on Peerspace → `https://www.peerspace.com/pages/listings/6a0a7e197c1c8623e0e341b2`

### 3. Body block sequence

Same structure as Courtroom, with a "photos on request" note in place of the gallery block.

### 3a. Text Block — H2 + intro

> ## A working holding cell
>
> Operated by Swirl Films — TUBI and BET+ originals. The Jail Cell is a dressed holding cell built for procedural coverage, vertical content, and the back end of the booking arc. Pairs naturally with the Police Bullpen and Interrogation Room for a full company-day procedural shoot.
>
> Photos are available on request while we finish the on-set photography pass — call (470) 231-8971 or send a quote request below and we'll text scouting images same day.
>
> Flat $150/hr through Peerspace, 3-hour minimum, 24/7 access. The set lives inside our 7,500 sqft insulated stage.

### 3b. Text Block — Amenities

Same amenities list as Page 1.

### 4. Gallery Block — placeholder

> **Photos available on request.** Call (470) 231-8971 or submit the quote form below — we'll send scouting images same day.

### 5. Pricing Code Block

Same HTML as Page 1.

### 6. Form Block

Same configuration. **Hidden field `Set Interest` = `Jail Cell`**. Form title: "Request a Custom Quote — Jail Cell."

### 7. Cancellation + house rules text

Same paragraph as Page 1.

### 8. "You may also like"

> ## You may also like
>
> - **[The Interrogation Room](/interrogation)** — standard pairing for procedural arcs.
> - **[The Police Bullpen](/police-bullpen)** — book the full bring-in coverage in one company day.
> - **[The Courtroom](/courtroom)** — close the procedural loop.

---

## Page 7 — Prison Cell

> **Build as draft. Do not publish to the public nav until photography lands.**

### 1. Page Settings
- **Page Title:** Prison Cell Film Set
- **Slug:** `prison-cell`
- **Navigation Title:** Prison Cell
- **SEO Title (60 char):** Prison Cell Set Rental Atlanta | ATL Film Studios
- **SEO Description (155 char):** Prison cell set for drama, thriller, and serialized prestige work. $150/hr, 3hr min. Photos on request. Atlanta. Operated by Swirl Films.
- **Featured Image:** *placeholder — photos needed before publishing.*

### 2. Banner (page header)
- **Image:** *photos available on request — call (470) 231-8971. Use a temporary stand-in banner while in draft.*
- **Focal point hint:** N/A pending photography.
- **H1:** The Prison Cell
- **Subhead:** A dressed prison cell — different beat from the Jail Cell holding set. Built for serialized drama and thriller. Photos on request.
- **Primary CTA button:** Book Now on Peerspace → `https://www.peerspace.com/pages/listings/6a0a7e197c1c8623e0e341b2`

### 3. Body block sequence

Same structure as Jail Cell.

### 3a. Text Block — H2 + intro

> ## A long-stay prison cell, not a holding tank
>
> Operated by Swirl Films — TUBI and BET+ originals. The Prison Cell is a dressed long-stay set — different beat from our Jail Cell holding tank — built for serialized drama, thriller, and prestige work where the cell is a recurring location, not a one-scene backdrop.
>
> Photography is in progress. In the meantime, call (470) 231-8971 or send a quote request below and we'll send scouting images and a live walkthrough video same day.
>
> Flat $150/hr through Peerspace, 3-hour minimum, 24/7 access. The set is inside our 7,500 sqft insulated stage.

### 3b. Text Block — Amenities

Same amenities list as Page 1.

### 4. Gallery Block — placeholder

> **Photos available on request.** Call (470) 231-8971 or submit the quote form below — we'll send scouting images and walkthrough video same day.

### 5. Pricing Code Block

Same HTML as Page 1.

### 6. Form Block

Same configuration. **Hidden field `Set Interest` = `Prison Cell`**. Form title: "Request a Custom Quote — Prison Cell."

### 7. Cancellation + house rules text

Same paragraph as Page 1.

### 8. "You may also like"

> ## You may also like
>
> - **[The Jail Cell](/jail-cell)** — different beat. Holding tank vs. long-stay.
> - **[The Interrogation Room](/interrogation)** — frequent pairing in serialized drama.
> - **[The Courtroom](/courtroom)** — close the booking-to-sentencing arc.

---

## Page 8 — LED Walls

### 1. Page Settings
- **Page Title:** LED Walls — Virtual Production Stage
- **Slug:** `led-walls`
- **Navigation Title:** LED Walls
- **SEO Title (60 char):** LED Wall Virtual Production Stage Atlanta | ATL Film Studios
- **SEO Description (155 char):** 2× 12'×16' LED walls with Watchout and Unreal Engine. Driving plates, virtual sets, car drive-in. $150/hr, 3hr min. Atlanta. Swirl Films.
- **Featured Image:** `atl-film-studios-led-wall-driving-plate-hero.jpg`

### 2. Banner (page header)
- **Image:** `atl-film-studios-led-wall-driving-plate-hero.jpg`
- **Focal point hint:** Center on the picture car against the LED wall driving plate.
- **H1:** The LED Walls
- **Subhead:** Two 12'×16' LED walls running Watchout and Unreal Engine. Driving plates, virtual exteriors, dynamic backgrounds — car drive-in supported through the bay door.
- **Primary CTA button:** Book Now on Peerspace → `https://www.peerspace.com/pages/listings/6a0a7e197c1c8623e0e341b2`

### 3. Body block sequence

Same structure as Courtroom.

### 3a. Text Block — H2 + intro

> ## 2× 12'×16' walls — Watchout and Unreal Engine
>
> Operated by Swirl Films — TUBI and BET+ originals. Two 12'×16' LED walls drive virtual production for driving plates, environment extensions, and full virtual exteriors. Content is delivered via Watchout for plate playback and Unreal Engine for interactive virtual sets.
>
> The large bay door lets you drive a picture car directly onto the stage floor — supported for full driving-plate coverage without a process trailer. The walls also work as practical background lighting for interior scenes that need a dynamic source, like night-int condo windows or moving train coverage.
>
> Booked at $150/hr through Peerspace. 3-hour minimum. 24/7 access. Grip, electric, and camera available on request — plate playback and Unreal Engine operator can be scoped in the quote.

### 3b. Text Block — Amenities

Use the standard amenities list plus a LED-specific block:

> ## LED stage specifics
>
> - 2× 12'×16' LED walls
> - Watchout for plate playback
> - Unreal Engine for interactive virtual environments
> - Picture-car drive-in via the bay door
> - All walls outside the LED stage painted blue for chroma extension
> - Plate playback and Unreal operator available on request

(Standard amenities list follows below — same as Page 1.)

### 4. Gallery Block

| Order | Filename | Caption / alt text |
|---|---|---|
| 1 | `atl-film-studios-led-wall-cosmic-stage.jpg` | LED volume wall stage with cosmic content playing — virtual production stage at ATL Film Studios |
| 2 | `atl-film-studios-led-wall-production.jpg` | Production crew working on the LED volume wall stage |
| 3 | `atl-film-studios-facility-loading-bay.jpg` | Drive-in loading bay at ATL Film Studios — full-height rolling door for equipment and picture-car drive-on |

### 5. Pricing Code Block

Same HTML as Page 1.

### 6. Form Block

Same configuration. **Hidden field `Set Interest` = `LED Walls`**. Form title: "Request a Custom Quote — LED Walls."

**Add one extra field above the standard set:** "Content type" dropdown — Driving plate / Virtual exterior (Unreal) / Background practical / Other.

### 7. Cancellation + house rules text

Same paragraph as Page 1, with one addition:

> **LED-specific.** Plate or Unreal content must be delivered 48 hours before call time for QC and playback testing. We can also build content for you — scope in the quote form.

### 8. "You may also like"

> ## You may also like
>
> - **[The Police Bullpen](/police-bullpen)** — LED windows extend the squad room's exterior in night-int coverage.
> - **[The Hospital](/hospital)** — LED corridor windows let the hospital wing read against any time of day.
> - **[The Courtroom](/courtroom)** — exterior windows in the courtroom can play any city or time period through the LED wall.

---

## Build checklist

- [ ] Build `/courtroom` as the master template
- [ ] Confirm 2-column row layout (text left, sticky pricing right) and Code Block CSS hooks in Custom CSS
- [ ] Confirm Form Block has dual email storage + Google Drive Sheet log
- [ ] Confirm Form Block redirect to `/thank-you` (test in Incognito)
- [ ] Duplicate × 7 — rename, re-slug, re-upload banner, swap gallery, edit Set Interest hidden field
- [ ] Group all 8 pages into a Folder named "Sets" in the nav
- [ ] Confirm Jail Cell + Prison Cell are NOT in main nav until photos land — keep in Not Linked or password-protect

---

## Executive summary (decisions and tradeoffs)

- **One canonical pricing block, paste-once.** The same Code Block HTML ships on all 8 pages — Peerspace and Giggster URLs are sitewide constants because both listings cover all 8 sets. This means a single price change touches one snippet replicated 8 times; flag it as a maintenance item.
- **Trust signal lead-in is fixed copy ("Operated by Swirl Films — TUBI and BET+ originals") on every intro paragraph.** Restrained editorial tone throughout, no exclamation points, no "Book now!" salesiness — matches Swirl's A24/Focus brand direction even though this is the spinoff studio brand.
- **Form Block uses Set Interest hidden field instead of 8 separate forms.** All 8 pages route to the same dual-email + Drive Sheet, distinguished by the hidden value. Cleaner than maintaining 8 form configurations; the Sheet log naturally segments by set for follow-up. Form title varies per page so recipients see which set the lead is for in the email subject.
- **Jail Cell and Prison Cell are scaffolded but flagged as draft-only.** Both have "photos available on request — call (470) 231-8971" inline. Recommend keeping them in Not Linked or password-protected until photography is in. The SEO scaffold is in place so the moment photos land, publishing is a 10-minute swap.
- **Psych Ward has a Tyrell-verification note inline.** The Drive folder labeled "PSYCHE-WALL" needs confirmation that the photos are the dressed padded ward (not a separate cyc). Copy is written for the padded-ward interpretation; if it turns out to be cyc, the page needs a rewrite (and the listing's "Pysch Wall" set is unphotographed).
- **Cross-link pattern is built around natural booking pairs, not random adjacency.** Police Bullpen → Interrogation → Jail Cell is the standard procedural arc; Hospital → Psych Ward → LED Walls is the medical-drama arc; Courtroom anchors as the closing pairing for both. This creates editorial coherence and increases the chance a quote request lists multiple sets.
