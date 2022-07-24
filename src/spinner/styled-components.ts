/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { styled } from '../styles';
import { SIZE } from './constants';
import type { SpinnerProps } from './types';
import { StyleObject } from 'styletron-react';

const spin = {
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
};

export const StyledSpinner = styled<'i', SpinnerProps>(
  'i',
  ({ $theme, $color = $theme.colors.contentAccent, $borderWidth, $size = SIZE.medium }) => {
    let borderSize = {
      large: $theme.sizing.scale300,
      medium: $theme.sizing.scale100,
      small: $theme.sizing.scale0,
    }[$borderWidth || $size];
    let boxSize = {
      large: $theme.sizing.scale1000,
      medium: $theme.sizing.scale900,
      small: $theme.sizing.scale800,
    }[$size];

    if (!borderSize) {
      borderSize = $theme.sizing[$borderWidth];
      if (!borderSize) {
        // @ts-expect-error todo(flow->ts) avoid mixing string with number
        borderSize = `${parseInt($borderWidth)}px`;
      }
    }
    if (!boxSize) {
      boxSize = $theme.sizing[$size];
      if (!boxSize) {
        // @ts-expect-error todo(flow->ts) avoid mixing string with number
        boxSize = `${parseInt($size)}px`;
      }
    }

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
      borderTopColor: $color,
      borderRightColor: $theme.colors.backgroundTertiary,
      borderBottomColor: $theme.colors.backgroundTertiary,
      borderLeftColor: $theme.colors.backgroundTertiary,
      borderLeftWidth: borderSize,
      borderRightWidth: borderSize,
      borderTopWidth: borderSize,
      borderBottomWidth: borderSize,
      width: boxSize,
      height: boxSize,
      cursor: 'wait',
    };
  }
);
