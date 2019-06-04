/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {styled} from '../styles/index.js';

export const StyledRoot = styled<{}>('nav', ({$theme}) => {
  return {
    color: $theme.colors.breadcrumbsText,
    ...$theme.typography.font450,
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
