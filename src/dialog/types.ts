/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { ComponentType, ReactElement } from 'react';
import type { Override } from '../helpers/overrides';
import type { ButtonDockProps } from '../button-dock';
import type { SIZE, PLACEMENT } from './constants';

export type DialogOverrides = {
  Root?: Override;
  Overlay?: Override;
  ScrollContainer?: Override;
  Heading?: Override;
  Body?: Override;
  ButtonDock?: Override;
  DismissButton?: Override;
};

export type Size = (typeof SIZE)[keyof typeof SIZE];
export type Placement = (typeof PLACEMENT)[keyof typeof PLACEMENT];
export type Artwork = ReactElement | ComponentType<{}>;

export type DialogProps = {
  artwork?: Artwork;
  /** Passes through directly to the internal ButtonDock instance within the Dialog component. */
  buttonDock?: ButtonDockProps;
  /** The contents of the body of Dialog */
  children?: React.ReactNode | (() => React.ReactNode);
  /** Determine if and how dialog can be dismissed */
  onDismiss?: () => void | null;
  /** Should Dialog include a dedicated X button to dismiss the dialog. Ignored if onDismiss is not supplied. */
  showDismissButton?: boolean;
  /** Determines whether the background behind the Dialog is dimmed when Dialog is open  */
  hasOverlay?: boolean;
  heading: string;
  isOpen: boolean;
  /** The maximum number of lines before heading truncates */
  numHeadingLines?: number;
  overrides?: DialogOverrides;
  /** Determines where on the screen the dialog appears when open */
  placement?: Placement;
  size?: Size;
  /** If true, focus will shift to the first interactive element within the modal */
  autoFocus?: boolean;
};
