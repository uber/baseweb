/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

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
  filterable?: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  mapDataToValue: (data: any) => boolean,
  maxWidth?: number,
  minWidth?: number,
  sortable?: boolean,
  title: string,
|};

type FilterParametersT = {|
  selection: Set<boolean>,
  description: string,
  exclude: boolean,
|};

type BooleanColumnT = ColumnT<boolean, FilterParametersT>;

function mapSelection<X, Y>(selection: Set<X>, transform: X => Y): Set<Y> {
  const coercedSelection = new Set<Y>();
  selection.forEach(item => coercedSelection.add(transform(item)));
  return coercedSelection;
}

function BooleanFilter(props) {
  let selectionString = new Set();
  if (props.filterParams && props.filterParams.selection) {
    selectionString = mapSelection(props.filterParams.selection, i =>
      String(i),
    );
  }

  return (
    <CategoricalFilter
      close={props.close}
      data={['true', 'false']}
      filterParams={
        props.filterParams
          ? {
              selection: selectionString,
              description: props.filterParams.description,
              exclude: props.filterParams.exclude,
            }
          : undefined
      }
      setFilter={params => {
        props.setFilter({
          selection: mapSelection(
            params.selection,
            i => i.toLowerCase() === 'true',
          ),
          exclude: params.exclude,
          description: params.description,
        });
      }}
    />
  );
}

const BooleanCell = React.forwardRef<_, HTMLDivElement>((props, ref) => {
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
    buildFilter: function(params) {
      return function(data) {
        const included = params.selection.has(data);
        return params.exclude ? !included : included;
      };
    },
    filterable: options.filterable === undefined ? true : options.filterable,
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: BooleanCell,
    renderFilter: BooleanFilter,
    sortable: options.sortable === undefined ? true : options.sortable,
    sortFn: function(a, b) {
      if (a === b) return 0;
      return a ? -1 : 1;
    },
    title: options.title,
  };
}

export default BooleanColumn;
