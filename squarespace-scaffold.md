# Squarespace Build Scaffold — atlfilmstudios.com

**Squarespace site:** `bronze-flamingo-lspg` (Squarespace 7.1, Fluid Engine)
**Source of truth:** [`peerspace-source-of-truth.md`](peerspace-source-of-truth.md) — all pricing + descriptions align with the live Peerspace listing
**Logo asset:** already uploaded on Squarespace (the 2025 logo). Also saved locally at `set-rentals/site/logo/atl-film-studios-logo-2025.png` as backup.
**Photos to upload:** `set-rentals/_published/` (organized by set)

---

## Site map — 8 pages

| # | Page | URL slug | Squarespace status | Purpose |
|---|---|---|---|---|
| 1 | Home | `/` | **Replace existing placeholder** | Ad LP + brand intro + sets overview + CTA |
| 2 | Sets | `/sets` | **New** | Grid of all sets, anchor for "View All Sets" CTA |
| 3 | Set detail × 7 | `/sets/courtroom`, `/sets/psych-wall`, `/sets/hospital`, `/sets/jail-cell`, `/sets/prison-cell`, `/sets/interrogation`, `/sets/police-bullpen`, `/sets/led-walls` | **New** | One per set listed on Peerspace. Each is a paid-ad landing page with matching photo + same pricing block |
| 4 | About | `/about` | **New** | Swirl Films story + Tyrell + team |
| 5 | Location | `/location` | **New** | Map + crew access details |
| 6 | Contact / Quote | `/contact-us` | **Replace existing "HIT US UP"** (keep URL slug for any backlinks) | Quote form + Tyrell direct line |
| 7 | FAQ | `/faq` | **New** | Production-specific Qs |
| 8 | Thank You | `/thank-you` | **New (Not Indexed)** | Form-submit landing, Meta `Lead` event fires here |

**Pages to archive** (move to "Not Linked" section in Squarespace — preserves URL but removes from nav):
- The current `/` placeholder
- The current `/contact-us` content
- The current `/stagegallery` (replaced by the new `/sets` + per-set pages)

---

## Squarespace settings to update (do these once, site-wide)

### 1. Site Header → Logo
- Settings → Brand → Logo → upload `atl-film-studios-logo-2025.png` (or confirm the existing 2025 logo is set)
- Set logo size to **medium** on desktop, **small** on mobile

### 2. Site Header → Style
- Header layout: **Logo Left, Nav Right** (matches the cinematic editorial brief)
- Sticky header: **On** (with backdrop blur)
- Header background: **Solid black** (`#0d0d0d`)
- Header text color: **Paper white** (`#f6f4f1`)

### 3. Site Navigation (Pages panel)
Reorder pages in this order in the main nav:
```
Sets · About · Location · FAQ · [Request a Quote] (this is a button-style nav item)
```
- The "Request a Quote" entry should be a button-styled nav link pointing to `/contact-us`
- All other entries are plain text nav links

### 4. Fonts (Design → Fonts)
- Headings: **Tiempos Headline** if available, otherwise fall back to a serif paired pack like "Editorial New" or "Crimson Pro" — pick the most restrained editorial serif Squarespace offers
- Paragraph: **Inter** (Squarespace ships this as a default)
- Buttons: **Inter Medium**, uppercase, letter-spacing +0.06em

### 5. Colors (Design → Colors)
Set the color palette to:
- Background black: `#0d0d0d`
- Ink (dark grey for body text on light bg): `#1a1a1a`
- Paper white: `#f6f4f1`
- Accent: `#4dd6c1` (cyan/teal — harmonizes with logo)
- Muted text: `#888888`

Then assign these to Squarespace's section themes:
- **Lightest** section → paper white background, ink text, accent links
- **Darkest** section → black background, paper white text, accent links

### 6. Custom CSS (Design → Custom CSS)
Paste this block:

