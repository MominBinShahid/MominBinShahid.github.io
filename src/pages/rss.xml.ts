import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { abs } from '../lib/href';
import { getFeedPosts, postPath } from '../lib/posts';

/**
 * config.js on the old site advertised a feed at /rss.xml that no plugin ever
 * generated, so the URL 404'd for years and nobody noticed. This is that promise
 * finally being kept.
 *
 * Uses getFeedPosts, which excludes drafts unconditionally - not even under
 * `astro dev`. A draft in the feed has been published whether you meant it or not.
 */
export async function GET(context: APIContext) {
  const posts = await getFeedPosts();

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? 'https://mominbinshahid.github.io',
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: abs(postPath(post), context.site),
      categories: [...post.data.tags],
    })),
    customData: `<language>${SITE.lang}</language>`,
  });
}
