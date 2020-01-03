/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {TETHER_PLACEMENT} from './constants.js';
import type {OverrideT} from '../helpers/overrides.js';

/** LayersManager */
export type LayersManagerPropsT = {
  children: React.Node,
  overrides?: {
    AppContainer?: OverrideT<{}>,
    LayersContainer?: OverrideT<{}>,
  },
  // z-index to be set for all the layers.
  zIndex?: number,
};

export type LayersContextT = {
  host: ?HTMLElement,
  zIndex?: number,
};

/** Layer */
export type LayerPropsT = {
  /** Content to be rendered in the Layer. */
  children: React.Node,
  /** A DOM element where the Layer will be inserted into as a child.
   The host value comes from the layers context provider.
   If there is no `LayersManager` added and therefore no host element
   in the context, `document.body` will be used as a container element. */
  host?: ?HTMLElement,
  /** Defines the location (child order) at which the layer will be inserted in
   the `host` element. */
  index?: number,
  /** A custom DOM element where the layer is inserted to as a child.
   Note that the `index` prop does not work with a custom `mountNode`. */
  mountNode?: HTMLElement,
  /** A handler that is called when the Layer is mounted. */
  onMount?: () => mixed,
  /** A handler that is called when the Layer is unmounted. */
  onUnmount?: () => mixed,
  /** A value of z-index to be set on the layer.
   The zIndex value comes from the layers context provider. */
  zIndex?: number,
};

export type LayerComponentPropsT = {
  children: React.Node,
  host: ?HTMLElement,
  index?: number,
  mountNode?: HTMLElement,
  onMount?: () => mixed,
  onUnmount?: () => mixed,
  zIndex?: number,
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
  /** The reference element used to position the popper. */
  anchorRef: ?HTMLElement,
  /** The arrow element that is passed as an arrow modifier to alter
   the popper positioning. */
  arrowRef?: ?HTMLElement,
  /** The element used as a popper. */
  popperRef: ?HTMLElement,
  /** Content to be rendered in the Popper. */
  children: React.Node,
  /** A handler that is called when popper positioning changes. */
  onPopperUpdate: (NormalizedOffsetsT, PopperDataObjectT) => mixed,
  /** Recommended placement of the popper. */
  placement: TetherPlacementT,
  /** Options to be passes to the Popper on its initialization.
   Refer to the [Popper documentation](https://popper.js.org/popper-documentation.html)
   for the full list of available options. */
  // eslint-disable-next-line flowtype/no-weak-types
  popperOptions: any,
};

export type TetherStateT = {
  isMounted: boolean,
};
