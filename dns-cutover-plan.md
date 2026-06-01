# DNS Cutover Plan — atlfilmstudios.com

**Captured June 1 2026** during the Squarespace → Manus build pivot.

---

## Current DNS state

- **Registrar:** GoDaddy
- **Authoritative nameservers:** `ns25.domaincontrol.com.` and `ns26.domaincontrol.com.` (GoDaddy)
- **Current A records (apex):** `198.185.159.145`, `198.49.23.144`, `198.49.23.145` — all Squarespace
- **Current `www` CNAME:** `ext-sq.squarespace.com.` (Squarespace)
- **MX records:** **None** — no email forwarding through this domain. The `tyrell@swirlfilms.com` and `atlfilmstudios@swirlfilms.com` addresses route through the *swirlfilms.com* domain, not this one. **Safe to swap DNS without breaking email.**
- **TXT records:** None observed (no domain verifications to preserve)

## Re-point sequence (when Manus deployment is live)

### 1. Get the new host's DNS targets from Manus

Manus will deploy to one of: Vercel, Cloudflare Pages, Netlify, or its own hosting layer. Each gives a different DNS pattern:

| Host | Apex A record | www CNAME |
|---|---|---|
| Cloudflare Pages | (use Cloudflare nameservers — replace GoDaddy NS entirely) | `<project>.pages.dev` |
| Vercel | `76.76.21.21` | `cname.vercel-dns.com` |
| Netlify | `75.2.60.5` | `<site>.netlify.app` |
| Manus native | TBD | TBD |

### 2. Log into GoDaddy DNS for atlfilmstudios.com

`https://dcc.godaddy.com/control/portfolio/atlfilmstudios.com/settings`

### 3. Swap the records

In the **DNS Records** panel:

- **Delete** the three existing A records pointing to Squarespace (`198.185.159.145`, `198.49.23.144`, `198.49.23.145`)
- **Add** new A record (or AAAA, or set up ALIAS depending on host) pointing to the new host's IP/target
- **Update** the `www` CNAME from `ext-sq.squarespace.com.` to the new host's CNAME target
- **Lower TTL** on both records to 300 (5 min) **before** the swap, so propagation is fast

### 4. Propagation

- TTL was likely 3600 (1 hour) by default. With pre-swap TTL drop to 300, propagation completes in ~5–15 min globally.
- Test from a clean machine / mobile data: `dig atlfilmstudios.com` should return the new IPs.

### 5. HTTPS / SSL

- Cloudflare Pages, Vercel, and Netlify all auto-issue Let's Encrypt certs once they see the domain pointed at them.
- First-issue typically takes 60–120 seconds after the DNS swap completes.
- Verify via `curl -vI https://atlfilmstudios.com/` — should return 200 with the cert from the new host.

### 6. Squarespace cleanup post-cutover

After 48 hours of verified production traffic on the new host:

1. **Cancel the Squarespace Business plan** at https://account.squarespace.com/billing → Subscriptions → Website → Cancel. Saves $276/year (next renewal was July 26, 2026).
2. Optionally export the WordPress XML one more time as a final archive (we already have one from June 1 in `backup-pre-rebuild/`).
3. Squarespace will keep the site dormant for 30 days post-cancel — no traffic, just on ice.

## Risks and gotchas

- **Domain lock at GoDaddy** — if the domain was transfer-locked, no impact on DNS edits (lock only blocks transfers).
- **Email** — no MX records, so no email flow to preserve.
- **Subdomain takeovers** — if Squarespace has any unused subdomains pointing to it (`shop.`, `blog.`, etc.), those become parked once Squarespace cancels. No evidence of any in current DNS though.
- **GoDaddy 2FA** — Spencer or Tyrell needs the GoDaddy account credentials + 2FA token to make the swap.

## When to execute

After Manus passes the acceptance criteria in §14 of `manus-brief.md`:
- All 13 pages built and rendering on Manus deployment URL
- Quote form posts to both `atlfilmstudios@swirlfilms.com` + `tyrell@swirlfilms.com`
- Meta Pixel `1373400664837883` fires PageView + Lead + custom events
- JSON-LD schema passes Google Rich Results Test
- Lighthouse: Performance 90+, Accessibility 95+, SEO 95+

Then make the swap.
