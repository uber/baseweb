/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { BlockPropsT, ResponsiveT, ScaleT } from '../block';
import { ElementType } from 'react';

export type FlexGridPropsT<T extends ElementType = ElementType> = {
  /** Number of equal-width columns to allow for */
  flexGridColumnCount?: ResponsiveT<number>;
  /** Grid gap between columns */
  flexGridColumnGap?: ResponsiveT<ScaleT>;
  /** Grid gap between rows */
  flexGridRowGap?: ResponsiveT<ScaleT>;
} & BlockPropsT<T>;

export type FlexGridItemPropsT<T extends ElementType = ElementType> = {
  /** Index of item in FlexGrid, used to determine gaps **/
  flexGridItemIndex?: number;
  /** Total count of items in FlexGrid, used to determine gaps **/
  flexGridItemCount?: number;
} & FlexGridPropsT<T>;
