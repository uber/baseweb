/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable import/extensions */
import { es } from 'date-fns/locale/index.js';
import * as utilsHelpers from '../utils/index';
import { formatDate } from '../utils';
import DateHelpers from '../utils/date-helpers';
import adapter from '../utils/date-fns-adapter';
import { getFilteredMonthItems } from '../utils/calendar-header-helpers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

const momentAdapter = new MomentUtils({ instance: moment });
/* eslint-enable import/extensions */
const dateHelpers = new DateHelpers(adapter);
const momentHelpers = new DateHelpers(momentAdapter);

// these are helpers that we want to test
// but aren't exported from utils/index
// so we don't need to make sure that they remained the same
const excludedFromChecks = [
  'min',
  'max',
  'setDate',
  'differenceInCalendarMonths',
  'parse',
  'parseString',
  'set',
  'isOnOrAfterDay',
  'isOnOrBeforeDay',
  'getQuarter',
  'isEqual',
  'isValid',
];

const getHelpersForDateObject = (date) => {
  if (date instanceof Date) {
    return dateHelpers;
  }
  if (moment.isMoment(date)) {
    return momentHelpers;
  }
  // if (Luxon.isDateTime(date)) {
  //   return luxonHelpers;
  // }
  return dateHelpers;
};

const getYearForDate = (date) => {
  const currentHelpers = getHelpersForDateObject(date);
  return currentHelpers.getYear(date);
};

const defaultGetComparisonValue = (value) => {
  if (value instanceof Date) {
    return dateHelpers.format(value, 'fullDateTime');
  }
  return value;
};
const isLocale = (val) => {
  return val && val.code && val.match;
};

const convertValue = ({ value, convertDate, convertLocale }) => {
  if (Array.isArray(value)) {
    return value.map((childValue) =>
      convertValue({ value: childValue, convertDate, convertLocale })
    );
  }
  if (value instanceof Date) {
    return convertDate(value);
  }
  if (isLocale(value)) {
    return convertLocale(value);
  }
  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).reduce((memo, key) => {
      const childValue = value[key];
      return {
        ...memo,
        [key]: convertValue({ value: childValue, convertDate, convertLocale }),
      };
    }, {});
  }
  return value;
};

const adapterVersions = [
  {
    name: 'utils/index',
    helpers: utilsHelpers,
    getComparisonValue: defaultGetComparisonValue,
  },
  {
    name: 'moment',
    helpers: momentHelpers,
    convertDate: (date) => moment(date),
    convertLocale: (locale) => locale.code,
    getComparisonValue: (value) => {
      if (moment.isMoment(value)) {
        return momentHelpers.format(value, 'fullDateTime', 'en');
      }
      return value;
    },
  },
  // {
  //   name: 'luxon',
  //   helpers: luxonHelpers,
  //   convertDate: date => Luxon.fromJSDate(date),
  //   convertLocale: locale => locale.code,
  //   getComparisonValue: value => {
  //     if (Luxon.isDateTime(value)) {
  //       return value.toJSDate().toISOString();
  //     }
  //     return value;
  //   },
  // },
];

const getDiffereningAdapterMap = (runAdapter, value) => {
  const comparisonValue = defaultGetComparisonValue(value);
  return adapterVersions.reduce((memo, version) => {
    const {
      helpers,
      getComparisonValue,
      convertDate = (value) => value,
      convertLocale = (value) => value,
      name,
    } = version;
    const convertArgs = (args) =>
      args.map((arg) => convertValue({ value: arg, convertDate, convertLocale }));
    const currentValue = getComparisonValue(runAdapter(helpers, convertArgs));
    if (currentValue !== comparisonValue) {
      return {
        //$FlowFixMe
        ...memo,
        //$FlowFixMe
        [name]: currentValue,
      };
    }
    return memo;
  }, {});
};

// every time a helper.method is called in tests
// this will call that same method in date-fns, luxon, moment
// and in the functions exports from utils/index (to ensure that users imports those functions
// in apps won't have issues)
// and ensure that they all return the same value.
// If they don't, a helpful error is displayed showing the difference.
// To make it possible to easily compare dates across libraries, all date objects
// are converted to iso strings before being passed into expect

