# ATL Film Studios — Squarespace Technical Brief

**Date:** June 1, 2026
**Subject site:** atlfilmstudios.com
**Squarespace tenant:** `bronze-flamingo-lspg`
**Critical finding:** Site is **Squarespace 7.0 / Mojave template (Brine family)** — NOT 7.1 as the earlier scaffold assumed. This changes the entire rebuild approach.

---

## TL;DR

1. **Stay on 7.0 / Mojave.** Do NOT upgrade to 7.1. The upgrade is irreversible, and 7.0 + Brine is **more capable** for a custom-coded cinematic film studio site than 7.1 + Fluid Engine. The template family was literally designed for this aesthetic.
2. **Use Mojave's native Index Pages** for the home (vertical-stacked full-bleed sections) and **Banner Pages** for each set. The template already supports the multi-set landing-page funnel architecture — we don't need to fight it.
3. **Custom CSS + Code Injection are available** on the site's current plan tier (Code Injection requires Core+, and the live site has it — we confirmed CSS site.css is loading custom rules already). 128K char CSS limit.
4. **Fonts already loaded:** Proxima Nova (body) + Futura PT (headings) via Typekit. These are already in the cinematic editorial zone — we don't need custom font upload.
5. **The earlier `/site/` static build I made is now a useful design reference**, but it should not replace the Squarespace site — it should inform the Squarespace build via Custom CSS + Code Injection patterns.
6. **Form handling is native to Squarespace** (Form Block) on Core+ — email routing to multiple recipients works out of the box.
7. **Meta Pixel is native** via Marketing → Meta Pixel & Ads. Auto-fires `Lead` for form submits. CAPI is **not** built-in; we add it later via Stape or PixelFlow if pixel signal degrades.

---

## What we confirmed about the live site (forensic readout)

Pulled via Playwright + `document.evaluate()` on the live atlfilmstudios.com:

| Marker | Finding |
|---|---|
| Site version | **Squarespace 7.0** (zero Fluid Engine markers; 4× `.layout-engine` divs = Classic Editor) |
| Template family | **Brine family** (most evidence points to **Mojave** — page slug `/about-us-mojave` is a giveaway) |
| Active body class signals | `tweak-overlay-parallax-enabled`, `tweak-index-gallery-layout-split`, `gallery-design-slideshow`, `tweak-index-page-fullscreen-pages-with-backgrounds-only`, `button-style-outline button-corner-style-rounded`, `parallax-item-positioning-method-fixed` |
| Active fonts (Typekit) | **Proxima Nova** body, **Futura PT** headings |
| Code Injection in head | None detected — no Meta Pixel, no GA4, no GTM. **Clean slate for us.** |
| Page collection ID | `681e4010951ede55bb9c0bbb` |
| Nav items | "About Us" → `/`, "HIT US UP" → `/contact-us`, "Stage gallery" → `/stagegallery` |
| Anchor sections on home | `#our-mission-and-goals` |
| Total head HTML | 47,712 chars (typical for a 7.0 site with custom code) |
| Total body HTML | 36,455 chars (small — placeholder content) |
| Logo image | Hosted on Squarespace CDN: `static1.squarespace.com/static/5d39f5199cfa520001e6944e/t/68c445a4b091fa105822cf26/...ATL+FILM+STUDIOS+LOGO_NEW+2025.png` |
| Site tenant | `5d39f5199cfa520001e6944e` (Squarespace internal site ID, useful for direct CSS URL targeting) |

**Implication:** the existing site is a vanilla Mojave install with a placeholder home page, three minimal pages, and the proper logo. No technical debt. We can build on top of this directly.

---

## Why 7.0 / Mojave is the RIGHT platform for this project (not a constraint to work around)

| Requirement | 7.0 / Mojave (Brine) | 7.1 / Fluid Engine | Winner |
|---|---|---|---|
| Multi-section landing pages | **Index Pages** — native vertical stacking of full-bleed sections, parallax | Manual section stacking, no parallax-on-section | 7.0 |
| Card / Collage / Overlap image block layouts | Available | **Removed in 7.1** | 7.0 |
| Custom code support | Developer Platform available, template `.less` overrides allowed | Limited to Custom CSS + Code Injection | 7.0 |
| Mobile editing | Site-wide responsive, less granular | Separate mobile layout per section (more granular) | 7.1 |
| Cinematic full-bleed parallax | **Built-in to Brine** | Not native | 7.0 |
| Per-page CSS injection | Yes | Yes | tie |
| Squarespace upgrade reversibility | Stays 7.0 forever | Once upgraded, **CAN'T go back** to 7.0 | 7.0 (preserve optionality) |
| Editorial typography | Futura PT + Proxima Nova already loaded | Manual font load required | 7.0 |
| Gallery slideshow on home | **Native gallery section type** | Section + gallery block (less polished) | 7.0 |

