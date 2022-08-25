/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as TimezonePickerScenario } from './timezone-picker.scenario';
import { Scenario as TimezonePickerAdditionalTimezonesScenario } from './timezone-picker-additional-timezones.scenario';
import { Scenario as TimezonePickerAbbreviationsScenario } from './timezone-picker--abbreviations.scenario';

export const TimezonePicker = () => <TimezonePickerScenario />;
export const TimezonePickerAdditionalTimezones = () => (
  <TimezonePickerAdditionalTimezonesScenario />
);
export const TimezonePickerAbbreviations = () => <TimezonePickerAbbreviationsScenario />;
