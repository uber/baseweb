/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles';
import {KIND, SIZE, SHAPE} from './constants';
import type {ThemeT} from '../styles';

type StylePropsT = {
  $theme: ThemeT,
  $size?: $Keys<typeof SIZE>,
  $kind?: $Keys<typeof KIND>,
  $shape?: $Keys<typeof SHAPE>,
  $isLoading?: boolean,
};

export const BaseButton = styled(
  'button',
  ({$theme, $size, $kind, $shape, $isLoading}: StylePropsT) => ({
    ...($size === SIZE.compact
      ? $theme.typography.font200
      : $theme.typography.font300),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    borderRadius: $shape === SHAPE.round ? '50%' : $theme.borders.radius200,
    textDecoration: 'none',
    outline: 'none',
    WebkitAppearance: 'none',
    transitionProperty: 'background',
    transitionDuration: $theme.animation.timing100,
    transitionTimingFunction: $theme.animation.easeOutCurve,
    cursor: 'pointer',
    ':disabled': {
      cursor: 'not-allowed',
      backgroundColor: $theme.colors.mono300,
      color: $theme.colors.mono600,
    },
    // Padding For Shape and Size
    ...getStyleForShape({$theme, $shape, $size}),
    // Kind style override
    ...getStyleForKind({$theme, $kind, $isLoading}),
  }),
);

export const EndEnhancer = styled('div', ({$theme}: StylePropsT) => ({
  display: 'flex',
  marginLeft: $theme.sizing.scale500,
}));

export const StartEnhancer = styled('div', ({$theme}: StylePropsT) => ({
  display: 'flex',
  marginRight: $theme.sizing.scale500,
}));

export const LoadingSpinner = styled('div', ({$theme, $kind}: StylePropsT) => ({
  height: $theme.sizing.scale600,
  width: $theme.sizing.scale600,
  borderRadius: '50%',
  borderStyle: 'solid',
  borderWidth: $theme.sizing.scale0,
  borderTopColor:
    $kind === KIND.primary ? $theme.colors.white : $theme.colors.primary,
  borderLeftColor:
    $kind === KIND.primary
      ? 'rgba(255, 255, 255, 0.32)'
      : 'rgba(39, 110, 241, 0.32)',
  borderBottomColor:
    $kind === KIND.primary
      ? 'rgba(255, 255, 255, 0.32)'
      : 'rgba(39, 110, 241, 0.32)',
  borderRightColor:
    $kind === KIND.primary
      ? 'rgba(255, 255, 255, 0.32)'
      : 'rgba(39, 110, 241, 0.32)',
  animationDuration: $theme.animation.timing700,
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
  animationName: {
    to: {
      transform: 'rotate(360deg)',
    },
    from: {
      transform: 'rotate(0deg)',
    },
  },
}));

export function getStyleForShape({$theme, $shape, $size}: StylePropsT) {
  switch ($shape) {
    case SHAPE.round:
    case SHAPE.square:
      return {
        paddingTop:
          $size === SIZE.compact
            ? $theme.sizing.scale400
            : $theme.sizing.scale500,
        paddingBottom:
          $size === SIZE.compact
            ? $theme.sizing.scale400
            : $theme.sizing.scale500,
        paddingLeft:
          $size === SIZE.compact
            ? $theme.sizing.scale400
            : $theme.sizing.scale500,
        paddingRight:
          $size === SIZE.compact
            ? $theme.sizing.scale400
            : $theme.sizing.scale500,
      };
    default:
      return {
        paddingTop:
          $size === SIZE.compact
            ? $theme.sizing.scale200
            : $theme.sizing.scale300,
        paddingBottom:
          $size === SIZE.compact
            ? $theme.sizing.scale200
            : $theme.sizing.scale300,
        paddingLeft: $theme.sizing.scale600,
        paddingRight: $theme.sizing.scale600,
      };
  }
}

export function getStyleForKind({$theme, $kind, $isLoading}: StylePropsT) {
  switch ($kind) {
    case KIND.primary:
      return {
        color: $theme.colors.white,
        backgroundColor: $theme.colors.primary,
        ':hover:enabled': {
          backgroundColor: $isLoading
            ? $theme.colors.primary600
            : $theme.colors.primary500,
        },
        ':focus:enabled': {
          backgroundColor: $isLoading
            ? $theme.colors.primary600
            : $theme.colors.primary500,
        },
        ':active:enabled': {
          backgroundColor: $theme.colors.primary600,
        },
      };
    case KIND.secondary:
      return {
        color: $theme.colors.primary,
        backgroundColor: $theme.colors.primary50,
        ':hover:enabled': {
          backgroundColor: $isLoading
            ? $theme.colors.primary200
            : $theme.colors.primary100,
        },
        ':focus:enabled': {
          backgroundColor: $isLoading
            ? $theme.colors.primary200
            : $theme.colors.primary100,
        },
        ':active:enabled': {
          backgroundColor: $theme.colors.primary200,
        },
      };
    case KIND.tertiary:
      return {
        color: $theme.colors.primary,
        backgroundColor: $theme.colors.mono200,
        ':hover:enabled': {
          backgroundColor: $isLoading
            ? $theme.colors.mono500
            : $theme.colors.mono400,
        },
        ':focus:enabled': {
          backgroundColor: $isLoading
            ? $theme.colors.mono500
            : $theme.colors.mono400,
        },
        ':active:enabled': {
          backgroundColor: $theme.colors.mono500,
        },
      };
    case KIND.minimal:
      return {
        color: $theme.colors.primary,
        backgroundColor: 'transparent',
        ':hover:enabled': {
          backgroundColor: $isLoading
            ? $theme.colors.mono400
            : $theme.colors.mono200,
        },
        ':focus:enabled': {
          backgroundColor: $isLoading
            ? $theme.colors.mono400
            : $theme.colors.mono200,
        },
        ':active:enabled': {
          backgroundColor: $theme.colors.mono400,
        },
      };
    default:
      return {};
  }
}
