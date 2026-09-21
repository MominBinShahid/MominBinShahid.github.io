#!/usr/bin/env bash
# Post-cutover verification. Usage: bash verify-deploy.sh [origin]
# Enumerated live from the Gatsby build on 2026-09-21. See post-deploy-checklist.md.
set -uo pipefail
ORIGIN="${1:-https://mominbinshahid.github.io}"
pass=0; fail=0; note=0

code() { curl -sL -o /dev/null -w '%{http_code}' --max-time 20 "$ORIGIN$1"; }
chk()  { # path  expected  label
  local c; c=$(code "$1")
  if [ "$c" = "$2" ]; then printf '  \033[32mok  \033[0m %-32s %s\n' "$1" "$3"; pass=$((pass+1))
  else printf '  \033[31mFAIL\033[0m %-32s got %s, want %s — %s\n' "$1" "$c" "$2" "$3"; fail=$((fail+1)); fi; }
info() { printf '  \033[33mnote\033[0m %-32s %s\n' "$1" "$2"; note=$((note+1)); }

echo "verifying $ORIGIN"
echo
echo "root files"
chk /robots.txt            200 "must name MealUnits' sitemap - checked below"
chk /sitemap.xml           200 "diff the URL set against the old one"
chk /404.html              200 ""
chk /.nojekyll             200 "without it Pages runs Jekyll and drops _paths"
chk /favicon.ico           200 "tracked file, should never break"
chk /favicon-32x32.png     200 "was plugin-generated - port it"
chk /sw.js                 200 "must be the self-destroyer, not a cache"

echo
echo "icons (8, all were plugin-generated)"
for s in 48 72 96 144 192 256 384 512; do chk "/icons/icon-${s}x${s}.png" 200 ""; done

echo
echo "deliberately absent"
chk /manifest.webmanifest  404 "deferred on purpose - see decisions.md"

echo
echo "content checks"
if curl -sL --max-time 20 "$ORIGIN/robots.txt" | grep -qi "MealUnits/sitemap.xml"; then
  printf '  \033[32mok  \033[0m %-32s %s\n' "robots.txt" "names MealUnits' sitemap"; pass=$((pass+1))
else
  printf '  \033[31mFAIL\033[0m %-32s %s\n' "robots.txt" "MealUnits sitemap entry MISSING - silent search death"; fail=$((fail+1))
fi

HOME_HTML=$(curl -sL --max-time 20 "$ORIGIN/")
n=$(printf '%s' "$HOME_HTML" | grep -o 'rel="apple-touch-icon"' | wc -l | tr -d ' ')
if [ "$n" = "8" ]; then printf '  \033[32mok  \033[0m %-32s %s\n' "apple-touch-icon" "8 links present"; pass=$((pass+1))
else printf '  \033[31mFAIL\033[0m %-32s found %s, want 8\n' "apple-touch-icon" "$n"; fail=$((fail+1)); fi

if printf '%s' "$HOME_HTML" | grep -q 'name="theme-color"'; then
  printf '  \033[32mok  \033[0m %-32s %s\n' "theme-color" "present (check the value is not the stale #333333)"; pass=$((pass+1))
else printf '  \033[31mFAIL\033[0m %-32s %s\n' "theme-color" "missing - Android address bar"; fail=$((fail+1)); fi

printf '%s' "$HOME_HTML" | grep -q 'property="og:image"' \
  && info "og:image" "present - URL changes on cutover, re-scrape LinkedIn/X" \
  || { printf '  \033[31mFAIL\033[0m %-32s %s\n' "og:image" "missing"; fail=$((fail+1)); }

printf '%s' "$HOME_HTML" | grep -q 'property="og:title" content="About"' \
  && info "og:title" 'still says "About" on the homepage - wrong, fix it'

# /mealunits/ cannot reach the MealUnits project site - Pages serves a project
# only at its repository's exact case - so it falls through to this origin's 404,
# which rewrites the casing. That redirect lived only in the Gatsby 404 component
# and is invisible from the new site, so check it explicitly.
NOTFOUND_HTML=$(curl -sL --max-time 20 "$ORIGIN/404.html")
if printf '%s' "$NOTFOUND_HTML" | grep -q 'MealUnits'; then
  printf '  \033[32mok  \033[0m %-32s %s\n' "404 casing redirect" "/mealunits/ still corrects to /MealUnits/"; pass=$((pass+1))
else
  printf '  \033[31mFAIL\033[0m %-32s %s\n' "404 casing redirect" "MISSING - /mealunits/ now hard-404s. See decisions.md"; fail=$((fail+1))
fi

rss=$(code /rss.xml)
[ "$rss" = "200" ] && info /rss.xml "now 200 - feed was added" \
                   || info /rss.xml "still $rss - fix it or stop advertising it in config"

echo
echo "  $pass passed, $fail failed, $note to look at"
exit $(( fail > 0 ))
