/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
export {default as Table} from './table.js';
export {default as Unstable_Table} from './table.js';
export {default as TableBuilder} from './table-builder.js';
export {default as Unstable_TableBuilder} from './table-builder.js';
export {default as TableBuilderColumn} from './table-builder-column.js';
export {
  default as Unstable_TableBuilderColumn,
} from './table-builder-column.js';
// Styled elements
export {
  StyledRoot,
  StyledTable,
  StyledTableHead,
  StyledTableHeadRow,
  StyledTableHeadCell,
  StyledTableHeadCellSortable,
  StyledTableBody,
  StyledTableBodyRow,
  StyledTableBodyCell,
  StyledSortAscIcon,
  StyledSortDescIcon,
  StyledSortNoneIcon,
} from './styled-components.js';
// Flow
export type * from './types.js';

if (__DEV__) {
  console.warn(
    'We have stabized the Semantic Table component, so you can drop the Unstable_ imports. We will remove the Unstable_ exports soon, so please make these changes as soon as possible!',
  );
}
