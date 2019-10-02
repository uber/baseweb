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
  theme: [],
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
<Radio value="2" description="This is a radio description">Two</Radio>
<Radio value="3">Three</Radio>`,
      type: PropTypes.ReactNode,
      description: 'Radios within the RadioGroup',
      imports: {
        'baseui/radio': {named: ['Radio']},
      },
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

export default RadioGroupConfig;
