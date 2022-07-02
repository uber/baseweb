/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { styled, withWrapper, expandBorderStyles } from '../styles';
import type { StyleObject } from 'styletron-react';

const StyledTableElement = styled('div', ({ $theme }) => {
  return {
    ...expandBorderStyles($theme.borders.border300),
    backgroundColor: $theme.colors.tableBackground,
    borderTopLeftRadius: $theme.borders.radius200,
    borderTopRightRadius: $theme.borders.radius200,
    borderBottomRightRadius: $theme.borders.radius200,
    borderBottomLeftRadius: $theme.borders.radius200,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowX: 'auto',
  };
});

export const StyledTable = withWrapper(
  StyledTableElement,
  (StyledComponent) =>
    function StyledTable(props) {
      return <StyledComponent data-baseweb="table-custom" role="grid" {...props} />;
    }
);

type HorizontalStyleProps = {
  $width?: string;
  $cursor?: string;
};

const StyledHeadElement = styled<'div', HorizontalStyleProps>('div', ({ $theme, $width }) => {
  return {
    backgroundColor: $theme.colors.tableHeadBackgroundColor,
    boxShadow: $theme.lighting.shadow400,
    display: 'flex',
    flexGrow: 0,
    width: $width ? $width : '100%',
  };
});

export const StyledHead = withWrapper(
  StyledHeadElement,
  (StyledComponent) =>
    function StyledHead(props) {
      return <StyledComponent role="row" {...props} />;
    }
);

const StyledHeadCellElement = styled<'div', HorizontalStyleProps>('div', ({ $theme, $cursor }) => {
  const borderDir: string = $theme.direction === 'rtl' ? 'borderLeft' : 'borderRight';
  return {
    ...$theme.typography.font350,
    ...expandBorderStyles($theme.borders.border300),
    borderTopStyle: 'none',
    borderBottomStyle: 'none',
    borderLeftStyle: 'none',
    color: $theme.colors.contentPrimary,
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: $theme.sizing.scale500,
    paddingRight: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale500,
    paddingLeft: $theme.sizing.scale600,
    cursor: $cursor ? $cursor : 'inherit',
    width: '100%',
    ':last-of-type': {
      [borderDir]: 'none',
    },
  };
});

export const StyledHeadCell = withWrapper(
  StyledHeadCellElement,
  (StyledComponent) =>
    function StyledHeadCell(props) {
      return <StyledComponent role="columnheader" {...props} />;
    }
);

export const StyledSortableLabel = styled('button', ({ $theme }) => {
  return {
    ...$theme.typography.font250,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderLeftStyle: 'none',
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderBottomStyle: 'none',
    color: $theme.colors.contentPrimary,
    display: 'flex',
    padding: 0,
    ':hover:enabled': {
      cursor: 'pointer',
    },
    ':disabled': {
      color: $theme.colors.mono500,
    },
  };
});

const StyledBodyElement = styled<'div', HorizontalStyleProps>('div', ({ $width }): StyleObject => {
  return {
    width: $width ? $width : '100%',
    overflowX: 'hidden',
    // @ts-expect-error todo(flow->ts) looks to be incorrect value
    overflowY: 'overlay',
    flex: 1,
  };
});

export const StyledBody = withWrapper(
  StyledBodyElement,
  (StyledComponent) =>
    function StyledBody(props) {
      return <StyledComponent role="rowgroup" {...props} />;
    }
);

const StyledRowElement = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

export const StyledRow = withWrapper(
  StyledRowElement,
  (StyledComponent) =>
    function StyledRow(props) {
      return <StyledComponent role="row" {...props} />;
    }
);

type CellStyledProps = {
  $striped?: boolean;
};

const StyledCellElement = styled<'div', CellStyledProps>('div', ({ $theme, $striped }) => {
  return {
    ...$theme.typography.font200,
    backgroundColor: $striped ? $theme.colors.tableStripedBackground : null,
    color: $theme.colors.contentPrimary,
    display: 'flex',
    flex: 1,
    paddingTop: $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale300,
    paddingLeft: $theme.sizing.scale600,
  };
});

export const StyledCell = withWrapper(
  StyledCellElement,
  (StyledComponent) =>
    function StyledCell(props) {
      return <StyledComponent role="gridcell" {...props} />;
    }
);

export const StyledFilterButton = styled<
  'button',
  {
    $disabled?: boolean;
    $active?: boolean;
  }
>('button', (props) => {
  function getIconColor() {
    if (props.$disabled) {
      return props.$theme.colors.mono500;
    }

    if (props.$active) {
      return props.$theme.colors.contentPrimary;
    }

    return props.$theme.colors.tableFilter;
  }

  function getIconHoverColor() {
    if (props.$disabled || props.$active) {
      return null;
    }

    return props.$theme.colors.contentPrimary;
  }

  return {
    backgroundColor: 'transparent',
    borderLeftStyle: 'none',
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderBottomStyle: 'none',
    color: getIconColor(),
    cursor: props.$disabled ? null : 'pointer',
    paddingTop: 'none',
    paddingRight: 'none',
    paddingBottom: 'none',
    paddingLeft: 'none',
    ':hover': {
      color: getIconHoverColor(),
    },
  };
});

export const StyledFilterContent = styled('div', ({ $theme }) => ({
  ...expandBorderStyles($theme.borders.border300),
  backgroundColor: $theme.colors.tableFilterBackground,
  borderRightStyle: 'none',
  borderLeftStyle: 'none',
  maxHeight: '196px',
  paddingRight: $theme.sizing.scale600,
  paddingLeft: $theme.sizing.scale600,
  overflow: 'auto',
}));

export const StyledFilterHeading = styled('div', ({ $theme }) => ({
  ...$theme.typography.font250,
  color: $theme.colors.tableFilterHeading,
  paddingTop: $theme.sizing.scale500,
  paddingRight: $theme.sizing.scale600,
  paddingBottom: $theme.sizing.scale500,
  paddingLeft: $theme.sizing.scale600,
}));

export const StyledFilterFooter = styled('div', ({ $theme }) => ({
  backgroundColor: $theme.colors.tableFilterFooterBackground,
  paddingTop: $theme.sizing.scale300,
  paddingRight: $theme.sizing.scale100,
  paddingBottom: $theme.sizing.scale300,
  paddingLeft: $theme.sizing.scale100,
  display: 'flex',
  justifyContent: 'space-between',
  minWidth: '216px',
}));

export const StyledAction = styled('button', ({ $theme }) => {
  return {
    backgroundColor: 'transparent',
    borderLeftStyle: 'none',
    borderTopStyle: 'none',
    borderRightStyle: 'none',
    borderBottomStyle: 'none',
    color: $theme.colors.primary,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginRight: $theme.sizing.scale100,
    marginLeft: $theme.sizing.scale100,
    ':hover:enabled': {
      cursor: 'pointer',
    },
  };
});
