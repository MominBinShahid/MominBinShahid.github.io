# Running task list

> ## Branch discipline — nothing reaches `main` until deploy
>
> **Revised by Momin 2026-09-21. This supersedes the earlier "not even a branch" rule.**
>
> All overhaul work — `docs/overhaul/` and every line of Astro code — is committed to a
> **dedicated branch**, never to `main`. Committing on that branch is fine and expected;
> it is the merge that waits.
>
> `main` is what GitHub Pages deploys, so merging *is* deploying. The branch merges when
> **all three** are true:
>
> 1. **The new site builds and Momin has reviewed it.**
> 2. **`bash docs/overhaul/verify-deploy.sh` passes** against a local Astro preview —
>    every root file, all 8 icon PNGs, the 8 apple-touch-icon links, theme-color,
>    `.nojekyll`, and MealUnits' entry inside `robots.txt`.
> 3. **The Gatsby code is ready to move** to the legacy repo, which stays live.
>
> Then it merges in one piece and the Gatsby code moves out.
> Exempt: `readme-preview`, which is the GitHub profile and not the blog.

Things decided but not yet done. Add to this as they come up rather than trying to
remember them. Separate from `README.md`'s build sequence — that is the plan, this
is the accumulating backlog of small changes.

---

## Résumé — changes to make when we get to it

Source is currently a **Google Doc**, exported to `static/MominBinShahid_Resume.pdf`
(Dec 2025). Momin has offered access; agreed to batch the edits rather than do
them piecemeal now.

### The complete résumé change list — locked 2026-09-21

Do these in one pass when the Doc is opened. Everything here is decided, not pending.

| # | Change | Why |
|---|---|---|
| 1 | **Lead Engineer → Staff Software Engineer** | Edge team, Sastaticket.pk. Leadership wording stays (mentors, reviews, architecture); "I lead the team" goes. |
| 2 | **Remove date of birth** | Age-discrimination surface, identity-fraud exposure, buys nothing "8 years" doesn't. See `personal-details.md`. |
| 3 | **Check for a photo; remove if present** | The application-document evidence is unambiguous. Website About page is a separate decision. |
| 4 | **"data privacy" → "data security"** | Securiti.ai is a data-security platform. Applies to the site too. |
| 5 | **GraphQL: Languages → Backend** | Linguist types it `data` (file format); every labelled occurrence in the hiring corpus sat under backend. |
| 6 | **Add LangGraph** beside LangChain | Already in the profile; missing from the CV. |
| 7 | **"Google GenAI" → "Gemini"** | Name the model, not the SDK — consistent with the profile. |
| 8 | **Add Sentry** | Missing entirely. Observability is a production-maturity signal. |
| 9 | **Drop Gatsby.js** | Netlify acquired it Feb 2023; last release Feb 2026 with ~one contributor. Reads as a stack frozen in 2022. |
| 10 | **Consider merging Cloud + DevOps → Infrastructure** | Seven skill rows is a lot even on a CV. Optional. |
| 11 | **Location line** → `Karachi, Pakistan` plus markets served, never the province | Regions only, consistent granularity. |
| 12 | **Availability line**, low on the page, never the header | No "requires sponsorship" phrasing. |
| 13 | **Align the profile paragraph** with `Staff Software Engineer · Applied AI + Full-Stack` | So the CV and every other surface agree. |
| 14 | **Re-check the phone number** — present, format, and whether it belongs on the web version | Obfuscate on the site; full number is fine in the PDF. |

**Canonical skill grouping for the CV** is the six-category table in `content.md` — AI,
Languages, Frontend, Backend, Data, Infra.

- [ ] **Title: Lead Engineer → Staff Software Engineer.** Decided 2026-09-21. The Edge
      team at Sastaticket.pk owns the AI initiatives; the call-QA agent is the flagship.
      Leadership wording stays (mentoring, reviews, architecture) but "I lead the team"
      must go. See the title-change note at the top of `content.md`.
- [ ] **Remove date of birth** — decided 2026-09-20. See `personal-details.md`.
- [ ] **Check whether the PDF carries a photo.** If it does, remove it — the
      application-document evidence is unambiguous on this.
