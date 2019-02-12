/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
import type {SharedStylePropsT} from './types.js';

export const StyledTable = styled('div', ({$theme}: SharedStylePropsT) => {
  return {
    ...$theme.borders.border300,
    borderRadius: $theme.borders.radius200,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowX: 'scroll',
  };
});

type HorizontalStyleProps = {
  ...SharedStylePropsT,
  $width?: string,
};

export const StyledHead = styled(
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

export const StyledHeadCell = styled('div', ({$theme}: SharedStylePropsT) => {
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

export const StyledBody = styled('div', ({$width}: HorizontalStyleProps) => {
  return {
    width: $width ? $width : '100%',
    overflowY: 'scroll',
    flex: 1,
  };
});

export const StyledRow = styled('div', ({$theme}) => ({
  display: 'flex',
  alignItems: 'center',
}));

export const StyledCell = styled('div', ({$theme}: SharedStylePropsT) => {
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

export const StyledFilterButton = styled('button', {
  border: 'none',
  padding: 'none',
});

export const StyledFilterContent = styled('div', ({$theme}) => ({
  maxHeight: '196px',
  paddingRight: $theme.sizing.scale600,
  paddingLeft: $theme.sizing.scale600,
  overflow: 'auto',
}));

export const StyledFilterHeading = styled('div', ({$theme}) => ({
  ...$theme.typography.font350,
  paddingTop: $theme.sizing.scale800,
  paddingRight: $theme.sizing.scale600,
  paddingBottom: $theme.sizing.scale300,
  paddingLeft: $theme.sizing.scale600,
}));

export const StyledFilterFooter = styled('div', ({$theme}) => ({
  ...$theme.borders.border300,
  borderRight: 'none',
  borderBottom: 'none',
  borderLeft: 'none',
  paddingTop: $theme.sizing.scale300,
  paddingRight: $theme.sizing.scale100,
  paddingBottom: $theme.sizing.scale300,
  paddingLeft: $theme.sizing.scale100,
  display: 'flex',
  justifyContent: 'space-between',
  width: '216px',
}));
