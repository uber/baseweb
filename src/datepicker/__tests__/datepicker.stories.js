/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import CalendarMultiMonth from './calendar-multi-month.scenario.js';
import CalendarTimeSelect from './calendar-time-select.scenario.js';
import Calendar from './calendar.scenario.js';
import DatepickerI18nChinese from './datepicker-i18n-chinese.scenario.js';
import DatepickerIntRange from './datepicker-int-range.scenario.js';
import DatepickerInt from './datepicker-int.scenario.js';
import DatepickerMask from './datepicker-mask.scenario.js';
import DatepickerRangeHighlight from './datepicker-range-highlight.scenario.js';
import DatepickerRangeMultiMonth from './datepicker-range-multi-month.scenario.js';
import DatepickerRange from './datepicker-range.scenario.js';
import DatepickerDefault from './datepicker.scenario.js';
import DatepickersColorStates from './datepickers-color-states.scenario.js';
import DatepickersComposedRange from './datepickers-composed-range.scenario.js';
import DatepickersComposedSingle from './datepickers-composed-single.scenario.js';
import StatefulCalendarOverrides from './stateful-calendar-overrides.scenario.js';
import StatefulCalendar from './stateful-calendar.scenario.js';
import StatefulDatepickerMinMaxDate from './stateful-datepicker-min-max-date.scenario.js';
import StatefulDatepickerQuickSelect from './stateful-datepicker-quick-select.scenario.js';
import StatefulDatepicker from './stateful-datepicker.scenario.js';
import StatefulRangeDatepicker from './stateful-range-datepicker.scenario.js';
import StatefulRangeQuickSelect from './stateful-range-quick-select.scenario.js';

export const CalendarMultiMonth = () => <CalendarMultiMonth />;
export const CalendarTimeSelect = () => <CalendarTimeSelect />;
export const Calendar = () => <Calendar />;
export const I18nChinese = () => <DatepickerI18nChinese />;
export const IntRange = () => <DatepickerIntRange />;
export const Int = () => <DatepickerInt />;
export const Mask = () => <DatepickerMask />;
export const RangeHighlight = () => <DatepickerRangeHighlight />;
export const RangeMultiMonth = () => <DatepickerRangeMultiMonth />;
export const Range = () => <DatepickerRange />;
export const Datepicker = () => <DatepickerDefault />;
export const sColorStates = () => <DatepickersColorStates />;
export const sComposedRange = () => <DatepickersComposedRange />;
export const sComposedSingle = () => <DatepickersComposedSingle />;
export const StatefulCalendarOverrides = () => <StatefulCalendarOverrides />;
export const StatefulCalendar = () => <StatefulCalendar />;
export const StatefulMinMaxDate = () => <StatefulDatepickerMinMaxDate />;
export const StatefulQuickSelect = () => <StatefulDatepickerQuickSelect />;
export const Stateful = () => <StatefulDatepicker />;
export const StatefulRange = () => <StatefulRangeDatepicker />;
export const StatefulRangeQuickSelect = () => <StatefulRangeQuickSelect />;