```css
/* ATL Film Studios — editorial restraint overrides */

/* Tighten heading letter-spacing */
h1, h2, h3 {
  letter-spacing: -0.02em;
  line-height: 1.05;
}

/* Eyebrow / mono caps label utility */
.eyebrow,
[data-block-type="2"] p strong {
  font-family: 'JetBrains Mono', 'IBM Plex Mono', SFMono-Regular, Menlo, monospace !important;
  font-size: 12px !important;
  letter-spacing: 0.18em !important;
  text-transform: uppercase !important;
  font-weight: 500 !important;
}

/* Cyan accent on hyperlinks within rich text blocks */
.sqs-block-content a {
  color: #4dd6c1;
  border-bottom: 1px solid currentColor;
  padding-bottom: 1px;
}
.sqs-block-content a:hover { opacity: 0.85; }

/* Button — primary CTA */
.sqs-block-button-element--medium,
.sqs-block-button-element--large {
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  border-radius: 2px !important;
}

/* Image hover lift inside galleries */
.sqs-gallery-design-grid-slide img,
.image-block-outer-wrapper img {
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.4s;
}
.sqs-gallery-design-grid-slide:hover img {
  transform: scale(1.03);
  opacity: 0.92;
}

/* Tighter mobile spacing */
@media (max-width: 720px) {
  h1 { font-size: 44px !important; }
  h2 { font-size: 32px !important; }
}
```

### 7. Code Injection (Settings → Advanced → Code Injection)

**Header injection:**
```html
<!-- Meta Pixel — paste your pixel ID -->
<script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID_HERE');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID_HERE&ev=PageView&noscript=1"/></noscript>

<!-- Custom events: Peerspace / Giggster / Phone clicks -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href*="peerspace.com"]').forEach(a =>
    a.addEventListener('click', () => fbq && fbq('trackCustom', 'ClickToPeerspace', {url: a.href})));
  document.querySelectorAll('a[href*="giggster.com"]').forEach(a =>
    a.addEventListener('click', () => fbq && fbq('trackCustom', 'ClickToGiggster', {url: a.href})));
  document.querySelectorAll('a[href^="tel:"]').forEach(a =>
    a.addEventListener('click', () => fbq && fbq('trackCustom', 'ClickToCall')));
});
</script>
```

**Lock Page (per-page injection for Thank You only):**
On the `/thank-you` page → Page Settings → Advanced → Page Header Code Injection:
```html
<script>
  if (typeof fbq === 'function') { fbq('track', 'Lead'); }
</script>
```

### 8. Form configuration
Squarespace native form → set to email-only delivery (no Squarespace contact storage):
- Recipient(s): `atlfilmstudios@swirlfilms.com`, `tyrell@swirlfilms.com`
- Post-submit action: **Redirect to URL** → `/thank-you`
- Submit button text: "Send Quote Request"

---

## PAGE-BY-PAGE CONTENT (paste-ready)

For each page below, the format is: page header → eyebrow → headline → body copy → sections → CTAs. Drop these into Squarespace as Text + Image + Button blocks within Fluid Engine sections.

---

### PAGE 1 · Home (`/`)

**Hero section** (dark, full-bleed image background)
- Background image: `set-rentals/_published/02_LED-WALL/01-hero-led-wall-car-driving-plate.png`
- Eyebrow: `OPERATED BY SWIRL FILMS · ATLANTA`
- Headline: **Atlanta's working production studio.**
- Subhead: Standing sets for film, verticals, and content — courtroom, hospital, police precinct, interrogation, jail, psych ward, and two LED volume walls. $150/hr · 3 hr minimum · 24/7 access.
- Buttons: `Request a Quote` (primary, → `/contact-us`) · `View Sets` (ghost, → `/sets`)

**Trust strip** (full-width band, ink background)
- Text (caps, mono, spaced): `SYNC-SOUND INSULATION · DRIVE-IN BAY · UNREAL ENGINE + WATCHOUT · 24/7 ACCESS · OPERATED BY SWIRL FILMS`

