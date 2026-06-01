# ATL Film Studios — Squarespace Architecture Playbook

**Date:** June 1, 2026
**Platform:** Squarespace 7.0 / Mojave (Brine family) / Business plan
**Site:** atlfilmstudios.com (tenant `bronze-flamingo-lspg`)
**Companion docs:** `peerspace-source-of-truth.md` (pricing & inventory) · `squarespace-scaffold.md` (copy) · `squarespace-technical-brief.md` (CSS / Pixel / decisions)

---

## Executive summary

- **Brine "Stacked Index" is the home.** One Index Page, 7 child Layout sub-pages stacked vertically. Set the Index Page itself as the homepage. Mojave is Brine, so all Brine Index mechanics apply.
- **There is no real `/sets/courtroom` URL nesting in 7.0** — Squarespace 7.0 emits flat URLs even when a page lives inside a Folder. Best workaround on Business plan: keep the 8 set pages under a Folder named "Sets" (for nav grouping only) and set each page's slug to `sets-courtroom`, `sets-hospital`, etc., OR use Settings → Advanced → **URL Mappings** to alias `/sets/courtroom -> /courtroom` (301). Decide upfront and lock the slugs before ads launch — slug changes after launch break Pixel attribution.
- **There is no "Banner Page" page type in Brine.** A "Banner Page" is a **Layout Page with a banner image added** via the page's gear icon → Media. Same for set landing pages.
- **Index Pages cannot be duplicated; Layout Pages can.** Build ONE set landing page (the Layout Page template), then duplicate it 7 times in the Pages panel via the gear icon. Code Injection and headers do NOT copy with duplication — re-paste per page.
- **The Form Block only accepts ONE recipient email.** To deliver to both `atlfilmstudios@swirlfilms.com` and `tyrell@swirlfilms.com`, create a Google Workspace alias/group that forwards to both, OR add a Zapier "Email by Zapier" step as the second storage destination. Form Block does support **multiple storage destinations** (Email + Google Drive + Zapier simultaneously) — that's the win.

---

## 1. Index Page mechanics in Mojave / Brine

**Create:** Pages panel → **+** → **Index** → title → Enter.

Mojave is a **Stacked-style** Index. Each sub-page = a vertically stacked full-width section on one scrollable page. Sub-page types allowed inside a Brine Index: **Layout** and **Gallery** only.

**Mapping our 7 home sections:**

| Section | Sub-page type | Notes |
|---|---|---|
| Hero | Layout (with banner image) | Featured image = section background; intro overlay holds h1 + buttons |
| Sets grid | Layout w/ Summary Block linking to 8 set pages | More control than Gallery sub-page |
| Why-Book | Layout | 3-column row of Text Blocks |
| Pricing | Layout | Headline + rate ($150/hr, 3hr min, 10% off 8h+) |
| Atmosphere | Gallery (Grid or Stacked) | Native lightbox |
| Location | Layout | Map Block + address |
| Quote | Layout | Form Block + Tyrell direct line |

**Add sub-page:** click **+** beneath the Index title in the Pages panel → Layout or Gallery. **Reorder:** drag in the Pages panel (top = top on live).

Brine Layout sub-pages render their **featured image as section background** — that's how the Hero gets its full-bleed photo.

---

## 2. "Banner Pages" vs Layout Pages

**There is no separate "Banner Page" type in Brine.** A banner-with-body page is a **Layout Page with a banner image uploaded** via gear icon → Media. Same mechanism for our 8 set landing pages.

**Make a set landing page:**
1. Pages panel → **+** in Main Navigation → **Page** (= Layout Page).
2. Hover the page → gear → **Media** → **Add Image** → upload (1500–2500px wide, wider than tall) → drag focal point → **Save**.
3. Open the page → **Edit** → add body via Classic Editor: Text, Gallery, Form, Map, Button, Code, Summary blocks. Use 2-column rows for "description + sticky pricing aside" pattern (sticky positioning via Custom CSS).

The banner area also has an **intro overlay** (h1 + button on top of the image) — don't double-up the h1 in the body below.

---

## 3. Page folders / URL nesting

**Hard truth: 7.0 emits flat URLs regardless of folder structure.** A "Courtroom" page inside a "Sets" folder gets `/courtroom`, NOT `/sets/courtroom`. Folders in 7.0 are nav-grouping (dropdowns) only — not URL path segments. Slugs cannot contain forward slashes.

