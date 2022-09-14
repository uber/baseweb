/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { ButtonTimed } from 'baseui/button-timed';
import { PropTypes } from 'react-view';
import type { TConfig } from '../types';

const ButtonTimedConfig: TConfig = {
  componentName: 'ButtonTimed',
  imports: {
    'baseui/button-timed': {
      named: ['ButtonTimed'],
    },
  },
  scope: {
    ButtonTimed,
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
      value: 'Label',
      type: PropTypes.ReactNode,
      description: `Visible label.`,
    },
    onClick: {
      value: '() => alert("click")',
      type: PropTypes.Function,
      description: `Function called when time runs out or button is clicked.`,
    },
    time: {
      value: 15,
      type: PropTypes.Number,
      description: `Number of seconds before onClick is automatically invoked`,
    },
    startEnhancer: {
      value: undefined,
      placeholder: '() => <span>🦊</span>',
      type: PropTypes.Function,
      description: `A component rendered at the start of the button.`,
    },
    endEnhancer: {
      value: undefined,
      placeholder: '<i>world!</i>',
      type: PropTypes.Function,
      description: `A component rendered at the end of the button.`,
    },
    disabled: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Indicates that the button is disabled',
    },
    colors: {
      value: undefined,
      defaultValue: '{backgroundColor: "#03703c", color: "white"}',
      type: PropTypes.Object,
      description: 'Lets you customize the background and text color.',
    },
    isLoading: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Show loading button style and spinner.',
    },
    isSelected: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Indicates that the button is selected.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'BaseButtonTimed',
          'TimerContainer',
          'EndEnhancer',
          'LoadingSpinner',
          'LoadingSpinnerContainer',
          'StartEnhancer',
        ],
      },
    },
  },
};

export default ButtonTimedConfig;
