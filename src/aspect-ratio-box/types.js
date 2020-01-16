/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {BlockPropsT} from '../block/types.js';

export type AspectRatioBoxPropsT = {
  /** Aspect ratio is width divided by height. */
  +aspectRatio: number,
} & BlockPropsT;
