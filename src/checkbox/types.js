/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {OverrideT} from '../helpers/overrides';
import {STYLE_TYPE} from './constants';

export type LabelPlacementT = 'top' | 'right' | 'bottom' | 'left';
export type StyleTypeT = $Keys<typeof STYLE_TYPE>;

export type OverridesT = {
  Checkmark?: OverrideT<*>,
  Label?: OverrideT<*>,
  Root?: OverrideT<*>,
  Input?: OverrideT<*>,
};

export type DefaultPropsT = {
  children?: React$Node,
  checked: boolean,
  disabled: boolean,
  isError: boolean,
  autoFocus: boolean,
  isIndeterminate: boolean,
  inputRef: {current: ?HTMLInputElement},
  checkmarkType: StyleTypeT,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseDown: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseUp: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type PropsT = {
  children?: React$Node,
  overrides?: OverridesT,
  checked?: boolean,
  disabled?: boolean,
  required?: boolean,
  isError?: boolean,
  inputRef: {current: ?HTMLInputElement},
  autoFocus?: boolean,
  type?: string,
  name?: string,
  value?: string,
  isIndeterminate?: boolean,
  labelPlacement?: LabelPlacementT,
  checkmarkType: StyleTypeT,
  $theme?: *,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseDown: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseUp: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type StatelessStateT = {
  isFocused: boolean,
  isHovered: boolean,
  isActive: boolean,
};

export type StateT = {
  checked?: boolean,
  isIndeterminate?: boolean,
};

export type StateReducerT = (
  stateType: string,
  nextState: StateT,
  currentState: StateT,
  event: SyntheticInputEvent<HTMLInputElement>,
) => StateT;

export type DefaultStatefulPropsT = {
  initialState: StateT,
  children?: (*) => React$Node,
  stateReducer: StateReducerT,
  onChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};

export type StatefulContainerPropsT = {
  overrides?: OverridesT,
  children?: (*) => React$Node,
  initialState?: StateT,
  stateReducer: StateReducerT,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  autoFocus?: boolean,
};

export type StatefulCheckboxPropsT = {
  overrides?: OverridesT,
  children?: React$Node,
  initialState?: StateT,
  autoFocus?: boolean,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseEnter?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticInputEvent<HTMLInputElement>) => void,
};
