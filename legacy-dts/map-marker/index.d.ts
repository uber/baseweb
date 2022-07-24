import * as React from 'react';
import { Override } from '../overrides';

export declare const FLOATING_MARKER_ANCHOR_POSITIONS: {
  none: 'none';
  topLeft: 'top-left';
  topRight: 'top-right';
  bottomRight: 'bottom-right';
  bottomLeft: 'bottom-left';
};

export declare const FLOATING_MARKER_SIZES: {
  small: 'small';
  medium: 'medium';
  large: 'large';
};

export declare const FLOATING_MARKER_ANCHOR_TYPES: {
  circle: 'circle';
  square: 'square';
  xxSmallCircle: 'xx-small-circle';
  xxSmallSquare: 'xx-small-square';
};

export declare const NEEDLE_SIZES: {
  none: 'none';
  short: 'short';
  medium: 'medium';
  tall: 'tall';
};

export declare const PINHEAD_SIZES_SHAPES: {
  xxSmallCircle: 'xx-small-circle';
  xxSmallSquare: 'xx-small-square';
  xSmallCircle: 'x-small-circle';
  xSmallSquare: 'x-small-square';
  small: 'small';
  medium: 'medium';
  large: 'large';
};

export declare const BADGE_ENHANCER_SIZES: {
  none: 'none';
  xSmall: 'x-small';
  small: 'small';
  mediumText: 'medium-text';
  mediumIcon: 'medium-icon';
};

export declare const LABEL_ENHANCER_POSITIONS: {
  none: 'none';
  top: 'top';
  left: 'left';
  right: 'right';
  bottom: 'bottom';
};

export declare const KIND: {
  default: 'default';
  accent: 'accent';
  negative: 'negative';
};

declare const PINHEAD_TYPES: {
  floating: 'floating';
  fixed: 'fixed';
};

export type AnchorPositionsT =
  typeof FLOATING_MARKER_ANCHOR_POSITIONS[keyof typeof FLOATING_MARKER_ANCHOR_POSITIONS];
export type NeedleSizeT = typeof NEEDLE_SIZES[keyof typeof NEEDLE_SIZES];
export type PinHeadT = typeof PINHEAD_TYPES[keyof typeof PINHEAD_TYPES];
export type PinHeadSizeT = typeof PINHEAD_SIZES_SHAPES[keyof typeof PINHEAD_SIZES_SHAPES];
export type FloatingMarkerSizeT = typeof FLOATING_MARKER_SIZES[keyof typeof FLOATING_MARKER_SIZES];
export type FloatingMarkerAnchorTypeT =
  typeof FLOATING_MARKER_ANCHOR_TYPES[keyof typeof FLOATING_MARKER_ANCHOR_TYPES];
export type BadgeEnhancerSizeT = typeof BADGE_ENHANCER_SIZES[keyof typeof BADGE_ENHANCER_SIZES];
export type LabelEnhancerPositionT =
  typeof LABEL_ENHANCER_POSITIONS[keyof typeof LABEL_ENHANCER_POSITIONS];
export type KindT = typeof KIND[keyof typeof KIND];

export type FixedMarkerOverridesT = {
  Root?: Override<any>;
  InnerAnchor?: Override<any>;
  OuterAnchor?: Override<any>;
  PinHead?: Override<any>;
  PinHeadContent?: Override<any>;
  PinHeadContainer?: Override<any>;
  Needle?: Override<any>;
  DragShadow?: Override<any>;
  DragShadowContainer?: Override<any>;
  DragContainer?: Override<any>;
  BadgeEnhancer?: Override<any>;
  LabelEnhancer?: Override<any>;
  LabelEnhancerContainer?: Override<any>;
};

export type NeedlePropsT = {
  size: NeedleSizeT;
  background?: string;
  overrides: FixedMarkerOverridesT;
};

export type ItemPropsT = {
  children?: React.ReactNode;
  color?: string;
  size?: number;
};

export type LabelEnhancerT = {
  labelEnhancerContent?: string;
  labelEnhancerPosition?: LabelEnhancerPositionT;
};

export type LabelEhancerComponentT = LabelEnhancerT & {
  needleHeight: number;
  size: PinHeadSizeT;
  overrides?: FixedMarkerOverridesT;
};

export type BadgeEnhancerT = {
  badgeEnhancerSize?: BadgeEnhancerSizeT | null;
  badgeEnhancerContent?: (props: { size: number }) => React.ReactNode;
};

export type BadgeEnhancerComponentT = BadgeEnhancerT & {
  pinHeadSize: PinHeadSizeT;
  markerType: PinHeadT;
  overrides: FixedMarkerOverridesT;
};

export type BadgePositionT = {
  x: number;
  y: number;
};

export type FixedMarkerPropsT = BadgeEnhancerT &
  LabelEnhancerT & {
    size?: PinHeadSizeT;
    needle?: NeedleSizeT;
    label?: string;
    startEnhancer?: (props: { size: number }) => React.ReactNode;
    endEnhancer?: (props: { size: number }) => React.ReactNode;
    kind?: KindT;
    color?: string;
    background?: string;
    dragging?: boolean;
    overrides?: FixedMarkerOverridesT;
  };

export type FloatingMarkerOverridesT = {
  Root?: Override<any>;
  InnerAnchor?: Override<any>;
  OuterAnchor?: Override<any>;
  PinHead?: Override<any>;
  PinHeadContent?: Override<any>;
  PinHeadContainer?: Override<any>;
  AnchorContainer?: Override<any>;
  Needle?: Override<any>;
  DragShadow?: Override<any>;
  DragShadowContainer?: Override<any>;
  DragContainer?: Override<any>;
  BadgeEnhancer?: Override<any>;
  LabelEnhancer?: Override<any>;
  LabelEnhancerContainer?: Override<any>;
};

export type FloatingMarkerPropsT = {
  label?: string;
  anchor?: AnchorPositionsT;
  endEnhancer?: (props: { size: number }) => React.ReactNode;
  startEnhancer?: (props: { size: number }) => React.ReactNode;
  anchorType?: FloatingMarkerAnchorTypeT;
  size?: FloatingMarkerSizeT;
  overrides?: FloatingMarkerOverridesT;
};

export type PinHeadPropsT = BadgeEnhancerT &
  LabelEnhancerT & {
    size?: PinHeadSizeT;
    label?: string;
    endEnhancer?: (props: { size: number }) => React.ReactNode;
    startEnhancer?: (props: { size: number }) => React.ReactNode;
    color?: string;
    background?: string;
    type?: PinHeadT;
    anchorType?: FloatingMarkerAnchorTypeT;
    needle?: NeedleSizeT;
    overrides?: FloatingMarkerOverridesT | FixedMarkerOverridesT;
  };

export type DragShadowPropsT = {
  background: string;
  dragging: boolean;
  height: number;
  overrides: FixedMarkerOverridesT;
};

export declare const FixedMarker: React.FC<FixedMarkerPropsT>;
export declare const FloatingMarker: React.FC<FloatingMarkerPropsT>;
