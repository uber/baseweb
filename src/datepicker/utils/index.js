/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable import/extensions */

import defaultAdapter from './date-fns-adapter';
import DateHelpers from './date-helpers';

const defaultDateHelpers = new DateHelpers<Date>(defaultAdapter);

type DirtyDate = Date | number;
const {date: wrapDate} = defaultAdapter;

export const formatDate = defaultDateHelpers.formatDate;
export const getStartOfWeek = defaultDateHelpers.getStartOfWeek;
export const getEndOfWeek = defaultDateHelpers.getEndOfWeek;
export const getStartOfMonth = defaultDateHelpers.getStartOfMonth;
export const getEndOfMonth = defaultDateHelpers.getEndOfMonth;
export const isSameYear = defaultDateHelpers.isSameYear;
export const isSameMonth = defaultDateHelpers.isSameMonth;
export const isSameDay = defaultDateHelpers.isSameDay;
export const isDayInRange = defaultDateHelpers.isDayInRange;
export const isStartOfMonth = defaultDateHelpers.isStartOfMonth;
export const isEndOfMonth = defaultDateHelpers.isEndOfMonth;
export const getWeekdayMinInLocale = defaultDateHelpers.getWeekdayMinInLocale;
export const getWeekdayInLocale = defaultDateHelpers.getWeekdayInLocale;
export const getMonthInLocale = defaultDateHelpers.getMonthInLocale;
export const getQuarterInLocale = defaultDateHelpers.getQuarterInLocale;
export const isDayDisabled = defaultDateHelpers.isDayDisabled;
export const isOutOfBounds = defaultDateHelpers.isOutOfBounds;
export const monthDisabledBefore = defaultDateHelpers.monthDisabledBefore;
export const monthDisabledAfter = defaultDateHelpers.monthDisabledAfter;
export const getEffectiveMinDate = defaultDateHelpers.getEffectiveMinDate;
export const getEffectiveMaxDate = defaultDateHelpers.getEffectiveMaxDate;
export const applyTimeToDate = defaultDateHelpers.applyTimeToDate;
export const applyDateToTime = defaultDateHelpers.applyDateToTime;

const createDirtySetter = (setter: (Date, number) => Date) => {
  return (dirtyDate: DirtyDate, number: number) =>
    setter(wrapDate(dirtyDate), number);
};

const createDirtyGetter = (getter: Date => number) => {
  return (dirtyDate: DirtyDate) => getter(wrapDate(dirtyDate));
};

const createDirtyCompare = (compare: (Date, Date) => boolean) => {
  return (fromDirty: DirtyDate, toDirty: DirtyDate) => {
    return compare(wrapDate(fromDirty), wrapDate(toDirty));
  };
};

// ** Re-exported from date-fns **

// these need to be able to accept either number or date
// to maintain parity with the old exports

// ** Date Setters **
export const setSeconds = createDirtySetter(defaultDateHelpers.setSeconds);
export const setMinutes = createDirtySetter(defaultDateHelpers.setMinutes);
export const setHours = createDirtySetter(defaultDateHelpers.setHours);
export const setMonth = createDirtySetter(defaultDateHelpers.setMonth);
export const setYear = createDirtySetter(defaultDateHelpers.setYear);

// ** Date Getters **
export const getMinutes = createDirtyGetter(defaultDateHelpers.getMinutes);
export const getHours = createDirtyGetter(defaultDateHelpers.getHours);
export const getDate = createDirtyGetter(defaultDateHelpers.getDate);
export const getMonth = createDirtyGetter(defaultDateHelpers.getMonth);
export const getYear = createDirtyGetter(defaultDateHelpers.getYear);

// ** Date Math
export const addDays = createDirtySetter(defaultDateHelpers.addDays);
export const addWeeks = createDirtySetter(defaultDateHelpers.addWeeks);
export const addMonths = createDirtySetter(defaultDateHelpers.addMonths);
export const addYears = createDirtySetter(defaultDateHelpers.addYears);
export const subDays = createDirtySetter(defaultDateHelpers.subDays);
export const subWeeks = createDirtySetter(defaultDateHelpers.subWeeks);
export const subMonths = createDirtySetter(defaultDateHelpers.subMonths);
export const subYears = createDirtySetter(defaultDateHelpers.subYears);

// ** Date Comparison

export const isBefore = createDirtyCompare(defaultDateHelpers.isBefore);
export const isAfter = createDirtyCompare(defaultDateHelpers.isAfter);

// eslint-disable-next-line flowtype/no-weak-types
export const format = (date: Date, format: string, locale: ?any) =>
  defaultDateHelpers.format(date, format, locale);
