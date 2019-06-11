/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled, hexToRgb} from '../styles/index.js';

import type {StylePropsT} from './types.js';

export const Root = styled<StylePropsT>('div', props => {
  return {
    width: '100%',
  };
});

export const Bar = styled<StylePropsT>('div', props => {
  const {$theme} = props;
  const {colors, sizing, borders} = $theme;
  return ({
    marginLeft: sizing.scale500,
    marginRight: sizing.scale500,
    marginTop: sizing.scale500,
    marginBottom: sizing.scale500,
    borderTopLeftRadius: borders.progressBarBorderRadius,
    borderTopRightRadius: borders.progressBarBorderRadius,
    borderBottomRightRadius: borders.progressBarBorderRadius,
    borderBottomLeftRadius: borders.progressBarBorderRadius,
    backgroundColor: hexToRgb(colors.progressbarTrackFill, '0.16'),
    height: '4px',
  }: {});
});

export const BarProgress = styled<StylePropsT>('div', props => {
  const {$theme, $value, $successValue} = props;
  const {colors, borders} = $theme;
  const width = `${($value / $successValue) * 100}%`;
  return {
    borderTopLeftRadius: borders.progressBarBorderRadius,
    borderTopRightRadius: borders.progressBarBorderRadius,
    borderBottomRightRadius: borders.progressBarBorderRadius,
    borderBottomLeftRadius: borders.progressBarBorderRadius,
    backgroundColor: colors.primary400,
    width: width,
    transition: 'width 0.5s',
    height: '100%',
  };
});

export const Label = styled<StylePropsT>('div', props => {
  return {
    textAlign: 'center',
    ...props.$theme.typography.font250,
    color: props.$theme.colors.mono700,
  };
});
