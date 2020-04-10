/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {DateIOAdapter} from './types.js';

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
}

export default DateHelpers;
