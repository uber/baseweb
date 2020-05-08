/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {POSITION} from './constants.js';

// eslint-disable-next-line flowtype/no-weak-types
type ItemT = any;
type isNavItemActiveT = (params: {
  item: MainNavItemT | UserNavItemT,
}) => boolean;
type onNavItemSelectT = (params: {item: MainNavItemT | UserNavItemT}) => mixed;

export type MainNavItemT = {|
  active?: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  icon?: React.AbstractComponent<any>,
  item: ItemT,
  mapItemToNode?: ItemT => React.Node,
  mapItemToString: ItemT => string,
  nav?: MainNavItemT[],
  // eslint-disable-next-line flowtype/no-weak-types
  navExitIcon?: React.AbstractComponent<any>,
  navPosition?: {
    desktop?: $Values<typeof POSITION>,
    mobile?: $Values<typeof POSITION>,
  },
|};

export type UserNavItemT = {|
  active?: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  icon?: React.AbstractComponent<any>,
  item: ItemT,
  mapItemToNode?: ItemT => React.Node,
  mapItemToString: ItemT => string,
  nav?: UserNavItemT[],
|};

export type UserMenuPropsT = {|
  userNav?: UserNavItemT[],
  username?: string,
  usernameSubtitle?: React.Node,
  userImgUrl?: string,
|};

export type AppNavBarPropsT = {|
  appDisplayName?: React.Node,
  mainNav?: MainNavItemT[],
  isNavItemActive?: isNavItemActiveT,
  onNavItemSelect: onNavItemSelectT,
  userNav?: UserNavItemT[],
  username?: string,
  usernameSubtitle?: React.Node,
  userImgUrl?: string,
|};
export type SecondaryMenuT = {|
  nav?: MainNavItemT[],
  isNavItemActive?: isNavItemActiveT,
  onNavItemSelect: onNavItemSelectT,
|};
