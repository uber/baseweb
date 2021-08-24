/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {ANCHOR_POSITIONS} from './constants.js';
export const getAnchorTransform = (
  //TODO fix this... getting a weird error about file not found...
  // anchor: AnchorPositionsT,
  anchor: any,
  anchorSize: number,
) =>
  ({
    [ANCHOR_POSITIONS.none]: ``,
    [ANCHOR_POSITIONS.topLeft]: `translate(${anchorSize}px, ${anchorSize}px)`,
    [ANCHOR_POSITIONS.topRight]: `translate(-100%, ${anchorSize}px)`,
    [ANCHOR_POSITIONS.bottomLeft]: `translate(${anchorSize}px, -100%)`,
    [ANCHOR_POSITIONS.bottomRight]: `translate(${anchorSize}px, ${anchorSize}px)`,
  }[anchor]);
