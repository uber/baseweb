import {Spinner} from 'baseui/spinner';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const spinnerProps = require('!!extract-react-types-loader!../../../../src/spinner/spinner.js');

const SpinnerConfig: TConfig = {
  imports: {
    'baseui/spinner': {
      named: ['Spinner'],
    },
  },
  scope: {Spinner},
  theme: [],
  props: {
    size: {
      value: undefined,
      placeholder: '30px',
      type: PropTypes.String,
      description: 'Size used for the spinner.',
    },
    color: {
      value: undefined,
      placeholder: '#ee1100',
      type: PropTypes.String,
      description: 'Color used for the spinner.',
    },
    title: {
      value: undefined,
      placeholder: 'Loading...',
      type: PropTypes.String,
      description: 'Title attribute.',
      hidden: true,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['ActivePath', 'Svg', 'TrackPath'],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    Spinner: spinnerProps,
  },
};

export default SpinnerConfig;
