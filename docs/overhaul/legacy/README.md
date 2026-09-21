# Salvage from the Gatsby tree

## `uncommitted-gatsby-edit.patch`

When the Gatsby tree was removed from this branch on 2026-09-21, one file had an
**uncommitted** working-tree change: `content/2020-21-20-code-splitting-in-react/index.md`
had gained `published: false`, unpublishing the last template post that did not already
carry that flag.

It was Momin's edit, it predates this whole overhaul, and it existed in exactly one place —
his working tree. The `gatsby-final` tag has the *committed* version, which does not
include it. So it is saved here rather than thrown away.

Apply it when building `legacy-site`, if the intent still holds:

```sh
git checkout gatsby-final
git show overhaul:docs/overhaul/legacy/uncommitted-gatsby-edit.patch | git apply -
```

Read the patch out of the branch with `git show`, not from a path. Checking out
`gatsby-final` replaces the working tree with the Gatsby code, and `docs/overhaul/` does
not exist there — so `git apply docs/overhaul/legacy/...` fails with "can't open patch".
Tested, because the first version of these instructions had exactly that bug.

Worth knowing either way: that post is **not live** today. `/blog/code-splitting-in-react/`
returns 404 and the live `/blog/` lists zero posts, so the edit changes nothing about what
visitors see. It is preserved because discarding someone's uncommitted work without asking
is not ours to do.
