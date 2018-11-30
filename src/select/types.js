/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {OverrideT} from '../helpers/overrides';
import type {ThemeT} from '../styles/types';
import {STATE_CHANGE_TYPE, SIZE, TYPE} from './constants';
import type {OnItemSelectFnT} from '../menu/types';

export type ChangeActionT = $Keys<typeof STATE_CHANGE_TYPE>;
export type SizeT = $Keys<typeof SIZE>;
export type TypeT = $Keys<typeof TYPE>;

export type OptionT = $Shape<{
  id?: string,
  label?: React.Node,
  disabled?: boolean,
  clearableValue?: boolean,
}>;

export type ValueT = Array<OptionT>;

export type OnChangeParamsT = {
  value: ValueT,
  option: ?OptionT,
  type: ChangeActionT,
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
  IconsContainer?: OverrideT<*>,
  SelectArrow?: OverrideT<*>,
  ClearIcon?: OverrideT<*>,
  LoadingIndicator?: OverrideT<*>,
  SearchIcon?: OverrideT<*>,
  DropdownContainer?: OverrideT<*>,
  Dropdown?: OverrideT<*>,
  DropdownOption?: OverrideT<*>,
  OptionContent?: OverrideT<*>,
};

export type OverridesDropdownT = {
  DropdownContainer?: OverrideT<*>,
  Dropdown?: OverrideT<*>,
  DropdownOption?: OverrideT<*>,
  OptionContent?: OverrideT<*>,
};

export type PropsT = {
  'aria-label': ?string,
  'aria-describedby': ?string,
  'aria-labelledby': ?string,
  autoFocus: false,
  backspaceRemoves: boolean,
  clearable: boolean,
  closeOnSelect: boolean,
  deleteRemoves: boolean,
  disabled: boolean,
  error: boolean,
  escapeClearsValue: boolean,
  filterOptions: ?(
    options: ValueT,
    filterValue: string,
    excludeOptions: ?ValueT,
    {valueKey: string, labelKey: string},
  ) => ValueT,
  filterOutSelected: boolean,
  getOptionLabel: ?({option: OptionT}) => React.Node,
  getValueLabel: ?({option: OptionT}) => React.Node,
  isLoading: boolean,
  labelKey: string,
  maxDropdownHeight: string,
  multi: boolean,
  noResultsMsg: React.Node,
  onBlur: (e: SyntheticEvent<HTMLElement>) => void,
  onBlurResetsInput: boolean,
  onChange: (params: OnChangeParamsT) => void,
  onFocus: (e: SyntheticEvent<HTMLElement>) => void,
  onInputChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onCloseResetsInput: boolean,
  onSelectResetsInput: boolean,
  onOpen: ?() => void,
  onClose: ?() => void,
  openOnClick: boolean,
  options: ?Array<OptionT>,
  overrides: OverridesT,
  placeholder: React.Node,
  required: boolean,
  searchable: boolean,
  size: SizeT,
  type: TypeT,
  value: ValueT,
  valueKey: string,
};

export type SelectStateT = {
  inputValue: string,
  isFocused: boolean,
  isOpen: boolean,
  isPseudoFocused: boolean,
};

export type StateT = {
  value: ValueT,
};

export type StateReducerT = (
  stateType: string,
  nextState: StateT,
  currentState: StateT,
) => StateT;

export type StatefulContainerPropsT = {
  overrides: OverridesT,
  children: PropsT => React$Node,
  initialState: StateT,
  stateReducer: StateReducerT,
  onChange: (params: OnChangeParamsT) => void,
};

export type StatefulSelectPropsT = PropsT & {
  overrides?: OverridesT,
  initialState?: StateT,
  stateReducer?: StateReducerT,
  onChange?: (params: OnChangeParamsT) => void,
};

export type DropdownPropsT = {
  error: boolean,
  getOptionLabel: ({option: OptionT}) => React.Node,
  isLoading: boolean,
  labelKey: string,
  maxDropdownHeight: string,
  multi: boolean,
  onItemSelect: OnItemSelectFnT,
  options: ValueT,
  overrides?: OverridesDropdownT,
  required: boolean,
  searchable: boolean,
  size: SizeT,
  type: TypeT,
  value: ValueT,
  valueKey: string,
};

export type AutosizeInputOverridesT = {
  Input?: OverrideT<*>,
};

export type AutosizeInputPropsT = {
  value: string,
  defaultValue?: string,
  inputRef: () => void,
  overrides: AutosizeInputOverridesT,
};

export type AutosizeInputStateT = {
  inputWidth: number,
};

export type SharedStylePropsArgT = {
  $clearable: boolean,
  $disabled: boolean,
  $error: boolean,
  $isFocused: boolean,
  $isLoading: boolean,
  $isOpen: boolean,
  $isPseudoFocused: boolean,
  $multi: boolean,
  $required: boolean,
  $searchable: boolean,
  $size: SizeT,
  $type: TypeT,
};

export type SharedStylePropsT = SharedStylePropsArgT & {
  $theme: ThemeT,
};
