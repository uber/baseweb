/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Scenario as MenuChildInPopover} from './menu-child-in-popover.scenario.js';
import {Scenario as MenuChildRenderAll} from './menu-child-render-all.scenario.js';
import {Scenario as MenuChild} from './menu-child.scenario.js';
import {Scenario as MenuEmpty} from './menu-empty.scenario.js';
import {Scenario as MenuGroupedItems} from './menu-grouped-items.scenario.js';
import {Scenario as MenuPropagation} from './menu-propagation.scenario.js';
import {Scenario as MenuStateful} from './menu-stateful.scenario.js';
import {Scenario as MenuVirtualized} from './menu-virtualized.scenario.js';
import {Scenario as MenuDefault} from './menu.scenario.js';
import {Scenario as MenuProfileMenu} from './menu-profile-menu.scenario.js';

export const ChildInPopover = () => <MenuChildInPopover />;
export const ChildRenderAll = () => <MenuChildRenderAll />;
export const Child = () => <MenuChild />;
export const Empty = () => <MenuEmpty />;
export const GroupedItems = () => <MenuGroupedItems />;
export const Propagation = () => <MenuPropagation />;
export const Stateful = () => <MenuStateful />;
export const Virtualized = () => <MenuVirtualized />;
export const Menu = () => <MenuDefault />;
export const ProfileMenu = () => <MenuProfileMenu />;
