import * as React from 'react';

type ItemT = any;
type mapItemToNode = (item: ItemT) => React.ReactNode;
type mapItemToString = (item: ItemT) => string;

export type MainNavItemT = {
  active?: boolean;
  icon?: React.ComponentType<any>;
  item: ItemT;
  mapItemToNode?: mapItemToNode;
  mapItemToString: mapItemToString;
  nav?: MainNavItemT[];
  navExitIcon?: React.ComponentType<any>;
};

export type UserNavItemT = {
  active?: boolean;
  icon?: React.ComponentType<any>;
  item: ItemT;
  mapItemToNode?: mapItemToNode;
  mapItemToString: mapItemToString;
};

export interface AppNavBarPropsT {
  appDisplayName?: React.ReactNode;
  // eslint-disable-next-line flowtype/no-weak-type;
  mainNav?: MainNavItemT[];
  isNavItemActive: (params: {item: MainNavItemT | UserNavItemT}) => boolean;
  onNavItemSelect: (params: {item: MainNavItemT | UserNavItemT}) => any;
  userNav?: UserNavItemT[];
  username?: string;
  usernameSubtitle?: React.ReactNode;
  userImgUrl?: string;
}

export interface POSITION {
  horizontal: 'horizontal';
  vertical: 'vertical';
}

export class Unstable_AppNavBar extends React.Component<AppNavBarPropsT> {}
export const POSITION: POSITION;
