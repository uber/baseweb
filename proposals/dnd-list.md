# Drag and Drop List

## Usage

### Basic usage

```js
import * as React from 'react';
import {StatefulList} from 'baseui/dnd-list';

export default () =>
  <StatefulList
    initialState={{items: ['Item 1', 'Item 2', 'Item 3']}}
    onChange={({newState, oldIndex, newIndex}) => {}}
  />
```

### Advanced usage

```js
import * as React from 'react';
import {
  StatefulList,
  StyledList,
  StyledItem
} from 'baseui/dnd-list';
import {styled} from 'baseui';

CustomList = styled(StyledList, props => ({
  border: '1px solid green'
}));

CustomItem = styled(StyledItem, props => ({
  borderBottom: props.$dragged ? `1px solid red` : 'none'
}));

export default () =>
  <StatefulList
    initialState={{ items: ['Item 1', 'Item 2', 'Item 3']}}
    overrides={{
      List: CustomList,
      Item: CustomItem
    }}
  >
```

## Exports

* `StatefulList`
* `List`
* `StyledList`
* `StyledItem`
* `StyledDragHandle`
* `StyledCloseHandle`
* `STATE_CHANGE_TYPE`

## `List` API

* `items: Array<React.Node>` - Required.
  List items.
* `overrides: {Root, Item, DragHandle, CloseHandle}` - Optional.
  Overrides for presentational components. See "Presentational Components Props API" below
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `onChange: ({oldIndex: number, newIndex: number})` - Optional.
  onChange handler is called every time an item is moved or removed (newIndex = -1)

## `StatefulList` API

* `initialState: {items: Array<React.Node>}` - Required.
  Initial state of the component where `items` are list items.
* `removable: boolean` - Optional. Should be list items removable.
* `overrides: {Root, List, Item, DragHandle, CloseHandle}` - Optional.
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

These properties are passed to presentational (styled) components that are exported:

* `$dragged: boolean` If a particular item is active
* `$hovered: boolean` If a particular item is hovered
* `$focused: boolean` If a particular item is focused (`tab`, `shift + tab`)

## STATE_CHANGE_TYPE Constant

* `change` - An item was moved or removed

## Accessibility

`tab` - to focus the List component

`Space` - to drag (focus) or drop an item

`Esc` - to cancel the move

`Arrow Up`, `Arrow Down` - selecting / moving items

Example usage:

```text
tab to focust the list component
arrow up/down to select item
space to begin item drag
arrow up/down to change position
space to end item drag
```

`aria-live`, `aria-describedby` are applied to items.

Roles: `role=listbox`, `role=option`

Refer [https://www.w3.org/TR/2011/CR-wai-aria-20110118/states_and_properties#attrs_liveregions](https://www.w3.org/TR/2011/CR-wai-aria-20110118/states_and_properties#attrs_liveregions)
and [https://medium.com/salesforce-ux/4-major-patterns-for-accessible-drag-and-drop-1d43f64ebf09](https://medium.com/salesforce-ux/4-major-patterns-for-accessible-drag-and-drop-1d43f64ebf09)

## Underlying implementation

There are two main ways how to implement drag and drop:

* [HTML5 drag and drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API). The HTML5 API is [wildy incosistent](https://www.quirksmode.org/blog/archives/2009/09/the_html5_drag.html) and very limited in terms of styling, transitions or touch support (non-existent).
* Manually using `mousedown`, `mousemove` and `mouseup` JS events (and related touch events)

There are a few existing popular solutions in the React ecosystem:

* [react-dnd](https://github.com/react-dnd/react-dnd) - Lower-level API abstracting incosistencies of HTML5 API. **Good**: Nice API, documentation, types, tests, very popular, no assumptions about styling. **Bad**: HTML5 API as a primary backend severly limits styling of dragged items (ghosts). No easy support for mobile (it can be done through [react-dnd-touch-backend](https://github.com/yahoo/react-dnd-touch-backend)). It's built for applications not libraries - need to expose `DragDropContextProvider`. It's a very general solution - doesn't really provide many features realated to our use-case. 20kB gzipped.

* [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd) - Highly opinionated, feature-rich solution using mouseevents. **Good**: Support for mobile. Accessible. Great animations. Big community. Tests. Flow Types. Rich customization. Documentation. Great for lists. **Bad**: Meant for applications not libraries. Need of a single instance of `DragDropContext` in the application with `onDragEnd` property that controls the whole application. Can't be used with multiple instances of `baseui/dnd-list` without some heavy lifting by our consumers. Also, there's a need to specify unique IDs for the dropzones. Pretty big: 31kB gzipped.

* [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc) - Focused on sortable lists (closely matches our use-case) using mouseevents. **Good**: API matches our needs. Performant, nice animations, simple API. **Bad**: Can't be easily styled with CSS in JS. A bit outdated techniques (e.g. old React context API). Hardcoded `div` wrappers. No tests. A lot of open issues / PRs. Not accessible. 6.8kB gzipped.

**TLDR;** `react-beautiful-dnd` would be a great solution if the API would allow/assume library usage. There might be some future [development](https://github.com/atlassian/react-beautiful-dnd/issues/302). `react-dnd` uses HTML5 and doesn't provide any higher-level features so it would require almost all the work and some serious compromises. `react-sortable-hoc` is the closest match but a bit outdated and the inability to swap underlying components and styles is the dealbreaker.

So after these considarations, I've started protyping a new library [react-movable](https://github.com/tajo/react-movable/blob/master/examples/index.tsx) that's inspired by `react-sortable-hoc` but addresses its two biggest shortcomings:

* using render prop instead of HOC for easy customization of underlying components
* ghost is a full component rendered through [React.Portal](https://reactjs.org/docs/portals.html) so it can be fully customized (compared to `react-sortable-hoc` that clones the `HTMLElement` and adds a custom className)

Also, it should be tiny since we need just some features in our use-case. It's 100% dnd-list oriented. It doesn't try to solve drag-and-drop as a general problem (as `react-dnd`). It doesn't consider multiple/nested/complex lists (as `react-befautiful-dnd`).