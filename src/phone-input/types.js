/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {STATE_CHANGE_TYPE, SIZE} from './constants.js';

import type {OverrideT} from '../helpers/overrides.js';
import type {StatefulContainerPropsT} from '../menu/types.js';
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

export type StateReducerT = (
  state: StateT,
  type: StateChangeT,
  payload: StateChangePayloadT,
) => StateT;

export type InputChangeEventT = {
  +target: {value: string},
};

export type CountryChangeEventT = {
  value: ValueT,
  option: ?CountryT,
  type: ChangeActionT,
};

export type OverridesT = {
  Root?: OverrideT<*>,
};

export type mapIsoToLabelT = (iso: string) => string;

export type CountrySelectPropsT = StatefulContainerPropsT & {
  dropdownHeight: string,
  mapIsoToLabel?: mapIsoToLabelT,
};

export type PropsT = {
  inputValue: string,
  countryValue: CountryT,
  onInputChange: (event: InputChangeEventT) => mixed,
  onCountryChange: (event: CountryChangeEventT) => mixed,
  mapIsoToLabel?: mapIsoToLabelT,
  size?: SizeT,
  dropdownHeight?: string,
  dropdownWidth?: string,
};

export type StatefulPhoneInputContainerPropsT = {
  children: PropsT => React$Node,
  initialState: StateT,
  stateReducer: StateReducerT,
  onChange: (state: StateT) => mixed,
  onInputChange: (event: InputChangeEventT) => mixed,
  onCountryChange: (event: CountryChangeEventT) => mixed,
  mapIsoToLabel?: mapIsoToLabelT,
  overrides: OverridesT,
};

export type StatefulPhoneInputPropsT = {
  initialState?: StateT,
  stateReducer?: StateReducerT,
  onChange?: (state: StateT) => mixed,
  onInputChange?: (event: InputChangeEventT) => mixed,
  onCountryChange?: (event: CountryChangeEventT) => mixed,
  mapIsoToLabel?: mapIsoToLabelT,
  overrides?: OverridesT,
};
