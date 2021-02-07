/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import MenuChildInPopover from './menu-child-in-popover.scenario.js';
import MenuChildRenderAll from './menu-child-render-all.scenario.js';
import MenuChild from './menu-child.scenario.js';
import MenuEmpty from './menu-empty.scenario.js';
import MenuGroupedItems from './menu-grouped-items.scenario.js';
import MenuPropagation from './menu-propagation.scenario.js';
import MenuStateful from './menu-stateful.scenario.js';
import MenuVirtualized from './menu-virtualized.scenario.js';
import MenuDefault from './menu.scenario.js';

export const ChildInPopover = () => <MenuChildInPopover />;
export const ChildRenderAll = () => <MenuChildRenderAll />;
export const Child = () => <MenuChild />;
export const Empty = () => <MenuEmpty />;
export const GroupedItems = () => <MenuGroupedItems />;
export const Propagation = () => <MenuPropagation />;
export const Stateful = () => <MenuStateful />;
export const Virtualized = () => <MenuVirtualized />;
export const Menu = () => <MenuDefault />;
