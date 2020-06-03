/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';

export const Link = styled<{
  $isAnimateUnderline: boolean,
  $isFocusVisible: boolean,
}>('a', ({$theme, $isAnimateUnderline, $isFocusVisible}) => {
  const {colors, typography, animation, direction} = $theme;
  const pos = direction === 'rtl' ? {right: 0} : {left: 0};

  return {
    color: colors.linkText,
    ...typography.font350,
    fontSize: 'inherit',
    lineHeight: 'inherit',
    transitionProperty: 'color',
    transitionDuration: animation.timing500,
    transitionTimingFunction: animation.easeOutQuinticCurve,
    position: 'relative',
    textDecoration: 'none',
    ':before': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      height: '1px',
      opacity: $isAnimateUnderline ? '0.2' : '1',
      background: colors.linkText,
    },
    ':after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      ...pos,
      width: $isAnimateUnderline ? '0%' : '100%',
      height: '1px',
      opacity: 0,
      background: colors.linkText,
      transitionDuration: animation.timing500,
      transitionTimingFunction: animation.easeOutQuinticCurve,
    },
    ':hover': {
      color: colors.linkHover,
    },
    ':hover:after': {
      opacity: 1,
      width: '100%',
      background: colors.linkHover,
    },
    ':hover:before': {
      background: colors.linkHover,
    },
    ':focus': {
      outline: $isFocusVisible ? `3px solid ${colors.accent}` : 'none',
      outlineOffset: '1px',
      textDecoration: 'none',
    },
    ':visited': {
      color: colors.linkVisited,
    },
    ':visited:after': {
      background: colors.linkVisited,
    },
    ':visited:before': {
      background: colors.linkVisited,
    },
    ':active': {
      color: colors.linkActive,
    },
    ':active:after': {
      background: colors.linkActive,
    },
    ':active:before': {
      background: colors.linkActive,
    },
  };
});
