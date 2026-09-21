/**
 * Astro does not rewrite links the way Gatsby's pathPrefix did. Every internal
 * href has to go through BASE_URL by hand, or moving the site to a subpath
 * silently breaks every link and every canonical URL while the build stays green.
 *
 * Written on day one on purpose. Retrofitting it later means auditing every
 * component, and the failure is invisible until someone clicks.
 */

const BASE = import.meta.env.BASE_URL; // '/' at the origin root, '/preview/' under one

/**
 * Turn a route-relative path into a real href.
 *
 *   href('/blog/')            -> '/blog/'          (or '/preview/blog/')
 *   href('blog/hello')        -> '/blog/hello/'
 *   href('/')                 -> '/'
 */
export function href(path: string): string {
  const clean = path.replace(/^\/+/, '');
  const joined = `${BASE.replace(/\/+$/, '')}/${clean}`;
  // trailingSlash is 'always', so keep the site internally consistent. Files
  // keep their extension - /rss.xml must not become /rss.xml/.
  const isFile = /\.[a-z0-9]+$/i.test(joined);
  if (isFile || joined.endsWith('/')) return joined;
  return `${joined}/`;
}

/**
 * Absolute URL, for canonical tags, og:url, the feed and the sitemap.
 * Anything a crawler reads must be absolute.
 */
export function abs(path: string, site: URL | undefined): string {
  const base = site ?? new URL('https://mominbinshahid.github.io');
  return new URL(href(path), base).toString();
}
