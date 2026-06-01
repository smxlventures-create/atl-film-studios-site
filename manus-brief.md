# Manus Build Brief — atlfilmstudios.com

**Target:** Build and deploy the public marketing/booking funnel for ATL Film Studios, replacing the current Squarespace site. Domain `atlfilmstudios.com` will be re-pointed to whatever you deploy.

**Why Manus, not Squarespace:** the existing Squarespace site is on the 7.0 / Mojave (Brine family) template. Brine's Style Editor fights custom CSS on cascade conflicts, the CodeMirror code-injection editor rejects programmatic paste, URL nesting isn't supported, and Index Pages can't be duplicated. We've abandoned Squarespace mid-build and are handing the whole project to you.

This brief is **self-contained**. Every file, asset, and content scaffold you need lives at `/Users/spencerlampkin/Claude/Swirl Films/set-rentals/`. Treat that directory as the project root.

---

## 1. What you're building

**A 13-page paid-ads-driven booking funnel for a film studio rental business in Atlanta.** Ad spend on Meta lands users on a set-specific landing page → they either fill out a quote form (direct, no platform fee) or click out to Peerspace/Giggster (instant book with a 19-20% platform tax).

**The brand:** ATL Film Studios — operated by Swirl Films (an active film and TV production company with TUBI and BET+ originals). Studio is 7,500 sqft in Whittier Mill Village, Atlanta, with 8 standing sets + 2 LED volume walls.

**The aesthetic:** A24 / Focus Features editorial — restrained, cinematic, generous whitespace, monumental imagery, near-black ground with cyan/teal accent, serif headlines (Tiempos Headline preferred, system serif fallback), sans body (Inter). Refer to `set-rentals/site/css/style.css` for the design system that's already built. **No animations beyond subtle hover/scale on images. No carousels.** Per WCAG 2.2 AA, body text needs 4.5:1 contrast and there's a `prefers-reduced-motion` wrapper requirement.

---

## 2. Pages to build (13 total)

| Slug | Page Type | Purpose | Source |
|---|---|---|---|
| `/` | Home (long-scroll) | Hero + sets grid + trust + pricing + atmosphere + location + quote | `squarespace-home-utility-pages.md` § Home |
| `/courtroom` | Set landing page | Pre-dressed courtroom | `squarespace-page-blocks.md` Page 1 |
| `/hospital` | Set landing page | Patient room + corridor | `squarespace-page-blocks.md` Page 2 |
| `/police-bullpen` | Set landing page | Detective squad room + case board | `squarespace-page-blocks.md` Page 3 |
| `/interrogation` | Set landing page | Two-way mirror room | `squarespace-page-blocks.md` Page 4 |
| `/psych-wall` | Set landing page | Psych ward / padded wall — ⚠️ Tyrell-verify | `squarespace-page-blocks.md` Page 5 |
| `/jail-cell` | Set landing page (draft) | Photos pending | `squarespace-page-blocks.md` Page 6 |
| `/prison-cell` | Set landing page (draft) | Photos pending | `squarespace-page-blocks.md` Page 7 |
| `/led-walls` | Set landing page | 2× 12'×16' Watchout + Unreal | `squarespace-page-blocks.md` Page 8 |
| `/about` | Layout page | Swirl Films story + team | `squarespace-home-utility-pages.md` § About |
| `/faq` | Layout page (accordion) | Pricing, hours, cancellation, etc. | `squarespace-home-utility-pages.md` § FAQ |
| `/contact` | Layout page | Phone + form | `squarespace-home-utility-pages.md` § Contact |
| `/thank-you` | Layout page | Form-submit confirmation, `noindex` | `squarespace-home-utility-pages.md` § Thank-You |

**URL structure:** flat slugs only. Do NOT nest under `/sets/`.

---

## 3. Content — paste-ready sources

Every page's headlines, body copy, amenities lists, pricing block, form fields, alt text, and SEO metadata are written verbatim in these two files. Use them as the canonical source — do not re-write copy from scratch.

- **`squarespace-page-blocks.md`** (31KB) — all 8 set landing pages, paste-ready
- **`squarespace-home-utility-pages.md`** (17KB) — home + about + faq + contact + thank-you, paste-ready
- **`peerspace-source-of-truth.md`** — canonical pricing, set list, cancellation policy
- **`peerspace-giggster-live-extract.md`** — fresh verbatim descriptions from both live platform listings
- **`squarespace-best-practices-2026.md`** — 2026 conversion + SEO playbook (most still applies on any platform)
- **`squarespace-architecture-playbook.md`** — Brine-specific quirks (ignore the Squarespace mechanics, use the form/Pixel/Schema sections)
- **`squarespace-image-playbook.md`** — image sizing, alt-text patterns

