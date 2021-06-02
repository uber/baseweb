/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled, hexToRgb, withWrapper} from '../styles/index.js';
import {SIZE} from './constants.js';

import type {StylePropsT, SizeT} from './types.js';
import React from 'react';

function getBarHeight(size) {
  return {
    [SIZE.small]: '2px',
    [SIZE.medium]: '4px',
    [SIZE.large]: '8px',
  }[size];
}

export const StyledRoot = styled<StylePropsT>('div', props => {
  return {
    width: '100%',
  };
});

export const StyledBarContainer = styled<StylePropsT>('div', props => {
  const {$theme} = props;
  const {sizing} = $theme;
  return ({
    display: 'flex',
    marginLeft: sizing.scale500,
    marginRight: sizing.scale500,
    marginTop: sizing.scale500,
    marginBottom: sizing.scale500,
  }: {});
});

export const StyledBar = styled<StylePropsT>('div', props => {
  const {$theme, $size, $steps} = props;
  const {colors, sizing, borders} = $theme;
  const borderRadius = borders.useRoundedCorners ? sizing.scale0 : 0;
  return ({
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    backgroundColor: hexToRgb(colors.progressbarTrackFill, '0.16'),
    height: getBarHeight($size),
    flex: 1,
    overflow: 'hidden',
    ...($steps < 2
      ? {}
      : {
          marginLeft: sizing.scale300,
          ':first-child': {
            marginLeft: '0',
          },
        }),
  }: {});
});

export const StyledBarProgress = styled<StylePropsT>('div', props => {
  const {$theme, $value, $successValue, $steps, $index} = props;
  const {colors, sizing, borders} = $theme;
  const width = `${($value / $successValue) * 100}%`;

  const stepStates = {
    default: 'default',
    awaits: 'awaits',
    inProgress: 'inProgress',
    completed: 'completed',
  };
  let stepState = stepStates.default;
  if ($steps > 1) {
    const stepValue = $successValue / $steps;
    const currentValue = ($value / $successValue) * 100;
    const completedSteps = Math.floor(currentValue / stepValue);
    if ($index < completedSteps) {
      stepState = stepStates.completed;
    } else if ($index === completedSteps) {
      stepState = stepStates.inProgress;
    } else {
      stepState = stepStates.awaits;
    }
  }

  const borderRadius = borders.useRoundedCorners ? sizing.scale0 : 0;
  const animationStyles = {
    width: width,
    transition: 'width 0.5s',
  };

  const stepAnimationStyles =
    stepState === stepStates.inProgress
      ? {
          width: '0%',
          animationDuration: '2.1s',
          animationIterationCount: 'infinite',
          animationTimingFunction: $theme.animation.linearCurve,
          animationName: {
            '0%': {
              width: '0%',
              opacity: 1,
            },
            '50%': {
              width: '100%',
              opacity: 1,
            },
            '100%': {
              width: '100%',
              opacity: 0,
            },
          },
        }
      : stepState === stepStates.completed
      ? {
          width: '100%',
          transition: 'width 0.5s',
        }
      : {width: '0%'};

  return {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    backgroundColor: colors.accent,
    height: '100%',
    ...($steps > 1 ? stepAnimationStyles : animationStyles),
  };
});

export const StyledInfiniteBar = styled<{isLeft?: boolean, $size: SizeT}>(
  'div',
  props => {
    const {$theme, isLeft = false, $size = SIZE.medium} = props;
    const {colors, sizing, borders} = $theme;
    const borderRadius = borders.useRoundedCorners ? sizing.scale0 : 0;
    const height = getBarHeight($size);
    const animationStyles = {
      display: 'inline-block',
      flex: 1,
      marginLeft: 'auto',
      marginRight: 'auto',
      transitionProperty: 'background-position',
      animationDuration: '1.5s',
      animationIterationCount: 'infinite',
      animationTimingFunction: $theme.animation.linearCurve,
      backgroundSize: '300% auto',
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: isLeft ? '-50%' : '150%',
      backgroundImage: `linear-gradient(${
        isLeft ? '90' : '270'
      }deg, transparent 0%, ${colors.accent} 25%, ${
        colors.accent
      } 75%, transparent 100%)`,
      animationName: isLeft
        ? {
            '0%': {
              backgroundPositionX: '-50%',
            },
            '33%': {
              backgroundPositionX: '50%',
            },
            '66%': {
              backgroundPositionX: '50%',
            },
            '100%': {
              backgroundPositionX: '150%',
            },
          }
        : {
            '0%': {
              backgroundPositionX: '150%',
            },
            '33%': {
              backgroundPositionX: '50%',
            },
            '66%': {
              backgroundPositionX: '50%',
            },
            '100%': {
              backgroundPositionX: '-50%',
            },
          },
    };
    return {
      ...(isLeft
        ? {
            borderTopLeftRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
          }
        : {
            borderTopRightRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
          }),
      height,
      ...animationStyles,
    };
  },
);

