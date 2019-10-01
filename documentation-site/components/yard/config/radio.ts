import {Radio, RadioGroup} from 'baseui/radio';
import {PropTypes} from '../const';

export default {
  scopeConfig: {
    Radio,
    RadioGroup,
  },
  extraImports: {
    'baseui/radio': {named: ['Radio, RadioGroup']},
  },
  themeConfig: [],
  propsConfig: {
    children: {
      value:
        '<Radio value="1">One</Radio>\n<Radio value="2">Two</Radio>\n<Radio value="3">Three</Radio>',
      type: PropTypes.ReactNode,
      description: 'Radios within the RadioGroup',
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
