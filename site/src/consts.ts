/**
 * Every user-facing string and every piece of site metadata lives here.
 *
 * Two reasons, both from decisions.md: translating later means touching one file
 * rather than hunting literals through components, and nothing in a component
 * should need editing to change a label.
 */

export const SITE = {
  /** Used in <title>, the feed, and structured data. */
  title: 'Momin Bin Shahid',
  /** One line. Shows up in the feed, og:description and the meta description. */
  description:
    'Staff Software Engineer working on applied AI and full-stack software. Notes on what I build and what it taught me.',
  /** BCP 47. Goes on <html lang>. English stays unprefixed; /ur/ would be additive. */
  lang: 'en',
  /** Feed and JSON-LD author. */
  author: 'Momin Bin Shahid',
  /** Fallback social card. Replaced during the design pass. */
  ogImage: '/og-default.png',
} as const;

/** Primary navigation. Paths are route-relative; href() adds the base. */
export const NAV = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog/' },
  { label: 'Resume', path: '/resume/' },
] as const;

/** UI copy. Nothing below should be written inline in a component. */
export const UI = {
  skipToContent: 'Skip to content',
  blogIndexTitle: 'Writing',
  blogIndexIntro: 'Notes on things I built and what they taught me.',
  blogEmpty: 'Nothing published yet.',
  draftBadge: 'Draft',
  postedOn: 'Posted',
  updatedOn: 'Updated',
  readingTimeSuffix: 'min read',
  backToBlog: 'All posts',
  notFoundTitle: 'Not found',
  notFoundBody: 'That page does not exist. It may have moved, or it may never have existed.',
  notFoundAction: 'Go to the homepage',
  feedLabel: 'RSS feed',
  resumeTitle: 'Resume',
  resumeDownload: 'Download PDF',
} as const;
