# Squarespace 7.0 / Mojave Image Upload + Organization Playbook

**Site:** atlfilmstudios.com  •  **Version:** Squarespace 7.0  •  **Template:** Mojave (Brine family)  •  **Plan:** Business
**Asset scope:** 35 photos across 8 listings + 1 logo + 4 homepage selects

---

## Executive summary

- **Upload originals at 2500 px wide, 16:9** (banners) and **1500–2000 px wide** (in-content). Squarespace re-encodes every upload into 7 WebP variants (`100w/300w/500w/750w/1000w/1500w/2500w`) and serves them via its CDN — your only job is to give it a clean, properly-sized source. Anything larger than 2500 px is wasted bytes.
- **Pre-rename every file before upload** using lowercase-hyphenated, keyword-rich names (e.g. `atl-film-studios-courtroom-hero.jpg`). On Squarespace 7.0 the file name becomes the URL slug, the default alt text fallback, and an SEO signal. Renaming after upload does **not** rewrite the CDN URL.
- **Pre-compress JPGs to ~80% quality, target ≤500 KB for heroes and ≤300 KB for in-content shots.** Squarespace auto-converts to WebP on delivery, but it does not re-optimize your source, so a bloated upload stays bloated on the origin.
- **Mojave (Brine) has no native mobile-banner swap.** The only correct moves are (a) set a focal point per banner image and (b) for awkward mobile crops, inject a CSS `@media (max-width: 640px)` swap in Design → Custom CSS pointing at a separate mobile-cropped upload.
- **Bulk-upload all 35 images in one pass into the Asset Library with a folder per listing** *before* you start building pages. Then "Select from library" as you drop blocks. This avoids duplicate uploads and keeps the library navigable.

---

## 1. Asset Library structure (Squarespace 7.0)

Squarespace 7.0's **Asset Library** (Pages → […] → Assets, or via the image picker → "Select from library") stores every file you've ever uploaded sitewide. As of the modern 7.0 UI it supports:

- **Folders and nested subfolders** — create one per listing.
- **Multi-select** (checkbox in top-left of each tile) → bulk move into a folder.
- **Search by filename** — this is the #1 reason to rename files before upload.

**Gotcha:** folder creation lacks drag-and-drop into folders from the upload dialog — you upload to the root, multi-select, then "Move Here." Plan to do this once per listing batch.

**Recommended folder structure inside Asset Library:**

```
/01-full-buyout/
/02-led-wall/
/03-courtroom/
/04-hospital-suite/
/05-police-precinct/
/06-interrogation-solo/
/07-cyc-wall/
/facility-shared/
/home/
/brand/        (logo lives here — already uploaded)
```

---

## 2. Bulk upload workflow

- **Drag-and-drop directly into the Asset Library** (Pages → Assets → drag files onto the panel) is the fastest path. No third-party tool needed for 35 files.
- **Hard limits per file:** 20 MB max, 120 MP max resolution. None of our cinematic JPGs will come close.
- **No documented batch-count limit** for 7.0, but in practice keep batches to ≤30 files at a time to avoid browser memory hiccups. Our 35 photos can be done in 1–2 batches.
- **No public Squarespace upload API on Business plan.** The Content API (Commerce) does not cover asset library uploads. Browser drag-drop is the path.
- **After upload:** multi-select → Move Here → repeat per folder.

---

## 3. Optimal image dimensions by context

| Context | Upload width | Aspect | Notes |
|---|---|---|---|
| **Banner Image** (page header in Mojave) | **2500 px** | 16:9 (2500×1406) or 3:2 (2500×1667) | Brine renders banner full-bleed; CDN serves down to mobile from this master. |
| **Gallery Block** (slideshow / grid) | 1500–2000 px wide | match across set; 3:2 works well for our landscape photos | Squarespace auto-thumbnails; uploading 2500 px is fine but unnecessary. |
| **Image Block** (single image inside a content area) | 1500 px wide | as-shot | In-content max display width in Mojave is ~960 px; 1500 px covers Retina. |
| **Content / poster Image Blocks** | 1500–2000 px wide | as-shot | Same as above. |
| **Logo** | already uploaded 1024×1024 PNG | square | Reuse the existing CDN URL — do not re-upload. |

**Rule of thumb:** 2500 px for hero/banner, 1500 px for everything else. Squarespace generates the 7 responsive variants from your source automatically.

---

## 4. File format + compression

