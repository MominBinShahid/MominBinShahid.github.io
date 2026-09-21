# Working in this project

Astro 7 static site, deployed to GitHub Pages. The full reasoning for every choice
lives in `docs/overhaul/decisions.md` — read that before arguing with anything here.

## The invariants that are easy to break

**Publishing is filtered in exactly one place.** `src/lib/posts.ts`. The blog index, the
post route, the sitemap and the feed all call it. If you add a fifth place that lists
posts, call `getPosts()` — do not write a new `getCollection` filter. An unpublished post
leaking into the feed has been published whether you meant it or not, which is why
`getFeedPosts()` excludes it even in dev while `getPosts()` shows it.

**The field is `published`, and it defaults to `false`.** Not the `draft` most Astro
templates use. Nothing in Astro reads either name — the `markdown.drafts` built-in was
removed, so this is our field and our filter — and `draft: false` makes you reason through
a double negative to decide whether something is live. Defaulting to `false` means a post
that says nothing stays off the site, so the expensive mistake cannot happen by forgetting
a line. Do not "helpfully" flip the default.

**Every internal link goes through `href()`** from `src/lib/href.ts`. Astro does not
rewrite links the way Gatsby's `pathPrefix` did. A raw `/blog/` breaks the moment the
site is served from a subpath, and it breaks silently — the build stays green.

**`public/.nojekyll` is not optional.** Pages runs the output through Jekyll, Jekyll
skips underscore paths, and Astro puts every hashed asset in `_astro/`. Without that
zero-byte file the site serves unstyled HTML and still returns 200. CI asserts it.

**`public/sw.js` must keep shipping.** It is a self-destroying replacement for the old
Gatsby service worker, which registered at `/` and therefore sees the whole origin —
including `/MealUnits/`, a different app. It deletes caches by an explicit prefix
allowlist and never touches IndexedDB. Read the comment at the top of the file before
changing a line of it.

**No component hardcodes a colour, font, size or spacing value.** Everything comes from
the tokens in `src/styles/tokens.css`. That file plus the layouts is the layer a redesign
replaces; content and logic are not supposed to move.

**No remark or rehype plugins.** Astro 7 renders markdown with Sätteri. remark plugins
*silently* stop running — the build passes and the effect vanishes. Sätteri has GFM,
footnotes, heading IDs, smart punctuation and directives built in.

**Logical CSS properties only.** `margin-inline`, not `margin-left`. Urdu is RTL and
retrofitting physical properties later is the expensive version of this.

## Layout

```
src/content/    posts. markdown, zero presentation.
src/lib/        pure logic, no DOM.
src/consts.ts   every user-facing string and all site metadata.
src/styles/     tokens, then base. the redesign layer.
src/layouts/    "
src/components/ "
```

## Commands

```sh
npm run dev      # drafts visible
npm run check    # astro check — most of the test suite
npm run build    # check + build
npm run preview  # serve dist/ on :4321
```

Verify a build the way production is verified:

```sh
npm run build && npm run preview &
bash docs/overhaul/verify-deploy.sh http://localhost:4321
```

## Pinned on purpose

`sharp` exactly `0.35.4` (libheif CVEs below it). `typescript` on `~6.0.3` because
`@astrojs/check` does not accept TS 7 yet. `astro` must stay ≥ 7.2.8 (AVIF RCE).
