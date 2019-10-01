import {ButtonGroup, MODE} from 'baseui/button-group';
import {Button} from 'baseui/button';
import {PropTypes} from '../const';
import {TConfig} from '../types';

const ButtonGroupConfig: TConfig = {
  imports: {
    'baseui/button': {
      named: ['Button'],
    },
  },
  scope: {
    Button,
    ButtonGroup,
    MODE,
  },
  theme: [
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
  props: {
    children: {
      value:
        '<Button>One</Button>\n<Button>Two</Button>\n<Button>Three</Button>',
      type: PropTypes.ReactNode,
      description: 'Buttons within the group',
    },
    onClick: {
      value: '(event, index) => {\n  setSelected([index]);\n}',
      type: PropTypes.Function,
      description: `Function called when any button is clicked.`,
      propHook: {
        what: '`[${index}]`',
        into: 'selected',
      },
    },
    selected: {
      value: '[0]',
      type: PropTypes.Array,
      description: 'Defines which buttons are selected',
      stateful: true,
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
      names: ['Root'],
      sharedProps: {},
    },
  },
};

export default ButtonGroupConfig;
