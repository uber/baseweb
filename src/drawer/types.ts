/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { Override } from '../helpers/overrides';
import type { SIZE, CLOSE_SOURCE, ANCHOR } from './constants';

export type Size = keyof typeof SIZE;
export type SizeProp = Size | string;

export type Anchor = keyof typeof ANCHOR;
export type AnchorProp = Anchor | string;

export type CloseSource = keyof typeof CLOSE_SOURCE;

export type DrawerOverrides = {
  Root?: Override;
  Backdrop?: Override;
  DrawerBody?: Override;
  DrawerContainer?: Override;
  Close?: Override;
};

export type ElementRef = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current: any | null;
};

// Props shared by all flavors of modal
export type DrawerProps = {
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
  onClose?: (a: { closeSource?: CloseSource }) => unknown;
  overrides: DrawerOverrides;
  /** Controls the size of the modal (primarily width).
   * Can be a SIZE constant or css width property value. */
  size: SizeProp;
  anchor: AnchorProp;
  /** Whether the backdrop should be present */
  showBackdrop: boolean;
  /**Function to be called when backdrop is clicked */
  onBackdropClick?: (e: Event) => unknown;
  onEscapeKeyDown?: (e: Event) => unknown;
};

export type DrawerPropsWithoutChildren = Omit<DrawerProps, 'children'>;

export type DrawerState = {
  isVisible: boolean;
  mounted: boolean;
  isFocusVisible: boolean;
};

export type SharedStylePropsArg = {
  children?: React.ReactNode;
  $animating: boolean;
  $isVisible: boolean;
  $isOpen: boolean;
  $size: SizeProp;
  $closeable: boolean;
  $anchor: AnchorProp;
  $isFocusVisible: boolean;
  $showBackdrop: boolean;
};
