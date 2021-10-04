/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  FLOATING_MARKER_ANCHOR_POSITIONS,
  NEEDLE_SIZES,
  PINHEAD_SIZES,
  FLOATING_MARKER_SIZES,
  PINHEAD_TYPES,
  FLOATING_MARKER_ANCHOR_TYPES,
} from './constants.js';
import type {OverrideT} from '../helpers/overrides.js';

export type PinHeadT = $Values<typeof PINHEAD_TYPES>;

export type AnchorPositionsT = $Values<typeof FLOATING_MARKER_ANCHOR_POSITIONS>;

export type NeedleSizeT = $Values<typeof NEEDLE_SIZES>;

export type PinHeadSizeT = $Values<typeof PINHEAD_SIZES>;

export type FloatingMarkerSizeT = $Values<typeof FLOATING_MARKER_SIZES>;

/* eslint-disable flowtype/generic-spacing*/
export type FloatingMarkerAnchorTypeT = $Values<
  typeof FLOATING_MARKER_ANCHOR_TYPES,
>;

export type NeedlePropsT = {
  size: NeedleSizeT,
  background?: string,
  overrides: FixedMarkerOverridesT,
};

export type ItemPropsT = {
  children?: React.Node,
  color?: string,
  size?: number,
};

export type FixedMarkerOverridesT = {
  Root?: OverrideT,
  PinHead?: OverrideT,
  PinHeadContainer?: OverrideT,
  Needle?: OverrideT,
  DragShadow?: OverrideT,
  DragShadowContainer?: OverrideT,
  DragContainer?: OverrideT,
};

export type FixedMarkerPropsT = {
  size?: PinHeadSizeT,
  needle?: NeedleSizeT,
  label?: string,
  startEnhancer?: React.Node | React.AbstractComponent<{}>,
  endEnhancer?: React.Node | React.AbstractComponent<{}>,
  color?: string,
  background?: string,
  dragging?: boolean,
  overrides?: FixedMarkerOverridesT,
};

export type FloatingMarkerOverridesT = {
  Root?: OverrideT,
  InnerAnchor?: OverrideT,
  OuterAnchor?: OverrideT,
  PinHead?: OverrideT,
  PinHeadContainer?: OverrideT,
  AnchorContainer?: OverrideT,
};

export type FloatingMarkerPropsT = {
  color?: string,
  background?: string,
  label?: string,
  anchor?: AnchorPositionsT,
  endEnhancer?: React.Node | React.AbstractComponent<{}>,
  startEnhancer?: React.Node | React.AbstractComponent<{}>,
  anchorType?: FloatingMarkerAnchorTypeT,
  size?: FloatingMarkerSizeT,
  overrides?: FloatingMarkerOverridesT,
};

export type PinHeadPropsT = {
  size?: PinHeadSizeT,
  label?: string,
  startEnhancer?: React.Node | React.AbstractComponent<{}>,
  endEnhancer?: React.Node | React.AbstractComponent<{}>,
  color?: string,
  background?: string,
  type?: PinHeadT,
  anchorType?: FloatingMarkerAnchorTypeT,
  overrides?: FloatingMarkerOverridesT | FixedMarkerOverridesT,
};

export type DragShadowPropsT = {
  background: string,
  dragging: boolean,
  height: number,
  overrides: FixedMarkerOverridesT,
};
