# Accordion Component

A list of items that can be expanded to show more information about the topic.

## Usage

### Basic usage

```js
import * as React from 'react';
import {Accordion, Panel} from 'baseui/accordion';

export default () => {
  return (
    <div>
      <Accordion initialState={{expanded: ['1']}}>
        <Panel key="1" title="First title"><div>First content</div></Panel>
        <Panel key="2" title="Second title"><div>Second content</div></Panel>
      </Accordion>
    </div>
  );
};
```

### Advanced usage

```js
import * as React from 'react';
import {Accordion, Panel, StyledHeader, StyledToggleIcon} from 'baseui/accordion';
import {styled} from 'baseui';

const CustomHeader = styled(StyledHeader, props => ({
  color: '#916cb2',
}));

const CustomToggle = styled(StyledToggleIcon, ({$expanded}) => ({
  backgroundColor: $expanded ? '#c4aadb' : '#916cb2',
  color: '#fff',
  borderRadius: '50%',
}));

const overrides = {
  Header: CustomHeader,
  ToggleIcon: CustomToggle,
};

export default () => {
  return (
    <div>
      <Accordion
        onChange={({expanded}) => {console.log('Accordian ' + expanded[0] + ' is expanded')}}
        initialState={{expanded: ['2']}
      >
          <Panel key="1" title="First title" overrides={overrides}><div>First content</div></Panel>
          <Panel key="2" title="Second title" overrides={overrides}><div>Second content</div></Panel>
          <Panel title={'Third title'} overrides={overrides}><div>Third content</div></Panel>
      </Accordion>
    </div>
  );
};
```

## Exports

* `Accordion`
* `Panel`
* `StatefulPanel`
* `StatefulPanelContainer`
* `StyledRoot`
* `StyledPanelContainer`
* `StyledHeader`
* `StyledContent`
* `StyledToggleIcon`
* `STATE_CHANGE_TYPE`

## `Accordion` API

* `accordion?: boolean = true`
  * Determines how many panels may be expanded at a time. If set to `true` it will collapse a
    current panel when a new panel is expanded. If set to `false` more than one panel may be
    expanded at a time.
* `children: Array<Panel>` - Required.
  * Accordion expandable items. See `Panel` API below for reference.
  * Note: `expanded` property on `Panel`s provided as children will be ignored. This is handled
    by the `Accordian` component implicitly.
* `initialState?: {expanded: Array<string>} = {expanded: []}`
  * Defines the initial component state. Use this prop to render the `Accordian` with one or more
    panels initially expanded. See 'Advanced Usage' code sample above for an example.
* `disabled?: boolean = false`
  * If set to `true` all its children panels will be disabled from toggling.
* `overrides?: {Root} = {}`
  * See 'Presentational Components Props API' section below for type reference for presentational
    override components.
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
* `onChange?: ({expanded: Array<string>}) = () => {}`
  * Handler called each time a panel is toggled. `expanded` prop is an array of `Panel` keys that
    are currently expanded.
* `stateReducer?: (type: string, nextState: {expanded: Array<string>}, currentState: {expanded: Array<string>}) => stateToSet: {expanded: Array<string>}`
  * Handler called each time the component state changes. Used to override default state-change functionality.
    * `type` - A state change type. See [constants.js](./constants.js) for available types.
    * `nextState` -  The next state value to be set.
    * `currentState` - Current state value.
    * `stateToSet` - A return value that the state will be updated with.

## `Panel` API

Represents content and title of each accordion item

* `title: React.Node` - Required.
  * Title of an accordion panel.
* `children: React.Node` - Required.
  * Content visible when `Panel` is expanded.
* `expanded?: boolean false`
  * Defines if the panel is expanded. If set to `true` the panel is rendered expanded.
  * Note: `expanded` property on `Panel`s provided as `Accordion` children will be ignored. This
    is handled by the `Accordian` component implicitly.
* `disabled?: boolean = false`
  * Defaults to the `disabled` value provided by the parent `Accordion` component.
  * Determines if the panel is disabled. When explicitly set on `Panel` it will override the disabled
    prop that comes from the `Accordion` component.
* `key?: string = <child index>`
  * The key of a `Panel`. Used to maintain list of expanded panels. Must be unique across children
    of the `Accordion`.
* `onChange?: ({expanded: boolean}) => {} = () => {}`
  * Handler for individual `Panel` change events.
* `onClick?: (event: Event) => {} = () => {}`
  * Handler for the `Header`'s click events.
* `onKeyDown?: (event: KeyboardEvent) => {} => () => {}`
  * Handler for the `Header`'s keyDown events.
* `overrides?: {PanelContainer, Header, ToggleIcon, Content} = {}`
  * `PanelContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Header?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Content?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `ToggleIcon?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`

## `StatefulPanel` API

All props of the `Panel` component except for `expanded`.

* `initialState?: {expanded: boolean} = {expanded: false}`
  * Initial state of a stateful panel component. `expanded` prop indicates if the panel is initially expanded. If set to `true` the panel will be expanded initially
* `stateReducer?: (type: string, nextState: {expanded: boolean}, currentState: {expanded: boolean}) => stateToSet: {expanded: boolean}`
  * A state change handler.
    * `type` - state change type
    * `nextState` - a new state changes that will be set
    * `currentState` - current state of the component
    * `stateToSet` - a return value that the state will be updated with

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported.

`StyledRoot`, `StyledPanelContainer`, `StyledHeader`, `StyledContent`, `StyledToggleIcon`

* `$disabled: boolean`
  * Passed to `Accordion`'s `Root` element as well as all presentational elements on a `Panel`
    component and indicates if a component is currently disabled.
* `$expanded: boolean`
  * Passed to all presentational elements of a `Panel` component and indicates if a panel is
    currently expanded.

## `STATE_CHANGE_TYPE` Constant

* `expand` - Used for the expanded state type change

## Accessibility

* `tab`, `shift + tab` - to switch between panels.
* `Space` or `Enter` - when focus is on the accordion panel header it will toggle (expand or
  collapse) the currently focused panel.
* `aria-expanded`, `aria-disabled` are applied to the header element of a panel component.
* Accessibility best practices for this component (`aria-expanded`, `aria-controls`,
  `aria-disabled`, `aria-level`, `role=presentation` for all component, `role=heading` and
  `role=region` for title and content of each accordion item).
* See [w3 spec for accordion best practices](w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html).
