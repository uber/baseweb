/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { OverrideT } from '../helpers/overrides';
import { STATE_CHANGE_TYPE } from './constants';

const stateChangeType = Object.freeze(STATE_CHANGE_TYPE);
export type StateTypeT = typeof stateChangeType[keyof typeof stateChangeType];

export type StateT = {
  activeItemId?: string;
};

export type StateReducerT = (
  stateType: StateTypeT,
  nextState: StateT,
  currentState: StateT
) => StateT;

export type SharedPropsT = {
  /** Defines if the nav item is currently selected */
  $active: boolean;
  /** Defines the nesting level of the rendered nav item */
  $level: number;
  /** Defines if the nav item is selectable/clickable */
  $selectable: boolean;
  /** Defines if the nav item is disabled */
  $disabled: boolean;
};

export type NavPropsT = {
  /** Defines the current active itemId. Used for the default calculation of the $active prop */
  activeItemId: string;
  /**
    Is called on the nav item render to test if the item is currently selected.
    If returns true the item will be rendered as an active one
    */
  activePredicate: ((item: Item, activeItemId: string) => boolean) | undefined | null;
  /** List of navigation items */
  items: Item[];
  /** Used as a performance optimization if many nav items are rendered. Function provided to
   *  NavItem component's React.memo call.
   */
  itemMemoizationComparator?: (b: NavItemPropsT, a: NavItemPropsT) => boolean;
  /** onChange handler that is called when a nav item is selected */
  onChange?: (a: { item: Item; event: Event | KeyboardEvent }) => unknown;
  /** Overrides for the internal elements and components */
  overrides: {
    Root?: OverrideT;
    NavItemContainer?: OverrideT;
    NavLink?: OverrideT;
    NavItem?: OverrideT;
    SubNavContainer?: OverrideT;
  };
  /** Optional transform function that is called for each Item */
  mapItem: ((item: Item) => Item) | undefined | null;
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

export type NavItemPropsT = SharedPropsT & {
  item: Item;
  /** Used as a performance optimization if many nav items are rendered. Function provided to
   *  NavItem component's React.memo call.
   */
  itemMemoizationComparator?: (b: NavItemPropsT, a: NavItemPropsT) => boolean;
  onSelect?: (a: { item: Item; event: Event | KeyboardEvent }) => unknown;
  overrides: {
    NavLink?: OverrideT;
    NavItem?: OverrideT;
  };
};

export type StatefulContainerPropsT = {
  children: (a: NavPropsT) => React.ReactNode;
  /** Initial state of an uncontrolled component. */
  initialState?: StateT;
  /** A state change handler. Used to override default state transitions. */
  stateReducer?: StateReducerT;
  onChange?: (a: { item: Item; event: Event | KeyboardEvent }) => unknown;
};

type ExcludeT = {
  children: (a: NavPropsT) => React.ReactNode;
};

export type StatefulNavPropsT = Omit<StatefulContainerPropsT, keyof ExcludeT>;
