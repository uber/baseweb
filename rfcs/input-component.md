# Input Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {StatefulInput} from 'baseui/input';

export default () => {
  return
    <StatefulInput
      value={props.name}
      onChange={evt => props.setName(evt.target.value)}
    />;
};
```

### Advanced usage

```javascript
import {StatefulInput as Input, StyledRoot} from 'baseui/input';
import {withStyle} from 'styletron-react';

const RootWithStyle = withStyle(StyledRoot, props => {
  const {
    $isFocused,
    $theme: {sizing},
  } = props;
  return {
    borderRadius: $isFocused ? '0' : sizing.scale100,
  };
});

export default () => {
  return (
    <div>
      <Input overrides={{Root: RootWithStyle}} />
    </div>
  );
};
```

## Exports

* `StatefulInput`
* `StatefulContainer`
* `Input`
* `BaseInput`
* `StyledRoot`
* `StyledInputEnhancer`
* `StyledInputContainer`
* `StyledInput`
* `STATE_CHANGE_TYPE`
* `ADJOINED`
* `SIZE`
* `CUSTOM_INPUT_TYPE`

## Stateful input API

* All properties of the StatefulContainer except `children`
* All properties of the Input except `$components` that are optional and used to pass overrides for default styled components set.

## Stateful container API

* `children: (props: Props) => React.Node` - Required
* `initialState: {value: string}` - Optional
  Initial state of an uncontrolled input component. - `value` - an initial input value
* `stateReducer: (type: 'change', nextState: {}, currentState: {}, e: Event) => stateToSet: {}` - Optional
  A state change handler.
  * `type` - a state change type
  * `nextState` - a new state value to be set
  * `currentState` - current state value
  * `stateToSet` - a return value that the state will be updated with
* `onChange: (e: SyntheticEvent<HTMLInputElement>) => void` - Optional
  onChange event handler.

## Input component API

* All properties of the BaseInput except `adjoined`
* `overrides: {Root, StartEnhancer, InputContainer, Input, Before, After, EndEnhancer}` - Optional
  Overrides for presentational components.
  * `Root: ReactComponent` - Optional
  * `StartEnhancer: ReactComponent` - Optional
  * `InputContainer: ReactComponent` - Optional
  * `Before: ReactComponent` - Optional
  * `Input: ReactComponent` - Optional
  * `After: ReactComponent` - Optional
  * `EndEnhancer: ReactComponent` - Optional
* `startEnhancer: node | function` - Optional
  An input helper rendered before and attached to the input field.
* `endEnhancer: node | function` - Optional
  An input helper rendered after and attached to the input field.

## BaseInput component API

* `overrides: {InputContainer, Input, Before, After}` - Optional
  * `InputContainer: ReactComponent` - ReqOptionaluired
  * `Input: ReactComponent` - Optional
  * `Before: ReactComponent` - Optional
  * `After: ReactComponent` - Optional
    Overrides for presentational components.
* `id: string` - Optional
  Id attribute value to be added to the input element and as a label's `for` attribute value
* `name: string` - Optional
  Name attribute value.
* `required: boolean` - Optional
  Indicates if the input is required and sets `aria-required` attribute
* `type: string` - Optional
  Input type attribute.
* `value: string` - Optional
  Input value.
* `placeholder: string` - Optional
  -Placeholder value.
* `disabled: boolean` - Optional
  Defines if the input disabled.
* `inputRef: {}` - Optional
  A ref to access an input element.
* `autoFocus: boolean` - Optional
  If `true` the input will be focused on the first mount.
* `error: boolean` - Optional
  Error state of the input.
* `adjoined: 'none' | 'left' | 'right' | 'both'`
  Defines styles for inputs that are grouped with other controls.
* `size: 'default' | 'compact'`
  Defines the size of an input control.
* `onChange: Function` - Optional
  onChange event handler.
* `onFocus: Function` - Optional
  onFocus event handler.
* `onBlur: Function` - Optional
  onBlur event handler.

## Presentational components props API

Next properties are passed to every presentational (styled) component that input is composed of:

* `$isFocused: boolean`
* `$disabled: boolean`
* `$error: boolean`
* `$adjoined: 'none' | 'left' | 'right' | 'both'`
* `$size: 'default' | 'compact'`
* `$required: boolean`
* `$theme: theme`
