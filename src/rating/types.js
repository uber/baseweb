/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';

export type RatingOverridesT = {
  Root?: OverrideT,
  Item?: OverrideT,
};

export type StarRatingPropsT = {
  overrides?: RatingOverridesT,
  /** The current rating value. */
  value?: number,
  /** The total number of items to display. */
  numItems: number,
  readOnly?: boolean,
  /** Callback that's called with the newly selected value. */
  onChange?: ({value: number}) => mixed,
  size?: number,
};

export type EmoticonRatingPropsT = {
  overrides?: RatingOverridesT,
  /** The current rating value. */
  value?: number,
  readOnly?: boolean,
  /** Callback that's called with the newly selected value. */
  onChange?: ({value: number}) => mixed,
  size?: number,
};

export type RatingStateT = {
  previewIndex?: number,
  isFocusVisible?: boolean,
};

export type StyledRootPropsT = {
  $theme: ThemeT,
};

export type StyledRatingItemPropsT = {
  $theme: ThemeT,
  $isActive: boolean,
  $isPartialActive: boolean,
  $isSelected: boolean,
  $isFocusVisible: boolean,
  $isReadOnly: boolean,
  $index: number,
  $size: number,
};
