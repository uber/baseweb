/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export type DatepickerLocaleT = {|
  ariaLabel: string,
  nextMonth: string,
  previousMonth: string,
  screenReaderMessageInput: string,
  quickSelectLabel: string,
  quickSelectAriaLabel: string,
  timeSelectEndLabel: string,
  timeSelectStartLabel: string,
  timePickerAriaLabel: string,
  timezonePickerAriaLabel: string,
|};

const locale = {
  ariaLabel: 'Select a date',
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  screenReaderMessageInput:
    'Press the down arrow key to interact with the calendar and select a date. Press the escape button to close the calendar.',
  quickSelectLabel: 'Choose a date range',
  quickSelectAriaLabel: 'Choose a date range',
  timeSelectEndLabel: 'End time',
  timeSelectStartLabel: 'Start time',
  timePickerAriaLabel: 'Select a time',
  timezonePickerAriaLabel: 'Select a timezone',
};

export default locale;
