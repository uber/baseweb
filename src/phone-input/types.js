/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {STATE_CHANGE_TYPE, SIZE} from './constants.js';

import type {OverrideT} from '../helpers/overrides.js';
import type {StatefulContainerPropsT} from '../menu/types.js';
import type {OptionT} from '../select/types.js';

export type SizeT = $Keys<typeof SIZE>;

export type CountryT = OptionT &
  $ReadOnly<{
    dialCode: string,
  }>;

export type StateT = {
  inputValue: string,
  countryValue: CountryT,
};

export type StateChangeT = $Keys<typeof STATE_CHANGE_TYPE>;

export type StateChangePayloadT = string | CountryT;

export type StateReducerT = (
  state: StateT,
  type: StateChangeT,
  payload: StateChangePayloadT,
) => StateT;

export type InputChangeEventT = {
  +target: {value: string},
};

export type CountryChangeEventT = {
  option: OptionT,
};

export type OverridesT = {
  Root?: OverrideT<*>,
};

export type StatefulPhoneInputContainerPropsT = {
  children: PropsT => React$Node,
  initialState: StateT,
  stateReducer: StateReducerT,
  onInputChange: (event: InputChangeEventT) => mixed,
  onCountryChange: (event: CountryChangeEventT) => mixed,
  overrides: OverridesT,
};

export type StatefulPhoneInputPropsT = {
  initialState?: StateT,
  stateReducer?: StateReducerT,
  onInputChange?: (event: InputChangeEventT) => mixed,
  onCountryChange?: (event: CountryChangeEventT) => mixed,
  overrides?: OverridesT,
};

export type CountrySelectPropsT = StatefulContainerPropsT & {
  maxDropdownHeight: string,
};

export type PropsT = {
  inputValue: string,
  countryValue: CountryT,
  onInputChange: (event: InputChangeEventT) => mixed,
  onCountryChange: (event: CountryChangeEventT) => mixed,
  size?: SizeT,
  maxDropdownHeight?: string,
  maxDropdownWidth?: string,
};

export type CountriesT = $ReadOnlyArray<CountryT>;
