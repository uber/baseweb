/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';
import {STATE_CHANGE_TYPE} from './constants.js';

export type StateT = {
  items: Array<React.Node>,
};

export type StateChangeTypeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type StateReducerT = (
  stateChangeType: StateChangeTypeT,
  nextState: StateT,
  currentState: StateT,
) => StateT;

export type ComponentRenderPropT = (props: {}) => React.Node;

export type OverridesT = {
  Root?: OverrideT<SharedStylePropsT>,
  List?: OverrideT<SharedStylePropsT>,
  Item?: OverrideT<SharedStylePropsT>,
  DragHandle?: OverrideT<SharedStylePropsT>,
  CloseHandle?: OverrideT<SharedStylePropsT>,
  Label?: OverrideT<SharedStylePropsT>,
};

export type ChildT = React.Node;

export type ChildrenT = React.ChildrenArray<ChildT>;

// Props shared by all flavors of component
export type ListPropsT = {
  prop?: boolean,
  onClick?: () => void,
  removable?: boolean,
  overrides?: OverridesT,
  items?: Array<React.Node>,
  onChange?: ({oldIndex: number, newIndex: number}) => void,
};

// Props for stateful component
export type StatefulListPropsT = ListPropsT & {
  initialState?: StateT,
  removable?: boolean,
  onChange?: ({
    newState: Array<React.Node>,
    oldIndex: number,
    newIndex: number,
  }) => void,
  stateReducer?: StateReducerT,
};

// Props for stateful container
export type StatefulComponentContainerPropsT = $Diff<
  StatefulListPropsT,
  {children: ChildrenT},
> & {
  initialState?: StateT,
  children: (props: $Diff<ListPropsT, {children: ChildrenT}>) => React.Node,
};

export type SharedStylePropsArgT = {
  $isDragged: boolean,
  $isSelected: boolean,
  $isRemovable: boolean,
};

export type SharedStylePropsT = SharedStylePropsArgT & {
  $theme: ThemeT,
};