**Sets overview** (light section)
- Eyebrow: `THE STAGES`
- Headline: Pre-dressed sets and stages. Production-ready, today.
- Body: Each set is built and dressed for our own productions. When the calendar is open, we open the doors.
- **Then drop a 4-column gallery block** with 8 set thumbnails (one for each set in the order: Courtroom, Hospital, Police Bull Pen, Interrogation, Psych Wall, Jail Cell, Prison Cell, LED Walls). Each thumbnail clicks through to the matching `/sets/[name]` page.

**Why book ATL Film Studios** (dark section)
- Eyebrow: `WHY BOOK HERE`
- Headline: A working studio, not a venue.
- 3-column block:
  1. **Operated by Swirl Films** — Active film and TV production company (TUBI, BET+ originals). You're booking from production people, not a venue manager.
  2. **Industry-rate $150/hr** — Published rates, instant book, no quote-on-request theater. 24/7 access, very flexible cancellation.
  3. **All sets, one studio** — Eight standing sets, two LED walls, drive-in bay, blue-walled stage perimeter for extensions. One address, no company moves.

**Pricing snapshot** (light section)
- Eyebrow: `PRICING`
- Headline: One rate. Every set.
- Pricing table (use a Markdown block or just a Text block):
  - **$150 / hour**
  - 3-hour minimum
  - 10% off on 8+ hour bookings
  - 24/7 access included
  - Free cancellation up to 24 hours after booking
- Buttons: `Request a Quote` (primary) · `Book on Peerspace` · `Book on Giggster`

**Working studio atmosphere** (light section, no eyebrow)
- Headline: We run our own productions here.
- 3-image grid: courtroom set photo + police bullpen + LED wall driving plate
- Caption: "You're booking a working studio, not a rental venue."

**Location** (dark section)
- Eyebrow: `LOCATION`
- Headline: Whittier Mill Village. One address.
- 2-column block:
  - Left: Embedded Google Map (paste `https://www.google.com/maps?q=2132+James+Jackson+Parkway+NW+Atlanta+GA+30318&z=14&output=embed`)
  - Right: Address + amenity bullets:
    > 2132 James Jackson Parkway NW
    > Atlanta, GA 30318
    >
    > — Free crew parking
    > — Drive-in load-in bay
    > — Hair / makeup / vanities
    > — Dressing rooms
    > — Small prop / wardrobe shop
    > — WiFi (internet included)
    > — Studio insulation (sync-sound rated)
    > — 24/7 access
- Button: `Directions & Access` (→ `/location`)

**Quote form** (dark section)
- Eyebrow: `REQUEST A QUOTE`
- Headline: Lock the date.
- Subhead: Tyrell, our studio manager, responds within 2 hours during business hours. Or call **(470) 231-8971**.
- Native Squarespace form with fields: Name (required), Email (required), Phone, Shoot date, Set (dropdown — see below), Crew size, Hours needed, Notes
- Set dropdown options:
  - Courtroom
  - Hospital
  - Police Bull Pen
  - Interrogation
  - Psych Wall
  - Jail Cell
  - Prison Cell
  - LED Walls (Volume / Driving Plates)
  - Not sure yet
- Submit button: "Send Quote Request"

**Footer** (already configured in site-wide footer; just confirm):
- Address: 2132 James Jackson Pkwy NW, Atlanta, GA 30318
- Phone: (470) 231-8971
- Email: atlfilmstudios@swirlfilms.com
- Social: Facebook (Swirl Studios Atlanta), Instagram (@atlfilmstudios)
- Tagline: "Powered by Swirl Films" (link to swirlfilms.com)

---

### PAGE 2 · Sets index (`/sets`)

**Hero** (dark, narrow)
- Eyebrow: `THE STAGES`
- Headline: Eight standing sets. Two LED walls. One studio.
- Subhead: All at $150/hr. 3-hour minimum. 24/7 access. Operated by Swirl Films.

**Sets grid** (light section, full bleed)
8-card grid (2×4 desktop, 1-col mobile). For each card: hero photo + set name + 1-line description. Cards link to per-set pages.

