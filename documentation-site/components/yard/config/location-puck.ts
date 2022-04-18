import {
  LocationPuck,
  LOCATION_PUCK_TYPES,
  LOCATION_PUCK_SIZES,
  LOCATION_PUCK_CONFIDENCES,
} from 'baseui/map-marker';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

const locationPuckPropsType = require('!!extract-react-types-loader!../../../../src/map-marker/location-puck.js');

export const theme = [];

export const locationPuckProps = {
  type: {
    value: 'LOCATION_PUCK_TYPES.consumer',
    enumName: 'LOCATION_PUCK_TYPES',
    defaultValue: 'LOCATION_PUCK_TYPES.consumer',
    options: LOCATION_PUCK_TYPES,
    type: PropTypes.Enum,
    description: 'Rides and Eater apps use `consumer`, earner apps use `earner`.',
    imports: {
      'baseui/map-marker': {
        named: ['LOCATION_PUCK_TYPES'],
      },
    },
  },
  bearing: {
    value: 0,
    defaultValue: 0,
    type: PropTypes.Number,
    description: 'Bearing (also known as heading or direction) of the user.',
  },
  confidence: {
    value: 'LOCATION_PUCK_CONFIDENCES.medium',
    enumName: 'LOCATION_PUCK_CONFIDENCES',
    defaultValue: 'LOCATION_PUCK_CONFIDENCES.medium',
    options: LOCATION_PUCK_CONFIDENCES,
    type: PropTypes.Enum,
    description: 'Confidence of location signal. Low = larger circle, high = no circle',
    imports: {
      'baseui/map-marker': {
        named: ['LOCATION_PUCK_CONFIDENCES'],
      },
    },
  },
  size: {
    value: 'LOCATION_PUCK_SIZES.medium',
    enumName: 'LOCATION_PUCK_SIZES',
    defaultValue: 'LOCATION_PUCK_SIZES.medium',
    options: LOCATION_PUCK_SIZES,
    type: PropTypes.Enum,
    description: 'Size of the location puck. Only applies to Earner type.',
    imports: {
      'baseui/map-marker': {
        named: ['LOCATION_PUCK_SIZES'],
      },
    },
  },
};

const LocationPuckConfig: TConfig = {
  componentName: 'LocationPuck',
  imports: {
    'baseui/map-marker': {
      named: ['LocationPuck'],
    },
  },
  scope: {
    LocationPuck,
    LOCATION_PUCK_TYPES,
    LOCATION_PUCK_SIZES,
    LOCATION_PUCK_CONFIDENCES,
  },
  theme,
  props: {
    ...locationPuckProps,
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: ['LocationPuckApproximation', 'ConsumerLocationPuckCore', 'EarnerLocationPuckCore'],
        sharedProps: {},
      },
    },
  },
  mapTokensToProps: {
    LocationPuck: locationPuckPropsType,
  },
};

export default LocationPuckConfig;
