import * as React from 'react';

type ItemT = any;
type mapItemToNode = (item: ItemT) => React.ReactNode;
type mapItemToString = (item: ItemT) => string;

type isNavItemActiveT = (params: {
  item: MainNavItemT | UserNavItemT,
}) => boolean;

type onNavItemClickT = (params: {item: MainNavItemT | UserNavItemT, event: Event}) => any;
type onNavItemAuxClickT = (params: {item: MainNavItemT | UserNavItemT, event: Event}) => any;
type onNavItemKeyDownT = (params: {item: MainNavItemT | UserNavItemT, event: KeyboardEvent}) => any;
type onNavItemSelectT = (params: {item: MainNavItemT | UserNavItemT}) => any;

export type MainNavItemT = {
  active?: boolean;
  icon?: React.ComponentType<any>;
  item: ItemT;
  mapItemToNode?: mapItemToNode;
  mapItemToString: mapItemToString;
  nav?: MainNavItemT[];
  navExitIcon?: React.ComponentType<any>;
  navPosition?: {
    desktop?: POSITION[keyof POSITION];
    mobile?: POSITION[keyof POSITION];
  };
};

export type UserNavItemT = {
  active?: boolean;
  icon?: React.ComponentType<any>;
  item: ItemT;
  mapItemToNode?: mapItemToNode;
  mapItemToString: mapItemToString;
  nav?: UserNavItemT[];
};

export interface AppNavBarPropsT {
  appDisplayName?: React.ReactNode;
  // eslint-disable-next-line flowtype/no-weak-type;
  mainNav?: MainNavItemT[];
  isNavItemActive: isNavItemActiveT;
  onNavItemClick?: onNavItemClickT;
  onNavItemAuxClick?: onNavItemAuxClickT;
  onNavItemKeyDown?: onNavItemKeyDownT;
  onNavItemSelect: onNavItemSelectT;
  userNav?: UserNavItemT[];
  username?: string;
  usernameSubtitle?: React.ReactNode;
  userImgUrl?: string;
}

export interface SecondaryMenuT {
  nav?: MainNavItemT[];
  isNavItemActive?: isNavItemActiveT;
  onNavItemClick?: onNavItemClickT;
  onNavItemAuxClick?: onNavItemAuxClickT;
  onNavItemKeyDown?: onNavItemKeyDownT;
  onNavItemSelect: onNavItemSelectT;
}

export interface POSITION {
  horizontal: 'horizontal';
  vertical: 'vertical';
}

export class Unstable_AppNavBar extends React.Component<AppNavBarPropsT> {}
export const POSITION: POSITION;
