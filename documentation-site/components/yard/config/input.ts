import pick from 'just-pick';

import {Input, ADJOINED, SIZE} from 'baseui/input';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

import {changeHandlers} from './common';

const inputPropsType = require('!!extract-react-types-loader!../../../../src/input/input.js');

export const theme = [
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
];

export const inputProps = {
  value: {
    value: 'Hello',
    type: PropTypes.String,
    description: 'Input value attribute.',
    stateful: true,
  },
  onChange: {
    value: 'e => setValue(e.target.value)',
    type: PropTypes.Function,
    description: 'Called when input value is changed.',
    propHook: {
      what: 'e.target.value',
      into: 'value',
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
    value: 'SIZE.default',
    defaultValue: 'SIZE.default',
    options: SIZE,
    type: PropTypes.Enum,
    description: 'Renders component in provided size.',
    imports: {
      'baseui/input': {
        named: ['SIZE'],
      },
    },
  },
  placeholder: {
    value: 'Controlled Input',
    type: PropTypes.String,
    description: "Input's placeholder.",
  },
  type: {
    value: undefined,
    type: PropTypes.String,
    placeholder: 'password',
    description: 'Input type attribute.',
  },
  clearable: {
    value: false,
    type: PropTypes.Boolean,
    description:
      'If true, adds a clear value icon button to the end of the input container.',
  },
  startEnhancer: {
    value: undefined,
    placeholder: '() => <span>$</span>',
    type: PropTypes.Function,
    description:
      'An input helper rendered before and attached to the input field.',
  },
  endEnhancer: {
    value: undefined,
    placeholder: '() => <span>?</span>',
    type: PropTypes.Function,
    description:
      'An input helper rendered after and attached to the input field.',
  },
  inputMode: {
    value: undefined,
    type: PropTypes.String,
    description:
      'A hint as to the type of data that might be entered by the user while editing the element or its contents.',
    hidden: true,
  },
  'aria-label': {
    value: undefined,
    type: PropTypes.String,
    description: `Sets aria-label attribute.`,
    hidden: true,
  },
  'aria-labelledby': {
    value: undefined,
    type: PropTypes.String,
    description: `Sets aria-labelledby attribute.`,
    hidden: true,
  },
  'aria-describedby': {
    value: undefined,
    type: PropTypes.String,
    description: `Sets aria-describedby attribute.`,
    hidden: true,
  },
  adjoined: {
    value: 'ADJOINED.none',
    defaultValue: 'ADJOINED.none',
    options: ADJOINED,
    type: PropTypes.Enum,
    description: `Defines styles for inputs that are grouped with other controls.`,
    hidden: true,
    imports: {
      'baseui/input': {
        named: ['ADJOINED'],
      },
    },
  },
  autoComplete: {
    value: undefined,
    type: PropTypes.String,
    description: 'Determines if browser should provide value suggestions.',
    hidden: true,
  },
  autoFocus: {
    value: false,
    type: PropTypes.Boolean,
    description: 'If true the input will be focused on the first mount.',
    hidden: true,
  },
  pattern: {
    value: undefined,
    type: PropTypes.String,
    description:
      'A regex that is used to validate the value of the input on form submission.',
    hidden: true,
  },
  id: {
    value: undefined,
    type: PropTypes.String,
    description:
      "Id attribute value to be added to the input element and as a label's for attribute value.",
    hidden: true,
  },
  inputRef: {
    value: undefined,
    type: PropTypes.Ref,
    description: 'A ref to access an input element.',
    hidden: true,
  },
  name: {
    value: undefined,
    type: PropTypes.String,
    description: 'Name attribute.',
    hidden: true,
  },
  min: {
    value: undefined,
    type: PropTypes.String,
    description: 'min value when used as input type=number',
    hidden: true,
  },
  max: {
    value: undefined,
    type: PropTypes.String,
    description: 'max value when used as input type=number',
    hidden: true,
  },
  ...pick(changeHandlers, [
    'onBlur',
    'onKeyDown',
    'onKeyPress',
    'onKeyUp',
    'onFocus',
  ]),
  required: {
    value: false,
    type: PropTypes.Boolean,
    description: 'Renders component in required state.',
    hidden: true,
  },
};

const InputConfig: TConfig = {
  imports: {
    'baseui/input': {
      named: ['Input'],
    },
  },
  scope: {
    Input,
    SIZE,
    ADJOINED,
  },
  theme,
  props: {
    ...inputProps,
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'Input',
          'InputContainer',
          'After',
          'Before',
          'ClearIcon',
          'ClearIconContainer',
          'EndEnhancer',
          'MaskToggleButton',
          'MaskToggleHideIcon',
          'MaskToggleShowIcon',
          'StartEnhancer',
        ],
        sharedProps: {
          $isFocused: {
            type: PropTypes.Boolean,
            description: 'True when the component is focused.',
          },
          $disabled: 'disabled',
          $error: 'error',
          $positive: 'positive',
          $adjoined: 'adjoined',
          $size: 'size',
          $required: 'required',
          $position: {
            type: PropTypes.Enum,
            description:
              'ADJOINED state. How is the input grouped with other controls.',
          },
        },
      },
    },
  },
  mapTokensToProps: {
    Input: inputPropsType,
  },
};

export default InputConfig;