export const StyledLabel = styled<StylePropsT>('div', props => {
  return {
    textAlign: 'center',
    ...props.$theme.typography.font150,
    color: props.$theme.colors.contentTertiary,
  };
});

const PROGRESS_BAR_ROUNDED_SIZES = {
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

export const StyledProgressBarRoundedRoot = styled<{
  $size: SizeT,
  $inline: boolean,
}>('div', ({$size, $inline}) => {
  return {
    width: PROGRESS_BAR_ROUNDED_SIZES[$size].width + 'px',
    height: PROGRESS_BAR_ROUNDED_SIZES[$size].height + 'px',
    position: 'relative',
    display: $inline ? 'inline-flex' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
});

const _StyledProgressBarRoundedSvg = styled<{
  $size: SizeT,
}>('svg', ({$size}) => {
  return {
    width: PROGRESS_BAR_ROUNDED_SIZES[$size].width + 'px',
    height: PROGRESS_BAR_ROUNDED_SIZES[$size].height + 'px',
    position: 'absolute',
    fill: 'none',
  };
});

export const StyledProgressBarRoundedSvg = withWrapper(
  _StyledProgressBarRoundedSvg,
  Styled =>
    function StyledProgressBarRoundedSvg(props) {
      return (
        <Styled
          viewBox={`0 0 ${PROGRESS_BAR_ROUNDED_SIZES[props.$size].width} ${PROGRESS_BAR_ROUNDED_SIZES[props.$size].height}`}
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        />
      );
    },
);

const _StyledProgressBarRoundedTrackBackground = styled<{
  $size: SizeT,
}>('path', ({$theme, $size}) => {
  return {
    stroke: $theme.colors.backgroundTertiary,
    strokeWidth: PROGRESS_BAR_ROUNDED_SIZES[$size].strokeWidth + 'px',
  };
});

export const StyledProgressBarRoundedTrackBackground = withWrapper(
  _StyledProgressBarRoundedTrackBackground,
  Styled =>
    function StyledProgressBarRoundedSvg(props) {
      return (
        <Styled d={PROGRESS_BAR_ROUNDED_SIZES[props.$size].d} {...props} />
      );
    },
);

const _StyledProgressBarRoundedTrackForeground = styled<{
  $size: SizeT,
  $visible: boolean,
  $pathLength: number,
  $pathProgress: number,
}>('path', ({$theme, $size, $visible, $pathLength, $pathProgress}) => {
  return {
    visibility: $visible ? 'visible' : 'hidden',
    stroke: $theme.colors.borderAccent,
    strokeWidth: PROGRESS_BAR_ROUNDED_SIZES[$size].strokeWidth + 'px',
    strokeDasharray: $pathLength,
    strokeDashoffset: $pathLength * (1 - $pathProgress) + '',
  };
});

export const StyledProgressBarRoundedTrackForeground = withWrapper(
  _StyledProgressBarRoundedTrackForeground,
  Styled =>
    function StyledProgressBarRoundedSvg(props) {
      return (
        <Styled d={PROGRESS_BAR_ROUNDED_SIZES[props.$size].d} {...props} />
      );
    },
);

export const StyledProgressBarRoundedText = styled<{
  $size: SizeT,
}>('div', ({$theme, $size}) => {
  return {
    color: $theme.colors.contentPrimary,
    ...$theme.typography[PROGRESS_BAR_ROUNDED_SIZES[$size].typography],
  };
});
