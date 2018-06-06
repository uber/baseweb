# Checkbox Component

### Exports

* `StatefulCheckbox`
* `Checkbox`
* `StyledCheckbox`
* `StyledLabel`

### `Checkbox` API

* `isChecked: ?boolean`:
  check or uncheck the control. Default is `false`. Value of `null` means non-determinated
* `isFocused: boolean`:
  make the control focused (active). Default is `false`  
* `children: node | text | func`:
  Label to render. Optional
* `placement: 'top' | 'right' | 'bottom' | 'left'`:
  How to position the label relative to the checkbox itself. Default is `right`
* `checkbox: node | func`:
  Custom checkbox (exact control). If used, most of handlers may not work.
* `onClick: func`:
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
  * `isOpen` - an initial isOpen state
  * `isFocused` - an initial isFocused state
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any) => nextState`
  A state change handler.
  * `type` - state change type
  * `changes` - a new state changes that will be set
  * `currentState` - current full state of the component
* `components: node | text | func`
  Stateless checkbox component. Styled or drop-in  
* `isChecked: ?boolean`:
  check or uncheck the control. Default is `false`. Value of `null` means non-determinated
* `isFocused: boolean`:
  make the control focused (active). Default is `false`  
* `children: node | text | func`:
  Label to render. Optional
* `checkbox: node | func`:
  Custom checkbox (exact control). If used, most of handlers may not work.
* `onClick: func`:
  handler for events on trigger element
* `onHover: func`:
  handler for events on trigger element
* `onUnhover: func`:
  handler for events on trigger element
* `onFocus: func`:
  handler for events on trigger element  
* `onBlur: func`:
  handler for events on trigger element     

### `StyledLabel` API

* `label: node | text | func`:
  Label text or DOM markup to render. Required

### Usage

```js
import {StatefulCheckbox, StyledCheckbox, StyledLabel} from './index';
import {withStyle} from '../helpers';

const CustomStyledCheckbox = withStyle(StyledCheckbox, {
  textColor: 'red',
});

const CustomStyledLabel = withStyle(StyledLabel, {
  textColor: 'blue',
});

export default () => {
  return (
    <div>
      <StatefulCheckbox
        isChecked={true}
        placement="left"
        onHover={this.onCheckboxHover}
        onClick={this.onCheckboxClick}
        components={{
          Popover: CustomStyledCheckbox,
        }}
      >
        <CustomStyledLabel label={"Click me"}/>
      </StatefulCheckbox>
    </div>
  );
};
```

#### Default styles

##### Checkbox icon:

`Default\Unchecked`

- width: 24px
- height: 24px
- border: 2px solid #999999
- border-radius: 2px
- background: #FFFFFF

`Hover`

- background: #E5E5E5

`Focus`

- background: #CCCCCC

`Check`

- background: #1B6DE0
- border-color: #1B6DE0

`Indeterminate`

- background: #1B6DE0
- border-color: #1B6DE0

#####Label text:

font-family: Clan Pro For UBER;
line-height: 20px;
font-size: 14px;
color: #000000;



