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
      onChange={() => {console.log('selected value changed')}}
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
  StyledInput,
  StyledInputContainer,
  StyledTag,
  StyledSelectComponentIcon,
  StyledDropDown,
  StyledOption,
  ICON,
  OPTIONS,
  TYPE,
} from 'baseui/select';

import {withStyle} from 'styletron-react';

const CustomOption = withStyle(StyledOption, {
  textColor: 'red',
});

export default () => {
  const options = textQuery => {
    return new Promise(resolve => {
      if (!textQuery) {
        resolve([
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
          ])
      } else {
          fetch(url)
          .then((resp) => resp.json())
          .then(resolve);
      }
    });
  };
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

## Exports

* `StatefulSelect`
* `StatefulSelectContainer`
* `Select`
* `StyledSelectInput`
* `StyledOption`
* `StyledDropDown`
* `StyledLabel`
* `StyledHint`
* `StyledSelectSpinner`

## `Select` and `StatefulSelect` API

* `type: TYPE.search | TYPE.select`:
  type of component to be in select or search mode (with lookup input)
* `selectedOptions: Array<Object>`:
  Current selected options. Every option object has `id: string` and `label: string|Object`. Label is defaulted to display for selected option, otherwise see `getSelectedOptionLabel` method
* `placeholder: ?string`:
  Placeholder text if nothing is selected. Default is `Choose one...`
* `options: Array<Object> | func(query?: string) => Promise<Array<Object>>`:
  All Options in dropdown. Should be provided for Select and Search mode equally. Every option object has `id: string` and `label: string|Object`. Label is defaulted to display for option in dropdown, otherwise see `getOptionLabel` method. Optional `disabled: boolean` for option to be disabled from selection.
  For async load of options it should be a function method, which returns Promise, resolved with new options. Function can be provided with text input `query` if it is present in component.
  `WARNINNG:` options as a function is only for client-side calls.
* `error: ?boolean`:
  Whether the control should be in an error state. Default is `false`
* `multiple: ?boolean`:
  Sets if multiple choices are allowed in Select component. Default is `false`
* `maxDropdownHeight: ?string`:
    Sets max height of DropDown list. Default is `900px` or `90%`
* `filterable?: boolean`:
  Sets if options should be filtered when the input changes. It works only in Search mode. If your option labels aren't strings, or you need custom filtering logic, use the `filterOption` prop. Custom keyDown handler is still called if provided. Default is `false`
* `filterOption?: (option: Object, query: String) => boolean`:
  Custom method to filter whether an option should be displayed in the menu. Defaults to a simple lower-case string match.
* `getOptionLabel?: (option: Object) => React$Node`:
  Lets you control what label is rendered for the specified option. The default behavior returns `option.label`.
* `getSelectedOptionLabel?: (option: Object) => React$Node`:
  Lets you control what label is rendered for the selected option. If not specified, defaults to `getOptionLabel`.
* `autoFocus: boolean`:
  Make the control focused (active). Default is `false`
* `disabled: boolean`:
  Disable control from being changed
* `required: boolean`:
  Mark control as required
* `tabindex: number`:
  The start offset of tabindex to navigate through component. Default is `0`.  
* `overrides: {}`
  * `DropDown: ?React.ComponentType` component to use for dropdown list
  * `Option: ?React.ComponentType` component to use for options in dropdown list
  * `Root: ?React.ComponentType` component to use for most top of the select component
  * `Input: ?React.ComponentType` component for Input showing current selected value(s). See `Input` Control of this framework for reference to override it's functionality.
  * `SelectComponentIcon: ?React.ComponentType` component for all icons appearing in Select component. It's provided `$type: ICON.loop | ICON.clearTag | ICON.clearAll | ICON.selected` to setup corresponding icon of Select component
  * `Tag: ?React.ComponentType` component for selected options Tags shown in Input for multiple mode selection
  * `SelectSpinner: ?React.ComponentType` component for dropdown spinner if async options are loading
* `onChange: func(e: SyntheticInputEvent, params: Object)`:
  handler for events on trigger element when option are changing selection.  `params` has `type` indicating which action is performed, current `Option` with `id` and `label` of selected\unselected option and `selectedOptions` array of all of selected.
* `onTextInputChange: func(e: SyntheticInputEvent)`:
  handler for events on trigger element when text of search input (in Search mode has changed).
* `onMouseEnter: func`:
  handler for events on trigger element
* `onMouseLeave: func`:
  handler for events on trigger element
* `onFocus: func`:
  handler for events on trigger element
* `onBlur: func`:
  handler for events on trigger element

## `StatefulSelectContainer` API

* `initialState: {}`
  Initial state of an uncontrolled popover component.
  * `selectedOptions` - an initial set of selected options. They are prepended to all Options array if not found there.
* `stateReducer: (type: text, nextState: {}, currentState: {}, e: any, params: Object) => nextState`
  A state change handler.
  * `type` - state change type
  * `nextState` - a new state changes that will be set
  * `currentState` - current full state of the component
  * `params` may contain `id` and `label` of selected option and `selectedOptions` array of all of selected, as well as new `textValue` set in input.
* `children: func` should return `Select` instance with standard or customized inner elements.
* `onChange: func(e: SyntheticInputEvent, params: Object)`:
  handler for events on trigger element when option are changing selection.  `params` has `type` indicating which action is performed, current `Option` with `id` and `label` of selected\unselected option and `selectedOptions` array of all of selected.
* `onTextInputChange: func(e: SyntheticInputEvent)`:
  handler for events on trigger element when text of search input (in Search mode has changed).
* `onMouseEnter: func`:
  handler for events on trigger element
* `onMouseLeave: func`:
  handler for events on trigger element
* `onFocus: func`:
  handler for events on trigger element
* `onBlur: func`:
  handler for events on trigger element
