/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {format} from 'date-fns';

import {Button, SIZE} from '../button/index.js';
import {ButtonGroup, MODE} from '../button-group/index.js';
import {Datepicker, formatDate} from '../datepicker/index.js';
import {TimePicker} from '../timepicker/index.js';
import {FormControl} from '../form-control/index.js';
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
  dateRange?: [Date, Date],
  description: string,
  exclude: boolean,
|};

type DatetimeColumnT = ColumnT<Date, FilterParametersT>;

function sortDates(a, b) {
  return a - b;
}

function formatDateAtIndex(dates, index) {
  if (!dates || !Array.isArray(dates)) return '';
  const date = dates[index];
  if (!date) return '';
  return formatDate(date, 'MM-dd-yyyy');
}

const rangeOperators = [
  {label: 'Date, Time', id: DATETIME_OPERATIONS.RANGE_DATETIME},
  {label: 'Date', id: DATETIME_OPERATIONS.RANGE_DATE},
  {label: 'Time', id: DATETIME_OPERATIONS.RANGE_TIME},
];

function DatetimeFilter(props) {
  const [css, theme] = useStyletron();

  const datesSorted = React.useMemo(() => {
    return props.data.sort(sortDates);
  }, [props.data]);

  const [exclude, setExclude] = React.useState(false);
  const [comparatorIndex, setComparatorIndex] = React.useState(0);
  const [rangeOperator, setRangeOperator] = React.useState<ValueT>([
    rangeOperators[0],
  ]);
  const [rangeDates, setRangeDates] = React.useState<any>([
    datesSorted[0],
    datesSorted[datesSorted.length - 1],
  ]);

  const isRange = comparatorIndex === 0;
  const isCategorical = comparatorIndex === 1;

  return (
    <FilterShell
      exclude={exclude}
      onExcludeChange={() => setExclude(!exclude)}
      onApply={() => {
        if (isRange) {
          const operation: DatetimeOperationsT = (rangeOperator[0].id: any);
          props.setFilter({
            operation,
            dateRange: rangeDates,
            description: 'CHANGE THIS',
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
        <div>
          <Select
            value={rangeOperator}
            onChange={params => setRangeOperator(params.value)}
            options={rangeOperators}
            size="compact"
            clearable={false}
          />
          <div className={css({display: 'flex', alignItems: 'center'})}>
            <div
              className={css({
                width: '100%',
                marginRight: theme.sizing.scale300,
              })}
            >
              <FormControl label="Start">
                <div>
                  {(rangeOperator[0].id ===
                    DATETIME_OPERATIONS.RANGE_DATETIME ||
                    rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATE) && (
                    <Datepicker
                      value={rangeDates}
                      onChange={({date}) => setRangeDates(date)}
                      formatDisplayValue={date => formatDateAtIndex(date, 0)}
                      minDate={datesSorted[0]}
                      maxDate={datesSorted[datesSorted.length - 1]}
                      timeSelectStart={
                        rangeOperator[0].id ===
                        DATETIME_OPERATIONS.RANGE_DATETIME
                      }
                      range
                      mask="99-99-9999"
                      size="compact"
                    />
                  )}
                  {(rangeOperator[0].id ===
                    DATETIME_OPERATIONS.RANGE_DATETIME ||
                    rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_TIME) && (
                    <TimePicker
                      value={rangeDates[0]}
                      onChange={time => setRangeDates([time, rangeDates[1]])}
                      creatable
                      size="compact"
                    />
                  )}
                </div>
              </FormControl>
            </div>

            <div
              className={css({
                width: '100%',
                marginRight: theme.sizing.scale300,
              })}
            >
              <FormControl label="End">
                <div>
                  {(rangeOperator[0].id ===
                    DATETIME_OPERATIONS.RANGE_DATETIME ||
                    rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_DATE) && (
                    <Datepicker
                      value={rangeDates}
                      onChange={({date}) => setRangeDates(date)}
                      formatDisplayValue={date => formatDateAtIndex(date, 1)}
                      minDate={datesSorted[0]}
                      maxDate={datesSorted[datesSorted.length - 1]}
                      timeSelectEnd={
                        rangeOperator[0].id ===
                        DATETIME_OPERATIONS.RANGE_DATETIME
                      }
                      overrides={{
                        TimeSelectFormControl: {
                          props: {label: 'End time'},
                        },
                      }}
                      range
                      mask="99-99-9999"
                      size="compact"
                    />
                  )}
                  {(rangeOperator[0].id ===
                    DATETIME_OPERATIONS.RANGE_DATETIME ||
                    rangeOperator[0].id === DATETIME_OPERATIONS.RANGE_TIME) && (
                    <TimePicker
                      value={rangeDates[1]}
                      onChange={time => setRangeDates([rangeDates[0], time])}
                      creatable
                      size="compact"
                    />
                  )}
                </div>
              </FormControl>
            </div>
          </div>
        </div>
      )}

      {isCategorical && (
        <div>
          <p>categorical</p>
        </div>
      )}
    </FilterShell>
  );
}

const DatetimeCell = React.forwardRef<_, HTMLDivElement>((props, ref) => {
  const [css, theme] = useStyletron();

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
  formatString: 'dd-MM-yyyy HH:mm ss:SS',
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
        const included = true;
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
    // initial sort should display largest values first
    sortFn: sortDates,

    title: options.title,
  };
}

export default DatetimeColumn;