- [ ] **Location line** → `Karachi, Pakistan` plus markets already served, not the
      bare city. Never the province in visible text.
- [ ] **Availability line**, low on the page, never the header: open to remote or
      relocation. No "requires sponsorship" phrasing.
- [ ] **Align the profile paragraph** with whatever positioning the site lands on,
      so the two don't contradict each other.
- [ ] Re-check the phone number's presence and format.

### Résumé pipeline — Momin's call, 2026-09-20

**Google Doc stays the authoring surface.** He wants to edit in one place and have
both outputs follow. Agreed — with one change to the mechanism, because Google Docs'
*HTML* export is unusable (inline styles, `.c12` class soup, no semantics; a parser
for it would break every time he touched the formatting).

Docs exports **Markdown** directly, and that export is clean and semantic. So:

1. He edits the Doc.
2. Download as Markdown, commit it. The commit *is* the publish step, so there is no
   drift by construction.
3. The résumé page renders that Markdown with the site's own styles.
4. The downloadable PDF is generated from that same rendered page via a print
   stylesheet — so the CV people download looks like his site, not like a Doc.

Rejected: fetching the Doc at build time via the Drive API. Needs a service account
and a repo secret, and it makes every deploy depend on Google being up. For a file
edited twice a year, one menu click is the better trade.

**VERIFIED 2026-09-20 — and the plan changed. Parse the HTML export, not markdown.**

The Doc needs **no changes**. It is correctly styled: Title for the name, Subtitle
for the contact lines, Heading 1 for sections, Heading 2 for roles. No columns, no
text boxes, no layout tables.

The *markdown* exporter is what's lossy — it flattens Title→`#` and Subtitle→`##`,
which then collide with Heading 1→`#` and Heading 2→`##`. Five H1s in one document,
and the name is indistinguishable from a section. That is an exporter limitation,
not a fault in the document.

The **HTML export keeps the distinction**, with stable semantic class names
alongside the generated `cNN` ones:

| In the Doc | HTML export | Renders on the page as |
|---|---|---|
| Title | `<p class="… title">` | `<h1>` |
| Subtitle | `<p class="… subtitle">` | plain contact paragraph |
| Heading 1 | `<h1 class="cNN">` | `<h2>` section |
| Heading 2 | `<h2 class="cNN">` | `<h3>` role |

So: fetch `?format=html`, read structure from `title` / `subtitle` / `h1` / `h2`,
strip every `cNN` class and inline style, re-emit semantic HTML with the site's own
classes. Exact, no heuristics, nothing for Momin to maintain.

Tab-aligned dates become `&nbsp;` runs in their own `<span>` in the HTML, so the
title/date split survives there too.

Both export URLs work unauthenticated on a link-shared doc — confirmed with `curl`
against the live document.

### Superseded — the earlier open decision

The site will have an HTML résumé page *and* a downloadable PDF. Two sources of
truth will drift.

**Recommended:** move the résumé into the repo as structured data (JSON or
markdown), render the HTML page from it, and generate the PDF from the same source
with a print stylesheet. One place to edit, the PDF is never stale, and it picks up
version history for free. The Google Doc becomes an archive.

**Alternative:** keep the Google Doc as the source, export the PDF by hand, and
maintain the HTML page as a mirror. Simpler today, drifts later.

Low stakes either way — he edits it maybe twice a year. Not yet decided.

---

## Site content — decided, pending build

- [ ] **Drop the December 13 birthday easter egg** (Wikipedia day-link in the
      sidebar contact block). Decided 2026-09-20 — reads as a stray off-site link
      to anyone scanning. The console easter egg stays and does the same job.
- [ ] **Keep the console easter egg** (`src/utils/common.js:42`) — update the URL if
      the contact route changes.
- [ ] **Preserve the Google Search Console verification tag**
      (`src/components/Seo/index.jsx:82`). It authenticates the MealUnits property
      too; dropping it breaks both.
- [ ] **Quotes turn up somewhere you didn't expect.** Not a labelled section, not a
      block with a heading. His words: *"a location where it's subtle — you see them
      and you go, wow, we have quotes here. Not an entire section for the quotes.
      Whatever looks the best."* The placement IS the idea; find it during design.
