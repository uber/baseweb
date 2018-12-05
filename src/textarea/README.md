# Textarea Component

Component for larger text inputs.

## Usage

### Basic usage

```javascript
import * as React from 'react';
import {StatefulTextarea} from 'baseui/textarea';

 export default () => {
  return (
    <StatefulTextarea name="description"/>
  );
};
```

 ### Advanced usage

```javascript
import * as React from 'react';
import {StatefulTextarea, StyledTextarea} from 'baseui/textarea';
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
      <StatefulTextarea
        overrides={{Input: TextareaWithStyle}}
        onChange={() => {console.log('textarea changed')}}
      />
    </div>
  );
};
```

## Exports

* `Textarea`
* `StatefulTextarea`
* `StatefulContainer`
* `StyledTextareaContainer`
* `StyledTextarea`
* `STATE_CHANGE_TYPE`
* `SIZE`

## StatefulTextarea API

* All properties of the input's StatefulContainer except `children`
* All properties of the Textarea comonent

## Stateful container API (imported from `baseui/input`)

* See documentation in [input component](../input/README.md)

## Textarea component API

* `autoFocus?: boolean = false`
  * If `true` the textarea will be focused on the first mount.
* `disabled?: boolean = false`
  * Defines if the field is disabled.
* `error?: boolean = false`
  * Error state of the field.
* `id?: string = null`
  * Id attribute value to be added to the textarea element.
* `inputRef?: React$Ref = React.createRef<HTMLInputElement>()`
  * A ref to access an textarea element.
* `name?: string = ''`
  * Name attribute value.
* `overrides?: {InputContainer, Input} = {}`
  * `InputContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * A textarea container, no styles applied to it by default.
  * `Input?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
    * A styled textarea element.
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
* `placeholder?: string = ''`
  * Placeholder value.
* `required?: boolean = false`
  * Indicates if the field is required and sets `aria-required` attribute.
* `rows?: number = 3`
  * Sets the number of rows to display.
* `size?: $Keys<SIZE> = SIZE.default`
  * Defines the size of the form control.
* `value?: string = ''`
  * Field value.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported.

`StyledTextareaContainer`, `StyledTextarea`

* `$isFocused: boolean`
* `$disabled: boolean`
* `$error: boolean`
* `$size: 'default' | 'compact'`
* `$required: boolean`
* `$theme: theme`