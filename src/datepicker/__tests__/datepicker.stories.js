/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {Scenario as CalendarMultiMonthScenario} from './calendar-multi-month.scenario.js';
import {Scenario as CalendarTimeSelectScenario} from './calendar-time-select.scenario.js';
import {Scenario as CalendarScenario} from './calendar.scenario.js';
import {Scenario as DatepickerI18nChinese} from './datepicker-i18n-chinese.scenario.js';
import {Scenario as DatepickerIntRange} from './datepicker-int-range.scenario.js';
import {Scenario as DatepickerInt} from './datepicker-int.scenario.js';
import {Scenario as DatepickerMask} from './datepicker-mask.scenario.js';
import {Scenario as DatepickerRangeHighlight} from './datepicker-range-highlight.scenario.js';
import {Scenario as DatepickerRangeMultiMonth} from './datepicker-range-multi-month.scenario.js';
import {Scenario as DatepickerRange} from './datepicker-range.scenario.js';
import {Scenario as DatepickerRangeSeparateInputs} from './datepicker-range-separate-inputs.scenario.js';
import {Scenario as DatepickerDefault} from './datepicker.scenario.js';
import {Scenario as DatepickersColorStates} from './datepickers-color-states.scenario.js';
import {Scenario as DatepickersComposedRange} from './datepickers-composed-range.scenario.js';
import {Scenario as DatepickersComposedSingle} from './datepickers-composed-single.scenario.js';
import {Scenario as StatefulCalendarOverridesScenario} from './stateful-calendar-overrides.scenario.js';
import {Scenario as StatefulCalendarScenario} from './stateful-calendar.scenario.js';
import {Scenario as StatefulDatepickerMinMaxDate} from './stateful-datepicker-min-max-date.scenario.js';
import {Scenario as StatefulDatepickerQuickSelect} from './stateful-datepicker-quick-select.scenario.js';
import {Scenario as StatefulDatepicker} from './stateful-datepicker.scenario.js';
import {Scenario as StatefulRangeDatepicker} from './stateful-range-datepicker.scenario.js';
import {Scenario as StatefulRangeQuickSelectScenario} from './stateful-range-quick-select.scenario.js';

export const CalendarMultiMonth = () => <CalendarMultiMonthScenario />;
export const CalendarTimeSelect = () => <CalendarTimeSelectScenario />;
export const Calendar = () => <CalendarScenario />;
export const I18nChinese = () => <DatepickerI18nChinese />;
export const IntRange = () => <DatepickerIntRange />;
export const Int = () => <DatepickerInt />;
export const Mask = () => <DatepickerMask />;
export const RangeHighlight = () => <DatepickerRangeHighlight />;
export const RangeMultiMonth = () => <DatepickerRangeMultiMonth />;
export const Range = () => <DatepickerRange />;
export const RangeSeparateInputs = () => <DatepickerRangeSeparateInputs />;
export const Datepicker = () => <DatepickerDefault />;
export const StatefulColorStates = () => <DatepickersColorStates />;
export const StatefulComposedRange = () => <DatepickersComposedRange />;
export const StatefulComposedSingle = () => <DatepickersComposedSingle />;
export const StatefulCalendarOverrides = () => (
  <StatefulCalendarOverridesScenario />
);

export const StatefulCalendar = () => <StatefulCalendarScenario />;
export const StatefulMinMaxDate = () => <StatefulDatepickerMinMaxDate />;
export const StatefulQuickSelect = () => <StatefulDatepickerQuickSelect />;
export const Stateful = () => <StatefulDatepicker />;
export const StatefulRange = () => <StatefulRangeDatepicker />;
export const StatefulRangeQuickSelect = () => (
  <StatefulRangeQuickSelectScenario />
);
