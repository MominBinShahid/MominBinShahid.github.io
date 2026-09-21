# Cross-round review — 15 directions, 4 rounds

Audited 2026-09-18. Claims below were spot-checked against the files.

**Fourteen of fifteen were rejected for direction, not craft.** Several hold a good
idea attached to a page aimed at the wrong goal. This is the parts list.

---

## Verified findings

**A real theming bug in `codex2-opus.html`.** Its one bare `:root` block contains
only fonts, spacing and easing — **no colours**. Every colour token sits inside
`:root[data-theme="light"]` / `[data-theme="dark"]`, and the only
`prefers-color-scheme` in the file is JavaScript at line 828 of 1,059. Before that
script runs, or without JS, the page has no colour tokens at all.
`codex2-fable.html` does it correctly: two bare `:root` palettes, real
`prefers-color-scheme` CSS, and a pre-paint script in the first thirty lines.

**Invented numbers, and they trace to Claude's briefs, not the designers.**
"400 support calls a day" appears in seven files — the résumé says *hundreds*,
never 400 — because it was written into the brief. "Fourteen years of JavaScript"
is in `directions.html`; the résumé says eight. Round 4 has zero invented numbers,
because by then the résumé was in `content.md`.

---

## The parts list — one steal per direction

| Direction | Steal |
|---|---|
| Chromatic *(directions.html)* | Whole palette from one OKLCH `--h` token, with a draggable hue slider |
| Specimen *(directions.html)* | Self-annotating specimen conceit — "weight 700 / tracking −0.055em", KARACHI 24.86°N 67.01°E |
| Departure *(directions.html)* | Route line `WordPress —— Gatsby —— Astro` as biography; post codes ("M1 · 04") |
| Quiet *(directions.html)* | Sentence-as-hero. Nothing else — it is also the invented-bio exhibit |
| fable-a *Two Registers* | Named accent deck with light/dark pairs (sea/rickshaw/marigold/monsoon); Urdu console egg |
| fable-b *Ultramarine Ledger* | Three-state theme CSS done right; seeded SVG waveform with the flagged span |
| fable-c *Signal to Sense* | **The redacted-transcript verdict figure — best artifact in all fifteen.** Timestamped bars, ✓/✗ chips, "No quote, no verdict." Privacy-preserving proof |
| fable-d *Code & Consciousness* | Light mode that keeps code blocks dark — "the machine does not change rooms"; the commonplace-book quote pool |
| fable-e *Full Volume* | The empty-blog launch state ("Zero posts. Launched empty, on purpose.") and the reduced-motion line: *"the agent heard that, too"* |
| fable-f *Fihrist* | One-gutter row grid; `/`-queryable index with aria-live match count; Urdu group labels |
| fable-g *Things That Think* | **The witness ledger** — observe dwell time, then visibly retune the page to what held you |
| codex1-fable | Dot-field hero: 5–8 lit marks against hundreds faint, with narrative `aria-label` |
| codex1-opus | **The 92% caveat** — "measured… on that workload, not a number I can promise on anyone else's material"; correct no-JS theme fallback |
| codex2-fable | **Pre-paint theme/accent script** (no flash); hero scope-of-claim line; pen-mark strike/certify |
| codex2-opus | **Withheld-figure links** ("Figure in the résumé ↗"); org cards with one earned line each — *"somebody's whole Tuesday morning"* |

## Best in category

| Category | Winner | Runner-up |
|---|---|---|
| Typography | fable-a (system) / codex2-opus (setting) | fable-d |
| Palette & dark mode | codex2-fable | fable-b |
| Layout | fable-e | fable-f |
| Signature interaction | fable-c | fable-g |
| Real words & numbers | codex2-opus | codex1-opus |
| Blog index | fable-e (empty state) | fable-d (populated) |
| Post page | fable-c | fable-a |
| Craft | codex2-opus | fable-f |
| Selling | codex1-opus | codex1-fable |

## Convergence — ideas that appeared independently in 3+ directions

