/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { Override } from '../helpers/overrides';
import { STATE_CHANGE_TYPE } from './constants';

const stateChangeType = Object.freeze(STATE_CHANGE_TYPE);
export type StateType = typeof stateChangeType[keyof typeof stateChangeType];

export type State = {
  activeItemId?: string;
};

export type StateReducer = (stateType: StateType, nextState: State, currentState: State) => State;

export type SharedProps = {
  /** Defines if the nav item is currently selected */
  $active: boolean;
  /** Defines the nesting level of the rendered nav item */
  $level: number;
  /** Defines if the nav item is selectable/clickable */
  $selectable: boolean;
  /** Defines if the nav item is disabled */
  $disabled: boolean;
};

export type NavigationOverrides = {
  Root?: Override;
  NavItemContainer?: Override;
  NavLink?: Override;
  NavItem?: Override;
  SubNavContainer?: Override;
};
export type NavigationProps = {
  /** Defines the current active itemId. Used for the default calculation of the $active prop */
  activeItemId: string;
  /**
    Is called on the nav item render to test if the item is currently selected.
    If returns true the item will be rendered as an active one
    */
  activePredicate?: ((item: Item, activeItemId: string) => boolean) | null;
  /** List of navigation items */
  items: Item[];
  /** Used as a performance optimization if many nav items are rendered. Function provided to
   *  NavItem component's React.memo call.
   */
  itemMemoizationComparator?: (b: NavItemProps, a: NavItemProps) => boolean;
  /** onChange handler that is called when a nav item is selected */
  onChange?: (a: { item: Item; event: Event | KeyboardEvent }) => unknown;
  /** Overrides for the internal elements and components */
  overrides?: NavigationOverrides;
  /** Optional transform function that is called for each Item */
  mapItem?: ((item: Item) => Item) | null;
};

export type Item = {
  /** Navigation item's title to render */
  title: React.ReactNode;
  /**
    Identifier for the navigation item.
    Can be a path value or an action name.
    It's also used in the default `activePredicate` to
    identify a currently active item
    */
  itemId?: string;
  /** A list of sub-navigation items */
  subNav?: Item[];
  /** Renders the item in disabled state */
  disabled?: boolean;
};

export type NavItemOverrides = {
  NavLink?: Override;
  NavItem?: Override;
};
export type NavItemProps = SharedProps & {
  item: Item;
  /** Used as a performance optimization if many nav items are rendered. Function provided to
   *  NavItem component's React.memo call.
   */
  itemMemoizationComparator?: (b: NavItemProps, a: NavItemProps) => boolean;
  onSelect?: (a: { item: Item; event: Event | KeyboardEvent }) => unknown;
  overrides: NavItemOverrides;
};

export type StatefulContainerProps = {
  children: (a: NavigationProps) => React.ReactNode;
  /** Initial state of an uncontrolled component. */
  initialState?: State;
  /** A state change handler. Used to override default state transitions. */
  stateReducer?: StateReducer;
  onChange?: (a: { item: Item; event: Event | KeyboardEvent }) => unknown;
};

type Exclude = {
  children: (a: NavigationProps) => React.ReactNode;
};

export type StatefulNavProps = Omit<StatefulContainerProps, keyof Exclude>;
