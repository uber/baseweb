/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {ARTWORK_SIZES} from './constants.js';

export type ListArtworkSizesT =
  | typeof ARTWORK_SIZES.SMALL
  | typeof ARTWORK_SIZES.MEDIUM
  | typeof ARTWORK_SIZES.LARGE;

export type PropsT = {|
  artwork?: React.ComponentType<{size: number}>,
  artworkSize?: ListArtworkSizesT,
  children: React.Node,
  endEnhancer?: React.ComponentType<{}>,
  sublist?: boolean,
|};

export type LabelPropsT = {|
  children: React.Node,
  description?: React.Node,
  sublist?: boolean,
|};
