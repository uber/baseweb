/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {TETHER_PLACEMENT} from './constants.js';

/** LayersManager */
export type LayersManagerPropsT = {
  children: React.Node,
};

export type LayersContextT = {
  host: typeof undefined | ?HTMLElement,
};

/** Layer */
export type LayerPropsT = {
  children: React.Node,
  host?: ?HTMLElement,
  index?: number,
  mountNode?: HTMLElement,
  onMount?: () => mixed,
  onUnmount?: () => mixed,
};

export type LayerComponentPropsT = {
  children: React.Node,
  host: ?HTMLElement,
  index?: number,
  mountNode?: HTMLElement,
  onMount?: () => mixed,
  onUnmount?: () => mixed,
};

export type LayerStateT = {
  container: ?HTMLElement,
};

/** TetherBehavior */
export type TetherPlacementT = $Keys<typeof TETHER_PLACEMENT>;

export type NormalizedOffsetT = {
  top: number,
  left: number,
};

export type NormalizedOffsetsT = {
  arrow?: NormalizedOffsetT,
  popper: NormalizedOffsetT,
};

export type PopperOffsetT = {
  top?: number | null,
  left?: number | null,
};

export type PopperDataObjectT = {
  offsets: {
    arrow?: PopperOffsetT,
    popper: PopperOffsetT,
  },
  placement: string,
};

export type PopperOptionsT = {
  placement: string,
  modifiers: {
    arrow: {},
    computeStyle: {},
    applyStyle: {},
    applyReactStyle: {
      fn: (data: PopperDataObjectT) => void,
    },
  },
};

export type TetherPropsT = {
  anchorRef: ?HTMLElement,
  arrowRef?: ?HTMLElement,
  popperRef: ?HTMLElement,
  children: React.Node,
  onPopperUpdate: (NormalizedOffsetsT, PopperDataObjectT) => mixed,
  placement: TetherPlacementT,
  // eslint-disable-next-line flowtype/no-weak-types
  popperOptions: any,
};

export type TetherStateT = {
  isMounted: boolean,
};
