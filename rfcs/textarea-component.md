# Textarea Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {StatefulTextarea as Textarea} from 'baseui/textarea';

export default () => {
  return (
    <Textarea name="description"/>
  );
};
```

### Advanced usage

```javascript
import * as React from 'react';
import {StatefulTextarea as Textarea, StyledTextarea} from 'baseui/textarea';
import {withStyle} from 'styletron-react';

const TextareaWithStyle = withStyle(StyledTextarea, props => {
  const {$isFocused, $theme: {sizing}} = props;
  return {
    borderRadius: $isFocused ? '0' : sizing.scale100,
  };
});

export default () => {
  return (
    <div>
      <Textarea
        overrides={{Input: TextareaWithStyle}}
        onChange={() => {console.log('textarea changed')}}
      />
    </div>
  );
};
```

## Exports

* `StatefulTextarea`
* `Textarea`
* `StyledTextareaContainer`
* `StyledTextarea`
* `STATE_CHANGE_TYPE`
* `SIZE`

## StatefulTextarea API

* All properties of the input's StatefulContainer except `children`
* All properties of the Textarea comonent

## Stateful container API (imported from `baseui/input`)

* `children: (props: Props) => React.Node` - Required
* `initialState: {value: string}` - Optional
  Initial state of an uncontrolled textarea component. - `value` - an initial textarea value.
* `stateReducer: (type: 'change', nextState: {}, currentState: {}, e: Event) => stateToSet: {}` - Optional
  A state change handler.
  * `type` - a state change type
  * `nextState` - a new state value to be set
  * `currentState` - current state value
  * `stateToSet` - a return value that the state will be updated with
* `onChange: (e: SyntheticEvent<HTMLElement>) => void` - Optional
  onChange event handler.

## Textarea component API

* `autoFocus: boolean` - Optional
  If `true` the textarea will be focused on the first mount.
* `disabled: boolean` - Optional
  Defines if the field is disabled.
* `error: boolean | function` - Optional
  Error state of the field.
* `id: string` - Optional
  Id attribute value to be added to the textarea element.
* `inputRef: {}` - Optional
  A ref to access an textarea element.
* `name: string` - Optional
  Name attribute value.
* `overrides: {InputContainer, Input}` - Optional
  Overrides for presentational components.
  * `InputContainer: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
    A textarea container, no styles applied to it by default.
  * `Input: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
    A styled textarea element.
* `onChange: Function` - Optional
  onChange event handler.
* `onFocus: Function` - Optional
  onFocus event handler.
* `onBlur: Function` - Optional
  onBlur event handler.
* `placeholder: string` - Optional
  -Placeholder value.
* `required: boolean` - Optional
  Indicates if the field is required and sets `aria-required` attribute.
* `rows: number` - Optional
  Sets the number of rows to display
* `size: 'default' | 'compact'`
  Defines the size of the form control.
* `value: string` - Optional
  Field value.

## Presentational components props API

Next properties are passed to every presentational (styled) component that textarea is composed of:

* `$isFocused: boolean`
* `$disabled: boolean`
* `$error: boolean`
* `$size: 'default' | 'compact'`
* `$required: boolean`
* `$theme: theme`