- [ ] **Colour picker lives in settings, not on the page.** "Settings" is not
      necessarily a drawer — any subtle surface works. Present, not in anyone's face.
- [ ] **Glass / frosted treatment on the navbar** — and if it can be worked in
      somewhere else cleverly, he wants that too. `backdrop-filter`, no structural
      impact.
- [ ] **Better easter eggs.** The birthday link is out; he'd rather have ingenious
      ones. Seeds: the quotes surface itself, the 404, a `humans.txt` worth reading,
      something behind a keyboard sequence. Nothing decided.
      - **`Curiotive`** — Momin's coinage (curious + creative), 2026-09-21. Rejected for
        the repo description because it reads as a typo of "creative" and the halves are
        not recoverable ("curio" is a real word meaning a knick-knack). Kept as an easter
        egg: define it dictionary-style in `humans.txt` and/or the 404, where discovery is
        the point. `curiotive, adj. curious + creative. Not a real word. Used here anyway.`
      - The live profile description settled as
        `A curious sapiens wiring AI systems + full-stack software` — "sapiens" is
        correct (already singular in Latin; "sapien" is a proscribed back-formation).

---

## Before publishing the MealUnits post

- [ ] **Confirm `check-plan.py` is still Python.** MealUnits plans to rewrite it in
      TypeScript. The post names the file, calls it Python, and carries a `python` code
      block. If it has been rewritten, re-language the block and re-read it against the new
      source rather than translating the old snippet. Same for every other path the post
      names: `src/sw.ts`, `docs/PLAN.md`, `docs/CLINICAL.md`. Full note in `blog-plan.md`.
- [ ] Flip `published: false` to `published: true` in `src/content/blog/mealunits.md`.
      That is the entire publish step. Momin does this himself.

---

## Cutover — do not lose

- [x] **Port both `Sitemap:` lines into the Astro `robots.txt`** — DONE 2026-09-21. Real file at
      `public/robots.txt`. CI fails if the MealUnits line goes missing.
- [x] **Port the favicon and touch icons** — DONE 2026-09-21. All 8 regenerated from
      `src/images/logo.png` with sharp, plus `/favicon-32x32.png` and `/favicon.ico`, as real
      files in `public/`. CI asserts every one.
- [x] **Re-add `<meta name="theme-color">`** — DONE 2026-09-21, with `media` giving light and
      dark their own value. **Values are placeholders** (`#ffffff` / `#111111`) until the design
      pass picks real ones. Do not ship the stale `#333333`.
- [x] **Re-add the `apple-touch-icon` links** — DONE 2026-09-21. **Eight**, not nine; the
      count was wrong twice before anyone enumerated the live `<head>`. iOS ignores the web
      manifest and reads these for home-screen icons, which is why they ship even though the
      manifest does not.
- [x] **Manifest itself: let it go for now.** Momin's call, 2026-09-21. Not shipping a
      manifest means the site is not installable, which matches the no-PWA decision. The
      trigger to revisit is below.
- [x] **Fix `/rss.xml`** — DONE 2026-09-21. `@astrojs/rss` at `/rss.xml`, verified to contain
      exactly one item while the second post sits as a draft. The years-old 404 is closed.
- [ ] **Repo metadata sweep — all three repos.** Momin asked to be reminded, 2026-09-21.
      - `MominBinShahid/MominBinShahid`: replace the description (currently carries
        `⌮` U+232E ALL AROUND-PROFILE, a machining symbol picked because its Unicode
        *name* says "profile"; also `Github` should be `GitHub`). Drop the `pronouns`
        topic. Keep `github-profile`, add `profile-readme`.
      - `MominBinShahid.github.io`: **description and all 14 topics go stale at cutover.**
        Description still says "Powered by React.js via Gatsby.js"; topics include
        `gatsby`, `gatsbyjs`, `react`, `reactjs`, `javascript`. Swap for `astro`,
        `typescript`, `static-site-generator`; keep `blog`, `github-pages`,
        `personal-website`, `developer-portfolio`. **Do this in the cutover deploy**, not
        before — until then the Gatsby topics are accurate.
      - `MominBinShahid/MealUnits`: has **no topics and no homepage URL at all**.
        Description is already good. Add the homepage and topics — see below.
