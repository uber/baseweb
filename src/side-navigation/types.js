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
  activePath?: string,
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
  $level: boolean,
  /** Defines if the nav item is selectable/clickable */
  $selectable: boolean,
};

export type SideNavComponentsT = {
  Root?: OverrideT<*>,
  NavItemContainer?: OverrideT<*>,
  Link?: OverrideT<*>,
  NavItem?: OverrideT<*>,
  SubNavContainer?: OverrideT<*>,
};

export type NavPropsT = {
  /** Defines the current active path. Used for the defaut calculation of the $active prop */
  activePath: string,
  /** isActive is called on the nav item. If return true the item will be rendered as an active one */
  isActive: ?(item: *, activePath: string) => mixed,
  /** Overrides for the internal elements and components */
  overrides: SideNavComponentsT,
  /** Optional render function that is called instead default item rendering */
  renderItem: ?(item: *) => React.Node,
};

export type SideNavPropsT = NavPropsT & {
  /** List of navigation items */
  items: Array<*>,
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
  children: NavPropsT => React.Node,
  /** Initial state of an uncontrolled component. */
  initialState?: StateT,
  /** A state change handler. Used to override default state transitions. */
  stateReducer: StateReducerT,
  onChange: ({item: *}) => void,
};

export type StatefulNavPropsT = SideNavPropsT & StatefulContainerPropsT;
