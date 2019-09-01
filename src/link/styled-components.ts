/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles/index';

export const Link = styled<
  'a',
  {
    $isAnimateUnderline: boolean;
    $isFocusVisible: boolean;
  }
>('a', ({ $theme, $isAnimateUnderline, $isFocusVisible }) => {
  const { colors, typography, animation, direction } = $theme;

  const underlineLTR = `linear-gradient(transparent calc(100% - 1px), ${colors.linkHover} 1px), linear-gradient(transparent calc(100% - 1px), ${colors.linkText} 1px)`;

  const underlineRTL = `linear-gradient(transparent calc(100% - 1px), ${colors.linkText} 1px), linear-gradient(transparent calc(100% - 1px), ${colors.linkHover} 1px)`;

  return {
    color: colors.linkText,
    ...typography.font350,
    fontSize: 'inherit',
    lineHeight: 'inherit',
    transitionProperty: !$isAnimateUnderline ? 'backgroundSize' : '',
    transitionDuration: animation.timing500,
    transitionTimingFunction: animation.easeOutQuinticCurve,
    position: $isAnimateUnderline ? 'relative' : null,
    textDecoration: $isAnimateUnderline ? 'none' : 'underline',
    textUnderlinePosition: 'under',
    willChange: 'background-size',
    backgroundSize: direction === 'rtl' ? '100% 100%, 100% 100%' : '0% 100%, 100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundImage: $isAnimateUnderline
      ? direction === 'rtl'
        ? underlineRTL
        : underlineLTR
      : 'none',
    ':hover': {
      color: colors.linkHover,
      backgroundSize: direction === 'rtl' ? '0% 100%, 100% 100%' : '100% 100%, 100% 100%',
    },
    ':focus': {
      outline: $isFocusVisible ? `3px solid ${colors.accent}` : 'none',
      outlineOffset: '1px',
      textDecoration: 'none',
    },
    ':visited': {
      color: colors.linkVisited,
    },
    ':active': {
      color: colors.linkActive,
    },
  };
});
