/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';
import {STATE_CHANGE_TYPE} from './constants.js';

export type StateT = {
  items: Array<React.Node>,
};

export type StateChangeTypeT = $Values<typeof STATE_CHANGE_TYPE>;

export type StateReducerT = (
  stateChangeType: StateChangeTypeT,
  nextState: StateT,
  currentState: StateT,
) => StateT;

export type OverridesT = {
  Root?: OverrideT<SharedStylePropsArgT>,
  List?: OverrideT<SharedStylePropsArgT>,
  Item?: OverrideT<SharedStylePropsArgT>,
  DragHandle?: OverrideT<SharedStylePropsArgT>,
  CloseHandle?: OverrideT<SharedStylePropsArgT>,
  Label?: OverrideT<SharedStylePropsArgT>,
};

type ChildrenT = Array<React.Node>;

// Props shared by all flavors of component
export type ListPropsT = {|
  /** Set if the list items should be removable */
  removable?: boolean,
  /** Set if the list items should be removable by dragging them far left or right */
  removableByMove?: boolean,
  /** Items (labels) to be rendered */
  items: Array<React.Node>,
  /** Handler for when drag and drop is finished and order changed or item is deleted (newIndex would be -1 in that case) */
  onChange: ({oldIndex: number, newIndex: number}) => mixed,
  overrides?: OverridesT,
|};

// Props for stateful component
export type StatefulListPropsT = {|
  /** Initial state populated into the component */
  initialState?: StateT,
  /** Reducer function to manipulate internal state updates. */
  stateReducer?: StateReducerT,
  /** Set if the list items should be removable */
  removable?: boolean,
  /** Set if the list items should be removable by dragging them far left or right */
  removableByMove?: boolean,
  /** Handler for when drag and drop is finished and order changed or item is deleted (newIndex would be -1 in that case) */
  onChange?: (params: {
    newState: Array<React.Node>,
    oldIndex: number,
    newIndex: number,
    targetRect: ClientRect,
  }) => mixed,
  overrides?: OverridesT,
|};

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
  $isRemovableByMove: boolean,
  $isOutOfBounds: boolean,
  $value: React.Node,
};
