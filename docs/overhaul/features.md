# Feature inventory

Everything the Gatsby site has, including what was built and never shipped.
From an exhaustive read of `src/`, `config.js`, `gatsby-*.js`, `content/`,
`static/` and the docs.

Verdict key — **keep**: carry over · **fix**: carry but rebuild properly ·
**drop**: let go · **decide**: Momin's call, still open

| # | Feature | Status today | Verdict |
|---|---|---|---|
| 1 | Responsive header + animated hamburger menu | live | keep |
| 2 | Settings drawer (wrench icon) | live | keep |
| 3 | Sidebar profile card — avatar, designation badges, CV button | live | keep — the site's signature |
| 4 | Scraper-proof email + phone via CSS injection | live | **keep** |
| 5 | 404 page with illustration | live | keep |
| 6 | `/mealunits` → `/MealUnits` case redirect | live | keep until MealUnits moves origin, then delete |
| 7 | Console easter egg for DevTools visitors | live | keep — free personality |
| 8 | About Me, 6 tiles, waving-hand animation | live | keep, rewrite copy, tile count is a design call |
| 9 | Skills progress bars | **built, never shipped** (`skills.enabled: false`) | **drop** — agreed. Percentages are arbitrary (there's a tooltip admitting it). The GitHub profile's Languages and Tools grid does this better |
| 10 | Quotes section | live | keep — see decisions.md |
| 11 | Blog listing grid | live | keep, presentation is a design call |
| 12 | Post template with cover banner | live | keep, presentation is a design call |
| 13 | Syntax highlighting + per-language corner labels | live (Prism) | **fix** — Expressive Code: labels, line highlighting, **copy button** |
| 14 | Markdown image captions | live | keep (free in Astro) |
| 15 | External links get `rel=nofollow` | live | keep |
| 16 | Disqus comments | **built, off in prod** (no secret in CI) | drop → giscus |
| 17 | `<emoji>` tag system | live | **drop** — agreed. Exists only to counter-invert emoji under the filter |
| 18 | Tags index page | live | keep |
| 19 | Per-tag pages | live | keep |
| 20 | In-browser PDF resume viewer (`react-pdf`) | live | **fix** — HTML page, see decisions.md |
| 21 | Contact form — honeypot, validation, toasts | live | **fix** — see decisions.md |
| 22 | Socials — sidebar row + contact page grid | live | keep, placement is a design call |
| 23 | Dark mode | live, via page-wide invert filter | **fix** — design tokens |
| 24 | Random theme colour (~38 palette, pinnable) | live | **keep, improved** — OKLCH hue |
| 25 | SEO meta, OG, Twitter cards, canonical | live | keep — plus Search Console verification tag |
| 26 | Sitemap | live | keep |
| 27 | robots.txt incl. MealUnits sitemap | live | keep; second line goes when MealUnits moves |
| 28 | PWA manifest | live | **decide** — low value without a service worker |
| 29 | Offline / service worker | live | **drop** — see decisions.md |
| 30 | Google Analytics GA4 | live | **fix** — GoatCounter pixel / Cloudflare |
| 31 | NProgress page-load bar | live | drop — obsolete at zero-JS speeds |
| — | RSS | **broken** — config points at `/rss.xml`, no plugin exists | **fix** — free in Astro, ~20 lines |
| — | i18n | **dead** — wired end to end, no translated file ever existed | drop, see parked.md |

## From `docs/notes.md` — Momin's own backlog

Six items that had never come up in discussion:

- **Back-to-top button** for long pages — new feature, wanted
- **Heading order** — `h3`/`h4` used for styling, fails accessibility checks
- **Focus outlines** — the CSS was written then commented out at the bottom of `global.less`
- **Content Security Policy** — wanted `gatsby-plugin-csp`. Astro 6+ has CSP built in, so this gets easier. (Note: a CSP *header* needs Cloudflare; a meta tag works on Pages but cannot express `frame-ancestors`.)
- **Lighthouse pass** as an explicit gate before launch
- **"Make the app less white so dark mode is less pitch black"** — real design direction for the mockup round

Items from that list the rewrite closes for free: font smoothing on headings,
the filter-on-selectors problem, the `<emoji>` React warning, emoji inverting in
text inputs, the colour picker breaking in dark mode, the `gatsby-image` →
`gatsby-plugin-image` migration, skills colour not following the theme, and the
gtag/Gatsby version warning.

## Things that are simply dead

`postsForArchivePage: 3` in config, referenced by nothing · `getSuggestedPosts`
scorer, never called · the post template's second GraphQL query for "other
posts", fetched and never rendered · `removeTagsFromBlogContent` · `debounce`
(only referenced from commented code) · `timeToRead`, queried and never shown ·
six starter icon images · `momin-prev.jpg`, `momin-prev2.jpg`,
`MominBinShahid.jpg`, `man-technologist.png` · `static/gatsby_favicon.ico`

## Content

**All nine posts in `content/` are Rolwin's** — the starter's author. His photo
is in `2018-12-20-Hello-World/rolwin.jpg`; the compiler post links to
`github.com/rolwin100/mini_compiler_demo`. None of them ship.

One unpublished draft, `content/2020-21-20-code-splitting-in-react/`, has an
impossible folder date (month 21).

`content/2020-12-24-whats-new-in-react17/index.md` carries Momin's own markdown
pipeline experiments (committed in PR #16, `published: false`): Fira Code
ligature tests, gist embeds in four syntaxes, `highlight-next-line`,
`numberLines`, a `data-line` pre block.

**Consequence: no URL preservation problem.** There are no live post URLs worth
keeping. The blog starts empty.
