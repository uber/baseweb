/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import LayoutGridAlign from './layout-grid-align.scenario.js';
import LayoutGridCustom from './layout-grid-custom.scenario.js';
import LayoutGridHide from './layout-grid-hide.scenario.js';
import LayoutGridOrder from './layout-grid-order.scenario.js';
import LayoutGridOverrides from './layout-grid-overrides.scenario.js';
import LayoutGridSizing from './layout-grid-sizing.scenario.js';
import LayoutGridSkip from './layout-grid-skip.scenario.js';
import LayoutGridUnit from './layout-grid-unit.scenario.js';
import LayoutGridWrap from './layout-grid-wrap.scenario.js';
import LayoutGridDefault from './layout-grid.scenario.js';

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
