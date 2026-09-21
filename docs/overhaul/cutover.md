# Cutover — moving the live site to the new build

Researched 2026-09-20 against the live repo, with `curl` probes run the same day.
This file exists so cutover day is a checklist, not a memory test.

---

## Verdict

**Both paths are safe. Neither can permanently cost the site or the name.**

The decisive fact: `MominBinShahid.github.io` is a repository name inside Momin's
own account namespace. A user site only serves at the root when the repo name
matches the owner's login, so **nobody else can ever take that name.** This is
completely different from changing a *username*, which is genuinely dangerous and
is where all the horror stories come from.

**The escape hatch:** if anything goes wrong mid-rename, rename `legacy-site` back
to `MominBinShahid.github.io`. The old site returns in ~10 minutes. "Rename back"
is the fix that recurs across every broken-Pages thread found.

No case was found of anyone permanently losing a `<username>.github.io` site to a
repo rename. Every "lost my Pages site" thread traced to something else: a
*username* change, a repo *deletion* leaving an orphaned deployment, a custom-domain
lock, environment protection rules, or a flagged account.

---

## The two things that genuinely do not come back

1. **The repo-level redirect dies.** Once the new repo claims the name, the redirect
   `github.com/MominBinShahid/MominBinShahid.github.io → legacy-site` is gone for
   good. Any link to the old *repo* URL — README badges, a "source" link on the
   site, someone else's blog post — lands on the new repo instead of the old code.
2. **Stars, forks and watchers stay with the repo object, not the name.** Measured
   2026-09-20: **5 stars, 2 forks, 1 watcher.** Those follow the old code to
   `legacy-site`; the new user-site repo starts at zero. Small, but one-way.

Neither applies to the replace-in-place path.

---

## Path A — rename swap

Build in `new-site`, then on the day: rename the current repo to `legacy-site`,
rename `new-site` to `MominBinShahid.github.io`.

**Gets you:** each repo holds exactly one project's history.
**Costs you:** a 404 window, the redirect, and the stars.

**Realistic downtime: 2–15 minutes, worst case 20–30.** Measured directly: a
nonexistent user site returns a 404 with *no* `Cache-Control` header, but Fastly
caches it anyway — observed still serving `x-cache: HIT` at 290 seconds and
climbing. GitHub's documented publish delay is up to 10 minutes on top of that.

**Do not load the root URL during the gap.** Follow-up measurement made this worse
than first reported: a 404 was observed cached for **15 minutes with no eviction**,
`age` climbing linearly to 885s. Worse, it is *shielded* — four different Fastly
edge nodes reported the same age, meaning one origin-shield object serves a whole
region. So a single request during the gap poisons the result regionally, not just
for the person who made it, and the site can keep 404ing for 15+ minutes *after* it
is actually live.

Revised window for Path A: **10–25 minutes**, not 2–15.

Caveat: measured against a site that never exists, so the origin never changed its
answer. A successful Pages deploy plausibly purges the CDN. Untested, because
testing it means doing the swap. Treat as worst case.

Consequence if Path A were ever used: **do not abort on a 404 seen in the first 15
minutes.** That is exactly the window where a cached negative is indistinguishable
from a real failure, and renaming back mid-window poisons the cache a second time.
Check from incognito and another network before concluding anything.

---

## Path B — replace in place

Push the old code to a fresh `legacy-site` repo first, then replace the default
branch of `MominBinShahid.github.io` with the new site.

**Gets you:** zero downtime, the redirect intact, the stars intact, no rename
uncertainty at all.
**Costs you:** two unrelated histories in one repo.

**The one genuinely destructive operation in either path lives here:** force-pushing
`main` destroys the old history on the remote. Recoverable only from a local clone
or the `legacy-site` copy — *which is why `legacy-site` gets pushed first, not
second.*

---

## DECIDED 2026-09-20 — Path B, replace in place

`MominBinShahid.github.io` stays the main repo forever. `legacy-site` is created as
a **live, working site**, not a dead archive — all nine posts, working Actions,
working contact form. The stars/forks/watchers finding is what settled it.

---

## ⚠ THE SERVICE WORKER — highest-risk item in the cutover

Confirmed in `gatsby-config.plugins.js:36`: the live site runs
**`gatsby-plugin-offline`, registered at `/` with root scope**, CacheFirst, no
expiration.

**Every person who has ever loaded the site has that service worker installed.**
When the contents are replaced, their browser keeps serving the *old cached Gatsby
site* from that worker. Indefinitely. A hard refresh does not reliably clear it.
The site would look updated to anyone new and unchanged to everyone who has been
before — including anyone who looked at it once months ago.

**The fix:** the new site must serve a `/sw.js` that is a *self-destroying* service
worker — installs, unregisters itself, deletes the old caches, reloads open
clients. Browsers re-check `/sw.js` on navigation, find the new one, and it kills
itself and its caches on the way out.

