/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { Combobox, SIZE } from 'baseui/combobox';
import { PropTypes } from 'react-view';
import type { TConfig } from '../types';
import inputConfig from './input';
import popoverConfig from './popover';

const ComboboxConfig: TConfig = {
  componentName: 'Combobox',
  imports: {
    'baseui/combobox': { named: ['Combobox'] },
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
    onBlur: {
      value: undefined,
      placeholder: `() => console.log('blur')`,
      type: PropTypes.Function,
      description: 'Callback for when input focus changes.',
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
    onFocus: {
      value: undefined,
      placeholder: `() => console.log('focus')`,
      type: PropTypes.Function,
      description: 'Callback for when input focus changes.',
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
      description: 'Controls if keyboard navigation should temporarily update input value.',
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders component in disabled state.',
    },
    id: {
      value: undefined,
      type: PropTypes.String,
      description: 'Id attribute.',
      hidden: true,
    },
    name: {
      value: undefined,
      type: PropTypes.String,
      description: 'Name attribute.',
      hidden: true,
    },
    inputRef: {
      value: undefined,
      type: PropTypes.Ref,
      description: 'A ref to access the input element.',
    },

    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          inputConfig,
          'InputContainer',
          'ListBox',
          'ListItem',
          { ...popoverConfig, componentName: 'Popover' },
        ],
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
};

export default ComboboxConfig;
