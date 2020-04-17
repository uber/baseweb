/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {DateIOAdapter} from './types.js';

const adapterOptionMap = {
  // all utils classes set the arguments passed into their constructor as public members in some way
  // it just varies by class, most just set formats and locale, but this handles the exceptions
  DayjsUtils: instance => ({
    instance: instance.rawJsInstance,
    formats: instance.formats,
    locale: instance.locale,
  }),
};

const MINUTE = 60;
const HOUR = MINUTE * 60;

class DateHelpers<T> {
  adapter: DateIOAdapter<T>;
  constructor(adapter: DateIOAdapter<T>) {
    this.adapter = adapter;
  }
  getAdapterWithNewLocale: mixed => DateIOAdapter<T> = locale => {
    const defaultGetOptions = instance => ({
      formats: instance.formats,
      locale: instance.locale,
    });

    const className = this.adapter.constructor.name;
    const UtilsClass = this.adapter.constructor;
    const getOptions = adapterOptionMap[className] || defaultGetOptions;

    const options = getOptions(this.adapter);
    return new UtilsClass({...options, locale});
  };
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
  getStartOfWeek: (T, locale: ?mixed) => T = (date, locale) => {
    const adapter = locale
      ? this.getAdapterWithNewLocale(locale)
      : this.adapter;
    return adapter.startOfWeek(date);
  };
  getEndOfWeek: T => T = date => {
    return this.adapter.endOfWeek(date);
  };
  getDay: T => number = date => {
    return Number(this.adapter.formatByString(date, 'e')) - 1;
  };
  addWeeks: (T, number) => T = (date, weekNumber) => {
    return this.adapter.addDays(date, weekNumber * 7);
  };
  subWeeks: (T, number) => T = (date, weekNumber) => {
    return this.addWeeks(date, weekNumber * -1);
  };
  addYears: (T, number) => T = (date, yearNumber) => {
    return this.adapter.addMonths(date, yearNumber * 12);
  };
  subYears: (T, number) => T = (date, yearNumber) => {
    return this.addYears(date, yearNumber * -1);
  };
  isSameYear: (?T, ?T) => boolean = (fromDate, toDate) => {
    if (fromDate && toDate) {
      return this.adapter.isSameYear(fromDate, toDate);
    }
    return false;
  };
  isStartOfMonth: T => boolean = date => {
    return this.adapter.isSameDay(date, this.adapter.startOfMonth(date));
  };
  isEndOfMonth: T => boolean = date => {
    return this.adapter.isSameDay(date, this.adapter.endOfMonth(date));
  };
  isDayInRange: (T, T, T) => boolean = (date, startDate, endDate) => {
    return this.adapter.isWithinRange(date, [startDate, endDate]);
  };
  isSameDay: (?T, ?T) => boolean = (fromDate, toDate) => {
    if (fromDate && toDate) {
      return this.adapter.isSameDay(fromDate, toDate);
    }
    return false;
  };
  isSameMonth: (?T, ?T) => boolean = (fromDate, toDate) => {
    if (fromDate && toDate) {
      return this.adapter.isSameMonth(fromDate, toDate);
    }
    return false;
  };
  differenceInCalendarDays: (T, T) => number = (fromDate, toDate) => {
    const msDiff = this.adapter.getDiff(fromDate, toDate);
    return msDiff / 864e5;
  };
  subDays: (T, number) => T = (date, days) => {
    return this.adapter.addDays(date, days * -1);
  };
  subMonths: (T, number) => T = (date, months) => {
    return this.adapter.addMonths(date, months * -1);
  };
  min: (Array<T>) => T = dates => {
    return dates.reduce((minDate, date) => {
      return this.adapter.isBefore(date, minDate) ? date : minDate;
    });
  };
  max: (Array<T>) => T = dates => {
    return dates.reduce((maxDate, date) => {
      return this.adapter.isAfter(date, maxDate) ? date : maxDate;
    });
  };
  getEffectiveMinDate: ({minDate?: T, includeDates?: Array<T>}) => T = ({
    minDate,
    includeDates,
  }) => {
    if (includeDates && minDate) {
      let minDates = includeDates.filter(
        includeDate => this.differenceInCalendarDays(includeDate, minDate) >= 0,
      );
      return this.min(minDates);
    } else if (includeDates && includeDates.length) {
      return this.min(includeDates);
    } else if (!(includeDates && includeDates.length) && minDate) {
      return minDate;
    }
    // this condition can't ever be reached
    // but flow isn't smart enough to see that all of the conditions are covered
    return this.adapter.date();
  };
  getEffectiveMaxDate: ({maxDate?: T, includeDates?: Array<T>}) => T = ({
    maxDate,
    includeDates,
  }) => {
    if (includeDates && maxDate) {
      let maxDates = includeDates.filter(
        includeDate => this.differenceInCalendarDays(includeDate, maxDate) <= 0,
      );
      // $FlowFixMe
      return this.max(maxDates);
    } else if (includeDates) {
      // $FlowFixMe
      return this.max(includeDates);
    } else if (!includeDates && maxDate) {
      return maxDate;
    }
    // this condition can't ever be reached
    // but flow isn't smart enough to see that all of the conditions are covered
    return this.adapter.date();
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
  monthDisabledAfter: (T, {maxDate: ?T, includeDates: ?Array<T>}) => boolean = (
    day,
    {maxDate, includeDates} = {},
  ) => {
    const nextMonth = this.adapter.addMonths(day, 1);
    return (
      (!!maxDate && this.differenceInCalendarMonths(nextMonth, maxDate) > 0) ||
      (!!includeDates &&
        includeDates.every(
          includeDate =>
            this.differenceInCalendarMonths(nextMonth, includeDate) > 0,
        )) ||
      false
    );
  };
  setDate: (T, number) => T = (date, dayNumber) => {
    const startOfMonthNoTime = this.adapter.startOfMonth(date);
    const startOfMonthHoursAndMinutes = this.adapter.mergeDateAndTime(
      startOfMonthNoTime,
      date,
    );
    const startOfMonth = this.adapter.setSeconds(
      startOfMonthHoursAndMinutes,
      this.adapter.getSeconds(date),
    );
    return this.adapter.addDays(startOfMonth, dayNumber - 1);
  };
  getDate: T => number = date => Number(this.adapter.formatByString(date, 'd'));
  applyDateToTime: (?T, T) => T = (time, date) => {
    if (!time) return date;
    const yearNumber = this.adapter.getYear(date);
    const monthNumber = this.adapter.getMonth(date);
    const dayNumber = this.getDate(date);
    const yearDate = this.adapter.setYear(time, yearNumber);
    const monthDate = this.adapter.setMonth(yearDate, monthNumber);
    return this.setDate(monthDate, dayNumber);
  };
  applyTimeToDate: (?T, T) => T = (date, time) => {
    if (!date) return time;
    return this.adapter.setSeconds(
      this.adapter.mergeDateAndTime(date, time),
      0,
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
