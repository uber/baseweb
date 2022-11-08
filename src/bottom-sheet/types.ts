/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { Override } from '../helpers/overrides';
import type { ProgressBarProps } from '../progress-bar';

export type BottomSheetOverrides = {
  Root?: Override;
  BottomContainer?: Override;
  Header?: Override;
  Grabber?: Override;
  HeaderGrid?: Override;
  HeaderInner?: Override;
  Title?: Override;
  Description?: Override;
  Divider?: Override;
  Content?: Override;
};

export type IconButton = {
  renderIcon?: React.ComponentType<
    {
      size: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } & any
  >;
  onClick: () => void;
  label: string;
};

export type BottomSheetProps = {
  positions?: string[];
  title?: string;
  description?: string;
  content?: React.ReactNode;
  progressBar?: ProgressBarProps;
  leadingAction?: IconButton;
  trailingAction?: IconButton;
  children?: React.ReactNode;
  overrides?: BottomSheetOverrides;
};
