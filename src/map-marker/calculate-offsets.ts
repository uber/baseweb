/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS } from './constants';
import type { FloatingRouteMarkerAnchorPositions } from './types';

const arrowSize = 8;
const FLOATING_ROUTE_MARKER_OFFSETS = Object.freeze({
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topLeft]: (offset) =>
    `translate(calc(${arrowSize}px + ${offset}px), calc(${arrowSize}px + ${offset}px))`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topRight]: (offset) =>
    `translate(calc(-100% - ${arrowSize}px - ${offset}px), calc(${arrowSize}px + ${offset}px))`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomLeft]: (offset) =>
    `translate(calc(${arrowSize}px + ${offset}px), calc(-100% - ${arrowSize}px - ${offset}px))`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomRight]: (offset) =>
    `translate(calc(-100% - ${arrowSize}px - ${offset}px), calc(-100% - ${arrowSize}px - ${offset}px))`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topCenter]: (offset) =>
    `translate(-50%, calc(${arrowSize}px + ${offset}px))`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomCenter]: (offset) =>
    `translate(-50%, calc(-100% - ${arrowSize}px - ${offset}px))`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.leftCenter]: (offset) =>
    `translate(calc(${arrowSize}px + ${offset}px), -50% )`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.rightCenter]: (offset) =>
    `translate(calc(-100% - ${arrowSize}px - ${offset}px), -50%)`,
} as const);

export function calculateFloatingRouteMarkerOffsets(
  anchorPosition: FloatingRouteMarkerAnchorPositions,
  offset = 0
) {
  return FLOATING_ROUTE_MARKER_OFFSETS[anchorPosition](offset);
}
