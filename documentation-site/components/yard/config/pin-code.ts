import {PinCode} from 'baseui/pin-code';
import {PropTypes} from '../const';

export default {
  scopeConfig: {
    PinCode,
  },
  themeConfig: [],
  propsConfig: {
    value: {
      value: 'Hello',
      type: PropTypes.String,
      description: 'PinCode value attribute.',
      meta: {
        stateful: true,
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