//$FlowFixMe
const helpers: DateHelpers<Date> = Object.keys(dateHelpers).reduce((memo, methodName) => {
  return {
    ...memo,
    //$FlowFixMe
    [methodName]: (...args) => {
      //$FlowFixMe
      const dateHelpersReturn = dateHelpers[methodName](...args);
      if (
        //$FlowFixMe
        !utilsHelpers[methodName] &&
        excludedFromChecks.includes(methodName)
      ) {
        return dateHelpersReturn;
      }

      const differingAdapterMap = getDiffereningAdapterMap((helpers, convertArgs) => {
        const convertedArgs = convertArgs(args);
        //$FlowFixMe
        return helpers[methodName](...convertedArgs);
      }, dateHelpersReturn);

      const skippedFormatAlignment = ['getWeekdayMinInLocale'];
      if (skippedFormatAlignment.includes(methodName)) {
        return dateHelpersReturn;
      }

      if (Object.keys(differingAdapterMap).length > 0) {
        const adapterString = Object.keys(differingAdapterMap).reduce((memo, name) => {
          return `${memo}${name}: ${
            //$FlowFixMe
            differingAdapterMap[name]
            //$FlowFixMe
          } date-fns: ${defaultGetComparisonValue(dateHelpersReturn)}\n`;
        }, '');
        throw new Error(
          `values return by one or more versions of helpers differ\n${adapterString}`
        );
      }
      return dateHelpersReturn;
    },
  };
}, {});