- [ ] **New social cards for the new look.** The old `og:image` was `src/images/momin.jpg`
      through `gatsby-plugin-sharp` and predates the redesign.
      **Interim, shipped 2026-09-21:** `public/og-default.png`, 1200x630, name and role
      on a plain dark ground. It exists because an `og:image` pointing at a 404 is worse than
      a plain card — not because it is the design. **Replace it in the design pass**, and give
      posts their own cards at the same time.
      `og:title` is fixed: the homepage now reports `Momin Bin Shahid` rather than `Home`
      (or the old `About`, which was only ever correct because the homepage *was* the about
      page).
- [x] **Ship `/.nojekyll`** — DONE 2026-09-21. Zero-byte file in `public/`, asserted by CI
      and by `verify-deploy.sh`.
- [x] **Delete `.github/workflows/deployment.yml`** — DONE 2026-09-21, removed with the
      Gatsby tree. It still exists on `main`, so the live site keeps deploying until the
      merge. `site.yml`'s interlock is kept anyway, in case a merge ever brings it back.
- [ ] ~~Delete `.github/workflows/deployment.yml` in the cutover commit.~~ Both it and
      `site.yml` deploy from `main` and both push to `gh-pages`, so leaving it means two
      workflows race and the winner is whichever finishes last. `site.yml`'s deploy job
      hard-fails while that file exists, so the cutover cannot silently get this wrong —
      but it will also not deploy until the file is gone.
- [ ] **Decide whether to flatten `` to the repo root before cutover.** The Astro
      project sits in `` so both it and the Gatsby build can have their own
      `node_modules`. Flattening is `git mv site/* .` plus removing the Gatsby tree, and
      only three places know the path: `astro.config.mjs`, and the workflow's
      `working-directory` and `publish_dir`. **Needs Momin's explicit yes** — it deletes
      the Gatsby tree from the branch. Doing it early is much safer than doing it during
      the cutover.
- [ ] **Replace the placeholder `theme-color` values** with the real palette once the
      design pass lands. Currently `#ffffff` / `#111111`.
- [ ] **Rehearse the service-worker swap from a browser that already holds the old
      worker** — not a clean profile, which is the one place the failure cannot appear.
      Step-by-step procedure is in `cutover.md`. The two assertions that matter are that
      `mealunits-*` caches and the `MealUnits` IndexedDB database are still there
      afterwards; those failing is silent, unrecoverable loss of someone's prescription.
- [ ] **Build the Playwright test for the service-worker cutover.** Already agreed in
      `decisions.md` as the one real E2E worth having. Not built. Until it exists the
      manual rehearsal above is the only guard.
- [ ] **Verify after cutover:** `bash docs/overhaul/verify-deploy.sh`. Checks all 9
      root files, all 8 icon PNGs, the 8 apple-touch-icon links, theme-color,
      og:image and the MealUnits entry inside robots.txt. Full enumeration and the
      reasoning live in `post-deploy-checklist.md`.

## Still owed by Momin

- [ ] **Three to five reference sites** he'd be happy to be compared to, any genre,
      plus one that looks dated to him. This is the one input that cannot be
      derived. Galleries suggested: godly.website, siteinspire.com,
      minimal.gallery, typewolf.com.
- [ ] **A working photo** — not the tuxedo one. Plain shirt or knit, plain or softly
      blurred background, window light, chest-height crop. Only if he decides he
      wants a photo at all; the About page will be built with the slot optional.
- [ ] Confirm the credibility hook is **years + industry range**, with leading a
      team and the full-stack-to-AI arc as support.

---

## Elsewhere

- [ ] **GitHub profile bio** currently reads "Lead Engineer @SastaTicket" — out of date.
- [ ] **GitHub profile time zone field** — set it. Makes the profile show live local time,
      which quietly answers the overlap question for anyone hiring across time zones.
- [ ] **LinkedIn headline** — same title change.
- [ ] **GitHub profile README** — currently lists the same open-to-everything menu.
      Should say the same thing the site says once the site says it.
- [ ] **LinkedIn headline** — same. Worth keeping the three surfaces consistent.
