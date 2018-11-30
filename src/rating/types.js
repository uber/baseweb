/*
Copyright (c) 2018 Uber Technologies, Inc.

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
  value?: number,
  numItems: number,
  onChange?: ({value: number}) => void,
};

export type EmoticonRatingPropsT = {
  overrides?: RatingOverridesT,
  value?: number,
  onChange?: ({value: number}) => void,
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
