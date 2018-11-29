# Select Component

## Usage

### Basic usage

```javascript
import * as React from 'react';
import { StatefulSelect } from 'baseui/select';

export default () => {
  const options = [
    {
      id: '1',
      label: 'First',
    },
    {
      id: '2',
      disabled: true,
      label: 'Second',
    },
  ];
  return
    <StatefulSelect
      options={options}
      placeholder="Start typing to select a destination"
      onChange={({value, option, type}) => {console.log('selected value changed')}}
    />
};
```

### Advanced usage

```javascript
import * as React from 'react';
import {
  StatefulSelect,
  Select,
  StyledRoot,
  StyledValueContainer,
  StyledInputContainer,
  StyledInput,
  StyledSingleValue,
  StyledSelectArrow,
  StyledOptionContent,
  TYPE,
} from 'baseui/select';

import {withStyle} from 'styletron-react';

const CustomOption = withStyle(StyledOptionContent, {
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
    <StatefulSelect
      options={options}
      initialState={{
        value: [
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
            src={option.label.imgSrc}
          />
          {option.label.text}
        </span>
      )}
      placeholder="Choose one..."
      type={TYPE.search}
      multi
      onChange={this.onChange}
      overrides={{
        OptionValue: CustomOption,
      }}
    />
  );
};
```

## Exports

* `StatefulSelect`
* `Select`
* `StatefulSelectContainer`
* `StyledRoot`
* `StyledControlContainer`
* `StyledValueContainer`
* `StyledPlaceholder`
* `StyledSingleValue`
* `StyledInputContainer`
* `StyledInput`
* `StyledInputSizer`
* `StyledSelectArrow`
* `StyledClearIcon`
* `StyledSearchIcon`
* `StyledDropdownContainer`
* `StyledOptionContent`
* `SIZE`
* `TYPE`
* `STATE_CHANGE_TYPE`

## `StatefulSelect` API

* All properties of the StatefulContainer except `children`
* All properties of the `Select` except `value`

## `Select` API

* `autoFocus: boolean` - Optional. Defaults to `false`
  Defines if select element is focused on the first mount
* `backspaceRemoves: boolean` - Optional. Defaults to `true`
  Defines if options can be removed by pressing backspace
* `clearable: boolean` - Optional. Defaults to `true`
  Defines if the select value can be cleared. If true a clear icon is rendered when a value is set
* `closeOnSelect: boolean` - Optional. Defaults to `true`
  Defines if the menu closes after a selection if made
* `deleteRemoves: boolean` - Optional. Defaults to `true`
  Defines if options can be removed by pressing backspace
* `disabled: boolean` - Optional. Defaults to `false`
  Defines if the control is disabled
* `error: boolean` - Optional. Defaults to `false`
  Defines if the control if in error state
* `escapeClearsValue: boolean` - Optional. Defaults to `true`
  Defines if the value is cleared when escape is pressed and the dropdown is closed
* `filterOptions: (options: Array<{}>, filterValue: string, excludeOptions: Array<{}>) => options: Array<{}>` - Optional. Defaults to `filterOptions` that excludes selected options for multi select
  A custom method to filter options to be displayed in the dropdown
* `filterOutSelected: boolean` - Optional. Defaults to `true`
  Defines if currently selected options are filtered out in the dropdown options
* `getOptionLabel: ({option: {}) => React.Node` - Optional. Defaults to return a `labelKey` value
  A custom method to get a display value for a dropdown option
* `getValueLabel: ({option: {}}) => React.Node` - Optional. Defaults to return a `labelKey` value
  A custom method to get a display value for a selected option
* `isLoading: boolean` - Optional. Defaults to `false`
  Defines if the select if in a loading (async) state
* `labelKey: string` - Optional. Defaults to `'label'`
  Defines an option key for a default label value
* `maxDropdownHeight: string` - Optional. Defaults to `900px`
  Sets max height of the dropdown list
* `multi: boolean` - Optional. Defaults to `false`
  Defines if multiple options can be selected
* `noResultsMsg: React.Node` - Optional. Defaults to `'No results found'`
  Message to be displayed if no options is found for a search query
* `onBlur: (e) => {}` - Optional
  onBlur event handler
