/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import CellShell from './cell-shell.js';
import {COLUMNS} from './constants.js';
import type {ColumnT} from './types.js';

// I could not re-use the ColumnT type to build this.. tried to spread the ColumnT
// and define renderFilter, etc. to optional, but required status was maintained.
type OptionsT<ValueT, FilterParamsT> = {|
  filterable?: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  mapDataToValue: (data: any) => ValueT,
  maxWidth?: number,
  minWidth?: number,
  renderCell: React.ComponentType<{value: ValueT, isMeasured?: boolean}>,
  renderFilter?: React.ComponentType<{|
    close: () => void,
    data: ValueT[],
    filterParams?: FilterParamsT,
    setFilter: FilterParamsT => void,
  |}>,
  buildFilter?: FilterParamsT => ValueT => boolean,
  sortable?: boolean,
  sortFn?: (ValueT, ValueT) => number,
  title: string,
|};

function CustomColumn<ValueT, FilterParamsT>(
  options: OptionsT<ValueT, FilterParamsT>,
): ColumnT<ValueT, FilterParamsT> {
  return {
    kind: COLUMNS.CUSTOM,
    buildFilter: options.buildFilter || (() => () => true),
    filterable:
      Boolean(options.filterable) &&
      Boolean(options.renderFilter) &&
      Boolean(options.buildFilter),
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    renderCell: React.forwardRef((props, ref) => {
      const ProvidedCell = options.renderCell;
      return (
        <CellShell
          ref={ref}
          isMeasured={props.isMeasured}
          isSelected={props.isSelected}
          onSelect={props.onSelect}
        >
          <ProvidedCell value={props.value} />
        </CellShell>
      );
    }),
    renderFilter: options.renderFilter || (() => null),
    sortable: Boolean(options.sortable) && Boolean(options.sortFn),
    sortFn: options.sortFn || (() => 0),
    title: options.title,
  };
}

export default CustomColumn;
