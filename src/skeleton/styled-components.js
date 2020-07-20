/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';

const animationStyle = {
  animationTimingFunction: 'ease-in-out',
  animationDuration: '2s',
  animationIterationCount: 'infinite',
  animationName: {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0.4,
    },
    '100%': {
      opacity: 1,
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
    ...(props.$animation ? animationStyle : {}),
    backgroundColor: props.$theme.colors.backgroundTertiary,
    height: props.$height,
    width: props.$width,
  };
});

export const StyledRow = styled<{$animation?: boolean, $isLastRow: boolean}>(
  'div',
  props => {
    return {
      ...(props.$animation ? animationStyle : {}),
      backgroundColor: props.$theme.colors.backgroundTertiary,
      width: '100%',
      height: '15px',
      marginBottom: props.$isLastRow ? '0px' : '10px',
    };
  },
);
