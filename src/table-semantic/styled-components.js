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
import {SIZE, DIVIDER} from './constants.js';
import type {SizeT, DividerT} from './types.js';

function sizeToCellPadding($theme, $size) {
  if ($size === SIZE.compact) {
    return $theme.sizing.scale500;
  } else if ($size === SIZE.spacious) {
    return $theme.sizing.scale800;
  }
  return $theme.sizing.scale600;
}

type StyledRootPropsT = {
  $divider?: DividerT,
};

export const StyledRoot = styled<StyledRootPropsT>(
  'div',
  ({$theme, $divider}) => {
    return {
      ...($divider === DIVIDER.grid || $divider === DIVIDER.vertical
        ? expandBorderStyles($theme.borders.border300)
        : {}),
      ...($divider === DIVIDER.horizontal
        ? {
            borderBottomWidth: $theme.borders.border300.borderWidth,
            borderBottomStyle: $theme.borders.border300.borderStyle,
            borderBottomColor: $theme.borders.border300.borderColor,
          }
        : {}),
      position: 'relative',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      backgroundColor: $theme.colors.tableBackground,
      // Creates a stacking context so we can use z-index on the StyledTableHeadCell
      // without affecting anything outside of this component.
      transform: 'scale(1)',
    };
  },
);

type StyledTablePropsT = {
  $width?: ?string,
};

export const StyledTable = styled<StyledTablePropsT>(
  'table',
  ({$theme, $width}) => {
    return {
      borderSpacing: '0',
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
  $divider?: DividerT,
  $size?: SizeT,
};

export const StyledTableHeadCell = styled<StyledTableHeadCellPropsT>(
  'th',
  ({$theme, $size, $divider}) => {
    const borderDir: string = $theme.direction === 'rtl' ? 'Left' : 'Right';
    const borderVertical =
      $divider === DIVIDER.grid || $divider === DIVIDER.vertical;
    const padding = sizeToCellPadding($theme, $size);

    return {
      ...$theme.typography.font350,
      position: 'sticky',
      top: 0,
      paddingTop: padding,
      paddingRight: padding,
      paddingBottom: padding,
      paddingLeft: padding,
      backgroundColor: $theme.colors.tableHeadBackgroundColor,
      color: $theme.colors.contentPrimary,
      textAlign: $theme.direction === 'rtl' ? 'right' : 'left',
      verticalAlign: 'top',
      whiteSpace: 'nowrap',
      zIndex: 1,

      ...($divider === DIVIDER.clean
        ? {}
        : {
            borderBottomColor: $theme.borders.border300.borderColor,
            borderBottomStyle: $theme.borders.border300.borderStyle,
            borderBottomWidth: $theme.borders.border300.borderWidth,
          }),
      ':not(:last-child)': {
        [`border${borderDir}Color`]: borderVertical
          ? $theme.borders.border300.borderColor
          : null,
        [`border${borderDir}Style`]: borderVertical
          ? $theme.borders.border300.borderStyle
          : null,
        [`border${borderDir}Width`]: borderVertical
          ? $theme.borders.border300.borderWidth
          : null,
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
  $divider?: DividerT,
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
  $divider?: DividerT,
  $row?: {},
  $rowIndex?: ?number,
  $size?: SizeT,
  $isNumeric?: ?boolean,
  $isLastRow: ?boolean,
};

export const StyledTableBodyCell = styled<StyledTableBodyCellPropsT>(
  'td',
  ({$theme, $size, $divider, $isNumeric, $isLastRow}) => {
    const borderDir: string = $theme.direction === 'rtl' ? 'Left' : 'Right';
    const borderVertical =
      $divider === DIVIDER.vertical || $divider === DIVIDER.grid;
    const borderHorizontal =
      $divider === undefined ||
      $divider === DIVIDER.horizontal ||
      $divider === DIVIDER.grid;
    const padding = sizeToCellPadding($theme, $size);

    return {
      ...$theme.typography.font200,
      paddingTop: padding,
      paddingRight: padding,
      paddingBottom: padding,
      paddingLeft: padding,
      color: $theme.colors.contentPrimary,
      textAlign: $isNumeric ? 'right' : null,
      verticalAlign: 'top',
      borderBottomColor:
        !$isLastRow && borderHorizontal
          ? $theme.borders.border300.borderColor
          : null,
      borderBottomStyle:
        !$isLastRow && borderHorizontal
          ? $theme.borders.border300.borderStyle
          : null,
      borderBottomWidth:
        !$isLastRow && borderHorizontal
          ? $theme.borders.border300.borderWidth
          : null,
      ':not(:last-child)': {
        [`border${borderDir}Color`]: borderVertical
          ? $theme.borders.border300.borderColor
          : null,
        [`border${borderDir}Style`]: borderVertical
          ? $theme.borders.border300.borderStyle
          : null,
        [`border${borderDir}Width`]: borderVertical
          ? $theme.borders.border300.borderWidth
          : null,
      },
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
