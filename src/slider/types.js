/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {OverrideT} from '../helpers/overrides';
import {STATE_CHANGE_TYPE} from './constants';
import * as React from 'react';
export type ChangeActionT = $Keys<typeof STATE_CHANGE_TYPE>;
export type ParamsT = {
  value: Array<number>,
};
export type OverridesT = {
  Root?: OverrideT<*>,
  Axis?: OverrideT<*>,
  AxisRange?: OverrideT<*>,
  Tick?: OverrideT<*>,
  TickBar?: OverrideT<*>,
  Thumb?: OverrideT<*>,
};

export type PropsT = {
  value: Array<number>,
  range: Array<number>,
  step?: ?number,
  overrides?: OverridesT,
  tabIndex: number,
  error: boolean,
  autoFocus: boolean,
  disabled?: boolean,
  onChange: ({
    event: SyntheticEvent<HTMLElement> | MouseEvent,
    ...ParamsT,
  }) => void,
};

export type StateT = {
  value: Array<number>,
};

export type StatelessStateT = {
  isThumbMoving: boolean,
  currentThumb: number,
  currentMove: number,
  thumbRefs: Array<{current: ?React.ElementRef<*>}>,
};

export type StateReducerT = (
  stateType: string,
  nextState: StateT,
  currentState: StateT,
  event: SyntheticEvent<HTMLElement>,
) => StateT;

export type StatefulContainerPropsT = {
  overrides?: OverridesT,
  children: (*) => React$Node,
  initialState?: StateT,
  stateReducer: StateReducerT,
  onChange: ({event: SyntheticEvent<HTMLElement>, ...ParamsT}) => void,
  autoFocus?: boolean,
};

export type StatefulSliderPropsT = {
  overrides?: OverridesT,
  initialState: StateT,
  autoFocus?: boolean,
  onChange?: ({event: SyntheticEvent<HTMLElement>, ...ParamsT}) => void,
};
