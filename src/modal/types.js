/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {OverrideT} from '../helpers/overrides.js';
import {SIZE, ROLE, CLOSE_SOURCE} from './constants.js';

export type SizeT = $Keys<typeof SIZE>;
export type SizePropT = SizeT | number | string;

export type RoleT = $Keys<typeof ROLE>;
export type RolePropT = RoleT | string;

export type CloseSourceT = $Keys<typeof CLOSE_SOURCE>;

export type OverridesT = {
  Root?: OverrideT<SharedStylePropsArgT>,
  Backdrop?: OverrideT<SharedStylePropsArgT>,
  Dialog?: OverrideT<SharedStylePropsArgT>,
  DialogContainer?: OverrideT<SharedStylePropsArgT>,
  Close?: OverrideT<SharedStylePropsArgT>,
};

// eslint-disable-next-line flowtype/no-weak-types
export type ElementRefT = {current: React.ElementRef<any> | null};

// Props shared by all flavors of modal
export type ModalPropsT = {
  /** Sets whether the Modal should be displayed by easing in and out */
  animate: boolean,
  /** If true, focus will shift to the first interactive element within the modal.
   * If false, the modal container itself will receive focus.
   * Moving focus into a newly opened modal is important for accessibility purposes, so please be careful!
   */
  autofocus: boolean | null,
  autoFocus: boolean,
  /** Modal content. The children-as-function API may be preferable
   * for performance reasons (wont render until opened) */
  children?: React.Node | (() => React.Node),
  /** Whether the modal should be closeable by the user
   *  (either via escape, backdrop click, etc). You can set this to
   * false if your modal has an action that the user must take before closing.*/
  closeable: boolean,
  isOpen: boolean,
  /** Where to mount the modal */
  mountNode?: HTMLElement,
  /** A callback that is invoked when the modal will close.
   * Callback is passed a constant identifying what triggered the close. */
  onClose?: ({
    closeSource?: CloseSourceT,
  }) => mixed,
  overrides: OverridesT,
  /** Which accessibility role this modal should have. */
  role: RolePropT,
  /** Controls the size of the modal (primarily width).
   * Can be a SIZE constant or css width property value. */
  size: SizePropT,
  /** Make modal scrollable while cursor is over the modal's backdrop.
   * Will be removed and implemented as the default behavior in the next major version */
  unstable_ModalBackdropScroll?: boolean,
};

export type ModalPropsWithoutChildrenT = $Diff<
  ModalPropsT,
  {children: ?React.Node},
>;

export type ModalStateT = {
  isVisible: boolean,
  mounted: boolean,
};

export type SharedStylePropsArgT = {
  $animate: boolean,
  $isVisible: boolean,
  $isOpen: boolean,
  $size: SizePropT,
  $role: RolePropT,
  $closeable: boolean,
  $unstable_ModalBackdropScroll?: boolean,
};
