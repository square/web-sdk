# Releasing

We use [semantic-release](https://semantic-release.gitbook.io/semantic-release/#highlights) to automatically create changelogs from commits, publish to [npm](https://www.npmjs.com/package/@square/web-sdk), and create [GitHub releases](https://github.com/square/web-sdk/releases). The release workflow uses npm Trusted Publishing; it does not use a long-lived npm token.

The `beta` git branch publishes prereleases under the `beta` npm tag (for example, `npm i @square/web-sdk@beta`). Pull requests should target this branch so changes can be tried before promotion.

The `main` git branch publishes stable releases under the `latest` npm tag (for example, `npm i @square/web-sdk@latest`). Fixes can target `main` via pull request. Features, including breaking changes, should be developed and tested on `beta` before promotion to `main`.

## Promote a stable release

GitHub only permits squash merges in this repository. A squash merge gives `main` a new commit that is not in `beta`, so the branches' histories diverge after every promotion. Before **every** stable promotion, reconcile that history in a fresh, detached temporary worktree based exactly on `origin/beta`. A normal merge of `origin/main` preserves genuine hotfixes made only on `main`:

```sh
git fetch origin

repo_root="$(git rev-parse --show-toplevel)"
release_tmp="$(mktemp -d)"
release_worktree="$release_tmp/beta-promotion"
git -C "$repo_root" worktree add --detach "$release_worktree" origin/beta
cd "$release_worktree"

git status --short
git merge --no-edit origin/main
git status --short
git log origin/beta..HEAD
git diff origin/beta..HEAD

# Only after reviewing the clean status, log, and diff above:
git push origin HEAD:beta

cd "$repo_root"
git worktree remove "$release_worktree"
rmdir "$release_tmp"
```

Both `git status --short` commands must have no output. Resolve any merge conflicts carefully, then repeat the status, log, and diff inspections before pushing. If you stop before pushing, abort an unfinished merge with `git merge --abort`, return to `$repo_root`, and run the two cleanup commands. Pushing `beta` can cause semantic-release to publish the next beta prerelease. Wait for the [CI workflow's release job](https://github.com/square/web-sdk/actions/workflows/ci.yml) to pass, then verify both the prerelease in [GitHub Releases](https://github.com/square/web-sdk/releases) and the `beta` version on [npm](https://www.npmjs.com/package/@square/web-sdk). A successful npm publication confirms Trusted Publishing worked.

Determine the expected stable `X.Y.Z` version from the verified prerelease and release plan. Open a pull request from `beta` to `main`. semantic-release derives the stable version bump from the squash commit's Conventional Commit prefix, not from the version text in its title. Choose the pull request title that produces the intended bump, and ensure `X.Y.Z` matches the expected result:

```text
Patch: fix: version X.Y.Z release
Minor: feat: version X.Y.Z release
Major: feat!: version X.Y.Z release
```

Wait for required checks and review, then **squash merge** the pull request. Do not merge and push `main` locally. The push created by the squash merge runs semantic-release on `main`.

After the workflow passes, verify all of the following:

- npm's `latest` tag points to `X.Y.Z`.
- GitHub has a non-prerelease `vX.Y.Z` release.
- The package and release assets are available as expected.

The squash merge makes `main` diverge from `beta` again. This is expected; repeat the `main`-into-`beta` reconciliation at the start of the next stable promotion.

[Read more](https://github.com/semantic-release/semantic-release/blob/6013a5633ecb71aac80f7b68b8e7250c5c58f7c0/docs/recipes/pre-releases.md) about publishing prereleases.

[Read more](https://github.com/semantic-release/semantic-release/blob/6013a5633ecb71aac80f7b68b8e7250c5c58f7c0/docs/usage/workflow-configuration.md#workflow-configuration) about expected behavior when pushing to `main` and `beta`.
