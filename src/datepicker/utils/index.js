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

export const formatDate = defaultDateHelpers.formatDate;
export const setSeconds = defaultDateHelpers.setSeconds;
export const setMinutes = defaultDateHelpers.setMinutes;
export const setHours = defaultDateHelpers.setHours;
export const setMonth = defaultDateHelpers.setMonth;
export const setYear = defaultDateHelpers.setYear;
export const getMinutes = defaultDateHelpers.getMinutes;
export const getHours = defaultDateHelpers.getHours;
export const getMonth = defaultDateHelpers.getMonth;
export const getYear = defaultDateHelpers.getYear;
export const getDay = defaultDateHelpers.getDay;
export const getDate = defaultDateHelpers.getDate;
export const getStartOfWeek = defaultDateHelpers.getStartOfWeek;
export const getEndOfWeek = defaultDateHelpers.getEndOfWeek;
export const getStartOfMonth = defaultDateHelpers.getStartOfMonth;
export const getEndOfMonth = defaultDateHelpers.getEndOfMonth;
export const addDays = defaultDateHelpers.addDays;
export const addWeeks = defaultDateHelpers.addWeeks;
export const addMonths = defaultDateHelpers.addMonths;
export const addYears = defaultDateHelpers.addYears;
export const subDays = defaultDateHelpers.subDays;
export const subWeeks = defaultDateHelpers.subWeeks;
export const subMonths = defaultDateHelpers.subMonths;
export const subYears = defaultDateHelpers.subYears;
export const isBefore = defaultDateHelpers.isBefore;
export const isAfter = defaultDateHelpers.isAfter;
export const isSameYear = defaultDateHelpers.isSameYear;
export const isSameMonth = defaultDateHelpers.isSameMonth;
export const isSameDay = defaultDateHelpers.isSameDay;
export const isDayInRange = defaultDateHelpers.isDayInRange;
export const isStartOfMonth = defaultDateHelpers.isStartOfMonth;
export const isEndOfMonth = defaultDateHelpers.isEndOfMonth;
export const getWeekdayMinInLocale = defaultDateHelpers.getWeekdayMinInLocale;
export const getWeekdayInLocale = defaultDateHelpers.getWeekdayInLocale;
export const getMonthInLocale = defaultDateHelpers.getMonthInLocale;
export const isDayDisabled = defaultDateHelpers.isDayDisabled;
export const isOutOfBounds = defaultDateHelpers.isOutOfBounds;
export const monthDisabledBefore = defaultDateHelpers.monthDisabledBefore;
export const monthDisabledAfter = defaultDateHelpers.monthDisabledAfter;
export const getEffectiveMinDate = defaultDateHelpers.getEffectiveMinDate;
export const getEffectiveMaxDate = defaultDateHelpers.getEffectiveMaxDate;
export const applyTimeToDate = defaultDateHelpers.applyTimeToDate;
export const applyDateToTime = defaultDateHelpers.applyDateToTime;
