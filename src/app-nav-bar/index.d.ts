import * as React from 'react';

type ItemT = any;
type mapItemToNode = (item: ItemT) => React.ReactNode;
type mapItemToString = (item: ItemT) => string;

export type MainNavItemT = {
  active?: boolean;
  icon?: React.AbstractComponent<any>;
  item: ItemT;
  mapItemToNode?: mapItemToNode;
  mapItemToString: mapItemToString;
  nav?: MainNavItemT[];
  navExitIcon?: React.AbstractComponent<any>;
};

export type UserNavItemT = {
  active?: boolean;
  icon?: React.AbstractComponent<any>;
  item: ItemT;
  mapItemToNode?: mapItemToNode;
  mapItemToString: mapItemToString;
};

export interface AppNavBarPropsT {
  appDisplayName?: React.ReactNode;
  appDisplayNameLink?: string;
  // eslint-disable-next-line flowtype/no-weak-type;
  mainNav?: MainNavItemT[];
  onNavItemSelect: (params: {item: MainNavItemT | UserNavItemT}) => mixed;
  userNav?: UserNavItemT[];
  username?: string;
  usernameSubtitle?: React.ReactNode;
  userImgUrl?: string;
};

export class Unstable_AppNavBar extends React.Component<AppNavBarPropsT> {}
