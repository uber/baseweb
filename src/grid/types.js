/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {ALIGNMENT, BEHAVIOR} from './constants.js';

export type ResponsiveT<T> = T | Array<T>;

export type SoftResponsiveT<T> = ResponsiveT<T | null>;

export type AlignmentT =
  | typeof ALIGNMENT.start
  | typeof ALIGNMENT.center
  | typeof ALIGNMENT.end;

export type BehaviorT = typeof BEHAVIOR.fixed | typeof BEHAVIOR.fluid;

export type GridPropsT = {
  align?: ResponsiveT<AlignmentT>,
  behavior?: BehaviorT,
  children?: React.Node,
  gridColumns?: ResponsiveT<number>,
  gridGaps?: ResponsiveT<number>,
  gridGutters?: ResponsiveT<number>,
  gridMargins?: ResponsiveT<number>,
  gridMaxWidth?: number,
};

export type StyledGridPropsT = {
  $align?: ResponsiveT<AlignmentT>,
  $behavior?: BehaviorT,
  $gridGutters?: ResponsiveT<number>,
  $gridMargins?: ResponsiveT<number>,
  $gridMaxWidth?: number,
};

export type CellPropsT = {
  align?: ResponsiveT<AlignmentT>,
  children?: React.Node,
  order?: ResponsiveT<number>,
  skip?: ResponsiveT<number>,
  span?: ResponsiveT<number>,
  $gridColumns?: ResponsiveT<number>,
  $gridGaps?: ResponsiveT<number>,
  $gridGutters?: ResponsiveT<number>,
};

export type StyledCellPropsT = {
  $align?: ResponsiveT<AlignmentT>,
  $gridColumns?: ResponsiveT<number>,
  $gridGaps?: ResponsiveT<number>,
  $gridGutters?: ResponsiveT<number>,
  $order?: ResponsiveT<number>,
  $skip?: ResponsiveT<number>,
  $span?: ResponsiveT<number>,
};
