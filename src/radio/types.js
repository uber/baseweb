/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {OverrideT} from '../helpers/overrides.js';
import type {ThemeT} from '../styles/types.js';

export type LabelPlacementT = 'top' | 'right' | 'bottom' | 'left';

export type OverridesT = {
  RadioMark?: OverrideT<*>,
  Label?: OverrideT<*>,
  Root?: OverrideT<*>,
  Input?: OverrideT<*>,
};

export type DefaultPropsT = {
  value: string,
  disabled: boolean,
  isError: boolean,
  autoFocus: boolean,
  labelPlacement: LabelPlacementT,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type PropsT = {
  overrides?: OverridesT,
  children?: Array<React$Node>,
  value?: string,
  disabled?: boolean,
  required?: boolean,
  isError?: boolean,
  autoFocus?: boolean,
  align?: string,
  name?: string,
  labelPlacement?: LabelPlacementT,
  $theme?: ThemeT,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type StateT = {
  value?: string,
};

export type StateReducerT = (
  stateType: string,
  nextState: StateT,
  currentState: StateT,
  event: SyntheticInputEvent<HTMLInputElement>,
) => StateT;

export type StatelessStateT = {};

export type DefaultStatefulPropsT = {
  initialState: StateT,
  children?: Array<React$Node>,
  stateReducer: StateReducerT,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type StatefulContainerPropsT = {
  overrides?: OverridesT,
  children?: (props: PropsT) => React$Node,
  initialState?: StateT,
  stateReducer: StateReducerT,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  autoFocus?: boolean,
};

export type StatefulRadioGroupPropsT = {
  overrides?: OverridesT,
  children?: Array<React$Node>,
  initialState?: StateT,
  autoFocus?: boolean,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};
