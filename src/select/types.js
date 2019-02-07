/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import type {OverrideT} from '../helpers/overrides.js';
import type {ThemeT} from '../styles/types.js';
import {STATE_CHANGE_TYPE, SIZE, TYPE} from './constants.js';
import type {OnItemSelectFnT} from '../menu/types.js';

export type ChangeActionT = $Keys<typeof STATE_CHANGE_TYPE>;
export type SizeT = $Keys<typeof SIZE>;
export type TypeT = $Keys<typeof TYPE>;

export type OptionT = $ReadOnly<{
  id?: string | number,
  label?: React.Node,
  disabled?: boolean,
  clearableValue?: boolean,
}>;

export type ValueT = $ReadOnlyArray<OptionT>;

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
  DropdownListItem?: OverrideT<*>,
  OptionContent?: OverrideT<*>,
};

export type OverridesDropdownT = {
  DropdownContainer?: OverrideT<*>,
  Dropdown?: OverrideT<*>,
  // Not a styled component
  DropdownOption?: OverrideT<*>,
  DropdownListItem?: OverrideT<*>,
  OptionContent?: OverrideT<*>,
};

export type PropsT = {
  'aria-label': ?string,
  'aria-describedby': ?string,
  'aria-labelledby': ?string,
  /** Defines if select element is focused on the first mount. */
  autoFocus: boolean,
  /** Defines if options can be removed by pressing backspace. */
  backspaceRemoves: boolean,
  /** Defines if the select value can be cleared. If true a clear icon is rendered when a value is set. */
  clearable: boolean,
  /** Defines if the menu closes after a selection if made. */
  closeOnSelect: boolean,
  /** Defines if options can be removed by pressing backspace. */
  deleteRemoves: boolean,
  /** Defines if the control is disabled. */
  disabled: boolean,
  /** Defines if the control if in error state. */
  error: boolean,
  /** Defines if the value is cleared when escape is pressed and the dropdown is closed. */
  escapeClearsValue: boolean,
  /** Defaults to filterOptions that excludes selected options for
   * multi select. A custom method to filter options to be displayed in the dropdown. */
  filterOptions: ?(
    options: ValueT,
    filterValue: string,
    excludeOptions: ?ValueT,
    {valueKey: string, labelKey: string},
  ) => ValueT,
  /** Defines if currently selected options are filtered out in the dropdown options. */
  filterOutSelected: boolean,
  /** A custom method to get a display value for a dropdown option. */
  getOptionLabel: ?({
    option: OptionT,
    optionState: {
      $selected: boolean,
      $disabled: boolean,
      $isHighlighted: boolean,
    },
  }) => React.Node,
  /** A custom method to get a display value for a selected option. */
  getValueLabel: ?({option: OptionT}) => React.Node,
  /** Defines if the select if in a loading (async) state. */
  isLoading: boolean,
  /** Defines an option key for a default label value. */
  labelKey: string,
  /** Sets max height of the dropdown list. */
  maxDropdownHeight: string,
  /** Defines if multiple options can be selected. */
  multi: boolean,
  /** Message to be displayed if no options is found for a search query. */
  noResultsMsg: React.Node,
  onBlur: (e: Event) => void,
  /** Defines if the input value is reset to an empty string when a blur event happens on the select. */
  onBlurResetsInput: boolean,
  /** change handler of the select to be called when a value is changed. */
  onChange: (params: OnChangeParamsT) => void,
  onFocus: (e: SyntheticEvent<HTMLElement>) => void,
  onInputChange: (e: SyntheticInputEvent<HTMLInputElement>) => void,
  /** Defines if the input value is reset to an empty string when dropdown is closed. */
  onCloseResetsInput: boolean,
  /** Defines if the input value is reset to an empty string when a selection is made. */
  onSelectResetsInput: boolean,
  /** A function that is called when the dropdown opens. */
  onOpen: ?() => void,
  /** A function that is called when the dropdown closes. */
  onClose: ?() => void,
  /** Defines if the dropdown opens on a click event on the select. */
  openOnClick: boolean,
  /** Options to be displayed in the dropdown. If an option has a
   * disabled prop value set to true it will be rendered as a disabled option in the dropdown. */
  options: ?ValueT,
  overrides: OverridesT,
  /** Sets the placeholder. */
  placeholder: React.Node,
  /** Defines if the select field is required to have a selection. */
  required: boolean,
  /** Defines if the search functionality id enabled. */
  searchable: boolean,
  size: SizeT,
  /** Defines type of the component to be in select or search mode.
   * When set to TYPE.search the search icon if rendered on the
   * left and the select arrow icon is not rendered. */
  type: TypeT,
  /** A current selected value(s). If a selected value has a clearableValue
   * prop set to true it will be rendered as a disabled selected option that can't be cleared. */
  value: ValueT,
  /** Defines an option key for a default key value. */
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
  getOptionLabel: ({
    option: OptionT,
    optionState: {
      $selected: boolean,
      $disabled: boolean,
      $isHighlighted: boolean,
    },
  }) => React.Node,
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
