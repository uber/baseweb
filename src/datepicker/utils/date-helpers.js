/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {DateIOAdapter, DateInput, AdapterOptions} from './types.js';

const MINUTE = 60;
const HOUR = MINUTE * 60;

class DateHelpers<T> {
  adapter: DateIOAdapter<T>;
  constructor(adapter: DateIOAdapter<T>) {
    this.adapter = this.cloneAdapter(adapter);
  }
  cloneAdapter: (
    DateIOAdapter<T>,
    ?(AdapterOptions) => AdapterOptions,
  ) => DateIOAdapter<T> = (adapter, updateOptionsBase) => {
    const adapterMap = {
      // all utils classes set the arguments passed into their constructor as public members in some way
      // it just varies by class, most just set formats and locale, but this handles the exceptions
      MomentUtils: {
        formats: {
          monthNumber: 'M',
          dayOfMonthNumber: 'D',
          fullOrdinalWeek: 'dddd, MMMM Do YYYY',
          slashDate: 'YYYY/MM/DD',
          weekday: 'dddd',
          // moment does not have a similar 'single character' weekday format like the other libraries
          // the format below will only supply two character abbreviations.
          weekdaymin: 'dd',
          quarter: '[Q]Q',
        },
      },
      DateFnsUtils: {
        formats: {
          monthNumber: 'M',
          dayOfMonthNumber: 'd',
          weekday: 'EEEE',
          weekdaymin: 'EEEEE',
          slashDate: 'yyyy/MM/dd',
          fullOrdinalWeek: 'EEEE, MMMM do yyyy',
          quarter: 'QQQ',
        },
      },
      LuxonUtils: {
        formats: {
          monthNumber: 'M',
          dayOfMonthNumber: 'd',
          weekday: 'EEEE',
          weekdaymin: 'EEEEE',
          slashDate: 'yyyy/MM/dd',
          fullOrdinalWeek: 'EEEE, MMMM dd yyyy',
          quarter: 'Qq',
        },
      },
    };
    const defaultGetOptions = instance => ({
      formats: instance.formats,
      locale: instance.locale,
    });
    const updateOptions = updateOptionsBase || defaultGetOptions;
    const UtilsClass = adapter.constructor;
    const className = adapter.constructor.name;
    // This ensures that if the adapter class isn't
    // supported it just falls back the default formats

    // NOTE: in e2e tests puppeteer seems to add
    // a JSHandle wrapping class to all objects
    // so className always resolves to JSHandle:e
    // and if falls back to the default
    // if we want to test other adapter implementation
    // in e2e tests down the road, we're going to have
    // to figure that out
    const {getOptions = defaultGetOptions, formats} =
      adapterMap[className] || adapterMap['DateFnsUtils'];
    const options = getOptions(adapter);
    return new UtilsClass(
      Object.assign(
        {},
        updateOptions(
          Object.assign({}, options, {
            formats: Object.assign({}, options.formats, formats),
          }),
        ),
      ),
    );
  };
  // eslint-disable-next-line flowtype/no-weak-types
  format: (T, string, any) => string = (date, format, locale) => {
    const adapter = locale
      ? this.getAdapterWithNewLocale(locale)
      : this.adapter;

    return adapter.format(date, format);
  };
  getAdapterWithNewLocale: mixed => DateIOAdapter<T> = locale => {
    return this.cloneAdapter(this.adapter, options => ({...options, locale}));
  };
  date: (DateInput<T> | void) => T = date => this.adapter.date(date);
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
  // eslint-disable-next-line flowtype/no-weak-types
  getStartOfWeek: (T, any) => T = (date, locale) => {
    const adapter = locale
      ? this.getAdapterWithNewLocale(locale)
      : this.adapter;
    // rewrapping this date here ensures that the locale will be taken into account in all adapters
    return adapter.startOfWeek(adapter.date(date));
  };
  // eslint-disable-next-line flowtype/no-weak-types
  formatDate: (T, string, any) => string = (date, formatString, locale) => {
    const adapter = locale
      ? this.getAdapterWithNewLocale(locale)
      : this.adapter;
    return adapter.formatByString(date, formatString);
  };
  // eslint-disable-next-line flowtype/no-weak-types
  getWeekdayMinInLocale: (T, any) => string = (date, locale) => {
    return this.getAdapterWithNewLocale(locale).format(date, 'weekdaymin');
  };
  // eslint-disable-next-line flowtype/no-weak-types
  getMonthInLocale: (number, any) => string = (monthNumber, locale) => {
    const localeAdapter = this.getAdapterWithNewLocale(locale);
    return localeAdapter.format(
      localeAdapter.setMonth(localeAdapter.date(), monthNumber),
      'month',
    );
  };
  // eslint-disable-next-line flowtype/no-weak-types
  getWeekdayInLocale: (T, any) => string = (date, locale) => {
    return this.getAdapterWithNewLocale(locale).format(date, 'weekday');
  };
  // eslint-disable-next-line flowtype/no-weak-types
  getQuarterInLocale: (number, any) => string = (quarterNumber, locale) => {
    const localeAdapter = this.getAdapterWithNewLocale(locale);
    return localeAdapter.format(
      localeAdapter.setMonth(localeAdapter.date(), quarterNumber * 3),
      'quarter',
    );
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
  getEffectiveMinDate: ({minDate: ?T, includeDates: ?Array<T>}) => T = ({
    minDate,
    includeDates,
  }) => {
    if (includeDates && minDate) {
      let minDates = includeDates.filter(includeDate =>
        this.isOnOrAfterDay(includeDate, minDate),
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
  getEffectiveMaxDate: ({maxDate: ?T, includeDates: ?Array<T>}) => T = ({
    maxDate,
    includeDates,
  }) => {
    if (includeDates && maxDate) {
      let maxDates = includeDates.filter(includeDate =>
        this.isOnOrBeforeDay(includeDate, maxDate),
      );
      return this.max(maxDates);
    } else if (includeDates) {
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
  getDate: T => number = date =>
    Number(this.adapter.format(date, 'dayOfMonthNumber'));
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
  //Tue Apr 12 2011 00:00:00 GMT-0500, Tue Apr 12 2011 11:21:31 GMT-0500
  isOnOrAfterDay: (T, T) => boolean = (fromDate, toDate) => {
    if (this.adapter.isSameDay(fromDate, toDate)) {
      return true;
    }
    return this.adapter.isAfter(fromDate, toDate);
  };
  isOnOrBeforeDay: (T, T) => boolean = (fromDate, toDate) => {
    if (this.adapter.isSameDay(fromDate, toDate)) {
      return true;
    }
    return this.adapter.isBefore(fromDate, toDate);
  };
  isOutOfBounds: (T, {minDate: ?T, maxDate: ?T}) => boolean = (
    day,
    {minDate, maxDate} = {},
  ) => {
    return (
      (!!minDate && !this.isOnOrAfterDay(day, minDate)) ||
      (!!maxDate && !this.isOnOrBeforeDay(day, maxDate))
    );
  };
  // eslint-disable-next-line flowtype/no-weak-types
  parseString: (string, string, ?any) => T = (string, formatString, locale) => {
    const adapter = locale
      ? this.getAdapterWithNewLocale(locale)
      : this.adapter;

    return adapter.parse(string, formatString);
  };
  // eslint-disable-next-line flowtype/no-weak-types
  parse: (string, string, ?any) => T = (string, format, locale) => {
    const adapter = locale
      ? this.getAdapterWithNewLocale(locale)
      : this.adapter;

    return adapter.parse(string, adapter.formats[format]);
  };
  setMilliseconds: (T, number) => T = (date, milliseconds) => {
    return this.adapter.date(
      this.adapter.getSeconds(this.adapter.startOfDay(date)) * 1000 +
        milliseconds,
    );
  };
  set: (
    T,
    values: {
      year?: number,
      date?: number,
      month?: number,
      hours?: number,
      minutes?: number,
      seconds?: number,
    },
  ) => T = (date, values) => {
    let updatedDate = date;
    if (values.year != null) {
      updatedDate = this.setYear(updatedDate, values.year);
    }

    if (values.month != null) {
      updatedDate = this.setMonth(updatedDate, values.month);
    }

    if (values.date != null) {
      updatedDate = this.setDate(updatedDate, Number(values.date));
    }

    if (values.hours != null) {
      updatedDate = this.setHours(updatedDate, Number(values.hours));
    }

    if (values.minutes != null) {
      updatedDate = this.setMinutes(updatedDate, Number(values.minutes));
    }

    if (values.seconds != null) {
      updatedDate = this.setSeconds(updatedDate, Number(values.seconds));
    }

    return updatedDate;
  };
  getQuarter: T => number = date => {
    return Math.floor(this.getMonth(date) / 3) + 1;
  };
  setSeconds: (T, number) => T = (date, seconds) =>
    this.adapter.setSeconds(date, seconds);
  setMinutes: (T, number) => T = (date, minutes) =>
    this.adapter.setMinutes(date, minutes);
  setHours: (T, number) => T = (date, hours) =>
    this.adapter.setHours(date, hours);
  setMonth: (T, number) => T = (date, monthNumber) =>
    this.adapter.setMonth(date, monthNumber);
  setYear: (T, number) => T = (date, yearNumber) =>
    this.adapter.setYear(date, yearNumber);
  getMinutes: T => number = date => this.adapter.getMinutes(date);
  getHours: T => number = date => this.adapter.getHours(date);
  getMonth: T => number = date => this.adapter.getMonth(date);
  getYear: T => number = date => this.adapter.getYear(date);
  getStartOfMonth: T => T = date => this.adapter.startOfMonth(date);
  getEndOfMonth: T => T = date => this.adapter.endOfMonth(date);
  addDays: (T, number) => T = (date, days) => this.adapter.addDays(date, days);
  addMonths: (T, number) => T = (date, months) =>
    this.adapter.addMonths(date, months);
  isBefore: (T, T) => boolean = (fromDate, toDate) =>
    this.adapter.isBefore(fromDate, toDate);
  isAfter: (T, T) => boolean = (fromDate, toDate) =>
    this.adapter.isAfter(fromDate, toDate);
  isEqual: (T, T) => boolean = (fromDate, toDate) =>
    this.adapter.isEqual(fromDate, toDate);
  isValid: mixed => boolean = possibleDate => {
    return this.adapter.isValid(possibleDate);
  };
}

export default DateHelpers;