const MIDNIGHT = new Date(2019, 3, 19);
describe('Datepicker utils', () => {
  describe('getFilteredMonthItems', () => {
    const monthLabels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    test('correctly filters when date === startDate', () => {
      const filterMonthsList = [9, 10, 11];
      const monthItems = getFilteredMonthItems({
        filterMonthsList,
        formatMonthLabel: (month) => monthLabels[month],
      });

      expect(monthItems).toEqual([
        { id: '0', label: 'January', disabled: true },
        { id: '1', label: 'February', disabled: true },
        { id: '2', label: 'March', disabled: true },
        { id: '3', label: 'April', disabled: true },
        { id: '4', label: 'May', disabled: true },
        { id: '5', label: 'June', disabled: true },
        { id: '6', label: 'July', disabled: true },
        { id: '7', label: 'August', disabled: true },
        { id: '8', label: 'September', disabled: true },
        { id: '9', label: 'October' },
        { id: '10', label: 'November' },
        { id: '11', label: 'December' },
      ]);
    });
    test('correctly filters when startDate === endDate', () => {
      const filterMonthsList = [6, 7, 8, 9];
      const monthItems = getFilteredMonthItems({
        filterMonthsList,
        formatMonthLabel: (month) => monthLabels[month],
      });

      expect(monthItems).toEqual([
        { id: '0', label: 'January', disabled: true },
        { id: '1', label: 'February', disabled: true },
        { id: '2', label: 'March', disabled: true },
        { id: '3', label: 'April', disabled: true },
        { id: '4', label: 'May', disabled: true },
        { id: '5', label: 'June', disabled: true },
        { id: '6', label: 'July' },
        { id: '7', label: 'August' },
        { id: '8', label: 'September' },
        { id: '9', label: 'October' },
        { id: '10', label: 'November', disabled: true },
        { id: '11', label: 'December', disabled: true },
      ]);
    });
  });
  describe('if using destructured utils function', () => {
    test('should behave the same as date-helpers version', () => {
      const destructuredReturn = formatDate(MIDNIGHT, 'yyyy-MM-dd');
      const helpersReturn = formatDate(MIDNIGHT, 'yyyy-MM-dd');
      expect(destructuredReturn).toEqual(helpersReturn);
    });
  });
  describe('format', () => {
    describe('when passing a locale', () => {
      test('should return different values based on the locale', () => {
        expect(helpers.format(new Date('05/15/2020'), 'month', es)).toEqual('mayo');
      });
    });
    describe('when passing', () => {
      describe('fullOrdinalWeek', () => {
        test('should return a date like Friday, May 15th 2020', () => {
          // because this differs, we can't use the automatic helper variation
          expect(dateHelpers.format(new Date('05/15/2020'), 'fullOrdinalWeek')).toEqual(
            'Friday, May 15th 2020'
          );
          expect(momentHelpers.format(moment(new Date('05/15/2020')), 'fullOrdinalWeek')).toEqual(
            'Friday, May 15th 2020'
          );
          // expect(
          //   luxonHelpers.format(
          //     Luxon.fromJSDate(new Date('05/15/2020')),
          //     'fullOrdinalWeek',
          //   ),
          // ).toEqual('Friday, May 15 2020');
        });
      });
      describe('weekday', () => {
        test('should return a date like Friday', () => {
          expect(helpers.format(new Date('05/15/2020'), 'weekday')).toEqual('Friday');
        });
      });
      describe('dayOfMonthNumber', () => {
        test('should return a date like 15', () => {
          expect(helpers.format(new Date('05/15/2020'), 'dayOfMonthNumber')).toEqual('15');
        });
      });
      describe('monthNumber', () => {
        test('should return a date like 5', () => {
          expect(helpers.format(new Date('05/15/2020'), 'monthNumber')).toEqual('5');
        });
      });
      describe('fullDate', () => {
        test('should return a date like 2020/05/15', () => {
          expect(helpers.format(new Date('05/15/2020'), 'slashDate')).toEqual('2020/05/15');
        });
      });
    });
  });
  describe('isOnOrAfterDay', () => {
    test('should return true if the second provided date is on or after the start of the day of the first provided date', () => {
      expect(
        helpers.isOnOrAfterDay(
          new Date('Tue Apr 12 2011 00:00:00 GMT-0500'),
          new Date('Tue Apr 12 2011 11:21:31 GMT-0500')
        )
      ).toEqual(true);
      expect(
        helpers.isOnOrAfterDay(
          new Date('Tue Apr 11 2011 00:00:00 GMT-0500'),
          new Date('Tue Apr 12 2011 11:21:31 GMT-0500')
        )
      ).toEqual(false);
      expect(
        helpers.isOnOrAfterDay(
          new Date('Tue Apr 12 2011 00:00:00 GMT-0500'),
          new Date('Tue Apr 11 2011 11:21:31 GMT-0500')
        )
      ).toEqual(true);
    });
  });
  describe('isOnOrBeforeDay', () => {
    test('should return true if the second provided date is on or before the start of the day of the first provided date', () => {
      expect(
        helpers.isOnOrBeforeDay(
          new Date('Tue Apr 12 2011 00:00:00 GMT-0500'),
          new Date('Tue Apr 12 2011 11:21:31 GMT-0500')
        )
      ).toEqual(true);
      expect(
        helpers.isOnOrBeforeDay(
          new Date('Tue Apr 11 2011 00:00:00 GMT-0500'),
          new Date('Tue Apr 12 2011 11:21:31 GMT-0500')
        )
      ).toEqual(true);
      expect(
        helpers.isOnOrBeforeDay(
          new Date('Tue Apr 12 2011 00:00:00 GMT-0500'),
          new Date('Tue Apr 11 2011 11:21:31 GMT-0500')
        )
      ).toEqual(false);
    });
  });
  describe('differenceInCalendarMonths', () => {
    test('should return the difference in calendar months', () => {
      expect(
        helpers.differenceInCalendarMonths(new Date(2020, 5, 1), new Date(2020, 6, 1))
      ).toEqual(-1);
      expect(
        helpers.differenceInCalendarMonths(new Date(2020, 5, 1), new Date(2020, 4, 1))
      ).toEqual(1);
      expect(
        helpers.differenceInCalendarMonths(new Date(2020, 5, 1), new Date(2020, 5, 10))
      ).toEqual(0);
    });
  });
  describe('formatDate', () => {
    test('should format date', () => {
      expect(helpers.formatDate(MIDNIGHT, 'MMM')).toEqual('Apr');
    });
    test('should apply locale to format if provided', () => {
      expect(helpers.formatDate(MIDNIGHT, 'MMMM', es)).toEqual('abril');
    });
  });
  describe('isSameYear', () => {
    test('should show if dates are same year', () => {
      expect(helpers.isSameYear(new Date(2019, 1, 1), new Date(2020, 1, 1))).toEqual(false);
      expect(helpers.isSameYear(new Date(2019, 1, 1), new Date(2019, 2, 1))).toEqual(true);
    });
    test('should return false if either date is falsy', () => {
      expect(helpers.isSameYear(null, MIDNIGHT)).toEqual(false);
      expect(helpers.isSameYear(MIDNIGHT, null)).toEqual(false);
    });
  });
  describe('isSameMonth', () => {
    test('should show if dates are same month', () => {
      expect(helpers.isSameMonth(new Date(2019, 1, 1), new Date(2019, 2, 1))).toEqual(false);
      expect(helpers.isSameMonth(new Date(2019, 1, 1), new Date(2019, 1, 2))).toEqual(true);
    });
    test('should return false if either date is falsy', () => {
      expect(helpers.isSameMonth(null, MIDNIGHT)).toEqual(false);
      expect(helpers.isSameMonth(MIDNIGHT, null)).toEqual(false);
    });
  });
  describe('isSameDay', () => {
    test('should show if dates are same day', () => {
      expect(helpers.isSameDay(new Date(2019, 1, 1), new Date(2019, 1, 2))).toEqual(false);
      expect(helpers.isSameDay(new Date(2019, 1, 1), new Date(2019, 1, 1))).toEqual(true);
    });
    test('should return false if either date is falsy', () => {
      expect(helpers.isSameDay(null, MIDNIGHT)).toEqual(false);
      expect(helpers.isSameDay(MIDNIGHT, null)).toEqual(false);
    });
  });
  describe('isStartOfMonth', () => {
    test('should show if date is start of month', () => {
      expect(helpers.isStartOfMonth(new Date(2019, 1, 2))).toEqual(false);
      expect(helpers.isStartOfMonth(new Date(2019, 1, 1))).toEqual(true);
    });
  });
  describe('isEndOfMonth', () => {
    test('should show if date is end of month', () => {
      expect(helpers.isEndOfMonth(new Date(2020, 0, 30))).toEqual(false);
      expect(helpers.isEndOfMonth(new Date(2020, 0, 31))).toEqual(true);
    });
  });
  describe('getWeekdayMinInLocale', () => {
    test('should get the first letter of the weekday in the provided locale', () => {
      expect(helpers.getWeekdayMinInLocale(new Date(2020, 0, 1), es)).toEqual('mi');
    });
  });
  describe('getWeekdayInLocale', () => {
    test('should get the weekday name in the provided locale', () => {
      expect(helpers.getWeekdayInLocale(new Date(2020, 0, 1), es)).toEqual('miércoles');
    });
  });
  describe('getMonthInLocale', () => {
    test('should get the name of the provided month number in the provided locale', () => {
      expect(helpers.getMonthInLocale(0, es)).toEqual('enero');
    });
  });
  describe('isOutOfBounds', () => {
    const minDate = new Date(2020, 0, 2);
    const maxDate = new Date(2020, 0, 4);
    describe('if both minDate and maxDate are provided', () => {
      test('should show if the date is above the max or below the min', () => {
        expect(
          helpers.isOutOfBounds(new Date(2020, 0, 3), {
            minDate,
            maxDate,
          })
        ).toEqual(false);
        expect(
          helpers.isOutOfBounds(new Date(2020, 0, 5), {
            minDate,
            maxDate,
          })
        ).toEqual(true);
        expect(
          helpers.isOutOfBounds(new Date(2020, 0, 1), {
            minDate,
            maxDate,
          })
        ).toEqual(true);
        expect(
          helpers.isOutOfBounds(new Date('Tue Apr 12 2011 00:00:00 GMT-0500'), {
            minDate: new Date('Tue Apr 12 2011 11:21:31 GMT-0500'),
            maxDate,
          })
        ).toEqual(false);
      });
    });
  });
  describe('isDayDisabled', () => {
    const minDate = new Date(2020, 0, 2);
    const maxDate = new Date(2020, 0, 4);
    describe('if maxDate and minDate are provided', () => {
      test('should return true if the date is outside of the max and min', () => {
        expect(
          helpers.isDayDisabled(new Date(2020, 0, 5), {
            minDate,
            maxDate,
            excludeDates: undefined,
            includeDates: undefined,
            filterDate: undefined,
          })
        ).toEqual(true);
        expect(
          helpers.isDayDisabled(new Date(2020, 0, 3), {
            minDate,
            maxDate,
            excludeDates: undefined,
            includeDates: undefined,
            filterDate: undefined,
          })
        ).toEqual(false);
      });
    });
    describe('if excludedDates is provided', () => {
      test('should return true if the date is in excludedDates', () => {
        expect(
          helpers.isDayDisabled(new Date(2020, 0, 3), {
            minDate: undefined,
            maxDate: undefined,
            excludeDates: [new Date(2020, 0, 3)],
            includeDates: undefined,
            filterDate: undefined,
          })
        ).toEqual(true);
        expect(
          helpers.isDayDisabled(new Date(2020, 0, 4), {
            minDate: undefined,
            maxDate: undefined,
            excludeDates: [new Date(2020, 0, 3)],
            includeDates: undefined,
            filterDate: undefined,
          })
        ).toEqual(false);
      });
    });
    describe('if includedDates is provided', () => {
      test('should return true if the date is not in includedDates', () => {
        expect(
          helpers.isDayDisabled(new Date(2020, 0, 3), {
            minDate: undefined,
            maxDate: undefined,
            excludeDates: undefined,
            includeDates: [new Date(2020, 0, 4)],
            filterDate: undefined,
          })
        ).toEqual(true);
        expect(
          helpers.isDayDisabled(new Date(2020, 0, 3), {
            minDate: undefined,
            maxDate: undefined,
            excludeDates: undefined,
            includeDates: [new Date(2020, 0, 3)],
            filterDate: undefined,
          })
        ).toEqual(false);
      });
    });
    describe('if filterDate is provided', () => {
      test('should return true if filterDate returns false', () => {
        expect(
          helpers.isDayDisabled(new Date(2020, 0, 3), {
            minDate: undefined,
            maxDate: undefined,
            excludeDates: undefined,
            includeDates: undefined,
            filterDate: (date) => {
              return getYearForDate(date) === 2019;
            },
          })
        ).toEqual(true);
        expect(
          helpers.isDayDisabled(new Date(2020, 0, 3), {
            minDate: undefined,
            maxDate: undefined,
            excludeDates: undefined,
            includeDates: undefined,
            filterDate: (date) => {
              return getYearForDate(date) === 2020;
            },
          })
        ).toEqual(false);
      });
    });
  });
  describe('monthDisabledBefore', () => {
    describe('if minDate is provided', () => {
      test('should return true if the minDate falls on a later month than one month before the provided date', () => {
        expect(
          helpers.monthDisabledBefore(new Date(2020, 4, 25), {
            minDate: new Date(2020, 4, 1),
            includeDates: undefined,
          })
        ).toEqual(true);
        expect(
          helpers.monthDisabledBefore(new Date(2020, 4, 25), {
            minDate: new Date(2020, 3, 25),
            includeDates: undefined,
          })
        ).toEqual(false);
        expect(
          helpers.monthDisabledBefore(new Date(2020, 4, 25), {
            minDate: new Date(2020, 3, 26),
            includeDates: undefined,
          })
        ).toEqual(false);
      });
    });
    describe('if includeDates is provided', () => {
      test('should return true if every date in includeDates falls on later month than one month before the provided date', () => {
        expect(
          helpers.monthDisabledBefore(new Date(2020, 4, 25), {
            minDate: undefined,
            includeDates: [new Date(2020, 4, 1), new Date(2020, 4, 2)],
          })
        ).toEqual(true);
        expect(
          helpers.monthDisabledBefore(new Date(2020, 4, 25), {
            minDate: undefined,
            includeDates: [new Date(2020, 4, 1), new Date(2020, 3, 25)],
          })
        ).toEqual(false);
      });
    });
  });
});
describe('monthDisabledAfter', () => {
  describe('if maxDate is provided', () => {
    test('should return true if the maxDate falls on a earlier month than one month after the provided date', () => {
      expect(
        helpers.monthDisabledAfter(new Date(2020, 4, 25), {
          maxDate: new Date(2020, 4, 30),
          includeDates: undefined,
        })
      ).toEqual(true);
      expect(
        helpers.monthDisabledAfter(new Date(2020, 4, 25), {
          maxDate: new Date(2020, 5, 1),
          includeDates: undefined,
        })
      ).toEqual(false);
      expect(
        helpers.monthDisabledAfter(new Date(2020, 4, 25), {
          maxDate: new Date(2020, 5, 25),
          includeDates: undefined,
        })
      ).toEqual(false);
    });
  });
  describe('if includeDates is provided', () => {
    test('should return true if every date in includeDates falls on a earlier month than one month after the provided date', () => {
      expect(
        helpers.monthDisabledAfter(new Date(2020, 4, 25), {
          maxDate: undefined,
          includeDates: [new Date(2020, 4, 29), new Date(2020, 4, 30)],
        })
      ).toEqual(true);
      expect(
        helpers.monthDisabledAfter(new Date(2020, 4, 25), {
          maxDate: undefined,
          includeDates: [new Date(2020, 5, 1), new Date(2020, 4, 30)],
        })
      ).toEqual(false);
    });
  });
});
describe('getEffectiveMinDate', () => {
  const includeDates = [new Date(2020, 0, 1), new Date(2020, 0, 2), new Date(2020, 0, 3)];
  describe('if only minDate is provider', () => {
    test('should return minDate', () => {
      const minDate = new Date(2020, 4, 25);
      expect(
        helpers.getEffectiveMinDate({
          minDate,
          maxDate: null,
          includeDates: null,
        })
      ).toEqual(minDate);
    });
  });
  describe('if only includeDates is provided', () => {
    test('should return the earliest includeDate', () => {
      expect(
        helpers.getEffectiveMinDate({
          includeDates,
          maxDate: null,
          minDate: null,
        })
      ).toEqual(includeDates[0]);
    });
  });
  describe('if minDate and includeDates are provided', () => {
    test('should return the earliest includeDate thats on or before the minDate', () => {
      expect(
        helpers.getEffectiveMinDate({
          includeDates,
          minDate: new Date(2020, 0, 2, 1, 1),
        })
      ).toEqual(includeDates[1]);
    });
  });
});

