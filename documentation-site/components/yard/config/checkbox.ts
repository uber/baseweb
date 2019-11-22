import pick from 'just-pick';
import {Checkbox, STYLE_TYPE, LABEL_PLACEMENT} from 'baseui/checkbox';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';
import {changeHandlers} from './common';

const checkboxProps = require('!!extract-react-types-loader!../../../../src/checkbox/checkbox.js');

const CheckboxConfig: TConfig = {
  imports: {
    'baseui/checkbox': {
      named: ['Checkbox'],
    },
  },
  scope: {
    Checkbox,
    STYLE_TYPE,
    LABEL_PLACEMENT,
  },
  theme: [
    'tickFill',
    'tickFillHover',
    'tickFillActive',
    'tickFillSelected',
    'tickFillSelectedHover',
    'tickFillSelectedHoverActive',
    'tickFillError',
    'tickFillErrorHover',
    'tickFillErrorHoverActive',
    'tickFillErrorSelected',
    'tickFillErrorSelectedHover',
    'tickFillErrorSelectedHoverActive',
    'tickFillDisabled',
    'tickBorder',
    'tickBorderError',
    'tickMarkFill',
    'tickMarkFillError',
    'tickMarkFillDisabled',
  ],
  props: {
    checked: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders component in checked state.',
      stateful: true,
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
      value: 'STYLE_TYPE.default',
      defaultValue: 'STYLE_TYPE.default',
      options: STYLE_TYPE,
      type: PropTypes.Enum,
      enumName: 'STYLE_TYPE',
      description: 'Renders component in a toggle state.',
      imports: {
        'baseui/checkbox': {
          named: ['STYLE_TYPE'],
        },
      },
    },
    onChange: {
      value: 'e => setChecked(e.target.checked)',
      type: PropTypes.Function,
      description: 'Called when checkbox value is changed.',
      propHook: {
        what: 'e.target.checked',
        into: 'checked',
      },
    },
    isError: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders component in error state.',
    },
    isIndeterminate: {
      value: false,
      type: PropTypes.Boolean,
      description:
        'Indicates indeterminate state for the checkmark. Checked property is ignored.',
    },
    labelPlacement: {
      value: 'LABEL_PLACEMENT.right',
      options: LABEL_PLACEMENT,
      type: PropTypes.Enum,
      enumName: 'LABEL_PLACEMENT',
      description:
        'Determines how to position the label relative to the checkbox.',
      imports: {
        'baseui/checkbox': {
          named: ['LABEL_PLACEMENT'],
        },
      },
    },
    required: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Renders component in required state.',
      hidden: true,
    },
    inputRef: {
      value: undefined,
      type: PropTypes.Ref,
      description: 'A ref to access an input element.',
      hidden: true,
    },
    autoFocus: {
      value: false,
      type: PropTypes.Boolean,
      description: 'If true the component will be focused on the first mount.',
      hidden: true,
    },
    name: {
      value: undefined,
      type: PropTypes.String,
      description: 'Name attribute.',
      hidden: true,
    },
    title: {
      value: undefined,
      type: PropTypes.String,
      description: 'Title attribute.',
      hidden: true,
    },
    ...pick(changeHandlers, [
      'onBlur',
      'onFocus',
      'onMouseDown',
      'onMouseEnter',
      'onMouseLeave',
    ]),
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'Checkmark',
          'Label',
          'Toggle',
          'ToggleInner',
          'ToggleTrack',
        ],
        sharedProps: {
          $isFocused: {
            type: PropTypes.Boolean,
            description: 'True when the component is focused.',
          },
          $isHovered: {
            type: PropTypes.Boolean,
            description: 'True when the component is hovered.',
          },
          $isActive: {
            type: PropTypes.Boolean,
            description: 'True when the component is active.',
          },
          $isError: 'isError',
          $checked: 'checked',
          $isIndeterminate: 'isIndeterminate',
          $required: 'required',
          $disabled: 'disabled',
          $checkmarkType: 'checkmarkType',
          $labelPlacement: 'labelPlacement',
        },
      },
    },
  },
  mapTokensToProps: {
    Checkbox: checkboxProps,
  },
};

export default CheckboxConfig;
