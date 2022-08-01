/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { DateIOAdapter, DateInput, AdapterOptions } from './types';

const MINUTE = 60;
const HOUR = MINUTE * 60;

class DateHelpers<T> {
  adapter: DateIOAdapter<T>;
  constructor(adapter: DateIOAdapter<T>) {
    this.adapter = this.cloneAdapter(adapter);
  }
  cloneAdapter: (
    b: DateIOAdapter<T>,
    a?: ((a: AdapterOptions) => AdapterOptions) | null
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
          weekdaymin: 'EEEEEE',
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
    const defaultGetOptions = (instance) => ({
      formats: instance.formats,
      locale: instance.locale,
    });
    const updateOptions = updateOptionsBase || defaultGetOptions;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const UtilsClass: any = adapter.constructor;
    const className = adapter.constructor.name;
    // This ensures that if the adapter class isn't
    // supported it just falls back the default formats

    // NOTE: in e2e tests playwright seems to add
    // a JSHandle wrapping class to all objects
    // so className always resolves to JSHandle:e
    // and if falls back to the default
    // if we want to test other adapter implementation
    // in e2e tests down the road, we're going to have
    // to figure that out
    const { getOptions = defaultGetOptions, formats } =
      adapterMap[className] || adapterMap.DateFnsUtils;
    const options = getOptions(adapter);
    return new UtilsClass(
      Object.assign(
        {},
        updateOptions(
          Object.assign({}, options, {
            formats: Object.assign({}, options.formats, formats),
          })
        )
      )
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format: (c: T, b: string, a?: any) => string = (date, format, locale) => {
    const adapter = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;

    return adapter.format(date, format);
  };
  getAdapterWithNewLocale: (a: unknown) => DateIOAdapter<T> = (locale) => {
    return this.cloneAdapter(this.adapter, (options) => ({ ...options, locale }));
  };
  date: (a: DateInput<T> | void) => T = (date) => this.adapter.date(date);
  dateToSeconds: (a: T) => number = (date) => {
    const seconds = this.adapter.getSeconds(date);
    const minutes = this.adapter.getMinutes(date) * MINUTE;
    const hours = this.adapter.getHours(date) * HOUR;
    return seconds + minutes + hours;
  };
  secondsToHourMinute: (a: number) => [number, number] = (seconds) => {
    const d = this.adapter.toJsDate(this.adapter.date(seconds * 1000));
    return [d.getUTCHours(), d.getUTCMinutes()];
  };
  differenceInCalendarMonths: (b: T, a: T) => number = (fromDate, toDate) => {
    var yearDiff = this.adapter.getYear(fromDate) - this.adapter.getYear(toDate);
    var monthDiff = this.adapter.getMonth(fromDate) - this.adapter.getMonth(toDate);
    return yearDiff * 12 + monthDiff;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getStartOfWeek: (b: T, a?: any) => T = (date, locale) => {
    const adapter = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;
    // rewrapping this date here ensures that the locale will be taken into account in all adapters
    return adapter.startOfWeek(adapter.date(date));
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formatDate: (c: T, b: string, a?: any) => string = (date, formatString, locale) => {
    const adapter = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;
    return adapter.formatByString(date, formatString);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getWeekdayMinInLocale: (b: T, a: any) => string = (date, locale) => {
    return this.getAdapterWithNewLocale(locale).format(date, 'weekdaymin');
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getMonthInLocale: (b: number, a: any) => string = (monthNumber, locale) => {
    const localeAdapter = this.getAdapterWithNewLocale(locale);
    return localeAdapter.format(localeAdapter.setMonth(localeAdapter.date(), monthNumber), 'month');
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getWeekdayInLocale: (b: T, a: any) => string = (date, locale) => {
    return this.getAdapterWithNewLocale(locale).format(date, 'weekday');
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getQuarterInLocale: (b: number, a: any) => string = (quarterNumber, locale) => {
    const localeAdapter = this.getAdapterWithNewLocale(locale);
    return localeAdapter.format(
      localeAdapter.setMonth(localeAdapter.date(), quarterNumber * 3),
      'quarter'
    );
  };
  getEndOfWeek: (a: T) => T = (date) => {
    return this.adapter.endOfWeek(date);
  };
  getDay: (a: T) => number = (date) => {
    return Number(this.adapter.formatByString(date, 'e')) - 1;
  };
  addWeeks: (b: T, a: number) => T = (date, weekNumber) => {
    return this.adapter.addDays(date, weekNumber * 7);
  };
  subWeeks: (b: T, a: number) => T = (date, weekNumber) => {
    return this.addWeeks(date, weekNumber * -1);
  };
  addYears: (b: T, a: number) => T = (date, yearNumber) => {
    return this.adapter.addMonths(date, yearNumber * 12);
  };
  subYears: (b: T, a: number) => T = (date, yearNumber) => {
    return this.addYears(date, yearNumber * -1);
  };
  isSameYear: (b?: T | null, a?: T | null) => boolean = (fromDate, toDate) => {
    if (fromDate && toDate) {
      return this.adapter.isSameYear(fromDate, toDate);
    }
    return false;
  };
  isStartOfMonth: (a: T) => boolean = (date) => {
    return this.adapter.isSameDay(date, this.adapter.startOfMonth(date));
  };
  isEndOfMonth: (a: T) => boolean = (date) => {
    return this.adapter.isSameDay(date, this.adapter.endOfMonth(date));
  };
  isDayInRange: (c: T, b: T, a: T) => boolean = (date, startDate, endDate) => {
    return this.adapter.isWithinRange(date, [startDate, endDate]);
  };
  isSameDay: (b?: T | null, a?: T | null) => boolean = (fromDate, toDate) => {
    if (fromDate && toDate) {
      return this.adapter.isSameDay(fromDate, toDate);
    }
    return false;
  };
  isSameMonth: (b?: T | null, a?: T | null) => boolean = (fromDate, toDate) => {
    if (fromDate && toDate) {
      return this.adapter.isSameMonth(fromDate, toDate);
    }
    return false;
  };
  dateRangeIncludesDates: (b: Array<T | undefined | null>, a?: Array<T> | null) => boolean = (
    dateRange,
    dates
  ) => {
    const [startDate, endDate] = dateRange;
    if (startDate && endDate && Array.isArray(dates) && dates.length) {
      for (let i = 0; i < dates.length; i++) {
        const day = dates[i];
        if (this.isDayInRange(day, startDate, endDate)) {
          return true;
        }
      }
    }
    return false;
  };
  subDays: (b: T, a: number) => T = (date, days) => {
    return this.adapter.addDays(date, days * -1);
  };
  subMonths: (b: T, a: number) => T = (date, months) => {
    return this.adapter.addMonths(date, months * -1);
  };
  min: (a: Array<T>) => T = (dates) => {
    return dates.reduce((minDate, date) => {
      return this.adapter.isBefore(date, minDate) ? date : minDate;
    });
  };
  max: (a: Array<T>) => T = (dates) => {
    return dates.reduce((maxDate, date) => {
      return this.adapter.isAfter(date, maxDate) ? date : maxDate;
    });
  };
  getEffectiveMinDate: (a: { minDate?: T | null; includeDates?: Array<T> }) => T = ({
    minDate,
    includeDates,
  }) => {
    if (includeDates && minDate) {
      let minDates = includeDates.filter((includeDate) =>
        this.isOnOrAfterDay(includeDate, minDate)
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
  getEffectiveMaxDate: (a: { maxDate?: T | null; includeDates?: Array<T> }) => T = ({
    maxDate,
    includeDates,
  }) => {
    if (includeDates && maxDate) {
      let maxDates = includeDates.filter((includeDate) =>
        this.isOnOrBeforeDay(includeDate, maxDate)
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
    b: T,
    a: {
      minDate?: T | undefined | null;
      includeDates?: Array<T> | undefined | null;
    }
  ) => boolean = (day, { minDate, includeDates } = {}) => {
    const previousMonth = this.subMonths(day, 1);
    return (
      (!!minDate && this.differenceInCalendarMonths(minDate, previousMonth) > 0) ||
      (!!includeDates &&
        includeDates.every(
          (includeDate) => this.differenceInCalendarMonths(includeDate, previousMonth) > 0
        )) ||
      false
    );
  };
  monthDisabledAfter: (
    b: T,
    a: {
      maxDate?: T | undefined | null;
      includeDates?: Array<T> | undefined | null;
    }
  ) => boolean = (day, { maxDate, includeDates } = {}) => {
    const nextMonth = this.adapter.addMonths(day, 1);
    return (
      (!!maxDate && this.differenceInCalendarMonths(nextMonth, maxDate) > 0) ||
      (!!includeDates &&
        includeDates.every(
          (includeDate) => this.differenceInCalendarMonths(nextMonth, includeDate) > 0
        )) ||
      false
    );
  };
  setDate: (b: T, a: number) => T = (date, dayNumber) => {
    const startOfMonthNoTime = this.adapter.startOfMonth(date);
    const startOfMonthHoursAndMinutes = this.adapter.mergeDateAndTime(startOfMonthNoTime, date);
    const startOfMonth = this.adapter.setSeconds(
      startOfMonthHoursAndMinutes,
      this.adapter.getSeconds(date)
    );
    return this.adapter.addDays(startOfMonth, dayNumber - 1);
  };
  getDate: (a: T) => number = (date) => Number(this.adapter.format(date, 'dayOfMonthNumber'));
  applyDateToTime: (b: T | undefined | null, a: T) => T = (time, date) => {
    if (!time) return date;
    const yearNumber = this.adapter.getYear(date);
    const monthNumber = this.adapter.getMonth(date);
    const dayNumber = this.getDate(date);
    const yearDate = this.adapter.setYear(time, yearNumber);
    const monthDate = this.adapter.setMonth(yearDate, monthNumber);
    return this.setDate(monthDate, dayNumber);
  };
  applyTimeToDate: (b: T | undefined | null, a: T) => T = (date, time) => {
    if (!date) return time;
    return this.adapter.setSeconds(this.adapter.mergeDateAndTime(date, time), 0);
  };
  isDayDisabled: (
    b: T,
    a: {
      minDate?: T | undefined | null;
      maxDate?: T | undefined | null;
      excludeDates?: Array<T> | undefined | null;
      includeDates?: Array<T> | undefined | null;
      filterDate?: ((day: T) => boolean) | undefined | null;
    }
  ) => boolean = (day, { minDate, maxDate, excludeDates, includeDates, filterDate } = {}) => {
    return (
      this.isOutOfBounds(day, { minDate, maxDate }) ||
      (excludeDates &&
        excludeDates.some((excludeDate) => this.adapter.isSameDay(day, excludeDate))) ||
      (includeDates &&
        !includeDates.some((includeDate) => this.adapter.isSameDay(day, includeDate))) ||
      (filterDate && !filterDate(day)) ||
      false
    );
  };
  //Tue Apr 12 2011 00:00:00 GMT-0500, Tue Apr 12 2011 11:21:31 GMT-0500
  isOnOrAfterDay: (b: T, a: T) => boolean = (fromDate, toDate) => {
    if (this.adapter.isSameDay(fromDate, toDate)) {
      return true;
    }
    return this.adapter.isAfter(fromDate, toDate);
  };
  isOnOrBeforeDay: (b: T, a: T) => boolean = (fromDate, toDate) => {
    if (this.adapter.isSameDay(fromDate, toDate)) {
      return true;
    }
    return this.adapter.isBefore(fromDate, toDate);
  };
  isOutOfBounds: (
    b: T,
    a: {
      minDate?: T | undefined | null;
      maxDate?: T | undefined | null;
    }
  ) => boolean = (day, { minDate, maxDate } = {}) => {
    return (
      (!!minDate && !this.isOnOrAfterDay(day, minDate)) ||
      (!!maxDate && !this.isOnOrBeforeDay(day, maxDate))
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parseString: (c: string, b: string, a?: any | null) => T = (string, formatString, locale) => {
    const adapter = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;

    return adapter.parse(string, formatString);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parse: (c: string, b: string, a?: any | null) => T = (string, format, locale) => {
    const adapter = locale ? this.getAdapterWithNewLocale(locale) : this.adapter;

    return adapter.parse(string, adapter.formats[format]);
  };
  setMilliseconds: (b: T, a: number) => T = (date, milliseconds) => {
    return this.adapter.date(
      this.adapter.getSeconds(this.adapter.startOfDay(date)) * 1000 + milliseconds
    );
  };
  set: (
    a: T,
    values: {
      year?: number;
      date?: number;
      month?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
    }
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
  getQuarter: (a: T) => number = (date) => {
    return Math.floor(this.getMonth(date) / 3) + 1;
  };
  setSeconds: (b: T, a: number) => T = (date, seconds) => this.adapter.setSeconds(date, seconds);
  setMinutes: (b: T, a: number) => T = (date, minutes) => this.adapter.setMinutes(date, minutes);
  setHours: (b: T, a: number) => T = (date, hours) => this.adapter.setHours(date, hours);
  setMonth: (b: T, a: number) => T = (date, monthNumber) =>
    this.adapter.setMonth(date, monthNumber);
  setYear: (b: T, a: number) => T = (date, yearNumber) => this.adapter.setYear(date, yearNumber);
  getMinutes: (a: T) => number = (date) => this.adapter.getMinutes(date);
  getHours: (a: T) => number = (date) => this.adapter.getHours(date);
  getMonth: (a: T) => number = (date) => this.adapter.getMonth(date);
  getYear: (a: T) => number = (date) => this.adapter.getYear(date);
  getStartOfMonth: (a: T) => T = (date) => this.adapter.startOfMonth(date);
  getEndOfMonth: (a: T) => T = (date) => this.adapter.endOfMonth(date);
  addDays: (b: T, a: number) => T = (date, days) => this.adapter.addDays(date, days);
  addMonths: (b: T, a: number) => T = (date, months) => this.adapter.addMonths(date, months);
  isBefore: (b: T, a: T) => boolean = (fromDate, toDate) => this.adapter.isBefore(fromDate, toDate);
  isAfter: (b: T, a: T) => boolean = (fromDate, toDate) => this.adapter.isAfter(fromDate, toDate);
  isEqual: (b: T, a: T) => boolean = (fromDate, toDate) => this.adapter.isEqual(fromDate, toDate);
  isValid: (a: unknown) => boolean = (possibleDate) => {
    return this.adapter.isValid(possibleDate);
  };
}

export default DateHelpers;
