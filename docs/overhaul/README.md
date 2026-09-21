# Site overhaul

Rebuilding MominBinShahid.github.io from scratch: an elegant landing page with a
blog attached, static, fast, and as simple as the job allows.

Everything about this project lives in this folder. If you are picking this up
cold — a future session, or me in three months — read these four files in order.

| File | What it holds |
|---|---|
| `README.md` | This. Status, sequence, open questions. |
| `decisions.md` | What we chose, and why. The reasoning matters more than the choice. |
| `features.md` | Every feature the old site has, with keep/drop verdicts. |
| `parked.md` | Deliberately deferred. Not forgotten, not lost. |
| `content.md` | His real copy and résumé, plus **the live design constraints**. |
| `personal-details.md` | Photo, DOB and location — sourced evidence and verdicts. |
| `tasks.md` | Running backlog of decided-but-not-done changes. |
| `blog-plan.md` | The first two posts: the migration story (published) and MealUnits (draft). RSS and the draft mechanism. |
| `cutover.md` | Going live: both paths, the gotchas, the runbook, the abort. |
| `profile-readme-variants.md` | Three GitHub profile README drafts, plus widget research. |
| `design/` | References, the selling study, the cross-round review, 15 rejected builds. |

The code lives at the repo root — this branch *is* the new site. `AGENTS.md` there lists
the invariants that are easy to break by accident. The Gatsby code it replaced is preserved
at the `gatsby-final` tag and is what `legacy-site` will be built from.

## Why rewrite

Gatsby 2 is years past EOL — last release Feb 2026, effectively one contributor,
plugin ecosystem rotting. The site can't take a dependency update without a
fight, and the dark mode is built on a whole-page CSS invert filter that causes a
chain of downstream workarounds.

The blog has **zero of Momin's own posts**. All nine in `content/` are the
template author's (Rolwin's) demo content. So this is not a content migration —
it is a landing page being built properly, with an empty blog waiting behind it.

## Sequence

1. ~~Stop PRs deploying to production~~ — done, PR #14
2. ~~Apple Silicon / Node 16, so the Gatsby 2 toolchain builds at all~~ — done, PR #15
3. ~~Keep the markdown experiments~~ — done, PR #16
4. ~~Bump workflow actions off deprecated Node 20~~ — done, PR #17
5. **Move MealUnits to its own origin** — `mealunits.github.io`, free org. Blocks nothing but should happen early (see decisions.md).
6. **Freeze the old site** → `legacy-site` repo, one final Gatsby 2 build with `pathPrefix`.
7. **Design round** — multiple mockups as artifacts, Momin picks, then build.
8. ~~**Build the Astro site**~~ — **structure done 2026-09-21**, on the `overhaul` branch,
   in ``. Astro 7.3.3 on Node 24.21.0, content collections with a typed schema and the
   draft field, RSS, sitemap, every ported static file, CI that asserts them, and both blog
   posts. `verify-deploy.sh` passes 20/20 against a local preview.
   **Stopped before visual design**, as agreed — every page is semantic single-column flow
   with no layout. Waiting on Momin's reference sites and design hints.
9. **Cutover** — ship the self-destroying service worker in the same deploy.
10. ~~**GitHub profile README**~~ — done 2026-09-21, live at github.com/MominBinShahid.
    It ended up *setting* the design language rather than inheriting it.

## Ground rules

- Nothing is committed or pushed without Momin saying yes to that exact thing.
- No Rosetta, ever. Verify native binaries are arm64 with `file`.
- Designs get confirmed before anything is built.
- Everything this project produces goes in this folder.

## Still open

- Momin's decision on moving MealUnits (recommendation: yes, see decisions.md)
- **Design direction — the only thing now blocking the site.** Needs Momin's reference
  sites and hints, then the mockup round.
- Whether to flatten `` to the repo root before cutover (see `tasks.md`)
- Whether to buy a personal domain (~$10/yr) — optional, see decisions.md
- `post-deploy-checklist.md` — every URL and `<head>` item the current build emits,
  enumerated live. What to check after the cutover and what may legitimately vanish.
- `verify-deploy.sh` — runs that checklist against any origin.
