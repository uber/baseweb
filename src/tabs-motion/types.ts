/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { ORIENTATION, FILL, STATE_CHANGE_TYPE } from './constants';

import type { OverrideT } from '../helpers/overrides';
import type { IconPropsT } from '../icon';

export type OrientationT = typeof ORIENTATION[keyof typeof ORIENTATION];
export type FillT = typeof FILL[keyof typeof FILL];
export type StateChangeT = typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE];

export type TabsOverridesT = {
  Root?: OverrideT;
  TabList?: OverrideT;
  TabHighlight?: OverrideT;
  TabBorder?: OverrideT;
};

export type TabOverridesT = {
  Tab?: OverrideT;
  ArtworkContainer?: OverrideT;
  TabPanel?: OverrideT;
};

export type StatefulTabsStateT = {
  activeKey: React.Key;
};

export type StatefulTabsActionT = {
  type: StateChangeT;
  payload: React.Key;
};

export type StatefulTabsReducerT = (
  state: StatefulTabsStateT,
  action: StatefulTabsActionT
) => StatefulTabsStateT;

export type onChangeT = (params: { activeKey: React.Key }) => void;

export type TabsPropsT = {
  children: React.ReactNode;
  activeKey?: React.Key;
  disabled?: boolean;
  fill?: FillT;
  orientation?: OrientationT;
  activateOnFocus?: boolean;
  onChange?: onChangeT;
  overrides?: TabsOverridesT;
  renderAll?: boolean;
  uid?: string;
};

export type StatefulTabsPropsT = {
  initialState?: StatefulTabsStateT;
  stateReducer?: StatefulTabsReducerT;
} & TabsPropsT;

export type TabPropsT = {
  title?: React.ReactNode;
  key?: React.Key;
  tabRef?: React.Ref<HTMLButtonElement>;
  overrides?: TabOverridesT;
  children?: React.ReactNode;
  artwork?: React.ComponentType<
    {
      size: IconPropsT['size'];
      color: IconPropsT['color'];
    } & IconPropsT
  >;
  disabled?: boolean;
};
