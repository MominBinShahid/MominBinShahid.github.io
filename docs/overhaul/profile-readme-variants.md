# GitHub profile README — three variants

Drafted 2026-09-21 for `github.com/MominBinShahid/MominBinShahid`, the repo that
renders on his profile page. It already exists, last pushed **2023-08-17**.

Same thesis as the website, so the two can't contradict each other: **credibility,
aimed at a job first and consulting second, in the European and American markets.**
The hook is **years + industry range**, with leading a team and the full-stack-to-AI
arc as support. No achievement metrics — those live on the résumé.

---

## What the current one is doing wrong

Worth reading before the variants, because several problems are actively working
against him rather than just being neutral.

It was produced by `rahuldkjain/github-profile-readme-generator` and credits the
generator at the bottom, so it reads as a template on sight.

**Three lines undersell him badly.** The profile says he is learning how to begin
contributing to open source, that he is looking for help understanding how to
collaborate on GitHub, and signs off with a "fun fact." For a Staff Software Engineer eight
years in, the first two read as someone in their first year. That is the most
damaging thing on the page, and all three variants drop it.

(The exact wording is deliberately not reproduced here — the point stands without
it, and this file may get shared.)

The rest:

- **"A curious software engineer"** is the entire positioning. No level, no years, no
  domains, no markets.
- **Zero mention of AI or LLM work**, which is his whole current arc and the reason
  anyone would hire him now rather than in 2021.
- **~40 tech logos** in an icon wall, including Unreal Engine, Electron and Mocha.
- **"Looking to collaborate on any sort of JavaScript-based projects (for now)"** —
  the menu problem. It reads as availability rather than history.
- **Facebook and Instagram links** on a professional surface.
- **The Stack Overflow link is wrong.** It points at
  `stackoverflow.com/users/mominbinshahid`, which is not a valid user URL. The real
  one is `stackoverflow.com/users/9137804/MominBinShahid`. Fix this wherever it
  appears.
- **It uses `#gh-dark-mode-only` / `#gh-light-mode-only`** for the banner images.
  That still renders, but `<picture>` with `prefers-color-scheme` is the supported
  approach now and degrades better.

What's worth keeping: the link to `/resume`, and the instinct to have a banner at
all.

---

## ⚠ Critical finding — the widget ecosystem has collapsed

Every popular hosted widget was probed live on 2026-09-21. Most are **down**, which
means any README using them is currently rendering broken images:

| Service | Status |
|---|---|
| `github-readme-stats.vercel.app` (stats card) | **503 — DEPLOYMENT_PAUSED** |
| `github-readme-stats.vercel.app` (top-langs) | **503 — DEPLOYMENT_PAUSED** |
| `streak-stats.demolab.com` | **200 — working** (re-probed; the first probe was wrong) |
| `github-profile-trophy.vercel.app` | **402 — Payment required, DEPLOYMENT_DISABLED** |
| `github-readme-activity-graph.vercel.app` | **402 — Payment required, DEPLOYMENT_DISABLED** |
| `img.shields.io` | **200 — working** |
| `github-readme-streak-stats.herokuapp.com` | **200 — working** |
| `readme-typing-svg.herokuapp.com` | **200 — working** |
| `komarev.com/ghpvc` (view counter) | **200 — working** |

The free-Vercel widget tier has largely been paused or disabled for non-payment.
**Only `shields.io` is safe to depend on** — it's independently funded, has been
stable for a decade, and is the one service here that isn't a hobby deployment on
someone's personal quota.

There's a second argument against all of them regardless of uptime: a stats card on
an account with **6 public repos and 11 followers** advertises a thin GitHub
presence rather than hiding it. His work is closed-source. The stats are not the
sell, and pointing at them is self-defeating.

**Recommendation: no dynamic widgets in any variant.** Variant B uses shields.io
only, and only as static labels.

---

## The three bets

They disagree about something real, not just styling.

| | Bet |
|---|---|
| **A — The Letter** | Say less, say it as prose. In a sea of badge walls, a person writing plainly is the differentiator. |
| **B — The Index** | Recruiters scan, they don't read. Make the eight years and five domains legible in four seconds. |
| **C — The Workbench** | Lead with what he's building now, not what he's done. The arc into AI is the story; the history is footnotes. |

---

# Variant A — The Letter

**The bet:** no headings, no badges, no tables, no widgets. Just a person writing
in their own voice. Almost every developer profile is a wall of logos, so plain
confident prose is what stands out — and it's the only format where his actual
warmth survives.

**Best if:** he wants the profile to feel like him, and trusts a reader to spend
thirty seconds.

````markdown
## Momin Bin Shahid

