/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as TimezonePickerScenario } from './timezone-picker.scenario.js';
import { Scenario as TimezonePickerAbbreviationsScenario } from './timezone-picker--abbreviations.scenario.js';

export const TimezonePicker = () => <TimezonePickerScenario />;
export const TimezonePickerAbbreviations = () => <TimezonePickerAbbreviationsScenario />;
