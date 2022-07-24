/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type { Override } from '../helpers/overrides';
import { STATE_CHANGE_TYPE } from './constants';

export type State = {
  items: Array<React.ReactNode>;
};

export type StateChangeType = typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE];

export type StateReducer = (
  stateChangeType: StateChangeType,
  nextState: State,
  currentState: State
) => State;

export type ListOverrides = {
  Root?: Override;
  List?: Override;
  Item?: Override;
  DragHandle?: Override;
  CloseHandle?: Override;
  Label?: Override;
};

type Children = Array<React.ReactNode> | React.ReactNode;

// Props shared by all flavors of component
export type ListProps = {
  /** Set if the list items should be removable */
  removable?: boolean;
  /** Set if the list items should be removable by dragging them far left or right */
  removableByMove?: boolean;
  /** Items (labels) to be rendered */
  items: Array<React.ReactNode>;
  /** Handler for when drag and drop is finished and order changed or item is deleted (newIndex would be -1 in that case) */
  onChange: (a: { oldIndex: number; newIndex: number }) => unknown;
  overrides?: ListOverrides;
};

// Props for stateful component
export type StatefulListProps = {
  /** Initial state populated into the component */
  initialState?: State;
  /** Reducer function to manipulate internal state updates. */
  stateReducer?: StateReducer;
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
  overrides?: ListOverrides;
};

// Props for stateful container
export type StatefulComponentContainerProps = Omit<StatefulListProps, 'children'> & {
  initialState?: State;
  children: (props: Omit<ListProps, 'children'>) => React.ReactNode;
};

export type SharedStylePropsArg = {
  $isDragged: boolean;
  $isSelected: boolean;
  $isFocusVisible: boolean;
  $isRemovable: boolean;
  $isRemovableByMove: boolean;
  $isOutOfBounds: boolean;
  $value: React.ReactNode;
  $index: number; // todo(flow->ts): missing field in flow types
};
