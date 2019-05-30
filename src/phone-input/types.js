/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {STATE_CHANGE_TYPE, SIZE} from './constants.js';

import type {OverrideT} from '../helpers/overrides.js';
import type {StatefulContainerPropsT as StatefulMenuContainerPropsT} from '../menu/types.js';
import type {OptionT, ValueT, ChangeActionT} from '../select/types.js';

export type SizeT = $Keys<typeof SIZE>;

export type CountryT = OptionT &
  $ReadOnly<{
    dialCode: string,
  }>;

export type CountriesT = $ReadOnlyArray<CountryT>;

export type StateT = {
  inputValue: string,
  countryValue: CountryT,
};

export type StateChangeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type StateChangePayloadT = string | CountryT;

export type StateReducerT = (type: StateChangeT, nextState: StateT) => StateT;

export type CountryChangeEventT = {
  value: ValueT,
  option: ?CountryT,
  type: ChangeActionT,
};

export type mapIsoToLabelT = (iso: string) => string;

export type CountrySelectDropdownPropsT = StatefulMenuContainerPropsT & {
  dropdownHeight: string,
  mapIsoToLabel?: mapIsoToLabelT,
  overrides: {
    CountrySelectDropdown?: OverrideT<*>,
    CountrySelectDropdownListItem?: OverrideT<*>,
    CountrySelectDropdownFlagColumn?: OverrideT<*>,
    CountrySelectDropdownNameColumn?: OverrideT<*>,
    CountrySelectDropdownDialcodeColumn?: OverrideT<*>,
  },
};

export type CountrySelectPropsT = {
  countryValue: CountryT,
  inputRef: {current: HTMLInputElement | null},
  onCountryChange?: (event: CountryChangeEventT) => mixed,
  size?: SizeT,
  dropdownWidth?: string,
  dropdownHeight?: string,
  mapIsoToLabel?: mapIsoToLabelT,
  overrides: {
    CountrySelect?: OverrideT<*>,
    CountrySelectDropdown?: OverrideT<*>,
    CountrySelectDropdownListItem?: OverrideT<*>,
    CountrySelectDropdownFlagColumn?: OverrideT<*>,
    CountrySelectDropdownNameColumn?: OverrideT<*>,
    CountrySelectDropdownDialcodeColumn?: OverrideT<*>,
  },
};

export type OverridesT = {
  Input?: OverrideT<*>,
  CountrySelect?: OverrideT<*>,
  CountrySelectDropdown?: OverrideT<*>,
  CountrySelectDropdownListItem?: OverrideT<*>,
  CountrySelectDropdownFlagColumn?: OverrideT<*>,
  CountrySelectDropdownNameColumn?: OverrideT<*>,
  CountrySelectDropdownDialcodeColumn?: OverrideT<*>,
};

export type PropsT = {
  /** Sets aria-label attribute. */
  'aria-label': ?string,
  /** Sets aria-labelledby attribute. */
  'aria-labelledby': ?string,
  /** Sets aria-describedby attribute. */
  'aria-describedby': ?string,
  /** Current input text value. Note, this should include the dial code of the selected country. */
  inputValue: string,
  /** Current selected country value. Note, this expects an entire CountryT object. */
  countryValue: CountryT,
  /** Change handler of the text input to be called when a value is changed. */
  onInputChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Change handler of the country select to be called when a value is changed. */
  onCountryChange: (event: CountryChangeEventT) => mixed,
  /** A function that can be used to map iso codes to localized country names */
  mapIsoToLabel?: mapIsoToLabelT,
  /** Defines the size of the text input. */
  size?: SizeT,
  /** Defines a maximum dropdown height. The edge of the viewport will shrink the dropdown accordingly. */
  dropdownHeight?: string,
  /** Defines a maximum dropdown width. The edge of the viewport will shrink the dropdown accordingly. */
  dropdownWidth?: string,
  overrides?: OverridesT,
};

export type StatefulPhoneInputContainerPropsT = {
  /** Sets aria-label attribute. */
  'aria-label': ?string,
  /** Sets aria-labelledby attribute. */
  'aria-labelledby': ?string,
  /** Sets aria-describedby attribute. */
  'aria-describedby': ?string,
  children: PropsT => React.Node,
  initialState: StateT,
  stateReducer: StateReducerT,
  onInputChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onCountryChange: (event: CountryChangeEventT) => mixed,
  mapIsoToLabel?: mapIsoToLabelT,
  overrides: OverridesT,
};

export type StatefulPhoneInputPropsT = {
  /** Sets aria-label attribute. */
  'aria-label'?: string,
  /** Sets aria-labelledby attribute. */
  'aria-labelledby'?: string,
  /** Sets aria-describedby attribute. */
  'aria-describedby'?: string,
  initialState?: StateT,
  stateReducer?: StateReducerT,
  onInputChange?: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onCountryChange?: (event: CountryChangeEventT) => mixed,
  mapIsoToLabel?: mapIsoToLabelT,
  overrides?: OverridesT,
};
