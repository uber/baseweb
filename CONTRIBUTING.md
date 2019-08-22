---
category: Introduction
page: Contributing
---

# Contributing to baseui

## Getting started

1. Clone the repo locally and run `yarn` to install dependencies from npm.

```bash
git clone git@github.com:uber-web/baseui.git
cd baseui
yarn
```

2. To start a website to develop against, run `yarn documentation:dev`.
3. To unit test your changes run `yarn test` or `yarn test --watch` to continuously run the relevant tests.

Do you miss a component? Would you like to extend the featureset of a component?
This document helps you navigate the process.

## Definition of done

- Each component has a drop-in, stateful, stateless, styled (presentation) components exported
  - When you add examples for the documentation site, try to prioritize stateless examples with hooks
- Browser accessibility support and aria attributes
  - A11y rules can be found [here](https://dequeuniversity.com/rules/axe/3.0/),
  - Run `yarn lint` , which has eslint-plugin-jsx-a11y running as part of it https://github.com/evcohen/eslint-plugin-jsx-a11y#supported-rules,
  - Check out `TESTING.md` to learn how to run end-to-end tests
- [Styletron](https://www.styletron.org/) for CSS-in-JS styling
- Unit tests with [jest](https://jestjs.io/en/) and [enzyme](https://airbnb.io/enzyme/)
- [Flow](https://flow.org/) type coverage for all relevant component code and tests
  - TypeScript coverage for the API
- Documentation added to the docs site. You start the doc site using `yarn documentation:dev:watch`.

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
