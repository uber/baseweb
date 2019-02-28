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
  children: React.Node,
  overrides?: {|
    Sidebar?: OverrideT<*>,
  |},
|};
