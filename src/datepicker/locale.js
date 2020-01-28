/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export type DatepickerLocaleT = {|
  ariaLabel: string,
  nextMonth: string,
  previousMonth: string,
  pastWeek: string,
  pastMonth: string,
  pastThreeMonths: string,
  pastSixMonths: string,
  pastYear: string,
  pastTwoYears: string,
  screenReaderMessageInput: string,
  quickSelectLabel: string,
  quickSelectAriaLabel: string,
  quickSelectPlaceholder: string,
  timeSelectEndLabel: string,
  timeSelectStartLabel: string,
  timePickerAriaLabel: string,
  timezonePickerAriaLabel: string,
  selectedStartDateLabel: string,
  selectedEndDateLabel: string,
  dateNotAvailableLabel: string,
  dateAvailableLabel: string,
  selectedLabel: string,
  chooseLabel: string,
|};

const locale = {
  ariaLabel: 'Select a date',
  previousMonth: 'Previous month',
  nextMonth: 'Next month',
  pastWeek: 'Past Week',
  pastMonth: 'Past Month',
  pastThreeMonths: 'Past 3 Months',
  pastSixMonths: 'Past 6 Months',
  pastYear: 'Past Year',
  pastTwoYears: 'Past 2 Years',
  screenReaderMessageInput:
    'Press the down arrow key to interact with the calendar and select a date. Press the escape button to close the calendar.',
  quickSelectLabel: 'Choose a date range',
  quickSelectAriaLabel: 'Choose a date range',
  quickSelectPlaceholder: 'None',
  timeSelectEndLabel: 'End time',
  timeSelectStartLabel: 'Start time',
  timePickerAriaLabel: 'Select a time',
  timezonePickerAriaLabel: 'Select a timezone',
  selectedStartDateLabel: 'Selected start date.',
  selectedEndDateLabel: 'Selected end date.',
  dateNotAvailableLabel: 'Not available.',
  dateAvailableLabel: "It's available.",
  selectedLabel: 'Selected.',
  chooseLabel: 'Choose',
};

export default locale;
