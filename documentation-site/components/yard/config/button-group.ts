import {ButtonGroup, MODE} from 'baseui/button-group';
import {Button} from 'baseui/button';
import {PropTypes} from '../const';

export default {
  scopeConfig: {
    Button,
    ButtonGroup,
    MODE,
  },
  themeConfig: [
    'buttonPrimaryFill',
    'buttonPrimaryText',
    'buttonPrimaryHover',
    'buttonPrimaryActive',
    'buttonSecondaryFill',
    'buttonSecondaryText',
    'buttonSecondaryHover',
    'buttonSecondaryActive',
    'buttonTertiaryFill',
    'buttonTertiaryText',
    'buttonTertiaryHover',
    'buttonTertiaryActive',
    'buttonTertiarySelectedFill',
    'buttonTertiarySelectedText',
    'buttonMinimalFill',
    'buttonMinimalText',
    'buttonMinimalHover',
    'buttonMinimalActive',
    'buttonDisabledFill',
    'buttonDisabledText',
  ],
  propsConfig: {
    children: {
      value:
        '<Button>Label</Button><Button>Label</Button><Button>Label</Button>',
      type: PropTypes.ReactNode,
      description: 'Buttons within the group',
    },
    onClick: {
      value: '(event, index) => {\n  setSelected([index]);\n}',
      type: PropTypes.Function,
      description: `Function called when any button is clicked.`,
      meta: {
        propHook: {
          what: '`[${index}]`',
          into: 'selected',
        },
      },
    },
    selected: {
      value: '[0]',
      type: PropTypes.Array,
      description: 'Defines which buttons are selected',
      meta: {
        stateful: true,
      },
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Indicates that the button group is disabled',
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
