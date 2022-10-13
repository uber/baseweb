/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import { FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS } from './constants';

const cornerOffset = 8;

const FLOATING_ROUTE_MARKER_OFFSETS = Object.freeze({
  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topLeft]: `translate(${cornerOffset}px, ${cornerOffset}px)`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topRight]: `translate(calc(-100% - ${cornerOffset}px), ${cornerOffset}px)`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomLeft]: `translate(${cornerOffset}px, calc(-100% - ${cornerOffset}px))`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomRight]: `translate(calc(-100% - ${cornerOffset}px), calc(-100% - ${cornerOffset}px))`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.topCenter]: `translate(-50%, ${cornerOffset}px)`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.bottomCenter]: `translate(-50%, calc(-100% - ${cornerOffset}px))`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.leftCenter]: `translate(${cornerOffset}px, -50%)`,

  [FLOATING_ROUTE_MARKER_ANCHOR_POSITIONS.rightCenter]: `translate(calc(-100% - ${cornerOffset}px), -50%)`,
} as const);

export function calculateFloatingRouteMarkerOffsets(anchorPosition) {
  return FLOATING_ROUTE_MARKER_OFFSETS[anchorPosition];
}
