/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../styles/index.js';

import {COLUMNS, NUMERICAL_FORMATS} from './constants.js';
import type {ColumnT} from './types.js';

type NumericalFormats =
  | typeof NUMERICAL_FORMATS.DEFAULT
  | typeof NUMERICAL_FORMATS.ACCOUNTING
  | typeof NUMERICAL_FORMATS.PERCENTAGE;

type NumericalCellPropsT = {
  format: NumericalFormats,
  highlight: number => boolean,
  isMeasured?: boolean,
  precision: number,
  value: number,
};

export type OptionsT = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  format?: NumericalFormats,
  highlight?: number => boolean,
  precision?: number,
|};

type FilterParametersT = {|
  exclude: boolean,
|};

type NumericalColumnT = ColumnT<number, FilterParametersT>;

function NumericalFilter(props) {
  return <div>not implemented for numerical column</div>;
}

const NumericalCell = React.forwardRef<NumericalCellPropsT, HTMLDivElement>(
  (props, ref) => {
    const [useCss, theme] = useStyletron();

    let value = props.value;
    switch (props.format) {
      case NUMERICAL_FORMATS.ACCOUNTING: {
        const abs = Math.abs(value);
        if (value < 0) {
          value = `($${abs.toFixed(props.precision)})`;
          break;
        }
        value = `$${abs.toFixed(props.precision)}`;
        break;
      }
      case NUMERICAL_FORMATS.PERCENTAGE: {
        value = `${value.toFixed(props.precision)}%`;
        break;
      }
      case NUMERICAL_FORMATS.DEFAULT:
      default:
        value = value.toFixed(props.precision);
        break;
    }

    return (
      <div
        ref={ref}
        className={useCss({
          ...theme.typography.font200,
          color: props.highlight(props.value) ? theme.colors.negative : null,
          display: props.isMeasured ? 'inline-block' : null,
          fontFamily: `"Lucida Console", Monaco, monospace`,
          paddingLeft: theme.sizing.scale600,
          paddingRight: theme.sizing.scale600,
          textAlign: 'right',
          width: props.isMeasured ? null : '100%',
        })}
      >
        {value}
      </div>
    );
  },
);

const defaultOptions = {
  title: '',
  sortable: true,
  filterable: true,
  format: NUMERICAL_FORMATS.DEFAULT,
  highlight: () => false,
  precision: 0,
};

function NumericalColumn(options: OptionsT): NumericalColumnT {
  const normalizedOptions = {
    ...defaultOptions,
    ...options,
  };

  return {
    kind: COLUMNS.NUMERICAL,
    title: normalizedOptions.title,
    sortable: normalizedOptions.sortable,
    filterable: normalizedOptions.filterable,
    renderCell: React.forwardRef((props, ref) => {
      return (
        <NumericalCell
          {...props}
          ref={ref}
          format={normalizedOptions.format}
          highlight={
            normalizedOptions.format === NUMERICAL_FORMATS.ACCOUNTING
              ? n => n < 0
              : normalizedOptions.highlight
          }
          precision={
            normalizedOptions.format === NUMERICAL_FORMATS.DEFAULT
              ? normalizedOptions.precision
              : 2
          }
        />
      );
    }),
    renderFilter: NumericalFilter,
    buildFilter: function(params) {
      return function(data) {
        return true;
      };
    },
    // initial sort should display largest values first
    sortFn: function(a, b) {
      return b - a;
    },
  };
}

export default NumericalColumn;
