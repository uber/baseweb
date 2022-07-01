/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { TETHER_PLACEMENT } from './constants';
import type { OverrideT } from '../helpers/overrides';

/** LayersManager */
export type LayersManagerPropsT = {
  children: React.ReactNode;
  overrides?: {
    AppContainer?: OverrideT;
    LayersContainer?: OverrideT;
  };
  // z-index to be set for all the layers.
  zIndex?: number;
};

export type LayersManagerStateT = {
  escapeKeyHandlers: Array<() => unknown>;
  docClickHandlers: Array<(event: MouseEvent) => unknown>;
};

export type LayersContextT = {
  host: HTMLElement | undefined | null;
  zIndex?: number;
  addEscapeHandler: (a: () => unknown) => void;
  removeEscapeHandler: (a: () => unknown) => void;
  addDocClickHandler: (a: () => unknown) => void;
  removeDocClickHandler: (a: () => unknown) => void;
};

/** Layer */
export type LayerPropsT = {
  /** Content to be rendered in the Layer. */
  children: React.ReactNode;
  /** A DOM element where the Layer will be inserted into as a child.
   The host value comes from the layers context provider.
   If there is no `LayersManager` added and therefore no host element
   in the context, `document.body` will be used as a container element. */
  host?: HTMLElement | null;
  /** Defines the location (child order) at which the layer will be inserted in
   the `host` element. */
  index?: number;
  /** Identifies if this layer is a hover layer (and subsequent document clicks
   should be triggered on the last registered non-hover layer. */
  isHoverLayer?: boolean;
  /** A custom DOM element where the layer is inserted to as a child.
   Note that the `index` prop does not work with a custom `mountNode`. */
  mountNode?: HTMLElement;
  /** Handler called when escape key is pressed.
    Only the top most layer's handler is called. */
  onEscape?: () => unknown;
  /** Handler called when mousedown event happens on the document.
    Only the top most layer's handler is called. */
  onDocumentClick?: (event: MouseEvent) => unknown;
  /** A handler that is called when the Layer is mounted. */
  onMount?: () => unknown;
  /** A handler that is called when the Layer is unmounted. */
  onUnmount?: () => unknown;
  /** A value of z-index to be set on the layer.
   The zIndex value comes from the layers context provider. */
  zIndex?: number;
};

export type LayerComponentPropsT = {
  children: React.ReactNode;
  host: HTMLElement | undefined | null;
  index?: number;
  isHoverLayer?: boolean;
  mountNode?: HTMLElement;
  onEscape?: () => unknown;
  onDocumentClick?: (event: MouseEvent) => unknown;
  onMount?: () => unknown;
  onUnmount?: () => unknown;
  zIndex?: number;
};

export type LayerStateT = {
  container: HTMLElement | undefined | null;
};

/** TetherBehavior */
export type TetherPlacementT = keyof typeof TETHER_PLACEMENT;

export type NormalizedOffsetT = {
  top: number;
  left: number;
};

export type NormalizedOffsetsT = {
  arrow?: NormalizedOffsetT;
  popper: NormalizedOffsetT;
};

export type PopperOffsetT = {
  top?: number | null;
  left?: number | null;
};

export type PopperDataObjectT = {
  offsets: {
    arrow?: PopperOffsetT;
    popper: PopperOffsetT;
  };
  placement: string;
};

export type PopperOptionsT = {
  placement: string;
  modifiers: {
    arrow: {};
    computeStyle: {};
    applyStyle: {};
    applyReactStyle: {
      fn: (data: PopperDataObjectT) => void;
    };
  };
};

export type TetherPropsT = {
  /** The reference element used to position the popper. */
  anchorRef: HTMLElement | undefined | null;
  /** The arrow element that is passed as an arrow modifier to alter
   the popper positioning. */
  arrowRef?: HTMLElement | null;
  /** The element used as a popper. */
  popperRef: HTMLElement | undefined | null;
  /** Content to be rendered in the Popper. */
  children: React.ReactNode;
  /** A handler that is called when popper positioning changes. */
  onPopperUpdate: (b: NormalizedOffsetsT, a: PopperDataObjectT) => unknown;
  /** Recommended placement of the popper. */
  placement: TetherPlacementT;
  /** Options to be passes to the Popper on its initialization.
   Refer to the [Popper documentation](https://github.com/popperjs/popper.js/blob/v1.x/docs/_includes/popper-documentation.md)
   for the full list of available options. */
  // flowlint-next-line unclear-type:off
  popperOptions: any;
};

export type TetherStateT = {
  isMounted: boolean;
};
