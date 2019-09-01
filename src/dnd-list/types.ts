/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type { OverrideT } from '../helpers/overrides';
import { STATE_CHANGE_TYPE } from './constants';

export type StateT = {
  items: Array<React.ReactNode>;
};

export type StateChangeTypeT = typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE];

export type StateReducerT = (
  stateChangeType: StateChangeTypeT,
  nextState: StateT,
  currentState: StateT
) => StateT;

export type OverridesT = {
  Root?: OverrideT;
  List?: OverrideT;
  Item?: OverrideT;
  DragHandle?: OverrideT;
  CloseHandle?: OverrideT;
  Label?: OverrideT;
};

type ChildrenT = Array<React.ReactNode> | React.ReactNode;

// Props shared by all flavors of component
export type ListPropsT = {
  /** Set if the list items should be removable */
  removable?: boolean;
  /** Set if the list items should be removable by dragging them far left or right */
  removableByMove?: boolean;
  /** Items (labels) to be rendered */
  items: Array<React.ReactNode>;
  /** Handler for when drag and drop is finished and order changed or item is deleted (newIndex would be -1 in that case) */
  onChange: (a: { oldIndex: number; newIndex: number }) => unknown;
  overrides?: OverridesT;
};

// Props for stateful component
export type StatefulListPropsT = {
  /** Initial state populated into the component */
  initialState?: StateT;
  /** Reducer function to manipulate internal state updates. */
  stateReducer?: StateReducerT;
  /** Set if the list items should be removable */
  removable?: boolean;
  /** Set if the list items should be removable by dragging them far left or right */
  removableByMove?: boolean;
  /** Handler for when drag and drop is finished and order changed or item is deleted (newIndex would be -1 in that case) */
  onChange?: (params: {
    newState: Array<React.ReactNode>;
    oldIndex: number;
    newIndex: number;
    targetRect: ClientRect;
  }) => unknown;
  overrides?: OverridesT;
};

// Props for stateful container
export type StatefulComponentContainerPropsT = Omit<StatefulListPropsT, 'children'> & {
  initialState?: StateT;
  children: (props: Omit<ListPropsT, 'children'>) => React.ReactNode;
};

export type SharedStylePropsArgT = {
  $isDragged: boolean;
  $isSelected: boolean;
  $isFocusVisible: boolean;
  $isRemovable: boolean;
  $isRemovableByMove: boolean;
  $isOutOfBounds: boolean;
  $value: React.ReactNode;
  $index: number; // todo: missing field in flow types
};
