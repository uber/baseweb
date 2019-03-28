/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';

import {styled} from '../styles/index.js';
import type {SharedStylePropsT} from './types.js';

const StyledTableElement = styled('div', ({$theme}: SharedStylePropsT) => {
  return {
    ...$theme.borders.border300,
    borderRadius: $theme.borders.radius200,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowX: 'scroll',
  };
});

export const StyledTable = (props: *) => (
  <StyledTableElement role="grid" {...props} />
);
StyledTable.__STYLETRON__ = StyledTableElement.__STYLETRON__;

type HorizontalStyleProps = {
  ...SharedStylePropsT,
  $width?: string,
};

const StyledHeadElement = styled(
  'div',
  ({$theme, $width}: HorizontalStyleProps) => {
    return {
      backgroundColor: $theme.colors.tableHeadBackgroundColor,
      boxShadow: $theme.lighting.shadow400,
      display: 'flex',
      flexGrow: 0,
      width: $width ? $width : '100%',
      zIndex: 1,
    };
  },
);

export const StyledHead = (props: *) => (
  <StyledHeadElement role="row" {...props} />
);
StyledHead.__STYLETRON__ = StyledHeadElement.__STYLETRON__;

const StyledHeadCellElement = styled('div', ({$theme}: SharedStylePropsT) => {
  return {
    ...$theme.typography.font350,
    ...$theme.borders.border300,
    borderTop: 'none',
    borderBottom: 'none',
    borderLeft: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: $theme.sizing.scale500,
    paddingRight: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale500,
    paddingLeft: $theme.sizing.scale600,
    width: '100%',
    ':last-of-type': {
      borderRight: 'none',
    },
  };
});

export const StyledHeadCell = (props: *) => (
  <StyledHeadCellElement role="columnheader" {...props} />
);
StyledHeadCell.__STYLETRON__ = StyledHeadCellElement.__STYLETRON__;

export const StyledSortableLabel = styled('button', ({$theme}) => {
  return {
    ...$theme.typography.font350,
    alignItems: 'center',
    border: 'none',
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

const StyledBodyElement = styled('div', ({$width}: HorizontalStyleProps) => {
  return {
    width: $width ? $width : '100%',
    overflowX: 'hidden',
    overflowY: 'overlay',
    flex: 1,
  };
});

export const StyledBody = (props: *) => (
  <StyledBodyElement role="rowgroup" {...props} />
);
StyledBody.__STYLETRON__ = StyledBodyElement.__STYLETRON__;

const StyledRowElement = styled('div', ({$theme}) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const StyledRow = (props: *) => (
  <StyledRowElement role="row" {...props} />
);
StyledRow.__STYLETRON__ = StyledRowElement.__STYLETRON__;

const StyledCellElement = styled('div', ({$theme}: SharedStylePropsT) => {
  return {
    ...$theme.typography.font300,
    display: 'flex',
    flex: 1,
    paddingTop: $theme.sizing.scale300,
    paddingRight: $theme.sizing.scale600,
    paddingBottom: $theme.sizing.scale300,
    paddingLeft: $theme.sizing.scale600,
  };
});

export const StyledCell = (props: *) => (
  <StyledCellElement role="gridcell" {...props} />
);
StyledCell.__STYLETRON__ = StyledCellElement.__STYLETRON__;

export const StyledFilterButton = styled('button', {
  border: 'none',
  padding: 'none',
});

export const StyledFilterContent = styled('div', ({$theme}) => ({
  ...$theme.borders.border300,
  borderRight: 'none',
  borderLeft: 'none',
  maxHeight: '196px',
  paddingRight: $theme.sizing.scale600,
  paddingLeft: $theme.sizing.scale600,
  overflow: 'auto',
}));

export const StyledFilterHeading = styled('div', ({$theme}) => ({
  ...$theme.typography.font350,
  color: $theme.colors.mono700,
  paddingTop: $theme.sizing.scale500,
  paddingRight: $theme.sizing.scale600,
  paddingBottom: $theme.sizing.scale500,
  paddingLeft: $theme.sizing.scale600,
}));

export const StyledFilterFooter = styled('div', ({$theme}) => ({
  backgroundColor: $theme.colors.mono200,
  paddingTop: $theme.sizing.scale300,
  paddingRight: $theme.sizing.scale100,
  paddingBottom: $theme.sizing.scale300,
  paddingLeft: $theme.sizing.scale100,
  display: 'flex',
  justifyContent: 'space-between',
  width: '216px',
}));

export const StyledAction = styled('button', ({$theme}) => {
  return {
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