**The verdict:** for an ad-driven, cinematic, multi-set production studio site, 7.0 / Mojave is the correct platform. Upgrading would lose Card/Collage image layouts, parallax index sections, and developer-platform escape hatches — and we'd be trading away features for a mobile-editor advantage we don't need.

---

## The architecture (how to actually build this in Mojave)

### Page types in Mojave / Brine

Brine supports five page types. Each is appropriate for different sections of our site:

| Mojave page type | What it is | Our use |
|---|---|---|
| **Index Page** | Vertical-stacking container that holds multiple sub-pages. Each sub-page becomes a full-width section in the index. Supports parallax, gallery slideshows, content blocks. | **Home page** — `/` is an Index with sub-pages: Hero / Sets / Why-Book / Pricing / Atmosphere / Location / Quote |
| **Banner Page** | Standard page with a banner area at top + layout-engine body below. Banner is where the full-bleed hero photo goes. | **Each /sets/[name] set landing page** — one banner page per set |
| **Layout Page** | No banner; pure layout-engine content. | About, FAQ, Contact, Thank You |
| **Gallery Page** | Dedicated gallery (slideshow, grid, stacked, slide). Lightbox built-in. | Optional `/gallery` if we want a deep photo archive — not critical for v1 |
| **Cover Page** | Single-screen full-bleed promo. | Not needed for v1 |

### Site map (revised, Mojave-native)

```
/                                  Index Page
├── (Hero — banner sub-page)        Full-bleed LED wall photo + headline + 2 CTAs
├── (Sets — gallery sub-page)       Mojave gallery slideshow with 8 set cards
├── (Why-Book — content sub-page)   3-up trust columns
├── (Pricing — content sub-page)    $150/hr published table
├── (Atmosphere — gallery sub-page) Working-studio crew photos
├── (Location — content sub-page)   Map + address + amenity list
└── (Quote — content sub-page)      Embedded form + Tyrell contact

/sets/                              (folder in Pages panel — not a Page)
├── /sets/courtroom                 Banner Page
├── /sets/hospital                  Banner Page
├── /sets/police-bullpen            Banner Page
├── /sets/interrogation             Banner Page
├── /sets/psych-wall                Banner Page
├── /sets/jail-cell                 Banner Page (photos pending)
├── /sets/prison-cell               Banner Page (photos pending)
└── /sets/led-walls                 Banner Page

/about                              Layout Page
/location                           Layout Page (mostly redundant with home /location section — only build if Location-only ad funnel deserves it)
/contact-us                         Layout Page (replace existing)
/faq                                Layout Page
/thank-you                          Layout Page (set Search Visibility: Hide)

/archived (Not Linked section)      Old home, old /contact-us, old /stagegallery
```

8 set landing pages + home index + 4 utility pages = **13 pages total**, same as the static build, but structured to match Mojave's native architecture.

---

## Custom CSS plan

Custom CSS is at **Design → Custom CSS** in the editor. 128K char limit. We have plenty of room.

### CSS to add (purpose-grouped)

**Brand variables (declare once at top of Custom CSS):**
```css
:root {
  --paper:        #f6f4f1;
  --ink:          #1a1a1a;
  --black:        #0d0d0d;
  --accent:       #4dd6c1;
  --accent-deep:  #2bb59f;
  --muted:        rgba(255, 255, 255, 0.6);
  --muted-dark:   rgba(0, 0, 0, 0.55);
  --rule:         rgba(255, 255, 255, 0.12);
}
```

**Typography refinements (Mojave loads Futura PT + Proxima Nova — we just sharpen them):**
```css
h1, h2, h3 {
  letter-spacing: -0.025em;
  line-height: 1.04;
}
h1 { font-size: clamp(44px, 7vw, 88px); }
h2 { font-size: clamp(32px, 4.5vw, 56px); }
h3 { font-size: clamp(22px, 2.4vw, 32px); }

/* Tighten heading-paragraph spacing (per christyprice.com) */
h1, h2, h3, h4 { margin-bottom: 0.6em; }
```

