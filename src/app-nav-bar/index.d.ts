import * as React from 'react';

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
  onUserItemSelect?: (item: NavItemT) => mixed;
};

export type AppNavBarPropsT = UserMenuPropsT & {
  isMainItemActive?: (item: NavItemT) => boolean;
  mainItems?: NavItemT[];
  mapItemToNode?: (item: NavItemT) => React.ReactNode;
  onMainItemSelect?: (item: NavItemT) => mixed;
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
