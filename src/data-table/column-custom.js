/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import Column from './column.js';
import {COLUMNS} from './constants.js';
import type {ColumnT, SharedColumnOptionsT} from './types.js';

// I could not re-use the ColumnT type to build this.. tried to spread the ColumnT
// and define renderFilter, etc. to optional, but required status was maintained.
type OptionsT<ValueT, FilterParamsT> = {|
  ...SharedColumnOptionsT<ValueT>,
  filterable?: boolean,
  renderCell: React.ComponentType<{value: ValueT, isMeasured?: boolean}>,
  renderFilter?: React.ComponentType<{|
    close: () => void,
    data: ValueT[],
    filterParams?: FilterParamsT,
    setFilter: FilterParamsT => void,
  |}>,
  buildFilter?: FilterParamsT => ValueT => boolean,
  textQueryFilter?: (string, ValueT) => boolean,
  sortFn?: (ValueT, ValueT) => number,
|};

function CustomColumn<ValueT, FilterParamsT>(
  options: OptionsT<ValueT, FilterParamsT>,
): ColumnT<ValueT, FilterParamsT> {
  return Column({kind: COLUMNS.CUSTOM, ...options});
}

export default CustomColumn;
