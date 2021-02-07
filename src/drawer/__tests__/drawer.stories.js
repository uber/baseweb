/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import DrawerRenderAll from './drawer-render-all.scenario.js';
import DrawerSelect from './drawer-select.scenario.js';
import DrawerDefault from './drawer.scenario.js';

export const RenderAll = () => <DrawerRenderAll />;
export const Select = () => <DrawerSelect />;
export const Drawer = () => <DrawerDefault />;
