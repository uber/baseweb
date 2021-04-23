/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
// $FlowFixMe
import Yard from '../../../components/yard/index';
import {Select, SIZE, TYPE} from 'baseui/select';
import {PropTypes} from 'react-view';
// $FlowFixMe
import tagConfig from '../../../components/yard/config/tag';

const selectYardConfig = {
  componentName: 'Select',
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
  theme: [],
  props: {
    options: {
      value: `[
  {label: 'Atlanta', id: 'a'},
  {label: 'Baltimore', id: 'b'},
  {label: 'Chicago', id: 'c'},
  {label: 'Denver', id: 'd'},
]`,
      type: PropTypes.Array,
      description: `Options to be displayed in the dropdown.
        If an option has a disabled prop value set to true it will be rendered as a disabled option in the dropdown.`,
    },
    value: {
      value: `[{label: 'Atlanta', id: 'a'}]`,
      type: PropTypes.Array,
      description: `A current selected value(s). If a selected value has a clearableValue
        prop set to true it will be rendered as a disabled selected option that can't be cleared.`,
      stateful: true,
    },
    multi: {
      value: true,
      type: PropTypes.Boolean,
      description: 'Defines if multiple options can be selected.',
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
    overrides: {
      value: {
        Tag: {
          active: true,
          nested: tagConfig,
          nestedValue: {
            Root: {
              style:
                '({ $theme }) => ({\n  borderTopLeftRadius: 0,\n  borderTopRightRadius: 0,\n  borderBottomRightRadius: 0,\n  borderBottomLeftRadius: 0,\n  backgroundColor: $theme.colors.accent,\n})',
              active: true,
            },
          },
        },
      },
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'DropdownListItem',
          'Placeholder',
          tagConfig,
          'ValueContainer',
        ],
        sharedProps: {
          $isFocused: {
            type: PropTypes.Boolean,
            description: "Indicates the control's current focus state.",
          },
          $isOpen: {
            type: PropTypes.Boolean,
            description:
              "Indicates if the select's dropdown is currently opened.",
          },
        },
      },
    },
  },
};

function LiveEditor() {
  return <Yard placeholderHeight={48} {...selectYardConfig} initialTab="1" />;
}

export default LiveEditor;
