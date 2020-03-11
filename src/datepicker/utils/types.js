/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

type DateInput<DateT> = DateT | string | number | null | void;
type Comparison<DateT> = (value: DateT, comparing: DateT) => boolean;
type DateInDateOut<DateT> = (value: DateT) => DateT;

export interface DateIOAdapter<DateT = Date> {
  date: (DateInput<DateT> | void) => DateT | null;
  toJsDate(value: DateInput<DateT>): Date;

  parse(value: string, format: string): DateT;
  getCurrentLocaleCode(): string;
  is12HourCycleInCurrentLocale(): boolean;

  isNull(value?: DateT): boolean;
  isValid(value: DateInput<DateT>): boolean;
  getDiff: Comparison<DateT>;
  isEqual: Comparison<DateT>;
  isSameDay: Comparison<DateT>;
  isSameMonth: Comparison<DateT>;
  isSameYear: Comparison<DateT>;
  isSameHour: Comparison<DateT>;
  isAfter: Comparison<DateT>;
  isAfterDay: Comparison<DateT>;
  isAfterYear: Comparison<DateT>;

  isBeforeDay: Comparison<DateT>;
  isBeforeYear: Comparison<DateT>;
  isBefore: Comparison<DateT>;
  startOfMonth: DateInDateOut<DateT>;
  endOfMonth: DateInDateOut<DateT>;
  startOfWeek: DateInDateOut<DateT>;
  endOfWeek: (value: DateT) => DateT;
  addDays: (value: DateT, count: number) => DateT;

  startOfDay: DateInDateOut<DateT>;
  endOfDay: DateInDateOut<DateT>;
  format(value: DateT, formatKey: string): string;
  formatByString(value: DateT, formatString: string): string;
  formatNumber(numberToFormat: string): string;
  getHours(value: DateT): number;
  setHours(value: DateT, count: number): DateT;

  getMinutes(value: DateT): number;
  setMinutes(value: DateT, count: number): DateT;

  getSeconds(value: DateT): number;
  setSeconds(value: DateT, count: number): DateT;

  getMonth(value: DateT): number;
  setMonth(value: DateT, count: number): DateT;
  getNextMonth: DateInDateOut<DateT>;
  getPreviousMonth: DateInDateOut<DateT>;
  getMonthArray(value: DateT): DateT[];

  getYear(value: DateT): number;
  setYear(value: DateT, count: number): DateT;

  mergeDateAndTime(date: DateT, time: DateT): DateT;

  getWeekdays(): string[];
  getWeekArray(date: DateT): DateT[][];
  getYearRange(start: DateT, end: DateT): DateT[];

  /** Allow to customize displaying "am/pm" strings */
  getMeridiemText(ampm: 'am' | 'pm'): string;
}

type DateFormatsT = {
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
