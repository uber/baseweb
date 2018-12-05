/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';
import type {ThemeT} from '../styles/index.js';
import {STATE_CHANGE_TYPE, ADJOINED, SIZE} from './constants.js';

export type AdjoinedT = $Keys<typeof ADJOINED>;

export type SizeT = $Keys<typeof SIZE>;

export type StateTypeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type InternalStateT = {
  isFocused?: boolean,
};

export type StateT = {
  value?: string,
};

export type StateReducerT = (
  stateType: StateTypeT,
  nextState: StateT,
  currentState: StateT,
) => StateT;

export type SharedPropsT = {
  $isFocused: boolean,
  $disabled: boolean,
  $error: boolean,
  $adjoined: AdjoinedT,
  $size: SizeT,
  $required: boolean,
  $theme: ThemeT,
};

export type PropsT = *;

export type BaseInputComponentsT = {
  InputContainer?: OverrideT<*>,
  Input?: OverrideT<*>,
  Before?: OverrideT<*>,
  After?: OverrideT<*>,
};

export type InputComponentsT = BaseInputComponentsT & {
  Root?: OverrideT<*>,
  StartEnhancer?: OverrideT<*>,
  EndEnhancer?: OverrideT<*>,
};

export type BaseInputPropsT<T> = {
  adjoined: AdjoinedT,
  autoFocus: boolean,
  disabled: boolean,
  error: boolean,
  id: string,
  name: string,
  inputRef: {current: ?HTMLInputElement},
  onBlur: (e: SyntheticFocusEvent<T>) => void,
  onChange?: (e: SyntheticInputEvent<T>) => void,
  onKeyDown?: (e: SyntheticInputEvent<T>) => void,
  onKeyPress?: (e: SyntheticInputEvent<T>) => void,
  onKeyUp?: (e: SyntheticInputEvent<T>) => void,
  onFocus: (e: SyntheticFocusEvent<T>) => void,
  overrides: BaseInputComponentsT,
  placeholder: string,
  required: boolean,
  size: SizeT,
  type: string,
  value?: string,
  rows?: number,
};

export type InputPropsT = {
  ...BaseInputPropsT<HTMLInputElement>,
  overrides: InputComponentsT,
  startEnhancer: ?(React.Node | ((props: PropsT) => React.Node)),
  endEnhancer: ?(React.Node | ((props: PropsT) => React.Node)),
  onFocus: (e: SyntheticFocusEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticFocusEvent<HTMLInputElement>) => void,
};

export type StatefulContainerPropsT<T> = {
  children: (props: PropsT) => React.Node,
  initialState?: StateT,
  stateReducer: StateReducerT,
  onChange: (e: SyntheticInputEvent<T>) => void,
};

type OmitPropsT = {
  overrides: InputComponentsT,
  children: ?(props: *) => React.Node,
};

type FullStPropsT = InputPropsT & StatefulContainerPropsT<HTMLInputElement>;

type StInputPropsDiffT = $Diff<FullStPropsT, OmitPropsT>;

export type StatefulInputPropsT = {
  ...StInputPropsDiffT,
  overrides?: InputComponentsT,
};
