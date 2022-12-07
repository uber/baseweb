/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';

import type { Override } from '../helpers/overrides';
import type { STATE_CHANGE_TYPE, SIZE, TYPE } from './constants';
import type { OnItemSelectFn } from '../menu';

export type ChangeAction = keyof typeof STATE_CHANGE_TYPE;
export type Size = keyof typeof SIZE;
export type Type = keyof typeof TYPE;

export type Option = Readonly<{
  id?: string | number;
  // todo(flow->ts): React.ReactNode might be incorrect, but it works https://codesandbox.io/s/base-web-select-forked-kfzx07?file=/src/example.js
  label?: React.ReactNode;
  disabled?: boolean;
  clearableValue?: boolean;
  isCreatable?: boolean;
  __optgroup?: string;
  // todo(flow->ts): probably this should be deleted, but that will require to clarify other types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}>;

export type Value = ReadonlyArray<Option>;
export type Optgroups = {
  // @ts-ignore
  __ungrouped?: Value;
  [x: string]: Value;
};
export type Options = Value | undefined | null | Optgroups;

export type OnChangeParams = {
  value: Value;
  option: Option | undefined | null;
  type: ChangeAction;
};

export type SelectOverrides = {
  Root?: Override;
  ControlContainer?: Override;
  Placeholder?: Override;
  ValueContainer?: Override;
  SingleValue?: Override;
  MultiValue?: Override;
  Tag?: Override;
  InputContainer?: Override;
  Input?: Override;
  IconsContainer?: Override;
  SelectArrow?: Override;
  ClearIcon?: Override;
  LoadingIndicator?: Override;
  SearchIconContainer?: Override;
  SearchIcon?: Override;
  Popover?: Override;
  DropdownContainer?: Override;
  Dropdown?: Override;
  DropdownOption?: Override;
  DropdownListItem?: Override;
  OptionContent?: Override;
  StatefulMenu?: Override;
  StyledClearIcon?: Override;
};

export type OverridesDropdown = {
  DropdownContainer?: Override;
  Dropdown?: Override;
  // Not a styled component
  DropdownOption?: Override;
  DropdownListItem?: Override;
  OptionContent?: Override;
  StatefulMenu?: Override;
};

export type ImperativeMethods = {
  setDropdownOpen: (a: boolean) => unknown;
  setInputValue: (a: string) => void;
  setInputFocus: () => void;
  setInputBlur: () => void;
  // these below are for backwards compatibility and may be removed. Don't use them.
  focus: () => void;
  blur: () => void;
};

export type ControlRef = {
  current: ImperativeMethods | null;
};

export type SelectProps = {
  'aria-label'?: string | null;
  'aria-describedby'?: string | null;
  'aria-errormessage'?: string | null;
  'aria-labelledby'?: string | null;
  /** Defines if select element is focused on the first mount. */
  autoFocus?: boolean;
  /** Defines if options can be removed by pressing backspace. If you have customized labels, it will remove the option entirely, otherwise, it starts removing characters from the end of the string. */
  backspaceRemoves?: boolean;
  /** By default, backspace will only remove the last character of the input value. If true, the input value will be cleared. */
  backspaceClearsInputValue?: boolean;
  /** Defines if the select value can be cleared. If true a clear icon is rendered when a value is set. */
  clearable?: boolean;
  /** Defines if the menu closes after a selection if made. */
  closeOnSelect?: boolean;
  /** Defines if new options can be created along with choosing existing options. */
  creatable?: boolean;
  /** Defines if options can be removed by pressing backspace. */
  deleteRemoves?: boolean;
  /** Defines if the control is disabled. */
  disabled?: boolean;
  /** Defines if the control is in error state. */
  error?: boolean;
  /** Defines if the control is in positive state. */
  positive?: boolean;
  /** Defines if the value is cleared when escape is pressed and the dropdown is closed. */
  escapeClearsValue?: boolean;
  /** Defaults to filterOptions that excludes selected options for
   * multi select. A custom method to filter options to be displayed in the dropdown. */
  filterOptions?:
    | ((
        options: Value,
        filterValue: string,
        excludeOptions: Value | undefined | null,
        a: {
          valueKey: string;
          labelKey: string;
        }
      ) => Value)
    | null;
  /** Defines if currently selected options are filtered out in the dropdown options. */
  filterOutSelected?: boolean;
  /** A custom method to get a display value for a dropdown option. */
  getOptionLabel?:
    | ((a: {
        option: Option;
        optionState: {
          $selected: boolean;
          $disabled: boolean;
          $isHighlighted: boolean;
        };
      }) => React.ReactNode)
    | null;
  /** A custom method to get a display value for a selected option. */
  getValueLabel?: ((a: { option: Option; index?: number }) => React.ReactNode) | null;
  /** Sets the id attribute of the internal input element. Allows for usage with labels. */
  id?: string;
  /** Defines if the comparison for a new creatable value should be case-insensitive. */
  ignoreCase?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  /** An imperative handle exposing internal methods. */
  controlRef?: ControlRef;
  /** Defines if the select is in a loading (async) state. */
  isLoading?: boolean;
  /** Defines an option key for a default label value. */
  labelKey?: string;
  /** Sets max height of the dropdown list. */
  maxDropdownHeight?: string;
  /** Defines if multiple options can be selected. */
  multi?: boolean;
  /** Message to be displayed if no options is found for a search query. */
  noResultsMsg?: React.ReactNode;
  onBlur?: (e: React.FocusEvent | MouseEvent) => unknown;
  /** Defines if the input value is reset to an empty string when a blur event happens on the select. */
  onBlurResetsInput?: boolean;
  /** change handler of the select to be called when a value is changed. */
  onChange?: (params: OnChangeParams) => unknown;
  onFocus?: (e: React.SyntheticEvent<HTMLElement>) => unknown;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  /** Defines if the input value is reset to an empty string when dropdown is closed. */
  onCloseResetsInput?: boolean;
  /** Defines if the input value is reset to an empty string when a selection is made. */
  onSelectResetsInput?: boolean;
  /** A function that is called when the dropdown opens. */
  onOpen?: (() => unknown) | null;
  /** A function that is called when the dropdown closes. */
  onClose?: (() => unknown) | undefined | null;
  /** Defines if the dropdown opens on a click event on the select. */
  openOnClick?: boolean;
  /** If true, opens the dropdown when the select mounts. */
  startOpen?: boolean;
  /** Options to be displayed in the dropdown. If an option has a
   * disabled prop value set to true it will be rendered as a disabled option in the dropdown. */
  options?: Options;
  overrides?: SelectOverrides;
  /** Sets the placeholder. */
  placeholder?: React.ReactNode;
  /** Defines if the select field is required to have a selection. */
  required?: boolean;
  /** Defines if the search functionality is enabled. */
  searchable?: boolean;
  /** Defines the size (scale) of dropdown menu items. See the Menu component API. */
  size?: Size;
  /** Defines type of the component to be in select or search mode.
   * When set to TYPE.search the search icon is rendered on the
   * left and the select arrow icon is not rendered. */
  type?: Type;
  /** A current selected value(s). If a selected value has a clearableValue
   * prop set to true it will be rendered as a disabled selected option that can't be cleared. */
  value?: Value;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  valueComponent?: React.ComponentType<any>;
  /** Defines a key name for an option's unique identifier value.
   * The value of the `valueKey` prop is used to identify what options are selected
   * or removed from the selection, it also used for default filtering out the
   * selected options from the dropdown list. */
  valueKey?: string;
  /** Where to mount the popover */
  mountNode?: HTMLElement;
};

export type SelectState = {
  activeDescendant: string | undefined | null;
  inputValue: string;
  isFocused: boolean;
  isOpen: boolean;
  isPseudoFocused: boolean;
};

export type State = {
  value: Value;
};

export type StateReducer = (stateType: string, nextState: State, currentState: State) => State;

export type StatefulContainerProps = {
  overrides: SelectOverrides;
  children: (a: SelectProps) => React.ReactNode;
  initialState: State;
  stateReducer: StateReducer;
  onChange: (params: OnChangeParams) => unknown;
};

export declare type StatefulSelectProps = Omit<
  SelectProps,
  'onChange' | 'overrides' | 'initialState' | 'stateReducer'
> & {
  overrides?: SelectOverrides;
  initialState?: State;
  stateReducer?: StateReducer;
  onChange?: (params: OnChangeParams) => unknown;
};

export type DropdownProps = {
  error: boolean;
  getOptionLabel: (a: {
    option: Option;
    optionState: {
      $selected: boolean;
      $disabled: boolean;
      $isHighlighted: boolean;
    };
  }) => React.ReactNode;
  id?: string;
  innerRef: React.Ref<HTMLElement>;
  isLoading: boolean;
  labelKey: string;
  maxDropdownHeight: string;
  multi: boolean;
  noResultsMsg?: React.ReactNode;
  onActiveDescendantChange?: (id?: string) => unknown;
  onItemSelect: OnItemSelectFn;
  options: Value;
  overrides?: OverridesDropdown;
  required: boolean;
  searchable: boolean;
  size: Size;
  type: Type;
  value: Value;
  valueKey: string;
  width: number | undefined | null;
  keyboardControlNode?: React.Ref<HTMLElement>;
};

export type AutosizeInputOverrides = {
  Input?: Override;
};

export type AutosizeInputProps = {
  value: string;
  defaultValue?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef: (ref: any) => any;
  overrides: AutosizeInputOverrides;
  $size: Size;
};

export type AutosizeInputState = {
  inputWidth: number;
};

export type SharedStylePropsArg = {
  $clearable?: boolean;
  $creatable?: boolean;
  $disabled?: boolean;
  $error?: boolean;
  $positive?: boolean;
  $isFocused?: boolean;
  $isLoading?: boolean;
  $isOpen?: boolean;
  $isPseudoFocused?: boolean;
  $multi?: boolean;
  $required?: boolean;
  $searchable?: boolean;
  $size?: Size;
  $type?: Type;
  $width?: string;
  $maxHeight?: string;
  $isHighlighted?: boolean;
  $selected?: boolean;
  $isEmpty?: boolean;
};
