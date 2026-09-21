/**
 * Ported from the Gatsby 404 page, where it was load-bearing and easy to lose.
 *
 * GitHub Pages serves a project site at its repository's EXACT case, so
 * /mealunits/ never reaches that app at all. It falls through to this user site
 * and lands on the 404. The page really is missing, but the URL is only wrong in
 * shape, and a 404 is the wrong answer to a typing difference.
 *
 * Listed rather than guessed: only a first segment that case-insensitively
 * matches a real project is rewritten, so every other 404 still renders as one.
 */
export const PROJECTS = ['MealUnits'] as const;

/**
 * The correctly-cased path, or null when there is nothing to correct.
 *
 * "Nothing to correct" includes the case already being right, and returning null
 * there is what stops a redirect loop. Do not turn it into a truthiness check.
 */
export function canonicalProjectPath(pathname: string): string | null {
  const segments = pathname.split('/');
  const first = segments[1];
  if (!first) return null;

  const project = PROJECTS.find((name) => name.toLowerCase() === first.toLowerCase());
  if (!project || project === first) return null;

  segments[1] = project;
  return segments.join('/');
}
