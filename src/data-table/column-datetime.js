/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import format from 'date-fns/format/index.js';
import getYear from 'date-fns/getYear/index.js';
import getMonth from 'date-fns/getMonth/index.js';
import getQuarter from 'date-fns/getQuarter/index.js';
import getDay from 'date-fns/getDay/index.js';
import isAfter from 'date-fns/isAfter/index.js';
import isBefore from 'date-fns/isBefore/index.js';
import isEqual from 'date-fns/isEqual/index.js';
import set from 'date-fns/set/index.js';

import {Button, SIZE} from '../button/index.js';
import {ButtonGroup, MODE} from '../button-group/index.js';
import {Checkbox} from '../checkbox/index.js';
import {applyDateToTime, applyTimeToDate} from '../datepicker/utils/index.js';
import {Datepicker} from '../datepicker/index.js';
import {TimePicker} from '../timepicker/index.js';
import {useStyletron} from '../styles/index.js';
import {Select, type ValueT} from '../select/index.js';

import CellShell from './cell-shell.js';
import {COLUMNS, DATETIME_OPERATIONS} from './constants.js';
import FilterShell from './filter-shell.js';
import type {ColumnT} from './types.js';

type OptionsT = {|
  filterable?: boolean,
  formatString?: string,
  // eslint-disable-next-line flowtype/no-weak-types
  mapDataToValue: (data: any) => Date,
  maxWidth?: number,
  minWidth?: number,
  sortable?: boolean,
  title: string,
|};

type DatetimeOperationsT =
  | typeof DATETIME_OPERATIONS.RANGE_DATETIME
  | typeof DATETIME_OPERATIONS.RANGE_DATE
  | typeof DATETIME_OPERATIONS.RANGE_TIME
  | typeof DATETIME_OPERATIONS.WEEKDAY
  | typeof DATETIME_OPERATIONS.MONTH
  | typeof DATETIME_OPERATIONS.QUARTER
  | typeof DATETIME_OPERATIONS.HALF
  | typeof DATETIME_OPERATIONS.YEAR;

type FilterParametersT = {|
  operation: DatetimeOperationsT,
  range: Date[],
  selection: number[],
  description: string,
  exclude: boolean,
|};

type DatetimeColumnT = ColumnT<Date, FilterParametersT>;

const DATE_FORMAT = 'MM-dd-yyyy';
const TIME_FORMAT = 'HH:mm ss:SS';
const FORMAT_STRING = `${DATE_FORMAT} ${TIME_FORMAT}`;

function sortDates(a, b) {
  return a - b;
}

const RANGE_OPERATIONS = [
  {label: 'Date, Time', id: DATETIME_OPERATIONS.RANGE_DATETIME},
  {label: 'Date', id: DATETIME_OPERATIONS.RANGE_DATE},
  {label: 'Time', id: DATETIME_OPERATIONS.RANGE_TIME},
];

const CATEGORICAL_OPERATIONS = [
  {label: 'Weekday', id: DATETIME_OPERATIONS.WEEKDAY},
  {label: 'Month', id: DATETIME_OPERATIONS.MONTH},
  {label: 'Quarter', id: DATETIME_OPERATIONS.QUARTER},
  {label: 'Half', id: DATETIME_OPERATIONS.HALF},
  {label: 'Year', id: DATETIME_OPERATIONS.YEAR},
];

const WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const MONTHS = [
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

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'];
const HALVES = ['H1', 'H2'];

function Checks(props) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({maxHeight: '256px', overflowY: 'auto'})}>
      {props.options.map(item => {
        const checked = props.value.includes(item.id);
        return (
          <div
            key={item.id}
            className={css({marginBottom: theme.sizing.scale200})}
          >
            <Checkbox
              checked={checked}
              onChange={() => {
                if (checked) {
                  props.setValue(prev => prev.filter(i => i !== item.id));
                } else {
                  props.setValue(prev => [...prev, item.id]);
                }
              }}
            >
              {item.label}
            </Checkbox>
          </div>
        );
      })}
    </div>
  );
}

