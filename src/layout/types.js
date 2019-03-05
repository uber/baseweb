/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import type {OverrideT} from '../helpers/overrides.js';

export type ContentPropsT = {|
  children: React.Node,
  overrides?: {|
    Content?: OverrideT<*>,
  |},
|};

export type HeaderPropsT = {|
  children: React.Node,
  overrides?: {|
    Header?: OverrideT<*>,
  |},
|};

export type LayoutPropsT = {|
  children: React.Node,
  overrides?: {|
    Layout?: OverrideT<*>,
  |},
|};

export type LayoutStateT = {|
  sidebarCount: number,
|};

export type LayoutContextT = {|
  addSidebar: () => void,
  removeSidebar: () => void,
|};

export type SidebarPropsT = {|
  /* Specifies the breakpoint at which the sidebar will collapse. The sidebar will not be
   * responsive if not defined. This value must be a key in theme.breakpoints. */
  breakpoint?: string,
  children: React.Node,
  /* Hides the sidebar. */
  isCollapsed?: boolean,
  /* Callback for when the sidebar changes from open to collapsed. Useful for when you need
   * to update a parent component's state on this change. */
  onCollapse?: () => mixed,
  overrides?: {|
    Sidebar?: OverrideT<*>,
  |},
|};
