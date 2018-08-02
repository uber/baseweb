# Select Component

### Exports

* `StatefulSelect`
* `StatefulSelectContainer`
* `Select`
* `StyledSelectInput`
* `StyledOption`
* `StyledDropDown`
* `StyledLabel`
* `StyledHint`

### `Select` and `StatefulSelect` API

* `value: ?string | Array<string>`:
  Current selected option. If Select is in `multiple` choice mode. It is `Array<string>` of selected options, otherwise `string`
* `placeholder: ?string`:
  Placeholder text if nothing is selected. Default is `Choose one...`
* `rows: ?number`:
  Represents maximum visible length of options, all other will be scrolled. If not defined, all options will be visible.
* `children: React$Node`:
  Component or String values array for options in dropdown list. Each component should have `value` property assigned to it at the root element. For `String` options it is considered `value` itself.
* `label: ?React$Node`:
  Component or String representing label for Select component. Default is `''`
* `hint: ?React$Node`:
  Component or String representing hint message for Select component. Default is `''`
* `error: ?string`:
  Error message and error state. Default is `''`
* `multiple: ?boolean`:
  Sets if multiple choices are allowed in Select component. Default is `false`
* `autoFocus: boolean`:
  make the control focused (active). Default is `false`
* `disabled: boolean`:
  Disable control from being changed
* `required: boolean`:
  Mark control as required
* `overrides: {SelectInput: (props: {[string]: any}) => React$Node, Option: (props: {[string]: any}) => React$Node, DropDown: (props: {[string]: any}) => React$Node, Label: (props: {[string]: any}) => React$Node, Hint: (props: {[string]: any}) => React$Node}`
  * `Label` component to use for label of Select
  * `Hint` component to use for hint of Select
  * `DropDown` component to use for dropdown list
  * `Option` component to use for options in dropdown list
  * `SelectInput` component for Input showing current selected value(s)
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

### `StatefulSelectContainer` API

* `initialState: {}`
  Initial state of an uncontrolled popover component.
* `value` - an initial value state. If Select is in `multiple` choice mode. It is `Array` of selected options, otherwise `string`
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
* `type` - state change type
* `nextState` - a new state changes that will be set
* `currentState` - current full state of the component
* `children: func` should return `Select` instance with standard or customized inner elements.
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

### `Hint` API

### `DropDown` API

### `Option` API

### `SelectInput` API

### Usage

```js
import {
  StatefulSelect,
  Select,
  SelectInput,
  Label,
  Hint,
  Option,
  DropDown,
} from './index';
import {withStyle} from 'styletron-react';

const CustomOption = withStyle(Option, {
  textColor: 'red',
});

export default () => {
  return (
    <div>
      <StatefulSelect
        value="2"
        label="Select option..."
        placeholder="Choose one..."
        hint={
          <span>
            <b>Required</b> option
          </span>
        }
        rows={3}
        onMouseEnter={this.onCheckboxHover}
        onChange={this.onCheckboxChange}
        overrides={{
          Option: props => <CustomOption>Select {props.children}</CustomOption>,
        }}
      >
        <Option value="1">One</Option>
        <Option value="2">Two</Option>
        <Option value="3">Three</Option>
        <Option value="4">Four</Option>
      </StatefulSelect>
    </div>
  );
};
```
