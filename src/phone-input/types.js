/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {STATE_CHANGE_TYPE, SIZE, COUNTRIES} from './constants.js';
import type {OverrideT} from '../helpers/overrides.js';
import type {OnChangeParamsT} from '../select/types.js';

export type SizeT = $Keys<typeof SIZE>;

export type CountryIsoT = $Keys<typeof COUNTRIES>;

export type CountryT = $ReadOnly<{
  dialCode: string,
  id: CountryIsoT,
  label: string,
}>;

export type CountriesT = $ReadOnly<CountryT>;

export type StateT = {
  country: CountryT,
  text?: string,
};

export type StateChangeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type StateReducerT = (
  type: StateChangeT,
  nextState: StateT,
  currentState: StateT,
) => StateT;

export type mapIsoToLabelT = (iso: string) => string;

// Props

export type CountrySelectDropdownPropsT = {
  // eslint-disable-next-line flowtype/no-weak-types
  children: $ReadOnlyArray<React.Element<any>>,
  $country: CountryT,
  $mapIsoToLabel?: mapIsoToLabelT,
  $maxDropdownHeight: string,
  $noResultsMsg: string,
  $overrides: {
    CountrySelectContainer?: OverrideT<*>,
    CountrySelectDropdown?: OverrideT<*>,
    CountrySelectDropdownListItem?: OverrideT<*>,
    CountrySelectDropdownFlagColumn?: OverrideT<*>,
    CountrySelectDropdownNameColumn?: OverrideT<*>,
    CountrySelectDropdownDialcodeColumn?: OverrideT<*>,
    FlagContainer?: OverrideT<*>,
    EmptyState?: OverrideT<*>,
  },
};

export type CountrySelectPropsT = {
  countries: {[string]: CountryT},
  country: CountryT,
  disabled: boolean,
  error: boolean,
  inputRef: {current: HTMLInputElement | null},
  onCountryChange: (event: OnChangeParamsT) => mixed,
  mapIsoToLabel?: mapIsoToLabelT,
  maxDropdownHeight: string,
  maxDropdownWidth: string,
  overrides: {
    CountrySelectContainer?: OverrideT<*>,
    CountrySelectDropdown?: OverrideT<*>,
    CountrySelectDropdownListItem?: OverrideT<*>,
    CountrySelectDropdownFlagColumn?: OverrideT<*>,
    CountrySelectDropdownNameColumn?: OverrideT<*>,
    CountrySelectDropdownDialcodeColumn?: OverrideT<*>,
    DialCode?: OverrideT<*>,
    CountrySelect?: OverrideT<*>,
    FlagContainer?: OverrideT<*>,
  },
  positive: boolean,
  required: boolean,
  size: SizeT,
};

export type PropsT = {
  /** Sets aria-label attribute of the input element. */
  'aria-label': ?string,
  /** Sets aria-labelledby attribute of the input element. */
  'aria-labelledby': ?string,
  /** Sets aria-describedby attribute of the input element. */
  'aria-describedby': ?string,
  /** Defines the value of the country select. */
  country: CountryT,
  /** Defines if the component is disabled. */
  disabled: boolean,
  /** Renders component in 'error' state. */
  error: boolean,
  /** Sets the id attribute of the input element. */
  id: ?string,
  /** Sets the max height of the country select dropdown. */
  maxDropdownHeight: string,
  /** Sets the max width of the country select dropdown. */
  maxDropdownWidth: string,
  /** Function for mapping ISO codes to country names. Useful for localization of the country select dropdown. */
  mapIsoToLabel?: mapIsoToLabelT,
  /** Sets the name attribute of the input element. */
  name: ?string,
  /** A handler for the country select's change events. */
  onCountryChange: (event: OnChangeParamsT) => mixed,
  /** A handler for the input element's change events. */
  onTextChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  overrides: {
    Input?: OverrideT<*>,
    CountrySelectContainer?: OverrideT<*>,
    CountrySelectDropdown?: OverrideT<*>,
    CountrySelectDropdownListItem?: OverrideT<*>,
    CountrySelectDropdownFlagColumn?: OverrideT<*>,
    CountrySelectDropdownNameColumn?: OverrideT<*>,
    CountrySelectDropdownDialcodeColumn?: OverrideT<*>,
    DialCode?: OverrideT<*>,
    CountrySelect?: OverrideT<*>,
    FlagContainer?: OverrideT<*>,
  },
  /** Sets the placeholder text for the input element.  */
  placeholder?: string,
  /** Renders component in 'positive' state. */
  positive: boolean,
  /** Sets the 'required' attribute of the input element. The country select will always have a value so does has no need for 'require'. */
  required: boolean,
  /** Sets the size of the component. */
  size: SizeT,
  /** Defines the value of the input element. */
  text: string,
};

export type LitePropsT = {
  ...$Exact<PropsT>,
  countries: {[string]: CountryT},
};

export type StatefulPhoneInputContainerPropsT = {
  children: PropsT => React.Node,
  initialState: StateT,
  stateReducer: StateReducerT,
  onTextChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onCountryChange: (event: OnChangeParamsT) => mixed,
};

export type StatefulPhoneInputPropsT = PropsT & {
  initialState?: StateT,
  stateReducer?: StateReducerT,
  onTextChange?: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onCountryChange?: (event: OnChangeParamsT) => mixed,
};
