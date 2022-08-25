/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as MenuChildInPopover } from './menu-child-in-popover.scenario';
import { Scenario as MenuChildRenderAll } from './menu-child-render-all.scenario';
import { Scenario as MenuChild } from './menu-child.scenario';
import { Scenario as MenuEmpty } from './menu-empty.scenario';
import { Scenario as MenuGroupedItems } from './menu-grouped-items.scenario';
import { Scenario as MenuPropagation } from './menu-propagation.scenario';
import { Scenario as MenuStateful } from './menu-stateful.scenario';
import { Scenario as MenuVirtualized } from './menu-virtualized.scenario';
import { Scenario as MenuDefault } from './menu.scenario';
import { Scenario as MenuProfileMenu } from './menu-profile-menu.scenario';
import { Scenario as MenuDividers } from './menu-dividers.scenario';

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
export const Dividers = () => <MenuDividers />;
