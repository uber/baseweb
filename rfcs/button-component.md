# Button Component

Rough DOM composition:

```
+-------------------------------------------------------------------+
| BaseButton (display: flex; justifyContent: space-between)         |
| +-----------------+-----------------------+---------------------+ |
| |  startEnhancer  |         label         |     endEnhancer     | |
| |  display:flex   |                       |     display:flex    | |
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

* `label: node | function` - Optional
  A label in the button.
* `startEnhancer: node | function` - Optional
  A helper rendered at the start of the button.
* `endEnhancer: node | function` - Optional
  A helper rendered at the end of the button.
* `disabled: boolean` - Optional
  Defines if the button disabled.

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
import {
  Button, 
  StyledStartEnhancer, 
  StyledEndEnhancer, 
  SIZE, 
  KIND, 
  SHAPE
} from 'baseui/button';

export default () => <Button 
  label={<div>Hello</div>}
  startEnhancer={<StyledStartEnhancer><SvgIcon></StyledStartEnhancer>}
  endEnhancer={<StyledEndEnhancer><SvgIcon></StyledEndEnhancer>}
  shape={SHAPE.round} 
  kind={KIND.secondary}
  size={SIZE.compact}
/>;
```

### Dependencies

None.

### Accessibility

How can this component be used via keyboard controls?
What are the accessibility best practices for this component (aria-\*, role, etc.)
