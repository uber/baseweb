/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';

import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';
import {KIND, PLACEMENT, TYPE} from './constants.js';

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
  /** The number of milliseconds to wait before automatically dismissing a
   * notification. This behavior is disabled when the value is set to 0.*/
  autoHideDuration: number,
  /** Toast notification content. The children-as-function
   *  receives a dissmiss method that can be called to
   * dismiss the notification and can be used as a
   * handler for an action inside the toast content. */
  children: ChildrenT | ComponentRenderPropT,
  /** When set to true a close button is displayed and the notification can be dismissed by a user. */
  closeable: boolean,
  /** Defines the type of notification. */
  kind: KindTypeT,
  notificationType: NotificationTypeT,
  /** A callback function called when a notification is dismissed. */
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