function filterParamsToInitialState(input) {
  const output = {
    exclude: false,
    comparatorIndex: 0,
    rangeOperator: RANGE_OPERATIONS[0],
    categoricalOperator: CATEGORICAL_OPERATIONS[0],
    rangeDates: [],
    years: [],
    halves: [],
    quarters: [],
    months: [],
    weekdays: [],
  };

  if (input) {
    const op = input.operation;
    if (input.range) {
      if (op === DATETIME_OPERATIONS.RANGE_DATETIME) {
        output.rangeDates = input.range;
        output.rangeOperator = RANGE_OPERATIONS[0];
      } else if (op === DATETIME_OPERATIONS.RANGE_DATE) {
        output.rangeDates = input.range;
        output.rangeOperator = RANGE_OPERATIONS[1];
      } else if (op === DATETIME_OPERATIONS.RANGE_TIME) {
        output.rangeDates = input.range;
        output.rangeOperator = RANGE_OPERATIONS[2];
      }
    } else if (input.selection) {
      output.comparatorIndex = 1;
      if (op === DATETIME_OPERATIONS.YEAR) {
        output.years = input.selection;
        output.categoricalOperator = CATEGORICAL_OPERATIONS[4];
      } else if (op === DATETIME_OPERATIONS.HALF) {
        output.halves = input.selection;
        output.categoricalOperator = CATEGORICAL_OPERATIONS[3];
      } else if (op === DATETIME_OPERATIONS.QUARTER) {
        output.quarters = input.selection;
        output.categoricalOperator = CATEGORICAL_OPERATIONS[2];
      } else if (op === DATETIME_OPERATIONS.MONTH) {
        output.months = input.selection;
        output.categoricalOperator = CATEGORICAL_OPERATIONS[1];
      } else if (op === DATETIME_OPERATIONS.WEEKDAY) {
        output.weekdays = input.selection;
        output.categoricalOperator = CATEGORICAL_OPERATIONS[0];
      }
    }

    if (input.exclude) {
      output.exclude = input.exclude;
    }
  }

  return output;
}

