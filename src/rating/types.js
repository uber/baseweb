/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import type {ThemeT} from '../styles/types';
import type {OverrideT} from '../helpers/overrides';
import {KIND} from './constants';

export type RatingOverridesT = {
  Root?: OverrideT<*>,
  Star?: OverrideT<*>,
  Emoticon?: OverrideT<*>,
};

export type RatingKindT = $Keys<typeof KIND>;

export type RatingPropsT = {
  overrides?: RatingOverridesT,
  kind: RatingKindT,
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
