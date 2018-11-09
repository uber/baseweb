# Accordion Component

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

* `accordion: boolean` - Optional. Default is `true`.
  Defines if a single panel or multiple panels can be expanded at a time. If set to `true` it will collapse a current panel when a new panel expanded
* `children: Array<Panel>` - Required.
  Accordion expandable items. Each `Panel` has:
  * All props of a `Panel` component except of the `expanded` prop
  * `expanded` property on a `Panel` component is ignored and is set by its parent `Accordion` component
* `initialState: {expanded: Array<string>}` - Optional.
  Initial state of the accordion where `expanded` prop is an array of its child panels key that are initially expanded. Default is `{expanded: []}`
* `disabled: boolean` - Optional. Default is `false`
  If set to `true` all its children panels will be disabled from toggling
* `overrides: {Root}` - Optional.
  Overrides for Accordion's presentational components. See "Presentational Components Props API" below
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `onChange: ({expanded: Array<string>})` - Optional.
  Accordion's onChange handler that is called every time any of the panels is toggled. `expanded` prop is an array of Accordion's child panel keys that are currently expanded
* `stateReducer: (type: string, nextState: {expanded: Array<string>}, currentState: {expanded: Array<string>}) => stateToSet: {expanded: Array<string>}` - Optional.
  A state change handler.
  * `type` - a state change type
  * `nextState` - a new state value to be set
  * `currentState` - current state value
  * `stateToSet` - a return value that the state will be updated with

## `Panel` API

Represents content and title of each accordion item

* `title: React$Node` - Required.
  Title of an accordion panel
* `children: React$Node` - Required.
  Content of an accordion panel
* `expanded: boolean` - Optional. Default is `false`
  Defines if the panel is expanded. Id set to `true` the panel is rendered expanded.
* `disabled: React$Node` - Optional. Defaults to the `disabled` value passed from the parent`Accordion` component
  Defines if the panel is disabled. When is set on `Panel` it will override the disabled prop that comesfrom the `Accordion` component
* `key: string` - Optional. Defaults to the child index.
  The key of a `Panel`. Has to be unique across children of the `Accordion`. Defaults to an index of thepanel in the children array
* `onChange: ({expanded: boolean}) => {}` - Optional.
  Panels' onChange handler
* `onClick: (event) => {}` - Optional.
  onClick handler for the `Header` element
* `onKeyDown: (event) => {}` - Optional.
  onKeyDown handler for the `Header` element
* `overrides: {PanelContainer, Header, ToggleIcon, Content}` - Optional
  Overrides for Panel's presentational components. See "Presentational Components Props API" below
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional

## `StatefulPanel` API

* All props of a `Panel` component except of the `expanded` prop
* `initialState: {expanded: boolean}` - Optional.
  Initial state of a stateful panel component. `expanded` prop indicates if the panel is initially expanded. If set to `true` the panel will be expanded initially
* `stateReducer: (type: string, nextState: {expanded: boolean}, currentState: {expanded: boolean}) => stateToSet: {expanded: boolean}` - Optional.
  A state change handler.
  * `type` - state change type
  * `nextState` - a new state changes that will be set
  * `currentState` - current state of the component
  * `stateToSet` - a return value that the state will be updated with

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported:

* `$disabled: boolean`
  Passed to `Accordion`'s `Root` element as well as all presentational elements on a `Panel` component and indicates if a component is currently disabled
* `$expanded: boolean`
  Passed to all presentational elements of a `Panel` component and indicates if a panel is currently expanded

## STATE_CHANGE_TYPE Constant

* `expand` - Used for the expanded state type change

## Accessibility

`tab`, `shift + tab` - to switch between panels.
`Space` or `Enter` - when focus is on the accordion panel header it will toggle (expand or collapse) the currently focused panel.
`aria-expanded`, `aria-disabled` are applied to the header element of a panel component.

Accessibility best practices for this component (`aria-expanded`, `aria-controls`, `aria-disabled`, `aria-level`, `role=presentation` for all component, `role=heading` and `role=region` for title and content of each accordion item)
Please, see w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html
