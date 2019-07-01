/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {withStyle} from '../styles/index.js';
import {
  StyledTable as FlexStyledTable,
  StyledHeadCell as FlexStyledHeadCell,
  StyledCell as FlexStyledBodyCell,
} from '../table/index.js';

export const StyledTable = withStyle<
  typeof FlexStyledTable,
  {$gridTemplateColumns: string},
>(FlexStyledTable, props => {
  return {
    display: 'grid',
    gridTemplateColumns: props.$gridTemplateColumns,
    flexDirection: 'unset',
  };
});

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
