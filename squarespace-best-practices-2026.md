# Squarespace 7.0 / Brine / Mojave — 2026 Best Practices Brief

**Target:** atlfilmstudios.com — Atlanta film studio rental, 8 standing sets + LED volume wall, $150/hr direct, Peerspace + Giggster listings.
**Aesthetic:** A24 / Focus Features — editorial, cinematic, restrained.
**Date:** June 2026. Sources cited inline.

---

## TL;DR — Prioritized Recommendations

### Must-do (top 5)

1. **Single-CTA, form-first hero with 4-field quote form** — biggest lever.
2. **Per-set Layout Pages** with outbound Peerspace/Giggster CTAs above the fold.
3. **Custom LocalBusiness + Service JSON-LD schema** in Code Injection (Brine's default schema is incomplete).
4. **Hero image LCP fix** — no carousels, no fade-in on banner, eager-load, WebP, sized to viewport.
5. **Custom CSS pass for mobile + WCAG 2.2 AA contrast** on the dark editorial palette.

### Nice-to-have (next 5)

6. Acuity for a "Book Direct" path (deposit capture); keep Peerspace/Giggster as primary booking rails.
7. Sticky bottom-bar CTA on mobile via Brine Custom CSS.
8. Client-logo trust strip (Netflix, Tyler Perry, etc.) — modeled on Studio Space Atlanta / Atlanta Filmworks.
9. Service-area + per-set internal linking web (sets ↔ services ↔ location pages).
10. reCAPTCHA + honeypot form field; descriptive submit CTA ("Request Quote").

### Skip-able (last 5)

11. Block Animations / motion-heavy reveals — fights the editorial aesthetic and the `prefers-reduced-motion` requirement.
12. Sliders/carousels at top of page — kill LCP.
13. Heavy Summary Block usage for set thumbnails — Brine Summary Blocks don't pull from Portfolio Pages natively ([Squarestylist](https://www.squarestylist.com/squarespace/squarespace-portfolio-summary-blocks)).
14. Map Block for studio address — slow, fingerprintable; use static image + link out.
15. Migrating to 7.1 right now. 7.0 is no longer accepting new sites but still updated for existing ones; migration cost > benefit until you re-platform ([Big Cat Creative](https://www.bigcatcreative.com/blog/move-from-squarespace-71-70)).

---

## 1. Conversion patterns for high-intent service businesses (2026)

What's working for service businesses on Squarespace in 2026 converges on a few patterns:

- **Form-first hero.** Studio Mesa's 2026 contact-form playbook: four fields max — name, email, one contextual dropdown ("Which set?" or "Production type"), message. "Every field you add is a small tax on the person filling it out" ([Studio Mesa](https://studiomesa.co/articles/how-to-create-a-contact-form-that-actually-converts-on-squarespace)).
- **Specific CTA copy, never "Submit."** Use "Request Quote," "Check Availability," or "Book a Walkthrough."
- **Confirmation text that sets expectations:** "We respond within one business day" beats "Thanks for your submission."
- **Trust integration near CTA.** 2026 CRO trend reports both flag trust signals near CTAs as the largest conversion lever ([WebFX](https://www.webfx.com/blog/conversion-rate-optimization/cro-trends/)).
- **One primary CTA per page.** Scroll-tell is fine, but pick one action (Quote, Book Peerspace, Book Giggster) and weight the others as secondary.

**For Swirl set rentals:** hero = giant set still + headline + 4-field quote form + small "or book on Peerspace / Giggster" outbound link below. Don't make the user choose three platforms in the hero.

## 2. Mobile-first Brine patterns

Brine isn't 7.1 — there's no separate mobile editor. Everything is CSS + the Style Editor's mobile tweaks.

- **Set the mobile breakpoint manually.** Brine's default mobile breakpoint is 640px; bump it to 768px or 800px so iPad mini and small tablets get the mobile header ([Squarespace Help](https://support.squarespace.com/hc/en-us/articles/217444047-Advanced-mobile-styles-in-version-7-0)). Style Editor → search "Mobile."
- **Scale typography down at breakpoints.** Brine's H1/H2 routinely blow out on mobile. Use media queries from 640–768px to drop H1 from ~64px → ~36px ([Applet Studio](https://www.applet.studio/blog/squarespace-mobile)).
- **Force the hamburger earlier.** If your nav has 6+ items, force mobile nav at 1024px ([Minimist Web Design](https://www.minimist.ca/articles/force-mobile-navigation-on-squarespace-brine-templates)).
- **Stack grid galleries on mobile.** Brine's grid gallery breaks awkwardly on phones — Beaver Hero's "stack a grid gallery in mobile" snippet is the canonical fix ([Beaver Hero](https://beaverhero.com/brine-template-squarespace/)).
- **Hide-on-mobile pattern.** `@media (max-width: 640px) { .your-class { display: none; } }` — Brine has no native "hide on mobile" toggle.
- **Sticky bottom-bar CTA on mobile** (covered below) — high-intent conversion lift.

## 3. Block usage for set thumbnails

- **Gallery Block (Grid layout)** is your best native option for the 8-set landing strip. Drag-reorder, alt text on each, links to per-set Layout Pages. Limit: 250 images per gallery ([Squarespace Help](https://support.squarespace.com/hc/en-us/articles/206542467-Image-galleries-on-Squarespace)).
- **Summary Block:** do not use for sets in Brine. Summary Blocks pull from Blog/Products/Events — not Portfolio Pages natively. Custom-code workarounds exist but are brittle ([Squarestylist](https://www.squarestylist.com/squarespace/squarespace-portfolio-summary-blocks)).
- **Image Block stack** with alternating left/right layout is the A24/Focus pattern — big editorial spread for each set on the home page. Slower to build but matches the aesthetic.
- **Sticky header (Brine):** add via Custom CSS: `.Header { position: fixed !important; z-index: 1000; width: 100%; }` plus a padding-top on `.Content-outer` ([Schwartz-Edmisten](https://schwartz-edmisten.com/blog/squarespace-tutorial-fixed-header-in-brine-template)).
- **Map Block alternatives:** Static image of the location + "Open in Google Maps" link. Map Blocks pull a third-party iframe that tanks performance and adds CLS.

## 4. Scheduling integrations — what converts for a $150/hr rental

Direct-compare for 2026 ([Cal.com](https://cal.com/blog/calendly-vs-acuity-a-comparative-guide-to-scheduling-tools), [TrustRadius](https://www.trustradius.com/compare-products/calendly-vs-squarespace-acuity-scheduling)):

- **Calendly:** meeting-focused, simpler, $0–$16/mo. Best for "book a 20-min consult."
- **Acuity ($16/mo Squarespace-native):** service-business-focused. Takes deposits via Stripe/Square/PayPal, packages, gift certs, custom intake forms. Built for "pay $300 to hold the day."
- **Plain outbound link to Peerspace/Giggster:** zero friction, but you forfeit ~15% to the marketplace and lose the email.

**Recommended stack for Swirl:**

1. **Hero:** quote-request form (free, captures email, you write back).
2. **Below fold / per-set page:** dual CTAs — "Book on Peerspace" + "Book on Giggster" (outbound, instant booking for established renters).
3. **Phase 2:** add Acuity for "Book Direct — $150/hr, $300 deposit" to skip the marketplace fee on repeat clients.

Don't embed Calendly/Acuity in the hero — it pushes LCP and is overkill for top-of-funnel. Use it on the "Book Direct" sub-page.

## 5. Accessibility — WCAG 2.2 for the dark editorial aesthetic

The A24/Focus dark palette is the highest-risk area for contrast failures.

- **Contrast ratios (WCAG 2.2 AA, still the legal standard in 2026):** 4.5:1 for body text, 3:1 for large text (18pt+ or 14pt+ bold) and UI components ([StudioLimb](https://www.studiolimb.com/guides/wcag-color-contrast-guide.html)). Dark mode must independently pass — light-mode-passing colors often fail on dark.
- **Body copy:** avoid #999 on #000. Use #C8C8C8+ on dark backgrounds (passes 4.5:1 against #0A0A0A).
- **Focus states:** 7.0 Brine has weaker built-in focus outlines than 7.1. Add a global `:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }` in Custom CSS.
- **Motion:** wrap any block animations in `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }` ([Studio Mesa](https://studiomesa.co/articles/squarespace-animations-interactions-guide/)).
- **Alt text:** every set image — descriptive ("Courtroom set with judge's bench and jury box, wide angle, daylight") not "courtroom.jpg." Helps SEO too.
- **Skip-to-content:** Brine doesn't ship one. Add to Header Code Injection: `<a href="#content" class="skip-link">Skip to content</a>` + CSS to hide visually until focused.

## 6. Performance — Brine + Core Web Vitals (2026)

Squarespace as a platform sits at ~70% "good" CWV vs ~50% web-wide ([Squarespace Circle](https://pros.squarespace.com/blog/core-web-vitals)) — but Brine specifically lags 7.1.

- **LCP target <2.5s.** Hero banner is almost always the LCP element.
  - No carousel at the top — they load JS before the image.
  - No fade-in animation on the hero — it delays the paint.
  - Eager-load the hero (Squarespace lazy-loads everything else by default — that's fine, but the LCP image must NOT be lazy-loaded; [Unlighthouse](https://unlighthouse.dev/learn-lighthouse/lcp/lcp-lazy-loaded)).
  - Upload hero at actual display dimensions (don't upload 6000px wide for a 1440px viewport).
- **WebP is automatic** unless disabled in Image Settings ([Squarespace Help](https://support.squarespace.com/hc/en-us/articles/360022529371-Reducing-your-page-size-for-faster-loading)). Leave on.
- **CLS:** set explicit aspect ratios on Gallery Block items. Brine's gallery grid can shift on slow connections.
- **Cull custom fonts.** Each Adobe Fonts / Google Fonts weight is a render-blocking request. 2 weights max (regular + a display weight).
- **No third-party chat widgets** unless you're staffing them — they cost 200–600ms TTI.

## 7. SEO for hyper-local film-studio queries

Target queries like "courtroom set rental Atlanta," "police precinct film set Atlanta," "LED volume wall Atlanta."

- **Per-set Layout Pages with unique copy + schema.** "Google ranks pages, not websites" — a homepage that lists eight sets ranks for none of them ([SEOspace](https://www.seospace.co/blog/squarespace-site-structure-local-seo-service-business)).
- **Custom JSON-LD in Code Injection.** Brine's default LocalBusiness schema lacks `areaServed`, `geo`, `openingHoursSpecification`, and `sameAs` ([EduCBA](https://www.educba.com/local-business-schema-squarespace/), [Marta Lebre](https://martalebre.com/blog/squarespace-schema-markup)). Add three schemas:
  1. `LocalBusiness` (site-wide, in Settings → Advanced → Code Injection → Header)
  2. `Service` (per-set page, in Page Settings → Advanced)
  3. `FAQPage` (on a FAQs section — pricing, insurance, parking, hours)
- **URL slugs** as direct query strings: `/sets/courtroom`, `/sets/police-precinct`, `/sets/led-volume-wall`. Brine slugs are editable in Page Settings.
- **NAP consistency** with Google Business Profile, Peerspace listing, Giggster listing. Mismatched phone/address tanks local pack ranking.
- **Internal linking web:** home → sets index → individual set; individual set → "Other sets you might like" → 2-3 related sets; every page → footer NAP.
- **Title tag pattern:** `Courtroom Film Set Rental — Atlanta, GA | Swirl Studios` (modifier + service + location + brand). Meta description includes price hook: "Standing courtroom set with judge's bench, jury box, gallery seating. $150/hr. Book direct or via Peerspace."

## 8. Forms — maximum conversion config

Per Studio Mesa's 2026 form playbook ([link](https://studiomesa.co/articles/how-to-create-a-contact-form-that-actually-converts-on-squarespace)):

- **Fields (4):** Name, Email, "Which set / production type" (dropdown), "Tell us about your shoot" (textarea, optional).
- **Skip phone.** Adding a phone field drops conversion ~10–15% on quote forms. Ask for it in the reply email.
- **Button copy:** "Request Quote" not "Submit."
- **Confirmation text:** "Thanks — we'll get back within one business day. For anything urgent, text [number]."
- **Spam protection:**
  - Enable Squarespace's built-in reCAPTCHA in Form Block settings ([Squarespace Help](https://support.squarespace.com/hc/en-us/articles/115010449067-Preventing-form-and-newsletter-block-spam)).
  - Add a hidden honeypot field via Code Block + JS (catches bots that fill every field).
- **Conversion analytics:** Squarespace has built-in Form & Button conversion tracking — turn it on in Analytics → Conversions ([Squarespace Help](https://support.squarespace.com/hc/en-us/articles/115015424067-Form-button-conversion-analytics)).

## 9. Trust signals — what Atlanta studios do well

Surveyed Studio Space Atlanta, Atlanta Filmworks, Cinespace, FUGO ([Studio Space ATL](https://studiospaceatl.com/), [Atlanta Filmworks](https://atlantafilmworks.com/), [Cinespace](https://cinespace.com/cinespace-atlanta/)):

Pattern, ranked by appearance frequency:

1. **Client logo strip** — AMC, Netflix, Apple, Disney, CNN, Coca-Cola. Studio Space Atlanta lists 10+ recognizable brands above the fold.
2. **Longevity claim** — "trusted for 17 years" / "since 2013." Production buyers hire low-risk vendors.
3. **Square footage stat** — "24,000 sq ft" / "57,000 sq ft" — buyers comparison-shop on scale.
4. **Industry-brand partnerships** — Cinespace lists Arri, American Grip, ETC. Borrowed authority.
5. **Peerspace social proof** — "4.93 stars, 97% would book again" — pull this directly into the home page as a testimonial slab.
6. **Production-credit lists** — what shows/ads were shot here. Mention by title where contractually allowed.

**For Swirl:** put a `<div class="logo-strip">` below the hero with greyscale brand logos at ~40% opacity, hover to 100%. Pull the Peerspace star rating into a testimonial section. Add a "Productions shot here" list on the About page.

---

## Sources

- [Brine template family — Squarespace Help](https://support.squarespace.com/hc/en-us/articles/212512738-Brine-template-family)
- [Advanced mobile styles in 7.0 — Squarespace Help](https://support.squarespace.com/hc/en-us/articles/217444047-Advanced-mobile-styles-in-version-7-0)
- [Big Cat Creative — mobile navigation in Brine](https://www.bigcatcreative.com/blog/customize-mobile-navigation-squarespace)
- [Christy Price — Brine Custom CSS index](https://christyprice.com/blog/custom-css-brine-squarespace)
- [Beaver Hero — Brine Custom CSS snippets](https://beaverhero.com/brine-template-squarespace/)
- [Studio Mesa — contact form that converts](https://studiomesa.co/articles/how-to-create-a-contact-form-that-actually-converts-on-squarespace)
- [Studio Mesa — animations & accessibility](https://studiomesa.co/articles/squarespace-animations-interactions-guide/)
- [Schwartz-Edmisten — sticky header in Brine](https://schwartz-edmisten.com/blog/squarespace-tutorial-fixed-header-in-brine-template)
- [Minimist Web Design — force mobile nav in Brine](https://www.minimist.ca/articles/force-mobile-navigation-on-squarespace-brine-templates)
- [Applet Studio — Squarespace on mobile](https://www.applet.studio/blog/squarespace-mobile)
- [SEOspace — site structure for local SEO](https://www.seospace.co/blog/squarespace-site-structure-local-seo-service-business)
- [Marta Lebre — schema markup in Squarespace](https://martalebre.com/blog/squarespace-schema-markup)
- [EduCBA — LocalBusiness schema for Squarespace](https://www.educba.com/local-business-schema-squarespace/)
- [Squarespace Help — Form blocks](https://support.squarespace.com/hc/en-us/articles/206566737-Form-blocks)
- [Squarespace Help — preventing form spam](https://support.squarespace.com/hc/en-us/articles/115010449067-Preventing-form-and-newsletter-block-spam)
- [Squarespace Help — form & button conversion analytics](https://support.squarespace.com/hc/en-us/articles/115015424067-Form-button-conversion-analytics)
- [Squarespace Help — image galleries](https://support.squarespace.com/hc/en-us/articles/206542467-Image-galleries-on-Squarespace)
- [Squarespace Help — reducing page size](https://support.squarespace.com/hc/en-us/articles/360022529371-Reducing-your-page-size-for-faster-loading)
- [Squarespace Help — accessibility resources](https://support.squarespace.com/hc/en-us/articles/215129127-Accessibility-resources-at-Squarespace)
- [Squarespace Circle — Core Web Vitals for Squarespace](https://pros.squarespace.com/blog/core-web-vitals)
- [Squarestylist — Portfolio in Summary Blocks](https://www.squarestylist.com/squarespace/squarespace-portfolio-summary-blocks)
- [Cal.com — Calendly vs Acuity 2026](https://cal.com/blog/calendly-vs-acuity-a-comparative-guide-to-scheduling-tools)
- [TrustRadius — Calendly vs Acuity 2026](https://www.trustradius.com/compare-products/calendly-vs-squarespace-acuity-scheduling)
- [StudioLimb — WCAG color contrast 2026](https://www.studiolimb.com/guides/wcag-color-contrast-guide.html)
- [Unlighthouse — don't lazy-load your LCP image](https://unlighthouse.dev/learn-lighthouse/lcp/lcp-lazy-loaded)
- [WebFX — 2026 CRO trends](https://www.webfx.com/blog/conversion-rate-optimization/cro-trends/)
- [Studio Space Atlanta](https://studiospaceatl.com/)
- [Atlanta Filmworks](https://atlantafilmworks.com/)
- [Cinespace Atlanta](https://cinespace.com/cinespace-atlanta/)
- [Big Cat Creative — 7.0 to 7.1 migration](https://www.bigcatcreative.com/blog/move-from-squarespace-71-70)
