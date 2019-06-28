/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

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
  id: CountryIsoT,
  label: string,
  dialCode: string,
}>;

export type CountriesT = $ReadOnly<CountryT>;

export type StateT = {
  text: string,
  country: CountryT,
};

export type StateChangeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type StateReducerT = (
  type: StateChangeT,
  nextState: StateT,
  currentState: StateT,
) => StateT;

export type mapIsoToLabelT = (iso: string) => string;

export type CountrySelectDropdownPropsT = {
  // eslint-disable-next-line flowtype/no-weak-types
  children: $ReadOnlyArray<React.Element<any>>,
  country: CountryT,
  maxDropdownHeight: string,
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
  country: CountryT,
  inputRef: {current: HTMLInputElement | null},
  onCountryChange?: (event: OnChangeParamsT) => mixed,
  size?: SizeT,
  maxDropdownWidth?: string,
  maxDropdownHeight?: string,
  mapIsoToLabel?: mapIsoToLabelT,
  disabled?: boolean,
  overrides: {
    DialCode?: OverrideT<*>,
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
  DialCode?: OverrideT<*>,
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
  /** Current input text value. Note, this should include the dial code of the selected country. */
  text: string,
  /** Current selected country value. Note, this expects an entire CountryT object. */
  country: CountryT,
  /** Change handler of the text input to be called when a value is changed. */
  onTextChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  /** Change handler of the country select to be called when a value is changed. */
  onCountryChange: (event: OnChangeParamsT) => mixed,
  /** A function that can be used to map iso codes to localized country names */
  mapIsoToLabel?: mapIsoToLabelT,
  /** Defines the size of the text input. */
  size?: SizeT,
  /** Renders component in 'disabled' state. */
  disabled?: boolean,
  /** Defines a maximum dropdown height. The edge of the viewport will shrink the dropdown accordingly. */
  maxDropdownHeight?: string,
  /** Defines a maximum dropdown width. The edge of the viewport will shrink the dropdown accordingly. */
  maxDropdownWidth?: string,
  overrides?: OverridesT,
};

export type StatefulPhoneInputContainerPropsT = {
  /** Sets aria-label attribute. */
  'aria-label': ?string,
  children: PropsT => React.Node,
  initialState: StateT,
  stateReducer: StateReducerT,
  onTextChange: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onCountryChange: (event: OnChangeParamsT) => mixed,
  mapIsoToLabel?: mapIsoToLabelT,
  overrides: OverridesT,
};

export type StatefulPhoneInputPropsT = {
  /** Sets aria-label attribute. */
  'aria-label'?: string,
  initialState?: StateT,
  stateReducer?: StateReducerT,
  onTextChange?: (event: SyntheticInputEvent<HTMLInputElement>) => mixed,
  onCountryChange?: (event: OnChangeParamsT) => mixed,
  mapIsoToLabel?: mapIsoToLabelT,
  overrides?: OverridesT,
};
