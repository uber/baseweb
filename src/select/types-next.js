/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';
import {STATE_CHANGE_TYPE, SIZE, TYPE} from './constants.js';

export type OptionT<ProvidedOptionT> = {
  ...ProvidedOptionT,
  id?: string | number,
  label?: React.Node,
  disabled?: boolean,
  clearableValue?: boolean,
  isCreatable?: boolean,
  __optgroup?: string,
};

export type ValueT<P> = Array<OptionT<P>>;
export type OptgroupsT<P> = {__ungrouped: ValueT<P>, [string]: ValueT<P>};
export type OptionsT<P> = ?ValueT<P> | OptgroupsT<P>;

export type PropsT<P> = {
  'aria-label'?: ?string,
  'aria-describedby'?: ?string,
  'aria-errormessage'?: ?string,
  'aria-labelledby'?: ?string,
  /** Defines if select element is focused on the first mount. */
  autoFocus?: boolean,
  /** Defines if options can be removed by pressing backspace. If you have customized labels, it will remove the option entirely, otherwise, it starts removing characters from the end of the string. */
  backspaceRemoves?: boolean,
  /** By default, backspace will only remove the last character of the input value. If true, the input value will be cleared. */
  backspaceClearsInputValue?: boolean,
  /** Defines if the select value can be cleared. If true a clear icon is rendered when a value is set. */
  clearable?: boolean,
  /** Defines if the menu closes after a selection if made. */
  closeOnSelect?: boolean,
  /** Defines if new options can be created along with choosing existing options. */
  creatable?: boolean,
  /** Defines if options can be removed by pressing backspace. */
  deleteRemoves?: boolean,
  /** Defines if the control is disabled. */
  disabled?: boolean,
  /** Defines if the control is in error state. */
  error?: boolean,
  /** Defines if the control is in positive state. */
  positive?: boolean,
  /** Defines if the value is cleared when escape is pressed and the dropdown is closed. */
  escapeClearsValue?: boolean,
  /** Defaults to filterOptions that excludes selected options for
   * multi select. A custom method to filter options to be displayed in the dropdown. */
  filterOptions?: ?(
    options: ValueT<P>,
    filterValue: string,
    excludeOptions: ?ValueT<P>,
    {valueKey: string, labelKey: string},
  ) => ValueT<P>,
  /** Defines if currently selected options are filtered out in the dropdown options. */
  filterOutSelected?: boolean,
  /** A custom method to get a display value for a dropdown option. */
  getOptionLabel?: ?({
    option: OptionT<P>,
    optionState: {
      $selected: boolean,
      $disabled: boolean,
      $isHighlighted: boolean,
    },
  }) => React.Node,
  /** A custom method to get a display value for a selected option. */
  getValueLabel?: ?({option: OptionT<P>}) => React.Node,
  /** Sets the id attribute of the internal input element. Allows for usage with labels. */
  id?: string,
  /** Defines if the comparison for a new creatable value should be case-insensitive. */
  ignoreCase?: boolean,
  /** A ref to access the input element powering the select if it's a search select, or the container div if it isn't. */
  controlRef?: React.ElementRef<*>,
  /** Defines if the select is in a loading (async) state. */
  isLoading?: boolean,
  /** Defines an option key for a default label value. */
  labelKey: string,
  /** Sets max height of the dropdown list. */
  maxDropdownHeight?: string,
  /** Defines if multiple options can be selected. */
  multi?: boolean,
  /** Message to be displayed if no options is found for a search query. */
  noResultsMsg?: React.Node,
  onBlur?: (e: Event) => mixed,
  /** Defines if the input value is reset to an empty string when a blur event happens on the select. */
  onBlurResetsInput?: boolean,
  /** change handler of the select to be called when a value is changed. */
  onChange?: (params: {
    value: ValueT<P>,
    option: ?OptionT<P>,
    type: $Keys<typeof STATE_CHANGE_TYPE>,
  }) => mixed,
  onFocus?: (e: SyntheticEvent<HTMLElement>) => mixed,
  onInputChange?: (e: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Defines if the input value is reset to an empty string when dropdown is closed. */
  onCloseResetsInput?: boolean,
  /** Defines if the input value is reset to an empty string when a selection is made. */
  onSelectResetsInput?: boolean,
  /** A function that is called when the dropdown opens. */
  onOpen?: () => mixed,
  /** A function that is called when the dropdown closes. */
  onClose?: () => mixed,
  /** Defines if the dropdown opens on a click event on the select. */
  openOnClick?: boolean,
  /** If true, opens the dropdown when the select mounts. */
  startOpen?: boolean,
  /** Options to be displayed in the dropdown. If an option has a
   * disabled prop value set to true it will be rendered as a disabled option in the dropdown. */
  options: OptionsT<P>,
  overrides?: {
    Root?: OverrideT,
    ControlContainer?: OverrideT,
    Placeholder?: OverrideT,
    ValueContainer?: OverrideT,
    SingleValue?: OverrideT,
    MultiValue?: OverrideT,
    Tag?: OverrideT,
    InputContainer?: OverrideT,
    Input?: OverrideT,
    IconsContainer?: OverrideT,
    SelectArrow?: OverrideT,
    ClearIcon?: OverrideT,
    LoadingIndicator?: OverrideT,
    SearchIconContainer?: OverrideT,
    SearchIcon?: OverrideT,
    Popover?: OverrideT,
    DropdownContainer?: OverrideT,
    Dropdown?: OverrideT,
    DropdownOption?: OverrideT,
    DropdownListItem?: OverrideT,
    OptionContent?: OverrideT,
    StatefulMenu?: OverrideT,
  },
  /** Sets the placeholder. */
  placeholder?: React.Node,
  /** Defines if the select field is required to have a selection. */
  required?: boolean,
  /** Defines if the search functionality is enabled. */
  searchable?: boolean,
  /** Defines the size (scale) of dropdown menu items. See the Menu component API. */
  size?: $Keys<typeof SIZE>,
  /** Defines type of the component to be in select or search mode.
   * When set to TYPE.search the search icon is rendered on the
   * left and the select arrow icon is not rendered. */
  type?: $Keys<typeof TYPE>,
  /** A current selected value(s). If a selected value has a clearableValue
   * prop set to true it will be rendered as a disabled selected option that can't be cleared. */
  value: ValueT<P>,
  // eslint-disable-next-line flowtype/no-weak-types
  valueComponent?: React.ComponentType<any>,
  /** Defines a key name for an option's unique identifier value.
   * The value of the `valueKey` prop is used to identify what options are selected
   * or removed from the selection, it also used for default filtering out the
   * selected options from the dropdown list. */
  valueKey: string,
  /** Where to mount the popover */
  mountNode?: HTMLElement,
};

export type DropdownPropsT<P> = {
  error: boolean,
  getOptionLabel: ({
    option: OptionT<P>,
    optionState: {
      $selected: boolean,
      $disabled: boolean,
      $isHighlighted: boolean,
    },
  }) => React.Node,
  id?: string,
  innerRef: React.ElementRef<*>,
  isLoading: boolean,
  labelKey: string,
  maxDropdownHeight: string,
  multi: boolean,
  noResultsMsg?: React.Node,
  onActiveDescendantChange?: (id?: string) => mixed,
  onItemSelect: ({
    item: OptionT<P>,
    event?: SyntheticEvent<HTMLElement> | KeyboardEvent,
  }) => mixed,
  options: ValueT<P>,
  overrides?: {
    DropdownContainer?: OverrideT,
    Dropdown?: OverrideT,
    // Not a styled component
    DropdownOption?: OverrideT,
    DropdownListItem?: OverrideT,
    OptionContent?: OverrideT,
    StatefulMenu?: OverrideT,
  },
  required: boolean,
  searchable: boolean,
  size: $Keys<typeof SIZE>,
  type: $Keys<typeof TYPE>,
  value: ValueT<P>,
  valueKey: string,
  width: ?number,
  keyboardControlNode?: React.ElementRef<*>,
};