**Canonical pricing for every page:**
- $150 / hour
- 3-hour minimum
- 10% off on 8+ hour bookings
- 24/7 access included (no after-hours fee)
- Very Flexible cancellation (full refund up to 24 hours after booking confirmation)
- One rate covers all 8 sets and both LED walls

---

## 4. Images — already prepped

`set-rentals/_upload-ready/` contains **21 SEO-renamed JPGs** (~6.8MB total) at the right dimensions:
- 6 heroes at 2500px wide (q80, except the LED wall driving plate which is q65 due to detail density)
- 15 supporting images at 1500px wide
- All filenames are lowercase-hyphenated `atl-film-studios-*` per Squarespace SEO best practices (which still apply on any platform)

**Per-page image mapping** is documented in `set-rentals/_upload-ready/_README.md` — which image is each page's hero, gallery contents, etc.

**Alt-text presets** are also in that README — write-once-paste-everywhere.

**Logo:** `set-rentals/site/logo/atl-film-studios-logo-2025.png` (1024×1024 PNG with transparency). Same logo used on the current Squarespace placeholder.

**Photos still missing:**
- Jail Cell — pages are scaffolded with placeholder language
- Prison Cell — same
- Tyrell will need to deliver these before those two pages go fully public. Keep them as drafts or password-gated.

---

## 5. Tracking + Schema (critical for paid ads)

### Meta Pixel
- **Pixel ID:** `1373400664837883`
- **Business Manager ID:** `1335264358528617`
- **What to install:** combined Pixel base + `PageView` + custom outbound event listeners — see `squarespace-header-injection-FINAL.html` for the exact block (copy-paste into `<head>` of every page).
- **Custom events:**
  - `Lead` — fires on `/thank-you` (after form submit)
  - `ClickToPeerspace` — fires on any click of an `a[href*="peerspace.com"]` link
  - `ClickToGiggster` — fires on any click of an `a[href*="giggster.com"]`
  - `ClickToCall` — fires on any click of `a[href^="tel:"]`
- **CAPI:** native Meta Conversions API would be a nice-to-have. If you can implement it natively in your stack (Next.js API route, Cloudflare Worker, etc.), do so. Otherwise, plain Pixel is acceptable for v1.

### JSON-LD Schema
The combined Header injection file (`squarespace-header-injection-FINAL.html`) also contains a complete **LocalBusiness JSON-LD schema** with all 8 sets as priced Offers, geo coords, 24/7 hours, parentOrganization (Swirl Films), sameAs links to Peerspace + Giggster + IG + FB. Inject it site-wide in the `<head>`.

---

## 6. Form integration

Quote-request form lives on the home page (`#quote` anchor) and on every set landing page (with a per-page hidden field `Set Interest` pre-filled).

**Required fields:**
- Name (text, required)
- Email (email, required)
- Phone (phone, required)
- Production name (text, optional)
- Shoot date(s) (date, required)
- Estimated hours (dropdown: 3 / 4 / 5 / 6 / 7 / 8+ — 10% off, required)
- Crew size (dropdown: 1-10 / 11-25 / 26-50 / 51-100, required)
- Tell us about the shoot (paragraph, optional)
- Set Interest (hidden, pre-filled per page)

**On submit:**
1. Send a notification email to BOTH:
   - `atlfilmstudios@swirlfilms.com`
   - `tyrell@swirlfilms.com`
2. Redirect the user to `/thank-you`
3. Fire Meta Pixel `Lead` event on `/thank-you` page load
4. (Optional v1.1) log to a Google Sheet via Sheets API or Zapier

**Email subject template:** `Quote request — [Set Interest] — [Name] — [Shoot date]`

**Recommended implementation paths:**
- Formspree (easiest, free tier 50/mo, $10/mo for 1000) — works on any static host
- Netlify Forms (if deploying to Netlify, free tier 100/mo)
- Cloudflare Pages Functions + Resend ($1/1k emails) — most flexible
- Pick what fits your default deployment stack

**Spam protection:** native reCAPTCHA or honeypot field. Don't ship without it.

---

## 7. Suggested tech stack

You can pick the stack. My read:

