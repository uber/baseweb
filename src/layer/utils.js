/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {TetherPlacementT, NormalizedOffsetT} from './types.js';
import type {Offsets} from '@popperjs/core/lib/types.js';

export function toPopperPlacement(placement: TetherPlacementT): string {
  return placement
    .replace(/(Top|Left)$/, '-start')
    .replace(/(Right|Bottom)$/, '-end');
}

/**
 * Takes the offset passed from popper.js and normalizes it
 */
export function parsePopperOffset(offset: Offsets): NormalizedOffsetT {
  return {
    top: Math.floor(offset.y || 0),
    left: Math.floor(offset.x || 0),
  };
}
