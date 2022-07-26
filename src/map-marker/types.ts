/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
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
  KIND,
} from './constants';
import type { Override } from '../helpers/overrides';

export type AnchorPositions =
  typeof FLOATING_MARKER_ANCHOR_POSITIONS[keyof typeof FLOATING_MARKER_ANCHOR_POSITIONS];

export type NeedleSize = typeof NEEDLE_SIZES[keyof typeof NEEDLE_SIZES];

export type PinHead = typeof PINHEAD_TYPES[keyof typeof PINHEAD_TYPES];

export type PinHeadSize = typeof PINHEAD_SIZES_SHAPES[keyof typeof PINHEAD_SIZES_SHAPES];

export type FloatingMarkerSize = typeof FLOATING_MARKER_SIZES[keyof typeof FLOATING_MARKER_SIZES];

export type FloatingMarkerAnchorType =
  typeof FLOATING_MARKER_ANCHOR_TYPES[keyof typeof FLOATING_MARKER_ANCHOR_TYPES];

export type BadgeEnhancerSize = typeof BADGE_ENHANCER_SIZES[keyof typeof BADGE_ENHANCER_SIZES];

export type LabelEnhancerPosition =
  typeof LABEL_ENHANCER_POSITIONS[keyof typeof LABEL_ENHANCER_POSITIONS];

export type Kind = typeof KIND[keyof typeof KIND];

export type FixedMarkerOverrides = {
  Root?: Override;
  InnerAnchor?: Override;
  OuterAnchor?: Override;
  PinHead?: Override;
  PinHeadContent?: Override;
  PinHeadContainer?: Override;
  Needle?: Override;
  DragShadow?: Override;
  DragShadowContainer?: Override;
  DragContainer?: Override;
  BadgeEnhancer?: Override;
  LabelEnhancer?: Override;
  LabelEnhancerContainer?: Override;
};

export type NeedleProps = {
  size: NeedleSize;
  background?: string;
  overrides: FixedMarkerOverrides;
};

export type ItemProps = {
  children?: React.ReactNode;
  color?: string;
  size?: number;
};

export type LabelEnhancer = {
  labelEnhancerContent?: string;
  labelEnhancerPosition?: LabelEnhancerPosition;
};

export type LabelEhancerComponent = {
  needleHeight: number;
  size: PinHeadSize;
  overrides?: FixedMarkerOverrides;
} & LabelEnhancer;

export type BadgeEnhancer = {
  badgeEnhancerSize?: BadgeEnhancerSize | null;
  badgeEnhancerContent?: React.ComponentType<{
    size: number;
  }>;
};

export type BadgeEnhancerComponent = {
  pinHeadSize: PinHeadSize;
  markerType: PinHead;
  overrides: FixedMarkerOverrides;
} & BadgeEnhancer;
export type BadgePosition = {
  x: number;
  y: number;
};

export type FixedMarkerProps = {
  size?: PinHeadSize;
  needle?: NeedleSize;
  label?: string;
  startEnhancer?: React.ComponentType<{
    size: number;
  }>;
  endEnhancer?: React.ComponentType<{
    size: number;
  }>;
  kind?: Kind;
  dragging?: boolean;
  overrides?: FixedMarkerOverrides;
} & BadgeEnhancer &
  LabelEnhancer;

export type FloatingMarkerOverrides = {
  Root?: Override;
  InnerAnchor?: Override;
  OuterAnchor?: Override;
  PinHead?: Override;
  PinHeadContent?: Override;
  PinHeadContainer?: Override;
  AnchorContainer?: Override;
  Needle?: Override;
  DragShadow?: Override;
  DragShadowContainer?: Override;
  DragContainer?: Override;
  BadgeEnhancer?: Override;
  LabelEnhancer?: Override;
  LabelEnhancerContainer?: Override;
};

export type FloatingMarkerProps = {
  label?: string;
  anchor?: AnchorPositions;
  endEnhancer?: React.ComponentType<{
    size: number;
  }>;
  startEnhancer?: React.ComponentType<{
    size: number;
  }>;
  anchorType?: FloatingMarkerAnchorType;
  size?: FloatingMarkerSize;
  overrides?: FloatingMarkerOverrides;
};

export type PinHeadProps = {
  size?: PinHeadSize;
  label?: string;
  endEnhancer?: React.ComponentType<{
    size: number;
  }>;
  startEnhancer?: React.ComponentType<{
    size: number;
  }>;
  color: string;
  background: string;
  type?: PinHead;
  anchorType?: FloatingMarkerAnchorType;
  needle?: NeedleSize;
  overrides?: FloatingMarkerOverrides | FixedMarkerOverrides;
} & BadgeEnhancer &
  LabelEnhancer;

export type DragShadowProps = {
  background: string;
  dragging: boolean;
  height: number;
  overrides: FixedMarkerOverrides;
};
