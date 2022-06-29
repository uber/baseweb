/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import Column from './column';
import { COLUMNS } from './constants';
import type { ColumnOptions, RenderCell, RenderFilter, SharedColumnOptions } from './types';

// I could not re-use the ColumnT type to build this.. tried to spread the ColumnT
// and define renderFilter, etc. to optional, but required status was maintained.
type Options<ValueT, FilterParamsT> = {
  renderCell: RenderCell<Value>;
  renderFilter?: RenderFilter<Value, FilterParamsT>;
  buildFilter?: (a: FilterParamsT) => (a: Value) => boolean;
  textQueryFilter?: (b: string, a: Value) => boolean;
  sortFn?: (b: Value, a: Value) => number;
} & SharedColumnOptions<Value>;

function CustomColumn<ValueT, FilterParamsT>(
  options: Options<Value, FilterParamsT>
): ColumnOptions<Value, FilterParamsT> {
  // @ts-expect-error todo(flow->ts) types does not much
  return Column({ kind: COLUMNS.CUSTOM, ...options });
}

export default CustomColumn;
