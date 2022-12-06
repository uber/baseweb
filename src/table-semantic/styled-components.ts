/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import Blank from '../icon/blank';
import ChevronDown from '../icon/chevron-down';
import ChevronUp from '../icon/chevron-up';
import { styled, withStyle, expandBorderStyles } from '../styles';
import { SIZE, DIVIDER } from './constants';
import type { Size, Divider } from './types';

// @ts-ignore
function sizeToCellPadding($theme, $size) {
  if ($size === SIZE.compact) {
    return $theme.sizing.scale500;
  } else if ($size === SIZE.spacious) {
    return $theme.sizing.scale800;
  }
  return $theme.sizing.scale600;
}

type StyledRootProps = {
  $divider?: Divider;
};

export const StyledRoot = styled<'div', StyledRootProps>('div', ({ $theme, $divider }) => {
  const borderStyles: {} =
    $divider === DIVIDER.grid || $divider === DIVIDER.vertical
      ? expandBorderStyles($theme.borders.border300)
      : {};
  return {
    ...borderStyles,
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
});

StyledRoot.displayName = 'StyledRoot';

type StyledTableProps = {
  $width?: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-ignore
export const StyledTable = styled<'table', StyledTableProps>('table', ({ $theme, $width }) => {
  return {
    borderSpacing: '0',
    boxSizing: 'border-box',
    minWidth: '100%',
    width: $width || null,
  };
});

StyledTable.displayName = 'StyledTable';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledTableHead = styled('thead', ({ $theme }) => {
  return {};
});

StyledTableHead.displayName = 'StyledTableHead';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledTableHeadRow = styled('tr', ({ $theme }) => {
  return {};
});

StyledTableHeadRow.displayName = 'StyledTableHeadRow';

type StyledTableHeadCellProps = {
  $col?: {};
  $colIndex?: number | null;
  $divider?: Divider;
  $isNumeric?: boolean | null;
  $size?: Size;
};

export const StyledTableHeadCell = styled<'th', StyledTableHeadCellProps>(
  'th',
  ({ $theme, $size, $divider, $isNumeric }) => {
    const borderDir: string = $theme.direction === 'rtl' ? 'Left' : 'Right';
    const borderVertical = $divider === DIVIDER.grid || $divider === DIVIDER.vertical;
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
      textAlign: $theme.direction === 'rtl' || $isNumeric ? 'right' : 'left',
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
        [`border${borderDir}Color`]: borderVertical ? $theme.borders.border300.borderColor : null,
        [`border${borderDir}Style`]: borderVertical ? $theme.borders.border300.borderStyle : null,
        [`border${borderDir}Width`]: borderVertical ? $theme.borders.border300.borderWidth : null,
      },
    };
  }
);

StyledTableHeadCell.displayName = 'StyledTableHeadCell';

type StyledTableHeadCellSortableProps = {
  $isFocusVisible: boolean;
} & StyledTableHeadCellProps;

export const StyledTableHeadCellSortable = withStyle<
  typeof StyledTableHeadCell,
  StyledTableHeadCellSortableProps
>(StyledTableHeadCell, ({ $theme, $isFocusVisible }) => {
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

StyledTableHeadCellSortable.displayName = 'StyledTableHeadCellSortable';

export const StyledSortIconContainer = styled('span', ({ $theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    right: $theme.sizing.scale500,
    transform: 'translateY(-50%)',
  };
});

StyledSortIconContainer.displayName = 'StyledSortIconContainer';

// No longer used, but will maintain for some time to support existing usage
export const StyledSortAscIcon = styled<typeof ChevronUp, {}>(ChevronUp, ({ $theme }) => {
  return {
    position: 'absolute',
    top: '50%',
    right: $theme.sizing.scale500,
    transform: 'translateY(-50%)',
  };
});

StyledSortAscIcon.displayName = 'StyledSortAscIcon';

export const StyledSortDescIcon = styled<typeof ChevronDown, {}>(ChevronDown, ({ $theme }) => {
  return {
    position: 'absolute',
    top: '50%',
    right: $theme.sizing.scale500,
    transform: 'translateY(-50%)',
  };
});

StyledSortDescIcon.displayName = 'StyledSortDescIcon';

export const StyledSortNoneIcon = styled<typeof Blank, {}>(Blank, ({ $theme }) => {
  return {
    position: 'absolute',
    top: '50%',
    right: $theme.sizing.scale500,
    transform: 'translateY(-50%)',
  };
});

StyledSortNoneIcon.displayName = 'StyledSortNoneIcon';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const StyledTableBody = styled('tbody', ({ $theme }) => {
  return {};
});

StyledTableBody.displayName = 'StyledTableBody';

type StyledTableBodyRowProps = {
  $col?: {};
  $colIndex?: number | null;
  $divider?: Divider;
};

export const StyledTableBodyRow = styled<'tr', StyledTableBodyRowProps>('tr', ({ $theme }) => {
  return {
    ':hover': {
      backgroundColor: $theme.colors.tableStripedBackground,
    },
  };
});

StyledTableBodyRow.displayName = 'StyledTableBodyRow';

type StyledTableBodyCellProps = {
  $col?: {};
  $colIndex?: number | null;
  $divider?: Divider;
  $row?: {};
  $rowIndex?: number | null;
  $size?: Size;
  $isNumeric?: boolean | null;
  $isLastRow?: boolean | null;
  $isSortable?: boolean | null;
};

export const StyledTableBodyCell = styled<'td', StyledTableBodyCellProps>(
  'td',
  // @ts-ignore
  ({ $theme, $size, $divider, $isNumeric, $isLastRow, $isSortable }) => {
    const borderDir: string = $theme.direction === 'rtl' ? 'Left' : 'Right';
    const borderVertical = $divider === DIVIDER.vertical || $divider === DIVIDER.grid;
    const borderHorizontal =
      $divider === undefined || $divider === DIVIDER.horizontal || $divider === DIVIDER.grid;
    const padding = sizeToCellPadding($theme, $size);

    return {
      ...$theme.typography.font200,
      paddingTop: padding,
      paddingRight: !$isSortable ? padding : $theme.sizing.scale1000,
      paddingBottom: padding,
      paddingLeft: padding,
      color: $theme.colors.contentPrimary,
      textAlign: $isNumeric ? 'right' : null,
      verticalAlign: 'top',
      borderBottomColor:
        !$isLastRow && borderHorizontal ? $theme.borders.border300.borderColor : null,
      borderBottomStyle:
        !$isLastRow && borderHorizontal ? $theme.borders.border300.borderStyle : null,
      borderBottomWidth:
        !$isLastRow && borderHorizontal ? $theme.borders.border300.borderWidth : null,
      ':not(:last-child)': {
        [`border${borderDir}Color`]: borderVertical ? $theme.borders.border300.borderColor : null,
        [`border${borderDir}Style`]: borderVertical ? $theme.borders.border300.borderStyle : null,
        [`border${borderDir}Width`]: borderVertical ? $theme.borders.border300.borderWidth : null,
      },
    };
  }
);

StyledTableBodyCell.displayName = 'StyledTableBodyCell';

export const StyledTableLoadingMessage = styled<'div', {}>('div', ({ $theme }) => {
  return {
    ...$theme.typography.ParagraphSmall,
    color: $theme.colors.contentPrimary,
    padding: $theme.sizing.scale600,
  };
});

StyledTableLoadingMessage.displayName = 'StyledTableLoadingMessage';

export const StyledTableEmptyMessage = StyledTableLoadingMessage;