**The trap inside the fix:** `caches.keys()` is **origin-wide**. MealUnits lives on
this same origin at `/MealUnits/` and stores insulin doses and glucose readings in
`mealunits-*` caches. The self-destruct must delete **only** the
`gatsby-plugin-offline` / workbox cache names. A naive "delete everything" wipes
real medical data belonging to a different site.

### Rehearse this from a DIRTY browser, not a clean one

**The machine most likely to hold the old registration is Momin's own**, and it is also the
one he will test from. A fresh profile is the single place the real exposure path does not
appear — the new site looks perfect, because there was never a worker to fight. This is
MealUnits' `docs/BLOG-FIX.md` section 4, and it applies in this direction too.

So rehearse it deliberately, **before** the cutover, against a local preview.

1. **Seed the old worker.** Visit the live Gatsby site in a normal window and let it
   install. Confirm in DevTools → Application → Service Workers that `/sw.js` is
   *activated and running*, and note the `gatsby-plugin-offline-*` entries under Cache
   Storage.
2. **Point that same profile at the new build.** Serve `dist` on the same origin the
   worker is scoped to. A different port is a different origin and proves nothing.
3. **Navigate, do not hard-refresh.** The browser re-checks `/sw.js` on navigation. Hard
   refresh bypasses the worker and hides whether the replacement actually took over.
4. **Assert all four:**
   - the new `/sw.js` reaches *activated*, then the registration disappears
   - every `gatsby-plugin-offline-*` and `workbox-*` cache is gone
   - **any `mealunits-*` cache is still there**, untouched
   - **IndexedDB still holds the `MealUnits` database**, with its records intact
5. **Then open `/MealUnits/` in that same profile** and confirm the app still loads, still
   has its settings, and still has its history.

Step 4's third and fourth bullets are the ones that matter. The first two failing is a
visible bug someone reports. Those two failing is silent, unrecoverable loss of someone's
prescription and injection log, and there is no server copy to restore from.

Also worth knowing: MealUnits' own worker deletes by the `mealunits-` prefix, filtered down
to its own caches, while ours must never delete that prefix. **The same string is
load-bearing on both sides of the origin, in opposite directions.** Each file only shows
half the arrangement, so changing one without the other breaks a site you were not editing.

> `decisions.md` records a Playwright test for exactly this — seed the old worker, assert
> the new site kills its caches and nothing else. It is not built yet. Until it is, this
> manual rehearsal is the only thing standing between the cutover and that failure, and
> the failure is invisible from a clean browser.

**Corollary for `legacy-site`:** strip `gatsby-plugin-offline` before pushing there.
A worker at `/legacy-site/sw.js` can only control `/legacy-site/*` so it cannot
hijack the root — but it still writes into the same origin-wide cache storage, and
an archive site has no need for offline support.

---

## `legacy-site` — what it needs to actually work

It becomes a **project site** at `mominbinshahid.github.io/legacy-site/`, so:

1. **`pathPrefix: '/legacy-site'`** in `config.js` (currently `''`), and the build
   must run with `--prefix-paths`. Without this every asset 404s.
2. **`siteUrl`** → `https://mominbinshahid.github.io/legacy-site`.
3. **Remove `gatsby-plugin-offline`** — see above.
4. **`noindex`.** Two live sites on one origin with near-identical about/resume
   content is a duplicate-content problem. Add `<meta name="robots" content="noindex">`
   or a `robots.txt` disallow, or the old copy competes with the new one in search.
5. **Repository secrets.** `config.js` *throws at build time in production* if these
   are missing, so the build fails without them:

   | Secret | Required? | Source |
   |---|---|---|
   | `CONTACT_FORM_ENDPOINT` | **Yes** — `config.js:11` throws | same value as now |
   | `GA_TRACKING_ID` | **Yes** — `config.js:14` throws | same value as now |
   | `DISQUS_SCRIPT` | No — `config.js:30`, no throw | optional |

6. **Pages source** must be selected by hand once — `peaceiris/actions-gh-pages`
   cannot enable Pages on its first deploy.
