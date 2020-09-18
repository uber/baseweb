/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {DURATION, PLACEMENT} from './constants.js';

export type DurationT =
  | typeof DURATION.short
  | typeof DURATION.medium
  | typeof DURATION.long;

export type PlacementT =
  | typeof PLACEMENT.topLeft
  | typeof PLACEMENT.top
  | typeof PLACEMENT.topRight
  | typeof PLACEMENT.bottomLeft
  | typeof PLACEMENT.bottom
  | typeof PLACEMENT.bottomRight;

export type SnackbarElementPropsT = {|
  actionMessage?: string,
  actionOnClick?: (SyntheticEvent<HTMLButtonElement>) => mixed,
  message: string,
  startEnhancer?: React.AbstractComponent<{|
    size: number,
  |}>,
|};

export type SnackbarProviderPropsT = {|
  children?: React.Node,
  placement?: PlacementT,
|};
