/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {styled} from '../styles/index.js';

export const StyledRoot = styled<{}>('nav', ({$theme}) => {
  return {
    color: $theme.colors.breadcrumbsText,
    ...$theme.typography.font350,
  };
});

export const StyledList = styled<{}>('ol', ({$theme}) => {
  return {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    ...$theme.typography.font350,
  };
});

export const StyledListItem = styled<{}>('li', ({$theme}) => {
  return {
    display: 'inline-block',
    ...$theme.typography.font350,
  };
});

export const StyledSeparator = styled<{}>('div', ({$theme}) => {
  return {
    display: 'inline-block',
    color: $theme.colors.breadcrumbsSeparatorFill,
    marginLeft: $theme.sizing.scale300,
    marginRight: $theme.sizing.scale300,
  };
});
