/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

export {default as SortableHeadCell} from './sortable-head-cell.js';
export {default as Table} from './table.js';
export {default as Filter} from './filter.js';
// Styled elements

import {StyledTable as Table} from './styled-components.js';

//$FlowFixMe
export const StyledTable = props => (
  <Table data-baseweb="table-custom" {...props} />
);

export {
  StyledFilterButton,
  StyledFilterContent,
  StyledFilterHeading,
  StyledFilterFooter,
  StyledHead,
  StyledHeadCell,
  StyledBody,
  StyledRow,
  StyledCell,
  StyledAction,
} from './styled-components.js';
// Flow
export * from './types.js';
