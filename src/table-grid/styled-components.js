/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {withStyle, withWrapper} from '../styles/index.js';
import {
  StyledTable as FlexStyledTable,
  StyledHeadCell as FlexStyledHeadCell,
  StyledCell as FlexStyledBodyCell,
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
      return <StyledComponent data-baseweb="table-grid" {...props} />;
    },
);

export const StyledHeadCell = withStyle<
  typeof FlexStyledHeadCell,
  {$sticky?: boolean, $isFocusVisible?: boolean},
>(FlexStyledHeadCell, ({$sticky = true, $isFocusVisible, $theme}) => {
  return {
    backgroundColor: $theme.colors.tableHeadBackgroundColor,
    boxShadow: $theme.lighting.shadow400,
    position: $sticky ? 'sticky' : null,
    top: $sticky ? 0 : null,
    width: 'unset',
    ':focus': {
      outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : 'none',
      outlineOffset: '-3px',
    },
  };
});

export const StyledBodyCell = withStyle<
  typeof FlexStyledBodyCell,
  {$gridColumn?: string, $gridRow?: string, $isFocusVisible?: boolean},
>(FlexStyledBodyCell, props => {
  return {
    display: 'block',
    flex: 'unset',
    gridColumn: props.$gridColumn || null,
    gridRow: props.$gridRow || null,
    ':focus': {
      outline: props.$isFocusVisible
        ? `3px solid ${props.$theme.colors.accent}`
        : 'none',
      outlineOffset: '-3px',
    },
  };
});
