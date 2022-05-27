import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export interface HIERARCHY {
  primary: 'primary';
  secondary: 'secondary';
}

export interface SHAPE {
  pill: 'pill';
  rectangle: 'rectangle';
}

export interface COLOR {
  accent: 'accent';
  primary: 'primary';
  positive: 'positive';
  negative: 'negative';
  warning: 'warning';
}

export interface PLACEMENT {
  topLeft: 'topLeft';
  top: 'top';
  topRight: 'topRight';
  bottomRight: 'bottomRight';
  bottom: 'bottom';
  bottomLeft: 'bottomLeft';
}

export type HierarchyT = HIERARCHY[keyof HIERARCHY];
export type ShapeT = SHAPE[keyof SHAPE];
export type ColorT = COLOR[keyof COLOR];
export type PlacementT = PLACEMENT[keyof PLACEMENT];

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

export const StyledRoot: StyletronComponent<any>;
export const StyledPositioner: StyletronComponent<any>;
export const StyledBadge: StyletronComponent<any>;
export const StyledNotificationCircle: StyletronComponent<any>;
export const StyledHintDot: StyletronComponent<any>;

export const Badge: React.FC<BadgePropsT>;
export const NotificationCircle: React.FC<NotificationCirclePropsT>;
export const HintDot: React.FC<HintDotPropsT>;

export const HIERARCHY: HIERARCHY;
export const SHAPE: SHAPE;
export const COLOR: COLOR;
export const PLACEMENT: PLACEMENT;
