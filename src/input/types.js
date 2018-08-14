/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides';
import type {ThemeT} from '../styles';
import {STATE_CHANGE_TYPE, ADJOINED, SIZE} from './constants';

type SyntheticEventT = SyntheticEvent<HTMLElement>;

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
  // TODO: Next two seems like shouldn't be in components prop
  Before?: OverrideT<*>,
  After?: OverrideT<*>,
};

export type InputComponentsT = BaseInputComponentsT & {
  Root?: OverrideT<*>,
  StartEnhancer?: OverrideT<*>,
  EndEnhancer?: OverrideT<*>,
};

export type BaseInputPropsT = {
  adjoined: AdjoinedT,
  autoFocus: boolean,
  disabled: boolean,
  error: boolean,
  id: string,
  name: string,
  inputRef: {current: ?React.ElementRef<'input'>},
  onBlur: (e: SyntheticEventT) => void,
  onChange: (e: SyntheticEventT) => void,
  onFocus: (e: SyntheticEventT) => void,
  overrides: BaseInputComponentsT,
  placeholder: string,
  required: boolean,
  size: SizeT,
  type: string,
  value: string,
  rows?: number,
};

export type InputPropsT = {
  ...BaseInputPropsT,
  overrides: InputComponentsT,
  startEnhancer: ?(React.Node | ((props: PropsT) => React.Node)),
  endEnhancer: ?(React.Node | ((props: PropsT) => React.Node)),
  onFocus: (e: SyntheticEventT) => void,
  onBlur: (e: SyntheticEventT) => void,
};

export type StatefulContainerPropsT = {
  children: (props: PropsT) => React.Node,
  initialState?: StateT,
  stateReducer: StateReducerT,
  onChange: (e: SyntheticEventT) => void,
};

type OmitPropsT = {
  overrides: InputComponentsT,
  children: ?(props: *) => React.Node,
};

type FullStPropsT = InputPropsT & StatefulContainerPropsT;

type StInputPropsDiffT = $Diff<FullStPropsT, OmitPropsT>;

export type StatefulInputPropsT = {
  ...StInputPropsDiffT,
  overrides?: InputComponentsT,
};
