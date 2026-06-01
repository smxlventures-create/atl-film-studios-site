# atlfilmstudios.com — Site Structure & Funnel Strategy

**Live status (June 1 2026):** Squarespace placeholder, "Coming Soon," logo + address + phone + Tyrell contact email displayed
**Studio address:** 2132 James Jackson Parkway NW, Atlanta, GA 30318
**Studio phone:** 470-231-8971
**Studio contact:** tyrell@swirlfilms.com (Tyrell, on-site / studio manager)
**Host email for platforms:** atlfilmstudios@swirlfilms.com
**Meta Business Manager ID:** 1335264358528617
**Social:** Instagram + Facebook (links in placeholder footer)

---

## TL;DR

1. **Strategic decision needed first:** route ad traffic *only* to Peerspace/Giggster, or build a hybrid funnel that captures direct bookings on-domain and uses platforms as secondary CTAs. **Strong recommendation: hybrid.** Both dominant Atlanta comps (Studio Space ATL, 24 ATL Studios) bypass Peerspace/Giggster on their owned websites — they're not paying ad dollars to feed the 19-20% platform tax.
2. **Site structure: 7 set-specific landing pages + supporting utility pages.** Mirrors the 7 Peerspace/Giggster listings 1:1 so each ad creative has a matched-message landing page.
3. **Keep Squarespace for v1** — fast to launch, fine for ad volume up to ~$5k/mo. Migrate to Webflow/Shopify only if/when sustained $10k+/mo ad spend justifies it.
4. **Edgewood/Tyrell question is closed** — Tyrell is Swirl's studio manager (tyrell@swirlfilms.com). Earlier worry about a competing Peerspace listing was based on a misread.
5. **One pricing recalibration:** Studio Space ATL just published a 3-tier price card showing their sync-sound courtroom at **$220/hr**. Our $200/hr undercuts by $20. Hold.

---

## The strategic call: where does the ad-driven booking land?

