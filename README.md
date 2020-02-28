<p align="center">
  <a href="https://baseweb.design">
    <img width="250px" src="https://res.cloudinary.com/dawr8pobn/image/upload/v1556920604/base-web.svg">
  </a>
</p>

<h1 align="center">Base Web React Components</h1>

[![Build status](https://badge.buildkite.com/92a7500cd98f619621c4801833d8b358c2fd79efc9b98f1b98.svg?branch=master)](https://buildkite.com/uberopensource/baseui)

**Base** is a design system comprised of modern, responsive, living components. Base Web is the React implementation of Base.

<p align="center">
  <a href="https://baseweb.design">
    <img width="500px" src="https://i.imgur.com/UaRZdTq.png">
  </a>
</p>

## Usage

On npm, you can find Base Web as `baseui`.

Add `baseui` and its peer dependencies to your project:

```bash
# using yarn
yarn add baseui styletron-react styletron-engine-atomic

# using npm
npm install baseui styletron-react styletron-engine-atomic
```

```javascript
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider, styled} from 'baseui';
import {StatefulInput} from 'baseui/input';

const engine = new Styletron();

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export default function Hello () {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Centered>
          <StatefulInput />
        </Centered>
      </BaseProvider>
    </StyletronProvider>
  );
}
```

Both Base Web and Styletron come with [flow types](https://flow.org/) and [TypeScript](https://www.typescriptlang.org/index.html). All our components are typed and examples have Vanilla, Flow and TypeScript versions. For Styletron + TS, you need to add some additional packages:

```bash
yarn add @types/styletron-standard @types/styletron-react @types/styletron-engine-atomic
```

## Example

An example of an application using Base Web can be found [here](https://github.com/tajo/fusion-baseui). You can also check how it works on [CodeSandbox](https://codesandbox.io/s/patient-sky-nn8t7).

## Docs

To read the documentation, please visit [baseweb.design](https://baseweb.design).

## Contributing

[Contributing](CONTRIBUTING.md)

## Shoutouts 🙏

<img src="https://raw.githubusercontent.com/tajo/react-movable/master/assets/browserstack-logo.png?raw=true" height="80" title="BrowserStack Logo" alt="BrowserStack Logo" />

Big thanks to [BrowserStack](https://www.browserstack.com) for letting the maintainers use their service to debug browser issues.
