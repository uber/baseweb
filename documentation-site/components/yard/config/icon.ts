import {ArrowUp} from 'baseui/icon';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const iconProps = require('!!extract-react-types-loader!../../../../src/icon/icon.js');

const IconConfig: TConfig = {
  imports: {
    'baseui/icon': {
      named: ['ArrowUp'],
    },
  },
  scope: {ArrowUp},
  theme: [],
  props: {
    size: {
      value: 64,
      type: PropTypes.Number,
      description:
        'Size of element, will be passed to the svg width/height style. Can also be a value included in.',
    },
    color: {
      value: undefined,
      type: PropTypes.String,
      description: 'Color of icon, will be used as svg fill.',
    },
    title: {
      value: undefined,
      type: PropTypes.String,
      description:
        'Allows you to set the SVG <title> label, which is used for accessibility.',
    },
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Svg'],
        sharedProps: {
          $size: 'size',
          $color: 'color',
        },
      },
    },
  },
  mapTokensToProps: {
    ArrowUp: iconProps,
  },
};

export default IconConfig;
