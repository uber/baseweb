# Button Group Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';

export default () => {
  return
    <ButtonGroup>
      <Button>Copy</Button>
      <Button>Cut</Button>
      <Button>Paste</Button>
    </ButtonGroup>
}
```

## Exports

* `ButtonGroup`

## `ButtonGroup` API

* `children: (props: Props) => React.Node` - Required
  This can be an SVG icon as well.
* `ariaLabel: string` - Optional:
  Accessible label
* `disabled: boolean` - Optional:
  Defines if the button group disabled.
* `size: 'default' | 'compact'`
  Defines the size of the buttons in the button group.
* `shape: 'default' | 'round' | 'square'`
  Defines the shape of the buttons in the button group.
* `kind: 'primary' | 'secondary' | 'tertiary' | 'minimal'`
  Defines the kind (purpose) of the buttons in the button group.
* `onChange: func` - Optinal:
  Called when a toggleable Button is selected
* `onClick: func` - Optional:
  Called with the click event

## Dependencies

None.
