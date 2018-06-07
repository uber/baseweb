# Checkbox Component

### Exports

* `StatefulCheckbox`
* `Checkbox`
* `Checkmark`
* `Label`

### `Checkbox` API

* `isChecked: ?boolean`:
  check or uncheck the control. Default is `false`. Value of `null` means non-determinated
* `isFocused: boolean`:
  make the control focused (active). Default is `false`
* `isDisabled: boolean`:
  Disable control from being changed
* `components: {Checkmark: any, Label: any}`
  * `Label` to render. Optional.
  * Custom `Checkmark` (exact control). If used, most of handlers may not work.    
* `placement: 'top' | 'right' | 'bottom' | 'left'`:
  How to position the label relative to the checkbox itself. Default is `right`
* `onChange: func`:
  handler for events on trigger element
* `onHover: func`:
  handler for events on trigger element
* `onUnhover: func`:
  handler for events on trigger element
* `onFocus: func`:
  handler for events on trigger element  
* `onBlur: func`:
  handler for events on trigger element      

### `StatefulCheckbox` API

* `initialState: {isChecked: boolean, isFocused: boolean}`
  Initial state of an uncontrolled popover component.
  * `isChecked` - an initial isChecked state
  * `isFocused` - an initial isFocused state
  * `isDisabled` - an initial isDisabled state
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
  * `type` - state change type
  * `changes` - a new state changes that will be set
  * `currentState` - current full state of the component
* `components: {Checkbox: any, Checkmark: any, Label: any}`
  * `Checkbox` to render. Styled or drop-in. Optional.  
  * `Label` to render. Optional.
  * Custom `Checkmark` (exact control). If used, most of handlers may not work. Optional  
* `isChecked: ?boolean`:
  check or uncheck the control. Default is `false`. Value of `null` means non-determinated
* `isFocused: boolean`:
  make the control focused (active). Default is `false`
* `isDisabled: boolean`:
  Disable control from being changed    
* `onChange: func`:
  handler for events on trigger element
* `onHover: func`:
  handler for events on trigger element
* `onUnhover: func`:
  handler for events on trigger element
* `onFocus: func`:
  handler for events on trigger element  
* `onBlur: func`:
  handler for events on trigger element     

### `Label` API

* `$label: node | text | func`:
  Label text or DOM markup to render. Required
  
### `Checkmark` API

* `$checkmark: node | text | func`:
  Checkmark to render. Required  
  

### Usage

```js
import {StatefulCheckbox, StyledCheckbox, Label, Checkmark} from './index';
import {withStyle} from 'styletron-react';

const CustomStyledCheckbox = withStyle(StyledCheckbox, {
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
      <StatefulCheckbox
        isChecked={true}
        isDisabled={false}
        placement="left"
        onHover={this.onCheckboxHover}
        onChange={this.onCheckboxChange}
        components={{
          Checkbox: <CustomStyledCheckbox />,
          Label: <CustomLabel $label={"Click me"}/>,
          Checkmark: <CustomCheckmark $checkmark={<input type='checkbox'/>}/>
        }}
      >
      </StatefulCheckbox>
    </div>
  );
};
```
