/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';

export const Link = styled<{}>('a', ({$theme}) => {
  const {colors, typography, animation} = $theme;
  return {
    color: colors.linkText,
    ...typography.font450,
    fontSize: 'inherit',
    lineHeight: 'inherit',
    textDecoration: 'none',
    transitionProperty: 'color',
    transitionDuration: animation.timing100,
    transitionTimingFunction: animation.easeOutCurve,
    ':visited': {
      color: colors.linkVisited,
    },
    ':hover': {
      color: colors.linkHover,
    },
    ':active': {
      color: colors.linkActive,
    },
  };
});
