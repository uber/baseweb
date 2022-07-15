/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type {
  Hierarchy,
  Shape,
  Color,
  Placement,
  BadgeOverrides,
  BadgeProps,
  NotificationCircleProps,
  HintDotProps,
} from './types';

export { default as Badge } from './badge';
export { default as NotificationCircle } from './notification-circle';
export { default as HintDot } from './hint-dot';

export { HIERARCHY, SHAPE, COLOR, PLACEMENT } from './constants';

export * from './styled-components';

export * from './types';
/** @deprecated use Hierarchy instead. To be removed in future versions.*/
export type HierarchyT = Hierarchy;
/** @deprecated use Shape instead. To be removed in future versions.*/
export type ShapeT = Shape;
/** @deprecated use Color instead. To be removed in future versions.*/
export type ColorT = Color;
/** @deprecated use Placement instead. To be removed in future versions.*/
export type PlacementT = Placement;
/** @deprecated use BadgeOverrides instead. To be removed in future versions.*/
export type BadgeOverridesT = BadgeOverrides;
/** @deprecated use BadgeProps instead. To be removed in future versions.*/
export type BadgePropsT = BadgeProps;
/** @deprecated use NotificationCircleProps instead. To be removed in future versions.*/
export type NotificationCirclePropsT = NotificationCircleProps;
/** @deprecated use HintDotProps instead. To be removed in future versions.*/
export type HintDotPropsT = HintDotProps;
