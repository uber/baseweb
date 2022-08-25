/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { Override } from '../helpers/overrides';
import { STATE_CHANGE_TYPE } from './constants';

export type State = {
  prop: boolean;
};

export type StateChangeType = keyof typeof STATE_CHANGE_TYPE;

export type StateReducer = (
  stateChangeType: StateChangeType,
  nextState: State,
  currentState: State
) => State;

export type ComponentRenderProp = (props: {}) => React.ReactNode;

export type Overrides = {
  Root?: Override;
};

export type Child = React.ReactNode;

export type Children = Array<Child> | Child;

// Props shared by all flavors of component
export type ComponentProps = {
  children: Children;
  prop?: boolean;
  onClick?: () => void;
  overrides?: Overrides;
};

// Props for stateful component
export type StatefulComponentProps = ComponentProps & {
  children: Children;
  initialState?: State;
  stateReducer?: StateReducer;
};

// Props for stateful container
export type StatefulComponentContainerProps = Omit<StatefulComponentProps, 'children'> & {
  initialState?: State;
  children: (props: Omit<ComponentProps, 'children'>) => React.ReactNode;
};

export type SharedStyleProps = {
  $prop: boolean;
};
