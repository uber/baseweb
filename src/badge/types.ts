/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { HIERARCHY, SHAPE, COLOR, PLACEMENT, ROLE } from './constants';
import type { Override } from '../helpers/overrides';

export type Hierarchy = typeof HIERARCHY[keyof typeof HIERARCHY];
export type Shape = typeof SHAPE[keyof typeof SHAPE];
export type Color = typeof COLOR[keyof typeof COLOR];
export type Placement = typeof PLACEMENT[keyof typeof PLACEMENT];
export type Role = typeof ROLE[keyof typeof ROLE];

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
  content: React.ReactNode;
  color?: Color;
  placement?: Placement;
  hidden?: boolean;
  horizontalOffset?: string;
  verticalOffset?: string;
  overrides?: BadgeOverrides;
  children?: React.ReactNode;
};

export type HintDotProps = {
  color?: Color;
  hidden?: boolean;
  horizontalOffset?: string;
  verticalOffset?: string;
  overrides?: BadgeOverrides;
  children?: React.ReactNode;
};
