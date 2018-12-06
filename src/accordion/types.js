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

export type AccordionStateT = {
  expanded: Array<React.Key>,
};

export type PanelStateT = {
  expanded: boolean,
};

export type StateChangeTypeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type StateReducerT = (
  stateChangeType: StateChangeTypeT,
  nextState: AccordionStateT,
  currentState: AccordionStateT,
) => AccordionStateT;

export type PanelStateReducerT = (
  stateChangeType: StateChangeTypeT,
  nextState: PanelStateT,
  currentState: PanelStateT,
) => PanelStateT;

export type AccordionOverridesT<T> = {
  Root?: OverrideT<T>,
};

export type PanelOverridesT<T> = {
  PanelContainer?: OverrideT<T>,
  Header?: OverrideT<T>,
  ToggleIcon?: OverrideT<T>,
  Content?: OverrideT<T>,
};

export type OnChangeHandlerT = ({expanded: boolean}) => void;

export type AccordionOnChangeHandlerT = ({
  expanded: Array<React.Key>,
}) => void;

type ChildrenT = React.ChildrenArray<React.Element<*>>;

export type AccordionPropsT = {
  accordion?: boolean,
  children: ChildrenT,
  disabled?: boolean,
  initialState?: AccordionStateT,
  onChange?: AccordionOnChangeHandlerT,
  overrides?: AccordionOverridesT<
    $Diff<SharedStylePropsArgT, {$expanded?: ?boolean}>,
  >,
  stateReducer: StateReducerT,
};

export type PanelPropsT = {
  children: React.Node,
  disabled?: boolean,
  expanded?: boolean,
  key?: React.Key,
  onChange?: OnChangeHandlerT,
  onClick?: (e: Event) => void,
  onKeyDown?: (e: KeyboardEvent) => void,
  overrides?: PanelOverridesT<SharedStylePropsArgT>,
  title?: React.Node,
};

// Props for panel stateful container
export type StatefulPanelContainerPropsT = {
  children: (props: $Diff<PanelPropsT, {children: React.Node}>) => React.Node,
  initialState?: PanelStateT,
  onChange?: OnChangeHandlerT,
  stateReducer: PanelStateReducerT,
};

// Props for stateful panel
export type StatefulPanelPropsT = $Diff<
  StatefulPanelContainerPropsT,
  {
    children: (props: PanelPropsT) => React.Node,
    stateReducer: PanelStateReducerT,
  },
> &
  PanelPropsT;

export type SharedStylePropsArgT = {
  $disabled: ?boolean,
  $expanded?: ?boolean,
  // Styletron stuff
  $as?: string,
  // styled function wrapper related
  $style?: ?{},
  /* eslint-disable flowtype/no-weak-types */
  $ref?: React.Ref<any>,
};

export type SharedStylePropsT = SharedStylePropsArgT & {
  $theme: ThemeT,
};
