/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import CountrySelectDropdownScenario from './country-select-dropdown.scenario.js';
import CountrySelectSmallDropdownScenario from './country-select-small-dropdown.scenario.js';
import PhoneInputCustomFlags from './phone-input-custom-flags.scenario.js';
import PhoneInputNextDropdown from './phone-input-next-dropdown.scenario.js';
import PhoneInputNext from './phone-input-next.scenario.js';
import PhoneInputOverrides from './phone-input-overrides.scenario.js';
import PhoneInputDefault from './phone-input.scenario.js';

export const CountrySelectDropdown = () => <CountrySelectDropdownScenario />;
export const CountrySelectSmallDropdown = () => (
  <CountrySelectSmallDropdownScenario />
);
export const CustomFlags = () => <PhoneInputCustomFlags />;
export const NextDropdown = () => <PhoneInputNextDropdown />;
export const Next = () => <PhoneInputNext />;
export const Overrides = () => <PhoneInputOverrides />;
export const PhoneInput = () => <PhoneInputDefault />;
