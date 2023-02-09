/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { Override } from '../helpers/overrides';
import type { ProgressBarProps } from '../progress-bar';

export type SheetOverrides = {
  Root?: Override;
  TopContainer?: Override;
  Header?: Override;
  Grabber?: Override;
  HeaderGrid?: Override;
  ActionButton?: Override;
  EmptyDiv?: Override;
  HeaderTextContainer?: Override;
  Title?: Override;
  Description?: Override;
  Divider?: Override;
  BottomContainer?: Override;
  Body?: Override;
};

export type IconButton = {
  renderIcon?: React.ComponentType<{
    size: number;
  }>;
  onClick: () => void;
  label: string;
};

export type SheetProps = {
  children?: React.ReactNode;
  content?: React.ReactNode;
  description?: string;
  draggable?: boolean;
  leadingAction?: IconButton;
  overrides?: SheetOverrides;
  progressBar?: ProgressBarProps;
  title?: string;
  topPosition?: string;
  trailingAction?: IconButton;
};
