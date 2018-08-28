/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
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
  onClose?: (source?: CloseSourceT) => void,
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
  // TODO: Get this to work without 'any'
  /* eslint-disable-next-line flowtype/no-weak-types */
  $ref?: React.Ref<any>,
};

export type SharedStylePropsT = SharedStylePropsArgT & {
  $theme: ThemeT,
};

export type StyledComponentPropT = {
  $theme: ThemeT,
};
