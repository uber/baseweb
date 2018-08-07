# Checkbox Component

### Exports

* `StatefulCheckbox`
* `StatefulCheckboxContainer`
* `Checkbox`
* `StyledRoot`
* `StyledCheckmark`
* `StyledLabel`
* `StyledInput`

### `Checkbox` API

* `checked: ?boolean`:
  check or uncheck the control. Default is `false`.
* `autoFocus: boolean`:
  make the control focused (active). Default is `false`
* `children: React$Node`:
  Component or String value for label of checkbox. Default is empty string
* `disabled: boolean`:
  Disable control from being changed
* `required: boolean`:
  Mark control as required
* `isError: boolean`:
  Sets control into isError state. Default is `false`
* `isIndeterminate: boolean`:
  Indeterminate control value. checked is ignored.
* `overrides: {Root: (props: {[string]: any}) => React$Node, Checkmark: (props: {[string]: any}) => React$Node, Label: (props: {[string]: any}) => React$Node, , Input: (props: {[string]: any}) => React$Node}`
  * `Label` to render. Optional.
  * Custom `Checkmark` (exact control). If used, most of handlers may not work.
  * `Root` wrapper element for the whole checkbox control to apply styles
  * `Input` may replace original functionality of checkbox. If provided should follow the same interface and logic or may break the whole component
* `labelPlacement: 'top' | 'right' | 'bottom' | 'left'`:
  How to position the label relative to the checkbox itself. Default is `right`
* `onChange: func`:
  handler for events on trigger element
* `onMouseEnter: func`:
  handler for events on trigger element
* `onMouseLeave: func`:
  handler for events on trigger element
* `onFocus: func`:
  handler for events on trigger element
* `onBlur: func`:
  handler for events on trigger element

### `StatefulCheckboxContainer` API

* `initialState: {}`
  Initial state of an uncontrolled popover component.
  * `checked` - an initial checked state. Check or uncheck the control. Default is `false`.
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
  * `type` - state change type
  * `nextState` - a new state changes that will be set
  * `currentState` - current full state of the component
* `children: func` should return `Checkbox` instance with standard or customized inner elements. It makes sense only for `StatefulCheckboxContainer` and is ignored by `StatefulCheckbox`
* `disabled: boolean`:
  Disable control from being changed
* `labelPlacement: 'top' | 'right' | 'bottom' | 'left'`:
  How to position the label relative to the checkbox itself. Default is `right`
* `onChange: func`:
  handler for events on trigger element
* `onMouseEnter: func`:
  handler for events on trigger element
* `onMouseLeave: func`:
  handler for events on trigger element
* `onFocus: func`:
  handler for events on trigger element
* `onBlur: func`:
  handler for events on trigger element

### `Label` API

### `Checkmark` API

### `Input` API

### Usage

```js
import {
  StatefulCheckbox,
  Checkbox,
  StatefulCheckboxContainer,
  Label,
  Checkmark,
} from './index';
import {withStyle} from 'styletron-react';

const CustomCheckbox = withStyle(Checkbox, {
  textColor: 'red',
});

const CustomLabel = withStyle(Label, {
  textColor: 'blue',
});

const CustomCheckmark = withStyle(Checkmark, {
  textColor: 'green',
});

export default () => {
  return (
    <div>
      <StatefulCheckboxContainer
        initialState={{
          checked: true,
        }}
        disabled={false}
        labelPlacement="left"
        onMouseEnter={this.onCheckboxHover}
        onChange={this.onCheckboxChange}
      >
        {childrenProps => {
          return (
            <CustomCheckbox
              {...childrenProps}
              overrides={{
                Label: <CustomLabel>Click me</CustomLabel>,
                Checkmark: props => <CustomCheckmark {...props} />,
              }}
            />
          );
        }}
      </StatefulCheckboxContainer>
      <StatefulCheckbox
        labelPlacement="right"
        onMouseEnter={this.onCheckboxHover}
        onChange={this.onCheckboxChange}
      />
    </div>
  );
};
```
