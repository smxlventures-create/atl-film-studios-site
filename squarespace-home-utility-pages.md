# ATL Film Studios — Home + Utility Pages Content Scaffold

**Companion to:** `squarespace-page-blocks.md` (which covers the 8 set pages)
**Pages covered here:** Home (Index Page with 7 sub-pages), About, FAQ, Thank-You, Contact (replaces archived /contact-us)

---

## PAGE: Home (Index Page named "Home")

**Page Settings:**
- Page Title: ATL Film Studios — Atlanta Film Studio Rental
- Slug: `/` (set as Homepage via gear → Set as Homepage)
- SEO Title: Atlanta Film Studio Rental — 8 Sets + LED Volume Wall | ATL Film Studios
- SEO Description: Atlanta film studio with 8 standing sets and 2 LED volume walls. $150/hr, 3hr min, 24/7. Operated by Swirl Films (TUBI / BET+). Book direct or via Peerspace.
- Featured Image: `atl-film-studios-led-wall-driving-plate-hero.jpg`

The home is a Brine Index Page with 7 sub-pages stacked vertically. Build each sub-page below as a Layout sub-page (not Gallery) inside the Index. Apply per-section dark/light backgrounds via Custom CSS scoped to each sub-page's collection ID (best-practices brief, accessibility section).

### Sub-page 1 — Hero (Layout sub-page, dark theme)

- **Featured Image** (becomes section background): `atl-film-studios-led-wall-driving-plate-hero.jpg` with focal point on the car against the LED wall
- **Block sequence:**
  1. Text Block (eyebrow): `OPERATED BY SWIRL FILMS · ATLANTA`
  2. Text Block (H1): **Atlanta's working production studio.**
  3. Text Block (lead): Eight standing sets and two 12-by-16 LED volume walls — under one roof, in Whittier Mill Village. Sync-sound rated. $150/hr, 3-hour minimum, 24/7 access. Operated by Swirl Films — TUBI and BET+ originals.
  4. Button (primary): `Book on Peerspace` → `https://www.peerspace.com/pages/listings/6a0a7e197c1c8623e0e341b2`
  5. Button (ghost): `View All Sets` → `#sets`

### Sub-page 2 — Sets grid (Layout sub-page, light theme, anchor `#sets`)

- **Block sequence:**
  1. Text Block (eyebrow): `THE STAGES`
  2. Text Block (H2): Pre-dressed sets, production-ready today.
  3. Text Block (lead): Each set is built and dressed for our own productions. Open to outside crews when the calendar allows. No company moves — all eight sets and both LED walls under one roof.
  4. **Gallery Block** (Grid layout, 2-column on desktop, 1-column on mobile, lightbox OFF — each thumbnail links to a set page):

| Order | Image | Caption | Click destination |
|---|---|---|---|
| 1 | `atl-film-studios-courtroom-set-hero.jpg` | Courtroom | `/courtroom` |
| 2 | `atl-film-studios-hospital-patient-room-hero.jpg` | Hospital | `/hospital` |
| 3 | `atl-film-studios-police-precinct-bullpen-hero.jpg` | Police Bullpen | `/police-bullpen` |
| 4 | `atl-film-studios-interrogation-room-mirror-hero.jpg` | Interrogation | `/interrogation` |
| 5 | `atl-film-studios-psych-wall-hero.jpg` | Psych Wall | `/psych-wall` |
| 6 | `atl-film-studios-led-wall-driving-plate-hero.jpg` | LED Volume Walls | `/led-walls` |
| 7 | `atl-film-studios-courtroom-set-hero.jpg` (placeholder) | Jail Cell — coming soon | `/jail-cell` |
| 8 | `atl-film-studios-courtroom-set-hero.jpg` (placeholder) | Prison Cell — coming soon | `/prison-cell` |

> Note on placeholder images for Jail Cell + Prison Cell: until photos land, use a generic dressed-set photo with caption "photos coming soon — call (470) 231-8971."

### Sub-page 3 — Why book here (Layout sub-page, dark theme)

- **Block sequence:**
  1. Text Block (eyebrow): `WHY BOOK ATL FILM STUDIOS`
  2. Text Block (H2): A working studio, not a venue.
  3. **3-column row** with three Text Blocks:

**Column 1:**
> **Operated by an active production company.**
> ATL Film Studios is the production home for Swirl Films — TUBI and BET+ originals. Crew, kit, and process are dialed because we use them ourselves.

**Column 2:**
> **Sync-sound rated, 24/7 access, no surprises.**
> The 7,500 sqft stage is insulated for sync-sound work. 24/7 access is included at the published $150/hr rate — no after-hours fee, no surprise charges.

