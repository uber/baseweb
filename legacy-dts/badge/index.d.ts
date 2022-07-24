import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const HIERARCHY: {
  primary: 'primary';
  secondary: 'secondary';
};

export declare const SHAPE: {
  pill: 'pill';
  rectangle: 'rectangle';
};

export declare const COLOR: {
  accent: 'accent';
  primary: 'primary';
  positive: 'positive';
  negative: 'negative';
  warning: 'warning';
};

export declare const PLACEMENT: {
  topLeft: 'topLeft';
  topRight: 'topRight';
  bottomRight: 'bottomRight';
  bottomLeft: 'bottomLeft';
  topLeftEdge: 'topLeftEdge';
  topEdge: 'topEdge';
  topRightEdge: 'topRightEdge';
  bottomRightEdge: 'bottomRightEdge';
  bottomEdge: 'bottomEdge';
  bottomLeftEdge: 'bottomLeftEdge';
  leftTopEdge: 'leftTopEdge';
  rightTopEdge: 'rightTopEdge';
  rightBottomEdge: 'rightBottomEdge';
  leftBottomEdge: 'leftBottomEdge';
};

export type HierarchyT = typeof HIERARCHY[keyof typeof HIERARCHY];
export type ShapeT = typeof SHAPE[keyof typeof SHAPE];
export type ColorT = typeof COLOR[keyof typeof COLOR];
export type PlacementT = typeof PLACEMENT[keyof typeof PLACEMENT];

export type BadgeOverridesT = {
  Root?: Override<any>;
  Positioner?: Override<any>;
  Badge?: Override<any>;
};

export type BadgePropsT = {
  content: React.ReactNode;
  hierarchy?: HierarchyT;
  shape?: ShapeT;
  color?: ColorT;
  placement?: PlacementT;
  hidden?: boolean;
  horizontalOffset?: string;
  verticalOffset?: string;
  overrides?: BadgeOverridesT;
  children?: React.ReactNode;
};

export type NotificationCirclePropsT = {
  content: React.ReactNode;
  color?: ColorT;
  placement?: PlacementT;
  hidden?: boolean;
  horizontalOffset?: string;
  verticalOffset?: string;
  overrides?: BadgeOverridesT;
  children?: React.ReactNode;
};

export type HintDotPropsT = {
  color?: ColorT;
  hidden?: boolean;
  horizontalOffset?: string;
  verticalOffset?: string;
  overrides?: BadgeOverridesT;
  children?: React.ReactNode;
};

export declare const StyledRoot: StyletronComponent<any, any>;
export declare const StyledPositioner: StyletronComponent<any, any>;
export declare const StyledBadge: StyletronComponent<any, any>;
export declare const StyledNotificationCircle: StyletronComponent<any, any>;
export declare const StyledHintDot: StyletronComponent<any, any>;

export declare const Badge: React.FC<BadgePropsT>;
export declare const NotificationCircle: React.FC<NotificationCirclePropsT>;
export declare const HintDot: React.FC<HintDotPropsT>;
