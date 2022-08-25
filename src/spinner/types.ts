/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { SIZE } from './constants';
import type { Sizing } from '../themes/types';

export type Size = keyof typeof SIZE;

export type SpinnerProps = {
  /** Color of progress indicator */
  $color?: string;
  /** Width of the progress indicator "stroke".  */
  $borderWidth?: number | string | keyof Sizing | Size;
  /** Height/width of the box the indicator will appear in. */
  $size?: number | string | keyof Sizing | Size;
};
