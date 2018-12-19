/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import {default as TabPanel} from './tab-panel.js';
import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';
import {ORIENTATION, STATE_CHANGE_TYPE} from './constants.js';

export type StatefulTabsStateT = {
  activeKey: React.Key,
};

export type StateChangeTypeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type StateReducerT = (
  stateChangeType: StateChangeTypeT,
  nextState: StatefulTabsStateT,
  currentState: StatefulTabsStateT,
) => StatefulTabsStateT;

export type TabsOverridesT<T> = {
  Root?: OverrideT<T>,
  TabBar?: OverrideT<T>,
  TabContent?: OverrideT<T>,
};

export type TabOverridesT<T> = {
  Tab?: OverrideT<T>,
};

export type OnChangeHandlerT = ({activeKey: React.Key}) => void;

export type TabsPropsT = {
  children: React.ChildrenArray<React.Element<typeof TabPanel>>,
  activeKey: React.Key,
  disabled?: boolean,
  onChange?: OnChangeHandlerT,
  orientation?: $Values<typeof ORIENTATION>,
  overrides?: TabsOverridesT<$Diff<SharedStylePropsArgT, {$active?: ?boolean}>>,
};

export type StatefulTabsPropsT = $Diff<TabsPropsT, {activeKey: React.Key}> & {
  initialState?: StatefulTabsStateT,
  stateReducer: StateReducerT,
};

export type TabPanelPropsT = {
  children: React.ChildrenArray<React.Node>,
  disabled?: boolean,
  active?: boolean,
  key?: React.Key,
  onClick?: (e: Event) => void,
  onKeyDown?: (e: KeyboardEvent) => void,
  onSelect?: () => void,
  overrides?: TabOverridesT<SharedStylePropsArgT>,
  title?: React.Node,
};

export type TabPropsT = TabPanelPropsT & {
  id?: string,
  $orientation?: $Values<typeof ORIENTATION>,
};

export type SharedStylePropsArgT = {
  $disabled: ?boolean,
  $active?: ?boolean,
  $orientation?: $Values<typeof ORIENTATION>,
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
