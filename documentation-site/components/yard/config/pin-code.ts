/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import omit from 'just-omit';
import { PinCode, SIZE } from 'baseui/pin-code';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';
import inputConfig, { theme, inputProps } from './input';

const PincodeConfig: TConfig = {
  componentName: 'PinCode',
  imports: {
    'baseui/pin-code': {
      named: ['PinCode'],
    },
  },
  scope: {
    PinCode,
    SIZE,
  },
  theme,
  props: {
    values: {
      value: `["", "", "", ""]`,
      type: PropTypes.Array,
      description: 'PinCode value attribute.',
      stateful: true,
    },
    onChange: {
      value: '({ values }) => setValues(values)',
      type: PropTypes.Function,
      description: 'Called when input value is changed.',
      propHook: {
        what: `JSON.stringify(values).split('",').join('", ')`,
        into: 'values',
      },
    },
    ...omit(inputProps, [
      'value',
      'placeholder',
      'startEnhancer',
      'endEnhancer',
      'onChange',
      'clearable',
      'adjoined',
      'pattern',
      'inputMode',
      'type',
      'inputRef',
    ]),
    mask: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Masks the pin code',
    },
    placeholder: {
      value: undefined,
      placeholder: 'x',
      type: PropTypes.String,
      description: 'Displayed when the pin code is not entered yet.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', inputConfig],
        sharedProps: {},
      },
    },
  },
};

export default PincodeConfig;
