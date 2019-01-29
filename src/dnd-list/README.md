# Drag and Drop List

## Usage

### Basic stateful usage

```js
import * as React from 'react';
import {StatefulList} from 'baseui/dnd-list';

export default () =>
  <StatefulList
    initialState={{items: ['Item 1', 'Item 2', 'Item 3']}}
    onChange={({newState, oldIndex, newIndex}) => {}}
  />
```

### Stateless usage

```js
import * as React from 'react';
import {List, arrayMove} from 'baseui/dnd-list';

export default class App extends React.Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3'],
  };
  render() {
    return (
      <List
        items={this.state.items}
        onChange={({oldIndex, newIndex}) => {
          this.setState(prevState => ({
            items: arrayMove(prevState.items, oldIndex, newIndex),
          }));
        }}
      />
    );
  }
}
```

### Override usage

```js
import * as React from 'react';
import {StatefulList} from 'baseui/dnd-list';
import {styled} from 'baseui';

export default () =>
  <StatefulList
    initialState={{ items: ['Item 1', 'Item 2', 'Item 3']}}
    overrides={{
      Label: {
        style: ({$isDragged}) => ({
          fontSize: $isDragged ? '20px' : null,
          color: $isDragged ? 'darkred' : null,
        }),
      },
    }}
  >
```

## Exports

* `List`
* `StatefulList`
* `StatefulListContainer`
* `StyledRoot`
* `StyledList`
* `StyledItem`
* `StyledDragHandle`
* `StyledCloseHandle`
* `StyledLabel`
* `STATE_CHANGE_TYPE`
* `arrayMove`
* `arrayRemove`

## `List` API

* `items: Array<React.Node>` - Required.
  List items.
* `overrides: {Root, List, Item, DragHandle, CloseHandle, Label}` - Optional.
  Overrides for presentational components. See "Presentational Components Props API" below
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `onChange: ({oldIndex: number, newIndex: number})` - Optional.
  onChange handler is called every time an item is moved or removed (newIndex = -1)

## `StatefulList` API

* `initialState: {items: Array<React.Node>}` - Required.
  Initial state of the component where `items` are list items.
* `removable: boolean` - Optional. Should be list items removable.
* `overrides: {Root, List, Item, DragHandle, CloseHandle, Label}` - Optional.
  Overrides for presentational components. See "Presentational Components Props API" below
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `onChange: ({newState: Array<React.Node>, oldIndex: number, newIndex: number})` - Optional.
  onChange handler that is called every time an item is moved or removed (newIndex = -1).
* `stateReducer: (type: string, nextState: {items: Array<React.Node>}, currentState: {items: Array<React.Node>}) => stateToSet: {items: Array<React.Node>}` - Optional.
  A state change handler.
  * `type` - a state change type
  * `nextState` - a new state value to be set
  * `currentState` - current state value
  * `stateToSet` - a return value that the state will be updated with

## Presentational components props API

These properties are passed to the Root component:
* `$isRemovable: boolean` If items are removable

These properties are passed the List component:
* `$isRemovable: boolean` If items are removable
* `$isDragged: boolean` If any item is activily dragged

These properties are passed to all other components:
* `$isRemovable: boolean` If items are removable
* `$isDragged: boolean` If any item is activily dragged
* `$isSelected: boolean` If a particular item is lifted (via keyboard)

## STATE_CHANGE_TYPE Constant

* `change` - An item was moved or removed

## Accessibility

`Tab` / `Shift + Tab` - to focus an item

`Space` - to lift or drop an item

`Esc` - to cancel the move

`Arrow Up` / `K`, `Arrow Down` / `J` - selecting / moving items

Example usage:

```text
tab to focus an item
space to lift the item
arrow up/down to change position
space to drop the item
```

`aria-roledescription` are applied to items.

`aria-live` used to inform screenreaders. 

Refer [https://www.w3.org/TR/2011/CR-wai-aria-20110118/states_and_properties#attrs_liveregions](https://www.w3.org/TR/2011/CR-wai-aria-20110118/states_and_properties#attrs_liveregions)
and [https://medium.com/salesforce-ux/4-major-patterns-for-accessible-drag-and-drop-1d43f64ebf09](https://medium.com/salesforce-ux/4-major-patterns-for-accessible-drag-and-drop-1d43f64ebf09)

## Underlying implementation

[react-movable](https://github.com/tajo/react-movable)