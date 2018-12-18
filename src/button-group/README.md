# Button Group Component

Groups a collection of buttons together. Can also operate as a radio group or checkbox group.

## Usage

### Basic usage

```javascript
import React from 'react';
import {Button} from 'baseui/button';
import {StatefulButtonGroup} from 'baseui/button-group';

export default () => {
  return
    <StatefulButtonGroup>
      <Button>Copy</Button>
      <Button>Cut</Button>
      <Button>Paste</Button>
    </StatefulButtonGroup>
}
```

### Advanced usage

```javascript
import React from 'react';
import {Button} from 'baseui/button';
import {ButtonGroup} from 'baseui/button-group';

export default class MyCustomLogic extends React.Component {
  state = {selected: [0, 1]};

  handleClick = (event, index) => {
    if (!this.state.selected.includes(index)) {
      this.setState({selected: [...this.state.selected, index]});
    } else {
      this.setState({
        selected: this.state.selected.filter(value => value !== index),
      });
    }
  }

  handleBold = (event) => {
    // event handler only for the 'bold' button
  }

  render() {
    return (
      <ButtonGroup
        selected={this.state.selected}
        mode="checkbox"
        onClick={this.handleClick}
      >
        <Button onClick={this.handleBold}>Bold</Button>
        <Button>Italic</Button>
        <Button>Underline</Button>
      </ButtonGroup>
    )
  }
}
```

## Exports

* `ButtonGroup`
* `StatefulButtonGroup`
* `StatefulContainer`
* `StyledRoot`
* `MODE`
* `STATE_CHANGE_TYPE`

## `ButtonGroup` API

* `children: (props: Props) => React.Node` - Required.
  * Set of more than one `Button` components.
* `ariaLabel?: string`
  * Accessible label.
* `mode?: string`
  * Use the `mode` prop to render toggleable Buttons:
    * the value `radio` will cause Buttons to behave like radio buttons,
    * the value `checkbox` will cause Buttons to behave like checkboxes.
* `selected?: number | Array<number>`
  * Index or array of indices of the selected Button(s).
  * Primarily for use with controlled components with a `mode` prop defined.
* `disabled?: boolean = false`
  * Defines if the button group is disabled.
* `size?: SIZE[string] = 'default'`
  * Reference [`SIZE` constant](https://github.com/uber-web/baseui/blob/master/src/button/constants.js)
  * Defines the size of the buttons in the button group.
* `shape?: SHAPE[string] = 'default'`
  * Reference [`SHAPE` constant](https://github.com/uber-web/baseui/blob/master/src/button/constants.js)
  * Defines the shape of the buttons in the button group.
* `kind?: KIND[string] = 'secondary'`
  * Reference [`KIND` constant](https://github.com/uber-web/baseui/blob/master/src/button/constants.js)
  * Defines the kind (purpose) of the buttons in the button group.
* `onClick?: (event: Event, index: number) => mixed`
  * Called with click events from children. If a child button has its own click handler, the local handler will be called first, then this handler will trigger.

## `StatefulButtonGroup` API

* Maintains same API as `ButtonGroup` except:
* Does not include `selected` prop.
* `initialState?: {selected: number | Array<number>} = {selected: []}`
  * Sets the initial selected items. Relevant if `mode` is set.
* `stateReducer?: (type: STATE_CHANGE_TYPE[string], nextState: {}, currentState: {}) => nextState`
  * A state change handler. Used to override default state transitions.
    * `type` - State change type.
    * `nextState` - A new state, provided by component transition, that will be set.
    * `currentState` - Current state of the component.

## `StatefulContainer` API

* Maintains same API as `StatefulButtonGroup` except:
* `children: (props: { onClick: (event: Event, index: number), selected: number | Array<number>}) => React.Node` - Required.

## `MODE` Constant

* `checkbox`
* `radio`

## `STATE_CHANGE_TYPE` Constant

* `change`
