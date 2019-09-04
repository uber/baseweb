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

type NumericalCellPropsT = {
  isMeasured?: boolean,
  value: number,
};

export type OptionsT = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  format?:
    | typeof NUMERICAL_FORMATS.DEFAULT
    | typeof NUMERICAL_FORMATS.ACCOUNTING
    | typeof NUMERICAL_FORMATS.PERCENTAGE,
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
    return (
      <div
        ref={ref}
        className={useCss({
          ...theme.typography.font200,
          display: props.isMeasured ? 'inline-block' : null,
          fontFamily: `"Lucida Console", Monaco, monospace`,
          paddingLeft: theme.sizing.scale600,
          paddingRight: theme.sizing.scale600,
          textAlign: 'right',
          width: props.isMeasured ? null : '100%',
        })}
      >
        {props.value}
      </div>
    );
  },
);

function NumericalColumn(options: OptionsT): NumericalColumnT {
  return {
    kind: COLUMNS.NUMERICAL,
    title: options.title,
    sortable: options.sortable,
    filterable: options.filterable,
    renderCell: React.forwardRef((props, ref) => {
      return (
        <NumericalCell
          {...props}
          ref={ref}
          format={options.format || NUMERICAL_FORMATS.DEFAULT}
          highlight={options.highlight || (() => false)}
          precision={options.precision || 2}
        />
      );
    }),
    renderFilter: NumericalFilter,
    buildFilter: function(params) {
      return function(data) {
        return true;
      };
    },
    sortFn: function(a, b) {
      return b - a;
    },
  };
}

export default NumericalColumn;
