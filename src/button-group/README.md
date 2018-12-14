# Button Group Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Button, ButtonGroup} from 'baseui/button-group';

export default () => {
  return
    <ButtonGroup>
      <Button>Copy</Button>
      <Button>Cut</Button>
      <Button>Paste</Button>
    </ButtonGroup>
}
```

### Advanced usage

```javascript
import * as React from 'react';
import {Button, ButtonGroup} from 'baseui/button-group';

export default () => {
  return
    <ButtonGroup
      selected={[0, 1]}
      mode="checkbox"
    >
      <Button>Bold</Button>
      <Button>Italic</Button>
      <Button>Underline</Button>
    </ButtonGroup>
}
```

## Exports

* `Button`
* `ButtonGroup`
* `StatefulButtonGroup`
* `StyledRoot`

## `Button` API

Same as `{Button} from baseui/button`, with the additional property:
* `selected: boolean` - Optional:
  * Defines if the button is in a selected state. Defaults to `false`.

## `ButtonGroup` API

* `children: (props: Props) => React.Node` - Required
  * This can be an SVG icon as well.
* `ariaLabel?: string`
  * Accessible label
* `mode?: string`
  * Use the `mode` prop to render toggleable Buttons:
    * the value `radio` will cause Buttons to behave like radio buttons,
    * the value `checkbox` will cause Buttons to behave like checkboxes.
* `selected?: number | Array<number>`
  * Index or array of indices of the selected Button(s).
  * Primarily for use with controlled components with a `mode` prop defined.
* `disabled?: boolean`
  * Defines if the button group disabled.
* `size?: 'default' | 'compact' = 'default'`
  * Defines the size of the buttons in the button group.
* `shape?: 'default' | 'round' | 'square' = 'default'`
  * Defines the shape of the buttons in the button group.
* `kind?: 'primary' | 'secondary' | 'tertiary' | 'minimal' = 'secondary'`
  * Defines the kind (purpose) of the buttons in the button group.
* `onClick?: (event: Event) => mixed`
  * Called with the click event.

## `StatefulButtonGroup` API

Extends the `ButtonGroup` API with this additional props:

* `initialState: {selected: number | Array<number>}`
  Index or array of indices of the selected Button(s).
  Primarily for use with uncontrolled components with a `mode` prop defined.

## Dependencies

None.
