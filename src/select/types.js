/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
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
