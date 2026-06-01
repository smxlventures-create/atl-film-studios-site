# atlfilmstudios.com — Migration Plan

**Squarespace tenant:** `bronze-flamingo-lspg` (Squarespace 7.1)
**Live domain:** atlfilmstudios.com
**Logo on file:** `set-rentals/site/logo/atl-film-studios-logo-2025.png` (downloaded from Squarespace CDN, 1024×1024, RGBA, also available as `.webp` and a `-hires` variant)
**Reusable assets:** logo, address, phone, email, social handles, footer "Powered by Swirl Films" tagline
**Build target:** the v2 static site at `set-rentals/site/` (13 pages, 35 photos, real logo integrated, accent recolored to harmonize with logo's cyan/teal)

---

## Current site inventory (today)

| Page | URL slug | Status | Decision |
|---|---|---|---|
| Home ("About Us") | `/` | Placeholder: "NEW SETS / NEW LOOK / NEW LOCATION / COMING SOON!!" + "Our Mission And Goals" heading | **Archive content + replace** |
| Contact | `/contact-us` | "HIT US UP" inline form | **Archive + replace** with new contact page (consider keeping slug for any external links) |
| Stage Gallery | `/stagegallery` | Placeholder gallery | **Archive + replace** with new 7-set landing pages |

**Footer (current):** address + phone + email + social + "Powered by Swirl Films" — **keep as-is**, the data is correct

**Assets preserved:**
- Logo (downloaded — yours forever, no dependency on Squarespace CDN)
- Address: 2132 James Jackson Pkwy NW, Atlanta, GA 30318
- Phone: 470-231-8971
- Email: tyrell@swirlfilms.com (consider also routing `atlfilmstudios@swirlfilms.com` for distinct inbox)
- Social: Facebook (Swirl Studios Atlanta), Instagram (@atlfilmstudios)

---

## The three migration paths

### PATH 1 — Stay on Squarespace, rebuild manually inside Fluid Engine
**Time:** 1–2 days
**Cost:** $23/mo (existing plan)
**Editor:** Tyrell + Spencer can both edit in Squarespace
**Aesthetic ceiling:** ~70% of the static-site design (Fluid Engine is more block-based, less editorial)

**Pros**
- Keep the Squarespace editor — Tyrell can update pricing/photos without engineering help
- No domain/DNS work
- Built-in form handling, no third-party form service needed
- Page-level archive ("Not Linked" pages) is native — nothing actually gets deleted

**Cons**
- Squarespace 7.1 Fluid Engine can't replicate the exact set-page sticky pricing aside, the lightbox, or the typographic precision of the static build
- Manual page-by-page rebuild — every set page is a separate Squarespace page with content blocks pasted in
- Slower iteration on ad-driven A/B tests

**Step-by-step**
1. In Squarespace editor (Pages panel), drag the three existing pages into a "Not Linked" section to remove them from public nav while keeping the URLs alive in case anything links to them
2. Create a fresh page tree:
   - `/` (Home — replace existing)
   - `/about` (new)
   - `/location` (new)
   - `/contact` (or keep `/contact-us` and redirect)
   - `/faq` (new)
   - `/thank-you` (form-submit landing, set to "Not Indexed")
   - `/sets/full-buyout`, `/sets/led-volume-wall`, `/sets/courtroom`, `/sets/hospital-suite`, `/sets/police-precinct`, `/sets/interrogation`, `/sets/cyc-wall` (7 new pages — group under a "Sets" folder in the editor)
3. For each page, paste copy from `set-rentals/listings.md` (everything's already written) and drop images from `set-rentals/_published/[NN]_*/`
4. Hook Squarespace's native form action into the quote form. Form submissions route to `atlfilmstudios@swirlfilms.com` + `tyrell@swirlfilms.com`
5. Site Header: upload `atl-film-studios-logo-2025.png` as site logo (Squarespace handles responsive sizing)
6. Add Meta pixel via **Settings → Advanced → Code Injection → Header**
7. Custom CSS via **Design → Custom CSS** — paste the relevant rules from `set-rentals/site/css/style.css` to lock the editorial type + cyan/teal accent

### PATH 2 — Deploy the static site I built (Netlify or Cloudflare Pages), kill Squarespace dependency
**Time:** 30 minutes for first deploy, then iteration is fast
**Cost:** $0/mo (Netlify/CF Pages free tier handles this volume easily) + keep Squarespace at $14/mo Personal plan ONLY if you want email forwarding, otherwise cancel
**Editor:** Only via code (me, or a developer)
**Aesthetic ceiling:** 100% — this is the design as built

**Pros**
- Already built and tested. Deploy in 30 minutes.
- Full design fidelity — the A24/Focus editorial aesthetic, exactly as specced
- Lightning fast (static HTML, CDN-hosted) — better Meta ad LP scores
- Cheap or free
- No platform lock-in
- I can iterate copy/pricing/photos via code in minutes

**Cons**
- Tyrell can't edit it without me or a dev
- Need a form handler (Formspree free tier or Netlify Forms — both work)
- Have to point atlfilmstudios.com DNS to the new host (~10-min change)

**Step-by-step**
1. Pick a host: **Netlify recommended** (free, drag-and-drop, custom domain in one click)
2. Wire form action to Netlify Forms — add `netlify` attribute to the `<form>` tag, deploy, done. Or use Formspree (`<form action="https://formspree.io/f/YOUR_ID">`)
3. Add real Meta pixel ID to `<head>` of `index.html` and `thank-you.html` (the placeholder block is already there, commented out)
4. Drag the `set-rentals/site/` folder into Netlify dashboard — auto-deploys
5. In Netlify domain settings, add `atlfilmstudios.com`. Netlify gives you DNS records (CNAME or A) — paste them into whichever registrar holds the domain
6. Wait for DNS propagation (~15 min — 1 hr typically)
7. SSL auto-issues via Let's Encrypt
8. Squarespace site is now orphaned. Either:
   - Cancel the Squarespace subscription entirely (after exporting any historical content you want)
   - Downgrade to Personal plan ($14/mo) if you want the Squarespace inbox / email forwarding to keep working for `@swirlfilms.com` mail (only relevant if Tyrell's email routes through there)

### PATH 3 — Hybrid: deploy static site to a subdomain, keep Squarespace at root for now
**Time:** 30 min for subdomain deploy + ongoing decision later
**Cost:** $0 + $23/mo Squarespace
**When to choose:** if you want to A/B test the new site against the placeholder before fully committing, or you want time to migrate Tyrell to a new editor workflow

**Pros**
- Zero-risk: existing site stays up, new site lives at `studios.atlfilmstudios.com` or `book.atlfilmstudios.com`
- Run ads to the new subdomain, organic traffic still finds the old root site
- Decide whether to switch fully after a few weeks of data

**Cons**
- Two live sites is confusing
- SEO-splitting (low-impact early on, but it's a thing)
- Eventually you migrate anyway

---

## Recommendation

**PATH 2 — deploy the static site to Netlify, kill the Squarespace dependency.**

Reasoning:
1. The static site is built, photo-organized, logo-integrated, and visually verified at desktop + mobile. The work is done.
2. The site is fundamentally an ad-driven booking funnel — not a frequently-edited content site. Tyrell doesn't need to edit copy weekly; pricing updates happen quarterly at most. The "Squarespace editor for non-technical staff" argument doesn't apply here.
3. Squarespace 7.1's Fluid Engine cannot reproduce the editorial restraint of the static build. Rebuilding in Squarespace loses the aesthetic that's the differentiator vs Studio Space ATL.
4. Netlify Forms gives us a form endpoint, email notification routing, and submission archive — no extra cost, no extra service.
5. Squarespace can be canceled or downgraded after migration — savings ~$276/year.
6. If Tyrell ever needs to edit something, I can do it in five minutes and re-deploy. Or we can layer in a headless CMS later (Sanity, Decap) without changing the front-end.

**If we go PATH 2 today, the launch sequence is:**

1. **You confirm:** "Path 2 — deploy to Netlify"
2. **I set up the form handler** — wire Netlify Forms into the quote form on every page, route notifications to `atlfilmstudios@swirlfilms.com` + `tyrell@swirlfilms.com`
3. **You paste the Meta pixel ID** into the placeholder block in the HTML (or send it to me)
4. **You drag-and-drop the `site/` folder** into Netlify (or I do it with you on a call)
5. **You point DNS** — Netlify generates the records, you paste them at the domain registrar (Squarespace Domains, GoDaddy, wherever atlfilmstudios.com is registered)
6. **SSL auto-issues, site goes live** — usually within 1 hour of DNS change
7. **Cancel or downgrade Squarespace** after confirming the new site is live + receiving form submissions

**Estimated total time:** 60 minutes from your "go" to live on atlfilmstudios.com.

---

## What I need from you to ship PATH 2

1. **Confirmation: Path 2.** (Or tell me to go Path 1 / Path 3.)
2. **Meta pixel ID** — from Business Manager `1335264358528617` → Events Manager → Pixel. Format: a numeric ID like `1234567890123456`.
3. **Form routing email(s)** — recommended: both `atlfilmstudios@swirlfilms.com` AND `tyrell@swirlfilms.com` so submissions hit two inboxes simultaneously.
4. **Domain registrar** — where is `atlfilmstudios.com` registered? (Squarespace, GoDaddy, Namecheap, etc.) — I need this to give you the right DNS instructions.
5. **Decision on email** — does `tyrell@swirlfilms.com` route through Google Workspace (Swirl Films main account)? Or through Squarespace email forwarding? This determines whether canceling Squarespace breaks his inbox.

Once those 5 items are answered, the site is live within an hour.

---

## What gets archived (PATH 1) or replaced (PATH 2)

| Existing page | New equivalent | Action |
|---|---|---|
| `/` ("About Us" hero, "Our Mission And Goals") | `/` (new home — hero + sets grid + trust + pricing teaser + atmosphere + location + form) | Replace |
| `/contact-us` ("HIT US UP" form) | `/contact.html` (Tyrell + dedicated quote form) | Replace; keep `/contact-us` as a 301 redirect if any external links point there |
| `/stagegallery` (placeholder gallery) | The 7 `/sets/*` pages OR the home page's sets grid section | Replace |
| Logo file (Squarespace CDN-hosted) | Same logo, now self-hosted at `/logo/atl-film-studios-logo-2025.png` | Keep |
| Address / phone / email / social | All preserved in new footer | Keep |
| "Powered by Swirl Films" footer tag | Preserved in new footer | Keep |

In **PATH 1** (rebuild in Squarespace): move the three existing pages to "Not Linked" — they stay accessible if anyone has the URL bookmarked, but disappear from public nav.

In **PATH 2** (deploy static): the old Squarespace site goes offline when DNS switches; if you want any of its content preserved as an archive, export to a Squarespace `.xml` backup before canceling.

---

## Files that exist now in the repo

- `set-rentals/site/` — the 13-page static build
- `set-rentals/site/logo/atl-film-studios-logo-2025.png` — owned local copy (also `.webp` and `-hires` variants)
- `set-rentals/site/_preview/` — desktop + mobile screenshots from verification runs
- `set-rentals/listings.md` — v3 listing copy + competitive analysis (source of truth for descriptions, pricing, amenities)
- `set-rentals/website-structure.md` — the funnel strategy + ad-campaign blueprint
- `set-rentals/migration-plan.md` — this document
