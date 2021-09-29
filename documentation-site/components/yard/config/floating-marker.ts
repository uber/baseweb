import {
  FixedMarker,
  PINHEAD_SIZES,
  FLOATING_MARKER_ANCHOR_POSITIONS,
  FLOATING_MARKER_ANCHOR_TYPES,
} from 'baseui/map-marker';
import {PropTypes} from 'react-view';
import {TConfig} from '../types';

const inputPropsType = require('!!extract-react-types-loader!../../../../src/map-marker/floating-marker.js');

export const theme = [];

export const fixedMarkerProps = {
  label: {
    value: 'Hello',
    type: PropTypes.String,
    description: 'Text to display inside of the marker.',
  },
  //TODO: should this be renamed to anchorPosition?
  anchor: {
    value: 'FLOATING_MARKER_ANCHOR_POSITIONS.bottomLeft',
    type: PropTypes.Enum,
    defaultValue: 'FLOATING_MARKER_ANCHOR_POSITIONS.bottomLeft',
    options: FLOATING_MARKER_ANCHOR_POSITIONS,
    description: 'Position to render the anchor around the marker.',
    imports: {
      'baseui/map-marker': {
        named: ['FLOATING_MARKER_ANCHOR_POSITIONS'],
      },
    },
  },
  anchorType: {
    value: 'FLOATING_MARKER_ANCHOR_TYPES.round',
    type: PropTypes.Enum,
    defaultValue: 'FLOATING_MARKER_ANCHOR_TYPES.round',
    options: FLOATING_MARKER_ANCHOR_TYPES,
    description: 'Type of anchor to render around the marker.',
    imports: {
      'baseui/map-marker': {
        named: ['FLOATING_MARKER_ANCHOR_TYPES'],
      },
    },
  },

  size: {
    value: 'PINHEAD_SIZES.medium',
    defaultValue: 'PINHEAD_SIZES.medium',
    options: PINHEAD_SIZES,
    type: PropTypes.Enum,
    description: 'Size of the marker.',
    imports: {
      'baseui/map-marker': {
        named: ['PINHEAD_SIZES'],
      },
    },
  },

  startEnhancer: {
    value: undefined,
    placeholder: '() => <span>$</span>',
    type: PropTypes.Function,
    description:
      'Icon or element to render in the leading slot (before the label).',
  },
  endEnhancer: {
    value: undefined,
    placeholder: '() => <span>?</span>',
    type: PropTypes.Function,
    description:
      'Icon or element to render in the trailing slot (after the label).',
  },
  background: {
    value: undefined,
    placeholder: '#000',
    type: PropTypes.String,
    description: 'Color to render for background.',
  },
  color: {
    value: undefined,
    placeholder: '#fff',
    type: PropTypes.String,
    description: 'Color to render for content.',
  },
};

const FixedMarkerConfig: TConfig = {
  componentName: 'FixedMarker',
  imports: {
    'baseui/map-marker': {
      named: ['FixedMarker'],
    },
  },
  scope: {
    FixedMarker,
  },
  theme,
  props: {
    ...fixedMarkerProps,
  },
  mapTokensToProps: {
    Input: inputPropsType,
  },
};

export default FixedMarkerConfig;
