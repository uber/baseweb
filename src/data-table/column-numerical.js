/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button, SIZE} from '../button/index.js';
import {ButtonGroup, MODE} from '../button-group/index.js';
import {Input, SIZE as INPUT_SIZE} from '../input/index.js';
import {useStyletron} from '../styles/index.js';

import Column from './column.js';
import {COLUMNS, NUMERICAL_FORMATS} from './constants.js';
import FilterShell from './filter-shell.js';
import type {ColumnT, SharedColumnOptionsT} from './types.js';
import {LocaleContext} from '../locale/index.js';
import {bin, max as maxFunc, extent, scaleLinear, median} from 'd3';
import {Slider} from '../slider/index.js';

type NumericalFormats =
  | typeof NUMERICAL_FORMATS.DEFAULT
  | typeof NUMERICAL_FORMATS.ACCOUNTING
  | typeof NUMERICAL_FORMATS.PERCENTAGE;

type OptionsT = {|
  ...SharedColumnOptionsT<number>,
  format?: NumericalFormats | ((value: number) => string),
  highlight?: number => boolean,
  precision?: number,
|};

type FilterParametersT = {|
  lowerValue: number,
  upperValue: number,
  description: string,
  exclude: boolean,
|};

type NumericalColumnT = ColumnT<number, FilterParametersT>;

function roundToFixed(value: number, precision: number) {
  const k = Math.pow(10, precision);
  return Math.round(value * k) / k;
}

function format(value: number, options) {
  if (typeof options.format === 'function') {
    return options.format(value);
  }
  let formatted = value.toString();
  switch (options.format) {
    case NUMERICAL_FORMATS.ACCOUNTING: {
      const abs = Math.abs(value);
      if (value < 0) {
        formatted = `($${roundToFixed(abs, options.precision)})`;
        break;
      }
      formatted = `$${roundToFixed(abs, options.precision)}`;
      break;
    }
    case NUMERICAL_FORMATS.PERCENTAGE: {
      formatted = `${roundToFixed(value, options.precision)}%`;
      break;
    }
    case NUMERICAL_FORMATS.DEFAULT:
    default:
      formatted = roundToFixed(value, options.precision);
      break;
  }
  return formatted;
}

function validateInput(input) {
  return Boolean(parseFloat(input)) || input === '' || input === '-';
}

// Depends on FILTER_SHELL_WIDTH
const HISTOGRAM_SIZE = {width: 300, height: 120};

// Arguably visually appealing within the given width.
// Smaller and we don't have enough detail per bar.
// Larger and the bars are too granular and don't align well with the slider steps
const MAX_BIN_COUNT = 50;

const Histogram = React.memo(function Histogram({
  data,
  lower,
  upper,
  exclude,
  precision,
}) {
  const [css, theme] = useStyletron();

  const {bins, xScale, yScale} = React.useMemo(() => {
    const bins = bin().thresholds(MAX_BIN_COUNT)(data);

    const xScale = scaleLinear()
      .domain([bins[0].x0, bins[bins.length - 1].x1])
      .range([0, HISTOGRAM_SIZE.width])
      .clamp(true);

    const yScale = scaleLinear()
      .domain([0, maxFunc(bins, d => d.length)])
      .nice()
      .range([HISTOGRAM_SIZE.height, 0]);
    return {bins, xScale, yScale};
  }, [data]);

  return (
    <div
      className={css({
        display: 'flex',
        marginTop: theme.sizing.scale600,
        marginLeft: theme.sizing.scale400,
        marginRight: theme.sizing.scale400,
        marginBottom: theme.sizing.scale400,
        justifyContent: 'space-between',
      })}
    >
      <svg {...HISTOGRAM_SIZE}>
        {bins.map((d, index) => {
          const x = xScale(d.x0) + 1;
          const y = yScale(d.length);
          const width = Math.max(0, xScale(d.x1) - xScale(d.x0) - 1);
          const height = yScale(0) - yScale(d.length);

          const withinLower = d.x0 >= roundToFixed(lower, precision);
          const withinUpper = d.x0 <= roundToFixed(upper, precision);

          const included = exclude
            ? !withinLower || !withinUpper
            : withinLower && withinUpper;

          const fill = included ? theme.colors.primary : theme.colors.mono400;
          return (
            <rect
              key={`bar-${index}`}
              fill={fill}
              x={x}
              y={y}
              width={width}
              height={height}
            />
          );
        })}
      </svg>
    </div>
  );
});

