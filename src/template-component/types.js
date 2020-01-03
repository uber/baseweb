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
  prop: boolean,
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
};

export type ChildT = React.Node;

export type ChildrenT = React.ChildrenArray<ChildT>;

// Props shared by all flavors of component
export type ComponentPropsT = {
  children: ChildrenT,
  prop?: boolean,
  onClick?: () => void,
  overrides?: OverridesT,
};

// Props for stateful component
export type StatefulComponentPropsT = ComponentPropsT & {
  children: ChildrenT,
  initialState?: StateT,
  stateReducer?: StateReducerT,
};

// Props for stateful container
export type StatefulComponentContainerPropsT = $Diff<
  StatefulComponentPropsT,
  {children: ChildrenT},
> & {
  initialState?: StateT,
  children: (
    props: $Diff<ComponentPropsT, {children: ChildrenT}>,
  ) => React.Node,
};

export type SharedStylePropsT = {
  $prop: boolean,
};