| Set | Slug | Hero photo | Caption |
|---|---|---|---|
| Courtroom | `/sets/courtroom` | `03_COURTROOM/01-hero-courtroom-wide.png` | Full bench, gallery, US + state flags |
| Hospital | `/sets/hospital` | `04_HOSPITAL-SUITE/01-hero-hospital-room-wide.png` | Patient room + corridor with door-through |
| Police Bull Pen | `/sets/police-bullpen` | `05_POLICE-PRECINCT/01-hero-bullpen-wide.png` | Detective squad room + case board |
| Interrogation | `/sets/interrogation` | `06_INTERROGATION-SOLO/01-hero-two-way-mirror.png` | Two-way mirror, single overhead bulb |
| Psych Wall | `/sets/psych-wall` | `07_CYC-WALL/01-hero-cyc-clean-sweep.png` ⚠️ *confirm with Tyrell whether this is psych or cyc* | Psychiatric ward / padded room set |
| Jail Cell | `/sets/jail-cell` | **PHOTOS NEEDED** — placeholder for now | County-jail holding cell |
| Prison Cell | `/sets/prison-cell` | **PHOTOS NEEDED** — placeholder for now | State-prison block cell |
| LED Walls | `/sets/led-walls` | `02_LED-WALL/01-hero-led-wall-car-driving-plate.png` | Two 12'×16' LED walls · Watchout + Unreal Engine |

---

### PAGE 3a · Set detail · `/sets/courtroom`

**Hero** (dark)
- Eyebrow: `01 · COURTROOM`
- Headline: The full bench. Sync-sound rated.
- Hero image: full-width — `03_COURTROOM/01-hero-courtroom-wide.png`
- Meta row (caps, mono): `$150/hr · 3 HR MIN · 24/7 ACCESS · 7,500 SQFT · 100 PPL`

**About this set** (light section)
- Eyebrow: `ABOUT THE COURTROOM`
- Body:
  > A complete courtroom set built for our own productions — judge's bench (raised, with working banker's lamp), witness stand, counsel tables, defendant and plaintiff seating, gallery pews behind the bar, US + state flags flanking the bench.
  >
  > Wainscoted walls with acoustic-panel detail in a warm brown-and-tan palette that photographs cleanly and doesn't fight skin tones. Hardwood flooring throughout. Production lighting grid above with pre-rig access before your call.
  >
  > Coverage works in every direction: master from gallery, reverse over judge, witness-stand singles, counsel-table OTS, gallery POVs.

**Photo gallery** (light, full-bleed)
Upload 5 photos:
- `03_COURTROOM/01-hero-courtroom-wide.png`
- `03_COURTROOM/02-judge-bench-flags-detail.png`
- `03_COURTROOM/03-gallery-and-counsel-tables.png`
- `03_COURTROOM/04-witness-stand-and-gallery.png`
- `03_COURTROOM/05-judge-bench-alt-wide.png`

**Pricing block** (dark sticky-style if Fluid Engine allows)
- $150 / hr
- 3-hour minimum
- 10% off on 8+ hour bookings
- Cleaning + studio manager included
- Free cancellation within 24 hours of booking
- Buttons: `Request a Quote` · `Book on Peerspace` · `Book on Giggster`
- Sub: *Or call Tyrell directly: (470) 231-8971*

**Quote form** (dark) — same as home page form, with hidden field set to "Courtroom"

---

### PAGE 3b · Set detail · `/sets/hospital`

Same structure as courtroom. Content:

- Eyebrow: `02 · HOSPITAL`
- Headline: Patient room. Connected corridor. Shoot in continuity.
- Hero: `04_HOSPITAL-SUITE/01-hero-hospital-room-wide.png`
- About:
  > Connected patient room and corridor that shoot in continuity. Pull a patient out of the room into the hall in one take, or shoot each space as a standalone setup.
  >
  > Patient room: adjustable hospital bed, vitals monitor on rolling cart, IV pole, anatomical skeleton model, bedside lamp, visitor chair, sink/wash station. Two-tone clinical wall palette.
  >
  > Corridor: waiting bench, side table, plant, door-through to additional spaces, industrial ceiling with exposed pipe, safety posters and photo frames.
