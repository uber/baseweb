/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {styled, withWrapper} from '../styles/index.js';
import {getSvgStyles} from '../icon/styled-components.js';
import type {SizeT} from './types.js';
import {SIZE} from './constants.js';

type StylePropsT = {
  $size?: number | string,
  $color?: string,
};

const spin = {
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
};

/**
 * Spinner icon overrides
 */
export const Svg = styled<StylePropsT>('svg', props => {
  const {$theme, $color} = props;
  return {
    ...getSvgStyles(props),
    fill: $color || $theme.colors.accent,
    cursor: 'wait',
    animationName: spin,
    animationDuration: $theme.animation.timing1000,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  };
});

export const StyledTrackPath = styled<StylePropsT>('path', props => ({
  fill: props.$theme.colors.spinnerTrackFill,
  opacity: 0.16,
}));

export const StyledActivePath = styled<StylePropsT>('path', props => ({
  fill: props.$color || props.$theme.colors.accent,
}));

// TODO(v11): Replace Spinner with SpinnerNext
export const StyledSpinnerNext = styled<{$size?: SizeT}>(
  'div',
  ({$theme, $size = SIZE.medium}) => {
    const borderWidth = {
      large: $theme.sizing.scale300,
      medium: $theme.sizing.scale100,
      small: $theme.sizing.scale0,
    }[$size];
    return {
      display: 'block',
      animationName: spin,
      animationDuration: $theme.animation.timing1000,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      borderLeftStyle: 'solid',
      borderRightStyle: 'solid',
      borderTopStyle: 'solid',
      borderBottomStyle: 'solid',
      borderRadius: '50%',
      borderTopColor: $theme.colors.contentAccent,
      borderRightColor: $theme.colors.backgroundTertiary,
      borderBottomColor: $theme.colors.backgroundTertiary,
      borderLeftColor: $theme.colors.backgroundTertiary,
      borderLeftWidth: borderWidth,
      borderRightWidth: borderWidth,
      borderTopWidth: borderWidth,
      borderBottomWidth: borderWidth,
      width: {
        large: $theme.sizing.scale1000,
        medium: $theme.sizing.scale900,
        small: $theme.sizing.scale800,
      }[$size],
      height: {
        large: $theme.sizing.scale1000,
        medium: $theme.sizing.scale900,
        small: $theme.sizing.scale800,
      }[$size],
      cursor: 'wait',
    };
  },
);

const DETERMINATE_SPINNER_SIZES = {
  [SIZE.large]: {
    d:
      'M47.5 4H71.5529C82.2933 4 91 12.9543 91 24C91 35.0457 82.2933 44 71.5529 44H23.4471C12.7067 44 4 35.0457 4 24C4 12.9543 12.7067 4 23.4471 4H47.5195',
    width: 95,
    height: 48,
    strokeWidth: 8,
    typography: 'LabelLarge',
  },
  [SIZE.medium]: {
    d:
      'M39 2H60.5833C69.0977 2 76 9.16344 76 18C76 26.8366 69.0977 34 60.5833 34H17.4167C8.90228 34 2 26.8366 2 18C2 9.16344 8.90228 2 17.4167 2H39.0195',
    width: 78,
    height: 36,
    strokeWidth: 4,
    typography: 'LabelMedium',
  },
  [SIZE.small]: {
    d:
      'M32 1H51.6271C57.9082 1 63 6.37258 63 13C63 19.6274 57.9082 25 51.6271 25H12.3729C6.09181 25 1 19.6274 1 13C1 6.37258 6.09181 1 12.3729 1H32.0195',
    width: 64,
    height: 26,
    strokeWidth: 2,
    typography: 'LabelSmall',
  },
};

export const StyledSpinnerDeterminateRoot = styled<{
  $size: SizeT,
  $inline: boolean,
}>('div', ({$size, $inline}) => {
  return {
    width: DETERMINATE_SPINNER_SIZES[$size].width + 'px',
    height: DETERMINATE_SPINNER_SIZES[$size].height + 'px',
    position: 'relative',
    display: $inline ? 'inline-flex' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
});

const _StyledSpinnerDeterminateSvg = styled<{
  $size: SizeT,
}>('svg', ({$size}) => {
  return {
    width: DETERMINATE_SPINNER_SIZES[$size].width + 'px',
    height: DETERMINATE_SPINNER_SIZES[$size].height + 'px',
    position: 'absolute',
    fill: 'none',
  };
});

export const StyledSpinnerDeterminateSvg = withWrapper(
  _StyledSpinnerDeterminateSvg,
  Styled =>
    function StyledSpinnerDeterminateSvg(props) {
      return (
        <Styled
          viewBox={`0 0 ${DETERMINATE_SPINNER_SIZES[props.$size].width} ${DETERMINATE_SPINNER_SIZES[props.$size].height}`}
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        />
      );
    },
);

const _StyledSpinnerDeterminateTrackBackground = styled<{
  $size: SizeT,
}>('path', ({$theme, $size}) => {
  return {
    stroke: $theme.colors.backgroundTertiary,
    strokeWidth: DETERMINATE_SPINNER_SIZES[$size].strokeWidth + 'px',
  };
});

export const StyledSpinnerDeterminateTrackBackground = withWrapper(
  _StyledSpinnerDeterminateTrackBackground,
  Styled =>
    function StyledSpinnerDeterminateSvg(props) {
      return <Styled d={DETERMINATE_SPINNER_SIZES[props.$size].d} {...props} />;
    },
);

const _StyledSpinnerDeterminateTrackForeground = styled<{
  $size: SizeT,
  $visible: boolean,
  $pathLength: number,
  $pathProgress: number,
}>('path', ({$theme, $size, $visible, $pathLength, $pathProgress}) => {
  return {
    visibility: $visible ? 'visible' : 'hidden',
    stroke: $theme.colors.borderAccent,
    strokeWidth: DETERMINATE_SPINNER_SIZES[$size].strokeWidth + 'px',
    strokeDasharray: $pathLength,
    strokeDashoffset: $pathLength * (1 - $pathProgress) + '',
  };
});

export const StyledSpinnerDeterminateTrackForeground = withWrapper(
  _StyledSpinnerDeterminateTrackForeground,
  Styled =>
    function StyledSpinnerDeterminateSvg(props) {
      return <Styled d={DETERMINATE_SPINNER_SIZES[props.$size].d} {...props} />;
    },
);

export const StyledSpinnerDeterminateText = styled<{
  $size: SizeT,
}>('div', ({$theme, $size}) => {
  return {
    color: $theme.colors.contentPrimary,
    ...$theme.typography[DETERMINATE_SPINNER_SIZES[$size].typography],
  };
});