describe('getEffectiveMaxDate', () => {
  const includeDates = [new Date(2020, 0, 1), new Date(2020, 0, 2), new Date(2020, 0, 3)];
  describe('if only maxDate is provider', () => {
    test('should return maxDate', () => {
      const maxDate = new Date(2020, 4, 25);
      expect(
        helpers.getEffectiveMaxDate({
          maxDate,
          minDate: null,
          includeDates: null,
        })
      ).toEqual(maxDate);
    });
  });
  describe('if only includeDates is provided', () => {
    test('should return the earliest includeDate', () => {
      expect(
        helpers.getEffectiveMaxDate({
          includeDates,
          minDate: null,
          maxDate: null,
        })
      ).toEqual(includeDates[2]);
    });
  });
  describe('if maxDate and includeDates are provided', () => {
    test('should return the earliest includeDate thats on or after the maxDate', () => {
      expect(
        helpers.getEffectiveMaxDate({
          includeDates,
          maxDate: new Date(2020, 0, 2),
        })
      ).toEqual(includeDates[1]);
    });
  });
});

describe('applyTimeToDate', () => {
  const time = new Date(2020, 1, 1, 10, 10);
  const date = new Date(2000, 2, 2, 5, 5, 5);

  describe('if date is not provided', () => {
    test('should return the time', () => {
      expect(helpers.applyTimeToDate(null, time)).toEqual(time);
    });
  });
  describe('if date is provided', () => {
    test('should apply the hours and minutes of the time to the date, and set the seconds to zero', () => {
      expect(helpers.applyTimeToDate(date, time)).toEqual(new Date(2000, 2, 2, 10, 10));
    });
  });
});

