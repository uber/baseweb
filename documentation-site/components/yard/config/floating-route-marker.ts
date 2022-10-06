import { FloatingRouteMarker, FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS } from 'baseui/map-marker';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';
import { Upload, ChevronRight } from 'baseui/icon';

export const theme = [];

export const floatingRouteMarkerProps = {
  label: {
    value: '9 min',
    type: PropTypes.String,
    description: 'Primary label to display inside of the marker.',
  },
  secondaryLabel: {
    value: '$4 toll',
    type: PropTypes.String,
    description: 'Secondary label to display inside of the marker.',
  },
  anchorPosition: {
    value: 'FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topLeft',
    enumName: 'FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS',
    type: PropTypes.Enum,
    defaultValue: 'FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topLeft',
    options: FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS,
    description: 'Position to render the anchor (pointer) around the marker.',
    imports: {
      'baseui/map-marker': {
        named: ['FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS'],
      },
    },
  },
  startEnhancer: {
    value: '({size}) => <Upload size={size}/>',
    placeholder: '({size}) => <Upload size={size}/>',
    type: PropTypes.Function,
    description: 'Icon or element to render in the leading slot.',
  },
  endEnhancer: {
    value: undefined,
    placeholder: '({size}) => <ChevronRight size={size}/>',
    type: PropTypes.Function,
    description: 'Icon or element to render in the trailing slot.',
  },
  selected: {
    value: false,
    type: PropTypes.Boolean,
    description: 'Boolean as to whether the marker is in a selected or unselected state.',
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
    Upload,
    ChevronRight,
  },
  theme,
  props: {
    ...floatingRouteMarkerProps,
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['Root', 'Label', 'SecondaryLabel', 'IconContainer', 'PointerContainer', 'Pointer'],
        sharedProps: {},
      },
    },
  },
};

export default FloatingRouteMarkerConfig;
