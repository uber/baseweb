import {ButtonGroup, MODE} from 'baseui/button-group';
import {Button} from 'baseui/button';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const buttonGroupProps = require('!!extract-react-types-loader!../../../../src/button-group/button-group.js');
const buttonProps = require('!!extract-react-types-loader!../../../../src/button/button.js');

const ButtonGroupConfig: TConfig = {
  imports: {
    'baseui/button-group': {
      named: ['ButtonGroup'],
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
    'buttonPrimarySelectedFill',
    'buttonPrimarySelectedText',
    'buttonSecondarySelectedFill',
    'buttonSecondarySelectedText',
  ],
  props: {
    children: {
      value:
        '<Button>One</Button>\n<Button>Two</Button>\n<Button>Three</Button>',
      type: PropTypes.ReactNode,
      description: 'Buttons within the group',
      imports: {
        'baseui/button': {
          named: ['Button'],
        },
      },
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
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root'],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    ButtonGroup: buttonGroupProps,
    Button: buttonProps,
  },
};

export default ButtonGroupConfig;