- Photos:
  - `04_HOSPITAL-SUITE/01-hero-hospital-room-wide.png`
  - `04_HOSPITAL-SUITE/02-hospital-bed-detail-sink.png`
  - `04_HOSPITAL-SUITE/03-hospital-corridor-wide.png`
  - `04_HOSPITAL-SUITE/04-corridor-waiting-bench.png`

---

### PAGE 3c · Set detail · `/sets/police-bullpen`

- Eyebrow: `03 · POLICE BULL PEN`
- Headline: Detective squad room. Active case board.
- Hero: `05_POLICE-PRECINCT/01-hero-bullpen-wide.png`
- About:
  > A working-precinct build for episodic and feature crime drama. Multi-desk squad room — four detective desks with period-appropriate monitors, filing cabinets, precinct seal on the wall, active case board with photos, papers, and string tacks.
  >
  > Kitchenette with fridge and coffee in back. Two-tone gray walls with blue accent. Industrial ceiling with exposed conduit reads as institutional / government building.
- Photos:
  - `05_POLICE-PRECINCT/01-hero-bullpen-wide.png`
  - `05_POLICE-PRECINCT/02-case-board-desks-tight.png`
  - `05_POLICE-PRECINCT/03-bullpen-blue-wall-alt.png`
  - `05_POLICE-PRECINCT/04-bullpen-case-board-alt.png`

---

### PAGE 3d · Set detail · `/sets/interrogation`

- Eyebrow: `04 · INTERROGATION`
- Headline: The trope shot, built right.
- Hero: `06_INTERROGATION-SOLO/01-hero-two-way-mirror.png`
- About:
  > Single metal table, two metal chairs, single overhead bulb, two-way mirror, heavy door. Purple-lavender lower walls and tan upper walls give the room a distinctive, slightly off-balance palette that photographs moody.
  >
  > Sync-sound rated.
- Photos:
  - `06_INTERROGATION-SOLO/01-hero-two-way-mirror.png`
  - `06_INTERROGATION-SOLO/02-door-table-alt-angle.png`

---

### PAGE 3e · Set detail · `/sets/psych-wall`

⚠️ **Confirm with Tyrell which photos belong here.** If the "PSYCHE-WALL" Drive folder is actually the psych ward set (not a cyc), use those photos. If it's a cyc and the psych wall hasn't been photographed, mark as "photos coming soon."

- Eyebrow: `05 · PSYCH WALL`
- Headline: Padded psychiatric ward.
- Hero: `07_CYC-WALL/01-hero-cyc-clean-sweep.png` ⚠️ to verify
- About:
  > Psychiatric ward / padded room set. Clean white treatment with surrounding blue walls for easy set extension and chroma keying. Production lighting grid overhead, sync-sound rated.
- Photos:
  - `07_CYC-WALL/01-hero-cyc-clean-sweep.png`
  - `07_CYC-WALL/02-cyc-alt-angle-corner.png`

---

### PAGE 3f · Set detail · `/sets/jail-cell`

**Photos needed** — Shannon's "ATL FILM STUDIOS PICTURES" Drive folder likely has these. Placeholder text below.

- Eyebrow: `06 · JAIL CELL`
- Headline: County jail holding cell.
- Hero: *photos needed*
- About:
  > County-jail style holding cell. Bars, bench, concrete finish. Sync-sound rated, shoots together with the Police Bull Pen in continuity for arrest-to-holding sequences.

---

### PAGE 3g · Set detail · `/sets/prison-cell`

**Photos needed.**

- Eyebrow: `07 · PRISON CELL`
- Headline: State prison block cell.
- Hero: *photos needed*
- About:
  > State-prison block cell. Bunk, narrow walls, single window detail. For long-form incarceration scenes, prison drama, true-crime reenactment.

