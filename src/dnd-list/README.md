# Foo Component

Delete this line and any sections, exports, props, etc below where applicable.

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {Foo} from 'baseui/foo';

export default () => <Foo prop={true} />;
```

### Advanced usage

```javascript
import * as React from 'react';
import {Foo} from 'baseui/foo';

export default () => {
  return
    <Foo
      prop={true}
      onMagic={()=>{console.log('some magic happened')}}
      overrides={{
        Bar: props => <CustomBar>Click me</CustomBar>,
      }}
    />;
}
```

## Exports

* `Foo`
* `StatefulFoo`
* `StatefulFooContainer`
* `StyledRoot`
* `StyledBody`
* `CONSTANT`

## `Foo` API

* `optionalProp?: string = 'default value'`
  * Description of optional prop.
* `requiredProp: number` - Required.
  * Description of required prop.
* `overrides?: {Root, Body} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Description of override element.
  * `Body?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Description of override element.

## `StatefulFoo` API

* `optionalProp?: string = 'default value'`
  * Description of optional prop.
* `requiredProp: number` - Required.
  * Description of required prop.
* `overrides?: {Root, Body} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Description of override element.
  * `Body?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * Description of override element.

## `StatefulFooContainer` API

* `initialState?: {stateField: boolean} = {stateField: false}`
  * Initial state of stateful container component.
    * `stateField` - a value to maintain this components state.
* `stateReducer?: (type: CONSTANT[string], nextState: {}, currentState: {}) => nextState`
  * A state change handler. Used to override default state transitions.
    * `type` - State change type.
    * `nextState` - A new state, provided by component transition, that will be set.
    * `currentState` - Current state of the component.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported.

`StyledRoot`, `StyledBody`

* `$prop: type`
* `$prop: type`
* `$prop: type`

## Dependencies

Does this component depend on any 3rd party packages or other internal components?

## Accessibility

How can this component be used via keyboard controls?
What are the accessibility best practices for this component (aria-\*, role, etc.)
