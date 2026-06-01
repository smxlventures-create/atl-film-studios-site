# ATL Film Studios — Execute Now Runbook

**One-page reference for the Squarespace rebuild.** All content + code is paste-ready in the files referenced below. Clipboard pre-loaded with the most-needed paste at each step.

---

## State summary (June 1 2026, 2:20 PM)

| Asset | Status | File |
|---|---|---|
| Pixel + Schema + Custom Events (Header Code Injection) | Paste-ready in clipboard | `squarespace-header-injection-FINAL.html` (5.2KB) |
| Custom CSS (brand styles + price aside) | Paste-ready | `squarespace-custom-css.css` (5.6KB) |
| Thank-you page Lead-event injection | Paste-ready | `squarespace-thankyou-page-injection.html` (78B) |
| 21 SEO-renamed JPGs | Upload-ready | `_upload-ready/` (6.8MB) |
| Logo PNG | Already on Squarespace CDN | (reuse existing) |
| Page content for all 13 pages | Paste-ready | `squarespace-page-blocks.md` (8 sets) + `squarespace-home-utility-pages.md` (home + 4 utility) |
| WordPress XML backup | Saved | `backup-pre-rebuild/Squarespace-Wordpress-Export-06-01-2026.xml` (97KB) |
| Live HTML backup of 8 pages | Saved | `backup-pre-rebuild/html/` |

---

## Execute in this order

### Step 1 — Header Code Injection (1 min)
Open: https://bronze-flamingo-lspg.squarespace.com/config/pages/website-tools/code-injection

1. Refill clipboard if stale: in Terminal, `cat "/Users/spencerlampkin/Claude/Swirl Films/set-rentals/squarespace-header-injection-FINAL.html" | pbcopy`
2. Click in the **HEADER** field (top textarea, "Enter code that will be injected into the 'head' tag")
3. Press **Cmd+V**
4. Scroll down → click **Save**
5. Verify: open `https://atlfilmstudios.com/` in a new tab, view-source, search for `1373400664837883` → should appear 2 times. Search for `LocalBusiness` → should appear 1 time.

### Step 2 — Custom CSS (1 min)
Open: https://bronze-flamingo-lspg.squarespace.com/config/pages/website-tools/custom-css

