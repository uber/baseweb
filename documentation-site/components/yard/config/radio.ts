import {Radio, RadioGroup} from 'baseui/radio';
import {PropTypes} from '../const';
import {TConfig} from '../types';

const RadioGroupConfig: TConfig = {
  imports: {
    'baseui/radio': {named: ['RadioGroup']},
  },
  scope: {
    Radio,
    RadioGroup,
  },
  theme: [
    'tickFill',
    'tickFillHover',
    'tickFillActive',
    'tickFillSelected',
    'tickFillSelectedHover',
    'tickFillSelectedHoverActive',
    'tickFillError',
    'tickFillErrorHover',
    'tickFillErrorHoverActive',
    'tickFillErrorSelected',
    'tickFillErrorSelectedHover',
    'tickFillErrorSelectedHoverActive',
    'tickFillDisabled',
    'tickBorder',
    'tickBorderError',
    'tickMarkFill',
    'tickMarkFillError',
    'tickMarkFillDisabled',
  ],
  props: {
    value: {
      value: '2',
      type: PropTypes.String,
      description: 'Passed to the input element value attribute',
      stateful: true,
    },
    onChange: {
      value: 'e => setValue(e.target.value)',
      type: PropTypes.Function,
      description: 'Handler for change events on trigger element.',
      propHook: {
        what: 'e.target.value',
        into: 'value',
      },
    },
    children: {
      value: `<Radio value="1">One</Radio>
<Radio
  value="2"
  description="This is a radio description"
>
  Two
</Radio>
<Radio value="3">
  Three
</Radio>`,
      type: PropTypes.ReactNode,
      description: 'Radios within the RadioGroup',
      imports: {
        'baseui/radio': {named: ['Radio']},
      },
    },
    align: {
      value: undefined,
      type: PropTypes.String,
      placeholder: 'vertical',
      description: 'How to position radio buttons in the group.',
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description:
        'Disabled all radio group from being changed. To disable some of radios provide disabled flag in each of them.',
    },
    isError: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Sets radio group into error state.',
    },
    name: {
      value: undefined,
      type: PropTypes.String,
      description:
        'String value for the name of RadioGroup, it is used to group buttons. If missed default is random ID string.',
      hidden: true,
    },
    required: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Set if the control is required to be checked.',
      hidden: true,
    },
    autoFocus: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Set to be focused (active) on selectedchecked radio.',
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
    onMouseEnter: {
      value: undefined,
      type: PropTypes.Function,
      description: 'Called when mouseenter triggers.',
      hidden: true,
    },
    onMouseLeave: {
      value: undefined,
      type: PropTypes.Function,
      description: 'Called when mouseleave triggers.',
      hidden: true,
    },
    onBlur: {
      value: undefined,
      type: PropTypes.Function,
      description: 'Called when input loses focus.',
      hidden: true,
    },
    onFocus: {
      value: undefined,
      type: PropTypes.Function,
      description: 'Called when input is focused.',
      hidden: true,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      names: [
        'Root',
        'Input',
        'Label',
        'RadioGroupRoot',
        'RadioMarkInner',
        'RadioMarkOuter',
      ],
      sharedProps: {
        $isFocused: {
          type: PropTypes.Boolean,
          description: 'True when the component is focused.',
        },
        $isHovered: {
          type: PropTypes.Boolean,
          description: 'True when the component is hovered.',
        },
        $isActive: {
          type: PropTypes.Boolean,
          description: 'True when the component is active.',
        },
        $isError: 'isError',
        $checked: {
          type: PropTypes.Boolean,
          description: 'True when the component is active.',
        },
        $required: 'required',
        $disabled: 'disabled',
      },
    },
  },
};

export default RadioGroupConfig;