---

### PAGE 3h · Set detail · `/sets/led-walls`

- Eyebrow: `08 · LED VOLUME WALLS`
- Headline: Two 12'×16' LED walls. Watchout + Unreal Engine.
- Hero: `02_LED-WALL/01-hero-led-wall-car-driving-plate.png`
- About:
  > Two 12-foot by 16-foot LED walls running Watchout and Unreal Engine. Configurable for virtual production, driving plates, hero environments, and in-camera VFX.
  >
  > The large bay door opens directly onto the LED stage — drive a picture car onto the stage for driving plates without low-loaders, location permits, or insurance gymnastics.
  >
  > Used on our own productions for car shoots, music video environments, narrative ICVFX, and brand campaigns where every setup needs a different visual context.
- Photos:
  - `02_LED-WALL/01-hero-led-wall-car-driving-plate.png`
  - `02_LED-WALL/02-led-wall-cosmic-content-stage-wide.png`
  - `02_LED-WALL/03-led-wall-production-atmosphere.png`

---

### PAGE 4 · About (`/about`)

**Page header** (dark)
- Eyebrow: `ABOUT`
- Headline: A working production studio, in Atlanta.
- Subhead: Operated by Swirl Films — an active film and television production company that builds these sets for its own shows.

**Body** (light, single column)
> ATL Film Studios is the production facility behind Swirl Films' originals. We built eight standing sets and two LED volume walls to support our own productions. When the calendar allows, we open the doors to outside crews.
>
> That's the difference between us and the dominant Atlanta multi-set listings: we're a production company first. The stages are built to the standards a working production needs because we use them ourselves.

**Heading: Swirl Films**
> Swirl Films is a full-service production company with originals distributed on TUBI, BET+, and other major streaming platforms. The company has been in business for over a decade producing feature-length films, episodic content, music videos, and branded content. ATL Film Studios is the physical home of those productions.

