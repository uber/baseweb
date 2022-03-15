/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import { Scenario as TimePickerScenario } from './time-picker.scenario.js';
import { Scenario as TimePickerMinMaxDiffDayScenario } from './time-picker-min-max-diff-day.scenario.js';

export const TimePicker = () => <TimePickerScenario />;

export const TimePickerMinMaxDiffDay = () => <TimePickerMinMaxDiffDayScenario />;

export default {
  title: 'TimePicker',
};
