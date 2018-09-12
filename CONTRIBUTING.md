# Contributing to baseui

Do you miss a component? Would you like to extend the featureset of a component?
This document helps you navigate the process.

## Contributing new components

1.  Write a mini-RFC on the component you'd like to add, and send a PR. You can find [examples here](https://github.com/uber-web/baseui/tree/master/rfcs).

* It is ok, if your new component just implements the features you need, we may extend that later

2.  Once your RFC PR is approved, start implementing the component

* To make the review process fast, please try to send small PRs, if you can
* All T0D0s in the code have to have a corresponding issue created. Refer to the created issue in the T0D0s following the format `// TOD0(#44): Something`

3.  Once your implementation is merged, the baseui team will release it

### Definition of done

* Component has any drop-in, stateful, stateless, styled (presentation) components exported
* The component follows the default style guides of the Design team, but can be customised and fully theme-able through React Context
* Browser accessibility support and aria attributes
  * Rules can be found here: https://dequeuniversity.com/rules/axe/3.0/
  * Run `yarn lint` , which has eslint-plugin-jsx-a11y running as part of it https://github.com/evcohen/eslint-plugin-jsx-a11y#supported-rules
  * Run `yarn e2e` for e2e test, which has AxeBuilder running as part of it
* Styletron for CSS-in-JS styling
* Unit tests and snapshot tests with jest and enzyme
* Flow type coverage for all relevant component code and tests
* Documentation via Storybook: exhaustive examples (all possible props passed examples, custom styles example, custom props example, custom subcomponents, examples of precomposed and self-composed components)
* The PR is approved by the baseui team
* The PR is approved by the Design Team