describe('applyDateToTime', () => {
  const time = new Date(2020, 1, 1, 10, 10, 10);
  const date = new Date(2000, 2, 2, 5, 5, 5);
  describe('if date is not provided', () => {
    test('should return the time', () => {
      expect(helpers.applyDateToTime(null, date)).toEqual(date);
    });
  });
  describe('if date is provided', () => {
    test('should apply the year, month, and day of the date to the time', () => {
      expect(helpers.applyDateToTime(time, date)).toEqual(new Date(2000, 2, 2, 10, 10, 10));
    });
  });
});

describe('min', () => {
  test('should return the earliest date in the provided array', () => {
    const dates = [new Date(2020, 0, 3), new Date(2020, 0, 2), new Date(2020, 0, 1)];
    expect(helpers.min(dates)).toEqual(dates[2]);
  });
});
describe('max', () => {
  test('should return the latest date in the provided array', () => {
    const dates = [new Date(2020, 0, 3), new Date(2020, 0, 2), new Date(2020, 0, 1)];
    expect(helpers.max(dates)).toEqual(dates[0]);
  });
});
describe('setDate', () => {
  test('should set the provided day number on the provided date', () => {
    expect(helpers.setDate(new Date(2020, 0, 1), 10)).toEqual(new Date(2020, 0, 10));
    expect(helpers.setDate(new Date(2020, 0, 1), 0)).toEqual(new Date(2019, 11, 31));
    expect(helpers.setDate(new Date(2020, 0, 1), 32)).toEqual(new Date(2020, 1, 1));
  });
});
describe('getDate', () => {
  test('should return the day of month number for the provided date', () => {
    expect(helpers.getDate(new Date(2020, 0, 1))).toEqual(1);
    expect(helpers.getDate(new Date(2020, 0, 20))).toEqual(20);
  });
});
describe('addWeeks', () => {
  test('should add the provided number of weeks to the provided date', () => {
    expect(helpers.addWeeks(new Date(2020, 0, 1), 2)).toEqual(new Date(2020, 0, 15));
  });
});
describe('subWeeks', () => {
  test('should add the provided number of weeks to the provided date', () => {
    expect(helpers.subWeeks(new Date(2020, 0, 15), 2)).toEqual(new Date(2020, 0, 1));
  });
});
describe('addYears', () => {
  test('should add the provided number of years to the provided date', () => {
    expect(helpers.addYears(new Date(2020, 0, 1), 1)).toEqual(new Date(2021, 0, 1));
  });
});
describe('subYears', () => {
  test('should add the provided number of years to the provided date', () => {
    expect(helpers.subYears(new Date(2021, 0, 1), 1)).toEqual(new Date(2020, 0, 1));
  });
});
describe('subDays', () => {
  test('should subtract the provided days from the provided date', () => {
    expect(helpers.subDays(new Date(2020, 0, 10), 5)).toEqual(new Date(2020, 0, 5));
  });
});
describe('isDayInRange', () => {
  test('should return true if the provided is between the start date and end date', () => {
    expect(
      helpers.isDayInRange(new Date(2020, 0, 5), new Date(2020, 0, 4), new Date(2020, 0, 6))
    ).toEqual(true);
    expect(
      helpers.isDayInRange(new Date(2020, 0, 4), new Date(2020, 0, 4), new Date(2020, 0, 6))
    ).toEqual(true);
    expect(
      helpers.isDayInRange(new Date(2020, 0, 6), new Date(2020, 0, 5), new Date(2020, 0, 6))
    ).toEqual(true);
    expect(
      helpers.isDayInRange(new Date(2020, 0, 7), new Date(2020, 0, 4), new Date(2020, 0, 6))
    ).toEqual(false);
  });
});
describe('getStartOfWeek', () => {
  describe('if a locale is not provided', () => {
    test('should return the start of the week', () => {
      // luxon helpers differs in how it handles start of week
      expect(dateHelpers.getStartOfWeek(new Date(2020, 3, 15))).toEqual(new Date(2020, 3, 12));
      const returnValue = momentHelpers.getStartOfWeek(moment(new Date(2020, 3, 15)));
      const assertValue = typeof returnValue === 'object' ? returnValue.toISOString() : null;

      expect(assertValue).toEqual(new Date(2020, 3, 12).toISOString());
      // expect(
      //   luxonHelpers
      //     .getStartOfWeek(Luxon.fromJSDate(new Date(2020, 3, 15)))
      //     .toJSDate()
      //     .toISOString(),
      // ).toEqual(new Date(2020, 3, 13).toISOString());
    });
  });
  describe('if a locale is provided', () => {
    test('should return the start of the week in the provided locale', () => {
      expect(helpers.getStartOfWeek(new Date(2020, 3, 15), es)).toEqual(new Date(2020, 3, 13));
    });
  });
});
describe('getEndOfWeek', () => {
  test('should return the end of the week', () => {
    // end of week differs in luxon as well
    const date = new Date(2020, 3, 15);
    // const luxonDate = Luxon.fromJSDate(date);
    expect(helpers.getEndOfWeek(date)).toEqual(new Date(2020, 3, 18, 23, 59, 59, 999));

    // expect(
    //   luxonHelpers
    //     .getEndOfWeek(luxonDate)
    //     .toJSDate()
    //     .toISOString(),
    // ).toEqual(new Date('2020-04-20T04:59:59.999Z').toISOString());
  });
});
describe('setSeconds', () => {
  test('should set the seconds', () => {
    expect(helpers.setSeconds(new Date(2020, 0, 1), 5)).toEqual(new Date(2020, 0, 1, 0, 0, 5));
  });
});
describe('setMinutes', () => {
  test('should set the minutes', () => {
    expect(helpers.setMinutes(new Date(2020, 0, 1), 5)).toEqual(new Date(2020, 0, 1, 0, 5, 0));
  });
});
describe('setHours', () => {
  test('should set the hours', () => {
    expect(helpers.setHours(new Date(2020, 0, 1), 5)).toEqual(new Date(2020, 0, 1, 5, 0, 0));
  });
});
describe('setMonth', () => {
  test('should set the month', () => {
    expect(helpers.setMonth(new Date(2020, 0, 1), 4)).toEqual(new Date(2020, 4, 1, 0, 0, 0));
  });
});
describe('setYear', () => {
  test('should set the year', () => {
    expect(helpers.setYear(new Date(2020, 0, 1), 2021)).toEqual(new Date(2021, 0, 1));
  });
});
describe('getMinutes', () => {
  test('should get the minutes', () => {
    expect(helpers.getMinutes(new Date(2020, 0, 1, 0, 5))).toEqual(5);
  });
});
describe('getHours', () => {
  test('should get the hours', () => {
    expect(helpers.getHours(new Date(2020, 0, 1, 5))).toEqual(5);
  });
});
describe('getMonth', () => {
  test('should get the month', () => {
    expect(helpers.getMonth(new Date(2020, 0, 1))).toEqual(0);
  });
});
describe('getYear', () => {
  test('should get the year', () => {
    expect(helpers.getYear(new Date(2020, 0, 1))).toEqual(2020);
  });
});
describe('getStartOfMonth', () => {
  test('should get the start of the month', () => {
    expect(helpers.getStartOfMonth(new Date(2020, 0, 5))).toEqual(new Date(2020, 0, 1));
  });
});
describe('getEndOfMonth', () => {
  test('should get the end of the month', () => {
    expect(helpers.getEndOfMonth(new Date(2020, 0, 5))).toEqual(
      new Date(2020, 0, 31, 23, 59, 59, 999)
    );
  });
});
describe('addDays', () => {
  test('should add days to the provided date', () => {
    expect(helpers.addDays(new Date(2020, 0, 1), 4)).toEqual(new Date(2020, 0, 5));
  });
});
describe('addMonths', () => {
  test('should add months to the provided date', () => {
    expect(helpers.addMonths(new Date(2020, 0, 1), 1)).toEqual(new Date(2020, 1, 1));
  });
});
describe('subMonths', () => {
  test('should subract months from the provided date', () => {
    expect(helpers.subMonths(new Date(2020, 2, 1), 1)).toEqual(new Date(2020, 1, 1));
  });
});

