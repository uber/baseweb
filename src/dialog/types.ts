/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { ComponentType, ReactElement } from 'react';
import type { Override } from '../helpers/overrides';
import type { ButtonDockProps } from '../button-dock';
import type { SIZE, PLACEMENT, CLOSE_KIND } from './constants';

export type DialogOverrides = {
  Root?: Override;
  ScrollContainer?: Override;
  Heading?: Override;
  Body?: Override;
  ButtonDock?: Override;
  CloseButton?: Override;
};

export type Size = (typeof SIZE)[keyof typeof SIZE];
export type Placement = (typeof PLACEMENT)[keyof typeof PLACEMENT];
export type CloseKind = (typeof CLOSE_KIND)[keyof typeof CLOSE_KIND];
export type Artwork<P = {}> = ReactElement | ComponentType<P>;

export type DialogProps = {
  artwork?: Artwork;
  buttonDock?: ButtonDockProps;
  children?: React.ReactNode | (() => React.ReactNode);
  closeKind?: CloseKind;
  handleClose?: () => void;
  hasOverlay?: boolean;
  heading: string;
  isOpen: boolean;
  numHeadingLines?: number;
  overrides?: DialogOverrides;
  placement?: Placement;
  size?: Size;
};
