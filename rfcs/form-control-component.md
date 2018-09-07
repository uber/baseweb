# Form Control

FormControl component adds label and caption for it's child control. If the error message is passed it renders error message in place of caption.

## Usage

```javascript
import {FormControl} from 'baseui/form-control';
import {Input} from 'baseui/input';
import {Checkbox} from 'baseui/checkbox';

export default () => {
  return (
    <div>
      <FormControl label="Input label" caption="Input caption">
        <Input />
      </FormControl>
      <FormControl label="Checkbox label" caption="Checkbox caption">
        <Checkbox>Checkbox control</Checkbox>
      </FormControl>
      <FormControl
        label="Input label"
        caption="Input caption"
        error="Error message"
      >
        <Input />
      </FormControl>
    </div>
  );
};
```

## Exports

* `FormControl`
* `StyledLabel`
* `StyledCaption`
* `StyledControlContainer`

## Form Control API

* `overrides: {Label, Caption, ControlContainer}` - Optional
  Overrides for presentational components.
  * `Label: {props: {}, style: {}, component: ReactComponent}` - Optional
  * `Caption: {props: {}, style: {}, component: ReactComponent}` - Optional
  * `ControlContainer: {props: {}, style: {}, component: ReactComponent}` - Optional
* `label: node | function` - Optional
  A label rendered above the input field.
* `caption: node | function` - Optional
  A caption rendered below the input field.
* `error: node | function` - Optional
  Error state of the input. If an error prop passed it will be rendered in place of caption as an error message.

## Presentational components props API

Next properties are passed to every presentational (styled) component that form control is composed of:

* `$disabled: boolean`
* `$error: boolean | node`
* `$required: boolean`
* `$size: 'default' | 'compact'`
* `$theme: theme`
