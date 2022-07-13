import { Skeleton } from 'baseui/skeleton';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const skeletonProps = require('!!extract-react-types-loader!../../../../src/pin-code/pin-code');

const SkeletonConfig: TConfig = {
  componentName: 'Skeleton',
  imports: {
    'baseui/skeleton': {
      named: ['Skeleton'],
    },
  },
  scope: {
    Skeleton,
  },
  theme: [],
  props: {
    rows: {
      value: 0,
      type: PropTypes.Number,
      description: 'Defines the number of sub elements in the skeleton root',
    },

    height: {
      value: '100px',
      type: PropTypes.String,
      description: 'Defines the height of the skeleton root',
    },
    width: {
      value: '200px',
      type: PropTypes.String,
      description: 'Defines the width of the skeleton root',
    },
    animation: {
      value: false,
      type: PropTypes.Boolean,
      description: 'Lets you choose whether the skeleton has an animation',
    },

    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Row'],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    Skeleton: skeletonProps,
  },
};

export default SkeletonConfig;
