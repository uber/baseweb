/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import {styled} from '../styles/index.js';
import type {StyletronComponent} from '../styles/styled.js';

const StyledTableElement = styled<{}>('div', ({$theme}) => {
  return {
    ...$theme.borders.border300,
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

// eslint-disable-next-line flowtype/no-weak-types
export const StyledTable = ((React.forwardRef<{}, any>((props, ref) => {
  return (
    <StyledTableElement
      ref={ref}
      data-baseweb="table-custom"
      role="grid"
      {...props}
    />
  );
  // eslint-disable-next-line flowtype/no-weak-types
}): any): StyletronComponent<{}>);
StyledTable.__STYLETRON__ = StyledTableElement.__STYLETRON__;
StyledTable.displayName = 'StyledTable';

type HorizontalStyleProps = {
  $width?: string,
  $cursor?: string,
};

const StyledHeadElement = styled<HorizontalStyleProps>(
  'div',
  ({$theme, $width}) => {
    return {
      backgroundColor: $theme.colors.tableHeadBackgroundColor,
      boxShadow: $theme.lighting.shadow400,
      display: 'flex',
      flexGrow: 0,
      width: $width ? $width : '100%',
    };
  },
);

// eslint-disable-next-line flowtype/no-weak-types
export const StyledHead = ((React.forwardRef<HorizontalStyleProps, any>(
  (props, ref) => <StyledHeadElement ref={ref} role="row" {...props} />,
  // eslint-disable-next-line flowtype/no-weak-types
): any): StyletronComponent<HorizontalStyleProps>);
StyledHead.__STYLETRON__ = StyledHeadElement.__STYLETRON__;
StyledHead.displayName = 'StyledHead';

const StyledHeadCellElement = styled<HorizontalStyleProps>(
  'div',
  ({$theme, $cursor}) => {
    return {
      ...$theme.typography.font350,
      ...$theme.borders.border300,
      borderTop: 'none',
      borderBottom: 'none',
      borderLeft: 'none',
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
        [$theme.direction === 'rtl' ? 'borderLeft' : 'borderRight']: 'none',
      },
    };
  },
);

// eslint-disable-next-line flowtype/no-weak-types
export const StyledHeadCell = ((React.forwardRef<{}, any>((props, ref) => (
  <StyledHeadCellElement ref={ref} role="columnheader" {...props} />
  // eslint-disable-next-line flowtype/no-weak-types
)): any): StyletronComponent<{}>);
StyledHeadCell.__STYLETRON__ = StyledHeadCellElement.__STYLETRON__;
StyledHeadCell.displayName = 'StyledHeadCell';

export const StyledSortableLabel = styled<{}>('button', ({$theme}) => {
  return {
    ...$theme.typography.font250,
    alignItems: 'center',
    backgroundColor: 'transparent',
    border: 'none',
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

const StyledBodyElement = styled<HorizontalStyleProps>('div', ({$width}) => {
  return ({
    width: $width ? $width : '100%',
    overflowX: 'hidden',
    overflowY: 'overlay',
    flex: 1,
  }: {});
});

// eslint-disable-next-line flowtype/no-weak-types
export const StyledBody = ((React.forwardRef<HorizontalStyleProps, any>(
  (props, ref) => <StyledBodyElement ref={ref} role="rowgroup" {...props} />,
  // eslint-disable-next-line flowtype/no-weak-types
): any): StyletronComponent<HorizontalStyleProps>);
StyledBody.__STYLETRON__ = StyledBodyElement.__STYLETRON__;
StyledBody.displayName = 'StyledBody';

const StyledRowElement = styled('div', {
  display: 'flex',
  alignItems: 'center',
});

// eslint-disable-next-line flowtype/no-weak-types
export const StyledRow = ((React.forwardRef<{}, any>((props, ref) => (
  <StyledRowElement ref={ref} role="row" {...props} />
  // eslint-disable-next-line flowtype/no-weak-types
)): any): StyletronComponent<{}>);
StyledRow.__STYLETRON__ = StyledRowElement.__STYLETRON__;
StyledRow.displayName = 'StyledRow';

type CellStyledProps = {$striped?: boolean};

const StyledCellElement = styled<CellStyledProps>(
  'div',
  ({$theme, $striped}) => {
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
  },
);

// eslint-disable-next-line flowtype/no-weak-types
export const StyledCell = ((React.forwardRef<CellStyledProps, any>(
  (props, ref) => <StyledCellElement ref={ref} role="gridcell" {...props} />,
  // eslint-disable-next-line flowtype/no-weak-types
): any): StyletronComponent<CellStyledProps>);
StyledCell.__STYLETRON__ = StyledCellElement.__STYLETRON__;
StyledCell.displayName = 'StyledCell';

export const StyledFilterButton = styled<{
  $disabled?: boolean,
  $active?: boolean,
}>('button', props => {
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
    border: 'none',
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

export const StyledFilterContent = styled<{}>('div', ({$theme}) => ({
  ...$theme.borders.border300,
  backgroundColor: $theme.colors.tableFilterBackground,
  borderRight: 'none',
  borderLeft: 'none',
  maxHeight: '196px',
  paddingRight: $theme.sizing.scale600,
  paddingLeft: $theme.sizing.scale600,
  overflow: 'auto',
}));

export const StyledFilterHeading = styled<{}>('div', ({$theme}) => ({
  ...$theme.typography.font250,
  color: $theme.colors.tableFilterHeading,
  paddingTop: $theme.sizing.scale500,
  paddingRight: $theme.sizing.scale600,
  paddingBottom: $theme.sizing.scale500,
  paddingLeft: $theme.sizing.scale600,
}));

export const StyledFilterFooter = styled<{}>('div', ({$theme}) => ({
  backgroundColor: $theme.colors.tableFilterFooterBackground,
  paddingTop: $theme.sizing.scale300,
  paddingRight: $theme.sizing.scale100,
  paddingBottom: $theme.sizing.scale300,
  paddingLeft: $theme.sizing.scale100,
  display: 'flex',
  justifyContent: 'space-between',
  minWidth: '216px',
}));

export const StyledAction = styled<{}>('button', ({$theme}) => {
  return {
    backgroundColor: 'transparent',
    border: 'none',
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