function NumericalFilter(props) {
  const [css, theme] = useStyletron();
  const locale = React.useContext(LocaleContext);

  // The state handling of this component could be refactored and clean up if we used useReducer.
  const initialState = React.useMemo(() => {
    return (
      props.filterParams || {
        exclude: false,
        comparatorIndex: 0,
        lowerValue: null,
        upperValue: null,
      }
    );
  }, [props.filterParams]);

  const [exclude, setExclude] = React.useState(initialState.exclude);

  // the api of our ButtonGroup forces these numerical indexes...
  // TODO look into allowing semantic names, similar to the radio component. Tricky part would be backwards compat
  const [comparatorIndex, setComparatorIndex] = React.useState(0);

  // We use the d3 function to get the extent as it's a little more robust to null's, -Infinity, etc.
  const [min, max] = React.useMemo(() => extent(props.data), [props.data]);

  const [lowerValue, setLower] = React.useState<number>(
    () => initialState.lowerValue || min,
  );
  const [upperValue, setUpper] = React.useState<number>(
    () => initialState.upperValue || max,
  );

  const [singleValue, setSingle] = React.useState<number>(() =>
    roundToFixed(
      initialState.lowerValue || median(props.data),
      props.options.precision,
    ),
  );

  const isRange = comparatorIndex === 0;

  const leftInputRef = React.useRef(null);
  const rightInputRef = React.useRef(null);

  const sliderValue = isRange
    ? // Bound the values within our min and max even if a user enters a huge number
      [Math.max(+lowerValue, min), Math.min(+upperValue, max)]
    : [Math.min(Math.max(+singleValue, min), max)];

  return (
    <FilterShell
      exclude={exclude}
      onExcludeChange={() => setExclude(!exclude)}
      excludeKind={isRange ? 'range' : 'value'}
      onApply={() => {
        if (isRange) {
          const leftValue = parseFloat(lowerValue);
          const rightValue = parseFloat(upperValue);
          props.setFilter({
            description: `≥ ${leftValue} and ≤ ${rightValue}`,
            exclude: exclude,
            lowerValue,
            upperValue,
          });
        } else {
          const value = parseFloat(singleValue);
          props.setFilter({
            description: `= ${value}`,
            exclude: exclude,
            lowerValue: singleValue,
            upperValue: singleValue,
          });
        }

        props.close();
      }}
    >
      <ButtonGroup
        size={SIZE.mini}
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
          {locale.datatable.numericalFilterRange}
        </Button>
        <Button
          type="button"
          overrides={{BaseButton: {style: {width: '100%'}}}}
        >
          {locale.datatable.numericalFilterSingleValue}
        </Button>
      </ButtonGroup>

      <Histogram
        data={props.data}
        lower={isRange ? lowerValue : singleValue}
        upper={isRange ? upperValue : singleValue}
        exclude={exclude}
        precision={props.options.precision}
      />

      <div className={css({display: 'flex', justifyContent: 'space-between'})}>
        <Slider
          allowOverlap={true}
          key={isRange.toString()}
          min={min}
          max={max}
          value={sliderValue}
          onChange={({value}) => {
            if (!value) {
              return;
            }
            if (isRange) {
              const [lowerValue, upperValue] = value;
              setLower(lowerValue);
              setUpper(upperValue);
            } else {
              const [singleValue] = value;
              setSingle(singleValue);
            }
          }}
          overrides={{
            InnerThumb: function InnerThumb({$value, $thumbIndex}) {
              return <React.Fragment>{$value[$thumbIndex]}</React.Fragment>;
            },
            TickBar: ({$min, $max}) => null,
            ThumbValue: () => null,
            Root: {
              style: () => ({
                // Aligns the center of the slider handles with the histogram bars
                width: 'calc(100% + 4px)',
                margin: '0 -2px',
              }),
            },
            Thumb: {
              style: () => ({
                // Slider handles are small enough to visually be centered within each histogram bar
                height: '18px',
                width: '18px',
                fontSize: '0px',
              }),
            },
          }}
        />
      </div>
      <div
        className={css({
          display: 'flex',
          marginTop: theme.sizing.scale400,
          gap: '15%',
          justifyContent: 'space-between',
        })}
      >
        <Input
          min={min}
          max={max}
          size={INPUT_SIZE.mini}
          overrides={{Root: {style: {width: '100%'}}}}
          inputRef={leftInputRef}
          value={isRange ? lowerValue : singleValue}
          onChange={event => {
            if (validateInput(event.target.value)) {
              setLower(+event.target.value);
            }
          }}
        />
        {isRange && (
          <Input
            min={min}
            max={max}
            size={INPUT_SIZE.mini}
            overrides={{
              Input: {style: {textAlign: 'right'}},
              Root: {style: {width: '100%'}},
            }}
            inputRef={rightInputRef}
            value={upperValue}
            onChange={event => {
              if (validateInput(event.target.value)) {
                setUpper(+event.target.value);
              }
            }}
          />
        )}
      </div>
    </FilterShell>
  );
}

