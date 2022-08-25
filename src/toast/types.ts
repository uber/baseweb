/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';

import type { Override } from '../helpers/overrides';
import type { KIND, PLACEMENT, TYPE } from './constants';

export type KindType = typeof KIND[keyof typeof KIND];
export type NotificationType = typeof TYPE[keyof typeof TYPE];
export type PlacementType = typeof PLACEMENT[keyof typeof PLACEMENT];

export type SharedStylePropsArg = {
  $closeable: boolean;
  $isFocusVisible: boolean;
  $isRendered: boolean;
  $isVisible: boolean;
  $kind: KindType;
  $type: NotificationType;
};

export type ToasterSharedStylePropsArg = {
  $placement: PlacementType;
};

export type ToastOverrides = {
  Body?: Override;
  CloseIcon?: Override;
  InnerContainer?: Override;
};

export type ComponentRenderProp = (props: { dismiss: () => void }) => React.ReactNode;

export type Child = React.ReactNode;

export type Children = React.ReactNode;

export type ToastPrivateState = {
  isFocusVisible: boolean;
  isRendered: boolean;
  isVisible: boolean;
};

export type ToastProps = {
  /** This is a private property to detect manual changes to a toast
   *  i.e. calling toaster.info() with the same key twice
   *  currently the change detection is used to reset the autohide timer
   */
  __updated?: number;
  /** If true, the toast close icon will receive focus on mount
      and restore focus to previously focused element on unmount.
      This should only be used when there is no autoHideDuration
      and the toast for some reason has an action within it.
      Focusing alerts is bad for screenreaders! */
  autoFocus?: boolean;
  /** The number of milliseconds to wait before automatically dismissing a
   * notification. This behavior is disabled when the value is set to 0.*/
  autoHideDuration?: number;
  /** Toast notification content. The children-as-function
   *  receives a dismiss method that can be called to
   * dismiss the notification and can be used as a
   * handler for an action inside the toast content. */
  children: Children | ComponentRenderProp;
  /** When set to true a close button is displayed and the notification can be dismissed by a user. */
  closeable?: boolean;
  'data-baseweb'?: string;
  key?: React.Key;
  /** Defines the type of notification. */
  kind?: KindType;
  notificationType?: NotificationType;
  /** A callback function called when a notification is dismissed. */
  onBlur?: (e: React.FocusEvent) => unknown;
  onClose?: () => unknown;
  onFocus?: (e: React.FocusEvent) => unknown;
  onMouseEnter?: (e: React.MouseEvent) => unknown;
  onMouseLeave?: (e: React.MouseEvent) => unknown;
  overrides?: ToastOverrides;
};

export type ToastPropsShape = Partial<Omit<ToastProps, 'children'>>;

export type ToasterOverrides = {
  Root?: Override;
  ToastBody?: Override;
  ToastCloseIcon?: Override;
  ToastInnerContainer?: Override;
};

export type ToasterProps = {
  /** If true, the toast close icon will receive focus on mount
      and restore focus to previously focused element on unmount.
      This should only be used when there is no autoHideDuration
      and toasts for some reason have actions within them.
      Focusing alerts is bad for screenreaders! */
  autoFocus: boolean;
  /** The number of milliseconds to wait before automatically dismissing a
   * notification. This behavior is disabled when the value is set to 0.*/
  autoHideDuration: number;
  children: React.ReactNode;
  /** When set to true a close button is displayed and the notification can be dismissed by a user. */
  closeable: boolean;
  overrides: ToasterOverrides;
  placement: PlacementType;
  /** Defines if updating a toast resets the autohide timer */
  resetAutoHideTimerOnUpdate?: boolean;
  usePortal: boolean;
};
export type ToasterContainerState = {
  isMounted: boolean;
  toasts: Array<ToastProps>;
};
