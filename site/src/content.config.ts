import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content collections with a typed schema. The schema is the cheapest test on
 * the site: a malformed post fails the build instead of rendering wrong.
 *
 * Note `z` comes from 'astro/zod'. Importing it from 'astro:content' was
 * removed in v6.
 */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(120),
      description: z.string().max(300),

      /**
       * Required on purpose. The URL is a decision, not a side effect of where
       * the file happens to sit - which also means a post can be renamed or
       * moved into a folder without changing its address.
       */
      slug: z
        .string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'lowercase words separated by single hyphens'),

      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),

      /**
       * The one field the whole publishing flow turns on.
       *
       * Named `published` rather than the `draft` you see in most Astro
       * templates, for two reasons. Nothing in Astro reads either name - the
       * old `markdown.drafts` built-in was removed, so this is our field and
       * our filter - and `draft: false` makes you reason through a double
       * negative to work out that a post is live.
       *
       * It defaults to FALSE on purpose. A post that says nothing stays off the
       * site. Publishing is an explicit act, which means the expensive mistake
       * - shipping something half-written - cannot happen by forgetting a line.
       * The cheap mistake, a finished post not appearing, is obvious the moment
       * you look at the site.
       */
      published: z.boolean().default(false),

      tags: z.array(z.string()).default([]),

      heroImage: image().optional(),
      heroAlt: z.string().optional(),

      /** Per-post theming, read by the layout. Keeps MDX off the table. */
      theme: z.string().optional(),
    })
      /** An image without alt text is a bug, so make it one the build can catch. */
      .refine((d) => !d.heroImage || !!d.heroAlt, {
        message: 'heroImage requires heroAlt',
        path: ['heroAlt'],
      }),
});

export const collections = { blog };
