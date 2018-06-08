# Checkbox Component

### Exports

* `StatefulCheckbox`
* `StatefulCheckboxContainer`
* `Checkbox`
* `Checkmark`
* `Label`

### `Checkbox` API

* `$isChecked: ?boolean`:
  check or uncheck the control. Default is `false`. Value of `null` means non-determinated
* `$isFocused: boolean`:
  make the control focused (active). Default is `false`
* `$isDisabled: boolean`:
  Disable control from being changed
* `components: {Checkmark: any, Label: any}`
  * `Label` to render. Optional.
  * Custom `Checkmark` (exact control). If used, most of handlers may not work.    
* `$placement: 'top' | 'right' | 'bottom' | 'left'`:
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

### `StatefulCheckbox`, `StatefulCheckboxContainer` API

* `initialState: {isChecked: boolean, isFocused: boolean}`
  Initial state of an uncontrolled popover component.
  * `isChecked` - an initial isChecked state
  * `isFocused` - an initial isFocused state
  * `isHovered` - an initial isHovered state
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
  * `type` - state change type
  * `changes` - a new state changes that will be set
  * `currentState` - current full state of the component
* `children: func` should return `Checkbox` instance with standard or customized inner elements. It makes sense only for `StatefulCheckboxContainer` and is ignored by `StatefulCheckbox`
* `$isChecked: ?boolean`:
  check or uncheck the control. Default is `false`. Value of `null` means non-determinated
* `$isFocused: boolean`:
  make the control focused (active). Default is `false`
* `$isDisabled: boolean`:
  Disable control from being changed
* `$placement: 'top' | 'right' | 'bottom' | 'left'`:
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

### `Label` API

### `Checkmark` API


### Usage

```js
import {
  StatefulCheckbox,
  Checkbox,
  StatefulCheckboxContainer,
  Label,
  Checkmark} from './index';
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
        $isChecked={true}
        $isDisabled={false}
        $placement="left"
        onHover={this.onCheckboxHover}
        onChange={this.onCheckboxChange}
      >
        {childrenProps => {
          return <CustomCheckbox {...childrenProps} 
              components={{
                Label: <CustomLabel>Click me</CustomLabel>,
                Checkmark: <CustomCheckmark/>
              }} />
        }}
      </StatefulCheckboxContainer>
      <StatefulCheckbox
        $placement="right" onHover={this.onCheckboxHover} onChange={this.onCheckboxChange}>
      </StatefulCheckbox>
    </div>
  );
};
```
