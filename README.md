# atl-film-studios-site

The build target for **atlfilmstudios.com** — Atlanta film studio rental site for Swirl Films.

## Start here

Read **[`manus-brief.md`](manus-brief.md)** first. It's a self-contained 18KB handoff covering:
- 13 pages to build (1 home + 8 set landing pages + 4 utility pages)
- Paste-ready content sources
- Image assets (21 SEO-renamed JPGs at `_upload-ready/`)
- Meta Pixel ID `1373400664837883` + JSON-LD schema (in `squarespace-header-injection-FINAL.html`)
- Form integration spec (dual email delivery, redirect to `/thank-you`, Lead event fire)
- Brand specs (A24/Focus editorial, cyan/teal accent, near-black ground)
- DNS re-point checklist (cutover from current Squarespace)
- Lighthouse acceptance criteria

## Domain

`atlfilmstudios.com` — currently pointed at Squarespace, will be re-pointed once this build is deployed.

## Stack (you pick)

Suggested: **Cloudflare Pages + Cloudflare Pages Functions + Resend** for email forwarding. Or Next.js on Vercel. Or just deploy the static shell in `site/`.

## Acceptance criteria

In `manus-brief.md` §14. Build to that gate before DNS swap.
