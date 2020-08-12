/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled, hexToRgb} from '../styles/index.js';
import {SIZE} from './constants.js';

import type {StylePropsT} from './types.js';

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
    position: 'relative',
    overflow: 'hidden',
    ...($steps < 2
      ? {}
      : {
          display: 'inline-block',
          width: `calc((100% - ${sizing.scale300} * ${$steps - 1})/${$steps})`,
          marginLeft: sizing.scale300,
          ':first-child': {
            marginLeft: '0',
          },
        }),
  }: {});
});

export const StyledBarProgress = styled<StylePropsT>('div', props => {
  const {$theme, $value, $successValue, $steps, $index, $infinite} = props;
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

  const animationStyles = $infinite
    ? {
        width: '100%',
        position: 'absolute',
        animationDuration: '2.1s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'cubic-bezier(0.65, 0.815, 0.735, 0.395)',
        animationName: {
          '0%': {
            left: '-200%',
            right: '100%',
          },
          '60%': {
            left: '107%',
            right: '-8%',
          },
          '100%': {
            left: '107%',
            right: '-8%',
          },
        },
      }
    : {
        width: width,
        transition: 'width 0.5s',
      };

  const stepAnimationStyles =
    stepState === stepStates.inProgress
      ? {
          position: 'absolute',
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

export const StyledLabel = styled<StylePropsT>('div', props => {
  return {
    textAlign: 'center',
    ...props.$theme.typography.font150,
    color: props.$theme.colors.contentTertiary,
  };
});