**Three options for the `/sets/[slug]` look:**

| Option | URL | Tradeoff |
|---|---|---|
| **A.** Folder named "Sets" + flat slugs (`courtroom`, `hospital`, …) | `/courtroom` | Native; no `/sets/` prefix |
| **B.** Folder + hyphenated slugs (`sets-courtroom`, …) | `/sets-courtroom` | Pseudo-namespace; uglier |
| **C.** Settings → Advanced → **URL Mappings** → `/sets/courtroom -> /courtroom 301` for each | `/sets/courtroom` (redirects) | 301 hop adds tiny Pixel risk + manual upkeep |

**Recommendation: Option A.** Use UTMs in ad URLs for attribution, not the path. No SEO benefit to faked nesting on a new site.

**Create the Folder:** Pages panel → **+** → **Folder** → name "Sets" → drag the 8 set pages into it. Folder = dropdown in main nav; folder itself has no URL.

---

## 4. Page duplication workflow

**Layout Pages duplicate. Index Pages do not.** (Sub-pages inside an Index can be duplicated individually.)

**Path:** Pages panel → hover page → **gear** → bottom of Page Settings → **Duplicate Page** → **Confirm**.

**Copies:** all blocks, layout, title (with " (Copy)"), slug (with "-copy"), basic SEO.
**Does NOT copy** (re-paste manually):
- Page Header Code Injection
- Per-page Header/Footer/Sidebar overrides
- Banner image (re-upload via Media)
- Sometimes intro-area content (verify)

**Set-page sequence:**
1. Build `/courtroom` as **master template** — banner, h1, gallery, about, amenities, sticky pricing aside (Code Block w/ CSS hooks), Form Block, CTA. Form redirect = `/thank-you`.
2. Duplicate × 7.
3. For each: rename title, edit slug, re-upload banner, edit set-specific text, swap gallery images. Pricing block stays identical.

---

## 5. Homepage assignment

**Index Pages CAN be set as homepage** (the standard Brine pattern). Sub-pages inside an Index cannot.

**Path:** Pages panel → hover target page → **gear** → scroll to bottom → **Set as Homepage** → **Confirm** → **Save**. House icon appears next to it.

**Quirks:**
- Old homepage (`/about-us-mojave`) stays in the panel, content intact, just loses the house icon. Drag to Not Linked.
- Homepage URL is always `/`. The previous home's slug becomes accessible at its named URL once demoted.
- A page set as homepage can't be dragged INTO an Index (not relevant — our home IS the Index).

---

## 6. Not Linked (archive without delete)

**Path:** Pages panel → drag the page down into **Not Linked**.

- Removed from nav; URL still accessible directly.
- To also hide from Google: gear → **SEO** → toggle **Hide page from search engine results**.

Use for old `/about-us-mojave`, old `/contact-us`, `/stagegallery`. Don't delete for 30+ days post-launch (revert insurance).

---

## 7. Navigation configuration

**Main nav order:** Pages panel → **Main Navigation** section → drag rows. Top = leftmost in live header.

Brine has two slots: **Main Navigation** + **Secondary Navigation**.

**Add the "Request a Quote" button:**
1. Pages panel → **Secondary Navigation** → **+** → **Link** → name "Request a Quote" → URL `/#quote` (or `/contact-us`) → Save.
2. **Design → Site Styles** → tweak group **Header: Secondary Navigation** → set **Style** = **Button** (options: Plain / Solid Field / Button).
3. Custom CSS already overrides Style Editor button color/shape with the teal flat-square.

**Caveat:** the Button style applies to ALL secondary nav items. Keep "Request a Quote" as the only secondary item — OR style only the last item via CSS: `.Header-nav--secondary .Header-nav-item:last-child`.

---

## 8. Per-page settings

Pages panel → hover page → **gear icon** → Page Settings dialog.

| Tab | Field | Used for |
|---|---|---|
| General | Page Title | H1 / browser tab |
| General | Navigation Title | Override what shows in nav |
| General | URL slug | Path (no slashes; dashes only; 3–250 chars) |
| General | Enabled toggle | Hide from public without delete |
| Media | Featured Image | Banner + social-share fallback |
| Media | Thumbnail Image | Summary Block / Index card |
| SEO | SEO Title / Description | `<title>` + meta description |
| SEO | Hide from search engine results | `noindex` — use on `/thank-you` |
| Social Image | Custom Social Sharing Image | OG/Twitter override |
| Password | Password | Single-pwd gate |
| Advanced | Page Header Code Injection | Per-page `<head>` |

