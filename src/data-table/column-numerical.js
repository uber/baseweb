/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button} from '../button/index.js';
import {ButtonGroup, MODE} from '../button-group/index.js';
import {Input} from '../input/index.js';
import {useStyletron} from '../styles/index.js';
import {Paragraph4} from '../typography/index.js';

import CellShell from './cell-shell.js';
import {COLUMNS, NUMERICAL_FORMATS, NUMERICAL_OPERATIONS} from './constants.js';
import FilterShell from './filter-shell.js';
import type {ColumnT} from './types.js';

type NumericalFormats =
  | typeof NUMERICAL_FORMATS.DEFAULT
  | typeof NUMERICAL_FORMATS.ACCOUNTING
  | typeof NUMERICAL_FORMATS.PERCENTAGE;

type NumericalOperations =
  | typeof NUMERICAL_OPERATIONS.EQ
  | typeof NUMERICAL_OPERATIONS.GT
  | typeof NUMERICAL_OPERATIONS.GTE
  | typeof NUMERICAL_OPERATIONS.LT
  | typeof NUMERICAL_OPERATIONS.LTE;

type OptionsT = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  format?: NumericalFormats,
  highlight?: number => boolean,
  precision?: number,
|};

type FilterParametersT = {|
  value: number,
  operation: NumericalOperations,
  exclude: boolean,
|};

type NumericalColumnT = ColumnT<number, FilterParametersT>;

function roundToFixed(value: number, precision: number) {
  const k = Math.pow(10, precision);
  return Math.round(value * k) / k;
}

function format(value: number, options) {
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

function NumericalFilter(props) {
  const [useCss, theme] = useStyletron();
  const [exclude, setExclude] = React.useState(false);
  const [comparator, setComparator] = React.useState(0);
  const [operator, setOperator] = React.useState(0);
  const [value, setValue] = React.useState('');

  const isRange = comparator === 0;
  const min = React.useMemo(() => Math.min(...props.data), [props.data]);
  const max = React.useMemo(() => Math.max(...props.data), [props.data]);

  return (
    <FilterShell
      exclude={exclude}
      onExcludeChange={() => setExclude(!exclude)}
      onApply={() => {
        let operation = NUMERICAL_OPERATIONS.EQ;
        if (isRange) {
          switch (operator) {
            case 3:
              operation = NUMERICAL_OPERATIONS.GTE;
              break;
            case 2:
              operation = NUMERICAL_OPERATIONS.LTE;
              break;
            case 1:
              operation = NUMERICAL_OPERATIONS.GT;
              break;
            case 0:
            default:
              operation = NUMERICAL_OPERATIONS.LT;
              break;
          }
        }

        const parsed = parseFloat(value);
        props.setFilter(
          {
            value: parsed,
            operation,
            exclude,
          },
          `${operation} ${parsed}`,
        );
        props.close();
      }}
    >
      <ButtonGroup
        mode={MODE.radio}
        selected={comparator}
        onClick={(_, index) => setComparator(index)}
        overrides={{
          Root: {
            style: ({$theme}) => ({marginBottom: $theme.sizing.scale500}),
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
          Single Value
        </Button>
      </ButtonGroup>

      {isRange && (
        <ButtonGroup
          mode={MODE.radio}
          selected={operator}
          onClick={(_, index) => setOperator(index)}
          overrides={{
            Root: {
              style: ({$theme}) => ({marginBottom: $theme.sizing.scale500}),
            },
          }}
        >
          <Button
            type="button"
            overrides={{BaseButton: {style: {width: '100%'}}}}
          >
            &#60;
          </Button>
          <Button
            type="button"
            overrides={{BaseButton: {style: {width: '100%'}}}}
          >
            &#62;
          </Button>
          <Button
            type="button"
            overrides={{BaseButton: {style: {width: '100%'}}}}
          >
            &#8804;
          </Button>
          <Button
            type="button"
            overrides={{BaseButton: {style: {width: '100%'}}}}
          >
            &#8805;
          </Button>
        </ButtonGroup>
      )}

      <div
        className={useCss({
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: theme.sizing.scale300,
          marginRight: theme.sizing.scale300,
        })}
      >
        <Paragraph4>{format(min, props.options)}</Paragraph4>{' '}
        <Paragraph4>{format(max, props.options)}</Paragraph4>
      </div>

      <div
        className={useCss({display: 'flex', justifyContent: 'space-between'})}
      >
        <Input
          overrides={{Root: {style: {width: '152px'}}}}
          value={value}
          onChange={event => {
            if (validateInput(event.target.value)) {
              setValue(event.target.value);
            }
          }}
        />
      </div>
    </FilterShell>
  );
}

const NumericalCell = React.forwardRef<_, HTMLDivElement>((props, ref) => {
  const [useCss, theme] = useStyletron();

  return (
    <CellShell
      ref={ref}
      isMeasured={props.isMeasured}
      isSelected={props.isSelected}
      onSelect={props.onSelect}
    >
      <div
        className={useCss({
          display: 'flex',
          justifyContent: 'flex-end',
          color: props.highlight(props.value) ? theme.colors.negative : null,
          fontFamily: `"Lucida Console", Monaco, monospace`,
          width: '100%',
        })}
      >
        {format(props.value, {
          format: props.format,
          precision: props.precision,
        })}
      </div>
    </CellShell>
  );
});
NumericalCell.displayName = 'NumericalCell';

const defaultOptions = {
  title: '',
  sortable: true,
  filterable: true,
  format: NUMERICAL_FORMATS.DEFAULT,
  highlight: (n: number) => false,
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
    normalizedOptions.highlight = n => n < 0;
  }

  return {
    kind: COLUMNS.NUMERICAL,
    title: normalizedOptions.title,
    sortable: normalizedOptions.sortable,
    filterable: normalizedOptions.filterable,
    renderCell: React.forwardRef((props, ref) => {
      return (
        <NumericalCell
          ref={ref}
          isMeasured={props.isMeasured}
          isSelected={props.isSelected}
          onSelect={props.onSelect}
          value={props.value}
          format={normalizedOptions.format}
          highlight={normalizedOptions.highlight}
          precision={normalizedOptions.precision}
        />
      );
    }),
    renderFilter: function RenderNumericalFilter(props) {
      return <NumericalFilter {...props} options={normalizedOptions} />;
    },
    buildFilter: function(params) {
      return function(data) {
        let included = true;
        const left = roundToFixed(data, normalizedOptions.precision);
        const right = roundToFixed(params.value, normalizedOptions.precision);
        switch (params.operation) {
          case NUMERICAL_OPERATIONS.EQ:
            included = left === right;
            break;
          case NUMERICAL_OPERATIONS.GT:
            included = left > right;
            break;
          case NUMERICAL_OPERATIONS.GTE:
            included = left >= right;
            break;
          case NUMERICAL_OPERATIONS.LT:
            included = left < right;
            break;
          case NUMERICAL_OPERATIONS.LTE:
            included = left <= right;
            break;
          default:
            break;
        }
        return params.exclude ? !included : included;
      };
    },
    // initial sort should display largest values first
    sortFn: function(a, b) {
      return b - a;
    },
  };
}

export default NumericalColumn;
