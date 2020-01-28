/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {styled} from '../styles/index.js';
import type {ThemeT} from '../styles/types.js';
import type {StyledComponentArgsT} from './types.js';

export function getSvgStyles({
  $theme,
  $size,
  $color,
}: StyledComponentArgsT & {$theme: ThemeT}) {
  if ($size) {
    if ($theme.sizing[$size]) {
      $size = $theme.sizing[$size];
    } else if (typeof $size === 'number') {
      $size = `${$size}px`;
    }
  } else {
    $size = $theme.sizing.scale600;
  }
  if ($color && $theme.colors[$color]) {
    $color = $theme.colors[$color];
  }
  return {
    display: 'inline-block',
    fill: $color || 'currentColor',
    color: $color || 'currentColor',
    height: $size,
    width: $size,
  };
}

export const Svg = styled<StyledComponentArgsT>('svg', getSvgStyles);
