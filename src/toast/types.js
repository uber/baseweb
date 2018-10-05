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
import {KIND, PLACEMENT} from './constants';

export type KindTypeT = $Keys<typeof KIND>;
export type PlacementTypeT = $Keys<typeof PLACEMENT>;

export type SharedStylePropsArgT = {
  $kind: KindTypeT,
  $placement: PlacementTypeT,
  $closeable: boolean,
  $isHidden: boolean,
  $isAnimating: boolean,
};

export type SharedStylePropsT = SharedStylePropsArgT & {
  $theme: ThemeT,
};

export type OverridesT = {
  Body?: OverrideT<SharedStylePropsArgT>,
  CloseIcon?: OverrideT<SharedStylePropsArgT>,
};

export type ComponentRenderPropT = (props: {dismiss: () => void}) => React.Node;

export type ChildT = React.Node;

export type ChildrenT = React.ChildrenArray<ChildT>;

export type ToastPrivateStateT = {
  isAnimating: boolean,
  isHidden: boolean,
};

export type ToastPropsT = {
  autoHideDuration: number,
  children: ChildrenT | ComponentRenderPropT,
  closeable: boolean,
  kind: KindTypeT,
  placement: PlacementTypeT,
  onClose: () => void,
  onBlur: (e: Event) => void,
  onFocus: (e: Event) => void,
  onMouseEnter: (e: Event) => void,
  onMouseLeave: (e: Event) => void,
  overrides: OverridesT,
};
