/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import Blank from '../icon/blank.js';
import ChevronDown from '../icon/chevron-down.js';
import ChevronUp from '../icon/chevron-up.js';
import {styled, withStyle, expandBorderStyles} from '../styles/index.js';

export const StyledRoot = styled<{}>('div', ({$theme}) => {
  return {
    ...expandBorderStyles($theme.borders.border300),
    position: 'relative',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    backgroundColor: $theme.colors.tableBackground,
    borderTopLeftRadius: $theme.borders.radius200,
    borderTopRightRadius: $theme.borders.radius200,
    borderBottomRightRadius: $theme.borders.radius200,
    borderBottomLeftRadius: $theme.borders.radius200,
    // Creates a stacking context so we can use z-index on the StyledTableHeadCell
    // without affecting anything outside of this component.
    transform: 'scale(1)',
  };
});

type StyledTablePropsT = {
  $width?: ?string,
};

export const StyledTable = styled<StyledTablePropsT>(
  'table',
  ({$theme, $width}) => {
    return {
      borderCollapse: 'collapse',
      boxSizing: 'border-box',
      minWidth: '100%',
      width: $width || null,
    };
  },
);

export const StyledTableHead = styled<{}>('thead', ({$theme}) => {
  return {};
});

export const StyledTableHeadRow = styled<{}>('tr', ({$theme}) => {
  return {};
});

type StyledTableHeadCellPropsT = {
  $col?: {},
  $colIndex?: ?number,
};

export const StyledTableHeadCell = styled<StyledTableHeadCellPropsT>(
  'th',
  ({$theme}) => {
    const borderDir: string = $theme.direction === 'rtl' ? 'left' : 'right';
    return {
      ...$theme.typography.font350,
      position: 'sticky',
      top: 0,
      paddingTop: $theme.sizing.scale500,
      paddingRight: $theme.sizing.scale600,
      paddingBottom: $theme.sizing.scale500,
      paddingLeft: $theme.sizing.scale600,
      backgroundColor: $theme.colors.tableHeadBackgroundColor,
      color: $theme.colors.contentPrimary,
      textAlign: $theme.direction === 'rtl' ? 'right' : 'left',
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
      zIndex: 1,

      // We have to use pseudo elements to add the border for headers
      // because browsers don't properly handle borders on sticky cells.
      // The cells stay fixed in place, but the borders scroll.
      '::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        [borderDir]: '100%',
        bottom: '0',
        borderLeftColor: $theme.borders.border300.borderColor,
        borderLeftStyle: $theme.borders.border300.borderStyle,
        borderLeftWidth: $theme.borders.border300.borderWidth,
      },

      // We have to use pseudo elements to add the shadow to prevent
      // the shadows from casting on sibling cells.
      '::after': {
        content: '""',
        position: 'absolute',
        top: '100%',
        right: '0',
        left: '0',
        height: $theme.sizing.scale100,
        pointerEvents: 'none',
        backgroundImage: `
        linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.16),
          rgba(0, 0, 0, 0)
        )
      `,
      },
    };
  },
);

type StyledTableHeadCellSortablePropsT = {
  ...StyledTableHeadCellPropsT,
  $isFocusVisible: boolean,
};

export const StyledTableHeadCellSortable = withStyle<
  typeof StyledTableHeadCell,
  StyledTableHeadCellSortablePropsT,
>(StyledTableHeadCell, ({$theme, $isFocusVisible}) => {
  return {
    cursor: 'pointer',
    paddingRight: $theme.sizing.scale1000,
    outline: 'none',
    ':focus': {
      outline: $isFocusVisible ? `3px solid ${$theme.colors.accent}` : 'none',
      outlineOffset: '-3px',
    },
    ':hover': {
      backgroundColor: $theme.colors.tableStripedBackground,
    },
  };
});

export const StyledSortAscIcon = styled<typeof ChevronUp, {}>(
  ChevronUp,
  ({$theme}) => {
    return {
      position: 'absolute',
      top: '50%',
      right: $theme.sizing.scale500,
      transform: 'translateY(-50%)',
    };
  },
);

export const StyledSortDescIcon = styled<typeof ChevronDown, {}>(
  ChevronDown,
  ({$theme}) => {
    return {
      position: 'absolute',
      top: '50%',
      right: $theme.sizing.scale500,
      transform: 'translateY(-50%)',
    };
  },
);

export const StyledSortNoneIcon = styled<typeof Blank, {}>(
  Blank,
  ({$theme}) => {
    return {
      position: 'absolute',
      top: '50%',
      right: $theme.sizing.scale500,
      transform: 'translateY(-50%)',
    };
  },
);

export const StyledTableBody = styled<{}>('tbody', ({$theme}) => {
  return {};
});

type StyledTableBodyRowPropsT = {
  $col?: {},
  $colIndex?: ?number,
};

export const StyledTableBodyRow = styled<StyledTableBodyRowPropsT>(
  'tr',
  ({$theme}) => {
    return {
      ':hover': {
        backgroundColor: $theme.colors.tableStripedBackground,
      },
    };
  },
);

type StyledTableBodyCellPropsT = {
  $col?: {},
  $colIndex?: ?number,
  $row?: {},
  $rowIndex?: ?number,
  $isNumeric?: ?boolean,
};

export const StyledTableBodyCell = styled<StyledTableBodyCellPropsT>(
  'td',
  ({$theme, $isNumeric}) => {
    return {
      ...$theme.typography.font200,
      paddingTop: $theme.sizing.scale300,
      paddingRight: $theme.sizing.scale600,
      paddingBottom: $theme.sizing.scale300,
      paddingLeft: $theme.sizing.scale600,
      color: $theme.colors.contentPrimary,
      textAlign: $isNumeric ? 'right' : null,
      verticalAlign: 'top',
    };
  },
);

export const StyledTableLoadingMessage = styled<{}>('div', ({$theme}) => {
  return {
    ...$theme.typography.ParagraphSmall,
    color: $theme.colors.contentPrimary,
    padding: $theme.sizing.scale600,
  };
});

export const StyledTableEmptyMessage = StyledTableLoadingMessage;
