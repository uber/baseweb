/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {ThemeT} from '../styles/types.js';
import type {OverrideT} from '../helpers/overrides.js';

export type RatingOverridesT = {
  Root?: OverrideT<*>,
  Item?: OverrideT<*>,
};

export type StarRatingPropsT = {
  overrides?: RatingOverridesT,
  /** The current rating value. */
  value?: number,
  /** The total number of items to display. */
  numItems: number,
  /** Callback that's called with the newly selected value. */
  onChange?: ({value: number}) => mixed,
};

export type EmoticonRatingPropsT = {
  overrides?: RatingOverridesT,
  /** The current rating value. */
  value?: number,
  /** Callback that's called with the newly selected value. */
  onChange?: ({value: number}) => mixed,
};

export type RatingStateT = {
  previewIndex?: number,
};

export type StyledRootPropsT = {
  $theme: ThemeT,
};

export type StyledRatingItemPropsT = {
  $theme: ThemeT,
  $isActive: boolean,
  $isSelected: boolean,
  $index: number,
};
