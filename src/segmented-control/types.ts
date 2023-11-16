/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import type * as React from 'react';
import type { FILL, STATE_CHANGE_TYPE } from './constants';

import type { Override } from '../helpers/overrides';
import type { IconProps } from '../icon';

export type Fill = (typeof FILL)[keyof typeof FILL];
export type StateChange = (typeof STATE_CHANGE_TYPE)[keyof typeof STATE_CHANGE_TYPE];

export type SegmentedControlOverrides = {
  Root?: Override;
  SegmentList?: Override;
  Active?: Override;
};

export type SegmentOverrides = {
  Segment?: Override;
  LabelBlock?: Override;
  ArtworkContainer?: Override;
  Label?: Override;
  Badge?: Override;
  BadgeHint?: Override;
  Description?: Override;
};

export type StatefulSegmentedControlState = {
  activeKey: React.Key;
};

export type StatefulSegmentedControlAction = {
  type: StateChange;
  payload: React.Key;
};

export type StatefulSegmentedControlReducer = (
  state: StatefulSegmentedControlState,
  action: StatefulSegmentedControlAction
) => StatefulSegmentedControlState;

export type onChange = (params: { activeKey: React.Key }) => void;

export type SegmentedControlProps = {
  children: React.ReactNode;
  activeKey?: React.Key;
  disabled?: boolean;
  fill?: Fill;
  activateOnFocus?: boolean;
  onChange?: onChange;
  overrides?: SegmentedControlOverrides;
  height?: string;
  uid?: string;
  width?: string;
};

export type StatefulSegmentedControlProps = {
  initialState?: StatefulSegmentedControlState;
  stateReducer?: StatefulSegmentedControlReducer;
} & SegmentedControlProps;

export type SegmentProps = {
  label?: React.ReactNode;
  description?: React.ReactNode;
  badge?: React.ReactNode;
  badgeHint?: boolean;
  key?: React.Key;
  segmentRef?: React.Ref<HTMLButtonElement>;
  overrides?: SegmentOverrides;
  artwork?: React.ComponentType<
    {
      size: IconProps['size'];
      color: IconProps['color'];
    } & IconProps
  >;
  disabled?: boolean;
};
