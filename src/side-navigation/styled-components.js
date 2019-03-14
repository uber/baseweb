/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';

export const StyledRoot = styled('ul', props => {
  const {
    $theme: {colors, typography},
  } = props;
  return {
    ...typography.font400,
    color: colors.foreground,
    backgrounColor: 'blue',
    listStyleType: 'none',
    marginTop: '0',
    marginBottom: '0',
    marginLeft: '0',
    marginRight: '0',
    paddingTop: '0',
    paddingBottom: '0',
    paddingLeft: '0',
    paddingRight: '0',
  };
});

export const StyledItemContainer = styled('li', {});

export const StyledSubNavContainer = styled('ul', {
  listStyleType: 'none',
  marginTop: '0',
  marginBottom: '0',
  marginLeft: '0',
  marginRight: '0',
  paddingTop: '0',
  paddingBottom: '0',
  paddingLeft: '0',
  paddingRight: '0',
});

export const StyledLink = styled('a', {
  color: 'inherit',
  display: 'block',
  textDecoration: 'none',
});

export const StyledItem = styled('div', props => {
  const {
    $active,
    $selectable,
    $level,
    $theme: {colors, sizing},
  } = props;
  return {
    background: $active
      ? `linear-gradient(0deg, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0.92)), ${
          colors.primary
        }`
      : 'transparent',
    boxSizing: 'border-box',
    borderLeftWidth: '4px',
    borderLeftStyle: 'solid',
    borderLeftColor: $active ? colors.primary : 'transparent',
    color: $active ? colors.primary : null,
    paddingTop: sizing.scale500,
    paddingBottom: sizing.scale500,
    paddingLeft: `calc(${sizing.scale800} * ${$level})`,
    paddingRight: sizing.scale800,
    ':hover': {
      color: $selectable ? colors.primary : null,
    },
  };
});