describe('isBefore', () => {
  test('should return true if the first date is before the second', () => {
    expect(helpers.isBefore(new Date(2020, 0, 1), new Date(2020, 0, 2))).toEqual(true);
    expect(helpers.isBefore(new Date(2020, 0, 1), new Date(2020, 0, 1))).toEqual(false);
    expect(helpers.isBefore(new Date(2020, 0, 2), new Date(2020, 0, 1))).toEqual(false);
  });
});

describe('isAfter', () => {
  test('should return ture if the first date is after the second', () => {
    expect(helpers.isAfter(new Date(2020, 0, 2), new Date(2020, 0, 1))).toEqual(true);
    expect(helpers.isAfter(new Date(2020, 0, 1), new Date(2020, 0, 1))).toEqual(false);
    expect(helpers.isAfter(new Date(2020, 0, 1), new Date(2020, 0, 2))).toEqual(false);
  });
});
describe('parseString', () => {
  test('should convert the provided string back into a date according to the provided format string', () => {
    expect(helpers.parseString('2020.03.01', 'yyyy.MM.dd')).toEqual(new Date(2020, 2, 1));
  });
  describe('when passing locale', () => {
    test('should parse based on the locale', () => {
      // these differ so they need to be called individually
      expect(dateHelpers.parseString('jueves 02 2020', 'EEEE dd yyyy', es)).toEqual(
        new Date(2020, 0, 2)
      );
      const returnValue = momentHelpers.parseString('jueves 02 2020', 'dddd DD YYYY', 'es');
      const assertValue = typeof returnValue === 'object' ? returnValue.toISOString() : null;
      expect(assertValue).toEqual(new Date(2020, 0, 2).toISOString());
      // Doing this creates an invalid date because the luxon adapter
      // doesn't current pass through locale correctly
      // expect(
      //   luxonHelpers.parseString('jueves 02 2020', 'EEEE dd yyyy', 'es').invalid
      //     .reason,
      // ).toBe('unparsable');
    });
  });
});

