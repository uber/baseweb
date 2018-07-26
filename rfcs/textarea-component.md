# Textarea Component

### Exports

* `StatefulTextarea`
* `Textarea`
* `StyledTextareaContainer`
* `StyledTextarea`
* `STATE_CHANGE_TYPE`
* `SIZE`

### StatefulTextarea API

* All properties of the input's StatefulContainer except `children`
* All properties of the Textarea comonent

### Stateful container API (imported from `@uber/baseui/input`)

* `children: (props: Props) => React.Node` - Required
* `initialState: {value: string}` - Optional
  Initial state of an uncontrolled textarea component. - `value` - an initial textarea value
* `stateReducer: (type: 'change', nextState: {}, currentState: {}, e: Event) => stateToSet: {}` - Optional
  A state change handler.
  * `type` - a state change type
  * `nextState` - a new state value to be set
  * `currentState` - current state value
  * `stateToSet` - a return value that the state will be updated with
* `onChange: (e: SyntheticEvent<HTMLElement>) => void` - Optional
  onChange event handler.

### Textarea component API

* `overrides: {InputContainer, Input}` - Optional
  * `InputContainer: ReactComponent` - Optional
  * `Input: ReactComponent` - Optional
    Overrides for presentational components.
* `id: string` - Optional
  Id attribute value to be added to the textarea element
* `required: boolean` - Optional
  Indicates if the field is required and sets `aria-required` attribute
* `value: string` - Optional
  Field value.
* `placeholder: string` - Optional
  -Placeholder value.
* `disabled: boolean` - Optional
  Defines if the field is disabled.
* `inputRef: {}` - Optional
  A ref to access an textarea element.
* `autoFocus: boolean` - Optional
  If `true` the textarea will be focused on the first mount.
* `error: boolean | function` - Optional
  Error state of the field.
* `size: 'default' | 'compact'`
  Defines the size of the form control.
* `onChange: Function` - Optional
  onChange event handler.
* `onFocus: Function` - Optional
  onFocus event handler.
* `onBlur: Function` - Optional
  onBlur event handler.

### Presentational components props API

Next properties are passed to every presentational (styled) component that textarea is composed of:

* `$isFocused: boolean`
* `$disabled: boolean`
* `$error: boolean`
* `$size: 'default' | 'compact'`
* `$required: boolean`
* `$theme: theme`

### Usage

```javascript
import {withStyle} from 'styletron-react';
import {withProps} from '../helpers';
import {StatefulTextarea as Textarea, StyledTextareaContainer} from './index';

const ContainerWithProps = withProps(StyledTextareaContainer, {
  'data-value': 'some value',
});
const ContainerWithStyle = withStyle(StyledTextareaContainer, props => {
  const {$isFocused, $theme: {sizing}} = props;
  return {
    borderRadius: $isFocused ? '0' : sizing.scale100,
  };
});

export default () => {
  return (
    <div>
      <Textarea overrides={{InputContainer: ContainerWithProps}} />
      <Textarea overrides={{InputContainer: ContainerWithStyle}} />
    </div>
  );
};
```
