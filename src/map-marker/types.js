/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  ANCHOR_POSITIONS,
  PIN_SIZES,
  NEEDLE_SIZES,
  PINHEAD_SIZES,
  FLOATING_MARKER_SIZES,
  PINHEAD_TYPES,
  FLOATING_MARKER_ANCHOR_TYPES,
} from './constants.js';

export type PinHeadT = $Values<typeof PINHEAD_TYPES>;

export type AnchorPositionsT = $Values<typeof ANCHOR_POSITIONS>;

export type NeedleSizeT = $Values<typeof NEEDLE_SIZES>;

export type PinSizeT = $Values<typeof PIN_SIZES>;

export type PinHeadSizeT = $Values<typeof PINHEAD_SIZES>;

export type ResponsiveT<T> = T | Array<T>;

export type FloatingMarkerSizeT = $Values<typeof FLOATING_MARKER_SIZES>;

export type FloatingMarkerAnchorTypeT = $Values<
  typeof FLOATING_MARKER_ANCHOR_TYPES,
>;
export type NeedlePropsT = {
  size?: NeedleSizeT,
  background?: ResponsiveT<string>,
};

export type ItemPropsT = {
  children?: React.Node,
  color?: string,
  size?: number,
};

export type PinHeadPropsT = {
  size?: PinSizeT,
  label?: string,
  startEnhancer?: React.Node,
  endEnhancer?: React.Node,
  color?: string,
  background?: ResponsiveT<string>,
  type?: string,
};

export type FixedMarkerPropsT = {
  size?: PinHeadSizeT,
  needle?: React.Node,
  label?: string,
  startEnhancer?: React.Node,
  endEnhancer?: React.Node,
  color?: string,
  background?: ResponsiveT<string>,
  dragging?: boolean,
};

export type FloatingMarkerPropsT = {
  color?: string,
  background?: ResponseT<string>,
  label?: string,
  anchor?: AnchorPositionsT,
  endEnhancer?: React.Node,
  startEnhancer?: React.Node,
  anchorType?: FloatingMarkerAnchorTypeT,
  size?: FloatingMarkerSizeT,
};

export type EnhancerOptionT = {
  id?: string,
  label?: string,
  content?: React.Node,
};

export type EnhancerOptionsT = Array<EnhancerOptionT>;

export type DestinationMarkerPropsT = {
  label?: string,
  anchor?: AnchorPositionsT,
};

export type OriginMarkerPropsT = {
  label?: string,
  anchor?: AnchorPositionsT,
};
