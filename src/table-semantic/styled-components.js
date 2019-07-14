/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';

export const StyledTableContainer = styled<{}>('div', ({$theme}) => ({
  position: 'relative',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  border: `1px solid ${$theme.colors.border}`,
}));

export const StyledTable = styled<{}>('table', ({$theme}) => ({
  position: 'relative',
  zIndex: 0,
  backgroundColor: $theme.colors.background,
  borderCollapse: 'collapse',
  borderStyle: 'hidden',
  boxSizing: 'border-box',
  minWidth: '100%',
}));

export const StyledTableHead = styled<{}>('thead', () => ({}));

export const StyledTableHeadRow = styled<{}>('tr', () => ({}));

type StyledTableHeadCellProps = {
  $isFrozen?: boolean,
  $isSortable?: ?boolean,
};

export const StyledTableHeadCell = styled<StyledTableHeadCellProps>(
  'th',
  ({$theme, $isSortable}) => {
    const {colors, sizing, typography} = $theme;
    let sortableStyles = {};

    if ($isSortable) {
      sortableStyles = {
        cursor: 'pointer',
        outline: 'none',

        ':focus': {
          backgroundColor: $theme.colors.mono200,
        },

        ':hover': {
          backgroundColor: $theme.colors.mono200,
        },
      };
    }

    return {
      ...typography.font350,

      position: $isFrozen ? 'sticky' : 'relative',
      top: '0',
      zIndex: 1,
      paddingTop: sizing.scale500,
      paddingRight: sizing.scale600,
      paddingBottom: sizing.scale500,
      paddingLeft: sizing.scale600,
      backgroundColor: colors.background,
      cursor: 'normal',
      textAlign: 'left',
      userSelect: 'none',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',

      '::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        right: '100%',
        bottom: '0',
        borderLeft: `1px solid ${colors.border}`,
      },

      '::after': {
        content: '""',
        position: 'absolute',
        top: '100%',
        right: '0',
        left: '0',
        height: sizing.scale100,
        pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0)
          )
        `,
      },

      ...sortableStyles,
    };
  },
);

export const StyledTableHeadCellIcon = styled<{}>('span', () => ({
  verticalAlign: 'middle',
}));

export const StyledTableBody = styled<{}>('tbody', () => ({}));

export const StyledTableBodyRow = styled<{}>('tr', ({$theme}) => ({
  ':hover': {
    backgroundColor: $theme.colors.mono200,
  },
}));

type StyledTableBodyCellProps = {
  $isLiteral?: boolean,
  $isNumeric?: boolean,
};

export const StyledTableBodyCell = styled<StyledTableBodyCellProps>(
  'td',
  ({$theme, $isLiteral, $isNumeric}) => ({
    ...$theme.typography.font300,
    paddingTop: $theme.sizing.scale500,
    paddingRight: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale500,
    paddingLeft: $theme.sizing.scale600,
    textAlign: $isNumeric ? 'right' : 'left',
    verticalAlign: 'top',
    whiteSpace: $isLiteral || $isNumeric ? 'nowrap' : 'normal',
  }),
);