* `onBlurResetsInput: boolean` - Optional. Defaults to `true`
  Defines if the input value is reset to an empty string when a blur event happens on the select
* `onChange: ({value: Array<Object>, option: ?Object, type: $Keys<typeof STATE_CHANGE_TYPE>}) => {}` - Optional
  onChange handler of the select to be called when a value is changed
* `onFocus: (e) => {}` - Optional
  onFocus event handler
* `onInputChange: (e) => {}` - Optional
  onChange handler for an underlying input element to be called when a search query value is changed
* `onCloseResetsInput: true` - Optional. Defaults to `true`
  Defines if the input value is reset to an empty string when dropdown is closed
* `onSelectResetsInput: true` - Optional. Defaults to `true`
  Defines if the input value is reset to an empty string when a selection is made
* `onOpen: null` - Optional. Defaults to `null`
  A function that is called when the dropdown opens
* `onClose: null` - Optional. Defaults to `null`
  A function that is called when the dropdown closes
* `openOnClick: true` - Optional. Defaults to `true`
  Defines if the dropdown opens on a click event on the select
* `options: Array<{}>` - Optional.  Defaults to `[]`
  Options to be displayed in the dropdown. If an option has a `disabled` prop value set to `true` it will be rendered as a disabled option in the dropdown
* `overrides: {Root, ControlContainer, Placeholder, ValueContainer, SingleValue, MultiValue, InputContainer, Input, SelectArrow, ClearIcon, LoadingIndicator, SearchIcon, DropdownContainer, Dropdown, DropdownOption, OptionContent}` - Optional.
  Overrides for presentational components. See "Presentational Components Props API" below.
  * `[ComponentName]: ReactComponent | {props: {}, style: {}, component: ReactComponent}` - Optional
* `placeholder: React.Node` - Optional. Defaults to `'Select...'`
  Sets the placeholder
* `required: boolean` - Optional. Defaults to `false`
  Defines if the select field is required to have a selection
* `searchable: boolean` - Optional. Defaults to `true`
  Defines if the search functionality id enabled
* `type: TYPE.search | TYPE.select` - Optional. Defaults to `TYPE.select`
  Defines type of the component to be in select or search mode. When set to `TYPE.search` the searh icon if rendered on the left and the select arrow icon is not rendered.
* `value: Array<{}>` - Optional. Defaults to `[]`
  A current selected value(s). If a selected value has a `clearableValue` prop set to `true` it will be rendered as a disabled selected option that can't be cleared
* `valueKey: string` - Optional. Defaults to `'id'`
  Defines an option key for a default key value

## `StatefulSelectContainer` API

* `initialState: {value: Array<{}>}` - Optional.Defaults to `{value: []}`
  Initial state of an uncontrolled select component.
  * `value` - an initial set of selected options.
* `stateReducer: (type: text, nextState: {}, currentState: {}) => nextState`
  A state change handler.
  * `type` - state change type
  * `nextState` - a new state changes that will be set
  * `currentState` - current full state of the component
* `children: func` - Required
  Children function that returns `Select` instance with default or customized inner elements.
* `onChange: ({type, option, value}) => void`:
  handler for events on trigger element when option are changing selection.  The `type` indicating which action is performed - `STATE_CHANGE_TYPE.select | STATE_CHANGE_TYPE.remove | STATE_CHANGE_TYPE.clear`. `option` that is beeing added or removed - `Object`. And `value` is the current select value icluding/exluding the currently selected/removed option.

## Presentational components API

These properties are passed to every presentational (styled) component that is exported:

* `$disabled: boolean`
* `$error: boolean`
* `$isFocused: boolean`
* `$isLoading: boolean`
* `$isOpen: boolean`
* `$isPseudoFocused: boolean`
* `$multi: boolean`
* `$required: boolean`
* `$searchable: boolean`
* `$size: SIZE.default | SIZE.compact`
* `$type: TYPE.select | TYPE.search`

* `$width: string` - is passed to the `Input` element only

* `$selected: boolean` - is passed to the `OptionContent` element only
* `$isHighlighted: boolean` - is passed to the `OptionContent` element only

## TYPE Constant

* `select`
* `search`

## STATE_CHANGE_TYPE Constant

* `select` - event type when a new option is selected
* `remove` - event type when an previously selected option is removed
* `clear` - event type when a select value is cleared