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

export const Root = styled<StylePropsT>('div', props => {
  return {
    width: '100%',
  };
});

export const Bar = styled<StylePropsT>('div', props => {
  const {$theme, $size} = props;
  const {colors, sizing, borders} = $theme;
  const borderRadius = borders.useRoundedCorners ? sizing.scale0 : 0;
  return ({
    marginLeft: sizing.scale500,
    marginRight: sizing.scale500,
    marginTop: sizing.scale500,
    marginBottom: sizing.scale500,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    backgroundColor: hexToRgb(colors.progressbarTrackFill, '0.16'),
    height: getBarHeight($size),
    position: 'relative',
    overflow: 'hidden',
  }: {});
});

export const BarProgress = styled<StylePropsT>('div', props => {
  const {$theme, $value, $successValue, $infinite} = props;
  const {colors, sizing, borders} = $theme;
  const width = `${($value / $successValue) * 100}%`;
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

  return {
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    backgroundColor: colors.accent,
    height: '100%',
    ...animationStyles,
  };
});

export const Label = styled<StylePropsT>('div', props => {
  return {
    textAlign: 'center',
    ...props.$theme.typography.font150,
    color: props.$theme.colors.mono700,
  };
});
