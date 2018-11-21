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

export type OptionT = {
  id?: string,
  label?: React.Node,
  disabled?: boolean,
  clearableValue?: boolean,
};

export type ValueT = Array<OptionT> | $Shape<OptionT>;

export type OnChangeParamsT = {
  type: ChangeActionT,
  value: ValueT,
  option?: OptionT,
};

export type OverridesT = {
  Root?: OverrideT<*>,
  ControlContainer?: OverrideT<*>,
  Placeholder?: OverrideT<*>,
  ValueContainer?: OverrideT<*>,
  SingleValue?: OverrideT<*>,
  MultiValue?: OverrideT<*>,
  InputContainer?: OverrideT<*>,
  Input?: OverrideT<*>,
  SelectArrow?: OverrideT<*>,
  ClearIcon?: OverrideT<*>,
  LoadingIndicator?: OverrideT<*>,
  DropDown?: OverrideT<*>,
  DropDownOption?: OverrideT<*>,
  OptionValue?: OverrideT<*>,
};

export type OverridesDropDownT = {
  DropDown?: OverrideT<*>,
  DropDownOption?: OverrideT<*>,
  OptionValue?: OverrideT<*>,
};

export type PropsT = {
  autoFocus: boolean,
  options: Array<OptionT>,
  overrides?: OverridesT,
  selectedOptions: Array<OptionT>,
  tabIndex: number,
  multiple: boolean,
  maxDropdownHeight: string,
  error: boolean,
  type?: string,
  disabled?: boolean,
  filterable: boolean,
  filterOption?: (OptionT, string) => boolean,
  onSelectResetsInput: boolean,
  placeholder?: string,
  getOptionLabel?: OptionT => React$Node,
  getSelectedOptionLabel?: OptionT => React$Node,
  $theme?: *,
  onTextInputChange: (e: SyntheticEvent<HTMLInputElement>) => void,
  onChange: (params: OnChangeParamsT) => void,
  onMouseEnter: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseLeave: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseDown: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseUp: (e: SyntheticEvent<HTMLInputElement>) => void,
  onFocus: (e: SyntheticEvent<HTMLInputElement>) => void,
  onBlur: (e: SyntheticEvent<HTMLInputElement>) => void,
};

export type SelectStateT = {
  inputValue: string,
  isFocused: boolean,
  isOpen: boolean,
  isPseudoFocused: boolean,
};

export type StateT = {
  value?: Array<OptionT>,
};

export type StateReducerT = (
  stateType: string,
  nextState: StateT,
  currentState: StateT,
) => StateT;

export type StatefulContainerPropsT = {
  overrides?: OverridesT,
  children: (*) => React$Node,
  initialState?: StateT,
  stateReducer: StateReducerT,
  onTextInputChange: (e: SyntheticEvent<HTMLInputElement>) => void,
  onChange: (params: OnChangeParamsT) => void,
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
  onChange: (params: OnChangeParamsT) => void,
  onMouseEnter?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onMouseLeave?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onFocus?: (e: SyntheticEvent<HTMLInputElement>) => void,
  onBlur?: (e: SyntheticEvent<HTMLInputElement>) => void,
};

export type DropDownPropsT = {
  getOptionLabel: OptionT => React$Node,
  isLoading: boolean,
  labelKey: string,
  maxDropdownHeight: string,
  multi: boolean,
  onItemSelect: OnItemSelectFnT,
  options: Array<OptionT>,
  optionsLoaded: boolean,
  overrides?: OverridesDropDownT,
  selectedOptions: Array<OptionT>,
  type: string,
};

export type AutosizeInputPropsT = {
  value: string,
  inputRef: () => void,
};