- **JPG** for every cinematic photo we have. Our content is mid-to-low-key studio imagery with smooth shadow gradients — JPG at q80 will be visually indistinguishable from the source and 3–6× smaller than PNG.
- **PNG** only for the logo (transparency required). The existing `atl-film-studios-logo-2025.png` is correct.
- **Do NOT upload WebP.** Squarespace 7.0 rejects WebP at upload — but auto-converts your JPG/PNG to WebP on delivery via the CDN. This is the workaround: feed it JPG, get WebP automatically.
- **Pre-compress before upload.** Squarespace compresses on serve, but does not optimize the master. Target:
  - Banner heroes: **≤500 KB**
  - Gallery/in-content: **≤300 KB**
  - Use ImageOptim (Mac, free), Squoosh (web, free), or `cjpeg`/`mozjpeg` for batch. Mojave's banner LCP improves measurably under 500 KB.

---

## 5. CDN URL pattern + deep linking

Squarespace assigns every uploaded asset a permanent URL of the form:

```
https://images.squarespace-cdn.com/content/<site_id>/<asset_id>/<original-filename>
```

To pull a specific responsive variant, append `?format=<size>w`:

```
?format=100w | 300w | 500w | 750w | 1000w | 1500w | 2500w
```

**Deep-linking notes:**

- Yes — once uploaded, the URL is stable and addressable from anywhere on the site (or external embeds).
- **The original filename is baked into the URL** at upload time. Renaming the asset later in the library does NOT change its URL. This is why pre-rename matters for SEO.
- Version 7.0 Gallery Pages additionally support custom **deeplink URLs** to send visitors directly to a specific image — useful if we later turn the courtroom photo set into a sharable gallery page.

---

## 6. Alt text workflow

Two-layer approach in 7.0:

1. **Filename = fallback alt text.** If you don't set alt text explicitly, Squarespace uses the filename (minus extension) on most block types. This is why `atl-film-studios-courtroom-witness-stand.jpg` is better than `IMG_4821.jpg`.
2. **Per-instance alt text** is set where the image is *used*, not where it's stored. The locations:
   - **Image Block:** click the block → pencil → "Image Description" field. This becomes the alt attribute.
   - **Gallery Block / Gallery Section:** click the gallery → image thumbnail → "Caption" or designated alt field. Note: galleries historically used caption-as-alt; in modern 7.0 the description field is honored.
   - **Banner Image:** alt is derived from the filename. There is no per-banner alt-text input in 7.0 — another reason to pre-rename.
   - **Logo:** Design → Logo & Title → alt text uses the Site Title by default.

**Workflow:** write alt text once per image, paste it during page-build when you drop the block. Keep it 8–15 words, descriptive, with a natural keyword (e.g. "Courtroom film set with witness stand, jury box, and judge's bench at ATL Film Studios").

---

## 7. Banner image aspect ratio (Mojave-specific)

- **16:9 (2500×1406)** is the safe default for Brine-family templates. Mojave renders banners full-bleed and lets you set a min-height in Site Styles.
- **Avoid >2:1 panoramas** — they crop heavily on mobile portrait viewports.
- **Avoid square or tall portraits as banners** — Mojave will letterbox or zoom-crop.
- **Keep the subject in the center 60%** of the frame. Mojave crops outward-in on smaller breakpoints.
- **No text baked into the image.** Mojave overlays banner headings via the page title field — let the template handle text.

Our montage hero for `01_FULL-BUYOUT` and the driving-plate hero for `02_LED-WALL` should both be exported at 2500×1406 with the subject centered.

---

## 8. Mobile banner image swap

