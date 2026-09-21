# Decisions

Each entry: what we chose, why, and what it costs. The reasoning is the point —
a bare conclusion is useless in six months.

---

## Framework: Astro 7

Scored against Eleventy, Hugo, SvelteKit static, Next static export, plain
Vite, and staying on Gatsby. Astro won 135 to Eleventy's 117, Hugo 112,
SvelteKit 106, Vite-DIY 93, Next 90, Gatsby 75 — weighted heaviest on solo
maintainability, then output speed, markdown pipeline, design freedom, longevity.

It is the only option that wins both halves of the brief: zero JavaScript
shipped by default, so the landing page is real HTML and CSS, while `.astro`
files are JSX-shaped so React instincts transfer immediately.

**We had this attacked deliberately.** The attack landed real bruises:

- Two majors in one year (v6 March 2026, v7 June 2026, 3.5 months apart)
- v7's new Rust markdown engine (Sätteri) is **pre-1.0**, and remark plugins
  *silently* stop working on upgrade — build passes, effect vanishes
- Security support covers current major plus one only

It survived because Expressive Code already ships native Astro 7 support (that
covers the hardest feature — code blocks with language labels and copy button),
a real 1,558-post blog migrated 6→7 in hours, and the runner-up moved: **Eleventy
picked up stewardship risk** when Font Awesome launched a monetisation pivot in
March 2026, with part of its community defensively pinning old versions.

Hugo is the coherent dissent — a pinned Go binary would build this site unchanged
in 2031 with no npm supply chain. It loses because Go templates fight the bespoke
design work that is the entire point here.

**Conditions attached:**
- Start on 7.x, do not pin to 6
- Set `compressHTML: true` explicitly
- No exotic remark plugins; no custom Sätteri plugins until it hits 1.0
- Budget one upgrade window per year, 2–6 hours
- **Keep signature CSS/JS framework-agnostic** — the OKLCH accent, view
  transitions, scraper-proof CSS, console easter egg all live in plain files
  Astro merely links. That makes Astro a thin replaceable shell, and exit cost
  in 2029 is days rather than a rewrite. This is the real durability strategy.

**Starter:** the official `blog` template. Five-ish files, correct plumbing, no
design language to strip. Astro Cactus and AstroPaper are references to lift
from, not bases. Astro Nano is **dead** — last commit June 2025, two majors
behind.

---

## Node versions

- **New site: Node 24** — current Active LTS since Oct 2025, EOL April 2028.
  Astro 7 requires 22+. Node 26 becomes LTS late Oct 2026; bump whenever.
- **Archive build: Node 16** — pinned in this repo, used once for the final
  Gatsby 2 build, then never again.

Two repos with wildly different Node versions is fine and standard. `.nvmrc` per
repo, `setup-node` per workflow. Never regenerate the old repo's lockfile under
a newer Node — npm 8 wrote lockfileVersion 2.

---

## Origin separation: move MealUnits to `mealunits.github.io`

**The finding.** `mominbinshahid.github.io` is one origin. IndexedDB,
localStorage and Cache Storage key on scheme+host+port — **path is irrelevant**.
MealUnits persists insulin doses and glucose readings in IndexedDB. So any
third-party script on a *blog* page runs in the same origin and can reach them.
`indexedDB.databases()` has been Baseline since May 2024, so the database name
need not even be guessed.

MealUnits' own CSP protects only MealUnits' own documents. It has no reach into
blog pages. And CSP cannot express "load this script but deny it storage" —
CSP governs loading, never capabilities. Once running, a script *is* the origin.

**Probability is low.** Every third-party script compromise on record —
polyfill.io (June 2024), Browsealoud (2018), Ticketmaster/Inbenta, British
Airways — involved a small or abandoned vendor. Google and Cloudflare serving
infrastructure have no known compromise.

**Consequence is not.** A same-origin script can *write* as well as read.
Tampered target glucose or correction factors in a dose calculator is a
physical-safety issue. It can also iframe `/MealUnits/` and drive its DOM,
unregister its service worker, or poison its caches.

**Decision (2026-09-17): PARKED.** Momin's call — build the site with no
restrictions first, revisit the origin question once the overhaul ships. Recorded
here so it is a deliberate deferral, not an oversight.

The analysis still stands if it is picked up later: the only confirmed user is
Momin's brother, so migration cost today is one export and one import, and it
only goes up from here. Nothing about building the blog first forecloses it.

**What parking it costs in practice: nothing we are not doing anyway.** Momin has
decided the blog uses whatever tools it needs, from reputable vendors. Captcha,
giscus, analytics and script embeds all ship normally.

Precedent: GitHub itself moved Pages off `github.com` to `github.io` in April
2013 for exactly this reason, and put `github.io` on the Public Suffix List.

**Refuted alternative:** moving the *blog* to a custom domain does not help —
GitHub cascades a user-site custom domain onto all project sites, so MealUnits
would land on the same new origin anyway.

**Also considered and rejected:** encryption at rest (a same-origin script
keylogs the passphrase or writes garbage — fails the integrity threat);
sandboxed-iframe jails (works in principle, impractical per vendor).

**Migration sequencing — bridge before move:**
1. Ship an export/"we've moved" release at the OLD origin first
2. Transfer repo to the org, rename `mealunits.github.io`, set `BASE` to `/`
3. Recreate a stub `MealUnits` repo on the personal account at the old path,
   carrying a redirect, a self-destructing `sw.js`, and the export code
   **permanently** — so dormant users can recover data years later
4. Bridge must use `window.open` + `postMessage`, **not an iframe** — `github.io`
   is on the Public Suffix List, so the two are cross-site and an iframe's
   storage would be partitioned

**What moving does NOT do:** MealUnits stays unable to load third-party scripts.
That constraint is correct and permanent for a medical app. The point is to stop
it governing a personal blog. A no-JS analytics *pixel* is safe there — an
`<img>` cannot execute.

