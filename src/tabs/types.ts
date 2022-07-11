/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type { OverrideT } from '../helpers/overrides';
import { ORIENTATION, STATE_CHANGE_TYPE } from './constants';

export type SharedStylePropsArgT = {
  $disabled?: boolean;
  $active?: boolean;
  $orientation?: typeof ORIENTATION[keyof typeof ORIENTATION];
  $isFocusVisible?: boolean;
};

export type StatefulTabsStateT = {
  activeKey: React.Key;
};

export type StateChangeTypeT = keyof typeof STATE_CHANGE_TYPE;

export type StateReducerT = (
  stateChangeType: StateChangeTypeT,
  nextState: StatefulTabsStateT,
  currentState: StatefulTabsStateT
) => StatefulTabsStateT;

export type TabsOverridesT = {
  Root?: OverrideT;
  TabBar?: OverrideT;
  TabContent?: OverrideT;
  Tab?: OverrideT;
};

export type TabOverridesT = {
  Tab?: OverrideT;
};

export type OnChangeHandlerT = (a: { activeKey: React.Key }) => unknown;

export type TabsPropsT = {
  /** An array of Tab components. */
  children: Array<React.ReactElement<any>> | React.ReactElement<any>;
  /**  Key of the the tab to be selected. */
  activeKey: React.Key;
  /** If set to true all its tabs will be disabled */
  disabled?: boolean;
  /** Change handler that is called every time a new tab is selected */
  onChange?: OnChangeHandlerT;
  /** Sets the orientation of the Tab component */
  orientation?: typeof ORIENTATION[keyof typeof ORIENTATION];
  /** Renders all tab content for SEO purposes regardless of tab active state */
  renderAll?: boolean;
  overrides?: TabsOverridesT;
};

export type StatefulTabsPropsT = Omit<TabsPropsT, 'activeKey'> & {
  /**  Initial state of the component */
  initialState?: StatefulTabsStateT;
  /**  A state change handler. */
  stateReducer: StateReducerT;
};

export type TabPanelPropsT = {
  children?: React.ReactNode;
  /** Sets the tab to disabled */
  disabled?: boolean;
  active?: boolean;
  /**  Unique key for the tab. Defaults to the child index. */
  key?: React.Key;
  /** onClick handler for the Tab element */
  onClick?: (e: Event) => unknown;
  /** onKeyDown handler for the Tab element */
  onKeyDown?: (e: KeyboardEvent) => unknown;
  /** onSelect handler for the Tab element */
  onSelect?: () => unknown;
  overrides?: TabOverridesT;
  /** Title of the Tab to be shown in the Tab bar */
  title?: React.ReactNode;
};

export type TabPropsT = TabPanelPropsT & {
  id?: string;
  $orientation?: typeof ORIENTATION[keyof typeof ORIENTATION];
};