**Mojave/Brine has no native "mobile banner image" upload field.** (That's a 7.1 / Fluid Engine feature.) The 7.0 options in order of effort:

1. **Focal point only (zero code).** Click the banner in the editor, drag the focal-point dot to the subject. Squarespace mobile crop respects this. For our courtroom and police-precinct hero shots this will usually be enough.
2. **CSS swap (recommended for heroes that crop badly).** Upload a separately-cropped mobile master (e.g. `courtroom-hero-mobile.jpg` at 1200×1500 portrait) to the Asset Library, copy its CDN URL, and add to Design → Custom CSS:

   ```css
   @media (max-width: 640px) {
     #collection-<id> .Index-page-image,
     #collection-<id> .Parallax-item img {
       content: url("https://images.squarespace-cdn.com/content/.../courtroom-hero-mobile.jpg");
     }
   }
   ```

   You can scope per-page using the page's collection ID (visible in the body class).

3. **Don't re-shoot.** For our 35 photos, the existing landscape masters + focal points cover 6–7 of the 8 listings. Only the LED-wall driving-plate and the full-buyout montage are likely candidates for a mobile-specific crop.

---

## 9. Image SEO — filenames

**Squarespace 7.0 uses the upload filename inside the CDN URL path**, and it's a real (if minor) ranking signal. Our current names (`01-hero-courtroom-wide.png`) are decent but improvable:

| Current | Improved |
|---|---|
| `01-hero-courtroom-wide.png` | `atl-film-studios-courtroom-set-hero.jpg` |
| `02-led-wall-driving-plate.png` | `atl-film-studios-led-wall-virtual-production-stage.jpg` |
| `03-police-precinct-bullpen.png` | `atl-film-studios-police-precinct-bullpen-set.jpg` |

**Filename rules (apply before upload):**

- Lowercase only.
- Hyphens between words, never underscores or spaces.
- Lead with the brand or location keyword (`atl-film-studios-…`).
- Include the set/listing name.
- Skip the numeric prefix (`01-`) — it's organizational only and adds nothing to the URL.
- `.jpg` not `.png` for photos (see §4).

**Renaming after upload does NOT update the URL.** Get this right at the source.

---

## 10. Workflow for the 35-photo build

**Recommended sequence (one sitting, ~60–90 min):**

1. **Local prep (30 min):**
   - Duplicate `_published/` → `_upload-ready/`.
   - Batch-convert PNGs to JPG q80 (ImageOptim or `mogrify`).
   - Batch-rename per §9 rules.
   - Confirm widths: 2500 px for heroes, 1500–2000 px for the rest.
   - Verify each file is under target KB.
2. **Single bulk upload into Asset Library (15 min):**
   - Pages → Assets → drag all 35 files in one drop.
   - Multi-select per listing → create folder → Move Here. Repeat 9 times (8 listings + home).
3. **Page-build pass (per listing, ~10 min each):**
   - Banner: Page Settings → Media → Add Image → Select from Library → pick hero → drag focal point.
   - Gallery section: Add Section → Gallery → Select from Library → multi-select the listing's photos.
   - Per-image alt text where applicable (image blocks, gallery captions).
4. **Mobile QA pass (last, 20 min):**
   - Preview each page in mobile view.
   - For any banner with awkward crop: either re-set focal point, or schedule a CSS mobile swap (§8).
5. **SEO sanity check:**
   - Marketing → SEO panel → run image alt-text report.
   - Check that filenames in the page source match the renamed convention.

---

## Gotchas + version-specific quirks

- **Renaming in the Asset Library does NOT change the CDN URL.** Pre-rename is mandatory.
- **WebP uploads are rejected** in 7.0 — feed JPG, the CDN auto-WebPs on serve.
- **No mobile-banner field** in Mojave/Brine. Plan for CSS swap if focal point can't save it.
- **Folder drag-into is awkward** — multi-select + Move Here is the only reliable path.
- **Banner image alt text comes from filename** — no per-banner alt UI in 7.0.
- **Squarespace re-encodes JPGs.** Don't bother uploading at 100% quality — q80 is the practical ceiling because the served WebP is re-compressed anyway.
- **Reusing an image via "Select from Library" does NOT re-upload it** — the same CDN URL is referenced everywhere, which is what we want for the logo and shared facility shots.
- **`?format=original` works** as an undocumented variant to fetch the source master. Useful for QA, not for production embeds.
- **Index pages in Brine** have a distinct banner system (Index banner vs. page banner). Confirm Mojave is configured as a stacked-section layout, not a parallax index, before applying §8's CSS scope.

---

## Sources

- [Adding banner images in version 7.0 — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/205826018-Adding-banner-images-in-version-7-0)
- [Formatting images for display on the web — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/206542517-Formatting-images-for-display-on-the-web)
- [Managing and reusing images and videos — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/206542377-Managing-and-reusing-images-and-videos)
- [Image and file URLs in Squarespace — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/205812748-Image-and-file-URLs-in-Squarespace)
- [Deeplink URLs in version 7.0 — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/360000601048-Deeplink-URLs-in-version-7-0)
- [Adding alt text to images — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/206542357-Adding-alt-text-to-images)
- [Brine template family — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/212512738-Brine-template-family)
- [Troubleshooting Brine — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/213436487-Troubleshooting-Brine)
- [Gallery blocks — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/206543407-Gallery-blocks)
- [Image blocks — Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/205814528-Image-blocks)
- [Understanding the Squarespace Image CDN — Beyondspace](https://www.beyondspace.studio/blog/about-squarespace-images)
- [Reduce Squarespace Image Size by 80% With WebP — SQSPThemes](https://www.sqspthemes.com/blog/squarespace-webp-workaround)
- [Squarespace Image SEO: File Names, Alt Text, and LCP — Studio Mesa](https://studiomesa.co/articles/squarespace-image-seo-file-names-alt-text-largest-contentful-paint/)
- [Edit the Mobile Banner Image in Squarespace 7.0 — Rebecca Grace Designs](https://www.rebeccagracedesigns.com/blog/change-banner-image-mobile)
- [Show a Different Banner Image on Mobile — SiteSmith Studio](https://sitesmithstudio.com/blog/different-image-mobile-squarespace)
- [Squarespace Banner Size: EXACT Dimension Guide — SEOSpace](https://www.seospace.co/blog/squarespace-banner-size)
