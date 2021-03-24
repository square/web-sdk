# Releasing

We use [semantic-release](https://semantic-release.gitbook.io/semantic-release/#highlights) to automatically create changelogs from commits, publish to [npm](https://www.npmjs.com/package/@square/web-sdk), and create [GitHub releases](https://github.com/square/web-sdk/releases).

Our `beta` git branch allows us to publish pre-releases as the `beta` tag on npm (i.e. `npm i @square/web-sdk@beta`). Pull Requests should target this branch so changes can be tried out before being promoted to the default distribution channel.

Our `main` git branch is the default distribution channel which is published as the `latest` tag on npm (i.e. `npm i @square/web-sdk@latest`). Fixes can be made directly to this branch (preferably via Pull Request). Features, including breaking changes, should be developed and tested on the `beta` branch before being merged upstream to this `main` branch.

Promoting features from `beta` to `main` is a manually process but a simple script:

```sh
./script/release.sh
```

That script will:

1. get your local up to date
1. merge `beta` into `main` using a merge commit strategy to help semantic-release
1. push `main` to GitHub to trigger GitHub Actions which will run semantic-release

[Read more](https://github.com/semantic-release/semantic-release/blob/6013a5633ecb71aac80f7b68b8e7250c5c58f7c0/docs/recipes/pre-releases.md) about publishing pre-releases.

[Read more](https://github.com/semantic-release/semantic-release/blob/6013a5633ecb71aac80f7b68b8e7250c5c58f7c0/docs/usage/workflow-configuration.md#workflow-configuration) about expected behavior when pushing to the `main` and `beta` branches.
