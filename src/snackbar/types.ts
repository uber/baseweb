/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import type { Override } from '../helpers/overrides';

import { DURATION, PLACEMENT } from './constants';

import type { SyntheticEvent } from 'react';

export type Duration =
  | typeof DURATION.infinite
  | typeof DURATION.short
  | typeof DURATION.medium
  | typeof DURATION.long;

export type Placement =
  | typeof PLACEMENT.topLeft
  | typeof PLACEMENT.top
  | typeof PLACEMENT.topRight
  | typeof PLACEMENT.bottomLeft
  | typeof PLACEMENT.bottom
  | typeof PLACEMENT.bottomRight;

export type SnackbarElementOverrides = {
  Root?: Override;
  Content?: Override;
  StartEnhancerContainer?: Override;
  Spinner?: Override;
  Message?: Override;
  WrapActionButtonContainer?: Override;
  ActionButtonContainer?: Override;
};

export type SnackbarElementProps = {
  // message displayed in button
  actionMessage?: string;
  // function executed on button click
  actionOnClick?: (a: SyntheticEvent<HTMLButtonElement>) => unknown;
  // if action button preset focus it, defaults to true
  focus?: boolean;
  // primary message displayed in snackbar
  message: React.ReactNode;
  overrides?: SnackbarElementOverrides;
  // renders spinner in start enhancer position
  progress?: boolean;
  // renders element as message prefix, takes precedence over progress prop
  startEnhancer?: React.ComponentType<{
    size: number;
  }>;
};

export type SnackbarProviderProps = {
  children?: React.ReactNode;
  overrides?: {
    PlacementContainer?: Override;
  } & SnackbarElementOverrides;
  // location on page where snackbar will render
  placement?: Placement;
  // default display duration
  defaultDuration?: Duration;
};
