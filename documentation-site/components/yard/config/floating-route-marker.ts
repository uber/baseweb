import { FloatingRouteMarker, FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS } from 'baseui/map-marker';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const floatingRouteMarkerPropsType = require('!!extract-react-types-loader!../../../../src/map-marker/floating-route-marker.js');

export const theme = [];

export const floatingRouteMarkerProps = {
  label: {
    value: 'Uber HQ',
    type: PropTypes.String,
    description: 'Text to display inside of the marker.',
  },
  anchor: {
    value: 'FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomLeft',
    enumName: 'FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS',
    type: PropTypes.Enum,
    defaultValue: 'FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomLeft',
    options: FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS,
    description: 'Position to render the anchor (pointer) around the marker.',
    imports: {
      'baseui/map-marker': {
        named: ['FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS'],
      },
    },
  },
  startEnhancer: {
    value: undefined,
    placeholder: '() => <span>$</span>',
    type: PropTypes.Function,
    description: 'Icon or element to render in the leading slot (before the label).',
  },
  endEnhancer: {
    value: undefined,
    placeholder: '() => <span>?</span>',
    type: PropTypes.Function,
    description: 'Icon or element to render in the trailing slot (after the label).',
  },
};

const FloatingRouteMarkerConfig: TConfig = {
  componentName: 'FloatingRouteMarker',
  imports: {
    'baseui/map-marker': {
      named: ['FloatingRouteMarker'],
    },
  },
  scope: {
    FloatingRouteMarker,
    FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS,
  },
  theme,
  props: {
    ...floatingRouteMarkerProps,
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root'],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    FloatingMarker: floatingRouteMarkerPropsType,
  },
};

export default FloatingRouteMarkerConfig;
