/*
Copyright (c) 2018 Uber Technologies, Inc.

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
  /** Defines the current active itemId. Used for the defaut calculation of the $active prop */
  activeItemId: string,
  /** 
    Is called on the nav item render to test if the item is currently selected. 
    If returns true the item will be rendered as an active one 
    */
  activePredicate: ?(item: *, activeItemId: string) => boolean,
  /** Overrides for the internal elements and components */
  overrides: {
    Root?: OverrideT<*>,
    NavItemContainer?: OverrideT<*>,
    NavItem?: OverrideT<*>,
    SubNavContainer?: OverrideT<*>,
  },
  /** Optional render function that is called instead default item rendering */
  renderItem: ?(
    item: *,
    props: SharedPropsT & {
      role: string,
      tabIndex: ?number,
      onClick: ?(e: Event) => mixed,
      onKeyDown: ?(e: KeyboardEvent) => mixed,
    },
  ) => React.Node,
};

type Item = {
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
  subnav?: Item[],
};

export type SideNavPropsT = NavPropsT & {
  /** List of navigation items */
  items: Item[],
  /** onChange handler that is called when a nav item is selected */
  onChange?: ({item: *}) => mixed,
};

export type NavItemPropsT = NavPropsT & {
  index: number,
  item: *,
  navLevel: number,
  onSelect: ?({item: *}) => mixed,
  onClick: ?(e: Event) => mixed,
  onKeyDown: ?(e: KeyboardEvent) => mixed,
};

export type StatefulContainerPropsT = {
  children: SideNavPropsT => React.Node,
  /** Initial state of an uncontrolled component. */
  initialState?: StateT,
  /** A state change handler. Used to override default state transitions. */
  stateReducer?: StateReducerT,
  onChange: ({item: *}) => mixed,
};

type ExcludeT = {
  children: SideNavPropsT => React.Node,
};

export type StatefulNavPropsT = $Diff<StatefulContainerPropsT, ExcludeT>;
