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
  prop: boolean;
};

export type StateChangeTypeT = keyof typeof STATE_CHANGE_TYPE;

export type StateReducerT = (
  stateChangeType: StateChangeTypeT,
  nextState: StateT,
  currentState: StateT
) => StateT;

export type ComponentRenderPropT = (props: {}) => React.ReactNode;

export type OverridesT = {
  Root?: OverrideT;
};

export type ChildT = React.ReactNode;

export type ChildrenT = Array<ChildT> | ChildT;

// Props shared by all flavors of component
export type ComponentPropsT = {
  children: ChildrenT;
  prop?: boolean;
  onClick?: () => void;
  overrides?: OverridesT;
};

// Props for stateful component
export type StatefulComponentPropsT = ComponentPropsT & {
  children: ChildrenT;
  initialState?: StateT;
  stateReducer?: StateReducerT;
};

// Props for stateful container
export type StatefulComponentContainerPropsT = Omit<StatefulComponentPropsT, 'children'> & {
  initialState?: StateT;
  children: (props: Omit<ComponentPropsT, 'children'>) => React.ReactNode;
};

export type SharedStylePropsT = {
  $prop: boolean;
};
