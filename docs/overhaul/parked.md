# Parked

Deliberately deferred. Recorded so they are decisions rather than oversights.

---

## i18n — Urdu, German, Spanish

Not building it. Four disciplines adopted now so adding it later is a feature
rather than a rewrite — see decisions.md. The expensive one to skip is **CSS
logical properties**, because Urdu is RTL and retrofitting physical left/right
across a whole stylesheet is the actual rewrite.

Honest read: German and Spanish probably never happen. Urdu is plausible.

## Installable / offline PWA

The new site launches with **no** service worker. If "add to home screen" is
wanted later it becomes a deliberate choice, built with narrow scope, network-first
HTML, versioned cache names prefixed `blog-`, and a real update flow rather than
a `window.confirm`.

MealUnits' own `src/sw.ts` is the in-house reference — it does this correctly.

Rule that survives regardless: **never delete caches unfiltered.** `caches.keys()`
is origin-wide.

## Captcha

Needs third-party script in the page. Blocked while the blog shares an origin
with MealUnits. Honeypot plus Web3Forms' server-side filtering in the meantime.

Unblocked the day MealUnits moves to its own origin.

## Script-based embeds

Gists, tweets, CodePen. Same constraint, same unblock. Code blocks and plain
iframes cover most cases — an iframe is a separate browsing context and is safe.

## Dynamic OG images per post

satori + sharp in a static endpoint. Worth it *if* posts get shared. Ship a
static default OG image first; adding the endpoint later is non-breaking.

## Search

Refused for now. Pagefind (post-build static index) is the only acceptable shape
if the archive ever grows past a few dozen posts.

## CMS

Refused. Markdown in git is the CMS.

## Personal domain + Cloudflare proxy

~$10.44/yr. Would add response headers GitHub Pages cannot do at all — CSP,
`immutable` caching, `Link` preload — plus Early Hints. Free tier covers it.

Cost: GitHub's Let's Encrypt renewals fail while proxied, producing delayed 526
errors months later. Needs an ACME Configuration Rule. Officially unsupported by
both vendors. If buying a domain, DNS-only captures the important part with
near-zero new failure surface.

## GitHub profile README

Carry design elements across once the site's look is settled. Explicitly a
follow-on, not part of the rewrite.

## Small cleanups

- Bump `actions/checkout` etc. was done in PR #17, but **untested** — `paths-ignore:
  '.github/**'` means workflow-only changes trigger no build. `peaceiris/actions-gh-pages@v4`
  gets its first real exercise on the next content deploy.
- MealUnits' Search Console property — check whether it needs its own, and redo
  verification if MealUnits moves origin.
- Safari evicts script-writable storage after 7 days of non-use unless the app is
  installed to the home screen. Relevant to MealUnits' data durability generally,
  not just to migration. Worth raising with its agent.

## Logo — direction chosen, execution parked

**Momin in English handwriting, morphing into مومن in Urdu.** Confirmed by Momin
2026-09-18 after five rounds of static marks were all rejected.

Still to decide, after the site design settles:
- Which hand for the Latin — he wants it raw, close to a child's writing, "funky"
  rather than official. Candidates explored in `design/logo/animated.html`: Scrawl,
  Marker, Crayon, Pencil, Rounded, Tall.
- Which transition — five built and published: write-and-rewrite, diagonal cut,
  ink-draw, hover swap, cursor-driven.

Decisions already taken:
- **SVG or CSS, never a GIF.** Crisp at any size, kilobytes not megabytes,
  theme-aware, and it can honour `prefers-reduced-motion`.
- The Latin reveals left-to-right and the Urdu right-to-left, because that is the
  direction each script is actually written.
- **Favicon stays the 👨‍💻 emoji.** The animated mark is for the site itself.
- Whatever is chosen gets redrawn as outlines for production, so the mark never
  depends on a webfont loading.

Relevant constraint discovered: Google Fonts carries 24 Arabic-script faces but
only **two** true Nastaliq — Noto Nastaliq Urdu and Gulzar. Drawing the Urdu as
paths sidesteps that entirely.
