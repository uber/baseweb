import {Combobox, SIZE} from 'baseui/combobox';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const comboboxProps = require('!!extract-react-types-loader!../../../../src/combobox/combobox.js');

const ComboboxConfig: TConfig = {
  componentName: 'Combobox',
  imports: {
    'baseui/combobox': {named: ['Combobox']},
  },
  scope: {
    Combobox,
    SIZE,
  },
  theme: ['comboboxListItemFocus', 'comboboxListItemHover'],
  props: {
    value: {
      value: '',
      type: PropTypes.String,
      description: 'Text displayed in the Input component.',
      stateful: true,
    },
    onChange: {
      value: 'nextValue => setValue(nextValue)',
      type: PropTypes.Function,
      description: 'Callback for when input value changes.',
      propHook: {
        what: 'nextValue',
        into: 'value',
      },
    },
    size: {
      value: 'SIZE.default',
      defaultValue: 'SIZE.default',
      options: SIZE,
      type: PropTypes.Enum,
      description: 'Defines the size of input and list items.',
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
      description: 'Options to be displayed in the listbox.',
    },
    mapOptionToString: {
      value: 'option => option.label',
      type: PropTypes.Function,
      description: 'Transforms option to visible string in listbox.',
    },
    mapOptionToNode: {
      value: undefined,
      placeholder: 'option => <>🦊{option.label}</>',
      type: PropTypes.Function,
      description: 'Transforms option to custom node in listbox.',
    },
    autocomplete: {
      value: true,
      defaultValue: true,
      type: PropTypes.Boolean,
      description:
        'Controls if keyboard navigation should temporarily update input value.',
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders component in disabled state.',
    },

    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'InputContainer', 'ListBox', 'ListItem'],
        sharedProps: {
          $isSelected: {
            type: PropTypes.Boolean,
            description:
              'Applied to the selected listbox option. Only applies to ListItem override.',
          },
        },
      },
    },
  },
  mapTokensToProps: {
    Combobox: comboboxProps,
  },
};

export default ComboboxConfig;
