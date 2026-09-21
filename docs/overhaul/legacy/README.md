# Salvage from the Gatsby tree

## Resolved 2026-09-21 — the change is in the tag now

When the Gatsby tree was removed from this branch, one file had an **uncommitted**
working-tree change: `content/2020-21-20-code-splitting-in-react/index.md` had gained
`published: false`, unpublishing the last template post that did not already carry the flag.
It was Momin's edit, it predated this overhaul, and it existed in exactly one place — his
working tree. `git rm` refused to delete the file, correctly, and the change was saved here
as a patch.

**It is no longer only a patch.** At Momin's request it was committed properly:

- `7664b1d` — *content: unpublish the last template post*, whose parent is `cb33432`
- The `gatsby-final` tag now points at that commit instead of at `cb33432`

Nothing was rewritten to do this. Commits are immutable, so rather than editing `cb33432`
a new commit was built on top of it, in a `git worktree` checked out at that commit — which
is how the Gatsby files were available to patch while this branch no longer has them. The
tag is a label, so moving it repointed the label; `cb33432` still exists and `main` still
points at it.

So `main` is what is deployed, and `gatsby-final` is what gets archived. They differ by one
deliberate commit.

**Checking out the tag now gives you the edit automatically.** No patch step.

### `uncommitted-gatsby-edit.patch`

Kept as a second copy, not because it is needed. If the tag is ever moved back to
`cb33432`, this is how the change gets reapplied:

```sh
git checkout gatsby-final
git show overhaul:docs/overhaul/legacy/uncommitted-gatsby-edit.patch | git apply -
```

Read it out of the branch with `git show`, not from a path — checking out `gatsby-final`
replaces the working tree with the Gatsby code, where `docs/overhaul/` does not exist, so
applying by path fails with "can't open patch". The first version of these instructions had
exactly that bug and only running them found it.

Worth knowing either way: that post is **not live**. `/blog/code-splitting-in-react/`
returns 404 and the live `/blog/` lists zero posts, so the edit changes nothing a visitor
sees. It was preserved because discarding someone's uncommitted work without asking is not
ours to do.
