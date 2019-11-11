/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../styles/index.js';

import CellShell from './cell-shell.js';
import {CategoricalFilter} from './column-categorical.js';
import {COLUMNS} from './constants.js';
import type {ColumnT} from './types.js';

type OptionsT = {|
  title: string,
  sortable?: boolean,
  filterable?: boolean,
  maxWidth?: number,
  minWidth?: number,
|};

type FilterParametersT = {|
  selection: Set<boolean>,
  description: string,
  exclude: boolean,
|};

type BooleanColumnT = ColumnT<boolean, FilterParametersT>;

function BooleanFilter(props) {
  return (
    <CategoricalFilter
      data={['true', 'false']}
      close={props.close}
      setFilter={params => {
        const coercedSelection = new Set();
        params.selection.forEach(item =>
          coercedSelection.add(item.toLowerCase() === 'true'),
        );

        props.setFilter({
          selection: coercedSelection,
          exclude: params.exclude,
          description: params.description,
        });
      }}
    />
  );
}

const BooleanCell = React.forwardRef<_, HTMLDivElement>((props, ref) => {
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
          textAlign: props.value ? 'right' : 'left',
          minWidth: theme.sizing.scale1400,
          width: '100%',
        })}
      >
        {props.value ? 'T' : 'F'}
      </div>
    </CellShell>
  );
});
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
        const included = params.selection.has(data);
        return params.exclude ? !included : included;
      };
    },
    sortFn: function(a, b) {
      if (a === b) return 0;
      return a ? -1 : 1;
    },
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
  };
}

export default BooleanColumn;
