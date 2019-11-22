import {StarRating} from 'baseui/rating';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const starRatingProps = require('!!extract-react-types-loader!../../../../src/rating/star-rating.js');

const ratingConfig: TConfig = {
  imports: {
    'baseui/rating': {
      named: ['StarRating'],
    },
  },
  scope: {StarRating},
  theme: ['rating200', 'rating400'],
  props: {
    numItems: {
      value: 5,
      type: PropTypes.Number,
      description: 'The total number of items to display.',
    },
    onChange: {
      value: '(data) => setValue(data.value)',
      type: PropTypes.Function,
      description: "Callback that's called with the newly selected value.",
      propHook: {
        what: 'data.value',
        into: 'value',
      },
    },

    value: {
      value: 4,
      type: PropTypes.Number,
      description: 'The current rating value.',
      stateful: true,
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Item'],
        sharedProps: {
          $isActive: {
            type: PropTypes.Boolean,
            description:
              'Indicates if the item is a part of the current selection.',
          },
          $isSelected: {
            type: PropTypes.Boolean,
            description: 'Indicates if the item is currently selected.',
          },
          $index: {
            type: PropTypes.Number,
            description: 'Index of the rendered item.',
          },
        },
      },
    },
  },
  mapTokensToProps: {
    StarRating: starRatingProps,
  },
};

export default ratingConfig;
