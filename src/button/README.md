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
* `StyledBaseButton`
* `StyledStartEnhancer`
* `StyledEndEnhancer`
* `StyledLoadingSpinner`
* `StyledLoadingSpinnerContainer`
* `KIND`
* `SIZE`
* `SHAPE`

## `Button` API

* `children?: (props: Props) => React.Node | React.Node = null`
  * This can be an SVG icon as well.
* `startEnhancer?: (props: Props) => React.Node | React.Node = null`
  * A helper rendered at the start of the button.
* `endEnhancer?: (props: Props) => React.Node | React.Node = null`
  * A helper rendered at the end of the button.
* `disabled?: boolean = false`
  * Defines if the button disabled.
* `overrides?: {BaseButton, StartEnhancer, EndEnhancer} = {}`
  * `BaseButton?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `StartEnhancer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `EndEnhancer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `LoadingSpinnerContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `LoadingSpinner?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
* `size?: SIZE[string] = SIZE.default`
  * Defines the size of a button.
* `shape?: SHAPE[string] = SHAPE.default`
  * Defines the shape of a button.
* `kind?: KIND[string] = KIND.primary`
  * Defines the kind (purpose) of a button
* `isLoading?: boolean = false`
  * Show loading button style and spinner.
* `...rest`
  * Passed to BaseButton as props. These can include `accesskey`, `formtarget`, `type`, `value` and more.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

`StyledBaseButton`, `StyledStartEnhancer`, `StyledEndEnhancer`, `StyledLoadingSpinner`,
`StyledLoadingSpinnerContainer`

* `$size?: SIZE[string] = SIZE.default`
* `$shape?: SHAPE[string] = SHAPE.default`
* `$kind?: KIND[string] = KIND.primary`
* `$theme: theme`

## `KIND` Constant

* `primary`
* `secondary`
* `tertiary`
* `minimal`

## `SIZE` Constant

* `default`
* `compact`

## `SHAPE` Constant

* `default`
* `round`
* `square`

## Accessibility

* How can this component be used via keyboard controls?
* What are the accessibility best practices for this component (aria-\*, role, etc.)
