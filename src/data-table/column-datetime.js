/*
Copyright (c) Uber Technologies, Inc.

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
import {
  applyDateToTime,
  applyTimeToDate,
  getMonthInLocale,
  getWeekdayInLocale,
  getQuarterInLocale,
  getStartOfWeek,
  addDays,
} from '../datepicker/utils/index.js';
import {Datepicker} from '../datepicker/index.js';
import {TimePicker} from '../timepicker/index.js';
import {useStyletron} from '../styles/index.js';
import {Select, type ValueT} from '../select/index.js';

import Column from './column.js';
import {COLUMNS, DATETIME_OPERATIONS} from './constants.js';
import FilterShell from './filter-shell.js';
import type {ColumnT, SharedColumnOptionsT} from './types.js';
import {LocaleContext} from '../locale/index.js';

type OptionsT = {|
  ...SharedColumnOptionsT<Date>,
  formatString?: string,
  // flowlint-next-line unclear-type:off
  locale?: any,
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
const MASK = '99-99-9999 - 99-99-9999';
const TIME_FORMAT = 'HH:mm ss:SS';
const FORMAT_STRING = `${DATE_FORMAT} ${TIME_FORMAT}`;

function sortDates(a, b) {
  return a - b;
}

const RANGE_OPERATIONS = [
  {
    localeLabelKey: 'datetimeFilterRangeDatetime',
    id: DATETIME_OPERATIONS.RANGE_DATETIME,
  },
  {
    localeLabelKey: 'datetimeFilterRangeDate',
    id: DATETIME_OPERATIONS.RANGE_DATE,
  },
  {
    localeLabelKey: 'datetimeFilterRangeTime',
    id: DATETIME_OPERATIONS.RANGE_TIME,
  },
];

const CATEGORICAL_OPERATIONS = [
  {
    localeLabelKey: 'datetimeFilterCategoricalWeekday',
    id: DATETIME_OPERATIONS.WEEKDAY,
  },
  {
    localeLabelKey: 'datetimeFilterCategoricalMonth',
    id: DATETIME_OPERATIONS.MONTH,
  },
  {
    localeLabelKey: 'datetimeFilterCategoricalQuarter',
    id: DATETIME_OPERATIONS.QUARTER,
  },
  {
    localeLabelKey: 'datetimeFilterCategoricalHalf',
    id: DATETIME_OPERATIONS.HALF,
  },
  {
    localeLabelKey: 'datetimeFilterCategoricalYear',
    id: DATETIME_OPERATIONS.YEAR,
  },
];

const WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const QUARTERS = [0, 1, 2, 3];

function Checks(props) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({maxHeight: '256px', overflowY: 'auto'})}>
      {props.options.map((item) => {
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
                  props.setValue((prev) => prev.filter((i) => i !== item.id));
                } else {
                  props.setValue((prev) => [...prev, item.id]);
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
    if (input.range && input.range.length) {
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
    } else if (input.selection && input.selection.length) {
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
  const locale = React.useContext(LocaleContext);
  const mountNode = React.useRef();
  const initialState = filterParamsToInitialState(props.filterParams);

  const datesSorted = React.useMemo(() => {
    return props.data.sort(sortDates);
  }, [props.data]);
  const presentYears = React.useMemo(() => {
    const dict = {};
    props.data.forEach((date) => {
      dict[getYear(date)] = true;
    });
    return Object.keys(dict).map((n) => parseInt(n));
  }, [props.data]);
  const startOfWeek = React.useMemo(() => {
    return getStartOfWeek(new Date(), props.locale);
  }, [props.locale]);
  const localizedWeekdays = React.useMemo(() => {
    return [
      ...WEEKDAYS.slice(getDay(startOfWeek), 7),
      ...WEEKDAYS.slice(0, getDay(startOfWeek)),
    ];
  }, [props.locale]);

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
  // flowlint-next-line unclear-type:off
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
          // flowlint-next-line unclear-type:off
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
          // flowlint-next-line unclear-type:off
          const op: DatetimeOperationsT = (categoricalOperator[0].id: any);

          let selection: number[] = [];
          let operatorLocaleLabelKey = '';
          let description = '';
          if (op === DATETIME_OPERATIONS.WEEKDAY) {
            selection = weekdays;
            operatorLocaleLabelKey = CATEGORICAL_OPERATIONS[0].localeLabelKey;
            description = weekdays
              .map((w) => {
                const day = addDays(startOfWeek, localizedWeekdays.indexOf(w));

                return getWeekdayInLocale(day, props.locale);
              })
              .join(', ');
          } else if (op === DATETIME_OPERATIONS.MONTH) {
            selection = months;
            operatorLocaleLabelKey = CATEGORICAL_OPERATIONS[1].localeLabelKey;
            description = months
              .map((m) => getMonthInLocale(m, props.locale))
              .join(', ');
          } else if (op === DATETIME_OPERATIONS.QUARTER) {
            selection = quarters;
            operatorLocaleLabelKey = CATEGORICAL_OPERATIONS[2].localeLabelKey;
            description = quarters
              .map((q) => getQuarterInLocale(q, props.locale))
              .join(', ');
          } else if (op === DATETIME_OPERATIONS.HALF) {
            selection = halves;
            operatorLocaleLabelKey = CATEGORICAL_OPERATIONS[3].localeLabelKey;
            description = halves
              .map((h) =>
                h === 0
                  ? locale.datatable.datetimeFilterCategoricalFirstHalf
                  : locale.datatable.datetimeFilterCategoricalSecondHalf,
              )
              .join(', ');
          } else if (op === DATETIME_OPERATIONS.YEAR) {
            selection = years;
            operatorLocaleLabelKey = CATEGORICAL_OPERATIONS[4].localeLabelKey;
            description = years.join(', ');
          }

          if (operatorLocaleLabelKey) {
            description = `${locale.datatable[operatorLocaleLabelKey]} - ${description}`;
          }

          props.setFilter({
            operation: op,
            range: [],
            selection,
            description,
            exclude,
          });
        }

        props.close();
      }}
    >
      <div ref={mountNode}>
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
            {locale.datatable.datetimeFilterRange}
          </Button>
          <Button
            type="button"
            overrides={{BaseButton: {style: {width: '100%'}}}}
          >
            {locale.datatable.datetimeFilterCategorical}
          </Button>
        </ButtonGroup>

        {isRange && (
          <div>
            <Select
              value={rangeOperator}
              onChange={(params) => setRangeOperator(params.value)}
              // flowlint-next-line unclear-type:off
              mountNode={(mountNode.current: any)}
              options={RANGE_OPERATIONS.map((op) => ({
                label: locale.datatable[op.localeLabelKey],
                id: op.id,
              }))}
              size="compact"
              clearable={false}
            />

            <div className={css({paddingTop: theme.sizing.scale600})}>
              {(rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATETIME ||
                rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATE) && (
                <Datepicker
                  // flowlint-next-line unclear-type:off
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
                  mask={MASK}
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
                  locale={props.locale}
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
                    onChange={(time) =>
                      time &&
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
                    onChange={(time) =>
                      time &&
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
              onChange={(params) => setCategoricalOperator(params.value)}
              options={CATEGORICAL_OPERATIONS.map((op) => ({
                label: locale.datatable[op.localeLabelKey],
                id: op.id,
              }))}
              // flowlint-next-line unclear-type:off
              mountNode={(mountNode.current: any)}
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
                  options={localizedWeekdays.map((w, offset) => {
                    const day = addDays(startOfWeek, offset);

                    return {
                      label: getWeekdayInLocale(day, props.locale),
                      id: w,
                    };
                  })}
                />
              )}

              {categoricalOperator[0].id === DATETIME_OPERATIONS.MONTH && (
                <Checks
                  value={months}
                  setValue={setMonths}
                  options={MONTHS.map((m) => ({
                    label: getMonthInLocale(m, props.locale),
                    id: m,
                  }))}
                />
              )}

              {categoricalOperator[0].id === DATETIME_OPERATIONS.QUARTER && (
                <Checks
                  value={quarters}
                  setValue={setQuarters}
                  options={QUARTERS.map((q) => ({
                    label: getQuarterInLocale(q, props.locale),
                    id: q,
                  }))}
                />
              )}

              {categoricalOperator[0].id === DATETIME_OPERATIONS.HALF && (
                <Checks
                  value={halves}
                  setValue={setHalves}
                  options={[
                    {
                      label:
                        locale.datatable.datetimeFilterCategoricalFirstHalf,
                      id: 0,
                    },
                    {
                      label:
                        locale.datatable.datetimeFilterCategoricalSecondHalf,
                      id: 1,
                    },
                  ]}
                />
              )}

              {categoricalOperator[0].id === DATETIME_OPERATIONS.YEAR && (
                <Checks
                  value={years}
                  setValue={setYears}
                  options={presentYears.map((year) => ({
                    label: year,
                    id: year,
                  }))}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </FilterShell>
  );
}

function DatetimeCell(props) {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        ...theme.typography.MonoParagraphXSmall,
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        whiteSpace: 'nowrap',
      })}
    >
      {format(props.value, props.formatString)}
    </div>
  );
}

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

  return Column({
    kind: COLUMNS.DATETIME,
    buildFilter: function (params) {
      return function (data) {
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
    cellBlockAlign: options.cellBlockAlign,
    fillWidth: options.fillWidth,
    filterable: normalizedOptions.filterable,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: function RenderDatetimeCell(props) {
      return (
        <DatetimeCell
          value={props.value}
          formatString={normalizedOptions.formatString}
        />
      );
    },
    renderFilter: function RenderDatetimeFilter(props) {
      return <DatetimeFilter {...props} locale={options.locale} />;
    },
    sortable: normalizedOptions.sortable,
    sortFn: sortDates,

    title: options.title,
  });
}

export default DatetimeColumn;
