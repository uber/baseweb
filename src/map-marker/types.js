/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  FLOATING_MARKER_ANCHOR_POSITIONS,
  PIN_SIZES,
  NEEDLE_SIZES,
  PINHEAD_SIZES,
  FLOATING_MARKER_SIZES,
  PINHEAD_TYPES,
  FLOATING_MARKER_ANCHOR_TYPES,
} from './constants.js';

export type PinHeadT = $Values<typeof PINHEAD_TYPES>;

export type AnchorPositionsT = $Values<typeof FLOATING_MARKER_ANCHOR_POSITIONS>;

export type NeedleSizeT = $Values<typeof NEEDLE_SIZES>;

export type PinSizeT = $Values<typeof PIN_SIZES>;

export type PinHeadSizeT = $Values<typeof PINHEAD_SIZES>;

export type ResponsiveT<T> = T | Array<T>;

export type FloatingMarkerSizeT = $Values<typeof FLOATING_MARKER_SIZES>;

/* eslint-disable flowtype/generic-spacing*/
export type FloatingMarkerAnchorTypeT = $Values<
  typeof FLOATING_MARKER_ANCHOR_TYPES,
>;

export type NeedlePropsT = {
  size: NeedleSizeT,
  background?: string,
};

export type ItemPropsT = {
  children?: React.Node,
  color?: string,
  size?: number,
};

export type PinHeadPropsT = {
  size?: PinHeadSizeT,
  label?: string,
  // eslint-disable-next-line flowtype/no-weak-types
  startEnhancer?: any,
  // eslint-disable-next-line flowtype/no-weak-types
  endEnhancer?: any,
  color?: string,
  background?: string,
  type?: PinHeadT,
  anchorType?: FloatingMarkerAnchorTypeT,
};

export type FixedMarkerPropsT = {
  size?: PinHeadSizeT,
  needle?: NeedleSizeT,
  label?: string,
  startEnhancer?: React.Node,
  endEnhancer?: React.Node,
  color?: string,
  background?: string,
  dragging?: boolean,
};

export type FloatingMarkerPropsT = {
  color?: string,
  background?: string,
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

export type DragShadowPropsT = {
  background: string,
  dragging: boolean,
  height: number,
};

export type TileGridPropsT = {
  // eslint-disable-next-line flowtype/no-weak-types
  children: Array<any>,
  customizerOptions: Array<React.Node>,
};
