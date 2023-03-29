/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { Override } from '../helpers/overrides';
import type { ORIENTATION, STATE_CHANGE_TYPE } from './constants';

export type SharedStylePropsArg = {
  $disabled?: boolean;
  $active?: boolean;
  $orientation?: (typeof ORIENTATION)[keyof typeof ORIENTATION];
  $isFocusVisible?: boolean;
};

export type StatefulTabsState = {
  activeKey: React.Key;
};

export type StateChangeType = keyof typeof STATE_CHANGE_TYPE;

export type StateReducer = (
  stateChangeType: StateChangeType,
  nextState: StatefulTabsState,
  currentState: StatefulTabsState
) => StatefulTabsState;

export type TabsOverrides = {
  Root?: Override;
  TabBar?: Override;
  TabContent?: Override;
  Tab?: Override;
};

export type TabOverrides = {
  Tab?: Override;
};

export type OnChangeHandler = (a: { activeKey: React.Key }) => unknown;

export type TabsProps = {
  /** An array of Tab components. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: Array<React.ReactElement<any>> | React.ReactElement<any>;
  /**  Key of the the tab to be selected. */
  activeKey: React.Key;
  /** If set to true all its tabs will be disabled */
  disabled?: boolean;
  /** Change handler that is called every time a new tab is selected */
  onChange?: OnChangeHandler;
  /** Sets the orientation of the Tab component */
  orientation?: (typeof ORIENTATION)[keyof typeof ORIENTATION];
  /** Renders all tab content for SEO purposes regardless of tab active state */
  renderAll?: boolean;
  overrides?: TabsOverrides;
};

export type StatefulTabsProps = Omit<TabsProps, 'activeKey'> & {
  /**  Initial state of the component */
  initialState?: StatefulTabsState;
  /**  A state change handler. */
  stateReducer: StateReducer;
};

export type TabPanelProps = {
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
  overrides?: TabOverrides;
  /** Title of the Tab to be shown in the Tab bar */
  title?: React.ReactNode;
};

export type TabProps = TabPanelProps & {
  id?: string;
  $orientation?: (typeof ORIENTATION)[keyof typeof ORIENTATION];
};