function DatetimeFilter(props) {
  const [css, theme] = useStyletron();
  const mountNode = React.useRef();
  const initialState = filterParamsToInitialState(props.filterParams);

  const datesSorted = React.useMemo(() => {
    return props.data.sort(sortDates);
  }, [props.data]);
  const presentYears = React.useMemo(() => {
    const dict = {};
    props.data.forEach(date => {
      dict[getYear(date)] = true;
    });
    return Object.keys(dict).map(n => parseInt(n));
  }, [props.data]);

  const [exclude, setExclude] = React.useState(initialState.exclude);
  const [comparatorIndex, setComparatorIndex] = React.useState(
    initialState.comparatorIndex,
  );
  const [rangeOperator, setRangeOperator] = React.useState<ValueT>([
    initialState.rangeOperator,
  ]);
  const [categoricalOperator, setCategoricalOperator] = React.useState<ValueT>([
    initialState.categoricalOperator,
  ]);
  // eslint-disable-next-line flowtype/no-weak-types
  const [rangeDates, setRangeDates] = React.useState<any>(
    initialState.rangeDates.length
      ? initialState.rangeDates
      : [
          new Date(datesSorted[0]),
          new Date(datesSorted[datesSorted.length - 1]),
        ],
  );

  const [years, setYears] = React.useState<number[]>(initialState.years);
  const [halves, setHalves] = React.useState<number[]>(initialState.halves);
  const [quarters, setQuarters] = React.useState<number[]>(
    initialState.quarters,
  );
  const [months, setMonths] = React.useState<number[]>(initialState.months);
  const [weekdays, setWeekdays] = React.useState<number[]>(
    initialState.weekdays,
  );

  const isRange = comparatorIndex === 0;
  const isCategorical = comparatorIndex === 1;

  return (
    <FilterShell
      exclude={exclude}
      onExcludeChange={() => setExclude(!exclude)}
      onApply={() => {
        if (isRange) {
          // eslint-disable-next-line flowtype/no-weak-types
          const op: DatetimeOperationsT = (rangeOperator[0].id: any);

          let description = '';
          if (op === DATETIME_OPERATIONS.RANGE_DATETIME) {
            const left = format(rangeDates[0], FORMAT_STRING);
            const right = format(rangeDates[1], FORMAT_STRING);
            description = `${left} - ${right}`;
          } else if (op === DATETIME_OPERATIONS.RANGE_DATE) {
            const left = format(rangeDates[0], DATE_FORMAT);
            const right = format(rangeDates[1], DATE_FORMAT);
            description = `${left} - ${right}`;
          } else if (op === DATETIME_OPERATIONS.RANGE_TIME) {
            const left = format(rangeDates[0], TIME_FORMAT);
            const right = format(rangeDates[1], TIME_FORMAT);
            description = `${left} - ${right}`;
          }

          props.setFilter({
            operation: op,
            range: rangeDates,
            selection: [],
            description: description,
            exclude,
          });
        }

        if (isCategorical) {
          // eslint-disable-next-line flowtype/no-weak-types
          const op: DatetimeOperationsT = (categoricalOperator[0].id: any);
          let selection: number[] = [];
          if (op === DATETIME_OPERATIONS.WEEKDAY) {
            selection = weekdays;
          } else if (op === DATETIME_OPERATIONS.MONTH) {
            selection = months;
          } else if (op === DATETIME_OPERATIONS.QUARTER) {
            selection = quarters;
          } else if (op === DATETIME_OPERATIONS.HALF) {
            selection = halves;
          } else if (op === DATETIME_OPERATIONS.YEAR) {
            selection = years;
          }

          props.setFilter({
            operation: op,
            range: [],
            selection,
            description: `${op} - ${selection.join(', ')}`,
            exclude,
          });
        }

        props.close();
      }}
    >
      <ButtonGroup
        size={SIZE.compact}
        mode={MODE.radio}
        selected={comparatorIndex}
        onClick={(_, index) => setComparatorIndex(index)}
        overrides={{
          Root: {
            style: ({$theme}) => ({marginBottom: $theme.sizing.scale300}),
          },
        }}
      >
        <Button
          type="button"
          overrides={{BaseButton: {style: {width: '100%'}}}}
        >
          Range
        </Button>
        <Button
          type="button"
          overrides={{BaseButton: {style: {width: '100%'}}}}
        >
          Categorical
        </Button>
      </ButtonGroup>

      {isRange && (
        <div ref={mountNode}>
          <Select
            value={rangeOperator}
            onChange={params => setRangeOperator(params.value)}
            options={RANGE_OPERATIONS}
            size="compact"
            clearable={false}
          />

          <div className={css({paddingTop: theme.sizing.scale600})}>
            {(rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATETIME ||
              rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATE) && (
              <Datepicker
                // eslint-disable-next-line flowtype/no-weak-types
                mountNode={(mountNode.current: any)}
                value={rangeDates}
                onChange={({date}) => {
                  if (Array.isArray(date)) {
                    if (!date.length) return;
                    const nextDates = date.map((d, i) =>
                      applyDateToTime(rangeDates[i], d),
                    );
                    setRangeDates(nextDates);
                  }
                }}
                formatString={DATE_FORMAT}
                placeholder="MM-DD-YYYY - MM-DD-YYYY"
                minDate={datesSorted[0]}
                maxDate={datesSorted[datesSorted.length - 1]}
                timeSelectStart={
                  rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATETIME
                }
                timeSelectEnd={
                  rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATETIME
                }
                overrides={{TimeSelect: {props: {size: 'compact'}}}}
                range
                size="compact"
              />
            )}
          </div>

          {(rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATETIME ||
            rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_TIME) && (
            <div
              className={css({
                display: 'flex',
                paddingTop: theme.sizing.scale100,
              })}
            >
              <div
                className={css({
                  width: '100%',
                  marginRight: theme.sizing.scale300,
                })}
              >
                <TimePicker
                  format="24"
                  value={rangeDates[0]}
                  onChange={time =>
                    setRangeDates([
                      applyTimeToDate(rangeDates[0], time),
                      rangeDates[1],
                    ])
                  }
                  creatable
                  size="compact"
                />
              </div>

              <div
                className={css({
                  width: '100%',
                })}
              >
                <TimePicker
                  format="24"
                  value={rangeDates[1]}
                  onChange={time =>
                    setRangeDates([
                      rangeDates[0],
                      applyTimeToDate(rangeDates[1], time),
                    ])
                  }
                  creatable
                  size="compact"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {isCategorical && (
        <div>
          <Select
            value={categoricalOperator}
            onChange={params => setCategoricalOperator(params.value)}
            options={CATEGORICAL_OPERATIONS}
            size="compact"
            clearable={false}
          />

          <div
            className={css({
              paddingLeft: theme.sizing.scale300,
              paddingTop: theme.sizing.scale500,
            })}
          >
            {categoricalOperator[0].id === DATETIME_OPERATIONS.WEEKDAY && (
              <Checks
                value={weekdays}
                setValue={setWeekdays}
                options={WEEKDAYS.map((w, i) => ({label: w, id: i}))}
              />
            )}

            {categoricalOperator[0].id === DATETIME_OPERATIONS.MONTH && (
              <Checks
                value={months}
                setValue={setMonths}
                options={MONTHS.map((m, i) => ({label: m, id: i}))}
              />
            )}

            {categoricalOperator[0].id === DATETIME_OPERATIONS.QUARTER && (
              <Checks
                value={quarters}
                setValue={setQuarters}
                options={QUARTERS.map((q, i) => ({label: q, id: i}))}
              />
            )}

            {categoricalOperator[0].id === DATETIME_OPERATIONS.HALF && (
              <Checks
                value={halves}
                setValue={setHalves}
                options={HALVES.map((h, i) => ({label: h, id: i}))}
              />
            )}

            {categoricalOperator[0].id === DATETIME_OPERATIONS.YEAR && (
              <Checks
                value={years}
                setValue={setYears}
                options={presentYears.map(year => ({label: year, id: year}))}
              />
            )}
          </div>
        </div>
      )}
    </FilterShell>
  );
}

const DatetimeCell = React.forwardRef<_, HTMLDivElement>((props, ref) => {
  const [css] = useStyletron();

  return (
    <CellShell
      ref={ref}
      isMeasured={props.isMeasured}
      isSelected={props.isSelected}
      onSelect={props.onSelect}
    >
      <div
        className={css({
          display: 'flex',
          justifyContent: 'flex-end',
          fontFamily: `"Lucida Console", Monaco, monospace`,
          width: '100%',
        })}
      >
        {format(props.value, props.formatString)}
      </div>
    </CellShell>
  );
});
DatetimeCell.displayName = 'DatetimeCell';

const defaultOptions = {
  title: '',
  sortable: true,
  filterable: true,
  formatString: FORMAT_STRING,
};

function DatetimeColumn(options: OptionsT): DatetimeColumnT {
  const normalizedOptions = {
    ...defaultOptions,
    ...options,
  };

  return {
    kind: COLUMNS.DATETIME,
    buildFilter: function(params) {
      return function(data) {
        let included = true;
        if (params.operation === DATETIME_OPERATIONS.YEAR) {
          included = params.selection.includes(getYear(data));
        } else if (params.operation === DATETIME_OPERATIONS.HALF) {
          const month = getMonth(data);
          const half = month < 6 ? 0 : 1;
          included = params.selection.includes(half);
        } else if (params.operation === DATETIME_OPERATIONS.QUARTER) {
          // date-fns quarters are 1 indexed
          const quarter = getQuarter(data) - 1;
          included = params.selection.includes(quarter);
        } else if (params.operation === DATETIME_OPERATIONS.MONTH) {
          included = params.selection.includes(getMonth(data));
        } else if (params.operation === DATETIME_OPERATIONS.WEEKDAY) {
          included = params.selection.includes(getDay(data));
        }

        if (
          params.operation === DATETIME_OPERATIONS.RANGE_DATE ||
          params.operation === DATETIME_OPERATIONS.RANGE_TIME ||
          params.operation === DATETIME_OPERATIONS.RANGE_DATETIME
        ) {
          let [left, right] = params.range;

          if (params.operation === DATETIME_OPERATIONS.RANGE_DATE) {
            left = set(left, {hours: 0, minutes: 0, seconds: 0});
            right = set(right, {hours: 0, minutes: 0, seconds: 0});
            data = set(data, {hours: 0, minutes: 0, seconds: 0});
          }

          if (params.operation === DATETIME_OPERATIONS.RANGE_TIME) {
            left = set(left, {year: 2000, month: 1, date: 1});
            right = set(right, {year: 2000, month: 1, date: 1});
            data = set(data, {year: 2000, month: 1, date: 1});
          }

          const after = isAfter(data, left) || isEqual(data, left);
          const before = isBefore(data, right) || isEqual(data, right);
          included = after && before;
        }

        return params.exclude ? !included : included;
      };
    },
    filterable: normalizedOptions.filterable,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: React.forwardRef((props, ref) => {
      return (
        <DatetimeCell
          ref={ref}
          isMeasured={props.isMeasured}
          isSelected={props.isSelected}
          onSelect={props.onSelect}
          value={props.value}
          formatString={normalizedOptions.formatString}
        />
      );
    }),
    renderFilter: DatetimeFilter,
    sortable: normalizedOptions.sortable,
    sortFn: sortDates,

    title: options.title,
  };
}

export default DatetimeColumn;
