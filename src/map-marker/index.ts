/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type {
  AnchorPositions,
  NeedleSize,
  PinHead,
  PinHeadSize,
  FloatingMarkerSize,
  FloatingMarkerAnchorType,
  BadgeEnhancerSize,
  LabelEnhancerPosition,
  Kind,
  FixedMarkerOverrides,
  NeedleProps,
  ItemProps,
  LabelEnhancer,
  LabelEhancerComponent,
  BadgeEnhancer,
  BadgeEnhancerComponent,
  BadgePosition,
  FixedMarkerProps,
  FloatingMarkerOverrides,
  FloatingMarkerProps,
  PinHeadProps,
  DragShadowProps,
} from './types';

export { default as FixedMarker } from './fixed-marker';
export { default as FloatingMarker } from './floating-marker';
export { default as LocationPuck } from './location-puck';

export {
  FLOATING_MARKER_ANCHOR_POSITIONS,
  FLOATING_MARKER_SIZES,
  FLOATING_MARKER_ANCHOR_TYPES,
  NEEDLE_SIZES,
  PINHEAD_SIZES_SHAPES,
  BADGE_ENHANCER_SIZES,
  LABEL_ENHANCER_POSITIONS,
  KIND,
  PINHEAD_DIMENSIONS,
  LOCATION_PUCK_SIZES,
  LOCATION_PUCK_TYPES,
} from './constants';

export * from './types';
/** @deprecated use AnchorPositions instead. To be removed in future versions.*/
export type AnchorPositionsT = AnchorPositions;
/** @deprecated use NeedleSize instead. To be removed in future versions.*/
export type NeedleSizeT = NeedleSize;
/** @deprecated use PinHead instead. To be removed in future versions.*/
export type PinHeadT = PinHead;
/** @deprecated use PinHeadSize instead. To be removed in future versions.*/
export type PinHeadSizeT = PinHeadSize;
/** @deprecated use FloatingMarkerSize instead. To be removed in future versions.*/
export type FloatingMarkerSizeT = FloatingMarkerSize;
/** @deprecated use FloatingMarkerAnchorType instead. To be removed in future versions.*/
export type FloatingMarkerAnchorTypeT = FloatingMarkerAnchorType;
/** @deprecated use BadgeEnhancerSize instead. To be removed in future versions.*/
export type BadgeEnhancerSizeT = BadgeEnhancerSize;
/** @deprecated use LabelEnhancerPosition instead. To be removed in future versions.*/
export type LabelEnhancerPositionT = LabelEnhancerPosition;
/** @deprecated use Kind instead. To be removed in future versions.*/
export type KindT = Kind;
/** @deprecated use FixedMarkerOverrides instead. To be removed in future versions.*/
export type FixedMarkerOverridesT = FixedMarkerOverrides;
/** @deprecated use NeedleProps instead. To be removed in future versions.*/
export type NeedlePropsT = NeedleProps;
/** @deprecated use ItemProps instead. To be removed in future versions.*/
export type ItemPropsT = ItemProps;
/** @deprecated use LabelEnhancer instead. To be removed in future versions.*/
export type LabelEnhancerT = LabelEnhancer;
/** @deprecated use LabelEhancerComponent instead. To be removed in future versions.*/
export type LabelEhancerComponentT = LabelEhancerComponent;
/** @deprecated use BadgeEnhancer instead. To be removed in future versions.*/
export type BadgeEnhancerT = BadgeEnhancer;
/** @deprecated use BadgeEnhancerComponent instead. To be removed in future versions.*/
export type BadgeEnhancerComponentT = BadgeEnhancerComponent;
/** @deprecated use BadgePosition instead. To be removed in future versions.*/
export type BadgePositionT = BadgePosition;
/** @deprecated use FixedMarkerProps instead. To be removed in future versions.*/
export type FixedMarkerPropsT = FixedMarkerProps;
/** @deprecated use FloatingMarkerOverrides instead. To be removed in future versions.*/
export type FloatingMarkerOverridesT = FloatingMarkerOverrides;
/** @deprecated use FloatingMarkerProps instead. To be removed in future versions.*/
export type FloatingMarkerPropsT = FloatingMarkerProps;
/** @deprecated use PinHeadProps instead. To be removed in future versions.*/
export type PinHeadPropsT = PinHeadProps;
/** @deprecated use DragShadowProps instead. To be removed in future versions.*/
export type DragShadowPropsT = DragShadowProps;
