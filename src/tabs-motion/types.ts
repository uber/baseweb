/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type * as React from 'react';
import type { ORIENTATION, FILL, STATE_CHANGE_TYPE } from './constants';

import type { Override } from '../helpers/overrides';
import type { IconProps } from '../icon';

export type Orientation = typeof ORIENTATION[keyof typeof ORIENTATION];
export type Fill = typeof FILL[keyof typeof FILL];
export type StateChange = typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE];

export type TabsOverrides = {
  Root?: Override;
  TabList?: Override;
  TabHighlight?: Override;
  TabBorder?: Override;
  EndEnhancerContainer?: Override;
  TabBar?: Override;
};

export type TabOverrides = {
  Tab?: Override;
  ArtworkContainer?: Override;
  TabPanel?: Override;
};

export type StatefulTabsState = {
  activeKey: React.Key;
};

export type StatefulTabsAction = {
  type: StateChange;
  payload: React.Key;
};

export type StatefulTabsReducer = (
  state: StatefulTabsState,
  action: StatefulTabsAction
) => StatefulTabsState;

export type onChange = (params: { activeKey: React.Key }) => void;

export type TabsProps = {
  children: React.ReactNode;
  activeKey?: React.Key;
  disabled?: boolean;
  fill?: Fill;
  orientation?: Orientation;
  activateOnFocus?: boolean;
  onChange?: onChange;
  overrides?: TabsOverrides;
  renderAll?: boolean;
  uid?: string;
  endEnhancer?: React.ReactNode;
};

export type StatefulTabsProps = {
  initialState?: StatefulTabsState;
  stateReducer?: StatefulTabsReducer;
} & TabsProps;

export type TabProps = {
  title?: React.ReactNode;
  key?: React.Key;
  tabRef?: React.Ref<HTMLButtonElement>;
  overrides?: TabOverrides;
  children?: React.ReactNode;
  artwork?: React.ComponentType<
    {
      size: IconProps['size'];
      color: IconProps['color'];
    } & IconProps
  >;
  disabled?: boolean;
};
