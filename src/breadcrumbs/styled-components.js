/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {styled} from '../styles/index.js';
import type {StyledRootPropsT, StyledSeparatorT} from './types.js';
import {ChevronRight} from '../icon/index.js';

export const StyledRoot = styled('nav', ({$theme}: StyledRootPropsT) => {
  return {
    color: $theme.colors.breadcrumbsText,
    ...$theme.typography.font450,
  };
});

export const StyledSeparator = styled('div', ({$theme}: StyledSeparatorT) => {
  return {
    display: 'inline-block',
    color: $theme.colors.breadcrumbsSeparatorFill,
    marginLeft: $theme.sizing.scale300,
    marginRight: $theme.sizing.scale300,
  };
});

export const StyledIcon = styled(ChevronRight, () => {
  return {
    verticalAlign: 'text-bottom',
  };
});
