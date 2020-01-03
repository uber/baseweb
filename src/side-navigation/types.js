/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';
import {STATE_CHANGE_TYPE} from './constants.js';

const stateChangeType = Object.freeze(STATE_CHANGE_TYPE);
export type StateTypeT = $Values<typeof stateChangeType>;

export type StateT = {
  activeItemId?: string,
};

export type StateReducerT = (
  stateType: StateTypeT,
  nextState: StateT,
  currentState: StateT,
) => StateT;

export type SharedPropsT = {
  /** Defines if the nav item is currently selected */
  $active: boolean,
  /** Defines the nesting level of the rendered nav item */
  $level: number,
  /** Defines if the nav item is selectable/clickable */
  $selectable: boolean,
};

export type NavPropsT = {
  /** Defines the current active itemId. Used for the default calculation of the $active prop */
  activeItemId: string,
  /**
    Is called on the nav item render to test if the item is currently selected.
    If returns true the item will be rendered as an active one
    */
  activePredicate: ?(item: *, activeItemId: string) => boolean,
  /** List of navigation items */
  items: Item[],
  /** Used as a performance optimization if many nav items are rendered. Function provided to
   *  NavItem component's React.memo call.
   */
  itemMemoizationComparator?: (NavItemPropsT, NavItemPropsT) => boolean,
  /** onChange handler that is called when a nav item is selected */
  onChange?: ({item: *, event: Event | KeyboardEvent}) => mixed,
  /** Overrides for the internal elements and components */
  overrides: {
    Root?: OverrideT<*>,
    NavItemContainer?: OverrideT<*>,
    NavLink?: OverrideT<*>,
    NavItem?: OverrideT<*>,
    SubNavContainer?: OverrideT<*>,
  },
  /** Optional transform function that is called for each Item */
  mapItem: ?(item: Item) => Item,
};

export type Item = {
  /** Navigation item's title to render */
  title: React.Node,
  /**
    Identifier for the navigation item.
    Can be a path value or an action name.
    It's also used in the default `activePredicate` to
    identify a currently active item
    */
  itemId?: string,
  /** A list of sub-navigation items */
  subNav?: Item[],
};

export type NavItemPropsT = SharedPropsT & {
  item: Item,
  /** Used as a performance optimization if many nav items are rendered. Function provided to
   *  NavItem component's React.memo call.
   */
  itemMemoizationComparator?: (NavItemPropsT, NavItemPropsT) => boolean,
  onSelect?: ({item: *, event: Event | KeyboardEvent}) => mixed,
  overrides: {
    NavLink?: OverrideT<*>,
    NavItem?: OverrideT<*>,
  },
};

export type StatefulContainerPropsT = {
  children: NavPropsT => React.Node,
  /** Initial state of an uncontrolled component. */
  initialState?: StateT,
  /** A state change handler. Used to override default state transitions. */
  stateReducer?: StateReducerT,
  onChange?: ({item: *, event: Event | KeyboardEvent}) => mixed,
};

type ExcludeT = {
  children: NavPropsT => React.Node,
};

export type StatefulNavPropsT = $Diff<StatefulContainerPropsT, ExcludeT>;
