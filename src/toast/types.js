/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable flowtype/generic-spacing */
import * as React from 'react';

import type {OverrideT} from '../helpers/overrides.js';
import {KIND, PLACEMENT, TYPE} from './constants.js';

export type KindTypeT = $Values<typeof KIND>;
export type NotificationTypeT = $Values<typeof TYPE>;
export type PlacementTypeT = $Values<typeof PLACEMENT>;

export type SharedStylePropsArgT = {
  $closeable: boolean,
  $isFocusVisible: boolean,
  $isRendered: boolean,
  $isVisible: boolean,
  $kind: KindTypeT,
  $type: NotificationTypeT,
};

export type ToasterSharedStylePropsArgT = {
  $placement: PlacementTypeT,
};

export type OverridesT = {
  Body?: OverrideT,
  CloseIcon?: OverrideT,
  InnerContainer?: OverrideT,
};

export type ComponentRenderPropT = (props: {dismiss: () => void}) => React.Node;

export type ChildT = React.Node;

export type ChildrenT = React.Node;

export type ToastPrivateStateT = {
  isFocusVisible: boolean,
  isRendered: boolean,
  isVisible: boolean,
};

export type ToastPropsT = {
  /** This is a private property to detect manual changes to a toast
   *  i.e. calling toaster.info() with the same key twice
   *  currently the change detection is used to reset the autohide timer
   */
  __updated?: number,
  /** If true, the toast close icon will receive focus on mount
      and restore focus to previously focused element on unmount.
      This should only be used when there is no autoHideDuration
      and the toast for some reason has an action within it.
      Focusing alerts is bad for screenreaders! */
  autoFocus: boolean,
  /** The number of milliseconds to wait before automatically dismissing a
   * notification. This behavior is disabled when the value is set to 0.*/
  autoHideDuration: number,
  /** Toast notification content. The children-as-function
   *  receives a dismiss method that can be called to
   * dismiss the notification and can be used as a
   * handler for an action inside the toast content. */
  children: ChildrenT | ComponentRenderPropT,
  /** When set to true a close button is displayed and the notification can be dismissed by a user. */
  closeable: boolean,
  'data-baseweb'?: string,
  key: React.Key,
  /** Defines the type of notification. */
  kind: KindTypeT,
  notificationType: NotificationTypeT,
  /** A callback function called when a notification is dismissed. */
  onBlur: (e: Event) => mixed,
  onClose: () => mixed,
  onFocus: (e: Event) => mixed,
  onMouseEnter: (e: Event) => mixed,
  onMouseLeave: (e: Event) => mixed,
  overrides: OverridesT,
};

export type ToastPropsShapeT = $Shape<
  $Diff<ToastPropsT, {children: ChildrenT | ComponentRenderPropT}>,
>;

export type ToasterOverridesT = {
  Root?: OverrideT,
  ToastBody?: OverrideT,
  ToastCloseIcon?: OverrideT,
  ToastInnerContainer?: OverrideT,
};

export type ToasterPropsT = {
  /** If true, the toast close icon will receive focus on mount
      and restore focus to previously focused element on unmount.
      This should only be used when there is no autoHideDuration
      and toasts for some reason have actions within them.
      Focusing alerts is bad for screenreaders! */
  autoFocus: boolean,
  /** The number of milliseconds to wait before automatically dismissing a
   * notification. This behavior is disabled when the value is set to 0.*/
  autoHideDuration: number,
  children: React.Node,
  /** When set to true a close button is displayed and the notification can be dismissed by a user. */
  closeable: boolean,
  overrides: ToasterOverridesT,
  placement: PlacementTypeT,
  /** Defines if updating a toast resets the autohide timer */
  resetAutoHideTimerOnUpdate?: boolean,
  usePortal: boolean,
};
export type ToasterContainerStateT = {
  isMounted: boolean,
  toasts: Array<ToastPropsT>,
};
