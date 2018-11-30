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
import {KIND, TYPE, PLACEMENT} from './constants';

export type KindTypeT = $Values<typeof KIND>;
export type NotificationTypeT = $Values<typeof TYPE>;
export type PlacementTypeT = $Values<typeof PLACEMENT>;

export type SharedStylePropsArgT = {
  $kind: KindTypeT,
  $type: NotificationTypeT,
  $closeable: boolean,
  $isRendered: boolean,
  $isVisible: boolean,
  // styled function wrapper related
  $style?: ?{},
};

export type SharedStylePropsT = SharedStylePropsArgT & {
  $theme: ThemeT,
};

export type ToasterSharedStylePropsArgT = {
  $placement: PlacementTypeT,
};

export type ToasterSharedStylePropsT = ToasterSharedStylePropsArgT & {
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
  isVisible: boolean,
  isRendered: boolean,
};

export type ToastPropsT = {
  autoHideDuration: number,
  children: ChildrenT | ComponentRenderPropT,
  closeable: boolean,
  kind: KindTypeT,
  notificationType: NotificationTypeT,
  onClose: () => void,
  onBlur: (e: Event) => void,
  onFocus: (e: Event) => void,
  onMouseEnter: (e: Event) => void,
  onMouseLeave: (e: Event) => void,
  overrides: OverridesT,
  key: React.Key,
};

export type ToasterOverridesT = {
  Root?: OverrideT<ToasterSharedStylePropsArgT>,
  ToastBody?: OverrideT<SharedStylePropsArgT>,
  ToastCloseIcon?: OverrideT<SharedStylePropsArgT>,
};

export type ToasterPropsT = {
  overrides: ToasterOverridesT,
  placement: PlacementTypeT,
  usePortal: boolean,
};
export type ToasterContainerStateT = {
  isMounted: boolean,
  toasts: Array<$Shape<ToastPropsT> & {key: React.Key}>,
};
