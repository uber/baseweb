/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import { SIZE } from './constants.js';
import type { OverrideT } from '../helpers/overrides.js';
import type { SizingT } from '../themes/types.js';

export type SizeT = $Keys<typeof SIZE>;

export type SpinnerPropsT = {
  /** Color of progress indicator */
  $color?: string,
  /** Width of the progress indicator "stroke".  */
  $borderWidth?: number | string | $Keys<SizingT> | SizeT,
  /** Height/width of the box the indicator will appear in. */
  $size?: number | string | $Keys<SizingT> | SizeT,
};
