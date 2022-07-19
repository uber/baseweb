/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { AppNavBarOverrides, NavItem, UserMenuProps, AppNavBarProps } from './types';

export { default as AppNavBar } from './app-nav-bar';
export { POSITION } from './constants';
export * from './styled-components';
export * from './types';

export { setItemActive } from './utils';
/** @deprecated use AppNavBarOverrides instead. To be removed in future versions.*/
export type AppNavBarOverridesT = AppNavBarOverrides;
/** @deprecated use NavItem instead. To be removed in future versions.*/
export type NavItemT = NavItem;
/** @deprecated use UserMenuProps instead. To be removed in future versions.*/
export type UserMenuPropsT = UserMenuProps;
/** @deprecated use AppNavBarProps instead. To be removed in future versions.*/
export type AppNavBarPropsT = AppNavBarProps;