**Optional later:** a personal domain (~$10.44/yr at Cloudflare Registrar) plus
Cloudflare proxy would add real response headers — CSP, `immutable` caching,
`Link` preload — which GitHub Pages cannot do at all. Free tier covers it (10
Transform Rules, 10 Cache Rules). Cost: GitHub's Let's Encrypt renewals fail
while proxied, producing delayed 526 errors months later; needs an ACME
Configuration Rule. Neither vendor officially supports the arrangement. If
buying a domain, DNS-only (grey cloud) captures the important part with near-zero
new failure surface.

---

## Archive: `legacy-site` repo

> **SUPERSEDED IN PART — 2026-09-21.** `legacy-site` is a *live* site, not a frozen
> one: working Actions, working contact form, working analytics. Ignore "frozen"
> and "never builds again" below; everything else here still applies.
>
> **Why it changed, so this doesn't read as a flip-flop.** The frozen decision was
> made while assuming the old code would stay inside the current repo — where a
> committed static build is the sane way to keep an archive around without it
> competing for the repo's identity. Once the cutover became Path B, the old code
> gets a repo of its own, and a repo of its own has no reason to be crippled. Same
> reasoning, different premise.

The old site goes to a separate repo, served at
`mominbinshahid.github.io/legacy-site/`. On GitHub Pages the **repo name is the
URL path** — they cannot be decoupled.

`legacy-site` over `v1`, `archive` or `legacy` so those names stay free for
actual future tools. Long name is fine; nobody links to an archive.

A rebuild is **mandatory** — `config.js` has `pathPrefix: ''` and the build
script is plain `gatsby build`. Moved under a prefix unbuilt, every asset 404s.
Freeze branch: set `pathPrefix: '/legacy-site'`, build with `--prefix-paths`,
**drop `gatsby-plugin-offline`**, add `noindex, follow` meta.

~~That repo then never builds again — commit the static output, enable Pages
"deploy from branch", done.~~ **Reversed 2026-09-21:** it keeps its workflow and
its secrets and builds like any other site.

**Gotcha:** `config.js` throws in production if `CONTACT_FORM_ENDPOINT` or
`GA_TRACKING_ID` are unset. Supply them or patch `checkEnvVars` on the freeze
branch.

---

## Service workers

**The new site gets none.** GitHub Pages already serves ETags and a 10-minute
cache; Astro ships hashed filenames and near-zero JS. A worker buys milliseconds
and offline reading nobody asked for, and costs re-entry into the exact bug class
we are escaping. Use Astro's built-in prefetch instead.

**A self-destroying worker ships at `/sw.js` in the same deploy as the new site,
and stays there permanently.** The old `gatsby-plugin-offline` worker is
registered at scope `/` with `skipWaiting` + `clientsClaim`, serves all
navigations from a cached app shell, and runtime-caches CacheFirst with **no
expiration**. Without the destroyer, returning visitors see the old site
indefinitely.

**Critical:** `caches.keys()` is origin-wide. The destroyer must delete only
caches prefixed `gatsby-plugin-offline` — a naive "delete all" would wipe
MealUnits' `mealunits-*` caches.

**CORRECTED 2026-09-21 — `/sw.js` is NOT burned.** The earlier claim that a future
real worker must use a different filename was wrong. Momin pushed back and the
mechanics are on his side:

- A registration is bound to (scope, script URL). Browsers re-fetch the script on
  navigation and install it if the bytes differ.
- After the destroyer calls `registration.unregister()`, **no registration exists**,
  so the browser stops polling entirely. Nothing happens again unless a page
  explicitly calls `register('/sw.js')`.
- A stale visitor who never ran the destroyer still has the old Gatsby worker
  polling `/sw.js`. Whatever sits there gets installed and replaces it.

So `/sw.js` is reusable for a real worker later. **The one permanent constraint:**
whatever lives at `/sw.js` must carry the `gatsby-plugin-offline` cache cleanup in
its `activate` handler *forever*, because there is no point at which every
returning visitor is guaranteed to have been destroyed — someone who last loaded
the site in 2024 can turn up in 2029 with the original worker still installed.

