/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Scenario as LayoutGridAlign} from './layout-grid-align.scenario.js';
import {Scenario as LayoutGridCustom} from './layout-grid-custom.scenario.js';
import {Scenario as LayoutGridHide} from './layout-grid-hide.scenario.js';
import {Scenario as LayoutGridOrder} from './layout-grid-order.scenario.js';
import {Scenario as LayoutGridOverrides} from './layout-grid-overrides.scenario.js';
import {Scenario as LayoutGridSizing} from './layout-grid-sizing.scenario.js';
import {Scenario as LayoutGridSkip} from './layout-grid-skip.scenario.js';
import {Scenario as LayoutGridUnit} from './layout-grid-unit.scenario.js';
import {Scenario as LayoutGridWrap} from './layout-grid-wrap.scenario.js';
import {Scenario as LayoutGridDefault} from './layout-grid.scenario.js';
import {Scenario as LayoutGridCompact} from './layout-grid-compact.scenario.js';

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
