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
import {STATE_CHANGE_TYPE} from './constants';

export type ChangeActionT = $Values<typeof STATE_CHANGE_TYPE>;

export type LabelT = *;
export type OptionT = {
  id: string,
  label: LabelT,
  disabled?: boolean,
};

export type ParamsT = {
  id?: string,
  label?: LabelT,
  selectedOptions?: Array<OptionT>,
  textValue?: string,
  type: ChangeActionT,
};

export type OverridesT = {
  Root?: OverrideT<*>,
  Input?: OverrideT<*>,
  SearchIcon?: OverrideT<*>,
  InputContainer?: OverrideT<*>,
  Tag?: OverrideT<*>,
  Option?: OverrideT<*>,
  DropDown?: OverrideT<*>,
  SearchIcon?: OverrideT<*>,
  DropDownItem?: OverrideT<*>,
};

export type OverridesDropDownT = {
  Option?: OverrideT<*>,
  DropDown?: OverrideT<*>,
  SearchIcon?: OverrideT<*>,
  DropDownItem?: OverrideT<*>,
};

export type DefaultPropsT = {
  overrides?: OverridesT,
  options?: Array<OptionT>,
  error: string,
  autoFocus: boolean,
  onChange: (e: SyntheticEvent<HTMLInputElement>, params: ParamsT) => void,
  onMouseEnter: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseDown: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseUp: (e: SyntheticEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticEvent<HTMLInputElement>) => void,
};

export type PropsT = {
  options: Array<OptionT>,
  overrides?: OverridesT,
  selectedOptions: Array<OptionT>,
  rows: number,
  textValue: string,
  multiple: boolean,
  error?: string,
  autoFocus?: boolean,
  type?: string,
  simpleFilter?: boolean,
  label?: string,
  placeholder?: string,
  getOptionLabel?: OptionT => React$Node,
  getSelectedOptionLabel?: OptionT => React$Node,
  $theme?: *,
  onChange: (e: SyntheticEvent<HTMLInputElement>, params: ParamsT) => void,
  onMouseEnter: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseDown: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseUp: (e: SyntheticEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticEvent<HTMLInputElement>) => void,
};

export type StatelessStateT = {
  textValue: string,
  selectedOptions: Array<OptionT>,
  isDropDownOpen: boolean,
  filteredOptions?: ?Array<OptionT>,
};

export type StateT = {
  textValue?: string,
  selectedOptions?: Array<OptionT>,
};

export type StateReducerT = (
  stateType: string,
  nextState: StateT,
  currentState: StateT,
  event: SyntheticEvent<HTMLInputElement>,
  params: ParamsT,
) => StateT;

export type DefaultStatefulPropsT = {
  initialState: StateT,
  children?: (*) => React$Node,
  stateReducer: StateReducerT,
  onChange: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseEnter: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticEvent<HTMLInputElement>) => void,
};

export type StatefulContainerPropsT = {
  overrides?: OverridesT,
  children?: (*) => React$Node,
  initialState?: StateT,
  stateReducer: StateReducerT,
  onChange?: (e: SyntheticEvent<HTMLInputElement>, params: ParamsT) => void,
  onMouseEnter?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void,
  autoFocus?: boolean,
};

export type StatefulSelectPropsT = {
  overrides?: OverridesT,
  options?: Array<OptionT>,
  initialState?: StateT,
  autoFocus?: boolean,
  onChange?: (e: SyntheticEvent<HTMLInputElement>, params: ParamsT) => void,
  onMouseEnter?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void,
};

export type DropDownPropsT = {
  overrides?: OverridesDropDownT,
  options: Array<OptionT>,
  rows: number,
  selectedOptions: Array<OptionT>,
  isDropDownOpen: boolean,
  type: string,
  getOptionLabel: OptionT => React$Node,
  onChange: (
    e: SyntheticEvent<HTMLInputElement>,
    type: ChangeActionT,
    id: string,
    label: LabelT,
  ) => void,
};
