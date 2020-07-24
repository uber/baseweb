/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';

const animationStyle = {
  animationTimingFunction: 'ease-out',
  animationDuration: '1.5s',
  animationIterationCount: 'infinite',
  backgroundSize: '400% 100%',
  animationName: {
    '0%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
};

export const StyledRoot = styled<{
  $rows?: number,
  $animation?: boolean,
  $height?: string,
  $width?: string,
}>('div', props => {
  if (typeof props.$rows === 'number' && props.$rows !== 0) {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: props.$height,
      width: props.$width,
    };
  }

  return {
    background: props.$animation
      ? `linear-gradient(135deg, ${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},
        ${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},
        ${props.$theme.colors.backgroundSecondary},
        ${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},
        ${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary})`
      : props.$theme.colors.backgroundTertiary,
    ...(props.$animation ? animationStyle : {}),
    height: props.$height,
    width: props.$width,
  };
});

export const StyledRow = styled<{$animation?: boolean, $isLastRow: boolean}>(
  'div',
  props => {
    return {
      background: props.$animation
        ? `linear-gradient(135deg, ${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},
        ${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},
        ${props.$theme.colors.backgroundSecondary},
        ${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},
        ${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary},${props.$theme.colors.backgroundTertiary})`
        : props.$theme.colors.backgroundTertiary,
      ...(props.$animation ? animationStyle : {}),
      width: '100%',
      height: '15px',
      marginBottom: props.$isLastRow ? '0px' : '10px',
    };
  },
);
