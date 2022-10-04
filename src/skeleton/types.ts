/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Override } from '../helpers/overrides';

export type SkeletonOverrides = {
  Row?: Override;
  Root?: Override;
};

export type SkeletonProps = {
  overrides?: SkeletonOverrides;
  /** Defines the number of row element in a skeleton */
  rows?: number;
  /** Defines if the skeleton has an animation default is false*/
  animation: boolean;
  /** Defines the height of the skeleton container*/
  height?: string;
  /** Defines the width of the skeleton container*/
  width?: string;
};
