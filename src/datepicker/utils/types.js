/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

type DateValues<T> = T | string | number;
type DateInput<T> = ?DateValues<T>;

type Comparison<T> = (value: T, comparing: T) => boolean;
type DateInDateOut<T> = (value: T) => T;

type DateFuncT<T> = (DateInput<T> | void) => T;

export type DateIOAdapter<T> = {
  date: DateFuncT<T>,
  toJsDate(value: DateInput<T>): Date,
  parse(value: string, format: string): T,
  getCurrentLocaleCode(): string,
  is12HourCycleInCurrentLocale(): boolean,

  isNull(value?: T): boolean,
  isValid(value: DateInput<T>): boolean,
  getDiff: Comparison<T>,
  isEqual: Comparison<T>,
  isSameDay: Comparison<T>,
  isSameMonth: Comparison<T>,
  isSameYear: Comparison<T>,
  isSameHour: Comparison<T>,
  isAfter: Comparison<T>,
  isAfterDay: Comparison<T>,
  isAfterYear: Comparison<T>,

  isBeforeDay: Comparison<T>,
  isBeforeYear: Comparison<T>,
  isBefore: Comparison<T>,
  startOfMonth: DateInDateOut<T>,
  endOfMonth: DateInDateOut<T>,
  startOfWeek: DateInDateOut<T>,
  endOfWeek(value: T): T,
  addDays(value: T, count: number): T,

  startOfDay: DateInDateOut<T>,
  endOfDay: DateInDateOut<T>,
  format(value: T, formatKey: string): string,
  formatByString(value: T, formatString: string): string,
  formatNumber(numberToFormat: string): string,
  getHours(value: T): number,
  setHours(value: T, count: number): T,

  getMinutes(value: T): number,
  setMinutes(value: T, count: number): T,

  getSeconds(value: T): number,
  setSeconds(value: T, count: number): T,

  getMonth(value: T): number,
  setMonth(value: T, count: number): T,
  getNextMonth: DateInDateOut<T>,
  getPreviousMonth: DateInDateOut<T>,
  getMonthArray(value: T): T[],

  getYear(value: T): number,
  setYear(value: T, count: number): T,

  mergeDateAndTime(date: T, time: T): T,

  getWeekdays(): string[],
  getWeekArray(date: T): T[][],
  getYearRange(start: T, end: T): T[],

  /** Allow to customize displaying "am/pm" strings */
  getMeridiemText(ampm: 'am' | 'pm'): string,
};

export type DateFormatsT = {
  /** Localized full date, useful for accessibility @example "January 1st, 2019" */
  fullDate: string,
  /** Date format string with month and day of month @example "01 January" */
  normalDate: string,
  /** Date format string with weekday, month and day of month @example "Wed, Jan 1st" */
  normalDateWithWeekday: string,
  /** Shorter day format @example "1 January" */
  shortDate: string,
  /** Year format string @example "2019" */
  year: string,
  /** Month format string @example "January" */
  month: string,
  /** Short month format string @example "Jan" */
  monthShort: string,
  /** Short month format string @example "January 2018" */
  monthAndYear: string,
  /** Month with date format string @example "January 1st" */
  monthAndDate: string,
  /** Day format string @example "12" */
  dayOfMonth: string,
  /** Hours format string @example "11" */
  hours12h: string,
  /** Hours format string @example "23" */
  hours24h: string,
  /** Minutes format string @example "59" */
  minutes: string,
  /** Seconds format string @example "59" */
  seconds: string,
  /** Full time localized format string @example "11:44 PM" for US, "23:44" for Europe */
  fullTime: string,
  /** Not localized full time format string @example "11:44 PM" */
  fullTime12h: string,
  /** Not localized full time format string @example "23:59" */
  fullTime24h: string,
  /** Date & time format string with localized time @example "2018, Jan 1st 11:44 PM" */
  fullDateTime: string,
  /** Not localized date & Time format 12h @example "2018, Jan 1st 11:44 PM" */
  fullDateTime12h: string,
  /** Not localized date & Time format 24h @example "2018, Jan 1st 23:44" */
  fullDateTime24h: string,
  /** Localized keyboard input friendly date format @example "2019/01/01" */
  keyboardDate: string,
  /** Localized keyboard input friendly date/time format @example "2019/01/01 23:44" */
  keyboardDateTime: string,
  /** Not Localized keyboard input friendly date/time 12h format @example "2019/01/01 23:44" */
  keyboardDateTime12h: string,
  /** Not localized keyboard input friendly date/time 24h format @example "2019/01/01 11:44 PM" */
  keyboardDateTime24h: string,
};
