/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { Override } from '../helpers/overrides';

export type IconOverrides = {
  Svg?: Override;
};

export type Size = number | string;
export type Color = string;

export type StyledComponentArgs = {
  $size?: Size;
  $color?: Color;
};

export type IconProps = React.SVGAttributes<SVGElement> & {
  children?: React.ReactNode;
  /** Size of element, will be passed to the svg width/height style. Can also be a value included in */
  size?: Size;
  /** Color of icon, will be used as svg fill */
  color?: Color;
  /** Allows you to set the SVG `<title>` label, which is used for accessibility */
  title?: string | null;
  overrides?: IconOverrides;
} & StyledComponentArgs;
