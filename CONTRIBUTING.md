---
category: Introduction
page: Contributing
---

# Contributing to baseui

## Getting started

To quickly launch a web page to start developing, run the commands below to install dependencies and launch the page.

```bash
git clone git@github.com:uber/baseweb.git
cd baseweb
yarn
yarn ladle serve
```

## Testing

There are a variety of testing strategies included in the project. Unit tests and visual regression tests are the most common. Most bug fixes will begin with a failing test. You also may want to add a new page for prototyping; this is done by creating a new `.scenario.js` file within a component `__tests__` directory. If you add a new file, also add that into the `__tests__/component-name.stories.js` file.

### Unit tests

Unit test files are located in component directories (`src/button/__tests__`) and end with a `.test.js` extension. Create a new file or add to an existing one following [jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) conventions.

```bash
# to run all unit tests:
yarn unit-test

# to run a specific unit test:
yarn unit-test src/button/__tests__/button.test.js
````

### End-to-end tests

E2E test files end with a `.e2e.js` extension. These tests can launch a web page and interact with it using the [puppeteer](https://pptr.dev/) library. `mount` function calls within those tests reference the names of `.scenario.js` files. These tests require the baseui library to be compiled before running, so will involve a couple more steps than other testing strategies. If you make a change to library code, you will need to recompile before running e2e tests.

```bash
# in one shell build the library:
yarn e2e:build

# in a second shell serve the web pages:
yarn e2e:serve

# in a third shell run the integration tests:
yarn e2e:test src/button/__tests__/button.e2e.js
```

### Visual regression tests

VRTs take screenshots of web pages and assert pixel-perfect accuracy between pull-requests. More detailed information can be found [here](https://github.com/uber/baseweb/blob/master/vrt/README.md). If you create a new `.scenario.js` file, the VRT job will take a screenshot of it. Be sure not to add any changing data here like timestamps.

### Type checking

The main baseui code has type-checking with [flow](https://flow.org/). Typescript type definitions are also included in component directories at `src/button/index.d.ts`. Our documentation site has examples in both flow and typescript. You'll want to type-check both.

```bash
yarn flow

yarn tsc
```

### Linting

```bash
yarn lint
```

## Documentation

The [project documentation](https://baseweb.design/) is built using [next.js](https://nextjs.org/) and is located in the [`documentation-site`](https://github.com/uber/baseweb/tree/master/documentation-site) directory. To start the project, you will want to follow the instructions below.

```bash
yarn documentation:dev:watch
```

## Contributions we won't accept

While we are extremely grateful for all the contributions we get, sometimes we have to say no to some pull requests.

Usually, we reject contributions if they meet any of the following requirements:

- Introduces a utility function/component, that's not used by Base Web itself.
- New components that were not approved before sending the pull request. To make sure you don't run into any issues landing your new component to the library, please open a GitHub issue first to discuss the new addition.
- Slight alterations of existing components - like introducing a new component called "Fancy Button".
- Breaking changes - if your changeset introduces API changes, please make sure to do them in a backward-compatible way.
- The PR includes opinionated changes that are not necessary - examples for this include introducing destructuring or moving files around based on personal preference.
- Most examples for the documentation site that shows integration with a third-party library or service - we welcome these guides as blogposts. If you are interested in contributing one, please open a GitHub issue with the proposal!

## Definition of done

- Each component has a drop-in, stateful, stateless, styled (presentation) components exported
  - When you add examples for the documentation site, try to prioritize stateless examples with hooks
- Browser accessibility support and aria attributes
  - A11y rules can be found [here](https://dequeuniversity.com/rules/axe/4.2/),
  - Run `yarn lint` , which has eslint-plugin-jsx-a11y running as part of it https://github.com/evcohen/eslint-plugin-jsx-a11y#supported-rules,
  - Check out `TESTING.md` to learn how to run end-to-end tests
- [Styletron](https://www.styletron.org/) for CSS-in-JS styling
- Unit tests with [jest](https://jestjs.io/en/) and [react testing library](https://testing-library.com/docs/react-testing-library/intro)
- [Flow](https://flow.org/) type coverage for all relevant component code and tests
  - TypeScript coverage for the API
- Documentation added to the docs site. You start the doc site using `yarn documentation:dev:watch`.

## Git Commit Formatting

Commit messages should be formatted according to [commitlint](https://commitlint.js.org/#/concepts-commit-conventions) specifications. Doing so allows us to better document the baseweb changelog.

## Sending Pull Requests

When send a pull request, please make sure that you have one of the [following labels](https://github.com/uber-workflow/probot-app-pr-label/blob/master/index.js#L20) set:

- breaking
- feature
- bugfix
- docs
- discussion
- release
- prerelease
- greenkeeping

## Environment Variables

We use a number of environment variables for our build process. Anything used by Buildkite should be stored with our secrets (ask a team member if you need access) and forwarded to the appropriate service in `docker-compose.yml`. Anything needed to build the documentation site should be added to Vercel.

For local development the only environment variables you may need to set up are for the documentation site's Figma based pages (/guidelines). If you are working on code for those pages you will want to create a `.env` file locally and populate `FIGMA_AUTH_TOKEN` as well as `FIGMA_FILE_ID`. You can then use `yarn documentation:dev:watch:env` to automatically load those variables in development.
