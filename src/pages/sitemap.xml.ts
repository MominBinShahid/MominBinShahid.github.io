import type { APIContext } from 'astro';

/**
 * @astrojs/sitemap always names its index `<filenameBase>-index.xml`. That is a
 * hard limit in the integration, and it means the live /sitemap.xml - which is
 * registered in Search Console and named in robots.txt - would start 404ing on
 * cutover.
 *
 * So /sitemap.xml stays alive as a sitemap *index* pointing at the chunk the
 * integration writes. Both URLs work, the registered one keeps working, and the
 * integration still does the route discovery.
 *
 * Assumption: one chunk. @astrojs/sitemap splits at 45,000 URLs by default; this
 * site has about ten. If it ever splits, this file has to list every chunk.
 */
export async function GET(context: APIContext) {
  const site = context.site ?? new URL('https://mominbinshahid.github.io');
  const chunk = new URL('sitemap-0.xml', site).toString();

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${chunk}</loc></sitemap>
</sitemapindex>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
