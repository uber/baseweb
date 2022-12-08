/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { TETHER_PLACEMENT } from './constants';
import type { Override } from '../helpers/overrides';

/** LayersManager */
export type LayersManagerProps = {
  children: React.ReactNode;
  overrides?: {
    AppContainer?: Override;
    LayersContainer?: Override;
  };
  // z-index to be set for all the layers.
  zIndex?: number;
};

export type LayersManagerState = {
  escapeKeyHandlers: Array<() => unknown>;
  keyDownHandlers: Array<(event: KeyboardEvent) => unknown>;
  keyUpHandlers: Array<(event: KeyboardEvent) => unknown>;
  keyPressHandlers: Array<(event: KeyboardEvent) => unknown>;
  docClickHandlers: Array<(event: MouseEvent) => unknown>;
};

export type LayersContextProps = {
  host?: HTMLElement | null;
  zIndex?: number;
  addEscapeHandler: (a: () => unknown) => void;
  removeEscapeHandler: (a: () => unknown) => void;
  addKeyDownHandler: (a: (event: KeyboardEvent) => void) => void;
  removeKeyDownHandler: (a: (event: KeyboardEvent) => void) => void;
  addKeyUpHandler: (a: (event: KeyboardEvent) => void) => void;
  removeKeyUpHandler: (a: (event: KeyboardEvent) => void) => void;
  addKeyPressHandler: (a: (event: KeyboardEvent) => void) => void;
  removeKeyPressHandler: (a: (event: KeyboardEvent) => void) => void;
  addDocClickHandler: (a: (event: MouseEvent) => void) => void;
  removeDocClickHandler: (a: (event: MouseEvent) => void) => void;
};

/** Layer */
export type LayerProps = {
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
  /** Handler called when key down event is happened.
    Only the top most layer's handler is called. */
  onKeyDown?: (event: KeyboardEvent) => unknown;
  /** Handler called when key up event is happened.
    Only the top most layer's handler is called. */
  onKeyUp?: (event: KeyboardEvent) => unknown;
  /** Handler called when key press event is happened.
    Only the top most layer's handler is called. */
  onKeyPress?: (event: KeyboardEvent) => unknown;
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

export type LayerComponentProps = {
  children: React.ReactNode;
  host: HTMLElement | undefined | null;
  index?: number;
  isHoverLayer?: boolean;
  mountNode?: HTMLElement;
  onEscape?: () => unknown;
  onKeyDown?: (event: KeyboardEvent) => unknown;
  onKeyUp?: (event: KeyboardEvent) => unknown;
  onKeyPress?: (event: KeyboardEvent) => unknown;
  onDocumentClick?: (event: MouseEvent) => unknown;
  onMount?: () => unknown;
  onUnmount?: () => unknown;
  zIndex?: number;
};

export type LayerState = {
  container: HTMLElement | undefined | null;
};

/** TetherBehavior */
export type TetherPlacement = keyof typeof TETHER_PLACEMENT;

export type NormalizedOffset = {
  top: number;
  left: number;
};

export type NormalizedOffsets = {
  arrow?: NormalizedOffset;
  popper: NormalizedOffset;
};

export type PopperOffset = {
  top?: number | null;
  left?: number | null;
};

export type PopperDataObject = {
  offsets: {
    arrow?: PopperOffset;
    popper: PopperOffset;
  };
  placement: string;
};

export type PopperOptions = {
  placement: string;
  modifiers: {
    arrow: {};
    computeStyle: {};
    applyStyle: {};
    applyReactStyle: {
      fn: (data: PopperDataObject) => void;
    };
  };
};

export type TetherProps = {
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
  onPopperUpdate: (b: NormalizedOffsets, a: PopperDataObject) => unknown;
  /** Recommended placement of the popper. */
  placement: TetherPlacement;
  /** Options to be passes to the Popper on its initialization.
   Refer to the [Popper documentation](https://github.com/popperjs/popper.js/blob/v1.x/docs/_includes/popper-documentation.md)
   for the full list of available options. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  popperOptions: any;
};

export type TetherState = {
  isMounted: boolean;
};
