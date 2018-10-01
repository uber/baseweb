/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {OverrideT} from '../helpers/overrides';
import {} from './constants';

export type OverridesT = {
  Root?: OverrideT<*>,
  Axis?: OverrideT<*>,
  Tick?: OverrideT<*>,
  TickBar?: OverrideT<*>,
  Thumb?: OverrideT<*>,
};

export type PropsT = {
  value: Array<number>,
  range: Array<number>,
  overrides?: OverridesT,
  tabIndex: number,
  error: boolean,
  autoFocus: boolean,
  disabled?: boolean,
  onChange: (e: SyntheticEvent<HTMLInputElement>, params: ParamsT) => void,
};

export type StateT = {
  value?: Array<number>,
};

export type StateReducerT = (
  stateType: string,
  nextState: StateT,
  currentState: StateT,
  event: SyntheticEvent<HTMLInputElement>,
) => StateT;

export type StatefulContainerPropsT = {
  overrides?: OverridesT,
  children?: (*) => React$Node,
  initialState?: StateT,
  stateReducer: StateReducerT,
  onChange: (e: SyntheticEvent<HTMLInputElement>, params: ParamsT) => void,
  autoFocus?: boolean,
};

export type StatefulSliderPropsT = {
  overrides?: OverridesT,
  value?: Array<number>,
  initialState?: StateT,
  autoFocus?: boolean,
  onChange?: (e: SyntheticEvent<HTMLInputElement>, params: ParamsT) => void,
};
