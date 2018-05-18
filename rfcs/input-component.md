# Input Component

### Exports
- `Statefulnput`
- `Input`
- `StatefulContainer`
- `StyledRoot`
- `StyledInput`

### Stateful container API
- `initialState: {value: string, isFocused: boolean}`
Initial state of an uncontrolled input component.
    - `value` - an initial input value
    - `isFocused` - an initial focus state
- `stateReducer: (type: change|focus|blur, nextState: {}, currentState: {}, e: any) => nextState`
A state change handler.
    - `type` - a state change type
    - `nextState` - a new state value to be set
    - `currentState` - current state value
    - `nextState` - a return value that the state will be updated with
- `onChange: () => {}`
`onChange` event handler.
- `onFocus: () => {}`
`onFocus` event handler.
- `onBlur: () => {}`
`onBlur` event handler.

### Input component API
- `components: {Root: any, Input: any, Before: any, After: any}`
Overrides for presentational components.
- `type: string`
Input type attribute.
- `value: string`
Input value.
- `placeholder: string`
-Placeholder value.
- `disabled: boolean`
Defines if the input disabled.
- `onChange: Function`
`onChange` event handler.
- `onFocus: Function`
`onFocus` event handler.
- `onBlur: Function`
`onBlur` event handler.
- `$inputRef: {}`
A ref to access an input element.
- `$isFocused: boolean`
Focus state of a component that is passed down to every element.
- `$error: boolean`
Error state of a component that is passed down to every element.
- `$adjoined: 'none' | 'left' | 'right'`
Defines styles for inputs that are grouped with other controls.
- `$size: 'default' | 'compact'`
Defines the size of an input control.
- `$theme: theme`
Theme object.

### Presentational components props API
Next properties are passed to every presentational (styled) component that input is composed of:
- `$isFocused: boolean`
- `$disabled: boolean`
- `$error: boolean`
- `$adjoined: 'none' | 'left' | right'`
- `$size: 'default' | 'compact'`
- `$theme: theme`

### Usage
```javascript
import {StatefulInput as Input, StyledRoot} from './index';
import {withProps} from '../helpers';

const RootWithProps = withProps(StyledRoot, {'data-value': 'secret value'});
const RootWithStyle = withStyle(StyledRoot, props => {
  const {$isFocused, $theme: {sizing}} = props;
  return {
    borderRadius: $isFocused ? '0' : sizing.scale100
  };
});

export default () => {
    return (
      <div>
        <Input components={{Root: RootWithProps}} />
        <Input components={{Root: RootWithStyle}} />
      </div>
    );
};
```
