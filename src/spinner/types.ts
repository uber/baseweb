/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { SIZE } from './constants';
import type { SizingT } from '../themes/types';

export type SizeT = keyof typeof SIZE;

export type SpinnerPropsT = {
  /** Color of progress indicator */
  $color?: string;
  /** Width of the progress indicator "stroke".  */
  $borderWidth?: number | string | keyof SizingT | SizeT;
  /** Height/width of the box the indicator will appear in. */
  $size?: number | string | keyof SizingT | SizeT;
};