7. The nine demo posts (Rolwin's, `content/`) stay here. They do **not** move to the
   new site.

---

## Gotchas that apply to BOTH paths

**1. The base path is the most likely real breakage, and it isn't GitHub's fault.**
While the new site lives at `/new-site/` it needs `base: '/new-site'` in
`astro.config.mjs`; at the root it needs no base at all. Forget to flip it and every
asset 404s and the site looks catastrophically broken — and it gets misdiagnosed as
a Pages problem. `site` drives sitemap, robots and canonical URLs too, so a wrong
value ships a bad sitemap to Google.

**Mitigation, decided:** make `base` and `site` environment-driven so preview-at-
subpath and serve-at-root are the same build with one variable. Removes the trap
entirely.

**2. Actions secrets do not follow content.** `CONTACT_FORM_ENDPOINT` and
`GA_TRACKING_ID` live on the old repo. A new repo needs its own copies before the
first build. Miss them and the build still goes green while the form and analytics
silently break.

**3. `peaceiris/actions-gh-pages` cannot enable Pages on its first deploy.**
Documented in its README and in GitHub's own docs: commits pushed by a workflow
using `GITHUB_TOKEN` do not trigger a Pages build. So the Pages source must be
selected by hand once, on the new repo, **days before cutover — not on the day.**

**4. `github-pages` environment protection rules are a silent killer.** Multiple
community threads trace a 404 to nothing but these, and they do not auto-update when
a branch is renamed. Check Settings → Environments before cutover.

**5. Use the exact casing `MominBinShahid.github.io`.** GitHub's docs claim
uppercase must be lowercased; the live site disproves that — it has capitals and
serves 200. One user who "tidied" their casing got a site-wide 404 and fixed it by
renaming back. Do not touch the casing.

**6. Do not introduce a custom domain during the swap.** The "domain already taken
by another repository" lock is the one failure mode in this area that genuinely can
require GitHub Support.

**7. Do not delete anything.** Repo deletion can leave an orphaned Pages deployment
that only GitHub staff can purge.

**8. Pages URLs never redirect.** Any old path that doesn't exist in the new site
becomes a hard 404 — GitHub Pages has no server-side redirects. If any deep URL is
worth keeping, it needs a meta-refresh stub.

---

## `gatsby-plugin-manifest` emits far more than the manifest

Audited 2026-09-21, after wrongly telling Momin the apple-touch-icons would "survive on
their own." They do not. They are separate from the manifest *file* but not from the
*plugin*, and the plugin is what goes away. Everything in this list is generated at build
time from `src/images/logo.png` and exists on no branch:

| Emitted | Live | Source |
|---|---|---|
| `/manifest.webmanifest` | 200 | `gatsby-plugin-manifest` |
| `<meta name="theme-color" content="#333333">` | present | its `theme_color` option |
| 9 x `<link rel="apple-touch-icon">` | present | its `legacy: true` option (config line 30) |
| `/icons/icon-{48..512}.png` | 200 | generated from `logo.png` |
| `/favicon-32x32.png` | 200 | generated from `logo.png` |

**The favicon is the sharp edge.** `/favicon-32x32.png` is referenced from every page's
`<head>` and returns 200 today, but `git ls-files` lists only `static/favicon.ico` and
`static/gatsby_favicon.ico`. Drop the plugin without porting and the PNG favicon 404s.

Recoverable, because the one input that matters — `src/images/logo.png` — *is* committed.
So this is a porting job, not a loss. In Astro the whole set becomes static files in
`public/` plus a few lines of `<head>` markup, which is strictly better: a file in a repo
survives the next framework change too.

Note `background_color` (`#EEEEEE`) and `theme_color` (`#333333`) are both stale — they
predate the new palette and the comments in the config still point at an abandoned
`#304CFD`. Re-pick them when porting rather than copying them across. `theme-color` also
takes a `media` attribute, so it can carry a light and a dark value.

## Build-emitted root files — the whole class

The MealUnits session put the principle better than I had: **a file in a repo survives a
framework change; a file emitted by a plugin does not.** That distinction is the entire
risk, and it generalises past robots.txt — so here is every root file the Gatsby build
currently emits, audited live 2026-09-21.

| File | Live | Emitted by | On cutover |
|---|---|---|---|
| `robots.txt` | 200 | `gatsby-plugin-robots-txt` | **MUST port** — carries MealUnits' only crawl entry. See below. |
| `sitemap.xml` | 200 | `gatsby-plugin-sitemap` | Astro regenerates. Check the URL set matches. |
| `manifest.webmanifest` | 200 | `gatsby-plugin-manifest` | **Will vanish.** Astro emits none by default. |
| `sw.js` | 200 | `gatsby-plugin-offline` | Replaced by the self-destroyer. See the service-worker section. |
| `404.html` | 200 | Gatsby core | Astro generates from `src/pages/404.astro`. |
| `rss.xml` | **404** | — | Already broken. `config.js` advertises a feed that no plugin generates. |

**On the manifest.** Dropping it is consistent with the no-PWA decision, but make it a
choice rather than an accident: anyone who added the site to a home screen loses the
installed app when the manifest goes *and* the service worker self-destructs. Small
population, real effect.

**MealUnits is unaffected by the manifest** — it serves its own at
`/MealUnits/manifest.webmanifest` (verified 200), and its own sitemap at
`/MealUnits/sitemap.xml`. Only the apex `robots.txt` is shared.

---

## ⚠ robots.txt — MealUnits' only crawl entry lives in this repo's build

Surfaced 2026-09-21 by the MealUnits session, verified here against the live file and
`gatsby-config.plugins.js:141`.

The apex `robots.txt` currently serves:

```
User-agent: *
Allow: /
Sitemap: https://MominBinShahid.github.io/sitemap.xml
Sitemap: https://MominBinShahid.github.io/MealUnits/sitemap.xml
Host: https://mominbinshahid.github.io
```

**It is generated by `gatsby-plugin-robots-txt`, not committed** — it exists on no branch.
So it disappears the moment the Gatsby build does.

**Why the second Sitemap line matters.** MealUnits is a *project* site at
`/MealUnits/`. Crawlers read `robots.txt` only from the **origin root**, so a
`robots.txt` inside `/MealUnits/` is never fetched. Naming its sitemap in the apex file is
**the only way a crawler reaches it at all.** Momin's own comment in the Gatsby config says
exactly this.

**The regression to avoid:** Astro's `@astrojs/sitemap` generates its own `robots.txt` and
will not know MealUnits exists. Ship the cutover without porting this and MealUnits silently
drops out of search — with no error, no 404, nothing to notice.

**Carry forward into the Astro config:**

- Both `Sitemap:` lines, the second pointing at `/MealUnits/sitemap.xml`.
- `Host:` is a **Yandex extension** — Google and Bing ignore it. Harmless, not required.
- Verify after cutover: `curl -s https://mominbinshahid.github.io/robots.txt` must still
  name MealUnits' sitemap.

**Also from that config, worth keeping:** the plugin queries `siteUrl` only when both `host`
and `sitemap` are absent — supplying one alone silently loses the other. And the version is
pinned `~1.5.5` deliberately: 1.6 writes the sitemap URL as
`../sitemap/sitemap_index.xml` while the sitemap is actually generated at `/sitemap.xml`.
Neither quirk carries to Astro, but both explain why the current config looks the way it does.

---

## Search Console

The property is verified by the meta tag
`google-site-verification=fkilO4peF6pbwOrFAy7QqM0HV9ccL8A2dH58RYnGfTc`, confirmed
present in the live HTML. **Copy that exact tag into the new site's `<head>` before
cutover.** Google re-checks periodically, notifies before revoking, and
re-verification is one click — but the grace period is undocumented.

The URL doesn't change, so Google's Change of Address tool doesn't apply. A
ten-minute outage is far below the threshold where Google treats URLs as gone. The
real SEO risk is content, not downtime: pages that existed before and don't exist
after will be dropped on recrawl.

---

## Runbook — if Path A is chosen

**Before the day**
1. Prove the one unverified mechanism on throwaways: create `zz-test-a`, rename to
   `zz-test-b`, create `zz-test-c`, rename `zz-test-c` → `zz-test-a`. If that
   second rename succeeds, the real swap will. (No first-hand account was found of
   renaming *into* a name held by a rename-redirect — only of creating at one.)
2. Build in `new-site` with the base path set for `/new-site/`.
3. Add both secrets to `new-site`.
4. Run the workflow once, then **select `gh-pages` manually** in Settings → Pages.
5. Check Settings → Environments → `github-pages` for branch restrictions.
6. Put the verification tag in and confirm it renders:
   `curl -s <url> | grep google-site-verification`
7. `git clone --mirror` the current repo as an offline safety net.

**On the day** (allow 30 minutes, low-traffic hour)

8. Flip base/site to root values in the new repo. Push. The site breaks at
   `/new-site/` — expected.
9. Rename `MominBinShahid.github.io` → `legacy-site`.
10. **Immediately** rename `new-site` → `MominBinShahid.github.io`. Exact casing.
11. **Do not load the root URL.** Wait 10 minutes.
12. Check Settings → Pages. If it looks disabled: source → `None` → save →
    `gh-pages` → save.
13. Still 404 after 15 minutes: push an empty commit, or
    `POST /repos/MominBinShahid/MominBinShahid.github.io/pages/builds`.

**After**
14. Verify assets load, the contact route works, the verification tag is live.
15. Submit the new sitemap; request indexing for the homepage.
16. Decide what `legacy-site` serves — disabling Pages there is now possible, since
    it is no longer specially named.
17. Update any README badges or links pointing at the old repo URL. That redirect
    is gone.

**Abort:** rename `legacy-site` back. Site returns in ~10 minutes. Nothing lost.

---

## Known unknowns

- No first-hand account of renaming a repo *into* a name held by a rename-redirect.
  Step 1 above tests it directly.
- Whether a user-site repo's Pages config survives a rename without re-enabling.
  Strongly implied, never stated.
- The actual Fastly TTL on a Pages 404 — undocumented, measured at ≥5 minutes,
  never observed expiring.
- Google's grace period before revoking an unverifiable property.
- Any rate limit or cooldown on repository renames — none found, but absence of
  evidence only.
