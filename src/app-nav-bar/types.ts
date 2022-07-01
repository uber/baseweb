/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import { POSITION } from './constants.js';

import type { OverrideT } from '../helpers/overrides.js';

export type OverridesT = {
  Root?: OverrideT,
  AppName?: OverrideT,
  DesktopMenu?: OverrideT,
  DesktopMenuContainer?: OverrideT,
  MainMenuItem?: OverrideT,
  PrimaryMenuContainer?: OverrideT,
  ProfileTileContainer?: OverrideT,
  SecondaryMenuContainer?: OverrideT,
  Spacing?: OverrideT,
  SubnavContainer?: OverrideT,
  UserMenuProfileListItem?: OverrideT,
  UserProfileInfoContainer?: OverrideT,
  UserProfilePictureContainer?: OverrideT,
  UserProfileTileContainer?: OverrideT,

  // nested overrides
  MobileDrawer?: OverrideT,
  MobileMenu?: OverrideT,
  SideMenuButton?: OverrideT,
  UserMenuButton?: OverrideT,
  UserMenu?: OverrideT,
};

export type NavItemT = {|
  active?: boolean,
  // flowlint-next-line unclear-type:off
  icon?: React.AbstractComponent<any>,
  // flowlint-next-line unclear-type:off
  info?: any,
  label: string,
  children?: NavItemT[],
  // flowlint-next-line unclear-type:off
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
  onUserItemSelect?: (NavItemT) => mixed,
|};

export type AppNavBarPropsT = {|
  ...UserMenuPropsT,
  isMainItemActive?: (NavItemT) => boolean,
  mainItems?: NavItemT[],
  mapItemToNode?: (NavItemT) => React.Node,
  onMainItemSelect?: (NavItemT) => mixed,
  overrides?: OverridesT,
  title?: React.Node,
|};
