# mominbinshahid.github.io

Personal site and blog. Astro 7, static, deployed to GitHub Pages.

Node 24 — `.nvmrc` pins the exact version and fnm/nvm/asdf/mise all read it.

```sh
npm ci
npm run dev
```

`npm run build` runs `astro check` first, so a type error or a malformed post fails
before anything is written.

Posts carry `published: true` in their frontmatter. Leave it out, or set it to `false`,
and the post stays off the built site entirely — no page, no feed entry, no sitemap row —
while still being visible in `npm run dev` so you can read it back.

The site currently has **no visual design**. Every page is semantic single-column
document flow on purpose, because a plain document can become anything later and a
designed layout can only become a similar layout. Design is the next piece of work.

Everything about why this project exists and how it was decided is in
[`../docs/overhaul/`](../docs/overhaul/). `AGENTS.md` in this directory lists the
invariants that are easy to break by accident.
