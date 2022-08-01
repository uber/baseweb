/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { LocationPuck, LOCATION_PUCK_TYPES, LOCATION_PUCK_SIZES } from 'baseui/map-marker';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

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
  heading: {
    value: 0,
    defaultValue: 0,
    placeholder: '0',
    type: PropTypes.Number,
    description: 'Heading direction of the user.',
  },
  showHeading: {
    value: true,
    defaultValue: true,
    type: PropTypes.Boolean,
    description: `Renders the heading indicator. Set this value to false if heading isn't available. This prop only applies to the consumer location puck.`,
  },
  confidenceRadius: {
    value: 0,
    defaultValue: 0,
    placeholder: '0',
    type: PropTypes.Number,
    description:
      'Radius, in px, of the confidence circle. This circle represents the confidence level of the GPS signal.',
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
  },
  theme,
  props: {
    ...locationPuckProps,
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'LocationPuckApproximation',
          'ConsumerLocationPuckCore',
          'EarnerLocationPuckCore',
        ],
        sharedProps: {},
      },
    },
  },
};

export default LocationPuckConfig;
