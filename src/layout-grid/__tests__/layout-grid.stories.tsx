/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as LayoutGridAlign } from './layout-grid-align.scenario';
import { Scenario as LayoutGridCustom } from './layout-grid-custom.scenario';
import { Scenario as LayoutGridHide } from './layout-grid-hide.scenario';
import { Scenario as LayoutGridOrder } from './layout-grid-order.scenario';
import { Scenario as LayoutGridOverrides } from './layout-grid-overrides.scenario';
import { Scenario as LayoutGridSizing } from './layout-grid-sizing.scenario';
import { Scenario as LayoutGridSkip } from './layout-grid-skip.scenario';
import { Scenario as LayoutGridUnit } from './layout-grid-unit.scenario';
import { Scenario as LayoutGridWrap } from './layout-grid-wrap.scenario';
import { Scenario as LayoutGridDefault } from './layout-grid.scenario';
import { Scenario as LayoutGridCompact } from './layout-grid-compact.scenario';

export const Align = () => <LayoutGridAlign />;
export const Custom = () => <LayoutGridCustom />;
export const Hide = () => <LayoutGridHide />;
export const Order = () => <LayoutGridOrder />;
export const Overrides = () => <LayoutGridOverrides />;
export const Sizing = () => <LayoutGridSizing />;
export const Skip = () => <LayoutGridSkip />;
export const Unit = () => <LayoutGridUnit />;
export const Wrap = () => <LayoutGridWrap />;
export const LayoutGrid = () => <LayoutGridDefault />;
export const Compact = () => <LayoutGridCompact />;
