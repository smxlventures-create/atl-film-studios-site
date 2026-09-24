#!/usr/bin/env bash
# Verify a Manus-deployed atlfilmstudios.com (or preview URL) against §14 acceptance criteria

URL="${1:-https://atlfilmstudios.com}"
echo "=== Verifying $URL ==="
echo ""

# Current clean public routes. Set pages live under /sets/, not at the root.
PAGES=("" "sets/courtroom/" "sets/hospital/" "sets/police-bullpen/" "sets/interrogation/" "sets/cyc-wall/" "sets/jail-cell/" "sets/prison-cell/" "sets/led-walls/" "about/" "location/" "faq/" "add-ons/" "contact/" "thank-you/")

echo "=== Page reachability (HTTP code) ==="
for route in "${PAGES[@]}"; do
  url="$URL/$route"
  code=$(curl -sL -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" "$url" --max-time 8)
  printf "%3s  %s\n" "$code" "$url"
done

echo ""
echo "=== Pixel + Schema presence on home page ==="
html=$(curl -sL "$URL/" -A "Mozilla/5.0")
main_js=$(curl -sL "$URL/js/main.js" -A "Mozilla/5.0")
echo "Pixel ID 1373400664837883:  $(echo "$html" | grep -c '1373400664837883') matches (need 2)"
echo "fbevents.js:                $(echo "$html" | grep -c 'fbevents.js') (need 1)"
echo "ClickToPeerspace listener:  $(echo "$main_js" | grep -c 'ClickToPeerspace') (need at least 1)"
echo "ClickToGiggster listener:   $(echo "$main_js" | grep -c 'ClickToGiggster') (need at least 1)"
echo "ClickToCall listener:       $(echo "$main_js" | grep -c 'ClickToCall') (need at least 1)"
echo "GA4 G-PS9VN8XEMR:           $(echo "$main_js" | grep -c 'G-PS9VN8XEMR') matches (need at least 1)"

echo ""
echo "=== Peerspace + Giggster outbound links on set pages ==="
for slug in courtroom hospital police-bullpen interrogation cyc-wall led-walls; do
  page=$(curl -sL "$URL/sets/$slug/" -A "Mozilla/5.0")
  pe=$(echo "$page" | grep -c 'peerspace.com')
  gi=$(echo "$page" | grep -c 'giggster.com')
  ph=$(echo "$page" | grep -c 'tel:.*4702318971')
  printf "%-20s  peerspace=%d  giggster=%d  phone=%d\n" "$slug" "$pe" "$gi" "$ph"
done

echo ""
echo "=== /thank-you noindex check ==="
ty=$(curl -sL "$URL/thank-you" -A "Mozilla/5.0")
echo "Lead pixel fire:    $(echo "$ty" | grep -c "fbq..'track'..'Lead'")"
echo "noindex meta:       $(echo "$ty" | grep -ciE 'meta name="robots"[^>]*noindex|noindex')"

echo ""
echo "=== Logo + assets ==="
echo "Logo PNG referenced: $(echo "$html" | grep -c 'atl-film-studios-logo-2025')"
echo "atl-film-studios-* image refs: $(echo "$html" | grep -oE 'atl-film-studios-[a-z-]+' | sort -u | wc -l | tr -d ' ')"

echo ""
echo "=== Done. Compare to §14 acceptance criteria in manus-brief.md ==="
