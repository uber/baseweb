import {PhoneInput, COUNTRIES, SIZE} from 'baseui/phone-input';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

import {theme} from './input';

const phoneInputProps = require('!!extract-react-types-loader!../../../../src/phone-input/phone-input.js');

const countriesEnum: {[key: string]: string} = {};
Object.values(COUNTRIES).forEach(country => {
  countriesEnum[country.id] = country.label;
});

const PhoneInputConfig: TConfig = {
  imports: {
    'baseui/phone-input': {
      named: ['PhoneInput'],
    },
  },
  scope: {
    PhoneInput,
    COUNTRIES,
    SIZE,
  },
  theme,
  props: {
    country: {
      value: undefined,
      options: countriesEnum,
      type: PropTypes.Enum,
      enumName: 'COUNTRIES',
      description: 'Input value attribute.',
      stateful: true,
      imports: {
        'baseui/phone-input': {
          named: ['COUNTRIES'],
        },
      },
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
    size: {
      value: undefined,
      options: SIZE,
      type: PropTypes.Enum,
      description: 'Renders component in provided size.',
      imports: {
        'baseui/phone-input': {
          named: ['SIZE'],
        },
      },
    },
    maxDropdownHeight: {
      value: undefined,
      type: PropTypes.String,
      description: 'Sets the max height of the country select dropdown.',
      hidden: true,
    },
    maxDropdownWidth: {
      value: undefined,
      type: PropTypes.String,
      description: 'Sets the max width of the country select dropdown.',
      hidden: true,
    },
    mapIsoToLabel: {
      value: undefined,
      type: PropTypes.Function,
      description:
        'Function for mapping ISO codes to country names. Useful for localization of the country select dropdown.',
      hidden: true,
    },
    id: {
      value: undefined,
      type: PropTypes.String,
      description:
        "Id attribute value to be added to the input element and as a label's for attribute value.",
      hidden: true,
    },
    placeholder: {
      value: '',
      type: PropTypes.String,
      description: "Input's placeholder.",
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'CountrySelect',
          'CountrySelectDropdown',
          'CountrySelectDropdownDialcodeColumn',
          'CountrySelectDropdownFlagColumn',
          'CountrySelectDropdownListItem',
          'CountrySelectDropdownNameColumn',
          'DialCode',
          'Input',
        ],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    PhoneInput: phoneInputProps,
  },
};

export default PhoneInputConfig;