describe('parse', () => {
  test('should convert the provided string back into a date according to the provided generic date-io format', () => {
    expect(helpers.parse('2019/01/01', 'slashDate')).toEqual(new Date(2019, 0, 1));
  });
});

describe('set', () => {
  test('should apply the provided values to the provided date', () => {
    expect(
      helpers.set(new Date(2020, 1, 1, 1, 1, 1), {
        year: 2021,
        month: 2,
        date: 2,
        hours: 2,
        minutes: 2,
        seconds: 2,
      })
    ).toEqual(new Date(2021, 2, 2, 2, 2, 2));
  });
});

describe('getQuarter', () => {
  test('should get the quarter of the provided date', () => {
    expect(helpers.getQuarter(new Date(2020, 0, 1))).toEqual(1);
  });
});

describe('isEqual', () => {
  test('should return true if the dates are equal', () => {
    expect(helpers.isEqual(new Date(2020, 0, 1), new Date(2020, 0, 1))).toEqual(true);
    expect(helpers.isEqual(new Date(2020, 0, 1), new Date(2020, 0, 2))).toEqual(false);
  });
});

describe('isValid', () => {
  test('should return true if the provided value is a valid date object', () => {
    expect(helpers.isValid(new Date(2020, 0, 1))).toEqual(true);
    expect(helpers.isValid(new Date('messed up stuff'))).toEqual(false);
    expect(helpers.isValid(NaN)).toEqual(false);
  });
});
