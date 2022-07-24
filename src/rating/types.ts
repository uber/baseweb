/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Theme } from '../styles/types';
import type { Override } from '../helpers/overrides';

export type RatingOverrides = {
  Root?: Override;
  Item?: Override;
};

export type StarRatingProps = {
  overrides?: RatingOverrides;
  /** The current rating value. */
  value?: number;
  /** The total number of items to display. */
  numItems: number;
  readOnly?: boolean;
  /** Callback that's called with the newly selected value. */
  onChange?: (a: { value: number }) => unknown;
  size?: number;
};

export type EmoticonRatingProps = {
  overrides?: RatingOverrides;
  /** The current rating value. */
  value?: number;
  readOnly?: boolean;
  /** Callback that's called with the newly selected value. */
  onChange?: (a: { value: number }) => unknown;
  size?: number;
};

export type RatingState = {
  previewIndex?: number;
  isFocusVisible?: boolean;
};

export type StyledRootProps = {
  $theme: Theme;
};

export type StyledRatingItemProps = {
  $theme: Theme;
  $isActive: boolean;
  $isPartialActive: boolean;
  $isSelected: boolean;
  $isFocusVisible: boolean;
  $isReadOnly: boolean;
  $index: number;
  $size: number;
};
