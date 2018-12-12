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
      onKeyDown={evt => {
        if (evt.key === 'Enter') {
          props.setName('');
        }
      }}
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
* `ADJOINED`
* `CUSTOM_INPUT_TYPE`
* `SIZE`
* `STATE_CHANGE_TYPE`

## `StatefulInput` API

* All properties of the StatefulContainer except `children`
* All properties of the Input except `$components` that are optional and used to pass overrides for default styled components set.

## `StatefulContainer` API

* `children: (props: Props) => React.Node` - Required.
* `initialState: {value: string} = {value: ''}`
  * Initial state of an uncontrolled input component.
    * `value` - an initial input value.
* `stateReducer: (type: STATE_CHANGE_TYPE[string]', nextState: {}, currentState: {}, e: SyntheticEvent<HTMLInputElement>) => stateToSet: {}` - Optional
  * A state change handler. Used to override default state transitions.
    * `type` - A state change type.
    * `nextState` - A new state value to be set.
    * `currentState` - Current state value.
    * `stateToSet` - A return value that the state will be updated with.
* `onChange?: (e: SyntheticEvent<HTMLInputElement>) => void = () => {}`
  * handler for change events on input element.
* `onKeyDown?: (e: SyntheticEvent<HTMLInputElement>) => void = () => {}`
  * handler for keydown events on input element.
* `onKeyPress?: (e: SyntheticEvent<HTMLInputElement>) => void = () => {}`
  * handler for keypress events on input element.
* `onKeyUp?: (e: SyntheticEvent<HTMLInputElement>) => void = () => {}`
  * handler for keyup events on input element.

## `Input` API

* All properties of the BaseInput except `adjoined`
* `overrides?: {Root, StartEnhancer, InputContainer, Input, Before, After, EndEnhancer} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `StartEnhancer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `InputContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Before?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Input?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `After?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `EndEnhancer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
* `startEnhancer?: React.Node | Function = null`
  * An input helper rendered before and attached to the input field.
* `endEnhancer: React.Node | Function = null`
  An input helper rendered after and attached to the input field.

## `MaskedInput` API

* This component is used to format user input rendering.
* Maintains all properties of the `Input` component
* `mask?: string = null`
  * See pattern examples [here](https://github.com/sanniassin/react-input-mask).
* `maskChar?: string = ' '`
  * Character to render for unfilled mask element.

## `BaseInput` API

* `overrides?: {InputContainer, Input, Before, After} = {}`
  * `InputContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Before?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `After?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
* `id?: string = null`
  * Id attribute value to be added to the input element and as a label's `for` attribute value.
* `name?: string = ''`
  * Name attribute value.
* `required?: boolean = false`
  * Indicates if the input is required and sets `aria-required` attribute.
* `type?: string = 'text'`
  * Input type attribute.
* `value?: string = null`
  * Input value.
* `placeholder?: string = ''`
  * Placeholder value.
* `disabled?: boolean = false`
  * Defines if the input disabled.
* `inputRef?: React$Ref = React.createRef<HTMLInputElement>()`
  * A ref to access an input element.
* `autoFocus?: boolean = false`
  * If `true` the input will be focused on the first mount.
* `error?: boolean = false`
  * Error state of the input.
* `adjoined?: 'none' | 'left' | 'right' | 'both' = 'none'`
  * Defines styles for inputs that are grouped with other controls.
* `size?: 'default' | 'compact' = 'default'`
  * Defines the size of an input control.
* `onChange?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * Handler for change events on input element.
* `onKeyDown?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * Handler for keydown events on input element.
* `onKeyPress?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * Handler for keypress events on input element.
* `onKeyUp?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * Handler for keyup events on input element.
* `onFocus?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * Handler for focus events on input element.
* `onBlur?: (<SyntheticInputEvent<HTMLInputElement>) => void = () => {}`
  * Handler for blur events on input element.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported.

`StyledRoot`, `StyledInputEnhancer`, `StyledInputContainer`, `StyledInput`

* `$adjoined: 'none' | 'left' | 'right' | 'both' = 'none'`
  * Defines styles for inputs that are grouped with other controls.
* `$disabled: boolean`
  * Renders UI in 'disabled' state.
* `$error: boolean`
  * Renders UI in 'error' state.
* `$isFocused: boolean`
  * Renders UI in 'focus' state.
* `$required: boolean`
  * Renders UI in 'required' state.
* `$size: 'default' | 'compact'`
  * Renders UI in provided size.
* `$theme: theme`

## `STATE_CHANGE_TYPE` Constant

* `change`

## `CUSTOM_INPUT_TYPE` Constant

* `textarea`

## `ADJOINED` Constant

* `none`
* `left`
* `right`
* `both`

## `SIZE` Constant

* `default`
* `compact`

## Dependencies

[react-input-mask](https://github.com/sanniassin/react-input-mask)