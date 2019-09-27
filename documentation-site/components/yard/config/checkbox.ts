import {Checkbox, STYLE_TYPE} from 'baseui/checkbox';
import {PropTypes} from '../const';

export default {
  scopeConfig: {
    Checkbox,
    STYLE_TYPE,
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
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders component in disabled state.',
    },
    checkmarkType: {
      value: undefined,
      options: STYLE_TYPE,
      type: PropTypes.Enum,
      description: 'Renders component in a toggle state.',
    },
    onChange: {
      value: 'e => setChecked(!e.target.checked)',
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
