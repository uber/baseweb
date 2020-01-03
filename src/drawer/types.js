/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';
import {SIZE, CLOSE_SOURCE, ANCHOR} from './constants.js';

export type SizeT = $Keys<typeof SIZE>;
export type SizePropT = SizeT | string;

export type AnchorT = $Keys<typeof ANCHOR>;
export type AnchorPropT = AnchorT | string;

export type CloseSourceT = $Keys<typeof CLOSE_SOURCE>;

export type OverridesT = {
  Root?: OverrideT<SharedStylePropsArgT>,
  Backdrop?: OverrideT<SharedStylePropsArgT>,
  DrawerBody?: OverrideT<SharedStylePropsArgT>,
  DrawerContainer?: OverrideT<SharedStylePropsArgT>,
  Close?: OverrideT<SharedStylePropsArgT>,
};

// eslint-disable-next-line flowtype/no-weak-types
export type ElementRefT = {current: React.ElementRef<any> | null};

// Props shared by all flavors of modal
export type DrawerPropsT = {
  /** Sets whether the Drawer should be displayed by easing in and out */
  animate: boolean,
  isOpen: boolean,
  /** If true, focus will shift to the first interactive element within the drawer.
   * If false, the drawer container itself will receive focus.
   * Moving focus into a newly opened drawer is important for accessibility purposes, so please be careful!
   */
  autoFocus: boolean,
  /** Where to mount the modal */
  mountNode?: HTMLElement,
  /** Drawer content. The children-as-function API may be preferable
   * for performance reasons (wont render until opened) */
  children?: React.Node | (() => React.Node),
  /** Whether the modal should be closeable by the user
   *  (either via escape, backdrop click, etc). You can set this to
   * false if your modal has an action that the user must take before closing.*/
  closeable: boolean,

  onClose?: ({
    closeSource?: CloseSourceT,
  }) => mixed,
  overrides: OverridesT,
  /** Controls the size of the modal (primarily width).
   * Can be a SIZE constant or css width property value. */
  size: SizePropT,
  anchor: AnchorPropT,
  /** Whether the backdrop should be present */
  showBackdrop: boolean,
  /**Function to be called when backdrop is clicked */
  onBackdropClick?: (e: Event) => mixed,
  onEscapeKeyDown?: (e: Event) => mixed,
};

export type DrawerPropsWithoutChildrenT = $Diff<
  DrawerPropsT,
  {children: ?React.Node},
>;

export type DrawerStateT = {
  isVisible: boolean,
  mounted: boolean,
};

export type SharedStylePropsArgT = {
  children?: React.Node,
  $animating: boolean,
  $isVisible: boolean,
  $isOpen: boolean,
  $size: SizePropT,
  $closeable: boolean,
  $anchor: AnchorPropT,
};
