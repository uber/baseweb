/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import CellShell from './cell-shell.js';
import {COLUMNS} from './constants.js';
import {HighlightCellText} from './text-search.js';
import type {ColumnT} from './types.js';

type OptionsT = {|
  title: string,
  sortable?: boolean,
  minWidth?: number,
|};

type FilterParametersT = {|
  exclude: boolean,
|};

type StringColumnT = ColumnT<string, FilterParametersT>;

function StringFilter(props) {
  return <div>not implemented for string column</div>;
}

const StringCell = React.forwardRef<_, HTMLDivElement>((props, ref) => {
  return (
    <CellShell
      ref={ref}
      isMeasured={props.isMeasured}
      isSelected={props.isSelected}
      onSelect={props.onSelect}
    >
      {props.textQuery ? (
        <HighlightCellText text={props.value} query={props.textQuery} />
      ) : (
        props.value
      )}
    </CellShell>
  );
});
StringCell.displayName = 'StringCell';

function StringColumn(options: OptionsT): StringColumnT {
  return {
    kind: COLUMNS.STRING,
    title: options.title,
    sortable: options.sortable === undefined ? true : options.sortable,
    filterable: false,
    renderCell: StringCell,
    renderFilter: StringFilter,
    buildFilter: function(params) {
      return function(data) {
        return true;
      };
    },
    sortFn: function(a, b) {
      return a.localeCompare(b);
    },
    minWidth: options.minWidth,
  };
}

export default StringColumn;