1. **The dealt accent** — a curated random accent per visit, each a light/dark
   pair. In **10 of 15**. This is Momin's existing feature, reinvented by nearly
   every designer who saw the site. Strong signal: keep it.
2. **The call-becoming-judgment waveform** — five independent renderings of the
   same hero claim.
3. **Contact with no backend, stated plainly** — obfuscated mailto evolving into a
   client-side composer that says "Nothing is sent from this page."

## Genuinely original, not yet reused

- fable-g's dwell ledger that retunes the page to what held you
- fable-c's redacted-transcript verdict figure
- codex2's withheld-figure pattern — numbers deliberately one click away, as a
  credibility device
- codex2-opus's keyboard-steppable typographic rig
- fable-f's queryable index with in-page `:help` / `:dark` / `:deal` commands
- Chromatic's single-hue OKLCH token system

## Five demonstrated failures to avoid

1. **Invented precision.** Round 4 proved the real numbers are stronger.
2. **Colours defined only inside `[data-theme]` blocks with a JS-stamped theme.**
3. **Equal-weight tiles or ledgers of six facets** — flat hierarchy buries the best
   claim. Exactly what `selling.md` warns about.
4. **Third-person voice on a personal page** — fable-c's "He built…"; codex2-fable
   mixes I/he. codex2-opus uses none and reads better for it.
5. **Name-and-title heroes with no offer** — all seven pre-round-4 home pages died
   on this, despite having the best layouts in the set.

## Model comparison — same brief, two models

Both pairs converged on typefaces and palettes: brief 1 gave Barlow Condensed +
IBM Plex and cobalt/raspberry/teal in **both** models; brief 2 gave Newsreader +
Public Sans and petrol/mulberry/ochre in **both**. Neither model saw the other's
work.

**The brief decided the design, not the model.** The leverage is in the brief.

Where they differ:
- **codex1**: Opus has the correct no-JS theme fallback, sessionStorage
  persistence, and the 92% caveat. Fable has the stronger hero visualisation but
  JS-only dark mode.
- **codex2**: Fable wins engineering hygiene — pre-paint script, full three-state
  CSS, `color-scheme`. Opus wins voice, scale and finish — 1,059 lines, 12 media
  queries, 7 focus-visible rules, the best sentences in all fifteen files, and the
  only résumé link that actually resolves — while committing the set's one real
  theming bug.

> **Merge codex2-fable's head and codex2-opus's body and you have the strongest
> single file here.**

---

## Process lessons (Claude's, not the designers')

- Designs were generated four times before the goal was established. Each round
  learned the goal from the rejection.
- Claude's framing propagated into every output — the two-column shell into four
  briefs, invented numbers into seven files.
- Volume did not converge. Fifteen designs produced more to reject, not more
  signal. The Codex experiment showed why: fix the brief, not the builder.
- Constraints were read too literally. "No landing page" was taken as banning the
  concept; it meant "these landing pages are weak."
- The brief's own instruction "lead with a NUMBER, not a job title" produced four
  metric-led heroes in Round 4 and all four were wrong. Nobody had asked Momin
  whether he wanted his achievements used as a hook. He did not."
- **Momin's taste was never extracted.** Sixty-one reference sites and fifteen
  designs were shown for reaction, but he was never asked to point at something and
  say why it works. Fifteen data points on what he rejects; almost none on what he
  wants.

**Suggested next step:** stop generating whole designs. Decide in small pairs —
two type pairings, two colour approaches, two hero treatments — and build from
decisions he made rather than a brief someone guessed at.

**ANSWERED 2026-09-18.** Credibility, aimed at a job first and consulting second,
in the European and American markets. And a second correction that invalidates all
fifteen: no achievement claims as the hook. *"I don't want to do this what you are
doing that actually states a single fact about me like fixing the API rates or
maybe creating the AI agent that... takes the call from five or eight calls to like
100 of calls. This is not what I want."*

Credibility means category — years, seniority, industries, markets — not results.
Every one of the fifteen designs either opens with a metric or opens with a
name-and-title masthead. Neither is the answer.

Constraints now live in `../content.md` under "Design constraints from Momin".
