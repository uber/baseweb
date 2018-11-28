---
category: Introduction
page: Getting started
---

# Getting started with Base UI

Add `baseui` and it's peer dependencies to your project:

```bash
# using yarn
yarn add baseui styletron-react styletron-react-core styletron-standard styletron-engine-atomic

# using npm
npm install baseui styletron-react styletron-react-core styletron-standard styletron-engine-atomic
```

```javascript
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, ThemeProvider, styled} from 'baseui';
import {StatefulInput} from 'baseui/input';

const engine = new Styletron();

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export default function Hello() {
  return (
    <StyletronProvider value={engine}>
      <ThemeProvider theme={LightTheme}>
        <Centered>
          <StatefulInput />
        </Centered>
      </ThemeProvider>
    </StyletronProvider>
  );
}
```
