---
category: Introduction
page: Versioning policy
---

# Base UI Versioning Policy

We recognize that you need stability from Base UI.

This document describes the practices that we follow to provide you the Base UI library. We want everyone who depends on Base UI to know when and how new features are added, and to be well-prepared when obsolete ones are removed.

Development builds of Base UI include many helpful warnings. Whenever possible, we add warnings in preparation for future breaking changes. These warnings do not affect the production version of your application.

We are following [SemVer](https://semver.org), with a few flavours. We do not bump major versions for the following changes:

- Any component or functions that's prefixed with `Unstable_` / `unstable_` may change or got removed without notice.
- Visual changes, like colors and sizes, or any changes in CSS.
- Change in undocumented APIs and internal data structures.
