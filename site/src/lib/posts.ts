import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/**
 * Unpublished posts have to be kept out of four places, and it is easy to miss one:
 * the blog index, the RSS feed, the sitemap, and the post's own route.
 *
 * So there is exactly one filter, here, and every one of those four calls it.
 * The route uses it in getStaticPaths, which is what makes a draft 404 in
 * production rather than render at a guessable URL.
 */

/** Unpublished posts are visible while writing, never in a build. */
const SHOW_UNPUBLISHED = import.meta.env.DEV;

const newestFirst = (a: Post, b: Post) =>
  b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

/**
 * Posts for the site itself - index, routes, sitemap.
 * Includes drafts under `astro dev` so they can be previewed.
 */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => SHOW_UNPUBLISHED || data.published);
  return posts.sort(newestFirst);
}

/**
 * Posts for the feed. Never includes drafts, not even in dev.
 *
 * A draft in the feed is a published post - subscribers get it and it is out of
 * your hands. So this one does not take the dev exception, which also makes the
 * feed the honest check: /rss.xml listing one item and the index listing two is
 * the filter working, not a bug.
 */
export async function getFeedPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => data.published);
  return posts.sort(newestFirst);
}

/** Route path for a post. The slug is explicit in frontmatter, never the filename. */
export function postPath(post: Post): string {
  return `/blog/${post.data.slug}/`;
}

/** Rough reading time. Deliberately simple; nobody is auditing the number. */
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
