/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type {
  HIERARCHY,
  SHAPE,
  COLOR,
  PLACEMENT,
  ROLE,
  NOTIFICATION_CIRCLE_SIZE,
} from './constants';
import type { Override } from '../helpers/overrides';

export type Hierarchy = (typeof HIERARCHY)[keyof typeof HIERARCHY];
export type Shape = (typeof SHAPE)[keyof typeof SHAPE];
export type Color = (typeof COLOR)[keyof typeof COLOR];
export type Placement = (typeof PLACEMENT)[keyof typeof PLACEMENT];
export type Role = (typeof ROLE)[keyof typeof ROLE];
export type NotificationCircleSize =
  (typeof NOTIFICATION_CIRCLE_SIZE)[keyof typeof NOTIFICATION_CIRCLE_SIZE];

export type BadgeOverrides = {
  Root?: Override;
  Positioner?: Override;
  Badge?: Override;
};

export type BadgeProps = {
  content: React.ReactNode;
  hierarchy?: Hierarchy;
  shape?: Shape;
  color?: Color;
  placement?: Placement;
  hidden?: boolean;
  horizontalOffset?: string;
  verticalOffset?: string;
  overrides?: BadgeOverrides;
  children?: React.ReactNode;
};

export type NotificationCircleProps = {
  content: React.ReactNode | ((iconSize: number) => React.ReactNode);
  color?: Color;
  placement?: Placement;
  hidden?: boolean;
  horizontalOffset?: string;
  verticalOffset?: string;
  overrides?: BadgeOverrides;
  children?: React.ReactNode;
  /** The size of the notification circle. Defaults to `medium`. */
  size?: NotificationCircleSize;
};

export type HintDotPlacement =
  | typeof PLACEMENT.topRight
  | typeof PLACEMENT.topLeft
  | typeof PLACEMENT.bottomRight
  | typeof PLACEMENT.bottomLeft;

export type HintDotProps = {
  /** The color of the hint dot. Accepts one of the `COLOR` constant values. */
  color?: Color;
  /** When true, the hint dot is not rendered. Useful for conditionally showing/hiding without unmounting. */
  hidden?: boolean;
  /** Horizontal offset applied to the dot's position, e.g. `'-14px'`. Overrides the default offset. */
  horizontalOffset?: string;
  /** Vertical offset applied to the dot's position, e.g. `'-4px'`. Overrides the default offset. */
  verticalOffset?: string;
  /** Corner of the anchor element where the dot is placed. Accepts `topRight`, `topLeft`, `bottomRight`, or `bottomLeft`. Defaults to `topRight`. RTL case has been covered. */
  placement?: HintDotPlacement;
  /** When true (default), renders a border around the dot to visually separate it from the underlying element. */
  hasBorder?: boolean;
  /** Style overrides for the `Root`, `Positioner`, and `Badge` sub-components. */
  overrides?: BadgeOverrides;
  /** The element the hint dot is anchored to. Default offsets are applied automatically with/without placement specified. When omitted, the dot renders without an anchor. */
  children?: React.ReactNode;
};