- **Next.js 14+ deployed to Vercel or Cloudflare Pages** — best DX, native form API routes, easy Pixel + CAPI integration, image optimization built-in
- **Astro + Netlify** — fast, simpler, less JS overhead
- **Plain static HTML/CSS/JS** (what's already in `set-rentals/site/`) — fully built, deploys to Cloudflare Pages or Netlify in 5 minutes. Form handler is the only missing piece.

**Recommended:** Next.js on Vercel if you want to keep iterating, or just deploy the existing static site at `set-rentals/site/` to Cloudflare Pages / Netlify if speed matters. The static site is already 95% there — it just needs:
- Content updated to match the Peerspace source of truth ($150/hr flat, not the old $125–$450 tiered pricing — see Task 43 below)
- Form action wired to a real endpoint
- Meta Pixel inserted into every page `<head>`
- JSON-LD schema inserted

---

## 8. Critical content correction needed

**The existing static site at `set-rentals/site/` has STALE pricing.** It was built BEFORE we reconciled with the live Peerspace listing. The corrected content is in the two scaffolds:
- `squarespace-page-blocks.md` (8 set pages)
- `squarespace-home-utility-pages.md` (home + 4 utility pages)

**Specific corrections needed in the existing static site files:**

| Static site file says | Correct (per Peerspace) |
|---|---|
| 7 listings with tiered pricing ($125–$450/hr) | **One rate, $150/hr, all sets** |
| Cyc Wall set | **Psych Wall set** (the "PSYCHE-WALL" Drive folder was the psych ward, not a cyc) |
| Full Studio Buyout listing | **Drop entirely** — Peerspace has one umbrella listing |
| 2hr / 3hr / 5hr varied minimums | **3-hour minimum, every set** |
| "Moderate" / "Strict" cancellation | **"Very Flexible"** (full refund 24h after booking confirmation) |
| 6 dressed sets | **8 sets** — add Jail Cell + Prison Cell (photos pending) |
| "Operated by Swirl Films · TUBI · BET+" trust strip | Keep — this is correct |

**Easiest path forward:** treat the existing static site at `set-rentals/site/` as the visual scaffold (design system, CSS, HTML structure, photos already in place). Then update each page's content blocks to match `squarespace-page-blocks.md` and `squarespace-home-utility-pages.md`. Rename `cyc-wall.html` to `psych-wall.html`. Add `jail-cell.html` and `prison-cell.html`. Drop `full-buyout.html`. Drop `led-volume-wall.html` and rename it `led-walls.html` (per the canonical set list).

---

## 9. Deployment + DNS

### Target

Pick one of: **Cloudflare Pages**, **Netlify**, or **Vercel**. All three are appropriate. Cloudflare Pages has the best free tier for our traffic volume and best DNS integration if the domain ends up there too.

### Domain re-point

`atlfilmstudios.com` is currently pointed at Squarespace. After you deploy:

1. Confirm where the domain is registered (Squarespace Domains, Namecheap, GoDaddy, or other) — I haven't verified this yet. Tyrell or Eric likely have the registrar credentials.
2. Update DNS records:
   - Remove existing Squarespace A/CNAME records
   - Add A or CNAME records pointing to your deployment target
3. Wait ~15 min – 1 hour for propagation
4. Verify HTTPS auto-issues (Let's Encrypt via your host)

### Squarespace cleanup post-cutover

Once the new site is live and verified:
- Cancel the Squarespace Business plan (current renewal: Jul 26, 2026 — $276/yr saved)
- OR downgrade to the cheapest plan if you want to keep email forwarding / the editor as a fallback

---

## 10. Brand specs (for any UI you generate)

```
Colors:
  --paper:        #f6f4f1   (near-white)
  --ink:          #1a1a1a   (dark text on light)
  --black:        #0d0d0d   (page background — dark sections)
  --accent:       #4dd6c1   (cyan/teal — harmonizes with logo)
  --accent-deep:  #2bb59f   (button hover)
  --muted:        rgba(255,255,255,0.6)    (muted text on dark)
  --muted-dark:   rgba(0,0,0,0.55)         (muted text on light)
  --rule:         rgba(255,255,255,0.12)   (dividers on dark)

Type:
  Display: Tiempos Headline (preferred) — fallback to serif system
  Body: Inter — 400/500/600
  Mono caps (eyebrow labels): JetBrains Mono — 11px, 0.22em letter-spacing, uppercase, #4dd6c1

Components:
  Buttons: 2px radius, uppercase, 0.06em letter-spacing, 13px, 16px padding
  Primary button: accent background, ink text
  Ghost button: transparent + paper white border + paper text
  Eyebrow label: mono caps, accent color, sits above headlines

Spacing:
  Section padding: clamp(80px, 11vw, 160px)
  Container max-width: 1280px
  Gutter: clamp(20px, 4vw, 56px)
  Headline letter-spacing: -0.025em
  Headline line-height: 1.04
```

Full CSS implementation is in `set-rentals/site/css/style.css` (~24KB, paste-ready).

---

## 11. What "done" looks like

1. Site deployed at a Manus-controlled URL, accessible via HTTPS
2. `atlfilmstudios.com` DNS re-pointed to the new deployment
3. All 13 pages live and rendering correctly on desktop + mobile
4. Quote form posts → dual email delivery → redirect to `/thank-you`
5. `/thank-you` fires Meta Pixel `Lead` event
6. Outbound clicks to Peerspace, Giggster, and `tel:` links fire custom Pixel events
7. JSON-LD schema validates in Google Rich Results Test
8. Lighthouse score 90+ on Performance, 95+ on Accessibility, 95+ on SEO
9. `/thank-you` is `noindex`; everything else is indexed

---

## 12. Files at the project root you should read

```
set-rentals/
├── EXECUTE-NOW.md                              ← Squarespace-flavored runbook (ignore the Squarespace specifics, the content + Pixel + Schema is correct)
├── manus-brief.md                              ← THIS FILE
├── squarespace-page-blocks.md                  ← 8 set pages, paste-ready content (USE THIS)
├── squarespace-home-utility-pages.md           ← home + 4 utility pages, paste-ready content (USE THIS)
├── squarespace-header-injection-FINAL.html     ← Pixel + custom events + JSON-LD (paste into <head>)
├── squarespace-custom-css.css                  ← design system as standalone CSS (use as reference)
├── squarespace-thankyou-page-injection.html    ← Lead event for /thank-you
├── peerspace-source-of-truth.md                ← canonical pricing + set list
├── peerspace-giggster-live-extract.md          ← fresh verbatim platform descriptions
├── squarespace-best-practices-2026.md          ← 2026 conversion + SEO (most still applies)
├── squarespace-architecture-playbook.md        ← Brine-specific (skim, ignore Squarespace mechanics)
├── squarespace-image-playbook.md               ← image sizing + alt-text patterns
├── _upload-ready/                              ← 21 SEO-renamed JPGs ready for upload
│   └── _README.md                              ← per-page image mapping + alt-text presets
├── site/                                       ← existing static HTML/CSS/JS shell — USE AS BASE
│   ├── index.html, about.html, contact.html, faq.html, location.html, thank-you.html
│   ├── sets/*.html (7 set pages — needs content updates per §8 above)
│   ├── css/style.css                           ← design system (24KB)
│   ├── js/main.js                              ← mobile nav + lightbox + pixel events
│   ├── photos/ (already organized by set)
│   ├── logo/ (the 2025 logo PNG)
│   └── _preview/ (verification screenshots from the earlier static build)
└── backup-pre-rebuild/
    ├── Squarespace-Wordpress-Export-06-01-2026.xml   ← old Squarespace content backup
    └── html/                                          ← raw HTML of 8 live Squarespace pages
```

---

## 13. Open questions / things to confirm with Tyrell or Eric

1. **"Psych Wall" vs cyc** — the "PSYCHE-WALL" Drive folder is most likely the psych ward set, but content currently in the static site at `set-rentals/site/sets/cyc-wall.html` calls it a cyc. Confirm before launch.
2. **Jail Cell + Prison Cell photos** — keep those pages drafted until photos arrive from Shannon's Drive folder or a new shoot.
3. **Form endpoint preference** — Formspree, Netlify Forms, Cloudflare Pages Functions + Resend? Default to Cloudflare Pages Functions + Resend if no preference (cheapest at scale, most flexible).
4. **Acuity scheduling for direct booking** — defer to phase 2. v1 just needs the quote form + outbound Peerspace/Giggster links.

---

## 14. Acceptance criteria (final QA before re-pointing the domain)

- [ ] Site deployed and accessible at Manus-controlled preview URL
- [ ] All 13 pages render correctly on Chrome (desktop + iOS Safari)
- [ ] Quote form submitted → email arrives at BOTH atlfilmstudios@swirlfilms.com and tyrell@swirlfilms.com within 2 min
- [ ] Submit redirects to /thank-you
- [ ] Meta Pixel Helper shows `1373400664837883` active + `PageView` + `Lead` events
- [ ] `ClickToPeerspace`, `ClickToGiggster`, `ClickToCall` custom events fire on the right interactions
- [ ] JSON-LD schema passes Google Rich Results Test
- [ ] Lighthouse: Performance 90+, Accessibility 95+, SEO 95+, Best Practices 95+
- [ ] All images load with `srcset` for responsive sizes
- [ ] Mobile nav works
- [ ] `/thank-you` set to `noindex`
- [ ] Logo loads at top-left on all pages, links to home
- [ ] Sticky-position pricing aside renders correctly on set pages

Once those all pass, swap the DNS.

---

**End of brief.** Reach out for clarification if anything's ambiguous. Don't re-derive content — use the verbatim text from `squarespace-page-blocks.md` and `squarespace-home-utility-pages.md`.
