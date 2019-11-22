import {ProgressBar} from 'baseui/progress-bar';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const progressBarProps = require('!!extract-react-types-loader!../../../../src/progress-bar/progressbar.js');

const ProgressBarConfig: TConfig = {
  imports: {
    'baseui/progress-bar': {named: ['ProgressBar']},
  },
  scope: {
    ProgressBar,
  },
  theme: ['progressbarTrackFill'],
  props: {
    value: {
      value: 10,
      type: PropTypes.Number,
      description: 'Progess bar value attribute.',
      stateful: true,
    },
    successValue: {
      value: undefined,
      type: PropTypes.Number,
      description: 'Can be used to set a custom success value.',
    },
    getProgressLabel: {
      placeholder:
        '(currentValue, successValue) => `${currentValue}mb out of ${successValue}mb downloaded` ',
      value: '',
      type: PropTypes.Function,
      description:
        'Can be used to display a custom label for the progress bar.',
    },
    showLabel: {
      value: undefined,
      placeholder: 'false',
      type: PropTypes.Boolean,
      description: 'Can be used to show the progress bar label.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Bar', 'BarProgress', 'Label', 'Root'],
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
