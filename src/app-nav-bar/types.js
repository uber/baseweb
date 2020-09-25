/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {KIND, POSITION} from './constants.js';

export type NavItemT = {|
  id?: number | string,
  active?: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  icon?: React.AbstractComponent<any>,
  // eslint-disable-next-line flowtype/no-weak-types
  info?: any,
  label: string,
  mapItemToNode?: NavItemT => React.Node,
  children?: NavItemT[],
  // eslint-disable-next-line flowtype/no-weak-types
  navExitIcon?: React.AbstractComponent<any>,
  navPosition?: {
    desktop?: $Values<typeof POSITION>,
    mobile?: $Values<typeof POSITION>,
  },
|};

export type UserMenuPropsT = {|
  userItems?: NavItemT[],
  username?: string,
  usernameSubtitle?: React.Node,
  userImgUrl?: string,
  onUserItemSelect?: NavItemT => mixed,
|};

export type AppNavBarPropsT = {|
  ...UserMenuPropsT,
  title?: React.Node,
  mainItems?: NavItemT[],
  onMainItemSelect?: NavItemT => mixed,
|};
