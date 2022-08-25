/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as TimePickerScenario } from './time-picker.scenario';
import { Scenario as TimePickerMinMaxDiffDayScenario } from './time-picker-min-max-diff-day.scenario';

export const TimePicker = () => <TimePickerScenario />;
export const TimePickerMinMaxDiffDay = () => <TimePickerMinMaxDiffDayScenario />;