**Eyebrow label (the small caps label above headlines):**
```css
.eyebrow,
.banner-text-content p:first-child strong {
  font-family: 'futura-pt', sans-serif;
  font-weight: 500;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  display: inline-block;
  margin-bottom: 1.5em;
}
```

**Banner / hero override (make Mojave's banner photo MORE cinematic):**
```css
.page-banner-wrapper .page-banner-content {
  padding-bottom: clamp(60px, 8vw, 100px) !important;
}
.page-banner-wrapper::before {
  content: "";
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.75) 100%);
  pointer-events: none;
}
.page-banner-wrapper h1 {
  max-width: 18ch;
  color: var(--paper);
}
```

**Button restyle (Mojave uses outline-rounded; we override to a flat, square accent button):**
```css
.sqs-block-button-element--medium,
.sqs-block-button-element--large,
.sqs-button-element--primary {
  border-radius: 2px !important;
  font-family: 'futura-pt', sans-serif !important;
  font-weight: 500 !important;
  letter-spacing: 0.06em !important;
  text-transform: uppercase !important;
  font-size: 13px !important;
  padding: 16px 28px !important;
  background: var(--accent) !important;
  color: var(--black) !important;
  border: 1px solid var(--accent) !important;
  transition: transform 0.15s, opacity 0.15s !important;
}
.sqs-block-button-element--medium:hover {
  background: var(--accent-deep) !important;
  transform: translateY(-1px);
}
/* Ghost button variant (for secondary CTAs) */
.btn-ghost .sqs-block-button-element--medium {
  background: transparent !important;
  color: var(--paper) !important;
  border: 1px solid rgba(246,244,241,0.35) !important;
}
```

**Index page section spacing + dark theme:**
```css
.Index-page-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 clamp(20px, 4vw, 56px);
}
/* Apply dark theme to specific index sub-pages by their data-collection-id */
#collection-PLACEHOLDER-HERO-ID,
#collection-PLACEHOLDER-WHYBOOK-ID,
#collection-PLACEHOLDER-LOCATION-ID,
#collection-PLACEHOLDER-QUOTE-ID {
  background: var(--black);
  color: var(--paper);
}
```

> Note: each Index sub-page gets a unique collection ID once created. After building the sections in the editor, we use the live site's inspector to read the IDs and update the CSS to scope dark/light per section.

**Gallery hover (lifted + crisp):**
```css
.sqs-gallery-design-grid-slide img,
.image-block-outer-wrapper img {
  transition: transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1), opacity 0.4s;
}
.sqs-gallery-design-grid-slide:hover img {
  transform: scale(1.03);
  opacity: 0.9;
}
```

**Header overrides (transparent over hero, solid on scroll):**
```css
.Header {
  background: transparent !important;
  transition: background 0.3s;
}
.Header[data-test="header"][class*="scrolled"],
body.tweak-fixed-header-active .Header--top--fixed {
  background: rgba(13, 13, 13, 0.92) !important;
  backdrop-filter: blur(14px);
}
```

**Footer (style the existing Squarespace footer to match the dark editorial):**
```css
.Footer {
  background: var(--black);
  color: var(--muted);
  padding-top: clamp(60px, 8vw, 100px);
}
.Footer a:hover { color: var(--paper); }
.Footer .sqs-svg-icon--social { fill: var(--paper); }
```

**Mobile refinements:**
```css
@media (max-width: 640px) {
  h1 { font-size: 38px !important; }
  h2 { font-size: 28px !important; }
  .page-banner-wrapper { min-height: 70vh; }
}
```

**Hide the Squarespace branding footer (only if site is Business plan or above):**
```css
/* Only works on Business+ plans */
.sqs-add-to-cart-overlay,
.squarespace-promotion { display: none !important; }
```

### What I'm NOT doing in Custom CSS

- Adding `@font-face` rules — Futura PT and Proxima Nova are already loaded by the template via Typekit. Adding more fonts hurts performance.
- Replacing the entire layout-engine grid — that's what we'd do if we were upgrading to Fluid Engine; we don't need to.
- Hiding the site footer entirely — preserve the "Powered by Swirl Films" line as in the placeholder.

---

## Code Injection plan

Two places to inject:
- **Settings → Advanced → Code Injection → Header** (site-wide)
- **Page Settings → Advanced → Page Header Code Injection** (single-page)

### Site-wide Header injection

```html
<!-- Preconnect for performance -->
<link rel="preconnect" href="https://www.facebook.com" crossorigin>

<!-- Meta Pixel base (Pixel ID goes here once we have it) -->
<script>
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
  n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
  document,'script','https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>

<!-- Custom Meta events: outbound clicks to platforms + phone -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href*="peerspace.com"]').forEach(function(a){
    a.addEventListener('click', function(){ window.fbq && fbq('trackCustom', 'ClickToPeerspace', {url: a.href}); });
  });
  document.querySelectorAll('a[href*="giggster.com"]').forEach(function(a){
    a.addEventListener('click', function(){ window.fbq && fbq('trackCustom', 'ClickToGiggster', {url: a.href}); });
  });
  document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
    a.addEventListener('click', function(){ window.fbq && fbq('trackCustom', 'ClickToCall'); });
  });
});
</script>
```

### Per-page injection — `/thank-you` page only

Page Settings → Advanced → Page Header Code Injection:
```html
<script>
  if (typeof fbq === 'function') { fbq('track', 'Lead'); }
</script>
```

**Important:** Squarespace's native Meta Pixel integration (Marketing → Meta Pixel & Ads) ALSO fires `Lead` automatically for newsletter sign-ups and form submits. If we enable the native integration AND inject our own Lead trigger, we'll double-fire. **Pick one:** use the native integration ONLY (simpler) OR use Code Injection ONLY (more control). My recommendation: **use native + add Code Injection only for the custom events** (ClickToPeerspace, ClickToGiggster, ClickToCall) since those aren't covered natively.

### What's possible vs not on Squarespace Code Injection

| Feature | Status |
|---|---|
| `<script>` tags in header | ✅ Yes |
| Meta Pixel | ✅ Yes |
| Google Analytics 4 / GTM | ✅ Yes (or use native Squarespace Analytics integration) |
| Inline `<style>` tags | ✅ Yes (but Custom CSS is the cleaner home for this) |
| Conversions API (server-side) | ❌ Not native to Squarespace. Use Stape or PixelFlow for CAPI |
| Service workers / PWA manifest | ❌ Not supported |
| Iframes from non-Squarespace sources | ✅ Allowed in Code Blocks (higher plan tiers) |
| External JS libraries (jQuery, GSAP, etc.) | ✅ Allowed via Code Injection |

---

## Forms — Squarespace Form Block

Form Blocks are available on all paid plans. Drop into the home Index's Quote sub-page and on the `/contact-us` page.

### Form configuration

**Field list:**
| Field | Type | Required |
|---|---|---|
| Name | Text | yes |
| Email | Email | yes |
| Phone | Text | no |
| Shoot date | Date | no |
| Set / interest | Dropdown (Courtroom, Hospital, Police Bull Pen, Interrogation, Psych Wall, Jail Cell, Prison Cell, LED Walls, Not sure yet) | no |
| Crew size | Number | no |
| Hours needed | Number | no |
| Notes | Paragraph | no |

**Storage:**
- Email Storage: `atlfilmstudios@swirlfilms.com` + `tyrell@swirlfilms.com` (both addresses)
- Google Drive / Mailchimp integrations: optional add-ons if we want submissions in a spreadsheet for tracking. Recommend Google Sheets for inquiry logging.

**Post-submit:**
- Action: **Redirect to URL** → `/thank-you`
- This triggers the `Lead` event via the per-page Code Injection on the thank-you page

**Button text:** "Send Quote Request"

**Squarespace Form Block plan tier limits:**
- Personal plan: forms work but only stores via Squarespace's built-in storage (no third-party integrations)
- Business+: full Mailchimp, ConvertKit, Google Drive integrations
- Either tier works for our use case

---

## Meta Pixel: native integration vs Code Injection

### Recommendation: hybrid

1. **Enable Squarespace's native Meta Pixel integration** at Marketing → Meta Pixel & Ads → paste Pixel ID. This handles `PageView` and `Lead` (form submits) automatically.
2. **Add Code Injection for our custom events only** (`ClickToPeerspace`, `ClickToGiggster`, `ClickToCall`). These aren't covered natively.

This avoids double-firing the Lead event while still capturing the outbound click data we need for ad optimization.

### Conversions API (CAPI)

Squarespace does **not** natively support CAPI. For 2026, Pixel + CAPI is the recommended setup per Meta's own guidance. If pixel signal degrades (iOS / privacy / Safari ITP restrictions), we add CAPI later via:
- **Stape** ($) — easiest, no-code
- **PixelFlow** ($) — Squarespace-specific
- **Self-hosted Cloudflare Worker** (free, more setup)

For v1, native Pixel + custom events is sufficient. Revisit if we see Match Quality drop below 7.0 in Meta Events Manager.

---

## Mobile considerations on Mojave

Mojave is responsive by default — the site uses one layout that adapts. We don't have Fluid Engine's separate mobile editing, but Mojave's responsive defaults are good for our use case.

**Mobile-specific overrides in Custom CSS:**
```css
@media (max-width: 640px) {
  /* Tighten hero on mobile */
  .page-banner-wrapper { min-height: 60vh; }
  .page-banner-wrapper h1 { font-size: 40px; line-height: 1.05; }

  /* Stack the Index page sub-page sections to single column */
  .Index-page .row { flex-direction: column; }

  /* Tighter mobile section padding */
  .Index-page-content { padding: 60px 20px; }

  /* Larger touch targets for buttons */
  .sqs-block-button-element--medium { padding: 18px 24px !important; }
}
```

**Mobile-specific banner image swap** (a Mojave-specific trick from SiteSmith Studio):
```css
/* Show different image on mobile if banner is too horizontally cropped */
@media (max-width: 640px) {
  .Mobile-bar { display: block; }
  .page-banner-image { background-image: url('MOBILE_OPTIMIZED_URL') !important; }
}
```

---

## The build sequence (revised for Mojave)

### Phase 1 — Site settings (30 min)

1. **Confirm logo** is the 2025 PNG (already uploaded to Squarespace CDN — verified)
2. **Design → Site Styles** — confirm Mojave's defaults; we'll override via Custom CSS rather than touching the Style Editor (so changes are portable and version-controlled in a doc)
3. **Settings → Advanced → Code Injection → Header** — paste the Meta Pixel block (Pixel ID placeholder for now)
4. **Marketing → Meta Pixel & Ads** — paste Pixel ID for native integration once we have it
5. **Settings → Form & Pop-up Storage** — confirm Form Block submissions route to both Tyrell + atlfilmstudios mailboxes

### Phase 2 — Custom CSS (15 min)

6. **Design → Custom CSS** — paste the CSS blocks above (brand vars, type refinements, eyebrow, banner override, buttons, gallery hover, header transparency, footer, mobile)
7. Confirm changes preview correctly

### Phase 3 — Archive existing content (10 min)

8. **Pages panel** — drag the existing `/about-us-mojave`, `/contact-us`, `/stagegallery` pages into the **Not Linked** section. They stay accessible via direct URL but disappear from public nav.

### Phase 4 — Build the home Index Page (~90 min)

9. **Create new Index Page** at `/` (set as homepage in Pages panel)
10. Add sub-pages in order:
    - **Hero** (banner sub-page) — full-bleed LED wall background, h1 + lead + 2 buttons
    - **Sets** (gallery sub-page) — Mojave Gallery Slideshow with 8 set thumbnails linking to `/sets/[name]`
    - **Why-Book** (content sub-page) — 3-column trust block
    - **Pricing** (content sub-page) — published rate + minimum + discount
    - **Atmosphere** (gallery sub-page or content) — 3-image strip with caption
    - **Location** (content sub-page) — Google Maps embed + address block
    - **Quote** (content sub-page) — embedded Form Block + Tyrell direct line
11. Apply colors per sub-page (dark for Hero / Why-Book / Location / Quote; light for Sets / Pricing / Atmosphere)
12. Upload photos from `set-rentals/_published/` to Squarespace's image manager (they go to the Squarespace CDN)

### Phase 5 — Build 8 set landing pages (~2 hours total — 15 min each)

13. **Create a Banner Page template first** with the right CSS hooks, then **duplicate it 7 times** in the Pages panel. Swap content per set.
14. For each `/sets/[name]` page:
    - Set banner image to the matching hero photo
    - Set h1 to the set name
    - Add content blocks: gallery + about + amenities + pricing aside + form
15. Set page slugs to: `courtroom`, `hospital`, `police-bullpen`, `interrogation`, `psych-wall`, `jail-cell`, `prison-cell`, `led-walls`

### Phase 6 — Utility pages (45 min)

16. Build `/about`, `/contact-us` (rebuild on top of the archived page slug to preserve URL), `/faq`, `/thank-you`
17. `/thank-you` → **Page Settings → Advanced → Hide from Search Engines** AND paste the Lead event injection in Page Header Code Injection
18. Update site navigation to: Sets · About · Location · FAQ · `[Request a Quote]` (button)

### Phase 7 — QA + go live (45 min)

19. Walk every page on desktop + mobile (Squarespace preview)
20. Submit a test form → verify both Tyrell and atlfilmstudios mailboxes receive it
21. Verify redirect to `/thank-you` happens
22. Use Meta Pixel Helper Chrome extension on each page → confirm PageView fires + Lead fires on `/thank-you`
23. Click every Peerspace + Giggster + tel: link → verify custom events fire (use Pixel Helper Diagnostics)
24. Confirm `atlfilmstudios.com` resolves to the new homepage

**Total estimated time:** ~5 hours of focused work in the Squarespace editor.

---

## What I'm NOT doing (and why)

- **Not upgrading to 7.1.** Irreversible, removes capabilities we want.
- **Not migrating to Netlify / static hosting.** User stated explicitly that Squarespace is the platform. The earlier Netlify recommendation in `migration-plan.md` is now superseded.
- **Not building custom JS frameworks.** Squarespace's form handling + Mojave's native scroll/gallery/parallax are sufficient. Less custom code = fewer breakage points when Squarespace pushes platform updates.
- **Not replacing Proxima Nova / Futura PT.** Already loaded via Typekit, already cinematic, no need to fight the platform's font stack.
- **Not building extensive single-page-app patterns.** Mojave's per-page navigation is the correct pattern for ad message-match — each ad lands on a distinct URL with its own pixel event.

---

## Open blockers (same as before)

1. **Meta Pixel ID** — from Business Manager `1335264358528617`
2. **Photos for Jail Cell + Prison Cell** — still need access to Shannon's "ATL FILM STUDIOS PICTURES" Drive folder
3. **Confirm Psych Wall identity** — is the "PSYCHE-WALL" Drive folder the psych ward set, or a separate cyc?
4. **Pricing alignment** — Peerspace $150 vs Giggster $180. Resolve before publishing $150 as the headline on the Squarespace site.

---

## Files updated this session

- **`set-rentals/squarespace-technical-brief.md`** (this doc) — supersedes `squarespace-scaffold.md` and `migration-plan.md` for the platform decision
- The earlier `squarespace-scaffold.md` content (page copy, set descriptions, form fields) is **still valid** — just paste it into Mojave's Index Page + Banner Pages rather than 7.1 / Fluid Engine sections
- The earlier `peerspace-source-of-truth.md` content (pricing, set list, cancellation policy) is **still valid** — it's the canonical content for the Squarespace pages

---

## Sources

- [Squarespace 7.0 vs 7.1, Fluid Engine vs Classic Editor — Big Cat Creative](https://www.bigcatcreative.com/blog/squarespace-7-1-vs-7-0)
- [Brine template family — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/212512738-Brine-template-family)
- [Using Meta Pixel with Squarespace](https://support.squarespace.com/hc/en-us/articles/115015760107-Using-Meta-Pixel-with-Squarespace) — native integration, plan requirements, auto-fired events
- [Meta Pixel 2026: Setup, CAPI, Audit Guide](https://affectgroup.com/blog/meta-pixel-in-2026-the-setup-and-audit-guide-for-smb-owners-and-in-house-marketers/) — 2026 Conversions API mandate
- [Fluid Engine vs Classic Editor — Hyperspace Ventures](https://www.hyperspaceventures.com/ideas/squarespace-fluid-engine-vs-classic-editor-the-best-of-both)
- [Mojave template features — Fix8 Media](https://www.fix8media.com/squarespace-mojave-template)
- [Salt Productions Squarespace case study — Studio 77 London](https://www.wearestudio77.com/blog/stanley-tucci-squarespace-website-design-for-salt-production) — parallel build pattern for a production company
- [Custom CSS for Mojave — Beaver Hero](https://beaverhero.com/mojave-template-squarespace/)
- [Custom CSS techniques — Christy Price](https://christyprice.com/blog/custom-css-squarespace-71)
- [Salt Productions case study — Studio 77](https://www.wearestudio77.com/blog/stanley-tucci-squarespace-website-design-for-salt-production)
