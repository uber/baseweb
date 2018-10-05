/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {OverrideT} from '../helpers/overrides';
import {STATE_CHANGE_TYPE} from './constants';

export type ChangeActionT = $Values<typeof STATE_CHANGE_TYPE>;

export type ValueT = Array<*>;
export type ParamsT = {
  value: ValueT,
  type: ChangeActionT,
};

export type OverridesT = {
  Root?: OverrideT<*>,
  Axis?: OverrideT<*>,
  Tick?: OverrideT<*>,
  TickBar?: OverrideT<*>,
  Thumb?: OverrideT<*>,
};

export type PropsT = {
  value: ValueT,
  range: Array<*>,
  step?: number,
  overrides?: OverridesT,
  tabIndex: number,
  error: boolean,
  autoFocus: boolean,
  disabled?: boolean,
  $theme?: *,
  onChange: (e: MouseEvent, params: ParamsT) => void,
  onMouseEnter: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseDown: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseUp: (e: SyntheticEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticEvent<HTMLInputElement>) => void,
};

export type StateT = {
  value?: ValueT,
};

export type StateReducerT = (
  stateType: string,
  nextState: StateT,
  currentState: StateT,
  event: SyntheticEvent<HTMLInputElement>,
) => StateT;

export type StatelessStateT = {
  isThumbMoving: boolean,
  currentThumb: number,
  currentMove: number,
};

export type StatefulContainerPropsT = {
  overrides?: OverridesT,
  children?: (*) => React$Node,
  initialState?: StateT,
  stateReducer: StateReducerT,
  onChange: (e: SyntheticEvent<HTMLInputElement>, params: ParamsT) => void,
  onMouseEnter?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void,
  autoFocus?: boolean,
};

export type StatefulSliderPropsT = {
  overrides?: OverridesT,
  value?: ValueT,
  initialState?: StateT,
  autoFocus?: boolean,
  onChange?: (e: SyntheticEvent<HTMLInputElement>, params: ParamsT) => void,
  onMouseEnter?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void,
};
