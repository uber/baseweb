/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';
import type {ThemeT} from '../styles/types';
import type {OverrideT} from '../helpers/overrides';
import {SIZE, ROLE, CLOSE_SOURCE} from './constants';

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

export type ElementRefT = {current: null | React.ElementRef<'div'>};

// Props shared by all flavors of modal
export type ModalPropsT = {
  animate: boolean,
  autofocus: boolean,
  children?: React.Node | (() => React.Node),
  closeable: boolean,
  isOpen: boolean,
  mountNode?: HTMLElement,
  onClose?: ({
    closeSource?: CloseSourceT,
  }) => void,
  overrides: OverridesT,
  role: RolePropT,
  size: SizePropT,
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
  children?: React.Node,
  $animate: boolean,
  $isVisible: boolean,
  $isOpen: boolean,
  $size: SizePropT,
  $role: RolePropT,
  $closeable: boolean,
  // Styletron stuff
  $as?: string,
  // styled function wrapper related
  $style?: ?{},
  // TODO(#406): Get this to work without 'any'
  /* eslint-disable-next-line flowtype/no-weak-types */
  $ref?: React.Ref<any>,
};

export type SharedStylePropsT = SharedStylePropsArgT & {
  $theme: ThemeT,
};

export type StyledComponentPropT = {
  $theme: ThemeT,
};
