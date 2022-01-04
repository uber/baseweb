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
  PINHEAD_SIZES_SHAPES,
  FLOATING_MARKER_SIZES,
  PINHEAD_TYPES,
  FLOATING_MARKER_ANCHOR_TYPES,
  BADGE_ENHANCER_SIZES,
  LABEL_ENHANCER_POSITIONS,
} from './constants.js';
import type {OverrideT} from '../helpers/overrides.js';

export type PinHeadT = $Values<typeof PINHEAD_TYPES>;

export type AnchorPositionsT = $Values<typeof FLOATING_MARKER_ANCHOR_POSITIONS>;

export type NeedleSizeT = $Values<typeof NEEDLE_SIZES>;

export type PinHeadSizeT = $Values<typeof PINHEAD_SIZES_SHAPES>;

export type FloatingMarkerSizeT = $Values<typeof FLOATING_MARKER_SIZES>;

export type BadgeEnhancerSizeT = $Values<typeof BADGE_ENHANCER_SIZES>;

export type LabelEnhancerPositionT = $Values<typeof LABEL_ENHANCER_POSITIONS>;

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
  InnerAnchor?: OverrideT,
  OuterAnchor?: OverrideT,
  PinHead?: OverrideT,
  PinHeadContent?: OverrideT,
  PinHeadContainer?: OverrideT,
  Needle?: OverrideT,
  DragShadow?: OverrideT,
  DragShadowContainer?: OverrideT,
  DragContainer?: OverrideT,
};

export type LabelEnhancerT = {
  labelEnhancerContent?: string,
  labelEnhancerPosition?: LabelEnhancerPositionT,
  labelEnhancerColor?: string,
  labelEnhancerStrokeColor?: string,
};

export type LabelEhancerComponentT = {
  ...LabelEnhancerT,
  needleHeight: number,
  size: PinHeadSizeT,
  overrides?: FixedMarkerOverridesT,
};

export type BadgeEnhancerT = {
  badgeEnhancerSize?: BadgeEnhancerSizeT | null,
  badgeEnhancerColor?: string | null,
  badgeEnhancerBackground?: string | null,
  badgeEnhancerContent?: React.AbstractComponent<{|size: number|}>,
};

export type BadgeEnhancerComponentT = {
  ...BadgeEnhancerT,
  pinHeadSize: PinHeadSizeT,
  markerType: PinHeadT,
  overrides: FixedMarkerOverridesT,
};
export type BadgePositionT = null | {
  x: number,
  y: number,
};

export type FixedMarkerPropsT = {
  size?: PinHeadSizeT,
  needle?: NeedleSizeT,
  label?: string,
  startEnhancer?: React.AbstractComponent<{|size: number|}>,
  endEnhancer?: React.AbstractComponent<{|size: number|}>,
  color?: string,
  background?: string,
  dragging?: boolean,
  overrides?: FixedMarkerOverridesT,
  ...BadgeEnhancerT,
  ...LabelEnhancerT,
};

export type FloatingMarkerOverridesT = {
  Root?: OverrideT,
  InnerAnchor?: OverrideT,
  OuterAnchor?: OverrideT,
  PinHead?: OverrideT,
  PinHeadContent?: OverrideT,
  PinHeadContainer?: OverrideT,
  AnchorContainer?: OverrideT,
};

export type FloatingMarkerPropsT = {
  color?: string,
  background?: string,
  label?: string,
  anchor?: AnchorPositionsT,
  endEnhancer?: React.AbstractComponent<{|size: number|}>,
  startEnhancer?: React.AbstractComponent<{|size: number|}>,
  anchorType?: FloatingMarkerAnchorTypeT,
  size?: FloatingMarkerSizeT,
  overrides?: FloatingMarkerOverridesT,
};

export type PinHeadPropsT = {
  size?: PinHeadSizeT,
  label?: string,
  endEnhancer?: React.AbstractComponent<{|size: number|}>,
  startEnhancer?: React.AbstractComponent<{|size: number|}>,
  color?: string,
  background?: string,
  type?: PinHeadT,
  anchorType?: FloatingMarkerAnchorTypeT,
  overrides?: FloatingMarkerOverridesT | FixedMarkerOverridesT,
  ...BadgeEnhancerT,
  ...LabelEnhancerT,
};

export type DragShadowPropsT = {
  background: string,
  dragging: boolean,
  height: number,
  overrides: FixedMarkerOverridesT,
};
