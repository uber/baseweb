# Button Component

Rough DOM composition:

```
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

### Exports

* `Button`
* `StyledButton`
* `StyledButtonLabel`
* `StyledStartEnhancer`
* `StyledEndEnhancer`
* `KIND`
* `SIZE`
* `SHAPE`

### <Button/> API

* `children: (props: Props) => React.Node` - Required
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
* `shape: 'round' | 'square'`
  Defines the shape of a button.
* `kind: 'primary' | 'secondary' | 'tertiary' | 'minimal'`
  Defines the kind (purpose) of a button
* `...rest`
  Passed to BaseButton as props. These can include `accesskey`, `disabled`, `formtarget`, `type`, `value` and more.

### Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$size: 'default' | 'compact'`
* `$shape: 'round' | 'square'`
* `$kind: 'primary' | 'secondary' | 'tertiary' | 'minimal'`
* `$theme: theme`

### Usage

Basic usage:

```javascript
import * as React from 'react';
import {Button, KIND} from 'baseui/button';

export default () => <Button kind={KIND.primary}>Submit</Button>;
```

Advanced usage:

```javascript
import * as React from 'react';
import {
  Button,
  StyledStartEnhancer,
  StyledEndEnhancer,
  SIZE,
  KIND,
  SHAPE
} from 'baseui/button';

export default () => <Button
  startEnhancer={<StyledStartEnhancer><SvgIcon /></StyledStartEnhancer>}
  endEnhancer={<StyledEndEnhancer><SvgIcon /></StyledEndEnhancer>}
  shape={SHAPE.round}
  kind={KIND.secondary}
  size={SIZE.compact}
>Hello</Button>;
```

### Dependencies

None.

### Accessibility

How can this component be used via keyboard controls?
What are the accessibility best practices for this component (aria-\*, role, etc.)
