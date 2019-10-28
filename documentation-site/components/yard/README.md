# react-view

**React View is an interactive playground, documentation and code generator** for your  React components. All that packaged in a single component that can be dropped into any application.

Use it to document your component APIs. Users can then live-edit component props and grab the generated ready-to-use source code.

[**Check this demo.**](https://baseweb.design/components/input/)

All you need to do is describing your component with a configuration file and React View will do the rest.

React View has **three main parts**:

- **rendered component**
- **knobs** - each prop is mapped into an input, radio group, textarea or checkbox, those values are live-editable
- **code** - gets updated as you edit the knobs, it can be also edited directly

## Always Synchronized

These three parts are **3-way synchronized**. 😱 What does it mean?

- An interaction with the rendered component updates the knobs and code.
- Editing the knobs updates the rendered component and code.
- Editing the code updates the knobs and rendered component.

## Installation

```
yarn add react-view
```

## Building Blocks

- **react-view useView hook**
    - no UIs or styling, focused on the data, turns config into data (props)
    - Customization of parsing/code generation for all PropTypes.
    - Adding custom PropTypes.
    - Adding an optional Provider (Theme) parsing / code generation.
- **react-view components**
    - unopinionated Compiler, Editor, Error
- **react-view/default**
    - Comes with a basic minimal styling but should be useful out of the box.
    - Allows adding an optional Provider (Theme) parsing / code generation.
- **react-view/base**
    - Comes with Base Web, polished, a drop-in replacement for yard.
    - By default assumes / supports Base Web provider (theme) structure.
    - Requires installing / setting up baseui and styletron.
    - Fully supports `PropTypes.Overrides`.

## react-view basic usage

```jsx
import {useView, Compiler, Editor, Error, PropTypes} from 'react-view';
import {Button} from 'baseui/button';

export default () => {
  const {
    compilerProps,
    knobProps,
    providerProps,
    editorProps,
    error,
    actions,
  } = useView({
    componentName: 'Button',
    componentPlaceholder: '<div>Loading...</div>',
    componentMinHeight: '200px',
    scope: {Button},
    imports: {
      'baseui/button': {
        named: ['Button'],
      },
    },
    props: {
      checked: {
        value: false,
        type: PropTypes.Boolean,
        description: 'Is checkbox checked?',
      },
    },
    onUpdate: ({code, props}) => {
      // useful to update the URL
      console.log(code, props);
    },
    initialCode: 'useful to hydrate the state from URL',
    providerValues: {buttonFillPrimary: '#000000'},
    provider: {
      parse: ({astRoot}) => ({key1: 'value1'}),
      generate: ({values, initialValues}) => t.jsx(),
      imports: {
        baseui: {
          named: ['ThemeProvider'],
        },
      },
    },
    propTypes: {
      // override the default parse/generate handlers for the Boolean type
      [PropTypes.Boolean]: {
        parse: ({astAttrValue}) => astAttrValue.get('expression').get('value'),
        generate: ({value}) => t.booleanLiteral(Boolean(value)),
      },
    },
  });

  return (
    <div>
      <Compiler {...compilerProps} />
      <Tabs>
        <Tab>
          <Knobs {...omit(knobProps, 'overrides')} />
        </Tab>
        <Tab>
          <Overrides {...knobProps.overrides} />
        </Tab>
        <Tab>
          <ThemeEditor {...providerProps} />
        </Tab>
      </Tabs>
      <Editor {...editorProps} />
      <Error error={error} />
      <Button onClick={actions.formatCode}>Format</Button>
      <Button onClick={actions.reset}>Reset</Button>
      <Button onClick={actions.copyCode}>Copy code</Button>
    </div>
  );
};
```
## react-view/default

```jsx
import {useView} from 'react-view';
import {View} from 'react-view/default';

export default () => {
  const viewProps = useView({
    componentName: 'Button',
    componentPlaceholder: '<div>Loading...</div>',
    componentMinHeight: '200px',
    scope: {Button},
    imports: {
      'baseui/button': {
        named: ['Button'],
      },
    },
    props: {
      checked: {
        value: false,
        type: PropTypes.Boolean,
        description: 'Is checkbox checked?',
      },
    },
    onUpdate: ({code, props}) => {
      // useful to update the URL
      console.log(code, props);
    },
    initialCode: 'useful to hydrate the state from URL',
  });
  return <View {...viewProps} />
};
```

## react-view/base

The provider prop (theme) is optional. By default, the Base Web theme structure is used.

This also comes with `PropTypes.Overrides`

This is a 100% drop-in for the current yard.

```sh
yarn add baseui styletron-react styletron-engine-atomic
```

```jsx
import {Client as Styletron} from 'styletron-engine-atomic';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import {View, PropTypes} from 'react-view/base';

const engine = new Styletron();

export default () => {
  const viewProps = useView(/* config... */);
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <View {...viewProps} />
      </BaseProvider>
    </StyletronProvider>
  );
}
```

## Exports

An overview of all exports.

```js
import { View } from 'react-view/default'; // unstyled / inline styles

import {
  View,
  PropTypes,
  lightEditorTheme,
  darkEditorTheme
} from 'react-view/base'; // opinionated

import {
  useView,
  Compiler,
  Error,
  Editor,
  editorLightTheme,
  editorDarkTheme,
  PropTypes
} from 'react-view'; // basic pieces to build your own UIs
```

### Custom PropTypes

Does your component library have some unique prop that could benefit by having a dedicated UI knob? You can extend the default `PropTypes`, add custom parse/generate handlers and UI. 

For example, Base Web components have the `[overrides` prop](https://baseweb.design/guides/understanding-overrides/) that lets you customize any aspect of their styles. However, it's quite a complex data-structure so we provide a custom UI to ease its exploration and usage. 

```js
import { PropTypes as defaultPropTypes } from 'react-view';

// default PropTypes:
// ------------------
// String, ReactNode, Boolean, Number, Enum,
// Array, Object, Function, Overrides, Ref
// Date

enum myPropTypes {
  Overrides = 'overrides'
}

// merge TS enums
export const PropTypes {
  ...defaultPropsTypes,
  ...myPropTypes
}
export type PropTypes = typeof PropTypes;
```

## providerValues & provider

The overall idea is to pass `value: any` into providerValues. Then you have to do four things:

- in `provider.parsespecify` how to get the value out of the code (string)
- in `provider.generate` specify how to get the AST of provider based on value
- define related imports
- build an UI editor based on `providerProps` (`values`, `initialValues`, `onChange`, `reset`)

## Prior Art & Similar Projects

[React Live](https://github.com/FormidableLabs/react-live). Many of its patterns and APIs are directly used in React View. In fact, our first internal version was based on React Live but eventually we needed a finer-grained control over the compilation process. We also rely on babel and babel-parser instead of buble.

[Storybook knobs](https://github.com/storybookjs/storybook/tree/master/addons/knobs). They allow you to edit component props dynamically using the Storybook UI. We use the same concept.

[Playroom](https://github.com/seek-oss/playroom). Simultaneously design across a variety of themes and screen sizes, powered by JSX and your own component library.
