/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../styles/index.js';

import {COLUMNS} from './constants.js';
import type {ColumnT} from './types.js';

type BooleanCellPropsT = {
  isMeasured?: boolean,
  value: boolean,
};

export type OptionsT = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
|};

type FilterParametersT = {|
  exclude: boolean,
|};

type BooleanColumnT = ColumnT<boolean, FilterParametersT>;

function BooleanFilter(props) {
  return <div>not implemented for boolean column</div>;
}

const BooleanCell = React.forwardRef<BooleanCellPropsT, HTMLDivElement>(
  (props, ref) => {
    const [useCss, theme] = useStyletron();
    return (
      <div
        ref={ref}
        className={useCss({
          ...theme.typography.font200,
          display: props.isMeasured ? 'inline-block' : null,
          paddingLeft: theme.sizing.scale600,
          paddingRight: theme.sizing.scale600,
          textAlign: props.value ? 'left' : 'right',
          minWidth: theme.sizing.scale1400,
          width: props.isMeasured ? null : '100%',
        })}
      >
        {props.value ? 'T' : 'F'}
      </div>
    );
  },
);
BooleanCell.displayName = 'BooleanCell';

function BooleanColumn(options: OptionsT): BooleanColumnT {
  return {
    kind: COLUMNS.BOOLEAN,
    title: options.title,
    sortable: options.sortable === undefined ? true : options.sortable,
    filterable: options.filterable === undefined ? true : options.filterable,
    renderCell: BooleanCell,
    renderFilter: BooleanFilter,
    buildFilter: function(params) {
      return function(data) {
        return true;
      };
    },
    sortFn: function(a, b) {
      if (a === b) return 0;
      return a ? -1 : 1;
    },
  };
}

export default BooleanColumn;
