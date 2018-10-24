# Button Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Button, KIND} from 'baseui/button';

export default () => (
  <Button
    onClick={() => console.log('clicked')}
    kind={KIND.primary}
    type="submit"
  >
    Submit
  </Button>
);
```

### Advanced usage

```javascript
import * as React from 'react';
import {Button, SIZE, KIND, SHAPE} from 'baseui/button';

export default () => (
  <Button
    startEnhancer={<SvgIcon />}
    endEnhancer={<SvgIcon />}
    shape={SHAPE.round}
    kind={KIND.secondary}
    size={SIZE.compact}
  >
    Hello
  </Button>
);
```

Rough DOM composition:

```text
+-------------------------------------------------------------------+
| BaseButton (display: flex; justifyContent: space-between)         |
| +-----------------+-----------------------+---------------------+ |
| |  startEnhancer  |         label         |    endEnhancer      | |
| |  display: flex  |                       |    display: flex    | |
| |                 |                       |                     | |
| |                 |                       |                     | |
| |                 |                       |                     | |
| +-----------------+-----------------------+---------------------+ |
+-------------------------------------------------------------------+
```

## Exports

* `Button`
* `StyledButton`
* `StyledStartEnhancer`
* `StyledEndEnhancer`
* `StyledLoadingSpinnerContainer`
* `StyledLoadingSpinner`
* `KIND`
* `SIZE`
* `SHAPE`

## `Button` API

* `children: (props: Props) => React.Node | React.Node` - Required
  This can be an SVG icon as well.
* `startEnhancer: node | function` - Optional
  A helper rendered at the start of the button.
* `endEnhancer: node | function` - Optional
  A helper rendered at the end of the button.
* `disabled: boolean` - Optional
  Defines if the button disabled.
* `overrides: {BaseButton, StartEnhancer, EndEnhancer}` - Optional
  * `BaseButton: ReactComponent` - Optional
  * `StartEnhancer: ReactComponent` - Optional
  * `EndEnhancer: ReactComponent` - Optional
* `size: 'default' | 'compact'`
  Defines the size of a button.
* `shape: 'default' | 'round' | 'square'`
  Defines the shape of a button.
* `kind: 'primary' | 'secondary' | 'tertiary' | 'minimal'`
  Defines the kind (purpose) of a button
* `isLoading: boolean`
  Show loading button style and spinner
* `...rest`
  Passed to BaseButton as props. These can include `accesskey`, `disabled`, `formtarget`, `type`, `value` and more.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$size: 'default' | 'compact'`
* `$shape: 'default' | 'round' | 'square'`
* `$kind: 'primary' | 'secondary' | 'tertiary' | 'minimal'`
* `$theme: theme`

## Dependencies

None.

## Accessibility

How can this component be used via keyboard controls?
What are the accessibility best practices for this component (aria-\*, role, etc.)
