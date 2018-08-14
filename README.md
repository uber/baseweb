**Currently baseui is under active development, and may not be ready for production use.**

# BASE UI

[![Build status](https://badge.buildkite.com/4c46e1f96d71ca1eaab3236c90a8ff4d218eb818e412ba1cf9.svg?branch=master)](https://buildkite.com/uber/baseui)

`baseui` is a design system comprised of modern, responsive, living components.

### Usage

Add `baseui` to your project:

```bash
# using yarn
yarn add @uber/baseui

# using npm
npm install @uber/baseui
```

```javascript
import {LightTheme, ThemeProvider, styled} from '@uber/baseui';
import {StatefulInput} from '@uber/baseui/input';

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export default function Hello() {
  return (
    <ThemeProvider theme={LightTheme}>
      <Centered>
        <StatefulInput />
      </Centered>
    </ThemeProvider>
  );
}
```

### Docs

[Docs by Storybook](https://baseui.netlify.com/)

### Contributing

[Contributing](CONTRIBUTING.md)
