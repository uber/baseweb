import {TimePicker} from 'baseui/timepicker';
import {PropTypes} from '../const';
import {TConfig} from '../types';

const TimepickerConfig: TConfig = {
  imports: {
    'baseui/timepicker': {named: ['TimePicker']},
  },
  scope: {
    TimePicker,
  },
  theme: [],
  props: {
    value: {
      value: undefined,
      type: PropTypes.Date,
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
    overrides: {
      value: undefined,
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      names: ['Root', 'Input', 'InputContainer', 'IconWrapper'],
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
      },
    },
  },
};

export default TimepickerConfig;
