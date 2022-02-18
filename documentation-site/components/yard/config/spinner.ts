import {Spinner} from 'baseui/spinner';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const SpinnerConfig: TConfig = {
  componentName: 'Spinner',
  imports: {
    'baseui/spinner': {
      named: ['Spinner'],
    },
  },
  scope: {Spinner},
  theme: [],
  props: {
    $size: {
      value: undefined,
      placeholder: '30px',
      type: PropTypes.String,
      description: 'Size used for the spinner.',
    },
    $borderWidth: {
      value: undefined,
      placeholder: '30px',
      type: PropTypes.String,
      description: 'Size of the circular border',
    },
    $color: {
      value: undefined,
      placeholder: '#ee1100',
      type: PropTypes.String,
      description: 'Color used for the spinner.',
    },
  },
};

export default SpinnerConfig;
