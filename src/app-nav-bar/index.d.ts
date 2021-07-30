import * as React from 'react';
import {Override} from '../overrides';

export interface AppNavBarOverridesT {
  Root?: Override<any>;
  AppName?: Override<any>;
  MainMenuItem?: Override<any>;
  PrimaryMenuContainer?: Override<any>;
  ProfileTileContainer?: Override<any>;
  SecondaryMenuContainer?: Override<any>;
  Spacing?: Override<any>;
  SubnavContainer?: Override<any>;
  UserMenuProfileListItem?: Override<any>;
  UserProfileInfoContainer?: Override<any>;
  UserProfilePictureContainer?: Override<any>;
  UserProfileTileContainer?: Override<any>;

  // nested overrides
  MobileDrawer?: Override<any>;
  MobileMenu?: Override<any>;
  SideMenuButton?: Override<any>;
  UserMenuButton?: Override<any>;
  UserMenu?: Override<any>;
}

export type NavItemT = {
  active?: boolean;
  icon?: React.ComponentType<any>;
  info?: any;
  label: string;
  children?: NavItemT[];
  navExitIcon?: React.ComponentType<any>;
  navPosition?: {
    desktop?: POSITION[keyof POSITION];
    mobile?: POSITION[keyof POSITION];
  };
};

export type UserMenuPropsT = {
  userItems?: NavItemT[];
  username?: string;
  usernameSubtitle?: React.ReactNode;
  userImgUrl?: string;
  onUserItemSelect?: (item: NavItemT) => any;
};

export type AppNavBarPropsT = UserMenuPropsT & {
  isMainItemActive?: (item: NavItemT) => boolean;
  mainItems?: NavItemT[];
  mapItemToNode?: (item: NavItemT) => React.ReactNode;
  onMainItemSelect?: (item: NavItemT) => any;
  overrides?: AppNavBarOverridesT;
  title?: React.ReactNode;
};

export interface POSITION {
  horizontal: 'horizontal';
  vertical: 'vertical';
}

export class AppNavBar extends React.Component<AppNavBarPropsT> {}
export const POSITION: POSITION;

export const setItemActive: (
  items: NavItemT[],
  item: NavItemT,
  getUniqueueIdentifier?: (currentItem: NavItemT) => string | number,
) => NavItemT[];
