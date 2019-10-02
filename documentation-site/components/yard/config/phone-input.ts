import {PhoneInput, COUNTRIES} from 'baseui/phone-input';
import {PropTypes} from '../const';
import {TConfig} from '../types';

import {theme} from './input';

const InputConfig: TConfig = {
  scope: {
    PhoneInput,
    COUNTRIES,
  },
  theme,
  props: {
    country: {
      value: undefined,
      options: COUNTRIES,
      type: PropTypes.Enum,
      enumName: 'COUNTRIES',
      description: 'Input value attribute.',
      stateful: true,
    },
    onCountryChange: {
      value: '({option}) => setCountry(option)',
      type: PropTypes.Function,
      description: 'Called when country value is changed.',
      propHook: {
        what: '"COUNTRIES." + option.id',
        into: 'country',
      },
    },
    text: {
      value: '',
      type: PropTypes.String,
      description: 'Text value attribute.',
      stateful: true,
    },
    onTextChange: {
      value: 'e => setText(e.currentTarget.value)',
      type: PropTypes.Function,
      description: 'Called when text value is changed.',
      propHook: {
        what: 'e.currentTarget.value',
        into: 'text',
      },
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders component in disabled state.',
    },
    error: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders component in error state.',
    },
    positive: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders component in positive state.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      names: ['Root'],
      sharedProps: {},
    },
  },
};

export default InputConfig;
