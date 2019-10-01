// @ts-ignore
import omit from 'just-omit';

import {PinCode} from 'baseui/pin-code';
import {PropTypes} from '../const';

import {themeConfig} from './input';
import {inputProps} from './input';

export default {
  scopeConfig: {
    PinCode,
  },
  extraImports: {
    'baseui/input': {
      named: ['SIZE'],
    },
  },
  themeConfig,
  propsConfig: {
    ...omit(inputProps, [
      'placeholder',
      'value',
      'startEnhancer',
      'endEnhancer',
      'onChange',
    ]),
    placeholder: {
      value: undefined,
      type: PropTypes.String,
      hidden: true,
    },
    value: {
      value: "['', '', '', '']",
      type: PropTypes.Array,
      description: 'PinCode value attribute.',
      meta: {
        stateful: true,
      },
    },
    onChange: {
      value: '({values}) => setValue(values)',
      type: PropTypes.Function,
      description: 'Called when input value is changed.',
      meta: {
        propHook: {
          what: '{values}',
          into: 'value',
        },
      },
    },

    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      meta: {
        names: ['Root'],
        sharedProps: {},
      },
    },
  },
};
