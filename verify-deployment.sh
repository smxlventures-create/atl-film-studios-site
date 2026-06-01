#!/usr/bin/env bash
# Verify a Manus-deployed atlfilmstudios.com (or preview URL) against §14 acceptance criteria

URL="${1:-https://atlfilmstudios.com}"
echo "=== Verifying $URL ==="
echo ""

# All 13 pages
PAGES=("" "courtroom" "hospital" "police-bullpen" "interrogation" "psych-wall" "jail-cell" "prison-cell" "led-walls" "about" "faq" "contact" "thank-you")

echo "=== Page reachability (HTTP code) ==="
for path in "${PAGES[@]}"; do
  url="$URL/$path"
  code=$(curl -sL -o /dev/null -w "%{http_code}" -A "Mozilla/5.0" "$url" --max-time 8)
  printf "%3s  %s\n" "$code" "$url"
done

echo ""
echo "=== Pixel + Schema presence on home page ==="
html=$(curl -sL "$URL/" -A "Mozilla/5.0")
echo "Pixel ID 1373400664837883:  $(echo "$html" | grep -c '1373400664837883') matches (need 2)"
echo "fbevents.js:                $(echo "$html" | grep -c 'fbevents.js') (need 1)"
echo "LocalBusiness schema:       $(echo "$html" | grep -c 'LocalBusiness') (need 1)"
echo "ClickToPeerspace listener:  $(echo "$html" | grep -c 'ClickToPeerspace') (need 1)"
echo "ClickToGiggster listener:   $(echo "$html" | grep -c 'ClickToGiggster') (need 1)"
echo "ClickToCall listener:       $(echo "$html" | grep -c 'ClickToCall') (need 1)"

echo ""
echo "=== Peerspace + Giggster outbound links on set pages ==="
for slug in courtroom hospital police-bullpen interrogation psych-wall led-walls; do
  page=$(curl -sL "$URL/$slug" -A "Mozilla/5.0")
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
