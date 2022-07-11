/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type { OverrideT } from '../helpers/overrides';
import { SIZE, CLOSE_SOURCE, ANCHOR } from './constants';

export type SizeT = keyof typeof SIZE;
export type SizePropT = SizeT | string;

export type AnchorT = keyof typeof ANCHOR;
export type AnchorPropT = AnchorT | string;

export type CloseSourceT = keyof typeof CLOSE_SOURCE;

export type OverridesT = {
  Root?: OverrideT;
  Backdrop?: OverrideT;
  DrawerBody?: OverrideT;
  DrawerContainer?: OverrideT;
  Close?: OverrideT;
};

// flowlint-next-line unclear-type:off
export type ElementRefT = {
  current: React.RefObject<any> | null;
};

// Props shared by all flavors of modal
export type DrawerPropsT = {
  /** Sets whether the Drawer should be displayed by easing in and out */
  animate: boolean;
  isOpen: boolean;
  /** If true, focus will shift to the first interactive element within the drawer.
   * If false, the drawer container itself will receive focus.
   * Moving focus into a newly opened drawer is important for accessibility purposes, so please be careful!
   */
  autoFocus: boolean;
  /** Renders all drawer content for SEO purposes regardless of drawer isOpen state */
  renderAll?: boolean;
  /** Where to mount the modal */
  mountNode?: HTMLElement;
  /** Drawer content. The children-as-function API may be preferable
   * for performance reasons (wont render until opened) */
  children?: React.ReactNode | (() => React.ReactNode);
  /** Whether the modal should be closeable by the user
   *  (either via escape, backdrop click, etc). You can set this to
   * false if your modal has an action that the user must take before closing.*/
  closeable: boolean;
  onClose?: (a: { closeSource?: CloseSourceT }) => unknown;
  overrides: OverridesT;
  /** Controls the size of the modal (primarily width).
   * Can be a SIZE constant or css width property value. */
  size: SizePropT;
  anchor: AnchorPropT;
  /** Whether the backdrop should be present */
  showBackdrop: boolean;
  /**Function to be called when backdrop is clicked */
  onBackdropClick?: (e: Event) => unknown;
  onEscapeKeyDown?: (e: Event) => unknown;
};

export type DrawerPropsWithoutChildrenT = Omit<DrawerPropsT, 'children'>;

export type DrawerStateT = {
  isVisible: boolean;
  mounted: boolean;
  isFocusVisible: boolean;
};

export type SharedStylePropsArgT = {
  children?: React.ReactNode;
  $animating: boolean;
  $isVisible: boolean;
  $isOpen: boolean;
  $size: SizePropT;
  $closeable: boolean;
  $anchor: AnchorPropT;
  $isFocusVisible: boolean;
  $showBackdrop: boolean;
};