**Heading: The team**
- **Eric Tomosunas** — Producer, Swirl Films. Twenty-plus years in production. [IMDb](https://www.imdb.com/name/nm1358327/)
- **Tyrell** — Studio Manager, ATL Film Studios. On-site daily.
- **Jay Batchler** — Post-Production / Operations
- **Shannon Settlemyre** — Post-Production / Distribution

**Heading: The studio**
- Eight pre-dressed standing sets
- Two 12'×16' LED volume walls (Watchout + Unreal Engine)
- Production lighting grid throughout
- Studio insulation (sync-sound rated)
- Drive-in loading bay (LED + equipment)
- Hair / makeup / vanities, dressing rooms, small prop / wardrobe shop
- Free crew parking
- 24/7 access

**CTA buttons:** `Request a Quote` · `View Sets`

---

### PAGE 5 · Location (`/location`)

**Page header** (dark)
- Eyebrow: `LOCATION`
- Headline: One address. The full company move, eliminated.
- Subhead: 2132 James Jackson Parkway NW, Atlanta, GA 30318

**Map block** (full-bleed)
- Embed: `https://www.google.com/maps?q=2132+James+Jackson+Parkway+NW+Atlanta+GA+30318&z=14&output=embed`

**Two-column block (light)**
Left column: **Getting here**
- From Hartsfield-Jackson Intl (ATL): ~18 min via I-85 N / I-285 W
- From Downtown Atlanta: ~12 min via I-75/85 N
- From Midtown: ~13 min
- From Buckhead: ~17 min
- From Sandy Springs: ~25 min

Right column: **Crew access**
- Drive-in loading bay — full-height rolling door for LED + equipment + picture-car drive-on
- Free crew parking on-site
- Truck and trailer access (confirm size with studio manager during booking)
- 24/7 access — no after-hours fee
- Air-conditioned, climate-controlled

**Buttons:** `Open in Google Maps` (link out) · `Schedule a Walk-Through` (→ `/contact-us`)

---

### PAGE 6 · Contact / Quote (`/contact-us`)

**Page header** (dark)
- Eyebrow: `REQUEST A QUOTE`
- Headline: Tell us about the shoot.
- Subhead: Direct booking — no platform fee. Tyrell responds within 2 hours during business hours.

**Two-column block**
Left: Contact details
- **Address:** 2132 James Jackson Pkwy NW, Atlanta, GA 30318
- **Phone:** (470) 231-8971
- **Email:** atlfilmstudios@swirlfilms.com
- **Studio manager:** Tyrell — on-site daily
- **Hours:** Monday–Friday, 9am–7pm ET (weekend bookings available by request)
- **Response time:** Within 2 hours during business hours

Right: Squarespace native form (ink background block) — fields as defined in the home page form section.

---

### PAGE 7 · FAQ (`/faq`)

**Page header** (dark)
- Eyebrow: `FAQ`
- Headline: The production questions, answered.

**Accordion block (Squarespace has native accordion in Fluid Engine)**

Q: Are the stages sync-sound rated?
A: Yes. The studio is built with insulation and treated for sync-sound. Every set works for production audio.

Q: What's the rate?
A: $150 per hour, 3-hour minimum, 10% off on 8+ hour bookings. Same rate for every set; book any combination.

Q: What's included?
A: All eight standing sets, two LED walls, hair/makeup area, dressing rooms, vanities, small prop / wardrobe shop, WiFi, restrooms, free parking, drive-in bay access.

Q: Are grip, electric, and camera included?
A: Available on request, not included in the base rate. Tell us your gear needs in the quote request and we'll send a separate quote for crew + kit.

Q: What's the cancellation policy?
A: Very flexible — full refund up to 24 hours after booking confirmation. After that, non-refundable.

Q: Can I shoot a car on the LED wall?
A: Yes. The large bay door opens onto the LED stage — drive a picture car in for driving plates without low-loaders or location permits.

Q: What about the blue walls around the sets?
A: Painted chroma blue for easy set extension and digital replacement. Sets sit inside this blue perimeter, so you can extend any environment digitally.

Q: How many people can the space hold?
A: Up to 100 cast and crew. For LED-volume shoots with full production crews, plan for 60–80 people comfortably.

Q: Hours?
A: 24/7. No after-hours fees.

Q: Where exactly is the studio?
A: 2132 James Jackson Parkway NW, Atlanta, GA 30318 — Whittier Mill Village, on the western edge of the city near Vinings. Free parking on-site, drive-in bay access.

Q: Do you have minors / animals / pyro policies?
A: Yes — minors with guardian and applicable GA child labor permits; animals with advance notice and a small cleaning add-on; pyro / open flame / stunts require 7-day advance approval and a licensed coordinator.

Q: Are you on Peerspace and Giggster?
A: Yes — both platforms. Direct booking through this site saves the platform fee and gives you the most flexibility on rates, add-ons, and scheduling.

**CTAs at bottom:** `Request a Quote` · `Call (470) 231-8971`

---

### PAGE 8 · Thank You (`/thank-you`, Not Indexed)

**Page header** (dark, tall)
- Eyebrow: `REQUEST RECEIVED`
- Headline: Thanks. We'll be in touch.
- Subhead: Tyrell, our studio manager, responds within 2 hours during business hours. If it's urgent, give him a call.

**Buttons:** `Call (470) 231-8971` (primary) · `Back to the studio` (→ `/`)

**Page Header Code Injection:** `<script>if(typeof fbq==='function')fbq('track','Lead');</script>` (already specified above)

---

## Step-by-step build sequence (suggested order in Squarespace)

### Phase 1 — Settings + framework (do once, ~30 min)
1. **Pages panel** — drag the existing 3 placeholder pages into "Not Linked" section
2. **Brand → Logo** — confirm 2025 logo uploaded
3. **Design → Fonts** — set Tiempos Headline + Inter (or closest available pairing)
4. **Design → Colors** — set the 5 colors per the spec above
5. **Design → Custom CSS** — paste the CSS block above
6. **Settings → Advanced → Code Injection** — paste Meta pixel into header (replace `YOUR_PIXEL_ID_HERE` with your actual pixel ID from Business Manager `1335264358528617`)
7. **Marketing → Subscriptions** — confirm form-submit notifications route to `atlfilmstudios@swirlfilms.com` + `tyrell@swirlfilms.com`

### Phase 2 — Page tree (~30 min)
8. Create the 8 new pages with the slugs listed above
9. Add main nav items in this order: Sets · About · Location · FAQ · `[Request a Quote]` (button-style)
10. Set `/thank-you` page to "Not Indexed" in Page Settings

### Phase 3 — Content (~2-3 hours)
11. Work through each page top-to-bottom, pasting copy and uploading images
12. Use Fluid Engine sections; "Lightest" theme for content sections, "Darkest" for hero/dark interludes
13. For per-set pages, build the first one (Courtroom) thoroughly, then duplicate that page in the Pages panel and swap content for each subsequent set — much faster than building each from scratch
14. Upload images from `set-rentals/_published/[NN]_*/` — Squarespace will host them; keep the local files as backup

### Phase 4 — QA (~30 min)
15. Preview every page on desktop + mobile
16. Test the form on one page → submit a test → verify both email recipients receive it → verify redirect to `/thank-you` → verify Meta pixel `Lead` event fires (use Meta Pixel Helper Chrome extension)
17. Click every "Request a Quote", "Book on Peerspace", "Book on Giggster", and phone link — verify they go to the right destination
18. Test on mobile (iPhone + Android sizes via Squarespace's preview)

### Phase 5 — Go live (~5 min)
19. Confirm domain is pointing to Squarespace (atlfilmstudios.com — should already be configured)
20. Set the new `/` page as the homepage (Pages panel → Set as Homepage)
21. Publish all pages

**Total estimated time:** ~4 hours of focused work in Squarespace.

---

## Blocking items before publish

1. **Photos for Jail Cell + Prison Cell** — need to access Shannon's Drive folder or have Tyrell take new shots
2. **Confirm "Psych Wall" photos** — whether the PSYCHE-WALL folder is the psych ward set or a cyc
3. **Meta Pixel ID** — from Events Manager in Business Manager `1335264358528617`
4. **Pricing alignment decision** — Peerspace $150/hr vs Giggster $180/hr. The Squarespace site headlines $150 (per Peerspace); fine to leave Giggster at $180 since they're separate bookings, but worth confirming intentional
5. **Walk-through video for LED wall** — would dramatically lift conversion. Tyrell could shoot a 30-second LED-stage demo on iPhone and we drop it as a video block

---

## What this scaffold delivers

Once executed in Squarespace, you have:
- **8 paid-ads landing pages** (one per set on Peerspace), all with message-match to the matching ad creative
- **Unified $150/hr pricing** across every set page — same headline rate as your live Peerspace listing
- **Direct-book Quote form** as primary CTA on every page (Squarespace handles email routing)
- **Secondary CTAs to Peerspace + Giggster** for guests who prefer platform-mediated trust
- **Meta pixel + custom events** wired up for ad optimization (Lead, ClickToPeerspace, ClickToGiggster, ClickToCall)
- **Existing logo + brand assets preserved**, old "Coming Soon" content archived to Not Linked
- **The aesthetic anchors** (A24 editorial, generous whitespace, cyan/teal accent) baked in via Custom CSS

---

## After-publish checklist

- Add `atlfilmstudios.com` to your Meta Business Manager → Domain verification → Brand Safety
- Set up Aggregated Event Measurement priority order: Lead → ClickToPeerspace → ClickToGiggster → ClickToCall
- Submit the sitemap to Google Search Console (Squarespace auto-generates at `/sitemap.xml`)
- Schedule the first Meta ad campaign per the structure in [`website-structure.md`](website-structure.md): 1 campaign × 8 ad sets (one per set), 3-5 creatives each, optimizing for the `Lead` event
