/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {DateIOAdapter} from './types.js';
import {monthDisabledBefore} from './index.js';

const MINUTE = 60;
const HOUR = MINUTE * 60;

class DateHelpers<T> {
  adapter: DateIOAdapter<T>;
  constructor(adapter: DateIOAdapter<T>) {
    this.adapter = adapter;
  }
  dateToSeconds: T => number = date => {
    const seconds = this.adapter.getSeconds(date);
    const minutes = this.adapter.getMinutes(date) * MINUTE;
    const hours = this.adapter.getHours(date) * HOUR;
    return seconds + minutes + hours;
  };
  secondsToHourMinute: number => [number, number] = seconds => {
    const d = this.adapter.toJsDate(this.adapter.date(seconds * 1000));
    return [d.getUTCHours(), d.getUTCMinutes()];
  };
  differenceInCalendarMonths: (T, T) => number = (fromDate, toDate) => {
    var yearDiff =
      this.adapter.getYear(fromDate) - this.adapter.getYear(toDate);
    var monthDiff =
      this.adapter.getMonth(fromDate) - this.adapter.getMonth(toDate);
    return yearDiff * 12 + monthDiff;
  };
  differenceInCalendarDays: (T, T) => number = (fromDate, toDate) => {
    const msDiff = this.adapter.getDiff(fromDate, toDate);
    return msDiff / 864e5;
  };
  subMonths: (T, number) => T = (date, months) => {
    return this.adapter.addMonths(date, months * -1);
  };
  monthDisabledBefore: (
    T,
    {minDate: ?T, includeDates: ?Array<T>},
  ) => boolean = (day, {minDate, includeDates} = {}) => {
    const previousMonth = this.subMonths(day, 1);
    return (
      (!!minDate &&
        this.differenceInCalendarMonths(minDate, previousMonth) > 0) ||
      (!!includeDates &&
        includeDates.every(
          includeDate =>
            this.differenceInCalendarMonths(includeDate, previousMonth) > 0,
        )) ||
      false
    );
  };
  isDayDisabled: (
    T,
    {
      minDate: ?T,
      maxDate: ?T,
      excludeDates: ?Array<T>,
      includeDates: ?Array<T>,
      filterDate: ?(day: T) => boolean,
    },
  ) => boolean = (
    day,
    {minDate, maxDate, excludeDates, includeDates, filterDate} = {},
  ) => {
    return (
      this.isOutOfBounds(day, {minDate, maxDate}) ||
      (excludeDates &&
        excludeDates.some(excludeDate =>
          this.adapter.isSameDay(day, excludeDate),
        )) ||
      (includeDates &&
        !includeDates.some(includeDate =>
          this.adapter.isSameDay(day, includeDate),
        )) ||
      (filterDate && !filterDate(day)) ||
      false
    );
  };
  isOutOfBounds: (T, {minDate: ?T, maxDate: ?T}) => boolean = (
    day,
    {minDate, maxDate} = {},
  ) => {
    return (
      (!!minDate && this.differenceInCalendarDays(day, minDate) < 0) ||
      (!!maxDate && this.differenceInCalendarDays(day, maxDate) > 0)
    );
  };
}

export default DateHelpers;
