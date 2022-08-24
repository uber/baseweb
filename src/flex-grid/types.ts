/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { BlockProps, Responsive, Scale } from '../block';
import type { ElementType } from 'react';

export type FlexGridProps<T extends ElementType = ElementType> = {
  /** Number of equal-width columns to allow for */
  flexGridColumnCount?: Responsive<number>;
  /** Grid gap between columns */
  flexGridColumnGap?: Responsive<Scale>;
  /** Grid gap between rows */
  flexGridRowGap?: Responsive<Scale>;
} & BlockProps<T>;

export type FlexGridItemProps<T extends ElementType = ElementType> = {
  /** Index of item in FlexGrid, used to determine gaps **/
  flexGridItemIndex?: number;
  /** Total count of items in FlexGrid, used to determine gaps **/
  flexGridItemCount?: number;
} & FlexGridProps<T>;
