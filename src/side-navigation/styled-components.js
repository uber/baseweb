/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {styled, hexToRgb} from '../styles/index.js';
import type {Item, SharedPropsT} from './types.js';
import type {StyletronComponent} from '../styles/styled.js';

export const StyledRoot = styled<SharedPropsT>('nav', props => {
  const {
    $theme: {colors, typography},
  } = props;
  return {
    ...typography.font300,
    color: colors.contentPrimary,
    listStyleType: 'none',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  };
});

export const StyledNavItemContainer = styled('li', {});

export const StyledNavLink = styled('a', {
  color: 'inherit',
  textDecoration: 'none',
});

export const StyledNavItemElement = styled<SharedPropsT>('div', props => {
  const {
    $active,
    $selectable,
    $level,
    $theme,
    $theme: {colors, sizing},
  } = props;
  const bgImgGradient = hexToRgb(colors.backgroundPrimary, '0.92') || '';
  return ({
    backgroundColor: $active ? colors.backgroundInversePrimary : 'transparent',
    backgroundImage: $active
      ? `linear-gradient(0deg, ${bgImgGradient}, ${bgImgGradient})`
      : null,
    boxSizing: 'border-box',
    [$theme.direction === 'rtl'
      ? 'borderRightWidth'
      : 'borderLeftWidth']: '4px',
    [$theme.direction === 'rtl'
      ? 'borderRightStyle'
      : 'borderLeftStyle']: 'solid',
    [$theme.direction === 'rtl'
      ? 'borderRightColor'
      : 'borderLeftColor']: $active ? colors.primary : 'transparent',
    color: $active ? colors.primary : null,
    cursor: $selectable ? 'pointer' : 'default',
    // outline: 'none',
    paddingTop: sizing.scale500,
    paddingBottom: sizing.scale500,
    [$theme.direction === 'rtl'
      ? 'paddingRight'
      : 'paddingLeft']: `calc(${sizing.scale800} * ${$level})`,
    [$theme.direction === 'rtl'
      ? 'paddingLeft'
      : 'paddingRight']: sizing.scale500,
    ':hover': {
      color: $selectable ? colors.primary : null,
    },
    ':focus': {
      color: $selectable ? colors.primary : null,
    },
  }: {});
});

export const StyledNavItem = ((React.forwardRef<
  {item: Item, ...$Exact<SharedPropsT>},
  // eslint-disable-next-line flowtype/no-weak-types
  any,
>(
  ({item, ...restProps}, ref) => (
    <StyledNavItemElement ref={ref} {...restProps} />
  ),
  // eslint-disable-next-line flowtype/no-weak-types
): any): StyletronComponent<SharedPropsT>);
StyledNavItem.__STYLETRON__ = StyledNavItemElement.__STYLETRON__;
StyledNavItem.displayName = 'StyledNavItem';

export const StyledSubNavContainer = styled('ul', {
  listStyleType: 'none',
  marginTop: 0,
  marginBottom: 0,
  marginLeft: 0,
  marginRight: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
});
