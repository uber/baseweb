/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {OverrideT} from '../helpers/overrides';
import {STATE_CHANGE_TYPE} from './constants';
import type {OnItemSelectFnT} from '../menu/types';

export type ChangeActionT = $Values<typeof STATE_CHANGE_TYPE>;

export type LabelT = *;
export type OptionT = {
  id: string,
  label: LabelT,
  disabled?: boolean,
};

export type ParamsT = {
  option?: OptionT,
  selectedOptions?: Array<OptionT>,
  textValue?: string,
  type: ChangeActionT,
};

export type OverridesT = {
  Root?: OverrideT<*>,
  Input?: OverrideT<*>,
  SelectComponentIcon?: OverrideT<*>,
  InputContainer?: OverrideT<*>,
  Tag?: OverrideT<*>,
  Option?: OverrideT<*>,
  DropDown?: OverrideT<*>,
  SelectComponentIcon?: OverrideT<*>,
  DropDownItem?: OverrideT<*>,
  SingleSelection?: OverrideT<*>,
  SelectSpinner?: OverrideT<*>,
};

export type OverridesDropDownT = {
  Option?: OverrideT<*>,
  DropDown?: OverrideT<*>,
  SelectComponentIcon?: OverrideT<*>,
  DropDownItem?: OverrideT<*>,
  SelectSpinner?: OverrideT<*>,
};

export type PropsT = {
  options: Array<OptionT> | ((query?: *) => Promise<Array<OptionT>>),
  overrides?: OverridesT,
  selectedOptions: Array<OptionT>,
  rows: number,
  tabIndex: number,
  multiple: boolean,
  error: boolean,
  autoFocus: boolean,
  type?: string,
  disabled?: boolean,
  filterable: boolean,
  filterOption: (OptionT, string) => boolean,
  placeholder?: string,
  getOptionLabel?: OptionT => React$Node,
  getSelectedOptionLabel?: OptionT => React$Node,
  $theme?: *,
  onTextInputChange: (e: SyntheticEvent<HTMLInputElement>) => void,
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
  options: Array<OptionT>,
  optionsLoaded: boolean,
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

export type StatefulContainerPropsT = {
  overrides?: OverridesT,
  children?: (*) => React$Node,
  initialState?: StateT,
  stateReducer: StateReducerT,
  onTextInputChange: (e: SyntheticEvent<HTMLInputElement>) => void,
  onChange: (e: SyntheticEvent<HTMLInputElement>, params: ParamsT) => void,
  onMouseEnter?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void,
  autoFocus?: boolean,
};

export type StatefulSelectPropsT = {
  overrides?: OverridesT,
  options?: Array<OptionT> | ((query?: string) => Promise<Array<OptionT>>),
  initialState?: StateT,
  autoFocus?: boolean,
  onTextInputChange?: (e: SyntheticEvent<HTMLInputElement>) => void,
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
  optionsLoaded: boolean,
  type: string,
  getOptionLabel: OptionT => React$Node,
  onItemSelect: OnItemSelectFnT,
  onChange: (e: SyntheticEvent<HTMLInputElement>, option: OptionT) => void,
};
