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
* `StyledIconsContainer`
* `StyledSelectArrow`
* `StyledClearIcon`
* `StyledSearchIcon`
* `StyledDropdownContainer`
* `StyledOptionContent`
* `SIZE`
* `TYPE`
* `STATE_CHANGE_TYPE`

## `StatefulSelect` API

* All properties of the StatefulContainer except `children`.
* All properties of the `Select` except `value`.

## `Select` API

* `autoFocus?: boolean = false`
  * Defines if select element is focused on the first mount.
* `backspaceRemoves?: boolean = true`
  * Defines if options can be removed by pressing backspace.
* `clearable?: boolean = true`
  * Defines if the select value can be cleared. If true a clear icon is rendered when a value is set.
* `closeOnSelect?: boolean = true`
  * Defines if the menu closes after a selection if made.
* `deleteRemoves?: boolean = true`
  * Defines if options can be removed by pressing backspace.
* `disabled?: boolean = false`
  * Defines if the control is disabled.
* `error?: boolean = false`
  * Defines if the control if in error state.
* `escapeClearsValue?: boolean = true`
  * Defines if the value is cleared when escape is pressed and the dropdown is closed.
* `filterOptions?: (options: Array<{}>, filterValue: string, excludeOptions: Array<{}>) => options: Array<{}>`
  * Defaults to `filterOptions` that excludes selected options for multi select. A custom method to filter options to be displayed in the dropdown.
* `filterOutSelected?: boolean = true`
  * Defines if currently selected options are filtered out in the dropdown options.
* `getOptionLabel?: ({option: {}) => React.Node = option => option[props.labelKey]`
  * A custom method to get a display value for a dropdown option.
* `getValueLabel?: ({option: {}}) => React.Node = null`
  * A custom method to get a display value for a selected option.
* `isLoading?: boolean = false`
  * Defines if the select if in a loading (async) state.
* `labelKey?: string = 'label'`
  * Defines an option key for a default label value.
* `maxDropdownHeight?: string = '900px'`
  * Sets max height of the dropdown list.
* `multi?: boolean = false`
  * Defines if multiple options can be selected.
* `noResultsMsg?: React.Node = 'No results found'`
  * Message to be displayed if no options is found for a search query.
* `onBlur?: (event: SyntheticEvent<HTMLElement>) => {}`
  * Handler for blur events on input element.
* `onBlurResetsInput?: boolean = true`
  * Defines if the input value is reset to an empty string when a blur event happens on the select.
* `onChange?: ({value: Array<Object>, option: ?Object, type: $Keys<typeof STATE_CHANGE_TYPE>}) => {}`
  * change handler of the select to be called when a value is changed.
* `onFocus?: (event: SyntheticEvent<HTMLElement>) => {}`
  * Handler for focus events on input element.
* `onInputChange?: (event: SyntheticInputEvent<HTMLInputElement>) => {}`
  * change handler for an underlying input element to be called when a search query value is changed.
* `onCloseResetsInput?: boolean = true`
  * Defines if the input value is reset to an empty string when dropdown is closed.
* `onSelectResetsInput?: boolean = true`
  * Defines if the input value is reset to an empty string when a selection is made.
* `onOpen?: () => void = null`
  * A function that is called when the dropdown opens.
* `onClose?: () => void = null`
  * A function that is called when the dropdown closes.
* `openOnClick?: boolean = true`
  * Defines if the dropdown opens on a click event on the select.
* `options?: Array<{}> = []`
  * Options to be displayed in the dropdown. If an option has a `disabled` prop value set to `true` it will be rendered as a disabled option in the dropdown.
* `overrides?: {Root, ControlContainer, Placeholder, ValueContainer, SingleValue, MultiValue, InputContainer, Input, IconsContainer, SelectArrow, ClearIcon, LoadingIndicator, SearchIcon, DropdownContainer, Dropdown, DropdownOption, OptionContent} = {}`
  * `Root?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `ControlContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Placeholder?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `ValueContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `SingleValue?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `MultiValue?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `InputContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Input?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `IconsContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `SelectArrow?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `ClearIcon?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `LoadingIndocator?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `SearchIcon?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `DropdownContainer?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `Dropdown?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `DropdownOption?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
  * `OptionContent?: ReactComponent | {props: {}, style: {}, component: ReactComponent}`
* `placeholder?: React.Node = 'Select...'`
  * Sets the placeholder.
* `required?: boolean = false`
  * Defines if the select field is required to have a selection.
* `searchable?: boolean = true`
  * Defines if the search functionality id enabled.
* `type?: $Values<TYPE> = TYPE.select`
  * Defines type of the component to be in select or search mode. When set to `TYPE.search` the searh icon if rendered on the left and the select arrow icon is not rendered.
* `value?: Array<{}> = []`
  * A current selected value(s). If a selected value has a `clearableValue` prop set to `true` it will be rendered as a disabled selected option that can't be cleared.
* `valueKey?: string = 'id'`
  * Defines an option key for a default key value.

## `StatefulSelectContainer` API

* `initialState?: {value: Array<{}> = []}`
  * Initial state of an uncontrolled select component.
    * `value` - an initial set of selected options.
* `stateReducer?: (type: text, nextState: {}, currentState: {}) => nextState`
  * A state change handler.
    * `type` - state change type
    * `nextState` - a new state changes that will be set
    * `currentState` - current full state of the component
* `children: ({onChange, overrides}) => React.Node` - Required.
  * Children function that returns `Select` instance with default or customized inner elements.
* `onChange?: ({type, option, value}) => void = () => {}`:
  * handler for events on trigger element when option are changing selection.  The `type` indicating which action is performed - `STATE_CHANGE_TYPE.select | STATE_CHANGE_TYPE.remove | STATE_CHANGE_TYPE.clear`. `option` that is beeing added or removed - `Object`. And `value` is the current select value including/excluding the currently selected/removed option.

## Presentational components API

These properties are passed to every presentational (styled) component that is exported:

`StyledRoot`, `StyledControlContainer`, `StyledValueContainer`, `StyledPlaceholder`,
`StyledSingleValue`, `StyledInputContainer`, `StyledInput`, `StyledInputSizer`,
`StyledSelectArrow`, `StyledClearIcon`, `StyledSearchIcon`, `StyledDropdownContainer`,
`StyledOptionContent`

* `$disabled: boolean`
* `$error: boolean`
* `$isFocused: boolean`
* `$isLoading: boolean`
* `$isOpen: boolean`
* `$isPseudoFocused: boolean`
* `$multi: boolean`
* `$required: boolean`
* `$searchable: boolean`
* `$size: $Values<SIZE>`
* `$type: $Values<TYPE>`

* `$width: string` - is passed to the `Input` element only

* `$selected: boolean` - is passed to the `OptionContent` element only
* `$isHighlighted: boolean` - is passed to the `OptionContent` element only

## `SIZE` Constant

* `default`
* `compact`

## `TYPE` Constant

* `select`
* `search`

## `STATE_CHANGE_TYPE` Constant

* `select` - event type when a new option is selected
* `remove` - event type when an previously selected option is removed
* `clear` - event type when a select value is cleared
