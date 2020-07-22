# `eslint-plugin-baseui`

This ESLint plugin is for developers using the Base Web component library. Mainly it attempts to:

- Identify usage of deprecated APIs
- Identify usage of unsupported exports
- Identify improper usage of components

## Installation

Assuming you already have ESLint installed, run:

```sh
# npm
npm install eslint-plugin-baseui --save-dev

# yarn
yarn add eslint-plugin-baseui --dev
```

Then add it to your ESLint configuration:

```js
{
  "plugins": [
    // ...
    "baseui",
  ],
  "rules": {
    // ...
    'baseui/deprecated-theme-api': "warn",
    'baseui/deprecated-component-api': "warn",
    'baseui/no-deep-imports': "warn",
  }
}
```

Or extend the recommended config

```js
{
  "extends": ['plugin:baseui/recommended']
}
```

### Versioning

To get linting specific to your version of `baseui`, simply install the matching version of `eslint-plugin-baseui`.

```json
{
  "dependencies": {
    "baseui": "9.41.0",
  },
  "devDependencies": {
    "eslint-plugin-baseui": "9.41.0",
  }
}
```

We sync the the versions for each package so you shouldn't have to worry about it.

**ℹ️ Note that the first available version of this package is `9.41.0`.**

## Rules

| Rule | Responsibility |
| --- | --- |
| `deprecated-theme-api` | Identify theme properties that are deprecated. |
| `deprecated-component-api` | Identify components and props that are deprecated. |
| `no-deep-imports` | Identify importing unsupported modules from `baseui` source code. |

## Contributing

To publish new versions of this package all you need to do is release a new version of `baseui`. Our deploy script will publish a new version of the eslint plugin which matches the new version of `baseui`. Note, this also means every version of `baseui` will publish a corresponding version of `eslint-plugin-baseui`, even if there are no changes to the package.

## License

MIT