**Column 3:**
> **Drive-in bay, LED + cyc, every wall keyable.**
> Large bay door for equipment and picture cars. Two 12-by-16 LED volume walls (Watchout + Unreal Engine). All walls outside the dressed sets are painted blue for easy set extension or chroma keying.

### Sub-page 4 — Pricing (Layout sub-page, light theme)

- **Block sequence:**
  1. Text Block (eyebrow): `PRICING`
  2. Text Block (H2): Published rate. No quote-on-request theater.
  3. **Code Block** (HTML pricing table):

```html
<div class="pricing-grid">
  <div class="pricing-headline">$150 <span>/ hour</span></div>
  <ul class="pricing-points">
    <li>3-hour minimum</li>
    <li>10% off 8+ hour bookings</li>
    <li>24/7 access included</li>
    <li>Very Flexible cancellation — full refund up to 24 hours after booking confirmation</li>
    <li>Grip, electric, and camera available on request</li>
    <li>One rate, all eight sets and both LED walls</li>
  </ul>
  <div class="pricing-ctas">
    <a href="https://www.peerspace.com/pages/listings/6a0a7e197c1c8623e0e341b2" class="btn btn-primary" target="_blank">Book on Peerspace</a>
    <a href="https://giggster.com/listing/standing-sets-perfect-for-film-verticals-content" class="btn btn-secondary" target="_blank">Book on Giggster</a>
  </div>
</div>
```

(CSS for `.pricing-grid` will be added to the Custom CSS if not already present.)

### Sub-page 5 — Atmosphere (Gallery sub-page, full-bleed images)

- **Gallery style:** Stacked (full-bleed images, 1 per row on desktop)
- **Images:**
  1. `atl-film-studios-led-wall-cosmic-stage.jpg` — Production on the LED volume wall with cosmic content playing
  2. `atl-film-studios-led-wall-production.jpg` — Production crew working on the LED volume wall stage
  3. `atl-film-studios-police-precinct-bullpen-hero.jpg` — Detective bullpen set in production-ready lit state
- **Below the gallery, Text Block (centered, smallish):**
  > A working studio, not a rental venue. You're booking the room our crew already shot in last week.

### Sub-page 6 — Location (Layout sub-page, dark theme)

- **Block sequence:**
  1. Text Block (eyebrow): `LOCATION`
  2. Text Block (H2): Whittier Mill Village. 15 minutes from Hartsfield.
  3. **2-column row:**

**Left column** — Static map image (per best-practices brief: NOT Map Block — too heavy for LCP). Upload a screenshot of the Google Maps view of 2132 James Jackson Pkwy NW and link it out to Google Maps.

