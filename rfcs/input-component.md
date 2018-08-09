# Input Component

### Exports

* `StatefulInput`
* `StatefulContainer`
* `Input`
* `BaseInput`
* `StyledLabel`
* `StyledRoot`
* `StyledInputEnhancer`
* `StyledInputContainer`
* `StyledInput`
* `StyledCaption`
* `STATE_CHANGE_TYPE`
* `ADJOINED`
* `SIZE`
* `CUSTOM_INPUT_TYPE`

### Stateful input API

* All properties of the StatefulContainer except `children`
* All properties of the Input except `$components` that are optional and used to pass overrides for default styled components set.

### Stateful container API

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

### Input component API

* All properties of the BaseInput except `adjoined`
* `overrides: {Label, Root, StartEnhancer, InputContainer, Input, Before, After, EndEnhancer, Caption}` - Optional
  * `Label: ReactComponent` - Optional
  * `Root: ReactComponent` - Optional
  * `StartEnhancer: ReactComponent` - Optional
  * `InputContainer: ReactComponent` - Optional
  * `Before: ReactComponent` - Optional
  * `Input: ReactComponent` - Optional
  * `After: ReactComponent` - Optional
  * `EndEnhancer: ReactComponent` - Optional
  * `Caption: ReactComponent` - Optional
    Overrides for presentational components.
* `label: node | function` - Optional
  A label rendered above the input field.
* `caption: node | function` - Optional
  A caption rendered below the input field.
* `startEnhancer: node | function` - Optional
  An input helper rendered before and attached to the input field.
* `endEnhancer: node | function` - Optional
  An input helper rendered after and attached to the input field.

### BaseInput component API

* `overrides: {InputContainer, Input, Before, After}` - Optional
  * `InputContainer: ReactComponent` - ReqOptionaluired
  * `Input: ReactComponent` - Optional
  * `Before: ReactComponent` - Optional
  * `After: ReactComponent` - Optional
    Overrides for presentational components.
* `id: string` - Optional
  Id attribute value to be added to the input element and as a label's `for` attribute value
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
* `error: boolean | node | function` - Optional
  Error state of the input. If a string or node element is passed it will be rendered in place of caption as an error message.
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

### Presentational components props API

Next properties are passed to every presentational (styled) component that input is composed of:

* `$isFocused: boolean`
* `$disabled: boolean`
* `$error: boolean | node`
* `$adjoined: 'none' | 'left' | 'right' | 'both'`
* `$size: 'default' | 'compact'`
* `$required: boolean`
* `$theme: theme`

### Usage

```javascript
import {StatefulInput as Input, StyledRoot} from './index';
import {withProps} from '../helpers';

const RootWithProps = withProps(StyledRoot, {'data-value': 'secret value'});
const RootWithStyle = withStyle(StyledRoot, props => {
  const {$isFocused, $theme: {sizing}} = props;
  return {
    borderRadius: $isFocused ? '0' : sizing.scale100,
  };
});

export default () => {
  return (
    <div>
      <Input overrides={{Root: RootWithProps}} />
      <Input overrides={{Root: RootWithStyle}} />
    </div>
  );
};
```
