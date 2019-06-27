/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {withStyle} from '../styles/index.js';
import {
  StyledTable as FlexStyledTable,
  StyledHead as FlexStyledHead,
  StyledHeadCell as FlexStyledHeadCell,
  StyledBody as FlexStyledBody,
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

export const StyledHeadCell = withStyle<typeof FlexStyledHeadCell, {}>(
  FlexStyledHeadCell,
  props => {
    return {
      backgroundColor: props.$theme.colors.tableHeadBackgroundColor,
      clipPath: 'inset(0px 0px -8px 0px)',
      boxShadow: props.$theme.lighting.shadow400,
      position: 'sticky',
      top: 0,
      width: 'unset',
    };
  },
);

export const StyledBodyCell = withStyle<typeof FlexStyledBodyCell>(
  FlexStyledBodyCell,
  {
    display: 'block',
    flex: 'unset',
  },
);

export const StyledFooterCell = withStyle<typeof StyledBodyCell, {}>(
  StyledBodyCell,
  props => {
    return {
      backgroundColor: props.$theme.colors.tableHeadBackgroundColor,
      ...props.$theme.borders.border300,
      borderRight: 'none',
      borderBottom: 'none',
      borderLeft: 'none',
      bottom: 0,
      position: 'sticky',
    };
  },
);
