import {ButtonGroup, MODE} from 'baseui/button-group';
import {Button} from 'baseui/button';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const buttonGroupProps = require('!!extract-react-types-loader!../../../../src/button-group/button-group.js');
const buttonProps = require('!!extract-react-types-loader!../../../../src/button/button.js');

const ButtonGroupConfig: TConfig = {
  componentName: 'ButtonGroup',
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
      value: undefined,
      type: PropTypes.Function,
      description: `Function called when any button is clicked.`,
      hidden: true,
    },
    selected: {
      value: undefined,
      type: PropTypes.Array,
      description: 'Defines which buttons are selected',
      hidden: true,
    },
    mode: {
      value: 'MODE.checkbox',
      defaultValue: 'MODE.checkbox',
      options: MODE,
      type: PropTypes.Enum,
      description:
        'Changes keyboard shortcuts and role attributes. The actual onClick update implementation is up to you.',
      imports: {
        'baseui/button-group': {
          named: ['MODE'],
        },
      },
      hidden: true,
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
