/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import { HIERARCHY, SHAPE, COLOR, PLACEMENT, ROLES } from './constants.js';
import type { OverrideT } from '../helpers/overrides.js';

export type HierarchyT = $Values<typeof HIERARCHY>;
export type ShapeT = $Values<typeof SHAPE>;
export type ColorT = $Values<typeof COLOR>;
export type PlacementT = $Values<typeof PLACEMENT>;
export type RoleT = $Values<typeof ROLES>;

export type OffsetT = string;

export type InlineBadgeOverridesT = {
  Badge?: OverrideT,
};

export type BadgeOverridesT = {
  Root?: OverrideT,
  Positioner?: OverrideT,
  Badge?: OverrideT,
};

export type InlineBadgePropsT = {
  color?: ColorT,
  shape?: ShapeT,
  hierarchy?: HierarchyT,
  children: ?React.Node,
  overrides?: InlineBadgeOverridesT,
  hidden?: boolean,
};

export type BadgePropsT = {
  horizontalOffset?: string,
  verticalOffset?: string,
  placement?: PlacementT,
  children: ?React.Node,
  content: ?React.Node,
  overrides?: BadgeOverridesT,
} & InlineBadgePropsT;
