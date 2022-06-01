/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { ProgressBar, SIZE } from 'baseui/progress-bar';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const progressBarProps = require('!!extract-react-types-loader!../../../../src/progress-bar/progressbar.js');

const ProgressBarConfig: TConfig = {
  componentName: 'ProgressBar',
  imports: {
    'baseui/progress-bar': { named: ['ProgressBar'] },
  },
  scope: {
    ProgressBar,
    SIZE,
  },
  theme: ['progressbarTrackFill'],
  props: {
    value: {
      value: 10,
      type: PropTypes.Number,
      description: 'Progress bar value attribute normalized in the 0 to 100 range.',
      stateful: true,
    },
    'aria-label': {
      value: undefined,
      type: PropTypes.String,
      description: 'Aria-label attribute',
      hidden: true,
    },
    getProgressLabel: {
      placeholder: '(value) => `${10 * value}mb out of 1000mb downloaded` ',
      value: '',
      type: PropTypes.Function,
      description: 'Can be used to display a custom label for the progress bar.',
    },
    showLabel: {
      value: undefined,
      placeholder: 'false',
      type: PropTypes.Boolean,
      description: 'Can be used to show the progress bar label.',
    },
    infinite: {
      value: undefined,
      placeholder: 'false',
      type: PropTypes.Boolean,
      description: 'Can be used to show the infinite progress bar.',
    },
    size: {
      value: 'SIZE.medium',
      defaultValue: 'SIZE.medium',
      options: SIZE,
      type: PropTypes.Enum,
      description: 'Renders component in provided size.',
      imports: {
        'baseui/progress-bar': {
          named: ['SIZE'],
        },
      },
    },
    steps: {
      value: undefined,
      type: PropTypes.Number,
      description: 'Defines how many steps the progress bar has. Defaults to 1.',
    },
    minValue: {
      value: '0',
      defaultValue: '0',
      type: PropTypes.Number,
      description: 'The smallest value allowed.',
    },
    maxValue: {
      value: '100',
      defaultValue: '100',
      type: PropTypes.Number,
      description: 'The biggest value allowed.',
    },
    errorMessage: {
      value: undefined,
      type: PropTypes.String,
      description: 'Error message for screen-reader users.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Bar', 'BarProgress', 'BarContainer', 'InfiniteBar', 'Label', 'Root'],
        sharedProps: {
          $successValue: 'successValue',
          $value: 'value',
        },
      },
    },
  },
  mapTokensToProps: {
    ProgressBar: progressBarProps,
  },
};

export default ProgressBarConfig;