Cleanup must be an **allowlist** (delete only names matching known
`gatsby-plugin-offline` / workbox prefixes), never a denylist ("everything except
`mealunits-*`"). If MealUnits ever adds a cache under an unfamiliar name, an
allowlist leaves it alone and a denylist destroys insulin data.

---

## Theming

**Dark mode via design tokens**, not the current whole-page `invert(92%)
hue-rotate(180deg)` filter. CSS custom properties resolved through
`light-dark()` under `color-scheme: light dark`, with a `data-theme` attribute
on `<html>` for explicit overrides. `light-dark()` has been Baseline since May
2024.

Visitors who haven't overridden their OS preference get the right theme from
**pure CSS, zero JS, zero flash**. Only explicit overrides need the ~300 byte
blocking inline script in `<head>`.

**The switch animation:** View Transitions circular reveal — a circle grows from
the exact pixel clicked. Baseline across all engines since Firefox 144 (Oct
2025). Unsupported browsers get an instant swap, which looks fine.
`document.startViewTransition()` **needs a guard** (throws where undefined).
Browsers do **not** auto-suppress view transitions under `prefers-reduced-motion`
— gate it manually.

**Random accent, done properly:** randomise **hue only** (0–359) in OKLCH, with
lightness and chroma fixed per mode. Contrast is then guaranteed by construction
rather than by hand-picking 38 hex codes, several of which currently fail
contrast. Dark mode gets lighter, less saturated accents automatically. A
whisper of the hue tints page surfaces so each visit shifts subtly. The colour
picker becomes a hue slider, so pinned colours are always readable.

**What this deletes:** `dark.less` entirely, the counter-invert list, the
`<emoji>` tag system and its React warnings, the AntD Affix jitter fix and both
FIXME essays, "transitions disabled because the filter artifacts", the
colour-picker-disables-dark-mode dance, `gatsby-plugin-dark-mode`, the
CustomEvent bus, and the hardcoded `body class="light"`.

---

## Styling: no component library

Drop Ant Design entirely. It is an enterprise data-app kit imposing its own
visual language — the opposite of elegant and personal — and v5+ moved to
runtime CSS-in-JS, hostile to a zero-JS static site.

Drop LESS too. Native CSS has variables, nesting, `color-mix()` and container
queries. Design tokens as custom properties in one global file, per-component
scoped styles in `.astro` files.

Fonts self-hosted via Astro's Fonts API — no runtime calls to
fonts.googleapis.com. This retires `gatsby-omni-font-loader`.

> Note on Fira Code: it sits second in the font stack in `theme.less` but was
> never loaded, so the fallback only worked for visitors who had it installed.
> The `=> ==> ===` strings in the React 17 post were ligature tests.

---

## Resume: HTML page generated from Google Docs

The current `react-pdf` viewer is the largest JS cost on the site and
reimplements what browsers do natively.

**Source of truth stays the Google Doc.** Verified 2026-09-15 by direct request:
a link-shared Google Doc serves `export?format=docx`, `format=pdf` and
`format=html` **unauthenticated** — no API, no OAuth, no CI secret. The exported
docx uses standard Word style IDs that `mammoth` already understands.

**Design:** a manually-triggered workflow fetches the docx and the PDF *from the
same revision*, runs `mammoth` with an explicit style map, and commits both.
Normal builds never touch Google — **the trap version is live-fetching on every
build, which makes Google's uptime your deploy's uptime.**

Momin's workflow: edit the doc, click Run workflow (works from a phone), check.
~5 minutes, no local checkout.

**Conditions:** real Heading styles in the doc, not bold text faking headings —
the build fails loudly on unmapped styles, which is the point. No text boxes,
no columns, no layout tables. The web page will not *look* like the PDF; content
identical, appearance deliberately better.

**Mobile context:** direct PDF links now work everywhere including Android
Chrome 136+. It is *embedding* that is still broken — iOS Safari renders only
page 1 of an embedded PDF as a flat image, which would silently lose half a
two-page resume. That is why the custom viewer existed; the fix is to not embed.

**SEO:** HTML pages outrank PDFs roughly nine times out of ten. A real `/resume`
page with `Person` JSON-LD becomes a strong result for "Momin Bin Shahid".

---

## Quotes

**Bake a pool, sample it client-side.** Commit a curated JSON pool and pick
randomly on each page load. New quote every refresh, no network, no failure, no
layout shift. The current implementation renders a spinner then `null` when all
three APIs fail — exactly the empty-box-that-looks-broken Momin rejected.

**Key insight: CORS only constrains runtime.** Fetching at build time makes every
previously-blocked API usable again.

**Datasets (all of them, deduped):** micheleriva/the-quotes-database (5,421,
MIT), nirajgiriXD/garden-of-quotes (822, CC0), skolakoda programming quotes
(501). No recurring job needed.

**Live layer (optional garnish):** try a CORS-friendly API, swap the text on
success, silently keep the baked quote on failure.

**VERIFIED BY REQUEST 2026-09-21** — every candidate hit directly with an
`Origin: https://mominbinshahid.github.io` header, checking both status and
`access-control-allow-origin`. The live pool goes from **3 to 8**.

| API | Status | Note |
|---|---|---|
| `motivational-spark-api.vercel.app/api/quotes/random` | **OK, CORS** | already active |
| `dummyjson.com/quotes/random` | **OK, CORS** | already active |
| `api.adviceslip.com/advice` | **OK, CORS** | already active |
| `api.quotable.kurokeita.dev/api/quotes/random` | **OK, CORS** | the maintained quotable fork |
| `www.stoic-quotes.com/api/quote` | **OK, CORS** | |
| `api.github.com/zen` | **OK, CORS** | GitHub-operated, plain text, no author. Rate-limited 60/hr per IP unauthenticated |
| `thequoteshub.com/api/random-quote` | **OK, CORS** | |
| `poetrydb.org/random` | **OK, CORS** | returns whole *poems* — different flavour, likely too long for a quote slot |

**Dead — connection failed outright:** `zenquotes.io`, `api.quotable.io`,
`api.themotivate365.com`. Plus all `*.herokuapp.com` quote APIs.

**Alive but no CORS, so unusable from the browser:** `favqs.com/api/qotd`,
`www.affirmations.dev`. Both return 200 with no `access-control-allow-origin`.

`src/utils/api.js`'s `fetchRandomQuotes` points at dead hosts — drop wholesale.

---

## Contact form

**Web3Forms primary, FormSubmit documented as fallback, `mailto:` always
present.** FormSubmit (the current service, confirmed from README line 24) still
works but has no dashboard, so failures are silent.

The current AJAX-only submission **silently disables** FormSubmit's reCAPTCHA
and `_autoresponse`. Fix: a real `<form action= method=POST>` with a hidden
redirect to an own `/thanks` page, progressively enhanced by JS for inline
states. Works without JS, keeps people on the site either way.

Momin's email is **not exposed** — the deployed site uses FormSubmit's 32-char
random alias, not the raw address. Verified.

Spam: hiding the address and server-verified captcha are what work. Honeypots
fool lazy bots only. Client-side timing checks and obfuscated endpoints are
theatre — anything computed in the browser ships its own recipe.

---

## Comments: giscus, vendored

The loader is MIT licensed, so it can be vendored onto our own origin rather than
loaded from `giscus.app`. The widget itself is a cross-origin iframe and
therefore harmless. Lazy-load so it costs nothing until scrolled to.

---

## Analytics

**GoatCounter's no-JS pixel** gives real pageviews and paths with zero script.
That is the choice while origins are shared, and it remains defensible after.

Cloudflare Web Analytics is the alternative once MealUnits has moved — free
forever, no consent banner, includes Core Web Vitals, ~10KB gzipped. Six-month
retention, unsampled only 7 days, blocked by ad-blockers.

**Warning if ever proxying through Cloudflare:** since ~Sept 2025 they
auto-inject a RUM beacon by default on free proxied zones. Third-party JS in your
origin, added without asking. Turn it off deliberately.

Add at launch either way — comparing old against new needs a baseline.

MealUnits gets the same note in its own backlog (delivered 2026-09-15); its
strict CSP blocks beacon-style analytics by design, and a pixel is the safe shape
there.

---

## i18n: parked, with four disciplines adopted now

Not building it. Urdu, German, Spanish are a maybe. But four preparations cost
essentially nothing and are better practice regardless:

1. **CSS logical properties** (`margin-inline`, `padding-inline`) from the first
   stylesheet. Urdu is RTL; retrofitting physical left/right later is the real
   rewrite, and the only one of these that genuinely hurts to skip.
2. **Explicit slugs in frontmatter**, so file location never dictates URLs.
3. **English stays unprefixed** — `/blog/post`, never `/en/blog/post`. Other
   languages arrive additively at `/ur/...`. Momin was explicit about this.
4. **UI strings in one file** rather than scattered literals.

---

## Small things that will bite

- **Astro does not rewrite links.** Unlike Gatsby's `pathPrefix`, every internal
  href must go through `import.meta.env.BASE_URL`. Write one `href()` helper on
  day one or a later path move breaks every link and canonical silently.
- **Sitemap emits `sitemap-index.xml`**, not `sitemap.xml` — a hard limit.
  Search Console accepts an index file identically, zero downside. Reference the
  exact filename in robots.txt and `<head>`.
- **robots.txt** is a static file in `public/`, no plugin. Must carry the second
  `Sitemap:` line for MealUnits — until MealUnits moves origin, at which point it
  gets its own.
- **Cross-document view transitions need no fallback code.** An unrecognised
  at-rule is dropped; navigation is just normal. Firefox has not shipped it.
- **`sharp` must stay pinned below 0.33** in this repo — `gatsby-plugin-sharp`
  calls `sharp.simd()` at module load and 0.33 removed it.

---

# Revisions — 2026-09-17

Decisions taken after the first pass, recorded in order.

## Origin separation — parked

See the amended section above. Build unrestricted, revisit after launch.

## Captcha — wired, shipped off

Build the contact form so captcha is a single config flag, and launch with it
**off**. Honeypot plus the form backend's server-side filtering covers a personal
site's volume; the current site has run with `_captcha: false` for years without
a spam problem. Turning it on later is a config change, not a code change.

Constraint found while checking: **Web3Forms verifies Cloudflare Turnstile only on
its paid plan** ($12/mo). The free plan gives server-verified hCaptcha. So if
captcha is ever switched on, hCaptcha is the free path.

A captcha the backend does not verify is decoration — the server-side half is the
only half that matters.

## Analytics — GA4 stays on the old site, Cloudflare goes on the new one

Momin's call, and it is right. Adding a second beacon to a site being deleted is
wasted work.

The one objection, recorded and dismissed: numbers from two different tools are
not comparable across the cutover — GA4 counts cookie sessions, Cloudflare counts
visits, ad-blockers hit them at different rates. That only matters if comparing
traffic is a goal, and it is not. The old/new comparison Momin wants is about
**features**, which is what `legacy-site` is for, and about **speed**, which
Lighthouse answers on demand.

### Where GA4 lives today (for removal)

| File | Line | What |
|---|---|---|
| `.github/workflows/deployment.yml` | 49 | CI writes `GA_TRACKING_ID` from a repo secret into `.env.production` |
| `config.js` | 32 | `googleAnalyticTrackingId: process.env.GA_TRACKING_ID \|\| ''` |
| `config.js` | 14 | **throws** in production if the var is missing |
| `gatsby-config.plugins.js` | 201–217 | `gatsby-plugin-google-gtag`, `unshift`ed to the front, `anonymize_ip: true`, `head: true` |
| `.example.env` | — | documents the contract |

Note: a GA4 Measurement ID is **public by design** — it ships in the page source
of every site using it. Keeping it in GitHub Secrets protects nothing. This is
unlike the FormSubmit alias, which genuinely does hide an email address.

## Google Search Console verification

Lives at **`src/components/Seo/index.jsx:82`**, token
`fkilO4peF6pbwOrFAy7QqM0HV9ccL8A2dH58RYnGfTc`. Confirmed live on the deployed
homepage.

**It authenticates the MealUnits property too** — the HTML tag proves control of
the host, and both properties sit on this one host. Dropping it breaks both.

Carry it into Astro's base head component so every page emits it, rather than the
current five-of-eight coverage.

## Markdown pipeline — native Sätteri, no remark/rehype

Astro 7 renders markdown with Sätteri, a Rust processor. **remark and rehype
plugins silently stop running** unless `@astrojs/markdown-remark` is installed and
set as the processor — build passes, effects vanish.

Sätteri has GFM, heading IDs, smart punctuation, directives and math built in, and
`astro-expressive-code` 0.44.2 already supports it natively. Nothing on the
feature list needs the legacy pipeline, so we do not adopt a deprecated one.

Corollary: do not write custom Sätteri plugins until it reaches 1.0.

## Image processing — sharp, and it is not inherited from Gatsby

sharp is Astro's own image engine, in Astro's `optionalDependencies` at
`^0.35.4`; `astro:assets` uses it for every `<Image>`, `<Picture>` and markdown
image. Gatsby used it too, but that is convergence on the standard, not
inheritance.

Alternatives lose on merit: `jimp` is pure JS and far slower, `@squoosh/lib` was
abandoned by Google, `imagemin` is unmaintained, and Astro's own `squoosh` service
was deprecated in favour of sharp. The real alternative is no optimization at all.

## Versions to start on — verified 2026-09-17

| | Version | Note |
|---|---|---|
| `astro` | **7.3.2** | 7.3.3 shipped 2026-09-16; pin one patch back for soak |
| Node | **24.21.0** | Active LTS. Node 26 becomes LTS 2026-10-28 |
| `@astrojs/mdx` | 8.0.1 | v8 is ~3 weeks old — expect early-major churn |
| `@astrojs/rss` | 4.0.19 | |
| `@astrojs/sitemap` | 3.7.4 | emits `sitemap-index.xml`, a hard limit |
| `astro-expressive-code` | 0.44.2 | correct package; `satteri-expressive-code` is its internal plugin, not an integration |
| `typescript` | **~6.0.3** | pin to 6.x — `@astrojs/check` does not accept TS 7 yet |
| `mammoth` | 1.12.3 | |
| `sharp` | **0.35.4 exactly** | |

### Security floors — never let a lockfile drift below these

- **`astro` ≥ 7.2.8** — critical RCE via AVIF image optimization (GHSA-26w7-cxv4-gfx2)
- **`vite` ≥ 8.0.16** — `server.fs.deny` bypass (GHSA-fx2h-pf6j-xcff)
- **`sharp` = 0.35.4** — libheif vulnerabilities in 0.35.0–0.35.3 (GHSA-rgj7-g3m4-5g8c)

### Two things that will bite during the build

- The Rust compiler **errors on unclosed or malformed HTML** instead of silently
  fixing it
- `compressHTML` defaults to `'jsx'`, collapsing whitespace between inline
  elements React-style — set `compressHTML: true` explicitly

## Deprecated by v6, do not reach for

Legacy content collections API (Content Layer only now) · `<ViewTransitions />`
(now `<ClientRouter />`) · `z` imported from `astro:content` (import from
`astro/zod`) · the experimental flag on the Fonts API (now stable)

## Design — round one rejected

The first four directions were rejected as too thin and too safe: hero fragments
with no blog index and no post page, and invented bio copy instead of Momin's own
writing. `content.md` was written in response and is now the source material.

Standing requirements for any design round, as of 2026-09-18: use his real copy,
show both themes, and build **a real landing page** — full-width, no two-column
sidebar, selling credibility by category rather than by achievement.

Two earlier requirements are withdrawn. "No landing page" was about the weak
splashes he'd been shown, not the format. "Show the blog index and a full post
page" is moot now that the blog has no launch surface. Live constraints are in
`content.md` under "Design constraints from Momin"; that section is the source of
truth and this one is history.

---

# Revisions — 2026-09-21

This session settled the build approach, the toolchain and the cutover. Read this
section before the ones above it; where they disagree, this one wins.

## ⚠ `legacy-site` is ACTIVE, not frozen — supersedes the section above

The "Archive: `legacy-site` repo" section says the old site is frozen, never builds
again, and ships committed static output. **Momin overruled that on 2026-09-20.**
He wants it treated as a live site: working Actions, working contact form, working
analytics, all nine demo posts carried over, nothing left behind.

So `legacy-site` keeps its workflow and its secrets rather than shipping a dead
build. Everything else from that section still holds — `pathPrefix: '/legacy-site'`
and `--prefix-paths`, drop `gatsby-plugin-offline`, add `noindex`, supply
`CONTACT_FORM_ENDPOINT` and `GA_TRACKING_ID` or the production build throws.

## Cutover: Path B, replace in place

`MominBinShahid.github.io` stays the main repo permanently. `legacy-site` is created
and the old code pushed there **first**; only then is the default branch replaced.

Decided on the stars finding: repo renames carry stars, forks and watchers with the
repo object, so a rename would have moved 5 stars / 2 forks / 1 watcher onto the
archive and started the real site at zero. Zero downtime was the second reason.
Full runbook, both paths, and the abort procedure are in `cutover.md`.

## Build order: capability first, design last

Three layers, and only the top one is touched by a redesign:

```
src/content/ + src/data/    content. zero presentation. survives any revamp.
src/lib/                    logic. pure functions, no DOM. unit-tested.
src/theme/ + layouts/ + components/   ← the layer a redesign replaces
```

Two rules make this real: **no component hardcodes a colour, font, size or spacing
value** — everything through tokens; and **phase one has no layout**, just semantic
single-column document flow. A plain semantic document can become anything later; a
designed layout can only become a similar layout.

Honest limit, stated to Momin: tokens give a full palette-and-type revamp for one
file's worth of edits. They cannot turn a single column into a masonry grid — layout
is markup. What the split guarantees is that content is never re-derived, data is
never re-plumbed, logic is never re-tested, and the site never breaks mid-redesign.

`base` and `site` are **environment-driven** from the first commit, so preview-at-a-
subpath and serve-at-root are the same build with one variable. Removes the single
most likely cutover failure.

## Testing: the trophy, not the pyramid. No mutation testing.

Momin ruled out Stryker for this repo — *"this is not very critical code like we
have in MealUnits... it's my blog, let's keep it chill."* Agreed, and the modern
frontend consensus backs it: static analysis at the base, a thin integration band,
a few E2E, unit tests only where logic is genuinely tricky.

- **Static analysis carries most of the weight, at zero test code** — TypeScript
  strict, `astro check`, ESLint, and Zod schemas on content collections so a
  malformed post fails the build.
- **Smoke suite** — ~8 Playwright tests, every page type loads and renders.
- **Link checking** (`lychee`) — the highest-value check on a content site, because
  broken internal links and dead anchors are the bug class that actually happens.
- **Golden test** for the résumé render — one checked-in expected output, catches
  every parser regression.
- **axe-core** on built pages, **Lighthouse CI** with a hard performance budget.
- **Synthetic monitoring** — a scheduled workflow hitting the live site, because a
  green build with a silently failed deploy is the failure mode that bites.
- Optional: **fast-check** property tests for the pure functions — the honest
  alternative to mutation testing at this scale.

**The one exception argued for and accepted:** a real Playwright test for the
service-worker cutover — seed the old Gatsby worker, assert the new site kills its
caches. Not because the blog is critical, but because that failure is *invisible*
from a fresh browser.

**Refused:** render-a-component-and-assert-it-contains-a-string tests. **Deferred:**
visual regression — valuable as a guard *after* the design settles, pure noise
during an active design pass.

Target: ~25–30 tests, suite under a minute.

## Toolchain

- **npm, not pnpm.** pnpm is better software; npm ships inside Node and cannot be
  abandoned independently. pnpm's wins are monorepos, large dependency trees and
  strict `node_modules` — none apply to ~20 deps in one repo. Trigger to switch:
  multiple packages. Migration is `pnpm import`, about five minutes, not a one-way
  door. **Do not build on Corepack** — it is being unbundled from Node.
- **Node, not Bun or Deno**, and the deciding factor is `sharp`: a native module
  central to every image, with prebuilt arm64 binaries targeting Node. Running it
  on an unsupported runtime reintroduces exactly the class of problem the Gatsby
  build had.
- **Version pinning via `.nvmrc`** (read by fnm, nvm, asdf, mise) **plus a `volta`
  key in package.json plus `engines`.** No tool is imposed on anyone.

## No UI framework

Astro ships zero JS by default. The interactive surface is a theme toggle, a mobile
menu, a settings surface and one cursor interaction — each 20–40 lines of vanilla in
a `<script>`. An island framework means shipping a runtime (Preact ~4kb, Lit ~6kb,
Solid ~7kb) to render things that need no runtime.

**Trigger to add one:** stateful UI that re-renders from data — blog search
filtering as you type, tag filters with URL state, a form with per-field validation
and a submit state machine. The first is plausible once there are enough posts.

**When it happens: Preact.** Smallest React-compatible option, `preact/compat` opens
the React ecosystem, and Momin already knows React so the learning cost is zero.
Solid's rendering model is better on paper but the difference is invisible on small
islands.

## CSS: no Tailwind either

The existing "no component library" section covers Ant Design and LESS. Tailwind was
raised separately and ruled out for a specific reason: **it puts design values in the
markup**, which directly defeats the layer separation above. With tokens a revamp is
one file; with Tailwind it is every component's class strings. v4's CSS-first
`@theme` narrows the gap but layout decisions still live in the HTML.

Sass is skipped because native CSS ate it — nesting, `:has()`, container queries,
cascade layers, custom properties, `oklch()`, `color-mix()`.

**Browser support, Momin's call:** use every modern feature, add fallbacks
underneath, let old browsers get a working-but-plainer page. Never hold a feature
back. Concretely — hex declared first with `oklch()` overriding inside `@supports`,
container queries with a media-query fallback, `:has()` only where its absence costs
polish rather than function. Autoprefixer driven by a Browserslist query.

## Blog: plain markdown, no MDX

Momin writes `.md`, full stop. MDX would make each post a *code file* — it compiles,
so one typo fails the whole build; it imports components by path, so renaming a
component breaks old posts; it can't be written in a plain editor; and it doesn't
port off Astro.

Nothing is lost. Sätteri has GFM, footnotes, heading IDs, smart punctuation and
**directives** built in, so rich blocks stay plain text:

```markdown
:::warning
The sharp binary doesn't exist for arm64.
:::
```

One render rule maps that to the callout markup. **The post says what it is; MDX
would make it say how to render.** The first survives refactoring.

Per-post theming comes from frontmatter (`theme: terminal`) read by the layout — no
MDX needed for that either.

**Fully reversible:** `@astrojs/mdx` is an integration; `.md` and `.mdx` coexist. Add
it later if a post ever genuinely needs an embedded interactive component.

## Quotes: three tiers, and `/quotes` is curated

Supersedes the shape described in the Quotes section above.

1. **One hand-picked constant** in the HTML. Only ever seen with JS off or if
   everything else fails. Momin's reasoning, and it's right: a build-time random
   pick leaves an arbitrary quote sitting there for however long between deploys,
   which could be six months. Candidate shortlist of ten sent 2026-09-21; the Turing
   closing line from *Computing Machinery and Intelligence* (1950) is the
   recommendation.
2. **50 quotes inlined per build**, sampled from the pool, **shuffled once per
   session and walked without replacement.** ~3KB gzipped. Shuffling without
   replacement is what makes 50 enough — picking randomly each time gives a repeat
   around the seventh pick by the birthday effect; walking a shuffled list gives
   fifty refreshes before any repeat.
3. **Live API layer, pure garnish.** Shuffle the enabled list, try sequentially with
   a 1.5s timeout, cap at three attempts. On refresh: show a new local quote
   *instantly*, fire the chain, and only accept a response landing within ~700ms —
   text changing under someone's eyes a second after they clicked is worse than not
   changing. Race guard so a slow response from click one can't overwrite click
   three. No sessionStorage — dropped as state that wasn't earning its place.

Config is one array of `{ id, url, enabled, weight, parse, note }`. Every entry
carries its limitation **as a code comment**: `api.github.com/zen` is rate-limited
60/hr per IP and gets a lower weight; `poetrydb` ships `enabled: false` because it
returns whole poems; `favqs` and `affirmations.dev` stay in, disabled, noted as
200-but-no-CORS so nobody rediscovers that.

**`/quotes` is curated, 60–100, not the full 6,700.** Bulk quote datasets are riddled
with misattribution — the Gandhi "be the change" line, the Einstein insanity line.
A single rotating quote is low-stakes decoration; a *published collection* is a
curation claim, and unverified attributions on a credibility page are an own-goal a
developer audience will spot. The 6,700 stays invisible, feeding tier 2. If a
browsable archive is ever wanted it goes behind a "browse all" link, chunked at 200
per load, framed as an archive rather than a recommendation.

**Misattributed quotes become a feature, not an omission.** Momin's idea, 2026-09-21,
and it is better than dropping them. The famous fakes — "be the change" attributed
to Gandhi, the insanity line to Einstein — get shown *with the correction*: the
attribution struck through, a note saying who it isn't and that the real source is
unknown. A page that says "widely attributed to Einstein; he never said it" is more
credible than one that quietly omits them, because it demonstrates the collection
was actually checked. Worth its own small section rather than scattering them.

**Display full provenance** — author, source, year, category where they exist,
degrading to author alone, never to "Unknown". Caveat: the bulk datasets carry author
and sometimes tags, almost never book titles or years, so a small hand-curated tier
will always look better than the bulk.

**How the curation actually works.** Not by filtering the 6,700 — those carry author
only, so verifying provenance for 100 of them would mean 100 individual lookups.
Instead the list gets *assembled from canonical sources*: quotes whose book, paper or
lecture is documented, the way the shortlist of ten was built (Turing 1950, Dijkstra
EWD898, the SICP preface, Hoare's 1980 Turing Award lecture). Tractable, and every
entry arrives already verified rather than needing to be checked afterwards. Momin
reviews and cuts. Runnable in parallel with the build — it blocks nothing.

## Cross-references added this session

- `personal-details.md` — photo, DOB and location, with the sourced evidence.
  Verdicts: no hero portrait (optional slot on About), DOB removed from site *and*
  résumé, "Karachi, Pakistan" stated and always paired with markets served.
- `cutover.md` — both cutover paths, the service-worker risk, `legacy-site`
  requirements, the runbook and the abort procedure.
- `content.md` — "Design constraints from Momin" is the live source of truth for
  design, plus the settled design answers table.
- `profile-readme-variants.md` — three profile README drafts and the finding that
  the hosted widget ecosystem has largely gone down.

---

## Deferred with a trigger — the web app manifest

**Decided 2026-09-21 (Momin).** The new site ships **no `manifest.webmanifest`**. It is not
installable, which is consistent with the no-PWA and no-service-worker decisions.

**The trigger: the moment anyone says the site should be installable, addable to a home
screen, launchable in its own window, or "app-like" — this decision is void and the
manifest comes back.** It is not optional at that point: without it there is no install
prompt on Android and no standalone window anywhere. Chrome additionally requires the
manifest to carry `name`, a 192px and a 512px icon, `start_url` and a `display` of
`standalone` (or `fullscreen` / `minimal-ui`) before it will offer installation at all.

What that work is, when it comes:

1. A static `public/manifest.webmanifest` — a real file, not a plugin's output, so it
   survives the framework after this one.
2. `<link rel="manifest" href="/manifest.webmanifest">` in the shared `<head>`.
3. Icons at 192 and 512 minimum, plus a maskable variant so Android does not letterbox it.
4. `theme_color` and `background_color` agreeing with whatever the palette is by then —
   not the stale `#EEEEEE` / `#333333` pair carried over from Gatsby.
5. A service worker, **only** if offline support is genuinely wanted. Installability does
   not require one; offline does. Any worker on this origin must keep the
   `gatsby-plugin-offline` cache cleanup permanently — see the service-worker section.

**Independent of this decision, and shipping regardless:** the favicon and touch icons, and
the `theme-color` meta. Those are emitted by the same Gatsby plugin but have nothing to do
with installability — they are how the site looks in a tab and on the Android address bar.
They are listed as their own tasks because dropping them is a visible regression, not a
deferral. See the manifest-plugin table in `cutover.md`.

**MealUnits is unaffected either way.** It serves its own manifest at
`/MealUnits/manifest.webmanifest` (verified 200) and stays installable on its own terms.

---

## Rule: nothing is pushed to the blog repo before cutover  *(SUPERSEDED — see below)*

**Stated by Momin, 2026-09-21. Standing rule, not a one-off.**

`docs/overhaul/` and every line of Astro code generated for the new site stays **local and
uncommitted** until the cutover actually happens. Not a branch, not a draft PR, not a
"just the docs" commit. Nothing.

The sequence at cutover is:

1. Merge the overhaul docs and the new site code into the blog repo in one go.
2. Move the current Gatsby code to the new (legacy) repo.
3. Only then does anything land.

This does **not** apply to `readme-preview`, which is a separate throwaway repo for the
GitHub profile README and is pushed freely — the profile work is not the blog.

Why it matters: a half-pushed cutover is worse than no cutover. The docs describe a site
that does not exist yet; committing them to the live blog repo advertises an unfinished
migration and muddles what is actually deployed.


---

## Revised 2026-09-21: work happens on a branch

Supersedes the rule above, which said not even a branch. Momin's revision:

> "you will create your own branch and you will only commit things on that branch and we
> will not merge that branch into main until we are ready to deploy"

So: **commit freely on the overhaul branch. Never commit to `main`. Never merge until the
three conditions in `tasks.md` are met.** `main` is the Pages deploy branch — merging is
deploying, which is why the merge is the gate and the commits are not.

Pushing the branch to `origin` is safe: PR-triggered production deploys were removed in
PR #14, so a branch on GitHub cannot ship anything. Push it, so the work is backed up and
reviewable rather than living only on one laptop.

## Node version: 24 LTS

Verified 2026-09-21. Astro 7.3.3 requires `node >=22.12.0`. Node 24 "Krypton" is the
current LTS line (newest v24.21.0); Node 26 is Current, not LTS. Momin already has
v24.20.0 and v22.22.0 installed via fnm, both verified `Mach-O 64-bit executable arm64`
— no Rosetta.

**Use Node 24.** The Astro project gets its own `.nvmrc` pinning it. The Gatsby repo keeps
its `.nvmrc` at `v16.20.2`, and fnm's `--use-on-cd` (already enabled in `~/.zshrc:114`)
switches automatically per directory, so the final Gatsby build for the legacy site still
works throughout.

---

# Revisions — 2026-09-21 (build session)

The Astro site was scaffolded and built to the point where only visual design is
left. Everything below was decided while building, and several of them are
deviations from sections above — those say so explicitly.

## The project lives in `site/`, not at the repo root

The branch could have replaced the repo root outright, since `main` still holds every
Gatsby file and nothing would be lost. It does not, for one practical reason: there is
one `node_modules` per directory, and two projects at the same root cannot both have
their dependencies installed. Momin can still `git checkout main` and run the old site
without reinstalling anything.

**This is reversible and probably should be reversed before cutover.** Flattening is
`git mv site/* .` plus removing the Gatsby files, and doing it early is better than
doing it during the cutover. It needs Momin's explicit yes because it deletes the
Gatsby tree from the branch. Until then, `astro.config.mjs`, the workflow's
`working-directory` and `publish_dir` are the only three places that know.

## Deviation: `/sitemap.xml` is a hand-written index, and `@astrojs/sitemap` stays

`@astrojs/sitemap` always names its index `${filenameBase}-index.xml`. That is hard-coded
in `write-sitemap.js`; `filenameBase` renames both the index and the chunks together, so
there is no configuration that produces `sitemap.xml`.

The live `/sitemap.xml` is registered in Search Console and named twice in `robots.txt`.
Letting it 404 is the exact regression `post-deploy-checklist.md` exists to prevent.

So `src/pages/sitemap.xml.ts` emits a real `<sitemapindex>` pointing at the chunk the
integration writes, and the integration keeps doing route discovery. Both URLs resolve.

**Known assumption:** one chunk. The integration splits at 45,000 URLs and this site has
about ten, so the trade is fine — but if it ever splits, that file must list every chunk.
The alternative considered and rejected was writing the whole sitemap by hand, which
removes the assumption and replaces it with "every new page must be remembered".

## `.gitignore` had a bug that would have deleted the entire cutover

The root `.gitignore` carried `public` unanchored, for Gatsby's build output. Unanchored,
it also matched `site/public/` — which under Astro is a **source** directory holding
`.nojekyll`, `robots.txt`, `sw.js`, the favicon and all eight icons.

Every ported static file was being silently excluded from every commit. It would have
built perfectly on this laptop and shipped a site with no `.nojekyll`, which is the
failure that serves unstyled HTML and still returns 200.

Fixed by anchoring it to `/public`. Gatsby's output is still ignored.

**And it was not the only one.** A second rule, `Icon?`, was excluding the entire
`site/public/icons/` directory. It exists to ignore the macOS custom-folder-icon file,
which is literally named `Icon` followed by a carriage return. But `?` matches any single
character, and `core.ignorecase` defaults to **true** on macOS, so `Icon?` also matches a
directory named `icons` — one of the most common directory names there is.

All eight apple-touch-icons would have been absent from the commit. Every one of them
would have 404'd in production. That is precisely the regression the whole checklist
exists to prevent, arriving through a Mac housekeeping rule rather than through anything
to do with the migration.

Replaced with `Icon[[:cntrl:]]`, which matches the real file and cannot match anything a
person would name. Verified both directions: the icons stage, and a literal `Icon\r` is
still ignored.

Then checked exhaustively rather than assuming those were the last two — every file under
`site/` run through `git check-ignore`. Nothing else is excluded.

This one is worth remembering as a category: an ignore rule written for one purpose
silently applying to another. Both of these were invisible locally, because the files
exist on disk and the build reads the disk. Only `git` disagreed, and only if asked.

## `/mealunits/` — a redirect that lived only in the Gatsby 404 page

Found in MealUnits' `docs/BLOG-FIX.md`, not from this repo.

GitHub Pages serves a project site at its repository's **exact** case, so
`mominbinshahid.github.io/mealunits/` never reaches MealUnits at all. It falls through to
the user site and lands on the blog's 404. The blog's 404 page rewrites the casing and
redirects. That fix is live and verified since 2026-09-13, and it existed nowhere in the
new site.

Ported to `src/lib/canonical-project-path.ts` with both load-bearing details intact:

1. A **listed** projects array, not a guess, so every other 404 still renders as a 404.
2. **`null` when the casing is already correct** — that is what stops the redirect loop.
   It is not a truthiness check and must not become one.

`replace()` rather than `assign()`, so the broken URL does not sit in history. Verified by
running the shipped minified function against eight paths.

**This is the best example the project has produced of its own thesis.** It was not a file
and not a config entry. It was behaviour, living in a React component, invisible from the
new site, and it would have broken silently.

## Service worker: the IndexedDB reasoning was right for the wrong reason

The worker never touched IndexedDB, on the grounds that `gatsby-plugin-offline` used
`idb-keyval` whose default database is `keyval-store`, which another app might share.

Confirmed with the MealUnits project directly: it uses **no library**. It calls
`indexedDB.open('MealUnits')`, and `keyval-store` appears nowhere in it. So the conclusion
held and the stated reason did not.

That matters because a comment giving the wrong reason for a right decision is one
refactor away from being "corrected". Rewritten with the real facts: the `MealUnits`
database is the only copy of the user's prescription, injection log and readings, there is
no server and no backup, and deleting it would also take out the app's fail-closed screen.

Also added, from the same conversation:
- `NEVER_DELETE_PREFIXES = ['mealunits-']`, subtracted from the delete filter, so adding
  that prefix to the allowlist by accident cannot do anything.
- Client reloading skips any client under `/MealUnits/` explicitly, rather than relying on
  scope to have excluded it.
- Only `self.registration` is ever unregistered. MealUnits' worker at `/MealUnits/` is not
  ours to remove.

## Two workflows would both publish to `gh-pages`, so the new one refuses

`site.yml` CI-builds on every branch and deploys only from `main`. But `deployment.yml`
also deploys from `main`, and both push to `gh-pages` — whichever finished last would win,
non-deterministically, during the cutover.

The deploy job hard-fails if `.github/workflows/deployment.yml` still exists. Deleting
that file is part of the cutover, and deleting it is also what switches the interlock off
permanently. Failing loudly beats deploying the wrong site.

CI also asserts `dist/.nojekyll`, all eight icons, the ported root files, and that
`robots.txt` still names MealUnits' sitemap.

## Versions actually installed

`astro` **7.3.3**, not the 7.3.2 the earlier table recommended. That table said "pin one
patch back for soak" on 2026-09-17; 7.3.3 has now had five days with no 7.3.4, which is
the soak it was waiting for.

Node **24.21.0** via fnm, verified `Mach-O 64-bit executable arm64`. `sharp` 0.35.4 with
`@img/sharp-darwin-arm64` also verified arm64. No Rosetta anywhere.

All three security floors hold: `astro` 7.3.3 ≥ 7.2.8, `vite` 8.3.0 ≥ 8.0.16, `sharp`
exactly 0.35.4. `npm audit` reports zero vulnerabilities.

`typescript` pinned to `~6.0.3`. Verified rather than assumed: `@astrojs/check`'s peer
range is `^5.0.0 || ^6.0.0`, so TS 7.0.2 would break it.
