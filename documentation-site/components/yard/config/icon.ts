import ArrowUp from 'baseui/icon/arrow-up';
import {PropTypes} from '../const';
import {TConfig} from '../types';

const IconConfig: TConfig = {
  imports: {
    'baseui/icon/arrow-up': {
      default: 'ArrowUp',
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
      type: PropTypes.Overrides,
      description: 'Lets you customize all aspects of the component.',
      names: ['Svg'],
      sharedProps: {
        $size: 'size',
        $color: 'color',
      },
    },
  },
};

export default IconConfig;
