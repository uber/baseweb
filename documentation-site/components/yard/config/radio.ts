import {Radio, RadioGroup} from 'baseui/radio';
import {PropTypes} from '../const';
import {TConfig} from '../types';

const RadioGroupConfig: TConfig = {
  scope: {
    Radio,
    RadioGroup,
  },
  imports: {
    'baseui/radio': {named: ['Radio, RadioGroup']},
  },
  theme: [],
  props: {
    children: {
      value: `<Radio value="1">One</Radio>
<Radio value="2">Two</Radio>
<Radio value="3">Three</Radio>`,
      type: PropTypes.ReactNode,
      description: 'Radios within the RadioGroup',
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