---

## 9. Per-page Code Injection (Lead event on `/thank-you`)

**Path:** Pages panel → hover `/thank-you` → **gear** → **Advanced** → **Page Header Code Injection** → paste:

```html
<script>
  if (typeof fbq === 'function') { fbq('track', 'Lead'); }
</script>
```

The site-wide Meta Pixel base (Settings → Advanced → Code Injection → Header) initialized `fbq` globally; this fires Lead exactly once on the redirect destination.

**Double-fire warning:** native Meta Pixel integration (Marketing → Meta Pixel & Ads) auto-fires `Lead` on Form Block submits. **Pick one path.** Per the technical brief, prefer native for `Lead` + Code Injection only for custom events (`ClickToPeerspace`, `ClickToGiggster`, `ClickToCall`). If going that route, **omit** the per-page injection above.

---

## 10. Mobile considerations

Mojave/Brine is responsive, not mobile-edited (no separate mobile editor — that's a 7.1 feature).

| Need | How |
|---|---|
| Separate mobile banner image | CSS only. Upload alt image, grab CDN URL, override via `@media (max-width: 640px) { .page-banner-image { background-image: url('CDN_URL') !important; } }` |
| Mobile breakpoint | Design → Site Styles → tweak group **Mobile** → **Mobile breakpoint** (default 640px) |
| Mobile bar config | Design → Site Styles → **Mobile Bar** — top/bottom/centered, which header elements show. Move elements between bars via the live Header editor |
| Touch targets | Custom CSS — button padding 18px at `max-width: 640px` |

**Brine quirk:** mobile menu uses `.Mobile` DOM; desktop nav uses `.Header-nav--primary`. CSS targeting desktop nav must be duplicated under `.Mobile` selectors. The Secondary Navigation button does NOT appear in the mobile bar by default — explicitly move it in the live Header editor.

---

## 11. Style Editor per page

**Site-wide only.** 7.0 Style Editor tweaks apply globally — you cannot vary them per page from the UI.

**Workaround = Custom CSS scoped to collection IDs.** Every page (and Index sub-page) has a unique ID exposed in the DOM as `#collection-XXXXXXXX...` on `<main>`. Inspect the live page, copy the ID, then in **Design → Custom CSS**:

```css
#collection-682f9a1b3c4d5e0001abc123 {
  background: var(--black);
  color: var(--paper);
}
```

Each Index sub-page has its own collection ID even when rendered as part of the parent Index — same technique applies. See `squarespace-technical-brief.md` for the per-section dark/light scoping CSS.

---

## 12. Forms — Form Block configuration

**Add Form Block:** in Edit mode → click an **insert point** (blue line) → **+ Form**. Open editor with pencil icon.

**Content tab:**
- **Edit Form Fields** → **+ Add Field** → Text / Email / Phone / Number / Date / Dropdown / Paragraph / Checkbox / Radio → label, required, dropdown options.
- **Post-Submit** → choose **Redirect** → **Attach Link** → `/thank-you`.
- **Button Text:** "Send Quote Request".

**Storage tab:**
- Default email storage = account email.
- **+ Additional Storage** → add: **Email** (one address per destination — but you can add multiple Email destinations), **Google Drive**, **Mailchimp**, **Zapier**. All run simultaneously.

**Multi-recipient (atlfilmstudios + tyrell):**
- **Option A (cleanest):** add TWO Email storage destinations — one per address.
- **Option B:** Google Workspace group `quotes@swirlfilms.com` forwarding to both → single Email destination.
- **Option C (most observable):** Email + Google Drive (per-submission Sheet log) + Zapier (Slack/SMS to Tyrell).

**Recommendation: Option A + Google Drive.** Two email destinations + searchable Sheet log, no Zapier subscription.

**Test gotcha:** Form Block redirects don't fire while you're logged into the Squarespace editor. Always test in Incognito.

---

## Page-build sequence

Build the set-page master FIRST so duplication can begin early. The home Index lands LAST so its Sets section can reference real, finished set pages.

**Phase 0 — Settings prep (15 min).** Settings → Advanced → Code Injection → Header (paste site-wide Meta Pixel base). Marketing → Meta Pixel & Ads (paste Pixel ID for native, if going that path). Design → Custom CSS (paste brand CSS from technical brief).

**Phase 1 — Archive (10 min).** Drag old `/about-us-mojave`, `/contact-us`, `/stagegallery` to Not Linked.

**Phase 2 — Build set master `/courtroom` (60 min).** Pages → **+** → Page → slug `courtroom`. Gear → Media → upload hero (1500–2500px, focal point). Edit body: h1 + intro + amenities Text Blocks, Gallery Block, Form Block (redirect `/thank-you`, dual Email storage), sticky-aside Code Block. SEO title + description. Verify mobile preview. **Lock layout before duplicating.**

**Phase 3 — Duplicate × 7 (90 min, ~13 min each).** Gear → Duplicate Page. For each: rename, swap slug, re-upload banner, edit set-specific text + gallery. Slugs: `courtroom`, `hospital`, `police-bullpen`, `interrogation`, `psych-wall`, `jail-cell`, `prison-cell`, `led-walls`. Group all 8 into a Folder named "Sets".

**Phase 4 — Utility pages (45 min).** Build `/about`, `/contact-us` (verify no slug collision with archived version), `/faq`. Build `/thank-you` → SEO → toggle Hide from search engines → optionally Advanced → paste Lead event script (skip if using native Pixel integration).

**Phase 5 — Home Index (90 min).** Pages → **+** → **Index** → "Home". Add 7 sub-pages in order: Hero (Layout, featured image = LED wall hero), Sets (Layout w/ Summary Block linking to 8 set pages), Why-Book (Layout, 3-col), Pricing (Layout), Atmosphere (Gallery), Location (Layout w/ Map Block), Quote (Layout w/ Form Block). Gear on Index → **Set as Homepage** → Confirm.

**Phase 6 — Nav + wiring (30 min).** Confirm Main Nav order: Sets · About · Location · FAQ. Secondary Nav: one Link "Request a Quote" → `/#quote`. Design → Site Styles → Header: Secondary Navigation → Style: Button. Verify CSS override renders teal flat button.

**Phase 7 — QA (45 min).** Walk every page desktop + mobile. Submit test form in Incognito → verify both emails + Sheet + redirect. Meta Pixel Helper on every page. Click Peerspace/Giggster/tel: links → verify custom events.

**Total: ~5 hours focused editor time.**

---

## Gotchas & version-specific quirks

1. **Index Pages can't be duplicated.** To clone the home Index for A/B, you must rebuild from scratch.
2. **Page Header Code Injection does NOT copy on duplicate.** Re-paste any per-page injection. (Only `/thank-you` needs one — flag for the team.)
3. **Banner image does NOT copy on duplicate.** 7 manual banner re-uploads required.
4. **Index sub-pages render featured image as section background**, not as a top-mounted banner. The "banner" on the home Hero section is the sub-page's featured image — there's no banner-page mechanic for Index sub-pages.
5. **Brine Index style tweaks are site-wide for all Indexes.** Use Custom CSS scoped by collection ID to vary per-Index.
6. **`/thank-you` must be `noindex`.** Otherwise Google ranks the confirmation page above the home for brand queries. Page Settings → SEO → **Hide page from search engine results**.
7. **Form Block redirects don't fire while logged into Squarespace.** Test in Incognito.
8. **Slugs are silent — there's no breadcrumb.** After 7 duplications, double-check each slug. The auto-suffix (`-copy`, `-copy-1`) is easy to miss and will break ad URLs.
9. **Secondary Nav "Button" style is all-or-nothing.** Keep one item, OR scope via `.Header-nav--secondary .Header-nav-item:last-child` CSS.
10. **Folder dropdown click behavior varies in Brine.** Clicking the folder name may do nothing OR navigate to the first page inside. Mojave folders have no folder-index page — purely a dropdown. To make "Sets" clickable, either put a "Sets overview" page first OR add a redirect via Code Injection.
11. **Brine's banner "intro area" is separate from the body.** Don't duplicate the h1 in both intro and body — pick one.
12. **Style Editor wins over Custom CSS on cascade conflicts** unless you `!important`. Our brand CSS uses `!important` for buttons and header — keep the pattern.
13. **Custom CSS limit is 128KB per site.** Plenty of room. Avoid inline `<style>` in Code Blocks — harder to maintain.
14. **Mojave was retired from new-template selection ~2022** but existing sites still get platform updates. Stable, but no new features land for it. Fine for our needs.

---

## Sources

- [Squarespace — Index pages in version 7.0](https://support.squarespace.com/hc/en-us/articles/206543817-Index-pages-in-version-7-0)
- [Squarespace — Brine template family](https://support.squarespace.com/hc/en-us/articles/212512738-Brine-template-family)
- [Squarespace — Troubleshooting Brine](https://support.squarespace.com/hc/en-us/articles/213436487-Troubleshooting-Brine)
- [Squarespace — Adding banner images in version 7.0](https://support.squarespace.com/hc/en-us/articles/205826018-Adding-banner-images-in-version-7-0)
- [Squarespace — Dropdowns vs. index pages in version 7.0](https://support.squarespace.com/hc/en-us/articles/205813748-Dropdowns-vs-index-pages-in-version-7-0)
- [Squarespace — URL slugs](https://support.squarespace.com/hc/en-us/articles/205814578-URL-slugs)
- [Squarespace — URL mappings](https://support.squarespace.com/hc/en-us/articles/205815308-URL-mappings)
- [Squarespace — Duplicating pages and content](https://support.squarespace.com/hc/en-us/articles/206543627-Duplicating-pages-and-content)
- [Squarespace — Setting a homepage](https://support.squarespace.com/hc/en-us/articles/205814408-Setting-a-homepage)
- [Squarespace — Page settings](https://support.squarespace.com/hc/en-us/articles/206543657-Page-settings)
- [Squarespace — The Pages panel](https://support.squarespace.com/hc/en-us/articles/217644727-The-Pages-panel)
- [Squarespace — Using code injection](https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection)
- [Squarespace — Form blocks](https://support.squarespace.com/hc/en-us/articles/206566737-Form-blocks)
- [Squarespace — Managing form and newsletter storage](https://support.squarespace.com/hc/en-us/articles/205814638-Managing-form-and-newsletter-storage)
- [Squarespace — Making style changes](https://support.squarespace.com/hc/en-us/articles/205815788-Making-style-changes)
- [Squarespace — Style changes FAQ](https://support.squarespace.com/hc/en-us/articles/206544597-Style-changes-FAQ)
- [Squarespace — Styling navigation](https://support.squarespace.com/hc/en-us/articles/205816038-Styling-navigation)
- [Squarespace — Using Meta Pixel with Squarespace](https://support.squarespace.com/hc/en-us/articles/115015760107-Using-Meta-Pixel-with-Squarespace)
- [Big Cat Creative — How to add a button to your header navigation](https://www.bigcatcreative.com/blog/header-navigation-button-squarespace)
- [Big Cat Creative — Best Squarespace template (Brine deep-dive)](https://www.bigcatcreative.com/blog/best-squarespace-template)
- [Christy Price — Submit Squarespace form to more emails](https://christyprice.com/blog/submit-squarespace-form-more-emails)
- [Lauren Taylar — A guide to Squarespace Index Pages](https://laurentaylar.com/blog/squarespace-index-pages)
- [Lauren Taylar — Why Brine is the best Squarespace 7.0 template](https://laurentaylar.com/blog/brine-best-squarespace-template)
- [SiteSmith Studio — Different banner image on mobile in Squarespace](https://sitesmithstudio.com/blog/different-image-mobile-squarespace)
- [Rebecca Grace Designs — Edit the mobile banner image in Squarespace 7.0](https://www.rebeccagracedesigns.com/blog/change-banner-image-mobile)
- [23and9 Creative — How to duplicate a page in Squarespace (7.0 + 7.1)](https://www.23and9creative.com/blog/how-to-duplicate-a-page-in-squarespace)
- [Studio Crescent — Style editor changes easier in 7.0](https://studiocrescent.co/the-1-trick-you-need-to-make-style-edit-changes-easier-in-squarespace/)
- [Squarecamp — Linking folder navigation to a specific page on 7.0](https://squarecamp.com/custom-code-tips/how-to-link-folder-navigation-title-to-a-specific-page-on-squarespace-7)
