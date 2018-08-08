/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
// @flow
import * as React from 'react';
import type {OverrideT} from '../../helpers/overrides';
import type {ThemeT} from '../../styles';
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
  $error: boolean | React.Node,
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
  Label?: OverrideT<*>,
  StartEnhancer?: OverrideT<*>,
  EndEnhancer?: OverrideT<*>,
  Caption?: OverrideT<*>,
};

export type BaseInputPropsT = {
  adjoined: AdjoinedT,
  autoFocus: boolean,
  disabled: boolean,
  error: boolean | React.Node | ((props: PropsT) => React.Node),
  id: string,
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
  label: ?(React.Node | ((props: PropsT) => React.Node)),
  caption: ?(React.Node | ((props: PropsT) => React.Node)),
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
