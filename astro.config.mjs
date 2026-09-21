// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';

// Both are environment-driven from the first commit so that "preview at a subpath"
// and "serve at the origin root" are the same build with one variable changed.
// Getting this wrong is the single most likely way the cutover breaks.
const site = process.env.SITE_URL ?? 'https://mominbinshahid.github.io';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,

  // The old site served /resume/ with a slash. Keeping that shape means Search
  // Console and every existing inbound link still point at a canonical URL.
  trailingSlash: 'always',

  // Default is 'jsx', which collapses whitespace between inline elements the way
  // React does. Set it explicitly - see decisions.md.
  compressHTML: true,

  build: {
    // Stays the default `_astro`. public/.nojekyll is what keeps Pages from
    // dropping it, and that file is not optional.
    assets: '_astro',
    format: 'directory',
  },

  integrations: [
    expressiveCode({
      themes: ['github-dark', 'github-light'],
      // No visual opinions yet. The design pass picks the real themes.
      styleOverrides: { borderRadius: '0' },
    }),
    sitemap({
      // Drafts never reach the sitemap. They are not in the build at all, but
      // this is the belt to the braces.
      filter: (page) => !page.includes('/drafts/'),
    }),
  ],
});
