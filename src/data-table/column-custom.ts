/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import Column from './column';
import { COLUMNS } from './constants';
import type { ColumnT, RenderCellT, RenderFilterT, SharedColumnOptionsT } from './types';

// I could not re-use the ColumnT type to build this.. tried to spread the ColumnT
// and define renderFilter, etc. to optional, but required status was maintained.
type OptionsT<ValueT, FilterParamsT> = {
  renderCell: RenderCellT<ValueT>;
  renderFilter?: RenderFilterT<ValueT, FilterParamsT>;
  buildFilter?: (a: FilterParamsT) => (a: ValueT) => boolean;
  textQueryFilter?: (b: string, a: ValueT) => boolean;
  sortFn?: (b: ValueT, a: ValueT) => number;
} & SharedColumnOptionsT<ValueT>;

function CustomColumn<ValueT, FilterParamsT>(
  options: OptionsT<ValueT, FilterParamsT>
): ColumnT<ValueT, FilterParamsT> {
  // @ts-expect-error todo(flow->ts) types does not much
  return Column({ kind: COLUMNS.CUSTOM, ...options });
}

export default CustomColumn;