I build things that live on the web, and lately, things that think.

Eight years in, mostly full-stack JavaScript. These days I'm a Staff Software Engineer at
[Sastaticket.pk](https://www.sastaticket.pk) and build AI agents that do real work
in production. Before that it was data privacy and security at a unicorn, ERP and
HRMS work for clients across the Middle East and Europe, and an EdTech platform used
in US schools. Different industries, same job underneath: ship software people
actually depend on.

I'm in Karachi, Pakistan, and most of my career has been spent working with teams in
the US, Europe and the Middle East.

Nearly all of it has been closed-source, so this profile is a lot quieter than my
CV. [The résumé](https://MominBinShahid.github.io/resume) has the real picture.

The one thing here that's properly mine is
[MealUnits](https://github.com/MominBinShahid/MealUnits) — an insulin calculator I
built for my brother. Offline, no accounts, nothing leaves the device.

I read documentation for fun. I leave codebases better than I found them. I'm
happiest somewhere between a gnarly problem and a good argument about what
consciousness actually is.

Open to senior or lead roles, remote or relocation.

[Website](https://MominBinShahid.github.io) ·
[LinkedIn](https://linkedin.com/in/MominBinShahid) ·
[Stack Overflow](https://stackoverflow.com/users/9137804/MominBinShahid) ·
[Email](mailto:MominBinShahid@gmail.com)
````

**Sacrifices:** no visual interest at all, and no scannability. A recruiter skimming
twelve profiles in ten minutes may not read a word of it. It also risks looking
sparse next to peers with elaborate pages, which is the calculated part of the bet.

**Theme safety:** text and links only, so nothing to break.

---

# Variant B — The Index

**The bet:** the reader is scanning, not reading. Get eight years, five domains and
four markets into their head before they decide whether to keep going. Structure
carries the credibility because the structure itself shows range.

**Best if:** he's actively applying and the profile is being opened straight after a
CV.

````markdown
# Momin Bin Shahid

**Staff Software Engineer · Full-Stack and AI · 8 years**
Karachi, Pakistan — building for teams in the US, Europe and the Middle East.

[![Website](https://img.shields.io/badge/Website-MominBinShahid.github.io-0A66C2?style=flat-square)](https://MominBinShahid.github.io)
[![Résumé](https://img.shields.io/badge/R%C3%A9sum%C3%A9-read-2F855A?style=flat-square)](https://MominBinShahid.github.io/resume)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-MominBinShahid-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/MominBinShahid)
[![Stack Overflow](https://img.shields.io/badge/Stack%20Overflow-profile-E07000?style=flat-square&logo=stackoverflow&logoColor=white)](https://stackoverflow.com/users/9137804/MominBinShahid)

### Where I've worked, and on what

| Domain | Context |
| --- | --- |
| AI agents & LLMs | Production agents on LangChain and frontier APIs |
| Travel tech | Pakistan's leading OTA, thousands of bookings a day |
| Data privacy & security | Enterprise platform at a unicorn |
| ERP & HRMS | Oracle NetSuite consulting, Middle East and Europe |
| EdTech | Assessment platform used in US schools |

### What I work with

**Languages** JavaScript · TypeScript · Python · SQL
**Frontend** React · Vue · Angular
**Backend** Node.js · Django
**AI** LangChain · Google GenAI · OpenAI · Anthropic
**Infra** Docker · Kubernetes · AWS · GCP · Azure

### Here on GitHub

Most of my work is closed-source, so this account is quieter than my CV.

- **[MealUnits](https://github.com/MominBinShahid/MealUnits)** — an insulin
  calculator built for my brother. Offline, no accounts, nothing leaves the device.
- **[MominBinShahid.github.io](https://github.com/MominBinShahid/MominBinShahid.github.io)**
  — my site. Currently being rebuilt.

I mentor engineers, run code reviews and shape architecture. That part doesn't
show up in a commit graph.

---

Open to senior or lead roles, remote or relocation.
[MominBinShahid@gmail.com](mailto:MominBinShahid@gmail.com)
````

**Sacrifices:** his voice. It's efficient and slightly cold, and the warmth that
makes him likeable in conversation doesn't survive a table.

**Theme safety:** the four shields use explicit hex colours with white or light
logo text, legible on both grounds. No `#gh-dark-mode-only` fragments, no images
that invert.

---

# Variant C — The Workbench

**The bet:** nobody hires you for your history, they hire you for the direction
you're pointed in. Lead with the move from full-stack into AI agents, let the eight
years sit underneath as evidence that the move is credible rather than a pivot into
a hype cycle.

**Best if:** he's targeting AI-engineering roles specifically, where the arc is the
most interesting thing about him.

````markdown
## Momin Bin Shahid

**Currently:** teaching machines to understand context and then actually do
something about it.

I'm a Staff Software Engineer on the Edge team at [Sastaticket.pk](https://www.sastaticket.pk), where I build
AI agents that run in production against real customer work. Python, LangChain,
Google GenAI, Airflow, AWS. The interesting part isn't the model, it's everything
around it — the evaluation, the failure modes, and knowing what the thing is
actually for.

**How I got here:** eight years of full-stack JavaScript before this. Data privacy
and security at a unicorn, ERP and HRMS work for clients across the Middle East and
Europe, EdTech for US schools, and now travel. Five industries, and each one taught
me that great software is about understanding people, not just writing code.

That history is why I trust myself around AI systems. I've shipped enough software
to know what breaks.

**Also here:** [MealUnits](https://github.com/MominBinShahid/MealUnits), an insulin
calculator I built for my brother. Offline, no accounts, nothing leaves the device.
Not a medical device, and it says so. Engineering in service of one specific person
is still my favourite kind.

**The rest of it** is closed-source, which is why this profile is quieter than it
should be. [The résumé](https://MominBinShahid.github.io/resume) fills that in.

Karachi, Pakistan. I've worked with teams in the US, Europe and the Middle East for
most of my career. Open to senior or lead roles, remote or relocation.

[Website](https://MominBinShahid.github.io) ·
[LinkedIn](https://linkedin.com/in/MominBinShahid) ·
[Stack Overflow](https://stackoverflow.com/users/9137804/MominBinShahid) ·
[MominBinShahid@gmail.com](mailto:MominBinShahid@gmail.com)
````

**Sacrifices:** completeness. It doesn't try to summarise eight years, and someone
looking for a conventional full-stack hire may not find what they came for. It also
bets hard on AI staying the right thing to lead with.

**Theme safety:** text and links only.

---

## Notes for whichever wins

**Fix the Stack Overflow URL.** The current one is broken. All three variants use
`https://stackoverflow.com/users/9137804/MominBinShahid`.

**Never link the blog** until there's a post. An empty blog behind a link is worse
than no link.

**Drop Facebook and Instagram.** They're on the profile now and they don't belong on
a hiring surface. Twitter/X is defensible if he uses it professionally.

**The banner images.** `image-dark.png` and `image-light.png` already exist in the
repo. If he wants a banner in the new version, the current approach still works but
`<picture>` is more robust:

```html
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./image-dark.png">
  <img alt="Momin Bin Shahid" src="./image-light.png">
</picture>
```

The `alt` text goes on the `<img>`, not the `<source>`.

**His GitHub profile fields** are separate from the README and also need updating —
the bio currently reads "Lead Engineer @SastaTicket" — now out of date, and location "Karachi, Sindh,
Pakistan." Note the site standard we settled on is **"Karachi, Pakistan"** without
the province, so the two surfaces should be made consistent.

---

## Research findings

**Widget availability** — all probed live 2026-09-21 with `curl`, results in the
table above. The short version: the Vercel-hosted widget tier is mostly
paused or payment-disabled, `shields.io`, `streak-stats.demolab.com` and the
Heroku-hosted services still respond. Depending on any hobby deployment for something that renders on your
profile is a standing risk, and today that risk has already landed for most of them.

**Why no stats cards regardless of uptime.** His account shows **6 public repos, 11
followers**, created 2017. A contribution graph or language-breakdown card makes
that the headline. For someone whose work is deliberately closed-source, the honest
move is to say so in a sentence — which all three variants do — rather than display
a metric that invites the wrong conclusion.

**Clichés to stay away from**, all of which are currently on his profile or adjacent
to it: the "fun fact" line, the icon wall, "I'm currently learning X" when X is
below your actual level, "looking to collaborate on anything", the generator credit
footer, and the snake contribution animation.

**Dark/light handling.** GitHub renders profile READMEs in whichever theme the
viewer has set. Safe approaches: plain text and links (no risk), `shields.io` badges
with explicit hex backgrounds and light foreground text, and `<picture>` with
`prefers-color-scheme` for images. The `#gh-dark-mode-only` / `#gh-light-mode-only`
fragment trick still works but `<picture>` is the supported path. Transparent PNGs
with dark strokes are the common failure — invisible in dark mode.

**Sources.** Widget statuses, repo list, profile fields and the current README were
all read directly from the GitHub API and live HTTP probes rather than from
articles. Web search was unavailable for this task (session budget exhausted), so
the "what's cliché in 2026" section is drawn from the conversation's existing
research corpus and from what's demonstrably on his own profile, not from fresh
sources. Worth a second pass if he wants that part verified independently.
