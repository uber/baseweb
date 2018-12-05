# Form Control

The `FormControl` component adds a label and caption for it's child control. If an error message is passed it renders that message in place of the caption.

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

## `FormControl` API

* `label?: React.Node | () => React.Node = null`
  * A label rendered above the input field.
* `caption?: React.Node | () => React.Node = null`
  * A caption rendered below the input field.
* `overrides?: {Label, Caption, ControlContainer}` - Optional
  * `Label: {props: {}, style: {}, component: ReactComponent}` - Optional.
    * Customizes the label element.
  * `Caption: {props: {}, style: {}, component: ReactComponent}` - Optional.
    * Customizes the caption element.
  * `ControlContainer: {props: {}, style: {}, component: ReactComponent}` - Optional.
    * Customizes the container element.
* `error?: React.Node | () => React.Node = null`
  * Error state of the input. If an error prop passed it will be rendered in place of caption as an error message.

## Presentational components props API

These properties are passed to every presentational (styled) component that is exported.

`StyledLabel`, `StyledCaption`, `StyledControlContainer`

* `$disabled?: boolean = false`
* `$error?: boolean | React.Node = false`
* `$required?: boolean = false`
* `$theme: theme`