function NumericalCell(props) {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        ...theme.typography.MonoParagraphXSmall,
        display: 'flex',
        justifyContent: theme.direction !== 'rtl' ? 'flex-end' : 'flex-start',
        color: props.highlight(props.value)
          ? theme.colors.contentNegative
          : null,
        width: '100%',
      })}
    >
      {format(props.value, {
        format: props.format,
        precision: props.precision,
      })}
    </div>
  );
}

const defaultOptions = {
  title: '',
  sortable: true,
  filterable: true,
  format: NUMERICAL_FORMATS.DEFAULT,
  highlight: (n => false: number => boolean),
  precision: 0,
};

function NumericalColumn(options: OptionsT): NumericalColumnT {
  const normalizedOptions = {
    ...defaultOptions,
    ...options,
  };

  if (
    normalizedOptions.format !== NUMERICAL_FORMATS.DEFAULT &&
    (options.precision === null || options.precision === undefined)
  ) {
    normalizedOptions.precision = 2;
  }

  if (
    normalizedOptions.format === NUMERICAL_FORMATS.ACCOUNTING &&
    (options.highlight === null || options.highlight === undefined)
  ) {
    normalizedOptions.highlight = (n: number) => (n < 0: boolean);
  }

  return Column({
    kind: COLUMNS.NUMERICAL,
    buildFilter: function(params) {
      return function(data) {
        const value = roundToFixed(data, normalizedOptions.precision);
        return params.exclude
          ? !(value >= params.lowerValue) || !(value <= params.upperValue)
          : value >= params.lowerValue && value <= params.upperValue;
      };
    },
    cellBlockAlign: options.cellBlockAlign,
    fillWidth: options.fillWidth,
    filterable: normalizedOptions.filterable,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: function RenderNumericalCell(props) {
      return (
        <NumericalCell
          {...props}
          format={normalizedOptions.format}
          highlight={normalizedOptions.highlight}
          precision={normalizedOptions.precision}
        />
      );
    },
    renderFilter: function RenderNumericalFilter(props) {
      return <NumericalFilter {...props} options={normalizedOptions} />;
    },
    sortable: normalizedOptions.sortable,
    sortFn: function(a, b) {
      return a - b;
    },
    title: normalizedOptions.title,
  });
}

export default NumericalColumn;
