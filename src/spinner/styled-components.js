/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled} from '../styles/index.js';
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

// TODO(v10): Replace Spinner with SpinnerNext
export const StyledSpinnerNext = styled<{$size?: SizeT}>(
  'div',
  ({$theme, $size = SIZE.medium}) => {
    return {
      animationName: spin,
      animationDuration: $theme.animation.timing1000,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
      borderStyle: 'solid',
      borderRadius: '50%',
      borderTopColor: $theme.colors.contentAccent,
      borderRightColor: $theme.colors.backgroundTertiary,
      borderBottomColor: $theme.colors.backgroundTertiary,
      borderLeftColor: $theme.colors.backgroundTertiary,
      borderWidth: {
        large: $theme.sizing.scale300,
        medium: $theme.sizing.scale100,
        small: $theme.sizing.scale0,
      }[$size],
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
