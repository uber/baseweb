/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Scenario as CalendarIconOverridesScenario } from './calendar-icon-overrides.scenario';
import { Scenario as CalendarMultiMonthScenario } from './calendar-multi-month.scenario';
import { Scenario as CalendarTimeSelectScenario } from './calendar-time-select.scenario';
import { Scenario as CalendarScenario } from './calendar.scenario';
import { Scenario as DatepickerI18nChinese } from './datepicker-i18n-chinese.scenario';
import { Scenario as DatepickerIntRange } from './datepicker-int-range.scenario';
import { Scenario as DatepickerInt } from './datepicker-int.scenario';
import { Scenario as DatepickerMask } from './datepicker-mask.scenario';
import { Scenario as DatepickerOnChangeFlow } from './datepicker-onchange-flow.scenario';
import { Scenario as DatepickerRangeHighlight } from './datepicker-range-highlight.scenario';
import { Scenario as DatepickerRangeMultiMonth } from './datepicker-range-multi-month.scenario';
import { Scenario as DatepickerRange } from './datepicker-range.scenario';
import { Scenario as DatepickerRangeNullStartDate } from './datepicker-range-null-start-date.scenario';
import { Scenario as DatepickerRangeSeparateInputs } from './datepicker-range-separate-inputs.scenario';
import { Scenario as DatepickerRangeLockedBehavior } from './datepicker-range-locked-behavior.scenario';
import { Scenario as DatepickerRangeExcludeDates } from './datepicker-range-exclude-dates.scenario';
import { Scenario as DatepickerDefault } from './datepicker.scenario';
import { Scenario as DatepickerTimeScenario } from './datepicker-time.scenario';
import { Scenario as DatepickerFormControlScenario } from './datepicker-form-control.scenario';
import { Scenario as DatepickersColorStates } from './datepickers-color-states.scenario';
import { Scenario as DatepickersComposedRange } from './datepickers-composed-range.scenario';
import { Scenario as DatepickersComposedSingle } from './datepickers-composed-single.scenario';
import { Scenario as StatefulCalendarOverridesScenario } from './stateful-calendar-overrides.scenario';
import { Scenario as StatefulCalendarScenario } from './stateful-calendar.scenario';
import { Scenario as StatefulDatepickerMinMaxDate } from './stateful-datepicker-min-max-date.scenario';
import { Scenario as StatefulDatepickerQuickSelect } from './stateful-datepicker-quick-select.scenario';
import { Scenario as StatefulDatepicker } from './stateful-datepicker.scenario';
import { Scenario as StatefulRangeDatepicker } from './stateful-range-datepicker.scenario';
import { Scenario as StatefulRangeQuickSelectScenario } from './stateful-range-quick-select.scenario';

export const CalendarIconOverrides = () => <CalendarIconOverridesScenario />;
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
export const RangeNullStartDate = () => <DatepickerRangeNullStartDate />;
export const RangeSeparateInputs = () => <DatepickerRangeSeparateInputs />;
export const RangeLockedBehavior = () => <DatepickerRangeLockedBehavior />;
export const RangeExcludeDates = () => <DatepickerRangeExcludeDates />;
export const Datepicker = () => <DatepickerDefault />;
export const DatepickerTime = () => <DatepickerTimeScenario />;
export const DatepickerFormControl = () => <DatepickerFormControlScenario />;
export const OnChangeFlow = () => <DatepickerOnChangeFlow />;
export const StatefulColorStates = () => <DatepickersColorStates />;
export const StatefulComposedRange = () => <DatepickersComposedRange />;
export const StatefulComposedSingle = () => <DatepickersComposedSingle />;
export const StatefulCalendarOverrides = () => <StatefulCalendarOverridesScenario />;
export const StatefulCalendar = () => <StatefulCalendarScenario />;
export const StatefulMinMaxDate = () => <StatefulDatepickerMinMaxDate />;
export const StatefulQuickSelect = () => <StatefulDatepickerQuickSelect />;
export const Stateful = () => <StatefulDatepicker />;
export const StatefulRange = () => <StatefulRangeDatepicker />;
export const StatefulRangeQuickSelect = () => <StatefulRangeQuickSelectScenario />;
