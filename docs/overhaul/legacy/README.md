# Salvage from the Gatsby tree

## Resolved 2026-09-21 — the change is in the tag now

When the Gatsby tree was removed from this branch, one file had an **uncommitted**
working-tree change: `content/2020-21-20-code-splitting-in-react/index.md` had gained
`published: false`, unpublishing the last template post that did not already carry the flag.
It was Momin's edit, it predated this overhaul, and it existed in exactly one place — his
working tree. `git rm` refused to delete the file, correctly, and the change was saved here
as a patch.

**It is no longer only a patch.** At Momin's request it was committed properly:

- `7664b1d` — *content: unpublish the last template post*, whose parent is `cb33432`
- The `gatsby-final` tag now points at that commit instead of at `cb33432`

Nothing was rewritten to do this. Commits are immutable, so rather than editing `cb33432`
a new commit was built on top of it, in a `git worktree` checked out at that commit — which
is how the Gatsby files were available to patch while this branch no longer has them. The
tag is a label, so moving it repointed the label; `cb33432` still exists and `main` still
points at it.

So `main` is what is deployed, and `gatsby-final` is what gets archived. They differ by one
deliberate commit.

**Checking out the tag now gives you the edit automatically.** No patch step.

### `uncommitted-gatsby-edit.patch`

Kept as a second copy, not because it is needed. If the tag is ever moved back to
`cb33432`, this is how the change gets reapplied:

```sh
git checkout gatsby-final
git show overhaul:docs/overhaul/legacy/uncommitted-gatsby-edit.patch | git apply -
```

Read it out of the branch with `git show`, not from a path — checking out `gatsby-final`
replaces the working tree with the Gatsby code, where `docs/overhaul/` does not exist, so
applying by path fails with "can't open patch". The first version of these instructions had
exactly that bug and only running them found it.

Worth knowing either way: that post is **not live**. `/blog/code-splitting-in-react/`
returns 404 and the live `/blog/` lists zero posts, so the edit changes nothing a visitor
sees. It was preserved because discarding someone's uncommitted work without asking is not
ours to do.


---

## The original coming-soon page — where it lives now

`feature/coming-soon-page` was deleted during the 2026-09-21 branch cleanup. **The page
itself was not lost**, because it was never unique to that branch.

`index.html` was added in commit `fd2b80c`, which is an **ancestor of `main`**. So this
works regardless of which branches exist:

```sh
git show fd2b80c:index.html > coming-soon.html
```

The only commit unique to that branch tip was `1093616`, which *deleted* a `CNAME` file.
Nothing else.

### Do not redeploy it as-is

If a holding page is ever wanted again, write a new one rather than resurrecting this.
Three reasons, all checked:

1. **It is a third-party template** from comingsoonpage.com / SeedProd, licensed
   **CC BY-NC-ND 4.0** — Attribution, NonCommercial, and crucially **NoDerivatives**.
   Modifying it to say Momin's name is exactly what that licence forbids.
2. **It was never configured.** The headline still reads "Coming Soon Page", the body
   "Get ready! Something really cool is coming!", and the logo is SeedProd's own. The
   nine-step checklist in its HTML comments was never done.
3. **It depends on six external CDNs**, all pinned to 2016-era versions: Font Awesome 4.5,
   Bootstrap 3.3.7, jQuery 1.12.4, Modernizr 2.8.3, Google Fonts, an Unsplash background,
   plus SeedProd's own asset host. Any one going away breaks the page.

A holding page in the new site is a single `.astro` file with no dependencies, using the
tokens and layout that already exist. That is a shorter job than fixing the old one, and
the result is actually his.

### The `CNAME` thread — and a correction

`CNAME` is what GitHub Pages reads to serve a site on a custom domain. On first reading this
branch I said a custom domain had been configured in 2021 and then removed. **That was
wrong, and reading the file settled it.** It contained:

```
www.MominBinShahid.github.io
MominBinShahid.github.io
```

No custom domain — it named the `github.io` hostname the site is served at by default.
A `CNAME` file is unnecessary for that, and `www.` on a `github.io` address does not work,
because `github.io` is on the Public Suffix List. So the file did nothing useful at best.
Removing it in `1093616` was correct.

The still-open domain question in `decisions.md` stands on its own merits and is unrelated
to this file. Worth remembering from that section: a custom domain on the user site cascades
onto `/MealUnits/` too.
