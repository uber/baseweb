// @ts-ignore
import omit from 'just-omit';

import {PinCode, SIZE} from 'baseui/pin-code';
import {PropTypes} from '../const';

import {themeConfig} from './input';
import {inputProps} from './input';

export default {
  scopeConfig: {
    PinCode,
    SIZE,
  },
  themeConfig,
  propsConfig: {
    ...omit(inputProps, [
      'placeholder',
      'value',
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
    placeholder: {
      value: undefined,
      type: PropTypes.String,
      hidden: true,
    },
    values: {
      value: '["", "", "", ""]',
      type: PropTypes.Array,
      description: 'PinCode value attribute.',
      meta: {
        stateful: true,
      },
    },
    onChange: {
      value: '({values}) => setValues(values)',
      type: PropTypes.Function,
      description: 'Called when input value is changed.',
      meta: {
        propHook: {
          what: 'JSON.stringify(values)',
          into: 'values',
        },
      },
    },

    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      meta: {
        names: ['Root', 'Input'],
        sharedProps: {},
      },
    },
  },
};
