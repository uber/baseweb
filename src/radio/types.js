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

import type {OverrideT} from '../helpers/overrides';
import type {ThemeT} from '../styles/types';

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
