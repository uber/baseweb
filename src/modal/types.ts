/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import type { Override } from '../helpers/overrides';
import { SIZE, ROLE, CLOSE_SOURCE } from './constants';

export type Size = keyof typeof SIZE;
export type SizeProp = Size | number | string;

export type Role = keyof typeof ROLE;
export type RoleProp = Role | string;

export type CloseSource = keyof typeof CLOSE_SOURCE;

export type ModalOverrides = {
  Root?: Override;
  Dialog?: Override;
  DialogContainer?: Override;
  Close?: Override;
};

// Props shared by all flavors of modal
export type ModalProps = {
  /** Sets whether the Modal should be displayed by easing in and out */
  animate?: boolean;
  /** If true, focus will shift to the first interactive element within the modal.
   * If false, the modal container itself will receive focus.
   * Moving focus into a newly opened modal is important for accessibility purposes, so please be careful!
   */
  autoFocus?: boolean;
  /** If true, focus will be locked to elements within the modal.
   */
  focusLock?: boolean;
  name?: string;
  /**
   * if true, will return focus to the previous position on trap disable.
   * Optionally, can pass focus options instead of `true` to control the focus
   * more precisely (ie. `{ preventScroll: true }`)
   */
  returnFocus?: boolean | FocusOptions | ((returnTo: Element) => boolean | FocusOptions);
  /** Modal content. The children-as-function API may be preferable
   * for performance reasons (wont render until opened) */
  children?: React.ReactNode | (() => React.ReactNode);
  /** Whether the modal should be closeable by the user
   *  (either via escape, dialog container click, etc). You can set this to
   * false if your modal has an action that the user must take before closing.*/
  closeable?: boolean;
  isOpen?: boolean;
  /** Where to mount the modal */
  mountNode?: HTMLElement;
  /** A callback that is invoked when the modal will close.
   * Callback is passed a constant identifying what triggered the close. */
  onClose?: (a: { closeSource?: CloseSource }) => unknown;
  overrides?: ModalOverrides;
  /** Which accessibility role this modal should have. */
  role?: RoleProp;
  /** Controls the size of the modal (primarily width).
   * Can be a SIZE constant or css width property value. */
  size?: SizeProp;
};

export type ModalPropsWithoutChildren = Omit<ModalProps, 'children'>;

export type ModalState = {
  isVisible: boolean;
  mounted: boolean;
  isFocusVisible: boolean;
};

export type SharedStylePropsArg = {
  $animate: boolean;
  $isVisible: boolean;
  $isOpen: boolean;
  $size: SizeProp;
  $role: RoleProp;
  $closeable: boolean;
  $isFocusVisible: boolean;
};
