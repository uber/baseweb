# Select Component

### Exports

- `StatefulSelect`
- `StatefulSelectContainer`
- `Select`
- `StyledSelectInput`
- `StyledOption`
- `StyledDropDown`
- `StyledLabel`
- `StyledHint`

### `Select` and `StatefulSelect` API

- `type: TYPE.search | TYPE.select`:
  type of component to be in select or search mode (with lookup input)
- `selectedOptions: Array<Object>`:
  Current selected options. Every option object has `id: string` and `label: string|Object`. Label is defaulted to display for selected option, otherwise see `getSelectedOptionLabel` method
- `placeholder: ?string`:
  Placeholder text if nothing is selected. Default is `Choose one...`
- `rows: ?number`:
  Represents maximum visible length of options, all other will be scrolled. If not defined, all options will be visible.
- `options: Array<Object>`:
  All Options in dropdown. Should be provided for Select and Search mode equally. Every option object has `id: string` and `label: string|Object`. Label is defaulted to display for option in dropdown, otherwise see `getOptionLabel` method. Optional `disabled: boolean` for option to be disabled from selection.
- `label: ?React$Node`:
  Component or String representing label for Select component. Default is `''`
- `error: ?string`:
  Error message and error state. Default is `''`
- `multiple: ?boolean`:
  Sets if multiple choices are allowed in Select component. Default is `false`
- `simpleFilter: ?boolean`:
  Sets if simple String lookup should filter options by default on keyUp event. It works only in Search mode and with `string` labels (case-insensitive). Custom keyUp handler is still called if provided. Default is `false`
- `autoFocus: boolean`:
  make the control focused (active). Default is `false`
- `disabled: boolean`:
  Disable control from being changed
- `required: boolean`:
  Mark control as required
- `overrides: {}`
  - `DropDown: ?React.ComponentType` component to use for dropdown list
  - `Option: ?React.ComponentType` component to use for options in dropdown list
  - `Root: ?React.ComponentType` component to use for most top of the select component
  - `Input: ?React.ComponentType` component for Input showing current selected value(s). See `Input` Control of this framework for reference to override it's functionality.
  - `SearchIcon: ?React.ComponentType` component for all icons appearing in Select component. It's provided `$type: ICON.loop | ICON.clearTag | ICON.clearAll | ICON.selected` to setup corresponding icon of Select component
  - `Tag: ?React.ComponentType` component for selected options Tags shown in Input for multiple mode selection
- `onChange: func(e: SyntheticInputEvent, params: Object)`:
  handler for events on trigger element when option are changing selection or text of search input (in Search mode has changed). `params` has `type` indicating which action is performed, `id` and `label` of selected\unselected option and `selectedOptions` array of all of selected, has new `textValue` set in input (for `keyUp`)
- `onMouseEnter: func`:
  handler for events on trigger element
- `onMouseLeave: func`:
  handler for events on trigger element
- `onFocus: func`:
  handler for events on trigger element
- `onBlur: func`:
  handler for events on trigger element

### `StatefulSelectContainer` API

- `initialState: {}`
  Initial state of an uncontrolled popover component.
  - `selectedOptions` - an initial set of selected options. They are prepended to all Options array if not found there.
- `stateReducer: (type: text, nextState: {}, currentState: {}, e: any, params: Object) => nextState`
  A state change handler.
  - `type` - state change type
  - `nextState` - a new state changes that will be set
  - `currentState` - current full state of the component
  - `params` may contain `id` and `label` of selected option and `selectedOptions` array of all of selected, as well as new `textValue` set in input.
- `options: func` should return `Select` instance with standard or customized inner elements.
- `onChange: func(e: SyntheticInputEvent, params: Object)`:
  handler for events on trigger element when option are changing selection or text of search input (in Search mode has changed). `params` has `type` indicating which action is performed, `id` and `label` of selected\unselected option and `selectedOptions` array of all of selected, has new `textValue` set in input (for `keyUp`)
- `onMouseEnter: func`:
  handler for events on trigger element
- `onMouseLeave: func`:
  handler for events on trigger element
- `onFocus: func`:
  handler for events on trigger element
- `onBlur: func`:
  handler for events on trigger element

### Usage

```js
import {
  StatefulSelect,
  Select,
  StyledRoot,
  StyledInput,
  StyledInputContainer,
  StyledTag,
  StyledSearchIcon,
  StyledDropDown,
  StyledOption,
  ICON,
  OPTIONS,
  TYPE,
} from './index';

import {withStyle} from 'styletron-react';

const CustomOption = withStyle(StyledOption, {
  textColor: 'red',
});

export default () => {
  const options = [
    {
      id: '1',
      label: {
        text: 'First',
        imgSrc: '1.jpg',
      },
    },
    {
      id: '2',
      disabled: true,
      label: {
        text: 'Second',
        imgSrc: '2.jpg',
      },
    },
  ];
  return (
    <React.Fragment>
      <StatefulSelect
        options={options}
        initialState={{
          selectedOptions: [
            {
              id: '3',
              label: {
                text: 'Third',
                imgSrc: '3.jpg',
              },
            },
          ],
        }}
        getOptionLabel={option => (
          <span>
            <img
              style={{
                borderRadius: '50%',
                height: '75px',
              }}
              src={option.label.imgSrc}
            />
            {option.label.text}
          </span>
        )}
        label="Select option..."
        placeholder="Choose one..."
        type={TYPE.select}
        multiple={true}
        onChange={this.onChange}
        overrides={{
          Option: props => <CustomOption>Select {props.children}</CustomOption>,
        }}
      />
    </React.Fragment>
  );
};
```
