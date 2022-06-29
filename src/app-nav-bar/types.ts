/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { POSITION } from './constants';

import type { Override } from '../helpers/overrides';

export type AppNavBarOverrides = {
  Root?: Override;
  AppName?: Override;
  DesktopMenu?: Override;
  DesktopMenuContainer?: Override;
  MainMenuItem?: Override;
  PrimaryMenuContainer?: Override;
  ProfileTileContainer?: Override;
  SecondaryMenuContainer?: Override;
  Spacing?: Override;
  SubnavContainer?: Override;
  UserMenuProfileListItem?: Override;
  UserProfileInfoContainer?: Override;
  UserProfilePictureContainer?: Override;
  UserProfileTileContainer?: Override;
  // nested overrides
  MobileDrawer?: Override;
  MobileMenu?: Override;
  SideMenuButton?: Override;
  UserMenuButton?: Override;
  UserMenu?: Override;
};

export type NavItem = {
  active?: boolean;
  icon?: React.ComponentType<any>;
  info?: any;
  label: string;
  children?: NavItem[];
  navExitIcon?: React.ComponentType<any>;
  navPosition?: {
    desktop?: typeof POSITION[keyof typeof POSITION];
    mobile?: typeof POSITION[keyof typeof POSITION];
  };
};

export type UserMenuProps = {
  userItems?: NavItem[];
  username?: string;
  usernameSubtitle?: React.ReactNode;
  userImgUrl?: string;
  onUserItemSelect?: (a: NavItem) => unknown;
};

export type AppNavBarProps = {
  isMainItemActive?: (a: NavItem) => boolean;
  mainItems?: NavItem[];
  mapItemToNode?: (a: NavItem) => React.ReactNode;
  onMainItemSelect?: (a: NavItem) => unknown;
  overrides?: AppNavBarOverrides;
  title?: React.ReactNode;
} & UserMenuProps;
