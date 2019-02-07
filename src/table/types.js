/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import type {ThemeT} from '../styles/types.js';

export type TablePropsT = {|
  columns: Array<string | React.Node>,
  data: Array<Array<React.Node>>,
  horizontalScrollWidth?: string,
  isLoading?: boolean,
|};

export type FilterProps = {|
  active?: boolean,
  children: React.Node,
  disabled?: boolean,
  onReset?: () => mixed,
  onSelectAll?: () => mixed,
|};

export type SharedStylePropsT = {|
  $theme: ThemeT,
|};
