/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { HIERARCHY, SHAPE, COLOR, PLACEMENT, ROLE } from './constants';
import type { OverrideT } from '../helpers/overrides';

export type HierarchyT = typeof HIERARCHY[keyof typeof HIERARCHY];
export type ShapeT = typeof SHAPE[keyof typeof SHAPE];
export type ColorT = typeof COLOR[keyof typeof COLOR];
export type PlacementT = typeof PLACEMENT[keyof typeof PLACEMENT];
export type RoleT = typeof ROLE[keyof typeof ROLE];

export type BadgeOverridesT = {
  Root?: OverrideT;
  Positioner?: OverrideT;
  Badge?: OverrideT;
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
