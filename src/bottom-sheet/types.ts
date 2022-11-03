/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type * as React from 'react';
import type { Override } from '../helpers/overrides';

export type BottomSheetOverrides = {
  Root?: Override;
  BottomContainer?: Override;
  Header?: Override;
  Title?: Override;
  Description?: Override;
  Divider?: Override;
  Content?: Override;
  Grabber?: Override;
};

export type BottomSheetProps = {
  title?: string;
  description?: string;
  progressBar?: React.ReactNode; // TODO: make this more specific
  content?: React.ReactNode;
  children?: React.ReactNode;
  positions?: string[];
  overrides?: BottomSheetOverrides;
};
