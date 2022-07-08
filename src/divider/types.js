/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import { SIZE } from './constants.js';

export type SizeT = $Keys<typeof SIZE>;

export type DividerPropsT = {
  /** Thickness of the divider. */
  $size?: SizeT,
};
