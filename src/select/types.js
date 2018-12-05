/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides';
import type {ThemeT} from '../styles/types';
import {STATE_CHANGE_TYPE, SIZE, TYPE} from './constants';
import type {OnItemSelectFnT} from '../menu/types';

export type ChangeActionT = $Keys<typeof STATE_CHANGE_TYPE>;
export type SizeT = $Keys<typeof SIZE>;
export type TypeT = $Keys<typeof TYPE>;

type DefaultPassedOptionT = {};

export type OptionT<T = DefaultPassedOptionT> = {
  id?: string,
  label?: React.Node,
  disabled?: boolean,
  clearableValue?: boolean,
  ...T,
};

export type ValueT<T = DefaultPassedOptionT> = Array<OptionT<T>>;

export type OnChangeParamsT<T = DefaultPassedOptionT> = {
  value: ValueT<T>,
  option: ?OptionT<T>,
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

export type PropsT<T = DefaultPassedOptionT> = {
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
    options: ValueT<T>,
    filterValue: string,
    excludeOptions: ?ValueT<T>,
    {valueKey: string, labelKey: string},
  ) => ValueT<T>,
  filterOutSelected: boolean,
  getOptionLabel: ?({option: OptionT<T>}) => React.Node,
  getValueLabel: ?({option: OptionT<T>}) => React.Node,
  isLoading: boolean,
  labelKey: string,
  maxDropdownHeight: string,
  multi: boolean,
  noResultsMsg: React.Node,
  onBlur: (e: SyntheticEvent<HTMLElement>) => void,
  onBlurResetsInput: boolean,
  onChange: (params: OnChangeParamsT<T>) => void,
  onFocus: (e: SyntheticEvent<HTMLElement>) => void,
  onInputChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  onCloseResetsInput: boolean,
  onSelectResetsInput: boolean,
  onOpen: ?() => void,
  onClose: ?() => void,
  openOnClick: boolean,
  options: ?Array<OptionT<T>>,
  overrides: OverridesT,
  placeholder: React.Node,
  required: boolean,
  searchable: boolean,
  size: SizeT,
  type: TypeT,
  value: ValueT<T>,
  valueKey: string,
};

export type SelectStateT = {
  inputValue: string,
  isFocused: boolean,
  isOpen: boolean,
  isPseudoFocused: boolean,
};

export type StateT<T = DefaultPassedOptionT> = {
  value: ValueT<T>,
};

export type StateReducerT<T = DefaultPassedOptionT> = (
  stateType: string,
  nextState: StateT<T>,
  currentState: StateT<T>,
) => StateT<T>;

export type StatefulContainerPropsT<T = DefaultPassedOptionT> = {
  overrides: OverridesT,
  children: (PropsT<T>) => React$Node,
  initialState: StateT<T>,
  stateReducer: StateReducerT<T>,
  onChange: (params: OnChangeParamsT<T>) => void,
};

export type StatefulSelectPropsT<T = DefaultPassedOptionT> = PropsT<T> & {
  overrides?: OverridesT,
  initialState?: StateT<T>,
  stateReducer?: StateReducerT<T>,
  onChange?: (params: OnChangeParamsT<T>) => void,
};

export type DropdownPropsT<T = DefaultPassedOptionT> = {
  error: boolean,
  getOptionLabel: ({option: OptionT<T>}) => React.Node,
  isLoading: boolean,
  labelKey: string,
  maxDropdownHeight: string,
  multi: boolean,
  onItemSelect: OnItemSelectFnT,
  options: ValueT<T>,
  overrides?: OverridesDropdownT,
  required: boolean,
  searchable: boolean,
  size: SizeT,
  type: TypeT,
  value: ValueT<T>,
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
