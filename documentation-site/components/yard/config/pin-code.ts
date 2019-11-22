import omit from 'just-omit';
import {PinCode, SIZE} from 'baseui/pin-code';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';
import {theme, inputProps} from './input';

const pinCodeProps = require('!!extract-react-types-loader!../../../../src/pin-code/pin-code.js');

const PincodeConfig: TConfig = {
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
        names: ['Root', 'Input'],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    PinCode: pinCodeProps,
  },
};

export default PincodeConfig;
