/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {withStyle, withWrapper} from '../styles/index.js';
import {
  StyledTable as FlexStyledTable,
  StyledHeadCell as FlexStyledHeadCell,
  StyledCell as FlexStyledBodyCell,
  SORT_DIRECTION,
  SortableHeadCellFactory,
} from '../table/index.js';

const StyledTableElement = withStyle<
  typeof FlexStyledTable,
  {$gridTemplateColumns: string},
>(FlexStyledTable, props => {
  return {
    display: 'grid',
    gridTemplateColumns: props.$gridTemplateColumns,
    flexDirection: 'unset',
  };
});

export const StyledTable = withWrapper(
  StyledTableElement,
  StyledComponent =>
    function StyledTable(props) {
      return (
        <StyledComponent data-baseweb="table-grid" role="grid" {...props} />
      );
    },
);

export const StyledHeadCell = withStyle<
  typeof FlexStyledHeadCell,
  {$sticky?: boolean},
>(FlexStyledHeadCell, ({$sticky = true, $theme}) => {
  return {
    backgroundColor: $theme.colors.tableHeadBackgroundColor,
    boxShadow: $theme.lighting.shadow400,
    position: $sticky ? 'sticky' : null,
    top: $sticky ? 0 : null,
    width: 'unset',
  };
});

export const StyledBodyCell = withStyle<
  typeof FlexStyledBodyCell,
  {$gridColumn?: string, $gridRow?: string},
>(FlexStyledBodyCell, props => {
  return {
    display: 'block',
    flex: 'unset',
    gridColumn: props.$gridColumn || null,
    gridRow: props.$gridRow || null,
  };
});

export const SortableHeadCell = SortableHeadCellFactory(StyledHeadCell);

export {SORT_DIRECTION};
