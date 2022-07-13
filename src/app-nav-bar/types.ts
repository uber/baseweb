/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { POSITION } from './constants';

import type { OverrideT } from '../helpers/overrides';

export type OverridesT = {
  Root?: OverrideT;
  AppName?: OverrideT;
  DesktopMenu?: OverrideT;
  DesktopMenuContainer?: OverrideT;
  MainMenuItem?: OverrideT;
  PrimaryMenuContainer?: OverrideT;
  ProfileTileContainer?: OverrideT;
  SecondaryMenuContainer?: OverrideT;
  Spacing?: OverrideT;
  SubnavContainer?: OverrideT;
  UserMenuProfileListItem?: OverrideT;
  UserProfileInfoContainer?: OverrideT;
  UserProfilePictureContainer?: OverrideT;
  UserProfileTileContainer?: OverrideT;
  // nested overrides
  MobileDrawer?: OverrideT;
  MobileMenu?: OverrideT;
  SideMenuButton?: OverrideT;
  UserMenuButton?: OverrideT;
  UserMenu?: OverrideT;
};

export type NavItemT = {
  active?: boolean;
  icon?: React.ComponentType<any>;
  info?: any;
  label: string;
  children?: NavItemT[];
  navExitIcon?: React.ComponentType<any>;
  navPosition?: {
    desktop?: typeof POSITION[keyof typeof POSITION];
    mobile?: typeof POSITION[keyof typeof POSITION];
  };
};

export type UserMenuPropsT = {
  userItems?: NavItemT[];
  username?: string;
  usernameSubtitle?: React.ReactNode;
  userImgUrl?: string;
  onUserItemSelect?: (a: NavItemT) => unknown;
};

export type AppNavBarPropsT = {
  isMainItemActive?: (a: NavItemT) => boolean;
  mainItems?: NavItemT[];
  mapItemToNode?: (a: NavItemT) => React.ReactNode;
  onMainItemSelect?: (a: NavItemT) => unknown;
  overrides?: OverridesT;
  title?: React.ReactNode;
} & UserMenuPropsT;