**Right column** — Text Block:
> **2132 James Jackson Parkway NW**
> Atlanta, GA 30318
> Whittier Mill Village
>
> 15 min from Hartsfield-Jackson International
> 12 min from Downtown Atlanta
> 17 min from Buckhead
>
> Free on-site parking. Large bay door for equipment + picture car drive-in. 24/7 access.
>
> [Open in Google Maps →](https://maps.google.com/?q=2132+James+Jackson+Parkway+NW+Atlanta+GA+30318)

### Sub-page 7 — Quote form (Layout sub-page, dark theme, anchor `#quote`)

- **Block sequence:**
  1. Text Block (eyebrow): `REQUEST A QUOTE`
  2. Text Block (H2): Lock the date.
  3. Text Block (lead): Tyrell, our studio manager, responds within one business day. Or call (470) 231-8971.
  4. **Form Block** — same configuration as the set-page form blocks, but with hidden field `Set Interest` = `Home page / Not specified` (the user can specify in the message field):
     - Name (text, required)
     - Email (email, required)
     - Phone (phone, required)
     - Production name (text, optional)
     - Shoot date(s) (date, required)
     - Estimated hours (dropdown: 3 / 4 / 5 / 6 / 7 / 8+ (10% off), required)
     - Crew size (dropdown: 1–10 / 11–25 / 26–50 / 51–100, required)
     - Which set(s) are you considering? (dropdown: Courtroom / Hospital / Police Bullpen / Interrogation / Psych Wall / Jail Cell / Prison Cell / LED Walls / Multiple / Not sure yet, required)
     - Tell us about the shoot (paragraph, optional)
  5. Button: Send Quote Request
  6. Post-submit: Redirect → `/thank-you`
  7. Storage: Email → `atlfilmstudios@swirlfilms.com` + Email → `tyrell@swirlfilms.com` + Google Drive (Sheet log)

---

## PAGE: About (`/about`)

**Page Settings:**
- Page Title: About — ATL Film Studios
- Slug: `about`
- SEO Title: About ATL Film Studios — Operated by Swirl Films, Atlanta
- SEO Description: ATL Film Studios is the production home for Swirl Films — TUBI and BET+ originals. 8 standing sets, 2 LED walls, 24/7 access in Atlanta's Whittier Mill Village.
- Featured Image: `atl-film-studios-led-wall-driving-plate-hero.jpg`
- Page type: Layout Page (with banner)

**Banner:**
- Image: `atl-film-studios-led-wall-driving-plate-hero.jpg`
- H1: A working production studio.
- Subhead: Operated by Swirl Films — an active film and TV production company.

**Body:**

> ## About ATL Film Studios
>
> ATL Film Studios is the production home for **Swirl Films** — a film and television production company that's been making theatrical features, streaming originals, and music videos since 2003. Our originals have run on TUBI, BET+, and other major streaming platforms.
>
> We built and dressed all eight standing sets — courtroom, hospital, police bullpen, interrogation, psych wall, jail cell, prison cell — for our own productions. Same with the two 12-by-16 LED volume walls running Watchout and Unreal Engine. When our calendar allows, we open the doors to outside crews at a flat $150/hr.
>
> ## The studio
>
> 7,500 sqft insulated stage in Whittier Mill Village, on Atlanta's west side — 15 minutes from Hartsfield-Jackson, 12 from Downtown, 17 from Buckhead. All walls outside the dressed sets are painted blue for set extension and chroma keying. The bay door is sized for picture-car drive-in onto the LED stage floor. 24/7 access is included.
>
> ## The team
>
> Eric Tomosunas — Producer, Swirl Films. Tyrell — Studio Manager, on-site daily, the person who responds when you submit a quote request.
>
> ## Why this exists
>
> Atlanta has plenty of studios. What's rare is a studio operated by an active production company — where the sets are built to the standards a working production needs because we use them every week. That's the bet. If it works for our shoots, it'll work for yours.

**Bottom CTAs:**
- Button (primary): View All Sets → `/#sets`
- Button (ghost): Request a Quote → `/#quote`

---

## PAGE: FAQ (`/faq`)

**Page Settings:**
- Page Title: Frequently Asked Questions — ATL Film Studios
- Slug: `faq`
- SEO Title: ATL Film Studios FAQ — Pricing, Hours, Booking Policies | Atlanta
- SEO Description: Answers about $150/hr pricing, 3-hour minimum, 24/7 access, cancellation, grip and electric availability, and how to book at ATL Film Studios in Atlanta.
- Page type: Layout Page (no banner — or use a subtle filler image)

**Body — accordion or Text Block list. Each question as H3, answer as paragraph:**

### What's the rate?
$150 per hour with a 3-hour minimum. 10% off 8+ hour bookings. One rate for all eight sets and both LED walls. Same price whether you book direct, via Peerspace, or via Giggster.

### What's the minimum booking?
3 hours. Most productions wrap a half-day plate in 4–6 hours. The 10% discount kicks in at 8 hours.

### What are your hours?
24/7. The published $150/hr rate is the 24/7 rate — no after-hours fee.

### What's the cancellation policy?
Very Flexible. Full refund up to 24 hours after booking confirmation. Non-refundable inside the 24-hour window before your start time.

### Can I bring grip, electric, and camera?
Yes. You can bring your own, or we can provide on request. Tell us what you need in the quote form or in your Peerspace / Giggster message.

### How big is the stage?
7,500 sqft, sync-sound insulated. Up to 100 people on site.

### What sets are available?
Eight: Courtroom · Hospital · Police Bullpen · Interrogation · Psych Wall · Jail Cell · Prison Cell · LED Volume Walls (two 12-by-16 with Watchout and Unreal Engine). All eight included in one booking.

### Can I shoot a picture car on the LED wall?
Yes. The bay door is sized for picture-car drive-in onto the LED stage floor. Drive-on plates are one of our most-booked scenarios.

### What's the difference between booking direct and booking on Peerspace / Giggster?
Same price either way. Direct booking via the quote form goes to Tyrell, our studio manager, who responds within one business day. Peerspace and Giggster are instant book — same rate, but you book through their platform terms.

### Where exactly is the studio?
2132 James Jackson Parkway NW, Atlanta, GA 30318 — Whittier Mill Village, on the west side of Atlanta. 15 minutes from Hartsfield-Jackson International.

### Is there parking?
Free on-site parking with plenty of room for crew vehicles and a production truck or two.

### Is there a hair / makeup area?
Yes — dressing rooms and vanities are included in the rate.

### Can I bring a dog / pet?
Talk to Tyrell when you submit your quote. Animals are case-by-case.

### Can I shoot weapons or special effects?
Open flame and pyro need prior approval. Prop weapons fine with crew handling. Tell us in the quote what you're planning and we'll confirm.

### Who actually owns and runs the studio?
ATL Film Studios is operated by Swirl Films, an active film and TV production company (TUBI, BET+ originals).

**Bottom CTAs:**
- Button (primary): Request a Quote → `/#quote`
- Button (ghost): Call (470) 231-8971 → `tel:+14702318971`

---

## PAGE: Thank-You (`/thank-you`)

**Page Settings:**
- Page Title: Thank you — ATL Film Studios
- Slug: `thank-you`
- SEO Title: Thank you — your quote request was received
- SEO Description: We received your quote request. Tyrell will be in touch within one business day. Call (470) 231-8971 for anything urgent.
- **CRITICAL: SEO tab → Hide page from search engine results (toggle ON — noindex)**
- Page type: Layout Page (no banner needed)

**Page Header Code Injection (gear → Advanced → Page Header Code Injection):**
```html
<script>
  if (typeof fbq === 'function') { fbq('track', 'Lead'); }
</script>
```

**Body:**

> ## Thanks — we'll be in touch.
>
> Your quote request was received. Tyrell, our studio manager, will respond within one business day.
>
> For anything urgent, call (470) 231-8971 or text the same number.

**CTAs:**
- Button (primary): Back to All Sets → `/#sets`
- Button (ghost): Call (470) 231-8971 → `tel:+14702318971`

---

## PAGE: Contact (`/contact`)

> **Note on slug:** the old site has `/contact-us`. We can either reuse that exact slug (after archiving the old page contents) OR use the cleaner `/contact`. Recommend `/contact` since the old `/contact-us` is archived and we control the URL. If we keep `/contact-us`, set up a URL Mapping `/contact-us -> /contact 301` or vice versa to handle any backlinks.

**Page Settings:**
- Page Title: Contact — ATL Film Studios
- Slug: `contact`
- SEO Title: Contact ATL Film Studios — Quote, Tour, or Direct Booking
- SEO Description: Get a quote, schedule a tour, or call (470) 231-8971. Tyrell responds within one business day. Atlanta film studio rental, 8 sets + LED walls.
- Page type: Layout Page (no banner — use a side image)

**Body — 2-column row:**

**Left column** (text):
> ## Get in touch
>
> **Phone / text:** (470) 231-8971
> **Email:** atlfilmstudios@swirlfilms.com
> **Studio:** 2132 James Jackson Parkway NW, Atlanta GA 30318
>
> **Hours:** 24/7 by appointment. Tyrell is on site weekdays during business hours.
>
> ## Want a tour?
>
> Submit the form on the right with "Tour request" in the message field, or call the number above. Tours take 20–30 minutes; bring your line producer.
>
> ## Book direct?
>
> Same $150/hr rate as Peerspace / Giggster — we just keep more of it. Use the form on the right for direct booking inquiries.

**Right column** (Form Block):
Same form configuration as the home `#quote` form. Hidden field `Set Interest` = `Contact form / Not specified`. Form title: "Get in touch with ATL Film Studios."

---

## Summary of pages built so far

| Slug | Type | Status |
|---|---|---|
| `/` | Index Page (7 sub-pages stacked) | Built per this doc |
| `/courtroom` | Layout Page (master) | Built per page-blocks.md |
| `/hospital` | Layout Page (duplicate) | Built per page-blocks.md |
| `/police-bullpen` | Layout Page (duplicate) | Built per page-blocks.md |
| `/interrogation` | Layout Page (duplicate) | Built per page-blocks.md |
| `/psych-wall` | Layout Page (duplicate, ⚠️ verify with Tyrell) | Built per page-blocks.md |
| `/jail-cell` | Layout Page (duplicate, photos pending) | Draft per page-blocks.md |
| `/prison-cell` | Layout Page (duplicate, photos pending) | Draft per page-blocks.md |
| `/led-walls` | Layout Page (duplicate) | Built per page-blocks.md |
| `/about` | Layout Page | Built per this doc |
| `/faq` | Layout Page | Built per this doc |
| `/contact` | Layout Page | Built per this doc |
| `/thank-you` | Layout Page (noindex + Lead event) | Built per this doc |

Total: **13 pages**, all paste-ready.
