/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import {
  FloatingMarker,
  FLOATING_MARKER_SIZES,
  FLOATING_MARKER_ANCHOR_POSITIONS,
  FLOATING_MARKER_ANCHOR_TYPES,
} from 'baseui/map-marker';
import { PropTypes } from 'react-view';
import { TConfig } from '../types';

export const theme = [];

export const floatingMarkerProps = {
  label: {
    value: 'Uber HQ',
    type: PropTypes.String,
    description: 'Text to display inside of the marker.',
  },
  anchor: {
    value: 'FLOATING_MARKER_ANCHOR_POSITIONS.bottomLeft',
    enumName: 'FLOATING_MARKER_ANCHOR_POSITIONS',
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
    value: 'FLOATING_MARKER_ANCHOR_TYPES.circle',
    enumName: 'FLOATING_MARKER_ANCHOR_TYPES',
    type: PropTypes.Enum,
    defaultValue: 'FLOATING_MARKER_ANCHOR_TYPES.circle',
    options: FLOATING_MARKER_ANCHOR_TYPES,
    description: 'Type of anchor to render around the marker.',
    imports: {
      'baseui/map-marker': {
        named: ['FLOATING_MARKER_ANCHOR_TYPES'],
      },
    },
  },
  size: {
    value: 'FLOATING_MARKER_SIZES.medium',
    enumName: 'FLOATING_MARKER_SIZES',
    defaultValue: 'FLOATING_MARKER_SIZES.medium',
    options: FLOATING_MARKER_SIZES,
    type: PropTypes.Enum,
    description: 'Size of the marker.',
    imports: {
      'baseui/map-marker': {
        named: ['FLOATING_MARKER_SIZES'],
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

const FloatingMarkerConfig: TConfig = {
  componentName: 'FloatingMarker',
  imports: {
    'baseui/map-marker': {
      named: ['FloatingMarker'],
    },
  },
  scope: {
    FloatingMarker,
    FLOATING_MARKER_ANCHOR_POSITIONS,
    FLOATING_MARKER_SIZES,
    FLOATING_MARKER_ANCHOR_TYPES,
  },
  theme,
  props: {
    ...floatingMarkerProps,
    overrides: {
      value: undefined,
      type: PropTypes.Custom,
      description: 'Lets you customize all aspects of the component.',
      custom: {
        names: [
          'Root',
          'InnerAnchor',
          'OuterAnchor',
          'PinHead',
          'PinHeadContent',
          'PinHeadContainer',
          'AnchorContainer',
        ],
        sharedProps: {},
      },
    },
  },
};

export default FloatingMarkerConfig;
