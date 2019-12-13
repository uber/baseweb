import pick from 'just-pick';
import {Select, SIZE, TYPE} from 'baseui/select';
import {PropTypes} from 'react-view';
import {changeHandlers} from './common';
import {TConfig} from '../types';

const selectProps = require('!!extract-react-types-loader!../../../../src/select/select.js');

const SelectConfig: TConfig = {
  imports: {
    'baseui/select': {
      named: ['Select'],
    },
  },
  scope: {
    Select,
    SIZE,
    TYPE,
  },
  theme: [
    'borderFocus',
    'contentPrimary',
    'contentSecondary',
    'inputFill',
    'inputFillError',
    'inputFillDisabled',
    'inputFillActive',
    'inputFillPositive',
    'inputTextDisabled',
    'inputBorderError',
    'inputBorderPositive',
    'inputEnhancerFill',
    'inputEnhancerFillDisabled',
    'inputEnhancerTextDisabled',
    'menuFill',
    'menuFillHover',
    'menuFontDefault',
    'menuFontDisabled',
    'menuFontHighlighted',
    'menuFontSelected',
  ],
  props: {
    autoFocus: {
      value: undefined,
      type: PropTypes.Boolean,
      description: 'Defines if select element is focused on the first mount.',
    },
    backspaceRemoves: {
      value: true,
      type: PropTypes.Boolean,
      defaultValue: true,
      description: 'Defines if options can be removed by pressing backspace.',
    },
    clearable: {
      value: true,
      type: PropTypes.Boolean,
      defaultValue: true,
      description:
        'Defines if the select value can be cleared. If true a clear icon is rendered when a value is set.',
    },
    closeOnSelect: {
      value: true,
      type: PropTypes.Boolean,
      defaultValue: true,
      description: 'Defines if the menu closes after a selection if made.',
    },
    creatable: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Defines if new options can be created along with choosing existing options.',
    },
    deleteRemoves: {
      value: true,
      type: PropTypes.Boolean,
      defaultValue: true,
      description: 'Defines if options can be removed by pressing backspace.',
    },
    disabled: {
      value: undefined,
      type: PropTypes.Boolean,
      description: 'Defines if the control is disabled.',
    },
    error: {
      value: undefined,
      type: PropTypes.Boolean,
      description: 'Defines if the control is in error state.',
    },
    positive: {
      value: undefined,
      type: PropTypes.Boolean,
      description: 'Defines if the control is in positive state.',
    },
    escapeClearsValue: {
      value: true,
      type: PropTypes.Boolean,
      defaultValue: true,
      description:
        'Defines if the value is cleared when escape is pressed and the dropdown is closed.',
    },
    size: {
      value: 'SIZE.default',
      defaultValue: 'SIZE.default',
      options: SIZE,
      type: PropTypes.Enum,
      description:
        'Defines the size (scale) of dropdown menu items. See the Menu component API.',
      imports: {
        'baseui/select': {
          named: ['SIZE'],
        },
      },
    },
    options: {
      value: `[
  {label: 'AliceBlue', id: '#F0F8FF'},
  {label: 'AntiqueWhite', id: '#FAEBD7'},
  {label: 'Aqua', id: '#00FFFF'},
  {label: 'Aquamarine', id: '#7FFFD4'},
  {label: 'Azure', id: '#F0FFFF'},
  {label: 'Beige', id: '#F5F5DC'},
]`,
      type: PropTypes.Array,
      description: `Options to be displayed in the dropdown.
        If an option has a disabled prop value set to true it will be rendered as a disabled option in the dropdown.`,
    },
    value: {
      value: '[]',
      type: PropTypes.Array,
      description: `A current selected value(s). If a selected value has a clearableValue
        prop set to true it will be rendered as a disabled selected option that can't be cleared.`,
      stateful: true,
    },
    getOptionLabel: {
      value: undefined,
      type: PropTypes.Function,
      description:
        'A custom method to get a display value for a dropdown option.',
      placeholder: '({option}) => option.label',
    },
    getValueLabel: {
      value: undefined,
      type: PropTypes.Function,
      description:
        'A custom method to get a display value for a selected option.',
      placeholder: '({option}) => option.label',
    },
    labelKey: {
      value: undefined,
      type: PropTypes.String,
      description: 'Defines an option key name for a default label value.',
      placeholder: 'string',
    },
    valueKey: {
      value: undefined,
      type: PropTypes.String,
      description: `/** Defines a key name for an option's unique identifier value.
        The value of the 'valueKey' prop is used to identify what options are selected
        or removed from the selection, it also used for default filtering out the
        selected options from the dropdown list.`,
      placeholder: 'string',
    },
    'aria-label': {
      value: undefined,
      type: PropTypes.String,
      description: 'Sets the aria-label attribute.',
      placeholder: 'string',
      hidden: true,
    },
    'aria-describedby': {
      value: undefined,
      type: PropTypes.String,
      description: 'Sets the aria-describedby attribute.',
      placeholder: 'string',
      hidden: true,
    },
    'aria-labelledby': {
      value: undefined,
      type: PropTypes.String,
      description: 'Sets the aria-describedby attribute.',
      placeholder: 'string',
      hidden: true,
    },
    id: {
      value: undefined,
      type: PropTypes.String,
      description:
        'Sets the id attribute of the internal input element. Allows for usage with labels.',
      placeholder: 'string',
      hidden: true,
    },
    mountNode: {
      value: undefined,
      type: PropTypes.Ref,
      description: 'Where to mount the popover.',
      hidden: true,
    },
    filterOutSelected: {
      value: true,
      type: PropTypes.Boolean,
      defaultValue: true,
      description:
        'Defines if currently selected options are filtered out in the dropdown options.',
    },
    isLoading: {
      value: undefined,
      type: PropTypes.Boolean,
      description: 'Defines if the select is in a loading (async) state.',
    },
    multi: {
      value: undefined,
      type: PropTypes.Boolean,
      description: 'Defines if multiple options can be selected.',
    },
    onBlurResetsInput: {
      value: true,
      type: PropTypes.Boolean,
      defaultValue: true,
      description:
        'Defines if the input value is reset to an empty string when a blur event happens on the select.',
    },
    onCloseResetsInput: {
      value: true,
      type: PropTypes.Boolean,
      defaultValue: true,
      description:
        'Defines if the input value is reset to an empty string when dropdown is closed.',
    },
    onSelectResetsInput: {
      value: true,
      type: PropTypes.Boolean,
      defaultValue: true,
      description:
        'Defines if the input value is reset to an empty string when a selection is made.',
    },
    openOnClick: {
      value: true,
      type: PropTypes.Boolean,
      defaultValue: true,
      description:
        'Defines if the dropdown opens on a click event on the select.',
    },
    required: {
      value: undefined,
      type: PropTypes.Boolean,
      description:
        'Defines if the select field is required to have a selection.',
    },
    searchable: {
      value: true,
      type: PropTypes.Boolean,
      defaultValue: true,
      description: 'Defines if the search functionality is enabled.',
    },
    startOpen: {
      value: undefined,
      type: PropTypes.Boolean,
      description: 'If true, opens the dropdown when the select mounts.',
    },
    type: {
      value: 'TYPE.select',
      defaultValue: 'TYPE.select',
      options: TYPE,
      type: PropTypes.Enum,
      description: `Defines type of the component to be in a select or search mode.
        When set to TYPE.search the search icon is rendered on the
        left and the select arrow icon is not rendered.`,
      imports: {
        'baseui/select': {
          named: ['TYPE'],
        },
      },
    },
    placeholder: {
      value: 'Select color',
      type: PropTypes.String,
      description: 'Sets the placeholder.',
    },
    onChange: {
      value: '(params) => setValue(params.value)',
      type: PropTypes.Function,
      description:
        'Change handler of the select to be called when a value is changed.',
      propHook: {
        what: 'JSON.stringify(params.value)',
        into: 'value',
      },
      placeholder: '({value, option, type}) => value',
    },
    filterOptions: {
      value: undefined,
      type: PropTypes.Function,
      description:
        'A custom method to filter options to be displayed in the dropdown.',
      placeholder: '(options) => options',
    },
    ...pick(changeHandlers, ['onBlur', 'onFocus']),
    onInputChange: {
      value: undefined,
      type: PropTypes.Function,
      description: 'Change handler of the search input.',
      placeholder: '(event) => {}',
    },
    onOpen: {
      value: undefined,
      type: PropTypes.Function,
      description: 'A function that is called when the dropdown opens.',
      placeholder: '() => {}',
    },
    onClose: {
      value: undefined,
      type: PropTypes.Function,
      description: 'A function that is called when the dropdown closes.',
      placeholder: '() => {}',
    },
    maxDropdownHeight: {
      value: undefined,
      type: PropTypes.String,
      description: 'Sets max height of the dropdown list.',
      placeholder: 'string',
      hidden: true,
    },
    noResultsMsg: {
      value: undefined,
      type: PropTypes.ReactNode,
      description:
        'Message to be displayed if no options is found for a search query.',
      hidden: true,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'ControlContainer',
          'Placeholder',
          'ValueContainer',
          'SingleValue',
          'MultiValue',
          'InputContainer',
          'Input',
          'IconsContainer',
          'SelectArrow',
          'ClearIcon',
          'LoadingIndicator',
          'SearchIconContainer',
          'SearchIcon',
          'Popover',
          'DropdownContainer',
          'Dropdown',
          'DropdownOption',
          'DropdownListItem',
          'OptionContent',
          'StatefulMenu',
        ],
        sharedProps: {
          $clearable: 'clearable',
          $creatable: 'creatable',
          $disabled: 'disabled',
          $error: 'error',
          $isFocused: {
            type: PropTypes.Boolean,
            description: "Indicates the control's current focus state.",
          },
          $isHighlighted: {
            type: PropTypes.Boolean,
            description:
              "Prop passed to an option indicating it's currently highlighted.",
          },
          $isLoading: 'isLoading',
          $isOpen: {
            type: PropTypes.Boolean,
            description:
              "Indicates if the select's dropdown is currently opened.",
          },
          $isPseudoFocused: {
            type: PropTypes.Boolean,
            description: "Indicates the select's current focus state.",
          },
          $maxHeight: 'maxDropdownHeight',
          $multi: 'multi',
          $positive: 'positive',
          $required: 'required',
          $searchable: 'searchable',
          $selected: {
            type: PropTypes.Boolean,
            description:
              "Prop passed to an option indicating it's currently selected.",
          },
          $size: 'size',
          $type: 'type',
        },
      },
    },
  },
  mapTokensToProps: {
    Select: selectProps,
  },
};

export default SelectConfig;
