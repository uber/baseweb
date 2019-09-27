import {Checkbox} from 'baseui/checkbox';
import {PropTypes} from '../const';

export default {
  scopeConfig: {
    Checkbox,
  },
  themeConfig: [],
  propsConfig: {
    checked: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders component in checked state.',
      meta: {
        stateful: true,
      },
    },
    children: {
      value: `Sign up for the newsletter`,
      type: PropTypes.ReactNode,
      description: `The React Nodes displayed next to the checkbox.`,
    },
    onChange: {
      value: 'e => setChecked(e.target.checked)',
      type: PropTypes.Function,
      description: 'Called when checkbox value is changed.',
      meta: {
        propHook: {
          what: 'e.target.checked',
          into: 'checked',
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