1. Refill clipboard: `cat "/Users/spencerlampkin/Claude/Swirl Films/set-rentals/squarespace-custom-css.css" | pbcopy`
2. Click in the Custom CSS editor
3. **Cmd+V**
4. Click **Save**
5. Verify: refresh `https://atlfilmstudios.com/` → buttons should now be teal-cyan squared (var(--accent) #4dd6c1), eyebrow labels uppercase + spaced, headlines tighter tracking.

### Step 3 — Bulk image upload (5 min)
Open: https://bronze-flamingo-lspg.squarespace.com/config/asset-library

1. Drag the entire `_upload-ready/` folder contents (21 JPGs) into the Asset Library
2. Wait for all uploads to confirm (green checks)
3. Multi-select all newly uploaded files → create folders + Move Here:
   - `/courtroom/` (5 files starting with `atl-film-studios-courtroom-`)
   - `/hospital/` (4 files: `atl-film-studios-hospital-*`)
   - `/police-precinct/` (4 files: `atl-film-studios-police-precinct-*`)
   - `/interrogation/` (2 files: `atl-film-studios-interrogation-*`)
   - `/psych-wall/` (2 files: `atl-film-studios-psych-wall-*`)
   - `/led-wall/` (3 files: `atl-film-studios-led-wall-*`)
   - `/facility/` (1 file: `atl-film-studios-facility-loading-bay.jpg`)

### Step 4 — Archive existing pages (5 min)
Open: https://bronze-flamingo-lspg.squarespace.com/config/pages

For each of these pages, drag into the **Not Linked** section at the bottom:
- About Us (the about-us-mojave page)
- Stages (Index)
- Mill / Offices / Standing Sets / LED Wall / Our Team
- Campus Specs / News / Volunteer / Donate / HIT US UP
- Stage gallery / FAQ / Terms Of Service / Privacy Policy

> **Note:** the new home Index (Step 5) must be created FIRST and set as homepage before you can archive the old `/about-us-mojave` (you can't have an empty homepage).

### Step 5 — Build pages in this order

Per architecture playbook §"Page-build sequence":

#### 5a. Build set master `/courtroom` first (60 min)
Use `squarespace-page-blocks.md` → Page 1 — Courtroom. Layout Page. Add banner via gear → Media. Add all blocks per the scaffold. Save. **Lock the layout before duplicating** — gives every subsequent set page consistent structure.

#### 5b. Duplicate `/courtroom` × 7 (90 min — ~13 min each)
For each set page (Hospital, Police Bullpen, Interrogation, Psych Wall, Jail Cell, Prison Cell, LED Walls): gear → Duplicate Page → rename → edit slug → manually re-upload banner image (duplication doesn't copy banner) → swap set-specific text and gallery → update hidden `Set Interest` form field.

Use `squarespace-page-blocks.md` for each set's verbatim content.

#### 5c. Build utility pages (45 min)
- `/about` — per `squarespace-home-utility-pages.md` § About
- `/faq` — per § FAQ
- `/contact` — per § Contact
- `/thank-you` — per § Thank-You. **CRITICAL:** SEO tab → Hide page from search engines (toggle ON). Then Advanced → Page Header Code Injection → paste contents of `squarespace-thankyou-page-injection.html`.

#### 5d. Build home Index Page LAST (90 min)
Per `squarespace-home-utility-pages.md` § Home. Create Index Page named "Home". Add 7 Layout sub-pages in order: Hero / Sets grid / Why-Book / Pricing / Atmosphere / Location / Quote. Set the Index as homepage via gear → Set as Homepage.

### Step 6 — Nav configuration (10 min)
Pages panel → Main Navigation: Sets · About · Location · FAQ
Pages panel → Secondary Navigation: add Link "Request a Quote" → `/#quote` → Save
Design → Site Styles → search "Secondary Nav" → set Button style. Custom CSS already overrides shape/color.

### Step 7 — QA pass (45 min)
- Open `https://atlfilmstudios.com/` in Incognito → walk every page, desktop + mobile
- Submit the quote form on the home page → verify both emails (`atlfilmstudios@swirlfilms.com` + `tyrell@swirlfilms.com`) receive it
- Redirect should land on `/thank-you`
- Open Meta Events Manager → confirm Lead event fired once (not double)
- Click "Book on Peerspace" / "Book on Giggster" / phone link → verify custom events fire (Meta Pixel Helper extension shows the events)
- Verify all 8 set pages load + render banner + sticky pricing aside + form

---

## Files in `set-rentals/` (for reference)

| File | Purpose |
|---|---|
| `EXECUTE-NOW.md` | This file |
| `squarespace-header-injection-FINAL.html` | Pixel + custom events + JSON-LD schema (paste 1) |
| `squarespace-custom-css.css` | Brand stylesheet (paste 2) |
| `squarespace-thankyou-page-injection.html` | Lead event for /thank-you (paste 3, per-page) |
| `squarespace-page-blocks.md` | All 8 set page content (paste during page builds) |
| `squarespace-home-utility-pages.md` | Home + about + faq + contact + thank-you content |
| `squarespace-image-playbook.md` | Image upload + sizing playbook |
| `squarespace-architecture-playbook.md` | Mojave/Brine architecture (URL nesting, duplication, forms, etc.) |
| `squarespace-best-practices-2026.md` | 2026 best practices (priority-ranked) |
| `peerspace-source-of-truth.md` | Canonical pricing + content from Peerspace listing |
| `_upload-ready/` | 21 renamed JPGs for bulk upload |
| `backup-pre-rebuild/` | WordPress XML + HTML backup of old site |

---

## Estimated total execute time

- Pastes (Step 1-2): **2 min**
- Image upload + folder org (Step 3): **5 min**
- Page builds (Step 5): **~4 hours** (set master 60min + 7 duplicates 90min + utility 45min + home 90min)
- Nav + QA (Step 6-7): **55 min**
- **Total: ~5 hours of focused editor time**

Can be split across multiple sessions. Pages exist in Squarespace as drafts until you set the home Index as the public homepage.
