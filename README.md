# web-sdk

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Development

### Getting Started

This project uses Node v15 as defined by `.nvmrc` to take advantage of npm@7. You can use [nvm](https://github.com/nvm-sh/nvm) to install the correct version:

```sh
nvm install $(cat .nvmrc)
```

Install dependencies with [npm](https://docs.npmjs.com/cli/v7) which should also install git hooks with [husky](https://typicode.github.io/husky/#/).

```sh
npm install
```

_You can verify husky installed correctly by verifying the output of `git config core.hooksPath` is `.husky`. If this didn't work for some reason, you can run `npx husky install`._

### Testing

You can run all linters, tests, and builds like CI with `npm test`.

#### Unit

[Jest](https://jestjs.io/en/) is used as the testing framework providing the runner, structure, assertions, mocks, and coverage among other features.

```sh
npm run test:unit
```

### Linting

You can run all linters with `npm run lint`.

#### ESLint

[ESLint](https://eslint.org/) analyzes the code to find and fix problems. We use [eslint-plugin-square](https://github.com/square/eslint-plugin-square) for out-of-the-box configuration.

```sh
npm run lint:eslint
```

##### Fixing warnings and errors automatically

ESLint can sometimes fix warnings and errors automatically for you with its [--fix option](https://eslint.org/docs/user-guide/command-line-interface#fixing-problems).

```sh
npm run lint:eslint --fix
```

#### Prettier

[Prettier](https://prettier.io/) is an opinionated code formatter. We use [@square/prettier-config](https://github.com/square/prettier-config) for those opinions.

```sh
npm run lint:prettier
```

##### Fixing code style issues

If after running `npm run lint:prettier` you get a warning like, "Code style issues found in the above file(s). Forgot to run Prettier?", you can have Prettier fix them.

```sh
npm run lint:prettier:fix
```

### Building

[TypeScript](https://www.typescriptlang.org/) is used to build the module that is published to npm.

```sh
npm run build
```

### Conventional Commits

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary) are used for commit messages which allows us to automate changelogs and releases that dovetail with [SemVer](http://semver.org/).

## Continuous Integration

[GitHub Actions](https://docs.github.com/en/actions) is used for our CI/CD workflows. See `.github/workflows` for details.

## Releasing

We use [semantic-release](https://semantic-release.gitbook.io/semantic-release/#highlights) to automatically create changelogs from commits, publish to npm, and create GitHub releases.

[Read more](https://github.com/semantic-release/semantic-release/blob/6013a5633ecb71aac80f7b68b8e7250c5c58f7c0/docs/recipes/pre-releases.md) about publishing pre-releases.

[Read more](https://github.com/semantic-release/semantic-release/blob/6013a5633ecb71aac80f7b68b8e7250c5c58f7c0/docs/usage/workflow-configuration.md#workflow-configuration) about expected behavior when pushing to the `main` and `beta` branches.