| Path | Pros | Cons | Math (per $1,200 booking with $20 CPA) |
|---|---|---|---|
| **A — Ads to atlfilmstudios.com, off-site CTA to Peerspace/Giggster** (user's stated plan) | Lowest build effort, leverages platform trust + reviews + payment processing, no booking logistics on Swirl's side | -19% (Giggster) to -20% (Peerspace) per booking; **off-domain conversion tracking is degraded** under iOS / Meta restrictions; ad optimization only sees "Click to Peerspace" not "Booking Confirmed" | Booking $1,200, Peerspace fee -$240, **Swirl nets $940** |
| **B — Ads to atlfilmstudios.com, on-domain "Request Quote" form, direct-book by phone/email** (Studio Space ATL pattern) | Captures 100% of revenue (no platform fee), Meta can pixel the form-submit as conversion event, builds owned email list for repeat bookings | Higher build effort (need email/Calendly/inquiry routing), requires Tyrell or studio manager to respond fast (Power Hosts respond under 1hr), no built-in payment processing | Booking $1,200, 100% to Swirl, **Swirl nets $1,180** |
| **C — Hybrid (recommended)** — primary CTA is "Request Quote" (direct), secondary CTA is "Book on Peerspace/Giggster" | Best of both: captures direct-bookers who saved Swirl $240, falls back to platform for users who want platform-mediated trust | Same as B but slightly more design complexity (two CTA paths per page) | Direct mix wins. Even at 30% direct conversion, weighted avg net is ~$1,025/booking |

**Recommendation: Path C (Hybrid).** Math on a $5k/mo ad spend at break-even: Path A pays Peerspace ~$1,800/mo in fees that Path C recaptures even partially. Over a year, this is the difference between "atlfilmstudios.com is a cost center" and "atlfilmstudios.com is a profit center separate from platform listings."

The user's stated approach of "drive traffic to booking through either Peerspace or Giggster" is fine as a v1, but I'd argue the form submit + direct booking pathway should be the *primary* CTA from day one. Easy to add — just one form.

---

## Site map (v1, paid-traffic-optimized)

```
atlfilmstudios.com/
├── /                              Home — sets grid + trust + dual-CTA
├── /sets/
│   ├── /full-buyout               (Listing 1)
│   ├── /led-volume-wall           (Listing 2)
│   ├── /courtroom                 (Listing 3)
│   ├── /hospital-suite            (Listing 4)
│   ├── /police-precinct           (Listing 5)
│   ├── /interrogation             (Listing 6)
│   └── /cyc-wall                  (Listing 7)
├── /about                         Swirl Films story + Tyrell + team + credits
├── /amenities                     HMW, holding, parking, WiFi, load-in
├── /location                      Map, directions, parking, neighborhood
├── /contact                       Quote form + phone + studio manager
├── /faq                           Production-specific: COI, hours, soundproofing, etc.
└── /thank-you                     Form submit confirmation (Meta pixel fires here)
```

11 pages total. All 7 set pages mirror the 7 Peerspace/Giggster listings 1:1 — that is the message-match backbone for paid ads.

---

## Home page — section-by-section

Studio Space ATL is the closest template (they convert paid + organic traffic into phone/email leads). Mirroring their pattern with Swirl's wedges baked in:

### 1. Hero (above the fold)
- **Headline:** "Atlanta's working production studio."
- **Subhead:** "Six pre-dressed sets, an LED volume wall, and a cyc — operated by Swirl Films (TUBI / BET+ originals)."
- **Hero image:** LED wall with car driving plate (the strongest stop-scroll image in the inventory)
- **Dual CTA:** `Request a Quote` (primary, scroll-to-form or open Calendly) + `View Sets` (secondary, anchor to grid)
- **Trust strip below hero:** "TUBI · BET+ · ALLBLK · UMC" (or whichever credits we can use) + "Sync-sound rated stages · 24-hr access · Production-co operated"

### 2. Sets grid (2x4 on desktop, 1-col on mobile)
- 7 cards (one per listing) — hero photo + set name + one-line description + hover/tap CTA "View"
- Each card links to `/sets/[name]`
- Order: Full Buyout · LED Wall · Courtroom · Hospital Suite · Police Precinct · Interrogation · Cyc Wall

### 3. "Why book Swirl" — three-up trust block
- **Operated by Swirl Films** — active film/TV production company, TUBI/BET+ originals
- **Sync-sound rated** — published rates ARE the sync-sound rates (vs. competitors who quote MOS)
- **No per-set surcharges** — buyout includes everything, no per-set hour additions

### 4. Pricing teaser
- 7-row mini-table: Set name + "Starting at $X/hr" + min hours + "Details"
- Anchors to `/sets/[name]`

### 5. "Working studio" social proof
- Photo grid of crew at work / production atmosphere (the LED wall production shots are perfect here)
- Caption: "We run our own productions here — you're booking a working studio, not a venue rental."

### 6. Location + amenities snapshot
- Map embed (Google Maps, 2132 James Jackson Pkwy NW)
- Quick amenity bullets: free parking, drive-in load-in, HMW, holding, kitchenette, 24/7 access
- Link to `/amenities` for the full list

### 7. Final CTA block
- Big headline: "Ready to lock the date?"
- Quote form right there (Name, Email, Phone, Date, Set, Crew Size, Notes)
- Or click-through CTA: `Book on Peerspace` / `Book on Giggster` / `Call: 470-231-8971`

### 8. Footer
- Phone (clickable)
- Email (atlfilmstudios@swirlfilms.com or tyrell@swirlfilms.com — pick one and route)
- Address with Google Maps link
- IG + FB icons
- Powered by Swirl Films, linking to swirlfilms.com
- Hours

---

## Each `/sets/[name]` page — section-by-section

This is the workhorse — every paid ad lands here. Pattern mirrors Studio Space ATL's courtroom page (which converts paid traffic for them) but with Swirl's wedges.

### 1. Hero
- Set name + 1-line positioning ("Atlanta's sync-sound rated courtroom set — operated by Swirl Films")
- Hero photo (the matching set's hero from `/_published/`)
- Two CTAs:
  - **Primary:** `Request a Quote — direct booking, no platform fee` (anchors to form OR opens modal)
  - **Secondary:** `Book on Peerspace` and `Book on Giggster` (two buttons side-by-side)

### 2. Photo gallery
- 5–8 photos from the set's `/_published/[N]_[NAME]/` folder
- Mobile: horizontal swipe
- Desktop: 2-column or masonry grid

### 3. About this set
- The "About this space" copy from `listings.md` (already written, paste in)
- Coverage/composition notes — "Master from gallery, reverse over judge, tight singles"

### 4. Specs grid
- Sq ft (when known)
- Ceiling height
- Sync-sound rated · Yes
- Production lighting grid · Yes
- Drive-in access · [N feet]
- Power · [X amps]
- HMW/holding · Adjacent
- WiFi · 1 Gbps
- 24/7 access · Yes (add-on)

### 5. Pricing table (3-tier inspired by Studio Space ATL but cleaner)
- Hourly · Half-day (5h) · Full day (10h) · Multi-day discount
- Cleaning fee + security deposit row
- "Includes" line: studio manager, basic house lighting, WiFi, trash, restroom supplies

### 6. Add-ons (collapsible / accordion)
- Production lighting kit, grip & electric, on-site PA, after-hours, etc.

### 7. Perfect for (icon row)
- "Legal procedural episodic · Feature film trial scenes · Music videos · True-crime reenactment · Casting tapes · Branded content"

### 8. Trust strip
- "Operated by Swirl Films — TUBI / BET+ originals · Sync-sound rated · Working production studio"

### 9. Conversion block (repeat at bottom)
- Same dual-CTA: `Request a Quote` (form open) + `Book on Peerspace` + `Book on Giggster`
- Phone number visible: `Or call Tyrell directly: 470-231-8971`

### 10. Footer (consistent across site)

**Important per-set image gallery:** populate from `/Users/spencerlampkin/Claude/Swirl Films/set-rentals/_published/[NN]_[NAME]/`. Files are already in display order.

---

## Utility pages

### /about
- Swirl Films story (active production co, TUBI / BET+ / ALLBLK / UMC credits)
- Why we opened the studio (we built sets for our own shows, opened them when calendar allows)
- Team: Eric Tomosunas (Producer), Tyrell (Studio Manager), and 1–2 other key staff
- Photo of team / crew at work
- IMDb badge / credits link

### /amenities
- Hair / makeup / wardrobe — photos when reshoots come in
- Holding / green room
- Kitchenette
- Production office space
- Parking
- Drive-in load-in
- Power (X amps), WiFi (1 Gbps), 24/7 access
- Climate control, blackout, sync-sound rating

### /location
- Map embed
- Address + directions from major Atlanta nodes (Hartsfield, Downtown, Midtown, Buckhead, Sandy Springs)
- Parking diagram or photo
- Neighborhood / approach photos
- Loading-bay dimensions

### /contact
- Form (Name · Email · Phone · Date · Set interest · Crew size · Notes) — primary conversion
- Phone (470-231-8971) — clickable
- Email (atlfilmstudios@swirlfilms.com)
- Studio manager: Tyrell (with photo)
- Response time promise ("We respond within 2 hours during business hours")
- Office hours

### /faq
Production-specific FAQs that knock down booking objections before they reach inquiry:
- Are the stages sync-sound rated?
- What is the COI requirement and minimum coverage?
- Can we bring our own grip and electric?
- Do you provide a studio manager on-site?
- Is there a base camp / production office area?
- What is the cancellation policy?
- Can we hold a date before booking?
- Do you offer multi-day discounts?
- Is there parking for crew vehicles? Trucks?
- What is the load-in bay door dimension?
- Are minors / animals allowed on set?
- Pyro / open flame / stunts policy
- Can we modify or paint the existing sets? (No — they stay shooting-ready)
- Sales tax on rentals in Georgia?
- Do you have lighting / grip packages?

### /thank-you
- "Thanks — Tyrell will respond within 2 hours during business hours."
- Phone + secondary CTA: "Or call 470-231-8971 if it is urgent"
- **Meta pixel conversion event fires on this page** — `LeadSubmitted`

---

## Paid ads strategy

### Campaign structure on Meta (Business Manager `1335264358528617`)

**1 campaign** (Atlanta production studio rentals, $X/day budget)
- **7 ad sets**, one per listing — each with its own audience/creative/landing page
  - Ad set 1: Courtroom -> `/sets/courtroom`
  - Ad set 2: Hospital Suite -> `/sets/hospital-suite`
  - Ad set 3: Police Precinct -> `/sets/police-precinct`
  - Ad set 4: Interrogation -> `/sets/interrogation`
  - Ad set 5: LED Volume Wall -> `/sets/led-volume-wall`
  - Ad set 6: Cyc Wall -> `/sets/cyc-wall`
  - Ad set 7: Full Buyout -> `/sets/full-buyout`
- 3–5 creatives per ad set (still + 1 motion + carousel from the set's photo folder)
- **Message match enforced**: the ad photo IS the landing page hero photo. No bait-and-switch.

### Audience targeting (start broad, narrow with data)

Atlanta-area lookalikes off:
- IMDb-Pro signals if accessible (production industry interest)
- Job-title interests: line producer, location manager, producer, DP, director, music video director, photographer, brand marketer
- Industry interests: film production, photography, video production, advertising
- Behaviors: "Engaged with creative ad content recently"

Geo: Atlanta DMA + a 50-mi outer ring (productions sometimes scout from outside)
Age: 25–55
Languages: English

### Conversion events (Meta pixel + CAPI)

Set up these custom events on the site:
- `Lead` — fires on /thank-you (form submit)
- `ClickToPeerspace` — fires when user clicks any Peerspace CTA
- `ClickToGiggster` — fires when user clicks any Giggster CTA
- `ClickToCall` — fires on phone-link click

**Optimize Meta campaigns on `Lead`** (direct quote requests) — it is on-domain and trackable. Secondary KPIs are the platform clicks.

### Quick-win creative angles (per ad set)

- **Courtroom:** "Sync-sound courtroom — Atlanta — $200/hr" (the photo with judge bench + green banker's lamp)
- **Hospital:** "Production-grade hospital set — half the price of comparable Atlanta hospitals" (bed + monitor wide)
- **Police Precinct:** "Detective bullpen + interrogation, one booking, no per-set surcharge" (bullpen wide with case board)
- **LED Wall:** "Modular LED volume wall — Atlanta — from $200/hr" (car driving plate shot)
- **Full Buyout:** "6 sets, 1 studio, 1 flat rate" (montage)
- **Interrogation solo:** "Atlanta's cheapest sync-sound interrogation room" ($150/hr two-way mirror shot)
- **Cyc Wall:** "Sync-sound cyc — $125/hr" (clean sweep photo)

---

## Platform: stay on Squarespace for v1

| Factor | Squarespace (current) | Webflow | Shopify |
|---|---|---|---|
| Time to launch | 1–2 days | 1–2 weeks | 1 week |
| Form handling | Native (good enough) | Native | Native |
| Meta pixel | Native | Native | Native |
| Custom code injection | Yes (Code Injection) | Yes | Yes |
| Multi-page templating | Built-in | Better | Adequate |
| Domain/email already set up | Yes | Re-do | Re-do |
| Cost | ~$23/mo | ~$23/mo | ~$39/mo |

**Recommendation: Squarespace v1.** Already live, domain configured, branding loaded. The site needs content + structure, not a platform migration. Migrate later if sustained ad spend ($10k+/mo) reveals conversion-rate limits of the platform.

### Squarespace v1 build sequence

**Day 1:** 
- Strip placeholder. Build home page with hero + sets grid + trust + footer
- Set up the contact form, route to email `atlfilmstudios@swirlfilms.com` + `tyrell@swirlfilms.com`
- Add Meta pixel via Code Injection

**Day 2:**
- Build the 7 `/sets/[name]` pages (Squarespace lets you duplicate a template)
- Drop photos from `/Users/spencerlampkin/Claude/Swirl Films/set-rentals/_published/[NN]_*/`
- Paste descriptions from `listings.md`

**Day 3:**
- Build /about, /amenities, /location, /contact, /faq, /thank-you
- Internal-link everything
- Mobile QA pass

**Day 4–5:**
- Set up Meta conversion events (Lead, ClickToPeerspace, ClickToGiggster)
- Verify pixel firing on each event
- Connect Business Manager `1335264358528617` to the site
- Soft-launch ad spend ($25–50/day) to validate funnel mechanics

---

## What I need from you before build

1. **Decision: hybrid funnel or platform-only funnel?** (My strong rec: hybrid)
2. **Quote inquiry routing:** form-submit emails go to which address(es)? `atlfilmstudios@swirlfilms.com` + `tyrell@swirlfilms.com`?
3. **Swirl Films credits to feature publicly:** which shows/networks are clearable to put on the homepage trust strip? (TUBI / BET+ are confirmed from earlier conversations — anything else?)
4. **Team bios for /about:** can Tyrell + Eric provide a 100-word bio + headshot each?
5. **Studio manager response-time promise:** comfortable with "within 2 hours during business hours"?
6. **Sales tax:** is GA real-property rental taxable on this? CPA check before listing prices publicly with implied tax handling.
7. **Sustained reshoot day:** Jay's missing-shot list (in `listings.md`) — when can we get the facility shots (HMW, holding, kitchen, exterior, floor plan, etc.)?

---

## Phase 2 / Phase 3 ideas (not for v1)

- **Virtual tour / 3D walk-through** (Matterport) — increases booking conversion materially per studio-rental research
- **Calendar availability widget** (Calendly or Squarespace Scheduling) — lets users see open dates without inquiry
- **Press / Credits page** with embedded show clips
- **Production case studies** ("We shot Episode 4 of [Show] on this stage — here's the gear list and call sheet")
- **Repeat-client portal** — saved info, faster re-booking
- **Off-platform direct-booking flow** — Calendly + Stripe deposit + e-signed rental agreement (full vertical integration, no platform fees ever)
- **Equipment + crew add-on cart** — let productions add lighting kits, PAs, etc. inline
- **Blog / SEO content** — "How to shoot a courtroom scene in Atlanta," "Choosing between MOS and sync-sound stages," etc.

---

## Sources (research, June 1 2026)

- [atlfilmstudios.com (live placeholder)](https://atlfilmstudios.com/)
- [Studio Space Atlanta — site architecture](https://studiospaceatl.com/) — closest comp, direct-book model, no Peerspace/Giggster links on owned site
- [Studio Space Atlanta — Courtroom page (3-tier pricing reference)](https://studiospaceatl.com/courtroom-studio-standing-set-atlanta/) — MOS $139, sync-sound $220, buyout $24,575/wk
- [24 ATL Studios — LED volume wall comp](https://www.24atlstudios.com/) — direct-inquiry model, no platform links
- [Peerspace pricing guidance](https://support.peerspace.com/en/articles/10119425-how-should-i-price-my-space) — host fee 20%
- [Giggster commission](https://help.giggster.com/en/articles/2832062-how-much-commission-does-giggster-take) — host fee 19%
