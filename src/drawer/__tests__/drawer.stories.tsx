/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as DrawerRenderAll } from './drawer-render-all.scenario.js';
import { Scenario as DrawerSelect } from './drawer-select.scenario.js';
import { Scenario as DrawerDefault } from './drawer.scenario.js';
import { Scenario as DrawerHideBackdrop } from './drawer-hide-backdrop.scenario.js';

export const RenderAll = () => <DrawerRenderAll />;
export const Select = () => <DrawerSelect />;
export const Drawer = () => <DrawerDefault />;
export const HideBackdrop = () => <DrawerHideBackdrop />;
